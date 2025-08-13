#!/bin/bash

# HMCTS Test Upload Centre Deployment Script
echo "🚀 Deploying HMCTS Test Upload Centre..."

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

# Check if Vercel CLI is available
if command -v vercel &> /dev/null; then
    echo "🌐 Vercel CLI found. You can deploy to Vercel with:"
    echo "   vercel --prod"
    echo ""
    echo "   Or follow these steps:"
    echo "   1. vercel login"
    echo "   2. vercel --prod"
else
    echo "📋 Vercel CLI not found. To install:"
    echo "   npm install -g vercel"
fi

echo ""
echo "🎯 Alternative deployment options:"
echo ""
echo "1. Netlify:"
echo "   - Drag and drop the 'build' folder to https://app.netlify.com/"
echo ""
echo "2. GitHub Pages:"
echo "   - Push to GitHub and enable GitHub Pages"
echo ""
echo "3. Local testing:"
echo "   npm install -g serve"
echo "   serve -s build -l 3000"
echo ""
echo "4. Manual deployment:"
echo "   - Upload the contents of the 'build' folder to any static hosting service"
echo ""
echo "✅ Application is ready for deployment!"
echo "📁 Build files are in the 'build' directory"