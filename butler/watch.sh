#!/usr/bin/env bash

## BUTLER
## description: Bundles JS/asset files, starts web server and watches changes for development.
## category: developmentworkflow
## context: project
## help_start
## help_stop


cd ~/Documents/butler/$BUTLER_PROJECT
npm install
npm start
