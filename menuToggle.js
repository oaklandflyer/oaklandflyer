document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.hero-nav');
  const navList = document.querySelector('.nav-list');
  const menuIcon = document.getElementById('menu-icon');

  function toggleMenu() {
    navList.classList.toggle('active');
    menuIcon.innerHTML = navList.classList.contains('active') ? '✖' : '☰';
  }

  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  menuIcon.addEventListener('click', toggleMenu);
  window.addEventListener('scroll', handleScroll);
  handleScroll();
});
