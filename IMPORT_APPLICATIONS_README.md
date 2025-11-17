# Application Import Script

This script imports applications from `sqlApps.json` to `applications.json` based on the app IDs listed in `emails.csv`.

## Purpose

The script solves the problem of syncing applications between your SQL database export (`sqlApps.json`) and your working application file (`applications.json`) based on a CSV file containing email notifications.

## How It Works

1. **Reads `emails.csv`**: Extracts application IDs from the first column of the CSV file
2. **Reads `sqlApps.json`**: Loads all available applications from the SQL export
3. **Checks `applications.json`**: Identifies which applications already exist
4. **Imports Missing Applications**: For each app ID in the CSV:
   - If it exists in `sqlApps.json` AND
   - It does NOT exist in `applications.json`
   - Then it imports the application

## File Structure

```
project/
├── emails.csv                    # CSV with app IDs in first column
├── public/
│   ├── sqlApps.json             # Source file (SQL export)
│   └── applications.json        # Target file (working file)
└── importApplications.js        # This script
```

## Usage

Run the script from the project root:

```bash
node importApplications.js
```

## Expected CSV Format

The `emails.csv` file should have app IDs in the first column:

```csv
2025951,10-12-2025,johndoe@gmail.com,Doe,John,1
2025952,10-12-2025,marysmith@gmail.com,Smith,Mary,1
2025953,10-13-2025,mikejones@gmail.com,Jones,Mike,
```

## Output

The script provides detailed feedback:

```
🚀 Starting application import process...

📧 Found 11 app IDs in emails.csv
📦 Loaded 11 applications from sqlApps.json
📋 Current applications.json has 10 applications

🔄 Processing applications...

✅ App ID 2025976 - Imported from sqlApps.json
⏭️  App ID 2025951 - Already exists in applications.json (skipped)

==================================================
📊 IMPORT SUMMARY
==================================================
✅ Imported: 1 application(s)
⏭️  Skipped (already exists): 10 application(s)
❌ Not found in sqlApps.json: 0 application(s)
📋 Total in applications.json: 11 application(s)
==================================================
```

## Features

- ✅ **Safe Import**: Only imports applications that don't already exist
- ✅ **Automatic Indexing**: Updates the `Index` field to be sequential
- ✅ **Detailed Logging**: Shows exactly what's happening with each application
- ✅ **Summary Report**: Provides a clear summary of the import operation
- ✅ **Error Handling**: Gracefully handles missing files or invalid data

## Notes

- The script will NOT overwrite existing applications in `applications.json`
- If `applications.json` doesn't exist, it will be created automatically
- The `Index` field in all applications is automatically updated to be sequential (0, 1, 2, ...)
- The original `applications.json` is directly modified (no backup is created)

## Troubleshooting

**No applications imported?**
- Check that the app IDs in `emails.csv` match those in `sqlApps.json`
- Verify that the applications aren't already in `applications.json`

**Error reading files?**
- Ensure all files exist in the correct locations
- Check that the JSON files are valid JSON format
- Verify the CSV file is properly formatted

**Need to revert changes?**
- Keep a backup of `applications.json` before running the script
- Or restore from your version control system (git)

## Example Workflow

1. Export applications from SQL to `public/sqlApps.json`
2. Generate or update `emails.csv` with app IDs to process
3. Run `node importApplications.js`
4. Review the summary to confirm correct imports
5. Your `applications.json` is now updated!

## Maintenance

This script was created to resolve the "Bad Request" error that occurred during the previous import attempt. It provides a robust, file-based approach to importing applications without relying on HTTP requests or database connections.

