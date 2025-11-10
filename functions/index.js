const functions = require('firebase-functions/v1'); // Use v1 (1st Gen functions)
const admin = require('firebase-admin');

// Initialize Firebase Admin
admin.initializeApp();

// Export an empty object or placeholder function
// This allows the functions directory to exist without deploying specific functions
exports.placeholder = functions.https.onRequest((req, res) => {
  res.json({ 
    message: 'Firebase Functions placeholder - use local server.js for application endpoints' 
  });
});

