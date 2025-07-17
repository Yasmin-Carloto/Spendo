FROM node:22

ARG API_PORT
WORKDIR /back

COPY package*.json .
RUN npm install

COPY . .
RUN npm install sequelize-cli

EXPOSE ${API_PORT}

CMD ["sh", "-c", "npx sequelize-cli db:migrate && npm run dev"]
