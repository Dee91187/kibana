#!/bin/bash

set -euo pipefail

SOURCE_IMAGE_OR_TAG=$1

source .buildkite/scripts/common/util.sh

BASE_ESS_REPO=docker.elastic.co/elasticsearch/elasticsearch
TARGET_IMAGE=docker.elastic.co/kibana-ci/elasticsearch-serverless:latest_verified

echo "--- Promoting ${SOURCE_IMAGE_OR_TAG} to ':latest_verified'"

if [[ $SOURCE_IMAGE_OR_TAG =~ :[a-zA-Z_-]+$ ]]; then
  # $SOURCE_IMAGE_OR_TAG was a full image
  SOURCE_IMAGE=$SOURCE_IMAGE_OR_TAG
else
  # $SOURCE_IMAGE_OR_TAG was an image tag
  SOURCE_IMAGE="$BASE_ESS_REPO:$SOURCE_IMAGE_OR_TAG"
fi

echo "Re-tagging $SOURCE_IMAGE -> $TARGET_IMAGE"

echo "$KIBANA_DOCKER_PASSWORD" | docker login -u "$KIBANA_DOCKER_USERNAME" --password-stdin docker.elastic.co

docker pull "$SOURCE_IMAGE"

docker tag "$SOURCE_IMAGE" "$TARGET_IMAGE"

docker push "$TARGET_IMAGE"

docker logout docker.elastic.co

echo "Promotion successful! Henceforth, thou shall be named Sir $TARGET_IMAGE"
