# Agent Instructions for Website Development

This document outlines best practices and coding standards for all development work in this repository. Follow these guidelines to ensure consistency, maintainability, and quality across all web technologies.

## General Coding Best Practices

### Code Quality Standards
- Write clean, readable, and self-documenting code
- Use meaningful variable and function names
- Keep functions small and focused on a single responsibility
- Follow DRY (Don't Repeat Yourself) principles
- Implement proper error handling and logging
- Write comprehensive comments for complex logic
- Use consistent indentation (2 or 4 spaces, be consistent)

### Version Control
- Make atomic commits with descriptive messages
- Use branching strategies (feature branches, gitflow)
- Keep commits focused on single features or fixes
- Write clear commit messages in present tense
- Review code before merging to main branch

### Security Best Practices
- Never commit sensitive data (API keys, passwords, secrets)
- Use environment variables for configuration
- Implement proper input validation and sanitization
- Follow OWASP security guidelines
- Use HTTPS for all external communications
- Implement proper authentication and authorization

## Frontend Development

### HTML Best Practices
- Use semantic HTML5 elements
- Ensure proper document structure
- Include meta tags for SEO and responsiveness
- Use proper heading hierarchy (h1-h6)
- Implement accessibility features (ARIA labels, alt text)
- Validate HTML markup

### CSS/SCSS Best Practices
- Use CSS Grid and Flexbox for layouts
- Follow mobile-first responsive design
- Use CSS custom properties (variables)
- Organize styles with logical structure
- Use consistent naming conventions (BEM methodology)
- Minimize CSS specificity conflicts
- Optimize for performance (minimize reflows/repaints)

### JavaScript/TypeScript Best Practices
- Use ES6+ features and modern syntax
- Implement proper error handling with try-catch
- Use async/await for asynchronous operations
- Implement proper state management
- Follow functional programming principles when possible
- Use TypeScript for type safety in larger projects
- Implement proper module organization
- Use bundlers (Webpack, Vite, Parcel) for optimization

### Frontend Frameworks

#### React Best Practices
- Use functional components and hooks
- Implement proper component lifecycle management
- Use Context API or state management libraries (Redux, Zustand)
- Follow component composition patterns
- Implement proper prop validation
- Use React.memo for performance optimization
- Follow React naming conventions

#### Vue.js Best Practices
- Use Composition API for Vue 3 projects
- Implement proper reactive data management
- Use Vuex or Pinia for state management
- Follow Vue style guide conventions
- Use single-file components (SFC)
- Implement proper component communication

#### Angular Best Practices
- Follow Angular style guide
- Use Angular CLI for project generation
- Implement proper dependency injection
- Use RxJS for reactive programming
- Follow component and service separation
- Implement proper routing strategies

## Backend Development

### Node.js Best Practices
- Use Express.js or Fastify for web servers
- Implement proper middleware structure
- Use environment variables for configuration
- Implement proper error handling middleware
- Use helmet for security headers
- Implement rate limiting and CORS
- Use proper logging (Winston, Morgan)
- Follow RESTful API design principles

### Python Best Practices
- Follow PEP 8 style guide
- Use virtual environments (venv, pipenv, poetry)
- Implement proper exception handling
- Use type hints for better code documentation
- Follow Django/Flask best practices for web frameworks
- Implement proper ORM usage
- Use proper testing frameworks (pytest, unittest)

### PHP Best Practices
- Follow PSR standards (PSR-1, PSR-2, PSR-4)
- Use Composer for dependency management
- Implement proper namespace organization
- Use modern PHP features (7.4+, 8.0+)
- Follow MVC architectural patterns
- Implement proper security practices
- Use frameworks like Laravel, Symfony properly

### Database Best Practices
- Design normalized database schemas
- Use indexes for query optimization
- Implement proper data validation
- Use prepared statements to prevent SQL injection
- Implement proper backup strategies
- Use migrations for schema changes
- Follow database naming conventions

## Testing Standards

### Unit Testing
- Achieve minimum 80% code coverage
- Test edge cases and error conditions
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Mock external dependencies
- Keep tests independent and idempotent

### Integration Testing
- Test API endpoints thoroughly
- Test database interactions
- Test third-party service integrations
- Use proper test databases
- Implement proper test data management

### End-to-End Testing
- Test critical user journeys
- Use tools like Cypress, Playwright, or Selenium
- Test across different browsers and devices
- Implement visual regression testing when needed

## Performance Optimization

### Frontend Performance
- Optimize images (WebP, proper sizing)
- Implement lazy loading
- Minimize and compress assets
- Use CDN for static assets
- Implement proper caching strategies
- Monitor Core Web Vitals

### Backend Performance
- Implement database query optimization
- Use caching (Redis, Memcached)
- Implement proper API rate limiting
- Use compression (gzip, brotli)
- Monitor application performance
- Implement proper logging and monitoring

## Deployment and DevOps

### Build Process
- Use proper build tools and pipelines
- Implement environment-specific configurations
- Use Docker for containerization
- Implement proper CI/CD pipelines
- Use infrastructure as code when possible

### Monitoring and Logging
- Implement comprehensive logging
- Use monitoring tools (New Relic, DataDog, etc.)
- Set up proper alerting
- Monitor application metrics
- Implement health checks

## Documentation Standards

### Code Documentation
- Write clear README files
- Document API endpoints with OpenAPI/Swagger
- Include code examples in documentation
- Keep documentation up to date
- Use JSDoc for JavaScript/TypeScript
- Use docstrings for Python

### Project Documentation
- Include setup and installation instructions
- Document deployment processes
- Include troubleshooting guides
- Document architecture decisions
- Maintain changelog

## Accessibility Standards

### WCAG Compliance
- Follow WCAG 2.1 AA guidelines
- Implement proper ARIA labels
- Ensure keyboard navigation support
- Provide alternative text for images
- Ensure proper color contrast ratios
- Test with screen readers

## Browser Compatibility

### Support Matrix
- Define target browser versions
- Use progressive enhancement
- Implement proper polyfills
- Test across different devices
- Use CSS feature queries (@supports)

## File Organization

### Project Structure
```
/src
  /components
  /pages
  /utils
  /services
  /assets
    /images
    /styles
  /tests
/docs
/config
/scripts
```

### Naming Conventions
- Use kebab-case for file names
- Use PascalCase for component names
- Use camelCase for variables and functions
- Use UPPER_SNAKE_CASE for constants
- Use descriptive names for all identifiers

## Project Initialization

### Root File Creation
When starting a new website project, always create essential root files to establish proper project structure and configuration. Each technology stack requires specific root files for optimal development workflow.

#### Essential Root Files by Technology

**HTML/CSS/JavaScript Projects:**
- `index.html` - Main entry point with proper DOCTYPE and meta tags
- `style.css` or `styles.css` - Main stylesheet file
- `script.js` or `main.js` - Main JavaScript file
- `favicon.ico` - Website favicon
- `robots.txt` - Search engine crawling instructions
- `sitemap.xml` - Site structure for SEO

**React Projects:**
- `package.json` - Project dependencies and scripts
- `src/index.js` - Application entry point
- `src/App.js` - Main application component
- `public/index.html` - HTML template
- `public/manifest.json` - Progressive Web App manifest
- `.env` - Environment variables template

**Vue.js Projects:**
- `package.json` - Project dependencies and scripts
- `src/main.js` - Application entry point
- `src/App.vue` - Root Vue component
- `public/index.html` - HTML template
- `vue.config.js` - Vue CLI configuration

**Angular Projects:**
- `package.json` - Project dependencies and scripts
- `src/main.ts` - Application bootstrap
- `src/app/app.component.ts` - Root component
- `src/index.html` - HTML template
- `angular.json` - Angular CLI configuration

**Node.js Backend Projects:**
- `package.json` - Project dependencies and scripts
- `index.js` or `server.js` - Main server file
- `.env` - Environment variables template
- `app.js` - Express application setup (if using Express)

**Python Backend Projects:**
- `requirements.txt` - Python dependencies
- `main.py` or `app.py` - Main application file
- `.env` - Environment variables template
- `wsgi.py` - WSGI application entry point (for production)

**PHP Projects:**
- `composer.json` - PHP dependencies (if using Composer)
- `index.php` - Main entry point
- `.htaccess` - Apache server configuration
- `config.php` - Application configuration

#### Universal Root Files
Regardless of technology stack, every website project should include:
- `README.md` - Project documentation and setup instructions
- `.gitignore` - Git ignore patterns for the specific technology
- `LICENSE` - Project license information
- `.env.example` - Template for environment variables
- `CHANGELOG.md` - Version history and changes

### Project Initialization Checklist
- [ ] Create appropriate root files for chosen technology stack
- [ ] Set up proper directory structure following conventions
- [ ] Initialize version control with `git init`
- [ ] Create initial `.gitignore` file
- [ ] Set up development environment configuration
- [ ] Document setup instructions in README.md
- [ ] Configure build tools and scripts
- [ ] Set up linting and formatting tools
- [ ] Create initial test files and configuration
- [ ] Set up CI/CD pipeline configuration files

## Code Review Guidelines

### Review Checklist
- Code follows style guidelines
- Tests are included and passing
- Documentation is updated
- No security vulnerabilities
- Performance considerations addressed
- Accessibility requirements met
- Error handling implemented
- Code is maintainable and readable

Follow these guidelines consistently to maintain high-quality code across all web technologies in this repository.