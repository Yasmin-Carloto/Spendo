# Spendo 
O Spendo é uma aplicação voltada para o controle das finanças do usuário, onde é possível cadastrar transações e metas. Além de te permitir ter acesso a uma dashboard que resume seus gastos e metas mensais.

## Sumário 
1. [Acesso ao projeto](#acesso-ao-projeto)
2. [Como executar o projeto localmente?](#️-como-executar-o-projeto-localmente)
3. [Informações adicionais](#informações-adicionais)

## Acesso ao projeto
O projeto ainda não está em produção, mas estará em breve.

## 🛠️ Como executar o projeto localmente?
**1. Clone o repositório:**
```
git clone https://github.com/Yasmin-Carloto/Spendo.git
```
**2. Se você não possuir, instale o [Docker Desktop](https://www.docker.com/products/docker-desktop/).**
**3. Configure o Docker Desktop.**
**4. Entre no diretório onde está o repositório clonado.**
**5. Entre na pasta Frontend.**
    ```
    cd ./Frontend
    ```
**6. Crie o arquivo `.env`, na pasta Frontend, com as seguintes variáveis:**
    ```
    VITE_SPENDO_API_URL_BASE= # URL do endpoint do Backend
    ```
**7. Após, volte para a pasta raiz.**
    ```
    cd ..
    ```
**8. Entre na pasta Backend.**
    ```
    cd ./Backend
    ```
**9. Crie o arquivo `.env`, na pasta Backend, com as seguintes variáveis:**
```
API_PORT=           # Porta em que a API deve ser executada
DATABASE_USER=      # Usuário do Banco de Dados
DATABASE_PASSWORD=  # Senha do Banco de Dados
DATABASE=           # Banco de Dados a ser utilizado
DATABASE_HOST=      # Esse é o nome do Host do Banco de Dados
DATABASE_PORT=      # Porta em que o Banco de Dados está exposto
SALT=               # Número de vezes que a senha será criptografada pelo bcrypt
SECRET=             # Senha usada para criptografar o jwt
TEMPORARY_SECRET=   # Senha usada para criptografar o jwt temporário para recuperação de senha
FRONTEND_URL=       # URL base do frontend
SPENDO_EMAIL=       # Email usado para enviar ao usuário o link de recuperação de senha
SPENDO_PASSWORD=    # Código de senha de App do Google. Mais informações em https://support.google.com/accounts/answer/185833?hl=pt-BR.
```
**10. Voltar para a raiz do projeto.**
    ```
    cd ..
    ```
**11. Subir o container no Docker Desktop:**
    ```
    docker compose --env-file ./Frontend/.env --env-file ./Backend/.env up -d
    ```
## Informações adicionais
- Sobre detalhes do **frontend**, como tecnologias, rotas e arquitetura, [clique aqui.](https://github.com/Yasmin-Carloto/Spendo/tree/main/Backend)
- Sobre detalhes do **backend**, como tecnologias, rotas e arquitetura, [clique aqui.](https://github.com/Yasmin-Carloto/Spendo/tree/main/Frontend)