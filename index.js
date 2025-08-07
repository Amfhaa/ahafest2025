// Countdown Timer Function
function updateCountdown() {
    // Set the target date (September 13, 2025 00:00:00)
    const targetDate = new Date('September 13, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    // If the countdown is finished
    if (distance < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// FAQ Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Start the countdown
    updateCountdown();
    // Update the countdown every second
    setInterval(updateCountdown, 1000);
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        // Toggle FAQ item on click
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
        
        // Add keyboard accessibility
        question.setAttribute('tabindex', '0');
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.classList.toggle('active');
            }
        });
    });
    
    // Close FAQ when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.faq-item')) {
            faqItems.forEach(item => item.classList.remove('active'));
        }
    });
    
    // Add hover effect to countdown items
    const countdownItems = document.querySelectorAll('.countdown-item');
    countdownItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.03)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Function to check if an element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight * 0.8) &&
        rect.bottom >= (window.innerHeight * 0.2)
    );
}

// Function to handle scroll animations
function handleScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        if (isInViewport(section)) {
            section.classList.remove('hidden');
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animations on load
document.addEventListener('DOMContentLoaded', () => {
    // Add hidden class to all sections initially
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    
    // Initial check for elements in viewport
    handleScrollAnimations();
    
    // Add scroll event listener
    window.addEventListener('scroll', () => {
        handleScrollAnimations();
    });
    
    // Add smooth scroll for anchor links (excluding navigation menu links)
    document.querySelectorAll('a[href^="#"]:not(.nav-links a)').forEach(anchor => {
        // Only add smooth scroll if the link is not in the navigation
        if (!anchor.closest('.nav-links')) {
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
        }
    });
});

// Navbar scroll effect
function handleScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active section in navigation
    updateActiveSection();
}

// Update active section in navigation
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Smooth scroll to section
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        window.scrollTo({
            top: element.offsetTop - 80, // Adjust for fixed header
            behavior: 'smooth'
        });
    }
}

// Mobile menu functionality
function setupMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!mobileMenu || !navMenu) {
        console.error('Mobile menu elements not found');
        return;
    }
    
    // Toggle menu function
    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        
        // Add/remove no-scroll class to body
        if (navMenu.classList.contains('active')) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }
    
    // Add click event to mobile menu toggle
    function handleMenuClick(e) {
        e.stopPropagation();
        e.preventDefault();
        toggleMenu();
    }
    
    // Remove existing event listeners to prevent duplicates
    mobileMenu.removeEventListener('click', handleMenuClick);
    mobileMenu.addEventListener('click', handleMenuClick);
    
    // Close menu when clicking outside
    function handleDocumentClick(e) {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !mobileMenu.contains(e.target)) {
            toggleMenu();
        }
    }
    
    document.removeEventListener('click', handleDocumentClick);
    document.addEventListener('click', handleDocumentClick);
    
    // Handle navigation link clicks using event delegation
    function handleNavLinkClick(e) {
        const link = e.target.closest('.nav-link, .nav-btn');
        if (!link) return;
        
        const targetId = link.getAttribute('href');
        
        // Only handle internal links
        if (targetId && targetId.startsWith('#')) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
            
            // Small delay to allow menu to close before scrolling
            setTimeout(() => {
                smoothScroll(targetId);
            }, 300);
            
            // Update active link
            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });
            link.classList.add('active');
        }
    }
    
    document.removeEventListener('click', handleNavLinkClick);
    document.addEventListener('click', handleNavLinkClick);
    
    // Handle window resize
    let resizeTimer;
    function handleResize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 992 && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        }, 250);
    }
    
    window.removeEventListener('resize', handleResize);
    window.addEventListener('resize', handleResize);
    
    // Close menu with Escape key
    function handleKeyDown(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    }
    
    document.removeEventListener('keydown', handleKeyDown);
    document.addEventListener('keydown', handleKeyDown);
}

// Initialize functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set up mobile menu
    setupMobileMenu();
    
    // Set initial scroll state
    handleScroll();
    
    // Add scroll event listener with debounce for better performance
    let isScrolling;
    window.addEventListener('scroll', function() {
        window.cancelAnimationFrame(isScrolling);
        isScrolling = window.requestAnimationFrame(handleScroll);
    });
    
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                e.preventDefault();
                smoothScroll(targetId);
            }
        });
    });
});

// Handle competition card button clicks
function handleCompetitionButtonClick(e) {
    e.stopPropagation(); // Prevent event bubbling
    const button = e.target.closest('.btn');
    if (!button) return;
    
    const link = button.getAttribute('data-link');
    
    // If there's a link, open it in a new tab
    if (link && link !== '#') {
        window.open(link, '_blank');
    }
    // If no link is set, do nothing (silent fail)
    return false;
}

function setupCompetitionButtons() {
    // Use event delegation on the container
    const container = document.querySelector('.competition-grid');
    if (container) {
        container.removeEventListener('click', handleCompetitionButtonClick);
        container.addEventListener('click', handleCompetitionButtonClick);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupCompetitionButtons();
    
    // Initialize any other components if needed
    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        freeMode: true,
        freeModeMomentum: true,
        simulateTouch: true,
        grabCursor: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        },
    });
});