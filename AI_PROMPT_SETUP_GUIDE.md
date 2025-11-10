# AI Prompt Component - Setup Guide

## Overview

The AI Prompt component allows users to submit text prompts to an AI service and automatically store the results in Firebase Firestore. This guide will help you set up and use the component.

## Features

- 📝 Simple textarea interface for submitting AI prompts
- 🤖 Integration with AI services (OpenAI/Anthropic/etc.)
- 🔥 Automatic deployment of results to Firebase Firestore
- ✅ Real-time status updates and confirmation
- 💅 Modern, responsive UI design

## Component Location

- **Vue Component**: `src/components/AIPrompt.vue`
- **Server Endpoint**: `server.js` (line ~2880)
- **Route**: `/ai-prompt`

## Setup Instructions

### 1. Install Required Dependencies

```bash
npm install firebase-admin
npm install openai  # Optional - only if using OpenAI
```

### 2. Firebase Admin Setup

#### Option A: Using Service Account (Recommended for Production)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `freeandreduced-ac6d8`
3. Go to Project Settings > Service Accounts
4. Click "Generate New Private Key"
5. Save the JSON file to your project root (e.g., `firebase-adminsdk.json`)
6. Update `server.js` to use the service account:

```javascript
// In server.js, replace the Firebase initialization with:
const serviceAccount = require('./firebase-adminsdk.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
```

#### Option B: Using Application Default Credentials (Development)

Set the environment variable:

```bash
# Windows PowerShell
$env:GOOGLE_APPLICATION_CREDENTIALS="path\to\your\firebase-adminsdk.json"

# Windows CMD
set GOOGLE_APPLICATION_CREDENTIALS=path\to\your\firebase-adminsdk.json

# Linux/Mac
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/firebase-adminsdk.json"
```

### 3. OpenAI Setup (Optional)

If you want to use OpenAI for actual AI responses:

1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Set the environment variable:

```bash
# Windows PowerShell
$env:OPENAI_API_KEY="your-api-key-here"

# Windows CMD
set OPENAI_API_KEY=your-api-key-here

# Linux/Mac
export OPENAI_API_KEY="your-api-key-here"
```

3. In `server.js`, uncomment the OpenAI integration code (around line 2904-2916):

```javascript
const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const completion = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    { role: "user", content: prompt }
  ],
});

aiResponse = completion.choices[0].message.content;
```

### 4. Create Environment File (Optional)

Create a `.env` file in your project root:

```env
# Firebase Admin
GOOGLE_APPLICATION_CREDENTIALS=./firebase-adminsdk.json

# OpenAI API (optional)
OPENAI_API_KEY=your-openai-api-key-here

# Other AI Services (optional)
# ANTHROPIC_API_KEY=your-anthropic-key-here
```

Then install and configure dotenv:

```bash
npm install dotenv
```

Add to the top of `server.js`:

```javascript
require('dotenv').config();
```

## Usage

### Accessing the Component

1. Start your server:
```bash
node server.js
```

2. Start your Vue development server:
```bash
npm run serve
```

3. Navigate to: `http://localhost:8080/ai-prompt` (or your configured port)

### Using the Component

1. **Enter your prompt**: Type or paste your AI prompt in the textarea
2. **Click "Submit Prompt"**: The prompt will be sent to the server
3. **View the response**: The AI response will appear below the input area
4. **Firebase Confirmation**: You'll see a checkmark confirming the data was saved to Firebase

### Example Prompts to Try

```
Explain how Vue.js components work in simple terms.
```

```
Write a function to validate email addresses in JavaScript.
```

```
What are the best practices for securing a Node.js application?
```

## Firebase Data Structure

Prompts and responses are stored in the `ai-prompts` collection with this structure:

```javascript
{
  prompt: "User's input prompt text",
  response: "AI-generated response",
  timestamp: Firestore.ServerTimestamp,
  status: "completed",
  createdAt: "ISO 8601 datetime string"
}
```

## Testing Without AI API

The component works out of the box with a mock AI response. This is perfect for:
- Testing the UI and workflow
- Development without API costs
- Demonstrating the feature to stakeholders

The mock response includes helpful setup instructions.

## Customization

### Change AI Service

To use a different AI service (Anthropic, Cohere, etc.), modify the `/ai-prompt` endpoint in `server.js`:

```javascript
// Example with Anthropic
const Anthropic = require('@anthropic-ai/sdk');
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

const message = await anthropic.messages.create({
  model: "claude-3-sonnet-20240229",
  max_tokens: 1024,
  messages: [
    { role: "user", content: prompt }
  ]
});

aiResponse = message.content[0].text;
```

### Modify UI Styling

The component uses scoped CSS. Customize colors, fonts, and layout in the `<style scoped>` section of `AIPrompt.vue`.

### Change Firebase Collection

In `server.js`, change the collection name:

```javascript
const docRef = await db.collection('your-collection-name').add(promptData);
```

## Troubleshooting

### Firebase Connection Issues

**Error**: "Firebase Admin initialization skipped"

**Solution**: Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable or use a service account file.

### CORS Errors

**Error**: "Access-Control-Allow-Origin" error

**Solution**: The server already has CORS enabled. Make sure your server is running on port 3000 and Vue dev server is making requests to the correct URL.

### OpenAI API Errors

**Error**: "OpenAI API key not found"

**Solution**: Set the `OPENAI_API_KEY` environment variable and restart your server.

### Port Conflicts

If port 3000 is already in use, modify the port in `server.js`:

```javascript
const port = 3001; // or any available port
```

And update the component's axios call in `AIPrompt.vue`:

```javascript
const response = await axios.post('http://localhost:3001/ai-prompt', {
  prompt: promptText.value
});
```

## Security Considerations

1. **Never commit API keys** to version control
2. **Use environment variables** for sensitive credentials
3. **Implement rate limiting** to prevent abuse
4. **Add authentication checks** in the server endpoint
5. **Validate and sanitize** user input
6. **Set Firebase security rules** to protect data

### Example Security Enhancement

Add authentication check to the endpoint:

```javascript
app.post('/ai-prompt', express.json(), async (req, res) => {
  // Check for authentication
  const user = req.headers.authorization;
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  // Rest of the code...
});
```

## Performance Optimization

### Add Request Timeout

```javascript
const completion = await Promise.race([
  openai.chat.completions.create({...}),
  new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Timeout')), 30000)
  )
]);
```

### Implement Caching

Store frequently requested prompts to reduce API calls:

```javascript
// Check cache first
const cached = await db.collection('ai-prompts')
  .where('prompt', '==', prompt)
  .limit(1)
  .get();

if (!cached.empty) {
  return res.json({
    success: true,
    response: cached.docs[0].data().response,
    cached: true
  });
}
```

## Next Steps

1. ✅ Set up Firebase Admin credentials
2. ✅ (Optional) Configure OpenAI or other AI service
3. ✅ Test the component with mock responses
4. ✅ Integrate actual AI API
5. ✅ Add authentication and security measures
6. ✅ Deploy to production

## Support

For issues or questions:
- Check the Firebase Console for data storage
- Review browser console for client-side errors
- Check server logs for API errors
- Verify all environment variables are set correctly

## License

This component is part of the EPISD project.

