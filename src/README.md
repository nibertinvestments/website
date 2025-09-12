# Nibert Investments Website

A modern full-stack showcase website built with Vue.js frontend and Node.js backend, demonstrating professional web development capabilities.

## 🚀 Features

- **Vue.js Frontend**: Modern, responsive single-page application
- **Node.js Backend**: RESTful API with Express.js
- **Database Integration**: Real-time data queries and form submissions
- **Multiple Pages**: Home, About, Portfolio, and Contact pages
- **Live API Demo**: Demonstrates database connectivity and CRUD operations
- **Responsive Design**: Mobile-friendly and accessible
- **Professional UI**: Clean, modern design suitable for business use

## 🛠️ Technology Stack

### Frontend
- **Vue.js 3**: Progressive JavaScript framework
- **Vite**: Fast build tool and development server
- **Axios**: HTTP client for API requests
- **Modern CSS**: Responsive design with CSS Grid and Flexbox

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **CORS**: Cross-origin resource sharing
- **Helmet**: Security middleware
- **In-memory storage**: For demonstration (easily replaceable with databases)

## 📁 Project Structure

```
src/
├── frontend/vue/          # Vue.js application
│   ├── src/
│   │   ├── components/
│   │   │   └── pages/     # Page components
│   │   ├── services/      # API service layer
│   │   ├── assets/        # Static assets
│   │   ├── App.vue        # Main application component
│   │   └── main.js        # Application entry point
│   ├── public/            # Public assets
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
└── backend/node/          # Node.js API server
    ├── server.js          # Express server
    └── package.json       # Backend dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v8 or higher)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd website
   ```

2. **Install Backend Dependencies**
   ```bash
   cd src/backend/node
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend/vue
   npm install
   ```

4. **Start the Backend Server**
   ```bash
   cd src/backend/node
   npm start
   ```
   Server runs on http://localhost:3001

5. **Start the Frontend Development Server**
   ```bash
   cd src/frontend/vue
   npm run dev
   ```
   Application runs on http://localhost:5173

## 🌐 API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/health` - Health check
- `GET /api/portfolio` - Get all portfolio items
- `GET /api/portfolio/:id` - Get single portfolio item
- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Get contact submissions (admin)
- `GET /api/company` - Get company information
- `GET /api/search` - Search functionality

## 📱 Pages & Features

### Home Page
- Hero section with company introduction
- Services overview
- Technology stack display
- Live database connection demo
- Call-to-action sections

### About Page
- Company story and mission
- Detailed service descriptions
- Technology stack breakdown
- Development process overview
- Team and company information

### Portfolio Page
- Project showcase with search functionality
- Real-time data from backend API
- Project detail modals
- Technology filtering
- Database query demonstrations

### Contact Page
- Interactive contact form with validation
- Real-time form submission to backend
- Contact information display
- Social media links
- FAQ section

## 🔧 Development Features

### Frontend Features
- **Component-based architecture**: Reusable Vue.js components
- **Reactive state management**: Vue 3 Composition API
- **API integration**: Axios for HTTP requests
- **Form validation**: Client-side validation with error handling
- **Loading states**: User feedback during API calls
- **Error handling**: Graceful error management
- **Responsive design**: Mobile-first approach

### Backend Features
- **RESTful API**: Standard HTTP methods and status codes
- **CORS enabled**: Cross-origin resource sharing
- **Security headers**: Helmet.js for security
- **Input validation**: Server-side validation and sanitization
- **Error handling**: Comprehensive error responses
- **Logging**: Request and error logging
- **Health checks**: Monitoring endpoint

## 🚀 Deployment

### Frontend (Netlify)
The frontend is configured for easy deployment on Netlify:

1. Build the application:
   ```bash
   cd src/frontend/vue
   npm run build
   ```

2. Deploy the `dist` folder to Netlify

3. Configure environment variables:
   - `VITE_API_URL`: Backend API URL

### Backend (Google Cloud, Heroku, etc.)
The backend can be deployed to any Node.js hosting platform:

1. Set environment variables:
   - `PORT`: Server port (default: 3001)
   - `NODE_ENV`: Environment (production/development)

2. Start the server:
   ```bash
   npm start
   ```

## 🧪 Database Integration Demo

This application demonstrates database connectivity through:

1. **Portfolio data retrieval**: Simulates fetching projects from a database
2. **Contact form submission**: Stores form data and provides feedback
3. **Search functionality**: Demonstrates query operations
4. **Real-time updates**: Shows live data interaction

The current implementation uses in-memory storage for demonstration purposes, but can easily be extended to use:
- PostgreSQL
- MongoDB
- MySQL
- SQLite
- Firebase
- Any other database system

## 🎨 Design & UX

- **Modern UI**: Clean, professional design
- **Responsive**: Works on all device sizes
- **Accessible**: Semantic HTML and ARIA labels
- **Fast loading**: Optimized assets and code splitting
- **Smooth animations**: CSS transitions and Vue transitions
- **User feedback**: Loading states and success/error messages

## 🔒 Security Features

- **Input validation**: Both client and server-side
- **XSS protection**: Output encoding and sanitization
- **CORS configuration**: Controlled cross-origin access
- **Security headers**: Helmet.js middleware
- **Rate limiting ready**: Easy to add rate limiting
- **Environment variables**: Secure configuration management

## 📊 Performance

- **Fast build times**: Vite for rapid development
- **Small bundle size**: Tree-shaking and code splitting
- **Lazy loading**: Components loaded on demand
- **Optimized images**: Responsive image handling
- **Caching strategies**: HTTP caching headers

## 🤝 Contributing

This project demonstrates professional web development practices and can be extended with:

- User authentication and authorization
- Real database integration
- Payment processing
- Email notifications
- Admin dashboard
- Advanced search and filtering
- File upload capabilities
- Real-time notifications

## 📝 License

MIT License - see LICENSE file for details

## 📞 Contact

For questions about this project or development services:

- **Email**: info@nibertinvestments.com
- **Website**: [nibertinvestments.com]
- **GitHub**: [View Repository]

---

Built with ❤️ using Vue.js and Node.js