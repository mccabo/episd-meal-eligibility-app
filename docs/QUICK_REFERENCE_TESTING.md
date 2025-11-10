# Testing Quick Reference Card

## Command Line

```bash
# Run all tests
npm test

# Watch mode
npm test:watch

# Coverage report
npm test:coverage

# Specific test file
npm test -- SimpleTest.spec.js

# Test pattern
npm test -- --testNamePattern="click"

# Verbose output
npm test -- --verbose
```

## UI Testing

| Action | Button | Location |
|--------|--------|----------|
| Run Tests | Green "Run Tests" button | Navigation bar (top right) |
| View Results | Blue "Results" button | Navigation bar (top right) |

### Quick Steps
1. Click **"Run Tests"** (green button)
2. Wait for "Tests Complete" toast
3. View results automatically or click **"Results"**

## Test Files

| File | Location | Tests | Purpose |
|------|----------|-------|---------|
| SimpleTest.spec.js | tests/unit/ | 6 | Basic operations |
| HomeViewSimple.spec.js | tests/unit/ | 12 | Component tests |
| ApplicationsData.spec.js | tests/unit/ | 25 | Data validation |
| ClickEvents.spec.js | tests/unit/ | 35 | Click interactions |
| UserInteractions.spec.js | tests/unit/ | 38 | User events |
| ExpectedResults.spec.js | tests/unit/ | 20 | Result validation |
| ApplicationWorkflow.spec.js | tests/integration/ | 10 | Integration tests |

**Total:** 146+ tests

## Test Result Format

```javascript
{
  totalTests: 146,
  passed: 146,
  failed: 0,
  duration: "2.45s",
  details: [/* test suites */]
}
```

## Coverage Goals

| Metric | Target | Command |
|--------|--------|---------|
| Statements | >80% | `npm test:coverage` |
| Branches | >75% | `npm test:coverage` |
| Functions | >80% | `npm test:coverage` |
| Lines | >80% | `npm test:coverage` |

## Common Commands

```bash
# Clear Jest cache
npx jest --clearCache

# Update snapshots
npm test -- -u

# Run in band (sequential)
npm test -- --runInBand

# Detect open handles
npm test -- --detectOpenHandles

# Force exit
npm test -- --forceExit

# Silent mode
npm test -- --silent
```

## Debugging

```bash
# Node debugger
node --inspect-brk node_modules/.bin/jest --runInBand

# Then open: chrome://inspect
```

## File Locations

| Item | Path |
|------|------|
| Tests | `tests/` |
| Config | `jest.config.js` |
| Setup | `tests/setup.js` |
| Helpers | `tests/utils/testHelpers.js` |
| Coverage | `coverage/lcov-report/index.html` |
| Results Component | `src/components/TestResults.vue` |
| Run Button | `src/components/Navbar.vue` (line 129) |

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Tests fail | Run `npm test` in terminal for details |
| Import errors | Check test file paths |
| Timeout | Increase with `--testTimeout=10000` |
| Cache issues | Run `npx jest --clearCache` |
| Watch not working | Use `--no-watchman` flag |

## Quick Links

- [Full Testing Docs](../TESTING.md)
- [Execution Guide](./TEST_EXECUTION_GUIDE.md)
- [Implementation Details](./RUN_TESTS_IMPLEMENTATION.md)
- [Test Summary](../tests/TEST_SUITE_SUMMARY.md)

## Toast Notifications

| Type | Message | Meaning |
|------|---------|---------|
| Info (Blue) | "Running Tests" | Test execution started |
| Success (Green) | "Tests Complete" | All tests passed |
| Warning (Yellow) | "Test Execution Info" | Using cached/simulated results |
| Error (Red) | "Connection Error" | Backend unavailable |

## Keyboard Shortcuts (in Watch Mode)

| Key | Action |
|-----|--------|
| `a` | Run all tests |
| `f` | Run only failed tests |
| `p` | Filter by filename |
| `t` | Filter by test name |
| `q` | Quit watch mode |
| `Enter` | Trigger test run |

## Best Practices

✅ **DO:**
- Run tests before committing
- Use watch mode during development
- Check coverage regularly
- Write descriptive test names
- Test one thing per test

❌ **DON'T:**
- Skip failing tests
- Commit without running tests
- Ignore coverage drops
- Write tests that depend on each other
- Test implementation details

## CI/CD

```bash
# For continuous integration
npm test -- --ci --coverage --maxWorkers=2
```

## Environment Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| TEST_RUNNER_PORT | API port | 3001 |
| NODE_ENV | Environment | test |
| CI | CI mode flag | false |

---

**Quick Help:** Run `npm test -- --help` for all Jest options

**Last Updated:** October 18, 2025

