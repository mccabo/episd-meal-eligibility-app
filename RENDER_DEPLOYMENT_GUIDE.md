# Deploy Backend to Render.com

This guide will help you deploy your `server.js` backend to Render.com, making all your API endpoints accessible from your Firebase-hosted frontend.

## Prerequisites

1. **GitHub Account** - Render deploys from Git repositories
2. **Render Account** - Sign up at [https://render.com](https://render.com) (free)
3. **Firebase Service Account** - For Firebase Admin SDK

## Step 1: Prepare Your Repository

### 1.1 Push to GitHub (if not already done)

```bash
# Initialize git if needed
git init

# Add all files
git add .

# Commit
git commit -m "Prepare for Render deployment"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/mccabo/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### 1.2 Get Firebase Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `freeandreduced-ac6d8`
3. Click the gear icon → **Project Settings**
4. Go to **Service Accounts** tab
5. Click **Generate New Private Key**
6. Download the JSON file (keep it safe, don't commit to Git!)

## Step 2: Deploy to Render

### 2.1 Create New Web Service

1. Go to [https://render.com/dashboard](https://render.com/dashboard)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:

**Settings:**
- **Name**: `episd-backend` (or whatever you prefer)
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: Leave blank
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Instance Type**: `Free` (for testing)

### 2.2 Set Environment Variables

In the Render dashboard, scroll down to **Environment Variables** and add:

#### Required Variables:

**1. PORT** (Render sets this automatically, but good to specify)
```
PORT=10000
```

**2. NODE_ENV**
```
NODE_ENV=production
```

**3. GOOGLE_APPLICATION_CREDENTIALS** (Firebase Admin)
```
GOOGLE_APPLICATION_CREDENTIALS=/etc/secrets/serviceAccountKey.json
```

**4. FIREBASE_SERVICE_ACCOUNT** (paste the entire JSON content)
- Name: `FIREBASE_SERVICE_ACCOUNT`
- Value: Paste the ENTIRE contents of your service account JSON file
  ```json
  {
    "type": "service_account",
    "project_id": "freeandreduced-ac6d8",
    "private_key_id": "...",
    "private_key": "-----BEGIN PRIVATE KEY-----\n...",
    ...
  }
  ```

**5. OPENAI_API_KEY** (Optional - for AI features)
```
OPENAI_API_KEY=sk-...your-key-here
```

### 2.3 Click "Create Web Service"

Render will now:
1. Clone your repository
2. Install dependencies
3. Start your server
4. Give you a URL like: `https://episd-backend.onrender.com`

## Step 3: Update Frontend to Use Render Backend

Once deployed, you'll get a URL like: `https://episd-backend.onrender.com`

### 3.1 Create Environment Config

Create `src/config/api.js`:

```javascript
// API Configuration
const API_BASE_URL = process.env.VUE_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://episd-backend.onrender.com'  // Your Render URL
    : 'http://localhost:3000');

export default API_BASE_URL;
```

### 3.2 Update Components

Update any component that calls backend APIs:

**Before:**
```javascript
const response = await axios.post('http://localhost:3000/appIndex', data);
```

**After:**
```javascript
import API_BASE_URL from '@/config/api';

const response = await axios.post(`${API_BASE_URL}/appIndex`, data);
```

### 3.3 Create .env Files

**`.env.local`** (for local development):
```
VUE_APP_API_URL=http://localhost:3000
```

**`.env.production`** (for production):
```
VUE_APP_API_URL=https://episd-backend.onrender.com
```

### 3.4 Rebuild and Redeploy Frontend

```bash
# Build with production environment
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

## Step 4: Test Your Deployment

### 4.1 Test Backend Directly

```bash
# Test a simple endpoint
curl https://episd-backend.onrender.com/appIndex

# Test with data
curl -X POST https://episd-backend.onrender.com/appIndex \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

### 4.2 Test Frontend

1. Visit your Firebase app: `https://freeandreduced-ac6d8.web.app`
2. Check if the applications section loads
3. Open browser DevTools → Network tab to see API calls

## Troubleshooting

### Issue: "Application error" on Render

**Check Logs:**
1. In Render dashboard, click your service
2. Go to **Logs** tab
3. Look for errors

**Common Fixes:**
- Ensure `package.json` has all dependencies
- Check that Firebase credentials are set correctly
- Verify `node server.js` works locally

### Issue: CORS Errors

Your `server.js` already has CORS configured, but if you get errors:

```javascript
// In server.js, update CORS to allow your Firebase domain
app.use(cors({
  origin: [
    'http://localhost:8080',
    'http://localhost:3000',
    'https://freeandreduced-ac6d8.web.app',
    'https://freeandreduced-ac6d8.firebaseapp.com'
  ],
  credentials: true
}));
```

### Issue: Firebase Admin SDK Errors

Make sure the service account JSON is correctly formatted:

```bash
# In Render shell
echo $FIREBASE_SERVICE_ACCOUNT
```

### Issue: Hardcoded File Paths

Your `server.js` has hardcoded paths like:
```javascript
'D:/Projects/EPISD/deploy template/public/config.json'
```

These need to be relative:
```javascript
const path = require('path');
const configPath = path.join(__dirname, 'public', 'config.json');
```

## Advanced: Custom Domain

### Add Your Own Domain

1. In Render dashboard → your service → **Settings**
2. Scroll to **Custom Domain**
3. Add your domain (e.g., `api.yourdomain.com`)
4. Update DNS records as instructed
5. Render will automatically provide SSL certificate

## Render Free Tier Limits

- ✅ 750 hours/month (enough for 1 service 24/7)
- ✅ SSL certificates included
- ✅ Automatic deploys from Git
- ⚠️ Spins down after 15 min of inactivity (cold starts)
- ⚠️ Limited to 512 MB RAM

### Upgrade Options:

If you need more:
- **Starter Plan** ($7/month): Always on, no cold starts, 1 GB RAM
- **Standard Plan** ($25/month): 2 GB RAM, better performance

## Alternative: Railway.app

If you prefer Railway:

1. Visit [https://railway.app/](https://railway.app/)
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository
4. Add environment variables
5. Railway auto-detects Node.js and deploys

## Complete Deployment Checklist

- [ ] Push code to GitHub
- [ ] Get Firebase service account JSON
- [ ] Create Render web service
- [ ] Set all environment variables
- [ ] Wait for Render deployment to complete
- [ ] Note your Render URL
- [ ] Update frontend API configuration
- [ ] Rebuild frontend: `npm run build`
- [ ] Deploy frontend: `firebase deploy --only hosting`
- [ ] Test both frontend and backend
- [ ] Check Render logs for any errors

## Monitoring

### Render Dashboard

Monitor your backend at: [https://dashboard.render.com/](https://dashboard.render.com/)

- View logs in real-time
- Check CPU/Memory usage
- See request metrics
- Configure alerts

### Firebase Hosting

Monitor your frontend at: [https://console.firebase.google.com/](https://console.firebase.google.com/)

- View hosting analytics
- Check bandwidth usage
- See deployment history

## Cost Summary

**Current Setup (Free Tier):**
- Firebase Hosting: Free (10 GB storage, 360 MB/day transfer)
- Firebase Firestore: Free (50k reads/day, 20k writes/day)
- Render Backend: Free (750 hours/month, with cold starts)
- **Total: $0/month** ✨

**Recommended Production Setup:**
- Firebase Hosting: Free (likely stays in free tier)
- Firebase Firestore: Free (monitor usage)
- Render Starter: $7/month (always on, no cold starts)
- **Total: ~$7/month**

---

## Quick Start Commands

```bash
# 1. Prepare for deployment
git add .
git commit -m "Prepare for Render"
git push origin main

# 2. After Render deployment, update frontend
npm run build
firebase deploy --only hosting

# 3. Monitor
# Render logs: https://dashboard.render.com/
# Firebase logs: https://console.firebase.google.com/
```

**Your URLs:**
- Frontend: `https://freeandreduced-ac6d8.web.app`
- Backend: `https://YOUR-SERVICE.onrender.com` (you'll get this after deployment)

Good luck! 🚀

