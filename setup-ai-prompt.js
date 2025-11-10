/**
 * AI Prompt Component Setup Script
 * 
 * This script helps you set up the AI Prompt component
 * Run with: node setup-ai-prompt.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n🤖 AI Prompt Component Setup\n');
console.log('This script will help you configure the AI Prompt component.\n');

// Check if files exist
const filesToCheck = [
  { path: 'src/components/AIPrompt.vue', name: 'Vue Component' },
  { path: 'server.js', name: 'Server File' },
  { path: 'src/router/index.js', name: 'Router File' },
  { path: 'AI_PROMPT_SETUP_GUIDE.md', name: 'Setup Guide' },
  { path: 'AI_PROMPT_QUICKSTART.md', name: 'Quick Start Guide' },
  { path: 'test-ai-prompt.html', name: 'Test HTML' }
];

console.log('✓ Checking installation files...\n');

let allFilesExist = true;
filesToCheck.forEach(file => {
  const exists = fs.existsSync(file.path);
  const status = exists ? '✓' : '✗';
  const color = exists ? '\x1b[32m' : '\x1b[31m';
  console.log(`${color}${status}\x1b[0m ${file.name}: ${file.path}`);
  if (!exists) allFilesExist = false;
});

if (!allFilesExist) {
  console.log('\n\x1b[31m✗ Some files are missing. Please check the installation.\x1b[0m\n');
  rl.close();
  process.exit(1);
}

console.log('\n\x1b[32m✓ All files are installed correctly!\x1b[0m\n');

// Check if dependencies are installed
console.log('Checking dependencies...\n');

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const requiredDeps = ['firebase-admin', 'dotenv'];
const optionalDeps = ['openai'];

requiredDeps.forEach(dep => {
  if (packageJson.dependencies && packageJson.dependencies[dep]) {
    console.log(`\x1b[32m✓\x1b[0m ${dep} (installed)`);
  } else {
    console.log(`\x1b[33m⚠\x1b[0m ${dep} (not installed - run: npm install ${dep})`);
  }
});

console.log('\nOptional dependencies for AI features:');
optionalDeps.forEach(dep => {
  if (packageJson.dependencies && packageJson.dependencies[dep]) {
    console.log(`\x1b[32m✓\x1b[0m ${dep} (installed)`);
  } else {
    console.log(`\x1b[33m○\x1b[0m ${dep} (not installed - run: npm install ${dep})`);
  }
});

console.log('\n' + '='.repeat(60) + '\n');

// Interactive setup
function ask(question) {
  return new Promise(resolve => {
    rl.question(question, answer => {
      resolve(answer);
    });
  });
}

async function setup() {
  console.log('🔧 Configuration Options:\n');
  
  const configureNow = await ask('Would you like to configure Firebase Admin now? (y/n): ');
  
  if (configureNow.toLowerCase() === 'y') {
    console.log('\nFirebase Admin Setup:\n');
    console.log('1. Go to Firebase Console: https://console.firebase.google.com/');
    console.log('2. Select project: freeandreduced-ac6d8');
    console.log('3. Go to Project Settings > Service Accounts');
    console.log('4. Click "Generate New Private Key"');
    console.log('5. Save the JSON file to this directory\n');
    
    const firebasePath = await ask('Enter the path to your Firebase Admin SDK JSON file (or press Enter to skip): ');
    
    if (firebasePath && fs.existsSync(firebasePath)) {
      console.log('\x1b[32m✓ Firebase Admin SDK file found!\x1b[0m');
      console.log('\nTo use it, set the environment variable:');
      console.log(`  Windows PowerShell: $env:GOOGLE_APPLICATION_CREDENTIALS="${firebasePath}"`);
      console.log(`  Windows CMD: set GOOGLE_APPLICATION_CREDENTIALS=${firebasePath}`);
      console.log(`  Linux/Mac: export GOOGLE_APPLICATION_CREDENTIALS="${firebasePath}"\n`);
    } else if (firebasePath) {
      console.log('\x1b[33m⚠ File not found. Please check the path.\x1b[0m\n');
    }
  }
  
  const configureOpenAI = await ask('\nWould you like to configure OpenAI? (y/n): ');
  
  if (configureOpenAI.toLowerCase() === 'y') {
    console.log('\nOpenAI Setup:\n');
    console.log('1. Get your API key from: https://platform.openai.com/api-keys');
    console.log('2. Set the environment variable with your API key\n');
    
    const hasKey = await ask('Do you have an OpenAI API key ready? (y/n): ');
    
    if (hasKey.toLowerCase() === 'y') {
      console.log('\nTo use it, set the environment variable:');
      console.log('  Windows PowerShell: $env:OPENAI_API_KEY="your-key-here"');
      console.log('  Windows CMD: set OPENAI_API_KEY=your-key-here');
      console.log('  Linux/Mac: export OPENAI_API_KEY="your-key-here"\n');
      console.log('Also uncomment the OpenAI code in server.js (lines ~2904-2916)\n');
    }
  }
  
  console.log('\n' + '='.repeat(60) + '\n');
  console.log('📚 Next Steps:\n');
  console.log('1. Install any missing dependencies: npm install');
  console.log('2. Start the server: node server.js');
  console.log('3. Start Vue dev server: npm run serve');
  console.log('4. Navigate to: http://localhost:8080/ai-prompt');
  console.log('5. (Make sure you\'re logged in!)\n');
  
  console.log('📖 Documentation:');
  console.log('  - Quick Start: AI_PROMPT_QUICKSTART.md');
  console.log('  - Full Guide: AI_PROMPT_SETUP_GUIDE.md');
  console.log('  - Test Page: test-ai-prompt.html\n');
  
  console.log('💡 Pro Tip: You can test without any API keys using mock responses!\n');
  
  const openDocs = await ask('Would you like to open the Quick Start guide? (y/n): ');
  
  if (openDocs.toLowerCase() === 'y') {
    const { exec } = require('child_process');
    const platform = process.platform;
    const file = 'AI_PROMPT_QUICKSTART.md';
    
    let command;
    if (platform === 'win32') {
      command = `start ${file}`;
    } else if (platform === 'darwin') {
      command = `open ${file}`;
    } else {
      command = `xdg-open ${file}`;
    }
    
    exec(command, (error) => {
      if (error) {
        console.log('\nCouldn\'t open the file automatically.');
        console.log(`Please open: ${file}\n`);
      } else {
        console.log('\n✓ Opening Quick Start guide...\n');
      }
    });
  }
  
  console.log('\x1b[32m✓ Setup complete!\x1b[0m');
  console.log('Happy coding! 🚀\n');
  
  rl.close();
}

setup().catch(error => {
  console.error('Error during setup:', error);
  rl.close();
  process.exit(1);
});

