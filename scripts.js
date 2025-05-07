document.addEventListener("DOMContentLoaded", function () {
    // Fade-in functionality for text and divs
    const fadeInElements = document.querySelectorAll(".fade-in-text, .fade-in-div");

    // Intersection Observer for fade-in elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    });

    fadeInElements.forEach((el) => observer.observe(el));

    // Carousel functionality
    const carouselImages = document.querySelector('.carousel-images');
    const images = document.querySelectorAll('.carousel-images img');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    let currentIndex = 0;

    function updateCarousel() {
        const width = images[0].clientWidth;
        carouselImages.style.transition = 'transform 0.5s ease-in-out'; // Smooth transition
        carouselImages.style.transform = `translateX(${-currentIndex * width}px)`;
    }

    function resetTransition() {
        carouselImages.style.transition = 'none'; // Disable transition temporarily
    }

    // Handle "Next" button click
    nextButton.addEventListener('click', () => {
        if (currentIndex < images.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Reset to the first image
            resetTransition();
        }
        updateCarousel();
    });

    // Handle "Previous" button click
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = images.length - 1; // Go to the last image
            resetTransition();
        }
        updateCarousel();
    });

    // Automatically slide every 5 seconds
    let autoSlide = setInterval(() => {
        nextButton.click();
    }, 5000);

    // Pause auto-slide on hover
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
    carousel.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            nextButton.click();
        }, 5000);
    });

    // Update carousel on window resize
    window.addEventListener('resize', updateCarousel);
    updateCarousel(); // Initial call to set the correct position
});