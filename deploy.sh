#!/usr/bin/env bash

set -e
set -x

mkdir -p DEPLOY/src
cp package.json DEPLOY
cp src/* DEPLOY/src
cp client-secrets.json DEPLOY
cd DEPLOY
gcloud beta functions deploy --memory 128 catFinder --stage-bucket skillful-gizmo-178609-function-stage --trigger-bucket=catfinder-skillfull-gizmo-178609
cd ..
rm -rf DEPLOY