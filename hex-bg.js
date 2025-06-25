// hex-bg.js
(() => {
  const container = document.getElementById('hex-bg');
  const rows = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--hex-rows'));
  const baseSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hex-base-size'));
  const w = window.innerWidth;
  const h = window.innerHeight;

  // build grid
  for (let row = 0; row < rows; row++) {
    // shrink each row by up to 50%
    const scale = 1 - (row / (rows - 1)) * 0.5;
    const size = baseSize * scale;
    const vertDist = size * Math.sqrt(3)/2;
    // how many hexes across + a couple extra to cover overflow
    const count = Math.ceil(w / (size * 0.75)) + 2;

    for (let col = 0; col < count; col++) {
      const hex = document.createElement('div');
      hex.className = 'hex';
      // position
      const x = col * size * 0.75 - size;
      const offset = row % 2 === 0 ? 0 : size * 0.375;
      const y = row * vertDist - size;
      // size+placement
      hex.style.width  = `${size}px`;
      hex.style.height = `${size}px`;
      hex.style.left   = `${x + offset}px`;
      hex.style.top    = `${y}px`;
      container.appendChild(hex);
    }
  }

  // parallax state
  let mouseX = 0, mouseY = 0, scrollY = 0;
  let tx = 0, ty = 0;

  window.addEventListener('mousemove', e => {
    mouseX = (e.clientX / w - 0.5) * 40;
    mouseY = (e.clientY / h - 0.5) * 40;
  });

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY * 0.25;
  });

  // animate container
  function loop() {
    tx += (mouseX - tx) * 0.08;
    ty += ((mouseY + scrollY) - ty) * 0.08;
    container.style.transform = `translate3d(${tx}px,${ty}px,0)`;
    requestAnimationFrame(loop);
  }
  loop();

  // rebuild on resize
  window.addEventListener('resize', () => location.reload());
})();
