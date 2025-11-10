# Local Authentication - Quick Start Guide

## 🚀 What Was Created

A complete local JSON-based authentication system with role-based permissions has been added to your application.

## 📁 New Files Created

1. **`public/users.json`** - User credentials and permissions database
2. **`src/composables/useLocalAuth.js`** - Authentication composable
3. **`src/components/UserProfile.vue`** - User profile page component
4. **`src/components/PermissionDemo.vue`** - Interactive permission demo
5. **`docs/LOCAL_AUTHENTICATION.md`** - Complete documentation

## 🔐 Demo Credentials

| Role | Email | Username | Password |
|------|-------|----------|----------|
| **Admin** | admin@episd.com | admin | admin123 |
| **Developer** | dev@episd.com | developer | dev123 |
| **User** | user@episd.com | user | user123 |

*You can use either email or username to login*

## 🎯 Quick Test

1. **Start your application** (if not running):
   ```bash
   npm run serve
   ```

2. **Option A - Login with existing account**: 
   - Navigate to `http://localhost:8080/login`
   - Use one of the demo credentials below
   - Try logging in with different accounts to see different permission levels

3. **Option B - Create your own account**:
   - Navigate to `http://localhost:8080/signup`
   - Fill in the registration form
   - Choose your role (Admin, Developer, or User)
   - You'll be automatically logged in

4. **View your profile**: Navigate to `/profile` after login

5. **Test permissions**: Navigate to `/permissions-demo` to see interactive permission testing

6. **Manage users (Admin only)**: Navigate to `/user-management` to see all registered users

## 🛣️ Available Routes

**Public Routes:**
- `/login` - Login page
- `/signup` - User registration page

**Protected Routes (requires login):**
- `/` - Home page
- `/profile` - Your user profile with permissions list
- `/permissions-demo` - Interactive permission testing page
- `/user-management` - User management (Admin only)
- All other existing routes in your app

## 👤 Permission Levels

### Admin (Full Access)
✅ Create, Read, Update, Delete  
✅ Manage Users  
✅ Access Reports  
✅ Configure System

### Developer (Advanced)
✅ Create, Read, Update, Delete  
❌ Manage Users  
✅ Access Reports  
✅ Configure System

### User (Basic)
✅ Create, Read  
❌ Update, Delete  
❌ Manage Users  
❌ Access Reports  
❌ Configure System

## 💻 Using in Your Code

### Check if user is logged in:
```javascript
import useLocalAuth from '@/composables/useLocalAuth';

const { isAuthenticated, currentUser } = useLocalAuth();

if (isAuthenticated.value) {
  console.log('Logged in as:', currentUser.value.displayName);
}
```

### Check specific permission:
```vue
<template>
  <button v-if="hasPermission('canDelete')" @click="deleteItem">
    Delete
  </button>
</template>

<script>
import useLocalAuth from '@/composables/useLocalAuth';

export default {
  setup() {
    const { hasPermission } = useLocalAuth();
    return { hasPermission };
  }
}
</script>
```

### Check user role:
```javascript
const { isAdmin, isDeveloper, isUser } = useLocalAuth();

if (isAdmin.value) {
  // Show admin panel
}
```

### Logout:
```javascript
const { logout } = useLocalAuth();
const router = useRouter();

const handleLogout = () => {
  logout();
  router.push({ name: 'Login' });
};
```

## 📝 Files Modified/Created

**New Files:**
- `public/users.json` - User database
- `src/composables/useLocalAuth.js` - Auth composable
- `src/components/UserProfile.vue` - Profile page
- `src/components/PermissionDemo.vue` - Permission testing
- `src/components/UserManagement.vue` - User management (Admin)

**Modified Files:**
- `src/views/auth/LoginView.vue` - Now uses local auth
- `src/views/auth/SignupView.vue` - User registration
- `src/router/index.js` - Updated routes and guards
- `src/main.js` - Removed Firebase dependency

## ⚠️ Important Notes

1. **Development Only**: This system is for development/testing. Do NOT use in production!
2. **Plain Text Passwords**: Passwords are stored in plain text
3. **Client-Side Only**: No server-side validation
4. **Session Storage**: Uses localStorage (cleared on logout)
5. **User Registration**: New users are stored in localStorage under `customUsers`
6. **User Merging**: Login merges users from JSON file and localStorage

## 🔍 Testing Different Roles

1. **Create a new Admin account** → Navigate to `/signup`, select Admin role, register
2. **Try User Management** → Login as Admin, navigate to `/user-management` (should work)
3. **Create a User account** → Register with User role, try updating/deleting (should be disabled)
4. **Test permissions** → Go to `/permissions-demo` with different accounts

## 📊 User Registration Features

- **Automatic ID Generation**: New users get sequential IDs
- **Role Selection**: Choose from Admin, Developer, or User
- **Duplicate Prevention**: Cannot register with existing email/username
- **Password Validation**: Minimum 6 characters required
- **Auto-Login**: Automatically logs in after successful registration
- **LocalStorage Persistence**: Custom users persist across sessions

## 📚 Full Documentation

For complete documentation, see: `docs/LOCAL_AUTHENTICATION.md`

## 🆘 Troubleshooting

**Can't login?**
- Check credentials match exactly (case-sensitive)
- Ensure `public/users.json` exists
- Check browser console for errors

**Not seeing permissions?**
- Navigate to `/profile` to see your permissions
- Try logging out and back in
- Clear localStorage and try again

**Features not working?**
- Check if you have the required permission
- Try with Admin account to verify feature works
- Check browser console for errors

## 🎉 You're All Set!

Your application now has a fully functional authentication system with role-based permissions. Log in with any of the demo accounts and start testing!

