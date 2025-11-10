# Image Recognition Suite Documentation

## Overview

The Image Recognition Suite is a comprehensive Vue.js component that provides three types of image processing capabilities:

1. **OCR (Optical Character Recognition)** - Extract text from images
2. **OMR (Optical Mark Recognition)** - Detect marked bubbles/checkboxes in forms
3. **IMR (Intelligent Mark Recognition)** - Advanced form processing with AI-assisted data extraction

## Features

### OCR - Optical Character Recognition
- Extract text from images in multiple languages (English, Spanish, French, German, Chinese, Arabic)
- Automatic image preprocessing for better accuracy
- Confidence scores for extracted text
- Copy to clipboard functionality
- Download results as plain text

### OMR - Optical Mark Recognition
- Detect marked bubbles in multiple-choice answer sheets
- Configurable grid dimensions (rows and columns)
- Adjustable detection threshold
- Visual representation of detected marks
- Export results as CSV

### IMR - Intelligent Mark Recognition
- Comprehensive form data extraction
- Auto-detect form structure
- Extract checkboxes and their states
- Signature detection and extraction
- Support for multiple form types (Generic, MCQ, Survey, Application, Registration)
- Export as JSON or CSV

## Accessing the Feature

Navigate to the Image Recognition page by:
1. Clicking the **"Image Recognition"** button in the navigation bar (purple button with image icon)
2. Or directly accessing the route: `/image-recognition`

## Usage Guide

### Step 1: Select Recognition Mode

Choose the appropriate mode for your task:
- **OCR** - For extracting text from documents, receipts, forms with text
- **OMR** - For multiple-choice answer sheets, bubble forms
- **IMR** - For complex forms requiring data extraction

### Step 2: Upload an Image

Two ways to upload:
1. **Click** the upload area to browse and select a file
2. **Drag and drop** an image file onto the upload area

Supported formats: JPG, PNG, BMP, TIFF

### Step 3: Configure Options

#### OCR Options:
- **Language**: Select the primary language of the text in the image
- **Preprocessing**: Enable to apply automatic image enhancement (recommended for low-quality images)

#### OMR Options:
- **Number of Rows**: Total rows in your answer sheet
- **Number of Columns**: Total columns (answer options) per row
- **Detection Threshold**: Percentage of darkness to consider a bubble as marked (default: 50%)

#### IMR Options:
- **Form Type**: Select the type of form being processed
- **Auto-detect**: Let the system automatically detect form structure
- **Extract Signatures**: Include signature detection in the analysis

### Step 4: Process the Image

Click the **"Process Image"** button to start the recognition process.

The processing log at the bottom will show real-time progress updates.

### Step 5: Review and Export Results

#### OCR Results:
- View extracted text in an editable text area
- See confidence score
- Copy to clipboard
- Download as TXT file

#### OMR Results:
- View all detected marks in a sortable table
- See intensity percentage for each position
- Status indicators (MARKED/EMPTY)
- Export complete results as CSV

#### IMR Results:
- View extracted form fields in organized sections
- Review checkbox states
- View extracted signatures
- Export as JSON (complete data) or CSV (field values)

## Technical Details

### Dependencies

The Image Recognition component uses:
- **Tesseract.js** - JavaScript OCR engine loaded from CDN
- **HTML5 Canvas API** - For image manipulation and analysis
- **PrimeVue** - UI components

### Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Supported with responsive design

### Performance Considerations

- OCR processing time depends on:
  - Image size and resolution
  - Text complexity
  - Selected language
  - Preprocessing enabled

- OMR processing is generally fast (< 2 seconds for typical forms)

- IMR processing combines OCR and image analysis, so may take longer

### Tips for Best Results

#### OCR:
1. Use high-resolution images (300 DPI or higher recommended)
2. Ensure good contrast between text and background
3. Avoid skewed or rotated text when possible
4. Enable preprocessing for photos or low-quality scans

#### OMR:
1. Ensure bubbles/marks are uniform in size
2. Use clear, distinct marks (fully filled bubbles)
3. Avoid shadows or image distortions
4. Adjust threshold if marks are not being detected correctly

#### IMR:
1. Use clear, well-structured forms
2. Ensure good image quality
3. Enable auto-detect for unknown form layouts
4. Review extracted data for accuracy

## Limitations

1. **OCR Accuracy**: Depends heavily on image quality. Handwritten text may have lower accuracy.
2. **OMR Grid Detection**: Requires consistent bubble positioning. Irregular layouts may need manual configuration.
3. **IMR Form Recognition**: Works best with standard form layouts. Complex or unusual forms may require manual review.
4. **Browser Performance**: Very large images may take longer to process or require more memory.

## Troubleshooting

### OCR Not Working
- Check browser console for errors
- Ensure Tesseract.js loaded successfully (check processing log)
- Try enabling preprocessing
- Verify image format is supported

### OMR Not Detecting Marks
- Adjust the detection threshold
- Verify row/column counts match your form
- Check that bubbles are properly filled
- Ensure image has good contrast

### IMR Results Incomplete
- Enable auto-detect if form structure is complex
- Try processing with OCR mode first to verify text is readable
- Check that form type matches your document
- Verify image quality and resolution

## API Integration

The component can be extended to integrate with backend services:

```javascript
// Example: Send OCR results to backend
const results = await performOCR()
await axios.post('/api/ocr-results', {
  text: results.text,
  confidence: results.confidence,
  timestamp: new Date().toISOString()
})
```

## Future Enhancements

Planned features for future releases:
- Batch processing of multiple images
- PDF document support
- Custom form template creation
- Machine learning model training for specific form types
- Real-time camera capture
- Multi-page document processing
- Barcode and QR code detection

## Support

For issues, questions, or feature requests, please contact the development team or submit an issue in the project repository.

## Version History

### Version 1.0.0 (Current)
- Initial release
- OCR with Tesseract.js
- OMR grid detection
- IMR form processing
- Multi-language support
- Export functionality


