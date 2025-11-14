<template>
  <div class="readme-container">
    <Card>
      <template #header>
        <div class="readme-header">
          <h1><i class="pi pi-book"></i> Documentation Center</h1>
          <p>Browse all documentation files organized by category</p>
        </div>
      </template>
      
      <template #content>
        <div v-if="loading" class="loading-state">
          <ProgressSpinner />
          <p>Loading documentation...</p>
        </div>

        <div v-else-if="error" class="error-state">
          <Message severity="error">
            <strong>Error loading documentation:</strong> {{ error }}
          </Message>
        </div>

        <div v-else class="docs-content">
          <!-- Search -->
          <div class="search-bar">
            <span class="p-input-icon-left w-full">
              <i class="pi pi-search" />
              <InputText 
                v-model="searchQuery" 
                placeholder="Search documentation..." 
                class="w-full"
                @input="filterDocs"
              />
            </span>
          </div>

          <!-- Tabs organized by category -->
          <TabView v-model:activeIndex="activeTab" scrollable>
            <!-- Getting Started -->
            <TabPanel header="🚀 Getting Started">
              <div class="category-content">
                <p class="docs-count">{{ gettingStartedDocs.length }} documents in this category</p>
                <div v-if="gettingStartedDocs.length === 0" class="empty-category">
                  <Message severity="info">No getting started documentation found.</Message>
                </div>
                <Accordion v-else :multiple="true" :activeIndex="[0]">
                  <AccordionTab 
                    v-for="doc in gettingStartedDocs" 
                    :key="doc.name"
                    :header="doc.displayName"
                  >
                    <div class="doc-header">
                      <Button 
                        icon="pi pi-download" 
                        label="Download" 
                        size="small" 
                        @click="downloadDoc(doc)"
                        outlined
                      />
                      <Button 
                        icon="pi pi-copy" 
                        label="Copy" 
                        size="small" 
                        @click="copyToClipboard(doc.content)"
                        outlined
                      />
                    </div>
                    <div class="markdown-content" v-html="doc.html"></div>
                  </AccordionTab>
                </Accordion>
              </div>
            </TabPanel>

            <!-- Authentication -->
            <TabPanel header="🔐 Authentication">
              <div class="category-content">
                <p class="docs-count">{{ authDocs.length }} documents in this category</p>
                <div v-if="authDocs.length === 0" class="empty-category">
                  <Message severity="info">No authentication documentation found.</Message>
                </div>
                <Accordion v-else :multiple="true" :activeIndex="[0]">
                  <AccordionTab 
                    v-for="doc in authDocs" 
                    :key="doc.name"
                    :header="doc.displayName"
                  >
                    <div class="doc-header">
                      <Button 
                        icon="pi pi-download" 
                        label="Download" 
                        size="small" 
                        @click="downloadDoc(doc)"
                        outlined
                      />
                      <Button 
                        icon="pi pi-copy" 
                        label="Copy" 
                        size="small" 
                        @click="copyToClipboard(doc.content)"
                        outlined
                      />
                    </div>
                    <div class="markdown-content" v-html="doc.html"></div>
                  </AccordionTab>
                </Accordion>
              </div>
            </TabPanel>

            <!-- Testing -->
            <TabPanel header="🧪 Testing">
              <div class="category-content">
                <p class="docs-count">{{ testingDocs.length }} documents in this category</p>
                <div v-if="testingDocs.length === 0" class="empty-category">
                  <Message severity="warn">
                    <strong>No testing documentation found.</strong><br>
                    Expected files:
                    <ul style="margin-top: 10px;">
                      <li>TESTING.md</li>
                      <li>TEST_EXECUTION_FLOW.md</li>
                      <li>TEST_EXECUTION_GUIDE.md</li>
                      <li>QUICK_REFERENCE_TESTING.md</li>
                      <li>RUN_TESTS_IMPLEMENTATION.md</li>
                    </ul>
                    <strong>Troubleshooting:</strong>
                    <ol style="margin-top: 10px;">
                      <li>Check if files exist in the <code>docs/</code> folder</li>
                      <li>Ensure server is running: <code>node server.js</code></li>
                      <li>Check browser console (F12) for load errors</li>
                      <li>Verify files are listed in docFiles array</li>
                    </ol>
                  </Message>
                </div>
                <Accordion v-else :multiple="true" :activeIndex="[0]">
                  <AccordionTab 
                    v-for="doc in testingDocs" 
                    :key="doc.name"
                    :header="doc.displayName"
                  >
                    <div class="doc-header">
                      <Button 
                        icon="pi pi-download" 
                        label="Download" 
                        size="small" 
                        @click="downloadDoc(doc)"
                        outlined
                      />
                      <Button 
                        icon="pi pi-copy" 
                        label="Copy" 
                        size="small" 
                        @click="copyToClipboard(doc.content)"
                        outlined
                      />
                    </div>
                    <div class="markdown-content" v-html="doc.html"></div>
                  </AccordionTab>
                </Accordion>
              </div>
            </TabPanel>

            <!-- Image Recognition -->
            <TabPanel header="📷 Image Recognition">
              <div class="category-content">
                <p class="docs-count">{{ imageDocs.length }} documents in this category</p>
                <div v-if="imageDocs.length === 0" class="empty-category">
                  <Message severity="info">No image recognition documentation found.</Message>
                </div>
                <Accordion v-else :multiple="true" :activeIndex="[0]">
                  <AccordionTab 
                    v-for="doc in imageDocs" 
                    :key="doc.name"
                    :header="doc.displayName"
                  >
                    <div class="doc-header">
                      <Button 
                        icon="pi pi-download" 
                        label="Download" 
                        size="small" 
                        @click="downloadDoc(doc)"
                        outlined
                      />
                      <Button 
                        icon="pi pi-copy" 
                        label="Copy" 
                        size="small" 
                        @click="copyToClipboard(doc.content)"
                        outlined
                      />
                    </div>
                    <div class="markdown-content" v-html="doc.html"></div>
                  </AccordionTab>
                </Accordion>
              </div>
            </TabPanel>

            <!-- Troubleshooting -->
            <TabPanel header="🔧 Troubleshooting">
              <div class="category-content">
                <p class="docs-count">{{ troubleshootingDocs.length }} documents in this category</p>
                <div v-if="troubleshootingDocs.length === 0" class="empty-category">
                  <Message severity="info">No troubleshooting documentation found.</Message>
                </div>
                <Accordion v-else :multiple="true" :activeIndex="[0]">
                  <AccordionTab 
                    v-for="doc in troubleshootingDocs" 
                    :key="doc.name"
                    :header="doc.displayName"
                  >
                    <div class="doc-header">
                      <Button 
                        icon="pi pi-download" 
                        label="Download" 
                        size="small" 
                        @click="downloadDoc(doc)"
                        outlined
                      />
                      <Button 
                        icon="pi pi-copy" 
                        label="Copy" 
                        size="small" 
                        @click="copyToClipboard(doc.content)"
                        outlined
                      />
                    </div>
                    <div class="markdown-content" v-html="doc.html"></div>
                  </AccordionTab>
                </Accordion>
              </div>
            </TabPanel>

            <!-- All Docs (Searchable) -->
            <TabPanel header="📚 All Docs">
              <div class="category-content">
                <p class="docs-count">{{ filteredAllDocs.length }} of {{ allDocs.length }} documents</p>
                <Accordion :multiple="true">
                  <AccordionTab 
                    v-for="doc in filteredAllDocs" 
                    :key="doc.name"
                    :header="doc.displayName"
                  >
                    <div class="doc-header">
                      <Button 
                        icon="pi pi-download" 
                        label="Download" 
                        size="small" 
                        @click="downloadDoc(doc)"
                        outlined
                      />
                      <Button 
                        icon="pi pi-copy" 
                        label="Copy" 
                        size="small" 
                        @click="copyToClipboard(doc.content)"
                        outlined
                      />
                    </div>
                    <div class="markdown-content" v-html="doc.html"></div>
                  </AccordionTab>
                </Accordion>
              </div>
            </TabPanel>
          </TabView>
        </div>
      </template>
    </Card>

    <Toast />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import API_BASE_URL from '@/config/api';

