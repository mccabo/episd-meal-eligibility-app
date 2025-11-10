# Training Playback Information

## Current Status: Demo Mode

The Training Center's Audio and Video modules are currently running in **demo/simulation mode** with sample content based on the USER_MANUAL.md file.

### What Works Now ✅

#### Audio Learning
- **12 pre-configured audio episodes** covering all EPISD system topics
- **Simulated playback** with:
  - Real-time progress tracking
  - Play/Pause controls
  - Skip forward/backward (10 seconds)
  - Progress bar visualization
  - Time display (current/total)
  - Visual feedback notifications
- **Download simulation** with notification
- Full UI experience identical to production

#### Video Learning
- **10 tutorial videos** with metadata and descriptions
- **AI Annotations** with clickable timestamps
- **Simulated playback** with:
  - Progress bar tracking
  - Time progression
  - Annotation navigation (click to jump)
  - Play/Pause controls
  - Fullscreen option
  - Visual feedback
- Full category filtering (Tutorial, Lecture, Demo)

### Demo Mode Features

**Visual Indicators:**
- Yellow banner in Audio Learning
- Blue banner in Video Learning
- Toast notifications explaining demo mode
- "Demo Mode" messages on playback

**Simulated Functionality:**
- Timer counts in real-time (1 second = 1 second)
- Progress bars update dynamically
- Annotations are clickable and jump to correct timestamps
- Completion notifications appear
- All controls respond to user actions

### How to Enable Real Media

#### Option 1: Audio Generation APIs

**ElevenLabs Integration:**
```javascript
// Example: Generate audio from text
const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/{voice_id}', {
  method: 'POST',
  headers: {
    'xi-api-key': YOUR_API_KEY,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    text: sourceContent.value,
    voice_settings: {
      stability: 0.5,
      similarity_boost: 0.75
    }
  })
})

const audioBlob = await response.blob()
const audioUrl = URL.createObjectURL(audioBlob)
// Play audio using HTML5 Audio API
```

**Google Text-to-Speech:**
```javascript
import { TextToSpeechClient } from '@google-cloud/text-to-speech'

const client = new TextToSpeechClient()
const [response] = await client.synthesizeSpeech({
  input: { text: sourceContent.value },
  voice: { languageCode: 'en-US', name: 'en-US-Neural2-F' },
  audioConfig: { audioEncoding: 'MP3' }
})

// response.audioContent contains the MP3 data
```

#### Option 2: Upload Pre-recorded Audio

1. **Record audio files** (MP3, WAV)
2. **Store in public folder** or cloud storage (AWS S3, Firebase Storage)
3. **Update audioLibrary** with actual URLs:

```javascript
{
  id: 1,
  title: 'EPISD System Overview',
  audioUrl: '/audio/episd-overview.mp3', // Actual file path
  duration: '28:45',
  // ... other metadata
}
```

4. **Use HTML5 Audio API:**

```javascript
const audio = new Audio(audioUrl)
audio.play()
audio.addEventListener('timeupdate', () => {
  currentTime.value = audio.currentTime
  progress.value = (audio.currentTime / audio.duration) * 100
})
```

#### Option 3: Video Integration

**YouTube/Vimeo Embed:**
```vue
<iframe
  :src="`https://www.youtube.com/embed/${video.youtubeId}`"
  frameborder="0"
  allowfullscreen
></iframe>
```

**Self-hosted MP4:**
```vue
<video controls>
  <source :src="video.videoUrl" type="video/mp4">
</video>
```

**Video.js Integration:**
```javascript
import videojs from 'video.js'

const player = videojs('my-video', {
  controls: true,
  autoplay: false,
  preload: 'auto'
})

player.src({ type: 'video/mp4', src: videoUrl })
```

### Implementation Steps

1. **Choose your media source** (API, uploads, or hosting)
2. **Update component logic** to use real audio/video elements
3. **Replace simulated intervals** with actual media events
4. **Store media URLs** in your data structure
5. **Add error handling** for loading failures
6. **Test playback** across browsers

### Current Files

**Audio Learning:** `src/components/AudioLearning.vue`  
**Video Learning:** `src/components/VideoLearning.vue`

### Content Available

All content is organized around EPISD system topics:
- System basics and navigation
- Importing applications
- Search and filtering
- Letter generation
- Batch processing
- Troubleshooting
- Best practices
- Training center features

### Benefits of Current Demo Mode

✅ **Fully functional UI** - Test all interactions  
✅ **Real progress tracking** - Experience the flow  
✅ **Content exploration** - Browse all topics  
✅ **User feedback** - Notifications work perfectly  
✅ **Development ready** - Easy to swap in real media  
✅ **Training value** - Users can still learn from descriptions and annotations  

### Next Steps

1. **Test the demo** - Experience all features
2. **Choose integration method** - API or files
3. **Implement real media** - Follow guides above
4. **Update configurations** - API keys, URLs
5. **Deploy** - Go live with actual audio/video

---

**Version:** 1.0.0  
**Last Updated:** October 28, 2025  
**Status:** Demo Mode Active  
**Ready for:** Real media integration


