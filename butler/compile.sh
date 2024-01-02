#!/usr/bin/env bash

## BUTLER
## description: Bundles JavaScript and asset files for production use.
## category: developmentworkflow
## context: project
## help_start
## help_stop


cd ~/Documents/butler/$BUTLER_PROJECT
npm install
npm run build
