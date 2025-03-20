# Stage 1: Build the Angular SSR application
FROM node:20-alpine AS build

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -y google-chrome-stable

WORKDIR /app
COPY package*.json ./
RUN npm cache clean --force
RUN npm install

# copy the rest of the application files
COPY . .

# build the Angular application with SSR
RUN npm run build:ssr

# Stage 2: Runtime - Serve the SSR app
FROM node:20-alpine AS runtime

WORKDIR /app

# Copy built application from the build stage
COPY --from=build /app/dist/dcc-portal-frontend-ssr ./dist

# Expose port 4000 for SSR
EXPOSE 4000

# Start the SSR server
CMD ["node", "dist/server/server.mjs"]

