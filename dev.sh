#!/bin/bash

APP=email
instructions() {
  echo "to use:"
  echo "./dev.sh -u to bring up dev environment"
  echo "./dev.sh -d to stop dev environment"
  exit
}

dev_up() {
  if [ $(docker ps | grep -c $APP) = 0 ]; then
    docker-compose -f docker-compose.dev.yml run --rm --service-ports --name $APP -T -d $APP
  fi
  docker exec -it $APP ash
  exit
}

dev_down() {
  docker-compose -f docker-compose.dev.yml down
  exit
}

if [[ $# -eq 0 ]]; then
  instructions
else
  while test $# != 0
  do
    case "$1" in
      -u) dev_up ;;
      -d) dev_down ;;
      *) instructions ;;
    esac
  done
fi


