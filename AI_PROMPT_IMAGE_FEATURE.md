# AI Prompt - Image Analysis Feature

## 🖼️ Overview

The AI Prompt component now supports downloading images from the internet and using them with AI vision capabilities!

## ✨ Features Added

### 1. **Image URL Input**
- Enter any publicly accessible image URL
- Supports common formats: JPG, PNG, GIF, WebP, etc.

### 2. **Image Download**
- Server-side image fetching (avoids CORS issues)
- Converts to base64 for easy transmission
- Preview loaded images before submission

### 3. **AI Vision Analysis**
- Automatically uses GPT-4 Vision when image is included
- Analyze, describe, or ask questions about images
- Falls back to GPT-3.5 for text-only prompts

### 4. **Image Management**
- Preview downloaded images
- Remove images if needed
- Clear all data at once

## 🚀 How to Use

### Step 1: Enter Image URL

In the "📷 Add Image" section:
```
https://example.com/path/to/image.jpg
```

### Step 2: Click "Load Image"

The server will:
1. Download the image
2. Convert to base64
3. Display a preview
4. Show a green checkmark when ready

### Step 3: Enter Your Prompt

Ask questions about the image:
```
What objects can you see in this image?
Describe the colors and composition.
Is there any text visible in this image?
What is the mood or atmosphere of this scene?
```

### Step 4: Submit

Click "Submit Prompt" - your image will be analyzed!

## 📝 Example Use Cases

### 1. **Image Description**
```
URL: https://example.com/photo.jpg
Prompt: Describe everything you see in this image in detail.
```

### 2. **Object Detection**
```
URL: https://example.com/street-scene.jpg
Prompt: List all the vehicles and their colors that you can see.
```

### 3. **Text Extraction**
```
URL: https://example.com/document.jpg
Prompt: Extract and list all the text visible in this image.
```

### 4. **Analysis & Insights**
```
URL: https://example.com/chart.jpg
Prompt: Analyze this chart and explain the key trends.
```

### 5. **Quality Assessment**
```
URL: https://example.com/product.jpg
Prompt: Evaluate the quality and condition of this product.
```

## 🎨 UI Elements

### Image Input Section
- **Gray dashed border** - Drag-and-drop visual style
- **Input field** - For pasting image URLs
- **Green "Load Image" button** - Downloads and displays image
- **File size display** - Shows loaded image size

### Image Preview
- **Green border** - Indicates image is loaded
- **Preview image** - Scaled to fit (max 400px height)
- **Image info** - Confirmation message
- **Red "Remove" button** - Clear the image

### Updated Textarea
- **Placeholder changes** when image is loaded
- Prompts you to ask about the image

## 🔧 Technical Details

### Frontend (Vue Component)
```javascript
// Located in: src/components/AIPrompt.vue
- imageUrl: ref('')        // URL input
- downloadedImage: ref('') // Base64 image data
- imageData: ref(null)     // Image for submission
```

### Server Endpoints

#### 1. `/download-image` (POST)
Downloads image from URL and returns base64 data.

**Request:**
```json
{
  "imageUrl": "https://example.com/image.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "imageData": "data:image/jpeg;base64,...",
  "contentType": "image/jpeg",
  "size": 12345
}
```

#### 2. `/ai-prompt` (POST) - Enhanced
Now accepts optional image data.

**Request:**
```json
{
  "prompt": "What's in this image?",
  "image": "data:image/jpeg;base64,...",
  "imageUrl": "https://example.com/image.jpg"
}
```

### OpenAI Integration

**With Image:**
- Uses `gpt-4-vision-preview` model
- Sends image as base64 data URL
- Costs more than text-only

**Without Image:**
- Uses `gpt-3.5-turbo` model
- Standard text processing
- More cost-effective

### Firebase Storage

Prompt data now includes:
```javascript
{
  prompt: "...",
  response: "...",
  hasImage: true,
  imageUrl: "https://...",
  timestamp: ServerTimestamp,
  status: "completed",
  createdAt: "2025-11-09T..."
}
```

## 💰 Cost Considerations

### GPT-4 Vision Pricing
- More expensive than GPT-3.5-turbo
- Charges based on image size and tokens
- Typical cost: $0.01 - $0.05 per image analysis
- Set usage limits to control costs!

### Image Download
- Server bandwidth usage
- Consider caching frequently used images
- Limit image size if needed

## 🔒 Security Considerations

### Image URL Validation
- Only accepts HTTP/HTTPS URLs
- Validates content-type is an image
- 30-second timeout prevents hanging

### Best Practices
1. Don't download from untrusted sources
2. Validate image URLs before submission
3. Consider rate limiting the download endpoint
4. Monitor server bandwidth usage

## 🐛 Troubleshooting

### "Failed to load image"
**Causes:**
- Image URL is not publicly accessible
- CORS restrictions on the image host
- Invalid image format
- Timeout (image too large or slow server)

**Solutions:**
- Verify the URL works in a browser
- Try a different image host
- Use smaller images
- Check server logs for details

### "Image analysis not working"
**Causes:**
- OpenAI API key not configured
- GPT-4 Vision not enabled for account
- Insufficient balance/credits

**Solutions:**
- Set OPENAI_API_KEY in .env
- Enable GPT-4 Vision in OpenAI dashboard
- Add credits to your account

### Image not displaying
**Causes:**
- Base64 data corrupted
- Browser memory limits
- Image too large

**Solutions:**
- Refresh the page
- Use smaller images (< 5MB recommended)
- Check browser console for errors

## 📊 Supported Image Formats

✅ **Supported:**
- JPEG / JPG
- PNG
- GIF
- WebP
- BMP

❌ **Not Supported:**
- SVG (might work but not recommended)
- TIFF (usually too large)
- Raw image formats

## 🎯 Limitations

1. **Image Size:** Best with images under 5MB
2. **Resolution:** GPT-4 Vision automatically resizes large images
3. **Processing Time:** Image analysis takes 5-15 seconds
4. **Cost:** More expensive than text-only prompts
5. **API Access:** Requires OpenAI GPT-4 Vision access

## 🚀 Future Enhancements

Potential improvements:
- [ ] Upload images from local device
- [ ] Support multiple images in one prompt
- [ ] Image history and favorites
- [ ] Drag-and-drop image upload
- [ ] Image editing before analysis
- [ ] Batch image processing
- [ ] Save analyzed images to Firebase Storage

## 📚 Resources

- [OpenAI Vision API Docs](https://platform.openai.com/docs/guides/vision)
- [GPT-4 Vision Pricing](https://openai.com/pricing)
- [Supported Image Formats](https://platform.openai.com/docs/guides/vision/what-type-of-files-can-i-upload)

## ✅ Quick Test

Try these public image URLs:
```
https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0
https://picsum.photos/800/600
https://via.placeholder.com/600x400.png/09f/fff?text=Test+Image
```

Prompts to try:
```
Describe this image in detail
What colors are dominant in this image?
What mood does this image convey?
```

---

**Feature Added:** November 9, 2025  
**Component:** AIPrompt.vue  
**Endpoints:** `/download-image`, `/ai-prompt` (enhanced)

