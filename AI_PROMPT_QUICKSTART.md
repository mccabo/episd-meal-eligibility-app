# AI Prompt Component - Quick Start

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

```bash
npm install
```

This will install `firebase-admin` and `dotenv` that were just added to your package.json.

### Step 2: Start the Server

```bash
node server.js
```

You should see:
```
Print Server listening at http://localhost:3000
```

**Note**: Firebase Admin will show a warning if not configured. That's okay for initial testing!

### Step 3: Start Vue Development Server

Open a new terminal and run:

```bash
npm run serve
```

### Step 4: Access the Component

Open your browser and navigate to:

```
http://localhost:8080/ai-prompt
```

(Or whatever port your Vue dev server is running on)

### Step 5: Test It Out!

1. **Login** to your application (the component requires authentication)
2. Enter a test prompt like:
   ```
   Write a hello world function in JavaScript
   ```
3. Click "Submit Prompt"
4. You'll see a simulated AI response!

## ✅ Testing Without APIs

The component works immediately with **mock AI responses**. This means you can:
- ✅ Test the UI/UX
- ✅ Test the Firebase storage structure
- ✅ Demo the feature
- ✅ Develop without API costs

The mock response includes instructions for setting up real AI integration when you're ready.

## 🔥 What's Happening Behind the Scenes?

When you submit a prompt:

1. **Client** (`AIPrompt.vue`) sends the prompt to the server
2. **Server** (`server.js`) processes it:
   - Generates a response (mock or real AI)
   - Stores the prompt + response in Firebase Firestore
   - Returns the response to the client
3. **Client** displays the response and confirmation

## 📊 View Your Data in Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: `freeandreduced-ac6d8`
3. Go to Firestore Database
4. Look for the `ai-prompts` collection
5. You'll see all submitted prompts and responses!

## 🎯 Next Steps

### Want Real AI Responses?

Follow the detailed setup in `AI_PROMPT_SETUP_GUIDE.md` to:
- Configure Firebase Admin properly
- Add OpenAI API integration
- Customize the AI behavior

### Want to Customize the UI?

Edit `src/components/AIPrompt.vue`:
- Change colors and fonts in the `<style>` section
- Modify the layout in the `<template>` section
- Add new features in the `<script>` section

### Add to Navigation

To make the component easily accessible, add it to your navigation menu.

Example for Navbar.vue:
```vue
<router-link to="/ai-prompt">AI Assistant</router-link>
```

## 🛠️ Troubleshooting

**Problem**: Can't access the page
- **Solution**: Make sure you're logged in (component requires authentication)

**Problem**: Server not responding
- **Solution**: Check that `node server.js` is running

**Problem**: Firebase errors in console
- **Solution**: Normal for initial testing. Follow setup guide to configure properly.

## 📝 Component Features

- Modern, responsive design
- Real-time status updates
- Loading states
- Error handling
- Success confirmations
- Textarea with validation
- Clear functionality
- Beautiful gradient buttons

## 🎨 Component Preview

The component includes:
- Large textarea for prompts
- Submit and Clear buttons
- Status messages (info/success/error)
- Response display area
- Firebase deployment confirmation

## ⚡ Performance

- Fast response with mock AI (instant)
- Real AI responses typically take 2-5 seconds
- Automatic Firebase storage
- Proper loading states prevent double-submissions

## 🔐 Security Note

For production use, make sure to:
1. Add proper authentication checks
2. Implement rate limiting
3. Use environment variables for API keys
4. Never commit sensitive credentials

See the full setup guide for detailed security recommendations.

---

**Need Help?** Check the full setup guide: `AI_PROMPT_SETUP_GUIDE.md`

