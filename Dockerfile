#####################################################################
#                                                                   #
# DOCKERFILE                                                        #
# ----------                                                        #
#                                                                   #
# Purpose: Docker definition for nova-api.                          #
#                                                                   #
# Author:  Nova Admin <admin@nova.eco>                              #
#                                                                   #
# Date:    27th November 2025                                       #
#                                                                   #
#####################################################################

#####################################################################
#                                                                   #
# STAGE 1: Build                                                    #
#                                                                   #
#####################################################################

FROM node:20-alpine AS builder

# Build arguments from .env
ARG NOVA_API__AUTHOR
ARG NOVA_API__NAME
ARG NOVA_API__PORT

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

#####################################################################
#                                                                   #
# STAGE 2: Production                                               #
#                                                                   #
#####################################################################

FROM node:20-alpine

# Build arguments from .env
ARG NOVA_API__AUTHOR
ARG NOVA_API__NAME
ARG NOVA_API__PORT
ARG API_NAME
ARG API_PORT

# Environment variables for runtime
ENV API_NAME=${API_NAME}
ENV API_PORT=${API_PORT:-3000}

# Labels
LABEL authors=${NOVA_API__AUTHOR}
LABEL name=${NOVA_API__NAME}

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production deps
RUN npm ci

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

# Create non-root user
RUN addgroup -g 1001 -S nodejs \
  && adduser -S nodejs -u 1001

# Change ownership
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose port from environment variable
EXPOSE ${API_PORT}

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
  CMD node -e "require('http').get('http://localhost:${API_PORT}/healthcheck', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application
CMD ["node", "dist/index.js"]
