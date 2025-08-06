# Test Upload Centre

A modern React application for file upload management with role-based access control, audit logging, and comprehensive dashboard views.

## Features

### 🔐 Dual Dashboard System
- **External Dashboard**: User-friendly interface for external users to upload and manage their files
- **Internal Dashboard**: Administrative interface with full system control and management capabilities

### 📁 File Management
- Drag-and-drop file upload with validation
- Support for multiple file types (PDF, DOC, XLS, PPT, images, videos, archives)
- File categorization and description
- Approval workflow for uploaded files
- Download tracking and statistics

### 👥 Role-Based Access Control (RBAC)
- Comprehensive user management system
- Flexible role creation with granular permissions
- User status tracking and department organization
- Permission-based feature access control

### 📊 Audit Logging
- Complete system activity tracking
- Advanced filtering and search capabilities
- Export functionality for compliance reporting
- Real-time monitoring of user actions

### 🎨 Modern UI/UX
- Clean, responsive design
- Intuitive navigation and user experience
- Modern icons using Lucide React
- Accessible and mobile-friendly interface

## Project Structure

```
test-upload-centre/
├── public/
│   └── index.html              # Main HTML template
├── src/
│   ├── assets/                 # Dashboard images and static assets
│   ├── components/
│   │   ├── DashboardInternal.jsx   # Admin dashboard with full features
│   │   ├── DashboardExternal.jsx   # User dashboard for file management
│   │   ├── UploadModal.jsx         # File upload interface with validation
│   │   ├── AuditLog.jsx           # System activity tracking
│   │   └── RBACPanel.jsx          # User and role management
│   ├── App.jsx                 # Main application component
│   ├── App.css                 # Application-specific styles
│   ├── index.js                # React application entry point
│   └── index.css               # Global styles and utilities
├── package.json                # Dependencies and scripts
└── README.md                   # Project documentation
```

## Installation

1. **Clone or create the project directory:**
   ```bash
   mkdir test-upload-centre
   cd test-upload-centre
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Dependencies

### Core Dependencies
- **React 18.2.0** - Modern React with hooks and concurrent features
- **React DOM 18.2.0** - React DOM rendering
- **Lucide React 0.263.1** - Beautiful, customizable icons
- **Axios 1.4.0** - HTTP client for API requests

### Development Dependencies
- **React Scripts 5.0.1** - Build tools and development server
- **Testing Libraries** - Jest, React Testing Library for unit testing
- **Web Vitals** - Performance monitoring

## Usage

### User Types

#### External Users
- Access the external dashboard by default
- Upload files with categorization and descriptions
- View file status (pending, approved, rejected)
- Download approved files
- Track download statistics

#### Internal Users/Administrators
- Switch to internal dashboard using the toggle button
- Full file management capabilities
- User and role management through RBAC panel
- System audit log access with filtering and export
- System configuration and settings management

### Key Features

#### File Upload
1. Click the "Choose Files" button or drag files to the upload zone
2. Select appropriate category and add description
3. Files are automatically validated for type and size
4. Upload multiple files simultaneously
5. Track upload progress and validation errors

#### Role Management
1. Access the RBAC panel from the internal dashboard
2. Create custom roles with specific permissions
3. Assign users to roles based on their responsibilities
4. Manage user status and department information

#### Audit Logging
1. View comprehensive system activity logs
2. Filter by user, action type, date range, or search terms
3. Export logs to CSV for compliance reporting
4. Monitor security events and user behavior

## Configuration

### File Upload Settings
- **Maximum file size**: 100MB (configurable)
- **Allowed file types**: PDF, DOC, XLS, PPT, images, videos, archives
- **Categories**: Documentation, Test Results, Configuration, Data, Reports, Other

### User Roles
- **Super Admin**: Full system access
- **Admin**: Administrative access with file management
- **Moderator**: File approval and management
- **User**: Standard upload and download access
- **Viewer**: Read-only access to approved files

## Development

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run test suite
- `npm eject` - Eject from Create React App

### Component Architecture

The application follows a modular component structure:

- **App.jsx** - Main application with user type switching
- **DashboardInternal** - Administrative interface with tabs for different functions
- **DashboardExternal** - User-focused interface for file management
- **UploadModal** - Reusable upload component with validation
- **AuditLog** - System activity tracking with filtering
- **RBACPanel** - User and role management interface

### Styling

The application uses a combination of:
- Global CSS utilities in `index.css`
- Component-specific styles using styled-jsx
- Responsive design principles
- Modern color scheme and typography

## Security Features

- Role-based access control with granular permissions
- File type and size validation
- Comprehensive audit logging
- User session tracking
- IP address logging for security monitoring

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

1. Follow React best practices and hooks patterns
2. Maintain consistent code formatting
3. Add appropriate comments for complex logic
4. Test components thoroughly before submission
5. Follow the established file and folder structure

## License

This project is for demonstration purposes. Modify as needed for your specific use case.

---

**Note**: This is a frontend-only implementation with mock data. For production use, integrate with appropriate backend APIs for authentication, file storage, and data persistence.