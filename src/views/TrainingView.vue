<template>
  <div class="training-dashboard">
    <div class="training-header">
      <h1><i class="pi pi-graduation-cap"></i> Training Center</h1>
      <p>AI-Powered Learning Tools Inspired by NotebookLM</p>
    </div>

    <div class="training-grid">
      <router-link :to="{ name: 'AudioLearning' }" class="training-card audio-card">
        <div class="card-icon">
          <i class="pi pi-volume-up"></i>
        </div>
        <h2>Audio Learning</h2>
        <p>Generate AI podcasts and audio summaries from your content</p>
        <div class="card-footer">
          <span class="badge">NotebookLM Style</span>
        </div>
      </router-link>

      <router-link :to="{ name: 'VideoLearning' }" class="training-card video-card">
        <div class="card-icon">
          <i class="pi pi-video"></i>
        </div>
        <h2>Video Learning</h2>
        <p>Interactive video lessons with AI-powered insights</p>
        <div class="card-footer">
          <span class="badge">Interactive</span>
        </div>
      </router-link>

      <router-link :to="{ name: 'MindMap' }" class="training-card mindmap-card">
        <div class="card-icon">
          <i class="pi pi-sitemap"></i>
        </div>
        <h2>Mind Maps</h2>
        <p>Visualize concepts and connections dynamically</p>
        <div class="card-footer">
          <span class="badge">Visual</span>
        </div>
      </router-link>

      <router-link :to="{ name: 'FlashCards' }" class="training-card flashcard-card">
        <div class="card-icon">
          <i class="pi pi-credit-card"></i>
        </div>
        <h2>Flash Cards</h2>
        <p>AI-generated flashcards for effective memorization</p>
        <div class="card-footer">
          <span class="badge">Study Tool</span>
        </div>
      </router-link>

      <router-link :to="{ name: 'Quizzes' }" class="training-card quiz-card">
        <div class="card-icon">
          <i class="pi pi-check-circle"></i>
        </div>
        <h2>Quizzes</h2>
        <p>Test your knowledge with adaptive quizzes</p>
        <div class="card-footer">
          <span class="badge">Assessment</span>
        </div>
      </router-link>

      <div class="training-card stats-card">
        <div class="card-icon">
          <i class="pi pi-chart-pie"></i>
        </div>
        <h2>Your Progress</h2>
        <div class="stats-content">
          <div class="stat-item">
            <span class="stat-value">{{ stats.totalSessions }}</span>
            <span class="stat-label">Sessions</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ stats.hoursLearned }}</span>
            <span class="stat-label">Hours</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ stats.completionRate }}%</span>
            <span class="stat-label">Completion</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'TrainingView',
  setup() {
    const stats = ref({
      totalSessions: 24,
      hoursLearned: 18,
      completionRate: 85
    })

    return { stats }
  }
}
</script>

<style scoped>
.training-dashboard {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.training-header {
  text-align: center;
  margin-bottom: 3rem;
}

.training-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.training-header h1 i {
  font-size: 2.5rem;
}

.training-header p {
  font-size: 1.1rem;
  color: #666;
}

.training-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.training-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.training-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.card-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.card-icon i {
  font-size: 2rem;
  color: white;
}

.audio-card .card-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.video-card .card-icon {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.mindmap-card .card-icon {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.flashcard-card .card-icon {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.quiz-card .card-icon {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.stats-card .card-icon {
  background: linear-gradient(135deg, #30cfd0 0%, #330867 100%);
}

.training-card h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.training-card p {
  color: #666;
  flex-grow: 1;
  margin-bottom: 1rem;
}

.card-footer {
  margin-top: auto;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #e3f2fd;
  color: #1976d2;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.stats-content {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #667eea;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.25rem;
}

@media (max-width: 768px) {
  .training-grid {
    grid-template-columns: 1fr;
  }

  .training-header h1 {
    font-size: 2rem;
  }
}
</style>


