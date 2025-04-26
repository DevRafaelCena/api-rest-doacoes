import { Measure } from '@/enums/measure.enum';

export const donationDocs = {
  '/donations': {
    post: {
      summary: 'Solicita uma nova doação',
      tags: ['Donation'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                productId: { 
                  type: 'number', 
                  example: 1,
                  description: 'ID do produto que está sendo doado'
                },
                ongId: { 
                  type: 'number', 
                  example: 1,
                  description: 'ID da ONG que está solicitando a doação'
                },
                quantity: { 
                  type: 'number', 
                  example: 10,
                  description: 'Quantidade solicitada'
                },
                measure: { 
                  type: 'string',
                  enum: Object.values(Measure),
                  example: Measure.KILOGRAMA,
                  description: 'Unidade de medida'
                }
              },
              required: ['productId', 'ongId', 'quantity', 'measure'],
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Doação solicitada com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'number', example: 1 },
                  productId: { type: 'number', example: 1 },
                  ongId: { type: 'number', example: 1 },
                  quantity: { type: 'number', example: 10 },
                  measure: { 
                    type: 'string',
                    enum: Object.values(Measure),
                    example: Measure.KILOGRAMA
                  },
                  completed: { type: 'boolean', example: false },
                  createdAt: { type: 'string', example: '2024-04-01T12:00:00.000Z' }
                },
              },
            },
          },
        },
        400: {
          description: 'Erro na validação dos dados',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'string', example: 'Erro de validação' },
                },
              },
            },
          },
        },
      },
    },
    get: {
      summary: 'Lista doações com filtros',
      tags: ['Donation'],
      parameters: [
        {
          in: 'query',
          name: 'productId',
          schema: { type: 'number' },
          description: 'ID do produto para filtrar as doações',
          required: false
        },
        {
          in: 'query',
          name: 'ongId',
          schema: { type: 'number' },
          description: 'ID da ONG para filtrar as doações',
          required: false
        }
      ],
      responses: {
        200: {
          description: 'Lista de doações',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number', example: 1 },
                    productId: { type: 'number', example: 1 },
                    ongId: { type: 'number', example: 1 },
                    quantity: { type: 'number', example: 10 },
                    measure: { 
                      type: 'string',
                      enum: Object.values(Measure),
                      example: Measure.KILOGRAMA
                    },
                    completed: { type: 'boolean', example: false },
                    createdAt: { type: 'string', example: '2024-04-01T12:00:00.000Z' }
                  }
                }
              }
            }
          }
        },
        400: {
          description: 'Erro na validação dos filtros',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'string', example: 'Erro de validação' },
                },
              },
            },
          },
        }
      }
    }
  },
  '/donations/requests': {
    get: {
      summary: 'Lista solicitações de doação',
      tags: ['Donation'],
      parameters: [
        {
          in: 'query',
          name: 'donorId',
          schema: { type: 'number' },
          description: 'ID do doador para filtrar as solicitações',
          required: false
        },
        {
          in: 'query',
          name: 'ongId',
          schema: { type: 'number' },
          description: 'ID da ONG para filtrar as solicitações',
          required: false
        }
      ],
      responses: {
        200: {
          description: 'Lista de solicitações de doação',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number', example: 1 },
                    productId: { type: 'number', example: 1 },
                    ongId: { type: 'number', example: 1 },
                    quantity: { type: 'number', example: 10 },
                    measure: { 
                      type: 'string',
                      enum: Object.values(Measure),
                      example: Measure.KILOGRAMA
                    },
                    invoiceUrl: { type: 'string', nullable: true, example: null },
                    acceptedAt: { type: 'string', nullable: true, example: null },
                    sentAt: { type: 'string', nullable: true, example: null },
                    deliveredAt: { type: 'string', nullable: true, example: null },
                    completed: { type: 'boolean', example: false },
                    productTitle: { type: 'string', example: 'Arroz' },
                    donorName: { type: 'string', example: 'Fazenda São João' },
                    donorCnpj: { type: 'string', example: '12345678000190' },
                    ongName: { type: 'string', example: 'ONG Alimentar' },
                    ongCnpj: { type: 'string', example: '98765432000190' }
                  }
                }
              }
            }
          }
        },
        400: {
          description: 'Erro na validação dos filtros',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'string', example: 'Erro de validação' }
                }
              }
            }
          }
        }
      }
    }
  }
}; 