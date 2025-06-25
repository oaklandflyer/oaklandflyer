const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    } else {
      entry.target.classList.remove('active');
    }
  });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fade-up, .zoom-in').forEach(el => observer.observe(el));

  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero.parallax');

  const onScroll = () => {
    if (window.scrollY > 0) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    if (hero) {
      hero.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    }
  };

  onScroll();
  window.addEventListener('scroll', onScroll);
});
