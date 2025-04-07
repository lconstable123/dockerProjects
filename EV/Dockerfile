FROM node:22-alpine

WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
ENV PORT=3000
ENV APP_NAME=My Asesome Application"
CMD ["node","src/index.js"]