FROM node:18-alpine

USER root

ENV MYSQL_HOST=mysql-server

ENV MYSQL_USER=root

ENV MYSQL_PASSWORD=12345

ENV MYSQL_DB=playwithdocker

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --${NODE_ENV}

COPY . .

CMD [ "node", "server.js" ]
