<template>
  <div class="ai-prompt-container">
    <div class="card">
      <h2 class="title">AI Prompt Assistant</h2>
      <p class="subtitle">Enter your prompt below and let AI help you</p>
      
      <!-- Image URL Section -->
      <div class="image-section">
        <h3 class="section-title">📷 Add Image (Optional)</h3>
        
        <!-- Google Images Search -->
        <div class="search-group">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search Google Images..."
            class="search-input"
            @keypress.enter="searchGoogleImages"
            :disabled="isLoading"
          />
          <button
            @click="searchGoogleImages"
            class="search-btn"
            :disabled="isLoading || !searchQuery.trim()"
          >
            🔍 Search
          </button>
        </div>

        <!-- Image URL Input (auto-loads) -->
        <div class="image-input-group">
          <input
            v-model="imageUrl"
            type="text"
            placeholder="Or paste image URL directly (auto-loads when you click away)"
            class="image-url-input"
            :disabled="isLoading"
            @blur="onImageUrlChange"
            @keypress.enter="onImageUrlChange"
          />
          <span v-if="isDownloading" class="loading-indicator">
            <span class="spinner-small"></span> Loading...
          </span>
        </div>
        
        <!-- Image Preview -->
        <div v-if="downloadedImage" class="image-preview-container">
          <div class="image-preview-header">
            <span class="preview-label">✓ Image Loaded</span>
            <button @click="removeImage" class="remove-image-btn" :disabled="isLoading">
              ✕ Remove
            </button>
          </div>
          <img :src="downloadedImage" alt="Downloaded image" class="image-preview" />
          <p class="image-info">Image will be included with your prompt</p>
        </div>
      </div>
      
      <div class="prompt-section">
        <textarea
          v-model="promptText"
          :placeholder="downloadedImage ? 'Describe what you want to know about this image...' : 'Enter your AI prompt here...'"
          class="prompt-textarea"
          rows="10"
          :disabled="isLoading"
        ></textarea>
        
        <div class="button-section">
          <button
            @click="submitPrompt"
            class="submit-btn"
            :disabled="isLoading || !promptText.trim()"
          >
            <span v-if="!isLoading">Submit Prompt</span>
            <span v-else>Processing...</span>
          </button>
          
          <button
            @click="clearPrompt"
            class="clear-btn"
            :disabled="isLoading"
          >
            Clear
          </button>
        </div>
      </div>
      
      <!-- Status Messages -->
      <div v-if="statusMessage" class="status-message" :class="statusType">
        {{ statusMessage }}
      </div>
      
      <!-- Response Display -->
      <div v-if="aiResponse" class="response-section">
        <h3>AI Response:</h3>
        <div class="response-content">
          {{ aiResponse }}
        </div>
        <div class="firebase-status">
          <span class="status-icon">✓</span> Deployed to Firebase
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import API_BASE_URL from '@/config/api';

