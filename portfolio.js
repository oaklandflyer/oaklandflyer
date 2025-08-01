document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const modeToggle = document.getElementById('modeToggle');
  const body = document.body;

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
  }

  modeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
  });

  document.querySelectorAll('.gallery-item').forEach((el, i) => {
    el.style.animationDelay = `${i * 100}ms`;
    el.classList.add('fade-in');
  });
});
