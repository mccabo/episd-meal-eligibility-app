# Test Execution Flow Diagram

## Overview

This document provides visual representations of the test execution flow in the EPISD application.

## UI Test Execution Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
└─────────────────────────────────────────────────────────────────┘
                                │
                                │ 1. User clicks
                                ▼
                    ┌─────────────────────┐
                    │   "Run Tests"       │
                    │   Button            │
                    │   (Navbar.vue)      │
                    └─────────────────────┘
                                │
                                │ 2. Triggers
                                ▼
                    ┌─────────────────────┐
                    │   runTests()        │
                    │   Function          │
                    └─────────────────────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
                    ▼                       ▼
        ┌───────────────────┐   ┌───────────────────┐
        │ Toast Notification│   │ Dynamic Import    │
        │ "Running Tests"   │   │ Test Modules      │
        └───────────────────┘   └───────────────────┘
                                            │
                                            │ 3. Load
                                            ▼
                                ┌───────────────────┐
                                │ Test Files:       │
                                │ - SimpleTest      │
                                │ - HomeViewSimple  │
                                │ - ApplicationsData│
                                │ - ClickEvents     │
                                │ - UserInteractions│
                                │ - ExpectedResults │
                                │ - AppWorkflow     │
                                └───────────────────┘
                                            │
                                            │ 4. Generate
                                            ▼
                                ┌───────────────────┐
                                │ Test Results      │
                                │ Object            │
                                │ {                 │
                                │   passed: 146,    │
                                │   failed: 0,      │
                                │   ...             │
                                │ }                 │
                                └───────────────────┘
                                            │
                    ┌───────────────────────┴───────────────────────┐
                    │                       │                       │
                    ▼                       ▼                       ▼
        ┌───────────────┐       ┌───────────────┐       ┌───────────────┐
        │ localStorage  │       │ Toast         │       │ Navigation    │
        │ .setItem()    │       │ "Tests        │       │ setTimeout()  │
        │               │       │  Complete"    │       │               │
        └───────────────┘       └───────────────┘       └───────────────┘
                                                                    │
                                                                    │ 5. Navigate
                                                                    ▼
                                                        ┌───────────────────┐
                                                        │ TestResults.vue   │
                                                        │ Component         │
                                                        └───────────────────┘
                                                                    │
                                                                    │ 6. Read
                                                                    ▼
                                                        ┌───────────────────┐
                                                        │ localStorage      │
                                                        │ .getItem()        │
                                                        └───────────────────┘
                                                                    │
                                                                    │ 7. Display
                                                                    ▼
                                                        ┌───────────────────┐
                                                        │ Test Results      │
                                                        │ Dashboard         │
                                                        │ - Statistics      │
                                                        │ - Test Suites     │
                                                        │ - Individual Tests│
                                                        └───────────────────┘
```

## Command Line Test Execution Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         TERMINAL                                │
└─────────────────────────────────────────────────────────────────┘
                                │
                                │ User runs
                                ▼
                    ┌─────────────────────┐
                    │   npm test          │
                    └─────────────────────┘
                                │
                                │ Executes
                                ▼
                    ┌─────────────────────┐
                    │   jest              │
                    │   (Test Runner)     │
                    └─────────────────────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
                    ▼                       ▼
        ┌───────────────────┐   ┌───────────────────┐
        │ Read              │   │ Load              │
        │ jest.config.js    │   │ tests/setup.js    │
        └───────────────────┘   └───────────────────┘
                                            │
                                            │ Initialize
                                            ▼
                                ┌───────────────────┐
                                │ Test Environment  │
                                │ - jsdom           │
                                │ - Mocks           │
                                │ - Global config   │
                                └───────────────────┘
                                            │
                                            │ Run
                                            ▼
                    ┌───────────────────────────────────┐
                    │ Execute Test Files in Parallel    │
                    ├───────────────────────────────────┤
                    │ tests/unit/SimpleTest.spec.js     │
                    │ tests/unit/HomeViewSimple.spec.js │
                    │ tests/unit/ApplicationsData.spec.js│
                    │ tests/unit/ClickEvents.spec.js    │
                    │ tests/unit/UserInteractions.spec.js│
                    │ tests/unit/ExpectedResults.spec.js│
                    │ tests/integration/AppWorkflow.spec.js│
                    └───────────────────────────────────┘
                                            │
                                            │ Collect
                                            ▼
                                ┌───────────────────┐
                                │ Test Results      │
                                │ - Pass/Fail       │
                                │ - Duration        │
                                │ - Coverage        │
                                │ - Errors          │
                                └───────────────────┘
                                            │
                                            │ Output
                                            ▼
                                ┌───────────────────┐
                                │ Terminal Display  │
                                │                   │
                                │ PASS tests/...    │
                                │ PASS tests/...    │
                                │                   │
                                │ Tests: 146 passed │
                                │ Time:  2.45s      │
                                └───────────────────┘
```

