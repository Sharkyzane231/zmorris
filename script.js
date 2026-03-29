// --- Lightbox (gallery page only) ---
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const images = Array.from(document.querySelectorAll('.gallery img'));
  const lightboxImg = document.getElementById('lightbox-img');
  const caption = document.getElementById('caption');
  const closeBtn = document.querySelector('.close-btn');
  let currentIndex = 0;

  function setCaption(el, img) {
    const title = img.dataset.title || '';
    const sub = img.dataset.caption || '';
    if (title) {
      el.innerHTML = `<span class="caption-title">${title}</span>${sub ? `<span class="caption-sub">${sub}</span>` : ''}`;
    } else {
      el.innerHTML = sub ? `<span class="caption-sub">${sub}</span>` : '';
    }
  }

  const leftZone  = document.querySelector('.left-zone');
  const rightZone = document.querySelector('.right-zone');
  const leftArrow  = document.querySelector('.nav.left');
  const rightArrow = document.querySelector('.nav.right');
  const arrowFixed = 30;

  leftZone.addEventListener('mouseenter', () => leftArrow.classList.add('nav-hover'));
  leftZone.addEventListener('mouseleave', () => leftArrow.classList.remove('nav-hover'));
  rightZone.addEventListener('mouseenter', () => rightArrow.classList.add('nav-hover'));
  rightZone.addEventListener('mouseleave', () => rightArrow.classList.remove('nav-hover'));

  function updateNavZones() {
    const rect = lightboxImg.getBoundingClientRect();
    const gap = rect.left;
    const preferred = window.innerWidth <= 700 ? 60 : 120;
    const width = Math.min(preferred, gap);
    leftZone.style.width  = width + 'px';
    rightZone.style.width = width + 'px';
    const arrowW = leftArrow.offsetWidth;
    const centered = gap / 2 - arrowW / 2;
    const arrowPos = Math.min(arrowFixed, centered) + 'px';
    leftArrow.style.setProperty('--arrow-pos', arrowPos);
    rightArrow.style.setProperty('--arrow-pos', arrowPos);
    caption.style.width = (rect.width * 0.85) + 'px';
  }

  lightboxImg.addEventListener('load', updateNavZones);
  window.addEventListener('resize', updateNavZones);

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[currentIndex].src;
    setCaption(caption, images[currentIndex]);
    lightbox.style.display = 'block';
    document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(updateNavZones);
  }

  function closeLightbox() {
    lightbox.style.display = 'none';
    document.documentElement.style.overflow = '';
    navigating = false;
  }

  let navigating = false;
  function navigate(newIndex) {
    if (navigating) return;
    navigating = true;
    lightboxImg.style.opacity = 0;
    setTimeout(() => {
      currentIndex = newIndex;
      lightboxImg.src = images[currentIndex].src;
      setCaption(caption, images[currentIndex]);
      const done = () => {
        lightboxImg.style.opacity = 1;
        requestAnimationFrame(updateNavZones);
        navigating = false;
      };
      if (lightboxImg.complete) done();
      else lightboxImg.addEventListener('load', done, { once: true });
    }, 80);
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
    if (lightbox.style.display !== 'block') return;
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'Escape') closeLightbox();
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      if (img.complete) {
        img.classList.add('loaded');
      } else {
        img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
      }
      observer.unobserve(img);
    });
  }, { rootMargin: '0px 0px 200px 0px' });

  images.forEach(img => observer.observe(img));
}

