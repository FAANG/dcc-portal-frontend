# Stage 1: Build the Angular SSR application
FROM node:20-bullseye AS build

# Install Google Chrome for headless testing
RUN apt-get update && apt-get install -y wget gnupg2
RUN wget -qO - https://dl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /usr/share/keyrings/google-chrome-keyring.gpg
RUN echo "deb [signed-by=/usr/share/keyrings/google-chrome-keyring.gpg] http://dl.google.com/linux/chrome/deb/ stable main" \
    > /etc/apt/sources.list.d/google-chrome.list
RUN apt-get update && apt-get install -y google-chrome-stable

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Angular application with SSR
RUN npm run build:ssr && mv dist/dcc-portal-frontend-ssr/browser/index.csr.html dist/dcc-portal-frontend-ssr/browser/index.html


# Stage 2: Serve with NGINX
FROM nginx:latest AS server

# Copy built Angular app to NGINX HTML directory
COPY --from=build /app/dist/dcc-portal-frontend-ssr/browser /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf


# Expose port 80 for the NGINX server
EXPOSE 8080

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
