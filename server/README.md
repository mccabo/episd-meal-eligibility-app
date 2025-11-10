# Test Runner API

This is a Node.js/Express server that provides an API to execute the Jest test suite and retrieve results.

## Setup

The test runner uses dependencies that are already installed in the main project:
- express
- cors
- child_process (built-in)

## Running the Test Runner

1. Start the test runner server:
```bash
npm run test-runner
```

The server will start on port 3001 (default) or the port specified in the `TEST_RUNNER_PORT` environment variable.

2. The API provides the following endpoints:

### POST /api/run-tests
Executes the Jest test suite and returns the results.

**Response:**
```json
{
  "success": true,
  "timestamp": "2025-10-18T12:00:00.000Z",
  "total": 146,
  "passed": 146,
  "failed": 0,
  "duration": "2.45s",
  "details": [
    {
      "file": "/tests/unit/HomeViewSimple.spec.js",
      "passed": 12,
      "failed": 0,
      "duration": 245,
      "tests": [...]
    }
  ]
}
```

### GET /api/test-results
Retrieves the latest test results without re-running tests.

### GET /api/health
Health check endpoint to verify the server is running.

## Integration with Vue App

The Vue application's Navbar component includes a "Run Tests" button that:
1. Calls the `/api/run-tests` endpoint
2. Displays toast notifications with progress updates
3. Stores results in localStorage
4. Navigates to the TestResults component to display the results

## Running Both Servers

To run the Vue development server and the test runner simultaneously:

1. Terminal 1 - Vue dev server:
```bash
npm run serve
```

2. Terminal 2 - Test runner API:
```bash
npm run test-runner
```

## Environment Variables

- `TEST_RUNNER_PORT` - Port for the test runner API (default: 3001)

## Notes

- The test runner executes tests using `npm test` which runs Jest
- Test results are parsed from Jest's JSON output format
- Results are cached in memory and can be retrieved via the GET endpoint
- The Vue app must be configured to proxy API requests to the test runner or CORS must be enabled

