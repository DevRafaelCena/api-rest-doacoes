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
};
