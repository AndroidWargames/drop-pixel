FROM node:18-alpine as builder

WORKDIR /usr/app

COPY . .
RUN yarn install

CMD ["npm", "start"]
