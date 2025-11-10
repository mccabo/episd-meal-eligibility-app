# Troubleshooting: Users Going to localStorage Instead of users.json

## 🔍 Problem

New users are being saved to **localStorage** instead of **users.json** file.

## 🎯 Root Cause

The frontend is falling back to localStorage because it **cannot connect to the backend server**. This happens when:

1. ❌ Backend server is not running
2. ❌ Server is running on wrong port
3. ❌ CORS is blocking the request
4. ❌ Firewall is blocking localhost:3000

## ✅ Solution Steps

### Step 1: Verify Server is Running

**Open a terminal and run:**
```bash
node server.js
```

**Expected output:**
```
Print Server listening at http://localhost:3000
```

**If you see an error:**
- Check if port 3000 is already in use
- Try killing the process using port 3000
- Or change the port in server.js

### Step 2: Test Server Endpoints

**Option A: Use Test Page (Easiest)**
1. Open `test-server.html` in your browser
2. Click "Check Server" button
3. All tests should show ✅ green

**Option B: Use curl**
```bash
# Test health endpoint
curl http://localhost:3000/health

# Test get users
curl http://localhost:3000/users

# Test register user
curl -X POST http://localhost:3000/register-user \
  -H "Content-Type: application/json" \
  -d '{"username":"test123","email":"test123@test.com","password":"password123","displayName":"Test User","role":"user","permissions":{"canCreate":true,"canRead":true,"canUpdate":false,"canDelete":false,"canManageUsers":false,"canAccessReports":false,"canConfigureSystem":false}}'
```

**Option C: Browser Console**
```javascript
// Test in browser console (F12)
fetch('http://localhost:3000/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
```

### Step 3: Check Browser Console

When you try to register a user, check the browser console (F12). You should see:

**✅ If server is working:**
```
🔄 Attempting to register user via server API...
📤 Request URL: http://localhost:3000/register-user
📤 Request data: {username: "...", email: "...", ...}
📥 Server response status: 200 OK
✅ User registered successfully via server: {user object}
```

**❌ If server is NOT working:**
```
🔄 Attempting to register user via server API...
📤 Request URL: http://localhost:3000/register-user
📤 Request data: {username: "...", email: "...", ...}
❌ Server registration failed!
❌ Error type: TypeError
❌ Error message: Failed to fetch
⚠️ FALLING BACK TO LOCALSTORAGE - Users will NOT be saved to users.json!
⚠️ Make sure server is running: node server.js
```

### Step 4: Check Server Console

When registration happens, the server console should show:

**✅ Success:**
```
POST /register-user - Registering new user
Users file path: D:\Projects\EPISD\deploy template\public\users.json
Current users count: 5
Adding user with ID: 6
✓ User registered successfully: username
```

**❌ If you see nothing:**
- Server is not receiving the request
- Check if server is actually running
- Check firewall settings

## 🔧 Common Issues & Fixes

### Issue 1: "Failed to fetch"

**Symptoms:**
- Browser console shows "Failed to fetch"
- Users going to localStorage

**Fix:**
```bash
# Make sure server is running
node server.js

# In another terminal, test it
curl http://localhost:3000/health
```

### Issue 2: Server Running but Not Responding

**Symptoms:**
- Server console shows "listening at http://localhost:3000"
- But fetch still fails

**Fix:**
1. Check if another process is using port 3000:
   ```bash
   # Windows
   netstat -ano | findstr :3000
   
   # Mac/Linux
   lsof -i :3000
   ```

2. Kill the process or change port in server.js:
   ```javascript
   const port = 3001; // Change from 3000
   ```

3. Update frontend URL in `useLocalAuth.js`:
   ```javascript
   fetch('http://localhost:3001/register-user', ...)
   ```

### Issue 3: CORS Error

**Symptoms:**
- Browser console shows CORS policy error
- Network tab shows OPTIONS request failing

**Fix:**
The CORS middleware is already configured in server.js. If you still see CORS errors:

1. Check the CORS middleware is before your routes in server.js
2. Clear browser cache
3. Try in incognito mode

