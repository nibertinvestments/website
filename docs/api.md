# API Documentation

This document provides comprehensive documentation for the APIs in this website development repository. Use this as a template and reference for documenting your APIs.

## Table of Contents
- [API Overview](#api-overview)
- [Authentication](#authentication)
- [Base URL and Versioning](#base-url-and-versioning)
- [HTTP Status Codes](#http-status-codes)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [Endpoints](#endpoints)
- [Data Models](#data-models)
- [Examples](#examples)

## API Overview

### RESTful Principles
This API follows RESTful design principles:
- **Resources** are identified by URLs
- **HTTP methods** (GET, POST, PUT, DELETE) define operations
- **Stateless** communication
- **JSON** for data exchange
- **HTTP status codes** for response status

### Supported Formats
- **Request**: JSON, Form Data, Query Parameters
- **Response**: JSON
- **Content-Type**: `application/json`
- **Charset**: UTF-8

## Authentication

### JWT Authentication (Recommended)

**Login Endpoint:**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
}
```

**Using the Token:**
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### API Key Authentication

**Header:**
```http
X-API-Key: your-api-key-here
```

### Session Authentication

**Cookie-based authentication for web applications:**
```http
Cookie: sessionid=abcdef123456
```

## Base URL and Versioning

### Base URLs
- **Development**: `http://localhost:8000/api`
- **Staging**: `https://api-staging.example.com`
- **Production**: `https://api.example.com`

### Versioning
APIs use URL versioning:
- **Current Version**: `/api/v1/`
- **Latest Version**: `/api/v2/` (when available)

## HTTP Status Codes

### Success Codes
- **200 OK**: Request successful
- **201 Created**: Resource created successfully
- **204 No Content**: Request successful, no content returned

### Client Error Codes
- **400 Bad Request**: Invalid request format
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Access denied
- **404 Not Found**: Resource not found
- **422 Unprocessable Entity**: Validation errors

### Server Error Codes
- **500 Internal Server Error**: Server error
- **502 Bad Gateway**: Gateway error
- **503 Service Unavailable**: Service temporarily unavailable

## Error Handling

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      },
      {
        "field": "password",
        "message": "Password must be at least 8 characters"
      }
    ]
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Common Error Codes
- `VALIDATION_ERROR`: Request validation failed
- `AUTHENTICATION_ERROR`: Authentication failed
- `AUTHORIZATION_ERROR`: Access denied
- `NOT_FOUND`: Resource not found
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INTERNAL_ERROR`: Server error

## Rate Limiting

### Limits
- **Authenticated Users**: 1000 requests per hour
- **Unauthenticated Users**: 100 requests per hour
- **API Key Users**: 5000 requests per hour

### Headers
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642234200
```

### Rate Limit Exceeded Response
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Try again later.",
    "retry_after": 3600
  }
}
```

## Endpoints

### Authentication Endpoints

#### POST /api/auth/login
Authenticate user and receive access token.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "jwt-token-here",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user"
    }
  }
}
```

#### POST /api/auth/register
Register a new user account.

**Request:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

#### POST /api/auth/logout
Logout and invalidate token.

**Headers:**
```http
Authorization: Bearer jwt-token-here
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### GET /api/auth/me
Get current user information.

**Headers:**
```http
Authorization: Bearer jwt-token-here
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

### User Management Endpoints

#### GET /api/users
Get list of users (Admin only).

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)
- `search`: Search term
- `role`: Filter by role
- `sort`: Sort field (created_at, name, email)
- `order`: Sort order (asc, desc)

**Example Request:**
```http
GET /api/users?page=1&limit=10&search=john&role=user&sort=created_at&order=desc
Authorization: Bearer jwt-token-here
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "per_page": 10,
    "total": 100,
    "last_page": 10,
    "from": 1,
    "to": 10
  }
}
```

#### GET /api/users/{id}
Get specific user by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "profile": {
      "avatar": "https://example.com/avatar.jpg",
      "bio": "Software developer",
      "location": "New York, NY"
    },
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

