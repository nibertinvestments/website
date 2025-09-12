<script setup>
import { ref, onMounted } from 'vue'
import { apiService } from '../../services/api.js'

// Reactive state
const portfolioItems = ref([])
const isLoading = ref(false)
const error = ref(null)
const searchQuery = ref('')
const filteredItems = ref([])
const selectedItem = ref(null)

// Methods
const loadPortfolio = async () => {
  try {
    isLoading.value = true
    error.value = null
    const response = await apiService.getPortfolio()
    portfolioItems.value = response.data
    filteredItems.value = response.data
  } catch (err) {
    error.value = 'Failed to load portfolio items'
    console.error('Error loading portfolio:', err)
  } finally {
    isLoading.value = false
  }
}

const filterPortfolio = () => {
  if (!searchQuery.value.trim()) {
    filteredItems.value = portfolioItems.value
  } else {
    const query = searchQuery.value.toLowerCase()
    filteredItems.value = portfolioItems.value.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.technologies.some(tech => tech.toLowerCase().includes(query))
    )
  }
}

const viewProjectDetails = (item) => {
  selectedItem.value = item
}

const closeModal = () => {
  selectedItem.value = null
}

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'completed': return 'status-completed'
    case 'in progress': return 'status-progress'
    case 'planned': return 'status-planned'
    default: return 'status-default'
  }
}

// Lifecycle
onMounted(() => {
  loadPortfolio()
})

// Watch search query
const debouncedFilter = debounce(filterPortfolio, 300)

function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Watch for search changes
const watchSearch = () => {
  debouncedFilter()
}
</script>

<template>
  <div class="portfolio-page">
    <!-- Page Header -->
    <section class="page-header">
      <h1 class="page-title">Our Portfolio</h1>
      <p class="page-subtitle">
        Discover our latest projects and see how we bring ideas to life through innovative development
      </p>
    </section>

    <!-- Search and Filter -->
    <section class="search-section">
      <div class="search-container">
        <div class="search-box">
          <input 
            v-model="searchQuery"
            @input="watchSearch"
            type="text" 
            placeholder="Search projects by name, description, or technology..."
            class="search-input"
          />
          <button class="search-button">
            🔍
          </button>
        </div>
        <p class="search-results" v-if="searchQuery">
          Found {{ filteredItems.length }} project{{ filteredItems.length !== 1 ? 's' : '' }}
        </p>
      </div>
    </section>

    <!-- Portfolio Grid -->
    <section class="portfolio-section">
      <div v-if="isLoading" class="loading">
        <div class="spinner"></div>
        <p>Loading portfolio...</p>
      </div>
      
      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
        <button @click="loadPortfolio" class="btn btn-primary">Retry</button>
      </div>
      
      <div v-else-if="filteredItems.length === 0 && searchQuery" class="no-results">
        <h3>No projects found</h3>
        <p>Try adjusting your search terms or <button @click="searchQuery = ''" class="link-button">view all projects</button></p>
      </div>
      
      <div v-else class="portfolio-grid">
        <div 
          v-for="item in filteredItems" 
          :key="item.id"
          class="portfolio-card"
          @click="viewProjectDetails(item)"
        >
          <div class="card-header">
            <h3 class="project-title">{{ item.title }}</h3>
            <span class="project-status" :class="getStatusColor(item.status)">
              {{ item.status }}
            </span>
          </div>
          
          <p class="project-description">{{ item.description }}</p>
          
          <div class="project-meta">
            <div class="project-year">{{ item.year }}</div>
            <div class="technologies">
              <span 
                v-for="tech in item.technologies.slice(0, 3)" 
                :key="tech"
                class="tech-tag"
              >
                {{ tech }}
              </span>
              <span v-if="item.technologies.length > 3" class="tech-more">
                +{{ item.technologies.length - 3 }} more
              </span>
            </div>
          </div>
          
          <div class="card-footer">
            <button class="view-details-btn">
              View Details →
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Database Demo Section -->
    <section class="demo-section">
      <h2 class="section-title">Live Database Query Demo</h2>
      <div class="demo-card">
        <h3>Portfolio API Connection</h3>
        <p>This portfolio data is retrieved in real-time from our backend API, demonstrating:</p>
        <ul class="demo-features">
          <li>✅ RESTful API endpoints</li>
          <li>✅ Real-time data fetching</li>
          <li>✅ Error handling and loading states</li>
          <li>✅ Search and filter functionality</li>
          <li>✅ Responsive data display</li>
        </ul>
        
        <div class="api-info">
          <h4>API Endpoint:</h4>
          <code class="api-endpoint">GET /api/portfolio</code>
          <p>Returns: {{ portfolioItems.length }} portfolio items</p>
        </div>
        
        <button @click="loadPortfolio" class="btn btn-primary" :disabled="isLoading">
          {{ isLoading ? 'Refreshing...' : 'Refresh Data' }}
        </button>
      </div>
    </section>

    <!-- Project Detail Modal -->
    <div v-if="selectedItem" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeModal">×</button>
        
        <div class="modal-header">
          <h2>{{ selectedItem.title }}</h2>
          <span class="project-status" :class="getStatusColor(selectedItem.status)">
            {{ selectedItem.status }}
          </span>
        </div>
        
        <div class="modal-body">
          <p class="project-description-full">{{ selectedItem.description }}</p>
          
          <div class="project-details">
            <div class="detail-item">
              <h4>Year</h4>
              <p>{{ selectedItem.year }}</p>
            </div>
            
            <div class="detail-item">
              <h4>Technologies Used</h4>
              <div class="tech-list">
                <span 
                  v-for="tech in selectedItem.technologies" 
                  :key="tech"
                  class="tech-tag-modal"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
            
            <div class="detail-item">
              <h4>Project Status</h4>
              <p>This project is currently <strong>{{ selectedItem.status.toLowerCase() }}</strong>.</p>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeModal">Close</button>
          <button class="btn btn-primary">Contact About This Project</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.portfolio-page {
  padding: 0;
}

