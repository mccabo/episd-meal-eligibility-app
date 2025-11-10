# Quick Start: Server-Based User Registration

## 🚀 Quick Setup

### Step 1: Start Backend Server
```bash
node server.js
```
**Expected output:**
```
Print Server listening at http://localhost:3000
```

### Step 2: Start Frontend
```bash
npm run serve
```
**Expected output:**
```
App running at:
- Local:   http://localhost:8080/
```

## ✅ What Changed

### Before (localStorage)
- New users → Saved to browser localStorage
- Users lost when localStorage cleared
- Different on each browser/device
- Not permanent

### After (users.json via Server API)
- New users → Saved to `public/users.json`
- Persistent across sessions
- Shared across all users
- Permanent storage
- **Fallback to localStorage if server down**

## 📝 How to Register a New User

1. **Ensure server is running** (`node server.js`)
2. Navigate to: `http://localhost:8080/signup`
3. Fill in the form:
   - Display Name: `John Doe`
   - Username: `johndoe`
   - Email: `john@example.com`
   - Password: `password123` (min 6 chars)
   - Role: Select from dropdown
4. Click "Sign Up"
5. **Check the server console:**
   ```
   POST /register-user - Registering new user
   Current users count: 5
   Adding user with ID: 6
   ✓ User registered successfully: johndoe
   ```
6. **Verify in users.json:**
   - Open `public/users.json`
   - New user should be at the bottom

## 🔍 Verification

### Check Server Console
```
✓ User registered successfully: username
```

### Check Browser Console
```
✓ User registered successfully via server: {user object}
```

### Check users.json File
```bash
# Windows
type public\users.json

# Mac/Linux
cat public/users.json
```

## 🎯 Quick Test

### Test 1: Registration (Server Running)
```bash
# Terminal 1
node server.js

# Terminal 2
npm run serve

# Browser
Go to /signup → Register user → Check users.json ✓
```

### Test 2: Registration (Server NOT Running)
```bash
# Only start frontend
npm run serve

# Browser
Go to /signup → Register user → User saved to localStorage
Console shows: "⚠ Server registration failed, trying localStorage fallback"
```

### Test 3: Login with New User
```bash
# Register user: test@example.com / password123
# Logout
# Login with: test@example.com / password123
# Should work! ✓
```

### Test 4: View in User Management
```bash
# Login as admin
# Go to /user-management
# See all users including newly registered ones ✓
# Check "Source" column: "Server" or "localStorage"
```

## 🛠️ New Server Endpoints

### Register User
```bash
POST http://localhost:3000/register-user
Content-Type: application/json

{
  "username": "newuser",
  "email": "new@example.com",
  "password": "password123",
  "displayName": "New User",
  "role": "user",
  "permissions": { ... }
}
```

### Get All Users
```bash
GET http://localhost:3000/users
```

## 🔧 Troubleshooting

### ❌ "Failed to fetch"
**Problem:** Backend server not running  
**Solution:** Run `node server.js`

### ❌ "Email or username already exists"
**Problem:** Duplicate credentials  
**Solution:** Use different email/username OR edit users.json

### ❌ User not in users.json
**Problem:** Server was not running  
**Solution:** User saved to localStorage instead. Migrate manually or re-register.

### ❌ Can't see new users
**Problem:** Page not refreshed  
**Solution:** Reload page or logout/login

## 📊 Where Are Users Stored?

| Scenario | Storage Location | Permanent? |
|----------|-----------------|------------|
| Server running | `public/users.json` | ✅ Yes |
| Server down | `localStorage.customUsers` | ⚠️ No (browser only) |

## 🎓 Advanced

### Test API with curl
```bash
# Register user
curl -X POST http://localhost:3000/register-user \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com", 
    "password": "password123",
    "displayName": "Test User",
    "role": "user",
    "permissions": {
      "canCreate": true,
      "canRead": true,
      "canUpdate": false,
      "canDelete": false,
      "canManageUsers": false,
      "canAccessReports": false,
      "canConfigureSystem": false
    }
  }'

# Get all users
curl http://localhost:3000/users
```

### View localStorage Users
```javascript
// In browser console
const customUsers = JSON.parse(localStorage.getItem('customUsers') || '[]');
console.table(customUsers);
```

### Clear localStorage
```javascript
// If you want to clear localStorage users
localStorage.removeItem('customUsers');
```

## 📚 Documentation

- **Complete Guide:** `USERS_JSON_REGISTRATION.md`
- **Authentication Docs:** `docs/LOCAL_AUTHENTICATION.md`
- **Quick Start:** `LOCAL_AUTH_QUICKSTART.md`

## ✨ Benefits

✅ **Persistent** - Users saved to file  
✅ **Shared** - All sessions see same users  
✅ **Automatic IDs** - Sequential user IDs  
✅ **Validation** - Duplicate prevention  
✅ **Fallback** - Works without server (localStorage)  
✅ **API Ready** - RESTful endpoints  

## 🎉 You're Ready!

Just remember:
1. **Start server:** `node server.js`
2. **Start frontend:** `npm run serve`
3. **Register users** → They go to users.json!

That's it! 🚀

