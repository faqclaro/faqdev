FROM node:20-alpine AS builder
WORKDIR /usr/src/app
COPY . .


EXPOSE 3000

CMD ["npm","run","start"]