#### PUT /api/users/{id}
Update user information.

**Request:**
```json
{
  "name": "John Smith",
  "email": "johnsmith@example.com",
  "profile": {
    "bio": "Senior Software Developer",
    "location": "San Francisco, CA"
  }
}
```

#### DELETE /api/users/{id}
Delete user (Admin only).

**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

### Content Management Endpoints

#### GET /api/posts
Get list of posts.

**Query Parameters:**
- `page`: Page number
- `limit`: Items per page
- `category`: Filter by category
- `status`: Filter by status (published, draft)
- `author`: Filter by author ID
- `search`: Search in title and content

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "My Blog Post",
      "slug": "my-blog-post",
      "excerpt": "This is a short excerpt...",
      "status": "published",
      "author": {
        "id": 1,
        "name": "John Doe"
      },
      "category": {
        "id": 1,
        "name": "Technology"
      },
      "published_at": "2024-01-15T10:00:00Z",
      "created_at": "2024-01-14T15:30:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "per_page": 20,
    "total": 50,
    "last_page": 3
  }
}
```

#### POST /api/posts
Create new post.

**Request:**
```json
{
  "title": "My New Post",
  "content": "This is the full content of the post...",
  "excerpt": "Short excerpt...",
  "category_id": 1,
  "status": "draft",
  "tags": ["web", "development", "javascript"],
  "featured_image": "https://example.com/image.jpg"
}
```

#### GET /api/posts/{id}
Get specific post by ID.

#### PUT /api/posts/{id}
Update existing post.

#### DELETE /api/posts/{id}
Delete post.

### File Upload Endpoints

#### POST /api/upload
Upload file(s).

**Request (multipart/form-data):**
```http
Content-Type: multipart/form-data

