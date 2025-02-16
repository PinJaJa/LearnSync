#!/bin/bash

# Remove existing build artifacts and dependencies
rm -rf .next node_modules

# Install dependencies
npm install

# Build the application
npm run build