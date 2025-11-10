# EditLetters.vue Component

## Overview
A Vue component for editing English and Spanish eligibility letters with real-time preview and style customization.

## Features

### ✅ **Dual Language Support**
- English and Spanish letters
- Easy language switching
- Independent editing for each language

### ✅ **Live Editing**
- Click any field to edit content directly
- Real-time updates
- Highlighted fields on focus

### ✅ **Style Editor (Properties Panel)**
- Font size, width, height
- Text and background colors
- Font weight, style, alignment
- Margins and spacing
- Apply changes instantly

### ✅ **Admin Privileges**
- Only admins can edit
- Checks for admin role or "Mary Lou" user
- Non-admins can view only

### ✅ **Auto-Save to Server**
- Saves to `C:/episd/letters.json`
- Success/error notifications
- Preserves formatting

## Usage

### 1. Add to Router

```javascript
// In src/router/index.js
import EditLetters from '../components/EditLetters.vue'

{
  path: '/edit-letters',
  name: 'EditLetters',
  component: EditLetters,
  props: route => ({ userRole: route.query.role || 'user' })
}
```

### 2. Use in Another Component

```vue
<template>
  <EditLetters :userRole="currentUser.role" />
</template>

<script>
import EditLetters from '@/components/EditLetters.vue'

export default {
  components: { EditLetters },
  computed: {
    currentUser() {
      return JSON.parse(localStorage.getItem('user')) || {}
    }
  }
}
</script>
```

### 3. Direct Navigation

```javascript
// Navigate to the editor
this.$router.push('/edit-letters')

// With admin role
this.$router.push({ name: 'EditLetters', query: { role: 'admin' } })
```

## How It Works

### **For Admins:**

1. **Select Language** - Click English or Spanish button
2. **Click Any Field** - Field highlights in yellow
3. **Edit Content** - Type directly in the field
4. **Adjust Styles** - Use properties panel on the right
   - Change font size, colors, alignment, etc.
   - Click "Apply Styles" to see changes
5. **Save Changes** - Click "Save Changes" button at top
6. **Confirmation** - Success message appears

### **Field Highlighting:**
- **Hover:** Light gray background
- **Focus:** Yellow highlight with border
- **Properties Panel:** Shows current field's properties

### **Properties You Can Edit:**
- Font Size (e.g., 24px, 1.5em)
- Width (e.g., 100%, 500px)
- Height (e.g., auto, 100px)
- Text Color (color picker)
- Background Color (color picker)
- Font Weight (Normal, Bold, Semi-Bold)
- Text Align (Left, Center, Right, Justify)
- Font Style (Normal, Italic)
- Margin Top/Bottom (e.g., 10px, 20px)

## Server Endpoints

The component requires these server endpoints:

### GET `/getLetters`
Returns the letters.json data:
```json
{
  "English": [{ ... }],
  "Spanish": [{ ... }]
}
```

### POST `/saveLetters`
Saves the updated letters data.

Body:
```json
{
  "English": [{ ... }],
  "Spanish": [{ ... }]
}
```

Response:
```json
{
  "success": true,
  "message": "Letters saved successfully"
}
```

## Admin Check Logic

The component checks for admin privileges in this order:

1. Check `userRole` prop
2. Check `localStorage.getItem('user')` for role === 'admin'
3. Check username === 'Mary Lou'

```javascript
this.isAdmin = 
  this.userRole === 'admin' || 
  userData.role === 'admin' || 
  userData.username === 'Mary Lou'
```

## File Structure

```
C:/episd/letters.json  ← Source data file
```

## Letter Fields

### English Letter Fields:
- Title, District, BodyDate
- Salutation, Reviewed, Status
- Discussion, Service, Street, City, Phone
- Reapply, Closing, Director
- Accordance1-4, Link1-2

### Spanish Letter Fields:
- Title, District, BodyDate
- Salutation, Reviewed, Status
- Discussion, Service, Street, City, Phone
- Reapply, Closing, Director
- Accordance1-6, Link
- Mail1-4, Fax1-2, Email1-2

## Styling

The component includes:
- Responsive layout
- Modern, clean UI
- Smooth transitions
- Professional color scheme
- Print-ready letter view

## Example: Adding to Navbar

```vue
<!-- In Navbar.vue -->
<router-link to="/edit-letters" v-if="isAdmin">
  <button class="nav-btn">Edit Letters</button>
</router-link>
```

## Troubleshooting

### Letters don't load:
- Check server is running on port 3000
- Verify `C:/episd/letters.json` exists
- Check browser console for errors

### Can't edit fields:
- Ensure you're logged in as admin
- Check `isAdmin` value in Vue DevTools
- Verify userRole prop is set correctly

### Changes don't save:
- Check server console for errors
- Verify file permissions on `letters.json`
- Check network tab for API errors

### Properties panel not showing:
- Click on a field first
- Verify `isAdmin` is true
- Check if field has proper ID

## Customization

### Change Colors:
```css
/* In component <style> section */
.lang-btn.active {
  background-color: #your-color;
}

.save-btn {
  background-color: #your-color;
}
```

### Add New Fields:
1. Add to letters.json
2. Add div in template with v-model
3. Add to updateField method
4. Style as needed

### Change Admin Logic:
```javascript
checkAdminPrivileges() {
  // Your custom logic here
  this.isAdmin = // your condition
}
```

## Development Tips

- Use Vue DevTools to inspect state
- Check browser console for errors
- Test with both admin and non-admin users
- Backup letters.json before testing
- Use responsive design tools to test layout

---

**Created:** November 4, 2025
**Version:** 1.0
**Component Path:** `src/components/EditLetters.vue`

