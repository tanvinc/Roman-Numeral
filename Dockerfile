FROM node:15.8-alpine3.10

ENV PORT=8080
ENV DATADOG_API_KEY=<YOUR_API_KEY>

COPY src ./src
COPY package.json .

RUN npm install
RUN npm run lint
RUN npm test

WORKDIR ./src

EXPOSE 8880

CMD ["npm", "start"]