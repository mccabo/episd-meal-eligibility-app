// ElevenLabs API Service
import { ELEVENLABS_CONFIG } from '@/config/elevenlabs.config'

class ElevenLabsService {
  constructor() {
    this.config = ELEVENLABS_CONFIG
    this.audioCache = new Map()
  }

  /**
   * Check if API key is configured
   */
  isConfigured() {
    const isConfigured = !!this.config.apiKey && this.config.apiKey !== ''
    console.log('ElevenLabs Configuration Check:', {
      hasApiKey: !!this.config.apiKey,
      apiKeyLength: this.config.apiKey?.length || 0,
      isConfigured,
      envVar: process.env.VUE_APP_ELEVENLABS_API_KEY ? 'Set' : 'Not Set'
    })
    return isConfigured
  }

  /**
   * Generate audio from text using ElevenLabs API
   * @param {string} text - The text to convert to speech
   * @param {Object} options - Generation options
   * @returns {Promise<Blob>} Audio blob
   */
  async generateAudio(text, options = {}) {
    if (!this.isConfigured()) {
      throw new Error('ElevenLabs API key not configured. Please set VUE_APP_ELEVENLABS_API_KEY in your .env file.')
    }

    const {
      voiceId = this.config.voices.default,
      voiceStyle = 'professional',
      model = this.config.model,
      outputFormat = this.config.outputFormat
    } = options

    // Get voice settings based on style
    const voiceSettings = this.config.voiceSettings[voiceStyle] || this.config.voiceSettings.professional

    try {
      const response = await fetch(
        `${this.config.apiUrl}/text-to-speech/${voiceId}?output_format=${outputFormat}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': this.config.apiKey
          },
          body: JSON.stringify({
            text,
            model_id: model,
            voice_settings: voiceSettings
          })
        }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail?.message || 'Failed to generate audio')
      }

      const audioBlob = await response.blob()
      return audioBlob
    } catch (error) {
      console.error('ElevenLabs API Error:', error)
      throw error
    }
  }

  /**
   * Generate audio and create a URL for playback
   * @param {string} text - Text to convert
   * @param {Object} options - Generation options
   * @returns {Promise<string>} Audio URL
   */
  async generateAudioUrl(text, options = {}) {
    // Check cache first
    const cacheKey = `${text.substring(0, 50)}-${options.voiceStyle}`
    if (this.audioCache.has(cacheKey)) {
      return this.audioCache.get(cacheKey)
    }

    const audioBlob = await this.generateAudio(text, options)
    const audioUrl = URL.createObjectURL(audioBlob)
    
    // Cache the URL
    this.audioCache.set(cacheKey, audioUrl)
    
    return audioUrl
  }

  /**
   * Generate audio and download as file
   * @param {string} text - Text to convert
   * @param {string} filename - Output filename
   * @param {Object} options - Generation options
   */
  async generateAndDownload(text, filename = 'audio.mp3', options = {}) {
    const audioBlob = await this.generateAudio(text, options)
    
    // Create download link
    const url = URL.createObjectURL(audioBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Clean up
    setTimeout(() => URL.revokeObjectURL(url), 100)
  }

  /**
   * Get available voices from ElevenLabs
   * @returns {Promise<Array>} List of available voices
   */
  async getVoices() {
    if (!this.isConfigured()) {
      return []
    }

    try {
      const response = await fetch(`${this.config.apiUrl}/voices`, {
        headers: {
          'xi-api-key': this.config.apiKey
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch voices')
      }

      const data = await response.json()
      return data.voices
    } catch (error) {
      console.error('Error fetching voices:', error)
      return []
    }
  }

  /**
   * Get user subscription info
   * @returns {Promise<Object>} Subscription details
   */
  async getUserInfo() {
    if (!this.isConfigured()) {
      throw new Error('API key not configured')
    }

    try {
      const response = await fetch(`${this.config.apiUrl}/user`, {
        headers: {
          'xi-api-key': this.config.apiKey
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch user info')
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching user info:', error)
      throw error
    }
  }

  /**
   * Clear cached audio URLs
   */
  clearCache() {
    this.audioCache.forEach(url => URL.revokeObjectURL(url))
    this.audioCache.clear()
  }

  /**
   * Get voice ID by name
   * @param {string} voiceName - Voice name (e.g., 'rachel', 'adam')
   * @returns {string} Voice ID
   */
  getVoiceId(voiceName) {
    return this.config.voices[voiceName.toLowerCase()] || this.config.voices.default
  }
}

export default new ElevenLabsService()

