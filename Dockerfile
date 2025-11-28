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
ARG NOVA_API_AUTHOR
ARG NOVA_API_NAME
ARG NOVA_API_PORT

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
ARG NOVA_API_AUTHOR
ARG NOVA_API_SERVICE_NAME
ARG NOVA_API_PORT

# Environment variables for runtime
ENV NOVA_API_SERVICE_NAME=${NOVA_API_SERVICE_NAME}
ENV NOVA_API_PORT=${NOVA_API_PORT:-3000}

# Labels
LABEL authors=${NOVA_API_AUTHOR}
LABEL name=${NOVA_API_NAME}

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
EXPOSE ${NOVA_API_PORT}

# Start the application
CMD ["node", "dist/index.js"]
