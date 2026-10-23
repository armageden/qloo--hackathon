FROM node:22-alpine

WORKDIR /app

COPY package.json ./
COPY src/ ./src/
COPY public/ ./public/
COPY server.js cli.js test.js LICENSE README.md ./

EXPOSE 3000

ENV PORT=3000
ENV NODE_ENV=production

CMD ["node", "server.js"]
