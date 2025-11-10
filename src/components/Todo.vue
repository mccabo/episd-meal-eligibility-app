<template>
  <div class="todo-container">
    <!-- Header -->
    <div class="todo-header">
      <div class="header-content">
        <h1 class="todo-title">
          <i class="pi pi-check-square"></i>
          EPISD Project Todo List
        </h1>
        <div class="header-stats">
          <div class="stat-badge completed">
            <i class="pi pi-check-circle"></i>
            <span>{{ completedCount }}/{{ totalCount }} Complete</span>
          </div>
          <div class="stat-badge inprogress">
            <i class="pi pi-clock"></i>
            <span>{{ inProgressCount }} In Progress</span>
          </div>
          <div class="stat-badge pending">
            <i class="pi pi-circle"></i>
            <span>{{ pendingCount }} Pending</span>
          </div>
        </div>
      </div>
      <div class="progress-bar-container">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
        </div>
        <span class="progress-text">{{ progressPercentage }}% Complete</span>
      </div>
    </div>

    <!-- Add New Todo -->
    <div class="add-todo-section">
      <div class="input-group">
        <input 
          v-model="newTodoTitle"
          @keyup.enter="addTodo"
          type="text" 
          placeholder="Add a new task..."
          class="todo-input"
        />
        <select v-model="newTodoCategory" class="category-select">
          <option value="development">Development</option>
          <option value="testing">Testing</option>
          <option value="documentation">Documentation</option>
          <option value="deployment">Deployment</option>
          <option value="bug">Bug Fix</option>
          <option value="feature">Feature</option>
        </select>
        <select v-model="newTodoPriority" class="priority-select">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
        <button @click="addTodo" class="add-button">
          <i class="pi pi-plus"></i>
          Add Task
        </button>
      </div>
    </div>

    <!-- Filter and Sort -->
    <div class="filter-section">
      <div class="filter-group">
        <button 
          v-for="filter in filters" 
          :key="filter.value"
          @click="activeFilter = filter.value"
          :class="['filter-button', { active: activeFilter === filter.value }]"
        >
          <i :class="filter.icon"></i>
          {{ filter.label }}
          <span class="filter-count">{{ getFilterCount(filter.value) }}</span>
        </button>
      </div>
      <div class="sort-group">
        <label>Sort by:</label>
        <select v-model="sortBy" class="sort-select">
          <option value="priority">Priority</option>
          <option value="date">Date Added</option>
          <option value="category">Category</option>
          <option value="status">Status</option>
        </select>
      </div>
    </div>

    <!-- Todo Lists by Category -->
    <div class="todo-content">
      <div 
        v-for="category in categories" 
        :key="category.id"
        class="category-section"
        v-show="getCategoryTodos(category.id).length > 0"
      >
        <div class="category-header">
          <div class="category-title">
            <i :class="category.icon" :style="{ color: category.color }"></i>
            <h3>{{ category.name }}</h3>
            <span class="category-count">{{ getCategoryTodos(category.id).length }}</span>
          </div>
          <button 
            @click="toggleCategory(category.id)"
            class="collapse-button"
          >
            <i :class="collapsedCategories.includes(category.id) ? 'pi pi-chevron-down' : 'pi pi-chevron-up'"></i>
          </button>
        </div>

        <transition-group name="todo-list" tag="div" class="todo-list">
          <div 
            v-for="todo in getCategoryTodos(category.id)" 
            :key="todo.id"
            :class="['todo-item', todo.status, todo.priority]"
            @click="selectTodo(todo)"
          >
            <div class="todo-checkbox">
              <input 
                type="checkbox" 
                :checked="todo.status === 'completed'"
                @click.stop="toggleTodoStatus(todo)"
              />
            </div>
            
            <div class="todo-content-main">
              <div class="todo-title-row">
                <span :class="['todo-title-text', { completed: todo.status === 'completed' }]">
                  {{ todo.title }}
                </span>
                <div class="todo-badges">
                  <span :class="['priority-badge', todo.priority]">
                    {{ todo.priority }}
                  </span>
                  <span :class="['status-badge', todo.status]">
                    {{ formatStatus(todo.status) }}
                  </span>
                </div>
              </div>
              
              <div v-if="todo.description" class="todo-description">
                {{ todo.description }}
              </div>
              
              <div class="todo-meta">
                <span class="meta-item">
                  <i class="pi pi-calendar"></i>
                  {{ formatDate(todo.createdAt) }}
                </span>
                <span v-if="todo.dueDate" class="meta-item">
                  <i class="pi pi-clock"></i>
                  Due: {{ formatDate(todo.dueDate) }}
                </span>
                <span v-if="todo.assignee" class="meta-item">
                  <i class="pi pi-user"></i>
                  {{ todo.assignee }}
                </span>
              </div>
            </div>

            <div class="todo-actions">
              <button @click.stop="editTodo(todo)" class="action-btn edit" title="Edit">
                <i class="pi pi-pencil"></i>
              </button>
              <button @click.stop="deleteTodo(todo.id)" class="action-btn delete" title="Delete">
                <i class="pi pi-trash"></i>
              </button>
            </div>
          </div>
        </transition-group>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredTodos.length === 0" class="empty-state">
      <i class="pi pi-inbox empty-icon"></i>
      <h3>No tasks found</h3>
      <p>{{ getEmptyMessage() }}</p>
    </div>

    <!-- Edit Todo Modal -->
    <div v-if="editingTodo" class="modal-overlay" @click="closeEditModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>Edit Task</h2>
          <button @click="closeEditModal" class="close-button">
            <i class="pi pi-times"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="form-group">
            <label>Title</label>
            <input v-model="editingTodo.title" type="text" class="form-input" />
          </div>
          
          <div class="form-group">
            <label>Description</label>
            <textarea v-model="editingTodo.description" class="form-textarea" rows="3"></textarea>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label>Category</label>
              <select v-model="editingTodo.category" class="form-select">
                <option value="development">Development</option>
                <option value="testing">Testing</option>
                <option value="documentation">Documentation</option>
                <option value="deployment">Deployment</option>
                <option value="bug">Bug Fix</option>
                <option value="feature">Feature</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Priority</label>
              <select v-model="editingTodo.priority" class="form-select">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label>Status</label>
              <select v-model="editingTodo.status" class="form-select">
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Due Date</label>
              <input v-model="editingTodo.dueDate" type="date" class="form-input" />
            </div>
          </div>
          
          <div class="form-group">
            <label>Assignee</label>
            <input v-model="editingTodo.assignee" type="text" class="form-input" placeholder="Assigned to..." />
          </div>
        </div>
        
        <div class="modal-footer">
          <button @click="closeEditModal" class="btn-secondary">Cancel</button>
          <button @click="saveEditedTodo" class="btn-primary">Save Changes</button>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <Toast />
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'