### Issue 4: Port Already in Use

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Fix Option 1: Kill the process**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

**Fix Option 2: Use different port**
1. Change port in server.js to 3001
2. Update frontend to use port 3001

### Issue 5: Firewall Blocking

**Symptoms:**
- Server runs fine
- curl works locally
- Browser cannot connect

**Fix:**
1. Check Windows Firewall
2. Allow Node.js through firewall
3. Or temporarily disable firewall to test

### Issue 6: Wrong Working Directory

**Symptoms:**
```
Error: ENOENT: no such file or directory, open 'public\users.json'
```

**Fix:**
Make sure you're running the server from the project root:
```bash
# Navigate to project root first
cd "D:\Projects\EPISD\deploy template"

# Then run server
node server.js
```

## 📋 Verification Checklist

Use this checklist to verify everything is working:

- [ ] Server is running: `node server.js`
- [ ] Server console shows: "Print Server listening at http://localhost:3000"
- [ ] Test page shows all green: Open `test-server.html`
- [ ] Health endpoint works: `curl http://localhost:3000/health`
- [ ] Get users works: `curl http://localhost:3000/users`
- [ ] Register test user works using test page
- [ ] Browser console shows "✅ User registered successfully via server"
- [ ] Server console shows "✓ User registered successfully: username"
- [ ] New user appears in `public/users.json`

## 🎯 Quick Test Procedure

**Complete test in 2 minutes:**

1. **Terminal 1 - Start Server:**
   ```bash
   cd "D:\Projects\EPISD\deploy template"
   node server.js
   ```
   Wait for: "Print Server listening at http://localhost:3000"

2. **Terminal 2 - Test Server:**
   ```bash
   curl http://localhost:3000/health
   ```
   Should return: `{"status":"ok","message":"Server is running"}`

3. **Browser - Test Registration:**
   - Open `test-server.html`
   - Click "Test POST /register-user"
   - Should show: ✅ Success

4. **Verify File:**
   - Open `public/users.json`
   - New test user should be at the bottom

## 🚨 Still Not Working?

### Debug Mode

Add this to see detailed logs:

**In server.js, add before the register-user endpoint:**
```javascript
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
```

**Then check server console when you register a user.**

### Manual Test

Test the endpoint manually to isolate the issue:

**1. Create test file: `test-register.js`**
```javascript
const fetch = require('node-fetch');

const testUser = {
  username: `test_${Date.now()}`,
  email: `test_${Date.now()}@test.com`,
  password: 'password123',
  displayName: 'Test User',
  role: 'user',
  permissions: {
    canCreate: true,
    canRead: true,
    canUpdate: false,
    canDelete: false,
    canManageUsers: false,
    canAccessReports: false,
    canConfigureSystem: false
  }
};

fetch('http://localhost:3000/register-user', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(testUser)
})
  .then(r => r.json())
  .then(data => {
    console.log('✅ Success:', data);
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
  });
```

**2. Run it:**
```bash
npm install node-fetch
node test-register.js
```

**3. Check result:**
- Should print: "✅ Success: {user data}"
- Check `public/users.json` - user should be there

## 📞 Need More Help?

**Provide this information:**
1. Server console output (copy/paste)
2. Browser console output (copy/paste from F12)
3. Output of: `curl http://localhost:3000/health`
4. Operating system version
5. Node.js version: `node --version`
6. Contents of last 10 lines of users.json

## 🎉 Success Indicators

You'll know it's working when:

✅ Server console shows: "✓ User registered successfully: username"  
✅ Browser console shows: "✅ User registered successfully via server"  
✅ `public/users.json` has new user at the bottom  
✅ User Management page shows source: "Server"  
✅ No "FALLING BACK TO LOCALSTORAGE" warnings  

## 📚 Related Documentation

- **Complete Guide:** `USERS_JSON_REGISTRATION.md`
- **Quick Start:** `QUICK_START_SERVER_REGISTRATION.md`
- **Test Page:** `test-server.html`

