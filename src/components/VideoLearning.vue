<template>
  <div class="video-learning">
    <div class="page-header">
      <h1><i class="pi pi-video"></i> Video Learning</h1>
      <p>Interactive video lessons with AI-powered insights and annotations</p>
    </div>

    <!-- Demo Mode Banner -->
    <div class="demo-banner">
      <i class="pi pi-info-circle"></i>
      <div class="banner-content">
        <strong>Demo Mode:</strong> Sample video tutorials based on USER_MANUAL.md with AI annotations. 
        Video playback is simulated with timestamp navigation working. 
        <span class="banner-note">To enable real videos: upload MP4 files or integrate with video hosting services (YouTube, Vimeo).</span>
      </div>
    </div>

    <div class="content-layout">
      <div class="video-section">
        <div class="video-player">
          <div v-if="!currentVideo" class="video-placeholder">
            <i class="pi pi-video"></i>
            <p>Select a video to start learning</p>
          </div>
          <div v-else class="active-video">
            <div class="video-frame">
              <i class="pi pi-play-circle video-icon"></i>
              <p class="video-title">{{ currentVideo.title }}</p>
            </div>
            <div class="video-controls">
              <button @click="togglePlay" class="btn-control">
                <i :class="isPlaying ? 'pi pi-pause' : 'pi pi-play'"></i>
              </button>
              <div class="progress-container">
                <input type="range" min="0" max="100" v-model="progress" class="video-progress" />
                <span class="time-display">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
              </div>
              <button @click="toggleFullscreen" class="btn-control">
                <i class="pi pi-window-maximize"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="video-annotations" v-if="currentVideo">
          <h3><i class="pi pi-bookmark"></i> AI Annotations</h3>
          <div class="annotations-list">
            <div v-for="annotation in currentVideo.annotations" :key="annotation.time" class="annotation-item" @click="seekTo(annotation.time)">
              <span class="annotation-time">{{ annotation.time }}</span>
              <div class="annotation-content">
                <strong>{{ annotation.title }}</strong>
                <p>{{ annotation.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="sidebar">
        <div class="video-library">
          <h2>Video Library</h2>
          <div class="video-filters">
            <button @click="filterCategory = 'all'" :class="{ active: filterCategory === 'all' }">All</button>
            <button @click="filterCategory = 'tutorial'" :class="{ active: filterCategory === 'tutorial' }">Tutorials</button>
            <button @click="filterCategory = 'lecture'" :class="{ active: filterCategory === 'lecture' }">Lectures</button>
            <button @click="filterCategory = 'demo'" :class="{ active: filterCategory === 'demo' }">Demos</button>
          </div>
          <div class="video-list">
            <div
              v-for="video in filteredVideos"
              :key="video.id"
              class="video-item"
              :class="{ active: currentVideo?.id === video.id }"
              @click="selectVideo(video)"
            >
              <div class="video-thumbnail">
                <i class="pi pi-play-circle"></i>
                <span class="duration-badge">{{ video.duration }}</span>
              </div>
              <div class="video-info">
                <h4>{{ video.title }}</h4>
                <p>{{ video.description }}</p>
                <div class="video-meta">
                  <span class="category-badge">{{ video.category }}</span>
                  <span class="views">{{ video.views }} views</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="upload-section">
          <button class="btn-upload-video" @click="showUploadDialog = true">
            <i class="pi pi-cloud-upload"></i>
            Upload Video
          </button>
        </div>
      </div>
    </div>

    <!-- Upload Dialog -->
    <div v-if="showUploadDialog" class="modal-overlay" @click="showUploadDialog = false">
      <div class="modal-content" @click.stop>
        <h2>Upload Video</h2>
        <div class="upload-form">
          <input type="text" v-model="newVideo.title" placeholder="Video Title" />
          <textarea v-model="newVideo.description" placeholder="Description" rows="3"></textarea>
          <select v-model="newVideo.category">
            <option value="tutorial">Tutorial</option>
            <option value="lecture">Lecture</option>
            <option value="demo">Demo</option>
          </select>
          <input type="file" accept="video/*" @change="handleVideoUpload" />
          <div class="modal-actions">
            <button class="btn-cancel" @click="showUploadDialog = false">Cancel</button>
            <button class="btn-submit" @click="uploadVideo">Upload</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useToast } from 'primevue/usetoast'

export default {
  name: 'VideoLearning',
  setup() {
    const toast = useToast()
    const currentVideo = ref(null)
    const isPlaying = ref(false)
    const progress = ref(0)
    const currentTime = ref(0)
    const duration = ref(600)
    const filterCategory = ref('all')
    const showUploadDialog = ref(false)

    const newVideo = ref({
      title: '',
      description: '',
      category: 'tutorial'
    })

    const videoLibrary = ref([
      {
        id: 1,
        title: 'EPISD Application System - Complete Walkthrough',
        description: 'Comprehensive video tutorial covering all aspects of the Free and Reduced Lunch Eligibility Application system',
        duration: '42:30',
        category: 'tutorial',
        views: 2847,
        annotations: [
          { time: '2:15', title: 'Login and Authentication', description: 'How to access the application and understand user roles' },
          { time: '5:30', title: 'Navigation Bar Overview', description: 'Understanding the interface and main navigation' },
          { time: '9:45', title: 'Applications Tab', description: 'Main workspace for managing applications' },
          { time: '18:20', title: 'Search and Filter Features', description: 'Finding applications quickly using various search methods' },
          { time: '25:10', title: 'Letter Generation Process', description: 'Step-by-step letter generation in English and Spanish' },
          { time: '35:45', title: 'Batch Processing', description: 'Organizing and processing applications in batches' }
        ]
      },
      {
        id: 2,
        title: 'Getting Started - Your First 15 Minutes',
        description: 'Quick start guide for new users to get up and running immediately',
        duration: '14:30',
        category: 'tutorial',
        views: 1923,
        annotations: [
          { time: '1:00', title: 'Accessing the Application', description: 'URL and login process' },
          { time: '3:20', title: 'Understanding Your Role', description: 'Administrator vs Standard User permissions' },
          { time: '6:45', title: 'Interface Overview', description: 'Main tabs and navigation elements' },
          { time: '10:15', title: 'Your First Search', description: 'Finding an application' }
        ]
      },
      {
        id: 3,
        title: 'Importing Applications from SQL Server',
        description: 'Detailed tutorial on importing meal eligibility applications from the database',
        duration: '18:45',
        category: 'tutorial',
        views: 1456,
        annotations: [
          { time: '2:00', title: 'Prerequisites', description: 'What you need before importing' },
          { time: '5:15', title: 'Click Import Apps Button', description: 'Accessing the import utility' },
          { time: '8:30', title: 'Selecting Applications', description: 'How the system queries the database' },
          { time: '12:45', title: 'Verification Process', description: 'Reviewing imported data' },
          { time: '16:20', title: 'Troubleshooting', description: 'Common import issues and solutions' }
        ]
      },
      {
        id: 4,
        title: 'Letter Generation Masterclass',
        description: 'Complete guide to generating eligibility letters in both languages',
        duration: '22:15',
        category: 'lecture',
        views: 2103,
        annotations: [
          { time: '1:30', title: 'Eligibility Determination', description: 'Understanding approved vs denied status' },
          { time: '5:00', title: 'English Letters', description: 'Generating English eligibility letters' },
          { time: '10:30', title: 'Spanish Letters', description: 'Generating Spanish (Carta) letters' },
          { time: '15:00', title: 'PDF Management', description: 'Finding and organizing generated PDFs' },
          { time: '18:45', title: 'Printing Options', description: 'Single and batch printing strategies' }
        ]
      },
      {
        id: 5,
        title: 'Search and Filter Techniques',
        description: 'Master all search methods to find applications instantly',
        duration: '16:20',
        category: 'demo',
        views: 1687,
        annotations: [
          { time: '2:00', title: 'Search by AppID', description: 'Direct application lookup by ID number' },
          { time: '5:15', title: 'Guardian Name Search', description: 'Finding applications by parent name' },
          { time: '8:30', title: 'Student Name Search', description: 'Locating applications by student' },
          { time: '11:00', title: 'Campus Filter', description: 'Filtering by school location' },
          { time: '13:45', title: 'Status and Batch Filters', description: 'Advanced filtering techniques' }
        ]
      },
      {
        id: 6,
        title: 'Advanced Features for Administrators',
        description: 'Admin-only features including utilities, JSON editing, and bulk operations',
        duration: '28:10',
        category: 'tutorial',
        views: 892,
        annotations: [
          { time: '2:30', title: 'Utilities Overview', description: 'Admin-only tools and features' },
          { time: '7:15', title: 'JSON Data Editing', description: 'Direct data manipulation for advanced users' },
          { time: '13:45', title: 'Bulk Operations', description: 'Processing multiple applications at once' },
          { time: '19:30', title: 'Export Data', description: 'Exporting applications to CSV/Excel' },
          { time: '24:00', title: 'System Configuration', description: 'Letter templates and settings' }
        ]
      },
      {
        id: 7,
        title: 'Batch Processing Strategy Demo',
        description: 'Live demonstration of organizing and processing applications by batch',
        duration: '19:35',
        category: 'demo',
        views: 1234,
        annotations: [
          { time: '1:45', title: 'What is Batch Processing?', description: 'Understanding batch organization' },
          { time: '5:00', title: 'Assigning Batch Numbers', description: 'How to organize applications into batches' },
          { time: '9:20', title: 'Generating Batch Letters', description: 'Creating all letters for a batch' },
          { time: '14:30', title: 'Batch Folder Structure', description: 'How PDFs are organized by batch' },
          { time: '17:15', title: 'Best Practices', description: 'Efficient batch processing workflows' }
        ]
      },
      {
        id: 8,
        title: 'Troubleshooting Common Issues',
        description: 'Solutions to the most frequent problems users encounter',
        duration: '21:50',
        category: 'lecture',
        views: 1567,
        annotations: [
          { time: '2:00', title: 'Login Problems', description: 'Cannot access the application' },
          { time: '6:30', title: 'Applications Not Displaying', description: 'Empty list troubleshooting' },
          { time: '10:15', title: 'Letter Generation Errors', description: 'PDF creation issues' },
          { time: '14:45', title: 'Print Problems', description: 'Printing and preview issues' },
          { time: '18:20', title: 'Import Failures', description: 'Database connection and data issues' }
        ]
      },
      {
        id: 9,
        title: 'Training Center Overview',
        description: 'Introduction to all training modules: Audio, Video, Mind Maps, Flash Cards, and Quizzes',
        duration: '12:40',
        category: 'tutorial',
        views: 1845,
        annotations: [
          { time: '1:30', title: 'Training Hub', description: 'Accessing the training center' },
          { time: '3:45', title: 'Audio Learning', description: 'AI-generated podcasts and summaries' },
          { time: '6:00', title: 'Video Library', description: 'Interactive video lessons' },
          { time: '8:15', title: 'Study Tools', description: 'Mind maps, flash cards, and quizzes' },
          { time: '10:30', title: 'Progress Tracking', description: 'Monitoring your learning progress' }
        ]
      },
      {
        id: 10,
        title: 'Best Practices for Application Processing',
        description: 'Expert tips and workflow optimization for efficient processing',
        duration: '17:25',
        category: 'lecture',
        views: 2156,
        annotations: [
          { time: '2:15', title: 'Daily Workflow', description: 'Recommended daily processing routine' },
          { time: '6:30', title: 'Quality Checks', description: 'Verifying application data accuracy' },
          { time: '10:45', title: 'Time-Saving Tips', description: 'Keyboard shortcuts and efficiency tricks' },
          { time: '14:00', title: 'Collaboration', description: 'Working with team members effectively' }
        ]
      }
    ])

    const filteredVideos = computed(() => {
      if (filterCategory.value === 'all') {
        return videoLibrary.value
      }
      return videoLibrary.value.filter(v => v.category === filterCategory.value)
    })

    const selectVideo = (video) => {
      currentVideo.value = video
      isPlaying.value = false
      progress.value = 0
      currentTime.value = 0
      
      // Parse duration to seconds
      const [mins, secs] = video.duration.split(':').map(Number)
      duration.value = (mins * 60) + secs
      
      toast.add({
        severity: 'info',
        summary: 'Video Loaded',
        detail: `${video.title} - Click play to start (Demo Mode)`,
        life: 3000
      })
    }

    const togglePlay = () => {
      isPlaying.value = !isPlaying.value
      
      if (isPlaying.value) {
        toast.add({
          severity: 'info',
          summary: 'Demo Playback',
          detail: 'Simulated video playback started. In production, actual video would play.',
          life: 3000
        })
        
        // Simulate video progress
        const interval = setInterval(() => {
          if (isPlaying.value && currentTime.value < duration.value) {
            currentTime.value += 1
            progress.value = (currentTime.value / duration.value) * 100
          } else {
            clearInterval(interval)
            if (currentTime.value >= duration.value) {
              isPlaying.value = false
              toast.add({
                severity: 'success',
                summary: 'Video Complete',
                detail: 'Video finished playing',
                life: 2000
              })
            }
          }
        }, 1000)
      }
    }

    const toggleFullscreen = () => {
      toast.add({
        severity: 'info',
        summary: 'Fullscreen',
        detail: 'Fullscreen mode activated',
        life: 2000
      })
    }

    const seekTo = (time) => {
      // Parse timestamp (e.g., "2:15" to seconds)
      const [mins, secs] = time.split(':').map(Number)
      const targetSeconds = (mins * 60) + secs
      currentTime.value = targetSeconds
      progress.value = (targetSeconds / duration.value) * 100
      
      toast.add({
        severity: 'info',
        summary: 'Jumped to Annotation',
        detail: `Now at ${time} - "${currentVideo.value?.annotations.find(a => a.time === time)?.title}"`,
        life: 3000
      })
    }

    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60)
      const secs = Math.floor(seconds % 60)
      return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    const handleVideoUpload = (event) => {
      const file = event.target.files[0]
      if (file) {
        toast.add({
          severity: 'success',
          summary: 'File Selected',
          detail: file.name,
          life: 3000
        })
      }
    }

    const uploadVideo = () => {
      if (!newVideo.value.title) {
        toast.add({
          severity: 'warn',
          summary: 'Missing Title',
          detail: 'Please provide a video title',
          life: 3000
        })
        return
      }

      videoLibrary.value.push({
        id: Date.now(),
        ...newVideo.value,
        duration: '10:00',
        views: 0,
        annotations: []
      })

      toast.add({
        severity: 'success',
        summary: 'Video Uploaded',
        detail: 'Your video has been added to the library',
        life: 3000
      })

      showUploadDialog.value = false
      newVideo.value = { title: '', description: '', category: 'tutorial' }
    }

    return {
      currentVideo,
      isPlaying,
      progress,
      currentTime,
      duration,
      filterCategory,
      showUploadDialog,
      newVideo,
      videoLibrary,
      filteredVideos,
      selectVideo,
      togglePlay,
      toggleFullscreen,
      seekTo,
      formatTime,
      handleVideoUpload,
      uploadVideo
    }
  }
}
</script>

