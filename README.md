# PYQ-HUB

# PYQHub - Previous Year Questions Repository

A comprehensive web platform for students to access, browse, and download Previous Year Question (PYQ) papers for exam preparation.

## 🎯 Features

- 📚 Browse extensive collection of previous year question papers
- 🔍 Search and filter papers by subject, year, semester, and course
- 📥 Download PYQ papers in PDF format
- 👤 User authentication and personalized dashboard
- 🔐 Admin panel for uploading and managing question papers
- 📱 Responsive design for mobile and desktop
- ⭐ Bookmark favorite papers for quick access
- 📊 Track most viewed and downloaded papers

## 🛠️ Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- Cookie-Parser for session management

**Frontend:**
- EJS (Embedded JavaScript templating)
- CSS3
- JavaScript (ES6+)

**File Storage:**
- Local file system or cloud storage (specify which you use)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local installation or MongoDB Atlas account)
- npm or yarn package manager

## 🔑 API Routes

### Admin Routes
- `DELETE /admin/delete-paper/:id` - Delete paper (Admin only)
- `GET /admin/show-paper` - View all papers (Admin)
- `GET /admin/add-paper` - Upload new PYQ paper (Admin only)
- `POST /admin/add-paper` - Upload new PYQ paper (Admin only)

### Admin Login and Logout Routes
- `GET /form/adminlogin` - admin login form
- `POST /form/adminlogin` - admin login
- `GET /admin/adminlogout` - admin logout

### PYQ Paper Routes

- `GET /form/browsepapers` - View paper form
- `POST /form/browsepapers` - View searched papers

## 🎓 Usage Guide

### For Students:
1. Browse the homepage to see all available PYQ papers
2. Use filters to find papers by subject, year, or semester
3. Click on any paper to view details
4. Download papers for offline study

### For Admins:
1. Login with admin credentials
2. Navigate to the upload section
3. Fill in paper details (subject, year, semester, exam type)
4. Upload PDF file
5. Manage existing papers (edit/delete)

## 🔒 User Roles

- **ADMIN**: Can upload, edit, and delete PYQ papers
- **USER**: Can view, search, and download papers

## 📊 Paper Categories

The platform supports PYQ papers for:
- Engineering courses
(Customize based on your actual categories)

## 🌟 Future Enhancements

- [ ] Advanced search with multiple filters
- [ ] User comments and ratings for papers
- [ ] Subject-wise categorization
- [ ] Year-wise statistics and analytics
- [ ] Email notifications for new uploads
- [ ] Social sharing options
- [ ] PDF preview before download
- [ ] Dark mode support
- [ ] Mobile app version

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Guidelines for Contributors

- Maintain code quality and follow existing patterns
- Write clear commit messages
- Test thoroughly before submitting PR
- Update documentation for new features

## 🐛 Known Issues

- List any known bugs or limitations here
- Example: "Large file uploads (>50MB) may timeout on slow connections"


**⭐ If you find this project helpful, please give it a star!**

Made with ❤️ for students by students