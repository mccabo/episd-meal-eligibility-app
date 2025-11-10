# Applications Dashboard

## Overview

The Applications Dashboard provides a comprehensive view of all meal application data with interactive visualizations, statistics, and detailed tables.

## Features

### 1. Summary Cards
- **Total Applications**: Shows the total count of all applications
- **Approved - Free**: Count and percentage of applications approved for free meals
- **Approved - Reduced**: Count and percentage of applications approved for reduced-price meals
- **Denied**: Count and percentage of denied applications

### 2. Interactive Charts

#### Status Distribution (Pie Chart)
Displays the distribution of applications by approval status:
- Approved - Free (Green)
- Approved - Reduced (Blue)
- Denied (Red)

#### Language Distribution (Doughnut Chart)
Shows the breakdown of applications by language (English/Spanish)

#### Batch Analysis (Bar Chart)
Visualizes the number of applications in each batch for workflow tracking

### 3. Detailed Statistics

#### Students Statistics
- Total number of students across all applications
- Average students per application
- Number of unique campuses represented

#### Processing Status
- Count of printed applications
- Count of sent applications
- Count of selected applications

#### Top Campuses
Lists the top 5 campuses by number of students with applications

### 4. Applications Table

Interactive data table with:
- **Filtering**: Filter by approval status (All, Free, Reduced, Denied)
- **Sorting**: Sort by any column (ID, Date, Batch, Guardian, etc.)
- **Pagination**: Configurable rows per page (5, 10, 20, 50)
- **Status Indicators**: Color-coded tags for quick status identification
- **Visual Indicators**: Icons showing printed status

## Accessing the Dashboard

1. **Navigation Bar**: Click the "Dashboard" button in the top navigation
2. **Direct URL**: Navigate to `/dashboard`

## Technology Stack

- **Vue 3**: Component framework
- **PrimeVue**: UI component library
  - Charts: Pie, Doughnut, and Bar charts
  - DataTable: Advanced table with filtering and pagination
  - Tags: Status indicators
  - Dropdown: Filter controls
  - Toast: Notifications
- **Responsive Design**: Fully responsive layout for mobile and desktop

## Data Source

The dashboard fetches data from `/applications.json` which contains:
- Application details (ID, Date, Batch, Language)
- Guardian information
- Student information
- Status information (Approved/Denied/Reduced)
- Processing flags (Printed, Sent, Selected)

## Key Metrics Displayed

1. **Total Applications Count**
2. **Approval Rates** (Free/Reduced/Denied percentages)
3. **Language Distribution** (English vs Spanish)
4. **Batch Distribution** (Applications per batch)
5. **Student Count** (Total and average per application)
6. **Campus Diversity** (Unique campuses served)
7. **Processing Status** (Printed/Sent/Selected counts)

## Color Coding

- **Purple Gradient**: Total applications, Dashboard button
- **Pink Gradient**: Free meal approvals
- **Blue Gradient**: Reduced-price approvals
- **Yellow/Pink Gradient**: Denied applications
- **Green**: Success indicators, printed status
- **Red**: Denied status, error indicators

## Responsive Design

The dashboard automatically adapts to different screen sizes:
- **Desktop**: Multi-column grid layout with full statistics
- **Tablet**: Adjusted grid columns for optimal viewing
- **Mobile**: Single column layout with stacked cards

## Future Enhancements

Potential features for future versions:
- Date range filtering
- Export to PDF/Excel
- Real-time data updates
- Trend analysis over time
- Custom report generation
- Email notifications for status changes
- Drill-down views for individual applications

## Usage Tips

1. Use the status filter dropdown to focus on specific application types
2. Click column headers in the table to sort data
3. Hover over chart sections for detailed tooltips
4. Use pagination controls to navigate through large datasets
5. All charts are interactive - hover for more details

## Performance

The dashboard is optimized for:
- Fast loading with efficient data processing
- Smooth animations and transitions
- Responsive interactions
- Computed properties for efficient reactivity

## Authentication

The dashboard is protected by authentication:
- Users must be logged in to access
- Redirects to login page if not authenticated
- Uses local authentication system

## Browser Support

Compatible with all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### Dashboard not loading data
- Ensure `/applications.json` is accessible
- Check browser console for errors
- Verify server is running

### Charts not displaying
- Ensure PrimeVue is properly installed
- Check that Chart.js is loaded
- Clear browser cache

### Table filtering not working
- Verify data structure matches expected format
- Check computed properties for errors
- Ensure status fields are properly formatted

## Support

For issues or questions about the dashboard, please refer to:
- Main documentation: `/docs/README.md`
- User Manual: Available in application
- Testing documentation: `/docs/TESTING.md`

