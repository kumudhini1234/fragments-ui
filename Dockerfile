# ==================== Stage 0: Install Dependencies ====================
FROM node:22.14.0@sha256:f6b9c31ace05502dd98ef777aaa20464362435dcc5e312b0e213121dcf7d8b95 AS dependencies

WORKDIR /app

# Copy package files to leverage caching, then install production dependencies
COPY package.json package-lock.json ./
RUN npm install


# ==================== Stage 1: Build ====================
FROM node:22.14.0-alpine3.21@sha256:9bef0ef1e268f60627da9ba7d7605e8831d5b56ad07487d24d1aa386336d1944 AS build

WORKDIR /app

# Copy dependencies and package files from the previous stage
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .



# Build the application
RUN npm run build

# ==================== Stage 2: Production Image ====================
FROM nginx:1.21.6-alpine

WORKDIR /usr/share/nginx/html

# Copy built files from the previous stage
COPY --from=build /app/dist .
COPY .env .env
# Expose the application port
EXPOSE 1234

# Start nginx
CMD ["nginx", "-g", "daemon off;"]