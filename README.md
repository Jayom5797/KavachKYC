# KavachKYC 🛡️

A comprehensive KYC (Know Your Customer) document validation system powered by AI, OCR technology, and advanced cross-document verification capabilities.

## ✨ Key Features

### 🔍 Multi-Document Verification
- **Upload up to 5 documents** simultaneously for comprehensive KYC validation
- **Cross-document identity verification** ensures all documents belong to the same person
- **Smart name matching** with fuzzy logic for variations in name formatting
- **Individual document validation** with aggregated results and confidence scoring

### 🤖 AI-Powered Analysis
- **Google Gemini AI integration** for intelligent document analysis and fraud detection
- **High-precision OCR** via OCR.Space API with 99.5% accuracy
- **Automated data extraction** for names, DOB, document types, and numbers
- **Confidence scoring** for validation reliability assessment

### 🎨 Modern User Experience
- **Glassmorphism UI design** with animated backgrounds and smooth transitions
- **Dark/Light mode support** with system preference detection
- **Responsive design** optimized for desktop and mobile devices
- **Real-time processing feedback** with step-by-step progress tracking
- **Drag-and-drop file upload** with visual feedback and file management

### 📊 Comprehensive Reporting
- **Detailed validation reports** with extracted data and verification status
- **Cross-document analysis** showing identity match confidence and recommendations
- **Individual document breakdowns** with status indicators and metadata
- **Export capabilities** for PDF reports and audit trails
- **Dashboard analytics** with validation statistics and trends

## 🏗️ Architecture

### Frontend Stack
- **React 18** with TypeScript for type-safe development
- **Vite** for fast development and optimized builds
- **TailwindCSS** for utility-first styling with custom components
- **React Router** for client-side routing and navigation
- **Custom hooks** for state management and API integration

### Backend Stack
- **Node.js** with Express framework
- **TypeScript** for enhanced developer experience
- **RESTful API design** with proper error handling
- **File upload handling** with validation and security measures
- **Environment-based configuration** for different deployment stages

### AI/ML Integration
- **Google Gemini AI** for document analysis and fraud detection
- **OCR.Space API** for text extraction from images and PDFs
- **Custom validation logic** for cross-document verification
- **JSON response parsing** with error handling and fallbacks

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Google Gemini API key
- OCR.Space API key

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd KavachKYC
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env file with your API keys:
# PORT=5001
# OCR_SPACE_API_KEY=your_ocr_space_key
# GOOGLE_GEMINI_API_KEY=your_gemini_key
npm run dev
```

3. **Frontend Setup**
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env file if needed:
# VITE_API_BASE_URL=http://localhost:5001
npm run dev
```

4. **Access the application**
Open your browser and navigate to: `http://localhost:5173`

## 📱 User Flow

### Single Document Validation
1. Navigate to `/upload`
2. Upload a single document (image or PDF)
3. Click "Validate Documents"
4. Monitor progress on `/processing`
5. View results on `/report` with extracted data and validation status

### Multi-Document Verification
1. Navigate to `/upload`
2. Upload multiple documents (up to 5)
3. System processes each document individually
4. Cross-document identity verification performed
5. Comprehensive report showing individual results and identity matching

### Dashboard Analytics
- Visit `/dashboard` for validation statistics
- View recent validations and system health metrics
- Monitor document types and processing trends

## 🔧 Configuration

### Environment Variables

**Backend (`backend/.env`)**
```env
PORT=5001
OCR_SPACE_API_KEY=your_ocr_space_api_key
GOOGLE_GEMINI_API_KEY=your_google_gemini_api_key
```

**Frontend (`frontend/.env`)**
```env
VITE_API_BASE_URL=http://localhost:5001
```

### Supported File Types
- **Images**: JPG, JPEG, PNG, WebP
- **Documents**: PDF
- **Size Limit**: 10MB per file
- **Quantity**: Up to 5 files per validation session

## 🛡️ Security Features

- **Client-side file validation** before upload
- **Server-side file type verification** and size limits
- **No persistent storage** of sensitive documents by default
- **API key protection** through environment variables
- **CORS configuration** for secure cross-origin requests

## 🚀 Deployment & CI/CD

KavachKYC supports automated deployment with continuous integration and delivery:

### **Production Architecture**
- **Backend**: Google Cloud Run with Docker containerization
- **Frontend**: Firebase Hosting with optimized builds
- **CI/CD**: Automated deployments via GitHub Actions and Cloud Build
- **Environment Management**: Secure API key handling and environment variables

### **Automated Deployment Flow**
```
GitHub Push → Triggers → Backend (Cloud Build → Cloud Run) + Frontend (GitHub Actions → Firebase)
```

### **Key Benefits**
- **Zero-downtime deployments** with automatic rollbacks
- **Environment synchronization** between frontend and backend
- **Scalable infrastructure** with pay-per-use pricing
- **Global CDN distribution** via Firebase Hosting
- **Container orchestration** with Cloud Run auto-scaling

## 🔮 Future Enhancements

- **Database integration** with Supabase for validation history
- **User authentication** and role-based access control
- **Batch processing** for enterprise-scale document validation
- **Advanced fraud detection** with machine learning models
- **API documentation** with OpenAPI/Swagger
- **Real-time notifications** for validation status updates
- **Multi-region deployment** for global availability

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for advanced document analysis
- OCR.Space for reliable text extraction services
- TailwindCSS for the beautiful UI framework
- React community for excellent development tools

---

**Note**: This is a prototype system designed for demonstration purposes. For production use, implement proper data encryption, user authentication, and compliance with relevant data protection regulations.
