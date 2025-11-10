# Firebase Deployment Quick Start

This is a streamlined guide to get your app deployed to Firebase quickly.

## 🚀 Quick Deployment (5 Steps)

### 1. Install Firebase CLI (if needed)

```bash
npm install -g firebase-tools
```

### 2. Login to Firebase

```bash
firebase login
```

### 3. Install Dependencies

```bash
# Install function dependencies
cd functions
npm install
cd ..

# Make sure your frontend dependencies are installed
npm install
```

### 4. Set OpenAI API Key (Optional - for AI features)

```bash
firebase functions:config:set openai.key="YOUR_OPENAI_API_KEY_HERE"
```

Get your key from: https://platform.openai.com/api-keys

### 5. Build and Deploy

```bash
# Build the frontend
npm run build

# Deploy everything to Firebase
firebase deploy
```

**That's it!** ✨

Your app will be live at: `https://freeandreduced-ac6d8.web.app`

## 📝 What Changed?

We moved your server functions to Firebase Functions so you don't need to run a server:

- ✅ `/download-image` endpoint → Firebase Function `downloadImage`
- ✅ `/ai-prompt` endpoint → Firebase Function `aiPrompt`
- ✅ Frontend updated to call Firebase Functions
- ✅ AI responses stored in Firestore database

## 🔄 Making Updates

After making changes to your code:

```bash
# If you changed the frontend
npm run build
firebase deploy --only hosting

# If you changed functions
firebase deploy --only functions

# If you changed both
npm run build
firebase deploy
```

## 🧪 Local Testing

To test functions locally before deploying:

```bash
# Start Firebase emulators
firebase emulators:start --only functions

# In another terminal, run your frontend
npm run serve
```

Don't forget to update `src/config/firebase-functions.js` and set `USE_LOCAL_EMULATOR = true` for local testing.

## 📊 View Logs

```bash
# View all function logs
firebase functions:log

# View logs in real-time
firebase functions:log --follow
```

## 🔍 Check Deployment Status

```bash
# List all deployed functions
firebase functions:list

# View your hosting URL
firebase hosting:sites:list
```

## ❓ Having Issues?

1. **Functions not working**: Check logs with `firebase functions:log`
2. **Frontend not updating**: Clear browser cache (Ctrl+Shift+R)
3. **OpenAI errors**: Verify your API key is set correctly
4. **CORS errors**: Make sure functions are deployed

See the full [FIREBASE_DEPLOYMENT_GUIDE.md](./FIREBASE_DEPLOYMENT_GUIDE.md) for detailed troubleshooting.

## 💰 Cost Estimate

With Firebase's free tier:
- **2 million function invocations/month** - FREE
- **10 GB hosting storage** - FREE
- **Firestore**: 50k reads, 20k writes per day - FREE

OpenAI costs (if you use AI features):
- GPT-3.5-turbo: ~$0.002 per 1K tokens
- GPT-4o: ~$0.01-0.03 per 1K tokens

Most small to medium projects stay within the free tier! 🎉

## 🔗 Important URLs

- **Your App**: https://freeandreduced-ac6d8.web.app
- **Firebase Console**: https://console.firebase.google.com/project/freeandreduced-ac6d8
- **Function Base URL**: https://us-central1-freeandreduced-ac6d8.cloudfunctions.net

---

Need more details? Check the complete guide: [FIREBASE_DEPLOYMENT_GUIDE.md](./FIREBASE_DEPLOYMENT_GUIDE.md)

