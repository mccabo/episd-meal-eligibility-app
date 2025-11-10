# Image Recognition - Quick Start Guide

## 🚀 Getting Started in 3 Steps

### 1. Navigate to Image Recognition
Click the **purple "Image Recognition"** button in the top navigation bar.

### 2. Upload Your Image
- **Drag & drop** an image into the upload box, OR
- **Click** the upload box to browse for a file

### 3. Choose Your Mode & Process

#### For Text Extraction (OCR)
```
1. Click "OCR - Text Recognition"
2. Select language (default: English)
3. Check "Enable Image Preprocessing" for better results
4. Click "Process Image"
5. Copy or download the extracted text
```

#### For Multiple Choice Sheets (OMR)
```
1. Click "OMR - Mark Recognition"
2. Set number of rows (questions)
3. Set number of columns (answer options)
4. Adjust threshold if needed (50% is usually good)
5. Click "Process Image"
6. Export results as CSV
```

#### For Form Data Extraction (IMR)
```
1. Click "IMR - Intelligent Mark Recognition"
2. Select form type (or use Generic)
3. Enable "Auto-detect form structure"
4. Enable "Extract signatures" if needed
5. Click "Process Image"
6. Export as JSON or CSV
```

## 💡 Pro Tips

- **Better OCR Results**: Use high-resolution images (300+ DPI)
- **OMR Accuracy**: Ensure bubbles are fully and darkly filled
- **IMR Success**: Use clear, well-lit images of complete forms

## 📊 Example Use Cases

| Use Case | Mode | Settings |
|----------|------|----------|
| Scan a receipt | OCR | Language: English, Preprocessing: ON |
| Grade a test | OMR | Rows: 20, Columns: 4, Threshold: 50% |
| Process job application | IMR | Type: Application, Auto-detect: ON |
| Extract survey data | IMR | Type: Survey, Auto-detect: ON |
| Digitize invoice | OCR | Language: English, Preprocessing: ON |

## ⚡ Keyboard Shortcuts

- **Upload**: Just drag and drop anywhere on the upload area
- **Copy Results**: Use the "Copy to Clipboard" button after OCR

## 🔧 Troubleshooting Quick Fixes

| Problem | Quick Fix |
|---------|-----------|
| No text detected | Enable preprocessing, check image quality |
| Wrong marks detected | Adjust threshold slider up or down |
| Incomplete form data | Try different form type or enable auto-detect |
| Slow processing | Use smaller images or reduce resolution |

## 📱 Mobile Usage

The Image Recognition tool works on mobile devices:
1. Take a photo of your document
2. Upload directly from camera or gallery
3. Process as normal
4. Export/share results

## Need More Help?

See the full documentation at `docs/IMAGE_RECOGNITION.md`


