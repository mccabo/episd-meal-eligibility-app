# Testing Documentation

This document provides a comprehensive overview of testing in the EPISD Application.

## Table of Contents

- [Quick Start](#quick-start)
- [Test Suite Overview](#test-suite-overview)
- [Running Tests](#running-tests)
- [UI Test Execution](#ui-test-execution)
- [Test Structure](#test-structure)
- [Writing Tests](#writing-tests)
- [Coverage Reports](#coverage-reports)

## Quick Start

### Command Line

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test:watch

# Generate coverage report
npm test:coverage
```

### User Interface

1. Launch the application: `npm run serve`
2. Log in to the application
3. Click the **"Run Tests"** button (green button with play icon) in the navigation bar
4. View results in the automatically opened Test Results dashboard
5. Or click **"Results"** button anytime to view cached results

## Test Suite Overview

The application includes **146+ tests** organized into:

### Unit Tests (`tests/unit/`)

- **SimpleTest.spec.js** (6 tests)
  - Basic arithmetic operations
  - Array operations
  - String operations

- **HomeViewSimple.spec.js** (12 tests)
  - Component initialization
  - Tab management
  - Data validation
  - State management

- **ApplicationsData.spec.js** (25 tests)
  - JSON data structure validation
  - Required field verification
  - Status value validation
  - Data integrity checks

- **ClickEvents.spec.js** (35 tests)
  - Button click interactions
  - Navigation events
  - Form submissions
  - Event propagation

- **UserInteractions.spec.js** (38 tests)
  - Keyboard events (Enter, Escape, Tab, etc.)
  - Mouse events (click, hover, drag)
  - Form input interactions
  - Touch events

- **ExpectedResults.spec.js** (20 tests)
  - Data validation outcomes
  - Computed property results
  - Method return values
  - Edge case handling

### Integration Tests (`tests/integration/`)

- **ApplicationWorkflow.spec.js** (10 tests)
  - Complete application workflows
  - Multi-step processes
  - Error handling flows
  - State transitions

## Running Tests

### Command Line Execution

#### Basic Commands

```bash
# Run all tests
npm test

# Run with verbose output
npm test -- --verbose

# Run specific test file
npm test -- SimpleTest.spec.js

# Run multiple test files
npm test -- ClickEvents.spec.js UserInteractions.spec.js

# Run tests matching a pattern
npm test -- --testNamePattern="click"
```

#### Watch Mode

```bash
# Watch all tests
npm test:watch

# Watch specific file
npm test -- --watch SimpleTest.spec.js
```

#### Coverage Reports

```bash
# Generate coverage report
npm test:coverage

# Open coverage report in browser
# (after running coverage, open coverage/lcov-report/index.html)
```

### Configuration

Tests are configured via `jest.config.js`:

```javascript
module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest'
  },
  // ... more configuration
}
```

## UI Test Execution

### Using the Run Tests Button

The application includes a built-in test execution interface accessible from the navigation bar.

#### Features:

1. **One-Click Execution**
   - Green "Run Tests" button with play icon
   - Toast notifications for progress
   - Automatic navigation to results

2. **Results Dashboard**
   - Blue "Results" button with chart icon
   - Visual statistics and charts
   - Expandable test suite details
   - Individual test status indicators

3. **Real-Time Feedback**
   - Toast notifications during execution
   - Progress indicators
   - Success/failure summaries

#### Implementation Details:

The test execution button in `src/components/Navbar.vue`:

```javascript
const runTests = async () => {
  // Shows toast notification
  toast.add({ 
    severity: 'info', 
    summary: 'Running Tests', 
    detail: 'Starting test suite execution...'
  })
  
  // Attempts to load test modules
  // Generates results
  // Stores in localStorage
  // Navigates to results page
}
```

### Test Results Component

Located at `src/components/TestResults.vue`, the dashboard displays:

- **Header Statistics**
  - Total tests executed
  - Pass/fail counts
  - Success rate percentage
  - Execution duration

- **Test Suite Cards**
  - Organized by file
  - Suite-level statistics
  - Color-coded status
  - Expandable test lists

- **Individual Test Details**
  - Test name and description
  - Execution duration
  - Status badge (passed/failed)
  - Error messages (if failed)

- **Visual Elements**
  - Progress bars
  - Status icons
  - Color-coded badges
  - Interactive charts

## Test Structure

### Directory Layout

```
tests/
├── unit/                      # Unit tests
│   ├── SimpleTest.spec.js
│   ├── HomeViewSimple.spec.js
│   ├── ApplicationsData.spec.js
│   ├── ClickEvents.spec.js
│   ├── UserInteractions.spec.js
│   └── ExpectedResults.spec.js
├── integration/               # Integration tests
│   └── ApplicationWorkflow.spec.js
├── utils/                     # Test utilities
│   └── testHelpers.js
├── setup.js                   # Jest setup
├── README.md                  # Test documentation
└── TEST_SUITE_SUMMARY.md     # Detailed test summary
```

### Test File Structure

Each test file follows this structure:

```javascript
const sampleFunction = require('../../src/utils/sampleFunction')

describe('Feature Name', () => {
  describe('Specific Functionality', () => {
    test('should perform expected behavior', () => {
      // Arrange
      const input = 'test'
      
      // Act
      const result = sampleFunction(input)
      
      // Assert
      expect(result).toBe('expected')
    })
  })
})
```

## Writing Tests

### Best Practices

1. **Use Descriptive Names**
   ```javascript
   test('should validate email format correctly', () => {
     // ...
   })
   ```

2. **Follow AAA Pattern**
   - **Arrange** - Set up test data
   - **Act** - Execute the code
   - **Assert** - Verify the result

3. **Test One Thing**
   - Each test should verify a single behavior
   - Keep tests focused and simple

4. **Use Test Helpers**
   ```javascript
   const { createMockApplication } = require('../utils/testHelpers')
   
   test('should process application', () => {
     const app = createMockApplication({ status: 'approved' })
     // ...
   })
   ```

5. **Mock External Dependencies**
   ```javascript
   jest.mock('@/api/applications')
   ```

### Adding New Tests

1. Create a new test file:
   ```bash
   tests/unit/YourFeature.spec.js
   ```

2. Write test structure:
   ```javascript
   const featureModule = require('../../src/features/yourFeature')
   
   describe('Your Feature', () => {
     describe('specific functionality', () => {
       test('should work as expected', () => {
         expect(featureModule.method()).toBe(expected)
       })
     })
   })
   ```

3. Run the new tests:
   ```bash
   npm test -- YourFeature.spec.js
   ```

4. Verify coverage:
   ```bash
   npm test:coverage
   ```

## Coverage Reports

### Generating Coverage

```bash
npm test:coverage
```

This creates a `coverage/` directory with:
- `lcov-report/index.html` - Interactive HTML report
- `coverage.json` - JSON coverage data
- `lcov.info` - LCOV format for CI tools

### Viewing Coverage

Open `coverage/lcov-report/index.html` in a browser to see:
- Overall coverage percentages
- File-by-file breakdown
- Line-by-line coverage visualization
- Uncovered code highlighting

### Coverage Goals

Target coverage levels:
- **Statements:** >80%
- **Branches:** >75%
- **Functions:** >80%
- **Lines:** >80%

## Continuous Integration

### CI Configuration

For automated testing in CI/CD pipelines:

```yaml
# Example GitHub Actions
- name: Run Tests
  run: npm test -- --ci --coverage --maxWorkers=2

- name: Upload Coverage
  uses: codecov/codecov-action@v2
  with:
    file: ./coverage/coverage-final.json
```

### Pre-commit Hooks

Set up Git hooks to run tests before commit:

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm test"
    }
  }
}
```

## Troubleshooting

### Common Issues

**Issue: Tests fail with "Cannot find module"**
```bash
# Solution: Clear Jest cache
npx jest --clearCache
npm test
```

**Issue: Tests timeout**
```bash
# Solution: Increase timeout
npm test -- --testTimeout=10000
```

**Issue: Watch mode not detecting changes**
```bash
# Solution: Disable watchman
npm test:watch -- --no-watchman
```

### Debug Mode

Run tests with Node debugger:

```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

Then open `chrome://inspect` in Chrome.

## Additional Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Vue Test Utils](https://test-utils.vuejs.org/)
- [Test Execution Guide](./docs/TEST_EXECUTION_GUIDE.md)
- [Test Suite Summary](./tests/TEST_SUITE_SUMMARY.md)

## Support

For testing issues:
1. Check console output for detailed error messages
2. Review test configuration in `jest.config.js`
3. Verify test setup in `tests/setup.js`
4. Check individual test files for syntax errors
5. Run with `--verbose` flag for more details

---

**Last Updated:** October 18, 2025  
**Test Coverage:** 146+ tests  
**Framework:** Jest + Vue Test Utils

