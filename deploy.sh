#!/bin/bash
set -e

# ensure required variables are provided
IMAGE=$1
TAG=$2

if [ -z "$IMAGE" ] || [ -z "$TAG" ]; then
  echo "Usage: $0 <image> <tag>"
  exit 1
fi

# environment: "dev" or "prod"
DEPLOY_ENV=${DEPLOY_ENV:-dev}  # fallback to "dev"

# set cert paths based on environment
CERT_KEY_PATH="/data/certs/pfas-app-${DEPLOY_ENV}_renci_unc_edu.key"
CERT_CER_PATH="/data/certs/pfas-app-${DEPLOY_ENV}_renci_unc_edu.cer"

# ensure cert files exist
if [ ! -f "$CERT_KEY_PATH" ] || [ ! -f "$CERT_CER_PATH" ]; then
  echo "Cert files not found: $CERT_KEY_PATH or $CERT_CER_PATH"
  exit 1
fi

# pull image, stop and remove running container
docker pull $IMAGE:$TAG
docker stop opal-ui || true

# start new container
docker run -d \
  --restart unless-stopped \
  -p 80:80 -p 443:443 \
  -v $CERT_KEY_PATH:/ssl.key \
  -v $CERT_CER_PATH:/ssl.cer \
  --name opal-ui $IMAGE:$TAG
