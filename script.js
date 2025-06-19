// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initLanguageSelector();
    initMobileMenu();
    initScrollAnimations();
    initSmoothScrolling();
    initHeroAnimations();
    initFormInteractions();
    initPricingInteractions();
    initTestimonialCarousel();
    initParallaxEffects();
    initLoadingStates();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    // Navbar scroll behavior
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add/remove scrolled class
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Language selector functionality
function initLanguageSelector() {
    const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = document.getElementById('languageDropdown');
    const languageOptions = document.querySelectorAll('.language-option');
    
    if (!languageBtn || !languageDropdown) return;
    
    // Toggle dropdown
    languageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        languageDropdown.classList.toggle('active');
        languageBtn.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        languageDropdown.classList.remove('active');
        languageBtn.classList.remove('active');
    });
    
    // Handle language selection
    languageOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = option.dataset.lang;
            const flag = option.querySelector('.flag').textContent;
            const text = option.querySelector('span:last-child').textContent;
            
            // Update button
            languageBtn.querySelector('.flag').textContent = flag;
            languageBtn.querySelector('span:last-child').textContent = text.substring(0, 2).toUpperCase();
            
            // Close dropdown
            languageDropdown.classList.remove('active');
            languageBtn.classList.remove('active');
            
            // Here you would typically handle language change
            console.log(`Language changed to: ${lang}`);
        });
    });
}
// Mobile menu toggle
document.getElementById("mobileMenuBtn").addEventListener("click", function() {
  document.getElementById("mobileMenu").classList.toggle("show");
});

// Fecha o menu se clicar fora
document.addEventListener("click", function(e) {
  if (!e.target.closest('.navbar')) {
    document.getElementById("mobileMenu").classList.remove("show");
  }
});
// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.querySelector('.nav-menu');
    const navActions = document.querySelector('.nav-actions');
    
    if (!mobileMenuBtn) return;
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        
        // Create mobile menu if it doesn't exist
        let mobileMenu = document.querySelector('.mobile-menu');
        
        if (!mobileMenu) {
            mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu';
            
            // Clone navigation items
            const menuContent = document.createElement('div');
            menuContent.className = 'mobile-menu-content';
            
            if (navMenu) {
                const clonedMenu = navMenu.cloneNode(true);
                menuContent.appendChild(clonedMenu);
            }
            
            if (navActions) {
                const clonedActions = navActions.cloneNode(true);
                menuContent.appendChild(clonedActions);
            }
            
            mobileMenu.appendChild(menuContent);
            document.body.appendChild(mobileMenu);
        }
        
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .feature-card,
        .testimonial-card,
        .pricing-card,
        .step,
        .hero-stats,
        .section-header
    `);
    
    animatedElements.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// Smooth scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Hero animations
function initHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroActions = document.querySelector('.hero-actions');
    const heroStats = document.querySelector('.hero-stats');
    const phoneScreen = document.querySelector('.phone-screen');
    
    // Animate hero elements on load
    setTimeout(() => {
        if (heroTitle) heroTitle.style.animation = 'fadeInUp 0.8s ease-out forwards';
    }, 200);
    
    setTimeout(() => {
        if (heroSubtitle) heroSubtitle.style.animation = 'fadeInUp 0.8s ease-out forwards';
    }, 400);
    
    setTimeout(() => {
        if (heroActions) heroActions.style.animation = 'fadeInUp 0.8s ease-out forwards';
    }, 600);
    
    setTimeout(() => {
        if (heroStats) heroStats.style.animation = 'fadeInUp 0.8s ease-out forwards';
    }, 800);
    
    // Phone screen interaction
    if (phoneScreen) {
        phoneScreen.addEventListener('click', () => {
            phoneScreen.classList.add('clicked');
            setTimeout(() => {
                phoneScreen.classList.remove('clicked');
            }, 300);
        });
    }
    
    // Floating cards animation
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 2}s`;
    });
}

// Form interactions
function initFormInteractions() {
    // Rating stars interaction
    const stars = document.querySelectorAll('.star');
    
    stars.forEach((star, index) => {
        star.addEventListener('mouseenter', () => {
            stars.forEach((s, i) => {
                if (i <= index) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
        
        star.addEventListener('click', () => {
            stars.forEach((s, i) => {
                if (i <= index) {
                    s.classList.add('selected');
                } else {
                    s.classList.remove('selected');
                }
            });
        });
    });
    
    // Category buttons interaction
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    // Form submission simulation
    const submitBtn = document.querySelector('.submit-btn');
    
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Thank You!';
                submitBtn.style.background = '#48bb78';
                
                setTimeout(() => {
                    submitBtn.textContent = 'Submit Feedback';
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 2000);
            }, 1000);
        });
    }
}

