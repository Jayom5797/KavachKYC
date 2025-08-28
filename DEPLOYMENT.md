# 🚀 KavachKYC Deployment Guide

Complete step-by-step instructions for deploying KavachKYC with automated CI/CD.

## 📋 Prerequisites

- Google Cloud Platform account with billing enabled
- Firebase account (can use same Google account)
- GitHub repository with KavachKYC code
- Domain name (optional, for custom domain)

## 🔧 Required API Keys

Before deployment, obtain these API keys:

1. **Google Gemini AI API Key**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create new API key
   - Save for later use

2. **OCR.Space API Key**
   - Visit [OCR.Space](https://ocr.space/ocrapi)
   - Sign up for free account
   - Get API key from dashboard

## 🏗️ Backend Deployment (Google Cloud Run)

### Step 1: Setup Google Cloud Project

```bash
# Install Google Cloud CLI if not already installed
# Visit: https://cloud.google.com/sdk/docs/install

# Login and create project
gcloud auth login
gcloud projects create kavachkyc-project --name="KavachKYC"
gcloud config set project kavachkyc-project

# Enable required APIs
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

### Step 2: Configure Cloud Build Trigger

1. **Go to Cloud Build Console**
   - Visit: https://console.cloud.google.com/cloud-build/triggers
   - Select your project: `kavachkyc-project`

2. **Create Trigger**
   - Click "Create Trigger"
   - Name: `deploy-backend`
   - Event: Push to a branch
   - Source: Connect your GitHub repository
   - Branch: `^main$`
   - Configuration: Cloud Build configuration file
   - Location: `backend/cloudbuild.yaml`

3. **Set Environment Variables**
   - In Cloud Build settings, add substitution variables:
   - `_OCR_SPACE_API_KEY`: Your OCR.Space API key
   - `_GOOGLE_GEMINI_API_KEY`: Your Gemini API key

### Step 3: Deploy Backend Manually (First Time)

```bash
# Navigate to backend directory
cd backend

# Build and deploy
gcloud builds submit --tag gcr.io/kavachkyc-project/kavachkyc-backend
gcloud run deploy kavachkyc-backend \
  --image gcr.io/kavachkyc-project/kavachkyc-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080 \
  --set-env-vars NODE_ENV=production,OCR_SPACE_API_KEY=your_key,GOOGLE_GEMINI_API_KEY=your_key
```

### Step 4: Get Backend URL

After deployment, note the Cloud Run URL:
```
https://kavachkyc-backend-xxxxxxxxxx-uc.a.run.app
```

## 🌐 Frontend Deployment (Firebase Hosting)

### Step 1: Setup Firebase Project

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project root
firebase init hosting
# Select: Use an existing project
# Choose: Create a new project or use existing
# Project ID: kavachkyc-project
# Public directory: frontend/dist
# Single-page app: Yes
# Overwrite index.html: No
```

### Step 2: Update Firebase Configuration

Edit `frontend/.firebaserc`:
```json
{
  "projects": {
    "default": "your-actual-firebase-project-id"
  }
}
```

### Step 3: Configure GitHub Actions Secrets

In your GitHub repository, go to Settings → Secrets and variables → Actions:

1. **VITE_API_BASE_URL**
   ```
   https://kavachkyc-backend-xxxxxxxxxx-uc.a.run.app
   ```

2. **FIREBASE_SERVICE_ACCOUNT_KAVACHKYC_PROJECT**
   - Go to Firebase Console → Project Settings → Service Accounts
   - Generate new private key
   - Copy entire JSON content as secret value

### Step 4: Deploy Frontend Manually (First Time)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Build with production API URL
VITE_API_BASE_URL=https://your-cloud-run-url npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

## 🔄 Automated CI/CD Setup

Once initial setup is complete, automated deployments work as follows:

### Backend Auto-Deployment
- **Trigger**: Push to `main` branch with changes in `backend/` folder
- **Process**: Cloud Build → Container Registry → Cloud Run
- **Result**: Backend automatically updates with zero downtime

### Frontend Auto-Deployment
- **Trigger**: Push to `main` branch with changes in `frontend/` folder
- **Process**: GitHub Actions → Build → Firebase Hosting
- **Result**: Frontend automatically updates with global CDN

## 🔗 Environment Integration

### Production Environment Variables

**Backend (Cloud Run)**
```env
NODE_ENV=production
PORT=8080
OCR_SPACE_API_KEY=your_ocr_space_key
GOOGLE_GEMINI_API_KEY=your_gemini_key
```

**Frontend (Build-time)**
```env
VITE_API_BASE_URL=https://kavachkyc-backend-xxxxxxxxxx-uc.a.run.app
```

### Local Development
```bash
# Backend
cd backend
cp .env.example .env
# Edit .env with your API keys
npm run dev

# Frontend
cd frontend
cp .env.example .env
# Edit .env with local backend URL
npm run dev
```

## 🔍 Verification Steps

### 1. Test Backend Health
```bash
curl https://your-cloud-run-url/health
# Should return: {"status":"ok","timestamp":"..."}
```

### 2. Test Frontend Build
```bash
cd frontend
npm run build
# Should create dist/ folder without errors
```

### 3. Test Full Integration
1. Visit your Firebase Hosting URL
2. Upload a test document
3. Verify processing works end-to-end
4. Check that data flows from frontend → backend → AI services

## 🚨 Troubleshooting

### Common Issues

**Backend deployment fails:**
- Check Cloud Build logs in GCP Console
- Verify API keys are set correctly
- Ensure billing is enabled on GCP project

**Frontend build fails:**
- Check GitHub Actions logs
- Verify VITE_API_BASE_URL is set correctly
- Ensure Firebase service account key is valid

**CORS errors:**
- Backend CORS is configured for all origins
- If issues persist, check Cloud Run logs

**API calls fail:**
- Verify backend URL in frontend environment
- Check network tab in browser dev tools
- Ensure Cloud Run service allows unauthenticated requests

### Monitoring

**Backend Monitoring:**
- Cloud Run metrics in GCP Console
- Cloud Logging for application logs
- Error Reporting for crash analysis

**Frontend Monitoring:**
- Firebase Hosting analytics
- Browser dev tools for client-side errors
- GitHub Actions logs for deployment issues

## 🔒 Security Considerations

1. **API Keys**: Never commit API keys to repository
2. **Environment Variables**: Use secure secret management
3. **CORS**: Configure appropriately for production domains
4. **Authentication**: Consider adding user authentication for production
5. **Rate Limiting**: Implement API rate limiting for production use

## 💰 Cost Optimization

**Google Cloud Run:**
- Pay per request (free tier: 2M requests/month)
- Auto-scales to zero when not in use
- Memory: 1GB, CPU: 1 vCPU (adjust based on usage)

**Firebase Hosting:**
- Free tier: 10GB storage, 10GB/month transfer
- Global CDN included
- Custom domain support

**API Costs:**
- OCR.Space: Free tier 25,000 requests/month
- Google Gemini: Pay per token usage

## 📊 Monitoring & Analytics

### Production Monitoring Setup

1. **Google Cloud Monitoring**
   ```bash
   # Enable monitoring API
   gcloud services enable monitoring.googleapis.com
   ```

2. **Firebase Analytics**
   - Enable in Firebase Console
   - Track user engagement and performance

3. **Error Tracking**
   - Cloud Error Reporting for backend
   - Firebase Crashlytics for frontend

## 🔄 Deployment Workflow

### Complete Deployment Process

1. **Initial Setup** (One-time)
   - Create GCP and Firebase projects
   - Configure API keys and secrets
   - Set up Cloud Build triggers
   - Configure GitHub Actions

2. **Development Workflow**
   ```bash
   # Make changes to code
   git add .
   git commit -m "Your changes"
   git push origin main
   
   # Automatic deployments trigger:
   # - Backend: Cloud Build → Cloud Run
   # - Frontend: GitHub Actions → Firebase
   ```

3. **Rollback Process**
   - Cloud Run: Use revision management
   - Firebase: Use release history
   - Both support instant rollbacks

## 🎯 Production Checklist

Before going live:

- [ ] API keys configured in production
- [ ] Environment variables set correctly
- [ ] Health checks passing
- [ ] CORS configured for production domain
- [ ] Monitoring and logging enabled
- [ ] Error tracking configured
- [ ] Backup and recovery plan
- [ ] Performance testing completed
- [ ] Security review completed

---

**🎉 Congratulations!** KavachKYC system is now ready for production deployment with full CI/CD automation.