document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.createElement('div');
  overlay.id = 'img-overlay';
  const img = document.createElement('img');
  overlay.appendChild(img);
  document.body.appendChild(overlay);

  overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
  });

  document.querySelectorAll('img').forEach(el => {
    el.setAttribute('draggable', 'false');
    el.addEventListener('click', () => {
      img.src = el.src;
      overlay.style.display = 'flex';
    });
  });

  document.addEventListener('contextmenu', e => {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });
});
