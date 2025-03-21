export const healthDocs = {
  '/health': {
    get: {
      summary: 'Verifica a saúde do servidor',
      tags: ['Health'],
      responses: {
        200: {
          description: 'Retorna o status do servidor',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                    example: 'OK',
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
