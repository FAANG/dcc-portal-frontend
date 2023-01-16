FROM node:16.14.0 as build

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -y google-chrome-stable

WORKDIR /source

# Copy the package lock file into the container
COPY package*.json ./
# Run ci only for the production dependencies
RUN npm ci

# Copy the rest of the files into the container and build
COPY . .
RUN npm run build --prod

FROM nginx:alpine
COPY --from=build /source/dist/faang-portal-frontend-angular6-second /usr/share/nginx/html
COPY --from=build /source/nginx.conf /etc/nginx/conf.d/
EXPOSE 8080
