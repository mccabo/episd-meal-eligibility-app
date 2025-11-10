# Local JSON Authentication System

## Overview

This application now uses a local JSON-based authentication system instead of Firebase authentication. User credentials and permissions are stored in a JSON file, making it easy to manage users and roles during development.

## Mock User Credentials

The following demo accounts are available for testing:

### Admin Account
- **Email:** `admin@episd.com`
- **Username:** `admin`
- **Password:** `admin123`
- **Role:** Admin
- **Permissions:** Full access to all features

### Developer Account
- **Email:** `dev@episd.com`
- **Username:** `developer`
- **Password:** `dev123`
- **Role:** Developer
- **Permissions:** Create, read, update, delete, and access reports (cannot manage users or configure system settings)

### Regular User Account
- **Email:** `user@episd.com`
- **Username:** `user`
- **Password:** `user123`
- **Role:** User
- **Permissions:** Create and read only (cannot update, delete, manage users, access reports, or configure system)

### Additional Test Accounts
- **John Doe:** `john.doe@episd.com` / `password123` (User role)
- **Supervisor:** `supervisor@episd.com` / `super123` (Developer role with limited permissions)

## Permission Levels

The system supports three main roles with different permission levels:

### Admin
- Can Create: ✅
- Can Read: ✅
- Can Update: ✅
- Can Delete: ✅
- Can Manage Users: ✅
- Can Access Reports: ✅
- Can Configure System: ✅

### Developer
- Can Create: ✅
- Can Read: ✅
- Can Update: ✅
- Can Delete: ✅
- Can Manage Users: ❌
- Can Access Reports: ✅
- Can Configure System: ✅

### User
- Can Create: ✅
- Can Read: ✅
- Can Update: ❌
- Can Delete: ❌
- Can Manage Users: ❌
- Can Access Reports: ❌
- Can Configure System: ❌

## Files Modified/Created

### Created Files:
1. **`public/users.json`** - Contains all user credentials and permissions
2. **`src/composables/useLocalAuth.js`** - Authentication composable for login/logout/signup
3. **`src/components/UserProfile.vue`** - User profile component displaying user info and permissions
4. **`src/components/PermissionDemo.vue`** - Interactive permission testing component
5. **`src/components/UserManagement.vue`** - Admin component to view all users
6. **`docs/LOCAL_AUTHENTICATION.md`** - This documentation file

### Modified Files:
1. **`src/views/auth/LoginView.vue`** - Updated to use local authentication
2. **`src/views/auth/SignupView.vue`** - Updated to support user registration with role selection
3. **`src/router/index.js`** - Updated route guard to use localStorage, added new routes
4. **`src/main.js`** - Removed Firebase authentication dependency

## How to Use

### Signing Up (New Users)
1. **Ensure the backend server is running:** `node server.js`
2. Navigate to the signup page at `/signup`
3. Fill in all required fields:
   - Display Name
   - Username (unique)
   - Email Address (unique)
   - Password (minimum 6 characters)
   - Select Role (User, Developer, or Admin)
4. Click "Sign Up" to create your account
5. You'll be automatically logged in and redirected to the home page
6. **New users are saved to `public/users.json`** via the backend API
7. If the server is not running, users are saved to localStorage as a fallback

### Logging In
1. Navigate to the login page at `/login`
2. Enter either email or username along with password
3. Click "Login" to authenticate
4. You'll be redirected to the home page upon successful login

### Viewing User Profile
1. After logging in, navigate to `/profile`
2. View your user information, role, and permissions
3. Use the logout button to end your session

### Testing Permissions
1. Navigate to `/permissions-demo` after logging in
2. Test different permission-based features interactively
3. See which actions are enabled/disabled based on your role

### Managing Users (Admin Only)
1. Navigate to `/user-management` after logging in as an admin
2. View all registered users (from JSON and custom signups)
3. See user statistics and details
4. View individual user permissions

### Using Authentication in Components

#### Import the composable:
```javascript
import useLocalAuth from '@/composables/useLocalAuth';
```

#### Check authentication status:
```javascript
const { isAuthenticated, currentUser } = useLocalAuth();

// Check if user is logged in
if (isAuthenticated.value) {
  console.log('User is logged in:', currentUser.value);
}
```

#### Check specific permissions:
```javascript
const { hasPermission, hasRole } = useLocalAuth();

// Check for specific permission
if (hasPermission('canDelete')) {
  // Show delete button
}

// Check for specific role
if (hasRole('admin')) {
  // Show admin panel
}
```

#### Using computed role checks:
```javascript
const { isAdmin, isDeveloper, isUser } = useLocalAuth();

if (isAdmin.value) {
  // Admin-specific functionality
}
```

#### Logging out:
```javascript
const { logout } = useLocalAuth();

const handleLogout = () => {
  logout();
  router.push({ name: 'Login' });
};
```

## Adding New Users

### Method 1: Using the Signup Form (Recommended)
1. **Start the backend server:** `node server.js`
2. Navigate to `/signup`
3. Fill in the registration form
4. Select the appropriate role
5. Submit the form
6. **New users are automatically saved to `public/users.json`**
7. Check the server console for confirmation:
   ```
   ✓ User registered successfully: username
   ```

### Method 2: Manually Edit JSON (For Pre-defined Users)
Edit the `public/users.json` file to add users manually:

```json
{
  "id": 6,
  "username": "newuser",
  "email": "newuser@episd.com",
  "password": "password123",
  "role": "user",
  "permissions": {
    "canCreate": true,
    "canRead": true,
    "canUpdate": false,
    "canDelete": false,
    "canManageUsers": false,
    "canAccessReports": false,
    "canConfigureSystem": false
  },
  "displayName": "New User"
}
```

**Important Notes:**
- Users registered via signup are saved directly to `public/users.json` when the server is running
- If the server is not running, users are temporarily saved to localStorage
- To use the signup feature, you must run: `node server.js` (backend) AND `npm run serve` (frontend)

## Security Notes

⚠️ **Important:** This authentication system is designed for **development and testing purposes only**. 

**Do NOT use this in production** because:
- Passwords are stored in plain text
- Authentication happens client-side
- No encryption or secure token management
- Users file is publicly accessible
- No rate limiting or brute force protection

For production, use a proper authentication service like:
- Firebase Authentication
- Auth0
- AWS Cognito
- Custom backend with JWT tokens

## Session Management

- User sessions are stored in `localStorage`
- Sessions persist across browser refreshes
- Logging out clears the session from `localStorage`
- Route guards check for valid sessions before allowing access to protected routes

## Testing Permissions

You can test different permission levels by:
1. Logging in with different user accounts
2. Navigating to the `/profile` page to see your permissions
3. Attempting to access features that require specific permissions
4. Observing how the UI changes based on your role

## Troubleshooting

### Can't log in
- Verify you're using the correct email/username and password
- Check browser console for errors
- Ensure `public/users.json` exists and is properly formatted

### Session not persisting
- Check if localStorage is enabled in your browser
- Clear browser cache and try again
- Check browser console for localStorage errors

### Permission checks not working
- Ensure you're using the `useLocalAuth` composable correctly
- Verify the permission key names match those in `users.json`
- Check that the user data is properly loaded in localStorage

## Future Enhancements

Potential improvements for this authentication system:
- Add password hashing (for demo purposes)
- Implement token-based authentication
- Add user registration functionality
- Create an admin panel for user management
- Add role-based route protection
- Implement remember me functionality
- Add session expiration

