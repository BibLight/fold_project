const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelector('[data-demo-form]')?.addEventListener('submit', (event) => {
  event.preventDefault();
  event.currentTarget.querySelector('.form-note')?.classList.add('visible');
});

document.querySelector('[data-year]').textContent = new Date().getFullYear();

const posterScene = document.querySelector('[data-poster-scene]');

if (posterScene) {
  posterScene.addEventListener('pointermove', (event) => {
    const bounds = posterScene.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    posterScene.style.setProperty('--pointer-x', `${x.toFixed(2)}%`);
    posterScene.style.setProperty('--pointer-y', `${y.toFixed(2)}%`);
  });

}

const introGallery = document.querySelector('[data-intro-gallery]');

if (introGallery) {
  const slides = [...introGallery.querySelectorAll('.intro-slide')];
  const dots = [...introGallery.querySelectorAll('[data-gallery-dot]')];
  const counter = introGallery.querySelector('[data-gallery-current]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeIndex = 0;
  let galleryTimer;

  const showSlide = (nextIndex) => {
    activeIndex = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, index) => {
      const isActive = index === activeIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
    });
    dots.forEach((dot, index) => dot.classList.toggle('is-active', index === activeIndex));
    counter.textContent = String(activeIndex + 1).padStart(2, '0');
  };

  const stopGallery = () => window.clearInterval(galleryTimer);
  const startGallery = () => {
    stopGallery();
    if (!reduceMotion) galleryTimer = window.setInterval(() => showSlide(activeIndex + 1), 5200);
  };

  introGallery.querySelector('[data-gallery-prev]').addEventListener('click', () => {
    showSlide(activeIndex - 1);
    startGallery();
  });
  introGallery.querySelector('[data-gallery-next]').addEventListener('click', () => {
    showSlide(activeIndex + 1);
    startGallery();
  });
  dots.forEach((dot, index) => dot.addEventListener('click', () => {
    showSlide(index);
    startGallery();
  }));
  introGallery.addEventListener('pointerenter', stopGallery);
  introGallery.addEventListener('pointerleave', startGallery);
  introGallery.addEventListener('focusin', stopGallery);
  introGallery.addEventListener('focusout', startGallery);

  showSlide(0);
  startGallery();
}

const siteBgm = document.querySelector('[data-site-bgm]');

if (siteBgm) {
  const unlockEvents = ['pointerdown', 'touchstart', 'keydown'];
  let waitingBetweenLoops = false;
  let restartTimer;

  const removeUnlockListeners = () => {
    unlockEvents.forEach((eventName) => document.removeEventListener(eventName, tryPlayBgm));
  };

  const tryPlayBgm = async () => {
    if (waitingBetweenLoops) return;
    try {
      await siteBgm.play();
      removeUnlockListeners();
    } catch {
      // Browsers may block audible autoplay until the first user interaction.
    }
  };

  siteBgm.addEventListener('ended', () => {
    waitingBetweenLoops = true;
    window.clearTimeout(restartTimer);
    restartTimer = window.setTimeout(() => {
      waitingBetweenLoops = false;
      siteBgm.currentTime = 0;
      tryPlayBgm();
    }, 4000);
  });

  unlockEvents.forEach((eventName) => document.addEventListener(eventName, tryPlayBgm));
  tryPlayBgm();
}
