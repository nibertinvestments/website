# Website Development Repository

A comprehensive repository for building modern websites using multiple web technologies and frameworks. This repository supports full-stack development with various programming languages and provides a structured approach to web development projects.

## 🚀 Supported Technologies

### Frontend Technologies
- **HTML5/CSS3** - Modern semantic markup and styling
- **JavaScript (ES6+)** - Modern JavaScript with latest features
- **TypeScript** - Type-safe JavaScript development
- **React** - Component-based UI library
- **Vue.js** - Progressive frontend framework
- **Angular** - Full-featured frontend framework
- **Svelte** - Compile-time optimized framework

### Backend Technologies
- **Node.js** - JavaScript runtime for server-side development
- **Python** - With Django, Flask, and FastAPI frameworks
- **PHP** - With Laravel, Symfony, and vanilla PHP
- **Ruby** - With Ruby on Rails framework
- **Java** - With Spring Boot framework
- **C#/.NET** - With ASP.NET Core framework

### Databases
- **PostgreSQL** - Advanced relational database
- **MySQL** - Popular relational database
- **MongoDB** - NoSQL document database
- **SQLite** - Lightweight database for development
- **Redis** - In-memory data structure store

### Build Tools & Package Managers
- **npm/yarn/pnpm** - Node.js package managers
- **Webpack/Vite/Parcel** - Module bundlers
- **Babel** - JavaScript compiler
- **PostCSS** - CSS transformation tool
- **Composer** - PHP package manager
- **pip/Poetry** - Python package managers
- **Bundle** - Ruby package manager
- **Maven/Gradle** - Java build tools

## 📁 Repository Structure

```
website/
├── docs/                   # Documentation files
├── src/                    # Source code
│   ├── frontend/          # Frontend applications
│   │   ├── html/         # Static HTML projects
│   │   ├── react/        # React applications
│   │   ├── vue/          # Vue.js applications
│   │   └── angular/      # Angular applications
│   ├── backend/           # Backend applications
│   │   ├── node/         # Node.js applications
│   │   ├── python/       # Python applications
│   │   ├── php/          # PHP applications
│   │   ├── ruby/         # Ruby applications
│   │   ├── java/         # Java applications
│   │   └── dotnet/       # .NET applications
│   └── shared/            # Shared utilities and components
├── tests/                 # Test files
├── config/                # Configuration files
├── scripts/               # Build and deployment scripts
├── .env                   # Environment variables template
├── .gitignore            # Git ignore rules
├── README.md             # This file
├── License.md            # License information
└── agent-instructions.md # Development guidelines
```

