# Todo Storage Troubleshooting Guide

## Quick Fix Steps

### Step 1: Restart Your Server
The CORS middleware was just added, so you need to restart the server:

```bash
# Stop the current server (Ctrl+C)
# Then restart it:
node server.js
```

You should see:
```
Print Server listening at http://localhost:3000
```

### Step 2: Test the Endpoints

#### Test GET endpoint:
Open your browser and navigate to:
```
http://localhost:3000/todos
```

You should see a JSON array with the default todos.

#### Test from Command Line (Optional):
```bash
# Test GET
curl http://localhost:3000/todos

# Test POST (if curl is installed)
curl -X POST http://localhost:3000/todos ^
  -H "Content-Type: application/json" ^
  -d "[{\"id\":999,\"title\":\"Test\",\"status\":\"pending\"}]"
```

### Step 3: Check Browser Console
1. Open your Vue app (Todo page)
2. Open browser DevTools (F12)
3. Go to Console tab
4. Look for any error messages
5. Check Network tab for failed requests

## Common Issues and Solutions

### Issue 1: "Could not load saved todos, using defaults"
**Cause**: Server not running or CORS issue
**Solution**:
1. Restart server with the new CORS middleware
2. Verify server is running on port 3000
3. Check browser console for CORS errors

### Issue 2: "Failed to save todos to file"
**Cause**: Write permissions or server error
**Solution**:
1. Check that `public/todos.json` exists and is writable
2. Check server console for error messages
3. Verify the path in server.js is correct

### Issue 3: Network Error
**Cause**: Wrong URL or server not accessible
**Solution**:
1. Verify server is running: `http://localhost:3000`
2. Check that Vue app can reach the server
3. Try accessing `http://localhost:3000/todos` directly in browser

### Issue 4: CORS Error in Console
**Cause**: CORS middleware not applied
**Solution**:
1. Restart server (must restart to apply new middleware)
2. Clear browser cache
3. Verify CORS headers in Network tab of DevTools

## Verification Checklist

✅ **Server Running**: 
- [ ] `node server.js` is running
- [ ] Console shows "Print Server listening at http://localhost:3000"

✅ **File Exists**:
- [ ] `public/todos.json` exists
- [ ] File contains valid JSON array

✅ **Endpoints Work**:
- [ ] Can access http://localhost:3000/todos in browser
- [ ] Returns JSON data (not an error)

✅ **No Console Errors**:
- [ ] No CORS errors in browser console
- [ ] No network errors in browser console
- [ ] No server errors in terminal

✅ **Vue App**:
- [ ] Todo page loads without warnings
- [ ] Can add new todos
- [ ] Todos persist after refresh

## Testing the Complete Flow

### Test 1: Add a New Todo
1. Go to Todo page
2. Type "Test Todo" in input
3. Click "Add Task"
4. Check browser console - should see: "Todos saved to file: Todos saved successfully"
5. Open `public/todos.json` - should see the new todo

### Test 2: Edit a Todo
1. Click edit icon on any todo
2. Change the title
3. Click "Save Changes"
4. Refresh the page
5. Verify changes persisted

### Test 3: Delete a Todo
1. Click delete icon on any todo
2. Refresh the page
3. Verify todo is still deleted

### Test 4: Persistence
1. Add a new todo
2. Close browser completely
3. Reopen browser and go to Todo page
4. Verify the todo is still there

## Debugging Commands

### Check if server is running:
```bash
# Windows
netstat -ano | findstr :3000

# Linux/Mac
lsof -i :3000
```

### View server logs:
Watch the terminal where `node server.js` is running for:
- "GET /todos - Loading todos"
- "POST /todos - Saving todos"
- "Todos saved successfully to: [path]"

### Check file contents:
```bash
# View todos.json
type public\todos.json        # Windows
cat public/todos.json         # Linux/Mac
```

### Check file permissions:
Make sure the file is writable by the Node.js process.

## Expected Behavior

### On Component Mount:
1. Component calls GET /todos
2. Server reads `public/todos.json`
3. Returns todos array
4. Component displays todos

### On Add/Edit/Delete:
1. User makes change
2. Component updates local state
3. Watch triggers automatic save
4. POST /todos sends data to server
5. Server writes to `public/todos.json`
6. Console shows "Todos saved to file"

### On Error:
1. Component shows toast notification
2. Falls back to default todos (if loading)
3. Logs error to console

## Still Having Issues?

1. Check the file paths in `server.js`:
   ```javascript
   const todosPath = path.join(__dirname, 'public', 'todos.json');
   ```

2. Verify the fetch URLs in `Todo.vue`:
   ```javascript
   fetch('http://localhost:3000/todos')
   ```

3. Look for any firewall or antivirus blocking port 3000

4. Try changing the port if 3000 is in use

5. Check that Express and all dependencies are installed:
   ```bash
   npm install
   ```

## Success Indicators

When everything is working:
- ✅ No warning messages
- ✅ Green success toasts when adding/editing/deleting
- ✅ Console shows "Todos saved to file: Todos saved successfully"
- ✅ `public/todos.json` updates in real-time
- ✅ Todos persist across browser sessions

