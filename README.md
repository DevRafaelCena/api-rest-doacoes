# 🎁 API REST de Doações

## 📝 Descrição
API REST desenvolvida para conectar e gerenciar doações entre diferentes atores da sociedade. O sistema permite:
- 👨‍🌾 Cadastro de doadores/produtores e seus produtos disponíveis para doação
- 🏢 Registro de ONGs que necessitam de doações
- 🚚 Cadastro de transportadores para realizar a logística das doações
- 🤝 Match automático entre doadores, ONGs e transportadores
- 📦 Gerenciamento de doações e controle de quantidades
- 📊 Acompanhamento do status das doações
- 🔍 Busca de produtos por categoria e título
- 👥 Gerenciamento de doadores e ONGs

## 🚀 Como executar localmente

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn
- Banco de dados PostgreSQL

### Passos para execução

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
cd api-rest-doacoes
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
PORT=3000
```

4. Execute as migrações do banco de dados:
```bash
npm run migrate
# ou
yarn migrate
```

5. Inicie o servidor:
```bash
npm run dev
# ou
yarn dev
```

O servidor estará rodando em `http://localhost:3000`

## 📚 Documentação da API
A documentação completa da API estará disponível em `http://localhost:3000/api-docs` quando o servidor estiver em execução.

## 🛠️ Tecnologias utilizadas
- Node.js
- TypeScript
- Express
- Knex.js
- PostgreSQL
- Jest (para testes)
