# ElevenLabs Integration Setup Guide

## Overview

The Training Center's Audio Learning module now supports **real AI audio generation** using ElevenLabs API. This guide will help you set up the integration.

## What is ElevenLabs?

ElevenLabs is an AI audio platform that generates ultra-realistic speech using advanced AI. It's perfect for:
- Converting documents to audio
- Creating podcasts and voice-overs
- Generating training materials
- Multi-language content creation

## Setup Steps

### Step 1: Get Your API Key

1. **Sign up at ElevenLabs**
   - Visit: https://elevenlabs.io
   - Click "Sign Up" (free tier available!)
   - Complete registration

2. **Get Your API Key**
   - Go to: https://elevenlabs.io/app/settings/api-keys
   - Click "Generate API Key"
   - Copy your key (starts with `sk_`)

### Step 2: Configure the Application

1. **Create .env File**
   ```bash
   # In your project root (deploy template/)
   cp .env.example .env
   ```

2. **Add Your API Key**
   Open `.env` and add your key:
   ```
   VUE_APP_ELEVENLABS_API_KEY=sk_your_actual_key_here
   ```

3. **Restart Development Server**
   ```bash
   npm run serve
   ```

### Step 3: Verify Configuration

1. Open the application
2. Navigate to **Training → Audio Learning**
3. Look for the banner:
   - ✅ **Green "ElevenLabs Configured!"** - You're ready!
   - ⚠️ **Yellow "Not Configured"** - Check your .env file

## Using Audio Generation

### Generate Audio from Text

1. **Navigate to Audio Learning**
   - Click Training → Audio Learning

2. **Enter Your Content**
   - Paste text in the text area
   - OR upload documents (.txt, .pdf, .doc, .docx)

3. **Configure Settings**
   - **Voice Style**: Choose Conversational, Professional, Educational, or Storytelling
   - **Duration**: Select Short, Medium, or Long
   - **Format**: Pick Podcast, Summary, Interview, or Lecture

4. **Generate**
   - Click "Generate Audio"
   - Wait for AI to create your audio (10-30 seconds)
   - Audio appears in your library ready to play!

### Playing Generated Audio

- **Real HTML5 Audio**: Full playback controls
- **Progress tracking**: Visual progress bar
- **Controls**: Play/Pause, Skip forward/backward
- **Time display**: Current time and total duration
- **Download**: Save MP3 files locally

## API Limits & Pricing

### Free Tier
- 10,000 characters/month
- Watermark on audio
- Basic voice options
- Perfect for testing!

### Creator Tier ($5/month)
- 30,000 characters/month
- No watermark
- Multiple voices
- Commercial use

### Pro Tier ($22/month)
- 100,000 characters/month
- Professional voices
- Instant voice cloning
- Priority support

**Character Counting**: The application automatically limits to 5,000 characters per generation to stay within limits.

## Voice Options

The application uses professional voices by default:

**Default Voice**: Bella (soft, professional female voice)

You can customize voices in `src/config/elevenlabs.config.js`:
```javascript
voices: {
  adam: '21m00Tcm4TlvDq8ikWAM',  // Male, deep
  rachel: '21m00Tcm4TlvDq8ikWAM', // Female, calm
  antoni: 'ErXwobaYiN019PkySvjV', // Conversational
  // Add more voices from elevenlabs.io
}
```

## Configuration Files

### `src/config/elevenlabs.config.js`
Main configuration:
- API URL and endpoint
- Voice IDs and settings
- Voice style configurations
- Model and output format

### `src/services/elevenlabs.service.js`
API service with methods:
- `generateAudio()` - Create audio from text
- `generateAudioUrl()` - Get playable URL
- `generateAndDownload()` - Download MP3
- `getVoices()` - List available voices
- `getUserInfo()` - Check subscription

### `.env`
Environment variables:
```
VUE_APP_ELEVENLABS_API_KEY=your_key_here
```

## Features

### ✅ Real-Time Generation
- Type or paste text
- Click generate
- Wait 10-30 seconds
- Audio ready!

### ✅ Smart Caching
- Generated audio cached in memory
- Prevents duplicate API calls
- Saves your quota

### ✅ Automatic Truncation
- Long text auto-limited to 5,000 chars
- Notification when truncated
- Preserves your API quota

### ✅ Error Handling
- Clear error messages
- API quota warnings
- Connection error handling
- Fallback to demo mode

### ✅ Quality Settings
Voice styles with optimized settings:
- **Conversational**: Natural, engaging (stability: 0.5)
- **Professional**: Clear, crisp (stability: 0.7)
- **Educational**: Instructive, clear (stability: 0.6)
- **Storytelling**: Dynamic, expressive (stability: 0.4)

## Troubleshooting

### "ElevenLabs Not Configured" Warning

**Solution:**
1. Check `.env` file exists
2. Verify API key is correct
3. Restart development server (`npm run serve`)
4. Clear browser cache

### "Generation Failed" Error

**Possible Causes:**
1. Invalid API key → Check key at elevenlabs.io
2. Quota exceeded → Check usage at dashboard
3. Network issue → Check internet connection
4. Text too long → Reduce content length

### "Playback Error"

**Solutions:**
1. Check browser console for errors
2. Try different browser
3. Verify audio was generated successfully
4. Check browser allows HTML5 audio

### No Audio Playing

**Checklist:**
- ✅ Green "Configured" banner showing?
- ✅ Generated NEW audio (not pre-loaded)?
- ✅ Clicked play button on generated item?
- ✅ Browser volume not muted?
- ✅ Check browser console for errors

## Advanced Configuration

### Custom Voice

Edit `src/services/elevenlabs.service.js`:
```javascript
const audioBlob = await elevenLabsService.generateAudio(textContent, {
  voiceStyle: audioSettings.value.voiceStyle,
  voiceId: 'your_voice_id_here' // Custom voice
})
```

### Model Selection

Edit `src/config/elevenlabs.config.js`:
```javascript
model: 'eleven_multilingual_v2', // 29 languages
// or
model: 'eleven_monolingual_v1',  // English only, faster
```

### Output Quality

```javascript
outputFormat: 'mp3_44100_128',    // Standard
// or
outputFormat: 'mp3_44100_192',    // High quality
outputFormat: 'pcm_16000',        // Raw audio
```

## Sample Content

Try these USER_MANUAL.md sections:
1. **Getting Started** (small, quick test)
2. **Letter Generation** (medium length)
3. **Complete Overview** (longer content)

## Best Practices

1. **Test First**: Use short text to verify setup
2. **Monitor Quota**: Check dashboard regularly
3. **Cache Results**: Don't regenerate same content
4. **Optimize Length**: Keep under 5,000 chars
5. **Use Wisely**: Each generation uses quota

## API Documentation

Official ElevenLabs docs:
- **API Reference**: https://docs.elevenlabs.io/api-reference
- **Voice Lab**: https://elevenlabs.io/voice-lab
- **Dashboard**: https://elevenlabs.io/app
- **Support**: support@elevenlabs.io

## Security Notes

⚠️ **Never commit .env file to version control!**

The `.env` file is already in `.gitignore`, but verify:
```bash
# Check .gitignore includes:
.env
```

## Next Steps

1. ✅ Get API key from elevenlabs.io
2. ✅ Add to .env file
3. ✅ Restart server
4. ✅ Generate your first audio!
5. ✅ Share with your team

---

**Version**: 1.0.0  
**Last Updated**: October 28, 2025  
**Status**: Production Ready  
**Integration**: Complete ✅


