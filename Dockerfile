FROM node:22-alpine AS buider

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build