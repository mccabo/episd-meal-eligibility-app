// ElevenLabs API Configuration
// Get your API key from: https://elevenlabs.io/app/settings/api-keys

export const ELEVENLABS_CONFIG = {
  apiKey: process.env.VUE_APP_ELEVENLABS_API_KEY || '', // Store in .env file
  apiUrl: 'https://api.elevenlabs.io/v1',
  
  // Popular voice IDs (you can browse more at elevenlabs.io)
  voices: {
    // Male voices
    adam: '21m00Tcm4TlvDq8ikWAM',  // Deep, narrative
    josh: 'TxGEqnHWrfWFTfGW9XjX',   // Young, energetic
    arnold: 'VR6AewLTigWG4xSOukaG', // Crisp, strong
    
    // Female voices  
    rachel: '21m00Tcm4TlvDq8ikWAM', // Calm, clear
    domi: 'AZnzlk1XvdvUeBnXmlld',   // Warm, strong
    bella: 'EXAVITQu4vr4xnSDxMaL',  // Soft, young
    
    // Conversational
    antoni: 'ErXwobaYiN019PkySvjV', // Well-rounded
    elli: 'MF3mGyEYCl7XYWbV9V6O',   // Emotional, whisper
    
    // Default for EPISD (professional, clear)
    default: 'EXAVITQu4vr4xnSDxMaL' // Bella - soft and professional
  },
  
  // Voice settings
  voiceSettings: {
    conversational: {
      stability: 0.5,
      similarity_boost: 0.75,
      style: 0.3,
      use_speaker_boost: true
    },
    professional: {
      stability: 0.7,
      similarity_boost: 0.8,
      style: 0.2,
      use_speaker_boost: true
    },
    educational: {
      stability: 0.6,
      similarity_boost: 0.75,
      style: 0.4,
      use_speaker_boost: true
    },
    storytelling: {
      stability: 0.4,
      similarity_boost: 0.75,
      style: 0.6,
      use_speaker_boost: true
    }
  },
  
  // Model options
  model: 'eleven_multilingual_v2', // Supports 29 languages
  
  // Output format
  outputFormat: 'mp3_44100_128' // MP3, 44.1kHz, 128kbps
}

export default ELEVENLABS_CONFIG


