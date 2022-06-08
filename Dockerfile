FROM node:18-alpine

USER root

ENV MYSQL_HOST=mysql-server

ENV MYSQL_USER=root

ENV MYSQL_PASSWORD=12345

ENV MYSQL_DB=playwithdocker

RUN npm install -g nodemon

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

# use npm scripts
CMD [ "npm", "run", "dev" ]
