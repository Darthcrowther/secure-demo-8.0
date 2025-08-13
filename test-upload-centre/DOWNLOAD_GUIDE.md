# 📥 Download Guide - HMCTS Test Upload Centre

## 🎯 Available Download Packages

### 1. **Complete Deployment Package** (Recommended)
**File**: `hmcts-upload-centre-complete.tar.gz` (183K)
**Contents**:
- ✅ `build/` - Complete production build
- ✅ `netlify.toml` - Netlify configuration
- ✅ `NETLIFY_DEPLOYMENT.md` - Deployment instructions
- ✅ `BUILD_OVERVIEW.md` - Build documentation
- ✅ `deploy-netlify.sh` - Deployment script

### 2. **Build Only Package**
**File**: `hmcts-upload-centre-deploy.zip` (180K)
**Contents**:
- ✅ `build/` - Production-ready files only

### 3. **Individual Files**
**Location**: `/workspace/test-upload-centre/`

#### Essential Files:
- `build/` - Complete build directory (660K)
- `netlify.toml` - Netlify configuration (481 bytes)
- `NETLIFY_DEPLOYMENT.md` - Deployment guide (4.3K)
- `BUILD_OVERVIEW.md` - Build documentation (8.2K)

#### Deployment Scripts:
- `deploy-netlify.sh` - Netlify deployment script (1.4K)
- `deploy.sh` - General deployment script (1.6K)
- `deploy-netlify.sh` - Quick Netlify deployment (976 bytes)

## 🚀 How to Download

### Option 1: From Your Workspace
1. **Navigate to**: `/workspace/test-upload-centre/`
2. **Download the complete package**:
   ```bash
   # Copy the complete package
   cp hmcts-upload-centre-complete.tar.gz /your/download/path/
   
   # Or extract it
   tar -xzf hmcts-upload-centre-complete.tar.gz
   ```

### Option 2: Individual Files
```bash
# Copy the build directory
cp -r build/ /your/download/path/

# Copy configuration files
cp netlify.toml /your/download/path/
cp NETLIFY_DEPLOYMENT.md /your/download/path/
```

### Option 3: Create Your Own Package
```bash
# Create a new package with your preferred files
tar -czf my-deployment-package.tar.gz build/ netlify.toml *.md

# Or create a ZIP file
zip -r my-deployment-package.zip build/ netlify.toml *.md
```

## 📋 Package Contents Breakdown

### `hmcts-upload-centre-complete.tar.gz` (183K)
```
hmcts-upload-centre-complete/
├── build/
│   ├── index.html
│   ├── asset-manifest.json
│   └── static/
│       ├── css/main.2edacbef.css
│       ├── css/main.2edacbef.css.map
│       ├── js/main.494e2432.js
│       ├── js/main.494e2432.js.map
│       └── js/main.494e2432.js.LICENSE.txt
├── netlify.toml
├── NETLIFY_DEPLOYMENT.md
├── BUILD_OVERVIEW.md
└── deploy-netlify.sh
```

### `hmcts-upload-centre-deploy.zip` (180K)
```
build/
├── index.html
├── asset-manifest.json
└── static/
    ├── css/
    └── js/
```

## 🎯 Recommended Download Strategy

### For Netlify Deployment:
1. **Download**: `hmcts-upload-centre-complete.tar.gz`
2. **Extract**: `tar -xzf hmcts-upload-centre-complete.tar.gz`
3. **Deploy**: Drag the `build/` folder to Netlify

### For Other Hosting:
1. **Download**: `hmcts-upload-centre-deploy.zip`
2. **Extract**: Unzip the file
3. **Upload**: Upload the `build/` contents to your hosting service

## 📊 File Sizes Summary

| File | Size | Purpose |
|------|------|---------|
| `hmcts-upload-centre-complete.tar.gz` | 183K | Complete deployment package |
| `hmcts-upload-centre-deploy.zip` | 180K | Build files only |
| `build/` directory | 660K | Production build |
| `netlify.toml` | 481 bytes | Netlify configuration |
| `NETLIFY_DEPLOYMENT.md` | 4.3K | Deployment instructions |

## 🔧 After Download

### Extract the Package:
```bash
tar -xzf hmcts-upload-centre-complete.tar.gz
cd hmcts-upload-centre-complete
```

### Deploy to Netlify:
1. Go to https://app.netlify.com/
2. Click "Add new site" → "Deploy manually"
3. Drag the `build/` folder
4. Your site will be live in 30 seconds!

## 📞 Support

If you need help with the download or deployment:
1. Check the `NETLIFY_DEPLOYMENT.md` file for detailed instructions
2. Review `BUILD_OVERVIEW.md` for build information
3. Use the deployment scripts for automated deployment

---

**Ready to download and deploy your HMCTS Test Upload Centre!**