#!/bin/bash

instructions() {
  echo "to use:"
  echo "./build -d to build dev environment"
  echo "./build -d to build prod container"
  exit
}

build_dev() {
  docker-compose -f docker-compose.dev.yml build
  exit
}

build_prod() {
  docker-compose build
  exit
}

echo $#
if [[ $# -eq 0 ]]; then
  instructions
else
  while test $# != 0
  do
    case "$1" in
      -d) build_dev ;;
      -p) build_prod ;;
      *) instructions ;;
    esac
  done
fi


