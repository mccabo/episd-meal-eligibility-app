// Test helper utilities for the EPISD application

/**
 * Creates a mock application object for testing
 * @param {Object} overrides - Properties to override in the default application
 * @returns {Object} Mock application object
 */
const createMockApplication = (overrides = {}) => {
  const defaultApplication = {
    Date: "10/12/2025",
    Index: "0",
    Id: "2025001",
    BatchNum: "1",
    Language: "English",
    Filename: "EPISD - Meal Application",
    Selected: "false",
    Sent: "false",
    Printed: "false",
    Guardians: [
      {
        Id: "2025001",
        FirstName: "Test",
        LastName: "Guardian",
        Address: "123 Test St",
        City: "El Paso",
        State: "TX",
        Zip: "79901",
        Phone: "915-555-0123",
        Email: "test.guardian@example.com"
      }
    ],
    Students: [
      {
        Id: "000001",
        FirstName: "Test",
        LastName: "Student",
        Campus: "Test High School"
      }
    ],
    Status: [
      {
        Checked: "true",
        Status: "Approved for free meals.",
        MobileStatus: "Approved for free meals"
      },
      {
        Checked: "false",
        Status: "Approved for reduced-price meals for breakfast at a cost of $0.00; for lunch at a cost of $0.40; and afterschool snack at a cost of $0.00.",
        MobileStatus: "Approved for reduced-price meals"
      },
      {
        Checked: "false",
        Status: "Denied for the following reason(s):",
        MobileStatus: "Denied"
      }
    ],
    Reasons: [
      {
        Checked: "false",
        Reason: "Income over the allowable amount.",
        MobileReason: "Income over the allowable amount"
      },
      {
        Checked: "false",
        Reason: "Incomplete application, please complete the forms attached to provide the needed information.",
        MobileReason: "Incomplete application"
      }
    ]
  }

  return { ...defaultApplication, ...overrides }
}

/**
 * Creates a mock applications array for testing
 * @param {number} count - Number of applications to create
 * @returns {Array} Array of mock applications
 */
const createMockApplications = (count = 3) => {
  return Array.from({ length: count }, (_, index) => 
    createMockApplication({
      Index: index.toString(),
      Id: `202500${index + 1}`,
      BatchNum: Math.floor(index / 2) + 1,
      Guardians: [{
        ...createMockApplication().Guardians[0],
        Id: `202500${index + 1}`,
        FirstName: `Guardian${index + 1}`,
        Email: `guardian${index + 1}@example.com`
      }],
      Students: [{
        ...createMockApplication().Students[0],
        Id: `00000${index + 1}`,
        FirstName: `Student${index + 1}`
      }]
    })
  )
}

/**
 * Creates a mock Spanish application
 * @param {Object} overrides - Properties to override
 * @returns {Object} Mock Spanish application
 */
const createMockSpanishApplication = (overrides = {}) => {
  const spanishApp = createMockApplication({
    Language: "Spanish",
    Status: [
      {
        Checked: "true",
        Status: "Aprovada para comidas gratis.",
        MobileStatus: "Aprovada para comidas gratis"
      },
      {
        Checked: "false",
        Status: "Aprovada para comidas a precio reducido para almuerzos a un costo de $0.40; desayuno a un costo $0,00; merienda para despues de la escuela (si esta disponble) a un costo de $0.00.",
        MobileStatus: "Aprovado para comida a precio reducido"
      },
      {
        Checked: "false",
        Status: "Negada por la(s) siguiente(s) razon(es):",
        MobileStatus: "Negada"
      }
    ],
    Reasons: [
      {
        Checked: "false",
        Reason: "Su ingreso sobrepasa la cantidad permitida.",
        MobileReason: "Su ingreso sobrepasa la cantidad permitida."
      },
      {
        Checked: "false",
        Reason: "Su solicitud esta incompleta. Por favor conplete los documentos adjuntos para proporcionar la informacion necesaria.",
        MobileReason: "Su solicitud esta incompleta."
      }
    ],
    ...overrides
  })

  return spanishApp
}

/**
 * Creates a mock denied application
 * @param {Object} overrides - Properties to override
 * @returns {Object} Mock denied application
 */
const createMockDeniedApplication = (overrides = {}) => {
  return createMockApplication({
    Status: [
      {
        Checked: "false",
        Status: "Approved for free meals.",
        MobileStatus: "Approved for free meals"
      },
      {
        Checked: "false",
        Status: "Approved for reduced-price meals for breakfast at a cost of $0.00; for lunch at a cost of $0.40; and afterschool snack at a cost of $0.00.",
        MobileStatus: "Approved for reduced-price meals"
      },
      {
        Checked: "true",
        Status: "Denied for the following reason(s):",
        MobileStatus: "Denied"
      }
    ],
    Reasons: [
      {
        Checked: "true",
        Reason: "Income over the allowable amount.",
        MobileReason: "Income over the allowable amount"
      },
      {
        Checked: "false",
        Reason: "Incomplete application, please complete the forms attached to provide the needed information.",
        MobileReason: "Incomplete application"
      }
    ],
    ...overrides
  })
}

/**
 * Creates a mock reduced-price application
 * @param {Object} overrides - Properties to override
 * @returns {Object} Mock reduced-price application
 */
const createMockReducedPriceApplication = (overrides = {}) => {
  return createMockApplication({
    Status: [
      {
        Checked: "false",
        Status: "Approved for free meals.",
        MobileStatus: "Approved for free meals"
      },
      {
        Checked: "true",
        Status: "Approved for reduced-price meals for breakfast at a cost of $0.00; for lunch at a cost of $0.40; and afterschool snack at a cost of $0.00.",
        MobileStatus: "Approved for reduced-price meals"
      },
      {
        Checked: "false",
        Status: "Denied for the following reason(s):",
        MobileStatus: "Denied"
      }
    ],
    ...overrides
  })
}

