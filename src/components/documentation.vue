  <template>
    <div class="documentation-container">
      <!-- Header Section -->
      <div class="header-section">
        <div class="logo-container">
          <img src="http://DESKTOP-DJNVAF5/episdlogo.jpg" alt="EPISD Logo" class="episd-logo" />
        </div>
        <h1 class="main-title">{{ docData.title }}</h1>
        <p class="description">{{ docData.description }}</p>
      </div>
  
      <!-- Quick Info Cards -->
      <div class="info-cards">
        <div class="info-card">
          <h3>Author</h3>
          <p>{{ docData.author }}</p>
        </div>
        <div class="info-card">
          <h3>Version</h3>
          <p>{{ docData.version }}</p>
        </div>
        <div class="info-card">
          <h3>Last Updated</h3>
          <p>{{ docData.date }}</p>
        </div>
        <div class="info-card">
          <h3>Contact</h3>
          <p>{{ docData.contact }}</p>
        </div>
      </div>
  
      <!-- Navigation Tabs -->
      <div class="tabs-container">
        <div class="tabs-container" style="display: flex;margin: auto;justify-content: center;border: solid black 0px;width: 100%;">
      <div v-for="tab in tabs" :key="tab.id">
        <button v-if="tab.id !== 'home'"          
          @click="activeTab = tab.id"
          :class="['w3-button w3-margin', { active: activeTab === tab.id }]"
        style="border: solid black 0px;width: 200px;height: 40px;font-size: 14px;font-weight: 600;color: white;background-color: #0a58ca">
          {{ tab.name }}
        </button>
        <router-link v-else-if="tab.id === 'home'" :to="{ name: 'Home' }" class="home-link"
          style="text-decoration: none;color: white;background-color: #0a58ca;font-size: 14px;font-weight: 600;border-radius: 4px;margin-top: 15px;
          display: flex;justify-content: center;align-items: center;transition: all 0.3s ease;width: 200px;height: 40px;margin-left: 15px"  >
          Home
        </router-link>
      </div>
    </div>
      </div>
  
      <!-- Tab Content -->
      <div class="tab-content">
        <!-- Overview Tab -->
        <div v-if="activeTab === 'overview'" class="tab-panel">
          <h2>Overview</h2>
          <p>{{ docData.purpose }}</p>
          
          <div class="sample-config">
            <h3>Sample Configuration</h3>
            <div class="code-block">
              <pre><code>{
    "database": {
      "server": "your-sql-server",
      "database": "episd_applications",
      "options": {
        "encrypt": true,
        "trustServerCertificate": true
      }
    },
    "email": {
      "host": "smtp.gmail.com",
      "port": 587,
      "secure": false,
      "auth": {
        "user": "your-email@gmail.com",
        "pass": "your-app-password"
      }
    }
  }</code></pre>
            </div>
          </div>
        </div>
  
        <!-- Features Tab -->
        <div v-if="activeTab === 'features'" class="tab-panel">
          <h2>Key Features</h2>
          <div v-for="section in docData.keyFeatures" :key="section.section" class="feature-section">
            <h3>{{ section.section }}</h3>
            <p>{{ section.description }}</p>
            <ul>
              <li v-for="feature in section.features" :key="feature.feature">
                {{ feature.feature }}
                <ul v-if="feature.criterias">
                  <li v-for="criteria in feature.criterias" :key="criteria.criteria" style="color: purple;font-weight: 400">
                    {{ criteria.criteria }}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
  
          <!-- Interactive Feature Demo -->
          <div class="demo-section">
            <h3>Interactive Demo</h3>
            <div class="demo-controls">
              <button @click="toggleDemo" class="demo-button">
                {{ demoActive ? 'Stop' : 'Start' }} Demo
              </button>
              <div v-if="demoActive" class="demo-output">
                <p>Processing applications...</p>
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: demoProgress + '%' }"></div>
                </div>
                <p>{{ demoProgress }}% Complete</p>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Technical Tab -->
        <div v-if="activeTab === 'technical'" class="tab-panel">
          <h2>Technical Details</h2>
          <div v-for="section in docData.technicalFeatures" :key="section.section" class="tech-section">
            <h3>{{ section.section }}</h3>
            <p>{{ section.description }}</p>
            <div class="tech-grid">
              <div v-for="feature in section.features" :key="feature.feature" class="tech-item">
                <span class="tech-label">{{ feature.feature }}</span>
              </div>
            </div>
          </div>
  
          <!-- Installation Instructions -->
          <form id="frmMain" :action="'http://localhost:3000/printLetters?appIds='+this.selected" method="POST" style="border: solid black 0px;width: 100%;
            max-width: none;border: solid black 0px">   
          <div class="installation-section">
            <h3>Installation & Setup</h3>
            <div class="code-block">
              <div class="code-block-item">
                  <div># Download and extract the package using the button below (this action  will also create a folder called 'EPISD' in the root of your C: drive)" </div>
                  <input id="downloadButton" type="submit" class="download-button w3-button w3-margin" style="background-color: #0a58ca;color: white;border: none;padding: 10px 20px;
                    border-radius: 5px;cursor: pointer;width: 400px;height: 60px;font-size: 14px;font-weight: 600;" formAction="http://localhost:3000/downloadFiles?fileName=episd.zip" value="Download/Install package">
                  <input id="extractButton" type="submit" class="extract-button w3-button w3-margin" style="background-color: #0a58ca;color: white;border: none;padding: 10px 20px;
                    border-radius: 5px;cursor: pointer;width: 400px;height: 60px;font-size: 14px;font-weight: 600;" formAction="http://localhost:3000/extractZipFile?zipFilePath=C:\\Users\mvc57\Downloads\episd.zip&extractToPath=C:\\EPISDTest&deleteAfterExtract=true" value="Extract package">

                  <!--
                  <div style="color: white;">Link: <a href="https://drive.google.com/drive/folders/1zqhJnKdzOC42cmJWz74VDwKCs1X3yoWB?usp=sharing">episd.zip</a> (use the files with the latest date)</div>
                  <div style="color: white;"># Install dependencies</div>
                  <div>open a command prompt and navigate to the "c:\EPISD" folder</div>
                  <div>Type 'cmd' at Search at the bottom left of your Windows search bar and press enter</div>
                  <div>enter the command "cd c:\EPISD" to navigate to the "c:\EPISD" folder</div>
                  <div>run the command "npm install" to install the dependencies</div>
                  <div># Configure environment variables</div>
                  <div>open the "config.json" file and configure the database connection</div>
                  <div>open the "server.js" file and configure the server connection</div>
                  <div># Start the development server</div>
                  <div>run the command "npm run serve" to start the development server</div>
                  <div># Build for production</div>
                  <div>run the command "npm run build" to build the production version</div>         
                  -->
              </div>
            </div>
          </div>
          </form>
        </div>
  
        <!-- Workflow Tab -->
        <div v-if="activeTab === 'workflow'" class="tab-panel">
          <h2>Application Workflow</h2>
          <div class="workflow-container">
            <div v-for="(step, index) in workflowSteps" :key="index" class="workflow-step">
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-content">
                <h4>{{ step.title }}</h4>
                <p>{{ step.description }}</p>
              </div>
            </div>
          </div>
  
          <!-- Sample Data Table -->
          <div class="sample-data-section">
            <h3>Sample Application Data</h3>
            <div class="table-container">
              <table class="sample-table">
                <thead>
                  <tr>
                    <th>Application ID</th>
                    <th>Guardian Name</th>
                    <th>Student Name</th>
                    <th>Campus</th>
                    <th>Status</th>
                    <th>Language</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="sample in sampleData" :key="sample.id">
                    <td>{{ sample.id }}</td>
                    <td>{{ sample.guardian }}</td>
                    <td>{{ sample.student }}</td>
                    <td>{{ sample.campus }}</td>
                    <td><span :class="['status-badge', sample.status.toLowerCase()]">{{ sample.status }}</span></td>
                    <td>{{ sample.language }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
  
        <!-- File Structure Tab -->
        <div v-if="activeTab === 'files'" class="tab-panel">
          <h2>File Structure</h2>
          <div class="file-tree">
            <div class="file-item">
              <i class="folder-icon">📁</i>
              <span>src/</span>
              <div class="file-children">
                <div class="file-item">
                  <i class="file-icon">📄</i>
                  <span>views/HomeView.vue</span>
                </div>
                <div class="file-item">
                  <i class="file-icon">📄</i>
                  <span>components/documentation.vue</span>
                </div>
                <div class="file-item">
                  <i class="folder-icon">📁</i>
                  <span>assets/</span>
                  <div class="file-children">
                    <div class="file-item">
                      <i class="file-icon">📄</i>
                      <span>config.json</span>
                    </div>
                    <div class="file-item">
                      <i class="file-icon">📄</i>
                      <span>letters.json</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="file-item">
              <i class="file-icon">📄</i>
              <span>server.js</span>
            </div>
            <div class="file-item">
              <i class="folder-icon">📁</i>
              <span>Letters/</span>
              <div class="file-children">
                <div class="file-item">
                  <i class="folder-icon">📁</i>
                  <span>Batch 1/</span>
                </div>
                <div class="file-item">
                  <i class="folder-icon">📁</i>
                  <span>Batch 2/</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Footer -->
      <div class="documentation-footer">
        <p>&copy; {{ docData.copyright }}</p>
        <p>License: {{ docData.license }}</p>
        <div class="keywords">
          <span v-for="keyword in docData.keywords" :key="keyword" class="keyword-tag">
            {{ keyword }}
          </span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, reactive, onMounted } from 'vue'
  
  export default {
    name: 'Documentation',
    setup() {
      const activeTab = ref('overview')
      const demoActive = ref(false)
      const demoProgress = ref(0)
      let demoInterval = null      
  
      const tabs = [
        { id: 'overview', name: 'Overview' },
        { id: 'features', name: 'Features' },
        { id: 'technical', name: 'Installation Instructions' },
        { id: 'workflow', name: 'Workflow' },
        { id: 'files', name: 'Files' },
        { id: 'home', name: 'Home' },
      ]
  
      const docData = reactive({
        title: "EPISD Free and Reduced Lunch Eligibility Application",
        description: "This is a Vue.js-based web application designed for the El Paso Independent School District (EPISD) to manage and process free and reduced lunch eligibility applications.",
        author: "Mario Camarena",
        version: "1.0.0",
        date: "2025-10-15",
        contact: "mvc757@gmail.com",
        license: "MIT",
        copyright: "2025 El Paso Independent School District",
        keywords: ["EPISD", "Free and Reduced Lunch", "Eligibility", "Application", "Vue.js", "Express.js", "SQL Server", "Firebase"],
        purpose: "This is a comprehensive school district management system specifically designed for handling the complex process of meal eligibility determination and communication with families.",
        keyFeatures: [
          {
            section: "Application Management",
            description: "Comprehensive application processing and tracking system",
            features: [
              { feature: "Import applications from a SQL Server database" },
              { 
                feature: "Search and filter applications by various criteria",
                criterias: [
                    { criteria: "Sent" },
                    { criteria: "Printed" },
                    { criteria: "Application ID" },
                    { criteria: "Guardian First or Last Name" },
                    { criteria: "Student Last Name" },
                    { criteria: "Campus Name" },
                    { criteria: "Approved Status" },
                    { criteria: "Denied Status" },
                    { criteria: "BatchNumber" },
                    { criteria: "Language" }
                ]                
              },
              { feature: "Track application status (sent, printed, approved/denied)" }
            ]
          },
          {
            section: "Multi-language Support",
            description: "Supports multiple languages for diverse communities",
            features: [
              { feature: "Supports both English and Spanish applications" },
              { feature: "Generates eligibility letters in both languages" }
            ]
          },
          {
            section: "PDF Generation",
            description: "Automated PDF letter generation system",
            features: [
              { feature: "Creates personalized eligibility letters as PDFs" },
              { feature: "Uses wkhtmltopdf for HTML-to-PDF conversion" },
              { feature: "Organizes PDFs by batch numbers in separate folders" }
            ]
          },
          {
            section: "Email Distribution",
            description: "Automated email communication system",
            features: [
              { feature: "Sends eligibility letters via email to guardians" },
              { feature: "Supports both English and Spanish email templates" },
              { feature: "Uses Nodemailer for email functionality" }
            ]
          }
        ],
        technicalFeatures: [
          {
            section: "Frontend Technologies",
            description: "Modern web technologies for responsive user interface",
            features: [
              { feature: "Vue.js 3 with Vue Router" },
              { feature: "PrimeVue UI components" },
              { feature: "Bootstrap 5 for styling" },
              { feature: "jQuery for DOM manipulation" }
            ]
          },
          {
            section: "Backend Technologies",
            description: "Robust server-side technologies for data processing",
            features: [
              { feature: "Node.js with Express.js" },
              { feature: "SQL Server database integration" },
              { feature: "Firebase for hosting and authentication" },
              { feature: "Various PDF generation libraries (wkhtmltopdf, html2pdf.js, jsPDF)" }
            ]
          }
        ]
      })
  
      const workflowSteps = [
        {
          title: "Import",
          description: "Applications are imported from the school district's database"
        },
        {
          title: "Review",
          description: "Staff can search, filter, and review applications"
        },
        {
          title: "Process",
          description: "Applications are processed and eligibility determined"
        },
        {
          title: "Generate",
          description: "PDF letters are generated with personalized information"
        },
        {
          title: "Distribute",
          description: "Letters are emailed to guardians or printed for mailing"
        },
        {
          title: "Track",
          description: "System tracks which applications have been sent/printed"
        }
      ]
  
      const sampleData = [
        { id: "2025951", guardian: "John Doe", student: "Tommy", campus: "Elementary", status: "Approved", language: "English" },
        { id: "2025952", guardian: "Smith", student: "Mary", campus: "Middle", status: "Pending", language: "Spanish" },
        { id: "2025953", guardian: "Jones", student: "Mike", campus: "High", status: "Denied", language: "English" },
        { id: "2025961", guardian: "Gomez", student: "Maria", campus: "Elementary", status: "Approved", language: "Spanish" }
      ]
  
      const toggleDemo = () => {
        if (demoActive.value) {
          demoActive.value = false
          clearInterval(demoInterval)
          demoProgress.value = 0
        } else {
          demoActive.value = true
          demoProgress.value = 0
          demoInterval = setInterval(() => {
            demoProgress.value += 10
            if (demoProgress.value >= 100) {
              clearInterval(demoInterval)
              setTimeout(() => {
                demoActive.value = false
                demoProgress.value = 0
              }, 2000)
            }
          }, 200)
        }
      }
  
      onMounted(() => {
        console.log('Documentation component mounted')
      })
  
      return {
        activeTab,
        tabs,
        docData,
        workflowSteps,
        sampleData,
        demoActive,
        demoProgress,
        toggleDemo
      }
    }
  }
  </script>
  
  <style scoped>
  .documentation-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
  }
  
  .header-section {
    text-align: center;
    margin-bottom: 40px;
    padding: 40px 20px;    
    background: linear-gradient(135deg, #0a58ca 0%, #5c7aad 100%);
    color: white;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  }
  
  .logo-container {
    margin-bottom: 20px;
  }
  
  .episd-logo {
    width: 100px;
    height: auto;
    border-radius: 50%;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  }
  
  .main-title {
    font-size: 2.5rem;
    margin: 20px 0;
    font-weight: 700;
  }
  
  .description {
    font-size: 1.2rem;
    max-width: 800px;
    margin: 0 auto;
    opacity: 0.9;
  }
  
  .info-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
  }
  
  .info-card {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    text-align: center;
    transition: transform 0.3s ease;
  }
  
  .info-card:hover {
    transform: translateY(-5px);
  }
  
  .info-card h3 {
    color: #667eea;
    margin-bottom: 10px;
    font-size: 1.1rem;
  }
  
  .tabs-container {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    border-bottom: 2px solid #eee;
  }
  
  .tab-button {
    padding: 12px 24px;
    margin: 0 5px;
    border: none;
    background: transparent;
    color: #666;
    font-size: 1rem;
    cursor: pointer;
    border-bottom: 3px solid transparent;
    transition: all 0.3s ease;
  }
  
  .tab-button:hover {
    color: #667eea;
    background: rgba(102, 126, 234, 0.1);
  }
  
  .tab-button.active {
    color: #667eea;
    border-bottom-color: #667eea;
    font-weight: 600;
  }
  
  .tab-content {
    min-height: 500px;
  }
  
  .tab-panel {
    animation: fadeIn 0.3s ease-in;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .feature-section, .tech-section {
    margin-bottom: 40px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 10px;
    border-left: 4px solid #667eea;
  }
  
  .feature-section h3, .tech-section h3 {
    color: #667eea;
    margin-bottom: 15px;
    font-size: 1.5rem;
  }
  
  .feature-section ul {
    list-style: none;
    padding: 0;
  }
  
  .feature-section li {
    padding: 8px 0;
    padding-left: 20px;
    position: relative;
  }
  
  .feature-section li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: #28a745;
    font-weight: bold;
  }
  
  .code-block {
    background: #2d3748;
    color: #e2e8f0;
    padding: 20px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 20px 0;
  }
  
  .code-block pre {
    margin: 0;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
  }
  
  .demo-section {
    background: #fff;
    border: 2px solid #667eea;
    border-radius: 10px;
    padding: 20px;
    margin-top: 30px;
  }
  
  .demo-button {
    background: #667eea;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;
    width: 150px;
    height: 40px;
    font-size: 14px;
    font-weight: 600;
    color: white;
    background-color: #0a58ca;
    border-radius: 4px;
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .demo-button:hover {
    background: #5a67d8;
  }
  
  .demo-output {
    margin-top: 20px;
    padding: 15px;
    background: #f7fafc;
    border-radius: 6px;
  }
  
  .progress-bar {
    width: 100%;
    height: 20px;
    background: #e2e8f0;
    border-radius: 10px;
    overflow: hidden;
    margin: 10px 0;
  }
  
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #667eea, #764ba2);
    transition: width 0.3s ease;
  }
  
  .tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
    margin-top: 15px;
  }
  
  .tech-item {
    background: white;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  
  .tech-label {
    font-weight: 500;
    color: #4a5568;
  }
  
  .installation-section {
    margin-top: 30px;
    padding: 20px;
    background: white;
    border-radius: 10px;
  }
  
  .workflow-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin: 30px 0;
  }
  
  .workflow-step {
    display: flex;
    align-items: flex-start;
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    border-left: 4px solid #667eea;
  }
  
  .step-number {
    background: #667eea;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 15px;
    flex-shrink: 0;
  }
  
  .step-content h4 {
    margin: 0 0 10px 0;
    color: #667eea;
  }
  
  .sample-data-section {
    margin-top: 40px;
  }
  
  .table-container {
    overflow-x: auto;
    margin-top: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  
  .sample-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
  }
  
  .sample-table th,
  .sample-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .sample-table th {
    background: #667eea;
    color: white;
    font-weight: 600;
  }
  
  .sample-table tr:hover {
    background: #f7fafc;
  }
  
  .status-badge {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 500;
  }
  
  .status-badge.approved {
    background: #c6f6d5;
    color: #22543d;
  }
  
  .status-badge.pending {
    background: #fed7d7;
    color: #742a2a;
  }
  
  .status-badge.denied {
    background: #fed7d7;
    color: #742a2a;
  }
  
  .file-tree {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    font-family: 'Courier New', monospace;
  }
  
  .file-item {
    margin: 5px 0;
    display: flex;
    align-items: center;
  }
  
  .file-children {
    margin-left: 20px;
  }
  
  .folder-icon, .file-icon {
    margin-right: 8px;
    font-size: 1.2rem;
  }
  
  .documentation-footer {
    margin-top: 60px;
    padding: 30px;
    background: #2d3748;
    color: white;
    border-radius: 10px;
    text-align: center;
  }
  
  .keywords {
    margin-top: 20px;
  }
  
  .keyword-tag {
    display: inline-block;
    background: #0a58ca;
    color: white;
    padding: 4px 8px;
    margin: 2px;
    border-radius: 4px;
    font-size: 0.8rem;
  }
  
  @media (max-width: 768px) {
    .documentation-container {
      padding: 10px;
    }
    
    .main-title {
      font-size: 1.8rem;
    }
    
    .tabs-container {
      flex-wrap: wrap;
    }
    
    .tab-button {
      margin: 5px;
    }
    
    .workflow-container {
      grid-template-columns: 1fr;
    }
    
    .info-cards {
      grid-template-columns: 1fr;
    }
  }
  </style>
  