//console.log('ApplicationsData.spec.js loaded')

// Import the actual applications.json data
const applicationsData = require('../../public/applications.json')

describe('Applications Data Structure', () => {
  describe('Root Structure', () => {
    it('should have Applications array', () => {
      expect(applicationsData).toHaveProperty('Applications')
      expect(Array.isArray(applicationsData.Applications)).toBe(true)
    })

    it('should have at least one application', () => {
      expect(applicationsData.Applications.length).toBeGreaterThan(0)
    })
  })

  describe('Application Object Structure', () => {
    let sampleApplication

    beforeEach(() => {
      sampleApplication = applicationsData.Applications[0]
    })

    it('should have required top-level properties', () => {
      const requiredProperties = [
        'Date', 'Index', 'Id', 'BatchNum', 'Language', 
        'Filename', 'Selected', 'Sent', 'Printed'
      ]
      
      requiredProperties.forEach(prop => {
        expect(sampleApplication).toHaveProperty(prop)
      })
    })

    it('should have Guardians array', () => {
      expect(sampleApplication).toHaveProperty('Guardians')
      expect(Array.isArray(sampleApplication.Guardians)).toBe(true)
      expect(sampleApplication.Guardians.length).toBeGreaterThan(0)
    })

    it('should have Students array', () => {
      expect(sampleApplication).toHaveProperty('Students')
      expect(Array.isArray(sampleApplication.Students)).toBe(true)
      expect(sampleApplication.Students.length).toBeGreaterThan(0)
    })

    it('should have Status array', () => {
      expect(sampleApplication).toHaveProperty('Status')
      expect(Array.isArray(sampleApplication.Status)).toBe(true)
      expect(sampleApplication.Status.length).toBeGreaterThan(0)
    })

    it('should have Reasons array', () => {
      expect(sampleApplication).toHaveProperty('Reasons')
      expect(Array.isArray(sampleApplication.Reasons)).toBe(true)
      expect(sampleApplication.Reasons.length).toBeGreaterThan(0)
    })
  })

  describe('Guardian Object Structure', () => {
    let sampleGuardian

    beforeEach(() => {
      sampleGuardian = applicationsData.Applications[0].Guardians[0]
    })

    it('should have required guardian properties', () => {
      const requiredProperties = [
        'Id', 'FirstName', 'LastName', 'Address', 'City', 
        'State', 'Zip', 'Phone', 'Email'
      ]
      
      requiredProperties.forEach(prop => {
        expect(sampleGuardian).toHaveProperty(prop)
      })
    })

    it('should have valid email format', () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      expect(emailRegex.test(sampleGuardian.Email)).toBe(true)
    })

    it('should have non-empty first and last names', () => {
      expect(sampleGuardian.FirstName.length).toBeGreaterThan(0)
      expect(sampleGuardian.LastName.length).toBeGreaterThan(0)
    })
  })

  describe('Student Object Structure', () => {
    let sampleStudent

    beforeEach(() => {
      sampleStudent = applicationsData.Applications[0].Students[0]
    })

    it('should have required student properties', () => {
      const requiredProperties = ['Id', 'FirstName', 'LastName', 'Campus']
      
      requiredProperties.forEach(prop => {
        expect(sampleStudent).toHaveProperty(prop)
      })
    })

    it('should have non-empty student names', () => {
      expect(sampleStudent.FirstName.length).toBeGreaterThan(0)
      expect(sampleStudent.LastName.length).toBeGreaterThan(0)
    })

    it('should have valid campus name', () => {
      expect(sampleStudent.Campus.length).toBeGreaterThan(0)
    })
  })

  describe('Status Object Structure', () => {
    let sampleStatus

    beforeEach(() => {
      sampleStatus = applicationsData.Applications[0].Status[0]
    })

    it('should have required status properties', () => {
      const requiredProperties = ['Checked', 'Status', 'MobileStatus']
      
      requiredProperties.forEach(prop => {
        expect(sampleStatus).toHaveProperty(prop)
      })
    })

    it('should have valid Checked value', () => {
      expect(['true', 'false']).toContain(sampleStatus.Checked)
    })

    it('should have non-empty status messages', () => {
      expect(sampleStatus.Status.length).toBeGreaterThan(0)
      expect(sampleStatus.MobileStatus.length).toBeGreaterThan(0)
    })
  })

  describe('Reasons Object Structure', () => {
    let sampleReason

    beforeEach(() => {
      sampleReason = applicationsData.Applications[0].Reasons[0]
    })

    it('should have required reason properties', () => {
      const requiredProperties = ['Checked', 'Reason', 'MobileReason']
      
      requiredProperties.forEach(prop => {
        expect(sampleReason).toHaveProperty(prop)
      })
    })

    it('should have valid Checked value', () => {
      expect(['true', 'false']).toContain(sampleReason.Checked)
    })

    it('should have non-empty reason messages', () => {
      expect(sampleReason.Reason.length).toBeGreaterThan(0)
      expect(sampleReason.MobileReason.length).toBeGreaterThan(0)
    })
  })

  describe('Data Consistency', () => {
    it('should have consistent ID formats', () => {
      applicationsData.Applications.forEach(app => {
        expect(app.Id).toMatch(/^\d+$/) // Should be numeric
        expect(app.Index).toMatch(/^\d+$/) // Should be numeric
        expect(app.BatchNum).toMatch(/^\d+$/) // Should be numeric
      })
    })

    it('should have valid language values', () => {
      const validLanguages = ['English', 'Spanish']
      
      applicationsData.Applications.forEach(app => {
        expect(validLanguages).toContain(app.Language)
      })
    })

    it('should have valid boolean string values', () => {
      const booleanFields = ['Selected', 'Sent', 'Printed']
      
      applicationsData.Applications.forEach(app => {
        booleanFields.forEach(field => {
          expect(['true', 'false']).toContain(app[field])
        })
      })
    })

    it('should have consistent guardian IDs', () => {
      applicationsData.Applications.forEach(app => {
        app.Guardians.forEach(guardian => {
          expect(guardian.Id).toBe(app.Id)
        })
      })
    })
  })

  describe('Business Logic Validation', () => {
    it('should have at least one checked status per application', () => {
      applicationsData.Applications.forEach(app => {
        const checkedStatuses = app.Status.filter(status => status.Checked === 'true')
        expect(checkedStatuses.length).toBe(1) // Exactly one status should be checked
      })
    })

    it('should have at least one guardian per application', () => {
      applicationsData.Applications.forEach(app => {
        expect(app.Guardians.length).toBeGreaterThan(0)
      })
    })

    it('should have at least one student per application', () => {
      applicationsData.Applications.forEach(app => {
        expect(app.Students.length).toBeGreaterThan(0)
      })
    })

    it('should have valid date format', () => {
      applicationsData.Applications.forEach(app => {
        if (app.Date) {
          const dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/
          expect(dateRegex.test(app.Date)).toBe(true)
        }
      })
    })
  })

  describe('Multi-language Support', () => {
    it('should have English applications with English status messages', () => {
      const englishApps = applicationsData.Applications.filter(app => app.Language === 'English')
      
      englishApps.forEach(app => {
        app.Status.forEach(status => {
          expect(status.Status).toMatch(/^(Approved|Denied)/)
        })
      })
    })

    it('should have Spanish applications with Spanish status messages', () => {
      const spanishApps = applicationsData.Applications.filter(app => app.Language === 'Spanish')
      
      spanishApps.forEach(app => {
        app.Status.forEach(status => {
          expect(status.Status).toMatch(/^(Aprovada|Negada)/)
        })
      })
    })
  })

  describe('Sample Data Coverage', () => {
    it('should include various application statuses', () => {
      const statusTypes = new Set()
      
      applicationsData.Applications.forEach(app => {
        app.Status.forEach(status => {
          if (status.Checked === 'true') {
            if (status.Status.includes('free meals')) {
              statusTypes.add('free')
            } else if (status.Status.includes('reduced-price')) {
              statusTypes.add('reduced')
            } else if (status.Status.includes('Denied')) {
              statusTypes.add('denied')
            }
          }
        })
      })
      
      expect(statusTypes.size).toBeGreaterThan(0)
    })

    it('should include various campuses', () => {
      const campuses = new Set()
      
      applicationsData.Applications.forEach(app => {
        app.Students.forEach(student => {
          campuses.add(student.Campus)
        })
      })
      
      expect(campuses.size).toBeGreaterThan(1) // Should have multiple campuses
    })

    it('should include various batch numbers', () => {
      const batchNumbers = new Set()
      
      applicationsData.Applications.forEach(app => {
        batchNumbers.add(app.BatchNum)
      })
      
      expect(batchNumbers.size).toBeGreaterThan(1) // Should have multiple batches
    })
  })
})
