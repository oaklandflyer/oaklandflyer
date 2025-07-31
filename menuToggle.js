document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.site-nav');
  const menuToggle = document.getElementById('menu-toggle');

  function toggleMenu() {
    const open = nav.classList.toggle('open');
    document.body.classList.toggle('nav-open', open);
    menuToggle.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', open);
  }

  menuToggle.addEventListener('click', toggleMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      toggleMenu();
    }
  });

  nav.addEventListener('click', (e) => {
    if (e.target.closest('a') && nav.classList.contains('open')) {
      toggleMenu();
    }
  });
});
