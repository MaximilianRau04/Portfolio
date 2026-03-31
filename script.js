// ── Theme Toggle ────────────────────────────────────────────────
const toggle = document.getElementById('theme-toggle');
const saved  = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', saved);

toggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ── Typed Hero Subtitle ─────────────────────────────────────────
const phrases = [
  'Software Engineering Student',
  'Full-Stack Developer',
  'Java & Spring Boot',
  'Vue.js & React',
];

const typedEl  = document.querySelector('.typed-text');
let   pIdx     = 0;
let   cIdx     = 0;
let   deleting = false;

function tick() {
  const phrase = phrases[pIdx];

  if (!deleting) {
    typedEl.textContent = phrase.slice(0, ++cIdx);
    if (cIdx === phrase.length) {
      deleting = true;
      setTimeout(tick, 1800);
      return;
    }
    setTimeout(tick, 60);
  } else {
    typedEl.textContent = phrase.slice(0, --cIdx);
    if (cIdx === 0) {
      deleting = false;
      pIdx = (pIdx + 1) % phrases.length;
      setTimeout(tick, 350);
      return;
    }
    setTimeout(tick, 35);
  }
}

setTimeout(tick, 800);

// ── Scroll Fade-In ───────────────────────────────────────────────
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

// ── Nav Active State on Scroll ───────────────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        navLinks.forEach((a) => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((s) => sectionObserver.observe(s));

// ── Nav Scroll Shadow ────────────────────────────────────────────
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 20
    ? '0 1px 30px rgba(0,0,0,0.3)'
    : 'none';
}, { passive: true });
