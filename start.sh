#!/bin/bash
cd /opt/render/project/src
if [ ! -d "node_modules" ]; then
  npm install --production
fi
node server.js
