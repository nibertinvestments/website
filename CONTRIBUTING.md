# Contributing Guide

Thank you for your interest in contributing to this website development repository! This guide will help you get started with contributing to the project.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)
- [Community](#community)

## Code of Conduct

### Our Pledge
We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards
Examples of behavior that contributes to creating a positive environment include:
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

### Unacceptable Behavior
Examples of unacceptable behavior include:
- The use of sexualized language or imagery
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate

## Getting Started

### Prerequisites
Before contributing, make sure you have:
- Git installed and configured
- Node.js (v20 or higher) for JavaScript projects
- Python (v3.10 or higher) for Python projects
- Appropriate development tools for your chosen technology stack

### Fork and Clone
1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/website.git
   cd website
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/nibertinvestments/website.git
   ```

### Environment Setup
1. **Copy environment file**:
   ```bash
   cp .env .env.local
   ```
2. **Install dependencies** (if applicable):
   ```bash
   npm install  # For Node.js projects
   pip install -r requirements.txt  # For Python projects
   composer install  # For PHP projects
   ```

## Development Workflow

### Branch Naming Convention
- **Feature branches**: `feature/short-description`
- **Bug fixes**: `fix/short-description`
- **Documentation**: `docs/short-description`
- **Hotfixes**: `hotfix/short-description`

### Workflow Steps
1. **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes** following the coding standards

3. **Test your changes**:
   ```bash
   npm test          # JavaScript/Node.js
   pytest           # Python
   composer test    # PHP
   ```

4. **Lint your code**:
   ```bash
   npm run lint     # JavaScript/Node.js
   flake8 .        # Python
   phpcs .         # PHP
   ```

5. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Add amazing feature"
   ```

6. **Push to your fork**:
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Create a Pull Request** on GitHub

### Staying Up to Date
```bash
# Fetch latest changes
git fetch upstream

# Merge upstream changes into your main branch
git checkout main
git merge upstream/main

# Rebase your feature branch
git checkout feature/amazing-feature
git rebase main
```

## Coding Standards

### General Principles
- **Write clear, readable code** with meaningful names
- **Follow DRY principles** (Don't Repeat Yourself)
- **Keep functions small** and focused on a single responsibility
- **Add comments** for complex logic
- **Write tests** for new functionality

### JavaScript/TypeScript Standards
- Use **ES6+ features** and modern syntax
- Follow **Airbnb style guide** or similar
- Use **Prettier** for code formatting
- Use **ESLint** for code linting
- **2 spaces** for indentation
- **Semicolons** at the end of statements

#### Example:
```javascript
// Good
const getUserById = async (id) => {
  try {
    const response = await fetch(`/api/users/${id}`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Bad
function getUserById(id){
  return fetch('/api/users/'+id).then(response=>response.json())
}
```

### Python Standards
- Follow **PEP 8** style guide
- Use **Black** for code formatting
- Use **flake8** for linting
- **4 spaces** for indentation
- Use **type hints** for function parameters and return values

#### Example:
```python
# Good
from typing import Optional, Dict, Any

async def get_user_by_id(user_id: int) -> Optional[Dict[str, Any]]:
    """Retrieve user by ID from the database.
    
    Args:
        user_id: The unique identifier for the user
        
    Returns:
        User data dictionary or None if not found
    """
    try:
        user = await User.objects.get(id=user_id)
        return user.to_dict()
    except User.DoesNotExist:
        return None

# Bad
def get_user_by_id(user_id):
    return User.objects.get(id=user_id).to_dict()
```

### PHP Standards
- Follow **PSR-12** coding standards
- Use **Composer** for dependency management
- Use **4 spaces** for indentation
- Use **type declarations** for method parameters and return values

#### Example:
```php
<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\User;

class UserService
{
    public function getUserById(int $userId): ?User
    {
        try {
            return User::findOrFail($userId);
        } catch (ModelNotFoundException $e) {
            return null;
        }
    }
}
```

### CSS/SCSS Standards
- Use **BEM methodology** for class naming
- Use **mobile-first** approach
- Organize styles logically
- Use **CSS custom properties** for theming

#### Example:
```scss
// Good
.card {
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: var(--card-bg-color);
  
  &__header {
    margin-bottom: 1rem;
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  &__content {
    line-height: 1.6;
  }
  
  &--featured {
    border: 2px solid var(--accent-color);
  }
}

// Bad
.card { padding:10px; border-radius:5px }
.cardHeader { margin-bottom:10px; font-size:20px }
```

## Submitting Changes

### Pull Request Guidelines
1. **Use a clear title** that describes the change
2. **Provide a detailed description** of what was changed and why
3. **Reference related issues** using keywords (fixes #123, closes #456)
4. **Include screenshots** for UI changes
5. **Ensure all tests pass** before submitting
6. **Keep PRs focused** on a single feature or fix

### Pull Request Template
```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] New tests added for new functionality
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots for UI changes.

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings introduced
```

### Commit Message Guidelines
Use conventional commit format:
```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(auth): add JWT authentication
fix(api): resolve user creation validation error
docs(readme): update installation instructions
style(components): format React components with Prettier
```

## Reporting Issues

### Bug Reports
When reporting bugs, please include:
- **Clear title** describing the issue
- **Steps to reproduce** the problem
- **Expected behavior**
- **Actual behavior**
- **Environment details** (OS, browser, versions)
- **Screenshots** if applicable

### Feature Requests
When requesting features, please include:
- **Clear title** describing the feature
- **Use case** and justification
- **Proposed solution** (if you have one)
- **Alternative solutions** considered

### Issue Template
```markdown
## Bug Report / Feature Request

**Type:** Bug / Feature Request

**Description:**
Clear description of the issue or feature.

**Steps to Reproduce (for bugs):**
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior:**
What you expected to happen.

**Actual Behavior:**
What actually happened.

**Environment:**
- OS: [e.g. iOS]
- Browser: [e.g. chrome, safari]
- Version: [e.g. 22]

**Additional Context:**
Add any other context about the problem here.
```

## Code Review Process

### For Contributors
- Be open to feedback and suggestions
- Respond promptly to review comments
- Make requested changes in a timely manner
- Ask questions if feedback is unclear

### For Reviewers
- Be constructive and respectful in feedback
- Focus on code quality and best practices
- Suggest improvements rather than just pointing out problems
- Approve PRs when they meet the project standards

## Testing Guidelines

### Test Coverage
- **Unit tests**: Test individual functions and components
- **Integration tests**: Test component interactions
- **End-to-end tests**: Test complete user workflows
- Aim for **80%+ code coverage**

### Test Organization
```
tests/
├── unit/
│   ├── components/
│   ├── services/
│   └── utils/
├── integration/
│   ├── api/
│   └── database/
└── e2e/
    ├── auth/
    └── user-flows/
```

### Writing Good Tests
```javascript
// Good test example
describe('UserService', () => {
  describe('getUserById', () => {
    it('should return user when ID exists', async () => {
      // Arrange
      const userId = 1;
      const expectedUser = { id: 1, name: 'John Doe' };
      jest.spyOn(userRepository, 'findById').mockResolvedValue(expectedUser);
      
      // Act
      const result = await userService.getUserById(userId);
      
      // Assert
      expect(result).toEqual(expectedUser);
      expect(userRepository.findById).toHaveBeenCalledWith(userId);
    });
    
    it('should return null when ID does not exist', async () => {
      // Arrange
      const userId = 999;
      jest.spyOn(userRepository, 'findById').mockResolvedValue(null);
      
      // Act
      const result = await userService.getUserById(userId);
      
      // Assert
      expect(result).toBeNull();
    });
  });
});
```

## Documentation Guidelines

### Code Documentation
- Use **JSDoc** for JavaScript/TypeScript
- Use **docstrings** for Python
- Use **PHPDoc** for PHP
- Document **complex algorithms** and business logic

### README Updates
- Keep installation instructions current
- Update feature lists when adding new functionality
- Include examples for new features
- Update troubleshooting section as needed

## Release Process

### Versioning
We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist
- [ ] All tests pass
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] Version number bumped
- [ ] Release notes prepared
- [ ] Security review completed

## Community

### Communication Channels
- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Email**: [contact@nibertinvestments.com](mailto:contact@nibertinvestments.com)

### Getting Help
1. **Check existing documentation** in the `docs/` directory
2. **Search existing issues** on GitHub
3. **Ask in GitHub Discussions** for general questions
4. **Create an issue** for bugs or feature requests

### Recognition
Contributors are recognized in:
- Release notes
- Contributors section in README
- Special mentions for significant contributions

## License
By contributing to this project, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to this project! Your help makes this repository better for everyone. 🎉