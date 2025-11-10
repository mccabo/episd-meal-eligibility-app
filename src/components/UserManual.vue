<template>
  <div class="user-manual-container">
    <!-- Header Section -->
    <div class="header-section">
      <div class="logo-container">
        <img src="http://DESKTOP-DJNVAF5/episdlogo.jpg" alt="EPISD Logo" class="episd-logo" />
      </div>
      <h1 class="main-title">EPISD User Manual</h1>
      <p class="subtitle">Free and Reduced Lunch Eligibility Application</p>
      <p class="description">Complete guide for managing meal eligibility applications</p>
    </div>

    <!-- Quick Info Cards -->
    <div class="info-cards">
      <div class="info-card">
        <i class="pi pi-book" style="font-size: 2rem; color: #667eea;"></i>
        <h3>Version</h3>
        <p>1.0.0</p>
      </div>
      <div class="info-card">
        <i class="pi pi-calendar" style="font-size: 2rem; color: #667eea;"></i>
        <h3>Last Updated</h3>
        <p>October 2025</p>
      </div>
      <div class="info-card">
        <i class="pi pi-users" style="font-size: 2rem; color: #667eea;"></i>
        <h3>For</h3>
        <p>EPISD Staff</p>
      </div>
      <div class="info-card">
        <i class="pi pi-envelope" style="font-size: 2rem; color: #667eea;"></i>
        <h3>Support</h3>
        <p>mvc757@gmail.com</p>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="tabs-container">
      <div class="tabs-wrapper">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="['tab-button', { active: activeTab === tab.id }]"
        >
          <i :class="tab.icon"></i>
          {{ tab.name }}
        </button>
        <router-link :to="{ name: 'Home' }" class="tab-button home-link">
          <i class="pi pi-home"></i>
          Home
        </router-link>
      </div>
    </div>

    <!-- Tab Content -->
    <div class="tab-content">
      
      <!-- Introduction Tab -->
      <div v-if="activeTab === 'intro'" class="tab-panel">
        <h2><i class="pi pi-info-circle"></i> Introduction</h2>
        
        <div class="content-section">
          <h3>What is This Application?</h3>
          <p>The EPISD Free and Reduced Lunch Eligibility Application is a comprehensive web-based system designed to streamline the management and processing of meal eligibility applications for the El Paso Independent School District.</p>
          
          <div class="feature-highlight">
            <h4>Key Capabilities:</h4>
            <ul>
              <li><i class="pi pi-check-circle"></i> Import and manage student meal eligibility applications</li>
              <li><i class="pi pi-check-circle"></i> Search and filter applications by multiple criteria (Sent,Printed,Application ID,Guardian Name,Student Name,Campus N,Status,Batch Number,Language)</li>
              <li><i class="pi pi-check-circle"></i> Generate eligibility letters in English and Spanish</li>
              <li><i class="pi pi-check-circle"></i> Print letters individually or in batches</li>
              <li><i class="pi pi-check-circle"></i> Track application status throughout the process</li>
              <li><i class="pi pi-check-circle"></i> Maintain compliance with federal nutrition program requirements</li>
            </ul>
          </div>
        </div>

        <div class="content-section">
          <h3>Who Should Use This Manual?</h3>
          <div class="user-roles">
            <div class="role-card">
              <i class="pi pi-briefcase"></i>
              <h4>District Staff</h4>
              <p>Nutrition program coordinators</p>
            </div>
            <div class="role-card">
              <i class="pi pi-user"></i>
              <h4>Administrators</h4>
              <p>School administrators managing applications</p>
            </div>
            <div class="role-card">
              <i class="pi pi-desktop"></i>
              <h4>Office Personnel</h4>
              <p>Staff responsible for processing</p>
            </div>
            <div class="role-card">
              <i class="pi pi-cog"></i>
              <h4>IT Staff</h4>
              <p>Technical support personnel</p>
            </div>
          </div>
        </div>

        <div class="content-section">
          <h3>System Requirements</h3>
          <div class="requirements-grid">
            <div class="requirement-item">
              <i class="pi pi-globe"></i>
              <strong>Browser:</strong> Chrome, Firefox, Edge, Safari (latest versions)
            </div>
            <div class="requirement-item">
              <i class="pi pi-wifi"></i>
              <strong>Internet:</strong> Required for cloud-based features
            </div>
            <div class="requirement-item">
              <i class="pi pi-window-maximize"></i>
              <strong>Resolution:</strong> Minimum 1280x720 (higher recommended)
            </div>
            <div class="requirement-item">
              <i class="pi pi-lock"></i>
              <strong>Credentials:</strong> Valid EPISD login credentials
            </div>
          </div>
        </div>
      </div>

      <!-- Getting Started Tab -->
      <div v-if="activeTab === 'getting-started'" class="tab-panel">
        <h2><i class="pi pi-play-circle"></i> Getting Started</h2>
        
        <div class="content-section">
          <h3>Accessing the Application</h3>
          <div class="step-list">
            <div class="step-item">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>Open Your Web Browser</h4>
                <p>Launch your preferred web browser and navigate to the application URL provided by your IT department.</p>
                <div class="code-block">
                  <code>For development/testing: http://localhost:8081</code>
                </div>
              </div>
            </div>
            
            <div class="step-item">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>Login</h4>
                <ul>
                  <li>Enter your EPISD email address</li>
                  <li>Enter your password</li>
                  <li>Click the "Login" button</li>
                </ul>
              </div>
            </div>
            
            <div class="step-item">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>First Time Login</h4>
                <p>If this is your first time logging in, you may need to:</p>
                <ul>
                  <li>Verify your email address</li>
                  <li>Set up your password</li>
                  <li>Complete any required profile information</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="content-section">
          <h3>Understanding User Roles</h3>
          <div class="roles-table">
            <table class="styled-table">
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Access Level</th>
                  <th>Capabilities</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Administrator</strong></td>
                  <td><span class="badge badge-high">Full Access</span></td>
                  <td>All features including utilities, configuration, and system management</td>
                </tr>
                <tr>
                  <td><strong>Standard User</strong></td>
                  <td><span class="badge badge-medium">Standard</span></td>
                  <td>View, search, filter, and generate letters</td>
                </tr>
                <tr>
                  <td><strong>Read-Only User</strong></td>
                  <td><span class="badge badge-low">View Only</span></td>
                  <td>View applications and reports only</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- User Interface Tab -->
      <div v-if="activeTab === 'interface'" class="tab-panel">
        <h2><i class="pi pi-desktop"></i> User Interface Overview</h2>
        
        <div class="content-section">
          <h3>Navigation Bar</h3>
          <div class="interface-description">
            <p>The navigation bar appears at the top of the screen and includes:</p>
            <ul class="feature-list">
              <li><i class="pi pi-image"></i> <strong>EPISD Logo:</strong> Click to refresh/return to home</li>
              <li><i class="pi pi-user"></i> <strong>Welcome Message:</strong> Displays your name</li>
              <li><i class="pi pi-play"></i> <strong>Run Tests Button:</strong> (Admin only) Execute system tests</li>
              <li><i class="pi pi-chart-bar"></i> <strong>Results Button:</strong> View test results</li>
              <li><i class="pi pi-sign-out"></i> <strong>Logout Button:</strong> Sign out of the application</li>
            </ul>
          </div>
        </div>

        <div class="content-section">
          <h3>Main Tabs</h3>
          <div class="tabs-description">
            <div class="tab-desc-card">
              <i class="pi pi-list"></i>
              <h4>Applications</h4>
              <p>Main workspace for managing meal eligibility applications</p>
            </div>
            <div class="tab-desc-card">
              <i class="pi pi-eye"></i>
              <h4>Overview</h4>
              <p>System overview and configuration information</p>
            </div>
            <div class="tab-desc-card">
              <i class="pi pi-book"></i>
              <h4>Documentation</h4>
              <p>Access to system documentation and help resources</p>
            </div>
            <div class="tab-desc-card">
              <i class="pi pi-check-square"></i>
              <h4>Todo List</h4>
              <p>Task management and tracking</p>
            </div>
          </div>
        </div>

        <div class="content-section">
          <h3>Applications Tab Components</h3>
          <div class="component-list">
            <div class="component-item">
              <h4><i class="pi pi-wrench"></i> Utilities Section (Admin Only)</h4>
              <ul>
                <li>Print Letters: Generate and print eligibility letters</li>
                <li>Import Apps: Import applications from SQL Server database</li>
                <li>Process Apps: Batch process multiple applications</li>
              </ul>
            </div>
            
            <div class="component-item">
              <h4><i class="pi pi-search"></i> Search and Filter Section</h4>
              <ul>
                <li>Search by AppID</li>
                <li>Guardian Name</li>
                <li>Student Name</li>
                <li>Campus</li>
                <li>Status (Sent, Printed, Approved, Denied)</li>
                <li>Batch Number</li>
                <li>Language (English/Spanish)</li>
              </ul>
            </div>
            
            <div class="component-item">
              <h4><i class="pi pi-table"></i> Application Data Table</h4>
              <p>Displays all applications with columns for: Checkbox, AppID, Guardian Name, Student Name, Campus, Status, Batch Number, Language, and Actions</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Core Features Tab -->
      <div v-if="activeTab === 'features'" class="tab-panel">
        <h2><i class="pi pi-star"></i> Core Features</h2>
        
        <div class="content-section">
          <h3>1. Viewing Applications</h3>
          <div class="feature-detail">
            <p><strong>To view the list of applications:</strong></p>
            <ol>
              <li>Click on the <strong>Applications</strong> tab</li>
              <li>The system displays all applications in a scrollable table</li>
              <li>Each row shows key information about one application</li>
            </ol>
            
            <div class="info-box">
              <h4>Understanding Application Data:</h4>
              <ul>
                <li><strong>AppID:</strong> Unique identifier (e.g., 2025951)</li>
                <li><strong>Guardian/Student Names:</strong> Family information</li>
                <li><strong>Status Indicators:</strong>
                  <ul>
                    <li>Blank: Not yet processed</li>
                    <li>Sent: Letter has been sent</li>
                    <li>Printed: Letter has been printed</li>
                    <li>Approved/Denied: Final decision recorded</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="content-section">
          <h3>2. Searching for Applications</h3>
          <div class="feature-detail">
            <h4>Simple Search:</h4>
            <ol>
              <li>Locate the search bar at the top of the Applications tab</li>
              <li>Enter your search criteria (AppID, Name, or Campus)</li>
              <li>Results update automatically as you type</li>
            </ol>
            
            <h4>Advanced Filtering:</h4>
            <ol>
              <li>Use multiple filters simultaneously</li>
              <li>Combine Campus, Status, Batch Number, and Language filters</li>
              <li>Click <strong>Clear Filters</strong> to reset all criteria</li>
            </ol>
            
            <div class="tips-box">
              <h4><i class="pi pi-lightbulb"></i> Tips for Effective Searching:</h4>
              <ul>
                <li>Searches are case-insensitive</li>
                <li>Partial names work (searching "John" finds "Johnson", "Johnston", etc.)</li>
                <li>Combine multiple filters to narrow results</li>
                <li>Use batch numbers to find groups processed together</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="content-section">
          <h3>3. Generating Letters</h3>
          <div class="feature-detail">
            <h4>Generate a Single Letter:</h4>
            <ol>
              <li>Locate the application in the list</li>
              <li>Click the <strong>checkbox</strong> next to the application</li>
              <li>Click the <strong>"Generate Letter"</strong> button</li>
              <li>The system will create a PDF letter in the appropriate language</li>
            </ol>
            
            <div class="info-box">
              <h4>Letter Templates:</h4>
              <ul>
                <li>Letters are automatically generated based on language preference</li>
                <li>English letters use the English template</li>
                <li>Spanish letters use the Spanish template</li>
                <li>All letters include: District logo, Application ID, Names, Eligibility determination, Program information</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="content-section">
          <h3>4. Printing Letters</h3>
          <div class="feature-detail">
            <h4>Print Individual Letters:</h4>
            <ol>
              <li>Select one or more applications using checkboxes</li>
              <li>Click the <strong>"Print Letters"</strong> button</li>
              <li>Configure print settings in the dialog</li>
              <li>Click <strong>Print</strong></li>
            </ol>
            
            <div class="tips-box">
              <h4><i class="pi pi-lightbulb"></i> Printing Best Practices:</h4>
              <ul>
                <li>Print test pages first to verify formatting</li>
                <li>Use high-quality paper for official letters</li>
                <li>Keep printer stocked with letterhead if required</li>
                <li>Verify printer settings before large batch prints</li>
                <li>Check printed letters for quality before distribution</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="content-section">
          <h3>5. Managing Application Status</h3>
          <div class="status-workflow">
            <h4>Status Workflow:</h4>
            <div class="workflow-steps">
              <div class="workflow-step-inline">
                <span class="status-badge status-new">New</span>
                <i class="pi pi-arrow-right"></i>
                <span class="status-badge status-sent">Sent</span>
                <i class="pi pi-arrow-right"></i>
                <span class="status-badge status-printed">Printed</span>
                <i class="pi pi-arrow-right"></i>
                <span class="status-badge status-approved">Approved/Denied</span>
              </div>
            </div>
          </div>
        </div>

        <div class="content-section">
          <h3>6. Batch Processing</h3>
          <div class="feature-detail">
            <p><strong>What is Batch Processing?</strong></p>
            <p>Batch processing allows you to organize and process multiple applications together, making it easier to manage large volumes.</p>
            
            <h4>Create a New Batch:</h4>
            <ol>
              <li>Select applications you want to include</li>
              <li>Click <strong>"Assign Batch Number"</strong></li>
              <li>Enter or accept the auto-generated batch number</li>
              <li>Click <strong>"Confirm"</strong></li>
            </ol>
          </div>
        </div>
      </div>

      <!-- Workflows Tab -->
      <div v-if="activeTab === 'workflows'" class="tab-panel">
        <h2><i class="pi pi-sitemap"></i> Step-by-Step Workflows</h2>
        
        <div class="workflow-section">
          <h3>Workflow 1: Processing New Applications</h3>
          <div class="workflow-steps-detailed">
            <div class="workflow-step-detail">
              <div class="step-header">
                <span class="step-badge">Step 1</span>
                <h4>Import Applications from Database</h4>
              </div>
              <ul>
                <li>Click "Utilities" to expand</li>
                <li>Click "Import Apps" button</li>
                <li>System connects to SQL Server database</li>
                <li>Wait for import confirmation</li>
                <li>Review imported applications count</li>
              </ul>
            </div>
            
            <div class="workflow-step-detail">
              <div class="step-header">
                <span class="step-badge">Step 2</span>
                <h4>Review Imported Applications</h4>
              </div>
              <ul>
                <li>Check for any data errors or missing information</li>
                <li>Verify guardian and student names are correct</li>
                <li>Confirm language preferences are accurate</li>
              </ul>
            </div>
            
            <div class="workflow-step-detail">
              <div class="step-header">
                <span class="step-badge">Step 3</span>
                <h4>Assign Batch Numbers</h4>
              </div>
              <ul>
                <li>Select a group of applications</li>
                <li>Click "Assign Batch Number"</li>
                <li>Enter or accept batch number</li>
                <li>Click "Confirm"</li>
              </ul>
            </div>
            
            <div class="workflow-step-detail">
              <div class="step-header">
                <span class="step-badge">Step 4</span>
                <h4>Generate Letters</h4>
              </div>
              <ul>
                <li>Filter by batch number</li>
                <li>Select all applications in batch</li>
                <li>Click "Generate Letters"</li>
                <li>Wait for generation to complete</li>
              </ul>
            </div>
            
            <div class="workflow-step-detail">
              <div class="step-header">
                <span class="step-badge">Step 5</span>
                <h4>Print and Distribute</h4>
              </div>
              <ul>
                <li>Click "Print Letters"</li>
                <li>Configure printer settings</li>
                <li>Print all letters</li>
                <li>Update status to "Printed"</li>
                <li>Prepare for distribution</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="workflow-section">
          <h3>Workflow 2: Finding and Reprinting a Letter</h3>
          <div class="workflow-steps-detailed">
            <div class="workflow-step-detail">
              <div class="step-header">
                <span class="step-badge">Step 1</span>
                <h4>Search for Application</h4>
              </div>
              <ul>
                <li>Go to Applications tab</li>
                <li>Enter AppID, guardian name, or student name in search</li>
                <li>Locate the specific application in results</li>
              </ul>
            </div>
            
            <div class="workflow-step-detail">
              <div class="step-header">
                <span class="step-badge">Step 2</span>
                <h4>Verify Information</h4>
              </div>
              <ul>
                <li>Check application details are correct</li>
                <li>Note the batch number</li>
                <li>Verify letter language</li>
              </ul>
            </div>
            
            <div class="workflow-step-detail">
              <div class="step-header">
                <span class="step-badge">Step 3</span>
                <h4>Reprint Letter</h4>
              </div>
              <ul>
                <li>Select the application checkbox</li>
                <li>Click "Generate Letter" (if regeneration needed)</li>
                <li>Click "Print Letters"</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="workflow-section">
          <h3>Workflow 3: Processing Applications by Campus</h3>
          <div class="workflow-steps-detailed">
            <div class="workflow-step-detail">
              <div class="step-header">
                <span class="step-badge">Step 1</span>
                <h4>Filter by Campus</h4>
              </div>
              <ul>
                <li>Click the Campus dropdown</li>
                <li>Select the desired campus</li>
                <li>All applications for that campus display</li>
              </ul>
            </div>
            
            <div class="workflow-step-detail">
              <div class="step-header">
                <span class="step-badge">Step 2</span>
                <h4>Review Campus Applications</h4>
              </div>
              <ul>
                <li>Check total number of applications</li>
                <li>Note any that need special attention</li>
                <li>Verify all have complete information</li>
              </ul>
            </div>
            
            <div class="workflow-step-detail">
              <div class="step-header">
                <span class="step-badge">Step 3</span>
                <h4>Batch Assign</h4>
              </div>
              <ul>
                <li>Select all campus applications</li>
                <li>Assign a campus-specific batch number</li>
                <li>Example: "Batch 101 - Washington Elementary"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Troubleshooting Tab -->
      <div v-if="activeTab === 'troubleshooting'" class="tab-panel">
        <h2><i class="pi pi-wrench"></i> Troubleshooting</h2>
        
        <div class="troubleshooting-section">
          <h3>Common Issues and Solutions</h3>
          
          <div class="issue-card">
            <div class="issue-header">
              <i class="pi pi-times-circle"></i>
              <h4>Cannot Login</h4>
            </div>
            <div class="issue-body">
              <p><strong>Problem:</strong> Error message when trying to log in</p>
              <p><strong>Solutions:</strong></p>
              <ol>
                <li>Verify your email address is correct</li>
                <li>Check caps lock is off when entering password</li>
                <li>Click "Forgot Password" to reset if needed</li>
                <li>Clear browser cache and cookies</li>
                <li>Try a different browser</li>
                <li>Contact IT support if issue persists</li>
              </ol>
            </div>
          </div>

          <div class="issue-card">
            <div class="issue-header">
              <i class="pi pi-times-circle"></i>
              <h4>Applications Not Displaying</h4>
            </div>
            <div class="issue-body">
              <p><strong>Problem:</strong> No applications showing in the list</p>
              <p><strong>Solutions:</strong></p>
              <ol>
                <li>Check if filters are applied - clear all filters</li>
                <li>Verify database connection (check with IT)</li>
                <li>Try refreshing the page (F5 or Ctrl+R)</li>
                <li>Ensure applications have been imported</li>
                <li>Check your user permissions</li>
              </ol>
            </div>
          </div>

          <div class="issue-card">
            <div class="issue-header">
              <i class="pi pi-times-circle"></i>
              <h4>Letters Not Generating</h4>
            </div>
            <div class="issue-body">
              <p><strong>Problem:</strong> PDF letters fail to generate</p>
              <p><strong>Solutions:</strong></p>
              <ol>
                <li>Check pop-up blocker settings - allow pop-ups from this site</li>
                <li>Verify printer/PDF service is running (server-side)</li>
                <li>Ensure application data is complete</li>
                <li>Try generating one letter at a time</li>
                <li>Check available disk space on server</li>
                <li>Contact IT support if problem continues</li>
              </ol>
            </div>
          </div>

          <div class="issue-card">
            <div class="issue-header">
              <i class="pi pi-times-circle"></i>
              <h4>Printing Issues</h4>
            </div>
            <div class="issue-body">
              <p><strong>Problem:</strong> Letters won't print or print incorrectly</p>
              <p><strong>Solutions:</strong></p>
              <ol>
                <li>Verify printer is online and connected</li>
                <li>Check printer has paper and ink/toner</li>
                <li>Update printer drivers</li>
                <li>Try printing a test page from system</li>
                <li>Check PDF opens correctly before printing</li>
                <li>Verify print settings (portrait, full page, no scaling)</li>
              </ol>
            </div>
          </div>

          <div class="issue-card">
            <div class="issue-header">
              <i class="pi pi-times-circle"></i>
              <h4>Slow Performance</h4>
            </div>
            <div class="issue-body">
              <p><strong>Problem:</strong> Application runs slowly or freezes</p>
              <p><strong>Solutions:</strong></p>
              <ol>
                <li>Close unnecessary browser tabs</li>
                <li>Clear browser cache and history</li>
                <li>Refresh the page</li>
                <li>Check internet connection speed</li>
                <li>Close other applications running on computer</li>
                <li>Try using a different browser</li>
                <li>Report to IT if problem continues</li>
              </ol>
            </div>
          </div>
        </div>

        <div class="error-messages-section">
          <h3>Error Messages</h3>
          
          <div class="error-explanation">
            <div class="error-title">
              <i class="pi pi-exclamation-triangle"></i>
              "Database Connection Failed"
            </div>
            <p><strong>Meaning:</strong> System cannot connect to SQL Server database</p>
            <p><strong>Actions:</strong> Verify network connection, check with IT - database server may be down, wait and try again</p>
          </div>

          <div class="error-explanation">
            <div class="error-title">
              <i class="pi pi-exclamation-triangle"></i>
              "Insufficient Permissions"
            </div>
            <p><strong>Meaning:</strong> Your user account doesn't have access to this feature</p>
            <p><strong>Actions:</strong> Contact your supervisor, request appropriate permissions from IT</p>
          </div>

          <div class="error-explanation">
            <div class="error-title">
              <i class="pi pi-exclamation-triangle"></i>
              "Generation Failed"
            </div>
            <p><strong>Meaning:</strong> Letter PDF could not be created</p>
            <p><strong>Actions:</strong> Check application has all required fields, verify letter template is available, try again with single application</p>
          </div>
        </div>
      </div>

      <!-- FAQ Tab -->
      <div v-if="activeTab === 'faq'" class="tab-panel">
        <h2><i class="pi pi-question-circle"></i> Frequently Asked Questions</h2>
        
        <div class="faq-section">
          <h3>General Questions</h3>
          
          <div class="faq-item" v-for="(faq, index) in generalFaqs" :key="index">
            <div class="faq-question" @click="toggleFaq('general', index)">
              <i :class="activeFaq.general === index ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"></i>
              <strong>{{ faq.question }}</strong>
            </div>
            <div v-if="activeFaq.general === index" class="faq-answer">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>

        <div class="faq-section">
          <h3>Search and Filter</h3>
          
          <div class="faq-item" v-for="(faq, index) in searchFaqs" :key="index">
            <div class="faq-question" @click="toggleFaq('search', index)">
              <i :class="activeFaq.search === index ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"></i>
              <strong>{{ faq.question }}</strong>
            </div>
            <div v-if="activeFaq.search === index" class="faq-answer">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>

        <div class="faq-section">
          <h3>Letters and Printing</h3>
          
          <div class="faq-item" v-for="(faq, index) in letterFaqs" :key="index">
            <div class="faq-question" @click="toggleFaq('letter', index)">
              <i :class="activeFaq.letter === index ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"></i>
              <strong>{{ faq.question }}</strong>
            </div>
            <div v-if="activeFaq.letter === index" class="faq-answer">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>

        <div class="faq-section">
          <h3>Technical Questions</h3>
          
          <div class="faq-item" v-for="(faq, index) in technicalFaqs" :key="index">
            <div class="faq-question" @click="toggleFaq('technical', index)">
              <i :class="activeFaq.technical === index ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"></i>
              <strong>{{ faq.question }}</strong>
            </div>
            <div v-if="activeFaq.technical === index" class="faq-answer">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Best Practices Tab -->
      <div v-if="activeTab === 'best-practices'" class="tab-panel">
        <h2><i class="pi pi-thumbs-up"></i> Best Practices</h2>
        
        <div class="best-practice-section">
          <h3><i class="pi pi-database"></i> Data Management</h3>
          <div class="practice-card">
            <h4>Regular Backups</h4>
            <ul>
              <li>Ensure IT performs regular database backups</li>
              <li>Keep copies of important exports</li>
            </ul>
          </div>
          <div class="practice-card">
            <h4>Data Accuracy</h4>
            <ul>
              <li>Verify application information before processing</li>
              <li>Double-check names, IDs, and campus assignments</li>
              <li>Correct errors promptly</li>
            </ul>
          </div>
          <div class="practice-card">
            <h4>Consistent Status Updates</h4>
            <ul>
              <li>Update status as soon as actions are completed</li>
              <li>Use consistent status terminology</li>
              <li>Track batch numbers accurately</li>
            </ul>
          </div>
        </div>

        <div class="best-practice-section">
          <h3><i class="pi pi-cog"></i> Processing Efficiency</h3>
          <div class="practice-card">
            <h4>Batch Similar Applications</h4>
            <ul>
              <li>Group by campus for easier distribution</li>
              <li>Separate English and Spanish for printing efficiency</li>
              <li>Process similar dates together</li>
            </ul>
          </div>
          <div class="practice-card">
            <h4>Use Filters Effectively</h4>
            <ul>
              <li>Combine multiple filters to narrow results quickly</li>
              <li>Save frequently used filter combinations</li>
              <li>Clear filters when done to avoid confusion</li>
            </ul>
          </div>
          <div class="practice-card">
            <h4>Regular Processing Schedule</h4>
            <ul>
              <li>Set specific times for importing new applications</li>
              <li>Schedule batch processing sessions</li>
              <li>Maintain consistent workflow</li>
            </ul>
          </div>
        </div>

        <div class="best-practice-section">
          <h3><i class="pi pi-print"></i> Letter Generation</h3>
          <div class="practice-card">
            <h4>Quality Control</h4>
            <ul>
              <li>Review first letter from each batch before printing all</li>
              <li>Verify correct language</li>
              <li>Check for formatting issues</li>
              <li>Ensure all information is present</li>
            </ul>
          </div>
          <div class="practice-card">
            <h4>Printing Management</h4>
            <ul>
              <li>Print test page before large batches</li>
              <li>Use appropriate paper stock</li>
              <li>Verify printer settings each time</li>
              <li>Keep track of printed batches</li>
            </ul>
          </div>
        </div>

        <div class="best-practice-section">
          <h3><i class="pi pi-lock"></i> Security</h3>
          <div class="practice-card">
            <h4>Protect Sensitive Data</h4>
            <ul>
              <li>Always log out when leaving workstation</li>
              <li>Don't share login credentials</li>
              <li>Follow FERPA guidelines for student data</li>
              <li>Secure printed letters until distribution</li>
            </ul>
          </div>
          <div class="practice-card">
            <h4>Access Control</h4>
            <ul>
              <li>Only request permissions you need</li>
              <li>Report suspicious activity</li>
              <li>Don't access applications unnecessarily</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Contact Tab -->
      <div v-if="activeTab === 'contact'" class="tab-panel">
        <h2><i class="pi pi-phone"></i> Contact & Support</h2>
        
        <div class="contact-section">
          <div class="contact-card">
            <i class="pi pi-desktop"></i>
            <h3>Technical Support</h3>
            <h4>EPISD IT Help Desk</h4>
            <p><strong>Email:</strong> helpdesk@episd.org</p>
            <p><strong>Phone:</strong> [District IT Phone Number]</p>
            <p><strong>Hours:</strong> Monday-Friday, 8:00 AM - 5:00 PM</p>
          </div>

          <div class="contact-card">
            <i class="pi pi-code"></i>
            <h3>Application Developer</h3>
            <h4>Mario Camarena</h4>
            <p><strong>Email:</strong> mvc757@gmail.com</p>
            <p><strong>Role:</strong> Application Developer</p>
          </div>

          <div class="contact-card">
            <i class="pi pi-users"></i>
            <h3>Program Administration</h3>
            <h4>Child Nutrition Services</h4>
            <p>Contact your campus Child Nutrition coordinator</p>
            <p>For program policy questions and eligibility determinations</p>
          </div>
        </div>

        <div class="reporting-section">
          <h3>Reporting Issues</h3>
          <p>When reporting a problem, please provide:</p>
          <ol>
            <li>Your name and contact information</li>
            <li>Description of the issue</li>
            <li>Error messages (take screenshot if possible)</li>
            <li>Steps to reproduce the problem</li>
            <li>Browser and operating system you're using</li>
            <li>Application ID or batch number (if applicable)</li>
          </ol>
        </div>

        <div class="resources-section">
          <h3>Training and Resources</h3>
          <div class="resource-grid">
            <div class="resource-item">
              <i class="pi pi-book"></i>
              <h4>Additional Documentation</h4>
              <p>System documentation available in the Documentation tab</p>
            </div>
            <div class="resource-item">
              <i class="pi pi-play"></i>
              <h4>Training Sessions</h4>
              <p>Contact your supervisor for training opportunities</p>
            </div>
            <div class="resource-item">
              <i class="pi pi-file"></i>
              <h4>Quick Reference</h4>
              <p>Quick reference guides for specific tasks</p>
            </div>
            <div class="resource-item">
              <i class="pi pi-refresh"></i>
              <h4>Refresher Training</h4>
              <p>Refresher training available as needed</p>
            </div>
          </div>
        </div>

        <div class="keyboard-shortcuts-section">
          <h3>Keyboard Shortcuts</h3>
          <table class="styled-table">
            <thead>
              <tr>
                <th>Shortcut</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>Ctrl + F</code> or <code>Cmd + F</code></td>
                <td>Browser search (find text on page)</td>
              </tr>
              <tr>
                <td><code>F5</code> or <code>Ctrl + R</code></td>
                <td>Refresh page</td>
              </tr>
              <tr>
                <td><code>Ctrl + P</code></td>
                <td>Print current page</td>
              </tr>
              <tr>
                <td><code>Esc</code></td>
                <td>Close dialogs/popups</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>

    <!-- Footer -->
    <div class="manual-footer">
      <p>&copy; 2025 El Paso Independent School District. All rights reserved.</p>
      <p>Version 1.0.0 | Last Updated: October 2025</p>
      <p>This document contains confidential information about EPISD systems and processes.</p>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: 'UserManual',
  setup() {
    const activeTab = ref('intro')
    const activeFaq = reactive({
      general: null,
      search: null,
      letter: null,
      technical: null
    })

    const tabs = [
      { id: 'intro', name: 'Introduction', icon: 'pi pi-info-circle' },
      { id: 'getting-started', name: 'Getting Started', icon: 'pi pi-play-circle' },
      { id: 'interface', name: 'User Interface', icon: 'pi pi-desktop' },
      { id: 'features', name: 'Core Features', icon: 'pi pi-star' },
      { id: 'workflows', name: 'Workflows', icon: 'pi pi-sitemap' },
      { id: 'troubleshooting', name: 'Troubleshooting', icon: 'pi pi-wrench' },
      { id: 'faq', name: 'FAQ', icon: 'pi pi-question-circle' },
      { id: 'best-practices', name: 'Best Practices', icon: 'pi pi-thumbs-up' },
      { id: 'contact', name: 'Contact & Support', icon: 'pi pi-phone' }
    ]

    const generalFaqs = [
      {
        question: "How often should I import applications?",
        answer: "Import applications daily or as needed based on your processing schedule. Coordinate with your team to avoid duplicate imports."
      },
      {
        question: "Can I edit application information?",
        answer: "It depends on your user role. Administrators can edit most fields. Standard users may have limited editing capabilities. Always verify changes are saved."
      },
      {
        question: "What if a guardian's name is incorrect?",
        answer: "Contact your supervisor or IT. The source data may need correction in the main database before being reimported."
      },
      {
        question: "How long are applications kept in the system?",
        answer: "Applications remain in the system for the current school year. Archives are maintained according to district policy. Contact IT for historical data."
      }
    ]

    const searchFaqs = [
      {
        question: "Why doesn't my search show any results?",
        answer: "Verify spelling, clear other filters, and try partial searches. Ensure applications have been imported."
      },
      {
        question: "Can I search by date?",
        answer: "Currently, date search may not be available directly. Use batch numbers which typically correlate with processing dates."
      },
      {
        question: "How do I find all unprocessed applications?",
        answer: "Use the Status filter and select 'Blank' or 'Unprocessed' (depending on system configuration)."
      }
    ]

    const letterFaqs = [
      {
        question: "Can I preview a letter before printing?",
        answer: "Yes, generate the letter first. It will open as a PDF which you can review before printing."
      },
      {
        question: "What if I need to reprint a letter?",
        answer: "Search for the application, select it, and click 'Generate Letter' again. The system will recreate the PDF."
      },
      {
        question: "Can I change the letter template?",
        answer: "Only administrators can modify letter templates. Contact IT or your supervisor if changes are needed."
      },
      {
        question: "How do I know which letters have been printed?",
        answer: "Check the Status column. Applications with 'Printed' status have had their letters printed."
      }
    ]

    const technicalFaqs = [
      {
        question: "What browsers are supported?",
        answer: "Chrome, Firefox, Edge, and Safari (latest versions). Chrome is recommended for best performance."
      },
      {
        question: "Can I use this on a tablet or phone?",
        answer: "The system is optimized for desktop use. Mobile access may have limited functionality."
      },
      {
        question: "What if the system is slow?",
        answer: "Clear cache, close unnecessary tabs, and check your internet connection. See the Troubleshooting section for more details."
      },
      {
        question: "Who do I contact for technical problems?",
        answer: "Contact EPISD IT Support or see contact information in the Contact & Support tab."
      }
    ]

    const toggleFaq = (section, index) => {
      if (activeFaq[section] === index) {
        activeFaq[section] = null
      } else {
        activeFaq[section] = index
      }
    }

    return {
      activeTab,
      tabs,
      activeFaq,
      generalFaqs,
      searchFaqs,
      letterFaqs,
      technicalFaqs,
      toggleFaq
    }
  }
}
</script>

