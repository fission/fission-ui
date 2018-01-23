#!/bin/bash

set -e

user=$1
tag=$2
if [ -z "$user" ]
then
    user=fission
fi
if [ -z "$tag" ]
then
    tag=latest
fi

docker build -t fission-ui -f docker/Dockerfile .
docker tag fission-ui $user/fission-ui:$tag
docker push $user/fission-ui:$tag
