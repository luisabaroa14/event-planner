
# Stage 1: Build the application with Vite
FROM node:16 as build-stage

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application with NGINX
FROM nginx:stable-alpine as production-stage

# Copy the build output to the NGINX html directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose the port that NGINX will serve on
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]