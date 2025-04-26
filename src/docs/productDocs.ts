import { Measure } from '@/enums/measure.enum';

export const productDocs = {
  '/products': {
    post: {
      summary: 'Cria um novo produto',
      tags: ['Product'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                donorId: { 
                  type: 'number', 
                  example: 1,
                  description: 'ID do doador que está cadastrando o produto'
                },
                categoryId: { 
                  type: 'number', 
                  example: 1,
                  description: 'ID da categoria do produto'
                },
                title: { 
                  type: 'string', 
                  example: 'Arroz',
                  description: 'Título do produto'
                },
                description: { 
                  type: 'string', 
                  example: 'Arroz branco tipo 1',
                  description: 'Descrição detalhada do produto'
                },
                quantity: { 
                  type: 'number', 
                  example: 10,
                  description: 'Quantidade disponível do produto'
                },
                measure: { 
                  type: 'string',
                  enum: Object.values(Measure),
                  example: Measure.KILOGRAMA,
                  description: 'Unidade de medida do produto. Opções: KG (Quilograma), G (Grama), L (Litro), ML (Mililitro), UNID (Unidade), CX (Caixa), PC (Pacote), SC (Saco), M (Metro), CM (Centímetro)'
                }
              },
              required: ['donorId', 'categoryId', 'title', 'quantity', 'measure'],
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Produto criado com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'number', example: 1 },
                  donorId: { type: 'number', example: 1 },
                  categoryId: { type: 'number', example: 1 },
                  title: { type: 'string', example: 'Arroz' },
                  description: { type: 'string', example: 'Arroz branco tipo 1' },
                  quantity: { type: 'number', example: 10 },
                  measure: { 
                    type: 'string',
                    enum: Object.values(Measure),
                    example: Measure.KILOGRAMA
                  },
                  registeredAt: { type: 'string', example: '2024-04-01T12:00:00.000Z' }
                },
              },
            },
          },
        },
        422: {
          description: 'Erro de validação dos dados',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'Erro de validação' },
                  errors: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        path: { type: 'string', example: 'measure' },
                        message: { type: 'string', example: 'Unidade de medida inválida' }
                      }
                    }
                  }
                },
              },
            },
          },
        },
      },
    },
    get: {
      summary: 'Lista produtos disponíveis',
      tags: ['Product'],
      parameters: [
        {
          in: 'query',
          name: 'categoryId',
          schema: { type: 'number' },
          description: 'ID da categoria para filtrar os produtos',
          required: false
        },
        {
          in: 'query',
          name: 'title',
          schema: { type: 'string' },
          description: 'Título para buscar produtos',
          required: false
        }
      ],
      responses: {
        200: {
          description: 'Lista de produtos disponíveis',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number', example: 1 },
                    donorId: { type: 'number', example: 1 },
                    categoryId: { type: 'number', example: 1 },
                    title: { type: 'string', example: 'Arroz' },
                    description: { type: 'string', example: 'Arroz branco tipo 1' },
                    quantity: { type: 'number', example: 10 },
                    measure: { 
                      type: 'string',
                      enum: Object.values(Measure),
                      example: Measure.KILOGRAMA
                    },
                    registeredAt: { type: 'string', example: '2024-04-01T12:00:00.000Z' }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  '/products/{id}': {
    get: {
      summary: 'Busca um produto pelo ID',
      tags: ['Product'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          schema: { type: 'number' },
          required: true,
          description: 'ID do produto'
        }
      ],
      responses: {
        200: {
          description: 'Produto encontrado',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'number', example: 1 },
                  donorId: { type: 'number', example: 1 },
                  categoryId: { type: 'number', example: 1 },
                  title: { type: 'string', example: 'Arroz' },
                  description: { type: 'string', example: 'Arroz branco tipo 1' },
                  quantity: { type: 'number', example: 10 },
                  measure: { 
                    type: 'string',
                    enum: Object.values(Measure),
                    example: Measure.KILOGRAMA
                  },
                  registeredAt: { type: 'string', example: '2024-04-01T12:00:00.000Z' }
                }
              }
            }
          }
        },
        404: {
          description: 'Produto não encontrado',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'Produto não encontrado' }
                }
              }
            }
          }
        }
      }
    }
  },
  '/products/available': {
    get: {
      summary: 'Lista produtos com quantidade disponível para doação',
      tags: ['Product'],
      parameters: [
        {
          in: 'query',
          name: 'categoryId',
          schema: { type: 'number' },
          description: 'ID da categoria para filtrar os produtos',
          required: false
        },
        {
          in: 'query',
          name: 'title',
          schema: { type: 'string' },
          description: 'Título para buscar produtos',
          required: false
        }
      ],
      responses: {
        200: {
          description: 'Lista de produtos com quantidade disponível',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number', example: 1 },
                    donorId: { type: 'number', example: 1 },
                    categoryId: { type: 'number', example: 1 },
                    title: { type: 'string', example: 'Arroz' },
                    description: { type: 'string', example: 'Arroz branco tipo 1' },
                    quantity: { type: 'number', example: 10 },
                    measure: { 
                      type: 'string',
                      enum: Object.values(Measure),
                      example: Measure.KILOGRAMA
                    },
                    registeredAt: { type: 'string', example: '2024-04-01T12:00:00.000Z' },
                    availableQuantity: { type: 'number', example: 8 }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  '/products/details/{id}': {
    get: {
      summary: 'Obtém detalhes completos de um produto',
      tags: ['Product'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          schema: { type: 'number' },
          required: true,
          description: 'ID do produto'
        }
      ],
      responses: {
        200: {
          description: 'Detalhes do produto encontrado',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'number', example: 1 },
                  donorId: { type: 'number', example: 1 },
                  categoryId: { type: 'number', example: 1 },
                  title: { type: 'string', example: 'Arroz' },
                  description: { type: 'string', example: 'Arroz branco tipo 1' },
                  quantity: { type: 'number', example: 10 },
                  measure: { 
                    type: 'string',
                    enum: Object.values(Measure),
                    example: Measure.KILOGRAMA
                  },
                  registeredAt: { type: 'string', example: '2024-04-01T12:00:00.000Z' },
                  availableQuantity: { type: 'number', example: 8 },
                  donor: {
                    type: 'object',
                    properties: {
                      name: { type: 'string', example: 'Hope Donor' },
                      cnpj: { type: 'string', example: '98765432000110' },
                      address: {
                        type: 'object',
                        properties: {
                          street: { type: 'string', example: 'Avenida Paulista' },
                          number: { type: 'string', example: '1000' },
                          complement: { type: 'string', example: 'Apto 202' },
                          cep: { type: 'string', example: '01310000' },
                          city: { type: 'string', example: 'São Paulo' },
                          state: { type: 'string', example: 'SP' }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        400: {
          description: 'ID inválido',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'ID do produto inválido' }
                }
              }
            }
          }
        },
        404: {
          description: 'Produto não encontrado',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: { type: 'string', example: 'Produto não encontrado' }
                }
              }
            }
          }
        }
      }
    }
  }
}; 