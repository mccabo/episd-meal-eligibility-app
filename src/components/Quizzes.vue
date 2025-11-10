<template>
  <div class="quizzes-container">
    <div class="page-header">
      <h1><i class="pi pi-check-circle"></i> Quizzes</h1>
      <p>Test your knowledge with adaptive AI-powered quizzes</p>
    </div>

    <!-- Quiz Taking Mode -->
    <div v-if="takingQuiz" class="quiz-section">
      <div class="quiz-header-bar">
        <h2>{{ currentQuiz.title }}</h2>
        <div class="quiz-timer">
          <i class="pi pi-clock"></i>
          <span>{{ formatTime(timeRemaining) }}</span>
        </div>
      </div>

      <div class="quiz-progress">
        <div class="progress-indicator">
          <span>Question {{ currentQuestionIndex + 1 }} of {{ currentQuiz.questions.length }}</span>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: quizProgressPercent + '%' }"></div>
          </div>
        </div>
      </div>

      <div class="question-container">
        <div class="question-card">
          <div class="question-header">
            <span class="question-type-badge" :class="currentQuestion.type">
              {{ currentQuestion.type }}
            </span>
            <span class="question-points">{{ currentQuestion.points }} points</span>
          </div>

          <h3 class="question-text">{{ currentQuestion.question }}</h3>

          <div class="answers-section">
            <!-- Multiple Choice -->
            <div v-if="currentQuestion.type === 'multiple-choice'" class="answer-options">
              <div
                v-for="(option, index) in currentQuestion.options"
                :key="index"
                class="answer-option"
                :class="{
                  selected: selectedAnswer === index,
                  correct: showResult && index === currentQuestion.correctAnswer,
                  incorrect: showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer
                }"
                @click="!showResult && selectAnswer(index)"
              >
                <span class="option-letter">{{ String.fromCharCode(65 + index) }}</span>
                <span class="option-text">{{ option }}</span>
                <i v-if="showResult && index === currentQuestion.correctAnswer" class="pi pi-check-circle result-icon"></i>
                <i v-if="showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer" class="pi pi-times-circle result-icon"></i>
              </div>
            </div>

            <!-- True/False -->
            <div v-else-if="currentQuestion.type === 'true-false'" class="true-false-options">
              <button
                class="tf-option"
                :class="{ selected: selectedAnswer === true, correct: showResult && currentQuestion.correctAnswer === true }"
                @click="!showResult && selectAnswer(true)"
              >
                <i class="pi pi-check"></i> True
              </button>
              <button
                class="tf-option"
                :class="{ selected: selectedAnswer === false, correct: showResult && currentQuestion.correctAnswer === false }"
                @click="!showResult && selectAnswer(false)"
              >
                <i class="pi pi-times"></i> False
              </button>
            </div>

            <!-- Short Answer -->
            <div v-else-if="currentQuestion.type === 'short-answer'" class="short-answer-section">
              <textarea
                v-model="selectedAnswer"
                :disabled="showResult"
                placeholder="Type your answer here..."
                rows="5"
              ></textarea>
            </div>
          </div>

          <div v-if="showResult && currentQuestion.explanation" class="explanation-box">
            <h4><i class="pi pi-info-circle"></i> Explanation</h4>
            <p>{{ currentQuestion.explanation }}</p>
          </div>
        </div>

        <div class="question-actions">
          <button v-if="!showResult" @click="submitAnswer" :disabled="selectedAnswer === null" class="btn-submit-answer">
            Submit Answer
          </button>
          <button v-else @click="nextQuestion" class="btn-next-question">
            {{ currentQuestionIndex < currentQuiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Quiz Results -->
    <div v-else-if="showingResults" class="results-section">
      <div class="results-card">
        <div class="results-header">
          <i class="pi pi-trophy results-trophy"></i>
          <h2>Quiz Complete!</h2>
          <p class="results-subtitle">{{ currentQuiz.title }}</p>
        </div>

        <div class="score-display">
          <div class="score-circle">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#e0e0e0" stroke-width="8" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#10b981"
                stroke-width="8"
                :stroke-dasharray="`${quizScore * 2.827} 282.7`"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div class="score-text">
              <span class="score-number">{{ quizScore }}%</span>
            </div>
          </div>
        </div>

        <div class="results-stats">
          <div class="result-stat">
            <i class="pi pi-check-circle stat-icon correct"></i>
            <div>
              <div class="stat-value">{{ correctAnswers }}</div>
              <div class="stat-label">Correct</div>
            </div>
          </div>
          <div class="result-stat">
            <i class="pi pi-times-circle stat-icon incorrect"></i>
            <div>
              <div class="stat-value">{{ incorrectAnswers }}</div>
              <div class="stat-label">Incorrect</div>
            </div>
          </div>
          <div class="result-stat">
            <i class="pi pi-clock stat-icon"></i>
            <div>
              <div class="stat-value">{{ formatTime(quizTime) }}</div>
              <div class="stat-label">Time</div>
            </div>
          </div>
        </div>

        <div class="results-actions">
          <button @click="retakeQuiz" class="btn-retake">
            <i class="pi pi-refresh"></i> Retake Quiz
          </button>
          <button @click="exitQuiz" class="btn-back">
            <i class="pi pi-arrow-left"></i> Back to Quizzes
          </button>
        </div>
      </div>
    </div>

    <!-- Quiz Library -->
    <div v-else class="quizzes-library">
      <div class="library-header">
        <h2>Available Quizzes</h2>
        <button @click="showCreateQuiz = true" class="btn-create-quiz">
          <i class="pi pi-plus"></i> Create Quiz
        </button>
      </div>

      <div class="quiz-filters">
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          :class="{ active: selectedCategory === category }"
          class="filter-btn"
        >
          {{ category }}
        </button>
      </div>

      <div class="quizzes-grid">
        <div
          v-for="quiz in filteredQuizzes"
          :key="quiz.id"
          class="quiz-card"
        >
          <div class="quiz-card-header">
            <span class="difficulty-badge" :class="quiz.difficulty">
              {{ quiz.difficulty }}
            </span>
            <span class="category-tag">{{ quiz.category }}</span>
          </div>

          <h3>{{ quiz.title }}</h3>
          <p>{{ quiz.description }}</p>

          <div class="quiz-meta">
            <div class="meta-item">
              <i class="pi pi-question-circle"></i>
              <span>{{ quiz.questions.length }} questions</span>
            </div>
            <div class="meta-item">
              <i class="pi pi-clock"></i>
              <span>{{ quiz.duration }} min</span>
            </div>
            <div v-if="quiz.attempts > 0" class="meta-item">
              <i class="pi pi-star-fill"></i>
              <span>Best: {{ quiz.bestScore }}%</span>
            </div>
          </div>

          <button @click="startQuiz(quiz)" class="btn-start-quiz">
            <i class="pi pi-play"></i>
            {{ quiz.attempts > 0 ? 'Retake' : 'Start' }} Quiz
          </button>
        </div>
      </div>
    </div>

    <!-- Create Quiz Modal -->
    <div v-if="showCreateQuiz" class="modal-overlay" @click="showCreateQuiz = false">
      <div class="modal-content" @click.stop>
        <h2>Create New Quiz</h2>
        <div class="create-form">
          <input v-model="newQuiz.title" placeholder="Quiz Title" />
          <textarea v-model="newQuiz.description" placeholder="Description" rows="3"></textarea>
          <select v-model="newQuiz.category">
            <option value="Programming">Programming</option>
            <option value="Science">Science</option>
            <option value="Mathematics">Mathematics</option>
            <option value="General">General</option>
          </select>
          <select v-model="newQuiz.difficulty">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <div class="ai-option">
            <label>
              <input type="checkbox" v-model="newQuiz.aiGenerate" />
              Generate questions with AI
            </label>
          </div>
          <div class="modal-actions">
            <button class="btn-cancel" @click="showCreateQuiz = false">Cancel</button>
            <button class="btn-submit" @click="createQuiz">Create</button>
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
  name: 'Quizzes',
  setup() {
    const toast = useToast()
    const takingQuiz = ref(false)
    const showingResults = ref(false)
    const currentQuiz = ref(null)
    const currentQuestionIndex = ref(0)
    const selectedAnswer = ref(null)
    const showResult = ref(false)
    const timeRemaining = ref(0)
    const quizTime = ref(0)
    const correctAnswers = ref(0)
    const incorrectAnswers = ref(0)
    const selectedCategory = ref('All')
    const showCreateQuiz = ref(false)

    const categories = ['All', 'Programming', 'Science', 'Mathematics', 'General']

    const newQuiz = ref({
      title: '',
      description: '',
      category: 'Programming',
      difficulty: 'medium',
      aiGenerate: false
    })

    const quizzes = ref([
      {
        id: 1,
        title: 'EPISD System Basics',
        description: 'Test your foundational knowledge of the Free and Reduced Lunch Eligibility Application',
        category: 'General',
        difficulty: 'easy',
        duration: 10,
        attempts: 0,
        bestScore: 0,
        questions: [
          {
            type: 'multiple-choice',
            question: 'What is the primary purpose of the EPISD Application System?',
            options: [
              'To track student attendance',
              'To manage and process meal eligibility applications',
              'To schedule parent-teacher conferences',
              'To manage school bus routes'
            ],
            correctAnswer: 1,
            points: 10,
            explanation: 'The EPISD Application System is designed to streamline the management and processing of meal eligibility applications for El Paso Independent School District.'
          },
          {
            type: 'true-false',
            question: 'All users have the same level of access in the application',
            correctAnswer: false,
            points: 10,
            explanation: 'There are different user roles: Administrator (full access), Standard User (view, search, generate letters), and Read-Only User (view-only access).'
          },
          {
            type: 'multiple-choice',
            question: 'How many main tabs are in the application interface?',
            options: ['2', '3', '4', '5'],
            correctAnswer: 2,
            points: 10,
            explanation: 'There are 4 main tabs: Applications, Overview, Documentation, and Todo List.'
          },
          {
            type: 'true-false',
            question: 'The Applications tab is the main workspace for managing eligibility applications',
            correctAnswer: true,
            points: 10,
            explanation: 'The Applications tab is indeed the primary workspace where you spend most of your time managing meal eligibility applications.'
          },
          {
            type: 'multiple-choice',
            question: 'What appears in the welcome message after logging in?',
            options: [
              'Your email address',
              'Your user ID',
              'Your name',
              'Your role'
            ],
            correctAnswer: 2,
            points: 10,
            explanation: 'The welcome message displays "Welcome [Your Name]" in the top-right corner of the navigation bar.'
          }
        ]
      },
      {
        id: 2,
        title: 'Importing and Search Functions',
        description: 'Master the import process and search capabilities',
        category: 'General',
        difficulty: 'medium',
        duration: 15,
        attempts: 0,
        bestScore: 0,
        questions: [
          {
            type: 'multiple-choice',
            question: 'Where is the "Import Apps" button located?',
            options: [
              'In the footer of the page',
              'In the Utilities section (Admin only)',
              'In the Documentation tab',
              'In the Todo List tab'
            ],
            correctAnswer: 1,
            points: 15,
            explanation: 'The Import Apps button is located in the Utilities section at the top of the Applications tab and is only available to Administrator users.'
          },
          {
            type: 'true-false',
            question: 'The search function is case-sensitive',
            correctAnswer: false,
            points: 10,
            explanation: 'Search is case-insensitive and matches partial names (e.g., "smith" finds both "Smith" and "Smithson").'
          },
          {
            type: 'multiple-choice',
            question: 'Which of the following is NOT a search/filter method?',
            options: [
              'Guardian Name',
              'AppID',
              'Teacher Name',
              'Campus'
            ],
            correctAnswer: 2,
            points: 15,
            explanation: 'The main search/filter methods are: AppID, Guardian Name, Student Name, Campus, Status, Batch Number, and Date Range. Teacher Name is not a filter option.'
          },
          {
            type: 'true-false',
            question: 'You can combine multiple filters together',
            correctAnswer: true,
            points: 10,
            explanation: 'You can use multiple filters together (e.g., Campus + Status) to narrow down results and find specific groups of applications.'
          },
          {
            type: 'multiple-choice',
            question: 'What should you do if no applications are displayed?',
            options: [
              'Restart the computer',
              'Check if filters are applied and clear them',
              'Uninstall the application',
              'Call the police'
            ],
            correctAnswer: 1,
            points: 15,
            explanation: 'First check if filters are applied. Click "Clear Filters" or refresh the page. Also verify database connection and that applications have been imported.'
          }
        ]
      },
      {
        id: 3,
        title: 'Letter Generation Process',
        description: 'Test your knowledge of generating eligibility letters',
        category: 'General',
        difficulty: 'medium',
        duration: 20,
        attempts: 0,
        bestScore: 0,
        questions: [
          {
            type: 'multiple-choice',
            question: 'How many language options are available for letters?',
            options: ['1 (English only)', '2 (English and Spanish)', '3 (English, Spanish, and French)', '4 (Multiple languages)'],
            correctAnswer: 1,
            points: 10,
            explanation: 'Letters can be generated in two languages: English and Spanish (Cartas).'
          },
          {
            type: 'true-false',
            question: 'PDFs are automatically saved to the Letters folder',
            correctAnswer: true,
            points: 10,
            explanation: 'Generated PDF letters are automatically saved to the Letters folder, organized by batch number in subfolders.'
          },
          {
            type: 'multiple-choice',
            question: 'What is the file naming format for generated letters?',
            options: [
              'Letter_{AppID}.pdf',
              'EPISD - Meal Application_{AppID}_{GuardianName}_{StudentName}.pdf',
              '{StudentName}_{Date}.pdf',
              'Application_{Number}.pdf'
            ],
            correctAnswer: 1,
            points: 15,
            explanation: 'The format is: EPISD - Meal Application_{AppID}_{GuardianName}_{StudentName}.pdf'
          },
          {
            type: 'true-false',
            question: 'You must generate letters one at a time',
            correctAnswer: false,
            points: 10,
            explanation: 'You can generate letters in bulk by selecting multiple applications with checkboxes and clicking "Batch Generate Letters".'
          },
          {
            type: 'multiple-choice',
            question: 'What should you do after generating letters?',
            options: [
              'Immediately delete the applications',
              'Verify PDFs were created and update status',
              'Close the application',
              'Nothing, the process is complete'
            ],
            correctAnswer: 1,
            points: 15,
            explanation: 'After generating letters, verify PDFs were created correctly, check they open properly, and update application status to "Printed" or "Sent".'
          },
          {
            type: 'short-answer',
            question: 'What are the two status options you should set after printing letters?',
            correctAnswer: '"Printed" or "Sent"',
            points: 20,
            explanation: 'After physically printing letters, update status to "Printed". After distributing letters to families, update status to "Sent".'
          }
        ]
      },
      {
        id: 4,
        title: 'Batch Processing Mastery',
        description: 'Deep dive into batch processing strategies',
        category: 'General',
        difficulty: 'hard',
        duration: 25,
        attempts: 0,
        bestScore: 0,
        questions: [
          {
            type: 'multiple-choice',
            question: 'What is a batch number?',
            options: [
              'A random number assigned by the system',
              'A numeric identifier to group related applications',
              'The total number of applications',
              'The date applications were received'
            ],
            correctAnswer: 1,
            points: 15,
            explanation: 'A batch number is a numeric identifier used to group and organize related applications for processing together.'
          },
          {
            type: 'true-false',
            question: 'Batch numbers are automatically assigned by the system',
            correctAnswer: false,
            points: 10,
            explanation: 'Batch numbers must be manually assigned. Select applications, click "Assign Batch", enter the batch number, then apply.'
          },
          {
            type: 'multiple-choice',
            question: 'How are batch PDFs organized in the file system?',
            options: [
              'All in one folder with no organization',
              'In subfolders named by batch number (e.g., Batch 1/)',
              'By date created',
              'By student name alphabetically'
            ],
            correctAnswer: 1,
            points: 20,
            explanation: 'Letters are saved in subfolders named by batch number inside the main Letters folder (e.g., Letters/Batch 1/).'
          },
          {
            type: 'true-false',
            question: 'You can assign the same batch number to multiple applications at once',
            correctAnswer: true,
            points: 10,
            explanation: 'Yes, select multiple applications using checkboxes, then assign the same batch number to all selected applications.'
          },
          {
            type: 'short-answer',
            question: 'Why is batch processing useful?',
            correctAnswer: 'To organize large volumes, process efficiently, track progress, and simplify distribution',
            points: 25,
            explanation: 'Batch processing helps organize large volumes of applications, process them efficiently, track progress, and simplify letter distribution. It is especially useful when processing hundreds of applications.'
          }
        ]
      },
      {
        id: 5,
        title: 'Application Status Management',
        description: 'Understanding and managing application lifecycle',
        category: 'General',
        difficulty: 'easy',
        duration: 12,
        attempts: 0,
        bestScore: 0,
        questions: [
          {
            type: 'multiple-choice',
            question: 'How many possible status values are there for applications?',
            options: ['3', '4', '5', '6'],
            correctAnswer: 2,
            points: 10,
            explanation: 'There are 5 status values: Blank, Sent, Printed, Approved, and Denied.'
          },
          {
            type: 'true-false',
            question: '"Blank" status means the application was rejected',
            correctAnswer: false,
            points: 10,
            explanation: '"Blank" status means the application has been imported but no letter has been generated yet. It is the initial status for new applications.'
          },
          {
            type: 'multiple-choice',
            question: 'What does "Approved" status indicate?',
            options: [
              'The letter was approved by administrator',
              'The student qualifies for meal benefits',
              'The application form was completed correctly',
              'The PDF was successfully generated'
            ],
            correctAnswer: 1,
            points: 15,
            explanation: 'Approved status means the student qualifies for meal benefits (free or reduced lunch eligibility).'
          },
          {
            type: 'true-false',
            question: 'You can update status for multiple applications using bulk update',
            correctAnswer: true,
            points: 10,
            explanation: 'Yes, select multiple applications, click "Bulk Update Status", choose new status, and apply to all selected.'
          },
          {
            type: 'multiple-choice',
            question: 'When should you set status to "Printed"?',
            options: [
              'Before generating the letter',
              'While the letter is being generated',
              'After physically printing the letter',
              'After emailing the letter'
            ],
            correctAnswer: 2,
            points: 15,
            explanation: 'Set status to "Printed" after physically printing the letter and preparing it for distribution to families.'
          }
        ]
      },
      {
        id: 6,
        title: 'Troubleshooting Expert',
        description: 'Test your problem-solving skills with common issues',
        category: 'General',
        difficulty: 'medium',
        duration: 18,
        attempts: 0,
        bestScore: 0,
        questions: [
          {
            type: 'multiple-choice',
            question: 'What is the FIRST thing to check if you cannot log in?',
            options: [
              'Call IT support immediately',
              'Verify email is correct and caps lock is off',
              'Restart your computer',
              'Clear all browser data'
            ],
            correctAnswer: 1,
            points: 15,
            explanation: 'First verify your email address is correct and check that caps lock is off when entering your password. Simple issues first!'
          },
          {
            type: 'true-false',
            question: 'If applications are not displaying, you should immediately contact IT',
            correctAnswer: false,
            points: 10,
            explanation: 'First check if filters are applied and clear them. Also verify database connection. Only contact IT if basic troubleshooting does not resolve the issue.'
          },
          {
            type: 'multiple-choice',
            question: 'What is a common cause of letter generation failures?',
            options: [
              'The weather is bad',
              'Missing application data or printer not connected',
              'Too many users logged in',
              'The moon phase is wrong'
            ],
            correctAnswer: 1,
            points: 15,
            explanation: 'Common causes include: missing application data, printer not connected, PDF permissions issues, or template configuration problems.'
          },
          {
            type: 'true-false',
            question: 'Clearing browser cache can resolve some login issues',
            correctAnswer: true,
            points: 10,
            explanation: 'Yes, clearing browser cache and cookies can resolve login and display issues. Try this before contacting IT support.'
          },
          {
            type: 'short-answer',
            question: 'What error message indicates the Letters folder is missing?',
            correctAnswer: 'Letters folder not found',
            points: 20,
            explanation: 'The error "Letters folder not found" means the application cannot find the folder where PDFs should be saved. Create the folder manually or check folder permissions.'
          }
        ]
      },
      {
        id: 7,
        title: 'Training Center Knowledge',
        description: 'Test your understanding of the Training Center features',
        category: 'General',
        difficulty: 'easy',
        duration: 15,
        attempts: 0,
        bestScore: 0,
        questions: [
          {
            type: 'multiple-choice',
            question: 'How many training modules are in the Training Center?',
            options: ['3', '4', '5', '6'],
            correctAnswer: 2,
            points: 10,
            explanation: 'There are 5 training modules: Audio Learning, Video Learning, Mind Maps, Flash Cards, and Quizzes.'
          },
          {
            type: 'true-false',
            question: 'Audio Learning can generate podcasts from documents',
            correctAnswer: true,
            points: 10,
            explanation: 'Yes, Audio Learning uses AI to generate audio summaries, podcasts, interviews, and lectures from text and documents.'
          },
          {
            type: 'multiple-choice',
            question: 'What are AI Annotations in Video Learning?',
            options: [
              'Notes you write while watching',
              'Timestamped markers for key concepts you can click',
              'Video subtitles',
              'Advertisement breaks'
            ],
            correctAnswer: 1,
            points: 15,
            explanation: 'AI Annotations are timestamped notes marking key concepts in videos. Click any annotation to jump directly to that section of the video.'
          },
          {
            type: 'true-false',
            question: 'The spaced repetition system uses three difficulty ratings',
            correctAnswer: true,
            points: 10,
            explanation: 'Yes, flash cards use Hard, Medium, and Easy ratings to determine how frequently you need to review each card.'
          },
          {
            type: 'multiple-choice',
            question: 'What types of questions can quizzes include?',
            options: [
              'Only multiple choice',
              'Only true/false',
              'Multiple choice, true/false, and short answer',
              'Only essay questions'
            ],
            correctAnswer: 2,
            points: 15,
            explanation: 'Quizzes support three question types: Multiple Choice (4 options), True/False (two choices), and Short Answer (typed responses).'
          }
        ]
      }
    ])

    const filteredQuizzes = computed(() => {
      if (selectedCategory.value === 'All') {
        return quizzes.value
      }
      return quizzes.value.filter(q => q.category === selectedCategory.value)
    })

    const currentQuestion = computed(() => {
      if (!currentQuiz.value) return null
      return currentQuiz.value.questions[currentQuestionIndex.value]
    })

    const quizProgressPercent = computed(() => {
      if (!currentQuiz.value) return 0
      return ((currentQuestionIndex.value + 1) / currentQuiz.value.questions.length) * 100
    })

    const quizScore = computed(() => {
      if (!currentQuiz.value) return 0
      const total = correctAnswers.value + incorrectAnswers.value
      if (total === 0) return 0
      return Math.round((correctAnswers.value / total) * 100)
    })

    const startQuiz = (quiz) => {
      currentQuiz.value = quiz
      currentQuestionIndex.value = 0
      selectedAnswer.value = null
      showResult.value = false
      correctAnswers.value = 0
      incorrectAnswers.value = 0
      timeRemaining.value = quiz.duration * 60
      quizTime.value = 0
      takingQuiz.value = true

      toast.add({
        severity: 'info',
        summary: 'Quiz Started',
        detail: quiz.title,
        life: 2000
      })

      // Start timer
      const interval = setInterval(() => {
        if (timeRemaining.value > 0) {
          timeRemaining.value--
          quizTime.value++
        } else {
          clearInterval(interval)
          finishQuiz()
        }
      }, 1000)
    }

    const selectAnswer = (answer) => {
      selectedAnswer.value = answer
    }

    const submitAnswer = () => {
      if (selectedAnswer.value === null) return

      showResult.value = true
      const isCorrect = selectedAnswer.value === currentQuestion.value.correctAnswer

      if (isCorrect) {
        correctAnswers.value++
        toast.add({
          severity: 'success',
          summary: 'Correct!',
          detail: `+${currentQuestion.value.points} points`,
          life: 2000
        })
      } else {
        incorrectAnswers.value++
        toast.add({
          severity: 'error',
          summary: 'Incorrect',
          detail: 'Review the explanation below',
          life: 2000
        })
      }
    }

    const nextQuestion = () => {
      if (currentQuestionIndex.value < currentQuiz.value.questions.length - 1) {
        currentQuestionIndex.value++
        selectedAnswer.value = null
        showResult.value = false
      } else {
        finishQuiz()
      }
    }

    const finishQuiz = () => {
      takingQuiz.value = false
      showingResults.value = true

      // Update quiz stats
      const quiz = quizzes.value.find(q => q.id === currentQuiz.value.id)
      if (quiz) {
        quiz.attempts++
        if (quizScore.value > quiz.bestScore) {
          quiz.bestScore = quizScore.value
        }
      }
    }

    const retakeQuiz = () => {
      showingResults.value = false
      startQuiz(currentQuiz.value)
    }

    const exitQuiz = () => {
      showingResults.value = false
      currentQuiz.value = null
    }

    const createQuiz = () => {
      if (!newQuiz.value.title) {
        toast.add({
          severity: 'warn',
          summary: 'Missing Title',
          detail: 'Please provide a quiz title',
          life: 3000
        })
        return
      }

      const quiz = {
        id: Date.now(),
        ...newQuiz.value,
        duration: 10,
        attempts: 0,
        bestScore: 0,
        questions: []
      }

      if (newQuiz.value.aiGenerate) {
        toast.add({
          severity: 'info',
          summary: 'Generating Quiz',
          detail: 'AI is creating questions...',
          life: 3000
        })
      }

      quizzes.value.unshift(quiz)
      showCreateQuiz.value = false

      toast.add({
        severity: 'success',
        summary: 'Quiz Created',
        detail: 'You can now add questions',
        life: 3000
      })

      newQuiz.value = {
        title: '',
        description: '',
        category: 'Programming',
        difficulty: 'medium',
        aiGenerate: false
      }
    }

    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    return {
      takingQuiz,
      showingResults,
      currentQuiz,
      currentQuestionIndex,
      selectedAnswer,
      showResult,
      timeRemaining,
      quizTime,
      correctAnswers,
      incorrectAnswers,
      selectedCategory,
      showCreateQuiz,
      categories,
      newQuiz,
      quizzes,
      filteredQuizzes,
      currentQuestion,
      quizProgressPercent,
      quizScore,
      startQuiz,
      selectAnswer,
      submitAnswer,
      nextQuestion,
      retakeQuiz,
      exitQuiz,
      createQuiz,
      formatTime
    }
  }
}
</script>

<style scoped>
.quizzes-container {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  min-height: calc(100vh - 4rem);
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

/* Quiz Taking */
.quiz-section {
  max-width: 900px;
  margin: 0 auto;
}

.quiz-header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}

.quiz-header-bar h2 {
  font-size: 1.5rem;
  color: #2c3e50;
}

.quiz-timer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: #f59e0b;
}

