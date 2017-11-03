#!/usr/bin/env bash

set -e
set -x

mkdir -p DEPLOY/src
cp package.json DEPLOY
cp src/* DEPLOY/src
cp client-secrets.json DEPLOY
cd DEPLOY
gcloud beta functions deploy --memory 128 catFinder --stage-bucket function-deploy-stage-1 --trigger-bucket=catfinder-image-bucket-1
cd ..
rm -rf DEPLOY

