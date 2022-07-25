#!/bin/bash
#readonly service="$1"
#readonly project_id="$2"
#
#docker build -t "gcr.io/$project_id/$service" "./internal" -f "./docker/app-prod/Dockerfile" --build-arg "SERVICE=$service"
#docker push "gcr.io/$project_id/$service"


docker-compose run cypress ./node_modules/.bin/cypress run --config baseUrl=http://127.0.0.1 --browser chrome