.quiz-progress {
  margin-bottom: 2rem;
}

.progress-indicator span {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #667eea;
}

.progress-bar {
  height: 10px;
  background: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s ease;
}

.question-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.question-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.question-type-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.question-type-badge.multiple-choice {
  background: #e3f2fd;
  color: #1976d2;
}

.question-type-badge.true-false {
  background: #fce4ec;
  color: #c2185b;
}

.question-type-badge.short-answer {
  background: #f3e5f5;
  color: #7b1fa2;
}

.question-points {
  font-weight: 700;
  color: #667eea;
}

.question-text {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.answers-section {
  margin-bottom: 1.5rem;
}

.answer-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.answer-option:hover {
  border-color: #667eea;
  background: #f8f9fa;
}

.answer-option.selected {
  border-color: #667eea;
  background: #e3f2fd;
}

.answer-option.correct {
  border-color: #10b981;
  background: #d1fae5;
}

.answer-option.incorrect {
  border-color: #dc2626;
  background: #fee2e2;
}

.option-letter {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #667eea;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
}

.option-text {
  flex-grow: 1;
  font-size: 1.1rem;
  color: #2c3e50;
}

.result-icon {
  font-size: 1.5rem;
  margin-left: auto;
}

.answer-option.correct .result-icon {
  color: #10b981;
}

.answer-option.incorrect .result-icon {
  color: #dc2626;
}

.true-false-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.tf-option {
  padding: 2rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  background: white;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
}

.tf-option:hover {
  border-color: #667eea;
  background: #f8f9fa;
}

.tf-option.selected {
  border-color: #667eea;
  background: #e3f2fd;
}

.tf-option.correct {
  border-color: #10b981;
  background: #d1fae5;
}

.tf-option i {
  font-size: 1.5rem;
}

.short-answer-section textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
}

