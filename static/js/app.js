/**
 * Ctrl+Sip Café — Global luxury interactions
 */
(function () {
  'use strict';

  /* Custom cursor */
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (dot && ring && window.matchMedia('(pointer: fine)').matches) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
    });
    (function animCursor() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(animCursor);
    })();
    document.querySelectorAll('a, button, .lux-btn, .lux-card, .lux-product-card, input, select, textarea, .exp-card, .category-pill').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  /* Nav hide on scroll */
  const nav = document.querySelector('.site-nav');
  if (nav && !document.body.classList.contains('page-landing')) {
    let lastY = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > lastY && y > 120) nav.classList.add('hidden-nav');
      else nav.classList.remove('hidden-nav');
      lastY = y;
    });
  }

  /* Subtle particle background for app pages */
  const bgCanvas = document.getElementById('lux-bg-canvas');
  if (bgCanvas && typeof THREE !== 'undefined') {
    const renderer = new THREE.WebGLRenderer({ canvas: bgCanvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 5;
    const count = 400;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 20;
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ color: 0xc9a962, size: 0.02, transparent: true, opacity: 0.35 });
    const particles = new THREE.Points(geo, mat);
    scene.add(particles);
    function resize() {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize);
    const clock = new THREE.Clock();
    (function anim() {
      requestAnimationFrame(anim);
      particles.rotation.y = clock.getElapsedTime() * 0.015;
      renderer.render(scene, camera);
    })();
  }

  /* GSAP page reveals */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.lux-reveal').forEach(el => {
      gsap.to(el, {
        scrollTrigger: { trigger: el, start: 'top 88%' },
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out'
      });
    });
    gsap.utils.toArray('.lux-product-card, .lux-card').forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 92%' },
        opacity: 0, y: 40, duration: 0.7, delay: (i % 4) * 0.08, ease: 'power2.out'
      });
    });
  }

  /* 3D card tilt */
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
})();
