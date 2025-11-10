# Todo Storage System

## Overview
The Todo component now saves items to a JSON file (`public/todos.json`) in the project instead of browser localStorage. This provides persistent storage that survives across different browsers and machines.

## Architecture

### Server Endpoints (server.js)

#### CORS Middleware
The server includes CORS middleware to allow requests from the Vue development server:
- Allows all origins (`*`)
- Supports GET, POST, PUT, DELETE, OPTIONS methods
- Handles preflight requests automatically

#### GET /todos
- **URL**: `http://localhost:3000/todos`
- **Method**: GET
- **Description**: Retrieves all todos from `public/todos.json`
- **Response**: Array of todo objects
- **Error Handling**: Returns empty array if file doesn't exist

#### POST /todos
- **URL**: `http://localhost:3000/todos`
- **Method**: POST
- **Description**: Saves todos to `public/todos.json`
- **Body**: JSON array of todo objects
- **Response**: Success message
- **Error Handling**: Returns 500 status on error

### Frontend (Todo.vue)

#### Features
1. **Auto-loading**: Todos are automatically loaded from server when component mounts
2. **Auto-saving**: Todos are automatically saved to server whenever they change (via Vue watch)
3. **Manual saving**: Each CRUD operation also explicitly calls save for immediate persistence
4. **Fallback**: If server is unavailable, uses default todos with user notification

#### Key Functions
- `loadTodos()`: Async function that fetches todos from server
- `saveTodos()`: Async function that posts todos to server
- `onMounted()`: Loads todos when component initializes
- `watch()`: Automatically saves on any todo change

## File Location
**Storage File**: `public/todos.json`

This file is:
- Automatically created if it doesn't exist
- Formatted with 2-space indentation for readability
- Contains a JSON array of todo objects

## Todo Object Structure
```json
{
  "id": 123456789,
  "title": "Task title",
  "description": "Task description",
  "category": "development|testing|documentation|deployment|bug|feature",
  "priority": "low|medium|high|critical",
  "status": "pending|in-progress|completed",
  "createdAt": "2025-10-19T12:00:00.000Z",
  "dueDate": "2025-10-25T12:00:00.000Z",
  "assignee": "Team Name"
}
```

## Usage

### Prerequisites
1. Ensure the server is running: `node server.js`
2. Server must be accessible at `http://localhost:3000`

### Adding a New Todo
1. Enter task title in the input field
2. Select category and priority from dropdowns
3. Click "Add Task" or press Enter
4. Todo is immediately saved to `public/todos.json`

### Editing a Todo
1. Click the edit icon on any todo item
2. Modify fields in the modal
3. Click "Save Changes"
4. Changes are immediately persisted to file

### Deleting a Todo
1. Click the delete icon on any todo item
2. Confirmation toast appears
3. Todo is removed from file immediately

### Status Changes
1. Check/uncheck the checkbox to toggle completion
2. Status automatically updates in the file

## Benefits Over localStorage

1. **Persistence**: Data survives browser changes, cache clears, and different machines
2. **Shareability**: Team members can share the same todos file
3. **Backup**: Easy to version control and backup
4. **Portability**: Move todos between environments by copying the file
5. **Debugging**: Can directly view and edit todos.json file

## Troubleshooting

### Todos not saving
- Check that server.js is running on port 3000
- Verify `public/todos.json` file permissions
- Check browser console for errors

### Todos not loading
- Ensure `public/todos.json` exists
- Check file contains valid JSON
- Verify server endpoint is accessible

### Network errors
- Check CORS settings if accessing from different domain
- Ensure fetch URL matches server location
- Check browser console for detailed error messages

## Development Notes

- The component still includes default todos for initialization
- Dates are properly serialized/deserialized between client and server
- Error handling includes user-friendly toast notifications
- All saves are asynchronous and non-blocking

