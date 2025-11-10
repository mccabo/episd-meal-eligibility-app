<template>
  <div class="audio-learning">
    <div class="page-header">
      <h1><i class="pi pi-volume-up"></i> Audio Learning</h1>
      <p>Generate AI-powered audio summaries and podcasts from your content</p>
    </div>

    <!-- Configuration Status Banner -->
    <div v-if="!isElevenLabsConfigured" class="demo-banner warning">
      <i class="pi pi-exclamation-triangle"></i>
      <div class="banner-content">
        <strong>ElevenLabs Not Configured:</strong> To generate real AI audio, add your API key to `.env` file: 
        <code style="background: rgba(0,0,0,0.1); padding: 2px 6px; border-radius: 4px;">VUE_APP_ELEVENLABS_API_KEY=your_key_here</code>
        <span class="banner-note">Get your free API key at <a href="https://elevenlabs.io" target="_blank" style="color: #78350f; font-weight: 700;">elevenlabs.io</a></span>
      </div>
    </div>
    <div v-else class="demo-banner success">
      <i class="pi pi-check-circle"></i>
      <div class="banner-content">
        <strong>ElevenLabs Configured!</strong> You can now generate real AI audio from text. 
        Paste content below and click "Generate Audio" to create professional voice-overs.
        <span class="banner-note">Pre-loaded sample audios are in demo mode. Generate new ones for real playback.</span>
      </div>
    </div>

    <div class="content-section">
      <div class="upload-section">
        <h2>Generate Audio Content</h2>
        <div class="input-group">
          <label>Upload Documents or Paste Text</label>
          <textarea
            v-model="sourceContent"
            placeholder="Paste your content here, or upload files below..."
            rows="8"
          ></textarea>
        </div>

        <div class="file-upload">
          <button class="btn-upload" @click="triggerFileUpload">
            <i class="pi pi-upload"></i> Upload Files
          </button>
          <input
            type="file"
            ref="fileInput"
            @change="handleFileUpload"
            multiple
            accept=".txt,.pdf,.doc,.docx"
            style="display: none"
          />
          <span v-if="uploadedFiles.length > 0" class="file-count">
            {{ uploadedFiles.length }} file(s) uploaded
          </span>
        </div>

        <div class="audio-options">
          <div class="option-group">
            <label>Voice Style</label>
            <select v-model="audioSettings.voiceStyle">
              <option value="conversational">Conversational</option>
              <option value="professional">Professional</option>
              <option value="educational">Educational</option>
              <option value="storytelling">Storytelling</option>
            </select>
          </div>

          <div class="option-group">
            <label>Duration</label>
            <select v-model="audioSettings.duration">
              <option value="short">Short (5-10 min)</option>
              <option value="medium">Medium (10-20 min)</option>
              <option value="long">Long (20+ min)</option>
            </select>
          </div>

          <div class="option-group">
            <label>Format</label>
            <select v-model="audioSettings.format">
              <option value="podcast">Podcast Discussion</option>
              <option value="summary">Summary</option>
              <option value="interview">Q&A Interview</option>
              <option value="lecture">Lecture</option>
            </select>
          </div>
        </div>

        <button class="btn-generate" @click="generateAudio" :disabled="isGenerating">
          <i class="pi pi-play-circle"></i>
          {{ isGenerating ? 'Generating...' : 'Generate Audio' }}
        </button>
      </div>

      <div class="audio-library">
        <h2>Your Audio Library</h2>
        <div class="audio-list">
          <div v-for="audio in audioLibrary" :key="audio.id" class="audio-item">
            <div class="audio-icon">
              <i class="pi pi-microphone"></i>
            </div>
            <div class="audio-info">
              <h3>{{ audio.title }}</h3>
              <p>{{ audio.description }}</p>
              <span class="audio-meta">{{ audio.duration }} • {{ audio.date }}</span>
            </div>
            <div class="audio-controls">
              <button class="btn-play" @click="playAudio(audio.id)">
                <i :class="currentPlaying === audio.id ? 'pi pi-pause' : 'pi pi-play'"></i>
              </button>
              <button class="btn-download" @click="downloadAudio(audio.id)">
                <i class="pi pi-download"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Audio Player -->
    <div v-if="currentPlaying" class="audio-player-bar">
      <div class="player-content">
        <div class="player-info">
          <i class="pi pi-music"></i>
          <span>{{ getCurrentAudio()?.title }}</span>
        </div>
        <div class="player-controls">
          <button @click="skipBackward">
            <i class="pi pi-step-backward"></i>
          </button>
          <button @click="togglePlayPause" class="btn-play-main">
            <i :class="isPlaying ? 'pi pi-pause' : 'pi pi-play'"></i>
          </button>
          <button @click="skipForward">
            <i class="pi pi-step-forward"></i>
          </button>
        </div>
        <div class="player-progress">
          <span>{{ formatTime(currentTime) }}</span>
          <input
            type="range"
            min="0"
            :max="duration"
            v-model="currentTime"
            class="progress-bar"
          />
          <span>{{ formatTime(duration) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import elevenLabsService from '@/services/elevenlabs.service'

export default {
  name: 'AudioLearning',
  setup() {
    const toast = useToast()
    const isElevenLabsConfigured = ref(elevenLabsService.isConfigured())
    const sourceContent = ref('')
    const uploadedFiles = ref([])
    const fileInput = ref(null)
    const isGenerating = ref(false)
    const currentPlaying = ref(null)
    const isPlaying = ref(false)
    const currentTime = ref(0)
    const duration = ref(180)

    const audioSettings = ref({
      voiceStyle: 'conversational',
      duration: 'medium',
      format: 'podcast'
    })

    const audioLibrary = ref([
      {
        id: 1,
        title: 'EPISD Application System - Complete Overview',
        description: 'AI-generated podcast covering the entire Free and Reduced Lunch Eligibility Application system, from login to letter generation',
        duration: '28:45',
        date: '2025-10-28',
        source: 'USER_MANUAL.md',
        format: 'podcast',
        voiceStyle: 'conversational'
      },
      {
        id: 2,
        title: 'Getting Started: Your First Day with the Application',
        description: 'Conversational walkthrough for new users - accessing the application, understanding user roles, and navigating the interface',
        duration: '12:30',
        date: '2025-10-28',
        source: 'USER_MANUAL.md - Getting Started',
        format: 'summary',
        voiceStyle: 'educational'
      },
      {
        id: 3,
        title: 'Core Features Deep Dive: Applications Tab Explained',
        description: 'Detailed discussion about importing applications, using search and filter features, and managing application data',
        duration: '18:20',
        date: '2025-10-28',
        source: 'USER_MANUAL.md - Core Features',
        format: 'podcast',
        voiceStyle: 'professional'
      },
      {
        id: 4,
        title: 'Letter Generation Masterclass',
        description: 'Step-by-step guide to generating eligibility letters in English and Spanish, including batch processing and PDF management',
        duration: '15:45',
        date: '2025-10-28',
        source: 'USER_MANUAL.md - Step-by-Step Workflows',
        format: 'lecture',
        voiceStyle: 'educational'
      },
      {
        id: 5,
        title: 'Advanced Features: Utilities and Customization',
        description: 'Q&A style interview exploring advanced features like JSON editing, bulk operations, and data export capabilities',
        duration: '21:15',
        date: '2025-10-28',
        source: 'USER_MANUAL.md - Advanced Features',
        format: 'interview',
        voiceStyle: 'conversational'
      },
      {
        id: 6,
        title: 'Training Center Quick Start',
        description: 'Introduction to all five training modules: Audio Learning, Video Learning, Mind Maps, Flash Cards, and Quizzes',
        duration: '16:30',
        date: '2025-10-28',
        source: 'USER_MANUAL.md - Training Center',
        format: 'summary',
        voiceStyle: 'educational'
      },
      {
        id: 7,
        title: 'Troubleshooting Common Issues',
        description: 'Practical solutions to the most common problems users encounter, from login issues to printing problems',
        duration: '14:20',
        date: '2025-10-28',
        source: 'USER_MANUAL.md - Troubleshooting',
        format: 'podcast',
        voiceStyle: 'conversational'
      },
      {
        id: 8,
        title: 'Best Practices for Efficient Processing',
        description: 'Expert tips and workflow optimization strategies for processing applications quickly and accurately',
        duration: '11:45',
        date: '2025-10-28',
        source: 'USER_MANUAL.md - Best Practices',
        format: 'lecture',
        voiceStyle: 'professional'
      },
      {
        id: 9,
        title: 'Search and Filter: Finding Applications Fast',
        description: 'Master the search functionality with examples of search by name, status, campus, batch number, and date range',
        duration: '9:30',
        date: '2025-10-28',
        source: 'USER_MANUAL.md - Core Features',
        format: 'summary',
        voiceStyle: 'educational'
      },
      {
        id: 10,
        title: 'Understanding User Roles and Permissions',
        description: 'Explanation of Administrator vs Standard User roles and what each role can do in the system',
        duration: '8:15',
        date: '2025-10-28',
        source: 'USER_MANUAL.md - Getting Started',
        format: 'summary',
        voiceStyle: 'professional'
      },
      {
        id: 11,
        title: 'Batch Processing Strategy',
        description: 'Deep dive into organizing applications by batch number, bulk operations, and efficient letter generation workflow',
        duration: '13:40',
        date: '2025-10-28',
        source: 'USER_MANUAL.md - Step-by-Step Workflows',
        format: 'podcast',
        voiceStyle: 'conversational'
      },
      {
        id: 12,
        title: 'FAQ: Your Questions Answered',
        description: 'Comprehensive Q&A covering eligibility requirements, data security, access requests, and system updates',
        duration: '19:25',
        date: '2025-10-28',
        source: 'USER_MANUAL.md - FAQ',
        format: 'interview',
        voiceStyle: 'conversational'
      }
    ])

    const triggerFileUpload = () => {
      fileInput.value.click()
    }

    const handleFileUpload = (event) => {
      const files = Array.from(event.target.files)
      uploadedFiles.value = files
      toast.add({
        severity: 'success',
        summary: 'Files Uploaded',
        detail: `${files.length} file(s) uploaded successfully`,
        life: 3000
      })
    }

    const generateAudio = async () => {
      if (!sourceContent.value && uploadedFiles.value.length === 0) {
        toast.add({
          severity: 'warn',
          summary: 'No Content',
          detail: 'Please provide content or upload files',
          life: 3000
        })
        return
      }

      // Check if ElevenLabs is configured
      if (!isElevenLabsConfigured.value) {
        toast.add({
          severity: 'warn',
          summary: 'ElevenLabs Not Configured',
          detail: 'Set VUE_APP_ELEVENLABS_API_KEY in .env to generate real audio. Generating demo audio...',
          life: 5000
        })
        
        // Fallback to demo generation
        generateDemoAudio()
        return
      }

      isGenerating.value = true
      toast.add({
        severity: 'info',
        summary: 'Generating Audio with AI',
        detail: 'ElevenLabs is creating your audio content...',
        life: 3000
      })

      try {
        // Prepare text content
        let textContent = sourceContent.value
        
        // If files were uploaded, use first file name as reference
        if (uploadedFiles.value.length > 0) {
          textContent = `Content from ${uploadedFiles.value[0].name}. ${sourceContent.value}`
        }

        // Truncate if too long (ElevenLabs has character limits)
        const maxLength = 5000 // Adjust based on your plan
        if (textContent.length > maxLength) {
          textContent = textContent.substring(0, maxLength) + '...'
          toast.add({
            severity: 'info',
            summary: 'Content Truncated',
            detail: `Text limited to ${maxLength} characters for API limits`,
            life: 3000
          })
        }

        // Generate audio using ElevenLabs
        const audioBlob = await elevenLabsService.generateAudio(textContent, {
          voiceStyle: audioSettings.value.voiceStyle,
          voiceId: elevenLabsService.getVoiceId('bella') // You can make this selectable
        })

        // Create object URL for playback
        const audioUrl = URL.createObjectURL(audioBlob)

        // Calculate approximate duration (rough estimate: 150 words per minute)
        const wordCount = textContent.split(/\s+/).length
        const estimatedMinutes = Math.ceil(wordCount / 150)
        const duration = `${estimatedMinutes}:00`

        // Add to library
        const newAudio = {
          id: Date.now(),
          title: `Generated Audio ${audioLibrary.value.length + 1}`,
          description: `${audioSettings.value.format} in ${audioSettings.value.voiceStyle} style - Generated by ElevenLabs`,
          duration: duration,
          date: new Date().toISOString().split('T')[0],
          audioUrl: audioUrl, // Real audio URL
          isReal: true // Flag to indicate real audio
        }
        
        audioLibrary.value.unshift(newAudio)
        isGenerating.value = false
        
        toast.add({
          severity: 'success',
          summary: 'Audio Generated Successfully!',
          detail: 'Your AI-powered audio is ready to play',
          life: 5000
        })
        
        // Clear the input
        sourceContent.value = ''
        uploadedFiles.value = []
        
      } catch (error) {
        console.error('Audio generation error:', error)
        isGenerating.value = false
        
        toast.add({
          severity: 'error',
          summary: 'Generation Failed',
          detail: error.message || 'Failed to generate audio. Check your API key and quota.',
          life: 7000
        })
      }
    }

    const generateDemoAudio = () => {
      const newAudio = {
        id: Date.now(),
        title: `Demo Audio ${audioLibrary.value.length + 1}`,
        description: `${audioSettings.value.format} in ${audioSettings.value.voiceStyle} style (Demo Mode)`,
        duration: audioSettings.value.duration === 'short' ? '8:30' : audioSettings.value.duration === 'medium' ? '15:45' : '25:30',
        date: new Date().toISOString().split('T')[0],
        isReal: false
      }
      audioLibrary.value.unshift(newAudio)
      isGenerating.value = false
      
      toast.add({
        severity: 'info',
        summary: 'Demo Audio Generated',
        detail: 'Configure ElevenLabs API key for real audio generation',
        life: 5000
      })
    }

    let audioElement = null // Store HTML5 Audio element

    const playAudio = (id) => {
      const audio = audioLibrary.value.find(a => a.id === id)
      if (!audio) return

      if (currentPlaying.value === id) {
        // Stop current audio
        if (audioElement) {
          audioElement.pause()
          audioElement = null
        }
        currentPlaying.value = null
        isPlaying.value = false
        return
      }

      // Stop any currently playing audio
      if (audioElement) {
        audioElement.pause()
        audioElement = null
      }

      currentPlaying.value = id
      isPlaying.value = true

      // Check if this is real audio with URL
      if (audio.isReal && audio.audioUrl) {
        // Play real audio using HTML5 Audio API
        audioElement = new Audio(audio.audioUrl)
        
        // Set up event listeners
        audioElement.addEventListener('loadedmetadata', () => {
          duration.value = Math.floor(audioElement.duration)
          currentTime.value = 0
        })

        audioElement.addEventListener('timeupdate', () => {
          currentTime.value = Math.floor(audioElement.currentTime)
        })

        audioElement.addEventListener('ended', () => {
          currentPlaying.value = null
          isPlaying.value = false
          audioElement = null
          toast.add({
            severity: 'success',
            summary: 'Playback Complete',
            detail: 'Audio finished playing',
            life: 2000
          })
        })

        audioElement.addEventListener('error', (e) => {
          toast.add({
            severity: 'error',
            summary: 'Playback Error',
            detail: 'Failed to play audio file',
            life: 3000
          })
          currentPlaying.value = null
          isPlaying.value = false
          audioElement = null
        })

        // Start playback
        audioElement.play().catch(error => {
          console.error('Playback error:', error)
          toast.add({
            severity: 'error',
            summary: 'Playback Error',
            detail: 'Could not start audio playback',
            life: 3000
          })
        })

        toast.add({
          severity: 'success',
          summary: 'Playing Real Audio',
          detail: 'ElevenLabs generated audio is now playing',
          life: 2000
        })
      } else {
        // Simulated playback for demo content
        toast.add({
          severity: 'info',
          summary: 'Demo Mode',
          detail: 'This is simulated playback. Generate new audio with ElevenLabs for real playback.',
          life: 4000
        })
        
        const [mins, secs] = audio.duration.split(':').map(Number)
        duration.value = (mins * 60) + secs
        currentTime.value = 0
        
        // Simulate time progression
        const interval = setInterval(() => {
          if (isPlaying.value && currentTime.value < duration.value) {
            currentTime.value += 1
          } else {
            clearInterval(interval)
            if (currentTime.value >= duration.value) {
              currentPlaying.value = null
              isPlaying.value = false
              toast.add({
                severity: 'success',
                summary: 'Playback Complete',
                detail: 'Simulated audio finished',
                life: 2000
              })
            }
          }
        }, 1000)
      }
    }

    const downloadAudio = (id) => {
      const audio = audioLibrary.value.find(a => a.id === id)
      toast.add({
        severity: 'info',
        summary: 'Demo Mode - Download',
        detail: `In production, "${audio?.title}" would download as an MP3 file. This is a simulation.`,
        life: 4000
      })
    }

    const getCurrentAudio = () => {
      return audioLibrary.value.find(a => a.id === currentPlaying.value)
    }

    const togglePlayPause = () => {
      if (audioElement) {
        // Control real audio
        if (isPlaying.value) {
          audioElement.pause()
          isPlaying.value = false
        } else {
          audioElement.play()
          isPlaying.value = true
        }
      } else {
        // Toggle simulated playback
        isPlaying.value = !isPlaying.value
      }
      
      toast.add({
        severity: 'info',
        summary: isPlaying.value ? 'Playing' : 'Paused',
        detail: isPlaying.value ? 'Audio playback resumed' : 'Audio playback paused',
        life: 1000
      })
    }

    const skipBackward = () => {
      if (audioElement) {
        audioElement.currentTime = Math.max(0, audioElement.currentTime - 10)
      } else {
        currentTime.value = Math.max(0, currentTime.value - 10)
      }
    }

    const skipForward = () => {
      if (audioElement) {
        audioElement.currentTime = Math.min(audioElement.duration, audioElement.currentTime + 10)
      } else {
        currentTime.value = Math.min(duration.value, currentTime.value + 10)
      }
    }

    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60)
      const secs = Math.floor(seconds % 60)
      return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    return {
      sourceContent,
      uploadedFiles,
      fileInput,
      isGenerating,
      audioSettings,
      audioLibrary,
      currentPlaying,
      isPlaying,
      currentTime,
      duration,
      triggerFileUpload,
      handleFileUpload,
      generateAudio,
      playAudio,
      downloadAudio,
      getCurrentAudio,
      togglePlayPause,
      skipBackward,
      skipForward,
      formatTime,
      isElevenLabsConfigured
    }
  }
}
</script>

<style scoped>
.audio-learning {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  padding-bottom: 100px;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.page-header p {
  font-size: 1.1rem;
  color: #666;
}

.content-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.upload-section,
.audio-library {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.input-group {
  margin-bottom: 1.5rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #555;
}

textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
}

textarea:focus {
  outline: none;
  border-color: #667eea;
}

.file-upload {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.btn-upload {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.btn-upload:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.file-count {
  color: #667eea;
  font-weight: 600;
}

.audio-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.option-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #555;
  font-size: 0.9rem;
}

select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

select:focus {
  outline: none;
  border-color: #667eea;
}

.btn-generate {
  width: 100%;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.btn-generate:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}

.btn-generate:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.audio-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.audio-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.audio-item:hover {
  border-color: #667eea;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
}

.audio-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.audio-icon i {
  font-size: 1.5rem;
  color: white;
}

.audio-info {
  flex-grow: 1;
}

.audio-info h3 {
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
  color: #2c3e50;
}

.audio-info p {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.audio-meta {
  font-size: 0.85rem;
  color: #999;
}

.audio-controls {
  display: flex;
  gap: 0.5rem;
}

.btn-play,
.btn-download {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: #667eea;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.btn-play:hover,
.btn-download:hover {
  background: #764ba2;
  transform: scale(1.1);
}

.audio-player-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.player-content {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto 2fr;
  gap: 2rem;
  align-items: center;
}

.player-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
}

.player-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.player-controls button {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.player-controls button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.btn-play-main {
  width: 50px !important;
  height: 50px !important;
}

.player-progress {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-bar {
  flex-grow: 1;
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.3);
  appearance: none;
}

.progress-bar::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
}

.demo-banner {
  border-radius: 12px;
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.demo-banner.warning {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border: 2px solid #f59e0b;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.2);
}

.demo-banner.warning i {
  font-size: 1.5rem;
  color: #d97706;
  flex-shrink: 0;
}

.demo-banner.success {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  border: 2px solid #10b981;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);
}

.demo-banner.success i {
  font-size: 1.5rem;
  color: #059669;
  flex-shrink: 0;
}

.banner-content {
  color: #92400e;
  line-height: 1.6;
}

.banner-content strong {
  color: #78350f;
  font-weight: 700;
}

.banner-note {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.9rem;
  color: #a16207;
}

@media (max-width: 1024px) {
  .content-section {
    grid-template-columns: 1fr;
  }

  .player-content {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>


