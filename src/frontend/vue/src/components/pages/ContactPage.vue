<script setup>
import { ref, reactive } from 'vue'
import { apiService } from '../../services/api.js'

// Reactive state
const isSubmitting = ref(false)
const submitMessage = ref('')
const submitType = ref('') // 'success' or 'error'

// Form data
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// Form validation
const errors = reactive({
  name: '',
  email: '',
  message: ''
})

// Methods
const validateForm = () => {
  // Reset errors
  errors.name = ''
  errors.email = ''
  errors.message = ''
  
  let isValid = true
  
  // Name validation
  if (!form.name.trim()) {
    errors.name = 'Name is required'
    isValid = false
  } else if (form.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
    isValid = false
  }
  
  // Email validation
  if (!form.email.trim()) {
    errors.email = 'Email is required'
    isValid = false
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email.trim())) {
      errors.email = 'Please enter a valid email address'
      isValid = false
    }
  }
  
  // Message validation
  if (!form.message.trim()) {
    errors.message = 'Message is required'
    isValid = false
  } else if (form.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters'
    isValid = false
  }
  
  return isValid
}

const resetForm = () => {
  form.name = ''
  form.email = ''
  form.subject = ''
  form.message = ''
  
  errors.name = ''
  errors.email = ''
  errors.message = ''
}

const submitContact = async () => {
  if (!validateForm()) {
    return
  }
  
  try {
    isSubmitting.value = true
    submitMessage.value = ''
    
    const response = await apiService.submitContact({
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim() || 'General Inquiry',
      message: form.message.trim()
    })
    
    submitMessage.value = response.message
    submitType.value = 'success'
    resetForm()
    
    // Auto-clear success message after 5 seconds
    setTimeout(() => {
      submitMessage.value = ''
    }, 5000)
    
  } catch (error) {
    console.error('Contact form error:', error)
    
    if (error.response && error.response.data && error.response.data.message) {
      submitMessage.value = error.response.data.message
    } else {
      submitMessage.value = 'Failed to send message. Please try again later.'
    }
    
    submitType.value = 'error'
    
    // Auto-clear error message after 8 seconds
    setTimeout(() => {
      submitMessage.value = ''
    }, 8000)
    
  } finally {
    isSubmitting.value = false
  }
}

// Contact information
const contactInfo = {
  email: 'info@nibertinvestments.com',
  phone: '+1 (555) 123-4567',
  address: 'Remote-First Company',
  hours: 'Monday - Friday, 9:00 AM - 6:00 PM EST'
}

const socialLinks = [
  { name: 'LinkedIn', url: '#', icon: '💼' },
  { name: 'GitHub', url: '#', icon: '🐙' },
  { name: 'Twitter', url: '#', icon: '🐦' },
  { name: 'Email', url: `mailto:${contactInfo.email}`, icon: '📧' }
]
</script>

