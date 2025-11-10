// Mock Vue and Vue Test Utils without requiring them
global.Vue = {
  createApp: jest.fn(),
  h: jest.fn(),
  ref: jest.fn(),
  reactive: jest.fn(),
  computed: jest.fn(),
  watch: jest.fn(),
  onMounted: jest.fn(),
  onUnmounted: jest.fn()
}

// Mock Vue Test Utils configuration
global.VueTestUtilsConfig = {
  global: {
    mocks: {
      $route: {
        params: {},
        query: {},
        path: '/'
      },
      $router: {
        push: jest.fn(),
        replace: jest.fn(),
        go: jest.fn(),
        back: jest.fn(),
        forward: jest.fn()
      }
    }
  }
}

// Mock global objects
global.console = {
  ...console,
  // Suppress console.log in tests unless explicitly needed
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}

// Mock window.location
delete window.location
window.location = {
  href: '',
  assign: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
}

// Mock jQuery
global.$ = jest.fn(() => ({
  is: jest.fn(),
  prop: jest.fn(),
  val: jest.fn(),
  text: jest.fn(),
  html: jest.fn(),
  addClass: jest.fn(),
  removeClass: jest.fn(),
  toggleClass: jest.fn(),
  hasClass: jest.fn(),
  attr: jest.fn(),
  removeAttr: jest.fn(),
  css: jest.fn(),
  show: jest.fn(),
  hide: jest.fn(),
  click: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
  trigger: jest.fn(),
  find: jest.fn(),
  each: jest.fn(),
  length: 0
}))

// Mock axios
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({ data: {} }))
}))

// Mock Firebase
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn()
}))

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  doc: jest.fn(),
  getDocs: jest.fn(),
  getDoc: jest.fn(),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn()
}))