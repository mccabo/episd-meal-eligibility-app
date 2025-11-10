// server.js (using Express)
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse URL-encoded bodies (for form data)
app.use(express.urlencoded({ extended: true }));

app.post('/submit_data', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Process the data (e.g., save to a database, perform validation)
  console.log('Received username:', username);
  console.log('Received password:', password);

  // Send a response back to the client
  res.send('Form submitted successfully!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
