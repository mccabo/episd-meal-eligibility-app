// Firebase Functions Configuration
// Update these URLs after deploying your functions to Firebase

// Development mode - set to true to use local emulator
const USE_LOCAL_EMULATOR = false;

// Your Firebase project ID (from firebase.json or Firebase Console)
const FIREBASE_PROJECT_ID = 'freeandreduced-ac6d8';

// Firebase region where functions are deployed (default: us-central1)
const FIREBASE_REGION = 'us-central1';

// Determine the base URL based on environment
const FUNCTIONS_BASE_URL = USE_LOCAL_EMULATOR
  ? 'http://localhost:5001/freeandreduced-ac6d8/us-central1'
  : `https://${FIREBASE_REGION}-${FIREBASE_PROJECT_ID}.cloudfunctions.net`;

// Export function endpoints
export const FIREBASE_FUNCTIONS = {
  downloadImage: `${FUNCTIONS_BASE_URL}/downloadImage`,
  aiPrompt: `${FUNCTIONS_BASE_URL}/aiPrompt`,
};

export default FIREBASE_FUNCTIONS;

