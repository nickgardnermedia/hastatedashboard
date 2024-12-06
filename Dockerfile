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

# Set environment variables with defaults
ENV HOME_ASSISTANT_URL=http://homeassistant.local \
    HOME_ASSISTANT_PORT=8123

# Expose port 3007
EXPOSE 3007

# Use shell script to substitute environment variables and start nginx
CMD ["/bin/sh", "-c", "envsubst '${HOME_ASSISTANT_URL} ${HOME_ASSISTANT_PORT}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
