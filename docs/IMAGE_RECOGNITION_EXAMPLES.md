# Image Recognition - Usage Examples

## Example 1: Extract Text from a Business Card (OCR)

### Scenario
You received a business card at a conference and want to digitize the contact information.

### Steps
1. Navigate to **Image Recognition**
2. Select **OCR - Text Recognition** mode
3. Upload a photo of the business card
4. Settings:
   - Language: English
   - Preprocessing: ✓ Enabled
5. Click **Process Image**
6. Wait for OCR to complete (usually 5-10 seconds)
7. Review extracted text
8. Copy to clipboard or download as TXT

### Expected Output
```
John Smith
Senior Developer
ABC Technology Solutions
john.smith@abctech.com
+1 (555) 123-4567
www.abctech.com
```

### Tips
- Take photo with good lighting
- Ensure text is horizontal and readable
- White background works best

---

## Example 2: Grade a Multiple Choice Test (OMR)

### Scenario
You have a 50-question multiple choice test with 4 answer options (A, B, C, D) that needs grading.

### Steps
1. Navigate to **Image Recognition**
2. Select **OMR - Mark Recognition** mode
3. Upload scan of the answer sheet
4. Configure settings:
   - Number of Rows: **50**
   - Number of Columns: **4**
   - Detection Threshold: **50%**
5. Click **Process Image**
6. Wait for analysis (usually 2-3 seconds)
7. Review results table
8. Export as CSV

### Sample Results Table
| Row | Column | Intensity | Status |
|-----|--------|-----------|--------|
| 1   | 2      | 78.5%     | MARKED |
| 2   | 1      | 82.3%     | MARKED |
| 3   | 4      | 15.2%     | EMPTY  |
| 4   | 3      | 91.7%     | MARKED |

### Tips
- Scan at 300 DPI or higher
- Ensure bubbles are uniformly filled
- If marks aren't detected, lower threshold to 40%
- If too many false positives, raise threshold to 60%

---

## Example 3: Process Job Application Form (IMR)

### Scenario
You need to digitize data from a paper job application form.

### Steps
1. Navigate to **Image Recognition**
2. Select **IMR - Intelligent Mark Recognition** mode
3. Upload scan of the application form
4. Configure settings:
   - Form Type: **Application Form**
   - Auto-detect: ✓ Enabled
   - Extract signatures: ✓ Enabled
5. Click **Process Image**
6. Wait for processing (15-30 seconds)
7. Review extracted data in accordion sections
8. Export as JSON or CSV

### Expected Data Structure

#### Form Fields
```json
{
  "First Name": "Jane",
  "Last Name": "Doe",
  "Email": "jane.doe@email.com",
  "Phone": "(555) 987-6543",
  "Position": "Software Engineer",
  "Date of Birth": "01/15/1995"
}
```

#### Checkboxes
| Field | Status |
|-------|--------|
| Authorize background check | CHECKED |
| Available immediately | CHECKED |
| Willing to relocate | UNCHECKED |

#### Signatures
- Applicant Signature: [Image extracted]
- Date: 10/20/2025

### Tips
- Use clear, complete scans
- Ensure form is properly aligned
- Review extracted data for accuracy
- Export as JSON for database import

---

## Example 4: Survey Response Analysis (IMR)

### Scenario
Analyze responses from paper survey forms.

### Steps
1. Navigate to **Image Recognition**
2. Select **IMR - Intelligent Mark Recognition** mode
3. Upload survey form image
4. Settings:
   - Form Type: **Survey Form**
   - Auto-detect: ✓ Enabled
   - Extract signatures: ✗ Disabled
5. Click **Process Image**
6. Review checkbox responses
7. Export as CSV for analysis in Excel

### Sample CSV Export
```csv
Question,Response
"How satisfied are you?",Very Satisfied
"Would you recommend us?",Yes
"Rating (1-5)",4
"Comments","Great service, will return"
```

---

## Example 5: Invoice Data Extraction (OCR)

### Scenario
Extract key information from an invoice for accounting purposes.

### Steps
1. Navigate to **Image Recognition**
2. Select **OCR - Text Recognition** mode
3. Upload invoice scan
4. Settings:
   - Language: English
   - Preprocessing: ✓ Enabled
5. Click **Process Image**
6. Review extracted text
7. Copy relevant information to accounting software

### Extracted Information
```
INVOICE #: INV-2025-1234

Bill To:
ABC Corporation
123 Main Street
New York, NY 10001

Date: October 20, 2025
Due Date: November 20, 2025

Description                 Quantity    Price      Total
---------------------------------------------------------
Web Development Services    40 hrs      $150.00    $6,000.00
Server Hosting (1 year)     1           $1,200.00  $1,200.00
SSL Certificate            1           $100.00    $100.00
---------------------------------------------------------
                           Subtotal:              $7,300.00
                           Tax (8.5%):            $620.50
                           TOTAL:                 $7,920.50
```