// --- Theme Toggle ---
const toggleBtn = document.getElementById('theme-toggle');
if (toggleBtn) {
  const moonSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style="display:block;pointer-events:none"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  const sunSVG  = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 16 16" fill="currentColor" style="display:block;pointer-events:none"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/></svg>`;
  const mobileToggleBtn = document.getElementById('mobile-theme-toggle');
  const updateIcon = () => {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    const icon = dark ? sunSVG : moonSVG;
    toggleBtn.innerHTML = icon;
    if (mobileToggleBtn) mobileToggleBtn.innerHTML = icon;
  };
  const handleToggle = () => {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (dark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
    updateIcon();
  };
  updateIcon();
  toggleBtn.addEventListener('click', handleToggle);
  if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', handleToggle);
}


// --- Project Cards Fade-up ---
document.querySelectorAll('.project-card').forEach((card, i) => {
  card.style.animationDelay = (i * 80) + 'ms';
});

// --- Slide Element Helper (slides any container) ---
function slideElement(el, dir, updateFn) {
  const wrap = el.parentElement;
  const outgoing = el.cloneNode(true);
  outgoing.querySelectorAll('[id]').forEach(e => e.removeAttribute('id'));
  outgoing.style.position = 'absolute';
  outgoing.style.top = '0';
  outgoing.style.left = '0';
  outgoing.style.width = '100%';
  outgoing.style.pointerEvents = 'none';
  wrap.appendChild(outgoing);
  updateFn(el);
  el.style.transition = 'none';
  el.style.transform = `translateX(${dir > 0 ? '100%' : '-100%'})`;
  requestAnimationFrame(() => requestAnimationFrame(() => {
    el.style.transition = 'transform 0.28s ease';
    el.style.transform = 'translateX(0)';
    outgoing.style.transition = 'transform 0.28s ease';
    outgoing.style.transform = `translateX(${dir > 0 ? '-100%' : '100%'})`;
  }));
  el.addEventListener('transitionend', () => {
    el.style.transition = '';
    el.style.transform = '';
    outgoing.remove();
  }, { once: true });
}

// --- Slide Image Helper ---
function slideImage(img, newSrc, dir) {
  const wrap = img.parentElement;
  const outgoing = document.createElement('img');
  outgoing.src = img.src;
  outgoing.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;';
  wrap.appendChild(outgoing);
  img.src = newSrc;
  img.style.transition = 'none';
  img.style.transform = `translateX(${dir > 0 ? '100%' : '-100%'})`;
  requestAnimationFrame(() => requestAnimationFrame(() => {
    img.style.transition = 'transform 0.28s ease';
    img.style.transform = 'translateX(0)';
    outgoing.style.transition = 'transform 0.28s ease';
    outgoing.style.transform = `translateX(${dir > 0 ? '-100%' : '100%'})`;
  }));
  img.addEventListener('transitionend', () => {
    img.style.transition = '';
    img.style.transform = '';
    outgoing.remove();
  }, { once: true });
}

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

  const goTo = (n, dir) => {
    current = (n + images.length) % images.length;
    slideImage(img, images[current], dir);
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  };

  prev.addEventListener('click', (e) => { e.stopPropagation(); goTo(current - 1, -1); });
  next.addEventListener('click', (e) => { e.stopPropagation(); goTo(current + 1, 1); });
});

// --- Photo Events Image Cycling ---
const photoImgWrap = document.querySelector('.project-img-wrap[data-photos]');
if (photoImgWrap) {
  const photos = JSON.parse(photoImgWrap.dataset.photos);
  const img = photoImgWrap.querySelector('img');
  const bar = photoImgWrap.closest('.project-card').querySelector('.photo-img-bar');
  const barCaption = bar.querySelector('span');
  const barLink = bar.querySelector('.photo-img-bar-link');
  let current = 0;

  if (photos.length > 1) {
    const prev = document.createElement('button');
    prev.className = 'img-nav img-prev';
    prev.innerHTML = '&#8249;';
    const next = document.createElement('button');
    next.className = 'img-nav img-next';
    next.innerHTML = '&#8250;';

    const dotsWrap = document.createElement('div');
    dotsWrap.className = 'img-dots';
    photos.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'img-dot' + (i === 0 ? ' active' : '');
      dotsWrap.appendChild(dot);
    });

    photoImgWrap.appendChild(prev);
    photoImgWrap.appendChild(next);
    photoImgWrap.appendChild(dotsWrap);

    const dots = dotsWrap.querySelectorAll('.img-dot');

    const goTo = (n, dir) => {
      current = (n + photos.length) % photos.length;
      slideImage(img, photos[current].src, dir);
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
      updateBar(current);
    };

    prev.addEventListener('click', (e) => { e.stopPropagation(); goTo(current - 1, -1); });
    next.addEventListener('click', (e) => { e.stopPropagation(); goTo(current + 1, 1); });
  }

  function updateBar(index) {
    const photo = photos[index];
    barCaption.textContent = photo.caption || '';
    if (photo.link) {
      barLink.dataset.href = photo.link;
      barLink.style.visibility = '';
    } else {
      barLink.style.visibility = 'hidden';
    }
  }

  updateBar(0);
}

