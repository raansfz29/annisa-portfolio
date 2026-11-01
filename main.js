/**
 * Annisa Fazhira Portfolio
 * Interactive Functionality: Slide Viewer, Lightbox, Nav ScrollSpy & Animations
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. Mobile Menu Toggle
  // =========================================================================
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // =========================================================================
  // 2. Navbar Scroll Style & Active Link Highlight (ScrollSpy)
  // =========================================================================
  const siteNav = document.getElementById('topNav');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Nav shadow on scroll
    if (window.scrollY > 40) {
      siteNav.classList.add('scrolled');
    } else {
      siteNav.classList.remove('scrolled');
    }

    // ScrollSpy active link
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (navLinks) {
      navLinks.querySelectorAll('a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === `#${currentId}`) {
          a.classList.add('active');
        }
      });
    }
  });

  // =========================================================================
  // 3. Document Lightbox Modal
  // =========================================================================
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');

  function openLightbox(src, caption) {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = caption || '';
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.lightbox-trigger').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const src = el.getAttribute('data-img') || el.getAttribute('src');
      const caption = el.getAttribute('data-caption') || el.getAttribute('alt') || '';
      if (src) openLightbox(src, caption);
    });
  });

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // =========================================================================
  // 4. Interactive 17-Slide Presentation Deck Viewer
  // =========================================================================
  const deckModal = document.getElementById('deckModal');
  const deckMainSlide = document.getElementById('deckMainSlide');
  const slideCounter = document.getElementById('slideCounter');
  const slidePrevBtn = document.getElementById('slidePrevBtn');
  const slideNextBtn = document.getElementById('slideNextBtn');
  const deckCloseBtn = document.getElementById('deckCloseBtn');
  const thumbsStrip = document.getElementById('thumbsStrip');

  const totalSlides = 17;
  let currentSlide = 1;

  // Build thumbnails
  if (thumbsStrip) {
    for (let i = 1; i <= totalSlides; i++) {
      const thumb = document.createElement('div');
      thumb.className = `thumb-item ${i === 1 ? 'active' : ''}`;
      thumb.dataset.slide = i;
      thumb.innerHTML = `<img src="images/deck/slide-${i}.png" alt="Slide ${i}">`;
      thumb.addEventListener('click', () => {
        goToSlide(i);
      });
      thumbsStrip.appendChild(thumb);
    }
  }

  function goToSlide(index) {
    if (index < 1) index = totalSlides;
    if (index > totalSlides) index = 1;
    currentSlide = index;

    if (deckMainSlide) {
      deckMainSlide.src = `images/deck/slide-${currentSlide}.png`;
    }
    if (slideCounter) {
      slideCounter.textContent = `${currentSlide} / ${totalSlides}`;
    }

    // Update active thumb
    if (thumbsStrip) {
      thumbsStrip.querySelectorAll('.thumb-item').forEach((t, idx) => {
        if (idx + 1 === currentSlide) {
          t.classList.add('active');
          t.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        } else {
          t.classList.remove('active');
        }
      });
    }
  }

  function openDeck(initialSlide = 1) {
    if (!deckModal) return;
    goToSlide(initialSlide);
    deckModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDeck() {
    if (!deckModal) return;
    deckModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Triggers for opening the deck
  const openDeckBtn = document.getElementById('openDeckBtn');
  const heroOpenDeckBtn = document.getElementById('heroOpenDeckBtn');
  const stripOpenDeckBtn = document.getElementById('stripOpenDeckBtn');

  if (openDeckBtn) openDeckBtn.addEventListener('click', () => openDeck(1));
  if (heroOpenDeckBtn) heroOpenDeckBtn.addEventListener('click', () => openDeck(1));
  if (stripOpenDeckBtn) stripOpenDeckBtn.addEventListener('click', () => openDeck(1));

  if (slidePrevBtn) {
    slidePrevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  }
  if (slideNextBtn) {
    slideNextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
  }
  if (deckCloseBtn) {
    deckCloseBtn.addEventListener('click', closeDeck);
  }
  if (deckModal) {
    deckModal.addEventListener('click', (e) => {
      if (e.target === deckModal) closeDeck();
    });
  }

  // Keyboard navigation for modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeDeck();
    }
    if (deckModal && deckModal.classList.contains('active')) {
      if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
      if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
    }
  });

  // =========================================================================
  // 5. Scroll Reveal Fade-in Animations
  // =========================================================================
  const revealElements = document.querySelectorAll(
    '.card, .stat-card, .strength-card, .skill-col-card, .step-card, .other-proj-card, .award-card, .cert-mini-card'
  );

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    observer.observe(el);
  });

});
