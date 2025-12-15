document.addEventListener('DOMContentLoaded', () => {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(element => {
        const links = element.querySelectorAll('a');
        
        links.forEach(link => {
            // Add transform style for smooth movement
            link.style.transform = 'translate(0, 0)';
            link.style.willChange = 'transform';
            
            // Mouse enter event
            link.addEventListener('mousemove', (e) => {
                const rect = link.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Calculate movement (5px max in any direction)
                const moveX = (x - rect.width / 2) * 0.1;
                const moveY = (y - rect.height / 2) * 0.1;
                
                // Apply movement with smooth easing
                link.style.transform = `translate(${moveX}px, ${moveY}px)`;
                
                // Add subtle scale on hover
                link.style.transform += ' scale(1.1)';
            });
            
            // Mouse leave event - return to original position
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translate(0, 0) scale(1)';
            });
        });
    });
});
