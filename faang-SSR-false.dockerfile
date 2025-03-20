# Stage 1: Build Angular App
FROM node:20-bullseye as build

# Install Chrome for Cypress
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update && apt-get install -y google-chrome-stable

WORKDIR /app

# Copy package files separately to leverage Docker caching
COPY package.json package-lock.json /app/

# Clean npm cache and install dependencies
RUN npm cache clean --force \
    && npm install --legacy-peer-deps

# Copy full source code after installing dependencies
COPY ./ /app/

ARG configuration=cypress_development

# Run Angular Build (ensure correct path)
RUN npm run build --configuration=$configuration

# Stage 2: Serve with Nginx
FROM nginx:1.15

# Copy compiled Angular build to Nginx directory
COPY --from=build /app/dist/dcc-portal-frontend-ssr /usr/share/nginx/html

# Copy custom Nginx config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080


