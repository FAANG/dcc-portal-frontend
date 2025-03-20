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
RUN npm run build:ssr

# Stage 2: Runtime - Serve the SSR app
FROM node:20-bullseye AS runtime

WORKDIR /app

# Copy built application from the build stage
COPY --from=build /app/dist/dcc-portal-frontend-ssr ./dist

# Expose port 4000 for SSR
EXPOSE 4000

# Start the SSR server
CMD ["node", "dist/server/server.mjs"]
