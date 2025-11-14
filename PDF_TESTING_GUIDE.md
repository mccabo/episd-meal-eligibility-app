# PDF Functionality Testing & Setup Guide

## 🖨️ Current PDF Implementation Status

### **What's Working:**
- ✅ PDF route endpoints exist (`/printbyId`, `/appIndex`)
- ✅ HTML generation for letters
- ✅ Frontend buttons properly configured

### **What Needs Attention:**
- ⚠️ `wkhtmltopdf` requires installation on Render
- ⚠️ Render Free tier has limitations for system packages

---

## 📝 File Access Guide

### **Direct URLs (Read-Only)**
- **Config:** https://episd-backend.onrender.com/config.json
- **Applications:** https://episd-backend.onrender.com/applications.json
- **Show Config Page:** https://episd-backend.onrender.com/showConfig

### **Edit Files - Best Practices**

#### **Method 1: Local Edit + Git Deploy (Recommended)**
```bash
# 1. Navigate to your project
cd "D:\Projects\EPISD\deploy template"

# 2. Edit files with your favorite editor
notepad public\config.json
notepad public\applications.json
notepad src\assets\json\searches.json  # Frontend uses this one!

# 3. Test locally (optional)
node server.js              # Test backend on localhost:3000
npm run serve               # Test frontend on localhost:8081

# 4. Commit and deploy
git add .
git commit -m "Update JSON configuration"
git push

# Render will auto-deploy your backend!
# Then rebuild and deploy frontend:
npm run build
firebase deploy --only hosting
```

#### **Method 2: Render Dashboard**
1. Visit https://dashboard.render.com
2. Select `episd-backend` service
3. Click **Shell** tab
4. Navigate and edit:
```bash
cd public
nano config.json
# Save: Ctrl+O, Enter, Ctrl+X
```

---

## 🧪 Testing PDF Functionality

### **Local Testing (Windows)**
Your `server.js` is configured for Windows development:

```bash
# 1. Ensure wkhtmltopdf is installed
# Download from: https://wkhtmltopdf.org/downloads.html
# Default install: C:/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe

# 2. Start your backend
node server.js

# 3. Test routes
# Visit: http://localhost:3000/printbyId?frmData=2025951
```

### **Production Testing on Render**

**Issue:** `wkhtmltopdf` is not installed by default on Render.

**Solutions:**

#### **Option A: Use Puppeteer Instead (Recommended)**
Puppeteer is a headless Chrome library that works well on Render:

```bash
npm install puppeteer
```

Then modify your PDF generation code to use Puppeteer instead of wkhtmltopdf.

#### **Option B: Docker Deployment**
Create a `Dockerfile` with wkhtmltopdf:

```dockerfile
FROM node:18
RUN apt-get update && apt-get install -y wkhtmltopdf xvfb
COPY . /app
WORKDIR /app
RUN npm install
CMD ["node", "server.js"]
```

Then change Render service type to "Docker".

#### **Option C: Native Service (Paid Plan)**
Render's paid plans allow installing system packages:
- Upgrade to Starter plan ($7/month)
- Add build command:
```bash
apt-get update && apt-get install -y wkhtmltopdf
npm install
```

---

## 🎯 Quick PDF Test Steps

### **1. Test Show PDFs Button**
```
1. Login to your app: https://freeandreduced-ac6d8.web.app
2. Select one or more applications (checkboxes)
3. Click "Show PDFs" in Utilities section
4. Should navigate to backend and display PDFs
```

### **2. Test Print Button**
```
1. Login to your app
2. Select applications
3. Click "Print" button
4. Should generate PDF for printing
```

### **3. Test Direct Backend Access**
```
Visit: https://episd-backend.onrender.com/appIndex?frmData=2025951

Expected: HTML page showing application details for ID 2025951
```

---

## 🔧 What I've Fixed

1. **Platform-Specific wkhtmltopdf Path**
   - Windows: Uses full path
   - Linux (Render): Uses system path
   
2. **Updated `render.yaml`**
   - Added environment variables
   - Configured for free tier

3. **Backend URL Configuration**
   - All frontend buttons now use `apiBaseUrl`
   - Points to Render backend

---

## 📊 Current Test Status

| Feature | Local (Windows) | Render (Production) |
|---------|-----------------|---------------------|
| View Applications | ✅ Ready | ✅ Ready |
| Show Config | ✅ Ready | ✅ Ready |
| PDF Generation | ✅ Ready (if wkhtmltopdf installed) | ⚠️ Needs wkhtmltopdf |
| HTML Letters | ✅ Ready | ✅ Ready |

---

## 🚀 Next Steps

1. **Test HTML Letter Display**
   ```
   https://episd-backend.onrender.com/appIndex?frmData=2025951
   ```

2. **For PDF Support, Choose:**
   - Install Puppeteer (no system deps needed)
   - Upgrade Render plan for wkhtmltopdf
   - Use Docker deployment

3. **Test Application Flow**
   - Select applications in UI
   - Click utilities buttons
   - Verify backend responses

---

## 💡 Tips

- **Clear Cache:** Always do Ctrl+Shift+R after deployments
- **Check Logs:** Render Dashboard → episd-backend → Logs tab
- **Test Incrementally:** Test one button at a time
- **Monitor:** Watch browser console (F12) for errors

---

## 📞 Support Resources

- **Render Docs:** https://render.com/docs
- **wkhtmltopdf:** https://wkhtmltopdf.org
- **Puppeteer:** https://pptr.dev
- **Your Backend:** https://episd-backend.onrender.com
- **Your Frontend:** https://freeandreduced-ac6d8.web.app