/**
 * Validates application data structure
 * @param {Object} application - Application object to validate
 * @returns {Object} Validation result with isValid and errors
 */
const validateApplicationStructure = (application) => {
  const errors = []
  
  // Required top-level properties
  const requiredProps = [
    'Date', 'Index', 'Id', 'BatchNum', 'Language', 
    'Filename', 'Selected', 'Sent', 'Printed'
  ]
  
  requiredProps.forEach(prop => {
    if (!application.hasOwnProperty(prop)) {
      errors.push(`Missing required property: ${prop}`)
    }
  })
  
  // Validate arrays
  const requiredArrays = ['Guardians', 'Students', 'Status', 'Reasons']
  requiredArrays.forEach(arrayProp => {
    if (!Array.isArray(application[arrayProp])) {
      errors.push(`${arrayProp} must be an array`)
    } else if (application[arrayProp].length === 0) {
      errors.push(`${arrayProp} cannot be empty`)
    }
  })
  
  // Validate boolean string values
  const booleanProps = ['Selected', 'Sent', 'Printed']
  booleanProps.forEach(prop => {
    if (!['true', 'false'].includes(application[prop])) {
      errors.push(`${prop} must be 'true' or 'false'`)
    }
  })
  
  // Validate language
  if (!['English', 'Spanish'].includes(application.Language)) {
    errors.push('Language must be English or Spanish')
  }
  
  // Validate that exactly one status is checked
  if (application.Status) {
    const checkedStatuses = application.Status.filter(status => status.Checked === 'true')
    if (checkedStatuses.length !== 1) {
      errors.push('Exactly one status must be checked')
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Filters applications by various criteria
 * @param {Array} applications - Array of applications
 * @param {Object} filters - Filter criteria
 * @returns {Array} Filtered applications
 */
const filterApplications = (applications, filters = {}) => {
  return applications.filter(app => {
    // Filter by language
    if (filters.language && app.Language !== filters.language) {
      return false
    }
    
    // Filter by sent status
    if (filters.sent !== undefined && app.Sent !== filters.sent.toString()) {
      return false
    }
    
    // Filter by printed status
    if (filters.printed !== undefined && app.Printed !== filters.printed.toString()) {
      return false
    }
    
    // Filter by batch number
    if (filters.batchNum && app.BatchNum !== filters.batchNum) {
      return false
    }
    
    // Filter by status type
    if (filters.statusType) {
      const checkedStatus = app.Status.find(status => status.Checked === 'true')
      if (!checkedStatus) return false
      
      switch (filters.statusType) {
        case 'free':
          return checkedStatus.Status.includes('free meals')
        case 'reduced':
          return checkedStatus.Status.includes('reduced-price')
        case 'denied':
          return checkedStatus.Status.includes('Denied')
        default:
          return true
      }
    }
    
    return true
  })
}

/**
 * Groups applications by batch number
 * @param {Array} applications - Array of applications
 * @returns {Object} Applications grouped by batch number
 */
const groupApplicationsByBatch = (applications) => {
  return applications.reduce((groups, app) => {
    const batchNum = app.BatchNum
    if (!groups[batchNum]) {
      groups[batchNum] = []
    }
    groups[batchNum].push(app)
    return groups
  }, {})
}

/**
 * Calculates statistics for applications
 * @param {Array} applications - Array of applications
 * @returns {Object} Statistics object
 */
const calculateApplicationStats = (applications) => {
  const stats = {
    total: applications.length,
    byLanguage: {},
    byStatus: { free: 0, reduced: 0, denied: 0 },
    bySent: { sent: 0, notSent: 0 },
    byPrinted: { printed: 0, notPrinted: 0 },
    byBatch: {}
  }
  
  applications.forEach(app => {
    // Language stats
    stats.byLanguage[app.Language] = (stats.byLanguage[app.Language] || 0) + 1
    
    // Status stats
    const checkedStatus = app.Status.find(status => status.Checked === 'true')
    if (checkedStatus) {
      if (checkedStatus.Status.includes('free meals')) {
        stats.byStatus.free++
      } else if (checkedStatus.Status.includes('reduced-price')) {
        stats.byStatus.reduced++
      } else if (checkedStatus.Status.includes('Denied')) {
        stats.byStatus.denied++
      }
    }
    
    // Sent stats
    if (app.Sent === 'true') {
      stats.bySent.sent++
    } else {
      stats.bySent.notSent++
    }
    
    // Printed stats
    if (app.Printed === 'true') {
      stats.byPrinted.printed++
    } else {
      stats.byPrinted.notPrinted++
    }
    
    // Batch stats
    stats.byBatch[app.BatchNum] = (stats.byBatch[app.BatchNum] || 0) + 1
  })
  
  return stats
}

/**
 * Mock Vue component wrapper helper
 * @param {Object} component - Vue component
 * @param {Object} options - Mount options
 * @returns {Object} Wrapped component
 */
const createComponentWrapper = (component, options = {}) => {
  const defaultOptions = {
    global: {
      mocks: {
        $route: { params: {}, query: {}, path: '/' },
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
  
  return { ...defaultOptions, ...options }
}

module.exports = {
  createMockApplication,
  createMockApplications,
  createMockSpanishApplication,
  createMockDeniedApplication,
  createMockReducedPriceApplication,
  validateApplicationStructure,
  filterApplications,
  groupApplicationsByBatch,
  calculateApplicationStats,
  createComponentWrapper
}
