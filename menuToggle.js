document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('navbar');
  const button = document.getElementById('menu-toggle');

  function toggleMenu() {
    const open = nav.classList.toggle('open');
    button.setAttribute('aria-expanded', open);
  }

  button.addEventListener('click', toggleMenu);

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('open')) toggleMenu();
    });
  });
});
