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
7. [Troubleshooting](#troubleshooting)
8. [Best Practices](#best-practices)
9. [FAQ](#faq)
10. [Contact & Support](#contact--support)

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

**Document Version**: 1.0.0  
**Last Updated**: October 19, 2025  
**Author**: Mario Camarena  
**Organization**: El Paso Independent School District  
**Purpose**: User instructions for Free and Reduced Lunch Eligibility Application system

### Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | Oct 2025 | Initial release | Mario Camarena |

---

**End of User Manual**

For the latest version of this manual, check the application's Documentation tab or contact IT Support.

---

© 2025 El Paso Independent School District. All rights reserved.

This document contains confidential information about EPISD systems and processes. Do not distribute outside the organization without authorization.
