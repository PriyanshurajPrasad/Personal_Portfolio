document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    // Only add event listeners if there are project cards
    if (projectCards.length > 0) {
        // Add mousemove event to each project card
        projectCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the element
                const y = e.clientY - rect.top;  // y position within the element
                
                // Calculate rotation based on mouse position
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateY = (x - centerX) / 20;
                const rotateX = (centerY - y) / 20;
                
                // Apply the rotation
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
                
                // Add depth effect to the image
                const img = card.querySelector('img');
                if (img) {
                    const imgX = (x - centerX) / 20;
                    const imgY = (y - centerY) / 20;
                    img.style.transform = `translateX(${imgX}px) translateY(${imgY}px) scale(1.1)`;
                }
            });
            
            // Reset transform when mouse leaves
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
                const img = card.querySelector('img');
                if (img) {
                    img.style.transform = 'translateX(0) translateY(0) scale(1.05)';
                }
            });
        });
    }
});
