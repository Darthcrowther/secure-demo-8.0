# HMCTS Test Upload Centre - Deployment Guide

## 🚀 Quick Start

The application is now ready for deployment! Here are your options:

### Option 1: Vercel (Recommended - Free)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

4. **Follow the prompts**:
   - Link to existing project? → No
   - Project name? → test-upload-centre (or your preferred name)
   - Directory? → ./
   - Override settings? → No

### Option 2: Netlify (Free)

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Deploy**:
   - Go to https://app.netlify.com/
   - Drag and drop the `build` folder
   - Your site will be live instantly!

### Option 3: GitHub Pages

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/docs" folder
   - Add `"homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME"` to package.json

### Option 4: Local Testing

1. **Install serve**:
   ```bash
   npm install -g serve
   ```

2. **Run locally**:
   ```bash
   serve -s build -l 3000
   ```

3. **Access at**: http://localhost:3000

## 📋 Application Features

Once deployed, your application will include:

- ✅ **External Dashboard** - Public-facing interface
- ✅ **Internal Dashboard** - Admin interface with advanced features
- ✅ **File Upload Modal** - Secure document upload functionality
- ✅ **User & Role Management** - RBAC (Role-Based Access Control)
- ✅ **Audit Logging** - Complete activity tracking
- ✅ **Responsive Design** - Works on all devices
- ✅ **HMCTS Styling** - Official government design system

## 🔧 Configuration

### Environment Variables
Currently, the application uses mock data and doesn't require any environment variables.

### Customization
- Edit `src/App.jsx` to modify the default user settings
- Update `src/components/` for UI changes
- Modify `src/index.css` for styling changes

## 🛠️ Troubleshooting

### Build Issues
- Ensure Node.js version 14+ is installed
- Run `npm install` to install dependencies
- Check for any linting errors in the console

### Deployment Issues
- **Vercel**: Check the deployment logs in the Vercel dashboard
- **Netlify**: Check the deploy logs in the Netlify dashboard
- **GitHub Pages**: Ensure the repository is public or you have GitHub Pro

### Runtime Issues
- Check browser console for JavaScript errors
- Ensure all static assets are loading correctly
- Verify the build folder contains all necessary files

## 📞 Support

If you encounter any issues:

1. Check the browser console for errors
2. Verify all dependencies are installed
3. Ensure the build process completes successfully
4. Check the deployment platform's logs

## 🎯 Next Steps

After successful deployment:

1. **Test all features**:
   - Switch between Internal/External views
   - Test file upload functionality
   - Verify responsive design on mobile
   - Check audit logging

2. **Customize for production**:
   - Replace mock data with real API calls
   - Implement proper authentication
   - Add real file storage (AWS S3, etc.)
   - Configure proper CORS settings

3. **Security considerations**:
   - Implement proper authentication
   - Add HTTPS enforcement
   - Configure security headers
   - Set up proper CORS policies

---

**Note**: This is a frontend-only application with mock data. For production use, you'll need to integrate with backend services for authentication, file storage, and data persistence.