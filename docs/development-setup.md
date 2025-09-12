# Development Setup Guide

This guide will help you set up your development environment for working with this website development repository. Follow the appropriate sections based on your operating system and chosen technology stack.

## Table of Contents
- [System Requirements](#system-requirements)
- [Operating System Setup](#operating-system-setup)
- [Development Tools](#development-tools)
- [Language-Specific Setup](#language-specific-setup)
- [Database Setup](#database-setup)
- [IDE Configuration](#ide-configuration)
- [Project Initialization](#project-initialization)
- [Common Issues](#common-issues)

## System Requirements

### Minimum Requirements
- **RAM**: 8GB (16GB recommended)
- **Storage**: 20GB free space (SSD recommended)
- **CPU**: Intel i5 / AMD Ryzen 5 or equivalent
- **Internet**: Stable broadband connection

### Supported Operating Systems
- **Windows**: 10/11 (with WSL2 recommended)
- **macOS**: 12+ (Monterey or later)
- **Linux**: Ubuntu 22.04+, Debian 12+, Fedora 38+, CentOS 9+

## Operating System Setup

### Windows Setup

1. **Enable WSL2 (Recommended)**
   ```powershell
   # Run as Administrator
   wsl --install
   wsl --set-default-version 2
   ```

2. **Install Windows Terminal**
   - Download from Microsoft Store
   - Or use package manager: `winget install Microsoft.WindowsTerminal`

3. **Install Git for Windows**
   ```powershell
   winget install Git.Git
   ```

### macOS Setup

1. **Install Xcode Command Line Tools**
   ```bash
   xcode-select --install
   ```

2. **Install Homebrew**
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

3. **Install Git**
   ```bash
   brew install git
   ```

### Linux Setup (Ubuntu/Debian)

1. **Update System**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Install Essential Build Tools**
   ```bash
   sudo apt install -y build-essential curl wget git
   ```

## Development Tools

### Git Configuration

```bash
# Set up Git identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set up Git aliases (optional)
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status

# Set default branch name
git config --global init.defaultBranch main
```

### SSH Key Setup

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Start SSH agent
eval "$(ssh-agent -s)"

# Add SSH key to agent
ssh-add ~/.ssh/id_ed25519

# Copy public key (add to GitHub/GitLab)
cat ~/.ssh/id_ed25519.pub
```

## Language-Specific Setup

### Node.js Setup

#### Using Node Version Manager (NVM) - Recommended

**Linux/macOS:**
```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

# Reload shell configuration
source ~/.bashrc  # or ~/.zshrc

# Install latest LTS Node.js
nvm install --lts
nvm use --lts
nvm alias default node
```

**Windows (using nvm-windows):**
```powershell
# Download and install from: https://github.com/coreybutler/nvm-windows
# Then run:
nvm install lts
nvm use lts
```

#### Direct Installation

**macOS:**
```bash
brew install node npm
```

**Linux:**
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Or using snap
sudo snap install node --classic
```

#### Global npm packages
```bash
npm install -g yarn pnpm
npm install -g @vue/cli @angular/cli create-react-app
npm install -g nodemon pm2
npm install -g eslint prettier
```

### Python Setup

#### Using pyenv (Recommended)

**Linux/macOS:**
```bash
# Install pyenv
curl https://pyenv.run | bash

# Add to shell configuration
echo 'export PATH="$HOME/.pyenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(pyenv init -)"' >> ~/.bashrc
echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.bashrc

# Reload shell
source ~/.bashrc

# Install Python
pyenv install 3.12.0
pyenv global 3.12.0
```

**macOS (using Homebrew):**
```bash
brew install python@3.12
brew install pyenv
```

#### Virtual Environment Setup
```bash
# Create virtual environment
python -m venv myproject-env

# Activate virtual environment
# Linux/macOS:
source myproject-env/bin/activate
# Windows:
myproject-env\Scripts\activate

# Install common packages
pip install --upgrade pip
pip install django flask fastapi
pip install requests numpy pandas
pip install pytest black flake8
```

### PHP Setup

**macOS:**
```bash
brew install php composer
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt install php php-cli php-fpm php-mysql php-pgsql php-sqlite3
sudo apt install php-curl php-json php-mbstring php-xml php-zip

# Install Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

**Global Composer packages:**
```bash
composer global require laravel/installer
composer global require symfony/cli
```

### Ruby Setup

#### Using rbenv (Recommended)

```bash
# Install rbenv
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc

# Install ruby-build
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build

# Install Ruby
rbenv install 3.3.0
rbenv global 3.3.0

# Install Rails
gem install rails bundler
```

### Java Setup

**Using SDKMAN (Recommended):**
```bash
# Install SDKMAN
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"

# Install Java
sdk install java 21.0.2-open
sdk install maven
sdk install gradle
```

### .NET Setup

**Linux:**
```bash
# Install Microsoft package repository
wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb

# Install .NET SDK
sudo apt update
sudo apt install dotnet-sdk-8.0
```

**macOS:**
```bash
brew install dotnet
```

## Database Setup

### PostgreSQL

**macOS:**
```bash
brew install postgresql
brew services start postgresql

# Create database
createdb myapp_development
```

**Linux:**
```bash
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create user and database
sudo -u postgres createuser --interactive
sudo -u postgres createdb myapp_development
```

### MySQL

**macOS:**
```bash
brew install mysql
brew services start mysql
mysql_secure_installation
```

**Linux:**
```bash
sudo apt install mysql-server
sudo systemctl start mysql
sudo systemctl enable mysql
sudo mysql_secure_installation
```

### MongoDB

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list

# Install MongoDB
sudo apt update
sudo apt install mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Redis

**macOS:**
```bash
brew install redis
brew services start redis
```

**Linux:**
```bash
sudo apt install redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

## IDE Configuration

### Visual Studio Code

1. **Install VS Code**
   - Download from [code.visualstudio.com](https://code.visualstudio.com/)
   - Or use package manager

2. **Essential Extensions**
   ```bash
   # Install via command line
   code --install-extension ms-vscode.vscode-typescript-next
   code --install-extension esbenp.prettier-vscode
   code --install-extension ms-python.python
   code --install-extension ms-vscode.vscode-json
   code --install-extension bradlc.vscode-tailwindcss
   code --install-extension ms-vscode.vscode-eslint
   code --install-extension formulahendry.auto-rename-tag
   code --install-extension christian-kohler.path-intellisense
   ```

3. **VS Code Settings**
   ```json
   {
     "editor.formatOnSave": true,
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     },
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "emmet.includeLanguages": {
       "javascript": "javascriptreact"
     },
     "files.associations": {
       "*.env": "plaintext"
     }
   }
   ```

### JetBrains IDEs

**WebStorm/PhpStorm/PyCharm:**
- Download from [jetbrains.com](https://www.jetbrains.com/)
- Configure for your specific language stack
- Install plugins for additional language support

### Vim/Neovim (Advanced)

```bash
# Install Neovim
brew install neovim  # macOS
sudo apt install neovim  # Linux

# Install vim-plug
curl -fLo ~/.local/share/nvim/site/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

## Project Initialization

### Clone Repository

```bash
# Clone the repository
git clone https://github.com/nibertinvestments/website.git
cd website

# Set up environment variables
cp .env .env.local
# Edit .env.local with your configuration
```

### Frontend Project Setup

**React Project:**
```bash
cd src/frontend/react
npm install
npm start
```

**Vue.js Project:**
```bash
cd src/frontend/vue
npm install
npm run serve
```

**Angular Project:**
```bash
cd src/frontend/angular
npm install
ng serve
```

### Backend Project Setup

**Node.js Project:**
```bash
cd src/backend/node
npm install
npm run dev
```

**Python Django Project:**
```bash
cd src/backend/python
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

**PHP Laravel Project:**
```bash
cd src/backend/php
composer install
cp .env.example .env
php artisan key:generate
php artisan serve
```

## Development Workflow Setup

### Pre-commit Hooks

```bash
# Install pre-commit
pip install pre-commit

# Set up pre-commit hooks
pre-commit install
```

**Pre-commit configuration (.pre-commit-config.yaml):**
```yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.4.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-json
  
  - repo: https://github.com/psf/black
    rev: 22.10.0
    hooks:
      - id: black
        language_version: python3
  
  - repo: https://github.com/pre-commit/mirrors-eslint
    rev: v8.28.0
    hooks:
      - id: eslint
        files: \.[jt]sx?$
        types: [file]
```

### Docker Development Environment

**Dockerfile for Node.js:**
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
```

**Docker Compose for Full Stack:**
```yaml
version: '3.8'
services:
  frontend:
    build: ./src/frontend
    ports:
      - "3000:3000"
    volumes:
      - ./src/frontend:/app
      - /app/node_modules
  
  backend:
    build: ./src/backend
    ports:
      - "8000:8000"
    volumes:
      - ./src/backend:/app
    environment:
      - DATABASE_URL=postgresql://user:password@db:5432/myapp
  
  db:
    image: postgres:13
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Common Issues

### Node.js Issues

**Permission errors with npm:**
```bash
# Fix npm permissions
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

**Clear npm cache:**
```bash
npm cache clean --force
```

### Python Issues

**SSL certificate errors:**
```bash
# macOS
/Applications/Python\ 3.x/Install\ Certificates.command

# Linux
pip install --upgrade certifi
```

**Module not found errors:**
```bash
# Ensure virtual environment is activated
which python
pip list
```

### Git Issues

**Authentication problems:**
```bash
# Use personal access token instead of password
git remote set-url origin https://username:token@github.com/repo.git

# Or use SSH
git remote set-url origin git@github.com:username/repo.git
```

### Database Connection Issues

**PostgreSQL connection refused:**
```bash
# Check if service is running
sudo systemctl status postgresql

# Start service
sudo systemctl start postgresql

# Check port availability
sudo netstat -tulpn | grep 5432
```

### Environment Variable Issues

**Variables not loading:**
```bash
# Check if .env file exists and has correct format
cat .env

# For Node.js, ensure dotenv is loaded
require('dotenv').config()

# For Python, use python-dotenv
from dotenv import load_dotenv
load_dotenv()
```

## Performance Tips

### Development Performance

1. **Use SSD storage** for better I/O performance
2. **Increase RAM** for running multiple services
3. **Use local databases** instead of remote connections
4. **Enable file watching optimizations** in your IDE
5. **Use package managers' cache** effectively

### Resource Monitoring

```bash
# Monitor system resources
htop
# or
top

# Monitor disk usage
df -h
du -sh *

# Monitor network
netstat -tulpn
```

## Next Steps

After completing the setup:

1. **Read the project documentation** in the `docs/` directory
2. **Review the coding guidelines** in `Copilot-Instructions.md`
3. **Choose your technology stack** and navigate to the appropriate directory
4. **Set up your first project** following the framework-specific guides
5. **Configure your development workflow** with linting, testing, and pre-commit hooks

For specific framework setup guides, refer to the respective documentation in the project directories.

---

This development setup guide provides comprehensive instructions for setting up a complete web development environment. Follow the sections relevant to your chosen technology stack and operating system.