// Pricing interactions
function initPricingInteractions() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('featured')) {
                card.style.transform = '';
            }
        });
    });
    
    // Pricing button interactions
    const pricingBtns = document.querySelectorAll('.pricing-btn');
    
    pricingBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Add loading state
            const originalText = btn.textContent;
            btn.textContent = 'Loading...';
            btn.classList.add('loading');
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.classList.remove('loading');
                
                // Simulate redirect or modal
                console.log('Redirecting to signup...');
            }, 1500);
        });
    });
}

// Testimonial carousel (if needed)
function initTestimonialCarousel() {
    const testimonialGrid = document.querySelector('.testimonials-grid');
    
    if (!testimonialGrid) return;
    
    // Add subtle hover effects
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Parallax effects
function initParallaxEffects() {
    const gradientOrbs = document.querySelectorAll('.gradient-orb');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        gradientOrbs.forEach((orb, index) => {
            const speed = 0.5 + (index * 0.2);
            orb.style.transform = `translate3d(0, ${rate * speed}px, 0)`;
        });
    });
    
    // Mouse movement parallax for hero section
    const hero = document.querySelector('.hero');
    const floatingCards = document.querySelectorAll('.floating-card');
    
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPos = (clientX / innerWidth) - 0.5;
            const yPos = (clientY / innerHeight) - 0.5;
            
            floatingCards.forEach((card, index) => {
                const speed = 10 + (index * 5);
                card.style.transform = `translate(${xPos * speed}px, ${yPos * speed}px)`;
            });
        });
    }
}

// Loading states
function initLoadingStates() {
    // Simulate page loading
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Remove any loading overlays
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }
    });
    
    // Button loading states
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Skip if it's a navigation link
            if (this.getAttribute('href')?.startsWith('#')) return;
            
            e.preventDefault();
            
            const originalText = this.textContent;
            const originalHTML = this.innerHTML;
            
            // Add loading state
            this.classList.add('loading');
            this.innerHTML = `
                <svg class="spinner" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" opacity="0.25"/>
                    <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"/>
                </svg>
                Loading...
            `;
            
            // Simulate async operation
            setTimeout(() => {
                this.classList.remove('loading');
                this.innerHTML = originalHTML;
                
                // Here you would typically handle the actual action
                console.log('Action completed');
            }, 2000);
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimizations
const debouncedResize = debounce(() => {
    // Handle resize events
    console.log('Window resized');
}, 250);

const throttledScroll = throttle(() => {
    // Handle scroll events that need throttling
}, 16); // ~60fps

window.addEventListener('resize', debouncedResize);
window.addEventListener('scroll', throttledScroll);

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    // ESC key closes dropdowns and modals
    if (e.key === 'Escape') {
        const activeDropdown = document.querySelector('.language-dropdown.active');
        if (activeDropdown) {
            activeDropdown.classList.remove('active');
            document.querySelector('.language-btn').classList.remove('active');
        }
        
        const activeMobileMenu = document.querySelector('.mobile-menu.active');
        if (activeMobileMenu) {
            activeMobileMenu.classList.remove('active');
            document.querySelector('.mobile-menu-btn').classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }
});

// Focus management for better accessibility
function manageFocus() {
    const focusableElements = document.querySelectorAll(`
        a[href],
        button:not([disabled]),
        input:not([disabled]),
        select:not([disabled]),
        textarea:not([disabled]),
        [tabindex]:not([tabindex="-1"])
    `);
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.classList.add('focused');
        });
        
        element.addEventListener('blur', () => {
            element.classList.remove('focused');
        });
    });
}

manageFocus();

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // You could send this to an error tracking service
});

// Analytics tracking (placeholder)
function trackEvent(eventName, properties = {}) {
    console.log('Event tracked:', eventName, properties);
    // Here you would integrate with your analytics service
    // Example: gtag('event', eventName, properties);
}

// Track important interactions
document.addEventListener('click', (e) => {
    const target = e.target.closest('a, button');
    if (target) {
        const text = target.textContent.trim();
        const href = target.getAttribute('href');
        
        if (text.includes('Start Free Trial')) {
            trackEvent('cta_clicked', { type: 'free_trial', location: 'hero' });
        } else if (text.includes('Contact Sales')) {
            trackEvent('cta_clicked', { type: 'contact_sales' });
        } else if (href?.startsWith('#')) {
            trackEvent('navigation_clicked', { section: href });
        }
    }
});

// Performance monitoring
const perfObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
        if (entry.entryType === 'navigation') {
            console.log('Page load time:', entry.loadEventEnd - entry.loadEventStart);
        }
    });
});

if ('PerformanceObserver' in window) {
    perfObserver.observe({ entryTypes: ['navigation'] });
}

// Service worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

