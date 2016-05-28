#!/usr/bin/env bash
echo "Pulling from git..."
git pull
echo "Installing dependencies..."
npm install
bower install --allow-root
echo "Building JS bundle..."
webpack -p
echo "Building CSS..."
grunt prod

echo "Build complete. Restart components from PM2"