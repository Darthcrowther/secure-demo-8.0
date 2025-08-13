#!/bin/bash

echo "🚀 HMCTS Test Upload Centre - Netlify Deployment"
echo "================================================"

# Build the application
echo "📦 Building application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎯 DEPLOYMENT READY!"
    echo "===================="
    echo ""
    echo "📋 Next Steps:"
    echo "1. Go to: https://app.netlify.com/"
    echo "2. Click 'Add new site' → 'Deploy manually'"
    echo "3. Drag and drop the 'build' folder"
    echo "4. Your site will be live in 30 seconds!"
    echo ""
    echo "📁 Files ready for deployment:"
    echo "- build/ (main deployment folder)"
    echo "- hmcts-upload-centre-deploy.zip (alternative)"
    echo ""
    echo "🔗 Your Netlify URL will be provided after deployment"
    echo ""
    echo "📖 For detailed instructions, see: NETLIFY_DEPLOYMENT.md"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi