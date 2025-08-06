# Deploy Test Upload Centre to Vercel

## Prerequisites
- Vercel account (free at https://vercel.com)
- Vercel CLI installed (already done)

## Deployment Steps

### Option 1: Using Vercel CLI (Recommended)

1. **Login to Vercel:**
   ```bash
   vercel login
   ```

2. **Deploy the app:**
   ```bash
   vercel --prod
   ```

3. **Follow the prompts:**
   - Link to existing project? → No
   - What's your project's name? → test-upload-centre (or your preferred name)
   - In which directory is your code located? → ./
   - Want to override the settings? → No

### Option 2: Using Git Integration

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Test Upload Centre"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Import to Vercel:**
   - Go to https://vercel.com/dashboard
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect React settings

## Configuration Files Created

- ✅ `vercel.json` - Vercel deployment configuration
- ✅ `.gitignore` - Git ignore rules
- ✅ `.vercelignore` - Vercel ignore rules
- ✅ Build tested successfully

## Expected Result

Your app will be deployed to a URL like:
`https://test-upload-centre-xyz.vercel.app`

## Features Available in Production

- ✅ External Dashboard (default view)
- ✅ Internal Dashboard (admin view)
- ✅ File Upload Modal
- ✅ User & Role Management
- ✅ Audit Logging
- ✅ Responsive Design
- ✅ All mock data and functionality

## Troubleshooting

If you encounter issues:

1. **Build fails:** Check the build output for errors
2. **Routing issues:** The `vercel.json` handles SPA routing
3. **Assets not loading:** Check the public folder structure

## Post-Deployment

After successful deployment:
- Test all dashboard features
- Verify responsive design on mobile
- Check console for any errors
- Share the live URL!

---

**Note:** This is a frontend-only app with mock data. For production use with real backend, you'll need to integrate with APIs for authentication, file storage, and data persistence.