export default {
  name: 'Todo',
  components: {
    Toast
  },
  setup() {
    const toast = useToast()

    // Default todos
    const defaultTodos = [
      {
        id: 1,
        title: 'Complete test suite documentation',
        description: 'Add comprehensive documentation for all 146 tests',
        category: 'documentation',
        priority: 'high',
        status: 'completed',
        createdAt: new Date('2025-10-15'),
        dueDate: null,
        assignee: 'Development Team'
      },
      {
        id: 2,
        title: 'Fix Vue component mounting issues',
        description: 'Resolve VueCompilerDOM errors in test suite',
        category: 'bug',
        priority: 'critical',
        status: 'completed',
        createdAt: new Date('2025-10-16'),
        dueDate: null,
        assignee: 'QA Team'
      },
      {
        id: 3,
        title: 'Add click event tests',
        description: 'Create comprehensive tests for user click interactions',
        category: 'testing',
        priority: 'high',
        status: 'completed',
        createdAt: new Date('2025-10-17'),
        dueDate: null,
        assignee: 'QA Team'
      },
      {
        id: 4,
        title: 'Create Test Results Vue component',
        description: 'Build interactive dashboard for displaying test results',
        category: 'feature',
        priority: 'high',
        status: 'completed',
        createdAt: new Date('2025-10-18'),
        dueDate: null,
        assignee: 'Frontend Team'
      },
      {
        id: 5,
        title: 'Add test button to navigation',
        description: 'Implement Run Tests button in navbar with toast notifications',
        category: 'feature',
        priority: 'medium',
        status: 'completed',
        createdAt: new Date('2025-10-18'),
        dueDate: null,
        assignee: 'Frontend Team'
      },
      {
        id: 6,
        title: 'Implement application filtering by status',
        description: 'Add filters for approved, denied, and reduced-price applications',
        category: 'feature',
        priority: 'medium',
        status: 'in-progress',
        createdAt: new Date('2025-10-18'),
        dueDate: new Date('2025-10-25'),
        assignee: 'Backend Team'
      },
      {
        id: 7,
        title: 'Optimize database queries',
        description: 'Improve performance for large application datasets',
        category: 'development',
        priority: 'high',
        status: 'pending',
        createdAt: new Date('2025-10-18'),
        dueDate: new Date('2025-10-30'),
        assignee: 'Backend Team'
      },
      {
        id: 8,
        title: 'Add email notification system',
        description: 'Send email notifications when applications are processed',
        category: 'feature',
        priority: 'medium',
        status: 'pending',
        createdAt: new Date('2025-10-18'),
        dueDate: new Date('2025-11-05'),
        assignee: 'Backend Team'
      },
      {
        id: 9,
        title: 'Deploy to production',
        description: 'Set up production environment and deploy application',
        category: 'deployment',
        priority: 'critical',
        status: 'pending',
        createdAt: new Date('2025-10-18'),
        dueDate: new Date('2025-11-15'),
        assignee: 'DevOps Team'
      },
      {
        id: 10,
        title: 'Create user guide',
        description: 'Write comprehensive user documentation',
        category: 'documentation',
        priority: 'medium',
        status: 'pending',
        createdAt: new Date('2025-10-18'),
        dueDate: new Date('2025-11-01'),
        assignee: 'Documentation Team'
      }
    ]

    // Load todos from server
    const loadTodos = async () => {
      try {
        console.log('Attempting to load todos from server...')
        
        const response = await fetch('http://localhost:3000/todos')
        
        console.log('Response status:', response.status)
        
        if (response.ok) {
          const data = await response.json()
          console.log('✓ Loaded', data.length, 'todos from server')
          
          if (data && data.length > 0) {
            // Convert date strings back to Date objects
            return data.map(todo => ({
              ...todo,
              createdAt: new Date(todo.createdAt),
              dueDate: todo.dueDate ? new Date(todo.dueDate) : null
            }))
          }
          
          // Return defaults if empty array
          return defaultTodos
        } else {
          throw new Error(`Server returned ${response.status}: ${response.statusText}`)
        }
      } catch (error) {
        console.error('✗ Error loading todos from server:', error.message)
        
        // Provide specific error message based on error type
        let errorDetail = 'Could not connect to server. '
        
        if (error.message.includes('Failed to fetch')) {
          errorDetail += 'Is the server running on port 3000?'
        } else if (error.message.includes('NetworkError')) {
          errorDetail += 'Network error occurred.'
        } else {
          errorDetail += error.message
        }
        
        toast.add({ 
          severity: 'warn', 
          summary: 'Connection Error', 
          detail: errorDetail,
          life: 5000 
        })
      }
      
      console.log('Using default todos')
      return defaultTodos
    }

    // Save todos to server
    const saveTodos = async () => {
      try {
        console.log('Saving', todos.value.length, 'todos to server...')
        
        const response = await fetch('http://localhost:3000/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(todos.value)
        })
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          const errorMessage = errorData.message || `Server error: ${response.status}`
          throw new Error(errorMessage)
        }
        
        const result = await response.json()
        console.log('✓ Todos saved successfully:', result.message)
      } catch (error) {
        console.error('✗ Error saving todos to server:', error.message)
        toast.add({ 
          severity: 'error', 
          summary: 'Save Error', 
          detail: error.message || 'Failed to save todos to file', 
          life: 5000 
        })
      }
    }

    // State
    const todos = ref(defaultTodos)

    const newTodoTitle = ref('')
    const newTodoCategory = ref('development')
    const newTodoPriority = ref('medium')
    const activeFilter = ref('all')
    const sortBy = ref('priority')
    const editingTodo = ref(null)
    const collapsedCategories = ref([])

    // Categories
    const categories = [
      { id: 'development', name: 'Development', icon: 'pi pi-code', color: '#3b82f6' },
      { id: 'testing', name: 'Testing', icon: 'pi pi-check-square', color: '#10b981' },
      { id: 'documentation', name: 'Documentation', icon: 'pi pi-book', color: '#f59e0b' },
      { id: 'deployment', name: 'Deployment', icon: 'pi pi-cloud-upload', color: '#8b5cf6' },
      { id: 'bug', name: 'Bug Fixes', icon: 'pi pi-exclamation-triangle', color: '#ef4444' },
      { id: 'feature', name: 'Features', icon: 'pi pi-star', color: '#06b6d4' }
    ]

    // Filters
    const filters = [
      { value: 'all', label: 'All Tasks', icon: 'pi pi-list' },
      { value: 'pending', label: 'Pending', icon: 'pi pi-circle' },
      { value: 'in-progress', label: 'In Progress', icon: 'pi pi-clock' },
      { value: 'completed', label: 'Completed', icon: 'pi pi-check-circle' }
    ]

    // Computed
    const filteredTodos = computed(() => {
      let filtered = todos.value

      if (activeFilter.value !== 'all') {
        filtered = filtered.filter(todo => todo.status === activeFilter.value)
      }

      // Sort
      filtered = [...filtered].sort((a, b) => {
        if (sortBy.value === 'priority') {
          const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
          return priorityOrder[a.priority] - priorityOrder[b.priority]
        } else if (sortBy.value === 'date') {
          return new Date(b.createdAt) - new Date(a.createdAt)
        } else if (sortBy.value === 'category') {
          return a.category.localeCompare(b.category)
        } else if (sortBy.value === 'status') {
          const statusOrder = { 'in-progress': 0, pending: 1, completed: 2 }
          return statusOrder[a.status] - statusOrder[b.status]
        }
        return 0
      })

      return filtered
    })

    const totalCount = computed(() => todos.value.length)
    const completedCount = computed(() => todos.value.filter(t => t.status === 'completed').length)
    const inProgressCount = computed(() => todos.value.filter(t => t.status === 'in-progress').length)
    const pendingCount = computed(() => todos.value.filter(t => t.status === 'pending').length)
    const progressPercentage = computed(() => 
      Math.round((completedCount.value / totalCount.value) * 100) || 0
    )

    // Debounce timer for auto-save
    let saveTimer = null
    let isInitialLoad = true
    
    // Watch todos for changes and save to server (debounced)
    watch(todos, () => {
      // Don't save during initial load
      if (isInitialLoad) {
        return
      }
      
      // Clear existing timer
      if (saveTimer) {
        clearTimeout(saveTimer)
      }
      
      // Set new timer to save after 500ms of no changes
      saveTimer = setTimeout(() => {
        saveTodos()
      }, 500)
    }, { deep: true })

    // Load todos on component mount
    onMounted(async () => {
      const loadedTodos = await loadTodos()
      todos.value = loadedTodos
      
      // Allow auto-save after initial load completes
      setTimeout(() => {
        isInitialLoad = false
        console.log('Todo component initialized, auto-save enabled')
      }, 1000)
    })

    // Methods
    const addTodo = () => {
      if (!newTodoTitle.value.trim()) {
        toast.add({ severity: 'warn', summary: 'Warning', detail: 'Please enter a task title', life: 3000 })
        return
      }

      const newTodo = {
        id: Date.now(),
        title: newTodoTitle.value,
        description: '',
        category: newTodoCategory.value,
        priority: newTodoPriority.value,
        status: 'pending',
        createdAt: new Date(),
        dueDate: null,
        assignee: ''
      }

      todos.value.unshift(newTodo)
      newTodoTitle.value = ''
      saveTodos()
      
      toast.add({ severity: 'success', summary: 'Success', detail: 'Task added successfully', life: 3000 })
    }

    const toggleTodoStatus = (todo) => {
      if (todo.status === 'completed') {
        todo.status = 'pending'
        toast.add({ severity: 'info', summary: 'Task Reopened', detail: 'Task marked as pending', life: 3000 })
      } else {
        todo.status = 'completed'
        toast.add({ severity: 'success', summary: 'Task Completed', detail: 'Task marked as completed', life: 3000 })
      }
      saveTodos()
    }

    const deleteTodo = (id) => {
      const index = todos.value.findIndex(t => t.id === id)
      if (index !== -1) {
        todos.value.splice(index, 1)
        saveTodos()
        toast.add({ severity: 'info', summary: 'Task Deleted', detail: 'Task removed from list', life: 3000 })
      }
    }

    const editTodo = (todo) => {
      editingTodo.value = { ...todo }
    }

    const saveEditedTodo = () => {
      const index = todos.value.findIndex(t => t.id === editingTodo.value.id)
      if (index !== -1) {
        todos.value[index] = { ...editingTodo.value }
        saveTodos()
        toast.add({ severity: 'success', summary: 'Task Updated', detail: 'Changes saved successfully', life: 3000 })
      }
      closeEditModal()
    }

    const closeEditModal = () => {
      editingTodo.value = null
    }

    const selectTodo = (todo) => {
      // Could expand to show details
    }

    const getCategoryTodos = (categoryId) => {
      return filteredTodos.value.filter(todo => todo.category === categoryId)
    }

    const getFilterCount = (filterValue) => {
      if (filterValue === 'all') return todos.value.length
      return todos.value.filter(t => t.status === filterValue).length
    }

    const toggleCategory = (categoryId) => {
      const index = collapsedCategories.value.indexOf(categoryId)
      if (index > -1) {
        collapsedCategories.value.splice(index, 1)
      } else {
        collapsedCategories.value.push(categoryId)
      }
    }

    const formatStatus = (status) => {
      return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    }

    const formatDate = (date) => {
      if (!date) return ''
      return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }

    const getEmptyMessage = () => {
      if (activeFilter.value === 'completed') {
        return 'No completed tasks yet. Complete some tasks to see them here!'
      } else if (activeFilter.value === 'in-progress') {
        return 'No tasks in progress. Start working on a task to see it here!'
      } else if (activeFilter.value === 'pending') {
        return 'No pending tasks. Great job keeping up!'
      }
      return 'No tasks found. Add a new task to get started!'
    }

    return {
      todos,
      newTodoTitle,
      newTodoCategory,
      newTodoPriority,
      activeFilter,
      sortBy,
      editingTodo,
      collapsedCategories,
      categories,
      filters,
      filteredTodos,
      totalCount,
      completedCount,
      inProgressCount,
      pendingCount,
      progressPercentage,
      addTodo,
      toggleTodoStatus,
      deleteTodo,
      editTodo,
      saveEditedTodo,
      closeEditModal,
      selectTodo,
      getCategoryTodos,
      getFilterCount,
      toggleCategory,
      formatStatus,
      formatDate,
      getEmptyMessage
    }
  }
}
</script>

