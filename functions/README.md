# Firebase Functions

This directory contains the Firebase Cloud Functions for your application.

## Requirements

- Node.js 16+ (for local development)
- Functions deployed with Node.js 20 runtime

## Functions

### 1. `downloadImage`

Downloads an image from a URL and returns it as base64 data to avoid CORS issues.

**Endpoint**: `https://us-central1-freeandreduced-ac6d8.cloudfunctions.net/downloadImage`

**Method**: POST

**Request Body**:
```json
{
  "imageUrl": "https://example.com/image.jpg"
}
```

**Response**:
```json
{
  "success": true,
  "imageData": "data:image/jpeg;base64,...",
  "contentType": "image/jpeg",
  "size": 12345
}
```

### 2. `aiPrompt`

Processes AI prompts using OpenAI API, with optional image support for vision-based analysis.

**Endpoint**: `https://us-central1-freeandreduced-ac6d8.cloudfunctions.net/aiPrompt`

**Method**: POST

**Request Body (Text Only)**:
```json
{
  "prompt": "What is the meaning of life?"
}
```

**Request Body (With Image)**:
```json
{
  "prompt": "What's in this image?",
  "image": "data:image/jpeg;base64,...",
  "imageUrl": "https://example.com/image.jpg"
}
```

**Response**:
```json
{
  "success": true,
  "response": "AI response text...",
  "firebaseId": "document-id",
  "message": "Prompt processed and deployed to Firebase successfully"
}
```

## Setup

### Install Dependencies

```bash
npm install
```

### Configure OpenAI API Key

```bash
firebase functions:config:set openai.key="YOUR_OPENAI_API_KEY"
```

## Local Development

### Start Emulator

```bash
firebase emulators:start --only functions
```

Functions will be available at:
- `http://localhost:5001/freeandreduced-ac6d8/us-central1/downloadImage`
- `http://localhost:5001/freeandreduced-ac6d8/us-central1/aiPrompt`

## Deployment

### Deploy All Functions

```bash
firebase deploy --only functions
```

### Deploy Specific Function

```bash
firebase deploy --only functions:downloadImage
firebase deploy --only functions:aiPrompt
```

## Monitoring

### View Logs

```bash
# All logs
firebase functions:log

# Specific function
firebase functions:log --only downloadImage

# Follow logs in real-time
firebase functions:log --follow
```

### View in Console

Go to: https://console.firebase.google.com/project/freeandreduced-ac6d8/functions

## Dependencies

- `firebase-functions` - Firebase Functions SDK
- `firebase-admin` - Firebase Admin SDK for accessing Firestore
- `openai` - OpenAI API client
- `cors` - CORS middleware for cross-origin requests
- `axios` - HTTP client (future use)

## Environment Variables

Environment variables are managed through Firebase Functions config:

```bash
# Set variable
firebase functions:config:set key.subkey="value"

# Get all config
firebase functions:config:get

# Get specific config
firebase functions:config:get openai
```

## Testing

You can test functions locally or in production using curl:

```bash
# Test downloadImage
curl -X POST \
  http://localhost:5001/freeandreduced-ac6d8/us-central1/downloadImage \
  -H "Content-Type: application/json" \
  -d '{"imageUrl": "https://picsum.photos/200"}'

# Test aiPrompt
curl -X POST \
  http://localhost:5001/freeandreduced-ac6d8/us-central1/aiPrompt \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Hello AI!"}'
```

## Troubleshooting

### Function not found

- Ensure functions are deployed: `firebase functions:list`
- Check function names match exactly
- Verify project ID in requests

### CORS errors

- Functions include CORS middleware
- Ensure you're using POST method
- Check Content-Type header is set

### OpenAI errors

- Verify API key: `firebase functions:config:get`
- Check billing at platform.openai.com
- Ensure sufficient credits/balance
- For GPT-4o, verify you have access

### Cold start latency

- First request after idle time may be slow
- Consider using a ping/keep-alive service
- Upgrade to paid plan for better performance

## Security

- Functions use CORS to restrict access (currently allows all origins)
- Consider adding authentication for production
- Implement rate limiting for public endpoints
- Never commit API keys to version control
- Use Firebase Functions config for secrets

## Performance

- Functions have a 60-second timeout (default)
- Cold start: ~1-3 seconds
- Warm invocation: ~100-500ms
- Consider caching for frequently accessed data

## Costs

Firebase Functions pricing (as of 2024):

**Free Tier**:
- 2M invocations/month
- 400,000 GB-seconds
- 200,000 GHz-seconds

**Paid** (after free tier):
- $0.40 per million invocations
- $0.0000025 per GB-second
- $0.0000100 per GHz-second

Most small to medium projects stay in free tier!

## File Structure

```
functions/
├── index.js           # Main functions file
├── package.json       # Dependencies
├── .eslintrc.js       # ESLint configuration
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## Additional Resources

- [Firebase Functions Documentation](https://firebase.google.com/docs/functions)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

