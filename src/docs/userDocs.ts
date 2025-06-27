export const userDocs = {
  '/user': {
    post: {
      summary: 'Cria um novo usuário',
      tags: ['User'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                username: { type: 'string', example: 'donor_hope' },
                password: { type: 'string', example: 'ongPass789' },
                name: { type: 'string', example: 'Hope Donor' },
                cnpj: {
                  type: 'string',
                  example: '98.765.432/0001-10',
                  description: 'Opcional, apenas para organizações',
                },
                role: { type: 'string', enum: ['donor', 'transporter', 'ong'], example: 'donor' },
              },
              required: ['username', 'password', 'name', 'role'],
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Usuário criado com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'number', example: 1 },
                  username: { type: 'string', example: 'donor_hope' },
                  name: { type: 'string', example: 'Hope Donor' },
                  role: { type: 'string', example: 'donor' },
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
                  message: { type: 'string', example: 'Invalid data' },
                },
              },
            },
          },
        },
      },
    },
  },
  '/user/address': {
    post: {
      summary: 'Registra um endereço para o usuário',
      tags: ['User'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                street: { type: 'string', example: 'Avenida Paulista 2' },
                number: { type: 'string', example: '1000' },
                complement: { type: 'string', example: 'Apto 202' },
                cep: { type: 'string', example: '01310-000' },
                city: { type: 'string', example: 'São Paulo' },
                state: { type: 'string', example: 'SP' },
                userId: { type: 'number', example: 1 },
              },
              required: ['street', 'number', 'cep', 'city', 'state', 'userId'],
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Endereço registrado com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: { type: 'number', example: 1 },
                  street: { type: 'string', example: 'Avenida Paulista 2' },
                  number: { type: 'string', example: '1000' },
                  complement: { type: 'string', example: 'Apto 202' },
                  cep: { type: 'string', example: '01310-000' },
                  city: { type: 'string', example: 'São Paulo' },
                  state: { type: 'string', example: 'SP' },
                  userId: { type: 'number', example: 1 },
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
                  message: { type: 'string', example: 'Invalid data' },
                },
              },
            },
          },
        },
      },
    },
  },
  '/transporter/available': {
    get: {
      summary: 'Lista doações disponíveis para transporte',
      tags: ['Transporter'],
      responses: {
        200: {
          description: 'Lista de doações disponíveis',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number', example: 12 },
                    productId: { type: 'number', example: 22 },
                    ongId: { type: 'number', example: 4 },
                    quantity: { type: 'number', example: 2 },
                    measure: { type: 'string', example: 'KG' },
                    acceptedAt: { type: 'string', example: '2025-06-10T03:00:00.000Z' },
                    sentAt: { type: 'string', example: '2025-06-10T03:00:00.000Z' },
                    completed: { type: 'boolean', example: false },
                    origin: {
                      type: 'object',
                      properties: {
                        nome: { type: 'string', example: 'Roberto E Luciana Telecom Ltda' },
                        origin: {
                          type: 'object',
                          properties: {
                            street: { type: 'string', example: 'Rua X' },
                            number: { type: 'string', example: '123' },
                            complement: { type: 'string', example: null },
                            cep: { type: 'string', example: '12345-678' },
                            city: { type: 'string', example: 'São Paulo' },
                            state: { type: 'string', example: 'SP' },
                          },
                        },
                      },
                    },
                    destiny: {
                      type: 'object',
                      properties: {
                        nome: { type: 'string', example: 'Ong Dev Soluttion' },
                        endereco: {
                          type: 'object',
                          properties: {
                            street: { type: 'string', example: 'Avenida Paulista 2' },
                            number: { type: 'string', example: '1000' },
                            complement: { type: 'string', example: 'Apto 202' },
                            cep: { type: 'string', example: '01310000' },
                            city: { type: 'string', example: 'São Paulo' },
                            state: { type: 'string', example: 'SP' },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/transporter/in-progress': {
    get: {
      summary: 'Lista entregas em andamento do transportador',
      tags: ['Transporter'],
      responses: {
        200: {
          description: 'Lista de entregas em andamento',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/TransporterAvailable',
                },
              },
            },
          },
        },
      },
    },
  },
  '/transporter/accept/{id}': {
    put: {
      summary: 'Transportador aceita a entrega e se torna responsável',
      tags: ['Transporter'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'number' },
        },
      ],
      responses: {
        200: {
          description: 'Doação atualizada',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/TransporterAvailable' },
            },
          },
        },
      },
    },
  },
  '/transporter/complete/{id}': {
    put: {
      summary: 'Transportador marca a entrega como concluída',
      tags: ['Transporter'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'number' },
        },
      ],
      responses: {
        200: {
          description: 'Entrega marcada como concluída',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/TransporterAvailable' },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      TransporterAvailable: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 12 },
          productId: { type: 'number', example: 22 },
          ongId: { type: 'number', example: 4 },
          quantity: { type: 'number', example: 2 },
          measure: { type: 'string', example: 'KG' },
          acceptedAt: { type: 'string', example: '2025-06-10T03:00:00.000Z' },
          sentAt: { type: 'string', example: '2025-06-10T03:00:00.000Z' },
          completed: { type: 'boolean', example: false },
          origin: {
            type: 'object',
            properties: {
              nome: { type: 'string', example: 'Roberto E Luciana Telecom Ltda' },
              origin: {
                type: 'object',
                properties: {
                  street: { type: 'string', example: 'Rua X' },
                  number: { type: 'string', example: '123' },
                  complement: { type: 'string', example: null },
                  cep: { type: 'string', example: '12345-678' },
                  city: { type: 'string', example: 'São Paulo' },
                  state: { type: 'string', example: 'SP' },
                },
              },
            },
          },
          destiny: {
            type: 'object',
            properties: {
              nome: { type: 'string', example: 'Ong Dev Soluttion' },
              endereco: {
                type: 'object',
                properties: {
                  street: { type: 'string', example: 'Avenida Paulista 2' },
                  number: { type: 'string', example: '1000' },
                  complement: { type: 'string', example: 'Apto 202' },
                  cep: { type: 'string', example: '01310000' },
                  city: { type: 'string', example: 'São Paulo' },
                  state: { type: 'string', example: 'SP' },
                },
              },
            },
          },
        },
      },
    },
  },
};