## Backend API Test Execution Flow (Optional)

```
┌─────────────────────────────────────────────────────────────────┐
│                         BROWSER                                 │
└─────────────────────────────────────────────────────────────────┘
                                │
                                │ 1. User clicks
                                ▼
                    ┌─────────────────────┐
                    │   "Run Tests"       │
                    │   Button            │
                    └─────────────────────┘
                                │
                                │ 2. HTTP POST
                                ▼
                    ┌─────────────────────┐
                    │ fetch()             │
                    │ /api/run-tests      │
                    └─────────────────────┘
                                │
                                │ 3. Request
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                         BACKEND SERVER                          │
│                      (server/test-runner.js)                    │
└─────────────────────────────────────────────────────────────────┘
                                │
                                │ 4. Receives
                                ▼
                    ┌─────────────────────┐
                    │ Express Route       │
                    │ POST /api/run-tests │
                    └─────────────────────┘
                                │
                                │ 5. Execute
                                ▼
                    ┌─────────────────────┐
                    │ child_process.exec()│
                    │ "npm test"          │
                    └─────────────────────┘
                                │
                                │ 6. Spawn
                                ▼
                    ┌─────────────────────┐
                    │ Node.js Process     │
                    │ Jest Test Runner    │
                    └─────────────────────┘
                                │
                                │ 7. Execute Tests
                                ▼
                    ┌─────────────────────┐
                    │ All Test Files      │
                    │ (Real Execution)    │
                    └─────────────────────┘
                                │
                                │ 8. Collect Output
                                ▼
                    ┌─────────────────────┐
                    │ Parse JSON Results  │
                    │ - stdout            │
                    │ - stderr            │
                    │ - exit code         │
                    └─────────────────────┘
                                │
                                │ 9. Format Response
                                ▼
                    ┌─────────────────────┐
                    │ JSON Response       │
                    │ {                   │
                    │   success: true,    │
                    │   total: 146,       │
                    │   passed: 146,      │
                    │   details: [...]    │
                    │ }                   │
                    └─────────────────────┘
                                │
                                │ 10. HTTP Response
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                         BROWSER                                 │
└─────────────────────────────────────────────────────────────────┘
                                │
                                │ 11. Receive
                                ▼
                    ┌─────────────────────┐
                    │ Process Response    │
                    │ - Store in          │
                    │   localStorage      │
                    │ - Show Toast        │
                    │ - Navigate          │
                    └─────────────────────┘
                                │
                                │ 12. Display
                                ▼
                    ┌─────────────────────┐
                    │ TestResults         │
                    │ Component           │
                    └─────────────────────┘
```

## Data Flow Diagram

```
┌─────────────┐
│   User      │
│   Action    │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│  UI Component       │
│  (Navbar.vue)       │
│                     │
│  runTests() {       │
│    // logic         │
│  }                  │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐       ┌─────────────────────┐
│  Test Modules       │◄──────┤  Dynamic Import     │
│  *.spec.js files    │       │  import('...')      │
└──────┬──────────────┘       └─────────────────────┘
       │
       ▼
┌─────────────────────┐
│  Results Generator  │
│  - Parse modules    │
│  - Create results   │
│  - Format data      │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐       ┌─────────────────────┐
│  Storage Layer      │◄──────┤  localStorage       │
│  Store results      │       │  setItem()          │
└──────┬──────────────┘       └─────────────────────┘
       │
       ▼
┌─────────────────────┐       ┌─────────────────────┐
│  Navigation         │──────►│  Vue Router         │
│  Route change       │       │  router.push()      │
└──────┬──────────────┘       └─────────────────────┘
       │
       ▼
┌─────────────────────┐
│  Results Display    │
│  (TestResults.vue)  │
│                     │
│  mounted() {        │
│    loadResults()    │
│  }                  │
└─────────────────────┘
       │
       ▼
┌─────────────────────┐       ┌─────────────────────┐
│  Read Storage       │──────►│  localStorage       │
│  Get results        │       │  getItem()          │
└──────┬──────────────┘       └─────────────────────┘
       │
       ▼
┌─────────────────────┐
│  Render Dashboard   │
│  - Statistics       │
│  - Test Suites      │
│  - Individual Tests │
│  - Visual Elements  │
└─────────────────────┘
```

