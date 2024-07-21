# Stage 1: Build the Angular application
FROM node:latest AS build

# Set the working directory
WORKDIR /app

# Install Angular CLI
RUN npm install -g @angular/cli

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the Angular app in production mode
RUN npm run build --configuration prod

# Stage 2: Serve the Angular application using Nginx
FROM nginx:alpine

COPY --from=build /app/dist/kanji-master/ /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration file if you have one
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]