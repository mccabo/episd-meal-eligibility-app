# Deployment Checklist

## Pre-Deployment

### Backend Preparation
- [x] Updated `server.js` to use `process.env.PORT`
- [x] Fixed hardcoded file paths to be relative
- [x] Created `render.yaml` for Render configuration
- [x] Created `env.example` with all required environment variables
- [ ] Test `server.js` locally: `node server.js`
- [ ] Commit and push all changes to GitHub

### Frontend Preparation
- [x] Created `src/config/api.js` for API URL configuration
- [x] Created `.env.local.example` and `.env.production.example`
- [ ] Update components to use `API_BASE_URL` (see list below)
- [ ] Create `.env.local` for local development
- [ ] Test frontend locally: `npm run serve`

## Render Deployment

### Deploy Backend
- [ ] Sign up at [render.com](https://render.com)
- [ ] Create new Web Service from GitHub repo
- [ ] Configure service:
  - Name: `episd-backend`
  - Build: `npm install`
  - Start: `node server.js`
  - Instance: Free tier
- [ ] Add environment variables:
  - `NODE_ENV=production`
  - `OPENAI_API_KEY=...` (optional)
- [ ] Wait for deployment to complete
- [ ] Copy your Render URL (e.g., `https://episd-backend.onrender.com`)
- [ ] Test backend: Visit `https://YOUR-URL.onrender.com` in browser

### Update Frontend for Production
- [ ] Create `.env.production` file:
  ```
  VUE_APP_API_URL=https://YOUR-RENDER-URL.onrender.com
  ```
- [ ] Update `src/config/api.js` with your Render URL
- [ ] Build frontend: `npm run build`
- [ ] Deploy to Firebase: `firebase deploy --only hosting`
- [ ] Test deployed app: Visit `https://freeandreduced-ac6d8.web.app`

## Testing

### Backend Testing
- [ ] Test health check: `curl https://YOUR-RENDER-URL.onrender.com`
- [ ] Test key endpoints:
  ```bash
  curl -X POST https://YOUR-RENDER-URL.onrender.com/appIndex
  curl -X POST https://YOUR-RENDER-URL.onrender.com/showConfig
  ```
- [ ] Check Render logs for errors

### Frontend Testing
- [ ] Visit deployed app: `https://freeandreduced-ac6d8.web.app`
- [ ] Open browser DevTools → Network tab
- [ ] Check that API calls go to Render URL (not localhost)
- [ ] Test key features:
  - [ ] Applications section loads
  - [ ] Config section works
  - [ ] Search functionality
  - [ ] Print functionality
  - [ ] Email functionality
  - [ ] AI Prompt (if using)
  - [ ] Image download (if using)

## Components That Need Updating

These components likely call backend APIs and need to be updated to use `API_BASE_URL`:

```javascript
// Add this import at the top
import API_BASE_URL from '@/config/api';

// Replace hardcoded URLs
// Before: 'http://localhost:3000/appIndex'
// After:  `${API_BASE_URL}/appIndex`
```

Check these files:
- [ ] Any component with `axios.post('http://localhost:3000/...`
- [ ] Any component with `fetch('http://localhost:3000/...`

## Post-Deployment

### Monitoring
- [ ] Set up Render alerts (optional)
- [ ] Monitor Render logs for first 24 hours
- [ ] Check Firebase Analytics
- [ ] Monitor Firebase Hosting bandwidth

### Documentation
- [ ] Document your Render URL for team
- [ ] Update README with deployment info
- [ ] Share access credentials if needed

### Optimization (Optional)
- [ ] Consider upgrading to Render Starter plan ($7/mo) to eliminate cold starts
- [ ] Set up custom domain (optional)
- [ ] Configure CDN caching
- [ ] Set up automated backups

## Rollback Plan

If something goes wrong:

### Frontend Rollback
```bash
# Redeploy previous version
firebase hosting:rollback
```

### Backend Rollback
1. Go to Render dashboard
2. Find your service
3. Click "Manual Deploy" → Select previous commit
4. Or: Push previous code to GitHub to trigger auto-deploy

### Emergency: Revert to Local
1. Update `.env.production`:
   ```
   VUE_APP_API_URL=http://localhost:3000
   ```
2. Rebuild and redeploy frontend
3. Run local server: `node server.js`

## Cost Tracking

### Current Setup (Free Tier)
- Firebase Hosting: $0/month
- Firebase Firestore: $0/month (within limits)
- Render Free: $0/month (with cold starts)
- **Total: $0/month**

### Recommended Production
- Firebase: $0/month (likely stays free)
- Render Starter: $7/month (always on, no cold starts)
- **Total: $7/month**

### Monitor Usage
- [ ] Firebase Console → Usage tab
- [ ] Render Dashboard → Metrics
- [ ] Set up billing alerts

## Troubleshooting

### Common Issues

**Backend: "Application error" on Render**
- Check Render logs
- Verify environment variables are set
- Ensure all dependencies in package.json
- Check Firebase credentials

**Frontend: "Network Error" or API calls fail**
- Verify Render URL in .env.production
- Check CORS settings in server.js
- Confirm backend is running (visit Render URL)
- Check browser console for specific errors

**Backend: Cold starts taking too long**
- Consider upgrading to Render Starter ($7/mo)
- Or: Set up a cron job to ping your backend every 10 minutes

**Frontend: Old version showing**
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Check Firebase Hosting deploy time

## Success Criteria

✅ Deployment is successful when:
- Backend responds at Render URL
- Frontend loads from Firebase URL
- API calls work from deployed frontend
- No CORS errors in browser console
- All features work as expected
- Render logs show no errors

---

## Quick Commands Reference

```bash
# Backend
node server.js                        # Run locally
git push origin main                  # Deploy to Render (auto-deploy enabled)

# Frontend
npm run serve                         # Run locally
npm run build                         # Build for production
firebase deploy --only hosting        # Deploy to Firebase

# Testing
curl https://YOUR-RENDER-URL.onrender.com/
curl -X POST https://YOUR-RENDER-URL.onrender.com/appIndex

# Monitoring
firebase hosting:list                 # Check deployments
# Render logs: dashboard.render.com
```

---

**Next Step:** Follow [RENDER_QUICK_START.md](./RENDER_QUICK_START.md) for deployment instructions!

