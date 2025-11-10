# EPISD Application Test Suite

This directory contains comprehensive test suites for the EPISD (El Paso Independent School District) Free and Reduced Lunch Eligibility Application.

## Test Structure

```
tests/
├── unit/                          # Unit tests for individual components
│   ├── HomeView.spec.js          # Main component tests
│   └── ApplicationsData.spec.js  # Data structure validation tests
├── integration/                   # Integration tests for workflows
│   └── ApplicationWorkflow.spec.js # End-to-end workflow tests
├── utils/                         # Test utilities and helpers
│   └── testHelpers.js            # Helper functions for testing
├── setup.js                      # Jest test setup configuration
└── README.md                     # This file
```

## Test Coverage

### Unit Tests (`tests/unit/`)

#### HomeView.spec.js
Tests the main HomeView component including:
- Component initialization and lifecycle
- Tab navigation functionality
- Data structure handling
- Component methods (importApps, showConfig)
- Computed properties (filteredIds)
- User interactions
- Utility functions
- Error handling
- Application status filtering
- Batch processing
- Multi-language support
- Form validation and submission

#### ApplicationsData.spec.js
Validates the applications.json data structure including:
- Root data structure validation
- Application object structure
- Guardian, Student, Status, and Reasons object validation
- Data consistency checks
- Business logic validation
- Multi-language support validation
- Sample data coverage analysis

### Integration Tests (`tests/integration/`)

#### ApplicationWorkflow.spec.js
Tests complete application workflows including:
- Application loading and display
- Filtering and grouping operations
- Statistics calculation
- Application selection and batch processing
- Multi-language application processing
- Status workflow management
- Print and email workflows
- Data validation and error handling
- User interface integration
- Performance and scalability testing

### Test Utilities (`tests/utils/`)

#### testHelpers.js
Provides helper functions for testing:
- `createMockApplication()` - Creates mock application objects
- `createMockApplications()` - Creates arrays of mock applications
- `createMockSpanishApplication()` - Creates Spanish language applications
- `createMockDeniedApplication()` - Creates denied applications
- `createMockReducedPriceApplication()` - Creates reduced-price applications
- `validateApplicationStructure()` - Validates application data structure
- `filterApplications()` - Filters applications by criteria
- `groupApplicationsByBatch()` - Groups applications by batch number
- `calculateApplicationStats()` - Calculates application statistics
- `createComponentWrapper()` - Creates Vue component wrapper helpers

## Sample Data

The test suite includes comprehensive sample data from the `applications.json` file, including:

### Application Structure
```json
{
  "Date": "10/12/2025",
  "Index": "0",
  "Id": "2025951",
  "BatchNum": "1",
  "Language": "English",
  "Filename": "EPISD - Meal Application",
  "Selected": "false",
  "Sent": "false",
  "Printed": "true",
  "Guardians": [...],
  "Students": [...],
  "Status": [...],
  "Reasons": [...]
}
```

### Sample Applications Include:
- **Free Meal Applications**: Approved for free meals
- **Reduced Price Applications**: Approved for reduced-price meals
- **Denied Applications**: Applications that were denied
- **Multi-language Support**: Both English and Spanish applications
- **Various Campuses**: Different school campuses
- **Multiple Batches**: Applications grouped by batch numbers

## Running Tests

### Prerequisites
Make sure you have installed the test dependencies:
```bash
npm install
```

### Running All Tests
```bash
npm test
```

### Running Tests in Watch Mode
```bash
npm run test:watch
```

### Running Tests with Coverage
```bash
npm run test:coverage
```

### Running Specific Test Files
```bash
# Run only unit tests
npm test -- tests/unit/

# Run only integration tests
npm test -- tests/integration/

# Run specific test file
npm test -- HomeView.spec.js
```

## Test Configuration

### Jest Configuration (`jest.config.js`)
- Uses `@vue/vue3-jest` preset for Vue 3 support
- Configured for `jsdom` test environment
- Includes proper module name mapping
- Set up for component testing with Vue Test Utils

### Test Setup (`tests/setup.js`)
- Mocks global objects (console, window.location, jQuery)
- Mocks external dependencies (axios, Firebase)
- Configures Vue Test Utils global mocks
- Sets up router and route mocks

## Key Testing Features

### 1. Component Testing
- Tests Vue component lifecycle methods
- Validates component data and computed properties
- Tests user interactions and event handling
- Mocks external dependencies

### 2. Data Validation
- Validates JSON data structure integrity
- Tests business logic constraints
- Ensures data consistency across applications
- Validates multi-language support

### 3. Workflow Testing
- Tests complete application processing workflows
- Validates filtering and grouping operations
- Tests batch processing functionality
- Ensures proper error handling

### 4. Performance Testing
- Tests with large datasets (100+ applications)
- Validates filtering performance
- Tests statistics calculation efficiency
- Ensures scalability

### 5. Error Handling
- Tests graceful handling of invalid data
- Validates error states and recovery
- Tests edge cases and boundary conditions
- Ensures application stability

## Mock Data

The test suite includes comprehensive mock data that covers:
- Various application statuses (approved, denied, reduced-price)
- Multiple languages (English, Spanish)
- Different campuses and batch numbers
- Various guardian and student information
- Complete status and reason structures

## Best Practices

1. **Isolation**: Each test is isolated and doesn't depend on other tests
2. **Mocking**: External dependencies are properly mocked
3. **Coverage**: Tests cover both happy path and error scenarios
4. **Performance**: Tests include performance considerations
5. **Maintainability**: Tests are well-organized and documented
6. **Real Data**: Tests use real sample data from the application

## Contributing

When adding new tests:
1. Follow the existing test structure and naming conventions
2. Use the provided test helpers and utilities
3. Include both positive and negative test cases
4. Add appropriate documentation and comments
5. Ensure tests are isolated and don't have side effects
6. Update this README if adding new test categories or utilities

## Troubleshooting

### Common Issues

1. **Import Errors**: Make sure all dependencies are installed
2. **Mock Issues**: Check that mocks are properly configured in setup.js
3. **Vue Component Issues**: Ensure Vue Test Utils is properly configured
4. **Data Issues**: Verify that sample data files are accessible

### Debug Mode
Run tests with verbose output:
```bash
npm test -- --verbose
```

### Coverage Issues
If coverage is low, check:
- Are all code paths being tested?
- Are error conditions being tested?
- Are edge cases being covered?
