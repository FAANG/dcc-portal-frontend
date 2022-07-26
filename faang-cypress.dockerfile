# base image
FROM cypress/browsers:node14.17.6-chrome100-ff98

# set working directory
RUN mkdir /app
WORKDIR /app

# install cypress
RUN npm install cypress@9.6.0

# copy cypress files and folders
COPY cypress /app/cypress
COPY cypress.json /app/cypress.json

# confirm the cypress install
RUN ./node_modules/.bin/cypress verify
