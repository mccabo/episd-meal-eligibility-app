const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.TEST_RUNNER_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Store latest test results
let latestTestResults = null;

// API endpoint to run tests
app.post('/api/run-tests', (req, res) => {
  console.log('Received request to run tests...');
  
  const startTime = Date.now();
  
  // Execute Jest tests
  exec('npm test -- --json --outputFile=test-results.json', {
    cwd: path.join(__dirname, '..'),
    maxBuffer: 1024 * 1024 * 10 // 10MB buffer
  }, (error, stdout, stderr) => {
    const duration = Date.now() - startTime;
    
    try {
      // Parse Jest output
      let testResults = null;
      
      // Try to parse JSON output from stdout
      if (stdout) {
        const jsonMatch = stdout.match(/\{[\s\S]*"testResults"[\s\S]*\}/);
        if (jsonMatch) {
          testResults = JSON.parse(jsonMatch[0]);
        }
      }
      
      if (testResults) {
        const passed = testResults.numPassedTests || 0;
        const failed = testResults.numFailedTests || 0;
        const total = testResults.numTotalTests || 0;
        
        const details = testResults.testResults.map(file => ({
          file: file.name.replace(process.cwd(), ''),
          passed: file.numPassingTests,
          failed: file.numFailingTests,
          duration: file.perfStats.runtime,
          tests: file.testResults.map(test => ({
            name: test.fullName,
            status: test.status,
            duration: test.duration,
            error: test.failureMessages.length > 0 ? test.failureMessages.join('\n') : null
          }))
        }));
        
        const response = {
          success: failed === 0,
          timestamp: new Date().toISOString(),
          total,
          passed,
          failed,
          duration: `${(duration / 1000).toFixed(2)}s`,
          details
        };
        
        latestTestResults = response;
        
        res.json(response);
      } else {
        // Fallback: parse text output
        const passedMatch = stdout.match(/Tests:\s+(\d+)\s+passed/);
        const failedMatch = stdout.match(/(\d+)\s+failed/);
        const totalMatch = stdout.match(/(\d+)\s+total/);
        
        const passed = passedMatch ? parseInt(passedMatch[1]) : 0;
        const failed = failedMatch ? parseInt(failedMatch[1]) : 0;
        const total = totalMatch ? parseInt(totalMatch[1]) : passed + failed;
        
        const response = {
          success: failed === 0 && !error,
          timestamp: new Date().toISOString(),
          total,
          passed,
          failed,
          duration: `${(duration / 1000).toFixed(2)}s`,
          details: [],
          output: stdout,
          error: error ? error.message : null
        };
        
        latestTestResults = response;
        
        res.json(response);
      }
    } catch (parseError) {
      console.error('Error parsing test results:', parseError);
      
      res.json({
        success: false,
        timestamp: new Date().toISOString(),
        total: 0,
        passed: 0,
        failed: 0,
        duration: `${(duration / 1000).toFixed(2)}s`,
        details: [],
        error: `Failed to parse test results: ${parseError.message}`,
        output: stdout,
        stderr: stderr
      });
    }
  });
});

// API endpoint to get latest test results
app.get('/api/test-results', (req, res) => {
  if (latestTestResults) {
    res.json(latestTestResults);
  } else {
    res.status(404).json({
      success: false,
      error: 'No test results available. Run tests first.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Test runner API is running' });
});

app.listen(PORT, () => {
  console.log(`Test runner API listening on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Run tests: POST http://localhost:${PORT}/api/run-tests`);
  console.log(`Get results: GET http://localhost:${PORT}/api/test-results`);
});

