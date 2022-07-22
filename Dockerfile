# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
#FROM node:14.17.6 as build-stage
FROM yroochun/faang-node-base as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm cache clean --force
RUN npm install -g npm@latest
COPY ./ /app/
ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15
#Copy ci-dashboard-dist
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
#Copy default nginx configuration
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