<style scoped>
.todo-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.todo-header {
  background: linear-gradient(135deg, #0a58ca 0%, #0a58ca 100%);
  color: white;
  padding: 30px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.todo-title {
  font-size: 2.5rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 15px;
}

.header-stats {
  display: flex;
  gap: 15px;
}

.stat-badge {
  background: rgba(255, 255, 255, 0.15);
  padding: 10px 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 0.95rem;
}

.progress-bar-container {
  display: flex;
  align-items: center;
  gap: 15px;
}

.progress-bar {
  flex: 1;
  height: 12px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4ade80, #22c55e);
  transition: width 0.3s ease;
}

.progress-text {
  font-weight: 600;
  font-size: 1.1rem;
}

.add-todo-section {
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.input-group {
  display: flex;
  gap: 10px;
}

.todo-input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
}

.todo-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.category-select,
.priority-select,
.sort-select,
.form-select {
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-select:hover,
.priority-select:hover,
.sort-select:hover {
  border-color: #cbd5e1;
}

.add-button {
  padding: 12px 24px;
  background: linear-gradient(135deg, #0a58ca 0%, #0a58ca 100%);
  color: white;
  border: none;
  font-size: 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.add-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.filter-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 20px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.filter-button {
  padding: 10px 20px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  width: 50%;
}

.filter-button:hover {
  border-color: #cbd5e1;
  background: #f8fafc;
}

.filter-button.active {
  background: #0a58ca;
  color: white;
  border-color: #0a58ca;
}

.filter-count {
  background: rgba(0, 0, 0, 0.1);
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.85rem;
}

.filter-button.active .filter-count {
  background: rgba(255, 255, 255, 0.2);
}

.sort-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sort-group label {
  font-weight: 500;
  color: #64748b;
}

.category-section {
  margin-bottom: 30px;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: white;
  border-radius: 12px 12px 0 0;
  border-bottom: 2px solid #f1f5f9;
}

.category-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.category-title h3 {
  margin: 0;
  color: #1e293b;
  font-size: 1.3rem;
}

.category-title i {
  font-size: 1.5rem;
}

.category-count {
  background: #f1f5f9;
  color: #64748b;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
}

.collapse-button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: #64748b;
  transition: all 0.3s ease;
}

.collapse-button:hover {
  color: #1e293b;
}

.todo-list {
  background: white;
  border-radius: 0 0 12px 12px;
  overflow: hidden;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  border-bottom: 1px solid #f1f5f9;
  transition: all 0.3s ease;
  cursor: pointer;
}

.todo-item:last-child {
  border-bottom: none;
}

.todo-item:hover {
  background: #f8fafc;
}

.todo-item.completed {
  opacity: 0.6;
}

.todo-checkbox input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.todo-content-main {
  flex: 1;
}

.todo-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.todo-title-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
}

.todo-title-text.completed {
  text-decoration: line-through;
  color: #94a3b8;
}

.todo-badges {
  display: flex;
  gap: 8px;
}

.priority-badge,
.status-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.priority-badge.critical {
  background: #fee2e2;
  color: #991b1b;
}

.priority-badge.high {
  background: #fed7aa;
  color: #9a3412;
}

.priority-badge.medium {
  background: #fef3c7;
  color: #92400e;
}

.priority-badge.low {
  background: #dbeafe;
  color: #1e40af;
}

.status-badge.pending {
  background: #e0e7ff;
  color: #3730a3;
}

.status-badge.in-progress {
  background: #dbeafe;
  color: #1e40af;
}

.status-badge.completed {
  background: #dcfce7;
  color: #166534;
}

.todo-description {
  color: #64748b;
  font-size: 0.95rem;
  margin-bottom: 8px;
}

.todo-meta {
  display: flex;
  gap: 15px;
  font-size: 0.85rem;
  color: #94a3b8;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.todo-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn.edit {
  background: #dbeafe;
  color: #1e40af;
}

.action-btn.edit:hover {
  background: #3b82f6;
  color: white;
}

.action-btn.delete {
  background: #fee2e2;
  color: #991b1b;
}

.action-btn.delete:hover {
  background: #ef4444;
  color: white;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.empty-icon {
  font-size: 4rem;
  color: #cbd5e1;
  margin-bottom: 20px;
}

.empty-state h3 {
  color: #64748b;
  margin: 0 0 10px 0;
}

.empty-state p {
  color: #94a3b8;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 2px solid #f1f5f9;
}

.modal-header h2 {
  margin: 0;
  color: #1e293b;
}

.close-button {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: #64748b;
  cursor: pointer;
  padding: 5px;
  transition: all 0.3s ease;
}

.close-button:hover {
  color: #1e293b;
}

.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #374151;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-textarea {
  resize: vertical;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 20px;
  border-top: 2px solid #f1f5f9;
}

.btn-primary,
.btn-secondary {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: #f1f5f9;
  color: #64748b;
}

.btn-secondary:hover {
  background: #e2e8f0;
}

/* Animations */
.todo-list-enter-active,
.todo-list-leave-active {
  transition: all 0.3s ease;
}

.todo-list-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.todo-list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .todo-container {
    padding: 10px;
  }

  .todo-title {
    font-size: 2rem;
  }

  .header-stats {
    flex-direction: column;
    gap: 8px;
  }

  .input-group {
    flex-direction: column;
  }

  .filter-section {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-group {
    justify-content: center;
  }

  .sort-group {
    justify-content: center;
  }

  .todo-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .todo-actions {
    width: 100%;
    justify-content: flex-end;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
