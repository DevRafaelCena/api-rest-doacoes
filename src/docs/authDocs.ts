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
                        example: 1,
                      },
                      username: {
                        type: 'string',
                        example: 'usuario123',
                      },
                      role: {
                        type: 'string',
                        example: 'donor',
                      },
                      donorId: {
                        type: 'number',
                        example: 1,
                      },
                      ongId: {
                        type: 'number',
                        example: 1,
                      },
                      transporterId: {
                        type: 'number',
                        example: 1,
                      },
                      name: {
                        type: 'string',
                        example: 'Nome da Empresa',
                      },
                      cnpj: {
                        type: 'string',
                        example: '12345678901234',
                      },
                      cpf: {
                        type: 'string',
                        example: '12345678901',
                      },
                      capacity: {
                        type: 'number',
                        example: 1000,
                      },
                      measure: {
                        type: 'string',
                        example: 'kg',
                      },
                      registeredAt: {
                        type: 'string',
                        format: 'date',
                        example: '2024-03-20',
                      },
                      address: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'number',
                            example: 1,
                          },
                          street: {
                            type: 'string',
                            example: 'Rua Exemplo',
                          },
                          number: {
                            type: 'string',
                            example: '123',
                          },
                          complement: {
                            type: 'string',
                            example: 'Sala 1',
                          },
                          neighborhood: {
                            type: 'string',
                            example: 'Centro',
                          },
                          city: {
                            type: 'string',
                            example: 'São Paulo',
                          },
                          state: {
                            type: 'string',
                            example: 'SP',
                          },
                          zipCode: {
                            type: 'string',
                            example: '01234567',
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
                    example: 1,
                  },
                  username: {
                    type: 'string',
                    example: 'usuario123',
                  },
                  role: {
                    type: 'string',
                    example: 'donor',
                  },
                  donorId: {
                    type: 'number',
                    example: 1,
                  },
                  ongId: {
                    type: 'number',
                    example: 1,
                  },
                  transporterId: {
                    type: 'number',
                    example: 1,
                  },
                  name: {
                    type: 'string',
                    example: 'Nome da Empresa',
                  },
                  cnpj: {
                    type: 'string',
                    example: '12345678901234',
                  },
                  cpf: {
                    type: 'string',
                    example: '12345678901',
                  },
                  capacity: {
                    type: 'number',
                    example: 1000,
                  },
                  measure: {
                    type: 'string',
                    example: 'kg',
                  },
                  registeredAt: {
                    type: 'string',
                    format: 'date',
                    example: '2024-03-20',
                  },
                  address: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'number',
                        example: 1,
                      },
                      street: {
                        type: 'string',
                        example: 'Rua Exemplo',
                      },
                      number: {
                        type: 'string',
                        example: '123',
                      },
                      complement: {
                        type: 'string',
                        example: 'Sala 1',
                      },
                      neighborhood: {
                        type: 'string',
                        example: 'Centro',
                      },
                      city: {
                        type: 'string',
                        example: 'São Paulo',
                      },
                      state: {
                        type: 'string',
                        example: 'SP',
                      },
                      zipCode: {
                        type: 'string',
                        example: '01234567',
                      },
                    },
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
