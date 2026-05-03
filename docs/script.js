// Translations
const t = {
  en: {
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    'hero.badge': 'Available for opportunities',
    'hero.desc': 'Software Engineering student at the University of Stuttgart - building full-stack applications and exploring the depths of computer architecture and systems programming.',
    'hero.btn.projects': 'View Projects',
    'hero.btn.contact': 'Get in Touch',
    'about.label': '01 — About',
    'about.title': 'Who I Am',
    'about.p1': 'I\'m a <strong>Software Engineering student</strong> at the University of Stuttgart with a passion for building clean, scalable systems. My work spans the full stack - from crafting REST APIs with Spring Boot to building reactive frontends with Vue.js and React.',
    'about.p2': 'I believe great software is defined by its foundations: thoughtful architecture, thorough testing, and maintainable code. I enjoy diving deep into complex problems and finding elegant solutions.',
    'about.stat.projects': 'Projects',
    'about.stat.technologies': 'Technologies',
    'about.stat.degree': 'Software Eng.',
    'projects.label': '02 — Work',
    'projects.title': 'Featured Projects',
    'project.cpu.desc': 'University project: a PicoBlaze-style 8-bit processor implemented in VHDL with a 2-stage pipeline, 16 general-purpose registers, and 256 I/O ports. Includes a custom C# assembler toolchain and comprehensive testbenches.',
    'project.cinemate.desc': 'Web application for discovering, managing, and tracking movies and TV series. Built with a Spring Boot REST API backend and a React frontend with a clean, responsive UI.',
    'project.event.desc': 'Enterprise web application developed during a software engineering internship at itestra. Manages company events and exchange days with role-based access control and scheduling.',
    'project.todo.desc': 'Full-stack task management web application with a Spring Boot REST API and a Vue.js frontend. Features task creation, editing, and real-time status tracking.',
    'projects.more': 'View more on GitHub',
    'skills.label': '03 — Skills',
    'skills.title': 'Technologies',
    'skills.group.languages': 'Languages',
    'skills.group.frontend': 'Frontend',
    'skills.group.backend': 'Backend',
    'skills.group.tools': 'Tools & Ops',
    'contact.label': '04 — Contact',
    'contact.title': 'Get In Touch',
    'contact.desc': 'I\'m always open to new opportunities, collaborations, or a good technical conversation. Feel free to reach out.',
    'form.label.name': 'Name',
    'form.label.email': 'Email',
    'form.label.message': 'Message',
    'form.ph.name': 'Max Mustermann',
    'form.ph.email': 'max@example.com',
    'form.ph.message': 'Hi Maximilian, ...',
    'form.submit': 'Send Message',
    'contact.divider': 'or reach me directly',
    'footer.copy': '© 2026 Maximilian Rau',
  },
  de: {
    'nav.about': 'Über mich',
    'nav.projects': 'Projekte',
    'nav.skills': 'Kenntnisse',
    'nav.contact': 'Kontakt',
    'hero.badge': 'Offen für neue Möglichkeiten',
    'hero.desc': 'Software-Engineering-Student an der Universität Stuttgart - Ich entwickle Full-Stack-Anwendungen und erforsche Computerarchitektur und Systemprogrammierung.',
    'hero.btn.projects': 'Projekte ansehen',
    'hero.btn.contact': 'Kontakt aufnehmen',
    'about.label': '01 — Über mich',
    'about.title': 'Wer ich bin',
    'about.p1': 'Ich bin ein <strong>Software-Engineering-Student</strong> an der Universität Stuttgart mit einer Leidenschaft für saubere, skalierbare Systeme. Meine Arbeit umfasst den gesamten Stack - von REST-APIs mit Spring Boot bis hin zu reaktiven Frontends mit Vue.js und React.',
    'about.p2': 'Gute Software wird durch ihre Grundlagen definiert: durchdachte Architektur, gründliche Tests und wartbaren Code. Ich tauche gerne tief in komplexe Probleme ein und finde elegante Lösungen.',
    'about.stat.projects': 'Projekte',
    'about.stat.technologies': 'Technologien',
    'about.stat.degree': 'Software Eng.',
    'projects.label': '02 — Arbeit',
    'projects.title': 'Ausgewählte Projekte',
    'project.cpu.desc': 'Universitätsprojekt: ein PicoBlaze-ähnlicher 8-Bit-Prozessor in VHDL mit 2-stufiger Pipeline, 16 Allzweckregistern und 256 I/O-Ports. Mit eigener C#-Assembler-Toolchain und Testbenches.',
    'project.cinemate.desc': 'Webanwendung zum Entdecken, Verwalten und Verfolgen von Filmen und Serien. Spring-Boot-REST-API-Backend und React-Frontend mit übersichtlicher, responsiver Oberfläche.',
    'project.event.desc': 'Enterprise-Webanwendung, entwickelt im Software-Engineering-Praktikum bei itestra. Verwaltet Firmenveranstaltungen mit rollenbasierter Zugriffskontrolle und Terminplanung.',
    'project.todo.desc': 'Full-Stack-Aufgabenverwaltung mit Spring-Boot-REST-API und Vue.js-Frontend. Erstellen, Bearbeiten und Verfolgen von Aufgaben in Echtzeit.',
    'projects.more': 'Weitere Projekte auf GitHub',
    'skills.label': '03 — Kenntnisse',
    'skills.title': 'Technologien',
    'skills.group.languages': 'Sprachen',
    'skills.group.frontend': 'Frontend',
    'skills.group.backend': 'Backend',
    'skills.group.tools': 'Tools & Betrieb',
    'contact.label': '04 — Kontakt',
    'contact.title': 'Schreib mir',
    'contact.desc': 'Ich bin offen für neue Möglichkeiten, Kooperationen oder ein gutes technisches Gespräch. Melde dich gerne.',
    'form.label.name': 'Name',
    'form.label.email': 'E-Mail',
    'form.label.message': 'Nachricht',
    'form.ph.name': 'Max Mustermann',
    'form.ph.email': 'max@beispiel.de',
    'form.ph.message': 'Hallo Maximilian, ...',
    'form.submit': 'Nachricht senden',
    'contact.divider': 'oder direkt erreichen',
    'footer.copy': '© 2026 Maximilian Rau',
  },
};

