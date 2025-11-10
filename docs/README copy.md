# EPISD Free and Reduced Lunch Eligibility Application

A comprehensive Vue.js-based web application designed for the El Paso Independent School District (EPISD) to manage and process free and reduced lunch eligibility applications.

## 📋 Overview

This application streamlines the complex process of meal eligibility determination and communication with families in the El Paso Independent School District. It provides a complete solution for managing applications, generating letters, tracking status, and maintaining compliance with federal nutrition programs.

## ✨ Key Features

### Application Management
- **Import Applications**: Import applications from SQL Server database
- **Search & Filter**: Advanced search capabilities by ID, guardian name, student name, campus, status, batch number, and language
- **Status Tracking**: Track application status (sent, printed, approved/denied)
- **Batch Processing**: Organize applications into batches for efficient processing

### Letter Generation & Communication
- **Automated Letter Generation**: Generate PDF letters in both English and Spanish
- **Multi-format Support**: Support for various letter templates and formats
- **Print Management**: Direct printing capabilities with batch processing
- **Email Integration**: Automated email notifications and communications

### Data Management
- **SQL Server Integration**: Direct connection to school district database
- **Firebase Backend**: Cloud-based data storage and authentication
- **Real-time Updates**: Live data synchronization across the platform
- **Data Export**: Export functionality for reporting and compliance

### User Interface
- **Responsive Design**: Modern Vue.js interface with PrimeVue components
- **Multi-language Support**: English and Spanish language options
- **Role-based Access**: Different access levels for administrators and staff
- **Intuitive Navigation**: User-friendly interface for efficient workflow

### Image Recognition Suite ✨ NEW
- **OCR (Optical Character Recognition)**: Extract text from documents in multiple languages
- **OMR (Optical Mark Recognition)**: Process multiple-choice answer sheets and bubble forms
- **IMR (Intelligent Mark Recognition)**: Advanced form data extraction with signature detection
- **Multi-format Support**: Process JPG, PNG, BMP, and TIFF images
- **Export Capabilities**: Download results as TXT, CSV, or JSON formats

## 🛠️ Technology Stack

### Frontend
- **Vue.js 3** - Progressive JavaScript framework
- **PrimeVue** - UI component library
- **Vue Router** - Client-side routing
- **Vuex** - State management
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **SQL Server** - Primary database
- **Firebase** - Cloud services (Firestore, Auth, Storage)

### PDF Generation
- **PDFKit** - PDF document generation
- **wkhtmltopdf** - HTML to PDF conversion
- **html-pdf-node** - Node.js PDF generation
- **Puppeteer** - Headless Chrome automation

### Additional Tools
- **Bootstrap** - CSS framework
- **Nodemailer** - Email functionality
- **CORS** - Cross-origin resource sharing
- **Body-parser** - Request parsing middleware
- **Tesseract.js** - OCR engine for text extraction from images

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- SQL Server access
- Firebase project setup
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd deploy-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   - Update `src/firebase/config.js` with your Firebase credentials
   - Configure database connection in `config.json`
   - Set up server configuration in `server.js`

4. **Build the application**
   ```bash
   npm run build
   ```

5. **Start the development server**
   ```bash
   npm run serve
   ```

## 🚀 Deployment

### Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Deploy to Firebase
firebase deploy
```

### Local Development
```bash
# Start development server
npm run serve

# Start backend server
node server.js
```

## 📁 Project Structure

```
deploy-template/
├── public/                 # Static assets and build output
├── src/                    # Source code
│   ├── components/         # Vue components
│   ├── views/             # Page components
│   ├── composables/       # Vue 3 composables
│   ├── firebase/          # Firebase configuration
│   ├── router/            # Vue Router configuration
│   └── assets/            # Static assets
├── Letters/               # Generated PDF letters
├── server.js              # Express.js backend server
├── firebase.json          # Firebase configuration
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## 🔧 Configuration

### Database Configuration
Update the database connection settings in your config file:
```json
{
  "server": "your-sql-server",
  "database": "your-database",
  "uid": "username",
  "pwd": "password"
}
```

### Firebase Configuration
Configure Firebase services in `src/firebase/config.js`:
```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  // ... other config
};
```

## 📖 Usage

1. **Access the Application**: Navigate to `http://localhost:8081` in your browser
2. **Login**: Use your district credentials to access the system
3. **Import Data**: Import application data from your SQL Server database
4. **Process Applications**: Search, filter, and manage applications
5. **Generate Letters**: Create and print eligibility letters
6. **Track Status**: Monitor application processing status
7. **Image Recognition**: Process documents with OCR/OMR/IMR capabilities (see [Image Recognition Guide](docs/IMAGE_RECOGNITION.md))

## 🔒 Security

- Firebase Authentication for user management
- Role-based access control
- Secure database connections
- Input validation and sanitization
- CORS configuration for API security

## 📞 Support

- **Author**: Mario Camarena
- **Email**: mvc757@gmail.com
- **Organization**: El Paso Independent School District
- **Version**: 1.0.0
- **License**: MIT

## 📝 License

Copyright © 2025 El Paso Independent School District. Licensed under the MIT License.

## 🤝 Contributing

This is an internal EPISD project. For contributions or modifications, please contact the development team.

## 📋 Changelog

### Version 1.1.0 (2025-10-20)
- **NEW**: Image Recognition Suite with OCR, OMR, and IMR capabilities
- Multi-language OCR support (English, Spanish, French, German, Chinese, Arabic)
- Optical Mark Recognition for bubble forms and answer sheets
- Intelligent Mark Recognition for automated form data extraction
- Multiple export formats (TXT, CSV, JSON)

### Version 1.0.0 (2025-10-15)
- Initial release
- Core application management features
- Letter generation system
- Firebase integration
- SQL Server database connectivity

---

**Note**: This application is specifically designed for the El Paso Independent School District's meal eligibility program. Ensure proper configuration and compliance with federal nutrition program requirements before deployment.