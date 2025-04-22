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
  }
}; 