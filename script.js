const images = Array.from(document.querySelectorAll('.gallery img'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const caption = document.getElementById('caption');
const closeBtn = document.querySelector('.close-btn');
let currentIndex = 0;

// --- Lightbox open/close ---
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

// --- Navigation ---
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


// --- Background click to close ---
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

// --- Keyboard ---
document.addEventListener('keydown', (e) => {
  if (lightbox.style.display !== 'flex') return;
  if (e.key === 'ArrowRight') next();
  if (e.key === 'ArrowLeft') prev();
  if (e.key === 'Escape') closeLightbox();
});

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

// --- Gallery fade in on load ---
images.forEach((img) => {
  const reveal = () => {
    img.classList.add('loaded');
  };
  if (img.complete) {
    reveal();
  } else {
    img.addEventListener('load', reveal);
  }
});