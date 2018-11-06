#!/bin/sh

URL=$1
REPO=$2
cd gitDirectories && git clone $URL $REPO 
OUT=$?
if [ $OUT -eq 0 ]
then
   echo "git clone successful"
    cd $REPO
    dockerFile="docker-compose.yml"
    if [ -f $dockerFile ]
    then
          docker-compose up --build 
          exit 0;
    else 
      echo "docker-compose.yml file not found"
      file="Dockerfile"
      if [ -f $file ]
      then
        echo "$file found"
        docker build -t $REPO:0.1 .
        exit 0;
      else
        echo "$file not found."
        exit 1;
    fi
  fi
else
    exit 1;
fi
