/**
 * Ctrl+Sip Café — Luxury 3D Landing Experience
 * Three.js hero + scroll-driven animations
 */

(function () {
  'use strict';

  /* ── Preloader ── */
  const preloader = document.getElementById('preloader');
  const barFill = document.querySelector('.preloader-bar-fill');
  const percentEl = document.querySelector('.preloader-percent');
  let loadProgress = 0;

  function tickPreloader() {
    loadProgress = Math.min(loadProgress + Math.random() * 12 + 3, 100);
    if (barFill) barFill.style.width = loadProgress + '%';
    if (percentEl) percentEl.textContent = Math.floor(loadProgress) + '%';
    if (loadProgress < 100) {
      requestAnimationFrame(tickPreloader);
    }
  }
  tickPreloader();

  function hidePreloader() {
    setTimeout(() => {
      if (preloader) preloader.classList.add('hidden');
      animateHeroText();
    }, 800);
  }

  /* ── Custom cursor ── */
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (dot) { dot.style.left = mouseX + 'px'; dot.style.top = mouseY + 'px'; }
  });

  function animateCursor() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    if (ring) { ring.style.left = ringX + 'px'; ring.style.top = ringY + 'px'; }
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button, .product-card-3d, .exp-card, .category-pill').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  /* ── Smooth scroll (Lenis) ── */
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({ duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }

  /* ── GSAP ScrollTrigger ── */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.reveal-text').forEach(el => {
      gsap.to(el, {
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
        opacity: 1, y: 0, duration: 1.2, ease: 'power3.out'
      });
    });

    gsap.utils.toArray('.section-divider').forEach(el => {
      gsap.to(el, {
        scrollTrigger: { trigger: el, start: 'top 85%' },
        scaleX: 1, duration: 1, ease: 'power3.inOut'
      });
    });

    gsap.utils.toArray('.stat-num').forEach(el => {
      const target = parseInt(el.dataset.count, 10);
      const obj = { val: 0 };
      gsap.to(obj, {
        scrollTrigger: { trigger: el, start: 'top 85%' },
        val: target,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => { el.textContent = Math.round(obj.val); }
      });
    });

    /* Parallax craft bg */
    const craftBg = document.querySelector('.craft-bg');
    if (craftBg) {
      gsap.to(craftBg, {
        scrollTrigger: { trigger: '.craft', start: 'top bottom', end: 'bottom top', scrub: true },
        y: '-15%', ease: 'none'
      });
    }

    /* Heritage image 3D tilt on scroll */
    const heritageImg = document.querySelector('.heritage-img-wrap');
    if (heritageImg) {
      gsap.to(heritageImg, {
        scrollTrigger: { trigger: '.heritage', start: 'top bottom', end: 'center center', scrub: 1 },
        rotateY: -8, rotateX: 4, scale: 1, ease: 'none'
      });
    }

    /* Product cards stagger */
    gsap.from('.product-card-3d', {
      scrollTrigger: { trigger: '.collection-grid', start: 'top 80%' },
      opacity: 0, y: 80, stagger: 0.12, duration: 1, ease: 'power3.out'
    });

    /* Experience cards */
    gsap.from('.exp-card', {
      scrollTrigger: { trigger: '.experience-cards', start: 'top 80%' },
      opacity: 0, y: 60, stagger: 0.15, duration: 1, ease: 'power3.out'
    });
  }

  function animateHeroText() {
    if (typeof gsap === 'undefined') return;
    const tl = gsap.timeline();
    tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
      .to('.hero-title', { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, '-=0.6')
      .to('.hero-subtitle', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.6');
  }

  /* ── Nav hide on scroll ── */
  const nav = document.querySelector('.site-nav');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (nav) {
      if (y > lastScroll && y > 100) nav.classList.add('hidden-nav');
      else nav.classList.remove('hidden-nav');
    }
    lastScroll = y;

    const goldLine = document.querySelector('.gold-line');
    if (goldLine) {
      const progress = y / (document.body.scrollHeight - window.innerHeight);
      goldLine.style.height = (progress * window.innerHeight) + 'px';
    }
  });

  /* ── 3D card tilt on mouse ── */
  document.querySelectorAll('.exp-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(10px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  document.querySelectorAll('.product-card-3d').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const img = card.querySelector('img');
      if (img) img.style.transform = `scale(1.08) translate(${x * -8}px, ${y * -8}px)`;
    });
    card.addEventListener('mouseleave', () => {
      const img = card.querySelector('img');
      if (img) img.style.transform = '';
    });
  });

  /* ══════════════════════════════════════
     THREE.JS — Hero Scene
     ══════════════════════════════════════ */
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') {
    hidePreloader();
    return;
  }

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x050505, 0.035);

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 1.5, 6);

  /* Lights */
  const ambient = new THREE.AmbientLight(0x1a1410, 0.4);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0xc9a962, 2);
  keyLight.position.set(5, 8, 5);
  keyLight.castShadow = true;
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0xe8d5a3, 1.5);
  rimLight.position.set(-4, 3, -3);
  scene.add(rimLight);

  const fillLight = new THREE.PointLight(0xbc6c25, 0.8, 20);
  fillLight.position.set(0, -2, 4);
  scene.add(fillLight);

  /* Starfield */
  const starGeo = new THREE.BufferGeometry();
  const starCount = 2000;
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i++) starPos[i] = (Math.random() - 0.5) * 60;
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({ color: 0xc9a962, size: 0.03, transparent: true, opacity: 0.6 });
  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  /* Coffee cup group */
  const cupGroup = new THREE.Group();
  scene.add(cupGroup);

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xc9a962, metalness: 0.95, roughness: 0.15,
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x1a1410, metalness: 0.7, roughness: 0.3,
  });
  const creamMat = new THREE.MeshStandardMaterial({
    color: 0xf5f0e8, metalness: 0.1, roughness: 0.6,
  });
  const coffeeMat = new THREE.MeshStandardMaterial({
    color: 0x3e2723, metalness: 0.2, roughness: 0.4,
  });

  /* Cup body — lathe */
  const cupProfile = [];
  for (let i = 0; i <= 20; i++) {
    const t = i / 20;
    const y = t * 1.6 - 0.8;
    const r = 0.55 + Math.sin(t * Math.PI) * 0.15 - t * 0.1;
    cupProfile.push(new THREE.Vector2(r, y));
  }
  const cupGeo = new THREE.LatheGeometry(cupProfile, 64);
  const cupMesh = new THREE.Mesh(cupGeo, creamMat);
  cupMesh.castShadow = true;
  cupGroup.add(cupMesh);

  /* Coffee liquid surface */
  const liquidGeo = new THREE.CircleGeometry(0.48, 64);
  const liquid = new THREE.Mesh(liquidGeo, coffeeMat);
  liquid.rotation.x = -Math.PI / 2;
  liquid.position.y = 0.55;
  cupGroup.add(liquid);

  /* Latte art ring */
  const artGeo = new THREE.TorusGeometry(0.25, 0.015, 8, 64);
  const artMat = new THREE.MeshStandardMaterial({ color: 0xf5f0e8, metalness: 0.1, roughness: 0.5 });
  const artRing = new THREE.Mesh(artGeo, artMat);
  artRing.rotation.x = -Math.PI / 2;
  artRing.position.y = 0.56;
  cupGroup.add(artRing);

  /* Handle */
  const handleGeo = new THREE.TorusGeometry(0.22, 0.04, 12, 32, Math.PI);
  const handle = new THREE.Mesh(handleGeo, creamMat);
  handle.rotation.z = Math.PI / 2;
  handle.rotation.y = Math.PI / 2;
  handle.position.set(0.65, 0.1, 0);
  cupGroup.add(handle);

  /* Saucer */
  const saucerGeo = new THREE.CylinderGeometry(1.1, 1.0, 0.06, 64);
  const saucer = new THREE.Mesh(saucerGeo, darkMat);
  saucer.position.y = -0.85;
  saucer.receiveShadow = true;
  cupGroup.add(saucer);

  /* Gold rim on saucer */
  const rimGeo = new THREE.TorusGeometry(1.05, 0.015, 8, 64);
  const rim = new THREE.Mesh(rimGeo, goldMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = -0.82;
  cupGroup.add(rim);

  /* Orbiting luxury rings (Rolex bezel inspired) */
  const rings = [];
  for (let i = 0; i < 3; i++) {
    const r = 1.8 + i * 0.5;
    const ringGeo = new THREE.TorusGeometry(r, 0.008, 8, 128);
    const ringMesh = new THREE.Mesh(ringGeo, goldMat);
    ringMesh.rotation.x = Math.PI / 2 + (i * 0.15);
    ringMesh.rotation.y = i * 0.3;
    cupGroup.add(ringMesh);
    rings.push(ringMesh);
  }

  /* Steam particles */
  const steamCount = 120;
  const steamGeo = new THREE.BufferGeometry();
  const steamPositions = new Float32Array(steamCount * 3);
  const steamSpeeds = [];
  for (let i = 0; i < steamCount; i++) {
    steamPositions[i * 3] = (Math.random() - 0.5) * 0.3;
    steamPositions[i * 3 + 1] = 0.6 + Math.random() * 0.5;
    steamPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
    steamSpeeds.push(0.003 + Math.random() * 0.008);
  }
  steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));
  const steamMat = new THREE.PointsMaterial({
    color: 0xf5f0e8, size: 0.04, transparent: true, opacity: 0.25,
    blending: THREE.AdditiveBlending, depthWrite: false
  });
  const steam = new THREE.Points(steamGeo, steamMat);
  cupGroup.add(steam);

  /* Ground reflection plane */
  const groundGeo = new THREE.PlaneGeometry(20, 20);
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0x050505, metalness: 0.9, roughness: 0.2,
    transparent: true, opacity: 0.5
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.88;
  ground.receiveShadow = true;
  scene.add(ground);

  cupGroup.position.y = 0.2;

  /* Mouse interaction */
  let targetRotX = 0, targetRotY = 0;
  document.addEventListener('mousemove', (e) => {
    targetRotY = (e.clientX / window.innerWidth - 0.5) * 0.6;
    targetRotX = (e.clientY / window.innerHeight - 0.5) * 0.3;
  });

  /* Scroll-linked camera */
  let scrollProgress = 0;
  window.addEventListener('scroll', () => {
    scrollProgress = window.scrollY / window.innerHeight;
  });

  /* Animation loop */
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    /* Cup rotation */
    cupGroup.rotation.y += 0.003;
    cupGroup.rotation.y += (targetRotY - cupGroup.rotation.y) * 0.05;
    cupGroup.rotation.x += (targetRotX - cupGroup.rotation.x) * 0.05;

    /* Floating */
    cupGroup.position.y = 0.2 + Math.sin(t * 0.8) * 0.08;

    /* Orbiting rings */
    rings.forEach((r, i) => {
      r.rotation.z = t * (0.15 + i * 0.05) * (i % 2 === 0 ? 1 : -1);
    });

    /* Steam animation */
    const positions = steam.geometry.attributes.position.array;
    for (let i = 0; i < steamCount; i++) {
      positions[i * 3 + 1] += steamSpeeds[i];
      positions[i * 3] += Math.sin(t * 2 + i) * 0.001;
      if (positions[i * 3 + 1] > 2.5) {
        positions[i * 3 + 1] = 0.6;
        positions[i * 3] = (Math.random() - 0.5) * 0.3;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
      }
    }
    steam.geometry.attributes.position.needsUpdate = true;

    /* Stars slow rotation */
    stars.rotation.y = t * 0.01;

    /* Liquid shimmer */
    artRing.scale.setScalar(1 + Math.sin(t * 1.5) * 0.03);

    /* Scroll camera */
    camera.position.z = 6 + scrollProgress * 3;
    camera.position.y = 1.5 - scrollProgress * 1;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  /* Resize */
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  /* Start after brief delay for dramatic effect */
  setTimeout(() => {
    hidePreloader();
    animate();
  }, 1200);

  /* ══════════════════════════════════════
     THREE.JS — CTA Particle Scene
     ══════════════════════════════════════ */
  const ctaCanvas = document.getElementById('cta-canvas');
  if (ctaCanvas) {
    const ctaRenderer = new THREE.WebGLRenderer({ canvas: ctaCanvas, antialias: true, alpha: true });
    ctaRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const ctaScene = new THREE.Scene();
    const ctaCamera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    ctaCamera.position.z = 5;

    const ctaCount = 800;
    const ctaGeo = new THREE.BufferGeometry();
    const ctaPos = new Float32Array(ctaCount * 3);
    for (let i = 0; i < ctaCount * 3; i++) ctaPos[i] = (Math.random() - 0.5) * 15;
    ctaGeo.setAttribute('position', new THREE.BufferAttribute(ctaPos, 3));
    const ctaMat = new THREE.PointsMaterial({
      color: 0xc9a962, size: 0.025, transparent: true, opacity: 0.5,
      blending: THREE.AdditiveBlending
    });
    const ctaParticles = new THREE.Points(ctaGeo, ctaMat);
    ctaScene.add(ctaParticles);

    function resizeCta() {
      const section = ctaCanvas.parentElement;
      const w = section.clientWidth;
      const h = section.clientHeight;
      ctaRenderer.setSize(w, h);
      ctaCamera.aspect = w / h;
      ctaCamera.updateProjectionMatrix();
    }
    resizeCta();
    window.addEventListener('resize', resizeCta);

    const ctaClock = new THREE.Clock();
    function animateCta() {
      requestAnimationFrame(animateCta);
      const t = ctaClock.getElapsedTime();
      ctaParticles.rotation.y = t * 0.05;
      ctaParticles.rotation.x = Math.sin(t * 0.03) * 0.2;
      ctaRenderer.render(ctaScene, ctaCamera);
    }
    animateCta();
  }
})();
