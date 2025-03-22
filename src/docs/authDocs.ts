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
          description: 'Login bem-sucedido, retorna tokens de acesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  accessToken: {
                    type: 'string',
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                  },
                  refreshToken: {
                    type: 'string',
                    example: 'dGhpc2lzYXJlZnJlc2h0b2tlbg...',
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
        500: {
          description: 'Erro interno do servidor',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'Erro interno do servidor',
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
