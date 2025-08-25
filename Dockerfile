# Dockerfile for Gatsby Development with Ecosystem Integration
# This Dockerfile supports both development and production builds

# Use Node 18 LTS for Gatsby 5 compatibility
FROM node:18-alpine AS base

# First install bash and other tools our scripts need
RUN apk add --no-cache bash jq

# Create a utility script to fix shebangs dynamically
RUN echo '#!/bin/sh' > /usr/local/bin/fix-shebangs.sh && \
    echo '# Fix macOS shebangs for Alpine Linux' >> /usr/local/bin/fix-shebangs.sh && \
    echo 'find "$@" -name "*.sh" -type f | while read -r script; do' >> /usr/local/bin/fix-shebangs.sh && \
    echo '  if head -n1 "$script" | grep -q "^#!/opt/homebrew/bin/bash"; then' >> /usr/local/bin/fix-shebangs.sh && \
    echo '    sed -i "1s|^#!/opt/homebrew/bin/bash|#!/bin/bash|" "$script"' >> /usr/local/bin/fix-shebangs.sh && \
    echo '    echo "Fixed shebang in: $(basename "$script")"' >> /usr/local/bin/fix-shebangs.sh && \
    echo '  fi' >> /usr/local/bin/fix-shebangs.sh && \
    echo 'done' >> /usr/local/bin/fix-shebangs.sh && \
    chmod +x /usr/local/bin/fix-shebangs.sh

# Copy ALL ecosystem scripts to temp directory for initial setup
COPY *.sh /tmp/ecosystem-scripts/
COPY config/tools/*.sh /tmp/ecosystem-scripts/config/tools/

# Fix shebangs for all scripts
RUN /usr/local/bin/fix-shebangs.sh /tmp/ecosystem-scripts

# Make all scripts executable
RUN find /tmp/ecosystem-scripts -name "*.sh" -type f -exec chmod +x {} \;

# Run install-dependencies.sh in automated mode
# This installs all ecosystem dependencies from single source of truth
RUN cd /tmp/ecosystem-scripts && ./install-dependencies.sh --auto --verbose

# Set working directory
WORKDIR /app

# Development stage
FROM base AS development

# Copy package files from src
COPY src/package*.json ./

# Install dependencies with legacy peer deps (required for Decap CMS)
RUN npm install --legacy-peer-deps

# Copy Gatsby configuration files
COPY src/gatsby-*.ts ./
COPY src/gatsby-*.js ./
COPY src/tsconfig.json ./
COPY src/tailwind.config.js ./
COPY src/postcss.config.js ./

# Copy source directories (will be volume mounted in dev)
COPY src/src ./src
COPY src/static ./static

# Create directories for ecosystem mounts
RUN mkdir -p /master_posts /templates /build /output /ecosystem/config/tools

# Copy and prepare ecosystem scripts for runtime use
# These will be available when docker-dev.sh runs serve.sh inside the container
COPY *.sh /ecosystem/
COPY config/tools/*.sh /ecosystem/config/tools/
COPY config/ecosystem-defaults.yml /ecosystem/config/

# Fix shebangs for runtime scripts
RUN /usr/local/bin/fix-shebangs.sh /ecosystem

# Make all runtime scripts executable
RUN find /ecosystem -name "*.sh" -type f -exec chmod +x {} \;

# Install config tools dependencies
WORKDIR /ecosystem/config/tools
COPY config/tools/package*.json ./
RUN npm install

# Go back to app directory
WORKDIR /app

# Expose Gatsby development port
EXPOSE 8000

# Development server with hot reload
CMD ["npm", "run", "develop", "--", "--host", "0.0.0.0"]

# Builder stage for production
FROM base AS builder

# Accept build arguments
ARG WEBSITE_DOMAIN
ARG WEBSITE_IS_BLOG=false
ARG WEBSITE_MODE=PRODUCTION

# Set environment variables for build
ENV WEBSITE_DOMAIN=$WEBSITE_DOMAIN
ENV WEBSITE_IS_BLOG=$WEBSITE_IS_BLOG
ENV WEBSITE_MODE=$WEBSITE_MODE
ENV GATSBY_DOMAIN=$WEBSITE_DOMAIN
ENV GATSBY_IS_BLOG=$WEBSITE_IS_BLOG

# Copy package files
COPY src/package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy all source files
COPY src/gatsby-*.ts ./
COPY src/gatsby-*.js ./
COPY src/tsconfig.json ./
COPY src/tailwind.config.js ./
COPY src/postcss.config.js ./
COPY src/src ./src
COPY src/static ./static

# Create mount points (content will be provided at runtime)
RUN mkdir -p /master_posts /templates /build

# Build the site
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Copy built site from builder
COPY --from=builder /app/public /usr/share/nginx/html

# Copy nginx configuration if needed
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose HTTP port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

# Snapshot stage (for saving development state)
FROM development AS snapshot

# This stage captures the current development state
# Used by docker-save-snapshot.sh
LABEL description="Gatsby development snapshot with all dependencies installed"