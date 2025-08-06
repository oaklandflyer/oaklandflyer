document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('navbar');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', (!expanded).toString());
      nav.classList.toggle('open');
    });
  }

  // Lazy load images with data-src
  const lazyImages = document.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '100px 0px', threshold: 0.1 });
    lazyImages.forEach(img => imgObserver.observe(img));
  } else {
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }

  // Fade-in sections
  const fadeSections = document.querySelectorAll('.fade-section');
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    fadeSections.forEach(sec => sectionObserver.observe(sec));
  } else {
    fadeSections.forEach(sec => sec.classList.add('visible'));
  }

  // Broken link feedback
  document.querySelectorAll('a[href]').forEach(link => {
    if (link.origin === location.origin) {
      link.addEventListener('click', e => {
        fetch(link.href, { method: 'HEAD' }).then(res => {
          if (!res.ok) {
            e.preventDefault();
            alert('Link not found.');
          }
        }).catch(() => {
          e.preventDefault();
          alert('Link not found.');
        });
      });
    }
  });

  // Filtering stub
  document.querySelectorAll('.filter-controls button').forEach(btn => {
    btn.addEventListener('click', () => {
      // TODO: implement filtering logic
      console.log('Filter properties by', btn.dataset.filter);
    });
  });
});
