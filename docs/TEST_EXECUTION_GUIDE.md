# Test Execution Guide

This guide explains how to run tests in the EPISD application and how the "Run Tests" button works.

## Overview

The application includes a comprehensive Jest test suite with 146+ tests covering:
- Unit tests for components and utilities
- Integration tests for workflows
- User interaction tests
- Click event tests
- Data validation tests

## Running Tests via Command Line

### Basic Test Execution

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test:watch

# Run tests with coverage report
npm test:coverage

# Run specific test file
npm test -- SimpleTest.spec.js

# Run multiple specific test files
npm test -- ClickEvents.spec.js UserInteractions.spec.js
```

### Test Files Location

All test files are located in the `tests/` directory:

```
tests/
├── unit/
│   ├── SimpleTest.spec.js
│   ├── HomeViewSimple.spec.js
│   ├── ApplicationsData.spec.js
│   ├── ClickEvents.spec.js
│   ├── UserInteractions.spec.js
│   └── ExpectedResults.spec.js
├── integration/
│   └── ApplicationWorkflow.spec.js
└── utils/
    └── testHelpers.js
```

## Running Tests via UI

### Using the "Run Tests" Button

1. Log into the application
2. Click the **"Run Tests"** button in the navigation bar (green button with play icon)
3. A toast notification will appear showing test execution progress
4. After tests complete, you'll automatically be redirected to the Test Results dashboard
5. Click the **"Results"** button anytime to view the latest test results

### How It Works

The "Run Tests" button uses one of two approaches:

#### Approach 1: Browser-Based Simulation (Current Implementation)

The current implementation in `src/components/Navbar.vue`:

1. **Attempts to dynamically import test modules** - Tries to load test files directly in the browser
2. **Generates mock test results** - Since Jest tests are designed for Node.js, it creates simulated results based on actual test structure
3. **Stores results in localStorage** - Saves results for the TestResults component to display
4. **Navigates to results page** - Automatically shows the test dashboard

**Advantages:**
- No backend server required
- Works entirely in the browser
- Fast and simple setup

**Limitations:**
- Cannot actually execute Jest tests (Jest requires Node.js)
- Shows simulated/cached results instead of real-time execution
- Best for demonstration purposes

#### Approach 2: Backend API (Optional Advanced Setup)

For actual test execution, you can set up the optional test runner API:

**Setup:**

1. Install Express (if not already installed):
```bash
npm install express
```

2. Start the test runner server:
```bash
npm run test-runner
```

3. Keep the server running in a separate terminal

4. Update `src/components/Navbar.vue` to use the API endpoint (commented code available in the file)

**Advantages:**
- Executes actual Jest tests
- Real-time test results
- Detailed error reporting
- Production-ready solution

**API Endpoints:**

- `POST /api/run-tests` - Execute test suite and get results
- `GET /api/test-results` - Get latest test results without re-running
- `GET /api/health` - Server health check

## Test Results Format

Test results are stored in the following format:

```javascript
{
  timestamp: "2025-10-18T12:00:00.000Z",
  totalTests: 146,
  passed: 146,
  failed: 0,
  duration: "2.45s",
  details: [
    {
      suite: "SimpleTest.spec.js",
      file: "tests/unit/SimpleTest.spec.js",
      passed: 6,
      failed: 0,
      tests: [
        {
          name: "Simple arithmetic - addition",
          status: "passed",
          duration: 2
        },
        // ... more tests
      ]
    },
    // ... more test suites
  ]
}
```

## Viewing Test Results

The TestResults component (`src/components/TestResults.vue`) displays:

- **Overall Statistics** - Total tests, pass/fail counts, duration
- **Test Suites** - Organized by file/category
- **Individual Tests** - Each test with status and duration
- **Visual Indicators** - Color-coded status badges
- **Interactive Dashboard** - Expandable sections, filters, and search

## Continuous Integration

For CI/CD pipelines, use the command-line test execution:

```bash
# In CI environment
npm test -- --ci --coverage --maxWorkers=2
```

## Troubleshooting

### Tests Fail to Run via UI

**Issue:** "Run Tests" button shows error or warning

**Solution:** 
1. The UI button uses simulated results by default
2. To run actual tests, use `npm test` in terminal
3. Or set up the test runner API server (see Approach 2)

### Test Files Not Found

**Issue:** Dynamic imports fail

**Solution:**
1. Verify test files exist in `tests/` directory
2. Check file paths in `Navbar.vue` match actual file locations
3. Ensure webpack/Vite configuration allows dynamic imports

### localStorage Issues

**Issue:** Test results don't persist

**Solution:**
1. Check browser console for errors
2. Verify localStorage is not disabled in browser
3. Clear browser cache and try again

## Best Practices

1. **Run tests before committing code**
   ```bash
   npm test
   ```

2. **Watch tests during development**
   ```bash
   npm test:watch
   ```

3. **Check coverage regularly**
   ```bash
   npm test:coverage
   ```

4. **Use the UI for quick checks**
   - Click "Run Tests" button
   - View results dashboard
   - Share results with team

5. **Use CLI for CI/CD**
   - Automated test runs
   - Coverage reports
   - Integration with build pipelines

## Related Documentation

- [Test Suite Summary](../tests/TEST_SUITE_SUMMARY.md)
- [Test README](../tests/README.md)
- [Server Test Runner](../server/README.md)

## Support

For issues or questions about testing:
1. Check test output in terminal
2. Review test files in `tests/` directory
3. Check Jest configuration in `jest.config.js`
4. Verify setup in `tests/setup.js`