<style scoped>
.video-learning {
  padding: 2rem;
  max-width: 1600px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
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

.content-layout {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
}

.video-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.video-player {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.video-placeholder {
  aspect-ratio: 16 / 9;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
}

.video-placeholder i {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.video-placeholder p {
  font-size: 1.2rem;
}

.active-video {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.video-frame {
  aspect-ratio: 16 / 9;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
}

.video-icon {
  font-size: 5rem;
  opacity: 0.9;
}

.video-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-top: 1rem;
}

.video-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-control {
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

.btn-control:hover {
  background: #764ba2;
  transform: scale(1.1);
}

.progress-container {
  flex-grow: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.video-progress {
  flex-grow: 1;
  height: 6px;
  border-radius: 3px;
  appearance: none;
  background: #e0e0e0;
}

.video-progress::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #667eea;
  cursor: pointer;
}

.time-display {
  font-size: 0.9rem;
  color: #666;
  min-width: 100px;
}

.video-annotations {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.video-annotations h3 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.annotations-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.annotation-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.annotation-item:hover {
  background: #e9ecef;
  transform: translateX(5px);
}

.annotation-time {
  font-weight: 700;
  color: #667eea;
  min-width: 60px;
}

.annotation-content strong {
  display: block;
  margin-bottom: 0.25rem;
  color: #2c3e50;
}

.annotation-content p {
  font-size: 0.9rem;
  color: #666;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.video-library {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.video-library h2 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.video-filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.video-filters button {
  padding: 0.5rem 1rem;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.3s ease;
}

.video-filters button.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.video-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 600px;
  overflow-y: auto;
}

.video-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.video-item:hover,
.video-item.active {
  border-color: #667eea;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
}

.video-thumbnail {
  width: 80px;
  height: 60px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
  flex-shrink: 0;
}

.video-thumbnail i {
  font-size: 2rem;
}

.duration-badge {
  position: absolute;
  bottom: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.7rem;
}

.video-info h4 {
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
  color: #2c3e50;
}

.video-info p {
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.video-meta {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.75rem;
}

.category-badge {
  background: #e3f2fd;
  color: #1976d2;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 600;
}

.views {
  color: #999;
}

.upload-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn-upload-video {
  width: 100%;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.btn-upload-video:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(240, 147, 251, 0.4);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
}

.modal-content h2 {
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.upload-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.upload-form input,
.upload-form textarea,
.upload-form select {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
}

.upload-form input:focus,
.upload-form textarea:focus,
.upload-form select:focus {
  outline: none;
  border-color: #667eea;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-cancel,
.btn-submit {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-cancel {
  background: #e0e0e0;
  color: #666;
}

.btn-submit {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.btn-cancel:hover,
  .btn-submit:hover {
    transform: translateY(-2px);
  }

.demo-banner {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  border: 2px solid #3b82f6;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
}

.demo-banner i {
  font-size: 1.5rem;
  color: #2563eb;
  flex-shrink: 0;
}

.banner-content {
  color: #1e40af;
  line-height: 1.6;
}

.banner-content strong {
  color: #1e3a8a;
  font-weight: 700;
}

.banner-note {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.9rem;
  color: #1d4ed8;
}

@media (max-width: 1024px) {
  .content-layout {
    grid-template-columns: 1fr;
  }
}
</style>


