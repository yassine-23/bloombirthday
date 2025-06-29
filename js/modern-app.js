// Modern BLOOM Birthday App
class BloomApp {
  constructor() {
    this.init();
    this.setupEventListeners();
    this.initializeAnimations();
    this.setupLazyLoading();
    this.initializeModals();
    this.setupFormValidation();
    this.initStepNavigation();
  }

  init() {
    // Check for reduced motion preference
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Initialize state
    this.state = {
      currentStep: 1,
      formData: {},
      selectedPackage: null,
      isLoading: false
    };
    
    // Initialize navigation
    this.initNavigation();
  }

  // Navigation functionality
  initNavigation() {
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    
    // Sticky nav on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }
      
      // Hide/show nav on scroll
      if (currentScroll > lastScroll && currentScroll > 500) {
        nav.style.transform = 'translateY(-100%)';
      } else {
        nav.style.transform = 'translateY(0)';
      }
      
      lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    navToggle?.addEventListener('click', () => {
      navMenu.classList.toggle('nav__menu--open');
      document.body.classList.toggle('menu-open');
    });
    
    // Close mobile menu on link click
    document.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('nav__menu--open');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // Event listeners
  setupEventListeners() {
    // Package selection
    document.querySelectorAll('.package-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.btn')) {
          this.selectPackage(card.dataset.package);
        }
      });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: this.prefersReducedMotion ? 'auto' : 'smooth',
            block: 'start'
          });
        }
      });
    });
    
    // Form step navigation
    document.querySelectorAll('[data-step]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.navigateToStep(parseInt(btn.dataset.step));
      });
    });
  }

  // Animations
  initializeAnimations() {
    if (this.prefersReducedMotion) return;
    
    // Intersection Observer for scroll animations
    const animateOnScroll = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Stagger animations for children
          const children = entry.target.querySelectorAll('.animate-child');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('animate-in');
            }, index * 100);
          });
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      animateOnScroll.observe(el);
    });
    
    // Parallax effect
    this.initParallax();
    
    // Magnetic buttons
    this.initMagneticButtons();
  }

  // Parallax scrolling
  initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
      if (this.prefersReducedMotion) return;
      
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(el => {
        const speed = el.dataset.parallax || 0.5;
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  // Magnetic button effect
  initMagneticButtons() {
    document.querySelectorAll('.btn--magnetic').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        if (this.prefersReducedMotion) return;
        
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });
      
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }

  // Lazy loading
  setupLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyVideos = document.querySelectorAll('video[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const video = entry.target;
          video.src = video.dataset.src;
          video.load();
          video.classList.add('loaded');
          videoObserver.unobserve(video);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    lazyVideos.forEach(video => videoObserver.observe(video));
  }

  // Modal functionality
  initializeModals() {
    // Enhanced modal with focus trap
    class Modal {
      constructor(modalEl) {
        this.modal = modalEl;
        this.backdrop = modalEl.querySelector('.modal-backdrop');
        this.closeBtn = modalEl.querySelector('.modal__close');
        this.focusableElements = modalEl.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        this.firstFocusable = this.focusableElements[0];
        this.lastFocusable = this.focusableElements[this.focusableElements.length - 1];
        
        this.setupEvents();
      }
      
      setupEvents() {
        // Close button
        this.closeBtn?.addEventListener('click', () => this.close());
        
        // Backdrop click
        this.backdrop?.addEventListener('click', () => this.close());
        
        // ESC key
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && this.isOpen()) {
            this.close();
          }
        });
        
        // Focus trap
        this.modal.addEventListener('keydown', (e) => {
          if (e.key === 'Tab') {
            if (e.shiftKey) {
              if (document.activeElement === this.firstFocusable) {
                e.preventDefault();
                this.lastFocusable.focus();
              }
            } else {
              if (document.activeElement === this.lastFocusable) {
                e.preventDefault();
                this.firstFocusable.focus();
              }
            }
          }
        });
      }
      
      open() {
        this.modal.classList.add('modal--active');
        this.backdrop?.classList.add('modal-backdrop--active');
        document.body.classList.add('modal-open');
        
        // Save last focused element
        this.lastFocused = document.activeElement;
        
        // Focus first element
        setTimeout(() => {
          this.firstFocusable?.focus();
        }, 100);
        
        // Announce to screen readers
        this.modal.setAttribute('aria-hidden', 'false');
      }
      
      close() {
        this.modal.classList.remove('modal--active');
        this.backdrop?.classList.remove('modal-backdrop--active');
        document.body.classList.remove('modal-open');
        
        // Restore focus
        this.lastFocused?.focus();
        
        // Update ARIA
        this.modal.setAttribute('aria-hidden', 'true');
      }
      
      isOpen() {
        return this.modal.classList.contains('modal--active');
      }
    }
    
    // Initialize all modals
    document.querySelectorAll('.modal').forEach(modalEl => {
      const modal = new Modal(modalEl);
      
      // Store modal instance
      modalEl._modalInstance = modal;
      
      // Open triggers
      const triggers = document.querySelectorAll(`[data-modal="${modalEl.id}"]`);
      triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          modal.open();
        });
      });
    });
  }

  // Form validation
  setupFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');
    
    forms.forEach(form => {
      // Real-time validation
      const inputs = form.querySelectorAll('input, textarea, select');
      
      inputs.forEach(input => {
        input.addEventListener('blur', () => {
          this.validateField(input);
        });
        
        input.addEventListener('input', () => {
          if (input.classList.contains('is-invalid')) {
            this.validateField(input);
          }
        });
      });
      
      // Form submission
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!this.validateForm(form)) {
          return;
        }
        
        // Show loading state
        this.setLoading(true);
        
        try {
          // Submit form data
          const formData = new FormData(form);
          const data = Object.fromEntries(formData);
          
          // API call would go here
          await this.submitFormData(data);
          
          // Success feedback
          this.showNotification('Success! Your booking has been confirmed.', 'success');
          
          // Reset form
          form.reset();
          
          // Close modal if in one
          const modal = form.closest('.modal');
          if (modal && modal._modalInstance) {
            modal._modalInstance.close();
          }
        } catch (error) {
          this.showNotification('An error occurred. Please try again.', 'error');
        } finally {
          this.setLoading(false);
        }
      });
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    const pattern = field.getAttribute('pattern');
    const minLength = field.getAttribute('minlength');
    
    let isValid = true;
    let errorMessage = '';
    
    // Required check
    if (required && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }
    
    // Email validation
    else if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }
    
    // Phone validation
    else if (type === 'tel' && value) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
      }
    }
    
    // Pattern validation
    else if (pattern && value) {
      const regex = new RegExp(pattern);
      if (!regex.test(value)) {
        isValid = false;
        errorMessage = field.getAttribute('data-pattern-error') || 'Invalid format';
      }
    }
    
    // Min length validation
    else if (minLength && value.length < minLength) {
      isValid = false;
      errorMessage = `Minimum ${minLength} characters required`;
    }
    
    // Update UI
    if (isValid) {
      field.classList.remove('form-input--error');
      field.classList.add('form-input--success');
      const errorEl = field.parentElement.querySelector('.form-error');
      if (errorEl) errorEl.remove();
    } else {
      field.classList.add('form-input--error');
      field.classList.remove('form-input--success');
      
      let errorEl = field.parentElement.querySelector('.form-error');
      if (!errorEl) {
        errorEl = document.createElement('span');
        errorEl.className = 'form-error';
        field.parentElement.appendChild(errorEl);
      }
      errorEl.textContent = errorMessage;
    }
    
    return isValid;
  }

  validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });
    
    return isValid;
  }

  // Loading state
  setLoading(isLoading) {
    this.state.isLoading = isLoading;
    
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
      if (isLoading) {
        btn.classList.add('btn--loading');
        btn.disabled = true;
      } else {
        btn.classList.remove('btn--loading');
        btn.disabled = false;
      }
    });
  }

  // Notifications
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
      <div class="notification__content">
        <p class="notification__message">${message}</p>
        <button class="notification__close">&times;</button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.classList.add('notification--show');
    }, 10);
    
    // Close button
    notification.querySelector('.notification__close').addEventListener('click', () => {
      this.removeNotification(notification);
    });
    
    // Auto remove
    setTimeout(() => {
      this.removeNotification(notification);
    }, 5000);
  }

  removeNotification(notification) {
    notification.classList.remove('notification--show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }

  // Package selection
  selectPackage(packageId) {
    this.state.selectedPackage = packageId;
    
    // Update UI
    document.querySelectorAll('.package-card').forEach(card => {
      card.classList.remove('package-card--selected');
    });
    
    const selectedCard = document.querySelector(`[data-package="${packageId}"]`);
    selectedCard?.classList.add('package-card--selected');
    
    // Open booking modal
    const bookingModal = document.querySelector('#booking-modal');
    if (bookingModal && bookingModal._modalInstance) {
      bookingModal._modalInstance.open();
    }
  }

  // Multi-step form navigation
  navigateToStep(step) {
    const currentStep = document.querySelector('.modal__step--active');
    const targetStep = document.querySelector(`[data-step-content="${step}"]`);
    
    if (!targetStep) return;
    
    // Update progress
    this.updateProgress(step);
    
    // Transition steps
    currentStep?.classList.remove('modal__step--active');
    if (step < this.state.currentStep) {
      currentStep?.classList.add('modal__step--next');
    } else {
      currentStep?.classList.add('modal__step--prev');
    }
    
    targetStep.classList.add('modal__step--active');
    targetStep.classList.remove('modal__step--prev', 'modal__step--next');
    
    this.state.currentStep = step;
    
    // Update navigation buttons
    this.updateStepButtons();
  }

  // Update step navigation buttons
  updateStepButtons() {
    const prevBtn = document.getElementById('prev-step');
    const nextBtn = document.getElementById('next-step');
    const submitBtn = document.getElementById('submit-booking');
    
    if (this.state.currentStep === 1) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'inline-flex';
      submitBtn.style.display = 'none';
    } else if (this.state.currentStep === 3) {
      prevBtn.style.display = 'inline-flex';
      nextBtn.style.display = 'none';
      submitBtn.style.display = 'inline-flex';
    } else {
      prevBtn.style.display = 'inline-flex';
      nextBtn.style.display = 'inline-flex';
      submitBtn.style.display = 'none';
    }
  }

  // Initialize step navigation
  initStepNavigation() {
    const nextBtn = document.getElementById('next-step');
    const prevBtn = document.getElementById('prev-step');
    const submitBtn = document.getElementById('submit-booking');
    
    nextBtn?.addEventListener('click', () => {
      if (this.validateCurrentStep()) {
        this.navigateToStep(this.state.currentStep + 1);
      }
    });
    
    prevBtn?.addEventListener('click', () => {
      this.navigateToStep(this.state.currentStep - 1);
    });
    
    submitBtn?.addEventListener('click', async () => {
      if (this.validateCurrentStep()) {
        await this.submitBooking();
      }
    });
  }

  // Validate current step
  validateCurrentStep() {
    const currentStepEl = document.querySelector('.modal__step--active');
    const inputs = currentStepEl.querySelectorAll('input, select, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });
    
    return isValid;
  }

  // Submit booking
  async submitBooking() {
    try {
      this.setLoading(true);
      
      // Collect all form data
      const formData = this.collectBookingData();
      
      // Submit to API
      await this.submitFormData(formData);
      
      // Show success and close modal
      this.showNotification('Booking request submitted successfully! We\'ll contact you soon.', 'success');
      
      const modal = document.querySelector('#booking-modal');
      if (modal && modal._modalInstance) {
        modal._modalInstance.close();
        this.resetBookingForm();
      }
      
    } catch (error) {
      this.showNotification('Failed to submit booking. Please try again.', 'error');
    } finally {
      this.setLoading(false);
    }
  }

  // Collect booking form data
  collectBookingData() {
    const modal = document.querySelector('#booking-modal');
    const formData = new FormData();
    
    // Get all form inputs
    const inputs = modal.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      if (input.type === 'radio' && !input.checked) return;
      if (input.type === 'checkbox' && !input.checked) return;
      formData.append(input.name, input.value);
    });
    
    return Object.fromEntries(formData);
  }

  // Reset booking form
  resetBookingForm() {
    const modal = document.querySelector('#booking-modal');
    const form = modal.querySelector('form');
    
    form?.reset();
    this.state.currentStep = 1;
    
    // Reset steps
    modal.querySelectorAll('.modal__step').forEach((step, index) => {
      step.classList.remove('modal__step--active', 'modal__step--prev', 'modal__step--next');
      if (index === 0) {
        step.classList.add('modal__step--active');
      }
    });
    
    // Reset progress
    this.updateProgress(1);
    this.updateStepButtons();
  }

  updateProgress(step) {
    const progressSteps = document.querySelectorAll('.modal__progress-step');
    progressSteps.forEach((el, index) => {
      if (index < step) {
        el.classList.add('modal__progress-step--completed');
      } else {
        el.classList.remove('modal__progress-step--completed');
      }
    });
  }

  // API calls
  async submitFormData(data) {
    // Simulated API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Form submitted:', data);
        resolve();
      }, 2000);
    });
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.bloomApp = new BloomApp();
});

// Export for use in other modules
export default BloomApp;