---

## Example 6: Multi-Language Document (OCR)

### Scenario
Extract text from a Spanish-language document.

### Steps
1. Navigate to **Image Recognition**
2. Select **OCR - Text Recognition** mode
3. Upload document image
4. Settings:
   - Language: **Spanish**
   - Preprocessing: ✓ Enabled
5. Click **Process Image**
6. Wait for OCR completion
7. Review and export

### Example Output
```
Estimado Cliente:

Le informamos que su pedido #12345 ha sido procesado
exitosamente y será enviado a la siguiente dirección:

Calle Principal 456
Madrid, España 28001

Fecha de entrega estimada: 25 de octubre de 2025

Gracias por su confianza.
```

---

## Example 7: Answer Key Creation (OMR)

### Scenario
Create an answer key from a teacher's marked answer sheet.

### Steps
1. Navigate to **Image Recognition**
2. Select **OMR - Mark Recognition** mode
3. Upload master answer sheet
4. Settings:
   - Rows: 100
   - Columns: 5 (A, B, C, D, E)
   - Threshold: 55%
5. Click **Process Image**
6. Export as CSV
7. Use for automated grading

### Answer Key CSV
```csv
Question,Answer
1,B
2,A
3,D
4,C
5,B
...
100,A
```

---

## Best Practices Summary

### Image Quality
- ✅ High resolution (300+ DPI)
- ✅ Good lighting, no shadows
- ✅ Straight/aligned documents
- ✅ Clear, crisp text/marks
- ❌ Blurry or pixelated images
- ❌ Skewed or rotated documents
- ❌ Low contrast

### File Formats
- **Best**: PNG (lossless)
- **Good**: JPG (high quality)
- **Acceptable**: BMP, TIFF
- **Avoid**: Very compressed JPGs

### Processing Settings
| Document Type | Preprocessing | Language | Special Notes |
|---------------|--------------|----------|---------------|
| Printed text | ON | Appropriate | Usually 95%+ accuracy |
| Handwritten | ON | Appropriate | 60-85% accuracy |
| Forms | ON | Appropriate | Use IMR for structure |
| Answer sheets | OFF | N/A | Use OMR mode |
| Receipts | ON | Appropriate | May need cleanup |

---

## Common Issues and Solutions

### Issue: Low OCR Accuracy
**Solutions:**
1. Enable preprocessing
2. Increase image resolution
3. Verify correct language selected
4. Check image isn't rotated/skewed
5. Ensure good contrast

### Issue: OMR Missing Marks
**Solutions:**
1. Lower threshold (try 40%)
2. Verify row/column counts
3. Check marks are dark enough
4. Ensure uniform bubble sizes
5. Try different scan settings

### Issue: IMR Incomplete Data
**Solutions:**
1. Switch to OCR first to verify readability
2. Enable auto-detect
3. Try different form type
4. Check entire form is visible
5. Improve image quality

---

## Performance Benchmarks

| Operation | Small Image (< 1MB) | Medium Image (1-5MB) | Large Image (> 5MB) |
|-----------|---------------------|----------------------|---------------------|
| OCR | 3-8 seconds | 8-15 seconds | 15-30 seconds |
| OMR | 1-2 seconds | 2-4 seconds | 4-8 seconds |
| IMR | 10-20 seconds | 20-40 seconds | 40-60 seconds |

*Benchmarks on Chrome browser with average hardware*

---

## Integration Examples

### Save OCR Results to Database
```javascript
async function saveOCRResults(text, confidence) {
  const response = await fetch('/api/ocr-results', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      extractedText: text,
      confidence: confidence,
      timestamp: new Date().toISOString(),
      userId: currentUser.id
    })
  })
  return await response.json()
}
```

### Batch Process OMR Sheets
```javascript
async function processBatch(imageFiles) {
  const results = []
  for (const file of imageFiles) {
    const result = await processOMR(file)
    results.push(result)
  }
  return results
}
```

### Export IMR to CRM
```javascript
async function exportToCRM(formData) {
  const crmData = {
    firstName: formData.fields['First Name'],
    lastName: formData.fields['Last Name'],
    email: formData.fields['Email'],
    phone: formData.fields['Phone'],
    source: 'Paper Application',
    dateProcessed: new Date()
  }
  
  await crmAPI.createContact(crmData)
}
```

---

## Need Help?

- 📚 Full Documentation: `docs/IMAGE_RECOGNITION.md`
- 🚀 Quick Start: `docs/IMAGE_RECOGNITION_QUICKSTART.md`
- 💬 Support: Contact your system administrator


