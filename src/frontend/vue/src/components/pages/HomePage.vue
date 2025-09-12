<script setup>
import { ref, onMounted } from 'vue'
import { apiService } from '../../services/api.js'

// Reactive state
const companyInfo = ref(null)
const isLoading = ref(false)
const error = ref(null)

// Methods
const loadCompanyInfo = async () => {
  try {
    isLoading.value = true
    error.value = null
    const response = await apiService.getCompanyInfo()
    companyInfo.value = response.data
  } catch (err) {
    error.value = 'Failed to load company information'
    console.error('Error loading company info:', err)
  } finally {
    isLoading.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadCompanyInfo()
})
</script>

<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          Welcome to <span class="highlight">Nibert Investments</span>
        </h1>
        <p class="hero-subtitle">
          Full-Stack Development Excellence
        </p>
        <p class="hero-description">
          We specialize in creating modern, scalable web applications using cutting-edge technologies. 
          From Vue.js frontends to Node.js backends and cloud-based solutions.
        </p>
        <div class="hero-actions">
          <button class="btn btn-primary">View Our Work</button>
          <button class="btn btn-secondary">Get In Touch</button>
        </div>
      </div>
      <div class="hero-visual">
        <div class="code-showcase">
          <div class="code-header">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <div class="code-content">
            <div class="code-line">
              <span class="keyword">const</span> 
              <span class="variable">portfolio</span> = 
              <span class="string">'showcase'</span>;
            </div>
            <div class="code-line">
              <span class="keyword">function</span> 
              <span class="function">buildAwesome</span>() {
            </div>
            <div class="code-line indent">
              <span class="keyword">return</span> 
              <span class="string">'full-stack magic'</span>;
            </div>
            <div class="code-line">}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services">
      <h2 class="section-title">Our Services</h2>
      <div v-if="isLoading" class="loading">
        <div class="spinner"></div>
        <p>Loading services...</p>
      </div>
      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
      </div>
      <div v-else-if="companyInfo" class="services-grid">
        <div 
          v-for="service in companyInfo.services" 
          :key="service"
          class="service-card"
        >
          <div class="service-icon">🚀</div>
          <h3 class="service-title">{{ service }}</h3>
          <p class="service-description">
            Professional {{ service.toLowerCase() }} solutions tailored to your business needs.
          </p>
        </div>
      </div>
    </section>

    <!-- Technology Stack -->
    <section class="tech-stack">
      <h2 class="section-title">Technology Stack</h2>
      <div v-if="companyInfo" class="tech-grid">
        <div 
          v-for="tech in companyInfo.technologies" 
          :key="tech"
          class="tech-item"
        >
          {{ tech }}
        </div>
      </div>
    </section>

    <!-- Database Connection Demo -->
    <section class="demo-section">
      <h2 class="section-title">Live Database Connection</h2>
      <div class="demo-card">
        <h3>API Status Demo</h3>
        <p>This section demonstrates our backend API connectivity:</p>
        <div class="api-demo">
          <button @click="loadCompanyInfo" class="btn btn-primary" :disabled="isLoading">
            {{ isLoading ? 'Querying Database...' : 'Test Database Query' }}
          </button>
          <div v-if="companyInfo" class="demo-result">
            <h4>✅ Database Query Successful!</h4>
            <div class="result-data">
              <p><strong>Company:</strong> {{ companyInfo.name }}</p>
              <p><strong>Established:</strong> {{ companyInfo.established }}</p>
              <p><strong>Services Count:</strong> {{ companyInfo.services.length }}</p>
              <p><strong>Technologies:</strong> {{ companyInfo.technologies.length }}+ technologies</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="cta">
      <div class="cta-content">
        <h2>Ready to Build Something Amazing?</h2>
        <p>Let's discuss your next project and bring your ideas to life.</p>
        <button class="btn btn-primary btn-large">Start Your Project</button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  padding: 0;
}

/* Hero Section */
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  min-height: 60vh;
  padding: 4rem 0;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1rem;
  color: #1e293b;
}

.highlight {
  color: #2563eb;
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 1rem;
}

.hero-description {
  font-size: 1.125rem;
  color: #64748b;
  margin-bottom: 2rem;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.875rem 2rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background: #2563eb;
  color: white;
}

.btn-primary:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
}

.btn-secondary {
  background: transparent;
  color: #2563eb;
  border: 2px solid #2563eb;
}

.btn-secondary:hover {
  background: #2563eb;
  color: white;
}

.btn-large {
  padding: 1.25rem 3rem;
  font-size: 1.125rem;
}

/* Code Showcase */
.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.code-showcase {
  background: #1e293b;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.code-header {
  background: #334155;
  padding: 1rem;
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red { background: #ef4444; }
.dot.yellow { background: #f59e0b; }
.dot.green { background: #22c55e; }

.code-content {
  padding: 1.5rem;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
}

.code-line {
  margin-bottom: 0.5rem;
}

.indent {
  padding-left: 2rem;
}

.keyword { color: #f472b6; }
.variable { color: #60a5fa; }
.function { color: #fbbf24; }
.string { color: #34d399; }

/* Services Section */
.services {
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

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.service-card {
  background: #f8fafc;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  transition: transform 0.2s ease;
}

.service-card:hover {
  transform: translateY(-5px);
}

.service-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.service-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e293b;
}

.service-description {
  color: #64748b;
  line-height: 1.6;
}

/* Technology Stack */
.tech-stack {
  padding: 4rem 0;
}

.tech-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.tech-item {
  background: #2563eb;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  font-weight: 600;
  font-size: 0.875rem;
}

/* Demo Section */
.demo-section {
  padding: 4rem 0;
  background: white;
}

.demo-card {
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.api-demo {
  margin-top: 2rem;
}

.demo-result {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #dcfce7;
  border: 2px solid #22c55e;
  border-radius: 0.5rem;
  text-align: left;
}

.result-data {
  margin-top: 1rem;
}

.result-data p {
  margin-bottom: 0.5rem;
}

/* Call to Action */
.cta {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  padding: 4rem 0;
  text-align: center;
}

.cta-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

/* Loading and Error States */
.loading, .error {
  text-align: center;
  padding: 2rem;
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

/* Responsive Design */
@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-actions {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .tech-grid {
    gap: 0.5rem;
  }
  
  .tech-item {
    font-size: 0.75rem;
    padding: 0.5rem 1rem;
  }
}
</style>