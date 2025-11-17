const fs = require('fs');
const path = require('path');

// File paths
const EMAIL_CSV_PATH = path.join(__dirname, 'emails.csv');
const SQL_APPS_PATH = path.join(__dirname, 'public', 'sqlApps.json');
const APPLICATIONS_PATH = path.join(__dirname, 'public', 'applications.json');

// Function to read and parse CSV file
function readEmailCSV(filePath) {
    try {
        const csvContent = fs.readFileSync(filePath, 'utf-8');
        const lines = csvContent.trim().split('\n');
        
        // Extract app IDs from first column
        const appIds = lines.map(line => {
            const columns = line.split(',');
            return columns[0].trim();
        });
        
        console.log(`📧 Found ${appIds.length} app IDs in emails.csv`);
        return appIds;
    } catch (error) {
        console.error('❌ Error reading emails.csv:', error.message);
        return [];
    }
}

// Function to read JSON file
function readJSON(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(content);
    } catch (error) {
        console.error(`❌ Error reading ${path.basename(filePath)}:`, error.message);
        return null;
    }
}

// Function to write JSON file
function writeJSON(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf-8');
        return true;
    } catch (error) {
        console.error(`❌ Error writing ${path.basename(filePath)}:`, error.message);
        return false;
    }
}

// Main import function
function importApplications() {
    console.log('🚀 Starting application import process...\n');
    
    // Step 1: Read email CSV to get app IDs
    const emailAppIds = readEmailCSV(EMAIL_CSV_PATH);
    if (emailAppIds.length === 0) {
        console.log('⚠️  No app IDs found in emails.csv');
        return;
    }
    
    // Step 2: Read sqlApps.json
    const sqlAppsData = readJSON(SQL_APPS_PATH);
    if (!sqlAppsData || !sqlAppsData.Applications) {
        console.log('⚠️  Could not read sqlApps.json');
        return;
    }
    console.log(`📦 Loaded ${sqlAppsData.Applications.length} applications from sqlApps.json\n`);
    
    // Step 3: Read applications.json
    let applicationsData = readJSON(APPLICATIONS_PATH);
    if (!applicationsData) {
        // If file doesn't exist or is invalid, create new structure
        applicationsData = { Applications: [] };
        console.log('📝 Creating new applications.json structure');
    }
    
    if (!applicationsData.Applications) {
        applicationsData.Applications = [];
    }
    
    // Create a Set of existing app IDs in applications.json for quick lookup
    const existingAppIds = new Set(
        applicationsData.Applications.map(app => app.Id)
    );
    console.log(`📋 Current applications.json has ${existingAppIds.size} applications\n`);
    
    // Step 4: Process each app ID from emails.csv
    let importedCount = 0;
    let skippedCount = 0;
    let notFoundCount = 0;
    
    console.log('🔄 Processing applications...\n');
    
    emailAppIds.forEach(appId => {
        // Check if app is already in applications.json
        if (existingAppIds.has(appId)) {
            console.log(`⏭️  App ID ${appId} - Already exists in applications.json (skipped)`);
            skippedCount++;
            return;
        }
        
        // Find the application in sqlApps.json
        const appFromSQL = sqlAppsData.Applications.find(app => app.Id === appId);
        
        if (appFromSQL) {
            // Import the application
            applicationsData.Applications.push(appFromSQL);
            existingAppIds.add(appId);
            console.log(`✅ App ID ${appId} - Imported from sqlApps.json`);
            importedCount++;
        } else {
            console.log(`❌ App ID ${appId} - Not found in sqlApps.json`);
            notFoundCount++;
        }
    });
    
    // Step 5: Save updated applications.json if any imports were made
    if (importedCount > 0) {
        console.log(`\n💾 Saving ${importedCount} new application(s) to applications.json...`);
        
        // Update Index values to be sequential
        applicationsData.Applications.forEach((app, index) => {
            app.Index = index.toString();
        });
        
        if (writeJSON(APPLICATIONS_PATH, applicationsData)) {
            console.log('✅ Successfully saved applications.json');
        }
    }
    
    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 IMPORT SUMMARY');
    console.log('='.repeat(50));
    console.log(`✅ Imported: ${importedCount} application(s)`);
    console.log(`⏭️  Skipped (already exists): ${skippedCount} application(s)`);
    console.log(`❌ Not found in sqlApps.json: ${notFoundCount} application(s)`);
    console.log(`📋 Total in applications.json: ${applicationsData.Applications.length} application(s)`);
    console.log('='.repeat(50));
    
    if (importedCount > 0) {
        console.log('\n🎉 Import process completed successfully!');
    } else {
        console.log('\n✨ No new applications to import.');
    }
}

// Run the import
importApplications();

