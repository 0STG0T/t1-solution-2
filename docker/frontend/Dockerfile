FROM node:20-slim

WORKDIR /app

COPY frontend/package*.json ./
COPY frontend/pnpm-lock.yaml ./

RUN npm install -g pnpm && \
    pnpm install

COPY frontend/ .

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "preview", "--host"]
