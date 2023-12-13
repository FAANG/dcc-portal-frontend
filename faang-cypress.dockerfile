# base image
FROM cypress/browsers:node14.17.6-chrome100-ff98

# set working directory
RUN mkdir /app
WORKDIR /app

# install cypress
RUN npm install cypress@13.6.1
RUN npm install typescript@5.2.2

# copy cypress files and folders
COPY cypress /app/cypress
COPY cypress.config.ts /app/cypress.config.ts

# confirm the cypress install
RUN ./node_modules/.bin/cypress verify