export default {
  name: 'AIPrompt',
  setup() {
    const promptText = ref('');
    const aiResponse = ref('');
    const isLoading = ref(false);
    const isDownloading = ref(false);
    const statusMessage = ref('');
    const statusType = ref('');
    const imageUrl = ref('');
    const downloadedImage = ref('');
    const imageData = ref(null);
    const searchQuery = ref('');
    const lastLoadedUrl = ref('');

    const showStatus = (message, type = 'info') => {
      statusMessage.value = message;
      statusType.value = type;
      
      setTimeout(() => {
        statusMessage.value = '';
        statusType.value = '';
      }, 5000);
    };

    const searchGoogleImages = () => {
      if (!searchQuery.value.trim()) {
        showStatus('Please enter a search term', 'error');
        return;
      }

      // Open Google Images in a new tab with the search query
      const searchUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(searchQuery.value)}`;
      window.open(searchUrl, '_blank');
      showStatus('Google Images opened. Right-click an image and copy its URL, then paste it in the field below.', 'info');
    };

    const onImageUrlChange = () => {
      // Auto-load image when URL changes (and it's different from last loaded)
      if (imageUrl.value.trim() && imageUrl.value !== lastLoadedUrl.value) {
        downloadImage();
      }
    };

    const downloadImage = async () => {
      if (!imageUrl.value.trim()) {
        showStatus('Please enter an image URL', 'error');
        return;
      }

      // Prevent re-downloading the same image
      if (imageUrl.value === lastLoadedUrl.value && downloadedImage.value) {
        return;
      }

      isDownloading.value = true;
      showStatus('Loading image...', 'info');

      try {
        // Fetch the image through the server to avoid CORS issues
        const response = await axios.post(`${API_BASE_URL}/download-image`, {
          imageUrl: imageUrl.value
        });

        if (response.data.success) {
          downloadedImage.value = response.data.imageData;
          imageData.value = response.data.imageData;
          lastLoadedUrl.value = imageUrl.value; // Remember this URL
          showStatus('Image loaded successfully!', 'success');
        } else {
          showStatus(response.data.error || 'Failed to load image', 'error');
        }
      } catch (error) {
        console.error('Error downloading image:', error);
        showStatus('Failed to load image: ' + (error.response?.data?.error || error.message), 'error');
      } finally {
        isDownloading.value = false;
      }
    };

    const removeImage = () => {
      downloadedImage.value = '';
      imageData.value = null;
      imageUrl.value = '';
      lastLoadedUrl.value = '';
      showStatus('Image removed', 'info');
    };

    const submitPrompt = async () => {
      if (!promptText.value.trim()) {
        showStatus('Please enter a prompt', 'error');
        return;
      }

      isLoading.value = true;
      aiResponse.value = '';
      showStatus('Processing your prompt...', 'info');

      try {
        const payload = {
          prompt: promptText.value
        };

        // Include image if one was downloaded
        if (imageData.value) {
          payload.image = imageData.value;
          payload.imageUrl = imageUrl.value;
        }

        const response = await axios.post(`${API_BASE_URL}/ai-prompt`, payload);

        if (response.data.success) {
          aiResponse.value = response.data.response;
          showStatus('Prompt processed and deployed to Firebase successfully!', 'success');
        } else {
          showStatus(response.data.error || 'Error processing prompt', 'error');
        }
      } catch (error) {
        console.error('Error submitting prompt:', error);
        showStatus('Failed to process prompt: ' + (error.response?.data?.error || error.message), 'error');
      } finally {
        isLoading.value = false;
      }
    };

    const clearPrompt = () => {
      promptText.value = '';
      aiResponse.value = '';
      statusMessage.value = '';
      downloadedImage.value = '';
      imageData.value = null;
      imageUrl.value = '';
      lastLoadedUrl.value = '';
      searchQuery.value = '';
    };

    return {
      promptText,
      aiResponse,
      isLoading,
      isDownloading,
      statusMessage,
      statusType,
      imageUrl,
      downloadedImage,
      searchQuery,
      submitPrompt,
      clearPrompt,
      downloadImage,
      removeImage,
      searchGoogleImages,
      onImageUrlChange
    };
  }
};
</script>

<style scoped>
.ai-prompt-container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.title {
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.subtitle {
  color: #7f8c8d;
  font-size: 1rem;
  margin-bottom: 2rem;
}

.image-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 2px dashed #e0e0e0;
}

.section-title {
  color: #2c3e50;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.search-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.search-input {
  flex: 1;
  padding: 0.75rem;
  font-size: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #3498db;
}

.search-input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.search-btn {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  transition: all 0.3s;
  white-space: nowrap;
}

.search-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.4);
}

.search-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
  transform: none;
}

.image-input-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
  position: relative;
}

.image-url-input {
  flex: 1;
  padding: 0.75rem;
  font-size: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: border-color 0.3s;
}

.image-url-input:focus {
  outline: none;
  border-color: #667eea;
}

.image-url-input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.loading-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  font-weight: 600;
  font-size: 0.9rem;
  white-space: nowrap;
}

.spinner-small {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 3px solid rgba(102, 126, 234, 0.3);
  border-radius: 50%;
  border-top-color: #667eea;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.download-btn {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  transition: all 0.3s;
  white-space: nowrap;
}

.download-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}

.download-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
  transform: none;
}

.image-preview-container {
  margin-top: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 2px solid #10b981;
}

.image-preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.preview-label {
  color: #10b981;
  font-weight: 600;
  font-size: 0.95rem;
}

.remove-image-btn {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: #e74c3c;
  color: white;
  font-weight: 600;
  transition: all 0.3s;
}

.remove-image-btn:hover:not(:disabled) {
  background: #c0392b;
  transform: translateY(-1px);
}

.remove-image-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.image-preview {
  width: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: 8px;
  display: block;
  margin: 0 auto;
}

.image-info {
  margin-top: 0.75rem;
  text-align: center;
  color: #7f8c8d;
  font-size: 0.9rem;
  font-style: italic;
}

.prompt-section {
  margin-bottom: 1.5rem;
}

.prompt-textarea {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  resize: vertical;
  font-family: 'Consolas', 'Monaco', monospace;
  transition: border-color 0.3s;
}

.prompt-textarea:focus {
  outline: none;
  border-color: #3498db;
}

.prompt-textarea:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.button-section {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.submit-btn,
.clear-btn {
  padding: 0.75rem 2rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.submit-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  flex: 1;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.submit-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
  transform: none;
}

.clear-btn {
  background: #ecf0f1;
  color: #2c3e50;
}

.clear-btn:hover:not(:disabled) {
  background: #dfe6e9;
}

.clear-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.status-message {
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-weight: 500;
}

.status-message.info {
  background-color: #d1ecf1;
  color: #0c5460;
  border: 1px solid #bee5eb;
}

.status-message.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.status-message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.response-section {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.response-section h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.response-content {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #2c3e50;
  max-height: 400px;
  overflow-y: auto;
}

.firebase-status {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #27ae60;
  font-weight: 600;
}

.status-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: #27ae60;
  color: white;
  border-radius: 50%;
  font-size: 0.9rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .ai-prompt-container {
    padding: 0.5rem;
  }

  .card {
    padding: 1.5rem;
  }

  .title {
    font-size: 1.5rem;
  }

  .button-section {
    flex-direction: column;
  }

  .submit-btn,
  .clear-btn {
    width: 100%;
  }
}
</style>

