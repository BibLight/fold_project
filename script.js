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
  const updatePosterFade = () => {
    const hero = posterScene.closest('.poster-hero');
    const fadeDistance = Math.max(hero.offsetHeight - window.innerHeight, 1);
    const progress = Math.min(Math.max(window.scrollY / fadeDistance, 0), 1);
    posterScene.style.setProperty('--hero-fade', progress.toFixed(3));
  };

  posterScene.addEventListener('pointermove', (event) => {
    const bounds = posterScene.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    posterScene.style.setProperty('--pointer-x', `${x.toFixed(2)}%`);
    posterScene.style.setProperty('--pointer-y', `${y.toFixed(2)}%`);
  });

  updatePosterFade();
  window.addEventListener('scroll', updatePosterFade, { passive: true });
  window.addEventListener('resize', updatePosterFade);
}
