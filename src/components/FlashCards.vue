<template>
  <div class="flashcards-container">
    <div class="page-header">
      <h1><i class="pi pi-credit-card"></i> Flash Cards</h1>
      <p>AI-generated flashcards for effective memorization and learning</p>
    </div>

    <div class="flashcards-layout">
      <!-- Study Mode -->
      <div v-if="studyMode" class="study-section">
        <div class="study-progress">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
          </div>
          <span class="progress-text">{{ currentCardIndex + 1 }} / {{ currentDeck.cards.length }}</span>
        </div>

        <div class="flashcard-container">
          <div
            class="flashcard"
            :class="{ flipped: isFlipped }"
            @click="flipCard"
          >
            <div class="card-face card-front">
              <div class="card-label">Question</div>
              <div class="card-content">
                {{ currentCard.question }}
              </div>
              <div class="card-hint">
                <i class="pi pi-info-circle"></i> Click to flip
              </div>
            </div>
            <div class="card-face card-back">
              <div class="card-label">Answer</div>
              <div class="card-content">
                {{ currentCard.answer }}
              </div>
              <div class="card-hint" v-if="currentCard.explanation">
                <strong>Explanation:</strong> {{ currentCard.explanation }}
              </div>
            </div>
          </div>
        </div>

        <div class="study-controls">
          <button @click="previousCard" :disabled="currentCardIndex === 0" class="btn-nav btn-prev">
            <i class="pi pi-chevron-left"></i> Previous
          </button>
          
          <div class="confidence-buttons">
            <button @click="markCard('hard')" class="btn-confidence btn-hard">
              <i class="pi pi-times-circle"></i> Hard
            </button>
            <button @click="markCard('medium')" class="btn-confidence btn-medium">
              <i class="pi pi-minus-circle"></i> Medium
            </button>
            <button @click="markCard('easy')" class="btn-confidence btn-easy">
              <i class="pi pi-check-circle"></i> Easy
            </button>
          </div>

          <button @click="nextCard" :disabled="currentCardIndex === currentDeck.cards.length - 1" class="btn-nav btn-next">
            Next <i class="pi pi-chevron-right"></i>
          </button>
        </div>

        <button @click="exitStudyMode" class="btn-exit">
          <i class="pi pi-times"></i> Exit Study Mode
        </button>
      </div>

      <!-- Deck Selection -->
      <div v-else class="decks-section">
        <div class="decks-header">
          <h2>Your Decks</h2>
          <button @click="showCreateDeck = true" class="btn-create">
            <i class="pi pi-plus"></i> Create Deck
          </button>
        </div>

        <div class="decks-grid">
          <div
            v-for="deck in flashcardDecks"
            :key="deck.id"
            class="deck-card"
          >
            <div class="deck-header">
              <h3>{{ deck.name }}</h3>
              <span class="deck-badge" :style="{ background: deck.color }">
                {{ deck.category }}
              </span>
            </div>
            <p class="deck-description">{{ deck.description }}</p>
            <div class="deck-stats">
              <div class="stat">
                <i class="pi pi-credit-card"></i>
                <span>{{ deck.cards.length }} cards</span>
              </div>
              <div class="stat">
                <i class="pi pi-check"></i>
                <span>{{ deck.mastered }}% mastered</span>
              </div>
            </div>
            <div class="deck-actions">
              <button @click="startStudy(deck)" class="btn-study">
                <i class="pi pi-play"></i> Study
              </button>
              <button @click="editDeck(deck)" class="btn-edit">
                <i class="pi pi-pencil"></i>
              </button>
              <button @click="generateCards(deck)" class="btn-generate">
                <i class="pi pi-sparkles"></i> AI Generate
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Create Deck Modal -->
      <div v-if="showCreateDeck" class="modal-overlay" @click="showCreateDeck = false">
        <div class="modal-content" @click.stop>
          <h2>Create New Deck</h2>
          <div class="create-form">
            <input v-model="newDeck.name" placeholder="Deck Name" />
            <textarea v-model="newDeck.description" placeholder="Description" rows="3"></textarea>
            <select v-model="newDeck.category">
              <option value="Programming">Programming</option>
              <option value="Languages">Languages</option>
              <option value="Science">Science</option>
              <option value="Mathematics">Mathematics</option>
              <option value="History">History</option>
              <option value="Other">Other</option>
            </select>
            <div class="ai-generate-option">
              <label>
                <input type="checkbox" v-model="newDeck.aiGenerate" />
                Generate cards with AI from topic
              </label>
              <input v-if="newDeck.aiGenerate" v-model="newDeck.topic" placeholder="Enter topic (e.g., 'Vue.js basics')" />
            </div>
            <div class="modal-actions">
              <button class="btn-cancel" @click="showCreateDeck = false">Cancel</button>
              <button class="btn-submit" @click="createDeck">Create</button>
            </div>
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
  name: 'FlashCards',
  setup() {
    const toast = useToast()
    const studyMode = ref(false)
    const currentDeck = ref(null)
    const currentCardIndex = ref(0)
    const isFlipped = ref(false)
    const showCreateDeck = ref(false)

    const newDeck = ref({
      name: '',
      description: '',
      category: 'Programming',
      aiGenerate: false,
      topic: ''
    })

    const flashcardDecks = ref([
      {
        id: 1,
        name: 'EPISD System Basics',
        description: 'Essential concepts for the Free and Reduced Lunch Eligibility Application',
        category: 'Other',
        color: '#667eea',
        mastered: 0,
        cards: [
          {
            id: 1,
            question: 'What is the purpose of the EPISD Application System?',
            answer: 'A comprehensive web-based system to streamline the management and processing of meal eligibility applications for El Paso Independent School District.',
            explanation: 'The system allows staff to import, search, filter, generate letters, and track application status throughout the process.'
          },
          {
            id: 2,
            question: 'What are the main user roles in the system?',
            answer: 'Administrator (full access to all features), Standard User (view, search, filter, generate letters), and Read-Only User (view-only access).',
            explanation: 'Your role determines which features and buttons you can access in the application.'
          },
          {
            id: 3,
            question: 'What are the four main tabs in the application?',
            answer: 'Applications (main workspace), Overview (system info), Documentation (help resources), and Todo List (task management).',
            explanation: 'The Applications tab is where you spend most of your time managing meal eligibility applications.'
          },
          {
            id: 4,
            question: 'How do you log in to the application?',
            answer: 'Open your browser, navigate to the application URL, enter your EPISD email and password, then click Login.',
            explanation: 'For development/testing, the URL is typically http://localhost:8081'
          },
          {
            id: 5,
            question: 'What information is displayed in the welcome message?',
            answer: 'Your name appears in the top-right corner of the navigation bar.',
            explanation: 'This confirms you are logged in with the correct account.'
          }
        ]
      },
      {
        id: 2,
        name: 'Importing Applications',
        description: 'Understanding the application import process',
        category: 'Other',
        color: '#10b981',
        mastered: 0,
        cards: [
          {
            id: 1,
            question: 'Where is the Import Apps button located?',
            answer: 'In the Utilities section at the top of the Applications tab (Admin only).',
            explanation: 'This feature is only available to users with Administrator role.'
          },
          {
            id: 2,
            question: 'What happens when you click Import Apps?',
            answer: 'The system queries the SQL Server database and imports new meal eligibility applications into the application.',
            explanation: 'This process may take several seconds depending on the number of new applications.'
          },
          {
            id: 3,
            question: 'How do you know if the import was successful?',
            answer: 'A confirmation message appears showing the number of applications imported, and new applications appear in the list.',
            explanation: 'You should verify the import by checking the total count and reviewing a few new entries.'
          },
          {
            id: 4,
            question: 'What should you do if no applications are imported?',
            answer: 'Check database connection, verify SQL Server is running, ensure you have proper permissions, and contact IT if issues persist.',
            explanation: 'Connection issues and permissions are the most common causes of import failures.'
          }
        ]
      },
      {
        id: 3,
        name: 'Search and Filter Mastery',
        description: 'Finding applications quickly and efficiently',
        category: 'Other',
        color: '#f59e0b',
        mastered: 0,
        cards: [
          {
            id: 1,
            question: 'What are the five main search/filter methods?',
            answer: 'AppID, Guardian Name, Student Name, Campus, and Status.',
            explanation: 'You can also filter by Batch Number and Date Range for advanced searches.'
          },
          {
            id: 2,
            question: 'How do you search by Guardian Name?',
            answer: 'Type the parent or guardian name in the Guardian Name search field at the top of the applications list.',
            explanation: 'Search is case-insensitive and matches partial names (e.g., "smith" finds "Smith", "Smithson").'
          },
          {
            id: 3,
            question: 'How do you clear all filters?',
            answer: 'Click the "Clear Filters" button or refresh the page to show all applications.',
            explanation: 'This is useful when you want to start a new search or see the complete application list.'
          },
          {
            id: 4,
            question: 'What does the Campus filter do?',
            answer: 'Shows only applications from a specific school campus selected from the dropdown.',
            explanation: 'This is useful for processing applications school by school.'
          },
          {
            id: 5,
            question: 'Can you combine multiple filters?',
            answer: 'Yes, you can use multiple filters together (e.g., Campus + Status) to narrow down results.',
            explanation: 'Combining filters helps you find specific groups of applications quickly.'
          }
        ]
      },
      {
        id: 4,
        name: 'Letter Generation',
        description: 'Creating and managing eligibility letters',
        category: 'Other',
        color: '#8b5cf6',
        mastered: 0,
        cards: [
          {
            id: 1,
            question: 'What are the two language options for letters?',
            answer: 'English letters and Spanish letters (Cartas).',
            explanation: 'Both letter types contain the same information, just in different languages.'
          },
          {
            id: 2,
            question: 'How do you generate a single English letter?',
            answer: 'Click the "Create English Letter" button next to the application you want to process.',
            explanation: 'The PDF is automatically generated and saved to the Letters folder.'
          },
          {
            id: 3,
            question: 'Where are generated PDFs saved?',
            answer: 'In the Letters folder, organized by batch number in subfolders.',
            explanation: 'File name format: EPISD - Meal Application_{AppID}_{GuardianName}_{StudentName}.pdf'
          },
          {
            id: 4,
            question: 'How do you generate letters for multiple applications?',
            answer: 'Select multiple applications using checkboxes, then click "Batch Generate Letters".',
            explanation: 'This is much faster than generating letters one at a time.'
          },
          {
            id: 5,
            question: 'What should you do after generating letters?',
            answer: 'Verify PDFs were created, check they opened correctly, and update application status to "Printed" or "Sent".',
            explanation: 'Always verify letters before distributing to ensure quality and accuracy.'
          }
        ]
      },
      {
        id: 5,
        name: 'Batch Processing',
        description: 'Organizing and processing applications in batches',
        category: 'Other',
        color: '#ec4899',
        mastered: 0,
        cards: [
          {
            id: 1,
            question: 'What is a batch number?',
            answer: 'A numeric identifier used to group and organize related applications for processing together.',
            explanation: 'Batch numbers help organize work and track which applications have been processed.'
          },
          {
            id: 2,
            question: 'How do you assign a batch number to applications?',
            answer: 'Select applications using checkboxes, click "Assign Batch", enter batch number, then click "Assign to Selected".',
            explanation: 'You can assign the same batch number to multiple applications at once.'
          },
          {
            id: 3,
            question: 'How are batch PDFs organized?',
            answer: 'Letters are saved in subfolders named by batch number inside the main Letters folder (e.g., Letters/Batch 1/).',
            explanation: 'This folder structure makes it easy to find all letters for a specific batch.'
          },
          {
            id: 4,
            question: 'Why use batch processing?',
            answer: 'To organize large volumes of applications, process them efficiently, track progress, and simplify letter distribution.',
            explanation: 'Batching is especially useful when processing hundreds of applications at once.'
          }
        ]
      },
      {
        id: 6,
        name: 'Application Status',
        description: 'Understanding and managing application states',
        category: 'Other',
        color: '#14b8a6',
        mastered: 0,
        cards: [
          {
            id: 1,
            question: 'What are the possible application status values?',
            answer: 'Blank (not processed), Sent (letter sent), Printed (letter printed), Approved (eligibility approved), Denied (eligibility denied).',
            explanation: 'Status helps track where each application is in the workflow.'
          },
          {
            id: 2,
            question: 'What does "Blank" status mean?',
            answer: 'The application has been imported but no letter has been generated yet.',
            explanation: 'This is the initial status for newly imported applications.'
          },
          {
            id: 3,
            question: 'When should you set status to "Printed"?',
            answer: 'After physically printing the letter and preparing it for distribution.',
            explanation: 'This indicates the letter is ready to send to the family.'
          },
          {
            id: 4,
            question: 'What is the difference between "Approved" and "Denied"?',
            answer: 'Approved means the student qualifies for meal benefits; Denied means they do not qualify.',
            explanation: 'This determination is made before generating the letter based on application data.'
          },
          {
            id: 5,
            question: 'How do you update application status?',
            answer: 'Click the status dropdown for an application and select the new status, or use bulk update for multiple applications.',
            explanation: 'Status updates help track progress and maintain accurate records.'
          }
        ]
      },
      {
        id: 7,
        name: 'Troubleshooting',
        description: 'Common issues and their solutions',
        category: 'Other',
        color: '#f59e0b',
        mastered: 0,
        cards: [
          {
            id: 1,
            question: 'What should you do if you cannot log in?',
            answer: 'Verify email is correct, check caps lock is off, try "Forgot Password", clear browser cache, or contact IT support.',
            explanation: 'Most login issues are caused by incorrect credentials or browser cache problems.'
          },
          {
            id: 2,
            question: 'Why might applications not be displaying?',
            answer: 'Filters may be applied (clear them), database connection issue, or no applications have been imported yet.',
            explanation: 'Always check if filters are active before assuming there is a problem.'
          },
          {
            id: 3,
            question: 'What causes letter generation to fail?',
            answer: 'Missing application data, printer not connected, PDF permissions issue, or template configuration problem.',
            explanation: 'Verify the application has all required fields before generating a letter.'
          },
          {
            id: 4,
            question: 'How do you fix "Letters folder not found" error?',
            answer: 'Ensure the Letters folder exists in the application directory, check folder permissions, or create the folder manually.',
            explanation: 'The application needs this folder to save generated PDF letters.'
          }
        ]
      },
      {
        id: 8,
        name: 'Training Center',
        description: 'Using the AI-powered learning tools',
        category: 'Other',
        color: '#f59e0b',
        mastered: 0,
        cards: [
          {
            id: 1,
            question: 'How do you access the Training Center?',
            answer: 'Click the "Training" dropdown button in the navigation bar and select a training module.',
            explanation: 'The Training Hub provides access to all five training tools in one place.'
          },
          {
            id: 2,
            question: 'What is Audio Learning?',
            answer: 'AI-powered tool that generates audio summaries, podcasts, and lectures from documents and text for hands-free learning.',
            explanation: 'You can choose voice style, duration, and format (podcast, summary, interview, lecture).'
          },
          {
            id: 3,
            question: 'What are AI Annotations in Video Learning?',
            answer: 'Timestamped notes marking key concepts in videos that you can click to jump directly to that section.',
            explanation: 'Annotations help you navigate long videos and find specific topics quickly.'
          },
          {
            id: 4,
            question: 'What is the spaced repetition system in Flash Cards?',
            answer: 'A learning technique where you rate cards as Hard, Medium, or Easy to determine how frequently you need to review them.',
            explanation: 'Cards marked Hard appear more frequently, while Easy cards appear less often.'
          },
          {
            id: 5,
            question: 'What question types are available in Quizzes?',
            answer: 'Multiple Choice (select from 4 options), True/False (two choices), and Short Answer (type your response).',
            explanation: 'All quizzes provide instant feedback and explanations for each answer.'
          }
        ]
      }
    ])

    const currentCard = computed(() => {
      if (!currentDeck.value) return null
      return currentDeck.value.cards[currentCardIndex.value]
    })

    const progressPercent = computed(() => {
      if (!currentDeck.value) return 0
      return ((currentCardIndex.value + 1) / currentDeck.value.cards.length) * 100
    })

    const startStudy = (deck) => {
      currentDeck.value = deck
      currentCardIndex.value = 0
      isFlipped.value = false
      studyMode.value = true
      toast.add({
        severity: 'info',
        summary: 'Study Started',
        detail: `Studying ${deck.name}`,
        life: 2000
      })
    }

    const exitStudyMode = () => {
      studyMode.value = false
      currentDeck.value = null
      toast.add({
        severity: 'success',
        summary: 'Study Complete',
        detail: 'Great job! Keep practicing.',
        life: 3000
      })
    }

    const flipCard = () => {
      isFlipped.value = !isFlipped.value
    }

    const nextCard = () => {
      if (currentCardIndex.value < currentDeck.value.cards.length - 1) {
        currentCardIndex.value++
        isFlipped.value = false
      }
    }

    const previousCard = () => {
      if (currentCardIndex.value > 0) {
        currentCardIndex.value--
        isFlipped.value = false
      }
    }

    const markCard = (difficulty) => {
      const messages = {
        hard: 'Marked as hard - Will review more frequently',
        medium: 'Marked as medium - Normal review schedule',
        easy: 'Marked as easy - Less frequent reviews'
      }
      
      toast.add({
        severity: 'info',
        summary: 'Card Marked',
        detail: messages[difficulty],
        life: 2000
      })

      setTimeout(() => {
        if (currentCardIndex.value < currentDeck.value.cards.length - 1) {
          nextCard()
        } else {
          exitStudyMode()
        }
      }, 500)
    }

    const createDeck = () => {
      if (!newDeck.value.name) {
        toast.add({
          severity: 'warn',
          summary: 'Missing Name',
          detail: 'Please provide a deck name',
          life: 3000
        })
        return
      }

      const deck = {
        id: Date.now(),
        name: newDeck.value.name,
        description: newDeck.value.description,
        category: newDeck.value.category,
        color: '#8b5cf6',
        mastered: 0,
        cards: []
      }

      if (newDeck.value.aiGenerate && newDeck.value.topic) {
        // Simulate AI generation
        toast.add({
          severity: 'info',
          summary: 'Generating Cards',
          detail: 'AI is creating flashcards for you...',
          life: 3000
        })
        
        setTimeout(() => {
          deck.cards = [
            {
              id: 1,
              question: `What is ${newDeck.value.topic}?`,
              answer: `AI-generated answer about ${newDeck.value.topic}`,
              explanation: 'This card was generated by AI based on your topic.'
            }
          ]
          flashcardDecks.value.unshift(deck)
          toast.add({
            severity: 'success',
            summary: 'Deck Created',
            detail: 'AI has generated your flashcards!',
            life: 3000
          })
        }, 2000)
      } else {
        flashcardDecks.value.unshift(deck)
        toast.add({
          severity: 'success',
          summary: 'Deck Created',
          detail: 'You can now add cards to your deck',
          life: 3000
        })
      }

      showCreateDeck.value = false
      newDeck.value = {
        name: '',
        description: '',
        category: 'Programming',
        aiGenerate: false,
        topic: ''
      }
    }

    const editDeck = (deck) => {
      toast.add({
        severity: 'info',
        summary: 'Edit Deck',
        detail: `Editing ${deck.name}`,
        life: 2000
      })
    }

    const generateCards = (deck) => {
      toast.add({
        severity: 'info',
        summary: 'Generating Cards',
        detail: 'AI is creating new flashcards...',
        life: 3000
      })
    }

    return {
      studyMode,
      currentDeck,
      currentCardIndex,
      isFlipped,
      showCreateDeck,
      newDeck,
      flashcardDecks,
      currentCard,
      progressPercent,
      startStudy,
      exitStudyMode,
      flipCard,
      nextCard,
      previousCard,
      markCard,
      createDeck,
      editDeck,
      generateCards
    }
  }
}
</script>

