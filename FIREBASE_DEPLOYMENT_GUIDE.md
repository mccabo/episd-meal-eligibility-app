# Firebase Deployment Guide

This guide will help you deploy your application to Firebase, including the frontend hosting and Firebase Functions (serverless backend).

## Prerequisites

1. **Firebase CLI**: Install the Firebase CLI if you haven't already
   ```bash
   npm install -g firebase-tools
   ```

2. **Firebase Account**: You need a Firebase account at [https://firebase.google.com/](https://firebase.google.com/)

3. **OpenAI API Key** (Optional): If you want to use actual AI features
   - Get your API key from [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)

## Project Structure

```
deploy template/
├── functions/               # Firebase Functions (serverless backend)
│   ├── index.js            # Cloud Functions code
│   ├── package.json        # Functions dependencies
│   └── .eslintrc.js        # ESLint configuration
├── src/                    # Vue.js frontend
│   ├── components/
│   │   └── AIPrompt.vue    # AI Prompt component (now uses Firebase Functions)
│   └── config/
│       └── firebase-functions.js  # Functions endpoints configuration
├── dist/                   # Built frontend (generated)
├── firebase.json           # Firebase configuration
└── firestore.rules         # Firestore security rules
```

## Setup Steps

### Step 1: Login to Firebase

```bash
firebase login
```

This will open a browser window for you to authenticate with your Google account.

### Step 2: Initialize Firebase (Already Done)

Your project is already configured with:
- **Project ID**: `freeandreduced-ac6d8`
- **Hosting**: Configured to serve from `dist` folder
- **Functions**: Configured to use `functions` folder
- **Firestore**: Database rules configured
- **Storage**: Storage rules configured

### Step 3: Install Functions Dependencies

```bash
cd functions
npm install
cd ..
```

**Note**: Functions use Node.js 20 runtime. Make sure you have Node.js 16+ installed locally for development.

### Step 4: Configure OpenAI API Key (Optional)

If you want to use actual AI features, set your OpenAI API key:

```bash
firebase functions:config:set openai.key="YOUR_OPENAI_API_KEY_HERE"
```

To verify the configuration:

```bash
firebase functions:config:get
```

### Step 5: Build Your Frontend

```bash
npm run build
```

This will create an optimized production build in the `dist` folder.

### Step 6: Deploy Functions

Deploy only the Firebase Functions first to get the function URLs:

```bash
firebase deploy --only functions
```

After deployment, you'll see output like:
```
✔  functions: Finished running predeploy script.
✔  functions[downloadImage(us-central1)]: Successful create operation.
✔  functions[aiPrompt(us-central1)]: Successful create operation.

Functions URL:
https://us-central1-freeandreduced-ac6d8.cloudfunctions.net/downloadImage
https://us-central1-freeandreduced-ac6d8.cloudfunctions.net/aiPrompt
```

### Step 7: Update Function URLs (If Needed)

The frontend is already configured to use the correct URLs in `src/config/firebase-functions.js`. If your project ID or region is different, update that file:

```javascript
const FIREBASE_PROJECT_ID = 'freeandreduced-ac6d8';
const FIREBASE_REGION = 'us-central1';
```

### Step 8: Deploy Hosting

Deploy the frontend:

```bash
firebase deploy --only hosting
```

After deployment, you'll see your hosting URL:
```
Hosting URL: https://freeandreduced-ac6d8.web.app
```

### Step 9: Deploy Everything Together (Future Updates)

For future updates, you can deploy everything at once:

```bash
npm run build
firebase deploy
```

## Testing Your Deployment

### Test the Frontend
Visit your hosting URL: `https://freeandreduced-ac6d8.web.app`

### Test Functions Directly

You can test your functions using curl or Postman:

**Test Download Image Function:**
```bash
curl -X POST \
  https://us-central1-freeandreduced-ac6d8.cloudfunctions.net/downloadImage \
  -H "Content-Type: application/json" \
  -d '{"imageUrl": "https://example.com/image.jpg"}'
```

**Test AI Prompt Function:**
```bash
curl -X POST \
  https://us-central1-freeandreduced-ac6d8.cloudfunctions.net/aiPrompt \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Hello, AI!"}'
```

## Local Development with Emulators

You can test your functions locally before deploying:

### Step 1: Start the Functions Emulator

```bash
cd functions
npm install
cd ..
firebase emulators:start --only functions
```

### Step 2: Update Configuration for Local Testing

Edit `src/config/firebase-functions.js`:

```javascript
const USE_LOCAL_EMULATOR = true;  // Change to true
```

### Step 3: Run Your Frontend Locally

```bash
npm run serve
```

Now your local frontend will call the local function emulators instead of the deployed functions.

## Environment Variables

### For Firebase Functions

OpenAI API Key (set using Firebase CLI):
```bash
firebase functions:config:set openai.key="YOUR_API_KEY"
```

### View Current Configuration

```bash
firebase functions:config:get
```

## Monitoring and Logs

### View Function Logs

```bash
firebase functions:log
```

### View Specific Function Logs

```bash
firebase functions:log --only downloadImage
firebase functions:log --only aiPrompt
```

### View Logs in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Functions** in the left sidebar
4. Click on any function to view logs and metrics

## Troubleshooting

### Functions Not Working

1. **Check logs**: `firebase functions:log`
2. **Verify deployment**: `firebase functions:list`
3. **Check CORS**: Functions use CORS middleware to allow cross-origin requests
4. **Verify API key**: If using OpenAI, ensure your API key is set correctly

### Frontend Not Updating

1. **Clear cache**: Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
2. **Rebuild**: Run `npm run build` again
3. **Redeploy**: Run `firebase deploy --only hosting`

### OpenAI API Errors

Common issues:
- **Invalid API key**: Double-check your key at [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **Billing not set up**: Ensure you have billing configured at [https://platform.openai.com/account/billing](https://platform.openai.com/account/billing)
- **Insufficient credits**: Check your usage and add credits if needed
- **Model access**: GPT-4o requires special access in some regions

### CORS Issues

If you encounter CORS errors:
- Ensure functions are deployed properly
- Check that the `cors` package is installed in functions
- Verify the function URL in `src/config/firebase-functions.js`

## Cost Considerations

### Firebase Costs

- **Hosting**: Free tier includes 10 GB storage and 360 MB/day transfer
- **Functions**: Free tier includes 2M invocations/month, 400,000 GB-seconds, 200,000 GHz-seconds
- **Firestore**: Free tier includes 1 GiB storage, 50,000 reads/day, 20,000 writes/day

### OpenAI Costs

- **GPT-3.5-turbo**: ~$0.002 per 1K tokens (text-only prompts)
- **GPT-4o**: ~$0.01 per 1K input tokens, ~$0.03 per 1K output tokens (with vision)

Check current pricing at [https://openai.com/pricing](https://openai.com/pricing)

## Security Best Practices

1. **Firestore Rules**: Keep your firestore.rules restrictive
2. **API Keys**: Never commit API keys to version control
3. **Function Authentication**: Consider adding authentication to functions for production
4. **Rate Limiting**: Implement rate limiting for production apps
5. **CORS**: Configure specific origins instead of allowing all in production

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Functions Documentation](https://firebase.google.com/docs/functions)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Vue.js Documentation](https://v3.vuejs.org/)

## Quick Reference Commands

```bash
# Login
firebase login

# Install function dependencies
cd functions && npm install && cd ..

# Build frontend
npm run build

# Deploy everything
firebase deploy

# Deploy only functions
firebase deploy --only functions

# Deploy only hosting
firebase deploy --only hosting

# View logs
firebase functions:log

# Start local emulators
firebase emulators:start --only functions

# Set OpenAI API key
firebase functions:config:set openai.key="YOUR_KEY"

# View configuration
firebase functions:config:get
```

## Need Help?

If you encounter issues:
1. Check the troubleshooting section above
2. Review Firebase logs: `firebase functions:log`
3. Check the Firebase Console for detailed error messages
4. Ensure all dependencies are installed
5. Verify your Firebase project configuration

---

**Your Firebase Project Details:**
- **Project ID**: freeandreduced-ac6d8
- **Hosting URL**: https://freeandreduced-ac6d8.web.app
- **Functions Region**: us-central1
- **Functions Base URL**: https://us-central1-freeandreduced-ac6d8.cloudfunctions.net

Happy deploying! 🚀

