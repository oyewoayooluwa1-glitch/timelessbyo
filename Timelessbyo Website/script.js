// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
const header = document.querySelector('.site-header');
const isHeroPage = header && !header.classList.contains('page-header');
function onScroll() {
  if (!header) return;
  if (isHeroPage) {
    if (window.scrollY > 80) header.classList.add('solid');
    else header.classList.remove('solid');
  }
}
window.addEventListener('scroll', onScroll);
onScroll();

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    toggle.classList.remove('open');
  }));
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}


// Hero photography rotation — cycles through a curated set without immediate repeats.
// The first image is shown immediately; each following image is preloaded shortly before use.
const heroBg = document.querySelector('.hero-bg');
const heroRotation = document.querySelector('.hero-rotation');
if (heroBg && heroRotation) {
  const images = (heroRotation.dataset.images || '').split('|').map(s => s.trim()).filter(Boolean);
  if (images.length > 1) {
    let order = images.slice();
    let index = 0;
    heroBg.style.transition = 'opacity 900ms ease-in-out, background-image 0ms linear';
    heroBg.style.backgroundImage = `url("${order[0]}")`;

    const shuffle = (arr) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };

    const rotateHero = () => {
      index += 1;
      if (index >= order.length) {
        order = shuffle(images.slice());
        index = 0;
      }
      const next = order[index];
      const preload = new Image();
      preload.onload = () => {
        heroBg.style.opacity = '0';
        window.setTimeout(() => {
          heroBg.style.backgroundImage = `url("${next}")`;
          heroBg.style.opacity = '1';
        }, 450);
      };
      preload.src = next;
    };

    window.setInterval(rotateHero, 6500);
  }
}
