document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.site-nav');
  const menuToggle = document.getElementById('menu-toggle');

  const toggleMenu = () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
  };

  // Toggle menu on button click
  menuToggle.addEventListener('click', toggleMenu);

  // Close menu on Escape key when open
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      toggleMenu();
    }
  });

  // Close menu when a nav link is clicked
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a') && nav.classList.contains('open')) {
      toggleMenu();
    }
  });
});
