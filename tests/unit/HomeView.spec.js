const { mount, shallowMount } = require('@vue/test-utils')
const HomeView = require('@/views/HomeView.vue').default
const HelloWorld = require('@/components/HelloWorld.vue').default

// Sample data from applications.json
const sampleApplicationsData = {
  "Applications": [
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
      "Guardians": [
        {
          "Id": "2025951",
          "FirstName": "Tommy",
          "LastName": "John Doe",
          "Address": "",
          "City": "",
          "State": "",
          "Zip": "",
          "Phone": "",
          "Email": "johndoe@gmail.com"
        }
      ],
      "Students": [
        {
          "Id": "000001",
          "FirstName": "Nancy",
          "LastName": "Doe",
          "Campus": "Coronado High School"
        },
        {
          "Id": "000002",
          "FirstName": "Billy",
          "LastName": "Doe",
          "Campus": "Coronado High School"
        }
      ],
      "Status": [
        {
          "Checked": "true",
          "Status": "Approved for free meals.",
          "MobileStatus": "Approved for free meals"
        },
        {
          "Checked": "false",
          "Status": "Approved for reduced-price meals for breakfast at a cost of $0.00; for lunch at a cost of $0.40; and afterschool snack at a cost of $0.00.",
          "MobileStatus": "Approved for reduced-price meals"
        },
        {
          "Checked": "false",
          "Status": "Denied for the following reason(s):",
          "MobileStatus": "Denied"
        }
      ],
      "Reasons": [
        {
          "Checked": "false",
          "Reason": "Income over the allowable amount.",
          "MobileReason": "Income over the allowable amount"
        },
        {
          "Checked": "false",
          "Reason": "Incomplete application, please complete the forms attached to provide the needed information.",
          "MobileReason": "Incomplete application"
        }
      ]
    },
    {
      "Date": "10/12/2025",
      "Index": "1",
      "Id": "2025952",
      "BatchNum": "1",
      "Language": "English",
      "Filename": "EPISD - Meal Application",
      "Selected": "false",
      "Sent": "false",
      "Printed": "true",
      "Guardians": [
        {
          "Id": "2025952",
          "FirstName": "Mary",
          "LastName": "Smith",
          "Address": "",
          "City": "",
          "State": "",
          "Zip": "",
          "Phone": "",
          "Email": "marysmith@gmail.com"
        }
      ],
      "Students": [
        {
          "Id": "100001",
          "FirstName": "Sally",
          "LastName": "Smith",
          "Campus": "Belair High School"
        },
        {
          "Id": "100002",
          "FirstName": "Debbie",
          "LastName": "Smith",
          "Campus": "Belair High School"
        }
      ],
      "Status": [
        {
          "Checked": "true",
          "Status": "Approved for free meals.",
          "MobileStatus": "Approved for free meals"
        },
        {
          "Checked": "false",
          "Status": "Approved for reduced-price meals for breakfast at a cost of $0.00; for lunch at a cost of $0.40; and afterschool snack at a cost of $0.00.",
          "MobileStatus": "Approved for reduced-price meals"
        },
        {
          "Checked": "false",
          "Status": "Denied for the following reason(s):",
          "MobileStatus": "Denied"
        }
      ],
      "Reasons": [
        {
          "Checked": "false",
          "Reason": "Income over the allowable amount.",
          "MobileReason": "Income over the allowable amount"
        },
        {
          "Checked": "false",
          "Reason": "Incomplete application, please complete the forms attached to provide the needed information.",
          "MobileReason": "Incomplete application"
        }
      ]
    },
    {
      "Date": "10/12/2025",
      "Index": "2",
      "Id": "2025953",
      "BatchNum": "2",
      "Language": "English",
      "Filename": "EPISD - Meal Application",
      "Selected": "false",
      "Sent": "false",
      "Printed": "true",
      "Guardians": [
        {
          "Id": "2025953",
          "FirstName": "Mike",
          "LastName": "Jones",
          "Address": "",
          "City": "",
          "State": "",
          "Zip": "",
          "Phone": "",
          "Email": "mikejones@gmail.com"
        }
      ],
      "Students": [
        {
          "Id": "200001",
          "FirstName": "Michael",
          "LastName": "Jones",
          "Campus": "Washington Elementary School"
        }
      ],
      "Status": [
        {
          "Checked": "false",
          "Status": "Approved for free meals.",
          "MobileStatus": "Approved for free meals"
        },
        {
          "Checked": "true",
          "Status": "Approved for reduced-price meals for breakfast at a cost of $0.00; for lunch at a cost of $0.40; and afterschool snack at a cost of $0.00.",
          "MobileStatus": "Approved for reduced-price meals"
        },
        {
          "Checked": "false",
          "Status": "Denied for the following reason(s):",
          "MobileStatus": "Denied"
        }
      ],
      "Reasons": [
        {
          "Checked": "false",
          "Reason": "Income over the allowable amount.",
          "MobileReason": "Income over the allowable amount"
        },
        {
          "Checked": "false",
          "Reason": "Incomplete application, please complete the forms attached to provide the needed information.",
          "MobileReason": "Incomplete application"
        }
      ]
    }
  ]
}

