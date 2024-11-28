FROM node:20-slim

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files
COPY frontend/package*.json ./
COPY frontend/pnpm-lock.yaml ./

# Install dependencies with frozen lockfile for reliability
RUN pnpm install --frozen-lockfile

# Copy the rest of the frontend files
COPY frontend/ .

EXPOSE 5173

ENV NODE_ENV=development
ENV HOST=0.0.0.0
ENV PORT=5173
ENV VITE_API_URL=http://backend:8000

# Start development server with host flag
CMD ["pnpm", "run", "dev", "--host", "0.0.0.0", "--port", "5173"]
