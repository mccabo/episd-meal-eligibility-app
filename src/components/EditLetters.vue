<template>
  <div class="edit-letters-container">
    <!-- Header -->
    <div class="header-section">
      <h2 class="title">Eligibility Letter Editor</h2>
      <div class="language-switcher">
        <button 
          @click="switchLanguage('English')" 
          :class="['lang-btn', { active: currentLanguage === 'English' }]"
        >
          English
        </button>
        <button 
          @click="switchLanguage('Spanish')" 
          :class="['lang-btn', { active: currentLanguage === 'Spanish' }]"
        >
          Spanish
        </button>
      </div>
      <button @click="saveLetter" class="save-btn" v-if="isAdmin">
        💾 Save Changes
      </button>
    </div>

    <!-- Admin Status -->
    <div v-if="!isAdmin" class="warning-banner">
      ⚠️ View-Only Mode - Admin privileges required to edit
    </div>

    <!-- Main Content Area -->
    <div class="editor-layout">
      <!-- Letter Preview -->
      <div class="letter-preview">
        <div class="letter-content">
          <div class="letter-paper">
            <!-- English Letter -->
            <template v-if="currentLanguage === 'English'">
              <div
                v-for="(value, key) in filteredEnglishLetter"
                :key="key"
                :ref="'field-' + key"
                :data-field="key"
                class="editable-field"
                :class="getFieldClass(key)"
                :style="getFieldStyles(key, 'English')"
                contenteditable="true"
                @click="onFieldClick(key, $event)"
                @focus="onFieldFocus(key, $event)"
                @blur="onFieldBlur($event)"
                @input="onFieldInput(key, $event)"
                v-html="value"
              ></div>
            </template>

            <!-- Spanish Letter -->
            <template v-if="currentLanguage === 'Spanish'">
              <div
                v-for="(value, key) in filteredSpanishLetter"
                :key="key"
                :ref="'field-' + key"
                :data-field="key"
                class="editable-field"
                :class="getFieldClass(key)"
                :style="getFieldStyles(key, 'Spanish')"
                contenteditable="true"
                @click="onFieldClick(key, $event)"
                @focus="onFieldFocus(key, $event)"
                @blur="onFieldBlur($event)"
                @input="onFieldInput(key, $event)"
                v-html="value"
              ></div>
            </template>
          </div>
        </div>
      </div>

      <!-- Properties Panel -->
      <div v-if="isAdmin" class="properties-panel">
        <div class="panel-header">
          <h3>Field Properties</h3>
          <div v-if="selectedField" class="field-name">
            <strong>Selected:</strong> {{ selectedField }}
          </div>
          <div v-else class="field-name-hint">
            Click a field to edit its properties
          </div>
        </div>

        <div v-if="selectedField" class="properties-form">
          <table class="props-table">
            <tr>
              <td><label>Field Name:</label></td>
              <td>
                <input
                  v-model="selectedField"
                  type="text"
                  class="prop-input"
                  disabled
                />
              </td>
            </tr>

            <tr>
              <td><label>Font Size:</label></td>
              <td>
                <input
                  v-model="fieldProperties.fontSize"
                  type="text"
                  class="prop-input"
                  placeholder="e.g., 24px, 1.5rem"
                />
              </td>
            </tr>

            <tr>
              <td><label>Width:</label></td>
              <td>
                <input
                  v-model="fieldProperties.width"
                  type="text"
                  class="prop-input"
                  placeholder="e.g., 100%, 500px"
                />
              </td>
            </tr>

            <tr>
              <td><label>Height:</label></td>
              <td>
                <input
                  v-model="fieldProperties.height"
                  type="text"
                  class="prop-input"
                  placeholder="e.g., auto, 100px"
                />
              </td>
            </tr>

            <tr>
              <td><label>Text Color:</label></td>
              <td>
                <input
                  v-model="fieldProperties.color"
                  type="color"
                  class="prop-color"
                />
              </td>
            </tr>

            <tr>
              <td><label>Background:</label></td>
              <td>
                <input
                  v-model="fieldProperties.backgroundColor"
                  type="color"
                  class="prop-color"
                />
              </td>
            </tr>

            <tr>
              <td><label>Font Weight:</label></td>
              <td>
                <select v-model="fieldProperties.fontWeight" class="prop-select">
                  <option value="normal">Normal</option>
                  <option value="600">Semi-Bold</option>
                  <option value="bold">Bold</option>
                  <option value="700">Extra Bold</option>
                </select>
              </td>
            </tr>

            <tr>
              <td><label>Text Align:</label></td>
              <td>
                <select v-model="fieldProperties.textAlign" class="prop-select">
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                  <option value="justify">Justify</option>
                </select>
              </td>
            </tr>

            <tr>
              <td><label>Font Style:</label></td>
              <td>
                <select v-model="fieldProperties.fontStyle" class="prop-select">
                  <option value="normal">Normal</option>
                  <option value="italic">Italic</option>
                </select>
              </td>
            </tr>

            <tr>
              <td><label>Margin Top:</label></td>
              <td>
                <input
                  v-model="fieldProperties.marginTop"
                  type="text"
                  class="prop-input"
                  placeholder="e.g., 10px, 20px"
                />
              </td>
            </tr>

            <tr>
              <td><label>Margin Bottom:</label></td>
              <td>
                <input
                  v-model="fieldProperties.marginBottom"
                  type="text"
                  class="prop-input"
                  placeholder="e.g., 10px, 20px"
                />
              </td>
            </tr>
          </table>

          <div class="button-group">
            <button @click="applyStyles" class="apply-btn">
              ✓ Apply Styles
            </button>
            <button @click="resetStyles" class="reset-btn">
              ↺ Reset Styles
            </button>
          </div>
        </div>

        <div v-else class="no-selection">
          <p>👆 Click on any field in the letter to edit its properties</p>
        </div>
      </div>
    </div>

    <!-- Success/Error Messages -->
    <transition name="slide">
      <div v-if="message" :class="['message-toast', messageType]">
        {{ message }}
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EditLetters',
  props: {
    userRole: {
      type: String,
      default: 'user'
    }
  },
  data() {
    return {
      currentLanguage: 'English',
      englishLetter: {},
      spanishLetter: {},
      englishLetterStyles: {},
      spanishLetterStyles: {},
      selectedField: null,
      selectedElement: null,
      fieldProperties: {
        fontSize: '',
        width: '',
        height: '',
        color: '#000000',
        backgroundColor: '#ffffff',
        fontWeight: 'normal',
        textAlign: 'left',
        fontStyle: 'normal',
        marginTop: '',
        marginBottom: ''
      },
      message: '',
      messageType: 'success',
      isAdmin: false,
      // Define which fields to display (starting from Title) - these match letters.json structure
      displayFields: [
        'Title',
        'District',
        'BodyDate',
        'Salutation',
        'Reviewed',
        'Status',
        'Discussion',
        'Service',
        'Street',
        'City',
        'Phone',
        'Reapply',
        'Closing',
        'Director',
        'Gap',
        'Accordance1',
        'Accordance2',
        'Link1',
        'Link',
        'Accordance3',
        'Link2',
        'Accordance4',
        'Accordance5',
        'Accordance6',
        'Mail1',
        'Mail2',
        'Mail3',
        'Mail4',
        'Fax1',
        'Fax2',
        'Email1',
        'Email2'
      ]
    };
  },
  computed: {
    filteredEnglishLetter() {
      const filtered = {};
      this.displayFields.forEach(field => {
        if (this.englishLetter[field] !== undefined) {
          filtered[field] = this.englishLetter[field];
        }
      });
      return filtered;
    },
    filteredSpanishLetter() {
      const filtered = {};
      this.displayFields.forEach(field => {
        if (this.spanishLetter[field] !== undefined) {
          filtered[field] = this.spanishLetter[field];
        }
      });
      return filtered;
    }
  },
  mounted() {
    this.checkAdminPrivileges();
    this.loadLetters();
  },
  methods: {
    async loadLetters() {
      try {
        console.log('Loading letters...');
        const response = await axios.get('http://localhost:3000/getLetters');
        if (response.data) {
          this.englishLetter = { ...response.data.English[0] };
          this.spanishLetter = { ...response.data.Spanish[0] };
          
          // Load styles if they exist
          this.englishLetterStyles = response.data.English[0]._styles || {};
          this.spanishLetterStyles = response.data.Spanish[0]._styles || {};
          
          console.log('English letter fields:', Object.keys(this.englishLetter));
          console.log('Spanish letter fields:', Object.keys(this.spanishLetter));
          console.log('English letter styles:', this.englishLetterStyles);
          console.log('Spanish letter styles:', this.spanishLetterStyles);
          console.log('Letters loaded successfully - Total fields: English=' + Object.keys(this.englishLetter).length + ', Spanish=' + Object.keys(this.spanishLetter).length);
          this.showMessage('Letters loaded successfully', 'success');
        }
      } catch (error) {
        console.error('Error loading letters:', error);
        this.showMessage('Error loading letters', 'error');
      }
    },
    
    checkAdminPrivileges() {
      try {
        const userStr = localStorage.getItem('user') || localStorage.getItem('currentUser');
        console.log('Checking admin privileges...');
        console.log('User string:', userStr);
        
        if (userStr) {
          const userData = JSON.parse(userStr);
          console.log('User data:', userData);
          this.isAdmin = userData.role === 'admin' || 
                        userData.username === 'Mary Lou' || 
                        this.userRole === 'admin';
        } else {
          this.isAdmin = this.userRole === 'admin';
        }
        
        console.log('Is Admin:', this.isAdmin);
        
        if (!this.isAdmin) {
          this.showMessage('Viewing in read-only mode', 'warning');
        }
      } catch (error) {
        console.error('Error checking admin privileges:', error);
        this.isAdmin = this.userRole === 'admin';
      }
    },

    switchLanguage(lang) {
      this.currentLanguage = lang;
      this.selectedField = null;
      this.selectedElement = null;
      console.log('Switched to:', lang);
    },

    getFieldClass(fieldName) {
      const classes = [];
      
      // Add specific classes based on field name
      if (fieldName === 'Title') classes.push('title-field');
      if (fieldName === 'District') classes.push('district-field');
      if (fieldName === 'BodyDate') classes.push('body-date-field');
      if (fieldName.includes('Accordance')) classes.push('accordance-field');
      if (fieldName.includes('Link')) classes.push('link-field');
      if (['Reviewed', 'Discussion', 'Reapply'].includes(fieldName)) {
        classes.push('text-field');
      }
      
      return classes.join(' ');
    },

    getFieldStyles(fieldName, language) {
      const stylesObj = language === 'English' ? this.englishLetterStyles : this.spanishLetterStyles;
      return stylesObj[fieldName] || {};
    },

    onFieldClick(fieldName, event) {
      if (!this.isAdmin) {
        this.showMessage('Admin privileges required to edit', 'error');
        event.preventDefault();
        return;
      }
      console.log('Field clicked:', fieldName);
    },

    onFieldFocus(fieldName, event) {
      if (!this.isAdmin) return;

      console.log('Field focused:', fieldName);
      this.selectedField = fieldName;
      this.selectedElement = event.target;

      // Add focused class
      event.target.classList.add('field-focused');

      // Get current computed styles
      const computedStyle = window.getComputedStyle(event.target);
      
      this.fieldProperties = {
        fontSize: computedStyle.fontSize || '16px',
        width: computedStyle.width || 'auto',
        height: computedStyle.height || 'auto',
        color: this.rgbToHex(computedStyle.color) || '#000000',
        backgroundColor: this.rgbToHex(computedStyle.backgroundColor) || '#ffffff',
        fontWeight: computedStyle.fontWeight || 'normal',
        textAlign: computedStyle.textAlign || 'left',
        fontStyle: computedStyle.fontStyle || 'normal',
        marginTop: computedStyle.marginTop || '0px',
        marginBottom: computedStyle.marginBottom || '0px'
      };

      console.log('Field properties loaded:', this.fieldProperties);
    },

    onFieldBlur(event) {
      // Remove focused class
      event.target.classList.remove('field-focused');
    },

    onFieldInput(fieldName, event) {
      const newValue = event.target.innerText || event.target.textContent;
      
      console.log('Field input:', fieldName, '=', newValue);
      
      if (this.currentLanguage === 'English') {
        this.englishLetter[fieldName] = newValue;
      } else {
        this.spanishLetter[fieldName] = newValue;
      }
    },

    applyStyles() {
      if (!this.selectedElement || !this.selectedField) {
        this.showMessage('No field selected', 'error');
        return;
      }

      const element = this.selectedElement;
      
      try {
        // Build the styles object
        const styles = {};
        
        if (this.fieldProperties.fontSize) {
          element.style.fontSize = this.fieldProperties.fontSize;
          styles.fontSize = this.fieldProperties.fontSize;
        }
        if (this.fieldProperties.width) {
          element.style.width = this.fieldProperties.width;
          styles.width = this.fieldProperties.width;
        }
        if (this.fieldProperties.height) {
          element.style.height = this.fieldProperties.height;
          styles.height = this.fieldProperties.height;
        }
        if (this.fieldProperties.color) {
          element.style.color = this.fieldProperties.color;
          styles.color = this.fieldProperties.color;
        }
        if (this.fieldProperties.backgroundColor) {
          element.style.backgroundColor = this.fieldProperties.backgroundColor;
          styles.backgroundColor = this.fieldProperties.backgroundColor;
        }
        if (this.fieldProperties.fontWeight) {
          element.style.fontWeight = this.fieldProperties.fontWeight;
          styles.fontWeight = this.fieldProperties.fontWeight;
        }
        if (this.fieldProperties.textAlign) {
          element.style.textAlign = this.fieldProperties.textAlign;
          styles.textAlign = this.fieldProperties.textAlign;
        }
        if (this.fieldProperties.fontStyle) {
          element.style.fontStyle = this.fieldProperties.fontStyle;
          styles.fontStyle = this.fieldProperties.fontStyle;
        }
        if (this.fieldProperties.marginTop) {
          element.style.marginTop = this.fieldProperties.marginTop;
          styles.marginTop = this.fieldProperties.marginTop;
        }
        if (this.fieldProperties.marginBottom) {
          element.style.marginBottom = this.fieldProperties.marginBottom;
          styles.marginBottom = this.fieldProperties.marginBottom;
        }

        // Save styles to the appropriate letter styles object
        if (this.currentLanguage === 'English') {
          this.englishLetterStyles[this.selectedField] = styles;
        } else {
          this.spanishLetterStyles[this.selectedField] = styles;
        }

        console.log('Styles applied and saved to field:', this.selectedField);
        console.log('Styles:', styles);
        this.showMessage('Styles applied successfully! Click Save to persist changes.', 'success');
      } catch (error) {
        console.error('Error applying styles:', error);
        this.showMessage('Error applying styles', 'error');
      }
    },

    resetStyles() {
      if (!this.selectedElement || !this.selectedField) {
        this.showMessage('No field selected', 'error');
        return;
      }

      this.selectedElement.removeAttribute('style');
      
      // Remove styles from the saved styles object
      if (this.currentLanguage === 'English') {
        delete this.englishLetterStyles[this.selectedField];
      } else {
        delete this.spanishLetterStyles[this.selectedField];
      }
      
      console.log('Styles reset for field:', this.selectedField);
      this.showMessage('Field styles reset. Click Save to persist changes.', 'success');
      
      // Reload properties
      if (this.selectedElement) {
        const computedStyle = window.getComputedStyle(this.selectedElement);
        this.fieldProperties = {
          fontSize: computedStyle.fontSize,
          width: computedStyle.width,
          height: computedStyle.height,
          color: this.rgbToHex(computedStyle.color),
          backgroundColor: this.rgbToHex(computedStyle.backgroundColor),
          fontWeight: computedStyle.fontWeight,
          textAlign: computedStyle.textAlign,
          fontStyle: computedStyle.fontStyle,
          marginTop: computedStyle.marginTop,
          marginBottom: computedStyle.marginBottom
        };
      }
    },

    async saveLetter() {
      if (!this.isAdmin) {
        this.showMessage('You do not have permission to save changes', 'error');
        return;
      }

      try {
        console.log('Saving letters...');
        console.log('English letter before save - Total fields:', Object.keys(this.englishLetter).length);
        console.log('Spanish letter before save - Total fields:', Object.keys(this.spanishLetter).length);
        console.log('English letter fields:', Object.keys(this.englishLetter));
        console.log('Spanish letter fields:', Object.keys(this.spanishLetter));
        
        // Create copies of the letter data and add styles
        const englishWithStyles = { ...this.englishLetter, _styles: this.englishLetterStyles };
        const spanishWithStyles = { ...this.spanishLetter, _styles: this.spanishLetterStyles };
        
        const lettersData = {
          English: [englishWithStyles],
          Spanish: [spanishWithStyles]
        };

        console.log('Data to save (with styles):', JSON.stringify(lettersData, null, 2));

        const response = await axios.post('http://localhost:3000/saveLetters', lettersData);
        
        console.log('Save response:', response.data);
        
        if (response.data.success) {
          this.showMessage('✓ Letter and styles saved successfully to letters.json!', 'success');
        } else {
          this.showMessage('Error saving letter', 'error');
        }
      } catch (error) {
        console.error('Error saving letter:', error);
        this.showMessage('Error: ' + (error.message || 'Failed to save'), 'error');
      }
    },

    showMessage(text, type = 'success') {
      this.message = text;
      this.messageType = type;
      
      console.log(`[${type.toUpperCase()}] ${text}`);
      
      setTimeout(() => {
        this.message = '';
      }, 4000);
    },

    rgbToHex(rgb) {
      if (!rgb || rgb === 'rgba(0, 0, 0, 0)' || rgb === 'transparent') {
        return '#ffffff';
      }
      
      const result = rgb.match(/\d+/g);
      if (!result || result.length < 3) return '#000000';
      
      return '#' + result.slice(0, 3).map(x => {
        const hex = parseInt(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
    }
  }
};
</script>

<style scoped>
.edit-letters-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.language-switcher {
  display: flex;
  gap: 10px;
}

.lang-btn {
  padding: 10px 20px;
  border: 2px solid #0a58ca;
  background-color: white;
  color: #0a58ca;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s;
}

.lang-btn:hover {
  background-color: #f0f0f0;
}

.lang-btn.active {
  background-color: #0a58ca;
  color: white;
}

.save-btn {
  width: 15%;  
  padding: 12px 30px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.save-btn:hover {
  background-color: #218838;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.warning-banner {
  background-color: #fff3cd;
  border: 1px solid #ffc107;
  color: #856404;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 600;
}

.editor-layout {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.letter-preview {
  flex: 1;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow-y: auto;
  max-height: calc(100vh - 200px);
}

.letter-content {
  padding: 20px;
}

.letter-paper {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background-color: white;
  border: 1px dashed #ccc;
  font-size: 16px;
  line-height: 1.6;
}

.editable-field {
  padding: 10px;
  margin: 12px 0;
  border-radius: 4px;
  transition: all 0.2s;
  cursor: text;
  min-height: 30px;
  border: 2px solid transparent;
}

.editable-field:hover {
  background-color: #f8f9fa;
  border-color: #dee2e6;
}

.editable-field.field-focused {
  background-color: #fff3cd !important;
  border-color: #ffc107 !important;
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 193, 7, 0.25);
}

.title-field {
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
  color: #2c3e50;
}

.district-field {
  font-style: italic;
  margin-bottom: 15px;
  font-size: 18px;
}

.body-date-field {
  margin-bottom: 20px;
}

.text-field {
  margin: 20px 0;
  text-align: justify;
  line-height: 1.8;
}

.accordance-field {
  margin: 15px 0;
  text-align: justify;
  font-size: 14px;
  line-height: 1.6;
}

.link-field {
  color: #0066cc;
  text-decoration: underline;
  word-break: break-all;
  cursor: pointer;
}

.properties-panel {
  width: 450px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 20px;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}

.panel-header {
  border-bottom: 2px solid #0a58ca;
  padding-bottom: 15px;
  margin-bottom: 20px;
}

.panel-header h3 {
  margin: 0 0 10px 0;
  font-size: 20px;
  color: #333;
}

.field-name {
  font-size: 16px;
  color: #0a58ca;
  padding: 8px;
  background-color: #e7f3ff;
  border-radius: 4px;
}

.field-name-hint {
  font-size: 14px;
  color: #666;
  font-style: italic;
}

.properties-form {
  margin-top: 20px;
}

.props-table {
  width: 100%;
  border-collapse: collapse;
}

.props-table tr {
  border-bottom: 1px solid #eee;
}

.props-table td {
  padding: 12px 5px;
  vertical-align: middle;
}

.props-table td:first-child {
  width: 40%;
  font-weight: 600;
  color: #555;
}

.prop-input,
.prop-select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.prop-input:focus,
.prop-select:focus {
  outline: none;
  border-color: #0a58ca;
  box-shadow: 0 0 0 3px rgba(10, 88, 202, 0.1);
}

.prop-color {
  width: 100%;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #eee;
}

.apply-btn,
.reset-btn {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.apply-btn {
  background-color: #0a58ca;
  color: white;
}

.apply-btn:hover {
  background-color: #084298;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.reset-btn {
  background-color: #6c757d;
  color: white;
}

.reset-btn:hover {
  background-color: #5a6268;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.no-selection {
  padding: 40px 20px;
  text-align: center;
  color: #666;
  font-size: 16px;
}

.message-toast {
  position: fixed;
  bottom: 30px;
  right: 30px;
  padding: 16px 30px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  z-index: 1000;
  max-width: 400px;
}

.message-toast.success {
  background-color: #28a745;
  color: white;
}

.message-toast.error {
  background-color: #dc3545;
  color: white;
}

.message-toast.warning {
  background-color: #ffc107;
  color: #856404;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  transform: translateX(400px);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(400px);
  opacity: 0;
}

@media (max-width: 1200px) {
  .editor-layout {
    flex-direction: column;
  }

  .properties-panel {
    width: 100%;
    max-height: none;
  }
}
</style>
