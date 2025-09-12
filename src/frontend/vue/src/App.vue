<script setup>
import { ref, onMounted } from 'vue'
import { apiService } from './services/api.js'
import HomePage from './components/pages/HomePage.vue'
import AboutPage from './components/pages/AboutPage.vue'
import PortfolioPage from './components/pages/PortfolioPage.vue'
import ContactPage from './components/pages/ContactPage.vue'

// Reactive state
const currentPage = ref('home')
const isLoading = ref(false)
const apiStatus = ref(null)

// Navigation
const pages = [
  { id: 'home', name: 'Home', component: HomePage },
  { id: 'about', name: 'About', component: AboutPage },
  { id: 'portfolio', name: 'Portfolio', component: PortfolioPage },
  { id: 'contact', name: 'Contact', component: ContactPage }
]

// Methods
const setCurrentPage = (pageId) => {
  currentPage.value = pageId
}

const checkApiConnection = async () => {
  try {
    isLoading.value = true
    const health = await apiService.checkHealth()
    apiStatus.value = health.status === 'OK' ? 'connected' : 'error'
  } catch (error) {
    apiStatus.value = 'disconnected'
    console.error('API connection failed:', error)
  } finally {
    isLoading.value = false
  }
}

// Lifecycle
onMounted(() => {
  checkApiConnection()
})

// Computed
const currentComponent = () => {
  const page = pages.find(p => p.id === currentPage.value)
  return page ? page.component : HomePage
}
</script>

<template>
  <div id="app">
    <!-- Header Navigation -->
    <header class="header">
      <nav class="nav">
        <div class="nav-brand">
          <h1 class="brand-title">Nibert Investments</h1>
          <div class="api-status" :class="apiStatus">
            <span class="status-dot"></span>
            <span class="status-text">
              {{ apiStatus === 'connected' ? 'API Connected' : 
                 apiStatus === 'disconnected' ? 'API Offline' : 'Connecting...' }}
            </span>
          </div>
        </div>
        
        <ul class="nav-menu">
          <li 
            v-for="page in pages" 
            :key="page.id"
            class="nav-item"
          >
            <button 
              class="nav-link"
              :class="{ active: currentPage === page.id }"
              @click="setCurrentPage(page.id)"
            >
              {{ page.name }}
            </button>
          </li>
        </ul>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="main">
      <div class="container">
        <Transition name="page" mode="out-in">
          <component :is="currentComponent()" :key="currentPage" />
        </Transition>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <p>&copy; 2024 Nibert Investments. All rights reserved.</p>
        <p class="footer-tech">Built with Vue.js & Node.js</p>
      </div>
    </footer>
  </div>
</template>

<style>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f8fafc;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header Styles */
.header {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.brand-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2563eb;
  margin: 0;
}

.api-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background: #f1f5f9;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #6b7280;
}

.api-status.connected .status-dot {
  background: #22c55e;
}

.api-status.disconnected .status-dot {
  background: #ef4444;
}

.api-status.error .status-dot {
  background: #f59e0b;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 0.5rem;
}

.nav-link {
  background: none;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background: #f1f5f9;
  color: #2563eb;
}

.nav-link.active {
  background: #2563eb;
  color: white;
}

/* Main Content */
.main {
  min-height: calc(100vh - 200px);
  padding: 2rem 0;
}

/* Footer */
.footer {
  background: #1e293b;
  color: white;
  text-align: center;
  padding: 2rem 0;
  margin-top: 4rem;
}

.footer-tech {
  font-size: 0.875rem;
  color: #94a3b8;
  margin-top: 0.5rem;
}

/* Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .nav-brand {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
  
  .nav-menu {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .nav-link {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
  
  .container {
    padding: 0 15px;
  }
}

/* Utility Classes */
.text-center {
  text-align: center;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mb-8 {
  margin-bottom: 2rem;
}

.mt-4 {
  margin-top: 1rem;
}

.mt-8 {
  margin-top: 2rem;
}
</style>
