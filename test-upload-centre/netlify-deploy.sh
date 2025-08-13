#!/bin/bash

# HMCTS Test Upload Centre - Netlify Deployment Script
echo "🚀 Deploying HMCTS Test Upload Centre to Netlify..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building the application..."
npm run build

# Check if build was successful
if [ ! -d "build" ]; then
    echo "❌ Error: Build failed. Check the build output above."
    exit 1
fi

echo "✅ Build completed successfully!"

# Check if Netlify CLI is available
if command -v netlify &> /dev/null; then
    echo "🌐 Netlify CLI found. Deploying..."
    netlify deploy --prod --dir=build
else
    echo "📋 Netlify CLI not found. Installing..."
    npm install -g netlify-cli
    echo "🌐 Deploying to Netlify..."
    netlify deploy --prod --dir=build
fi

echo ""
echo "🎉 Deployment completed!"
echo "📁 Your build files are ready in the 'build' directory"
echo ""
echo "📋 Manual Netlify Deployment Steps:"
echo "1. Go to https://app.netlify.com/"
echo "2. Click 'Add new site' → 'Deploy manually'"
echo "3. Drag and drop the 'build' folder"
echo "4. Your site will be live instantly!"
echo ""
echo "🔗 Your site URL will be provided after deployment"