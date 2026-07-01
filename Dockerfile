# ==========================
# Stage 1 - Build
# ==========================

FROM node:20-slim AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy Prisma schema BEFORE npm install
COPY prisma ./prisma

# Install dependencies
RUN npm ci

# Copy the rest of the project
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build Next.js
RUN npm run build


# ==========================
# Stage 2 - Runtime
# ==========================

FROM node:20-slim

WORKDIR /app

ENV NODE_ENV=production

# Copy built application
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 3000# ==========================
# Stage 1 - Build
# ==========================

FROM node:20-slim AS builder

RUN apt-get update && apt-get install -y openssl

WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy Prisma schema BEFORE npm install
COPY prisma ./prisma

# Install dependencies
RUN npm ci

# Copy the rest of the project
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build Next.js
RUN npm run build


# ==========================
# Stage 2 - Runtime
# ==========================

FROM node:20-slim

RUN apt-get update && apt-get install -y openssl

WORKDIR /app

ENV NODE_ENV=production

# Copy built application
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 3000

CMD ["npm", "start"]

CMD ["npm", "start"]