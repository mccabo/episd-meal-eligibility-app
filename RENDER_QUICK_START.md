# Quick Start: Deploy to Render.com

## ⚡ 5-Minute Deployment

### Step 1: Get Your Code on GitHub

```bash
# If not already on GitHub
git init
git add .
git commit -m "Ready for Render deployment"

# Create a new repo on GitHub, then:
git remote add origin https://github.com/mccabo/YOUR_REPO.git
git push -u origin main
```

### Step 2: Deploy to Render

1. Go to **[render.com](https://render.com)** and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repo
4. Fill in:
   - **Name**: `episd-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: `Free`

### Step 3: Add Environment Variables

In Render dashboard, add these environment variables:

```
NODE_ENV=production
```

**Optional (for AI features):**
```
OPENAI_API_KEY=your-key-here
```

Click **"Create Web Service"**

### Step 4: Get Your Backend URL

After deployment, Render will give you a URL like:
```
https://episd-backend.onrender.com
```

### Step 5: Update Frontend

Create `src/config/api.js`:

```javascript
const API_BASE_URL = 'https://episd-backend.onrender.com'; // Your Render URL

export default API_BASE_URL;
```

Update your components to use it:

```javascript
import API_BASE_URL from '@/config/api';

// Instead of: 'http://localhost:3000/appIndex'
// Use:
const response = await axios.post(`${API_BASE_URL}/appIndex`, data);
```

### Step 6: Rebuild & Redeploy Frontend

```bash
npm run build
firebase deploy --only hosting
```

## ✅ Done!

Your app is now fully deployed:
- **Frontend**: https://freeandreduced-ac6d8.web.app
- **Backend**: https://YOUR-SERVICE.onrender.com

## 📝 Notes

- **First load**: May take 30-60 seconds (cold start)
- **After 15 min idle**: Service spins down (free tier)
- **Upgrade to $7/month**: For always-on service

## 🐛 Troubleshooting

**Backend not working?**
1. Check Render logs in dashboard
2. Verify environment variables are set
3. Make sure `package.json` has all dependencies

**Frontend can't reach backend?**
1. Check CORS is configured in server.js
2. Verify the Render URL is correct
3. Check browser console for errors

---

For detailed instructions, see [RENDER_DEPLOYMENT_GUIDE.md](./RENDER_DEPLOYMENT_GUIDE.md)

