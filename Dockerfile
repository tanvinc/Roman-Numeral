FROM node:15.8-alpine3.10

COPY . ./

RUN npm install
RUN npm run lint
RUN npm test

WORKDIR ./

EXPOSE 8080

CMD ["npm", "start"]