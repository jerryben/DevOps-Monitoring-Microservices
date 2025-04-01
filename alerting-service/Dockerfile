FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --only=production

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
