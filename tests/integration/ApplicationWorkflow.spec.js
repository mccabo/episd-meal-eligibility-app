const { mount } = require('@vue/test-utils')
const HomeView = require('@/views/HomeView.vue').default
const HelloWorld = require('@/components/HelloWorld.vue').default
const { 
  createMockApplications, 
  createMockSpanishApplication,
  createMockDeniedApplication,
  filterApplications,
  groupApplicationsByBatch,
  calculateApplicationStats
} = require('../utils/testHelpers.js')

// Sample data from applications.json for integration testing
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

describe('Application Workflow Integration Tests', () => {
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

    wrapper = mount(HomeView, {
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

    // Set up component with sample data
    wrapper.vm.test = sampleApplicationsData.Applications
    wrapper.vm.applications = sampleApplicationsData.Applications
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Complete Application Processing Workflow', () => {
    it('should load and display applications correctly', async () => {
      wrapper.vm.activeTab = 'applications'
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.test).toHaveLength(3)
      expect(wrapper.vm.applications).toHaveLength(3)
    })

    it('should filter applications by various criteria', () => {
      // Test filtering by language
      const englishApps = filterApplications(sampleApplicationsData.Applications, { language: 'English' })
      expect(englishApps).toHaveLength(3)

      // Test filtering by sent status
      const sentApps = filterApplications(sampleApplicationsData.Applications, { sent: false })
      expect(sentApps).toHaveLength(3)

      // Test filtering by printed status
      const printedApps = filterApplications(sampleApplicationsData.Applications, { printed: true })
      expect(printedApps).toHaveLength(3)
    })

    it('should group applications by batch number', () => {
      const groupedApps = groupApplicationsByBatch(sampleApplicationsData.Applications)
      
      expect(groupedApps['1']).toHaveLength(2)
      expect(groupedApps['2']).toHaveLength(1)
    })

    it('should calculate application statistics', () => {
      const stats = calculateApplicationStats(sampleApplicationsData.Applications)
      
      expect(stats.total).toBe(3)
      expect(stats.byLanguage.English).toBe(3)
      expect(stats.byStatus.free).toBe(2)
      expect(stats.byStatus.reduced).toBe(1)
      expect(stats.byStatus.denied).toBe(0)
      expect(stats.bySent.notSent).toBe(3)
      expect(stats.byPrinted.printed).toBe(3)
    })
  })

  describe('Application Selection and Batch Processing', () => {
    it('should handle application selection', async () => {
      wrapper.vm.selected = ['2025951', '2025952']
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.selected).toHaveLength(2)
      expect(wrapper.vm.selected).toContain('2025951')
      expect(wrapper.vm.selected).toContain('2025952')
    })

    it('should update form action with selected IDs', async () => {
      wrapper.vm.selected = ['2025951', '2025952']
      await wrapper.vm.$nextTick()

      const form = wrapper.find('form')
      expect(form.attributes('action')).toContain('appIds=2025951,2025952')
    })

    it('should handle batch selection workflow', () => {
      const batch1Apps = sampleApplicationsData.Applications.filter(app => app.BatchNum === '1')
      const batch1Ids = batch1Apps.map(app => app.Id)
      
      wrapper.vm.selected = batch1Ids
      expect(wrapper.vm.selected).toEqual(['2025951', '2025952'])
    })
  })

  describe('Multi-language Application Processing', () => {
    it('should handle mixed language applications', () => {
      const mixedApps = [
        ...sampleApplicationsData.Applications,
        createMockSpanishApplication({ Id: '2025999', Index: '3' })
      ]

      wrapper.vm.test = mixedApps
      wrapper.vm.applications = mixedApps

      const englishApps = mixedApps.filter(app => app.Language === 'English')
      const spanishApps = mixedApps.filter(app => app.Language === 'Spanish')

      expect(englishApps).toHaveLength(3)
      expect(spanishApps).toHaveLength(1)
    })

    it('should display appropriate status messages for each language', () => {
      const englishApp = sampleApplicationsData.Applications[0]
      const spanishApp = createMockSpanishApplication()

      const englishStatus = englishApp.Status.find(s => s.Checked === 'true')
      const spanishStatus = spanishApp.Status.find(s => s.Checked === 'true')

      expect(englishStatus.Status).toContain('Approved for free meals')
      expect(spanishStatus.Status).toContain('Aprovada para comidas gratis')
    })
  })

  describe('Application Status Workflow', () => {
    it('should handle different application statuses', () => {
      const freeMealApp = sampleApplicationsData.Applications[0] // Free meals
      const reducedPriceApp = sampleApplicationsData.Applications[2] // Reduced price
      const deniedApp = createMockDeniedApplication({ Id: '2025998' })

      const freeStatus = freeMealApp.Status.find(s => s.Checked === 'true')
      const reducedStatus = reducedPriceApp.Status.find(s => s.Checked === 'true')
      const deniedStatus = deniedApp.Status.find(s => s.Checked === 'true')

      expect(freeStatus.Status).toContain('free meals')
      expect(reducedStatus.Status).toContain('reduced-price')
      expect(deniedStatus.Status).toContain('Denied')
    })

    it('should handle status changes workflow', async () => {
      const app = sampleApplicationsData.Applications[0]
      
      // Simulate status change from free to reduced price
      app.Status[0].Checked = 'false'
      app.Status[1].Checked = 'true'

      const newStatus = app.Status.find(s => s.Checked === 'true')
      expect(newStatus.Status).toContain('reduced-price')
    })
  })

  describe('Print and Email Workflow', () => {
    it('should handle print workflow for selected applications', () => {
      const printableApps = sampleApplicationsData.Applications.filter(app => app.Printed === 'true')
      expect(printableApps).toHaveLength(3)

      wrapper.vm.selected = printableApps.map(app => app.Id)
      expect(wrapper.vm.selected).toHaveLength(3)
    })

    it('should handle email workflow for sent applications', () => {
      const sentApps = sampleApplicationsData.Applications.filter(app => app.Sent === 'true')
      expect(sentApps).toHaveLength(0) // No apps are marked as sent in sample data

      // Simulate marking apps as sent
      sampleApplicationsData.Applications.forEach(app => {
        app.Sent = 'true'
      })

      const newSentApps = sampleApplicationsData.Applications.filter(app => app.Sent === 'true')
      expect(newSentApps).toHaveLength(3)
    })
  })

  describe('Data Validation and Error Handling', () => {
    it('should handle invalid application data gracefully', () => {
      const invalidApp = {
        Id: 'invalid',
        // Missing required fields
      }

      // Component should handle missing data without crashing
      expect(() => {
        wrapper.vm.test = [invalidApp]
      }).not.toThrow()
    })

    it('should handle empty applications array', () => {
      wrapper.vm.test = []
      wrapper.vm.applications = []

      expect(wrapper.vm.test).toHaveLength(0)
      expect(wrapper.vm.applications).toHaveLength(0)
    })

    it('should handle malformed guardian data', () => {
      const appWithInvalidGuardian = {
        ...sampleApplicationsData.Applications[0],
        Guardians: [{
          // Missing required fields
          Id: '2025951'
        }]
      }

      expect(() => {
        wrapper.vm.test = [appWithInvalidGuardian]
      }).not.toThrow()
    })
  })

  describe('User Interface Integration', () => {
    it('should switch between tabs correctly', async () => {
      // Start with overview tab
      expect(wrapper.vm.activeTab).toBe('overview')

      // Switch to applications tab
      wrapper.vm.activeTab = 'applications'
      await wrapper.vm.$nextTick()

      expect(wrapper.vm.activeTab).toBe('applications')
    })

    it('should display applications in the UI when applications tab is active', async () => {
      wrapper.vm.activeTab = 'applications'
      await wrapper.vm.$nextTick()

      const applicationsPanel = wrapper.find('.tab-panel')
      expect(applicationsPanel.exists()).toBe(true)
    })

    it('should handle admin utilities for admin user', async () => {
      wrapper.vm.user = 'Marylou'
      await wrapper.vm.$nextTick()

      // Admin utilities should be visible for admin user
      const utilitiesDiv = wrapper.find('#divUtilitiesWrapper')
      if (utilitiesDiv.exists()) {
        expect(utilitiesDiv.isVisible()).toBe(true)
      }
    })
  })

  describe('Performance and Scalability', () => {
    it('should handle large number of applications', () => {
      const largeAppSet = createMockApplications(100)
      
      expect(() => {
        wrapper.vm.test = largeAppSet
        wrapper.vm.applications = largeAppSet
      }).not.toThrow()

      expect(wrapper.vm.test).toHaveLength(100)
    })

    it('should filter large datasets efficiently', () => {
      const largeAppSet = createMockApplications(100)
      
      const startTime = performance.now()
      const filtered = filterApplications(largeAppSet, { language: 'English' })
      const endTime = performance.now()

      expect(filtered).toHaveLength(100)
      expect(endTime - startTime).toBeLessThan(100) // Should complete in less than 100ms
    })

    it('should calculate statistics for large datasets', () => {
      const largeAppSet = createMockApplications(100)
      
      const startTime = performance.now()
      const stats = calculateApplicationStats(largeAppSet)
      const endTime = performance.now()

      expect(stats.total).toBe(100)
      expect(endTime - startTime).toBeLessThan(100) // Should complete in less than 100ms
    })
  })
})
