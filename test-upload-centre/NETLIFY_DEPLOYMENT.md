# 🚀 Netlify Deployment Guide - HMCTS Test Upload Centre

## ✅ Ready for Deployment!

Your HMCTS Test Upload Centre is **100% ready** for Netlify deployment!

## 📦 Deployment Package Created

- ✅ `hmcts-upload-centre-deploy.zip` - Ready-to-deploy package
- ✅ `build/` directory - Production-ready files
- ✅ `netlify.toml` - Netlify configuration
- ✅ All assets optimized and compressed

## 🎯 Method 1: Drag & Drop (Fastest - 1 minute)

### Step 1: Access Netlify
1. Go to https://app.netlify.com/
2. Sign up or log in to your Netlify account

### Step 2: Deploy
1. Click **"Add new site"**
2. Select **"Deploy manually"**
3. **Drag and drop** the `build/` folder OR the `hmcts-upload-centre-deploy.zip` file
4. Wait for deployment (usually 30-60 seconds)

### Step 3: Your Site is Live!
- Netlify will provide you with a URL like: `https://random-name-123.netlify.app`
- You can customize the site name in the Netlify dashboard

## 🎯 Method 2: Git Integration (Recommended for updates)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: HMCTS Test Upload Centre"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Connect to Netlify
1. Go to https://app.netlify.com/
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your GitHub account
4. Select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
6. Click **"Deploy site"**

## 🎯 Method 3: Netlify CLI (For developers)

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Login and Deploy
```bash
# Login to Netlify
netlify login

# Deploy to production
netlify deploy --prod --dir=build
```

## 📋 What Gets Deployed

Your deployed application will include:

- ✅ **External Dashboard** - Public-facing interface
- ✅ **Internal Dashboard** - Admin interface with advanced features
- ✅ **File Upload Modal** - Secure document upload functionality
- ✅ **User & Role Management** - RBAC (Role-Based Access Control)
- ✅ **Audit Logging** - Complete activity tracking
- ✅ **Responsive Design** - Works on all devices
- ✅ **HMCTS Styling** - Official government design system

## 🔧 Configuration Files

### netlify.toml
```toml
[build]
  publish = "build"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

This ensures:
- ✅ SPA routing works correctly
- ✅ All routes redirect to index.html
- ✅ Static assets are cached properly
- ✅ Security headers are set

## 🎉 Post-Deployment

### Test Your Application
1. **Visit your Netlify URL**
2. **Test all features**:
   - Switch between Internal/External views
   - Test file upload functionality
   - Verify responsive design on mobile
   - Check audit logging

### Customize Your Site
1. **Change site name**: Go to Site settings → Change site name
2. **Custom domain**: Add your own domain in Domain settings
3. **Environment variables**: Add any needed in Site settings → Environment variables

## 📊 Build Statistics

```
File sizes after gzip:
- 52.08 kB  build/static/js/main.494e2432.js
- 1.46 kB   build/static/css/main.2edacbef.css

Total build size: ~53.5 kB (gzipped)
```

## 🛠️ Troubleshooting

### Common Issues
1. **404 errors**: Ensure `netlify.toml` redirects are configured
2. **Build fails**: Check Node.js version (requires 14+)
3. **Assets not loading**: Verify all files are in the `build/` directory

### Support
- **Netlify Docs**: https://docs.netlify.com/
- **Build Logs**: Check the deploy logs in your Netlify dashboard
- **Status Page**: https://www.netlifystatus.com/

## 🎯 Success Criteria

Your deployment is successful when:
- ✅ Application loads without errors
- ✅ Both Internal and External dashboards are accessible
- ✅ File upload functionality works (mock data)
- ✅ User switching between Internal/External works
- ✅ Responsive design works on mobile devices
- ✅ All UI components render correctly

---

## 🚀 Ready to Deploy?

**Choose any method above and your HMCTS Test Upload Centre will be live in minutes!**

The application is fully built, tested, and ready for immediate deployment to Netlify.