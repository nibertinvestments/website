# Deployment Guide

This guide covers deployment strategies for various types of web applications in this repository. Choose the appropriate deployment method based on your project type and requirements.

## Table of Contents
- [Static Site Deployment](#static-site-deployment)
- [Frontend Application Deployment](#frontend-application-deployment)
- [Backend API Deployment](#backend-api-deployment)
- [Full-Stack Application Deployment](#full-stack-application-deployment)
- [Database Deployment](#database-deployment)
- [CI/CD Pipeline Setup](#cicd-pipeline-setup)
- [Monitoring and Maintenance](#monitoring-and-maintenance)

## Static Site Deployment

### Netlify Deployment

1. **Build Configuration**
   ```toml
   # netlify.toml
   [build]
     publish = "dist"
     command = "npm run build"

   [build.environment]
     NODE_VERSION = "16"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Deploy Steps**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli

   # Build project
   npm run build

   # Deploy to Netlify
   netlify deploy --prod --dir=dist
   ```

### Vercel Deployment

1. **Configuration**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "package.json",
         "use": "@vercel/static-build",
         "config": { "distDir": "dist" }
       }
     ]
   }
   ```

2. **Deploy Steps**
   ```bash
   # Install Vercel CLI
   npm install -g vercel

   # Deploy
   vercel --prod
   ```

### GitHub Pages Deployment

1. **GitHub Actions Workflow**
   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [ main ]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - name: Setup Node.js
           uses: actions/setup-node@v2
           with:
             node-version: '16'
         - run: npm install
         - run: npm run build
         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

## Frontend Application Deployment

### React Application (Vercel)

1. **Build Optimization**
   ```javascript
   // vite.config.js or webpack.config.js
   export default {
     build: {
       outDir: 'dist',
       minify: 'terser',
       rollupOptions: {
         output: {
           manualChunks: {
             vendor: ['react', 'react-dom'],
             router: ['react-router-dom']
           }
         }
       }
     }
   }
   ```

2. **Environment Variables**
   ```bash
   # Vercel environment variables
   VITE_API_URL=https://api.example.com
   VITE_APP_ENV=production
   ```

### Vue.js Application (Netlify)

1. **Build Configuration**
   ```javascript
   // vue.config.js
   module.exports = {
     outputDir: 'dist',
     publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
     configureWebpack: {
       optimization: {
         splitChunks: {
           chunks: 'all'
         }
       }
     }
   }
   ```

### Angular Application (Firebase Hosting)

1. **Firebase Configuration**
   ```json
   {
     "hosting": {
       "public": "dist",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

2. **Deploy Commands**
   ```bash
   ng build --prod
   firebase deploy
   ```

## Backend API Deployment

### Node.js on Heroku

1. **Procfile**
   ```
   web: node server.js
   ```

2. **Package.json Scripts**
   ```json
   {
     "scripts": {
       "start": "node server.js",
       "heroku-postbuild": "npm run build"
     }
   }
   ```

3. **Deploy Steps**
   ```bash
   # Install Heroku CLI
   # Login to Heroku
   heroku login

   # Create app
   heroku create your-app-name

   # Set environment variables
   heroku config:set NODE_ENV=production
   heroku config:set DATABASE_URL=your_database_url

   # Deploy
   git push heroku main
   ```

### Python Django on DigitalOcean

1. **Requirements.txt**
   ```
   Django==4.2.0
   gunicorn==20.1.0
   psycopg2-binary==2.9.5
   whitenoise==6.4.0
   ```

2. **WSGI Configuration**
   ```python
   # wsgi.py
   import os
   from django.core.wsgi import get_wsgi_application

   os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
   application = get_wsgi_application()
   ```

3. **Gunicorn Configuration**
   ```python
   # gunicorn.conf.py
   bind = "0.0.0.0:8000"
   workers = 3
   timeout = 120
   max_requests = 1000
   preload_app = True
   ```

### PHP Laravel on Shared Hosting

1. **Directory Structure**
   ```
   public_html/
   ├── index.php (Laravel public/index.php)
   ├── assets/
   └── .htaccess
   
   laravel_app/
   ├── app/
   ├── config/
   ├── vendor/
   └── ...
   ```

2. **Modified index.php**
   ```php
   <?php
   require __DIR__.'/../laravel_app/vendor/autoload.php';
   $app = require_once __DIR__.'/../laravel_app/bootstrap/app.php';
   ```

## Full-Stack Application Deployment

### MEAN Stack (MongoDB, Express, Angular, Node.js)

1. **Docker Configuration**
   ```dockerfile
   # Dockerfile
   FROM node:16-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Docker Compose**
   ```yaml
   # docker-compose.yml
   version: '3.8'
   services:
     app:
       build: .
       ports:
         - "3000:3000"
       environment:
         - NODE_ENV=production
         - MONGODB_URI=mongodb://mongo:27017/myapp
       depends_on:
         - mongo
     
     mongo:
       image: mongo:5.0
       volumes:
         - mongo_data:/data/db
   
   volumes:
     mongo_data:
   ```

### LAMP Stack (Linux, Apache, MySQL, PHP)

1. **Apache Configuration**
   ```apache
   <VirtualHost *:80>
       ServerName yourdomain.com
       DocumentRoot /var/www/html/public
       
       <Directory /var/www/html/public>
           AllowOverride All
           Require all granted
       </Directory>
       
       ErrorLog ${APACHE_LOG_DIR}/error.log
       CustomLog ${APACHE_LOG_DIR}/access.log combined
   </VirtualHost>
   ```

2. **Environment Configuration**
   ```bash
   # Install dependencies
   sudo apt update
   sudo apt install apache2 mysql-server php libapache2-mod-php php-mysql

   # Enable Apache modules
   sudo a2enmod rewrite
   sudo systemctl restart apache2
   ```

## Database Deployment

### PostgreSQL on Cloud Providers

1. **AWS RDS Setup**
   ```bash
   # Create RDS instance using AWS CLI
   aws rds create-db-instance \
       --db-instance-identifier myapp-db \
       --db-instance-class db.t3.micro \
       --engine postgres \
       --master-username admin \
       --master-user-password mypassword \
       --allocated-storage 20
   ```

2. **Connection Configuration**
   ```bash
   # Environment variables
   DATABASE_URL=postgresql://admin:password@myapp-db.region.rds.amazonaws.com:5432/myapp
   ```

### MongoDB Atlas

1. **Connection String**
   ```javascript
   const mongoose = require('mongoose');
   
   mongoose.connect(process.env.MONGODB_URI, {
     useNewUrlParser: true,
     useUnifiedTopology: true
   });
   ```

2. **Security Configuration**
   - Whitelist IP addresses
   - Use strong passwords
   - Enable database access control

## CI/CD Pipeline Setup

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy Application

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Run lint
      run: npm run lint

  build:
    needs: test
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build application
      run: npm run build
    
    - name: Upload build artifacts
      uses: actions/upload-artifact@v2
      with:
        name: build-files
        path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Download build artifacts
      uses: actions/download-artifact@v2
      with:
        name: build-files
        path: dist/
    
    - name: Deploy to production
      run: |
        # Add deployment commands here
        echo "Deploying to production..."
```

### GitLab CI/CD

```yaml
# .gitlab-ci.yml
stages:
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "16"

test:
  stage: test
  image: node:${NODE_VERSION}
  script:
    - npm ci
    - npm test
    - npm run lint
  coverage: '/Lines\s*:\s*(\d+\.\d+)%/'

build:
  stage: build
  image: node:${NODE_VERSION}
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 hour
  only:
    - main

deploy:
  stage: deploy
  script:
    - echo "Deploying to production..."
    # Add deployment commands
  only:
    - main
  when: manual
```

## Environment-Specific Configurations

### Development Environment
```bash
# .env.development
NODE_ENV=development
API_URL=http://localhost:8000
DEBUG=true
```

### Staging Environment
```bash
# .env.staging
NODE_ENV=staging
API_URL=https://api-staging.example.com
DEBUG=false
```

### Production Environment
```bash
# .env.production
NODE_ENV=production
API_URL=https://api.example.com
DEBUG=false
```

## SSL Certificate Setup

### Let's Encrypt with Certbot

```bash
# Install Certbot
sudo apt install certbot python3-certbot-apache

# Obtain certificate
sudo certbot --apache -d yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Cloudflare SSL

1. **DNS Configuration**
   - Point domain to Cloudflare nameservers
   - Enable "Full (strict)" SSL mode

2. **Origin Certificate**
   - Generate origin certificate in Cloudflare dashboard
   - Install on server

## Monitoring and Maintenance

### Health Checks

```javascript
// Node.js health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

### Log Management

```bash
# Rotate logs
sudo nano /etc/logrotate.d/myapp

/var/log/myapp/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
}
```

### Performance Monitoring

```javascript
// Basic performance monitoring
const monitor = require('express-status-monitor');
app.use(monitor());
```

## Backup Strategies

### Database Backups

```bash
# PostgreSQL backup
pg_dump -h localhost -U username -d database_name > backup.sql

# MySQL backup
mysqldump -u username -p database_name > backup.sql

# MongoDB backup
mongodump --db database_name --out /backup/directory
```

### Automated Backups

```bash
#!/bin/bash
# backup.sh
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
DATABASE="myapp"

# Create backup
pg_dump $DATABASE > "$BACKUP_DIR/backup_$DATE.sql"

# Clean old backups (keep last 7 days)
find $BACKUP_DIR -name "backup_*.sql" -mtime +7 -delete
```

## Security Considerations

### Server Hardening
- Regular security updates
- Firewall configuration
- SSH key authentication
- Disable unnecessary services

### Application Security
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF tokens
- Rate limiting

### Environment Variables Security
- Never commit secrets to version control
- Use secure secret management services
- Rotate credentials regularly
- Limit access to production environment

---

This deployment guide provides comprehensive instructions for deploying various types of web applications. Choose the appropriate section based on your technology stack and deployment target.