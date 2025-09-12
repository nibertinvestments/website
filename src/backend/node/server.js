const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database setup - using in-memory storage for simplicity (replace with actual database)
let contacts = [];
let portfolioItems = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "Modern Vue.js e-commerce application with payment integration",
    technologies: ["Vue.js", "Node.js", "PostgreSQL", "Stripe"],
    status: "Completed",
    year: "2024"
  },
  {
    id: 2,
    title: "Task Management System",
    description: "Full-stack productivity application with real-time collaboration",
    technologies: ["React", "Express", "MongoDB", "Socket.io"],
    status: "In Progress",
    year: "2024"
  },
  {
    id: 3,
    title: "AI Content Generator",
    description: "Machine learning powered content creation tool",
    technologies: ["Python", "FastAPI", "TensorFlow", "Vue.js"],
    status: "Completed",
    year: "2023"
  }
];

// API Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Nibert Investments API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Get portfolio items
app.get('/api/portfolio', (req, res) => {
  try {
    res.json({
      success: true,
      data: portfolioItems,
      count: portfolioItems.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching portfolio items',
      error: error.message
    });
  }
});

// Get single portfolio item
app.get('/api/portfolio/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const item = portfolioItems.find(item => item.id === id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio item not found'
      });
    }
    
    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching portfolio item',
      error: error.message
    });
  }
});

// Submit contact form
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, message, subject } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }
    
    // Email validation (basic)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }
    
    // Create contact entry
    const contact = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject ? subject.trim() : 'General Inquiry',
      message: message.trim(),
      timestamp: new Date().toISOString(),
      status: 'new'
    };
    
    // Store contact (in production, save to database)
    contacts.push(contact);
    
    // Log the contact submission
    console.log('New contact submission:', {
      id: contact.id,
      name: contact.name,
      email: contact.email,
      timestamp: contact.timestamp
    });
    
    res.status(201).json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      data: {
        id: contact.id,
        timestamp: contact.timestamp
      }
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing your message. Please try again later.',
      error: error.message
    });
  }
});

// Get contacts (admin endpoint - in production, add authentication)
app.get('/api/contacts', (req, res) => {
  try {
    res.json({
      success: true,
      data: contacts.map(contact => ({
        ...contact,
        // Don't expose full message in list view
        message: contact.message.substring(0, 100) + (contact.message.length > 100 ? '...' : '')
      })),
      count: contacts.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: error.message
    });
  }
});

// Get company information
app.get('/api/company', (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        name: 'Nibert Investments',
        description: 'A full-stack development company specializing in modern web applications and innovative technology solutions.',
        established: '2024',
        location: 'Global',
        services: [
          'Full-Stack Web Development',
          'Mobile Application Development',
          'Cloud Infrastructure Solutions',
          'Database Design & Optimization',
          'API Development & Integration',
          'DevOps & Deployment Services'
        ],
        technologies: [
          'Vue.js', 'React', 'Node.js', 'Python', 
          'PostgreSQL', 'MongoDB', 'AWS', 'Google Cloud',
          'Docker', 'Kubernetes', 'CI/CD'
        ],
        contact: {
          email: 'info@nibertinvestments.com',
          phone: '+1 (555) 123-4567',
          address: 'Remote-First Company'
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching company information',
      error: error.message
    });
  }
});

// Search functionality (demonstrates database-like queries)
app.get('/api/search', (req, res) => {
  try {
    const { q, type } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }
    
    const query = q.toLowerCase();
    let results = [];
    
    if (!type || type === 'portfolio') {
      const portfolioResults = portfolioItems.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.technologies.some(tech => tech.toLowerCase().includes(query))
      ).map(item => ({ ...item, type: 'portfolio' }));
      
      results = results.concat(portfolioResults);
    }
    
    res.json({
      success: true,
      data: results,
      count: results.length,
      query: q,
      searchType: type || 'all'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error performing search',
      error: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.path,
    method: req.method
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Nibert Investments API server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🕐 Started at: ${new Date().toISOString()}`);
  console.log('');
  console.log('Available endpoints:');
  console.log('  GET  /api/health         - Health check');
  console.log('  GET  /api/portfolio      - Portfolio items');
  console.log('  GET  /api/portfolio/:id  - Single portfolio item');
  console.log('  POST /api/contact        - Submit contact form');
  console.log('  GET  /api/contacts       - Get contacts (admin)');
  console.log('  GET  /api/company        - Company information');
  console.log('  GET  /api/search         - Search functionality');
});

module.exports = app;