export const authDocs = {
  '/login': {
    post: {
      summary: 'Realiza a autenticação do usuário',
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                username: {
                  type: 'string',
                  example: 'usuario123',
                },
                password: {
                  type: 'string',
                  example: 'senhaSecreta',
                },
              },
              required: ['username', 'password'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Login bem-sucedido, retorna tokens de acesso e informações do usuário',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  token: {
                    type: 'string',
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                  },
                  refreshToken: {
                    type: 'string',
                    example: 'dGhpc2lzYXJlZnJlc2h0b2tlbg...',
                  },
                  user: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'number',
                        example: 32,
                      },
                      username: {
                        type: 'string',
                        example: 'donor_hope',
                      },
                      role: {
                        type: 'string',
                        example: 'donor',
                      },
                      donorId: {
                        type: 'number',
                        example: 3,
                      },
                      name: {
                        type: 'string',
                        example: 'Hope Donor',
                      },
                      cnpj: {
                        type: 'string',
                        example: '98765432000110',
                      },
                      registeredAt: {
                        type: 'string',
                        format: 'date-time',
                        example: '2025-04-01T00:00:00.000Z',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        401: {
          description: 'Falha na autenticação (usuário ou senha inválidos)',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Invalid username or password',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/me': {
    get: {
      summary: 'Retorna as informações do usuário autenticado',
      tags: ['Auth'],
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: 'Informações do usuário retornadas com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: {
                    type: 'number',
                    example: 32,
                  },
                  username: {
                    type: 'string',
                    example: 'donor_hope',
                  },
                  role: {
                    type: 'string',
                    example: 'donor',
                  },
                  donorId: {
                    type: 'number',
                    example: 3,
                  },
                  name: {
                    type: 'string',
                    example: 'Hope Donor',
                  },
                  cnpj: {
                    type: 'string',
                    example: '98765432000110',
                  },
                  registeredAt: {
                    type: 'string',
                    format: 'date-time',
                    example: '2025-04-01T00:00:00.000Z',
                  },
                },
              },
            },
          },
        },
        401: {
          description: 'Token não fornecido ou inválido',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Token não fornecido',
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'Erro ao buscar informações do usuário',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'User not found',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
