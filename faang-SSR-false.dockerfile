FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm cache clean --force
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the Angular app using cypress_development configuration
RUN npm run build -- --configuration=cypress_development

# Use nginx to serve the built Angular app
FROM nginx:alpine

# Set the working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static files
RUN rm -rf ./*

# Copy the built Angular files from the previous stage
COPY --from=build /app/dist/dcc-portal-frontend-ssr/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
