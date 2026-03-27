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

  function navigate(newIndex) {
    lightboxImg.style.opacity = 0;
    lightboxImg.addEventListener('transitionend', () => {
      currentIndex = newIndex;
      lightboxImg.src = images[currentIndex].src;
      caption.textContent = images[currentIndex].dataset.caption || '';
      lightboxImg.style.opacity = 1;
    }, { once: true });
  }

  function next() { navigate((currentIndex + 1) % images.length); }
  function prev() { navigate((currentIndex - 1 + images.length) % images.length); }

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
  const moonSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style="display:block;pointer-events:none"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  const sunSVG  = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 16 16" fill="currentColor" style="display:block;pointer-events:none"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/></svg>`;
  const updateIcon = () => {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    toggleBtn.innerHTML = dark ? sunSVG : moonSVG;
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
document.querySelectorAll('.project-card').forEach((card, i) => {
  card.style.animationDelay = (i * 80) + 'ms';
});

// --- Project Image Cycling ---
document.querySelectorAll('.project-img-wrap[data-images]').forEach(wrap => {
  const images = JSON.parse(wrap.dataset.images);
  if (images.length < 2) return;

  const img = wrap.querySelector('img');
  let current = 0;

  const prev = document.createElement('button');
  prev.className = 'img-nav img-prev';
  prev.innerHTML = '&#8249;';

  const next = document.createElement('button');
  next.className = 'img-nav img-next';
  next.innerHTML = '&#8250;';

  const dotsWrap = document.createElement('div');
  dotsWrap.className = 'img-dots';
  images.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'img-dot' + (i === 0 ? ' active' : '');
    dotsWrap.appendChild(dot);
  });

  wrap.appendChild(prev);
  wrap.appendChild(next);
  wrap.appendChild(dotsWrap);

  const dots = dotsWrap.querySelectorAll('.img-dot');

  const goTo = (n) => {
    current = (n + images.length) % images.length;
    img.src = images[current];
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  };

  prev.addEventListener('click', (e) => { e.stopPropagation(); goTo(current - 1); });
  next.addEventListener('click', (e) => { e.stopPropagation(); goTo(current + 1); });
});

// --- Article Inline Expand ---
let activeCard  = null;
let activeClose = null;

document.querySelectorAll('.project-card[data-article]').forEach(card => {
  const article     = card.querySelector('.card-article');
  const articleBody = card.querySelector('.card-article-body');
  const bottomBar   = card.querySelector('.article-bar-bottom');

  function closeArticle(skipScroll = false, onDone = null) {
    if (card.classList.contains('article-closing')) return;
    article.style.height = article.scrollHeight + 'px';
    article.offsetHeight; // force reflow
    card.classList.add('article-closing');
    article.style.height = '0px';
    article.style.opacity = '0';
    function onClose(e) {
      if (e.propertyName !== 'height') return;
      article.removeEventListener('transitionend', onClose);
      card.classList.remove('article-open', 'article-closing');
      article.style.height = '';
      article.style.opacity = '';
      if (activeCard === card) { activeCard = null; activeClose = null; }
      if (!skipScroll) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (onDone) onDone();
    }
    article.addEventListener('transitionend', onClose);
  }

  function openArticle() {
    const hadPrevious = activeCard && activeCard !== card;
    if (hadPrevious) {
      activeClose(true, () => {
        requestAnimationFrame(() => requestAnimationFrame(() => {
          card.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }));
      });
    }
    activeCard = card;
    activeClose = closeArticle;
    card.classList.add('article-open');
    article.style.height = article.scrollHeight + 'px';
    article.style.opacity = '1';
    function onOpen(e) {
      if (e.propertyName !== 'height') return;
      article.removeEventListener('transitionend', onOpen);
      article.style.height = 'auto';
    }
    article.addEventListener('transitionend', onOpen);
    if (!hadPrevious) {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }));
    }
  }

  card.addEventListener('click', (ev) => {
    if (!card.classList.contains('article-open')) {
      openArticle();
    } else if (!articleBody.contains(ev.target)) {
      if (activeCard === card) { activeCard = null; activeClose = null; }
      closeArticle();
    }
  });

  if (bottomBar) bottomBar.addEventListener('click', (ev) => {
    ev.stopPropagation();
    if (activeCard === card) { activeCard = null; activeClose = null; }
    closeArticle();
  });

  document.addEventListener('click', (ev) => {
    if (card.classList.contains('article-open') && !card.contains(ev.target)) {
      if (activeCard === card) { activeCard = null; activeClose = null; }
      closeArticle();
    }
  });
});

// --- Photography Events Dropdown ---
const photoCard = document.getElementById('photo-events-card');
const photoDrawer = document.getElementById('photo-drawer');
if (photoCard && photoDrawer) {
  photoCard.addEventListener('click', () => {
    photoCard.classList.toggle('open');
    photoDrawer.classList.toggle('open');
  });
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