.short-answer-section textarea:focus {
  outline: none;
  border-color: #667eea;
}

.explanation-box {
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: #fffbeb;
  border-left: 4px solid #f59e0b;
  border-radius: 8px;
}

.explanation-box h4 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  color: #92400e;
}

.explanation-box p {
  color: #78350f;
  line-height: 1.6;
}

.question-actions {
  display: flex;
  justify-content: center;
}

.btn-submit-answer,
.btn-next-question {
  padding: 1rem 3rem;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-submit-answer {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-next-question {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.btn-submit-answer:hover,
.btn-next-question:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.btn-submit-answer:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* Results */
.results-section {
  max-width: 700px;
  margin: 0 auto;
}

.results-card {
  background: white;
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  text-align: center;
}

.results-header {
  margin-bottom: 2rem;
}

.results-trophy {
  font-size: 4rem;
  color: #f59e0b;
  margin-bottom: 1rem;
}

.results-header h2 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.results-subtitle {
  font-size: 1.1rem;
  color: #666;
}

.score-display {
  margin: 2rem 0;
}

.score-circle {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
}

.score-circle svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.score-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.score-number {
  font-size: 3rem;
  font-weight: 700;
  color: #10b981;
}

.results-stats {
  display: flex;
  justify-content: space-around;
  margin: 2rem 0;
  padding: 2rem 0;
  border-top: 2px solid #f0f0f0;
  border-bottom: 2px solid #f0f0f0;
}

.result-stat {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  font-size: 2rem;
}

.stat-icon.correct {
  color: #10b981;
}

.stat-icon.incorrect {
  color: #dc2626;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
}

.stat-label {
  color: #666;
}

.results-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-retake,
.btn-back {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.btn-retake {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-back {
  background: #e0e0e0;
  color: #666;
}

.btn-retake:hover,
.btn-back:hover {
  transform: translateY(-2px);
}

/* Quiz Library */
.library-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.library-header h2 {
  font-size: 2rem;
  color: #2c3e50;
}

.btn-create-quiz {
  padding: 0.75rem 1.5rem;
  border: none;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.btn-create-quiz:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}

.quiz-filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.filter-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.quizzes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.quiz-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.quiz-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.quiz-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.difficulty-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
}

.difficulty-badge.easy {
  background: #d1fae5;
  color: #065f46;
}

.difficulty-badge.medium {
  background: #fef3c7;
  color: #92400e;
}

.difficulty-badge.hard {
  background: #fee2e2;
  color: #991b1b;
}

.category-tag {
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
}

.quiz-card h3 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.quiz-card p {
  color: #666;
  margin-bottom: 1.5rem;
}

.quiz-meta {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #f0f0f0;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
}

.meta-item i {
  color: #667eea;
}

.btn-start-quiz {
  width: 100%;
  padding: 1rem;
  border: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.btn-start-quiz:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

/* Modal */
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
  max-width: 600px;
  width: 90%;
}

.modal-content h2 {
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.create-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.create-form input,
.create-form textarea,
.create-form select {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
}

.create-form input:focus,
.create-form textarea:focus,
.create-form select:focus {
  outline: none;
  border-color: #667eea;
}

.ai-option {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.ai-option label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  cursor: pointer;
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

@media (max-width: 768px) {
  .quizzes-grid {
    grid-template-columns: 1fr;
  }

  .quiz-header-bar {
    flex-direction: column;
    gap: 1rem;
  }

  .results-stats {
    flex-direction: column;
    gap: 1.5rem;
  }
}
</style>


