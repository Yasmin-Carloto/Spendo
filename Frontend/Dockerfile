FROM node:22

WORKDIR /front

COPY package.json package-lock.json ./
# COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev"]