// --- Article Overlay ---
const articleOverlay = document.getElementById('article-overlay');
if (articleOverlay) {
  const overlayImg = document.getElementById('article-overlay-img');
  const overlaySlider = document.getElementById('article-overlay-img-slider');
  const overlayBody = document.getElementById('article-overlay-body');
  const overlayScroll = articleOverlay.querySelector('.article-overlay-scroll');
  const overlayPrev = document.getElementById('article-img-prev');
  const overlayNext = document.getElementById('article-img-next');
  const overlayDots = document.getElementById('article-img-dots');
  const overlayPhotoBar = document.getElementById('article-photo-bar');
  let overlayImages = [];
  let overlayPhotos = null;
  let overlayImgIndex = 0;
  function goToOverlayImage(n, dir) {
    overlayImgIndex = (n + overlayImages.length) % overlayImages.length;
    const newSrc = overlayImages[overlayImgIndex];
    const newPhoto = overlayPhotos ? overlayPhotos[overlayImgIndex] : null;
    slideElement(overlaySlider, dir, (el) => {
      el.querySelector('.article-overlay-img').src = newSrc;
      if (newPhoto) {
        el.querySelector('#article-photo-caption').textContent = newPhoto.caption || '';
        const link = el.querySelector('#article-photo-link');
        if (newPhoto.link) { link.href = newPhoto.link; link.style.visibility = ''; }
        else { link.style.visibility = 'hidden'; }
      }
    });
    overlayDots.querySelectorAll('.article-img-dot').forEach((d, i) => d.classList.toggle('active', i === overlayImgIndex));
  }

  overlayPrev.addEventListener('click', () => goToOverlayImage(overlayImgIndex - 1, -1));
  overlayNext.addEventListener('click', () => goToOverlayImage(overlayImgIndex + 1, 1));

  function openArticleOverlay(card) {
    const imgWrap = card.querySelector('.project-img-wrap');
    const img = imgWrap.querySelector('img');
    if (imgWrap.dataset.images) {
      overlayImages = JSON.parse(imgWrap.dataset.images);
      overlayPhotos = null;
      overlayPhotoBar.style.display = 'none';
    } else if (imgWrap.dataset.photos) {
      overlayPhotos = JSON.parse(imgWrap.dataset.photos);
      overlayImages = overlayPhotos.map(p => p.src);
      overlayPhotoBar.style.display = '';
      const firstPhoto = overlayPhotos[0];
      overlayPhotoBar.querySelector('#article-photo-caption').textContent = firstPhoto.caption || '';
      const firstLink = overlayPhotoBar.querySelector('#article-photo-link');
      if (firstPhoto.link) { firstLink.href = firstPhoto.link; firstLink.style.visibility = ''; }
      else { firstLink.style.visibility = 'hidden'; }
    } else {
      overlayImages = [img.src];
      overlayPhotos = null;
      overlayPhotoBar.style.display = 'none';
    }
    overlayImgIndex = 0;
    overlayImg.src = overlayImages[0];
    const hasMultiple = overlayImages.length > 1;
    overlayPrev.style.display = hasMultiple ? '' : 'none';
    overlayNext.style.display = hasMultiple ? '' : 'none';
    overlayDots.innerHTML = hasMultiple
      ? overlayImages.map((_, i) => `<span class="article-img-dot${i === 0 ? ' active' : ''}"></span>`).join('')
      : '';

    const h3 = card.querySelector('.project-body h3');
    const title = Array.from(h3.childNodes).filter(n => n.nodeType === Node.TEXT_NODE).map(n => n.textContent).join('').trim();
    const desc = card.querySelector('.project-body p');
    const articleContent = card.querySelector('.card-article-body');
    const tags = card.querySelector('.project-tags');

    const isFeatured = card.classList.contains('featured');
    const starHtml = isFeatured ? ' <span class="featured-star">★</span>' : '';
    let html = '<h1 class="article-overlay-title">' + title + starHtml + '</h1>';
    if (desc) html += '<p class="article-overlay-desc">' + desc.textContent + '</p>';
    if (tags) html += tags.outerHTML;
    if (articleContent) html += articleContent.innerHTML;
    overlayBody.innerHTML = html;

    overlayScroll.scrollTop = 0;
    lockScroll();
    articleOverlay.style.display = 'block';
    articleOverlay.offsetHeight; // force reflow
    articleOverlay.classList.add('visible');
    overlayScroll.focus({ preventScroll: true });
  }

  function lockScroll() {
    const scrollY = window.scrollY;
    document.documentElement.dataset.scrollY = scrollY;
    document.body.style.cssText += ';position:fixed;top:-' + scrollY + 'px;left:0;right:0;overflow-y:scroll';
  }

  function unlockScroll() {
    const scrollY = parseInt(document.documentElement.dataset.scrollY || '0');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.overflowY = '';
    window.scrollTo(0, scrollY);
  }

  function closeArticleOverlay() {
    unlockScroll();
    articleOverlay.classList.remove('visible');
    articleOverlay.addEventListener('transitionend', () => {
      articleOverlay.style.display = 'none';
    }, { once: true });
  }

  document.querySelectorAll('.project-card[data-article]').forEach(card => {
    card.addEventListener('click', () => openArticleOverlay(card));
  });

  document.getElementById('article-close-footer').addEventListener('click', (e) => {
    e.stopPropagation();
    closeArticleOverlay();
  });

  articleOverlay.addEventListener('click', (e) => {
    if (!e.target.closest('.article-overlay-panel')) closeArticleOverlay();
  });

  document.addEventListener('keydown', (e) => {
    if (!articleOverlay.classList.contains('visible')) return;
    if (e.key === 'Escape') closeArticleOverlay();
    if (e.key === 'ArrowLeft') goToOverlayImage(overlayImgIndex - 1, -1);
    if (e.key === 'ArrowRight') goToOverlayImage(overlayImgIndex + 1, 1);
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

// --- Hamburger Menu ---
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburger && mobileMenu) {
  const openMenu = () => {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    document.documentElement.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.documentElement.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    hamburger.classList.contains('open') ? closeMenu() : openMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 460 && hamburger.classList.contains('open')) closeMenu();
  });
}

