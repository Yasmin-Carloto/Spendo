# Spendo - Backend
O backend, ou seja, a API do Spendo, é utilizado para a conexão com o banco de dados, autenticação e recuperação de senha.

## Sumário 
1. [Tecnologias utilizadas](#tecnologias-utilizadas)
2. [Configuração do arquivo .env](#configuração-do-arquivo-env)
3. [Rotas](#rotas)
    - [Users](#users)
    - [Transactions](#transactions)
    - [Goals](#goals)
    - [Categories](#categories)
4. [Arquitetura](#arquitetura)

## Tecnologias utilizadas
- **bcrypt**:
    Para encriptação de senhas.
- **body-parser**:
    Conversão de dados recebidos em JSON
- **cors**:
    Para permitir outros endpoints acessarem esta aplicação Backend
- **dotenv**:
    Para a criação de variáveis de ambientes
- **express**:
    Servidor e gerenciamento de rotas
- **express-validator**:
    Validação de dados de entrada
- **http-errors**:
    Tratamento de erros HTTP
- **jsonwebtoken**:
    Criação de token de autenticação 
- **nodemailer**:
    Envio de email 
- **pm2**:
    Gerenciamento de processos em produção
- **sequelize + sequelize cli**:
    ORM para acesso ao banco de dados relacional
- **nodemon**:
    Monitoramento automático em ambiente de desenvolvimento

## Configuração do arquivo .env
1. API_PORT          
Porta em que a API deve ser executada
2. DATABASE_USER
Usuário do Banco de Dados
3. DATABASE_PASSWORD
Senha do Banco de Dados
4. DATABASE 
Banco de Dados a ser utilizado
5. DATABASE_HOST
Esse é o nome do Host do Banco de Dados
6. DATABASE_PORT
Porta em que o Banco de Dados está exposto
7. SALT
Número de vezes que a senha será criptografada pelo bcrypt
8. SECRET
Senha usada para criptografar o jwt
9. TEMPORARY_SECRET
Senha usada para criptografar o jwt temporário para recuperação de senha
10. FRONTEND_URL
URL base do frontend
11. SPENDO_EMAIL
Email usado para enviar ao usuário o link de recuperação de senha
12. SPENDO_PASSWORD
Código de senha de App do Google.
- O Google não deixa aplicativos externos usarem diretamente a sua senha principal da conta Google.
- Em vez disso, quando você ativa a verificação em duas etapas (2FA), o Google permite gerar uma senha de 16 caracteres aleatórios chamada App Password.
- Essa senha é usada exclusivamente por aplicativos/serviços que precisam se conectar à sua conta, por exemplo:
    1. enviar e-mails pelo SMTP do Gmail (smtp.gmail.com),
    2. acessar o Google Calendar,
    3. autenticar algum backend que precisa interagir com serviços Google.
- Mais informações em https://support.google.com/accounts/answer/185833?hl=pt-BR.

## Rotas
### users
1. Criar Usuário -> /
    - Método: POST
    - Recebe: { name, email, password }
    - Retorna no body:
    ```
    {
        "auth": true,
        "user": {
            "id": 1,
            "name": "Yasmin",
            "email": "yasmin@email.com"
        },
        "token": "jwt-token"
    }

    ```
    - Autenticação: ❌ Não requer
2. Login do Usuário -> /login
    - Método: POST
    - Recebe: { email, password }
    - Retorna no body:
    ```
    {
        "auth": true,
        "user": {
            "id": 1,
            "name": "Yasmin",
            "email": "yasmin@email.com"
        },
        "token": "jwt-token"
    }
    ```
   - Autenticação: ❌ Não requer
3. Solicitar recuperação de senha -> /forgot-password
    - Método: POST
    - Recebe: { email }
    - Retorna no body:
    ```
    {
        "message": "Link sent successfully"
    }
    ```
    - Autenticação: ❌ Não requer
4. Redefinir senha com token temporário -> /recover-password
    - Método: PUT
    - Recebe: { password }
    - Retorna no body:
    ```
    {
        "message": "Password updated successfully"
    }
    ```
    - Autenticação: ✅ Requer token temporário (JWT enviado no link do e-mail)
5. Buscar informações do usuário logado -> /me
    - Método: GET
    - Recebe: Nada (usa req.user.id do token JWT)
    - Retorna no body:
    ```
    {
        "id": 1,
        "name": "Yasmin",
        "email": "yasmin@email.com"
    }
    ```
    - Autenticação: ✅ Requer JWT válido
6. Atualizar informações do usuário logado -> /me
    - Método: PUT
    - Recebe: { name?, email? } (senha não pode ser alterada aqui)
    - Retorna no body:
    ```
    {
        "message": "User updated successfully",
        "user": {
            "id": 1,
            "name": "Novo Nome",
            "email": "novo@email.com"
        }
    }
    ```
    - Autenticação: ✅ Requer JWT válido

### transactions
1. Listar todas as transações do usuário -> /
    - Método: GET
    - Recebe: Nada no body (usa req.user.id do token JWT)
    - Retorna no body:
    ```
    {
        "transactions": [
            {
            "id": 1,
            "title": "Mercado",
            "value": 200,
            "type": "expense",
            "categoryId": 3,
            "userId": 1
            }
        ]
    }

    ```
    - Autenticação: ✅ Requer JWT válido
2. Listar transações por tipo -> /type/:type
    - Método: GET
    - Recebe: parâmetro :type (expense ou income)
    - Retorna no body:
    ```
    {
        "transactions": [
            {
            "id": 2,
            "title": "Salário",
            "value": 3000,
            "type": "income",
            "categoryId": 1,
            "userId": 1
            }
        ]
    }
    ```
    - Autenticação: ✅ Requer JWT válido
3. Listar transações por categoria -> /category/:categoryId
    - Método: GET
    - Recebe: parâmetro :categoryId
    - Retorna no body:
    ```
    {
        "transactions": [
            {
            "id": 3,
            "title": "Cinema",
            "value": 50,
            "type": "expense",
            "categoryId": 5,
            "userId": 1
            }
        ]
    }
    ```
    - Autenticação: ✅ Requer JWT válido
4. Buscar transação por ID -> /:id
    - Método: GET
    - Recebe: parâmetro :id
    - Retorna no body:
    ```
    {
        "id": 4,
        "title": "Aluguel",
        "value": 1200,
        "type": "expense",
        "categoryId": 2,
        "userId": 1
    }
    ```
    - Autenticação: ✅ Requer JWT válido
5. Criar transação -> /
    - Método: POST
    - Recebe:
    ```
    {
        "title": "Academia",
        "value": 100,
        "type": "expense",
        "categoryId": 4,
        "date": "2025-09-03",
        "installments": 1
    }
    ```
    - Retorna no body (exemplo sem parcelas):
    ```
    {
        "id": 5,
        "title": "Academia",
        "value": 100,
        "type": "expense",
        "categoryId": 4,
        "userId": 1
    }
    ```
    - Retorna no body (exemplo com parcelas):
    ```
    [
        {
            "id": 6,
            "title": "Notebook",
            "value": 500,
            "installmentNumber": 1,
            "groupId": 2
        },
        {
            "id": 7,
            "title": "Notebook",
            "value": 500,
            "installmentNumber": 2,
            "groupId": 2
        }
    ]
    ```
    - Autenticação: ✅ Requer JWT válido
6. Atualizar transação -> /:id
    - Método: PUT 
    - Recebe:
    ```
    {
        "title": "Academia Premium",
        "value": 150
    }
    ```
    - Retorna no body:
    ```
    {
        "message": "Transaction updated successfully",
        "transaction": {
            "id": 5,
            "title": "Academia Premium",
            "value": 150,
            "type": "expense",
            "categoryId": 4,
            "userId": 1
        }
    }
    ```
    - Autenticação: ✅ Requer JWT válido
7. Remover transação -> /:id
    - Método: DELETE
    - Recebe: parâmetro :id
    - Retorna no body:
    ```
    {
        "message": "Transaction deleted successfully"
    }
    ```
    - Autenticação: ✅ Requer JWT válido

### goals
1. Criar meta -> /goals
    - Método: POST
    - Recebe (body):
    ```
    {
        "title": "Comprar notebook",
        "beginDate": "2025-01-01",
        "finalDate": "2025-12-31",
        "moneyToCollect": 5000.00,
        "moneyCollected": 1000.00
    }
    ```
    - Retorna (body):
    ```
    {
        "id": 1,
        "title": "Comprar notebook",
        "beginDate": "2025-01-01",
        "finalDate": "2025-12-31",
        "moneyToCollect": 5000.00,
        "moneyCollected": 1000.00,
        "userId": 123
    }
    ```
    - Autenticação: ✅ Sim (JWT)
2. Atualizar meta -> /goals/:id
    - Método: PUT
    - Recebe (body):
    ```
    {
        "title": "Notebook gamer",
        "moneyCollected": 2000.00
    }
    ```
    - Retorna (body):
    ```
    {
        "message": "Goal updated successfully",
        "goal": {
            "id": 1,
            "title": "Notebook gamer",
            "beginDate": "2025-01-01",
            "finalDate": "2025-12-31",
            "moneyToCollect": 5000.00,
            "moneyCollected": 2000.00,
            "userId": 123
        }
    }
    ```
    - Autenticação: ✅ Sim (JWT)
3. Excluir meta -> /goals/:id
    - Método: DELETE
    - Recebe (params):
        - id → ID da meta
    - Retorna (body):
    ```
    {
        "message": "Goal deleted successfully"
    }
    ```
    - Autenticação: ✅ Sim (JWT)
4. Listar todas as metas do usuário -> /goals
    - Método: GET /goals
    - Recebe: nada no body
    - Retorna (body):
    ```
    [
        {
            "id": 1,
            "title": "Comprar notebook",
            "beginDate": "2025-01-01",
            "finalDate": "2025-12-31",
            "moneyToCollect": 5000.00,
            "moneyCollected": 2000.00,
            "userId": 123
        },
        {
            "id": 2,
            "title": "Viagem",
            "beginDate": "2025-02-01",
            "finalDate": "2025-07-30",
            "moneyToCollect": 8000.00,
            "moneyCollected": 3000.00,
            "userId": 123
        }
    ]
    ```
    - Autenticação: ✅ Sim (JWT)
5. Buscar meta por ID -> /goals/:id
    - Método: GET /goals/:id
    - Recebe (params):
        - id → ID da meta
    - Retorna (body):
    ```
    {
        "id": 1,
        "title": "Notebook gamer",
        "beginDate": "2025-01-01",
        "finalDate": "2025-12-31",
        "moneyToCollect": 5000.00,
        "moneyCollected": 2000.00,
        "userId": 123
    }
    ```
    - Autenticação: ✅ Sim (JWT)

### categories
1. Criar categoria -> /categories
    - Método: POST /categories
    - Recebe (body):
    ```
    {
        "name": "Alimentação",
        "description": "Gastos com comida"
    }
    ```
    - Retorna (body):
    ```
    {
        "id": 1,
        "name": "Alimentação",
        "description": "Gastos com comida",
        "userId": 123
    }
    ```
    - Autenticação: ✅ Sim (JWT)
2. Atualizar categoria -> /categories/:id
    - Método: PUT /categories/:id
    - Recebe (body):
    ```
    {
        "name": "Mercado",
        "description": "Supermercados e hortifrutis"
    }
    ```
    - Retorna (body):
    ```
    {
        "message": "Category updated successfully",
        "category": {
            "id": 1,
            "name": "Mercado",
            "description": "Supermercados e hortifrutis",
            "userId": 123
        }
    }
    ```
    - Autenticação: ✅ Sim (JWT)
3. Excluir categoria -> /categories/:id
    - Método: DELETE
    - Recebe (params):
        - id → ID da categoria
    - Retorna (body):
    ```
    {
        "message": "Category deleted successfully"
    }
    ```
    - Autenticação: ✅ Sim (JWT)
4. Listar todas as categorias do usuário -> /categories
    - Método: GET
    - Recebe: nada no body
    - Retorna (body):
    ```
    [
        {
            "id": 1,
            "name": "Mercado",
            "description": "Supermercados e hortifrutis",
            "userId": 123
        },
        {
            "id": 2,
            "name": "Transporte",
            "description": "Gastos com transporte público e combustível",
            "userId": 123
        }
    ]
    ```
    - Autenticação: ✅ Sim (JWT)
5. Buscar categoria por ID -> /categories/:id
    - Método: GET
    - Recebe (params):
        - id → ID da categoria
    - Retorna (body):
    ```
    {
        "id": 1,
        "name": "Mercado",
        "description": "Supermercados e hortifrutis",
        "userId": 123
    }
    ```
    - Autenticação: ✅ Sim (JWT)

## Arquitetura 
Arquitetura em camadas
```
Backend 
    |
     - src
        | 
         - config
         - controllers
         - middlewares
         - routes
         - services
         - utils
         - validators   
         - database
            |
             - config
             - migrations
             - models
```