file: [binary data]
folder: "uploads/images"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "filename": "image.jpg",
    "original_name": "my-image.jpg",
    "size": 1024000,
    "mime_type": "image/jpeg",
    "url": "https://example.com/uploads/images/image.jpg",
    "path": "uploads/images/image.jpg"
  }
}
```

## Data Models

### User Model
```json
{
  "id": "integer",
  "name": "string",
  "email": "string (unique)",
  "email_verified_at": "datetime|null",
  "role": "string (user|admin|moderator)",
  "profile": {
    "avatar": "string|null",
    "bio": "string|null",
    "location": "string|null",
    "website": "string|null"
  },
  "preferences": {
    "notifications": "boolean",
    "newsletter": "boolean",
    "theme": "string (light|dark)"
  },
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### Post Model
```json
{
  "id": "integer",
  "title": "string",
  "slug": "string (unique)",
  "content": "text",
  "excerpt": "string|null",
  "status": "string (draft|published|archived)",
  "author_id": "integer",
  "category_id": "integer|null",
  "featured_image": "string|null",
  "tags": ["string"],
  "seo": {
    "meta_title": "string|null",
    "meta_description": "string|null",
    "meta_keywords": "string|null"
  },
  "published_at": "datetime|null",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### Category Model
```json
{
  "id": "integer",
  "name": "string",
  "slug": "string (unique)",
  "description": "string|null",
  "parent_id": "integer|null",
  "sort_order": "integer",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

## Examples

### JavaScript/Node.js Examples

#### Fetch API
```javascript
// Login example
async function login(email, password) {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (data.success) {
      localStorage.setItem('token', data.data.token);
      return data.data.user;
    } else {
      throw new Error(data.error.message);
    }
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}

// Authenticated request example
async function getUsers() {
  const token = localStorage.getItem('token');
  
  const response = await fetch('/api/users', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  const data = await response.json();
  return data.data;
}
```

#### Axios Examples
```javascript
// Set up axios defaults
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Add auth token to requests
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors globally
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API calls
const api = {
  auth: {
    login: (credentials) => axios.post('/auth/login', credentials),
    logout: () => axios.post('/auth/logout'),
    me: () => axios.get('/auth/me'),
  },
  users: {
    list: (params) => axios.get('/users', { params }),
    get: (id) => axios.get(`/users/${id}`),
    create: (data) => axios.post('/users', data),
    update: (id, data) => axios.put(`/users/${id}`, data),
    delete: (id) => axios.delete(`/users/${id}`),
  },
  posts: {
    list: (params) => axios.get('/posts', { params }),
    get: (id) => axios.get(`/posts/${id}`),
    create: (data) => axios.post('/posts', data),
    update: (id, data) => axios.put(`/posts/${id}`, data),
    delete: (id) => axios.delete(`/posts/${id}`),
  },
};
```

### Python Examples

#### Using requests library
```python
import requests
import json

class APIClient:
    def __init__(self, base_url, token=None):
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({'Content-Type': 'application/json'})
        
        if token:
            self.session.headers.update({'Authorization': f'Bearer {token}'})
    
    def login(self, email, password):
        response = self.session.post(
            f'{self.base_url}/auth/login',
            json={'email': email, 'password': password}
        )
        
        if response.status_code == 200:
            data = response.json()
            if data['success']:
                token = data['data']['token']
                self.session.headers.update({'Authorization': f'Bearer {token}'})
                return data['data']['user']
        
        raise Exception('Login failed')
    
    def get_users(self, page=1, limit=20):
        response = self.session.get(
            f'{self.base_url}/users',
            params={'page': page, 'limit': limit}
        )
        return response.json()
    
    def create_post(self, post_data):
        response = self.session.post(
            f'{self.base_url}/posts',
            json=post_data
        )
        return response.json()

# Usage
client = APIClient('https://api.example.com')
user = client.login('user@example.com', 'password')
users = client.get_users(page=1, limit=10)
```

### PHP Examples

#### Using cURL
```php
<?php

class APIClient {
    private $baseUrl;
    private $token;
    
    public function __construct($baseUrl, $token = null) {
        $this->baseUrl = rtrim($baseUrl, '/');
        $this->token = $token;
    }
    
    private function makeRequest($method, $endpoint, $data = null) {
        $url = $this->baseUrl . $endpoint;
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        
        $headers = ['Content-Type: application/json'];
        if ($this->token) {
            $headers[] = 'Authorization: Bearer ' . $this->token;
        }
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        
        if ($data) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        }
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        $decodedResponse = json_decode($response, true);
        
        if ($httpCode >= 400) {
            throw new Exception($decodedResponse['error']['message'] ?? 'API Error');
        }
        
        return $decodedResponse;
    }
    
    public function login($email, $password) {
        $response = $this->makeRequest('POST', '/auth/login', [
            'email' => $email,
            'password' => $password
        ]);
        
        if ($response['success']) {
            $this->token = $response['data']['token'];
            return $response['data']['user'];
        }
        
        throw new Exception('Login failed');
    }
    
    public function getUsers($page = 1, $limit = 20) {
        return $this->makeRequest('GET', "/users?page={$page}&limit={$limit}");
    }
    
    public function createPost($postData) {
        return $this->makeRequest('POST', '/posts', $postData);
    }
}

// Usage
$client = new APIClient('https://api.example.com');
$user = $client->login('user@example.com', 'password');
$users = $client->getUsers(1, 10);
?>
```

## Testing the API

### Using cURL
```bash
# Login
curl -X POST https://api.example.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Get users with token
curl -X GET https://api.example.com/users \
  -H "Authorization: Bearer your-jwt-token-here"

# Create post
curl -X POST https://api.example.com/posts \
  -H "Authorization: Bearer your-jwt-token-here" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Post","content":"Post content here","status":"published"}'
```

### Using Postman
1. Import the API collection (if available)
2. Set up environment variables for base URL and token
3. Configure authentication in the collection
4. Test endpoints with different scenarios

---

This API documentation provides a comprehensive guide for integrating with the APIs in this repository. Update the endpoints, models, and examples based on your specific implementation.