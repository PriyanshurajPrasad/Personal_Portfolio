document.addEventListener('DOMContentLoaded', function() {
    // Cursor Follower Effect
    const cursorFollower = document.getElementById('cursor-follower');
    
    if (cursorFollower) {
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let isHovering = false;
        let frameId = null;
        
        // Initialize cursor position
        cursorFollower.style.opacity = '0';
        
        // Update cursor position
        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            if (!isHovering) {
                cursorX = mouseX;
                cursorY = mouseY;
            }
            
            if (cursorFollower.style.opacity === '0') {
                cursorFollower.style.opacity = '0.1';
            }
            
            if (!frameId) {
                frameId = requestAnimationFrame(animate);
            }
        };
        
        // Smooth follow animation
        const animate = () => {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            
            cursorX += dx * 0.1;
            cursorY += dy * 0.1;
            
            cursorFollower.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`;
            
            if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
                frameId = requestAnimationFrame(animate);
            } else {
                frameId = null;
            }
        };
        
        // Hover effects
        const handleMouseEnter = (el) => {
            isHovering = true;
            cursorFollower.style.width = '60px';
            cursorFollower.style.height = '60px';
            cursorFollower.style.opacity = '0.2';
            cursorFollower.style.backgroundColor = '#2dd4bf';
            cursorFollower.style.borderRadius = '20%';
            
            // Add pulse effect on clickable elements
            if (el.matches('a, button, .social-icon')) {
                cursorFollower.style.transition = 'all 0.2s ease-out';
            }
        };
        
        const handleMouseLeave = () => {
            isHovering = false;
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
            cursorFollower.style.opacity = '0.1';
            cursorFollower.style.backgroundColor = '#2dd4bf';
            cursorFollower.style.borderRadius = '50%';
            cursorFollower.style.transition = 'all 0.3s ease-out';
        };
        
        // Add event listeners
        document.addEventListener('mousemove', handleMouseMove);
        
        const hoverElements = document.querySelectorAll('a, button, .social-icon, img, .card, .project-card, .tech-badge');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => handleMouseEnter(el));
            el.addEventListener('mouseleave', handleMouseLeave);
        });
        
        // Hide cursor when leaving the window
        document.addEventListener('mouseleave', () => {
            cursorFollower.style.opacity = '0';
        });
        
                document.addEventListener('mouseenter', () => {
            if (cursorFollower.style.opacity === '0') {
                cursorFollower.style.opacity = '0.1';
            }
        });

        // Apply styles from data-style attribute
        document.querySelectorAll('[data-style]').forEach(el => {
            el.setAttribute('style', el.getAttribute('data-style'));
        });
    }
    
    // Typewriter effect for hero subtitle
    const typewriter = document.querySelector('.typing-words');
    
    if (typewriter) {
        const words = typewriter.querySelectorAll('span');
        let currentWordIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        let waitTime = 1500;
        let deleteSpeed = 30;
        
        function type() {
            const currentWord = words[currentWordIndex];
            const text = currentWord.textContent;
            
            // Set all words to hidden
            words.forEach(word => {
                word.style.opacity = '0';
                word.style.width = '0';
            });
            
            // Show current word
            currentWord.style.opacity = '1';
            
            if (isDeleting) {
                // Delete character
                currentCharIndex--;
                typingSpeed = deleteSpeed;
            } else {
                // Type character
                currentCharIndex++;
                typingSpeed = 100 + Math.random() * 50; // Slight randomness for more natural feel
            }
            
            // Update display
            currentWord.style.width = `${currentCharIndex}ch`;
            
            // Check if word is complete
            if (!isDeleting && currentCharIndex === text.length) {
                // Pause at end of word
                typingSpeed = waitTime;
                isDeleting = true;
            } else if (isDeleting && currentCharIndex === 0) {
                // Move to next word
                isDeleting = false;
                currentWordIndex = (currentWordIndex + 1) % words.length;
                typingSpeed = 300; // Pause before typing next word
            }
            
            // Set timeout for next frame
            setTimeout(type, typingSpeed);
        }
        
        // Initialize
        words.forEach(word => {
            word.style.display = 'inline-block';
            word.style.verticalAlign = 'top';
            word.style.whiteSpace = 'nowrap';
            word.style.overflow = 'hidden';
            word.style.borderRight = '2px solid #2dd4bf';
            word.style.opacity = '0';
            word.style.transition = 'opacity 0.3s ease';
        });
        
        // Start the animation
        setTimeout(type, 1000); // Initial delay
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll reveal animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('[data-aos]');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out-cubic'
        });
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial check
    animateOnScroll();
});
