document.addEventListener('DOMContentLoaded', function() {
    // Menu elements
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = menuBtn ? menuBtn.querySelector('i') : null;
    
    // Check if elements exist
    if (!menuBtn || !mobileMenu || !menuIcon) {
        console.error('Menu elements not found');
        return;
    }
    
    // Toggle menu function
    function toggleMenu(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        
        const isOpening = !mobileMenu.classList.contains('active');
        
        // Toggle body scroll
        document.body.style.overflow = isOpening ? 'hidden' : '';
        
        // Toggle menu classes
        mobileMenu.classList.toggle('active', isOpening);
        
        // Toggle menu icon
        menuIcon.className = isOpening ? 'fas fa-times text-xl' : 'fas fa-bars text-xl';
        
        // Update aria attributes
        menuBtn.setAttribute('aria-expanded', isOpening ? 'true' : 'false');
        
        // Focus management
        if (isOpening) {
            // Focus first focusable element when opening
            const firstLink = mobileMenu.querySelector('a');
            if (firstLink) firstLink.focus();
        } else {
            // Return focus to menu button when closing
            menuBtn.focus();
        }
    }
    
    // Close menu when clicking outside
    function handleClickOutside(event) {
        if (mobileMenu.classList.contains('active') && 
            !menuBtn.contains(event.target) && 
            !mobileMenu.contains(event.target)) {
            toggleMenu();
        }
    }
    
    // Close menu when pressing Escape key
    function handleEscapeKey(event) {
        if (event.key === 'Escape' && mobileMenu.classList.contains('active')) {
            toggleMenu();
        }
    }
    
    // Handle menu link clicks
    function handleMenuLinkClick(event) {
        // Only close menu if it's an anchor link to a section on the same page
        if (event.target.getAttribute('href').startsWith('#')) {
            toggleMenu();
        }
    }
    
    // Initialize menu button
    menuBtn.setAttribute('aria-label', 'Toggle navigation menu');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-controls', 'mobile-menu');
    menuBtn.setAttribute('aria-controls', 'mobile-menu');
    
    // Add event listeners
    menuBtn.addEventListener('click', toggleMenu);
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    // Add click event to all menu links
    const menuLinks = document.querySelectorAll('#mobile-menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', handleMenuLinkClick);
        
        // Add keyboard navigation support
        link.addEventListener('keydown', (e) => {
            // Handle tab navigation within menu
            if (e.key === 'Tab') {
                const firstLink = menuLinks[0];
                const lastLink = menuLinks[menuLinks.length - 1];
                
                if (e.shiftKey && document.activeElement === firstLink) {
                    // Shift+Tab on first link: focus menu button
                    e.preventDefault();
                    menuBtn.focus();
                } else if (!e.shiftKey && document.activeElement === lastLink) {
                    // Tab on last link: focus menu button
                    e.preventDefault();
                    menuBtn.focus();
                }
            }
        });
    });
    
    // Close menu when window is resized to desktop
    function handleResize() {
        if (window.innerWidth >= 768 && mobileMenu.classList.contains('active')) {
            toggleMenu();
        }
    }
    
    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Navbar scroll effect
    const navbar = document.querySelector('header');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('opacity-0', 'invisible');
                backToTopButton.classList.add('opacity-100', 'visible');
            } else {
                backToTopButton.classList.remove('opacity-100', 'visible');
                backToTopButton.classList.add('opacity-0', 'invisible');
            }
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Form submission
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formObject);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Dark mode is set by default in the HTML

    // Add animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate-fadeInUp');
            }
        });
    };
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});

// Add loading animation styles
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    /* Loading animation */
    body:not(.loaded) {
        overflow: hidden;
    }
    
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease, visibility 0.5s ease;
    }
    
    .loaded .loading-overlay {
        opacity: 0;
        visibility: hidden;
    }
    
    .spinner {
        width: 50px;
        height: 50px;
        border: 5px solid #f3f3f3;
        border-top: 5px solid #3f51b5;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

document.head.appendChild(loadingStyles);

// Add loading overlay
const loadingOverlay = document.createElement('div');
loadingOverlay.className = 'loading-overlay';
loadingOverlay.innerHTML = '<div class="spinner"></div>';
document.body.prepend(loadingOverlay);

// Add dark mode toggle button to navbar
const nav = document.querySelector('nav > div');
if (nav) {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.id = 'dark-mode-toggle';
    darkModeToggle.className = 'p-2 rounded-full focus:outline-none';
    darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    
    // Add dark mode toggle to navbar on desktop
    const desktopNav = document.querySelector('.hidden.md\:flex');
    if (desktopNav) {
        desktopNav.appendChild(darkModeToggle);
    }
    
    // Add dark mode toggle to mobile menu
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        const darkModeMobile = darkModeToggle.cloneNode(true);
        darkModeMobile.className = 'p-2 text-left w-full text-gray-600 hover:text-teal-500';
        mobileMenu.appendChild(darkModeMobile);
        
        // Add click event for mobile dark mode toggle
        darkModeMobile.addEventListener('click', function() {
            document.dispatchEvent(new Event('click', { target: darkModeToggle }));
        });
    }
}
