# Build stage
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all files
COPY . .

# Set build-time environment variables with defaults
ARG VITE_HA_URL
ARG VITE_HA_PORT
ARG VITE_HA_TOKEN
ENV VITE_HA_URL=${VITE_HA_URL}
ENV VITE_HA_PORT=${VITE_HA_PORT}
ENV VITE_HA_TOKEN=${VITE_HA_TOKEN}

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Install envsubst
RUN apk add --no-cache gettext

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration template
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Set runtime environment variables with defaults
ENV HOME_ASSISTANT_URL=http://192.168.1.150 \
    HOME_ASSISTANT_PORT=8123 \
    DOCKER_HOST_IP=localhost

# Expose port 3007
EXPOSE 3007

# Use shell script to substitute environment variables and start nginx
CMD ["/bin/sh", "-c", "envsubst '${HOME_ASSISTANT_URL} ${HOME_ASSISTANT_PORT} ${DOCKER_HOST_IP}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
