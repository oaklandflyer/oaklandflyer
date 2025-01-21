// Select all elements with the "animate" class
const animatedElements = document.querySelectorAll('.animate');

function handleScroll() {
    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // Check if the element is within the viewport
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        } else {
            element.classList.remove('active'); // Optional: Reset animation when out of view
        }
    });
}

// Run the scroll event handler on page load and scroll
window.addEventListener('scroll', handleScroll);
handleScroll();