<style scoped>
.user-manual-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  background: #f8f9fa;
}

.header-section {
  text-align: center;
  margin-bottom: 40px;
  padding: 50px 30px;
  background: #0a58ca;
  color: white;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.logo-container {
  margin-bottom: 25px;
}

.episd-logo {
  width: 120px;
  height: auto;
  border-radius: 50%;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  border: 4px solid white;
}

.main-title {
  font-size: 3rem;
  margin: 20px 0 10px;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
}

.subtitle {
  font-size: 1.5rem;
  margin: 10px 0;
  opacity: 0.95;
  font-weight: 500;
}

.description {
  font-size: 1.2rem;
  max-width: 800px;
  margin: 10px auto 0;
  opacity: 0.9;
}

.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.info-card {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
  transition: all 0.3s ease;
  border-top: 4px solid #667eea;
}

.info-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

.info-card h3 {
  color: #333;
  margin: 15px 0 10px;
  font-size: 1.2rem;
}

.info-card p {
  color: #666;
  font-weight: 500;
}

.tabs-container {
  background: white;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.tabs-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.tab-button {
  padding: 12px 20px;
  border: none;
  background: #f8f9fa;
  color: #666;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 175px;
}

.tab-button:hover {
  background: #aa58ca;
  color: white;
  transform: translateY(-2px);
}

.tab-button.active {
  background: #0a58ca;
  color: white;
  box-shadow: 0 4px 10px rgba(102, 126, 234, 0.3);
}

.home-link {
  text-decoration: none;
}

.tab-content {
  min-height: 600px;
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
}

.tab-panel {
  animation: fadeIn 0.4s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.tab-panel h2 {
  color: #667eea;
  font-size: 2rem;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 3px solid #667eea;
  display: flex;
  align-items: center;
  gap: 15px;
}

.tab-panel h3 {
  color: #444;
  font-size: 1.5rem;
  margin: 30px 0 20px;
}

.tab-panel h4 {
  color: #555;
  font-size: 1.2rem;
  margin: 20px 0 15px;
}

.content-section {
  margin-bottom: 40px;
  padding: 25px;
  background: #f8f9fa;
  border-radius: 10px;
  border-left: 5px solid #667eea;
}

.feature-highlight {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}

.feature-highlight h4 {
  color: #667eea;
  margin-bottom: 15px;
}

.feature-highlight ul {
  list-style: none;
  padding: 0;
}

.feature-highlight li {
  padding: 8px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.feature-highlight li i {
  color: #28a745;
  font-size: 1.2rem;
}

.user-roles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.role-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.role-card:hover {
  transform: translateY(-5px);
}

.role-card i {
  font-size: 2.5rem;
  color: #667eea;
  margin-bottom: 15px;
}

.role-card h4 {
  color: #333;
  margin: 10px 0;
}

.role-card p {
  color: #666;
  font-size: 0.9rem;
}

.requirements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.requirement-item {
  background: white;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
}

.requirement-item i {
  font-size: 1.8rem;
  color: #667eea;
}

.step-list {
  margin-top: 20px;
}

.step-item {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.step-number {
  background: #667eea;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-content h4 {
  color: #667eea;
  margin: 0 0 10px 0;
}

.step-content ul, .step-content ol {
  margin: 10px 0;
  padding-left: 25px;
}

.step-content li {
  margin: 5px 0;
}

.code-block {
  background: #2d3748;
  color: #e2e8f0;
  padding: 15px;
  border-radius: 6px;
  margin: 10px 0;
  overflow-x: auto;
}

.code-block code {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}

.roles-table {
  margin-top: 20px;
  overflow-x: auto;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.styled-table th,
.styled-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.styled-table thead {
  background: #667eea;
  color: white;
}

.styled-table tbody tr:hover {
  background: #f8f9fa;
}

.badge {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.badge-high {
  background: #28a745;
  color: white;
}

.badge-medium {
  background: #ffc107;
  color: #333;
}

.badge-low {
  background: #6c757d;
  color: white;
}

.interface-description, .feature-list {
  margin-top: 20px;
}

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  padding: 10px;
  margin: 5px 0;
  background: white;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.feature-list i {
  color: #667eea;
  font-size: 1.2rem;
}

.tabs-description {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.tab-desc-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
}

.tab-desc-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
}

.tab-desc-card i {
  font-size: 2.5rem;
  color: #667eea;
  margin-bottom: 15px;
}

.component-list {
  margin-top: 20px;
}

.component-item {
  background: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.component-item h4 {
  color: #667eea;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.component-item ul {
  margin: 10px 0;
  padding-left: 25px;
}

.feature-detail {
  margin-top: 20px;
}

.info-box, .tips-box {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  border-left: 4px solid #17a2b8;
}

.tips-box {
  border-left-color: #ffc107;
}

.tips-box h4, .info-box h4 {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #333;
}

.status-workflow {
  margin: 20px 0;
  padding: 20px;
  background: white;
  border-radius: 10px;
}

.workflow-steps {
  margin-top: 15px;
}

.workflow-step-inline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.status-badge {
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 500;
  font-size: 0.9rem;
}

.status-new { background: #e2e8f0; color: #4a5568; }
.status-sent { background: #bee3f8; color: #2c5282; }
.status-printed { background: #c6f6d5; color: #22543d; }
.status-approved { background: #9ae6b4; color: #22543d; }

.workflow-section {
  margin-bottom: 50px;
}

.workflow-steps-detailed {
  margin-top: 20px;
}

.workflow-step-detail {
  background: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  border-left: 5px solid #667eea;
}

.step-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.step-badge {
  background: #667eea;
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}

.troubleshooting-section {
  margin-top: 20px;
}

.issue-card {
  background: white;
  margin-bottom: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  overflow: hidden;
}

.issue-header {
  background: #f8f9fa;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  border-left: 5px solid #dc3545;
}

.issue-header i {
  color: #dc3545;
  font-size: 1.5rem;
}

.issue-header h4 {
  color: #333;
  margin: 0;
}

.issue-body {
  padding: 20px;
}

.issue-body ol {
  padding-left: 25px;
}

.error-messages-section {
  margin-top: 40px;
}

.error-explanation {
  background: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  border-left: 5px solid #ffc107;
}

.error-title {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #333;
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 10px;
}

.error-title i {
  color: #ffc107;
  font-size: 1.3rem;
}

.faq-section {
  margin-bottom: 40px;
}

.faq-item {
  background: white;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  overflow: hidden;
}

.faq-question {
  padding: 15px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: background 0.3s ease;
}

.faq-question:hover {
  background: #f8f9fa;
}

.faq-question i {
  color: #667eea;
  font-size: 1.2rem;
}

.faq-answer {
  padding: 15px 20px;
  background: #f8f9fa;
  border-top: 1px solid #e2e8f0;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.best-practice-section {
  margin-bottom: 40px;
}

.best-practice-section h3 {
  display: flex;
  align-items: center;
  gap: 10px;
}

.practice-card {
  background: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  border-left: 5px solid #28a745;
}

.practice-card h4 {
  color: #28a745;
  margin-bottom: 10px;
}

.contact-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin: 30px 0;
}

.contact-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
  border-top: 5px solid #667eea;
}

.contact-card i {
  font-size: 3rem;
  color: #667eea;
  margin-bottom: 20px;
}

.contact-card h3 {
  color: #333;
  margin: 15px 0 10px;
}

.contact-card h4 {
  color: #667eea;
  margin: 10px 0;
}

.reporting-section, .resources-section, .keyboard-shortcuts-section {
  margin: 40px 0;
  padding: 25px;
  background: #f8f9fa;
  border-radius: 10px;
}

.resource-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.resource-item {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.resource-item i {
  font-size: 2rem;
  color: #667eea;
  margin-bottom: 15px;
}

.manual-footer {
  margin-top: 60px;
  padding: 30px;
  background: #2d3748;
  color: white;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.manual-footer p {
  margin: 8px 0;
}

@media (max-width: 768px) {
  .user-manual-container {
    padding: 10px;
  }
  
  .main-title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
  }
  
  .tabs-wrapper {
    flex-direction: column;
  }
  
  .tab-button {
    width: 100%;
    justify-content: center;
  }
  
  .info-cards, .user-roles, .requirements-grid, .tabs-description, .contact-section, .resource-grid {
    grid-template-columns: 1fr;
  }
  
  .tab-content {
    padding: 15px;
  }
  
  .step-item {
    flex-direction: column;
  }
}
</style>