## 🛠️ Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download](https://python.org/)
- **Git** - [Download](https://git-scm.com/)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/nibertinvestments/website.git
   cd website
   ```

2. **Set up environment variables**
   ```bash
   cp .env .env.local
   # Edit .env.local with your actual configuration values
   ```

3. **Choose your technology stack and navigate to the appropriate directory**

   For a React project:
   ```bash
   cd src/frontend/react
   npm install
   npm start
   ```

   For a Python Django project:
   ```bash
   cd src/backend/python
   pip install -r requirements.txt
   python manage.py runserver
   ```

   For a PHP Laravel project:
   ```bash
   cd src/backend/php
   composer install
   php artisan serve
   ```

## 📚 Project Types

### Static Websites
Perfect for landing pages, portfolios, and documentation sites.
- **Location**: `src/frontend/html/`
- **Technologies**: HTML5, CSS3, JavaScript
- **Build Tools**: Webpack, Parcel, or Vite

### Single Page Applications (SPA)
Interactive web applications with rich user interfaces.
- **Location**: `src/frontend/[framework]/`
- **Technologies**: React, Vue.js, Angular, Svelte
- **Features**: Routing, State Management, API Integration

### Full-Stack Web Applications
Complete web applications with backend APIs and databases.
- **Frontend**: Any supported frontend technology
- **Backend**: Node.js, Python, PHP, Ruby, Java, or .NET
- **Database**: PostgreSQL, MySQL, MongoDB, or SQLite

### API-First Applications
Backend APIs that can serve multiple frontend applications.
- **Location**: `src/backend/[language]/`
- **Features**: RESTful APIs, GraphQL, Authentication, Database Integration

## 🚀 Development Workflow

### 1. Project Setup
```bash
# Create a new project directory
mkdir my-website-project
cd my-website-project

# Initialize your chosen technology stack
# (See specific framework documentation)
```

### 2. Development Process
- Follow the guidelines in `agent-instructions.md`
- Use feature branches for development
- Write tests for your code
- Follow code review processes

### 3. Testing
```bash
# Frontend testing
npm test                 # JavaScript/TypeScript
npm run test:e2e        # End-to-end tests

# Backend testing
pytest                  # Python
composer test           # PHP
npm test               # Node.js
mvn test               # Java
dotnet test            # .NET
```

### 4. Building for Production
```bash
# Frontend builds
npm run build          # Most JavaScript frameworks
yarn build            # Alternative with Yarn

# Backend builds
pip install -r requirements.txt  # Python
composer install --no-dev        # PHP
mvn package                      # Java
dotnet publish                   # .NET
```

## 🔧 Configuration

### Environment Variables
Copy `.env` to `.env.local` and configure:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost/dbname

# API Keys
API_KEY=your_api_key_here

# Application Settings
NODE_ENV=development
DEBUG=true
```

### Development Tools Configuration

#### ESLint (JavaScript/TypeScript)
```json
{
  "extends": ["eslint:recommended", "@typescript-eslint/recommended"],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "error"
  }
}
```

#### Prettier (Code Formatting)
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80
}
```

## 🧪 Testing Strategy

### Unit Tests
- Test individual components and functions
- Achieve minimum 80% code coverage
- Use Jest, Mocha, or pytest

### Integration Tests
- Test API endpoints and database interactions
- Test component integration
- Use Postman, Insomnia, or custom test suites

### End-to-End Tests
- Test complete user workflows
- Use Cypress, Playwright, or Selenium
- Test across multiple browsers

## 🚀 Deployment

### Development Deployment
```bash
# Local development server
npm run dev           # Frontend
python manage.py runserver  # Django
php artisan serve     # Laravel
```

### Production Deployment
- **Static Sites**: Netlify, Vercel, GitHub Pages
- **Full-Stack Apps**: Heroku, DigitalOcean, AWS, Google Cloud
- **Containerized**: Docker + Kubernetes

### CI/CD Pipeline
```yaml
# Example GitHub Actions workflow
name: CI/CD Pipeline
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm test
      - run: npm run build
```

## 📖 Documentation

### Available Documentation
- [`agent-instructions.md`](./agent-instructions.md) - Development guidelines and best practices
- [`License.md`](./License.md) - MIT License terms
- Framework-specific documentation in respective directories

### API Documentation
- Use OpenAPI/Swagger for REST APIs
- Include Postman collections for testing
- Document GraphQL schemas

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Follow the development guidelines** in `agent-instructions.md`
4. **Write tests** for your changes
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Code Review Checklist
- [ ] Code follows style guidelines
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No security vulnerabilities
- [ ] Performance considerations addressed

## 🛡️ Security

### Security Best Practices
- Never commit sensitive data to version control
- Use environment variables for secrets
- Implement proper input validation
- Follow OWASP security guidelines
- Keep dependencies updated

### Reporting Security Issues
Please report security vulnerabilities by emailing [security@nibertinvestments.com](mailto:security@nibertinvestments.com)

## 📄 License

This project is licensed under the MIT License - see the [`License.md`](./License.md) file for details.

## 🆘 Support

### Getting Help
- **Documentation**: Check the `docs/` directory
- **Issues**: Open an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions

### Community
- **GitHub**: [https://github.com/nibertinvestments/website](https://github.com/nibertinvestments/website)
- **Website**: [https://nibertinvestments.com](https://nibertinvestments.com)

---

## 🎯 Quick Commands Reference

```bash
# Frontend Development
npm install              # Install dependencies
npm start               # Start development server
npm run build           # Build for production
npm test                # Run tests

# Backend Development (Python)
pip install -r requirements.txt  # Install dependencies
python manage.py runserver       # Start Django server
pytest                          # Run tests

# Backend Development (PHP)
composer install        # Install dependencies
php artisan serve       # Start Laravel server
composer test           # Run tests

# Database Management
npm run migrate         # Run database migrations
npm run seed           # Seed database with test data

# Code Quality
npm run lint           # Lint code
npm run format         # Format code
npm run type-check     # Type checking (TypeScript)
```

Happy coding! 🎉