const typedPhrases = {
  en: ['Software Engineering Student', 'Full-Stack Developer', 'Java & Spring Boot', 'Vue.js & React'],
  de: ['Software-Engineering-Student', 'Full-für -Entwickler', 'Java & Spring Boot', 'Vue.js & React'],
};

// Language
let currentLang = localStorage.getItem('lang') || 'en';

function applyTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (t[lang]?.[key] !== undefined) el.textContent = t[lang][key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    if (t[lang]?.[key] !== undefined) el.innerHTML = t[lang][key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[lang]?.[key] !== undefined) el.placeholder = t[lang][key];
  });
  document.documentElement.lang = lang;
  document.getElementById('lang-toggle').textContent = lang === 'en' ? 'DE' : 'EN';
}

applyTranslations(currentLang);

document.getElementById('lang-toggle').addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'de' : 'en';
  localStorage.setItem('lang', currentLang);
  applyTranslations(currentLang);
  restartTyping();
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const savedTheme  = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Typed Hero Subtitle
const typedEl = document.querySelector('.typed-text');
let pIdx = 0, cIdx = 0, deleting = false, typingTimeout = null;

function tick() {
  const phrase = typedPhrases[currentLang][pIdx % typedPhrases[currentLang].length];

  if (!deleting) {
    typedEl.textContent = phrase.slice(0, ++cIdx);
    if (cIdx === phrase.length) {
      deleting = true;
      typingTimeout = setTimeout(tick, 1800);
      return;
    }
    typingTimeout = setTimeout(tick, 60);
  } else {
    typedEl.textContent = phrase.slice(0, --cIdx);
    if (cIdx === 0) {
      deleting = false;
      pIdx = (pIdx + 1) % typedPhrases[currentLang].length;
      typingTimeout = setTimeout(tick, 350);
      return;
    }
    typingTimeout = setTimeout(tick, 35);
  }
}

function restartTyping() {
  clearTimeout(typingTimeout);
  typedEl.textContent = '';
  pIdx = 0; cIdx = 0; deleting = false;
  typingTimeout = setTimeout(tick, 300);
}

typingTimeout = setTimeout(tick, 800);

// Scroll Fade-In
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        fadeObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.fade-in').forEach((el) => fadeObserver.observe(el));

// Nav Active State on Scroll 
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

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

// Nav Scroll Shadow
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 20 ? '0 1px 30px rgba(0,0,0,0.3)' : 'none';
}, { passive: true });

// Contact Form
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');
const submitBtn = contactForm?.querySelector('.form-submit');

const formMessages = {
  en: { success: 'Message sent! I\'ll get back to you soon.', error: 'Something went wrong. Please try again.' },
  de: { success: 'Nachricht gesendet! Ich melde mich bald.', error: 'Etwas ist schiefgelaufen. Bitte erneut versuchen.' },
};

contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name    = document.getElementById('contact-name').value.trim();
  const email   = document.getElementById('contact-email').value.trim();
  const message = document.getElementById('contact-message').value.trim();

  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.7';
  formFeedback.textContent = '';
  formFeedback.className = 'form-feedback';

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });
    const data = await res.json();

    if (res.ok) {
      formFeedback.textContent = formMessages[currentLang].success;
      formFeedback.classList.add('form-feedback--success');
      contactForm.reset();
    } else {
      formFeedback.textContent = data.error || formMessages[currentLang].error;
      formFeedback.classList.add('form-feedback--error');
    }
  } catch {
    formFeedback.textContent = formMessages[currentLang].error;
    formFeedback.classList.add('form-feedback--error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.style.opacity = '';
  }
});