<style scoped>
.flashcards-container {
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

/* Study Mode */
.study-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.study-progress {
  width: 100%;
  max-width: 600px;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-bar {
  flex-grow: 1;
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

.progress-text {
  font-weight: 600;
  color: #667eea;
  min-width: 80px;
  text-align: right;
}

.flashcard-container {
  perspective: 1000px;
  width: 100%;
  max-width: 700px;
}

.flashcard {
  position: relative;
  width: 100%;
  height: 400px;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  cursor: pointer;
}

.flashcard.flipped {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 16px;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}

.card-front {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.card-back {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  color: white;
  transform: rotateY(180deg);
}

.card-label {
  position: absolute;
  top: 1.5rem;
  left: 2rem;
  font-size: 0.9rem;
  font-weight: 600;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.card-content {
  font-size: 1.8rem;
  font-weight: 600;
  text-align: center;
  line-height: 1.5;
}

.card-hint {
  position: absolute;
  bottom: 1.5rem;
  font-size: 0.9rem;
  opacity: 0.8;
}

.study-controls {
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}

.btn-nav {
  padding: 1rem 2rem;
  border: none;
  background: #667eea;
  color: white;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.btn-nav:hover:not(:disabled) {
  background: #764ba2;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-nav:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.confidence-buttons {
  display: flex;
  gap: 1rem;
}

.btn-confidence {
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  color: white;
}

.btn-hard {
  background: #dc2626;
}

.btn-medium {
  background: #f59e0b;
}

.btn-easy {
  background: #10b981;
}

.btn-confidence:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.btn-exit {
  padding: 0.75rem 1.5rem;
  border: 2px solid #dc2626;
  background: white;
  color: #dc2626;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.btn-exit:hover {
  background: #dc2626;
  color: white;
}

/* Decks Section */
.decks-section {
  padding: 1rem;
}

.decks-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.decks-header h2 {
  font-size: 2rem;
  color: #2c3e50;
}

.btn-create {
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

.btn-create:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}

.decks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.deck-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.deck-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.deck-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1rem;
}

.deck-header h3 {
  font-size: 1.5rem;
  color: #2c3e50;
}

.deck-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  color: white;
  font-size: 0.85rem;
  font-weight: 600;
}

.deck-description {
  color: #666;
  margin-bottom: 1.5rem;
}

.deck-stats {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #f0f0f0;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
}

.stat i {
  color: #667eea;
}

.deck-actions {
  display: flex;
  gap: 0.75rem;
}

.btn-study,
.btn-edit,
.btn-generate {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.btn-study {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-edit {
  background: #f59e0b;
  color: white;
}

.btn-generate {
  background: #8b5cf6;
  color: white;
}

.btn-study:hover,
.btn-edit:hover,
.btn-generate:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
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

.ai-generate-option {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.ai-generate-option label {
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
  .flashcard {
    height: 350px;
  }

  .card-content {
    font-size: 1.4rem;
  }

  .study-controls {
    flex-direction: column;
  }

  .decks-grid {
    grid-template-columns: 1fr;
  }
}
</style>


