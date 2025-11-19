FROM node:24-alpine AS builder

LABEL org.opencontainers.image.source=https://github.com/PrivateButts/choreboard

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "build"]