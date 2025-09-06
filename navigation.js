document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS animations
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100
  });


  // Mobile navigation toggle
  const navToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isExpanded = mainNav.classList.contains('active');
      mainNav.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', !isExpanded);
    });
  }
  
  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        mainNav.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Animated counter for hero stats
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, 16);
    });
  }

  // Trigger counter animation when hero is visible
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(heroSection);
  }

  // Tech card hover effects
  const techCards = document.querySelectorAll('.tech-card');
  techCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Preview card interactions
  const previewCards = document.querySelectorAll('.preview-card');
  previewCards.forEach(card => {
    card.addEventListener('click', () => {
      const tech = card.getAttribute('data-tech');
      if (tech) {
        // Scroll to corresponding section
        const targetSection = document.getElementById(tech);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }); 
  
  // Initialize search functionality
  initializeSearch();

  // Add active class to navigation links based on scroll position
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
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
  // Search functionality
  function toggleSearch() {
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('search-input');
    
    searchOverlay.classList.toggle('active');
    
    if (searchOverlay.classList.contains('active')) {
      searchInput.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  function searchFor(term) {
    const searchInput = document.getElementById('search-input');
    searchInput.value = term;
    performSearch(term);
  }

  function performSearch(term) {
    // Simple search implementation
    const sections = document.querySelectorAll('section');
    const results = [];
    
    sections.forEach(section => {
      const text = section.textContent.toLowerCase();
      if (text.includes(term.toLowerCase())) {
        results.push({
          title: section.querySelector('h2, h3')?.textContent || 'Section',
          content: section.textContent.substring(0, 200) + '...',
          element: section
        });
      }
    });
    
    displaySearchResults(results);
  }

  function displaySearchResults(results) {
    const resultsContainer = document.getElementById('search-results');
    
    if (results.length === 0) {
      resultsContainer.innerHTML = '<p>No results found. Try a different search term.</p>';
      return;
    }
    
    const resultsHTML = results.map(result => `
      <div class="search-result-item" onclick="scrollToSection('${result.element.id}')">
        <h4>${result.title}</h4>
        <p>${result.content}</p>
      </div>
    `).join('');
    
    resultsContainer.innerHTML = `
      <div class="search-results-list">
        <h4>Search Results</h4>
        ${resultsHTML}
      </div>
    `;
  }

  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      toggleSearch();
    }
  }

  // Theme toggle functionality
  function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update theme toggle icon
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.setAttribute('aria-label', `Switch to ${currentTheme} mode`);
  }

  // Initialize theme from localStorage
  function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
  }

  // Initialize theme on page load
  initializeTheme();

  // Search input event listener
  function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      let searchTimeout;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          if (e.target.value.length > 2) {
            performSearch(e.target.value);
          } else {
            document.getElementById('search-results').innerHTML = `
              <div class="search-suggestions">
                <h4>Popular Searches</h4>
                <div class="suggestion-tags">
                  <span class="suggestion-tag" onclick="searchFor('CrabBot')">CrabBot</span>
                  <span class="suggestion-tag" onclick="searchFor('Luna AUV')">Luna AUV</span>
                  <span class="suggestion-tag" onclick="searchFor('OceanSim')">OceanSim</span>
                  <span class="suggestion-tag" onclick="searchFor('Ocean OS')">Ocean OS</span>
                  <span class="suggestion-tag" onclick="searchFor('DeepSeaGuard')">DeepSeaGuard</span>
                  <span class="suggestion-tag" onclick="searchFor('Environmental Monitoring')">Environmental Monitoring</span>
                </div>
              </div>
            `;
          }
        }, 300);
      });
    }
  }

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
  // Close search on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const searchOverlay = document.getElementById('search-overlay');
      if (searchOverlay.classList.contains('active')) {
        toggleSearch();
      }
    }
  });
  
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
  initLazyLoading();
  enhanceKeyboardNavigation();
  initPerformanceMonitoring();
});
