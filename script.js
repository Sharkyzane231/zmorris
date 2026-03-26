// --- Lightbox (gallery page only) ---
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const images = Array.from(document.querySelectorAll('.gallery img'));
  const lightboxImg = document.getElementById('lightbox-img');
  const caption = document.getElementById('caption');
  const closeBtn = document.querySelector('.close-btn');
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[currentIndex].src;
    caption.textContent = images[currentIndex].dataset.caption || '';
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  }

  function next() {
    lightboxImg.style.opacity = 0;
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % images.length;
      lightboxImg.src = images[currentIndex].src;
      caption.textContent = images[currentIndex].dataset.caption || '';
      lightboxImg.style.opacity = 1;
    }, 200);
  }

  function prev() {
    lightboxImg.style.opacity = 0;
    setTimeout(() => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      lightboxImg.src = images[currentIndex].src;
      caption.textContent = images[currentIndex].dataset.caption || '';
      lightboxImg.style.opacity = 1;
    }, 200);
  }

  images.forEach((img, i) => img.addEventListener('click', () => openLightbox(i)));
  closeBtn.addEventListener('click', closeLightbox);
  document.querySelector('.nav.left').addEventListener('click', prev);
  document.querySelector('.nav.right').addEventListener('click', next);
  document.querySelector('.left-zone').addEventListener('click', prev);
  document.querySelector('.right-zone').addEventListener('click', next);

  lightbox.addEventListener('click', (e) => {
    if (
      e.target.classList.contains('nav-zone') ||
      e.target.classList.contains('nav') ||
      e.target === closeBtn ||
      e.target === lightboxImg ||
      e.target === caption
    ) return;
    closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (lightbox.style.display !== 'flex') return;
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'Escape') closeLightbox();
  });

  images.forEach((img) => {
    const reveal = () => img.classList.add('loaded');
    if (img.complete) reveal();
    else img.addEventListener('load', reveal);
  });
}

// --- Theme Toggle ---
const toggleBtn = document.getElementById('theme-toggle');
if (toggleBtn) {
  const updateIcon = () => {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    toggleBtn.textContent = dark ? '☀' : '☾';
  };
  updateIcon();
  toggleBtn.addEventListener('click', () => {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (dark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
    updateIcon();
  });
}


// --- Project Cards Fade-up ---
const cards = document.querySelectorAll('.project-card');
if (cards.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  cards.forEach(card => observer.observe(card));
}

// --- Topbar hide on scroll ---
let lastScroll = 0;
const topbar = document.querySelector('.topbar');
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > lastScroll && current > 80) {
    topbar.classList.add('hidden');
  } else {
    topbar.classList.remove('hidden');
  }
  lastScroll = current;
});