/* Page Header */
.page-header {
  text-align: center;
  padding: 4rem 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.25rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Search Section */
.search-section {
  padding: 2rem 0;
  background: white;
}

.search-container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.search-box {
  display: flex;
  gap: 0;
  margin-bottom: 1rem;
}

.search-input {
  flex: 1;
  padding: 1rem 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem 0 0 0.5rem;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  border-color: #2563eb;
}

.search-button {
  padding: 1rem 1.5rem;
  background: #2563eb;
  color: white;
  border: 2px solid #2563eb;
  border-radius: 0 0.5rem 0.5rem 0;
  cursor: pointer;
  font-size: 1rem;
}

.search-results {
  color: #64748b;
  font-size: 0.875rem;
}

/* Portfolio Section */
.portfolio-section {
  padding: 4rem 0;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.portfolio-card {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 1rem;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.portfolio-card:hover {
  border-color: #2563eb;
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1rem;
}

.project-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  flex: 1;
}

.project-status {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-completed { background: #dcfce7; color: #166534; }
.status-progress { background: #fef3c7; color: #92400e; }
.status-planned { background: #e0e7ff; color: #3730a3; }
.status-default { background: #f1f5f9; color: #475569; }

.project-description {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.project-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.project-year {
  font-weight: 600;
  color: #2563eb;
  font-size: 0.875rem;
}

.technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: #f1f5f9;
  color: #475569;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.tech-more {
  background: #e2e8f0;
  color: #64748b;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
}

.card-footer {
  border-top: 1px solid #e2e8f0;
  padding-top: 1rem;
}

.view-details-btn {
  background: none;
  border: none;
  color: #2563eb;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s ease;
}

.view-details-btn:hover {
  color: #1d4ed8;
}

/* Demo Section */
.demo-section {
  padding: 4rem 0;
  background: white;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: #1e293b;
}

.demo-card {
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 1rem;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.demo-features {
  text-align: left;
  margin: 1.5rem 0;
  padding-left: 1rem;
}

.demo-features li {
  margin-bottom: 0.5rem;
  color: #64748b;
}

.api-info {
  background: #1e293b;
  color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin: 1.5rem 0;
  text-align: left;
}

.api-info h4 {
  margin-bottom: 0.5rem;
}

.api-endpoint {
  background: #334155;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-family: monospace;
  display: inline-block;
  margin-bottom: 0.5rem;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  background: white;
  border-radius: 1rem;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #64748b;
}

.modal-header {
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.modal-header h2 {
  margin: 0 2rem 1rem 0;
  color: #1e293b;
}

.modal-body {
  padding: 2rem;
}

.project-description-full {
  font-size: 1.125rem;
  line-height: 1.7;
  color: #64748b;
  margin-bottom: 2rem;
}

.project-details {
  display: grid;
  gap: 1.5rem;
}

.detail-item h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag-modal {
  background: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.modal-footer {
  padding: 1rem 2rem 2rem;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

/* Buttons */
.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: #2563eb;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #1d4ed8;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: #f1f5f9;
  color: #475569;
}

.btn-secondary:hover {
  background: #e2e8f0;
}

.link-button {
  background: none;
  border: none;
  color: #2563eb;
  text-decoration: underline;
  cursor: pointer;
}

/* Loading and Error States */
.loading, .error, .no-results {
  text-align: center;
  padding: 4rem 2rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #2563eb;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  color: #ef4444;
}

.no-results h3 {
  color: #64748b;
  margin-bottom: 0.5rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .portfolio-grid {
    grid-template-columns: 1fr;
  }
  
  .card-header {
    flex-direction: column;
    gap: 0.5rem;
    align-items: start;
  }
  
  .project-meta {
    flex-direction: column;
    gap: 1rem;
    align-items: start;
  }
  
  .modal-content {
    margin: 1rem;
    max-height: calc(100vh - 2rem);
  }
  
  .modal-footer {
    flex-direction: column;
  }
}
</style>