<template>
  <div class="contact-page">
    <!-- Page Header -->
    <section class="page-header">
      <h1 class="page-title">Get In Touch</h1>
      <p class="page-subtitle">
        Ready to start your next project? Let's discuss how we can help bring your vision to life.
      </p>
    </section>

    <!-- Contact Content -->
    <section class="contact-content">
      <div class="contact-grid">
        
        <!-- Contact Form -->
        <div class="form-section">
          <h2>Send us a message</h2>
          <p class="form-description">
            Fill out the form below and we'll get back to you within 24 hours.
          </p>
          
          <form @submit.prevent="submitContact" class="contact-form">
            <!-- Name Field -->
            <div class="form-group">
              <label for="name" class="form-label">
                Name *
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                class="form-input"
                :class="{ 'error': errors.name }"
                placeholder="Your full name"
                :disabled="isSubmitting"
              />
              <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
            </div>

            <!-- Email Field -->
            <div class="form-group">
              <label for="email" class="form-label">
                Email Address *
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="form-input"
                :class="{ 'error': errors.email }"
                placeholder="your.email@example.com"
                :disabled="isSubmitting"
              />
              <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
            </div>

            <!-- Subject Field -->
            <div class="form-group">
              <label for="subject" class="form-label">
                Subject
              </label>
              <input
                id="subject"
                v-model="form.subject"
                type="text"
                class="form-input"
                placeholder="Project inquiry, partnership, etc."
                :disabled="isSubmitting"
              />
            </div>

            <!-- Message Field -->
            <div class="form-group">
              <label for="message" class="form-label">
                Message *
              </label>
              <textarea
                id="message"
                v-model="form.message"
                class="form-textarea"
                :class="{ 'error': errors.message }"
                placeholder="Tell us about your project, timeline, and any specific requirements..."
                rows="6"
                :disabled="isSubmitting"
              ></textarea>
              <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
            </div>

            <!-- Submit Button -->
            <button 
              type="submit" 
              class="submit-btn"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting" class="loading-spinner"></span>
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
            </button>

            <!-- Submit Message -->
            <div v-if="submitMessage" class="submit-message" :class="submitType">
              {{ submitMessage }}
            </div>
          </form>
        </div>

        <!-- Contact Information -->
        <div class="info-section">
          <h2>Contact Information</h2>
          <p class="info-description">
            We're here to help! Reach out through any of these channels.
          </p>

          <div class="contact-methods">
            <div class="contact-method">
              <div class="method-icon">📧</div>
              <div class="method-details">
                <h3>Email</h3>
                <p>{{ contactInfo.email }}</p>
                <span class="method-note">We respond within 24 hours</span>
              </div>
            </div>

            <div class="contact-method">
              <div class="method-icon">📞</div>
              <div class="method-details">
                <h3>Phone</h3>
                <p>{{ contactInfo.phone }}</p>
                <span class="method-note">{{ contactInfo.hours }}</span>
              </div>
            </div>

            <div class="contact-method">
              <div class="method-icon">🌍</div>
              <div class="method-details">
                <h3>Location</h3>
                <p>{{ contactInfo.address }}</p>
                <span class="method-note">Serving clients worldwide</span>
              </div>
            </div>
          </div>

          <!-- Social Links -->
          <div class="social-section">
            <h3>Follow Us</h3>
            <div class="social-links">
              <a 
                v-for="social in socialLinks" 
                :key="social.name"
                :href="social.url"
                class="social-link"
                :title="social.name"
              >
                <span class="social-icon">{{ social.icon }}</span>
                <span class="social-name">{{ social.name }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Database Demo Section -->
    <section class="demo-section">
      <h2 class="section-title">Live Contact Form Demo</h2>
      <div class="demo-card">
        <h3>Backend Integration Showcase</h3>
        <p>This contact form demonstrates our full-stack capabilities:</p>
        
        <div class="demo-features">
          <div class="feature-grid">
            <div class="feature-item">
              <span class="feature-icon">✅</span>
              <span>Real-time form validation</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🔄</span>
              <span>AJAX form submission</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">💾</span>
              <span>Database storage</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🛡️</span>
              <span>Input sanitization</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">📧</span>
              <span>Email validation</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">⚡</span>
              <span>Error handling</span>
            </div>
          </div>
        </div>

        <div class="api-info">
          <h4>API Endpoint:</h4>
          <code class="api-endpoint">POST /api/contact</code>
          <p>Stores contact submissions securely and provides immediate feedback</p>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section">
      <h2 class="section-title">Frequently Asked Questions</h2>
      <div class="faq-grid">
        <div class="faq-item">
          <h3>What types of projects do you work on?</h3>
          <p>We specialize in full-stack web applications, from simple websites to complex enterprise solutions. Our expertise includes e-commerce platforms, SaaS applications, and custom business tools.</p>
        </div>
        
        <div class="faq-item">
          <h3>How long does a typical project take?</h3>
          <p>Project timelines vary based on complexity and requirements. Simple websites typically take 2-4 weeks, while complex applications can take 3-6 months. We'll provide a detailed timeline during our initial consultation.</p>
        </div>
        
        <div class="faq-item">
          <h3>Do you provide ongoing support?</h3>
          <p>Yes! We offer comprehensive maintenance and support packages to ensure your application stays secure, updated, and performs optimally after launch.</p>
        </div>
        
        <div class="faq-item">
          <h3>What technologies do you use?</h3>
          <p>We use modern, proven technologies including Vue.js, React, Node.js, Python, PostgreSQL, MongoDB, and cloud platforms like AWS and Google Cloud.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-page {
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

/* Contact Content */
.contact-content {
  padding: 4rem 0;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

/* Form Section */
.form-section h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.form-description {
  color: #64748b;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.contact-form {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  border: 2px solid #e2e8f0;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  font-family: inherit;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #2563eb;
}

.form-input.error,
.form-textarea.error {
  border-color: #ef4444;
}

.form-input:disabled,
.form-textarea:disabled {
  background-color: #f9fafb;
  cursor: not-allowed;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.error-message {
  display: block;
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.submit-btn {
  width: 100%;
  padding: 1rem 2rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  background: #1d4ed8;
  transform: translateY(-1px);
}

.submit-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.submit-message {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
}

.submit-message.success {
  background: #dcfce7;
  color: #166534;
  border: 1px solid #22c55e;
}

.submit-message.error {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #ef4444;
}

/* Info Section */
.info-section h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.info-description {
  color: #64748b;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.contact-method {
  display: flex;
  align-items: start;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 1rem;
  border: 2px solid #e2e8f0;
}

.method-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.method-details h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
}

.method-details p {
  color: #374151;
  margin-bottom: 0.25rem;
}

.method-note {
  color: #64748b;
  font-size: 0.875rem;
}

/* Social Section */
.social-section h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
}

.social-links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  text-decoration: none;
  color: #374151;
  transition: all 0.2s ease;
}

.social-link:hover {
  border-color: #2563eb;
  background: #eff6ff;
  color: #2563eb;
}

.social-icon {
  font-size: 1.25rem;
}

.social-name {
  font-weight: 500;
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
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.demo-features {
  margin: 2rem 0;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: white;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.feature-icon {
  font-size: 1rem;
}

.api-info {
  background: #1e293b;
  color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-top: 2rem;
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

/* FAQ Section */
.faq-section {
  padding: 4rem 0;
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.faq-item {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  border: 2px solid #e2e8f0;
}

.faq-item h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
}

.faq-item p {
  color: #64748b;
  line-height: 1.6;
}

/* Responsive Design */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .social-links {
    grid-template-columns: 1fr;
  }
  
  .feature-grid {
    grid-template-columns: 1fr;
  }
  
  .faq-grid {
    grid-template-columns: 1fr;
  }
  
  .contact-form {
    padding: 1.5rem;
  }
}
</style>