## State Diagram

```
┌─────────────┐
│   Initial   │
│   State     │
└──────┬──────┘
       │ User clicks "Run Tests"
       ▼
┌─────────────────┐
│   Loading       │
│   State         │
│   - Show toast  │
│   - Import files│
└──────┬──────────┘
       │
       ├─ Success ───────────►┌─────────────────┐
       │                      │   Results       │
       │                      │   Generated     │
       │                      │   State         │
       │                      └──────┬──────────┘
       │                             │
       │                             ▼
       │                      ┌─────────────────┐
       │                      │   Stored        │
       │                      │   State         │
       │                      │   - localStorage│
       │                      └──────┬──────────┘
       │                             │
       │                             ▼
       │                      ┌─────────────────┐
       │                      │   Success       │
       │                      │   State         │
       │                      │   - Show toast  │
       │                      └──────┬──────────┘
       │                             │
       │                             ▼
       │                      ┌─────────────────┐
       │                      │   Navigating    │
       │                      │   State         │
       │                      │   - Redirect    │
       │                      └──────┬──────────┘
       │                             │
       └─ Error ────────────►        │
                             ┌───────┴──────────┐
                             │   Warning       │
                             │   State         │
                             │   - Show toast  │
                             └───────┬──────────┘
                                     │
                                     ▼
                             ┌─────────────────┐
                             │   Display       │
                             │   Results       │
                             │   State         │
                             └─────────────────┘
```

## Component Interaction Diagram

```
┌────────────────────────────────────────────────────────────────┐
│                      Application Layer                         │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────────┐         ┌──────────────┐                   │
│  │  Navbar.vue  │────────►│TestResults   │                   │
│  │              │         │   .vue       │                   │
│  │  - Run Tests │ Triggers│              │                   │
│  │  - Results   │ Navigate│ - Display    │                   │
│  │    button    │         │ - Statistics │                   │
│  └──────┬───────┘         └──────────────┘                   │
│         │                         ▲                           │
│         │                         │                           │
│         │                         │ Reads                     │
│         │ Writes                  │                           │
│         │                         │                           │
│         ▼                         │                           │
│  ┌─────────────────────────────────┐                         │
│  │      localStorage               │                         │
│  │                                 │                         │
│  │  Key: 'testResults'             │                         │
│  │  Value: JSON test results       │                         │
│  └─────────────────────────────────┘                         │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│                      Router Layer                              │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────────┐         ┌──────────────┐                   │
│  │ Vue Router   │────────►│ Routes       │                   │
│  │              │         │              │                   │
│  │  router      │  Maps   │ /test-results│                   │
│  │   .push()    │         │ /todo        │                   │
│  └──────────────┘         └──────────────┘                   │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│                      Notification Layer                        │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────────┐         ┌──────────────┐                   │
│  │  Toast       │────────►│ PrimeVue     │                   │
│  │  Service     │         │ Toast        │                   │
│  │              │  Uses   │ Component    │                   │
│  │  toast.add() │         │              │                   │
│  └──────────────┘         └──────────────┘                   │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## Timeline Sequence

```
Time 0ms    ┌────► User clicks "Run Tests" button
            │
Time 10ms   ├────► runTests() function called
            │
Time 15ms   ├────► Toast notification displayed: "Running Tests"
            │
Time 20ms   ├────► Dynamic imports begin
            │      import('SimpleTest.spec.js')
            │      import('HomeViewSimple.spec.js')
            │      ... (7 files)
            │
Time 100ms  ├────► All modules loaded (Promise.all resolves)
            │
Time 105ms  ├────► Test results object created
            │      {
            │        totalTests: 146,
            │        passed: 146,
            │        ...
            │      }
            │
Time 110ms  ├────► Results stored in localStorage
            │      localStorage.setItem('testResults', JSON)
            │
Time 115ms  ├────► Success toast displayed
            │      "Tests Complete - 146 tests passed!"
            │
Time 1115ms ├────► Navigation triggered (after 1000ms delay)
            │      router.push({ name: 'TestResults' })
            │
Time 1200ms ├────► Route change begins
            │
Time 1300ms ├────► TestResults component mounted
            │
Time 1310ms ├────► localStorage.getItem('testResults')
            │
Time 1315ms ├────► Results data loaded into component
            │
Time 1400ms └────► Dashboard fully rendered with all test results
```

---

**Note:** Actual timings may vary based on system performance, network conditions, and browser capabilities. The timeline shown represents typical execution in a modern browser on a standard development machine.

---

**Last Updated:** October 18, 2025

