document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper
    const swiper = new Swiper('.projects-swiper', {
        // Optional parameters
        loop: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        spaceBetween: 30,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 800,
        effect: 'coverflow',
        grabCursor: true,
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: true,
        },
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // Pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            // when window width is >= 768px
            768: {
                slidesPerView: 2,
            },
            // when window width is >= 1024px
            1024: {
                slidesPerView: 3,
            },
        },
        on: {
            init: function() {
                // Add active class to first slide
                this.slides[this.activeIndex].classList.add('swiper-slide-visible');
            },
            slideChange: function() {
                // Update active slide class
                this.slides.forEach(slide => {
                    slide.classList.remove('swiper-slide-visible');
                });
                this.slides[this.activeIndex].classList.add('swiper-slide-visible');
                
                // Pause autoplay when user interacts with the slider
                if (this.autoplay.running === false) {
                    this.autoplay.start();
                }
            }
        }
    });

    // Pause autoplay when hovering over the slider
    const projectsSwiper = document.querySelector('.projects-swiper');
    if (projectsSwiper) {
        projectsSwiper.addEventListener('mouseenter', function() {
            swiper.autoplay.stop();
        });
        
        projectsSwiper.addEventListener('mouseleave', function() {
            swiper.autoplay.start();
        });
    }
});