export default {
  name: 'ReadMe',
  setup() {
    const toast = useToast();
    const loading = ref(true);
    const error = ref(null);
    const allDocs = ref([]);
    const searchQuery = ref('');
    const activeTab = ref(0);

    // List of all markdown files in docs folder
    const docFiles = [
      'AUTH_MIGRATION_FIX.md',
      'DEBUG_SAVE_ERROR.md',
      'FIX_NOW.md',
      'FIX_README_TESTING_DOCS.md',
      'IMAGE_RECOGNITION_EXAMPLES.md',
      'IMAGE_RECOGNITION_IMPLEMENTATION.md',
      'IMAGE_RECOGNITION_QUICKSTART.md',
      'IMAGE_RECOGNITION_SETUP_COMPLETE.md',
      'IMAGE_RECOGNITION_UI_GUIDE.md',
      'IMAGE_RECOGNITION.md',
      'IMPLEMENTATION_SUMMARY.md',
      'LOCAL_AUTH_QUICKSTART.md',
      'LOCAL_AUTHENTICATION.md',
      'NAVBAR_README_BUTTON.md',
      'QUICK_FIX_FETCH_ERROR.md',
      'QUICK_REFERENCE_TESTING.md',
      'QUICK_START_SERVER_REGISTRATION.md',
      'README.md',
      'RUN_TESTS_IMPLEMENTATION.md',
      'SIGNUP_IMPLEMENTATION.md',
      'TEST_EXECUTION_FLOW.md',
      'TEST_EXECUTION_GUIDE.md',
      'TESTING.md',
      'TODO_STORAGE.md',
      'TODO_TROUBLESHOOTING.md',
      'TROUBLESHOOTING_EMPTY_TESTING_DOCS.md',
      'TROUBLESHOOTING_SERVER_REGISTRATION.md',
      'USER_MANUAL.md',
      'USERS_JSON_REGISTRATION.md'
    ];

    // Simple markdown to HTML converter
    const markdownToHtml = (markdown) => {
      let html = markdown;

      // Headers
      html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
      html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
      html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

      // Bold
      html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');

      // Italic
      html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
      html = html.replace(/_(.*?)_/g, '<em>$1</em>');

      // Links
      html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

      // Code blocks
      html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');

      // Inline code
      html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

      // Lists
      html = html.replace(/^\* (.*$)/gim, '<li>$1</li>');
      html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
      html = html.replace(/^(\d+)\. (.*$)/gim, '<li>$2</li>');

      // Wrap consecutive list items
      html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

      // Line breaks
      html = html.replace(/\n\n/g, '</p><p>');
      html = '<p>' + html + '</p>';

      // Blockquotes
      html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');

      // Horizontal rules
      html = html.replace(/^---$/gim, '<hr>');
      html = html.replace(/^\*\*\*$/gim, '<hr>');

      // Checkboxes
      html = html.replace(/- \[ \]/g, '<input type="checkbox" disabled>');
      html = html.replace(/- \[x\]/gi, '<input type="checkbox" checked disabled>');

      return html;
    };

    // Format display name from filename
    const formatDisplayName = (filename) => {
      return filename
        .replace('.md', '')
        .replace(/_/g, ' ')
        .replace(/-/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    };

    // Load all markdown files
    const loadDocs = async () => {
      loading.value = true;
      error.value = null;

      try {
        const docs = await Promise.all(
          docFiles.map(async (filename) => {
            try {
              // Try loading from public/documentation first
              let response = await fetch(`/documentation/${filename}`);
              
              // If not found, try the server endpoint that serves from docs folder
              if (!response.ok) {
                response = await fetch(`${API_BASE_URL}/docs/${filename}`);
              }
              
              if (!response.ok) {
                console.warn(`Could not load ${filename} from either location`);
                return null;
              }
              
              const content = await response.text();
              
              return {
                name: filename,
                displayName: formatDisplayName(filename),
                content: content,
                html: markdownToHtml(content)
              };
            } catch (err) {
              console.error(`Error loading ${filename}:`, err);
              return null;
            }
          })
        );

        allDocs.value = docs.filter(doc => doc !== null);
        console.log(`✅ Loaded ${allDocs.value.length} of ${docFiles.length} documentation files`);
        console.log('📄 Loaded files:', allDocs.value.map(d => d.name));
        
        // Log which files failed to load
        const loadedNames = allDocs.value.map(d => d.name);
        const failedFiles = docFiles.filter(f => !loadedNames.includes(f));
        if (failedFiles.length > 0) {
          console.warn('⚠️ Failed to load:', failedFiles);
        }
        
        if (allDocs.value.length === 0) {
          error.value = 'No documentation files could be loaded. Make sure the server is running or copy docs to public/documentation folder.';
        }
      } catch (err) {
        error.value = err.message;
        console.error('Error loading documentation:', err);
      } finally {
        loading.value = false;
      }
    };

    // Categorize docs
    const gettingStartedDocs = computed(() => {
      return allDocs.value.filter(doc => 
        doc.name.includes('QUICK_START') ||
        doc.name.includes('QUICKSTART') ||
        doc.name.includes('README') ||
        doc.name === 'USER_MANUAL.md' ||
        doc.name === 'NAVBAR_README_BUTTON.md'
      );
    });

    const authDocs = computed(() => {
      return allDocs.value.filter(doc => 
        doc.name.includes('AUTH') ||
        doc.name.includes('LOGIN') ||
        doc.name.includes('SIGNUP') ||
        doc.name.includes('USERS_JSON')
      );
    });

    const testingDocs = computed(() => {
      return allDocs.value.filter(doc => 
        doc.name.toUpperCase().includes('TEST') ||
        doc.name === 'TESTING.md'
      );
    });

    const imageDocs = computed(() => {
      return allDocs.value.filter(doc => 
        doc.name.includes('IMAGE_RECOGNITION')
      );
    });

    const troubleshootingDocs = computed(() => {
      return allDocs.value.filter(doc => 
        doc.name.includes('TROUBLESHOOT') ||
        doc.name.includes('DEBUG') ||
        doc.name.includes('QUICK_FIX') ||
        doc.name.includes('TODO_') ||
        doc.name.includes('FIX_')
      );
    });

    // Filtered docs for search
    const filteredAllDocs = computed(() => {
      if (!searchQuery.value) return allDocs.value;
      
      const query = searchQuery.value.toLowerCase();
      return allDocs.value.filter(doc => 
        doc.displayName.toLowerCase().includes(query) ||
        doc.content.toLowerCase().includes(query)
      );
    });

    // Filter docs
    const filterDocs = () => {
      // Filtering is handled by computed property
      if (searchQuery.value) {
        activeTab.value = 5; // Switch to "All Docs" tab when searching
      }
    };

    // Download document
    const downloadDoc = (doc) => {
      const blob = new Blob([doc.content], { type: 'text/markdown' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = doc.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast.add({
        severity: 'success',
        summary: 'Downloaded',
        detail: `${doc.name} has been downloaded`,
        life: 3000
      });
    };

    // Copy to clipboard
    const copyToClipboard = async (content) => {
      try {
        await navigator.clipboard.writeText(content);
        toast.add({
          severity: 'success',
          summary: 'Copied',
          detail: 'Content copied to clipboard',
          life: 3000
        });
      } catch (err) {
        toast.add({
          severity: 'error',
          summary: 'Copy Failed',
          detail: 'Failed to copy content',
          life: 3000
        });
      }
    };

    onMounted(() => {
      loadDocs();
    });

    return {
      loading,
      error,
      allDocs,
      searchQuery,
      activeTab,
      gettingStartedDocs,
      authDocs,
      testingDocs,
      imageDocs,
      troubleshootingDocs,
      filteredAllDocs,
      filterDocs,
      downloadDoc,
      copyToClipboard
    };
  }
};
</script>

<style scoped>
.readme-container {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.readme-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  text-align: center;
}

.readme-header h1 {
  margin: 0 0 10px 0;
  font-size: 2.5rem;
}

.readme-header p {
  margin: 0;
  opacity: 0.9;
  font-size: 1.1rem;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 40px;
}

.search-bar {
  margin-bottom: 20px;
}

.category-content {
  padding: 10px 0;
}

.docs-count {
  color: #666;
  margin-bottom: 15px;
  font-size: 14px;
  font-weight: 500;
}

.empty-category {
  padding: 20px;
}

.empty-category ul,
.empty-category ol {
  margin: 10px 0;
  padding-left: 25px;
}

.empty-category li {
  margin: 5px 0;
}

.empty-category code {
  background: #f4f4f4;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', Courier, monospace;
}

.doc-header {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.markdown-content {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: #333;
}

.markdown-content h1 {
  font-size: 2rem;
  margin: 20px 0 15px 0;
  color: #2c3e50;
  border-bottom: 2px solid #667eea;
  padding-bottom: 10px;
}

.markdown-content h2 {
  font-size: 1.5rem;
  margin: 18px 0 12px 0;
  color: #34495e;
  
}

.markdown-content h3 {
  font-size: 1.25rem;
  margin: 15px 0 10px 0;
  color: #34495e;
}

.markdown-content p {
  margin: 10px 0;
}

.markdown-content code {
  background: #f4f4f4;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9em;
  color: #cc3ee8;
}

.markdown-content pre {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 15px;
  border-radius: 5px;
  overflow-x: auto;
  margin: 15px 0;
}

.markdown-content pre code {
  background: none;
  color: inherit;
  padding: 0;
}

.markdown-content ul,
.markdown-content ol {
  margin: 10px 0;
  padding-left: 30px;
}

.markdown-content li {
  margin: 5px 0;
}

.markdown-content a {
  color: #667eea;
  text-decoration: none;
}

.markdown-content a:hover {
  text-decoration: underline;
}

.markdown-content blockquote {
  border-left: 4px solid #667eea;
  padding-left: 15px;
  margin: 15px 0;
  color: #666;
  font-style: italic;
}

.markdown-content hr {
  border: none;
  border-top: 2px solid #e0e0e0;
  margin: 20px 0;
}

.markdown-content table {
  border-collapse: collapse;
  width: 100%;
  margin: 15px 0;
}

.markdown-content table th,
.markdown-content table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.markdown-content table th {
  background: #667eea;
  color: white;
}

.markdown-content input[type="checkbox"] {
  margin-right: 8px;
}

/* Responsive */
@media (max-width: 768px) {
  .readme-header h1 {
    font-size: 1.8rem;
  }

  .doc-header {
    flex-direction: column;
  }

  .markdown-content {
    font-size: 14px;
  }
}
</style>

