FROM node:11-alpine

WORKDIR /ui

COPY package.json ./

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
