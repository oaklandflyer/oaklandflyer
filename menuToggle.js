document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.hero-nav');
  const navList = document.querySelector('.nav-list');
  const menuIcon = document.getElementById('menu-icon');

  // ARIA attributes for accessibility
  menuIcon.setAttribute('aria-expanded', 'false');
  menuIcon.setAttribute('aria-controls', 'navbar');

  // Toggle menu open/close state
  function toggleMenu() {
    const isOpen = navList.classList.toggle('active');
    menuIcon.textContent = isOpen ? '✖' : '☰';
    menuIcon.setAttribute('aria-expanded', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
  }

  // Close menu when navigation link clicked
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navList.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navList.classList.contains('active')) {
      toggleMenu();
    }
  });

  // Handle header background on scroll
  function handleScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }

  // Event listeners
  menuIcon.addEventListener('click', toggleMenu);
  window.addEventListener('scroll', handleScroll);
  handleScroll();
});