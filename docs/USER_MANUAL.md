# EPISD Free and Reduced Lunch Eligibility Application - User Manual

**Version 1.0.0**  
**El Paso Independent School District**  
**Last Updated: October 2025**

---

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [User Interface Overview](#user-interface-overview)
4. [Core Features](#core-features)
5. [Step-by-Step Workflows](#step-by-step-workflows)
6. [Advanced Features](#advanced-features)
7. [Training Center](#training-center)
8. [Troubleshooting](#troubleshooting)
9. [Best Practices](#best-practices)
10. [FAQ](#faq)
11. [Contact & Support](#contact--support)

---

## Introduction

### What is This Application?

The EPISD Free and Reduced Lunch Eligibility Application is a comprehensive web-based system designed to streamline the management and processing of meal eligibility applications for the El Paso Independent School District. This system allows authorized staff to:

- Import and manage student meal eligibility applications
- Search and filter applications by multiple criteria
- Generate eligibility letters in English and Spanish
- Print letters individually or in batches
- Track application status throughout the process
- Maintain compliance with federal nutrition program requirements

### Who Should Use This Manual?

This manual is intended for:
- District nutrition program staff
- School administrators managing meal applications
- Office personnel responsible for processing applications
- IT staff supporting the system

### System Requirements

- **Browser**: Modern web browser (Chrome, Firefox, Edge, Safari - latest versions)
- **Internet Connection**: Required for cloud-based features
- **Screen Resolution**: Minimum 1280x720 (higher recommended)
- **User Credentials**: Valid EPISD login credentials

---

## Getting Started

### Accessing the Application

1. **Open Your Web Browser**
   - Launch your preferred web browser
   - Navigate to the application URL provided by your IT department
   - For development/testing: `http://localhost:8081`

2. **Login**
   - You will be presented with a login screen
   - Enter your EPISD email address
   - Enter your password
   - Click the **"Login"** button

3. **First Time Login**
   - If this is your first time logging in, you may need to:
     - Verify your email address
     - Set up your password
     - Complete any required profile information

### Understanding User Roles

Different users have different levels of access:

- **Administrator (e.g., Mary Lou)**: Full access to all features including utilities, configuration, and system management
- **Standard User**: Access to view applications, search, filter, and generate letters
- **Read-Only User**: View-only access to applications and reports

Your welcome message will appear in the top-right corner showing your name.

---

## User Interface Overview

### Navigation Bar

The navigation bar appears at the top of the screen and includes:

- **EPISD Logo**: Click to refresh/return to home
- **Welcome Message**: Displays your name
- **Run Tests Button**: (Admin only) Execute system tests
- **Results Button**: View test results
- **Logout Button**: Sign out of the application

### Main Tabs

The application is organized into several main tabs:

1. **Applications**: Main workspace for managing meal eligibility applications
2. **Overview**: System overview and configuration information
3. **Documentation**: Access to system documentation and help resources
4. **Todo List**: Task management and tracking

### Applications Tab Components

The Applications tab is your primary workspace and includes:

#### Utilities Section (Admin Only)
- **Print Letters**: Generate and print eligibility letters
- **Import Apps**: Import applications from the SQL Server database
- **Process Apps**: Batch process multiple applications

#### Search and Filter Section
Located at the top of the applications list:
- **Search by AppID**: Find specific applications by ID number
- **Guardian Name**: Search by parent/guardian name
- **Student Name**: Search by student name
- **Campus**: Filter by school campus
- **Status**: Filter by application status (Sent, Printed, Approved, Denied)
- **Batch Number**: Filter by batch number
- **Language**: Filter by English or Spanish applications

#### Application Data Table
Displays all applications with the following columns:
- **Checkbox**: Select applications for batch processing
- **AppID**: Unique application identifier
- **Guardian Name**: Parent/guardian information
- **Student Name**: Student information
- **Campus**: School campus
- **Status**: Current application status
- **Batch Number**: Assigned batch number
- **Language**: Letter language (English/Spanish)
- **Actions**: Quick action buttons

---

## Core Features

### 1. Viewing Applications

**To view the list of applications:**

1. Click on the **Applications** tab
2. The system displays all applications in a scrollable table
3. Each row shows key information about one application

**Understanding Application Data:**
- **AppID**: Unique identifier (e.g., 2025951)
- **Guardian/Student Names**: Family information
- **Status Indicators**:
  - Blank: Not yet processed
  - Sent: Letter has been sent
  - Printed: Letter has been printed
  - Approved/Denied: Final decision recorded

### 2. Searching for Applications

**Simple Search:**

1. Locate the search bar at the top of the Applications tab
2. Enter your search criteria:
   - AppID: Enter the full or partial ID number
   - Name: Enter guardian or student name
   - Campus: Select from dropdown or type to filter
3. Results update automatically as you type

**Advanced Filtering:**

1. Use multiple filters simultaneously:
   - Select a **Campus** from the dropdown
   - Choose a **Status** (All, Sent, Printed, Approved, Denied)
   - Pick a **Batch Number**
   - Select **Language** (All, English, Spanish)

2. Click **Clear Filters** to reset all search criteria

**Tips for Effective Searching:**
- Searches are case-insensitive
- Partial names work (searching "John" finds "Johnson", "Johnston", etc.)
- Combine multiple filters to narrow results
- Use batch numbers to find groups of applications processed together

### 3. Generating Letters

**Generate a Single Letter:**

1. Locate the application in the list
2. Click the **checkbox** next to the application
3. Click the **"Generate Letter"** button
4. The system will:
   - Create a PDF letter in the appropriate language
   - Save it to the Letters folder
   - Update the application status

**Understanding Letter Templates:**
- Letters are automatically generated based on the language preference
- English letters use the English template
- Spanish letters use the Spanish template
- All letters include:
  - District logo
  - Application ID
  - Guardian and student names
  - Eligibility determination
  - Important program information

### 4. Printing Letters

**Print Individual Letters:**

1. Select one or more applications using checkboxes
2. Click the **"Print Letters"** button in the Utilities section
3. Your system's print dialog will appear
4. Configure print settings:
   - Select printer
   - Choose number of copies
   - Set page orientation (Portrait recommended)
5. Click **Print**

**Print Batch Letters:**

1. Use filters to display the batch you want to print
2. Click **"Select All"** (if provided) or individually check applications
3. Click **"Print Batch"**
4. Confirm the number of letters to be printed
5. Proceed with printing

**Printing Best Practices:**
- Print test pages first to verify formatting
- Use high-quality paper for official letters
- Keep printer stocked with letterhead if required
- Verify printer settings before large batch prints
- Check printed letters for quality before distribution

### 5. Managing Application Status

**Update Status Manually:**

1. Find the application in the list
2. Click on the application row to expand details (if applicable)
3. Change the status using the status dropdown
4. Click **Save** or **Update**

**Status Workflow:**
- **Blank/New** → Application imported, not yet processed
- **Sent** → Letter has been sent to family
- **Printed** → Letter has been printed (ready for distribution)
- **Approved** → Eligibility approved
- **Denied** → Eligibility denied

**Bulk Status Updates:**

1. Select multiple applications using checkboxes
2. Click **"Update Status"** button
3. Choose the new status from the dropdown
4. Click **"Apply"** to update all selected applications

### 6. Batch Processing

**What is Batch Processing?**

Batch processing allows you to organize and process multiple applications together, making it easier to manage large volumes of applications.

**Create a New Batch:**

1. Click on the **Utilities** section (Admin only)
2. Select applications you want to include in the batch
3. Click **"Assign Batch Number"**
4. Enter a batch number or accept the auto-generated number
5. Click **"Confirm"**

**View Applications by Batch:**

1. Use the **Batch Number** filter
2. Select the batch number you want to view
3. All applications in that batch will be displayed

**Process an Entire Batch:**

1. Filter by batch number
2. Select all applications in the batch
3. Click **"Process Batch"**
4. Choose the action (Generate Letters, Print, Update Status)
5. Confirm the action

---

## Step-by-Step Workflows

### Workflow 1: Processing New Applications

**Objective**: Import and process newly submitted applications

1. **Import Applications from Database**
   ```
   - Click "Utilities" to expand
   - Click "Import Apps" button
   - System connects to SQL Server database
   - Wait for import confirmation
   - Review imported applications count
   ```

2. **Review Imported Applications**
   ```
   - Check for any data errors or missing information
   - Verify guardian and student names are correct
   - Confirm language preferences are accurate
   ```

3. **Assign Batch Numbers**
   ```
   - Select a group of applications (e.g., by campus or date)
   - Click "Assign Batch Number"
   - Enter or accept batch number
   - Click "Confirm"
   ```

4. **Generate Letters**
   ```
   - Filter by batch number
   - Select all applications in batch
   - Click "Generate Letters"
   - Wait for generation to complete
   - Verify letters in Letters folder
   ```

5. **Print and Distribute**
   ```
   - Click "Print Letters"
   - Configure printer settings
   - Print all letters
   - Update status to "Printed"
   - Prepare for distribution
   ```

### Workflow 2: Finding and Reprinting a Letter

**Objective**: Locate a specific application and reprint its letter

1. **Search for Application**
   ```
   - Go to Applications tab
   - Enter AppID, guardian name, or student name in search
   - Locate the specific application in results
   ```

2. **Verify Information**
   ```
   - Check application details are correct
   - Note the batch number
   - Verify letter language
   ```

3. **Reprint Letter**
   ```
   - Select the application checkbox
   - Click "Generate Letter" (if letter needs regeneration)
   - Click "Print Letters"
   - Print the letter
   ```

4. **Update Records**
   ```
   - Update status if needed
   - Add notes about reprint (if notes feature available)
   - Save changes
   ```

### Workflow 3: Processing Applications by Campus

**Objective**: Process all applications for a specific school campus

1. **Filter by Campus**
   ```
   - Click the Campus dropdown
   - Select the desired campus
   - All applications for that campus display
   ```

2. **Review Campus Applications**
   ```
   - Check total number of applications
   - Note any that need special attention
   - Verify all have complete information
   ```

3. **Batch Assign**
   ```
   - Select all campus applications
   - Assign a campus-specific batch number
   - Example: "Batch 101 - Washington Elementary"
   ```

4. **Generate Campus Letters**
   ```
   - With campus filter still active
   - Select all applications
   - Generate all letters at once
   - Verify generation complete
   ```

5. **Print by Language**
   ```
   - Add Language filter: English
   - Print all English letters
   - Change filter to Spanish
   - Print all Spanish letters
   ```

### Workflow 4: Status Tracking and Reporting

**Objective**: Track progress of application processing

1. **View Overall Status**
   ```
   - Go to Applications tab
   - Use Status filter: "All"
   - Note total applications
   ```

2. **Check Pending Applications**
   ```
   - Filter Status: Blank (unprocessed)
   - Count remaining applications to process
   - Plan processing schedule
   ```

3. **Review Processed Applications**
   ```
   - Filter Status: "Sent" or "Printed"
   - Verify batch numbers assigned
   - Check dates processed
   ```

4. **Monitor Approvals**
   ```
   - Filter Status: "Approved"
   - Count approved applications
   - Prepare reports if needed
   ```

### Workflow 5: Handling Special Cases

**Objective**: Process applications requiring special attention

1. **Identify Special Cases**
   ```
   - Applications with incomplete information
   - Requests for letter in specific language
   - Reprint requests from families
   - Appeals or disputes
   ```

2. **Process Individually**
   ```
   - Do not include in batch processing
   - Review each case carefully
   - Generate letter individually
   - Add notes (if feature available)
   ```

3. **Track Separately**
   ```
   - Consider using a specific batch number for special cases
   - Example: "Batch 999 - Special Processing"
   - Update status to reflect special handling
   ```

4. **Follow Up**
   ```
   - Monitor status of special cases
   - Ensure proper resolution
   - Document any additional actions taken
   ```

---

## Advanced Features

### Working with Multiple Languages

The system supports both English and Spanish letters:

**Language Selection:**
- Language is determined by the application data
- Each application has a language field
- Letters generate automatically in the correct language

**Switching Letter Language:**
1. Locate the application
2. Edit the application details (if permissions allow)
3. Change the language field to "English" or "Spanish"
4. Regenerate the letter
5. Save changes

### Customizing Letters (Admin Only)

**Accessing Letter Templates:**
1. Navigate to the configuration section
2. Locate letter templates (letters.json file)
3. Edit template content as needed
4. Save changes
5. Test with sample application

**Template Variables:**
- `{GuardianName}`: Parent/guardian name
- `{StudentName}`: Student name
- `{AppID}`: Application ID
- `{Campus}`: School campus
- `{Date}`: Current date

### Bulk Operations

**Bulk Status Update:**
```
1. Filter or search for applications to update
2. Select multiple applications (checkboxes)
3. Click "Bulk Update Status"
4. Choose new status from dropdown
5. Click "Apply to All Selected"
6. Confirm the action
```

**Bulk Batch Assignment:**
```
1. Use filters to display target applications
2. Select all desired applications
3. Click "Assign Batch"
4. Enter batch number
5. Click "Assign to Selected"
6. Verify assignments complete
```

### Exporting Data

**Export Applications to CSV/Excel:**
```
1. Apply desired filters to show applications you want to export
2. Click "Export" button (if available)
3. Choose format (CSV or Excel)
4. Select fields to include in export
5. Click "Download"
6. Save file to your computer
```

**Export Letters:**
- Letters are automatically saved to the `Letters` folder
- Organized by batch number
- Each letter saved as PDF: `EPISD - Meal Application_{AppID}_{GuardianName}_{StudentName}.pdf`

### Todo List Management

**Accessing Todo List:**
1. Click the **"Todo List"** tab in navigation
2. View all current tasks and reminders

**Adding a Todo:**
```
1. Click "Add New Todo"
2. Enter task description
3. Set priority (High, Medium, Low)
4. Set due date (optional)
5. Click "Save"
```

**Managing Todos:**
- Check off completed tasks
- Edit existing todos
- Delete completed todos
- Filter by priority or due date

---

## Training Center

The Training Center provides AI-powered learning tools to help you master the application and improve your skills. Access the Training Center through the **"Training"** dropdown menu in the navigation bar.

### Accessing the Training Center

1. **Click the "Training" button** in the top navigation bar
2. **Hover over the menu** to see all available training tools
3. **Select any training module** to begin learning

Or navigate directly to the **Training Hub** to view all options in one place.

### Training Hub Overview

**Location**: Click "Training" → "Training Hub"

The Training Hub is your central dashboard for all learning resources. It displays:

- **Training Cards**: Visual cards for each learning tool
- **Progress Statistics**: Your overall learning progress
  - Total learning sessions completed
  - Hours of learning time
  - Completion rate percentage
- **Quick Access**: Direct links to all training modules

**How to Use:**
1. Review your progress statistics at the top
2. Browse available training tools
3. Click any card to launch that training module
4. Track your progress over time

---

### Audio Learning

**Purpose**: Generate AI-powered audio summaries and podcasts from documents and text content for hands-free learning.

#### Accessing Audio Learning

**Navigation**: Training → Audio Learning

**Use Cases:**
- Create audio summaries of long documents
- Convert text content into podcast-style discussions
- Generate educational lectures from written material
- Listen to training materials while multitasking

#### Creating Audio Content

**Step 1: Provide Content**
```
1. Click the "Audio Learning" option from Training menu
2. In the upload section, do one of the following:
   - Paste text directly into the text area
   - Click "Upload Files" to select documents
   - Supported formats: .txt, .pdf, .doc, .docx
3. Wait for file upload confirmation
```

**Step 2: Configure Audio Settings**
```
1. Select Voice Style:
   - Conversational: Natural, friendly tone
   - Professional: Business-appropriate delivery
   - Educational: Clear, instructive approach
   - Storytelling: Engaging narrative style

2. Choose Duration:
   - Short: 5-10 minutes
   - Medium: 10-20 minutes
   - Long: 20+ minutes

3. Select Format:
   - Podcast Discussion: Two-person conversation format
   - Summary: Concise overview of key points
   - Q&A Interview: Question and answer format
   - Lecture: Detailed instructional presentation
```

**Step 3: Generate Audio**
```
1. Review your settings
2. Click "Generate Audio"
3. Wait for AI processing (typically 10-30 seconds)
4. Audio will appear in your library when complete
```

#### Using the Audio Library

**Playing Audio:**
```
1. Locate your audio in the library list
2. Click the play button (▶) on the audio item
3. Audio player bar appears at bottom of screen
4. Use controls:
   - Play/Pause: Start or stop playback
   - Skip Backward: Jump back 10 seconds
   - Skip Forward: Jump ahead 10 seconds
   - Progress Bar: Drag to any position
```

**Downloading Audio:**
```
1. Find the audio you want to download
2. Click the download button (⬇) next to the audio
3. Save file to your computer
4. Play offline using any audio player
```

**Managing Your Library:**
- View all generated audio files
- See duration and creation date
- Play any audio directly in the browser
- Download files for offline access
- Sort by date or name

---

### Video Learning

**Purpose**: Access interactive video lessons with AI-powered annotations and timestamps for enhanced comprehension.

#### Accessing Video Learning

**Navigation**: Training → Video Learning

**Features:**
- Video library organized by category
- Interactive video player
- AI-generated annotations with timestamps
- Click annotations to jump to specific topics
- Upload your own training videos

#### Using the Video Player

**Playing Videos:**
```
1. Navigate to Video Learning from Training menu
2. Browse video library on the right sidebar
3. Filter by category if desired:
   - All: Show all videos
   - Tutorial: Step-by-step guides
   - Lecture: Educational presentations
   - Demo: Feature demonstrations
4. Click any video to load it in the player
5. Click play button to start video
```

**Video Controls:**
- **Play/Pause**: Control playback
- **Progress Bar**: Drag to any position in video
- **Time Display**: See current time and total duration
- **Fullscreen**: Expand to full screen view

#### AI Annotations Feature

**What Are Annotations?**
- AI-generated notes about key concepts in the video
- Timestamped markers for important sections
- Quick navigation to specific topics

**Using Annotations:**
```
1. Load a video in the player
2. View annotations panel below the video
3. Each annotation shows:
   - Timestamp (e.g., "2:15")
   - Title of the concept
   - Brief description
4. Click any annotation to jump to that timestamp
5. Video automatically seeks to that position
```

**Example Workflow:**
```
Scenario: Learning about application processing

1. Select "Application Processing Tutorial" video
2. Video loads showing 25:30 duration
3. Review annotations:
   - 2:15 - "Importing Applications"
   - 8:45 - "Search and Filter Features"
   - 15:20 - "Generating Letters"
4. Click "8:45 - Search and Filter Features"
5. Video jumps to 8:45 timestamp
6. Watch that specific section
7. Use annotations to navigate other topics
```

#### Uploading Videos

**Adding Your Own Content:**
```
1. Click "Upload Video" button
2. Fill in video information:
   - Video Title
   - Description
   - Category (Tutorial, Lecture, or Demo)
3. Click "Choose File" to select video
4. Click "Upload" to add to library
5. Video appears in your library
```

**Supported Formats:**
- MP4 (recommended)
- AVI
- MOV
- Common video formats

---

### Mind Maps

**Purpose**: Create visual concept maps to understand relationships between ideas, plan projects, and organize information.

#### Accessing Mind Maps

**Navigation**: Training → Mind Maps

**Use Cases:**
- Visualize application workflow processes
- Plan batch processing strategies
- Map out troubleshooting steps
- Organize training concepts
- Brainstorm improvements

#### Creating Your First Mind Map

**Starting a New Map:**
```
1. Navigate to Mind Maps from Training menu
2. Canvas loads with a central "Main Topic" node
3. Click the central node to select it
4. Use the "+ Add Node" button in toolbar
   OR
   Click the green "+" circle on any node to add a child
```

**Understanding the Interface:**
- **Canvas**: Main area where you create your map
- **Toolbar**: Top bar with controls
- **Sidebar**: Shows saved mind maps and editing tools
- **Nodes**: Colored boxes representing concepts
- **Connections**: Lines connecting related nodes

#### Working with Nodes

**Adding Nodes:**
```
Method 1 - From Toolbar:
1. Click "Add Node" in toolbar
2. New node appears on canvas
3. Drag node to desired position

Method 2 - Child Nodes:
1. Click the green "+" button on any node
2. Child node automatically created
3. Connected to parent node
4. Positioned based on existing children
```

**Editing Nodes:**
```
1. Click any node to select it
2. Node Editor appears in sidebar
3. Type new text in the input field
4. Changes appear immediately on canvas
5. Press Enter or click outside to finish
```

**Node Colors:**
- **Level 0 (Main Topic)**: Purple gradient
- **Level 1 (Subtopics)**: Dark purple
- **Level 2 (Details)**: Medium purple
- **Level 3 (Specifics)**: Light purple

Colors automatically assigned based on hierarchy level.

#### Organizing Your Mind Map

**Moving Nodes:**
```
1. Click and hold on any node
2. Drag to new position
3. Connection lines update automatically
4. Release mouse to place node
```

**Auto Layout:**
```
1. Click "Auto Layout" button in toolbar
2. System automatically organizes nodes
3. Creates balanced, readable layout
4. Preserves all connections
```

**Deleting Nodes:**
```
1. Click node to select it
2. Node editor appears in sidebar
3. Click "Delete Node" button
4. Node and all child nodes are removed
5. Connections automatically updated
```

#### Using Templates

**Available Templates:**
```
1. Click template dropdown in toolbar
2. Choose from:
   - Project Planning: Pre-structured for projects
   - Learning Path: Organized for education
   - Brainstorming: Free-form structure
3. Template loads with sample nodes
4. Customize nodes for your needs
```

**Example - Application Processing Map:**
```
Main Topic: Application Processing Workflow

Branch 1: Import Phase
  └─ Upload File
  └─ Validate Data
  └─ Confirm Import

Branch 2: Review Phase
  └─ Search Applications
  └─ Verify Information
  └─ Update Status

Branch 3: Letter Generation
  └─ Select Applications
  └─ Choose Language
  └─ Generate PDFs
  └─ Print or Email
```

#### Saving and Loading Mind Maps

**Saving Your Work:**
```
1. Click "Save" button in toolbar
2. Mind map saved to your library
3. Name: "Mind Map [number]" (auto-generated)
4. Saves: All nodes, connections, positions
5. Confirmation message appears
```

**Loading Previous Maps:**
```
1. View "Saved Mind Maps" section in sidebar
2. Each saved map shows:
   - Map name
   - Number of nodes
   - Creation date
3. Click any saved map to load it
4. Current map replaced with selected map
```

**Exporting:**
```
1. Click "Export" button in toolbar
2. Mind map saved as image file
3. Download to your computer
4. Use in presentations or documents
```

---

### Flash Cards

**Purpose**: Study and memorize key concepts using AI-generated flashcards with spaced repetition system.

#### Accessing Flash Cards

**Navigation**: Training → Flash Cards

**Benefits:**
- Memorize application procedures
- Learn system terminology
- Review troubleshooting steps
- Prepare for training assessments
- Reinforce learning through repetition

#### Understanding Decks

**What is a Deck?**
- Collection of related flashcards
- Organized by topic or category
- Track mastery percentage
- Can be studied independently

**Deck Information:**
Each deck displays:
- **Name**: Topic of the deck
- **Description**: Brief overview of content
- **Category Badge**: Subject classification
- **Card Count**: Total number of cards
- **Mastery %**: Percentage of cards mastered

#### Creating a New Deck

**Step-by-Step:**
```
1. Click "Create Deck" button
2. Fill in deck information:
   - Deck Name (e.g., "Application Processing Basics")
   - Description (e.g., "Core concepts for processing applications")
   - Category: Choose from dropdown
     • Programming
     • Languages
     • Science
     • Mathematics
     • History
     • Other
3. Optional: Enable AI Generation
   - Check "Generate cards with AI from topic"
   - Enter topic (e.g., "EPISD meal application process")
   - AI creates initial set of cards
4. Click "Create" button
5. New deck appears in your library
```

**Adding Cards to a Deck:**
```
1. Click the edit button (✏) on the deck
2. Click "Add Card"
3. Enter:
   - Question: What you want to learn
   - Answer: The correct response
   - Explanation: (Optional) Additional context
4. Click "Save Card"
5. Repeat for additional cards
```

#### Studying with Flash Cards

**Starting a Study Session:**
```
1. Browse your deck library
2. Click "Study" button on desired deck
3. Study mode begins
4. First card displays the question side
```

**Study Interface:**
- **Progress Bar**: Shows position in deck (e.g., "5/20")
- **Question Side**: Blue background with question
- **Answer Side**: Green background with answer
- **Navigation**: Previous/Next buttons
- **Confidence Buttons**: Mark difficulty level

**Studying Process:**
```
1. Read the question on the card
2. Try to recall the answer
3. Click anywhere on the card to flip it
4. Card rotates to show answer
5. Compare your mental answer with correct answer
6. Rate your confidence:
   - Hard: Didn't know the answer
   - Medium: Knew it but struggled
   - Easy: Knew it confidently
7. Card automatically advances to next
```

**Confidence Rating System:**

| Rating | Meaning | Effect |
|--------|---------|--------|
| 🔴 Hard | Didn't remember | Review more frequently |
| 🟡 Medium | Partially remembered | Normal review schedule |
| 🟢 Easy | Fully remembered | Review less frequently |

**Study Controls:**
- **Previous**: Go back to previous card
- **Next**: Skip to next card (without rating)
- **Exit Study Mode**: Return to deck library

#### Managing Your Decks

**Editing Decks:**
```
1. Click edit button (✏) on any deck
2. Modify deck settings
3. Add, edit, or remove cards
4. Save changes
```

**AI Card Generation:**
```
1. Click "AI Generate" button (✨) on deck
2. AI analyzes deck topic
3. Creates new relevant cards
4. New cards added to deck
5. Review and edit AI-generated cards as needed
```

**Tracking Progress:**
- Mastery percentage updates after each study session
- View statistics on deck card
- Monitor improvement over time
- Focus on decks with lower mastery

**Best Practices:**
- Study regularly (daily if possible)
- Be honest with confidence ratings
- Review hard cards more frequently
- Create decks for specific topics
- Use explanations for complex concepts

---

### Quizzes

**Purpose**: Test your knowledge with adaptive quizzes featuring multiple question types and instant feedback.

#### Accessing Quizzes

**Navigation**: Training → Quizzes

**Features:**
- Multiple choice questions
- True/False questions
- Short answer questions
- Timed assessments
- Instant feedback and explanations
- Score tracking and history

#### Quiz Library

**Browsing Available Quizzes:**
```
1. Navigate to Quizzes from Training menu
2. View all available quizzes in grid layout
3. Each quiz shows:
   - Title and description
   - Difficulty badge (Easy/Medium/Hard)
   - Category tag
   - Number of questions
   - Duration in minutes
   - Best score (if previously taken)
```

**Filtering Quizzes:**
```
1. Use category filter buttons:
   - All: Show everything
   - Programming: Technical content
   - Science: Scientific concepts
   - Mathematics: Math problems
   - General: Mixed topics
2. Click desired category
3. Quiz list updates to show only that category
```

#### Taking a Quiz

**Starting a Quiz:**
```
1. Browse quiz library
2. Read quiz details:
   - Review difficulty level
   - Check number of questions
   - Note time limit
3. Click "Start Quiz" button
4. Quiz begins immediately
5. Timer starts counting down
```

**Quiz Interface:**
- **Quiz Title**: Top of screen
- **Timer**: Shows remaining time (⏱ MM:SS)
- **Progress**: "Question X of Y"
- **Progress Bar**: Visual indicator of completion
- **Question Card**: Main area showing current question
- **Submit Button**: Lock in your answer

#### Question Types

**Multiple Choice:**
```
Format:
- Question at top
- 4 answer options (A, B, C, D)
- Select one answer

How to Answer:
1. Read question carefully
2. Review all options
3. Click your chosen answer
4. Selected option highlights in blue
5. Click "Submit Answer"
6. Instant feedback appears
   - Green for correct
   - Red for incorrect
7. Explanation shown below
8. Click "Next Question" to continue
```

**True/False:**
```
Format:
- Statement presented
- Two large buttons: True ✓ | False ✗

How to Answer:
1. Read the statement
2. Determine if true or false
3. Click appropriate button
4. Button highlights when selected
5. Click "Submit Answer"
6. See correct answer highlighted in green
7. Read explanation
8. Proceed to next question
```

**Short Answer:**
```
Format:
- Question displayed
- Text area for typing answer

How to Answer:
1. Read the question
2. Type your answer in the text box
3. Answer is graded by AI or manual review
4. Click "Submit Answer"
5. Review feedback
6. Continue to next question
```

#### During the Quiz

**Navigation:**
- **Previous**: Not available (prevents answer changing)
- **Submit Answer**: Lock in current response
- **Next Question**: Proceed after submission

**Question Information:**
- **Type Badge**: Shows question format
- **Point Value**: Points awarded for correct answer
- **Timer**: Constant reminder of time remaining

**Tips:**
- Watch the timer - manage your time
- Read questions completely before answering
- Review all answer options in multiple choice
- Don't rush - accuracy matters more than speed
- Read explanations to learn from mistakes

#### Quiz Completion and Results

**Finishing a Quiz:**
```
After last question:
1. Click "Finish Quiz" button
2. Quiz ends and results calculate
3. Results screen appears
4. Review your performance
```

**Results Screen Shows:**

**Overall Score:**
- Circular progress indicator
- Percentage score (0-100%)
- Visual color coding:
  - Green: 80%+ (Excellent)
  - Yellow: 60-79% (Good)
  - Red: Below 60% (Needs Review)

**Detailed Statistics:**

| Metric | Description |
|--------|-------------|
| ✓ Correct | Number of correct answers |
| ✗ Incorrect | Number of wrong answers |
| ⏱ Time | Total time taken |

**Actions Available:**
```
1. Retake Quiz:
   - Click "Retake Quiz" button
   - Start fresh attempt
   - Try to improve score
   - Previous attempt saved as history

2. Back to Quizzes:
   - Return to quiz library
   - Browse other quizzes
   - View updated statistics
```

#### Creating Custom Quizzes

**Creating a New Quiz:**
```
1. Click "Create Quiz" button
2. Fill in quiz details:
   - Quiz Title
   - Description
   - Category (Programming, Science, etc.)
   - Difficulty Level (Easy/Medium/Hard)
3. Optional: Enable AI Generation
   - Check "Generate questions with AI"
   - AI creates questions based on topic
4. Click "Create"
5. Add questions manually or let AI generate
```

**Adding Questions:**
```
1. After creating quiz, click "Edit"
2. Click "Add Question"
3. Select question type
4. Enter question text
5. Provide answer options (for multiple choice)
6. Specify correct answer
7. Add explanation (recommended)
8. Set point value
9. Save question
10. Repeat for additional questions
```

#### Quiz Best Practices

**For Taking Quizzes:**
- Take quizzes in quiet environment
- Eliminate distractions
- Read each question carefully
- Don't leave questions blank
- Review explanations for learning
- Retake quizzes to improve scores

**For Creating Quizzes:**
- Write clear, unambiguous questions
- Provide detailed explanations
- Balance difficulty levels
- Test your own quiz before sharing
- Include variety of question types

#### Tracking Your Progress

**Quiz Attempts:**
- System tracks all quiz attempts
- Best score saved and displayed
- View improvement over time
- Compare scores across categories

**Performance Indicators:**
```
Each quiz card shows:
- Attempts: Number of times taken
- Best Score: Your highest percentage
- Star Rating: Based on best performance
  ⭐ 60-69%
  ⭐⭐ 70-79%
  ⭐⭐⭐ 80-89%
  ⭐⭐⭐⭐ 90-100%
```

---

### Training Tips and Best Practices

#### Effective Learning Strategies

**Audio Learning:**
- Listen during commute or downtime
- Take notes while listening
- Re-listen to complex sections
- Use different voice styles to maintain engagement

**Video Learning:**
- Watch at your own pace
- Use annotations to skip to relevant sections
- Take breaks during long videos
- Rewatch difficult concepts

**Mind Maps:**
- Start with broad concepts, add details later
- Use colors to categorize information
- Review and update maps regularly
- Share maps with colleagues for collaboration

**Flash Cards:**
- Study in short, frequent sessions (15-20 min)
- Be honest with difficulty ratings
- Focus on "Hard" cards more frequently
- Create cards for real-world scenarios

**Quizzes:**
- Take quizzes after studying material
- Review explanations carefully
- Retake quizzes to reinforce learning
- Use quiz results to identify knowledge gaps

#### Creating a Learning Plan

**Recommended Approach:**
```
Week 1: Foundation
- Watch introductory videos
- Create mind map of main concepts
- Generate flashcards for terminology

Week 2: Practice
- Study flashcards daily (15 min)
- Take easy quizzes
- Listen to audio summaries

Week 3: Reinforcement
- Take medium difficulty quizzes
- Review incorrect quiz answers
- Update mind maps with new knowledge

Week 4: Mastery
- Take hard quizzes
- Achieve 80%+ scores
- Create your own training materials
```

#### Accessing Training Resources

**Quick Access:**
1. Click "Training" in navigation bar
2. Hover to see dropdown menu
3. Select desired tool

**Training Hub Dashboard:**
1. Click "Training Hub" for overview
2. View all tools in one place
3. Check progress statistics
4. Launch any training module

**Integration with Daily Work:**
- Use training during slow periods
- Review materials before processing batches
- Create mind maps for complex procedures
- Study flashcards during breaks

---

## Troubleshooting

### Common Issues and Solutions

#### Cannot Login

**Problem**: Error message when trying to log in

**Solutions:**
1. Verify your email address is correct
2. Check caps lock is off when entering password
3. Click "Forgot Password" to reset if needed
4. Clear browser cache and cookies
5. Try a different browser
6. Contact IT support if issue persists

#### Applications Not Displaying

**Problem**: No applications showing in the list

**Solutions:**
1. Check if filters are applied - clear all filters
2. Verify database connection (check with IT)
3. Try refreshing the page (F5 or Ctrl+R)
4. Ensure applications have been imported
5. Check your user permissions

#### Letters Not Generating

**Problem**: PDF letters fail to generate

**Solutions:**
1. Check pop-up blocker settings - allow pop-ups from this site
2. Verify printer/PDF service is running (server-side)
3. Ensure application data is complete
4. Try generating one letter at a time
5. Check available disk space on server
6. Contact IT support if problem continues

#### Printing Issues

**Problem**: Letters won't print or print incorrectly

**Solutions:**
1. Verify printer is online and connected
2. Check printer has paper and ink/toner
3. Update printer drivers
4. Try printing a test page from system
5. Check PDF opens correctly before printing
6. Verify print settings (portrait, full page, no scaling)

#### Search Not Working

**Problem**: Search returns no results or incorrect results

**Solutions:**
1. Check spelling of search terms
2. Try partial name instead of full name
3. Clear search and try again
4. Verify data exists in system
5. Try different search criteria
6. Refresh the page

#### Slow Performance

**Problem**: Application runs slowly or freezes

**Solutions:**
1. Close unnecessary browser tabs
2. Clear browser cache and history
3. Refresh the page
4. Check internet connection speed
5. Close other applications running on computer
6. Try using a different browser
7. Report to IT if problem continues

### Error Messages

#### "Database Connection Failed"

**Meaning**: System cannot connect to SQL Server database

**Actions:**
1. Verify network connection
2. Check with IT - database server may be down
3. Wait a few minutes and try again
4. Do not attempt to import applications until resolved

#### "Insufficient Permissions"

**Meaning**: Your user account doesn't have access to this feature

**Actions:**
1. Contact your supervisor
2. Request appropriate permissions from IT
3. Use features available to your role

#### "Generation Failed"

**Meaning**: Letter PDF could not be created

**Actions:**
1. Check application has all required fields
2. Verify letter template is available
3. Try again with single application
4. Report to IT if continues

---

## Best Practices

### Data Management

1. **Regular Backups**
   - Ensure IT performs regular database backups
   - Keep copies of important exports

2. **Data Accuracy**
   - Verify application information before processing
   - Double-check names, IDs, and campus assignments
   - Correct errors promptly

3. **Consistent Status Updates**
   - Update status as soon as actions are completed
   - Use consistent status terminology
   - Track batch numbers accurately

### Processing Efficiency

1. **Batch Similar Applications**
   - Group by campus for easier distribution
   - Separate English and Spanish for printing efficiency
   - Process similar dates together

2. **Use Filters Effectively**
   - Combine multiple filters to narrow results quickly
   - Save frequently used filter combinations (if feature available)
   - Clear filters when done to avoid confusion

3. **Regular Processing Schedule**
   - Set specific times for importing new applications
   - Schedule batch processing sessions
   - Maintain consistent workflow

### Letter Generation

1. **Quality Control**
   - Review first letter from each batch before printing all
   - Verify correct language
   - Check for formatting issues
   - Ensure all information is present

2. **Printing Management**
   - Print test page before large batches
   - Use appropriate paper stock
   - Verify printer settings each time
   - Keep track of printed batches

3. **File Organization**
   - Letters automatically organize by batch in Letters folder
   - Keep folders organized by date or period
   - Archive old batches regularly

### Security

1. **Protect Sensitive Data**
   - Always log out when leaving workstation
   - Don't share login credentials
   - Follow FERPA guidelines for student data
   - Secure printed letters until distribution

2. **Access Control**
   - Only request permissions you need
   - Report suspicious activity
   - Don't access applications unnecessarily

### Communication

1. **Team Coordination**
   - Communicate with team about batch assignments
   - Share processing schedules
   - Report issues promptly

2. **Documentation**
   - Note special cases
   - Document any manual changes
   - Keep processing records

---

## FAQ

### General Questions

**Q: How often should I import applications?**  
A: Import applications daily or as needed based on your processing schedule. Coordinate with your team to avoid duplicate imports.

**Q: Can I edit application information?**  
A: It depends on your user role. Administrators can edit most fields. Standard users may have limited editing capabilities. Always verify changes are saved.

**Q: What if a guardian's name is incorrect?**  
A: Contact your supervisor or IT. The source data may need correction in the main database before being reimported.

**Q: How long are applications kept in the system?**  
A: Applications remain in the system for the current school year. Archives are maintained according to district policy. Contact IT for historical data.

### Search and Filter

**Q: Why doesn't my search show any results?**  
A: Verify spelling, clear other filters, and try partial searches. Ensure applications have been imported.

**Q: Can I search by date?**  
A: Currently, date search may not be available directly. Use batch numbers which typically correlate with processing dates.

**Q: How do I find all unprocessed applications?**  
A: Use the Status filter and select "Blank" or "Unprocessed" (depending on system configuration).

### Letters and Printing

**Q: Can I preview a letter before printing?**  
A: Yes, generate the letter first. It will open as a PDF which you can review before printing.

**Q: What if I need to reprint a letter?**  
A: Search for the application, select it, and click "Generate Letter" again. The system will recreate the PDF.

**Q: Can I change the letter template?**  
A: Only administrators can modify letter templates. Contact IT or your supervisor if changes are needed.

**Q: How do I know which letters have been printed?**  
A: Check the Status column. Applications with "Printed" status have had their letters printed.

### Technical Questions

**Q: What browsers are supported?**  
A: Chrome, Firefox, Edge, and Safari (latest versions). Chrome is recommended for best performance.

**Q: Can I use this on a tablet or phone?**  
A: The system is optimized for desktop use. Mobile access may have limited functionality.

**Q: What if the system is slow?**  
A: See the Troubleshooting section. Clear cache, close unnecessary tabs, and check your internet connection.

**Q: Who do I contact for technical problems?**  
A: Contact EPISD IT Support or see contact information at the end of this manual.

---

## Contact & Support

### Technical Support

**EPISD IT Help Desk**
- Email: [helpdesk@episd.org](mailto:helpdesk@episd.org)
- Phone: [District IT Phone Number]
- Hours: Monday-Friday, 8:00 AM - 5:00 PM

### Application Developer

**Mario Camarena**
- Email: mvc757@gmail.com
- Role: Application Developer

### Program Administration

**Child Nutrition Services**
- Contact your campus Child Nutrition coordinator
- For program policy questions and eligibility determinations

### Reporting Issues

When reporting a problem, please provide:
1. Your name and contact information
2. Description of the issue
3. Error messages (take screenshot if possible)
4. Steps to reproduce the problem
5. Browser and operating system you're using
6. Application ID or batch number (if applicable)

### Training and Resources

**Additional Documentation:**
- System documentation available in the Documentation tab
- Test execution guides in the docs folder
- Quick reference guides for specific tasks

**Training Sessions:**
- Contact your supervisor for training opportunities
- New user orientation sessions available
- Refresher training as needed

---

## Appendix

### Keyboard Shortcuts

- `Ctrl + F` or `Cmd + F`: Browser search (find text on page)
- `F5` or `Ctrl + R`: Refresh page
- `Ctrl + P`: Print current page
- `Esc`: Close dialogs/popups

### File Locations

**Default Directories:**
- Applications Data: `public/applications.json`
- Configuration: `public/config.json`
- Letter Templates: `assets/letters.json`
- Generated Letters: `Letters/` folder (organized by batch)

### Status Codes

| Status | Meaning | Next Action |
|--------|---------|-------------|
| Blank | Not processed | Generate letter |
| Sent | Letter sent | Update to Printed when printed |
| Printed | Letter printed | Distribute letter |
| Approved | Eligibility approved | Close application |
| Denied | Eligibility denied | Close application |

### Glossary

- **AppID**: Unique application identification number
- **Batch**: Group of applications processed together
- **Campus**: School location
- **Guardian**: Parent or legal guardian of student
- **PDF**: Portable Document Format (letter file type)
- **Status**: Current state of application processing
- **SQL Server**: Database server storing application data

---

## Document Information

**Document Version**: 1.1.0  
**Last Updated**: October 28, 2025  
**Author**: Mario Camarena  
**Organization**: El Paso Independent School District  
**Purpose**: User instructions for Free and Reduced Lunch Eligibility Application system

### Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | Oct 2025 | Initial release | Mario Camarena |
| 1.1.0 | Oct 28, 2025 | Added Training Center section with Audio Learning, Video Learning, Mind Maps, Flash Cards, and Quizzes modules | Mario Camarena |

---

**End of User Manual**

For the latest version of this manual, check the application's Documentation tab or contact IT Support.

---

© 2025 El Paso Independent School District. All rights reserved.

This document contains confidential information about EPISD systems and processes. Do not distribute outside the organization without authorization.
