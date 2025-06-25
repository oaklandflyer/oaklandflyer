document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');

  const toggleMenu = () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  };

  // Toggle menu on button click
  menuToggle.addEventListener('click', toggleMenu);

  // Close menu on Escape key when open
  menuToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      toggleMenu();
    }
  });

  // Close menu when any nav link is clicked (mobile)
  nav.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && nav.classList.contains('open')) {
      toggleMenu();
    }
  });
});
