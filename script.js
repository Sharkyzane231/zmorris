const images = Array.from(document.querySelectorAll('.gallery img'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const caption = document.getElementById('caption');
const closeBtn = document.querySelector('.close-btn');

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = images[currentIndex].src;
  caption.textContent = images[currentIndex].dataset.caption || '';
  lightbox.style.display = 'flex';
}

function closeLightbox() {
  lightbox.style.display = 'none';
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

images.forEach((img) => {
  const reveal = () => {
    img.style.opacity = 1;
    img.style.transform = 'translateY(0)';
  };
  if (img.complete) {
    reveal();
  } else {
    img.addEventListener('load', reveal);
  }
});

const reveal = () => {
  img.classList.add('loaded');
};