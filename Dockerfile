FROM node:20-bookworm-slim

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/
COPY packages/shared-types/package*.json ./packages/shared-types/

RUN npm install --include=dev --ignore-scripts

COPY backend/prisma/schema.prisma ./backend/prisma/schema.prisma

COPY . .

RUN npm run prisma:generate --workspace=backend

RUN npm run build --workspace=frontend
RUN npm run build --workspace=backend

RUN mkdir -p backend/public && cp -r frontend/dist/* backend/public/

EXPOSE 3000
CMD sh -c "npm run prisma:migrate --workspace=backend && npm run prisma:seed --workspace=backend && npm start --workspace=backend"
