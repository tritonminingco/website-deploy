document.addEventListener('DOMContentLoaded', function() {
  // Mobile navigation toggle
  const navToggle = document.querySelector('.mobile-nav-toggle');
  const primaryNav = document.querySelector('#primary-navigation');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const visibility = primaryNav.getAttribute('data-visible') === 'true';
      primaryNav.setAttribute('data-visible', !visibility);
      navToggle.setAttribute('aria-expanded', !visibility);
    });
  }
  
  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        primaryNav.setAttribute('data-visible', 'false');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
  
  // Add active class to navigation links based on scroll position
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });
  
  // Back to top button functionality
  const backToTopButton = document.querySelector('.back-to-top');
  
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15
  });
  
  // Apply to all sections and other elements that should animate
  document.querySelectorAll('.animate-on-scroll').forEach(section => {
    observer.observe(section);
  });
  
  // Apply to individual elements within sections
  document.querySelectorAll('.tech-images img, .deep-images img, .articles-list article').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });
});

  
  // Contact form functionality
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      
      // Simple validation
      if (!data.name || !data.email || !data.message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
      }
      
      // Simulate form submission
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      // Simulate API call delay
      setTimeout(() => {
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }, 2000);
    });
  }
  
  // Notification system
  function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      color: white;
      font-weight: bold;
      z-index: 10000;
      max-width: 400px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    
    // Set background color based on type
    switch (type) {
      case 'success':
        notification.style.backgroundColor = '#00b4d8';
        break;
      case 'error':
        notification.style.backgroundColor = '#ff4444';
        break;
      default:
        notification.style.backgroundColor = '#007ea7';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 5000);
  }
  
  // Enhanced scroll animations for new elements
  document.querySelectorAll('.feature-card, .spec-item, .standard-item, .contact-info, .contact-form').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });


  
  // Scroll progress indicator
  function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrollPercent + '%';
    });
  }
  
  // Enhanced intersection observer with different animation types
  const enhancedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Add staggered animation for child elements
        const children = entry.target.querySelectorAll('.feature-card, .spec-item, .standard-item');
        children.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add('visible');
          }, index * 100);
        });
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Apply enhanced animations to elements
  document.querySelectorAll('.deepseaguard-overview, .compliance-features, .technical-specs, .compliance-standards').forEach(el => {
    el.classList.add('reveal-up');
    enhancedObserver.observe(el);
  });
  
  // Parallax effect for hero background
  function initParallax() {
    const heroBackground = document.querySelector('.hero-bg');
    if (heroBackground) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroBackground.style.transform = `translateY(${rate}px)`;
      });
    }
  }
  
  // Smooth scrolling for navigation links
  function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
  
  // Loading animation for charts
  function showChartLoading() {
    const chartContainers = document.querySelectorAll('.chart-block canvas');
    chartContainers.forEach(canvas => {
      const skeleton = document.createElement('div');
      skeleton.className = 'chart-skeleton';
      canvas.parentNode.insertBefore(skeleton, canvas);
      canvas.style.display = 'none';
      
      // Show actual chart after delay
      setTimeout(() => {
        skeleton.remove();
        canvas.style.display = 'block';
      }, 1000);
    });
  }
  
  // Particle background effect
  function createParticles() {
    const hero = document.getElementById('hero');
    if (hero) {
      const particlesContainer = document.createElement('div');
      particlesContainer.className = 'particles';
      hero.appendChild(particlesContainer);
      
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
      }
    }
  }
  
  // Enhanced form validation with real-time feedback
  function enhanceFormValidation() {
    const form = document.getElementById('contactForm');
    if (form) {
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      
      inputs.forEach(input => {
        input.addEventListener('blur', function() {
          validateField(this);
        });
        
        input.addEventListener('input', function() {
          if (this.classList.contains('error')) {
            validateField(this);
          }
        });
      });
    }
  }
  
  function validateField(field) {
    const value = field.value.trim();
    const isValid = field.checkValidity() && value !== '';
    
    field.classList.toggle('error', !isValid);
    field.classList.toggle('valid', isValid);
    
    // Remove existing feedback
    const existingFeedback = field.parentNode.querySelector('.field-feedback');
    if (existingFeedback) {
      existingFeedback.remove();
    }
    
    // Add feedback message
    if (!isValid && field.hasAttribute('required')) {
      const feedback = document.createElement('div');
      feedback.className = 'field-feedback error';
      feedback.textContent = getErrorMessage(field);
      field.parentNode.appendChild(feedback);
    }
  }
  
  function getErrorMessage(field) {
    if (field.type === 'email') {
      return 'Please enter a valid email address';
    }
    return 'This field is required';
  }
  
  // Lazy loading for images
  function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      });
      
      images.forEach(img => imageObserver.observe(img));
    }
  }
  
  // Keyboard navigation enhancement
  function enhanceKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
      // ESC key to close mobile menu
      if (e.key === 'Escape') {
        const nav = document.querySelector('#primary-navigation');
        const toggle = document.querySelector('.mobile-nav-toggle');
        if (nav && toggle) {
          nav.setAttribute('data-visible', 'false');
          toggle.setAttribute('aria-expanded', 'false');
        }
      }
      
      // Tab navigation for better accessibility
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });
    
    document.addEventListener('mousedown', function() {
      document.body.classList.remove('keyboard-navigation');
    });
  }
  
  // Performance monitoring
  function initPerformanceMonitoring() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
        });
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }
  
  // Initialize all enhancements
  createScrollProgress();
  initParallax();
  initSmoothScrolling();
  createParticles();
  enhanceFormValidation();
  initLazyLoading();
  enhanceKeyboardNavigation();
  initPerformanceMonitoring();
  
  // Add CSS for form validation feedback
  const style = document.createElement('style');
  style.textContent = `
    .form-group input.error,
    .form-group textarea.error {
      border-color: #ff4444;
      box-shadow: 0 0 0 3px rgba(255, 68, 68, 0.1);
    }
    
    .form-group input.valid,
    .form-group textarea.valid {
      border-color: #00b4d8;
    }
    
    .field-feedback {
      margin-top: 0.5rem;
      font-size: 0.875rem;
      color: #ff4444;
    }
    
    .keyboard-navigation *:focus {
      outline: 2px solid #00b4d8 !important;
      outline-offset: 2px !important;
    }
    
    img.loaded {
      opacity: 1;
      transition: opacity 0.3s ease;
    }
    
    img[loading="lazy"] {
      opacity: 0;
    }
  `;
  document.head.appendChild(style);

