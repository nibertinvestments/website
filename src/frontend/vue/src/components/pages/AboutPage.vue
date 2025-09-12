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
  <div class="about-page">
    <!-- Page Header -->
    <section class="page-header">
      <h1 class="page-title">About Nibert Investments</h1>
      <p class="page-subtitle">
        Crafting exceptional digital experiences through innovative full-stack development
      </p>
    </section>

    <!-- Company Overview -->
    <section class="company-overview">
      <div class="content-grid">
        <div class="text-content">
          <h2>Our Story</h2>
          <p>
            Founded in 2024, Nibert Investments represents the next generation of software development companies. 
            We combine cutting-edge technology with proven methodologies to deliver exceptional web applications 
            that drive business growth.
          </p>
          <p>
            Our team specializes in full-stack development, creating seamless experiences from responsive 
            frontends to robust backend systems and scalable cloud infrastructure.
          </p>
        </div>
        <div class="image-content">
          <div class="placeholder-image">
            <div class="image-text">
              <h3>Innovation Hub</h3>
              <p>Where ideas become reality</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Company Details -->
    <section v-if="companyInfo" class="company-details">
      <div class="details-grid">
        <div class="detail-card">
          <h3>🏢 Company</h3>
          <p><strong>Name:</strong> {{ companyInfo.name }}</p>
          <p><strong>Established:</strong> {{ companyInfo.established }}</p>
          <p><strong>Location:</strong> {{ companyInfo.location }}</p>
        </div>
        
        <div class="detail-card">
          <h3>📧 Contact</h3>
          <p><strong>Email:</strong> {{ companyInfo.contact.email }}</p>
          <p><strong>Phone:</strong> {{ companyInfo.contact.phone }}</p>
          <p><strong>Office:</strong> {{ companyInfo.contact.address }}</p>
        </div>
        
        <div class="detail-card">
          <h3>🎯 Mission</h3>
          <p>{{ companyInfo.description }}</p>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services-section">
      <h2 class="section-title">What We Do</h2>
      <div v-if="isLoading" class="loading">
        <div class="spinner"></div>
        <p>Loading services...</p>
      </div>
      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
      </div>
      <div v-else-if="companyInfo" class="services-grid">
        <div 
          v-for="(service, index) in companyInfo.services" 
          :key="service"
          class="service-item"
        >
          <div class="service-number">{{ String(index + 1).padStart(2, '0') }}</div>
          <h3 class="service-name">{{ service }}</h3>
          <p class="service-description">
            Professional {{ service.toLowerCase() }} solutions designed to meet your specific business requirements.
          </p>
        </div>
      </div>
    </section>

    <!-- Technology Stack -->
    <section class="technology-section">
      <h2 class="section-title">Our Technology Stack</h2>
      <p class="section-description">
        We use modern, battle-tested technologies to build scalable and maintainable applications.
      </p>
      
      <div v-if="companyInfo" class="tech-categories">
        <div class="tech-category">
          <h3>Frontend</h3>
          <div class="tech-items">
            <span v-for="tech in ['Vue.js', 'React']" :key="tech" class="tech-badge frontend">
              {{ tech }}
            </span>
          </div>
        </div>
        
        <div class="tech-category">
          <h3>Backend</h3>
          <div class="tech-items">
            <span v-for="tech in ['Node.js', 'Python']" :key="tech" class="tech-badge backend">
              {{ tech }}
            </span>
          </div>
        </div>
        
        <div class="tech-category">
          <h3>Database</h3>
          <div class="tech-items">
            <span v-for="tech in ['PostgreSQL', 'MongoDB']" :key="tech" class="tech-badge database">
              {{ tech }}
            </span>
          </div>
        </div>
        
        <div class="tech-category">
          <h3>Cloud & DevOps</h3>
          <div class="tech-items">
            <span v-for="tech in ['AWS', 'Google Cloud', 'Docker', 'Kubernetes']" :key="tech" class="tech-badge cloud">
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Development Process -->
    <section class="process-section">
      <h2 class="section-title">Our Development Process</h2>
      <div class="process-steps">
        <div class="step">
          <div class="step-number">1</div>
          <h3>Discovery & Planning</h3>
          <p>We start by understanding your requirements, goals, and constraints to create a comprehensive project plan.</p>
        </div>
        
        <div class="step">
          <div class="step-number">2</div>
          <h3>Design & Architecture</h3>
          <p>Our team designs scalable architecture and creates user-centered interfaces that align with your vision.</p>
        </div>
        
        <div class="step">
          <div class="step-number">3</div>
          <h3>Development & Testing</h3>
          <p>We build your application using best practices, with continuous testing to ensure quality and performance.</p>
        </div>
        
        <div class="step">
          <div class="step-number">4</div>
          <h3>Deployment & Support</h3>
          <p>We deploy your application and provide ongoing support to ensure optimal performance and scalability.</p>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="cta-section">
      <div class="cta-content">
        <h2>Ready to Work With Us?</h2>
        <p>Let's discuss how we can help bring your vision to life with our expertise in full-stack development.</p>
        <button class="btn btn-primary">Get In Touch</button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-page {
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

/* Company Overview */
.company-overview {
  padding: 4rem 0;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.text-content h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1.5rem;
}

.text-content p {
  font-size: 1.125rem;
  line-height: 1.7;
  color: #64748b;
  margin-bottom: 1.5rem;
}

.placeholder-image {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  padding: 4rem 2rem;
  border-radius: 1rem;
  text-align: center;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.image-text h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

/* Company Details */
.company-details {
  padding: 4rem 0;
  background: white;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.detail-card {
  background: #f8fafc;
  padding: 2rem;
  border-radius: 1rem;
  border: 2px solid #e2e8f0;
}

.detail-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1.5rem;
}

.detail-card p {
  margin-bottom: 0.75rem;
  color: #64748b;
  line-height: 1.6;
}

/* Services Section */
.services-section {
  padding: 4rem 0;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: #1e293b;
}

.section-description {
  text-align: center;
  font-size: 1.125rem;
  color: #64748b;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.service-item {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  border: 2px solid #e2e8f0;
  transition: all 0.2s ease;
}

.service-item:hover {
  border-color: #2563eb;
  transform: translateY(-2px);
}

.service-number {
  font-size: 2rem;
  font-weight: 800;
  color: #2563eb;
  margin-bottom: 1rem;
}

.service-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
}

.service-description {
  color: #64748b;
  line-height: 1.6;
}

/* Technology Section */
.technology-section {
  padding: 4rem 0;
  background: white;
}

.tech-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.tech-category h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
}

.tech-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tech-badge {
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
}

.tech-badge.frontend { background: #3b82f6; }
.tech-badge.backend { background: #10b981; }
.tech-badge.database { background: #f59e0b; }
.tech-badge.cloud { background: #8b5cf6; }

/* Process Section */
.process-section {
  padding: 4rem 0;
}

.process-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.step {
  text-align: center;
  padding: 2rem;
}

.step-number {
  width: 60px;
  height: 60px;
  background: #2563eb;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 auto 1.5rem;
}

.step h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
}

.step p {
  color: #64748b;
  line-height: 1.6;
}

/* CTA Section */
.cta-section {
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

.btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: white;
  color: #2563eb;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
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
  .page-title {
    font-size: 2rem;
  }
  
  .content-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .details-grid {
    grid-template-columns: 1fr;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .tech-categories {
    grid-template-columns: 1fr;
  }
  
  .process-steps {
    grid-template-columns: 1fr;
  }
}
</style>