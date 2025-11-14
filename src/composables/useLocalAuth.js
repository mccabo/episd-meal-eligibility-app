import { ref, computed } from 'vue';
import API_BASE_URL from '@/config/api';

// Global state for authentication
const currentUser = ref(null);
const isAuthenticated = ref(false);

export default function useLocalAuth() {
  const error = ref(null);
  const isPending = ref(false);

  // Load user from localStorage on init
  const loadStoredUser = () => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        currentUser.value = JSON.parse(storedUser);
        isAuthenticated.value = true;
      } catch (e) {
        console.error('Error loading stored user:', e);
        localStorage.removeItem('currentUser');
      }
    }
  };

  // Call loadStoredUser on module initialization
  if (!currentUser.value) {
    loadStoredUser();
  }

  // Get all users (from JSON and localStorage)
  const getAllUsers = async () => {
    try {
      // Fetch users from JSON file with CORS configuration
      const response = await fetch('/users.json', {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to load user data');
      }
      const data = await response.json();
      let allUsers = [...data.users];

      // Get custom users from localStorage
      const customUsersJson = localStorage.getItem('customUsers');
      if (customUsersJson) {
        const customUsers = JSON.parse(customUsersJson);
        allUsers = [...allUsers, ...customUsers];
      }
      console.log('allUsers: ' + JSON.stringify(allUsers));
      return allUsers;
    } catch (err) {
      throw new Error('Failed to load users: ' + err.message);
    }
  };

  // Login function
  const login = async (email, password) => {
    error.value = null;
    isPending.value = true;

    try {
      const allUsers = await getAllUsers();
      
      // Find user by email or username
      const user = allUsers.find(
        u => (u.email === email || u.username === email) && u.password === password
      );

      if (!user) {
        throw new Error('Invalid email/username or password');
      }

      // Don't store the password in the session
      const { password: _, ...userWithoutPassword } = user;
      
      currentUser.value = userWithoutPassword;
      isAuthenticated.value = true;
      
      // Store user in localStorage
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      
      isPending.value = false;
      return { user: userWithoutPassword };
    } catch (err) {
      error.value = err.message;
      isPending.value = false;
      return null;
    }
  };

  // Signup function - saves to users.json via server endpoint
  const signup = async (email, password, displayName, username, role = 'user') => {
    error.value = null;
    isPending.value = true;

    try {
      // Validate input
      if (!email || !password || !displayName || !username) {
        throw new Error('All fields are required');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Set permissions based on role
      const permissions = {
        admin: {
          canCreate: true,
          canRead: true,
          canUpdate: true,
          canDelete: true,
          canManageUsers: true,
          canAccessReports: true,
          canConfigureSystem: true
        },
        developer: {
          canCreate: true,
          canRead: true,
          canUpdate: true,
          canDelete: true,
          canManageUsers: false,
          canAccessReports: true,
          canConfigureSystem: true
        },
        user: {
          canCreate: true,
          canRead: true,
          canUpdate: false,
          canDelete: false,
          canManageUsers: false,
          canAccessReports: false,
          canConfigureSystem: false
        }
      };

      // Create new user object
      const newUser = {
        username: username,
        email: email,
        password: password,
        role: role,
        permissions: permissions[role] || permissions.user,
        displayName: displayName
      };

      // Try to register via server endpoint first
      try {
        console.log('🔄 Attempting to register user via server API...');
        console.log(`📤 Request URL: ${API_BASE_URL}/register-user`);
        console.log('📤 Request data:', { ...newUser, password: '***HIDDEN***' });
        
        const response = await fetch(`${API_BASE_URL}/register-user`, {
          method: 'POST',
          mode: 'cors',
          credentials: 'omit',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(newUser)
        });

        console.log('📥 Server response status:', response.status, response.statusText);

        if (!response.ok) {
          const errorData = await response.json();
          console.error('❌ Server returned error:', errorData);
          throw new Error(errorData.message || 'Registration failed');
        }

        const data = await response.json();
        console.log('✅ User registered successfully via server:', data.user);

        // Auto-login the new user
        currentUser.value = data.user;
        isAuthenticated.value = true;
        localStorage.setItem('currentUser', JSON.stringify(data.user));

        isPending.value = false;
        return { user: data.user };

      } catch (serverError) {
        console.error('❌ Server registration failed!');
        console.error('❌ Error type:', serverError.name);
        console.error('❌ Error message:', serverError.message);
        console.error('❌ Full error:', serverError);
        console.warn('⚠️ FALLING BACK TO LOCALSTORAGE - Users will NOT be saved to users.json!');
        console.warn('⚠️ Make sure server is running: node server.js');
        
        // Fallback to localStorage if server is unavailable
        const allUsers = await getAllUsers();
        
        // Check if user already exists
        const existingUser = allUsers.find(
          u => u.email === email || u.username === username
        );

        if (existingUser) {
          throw new Error('Email or username already exists');
        }

        // Get custom users from localStorage
        const customUsersJson = localStorage.getItem('customUsers');
        const customUsers = customUsersJson ? JSON.parse(customUsersJson) : [];

        // Generate new user ID
        const maxId = allUsers.reduce((max, user) => Math.max(max, user.id), 0);
        newUser.id = maxId + 1;

        // Add to custom users in localStorage
        customUsers.push(newUser);
        localStorage.setItem('customUsers', JSON.stringify(customUsers));

        console.log('✓ User registered in localStorage (server unavailable)');

        // Auto-login the new user
        const { password: _, ...userWithoutPassword } = newUser;
        currentUser.value = userWithoutPassword;
        isAuthenticated.value = true;
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

        isPending.value = false;
        return { user: userWithoutPassword };
      }

    } catch (err) {
      error.value = err.message;
      isPending.value = false;
      return null;
    }
  };

  // Logout function
  const logout = () => {
    currentUser.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem('currentUser');
  };

  // Check if user has specific permission
  const hasPermission = (permission) => {
    if (!currentUser.value || !currentUser.value.permissions) {
      return false;
    }
    return currentUser.value.permissions[permission] === true;
  };

  // Check if user has specific role
  const hasRole = (role) => {
    if (!currentUser.value) {
      return false;
    }
    return currentUser.value.role === role;
  };

  // Computed properties
  const isAdmin = computed(() => hasRole('admin'));
  const isDeveloper = computed(() => hasRole('developer'));
  const isUser = computed(() => hasRole('user'));

  return {
    currentUser,
    isAuthenticated,
    error,
    isPending,
    login,
    signup,
    logout,
    hasPermission,
    hasRole,
    isAdmin,
    isDeveloper,
    isUser
  };
}