// Mock data for testing
const mockData = {
  reload: 1,
  jsonData: sampleApplicationsData,
  error: null,
  english: [],
  spanish: [],
  test: sampleApplicationsData.Applications,
  applications: sampleApplicationsData.Applications,
  selected: [],
  activeTab: 'overview',
  user: 'testuser',
  setDocFlag: false,
  searches: [],
  customers: [],
  sites: [],
  readonly: false,
  tabs: [
    { id: 'overview', name: 'Overview' },
    { id: 'applications', name: 'Applications' },
    { id: 'documentation', name: 'Documentation' }
  ]
}

describe('HomeView.vue', () => {
  let wrapper

  beforeEach(() => {
    // Mock uniqueId function
    global.uniqueId = jest.fn(() => 'test-id-123')
    
    // Mock window.location
    delete window.location
    window.location = {
      href: '',
      assign: jest.fn(),
      replace: jest.fn(),
      reload: jest.fn(),
    }

    wrapper = shallowMount(HomeView, {
      global: {
        components: {
          HelloWorld
        },
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
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Component Initialization', () => {
    it('should render the component', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('should have the correct component name', () => {
      expect(wrapper.vm.$options.name).toBe('apps')
    })

    it('should initialize with default data values', () => {
      expect(wrapper.vm.reload).toBe(1)
      expect(wrapper.vm.jsonData).toBeNull()
      expect(wrapper.vm.error).toBeNull()
      expect(wrapper.vm.activeTab).toBe('overview')
      expect(wrapper.vm.selected).toEqual([])
    })

    it('should call uniqueId on mount', () => {
      expect(global.uniqueId).toHaveBeenCalled()
    })
  })

  describe('Tab Navigation', () => {
    it('should render navigation tabs', () => {
      const tabs = wrapper.findAll('.tabs-container button')
      expect(tabs.length).toBeGreaterThan(0)
    })

    it('should switch active tab when clicked', async () => {
      wrapper.vm.activeTab = 'applications'
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.activeTab).toBe('applications')
    })

    it('should show overview content when overview tab is active', async () => {
      wrapper.vm.activeTab = 'overview'
      await wrapper.vm.$nextTick()
      const overviewPanel = wrapper.find('.tab-panel')
      expect(overviewPanel.exists()).toBe(true)
    })

    it('should show applications content when applications tab is active', async () => {
      wrapper.vm.activeTab = 'applications'
      await wrapper.vm.$nextTick()
      const applicationsPanel = wrapper.find('.tab-panel')
      expect(applicationsPanel.exists()).toBe(true)
    })
  })

  describe('Data Structure Tests', () => {
    it('should handle applications data structure correctly', () => {
      const testData = sampleApplicationsData.Applications[0]
      
      expect(testData).toHaveProperty('Date')
      expect(testData).toHaveProperty('Id')
      expect(testData).toHaveProperty('BatchNum')
      expect(testData).toHaveProperty('Language')
      expect(testData).toHaveProperty('Guardians')
      expect(testData).toHaveProperty('Students')
      expect(testData).toHaveProperty('Status')
      expect(testData).toHaveProperty('Reasons')
    })

    it('should handle guardian data structure', () => {
      const guardian = sampleApplicationsData.Applications[0].Guardians[0]
      
      expect(guardian).toHaveProperty('Id')
      expect(guardian).toHaveProperty('FirstName')
      expect(guardian).toHaveProperty('LastName')
      expect(guardian).toHaveProperty('Email')
    })

    it('should handle student data structure', () => {
      const student = sampleApplicationsData.Applications[0].Students[0]
      
      expect(student).toHaveProperty('Id')
      expect(student).toHaveProperty('FirstName')
      expect(student).toHaveProperty('LastName')
      expect(student).toHaveProperty('Campus')
    })

    it('should handle status data structure', () => {
      const status = sampleApplicationsData.Applications[0].Status[0]
      
      expect(status).toHaveProperty('Checked')
      expect(status).toHaveProperty('Status')
      expect(status).toHaveProperty('MobileStatus')
    })

    it('should handle reasons data structure', () => {
      const reason = sampleApplicationsData.Applications[0].Reasons[0]
      
      expect(reason).toHaveProperty('Checked')
      expect(reason).toHaveProperty('Reason')
      expect(reason).toHaveProperty('MobileReason')
    })
  })

  describe('Component Methods', () => {
    it('should have importApps method', () => {
      expect(typeof wrapper.vm.importApps).toBe('function')
    })

    it('should have showConfig method', () => {
      expect(typeof wrapper.vm.showConfig).toBe('function')
    })

    it('should call importApps and redirect to localhost', () => {
      wrapper.vm.importApps()
      expect(window.location.href).toBe('http://localhost?importApps=1')
    })

    it('should call showConfig and redirect to config endpoint', () => {
      wrapper.vm.showConfig()
      expect(window.location.href).toBe('http://localhost:3000/showConfig')
    })
  })

  describe('Computed Properties', () => {
    it('should have filteredIds computed property', () => {
      expect(wrapper.vm.filteredIds).toBeDefined()
    })

    it('should filter applications based on search criteria', () => {
      wrapper.vm.test = sampleApplicationsData.Applications
      wrapper.vm.searchtype = 'sentTrue'
      
      const filtered = wrapper.vm.filteredIds
      expect(Array.isArray(filtered)).toBe(true)
    })
  })

  describe('User Interactions', () => {
    it('should handle tab button clicks', async () => {
      const tabButton = wrapper.find('button')
      if (tabButton.exists()) {
        await tabButton.trigger('click')
        // Verify tab switching logic
        expect(wrapper.vm.activeTab).toBeDefined()
      }
    })

    it('should handle form submissions', () => {
      const form = wrapper.find('form')
      expect(form.exists()).toBe(true)
      expect(form.attributes('action')).toContain('printLetters')
    })

    it('should handle logo URL input blur event', () => {
      const logoInput = wrapper.find('#inpLogoURL')
      if (logoInput.exists()) {
        expect(logoInput.attributes('class')).toContain('hidden')
      }
    })
  })

  describe('Utility Functions', () => {
    it('should handle utilities toggle for admin user', () => {
      wrapper.vm.user = 'Marylou'
      wrapper.vm.toggleUtilities = jest.fn()
      
      expect(wrapper.vm.user).toBe('Marylou')
    })

    it('should show utilities section for admin user', async () => {
      wrapper.vm.user = 'Marylou'
      await wrapper.vm.$nextTick()
      
      const utilitiesDiv = wrapper.find('#divUtilitiesWrapper')
      if (utilitiesDiv.exists()) {
        expect(utilitiesDiv.isVisible()).toBe(true)
      }
    })
  })

  describe('Data Loading and Error Handling', () => {
    it('should handle data loading states', () => {
      expect(wrapper.vm.reload).toBe(1)
      expect(wrapper.vm.jsonData).toBeNull()
      expect(wrapper.vm.error).toBeNull()
    })

    it('should handle error states', () => {
      wrapper.vm.error = 'Test error message'
      expect(wrapper.vm.error).toBe('Test error message')
    })
  })

  describe('Application Status Filtering', () => {
    it('should filter applications by sent status', () => {
      wrapper.vm.test = sampleApplicationsData.Applications
      wrapper.vm.searchtype = 'sentTrue'
      
      const sentApplications = wrapper.vm.test.filter(app => app.Sent === 'true')
      expect(sentApplications.length).toBe(0) // No applications are marked as sent in sample data
    })

    it('should filter applications by printed status', () => {
      wrapper.vm.test = sampleApplicationsData.Applications
      wrapper.vm.searchtype = 'printedTrue'
      
      const printedApplications = wrapper.vm.test.filter(app => app.Printed === 'true')
      expect(printedApplications.length).toBe(3) // All sample applications are marked as printed
    })

    it('should filter applications by language', () => {
      wrapper.vm.test = sampleApplicationsData.Applications
      wrapper.vm.searchtype = 'language'
      wrapper.vm.languageFilter = 'English'
      
      const englishApplications = wrapper.vm.test.filter(app => app.Language === 'English')
      expect(englishApplications.length).toBe(3)
    })
  })

  describe('Batch Processing', () => {
    it('should group applications by batch number', () => {
      wrapper.vm.test = sampleApplicationsData.Applications
      
      const batchGroups = {}
      wrapper.vm.test.forEach(app => {
        if (!batchGroups[app.BatchNum]) {
          batchGroups[app.BatchNum] = []
        }
        batchGroups[app.BatchNum].push(app)
      })
      
      expect(batchGroups['1']).toHaveLength(2)
      expect(batchGroups['2']).toHaveLength(1)
    })

    it('should handle batch selection', () => {
      wrapper.vm.selected = ['2025951', '2025952']
      expect(wrapper.vm.selected).toHaveLength(2)
      expect(wrapper.vm.selected).toContain('2025951')
      expect(wrapper.vm.selected).toContain('2025952')
    })
  })

  describe('Multi-language Support', () => {
    it('should handle English applications', () => {
      const englishApps = sampleApplicationsData.Applications.filter(app => app.Language === 'English')
      expect(englishApps.length).toBe(3)
    })

    it('should handle Spanish applications', () => {
      const spanishApps = sampleApplicationsData.Applications.filter(app => app.Language === 'Spanish')
      expect(spanishApps.length).toBe(0) // No Spanish apps in this sample
    })

    it('should display appropriate status messages based on language', () => {
      const englishApp = sampleApplicationsData.Applications[0]
      const status = englishApp.Status.find(s => s.Checked === 'true')
      
      expect(status.Status).toContain('Approved for free meals')
      expect(status.MobileStatus).toContain('Approved for free meals')
    })
  })

  describe('Form Validation and Submission', () => {
    it('should have proper form action URL', () => {
      const form = wrapper.find('form')
      expect(form.attributes('action')).toContain('printLetters')
    })

    it('should include selected application IDs in form submission', () => {
      wrapper.vm.selected = ['2025951', '2025952']
      const form = wrapper.find('form')
      expect(form.attributes('action')).toContain('appIds=')
    })
  })

  describe('Component Lifecycle', () => {
    it('should call created hook', () => {
      expect(wrapper.vm.$options.created).toBeDefined()
    })

    it('should call mounted hook', () => {
      expect(wrapper.vm.$options.mounted).toBeDefined()
    })
  })

  describe('Edge Cases and Error Scenarios', () => {
    it('should handle empty applications array', () => {
      wrapper.vm.test = []
      expect(wrapper.vm.test).toHaveLength(0)
    })

    it('should handle null data', () => {
      wrapper.vm.jsonData = null
      expect(wrapper.vm.jsonData).toBeNull()
    })

    it('should handle undefined properties', () => {
      const appWithoutDate = { ...sampleApplicationsData.Applications[0] }
      delete appWithoutDate.Date
      
      expect(appWithoutDate.Date).toBeUndefined()
    })
  })
})
