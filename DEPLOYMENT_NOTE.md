# Deployment Configuration

## Current Setup

This project uses **Firebase for hosting and data storage** but runs backend functions via a **local Node.js server** (`server.js`).

### Why This Approach?

Firebase Functions deployment was encountering build issues with the project structure. Since the local server works perfectly and provides more flexibility, we've configured the project to use:

- ✅ **Firebase Hosting** - For serving the built Vue.js app
- ✅ **Firebase Firestore** - For database
- ✅ **Firebase Storage** - For file storage
- ✅ **Firebase Auth** - For authentication
- ❌ **Firebase Functions** - Disabled (using local `server.js` instead)

## Deployment Commands

### Deploy Frontend to Firebase
```bash
# Build the Vue app
npm run build

# Deploy hosting only
firebase deploy --only hosting
```

Your app will be available at: `https://freeandreduced-ac6d8.web.app`

### Deploy Firestore Rules
```bash
firebase deploy --only firestore:rules
```

### Deploy Storage Rules
```bash
firebase deploy --only storage
```

### Deploy Everything (except functions)
```bash
npm run build
firebase deploy --except functions
```

## Running the Backend

The backend server needs to run separately:

```bash
# Run the local server
node server.js
```

The server provides these endpoints:
- `POST /download-image` - Image downloading proxy
- `POST /ai-prompt` - AI prompt processing

## For Production

If you need to deploy the full application (frontend + backend) to production, you have several options:

### Option 1: Split Deployment (Current Approach)
- **Frontend**: Deploy to Firebase Hosting
- **Backend**: Deploy to a Node.js hosting service like:
  - Heroku
  - Render
  - Railway
  - DigitalOcean App Platform
  - AWS Elastic Beanstalk

Then update the frontend to point to your backend URL instead of localhost.

### Option 2: All-in-One Platform
Deploy both frontend and backend to platforms that support full-stack apps:
- **Vercel** (with serverless functions)
- **Netlify** (with serverless functions)
- **Railway** (full Node.js support)
- **Render** (full Node.js support)

### Option 3: Firebase Functions (Future)
If you want to retry Firebase Functions later:
1. Create a separate, clean repository with only the functions code
2. Deploy from there to avoid build conflicts
3. Or contact Firebase support about the npm ci build issue

## Current File Structure

```
project/
├── dist/                   # Built Vue.js app (deployed to Firebase Hosting)
├── functions/              # Firebase Functions (currently disabled)
├── src/                    # Vue.js source code
├── server.js               # Backend server (run locally or deploy separately)
├── firebase.json           # Firebase config (functions section removed)
└── package.json            # Project dependencies
```

## Environment Variables

### For Local Development
Create a `.env` file in the root:
```
OPENAI_API_KEY=your_key_here
```

### For Production Backend
Set environment variables on your hosting platform:
- `OPENAI_API_KEY` - For AI features
- `PORT` - Server port (usually provided by the platform)

## Benefits of This Approach

1. **Reliable** - No deployment issues with Firebase Functions
2. **Flexible** - Full control over the backend server
3. **Debuggable** - Easier to test and debug locally
4. **Cost-effective** - Many Node.js hosting options have generous free tiers
5. **Portable** - Can move to any hosting platform that supports Node.js

## Next Steps

1. ✅ Deploy frontend to Firebase: `npm run build && firebase deploy --only hosting`
2. ✅ Keep running `server.js` locally for development
3. 📝 When ready for production, choose a backend hosting option and deploy `server.js`
4. 🔧 Update frontend URLs from localhost to your production backend URL

---

**Note**: The `functions/` directory can be kept for future use or deleted if you don't plan to use Firebase Functions.

