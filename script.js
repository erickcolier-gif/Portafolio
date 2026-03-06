/* ============================================================
   ERICK COLIER - PORTFOLIO JS
   ============================================================ */

/* --- NAVBAR scroll effect --- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* --- Active nav link on scroll --- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  const scrollY = window.scrollY + 120;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}
window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

/* --- Mobile hamburger --- */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

/* --- Typing animation --- */
const roles = [
  'Ingeniero Industrial & Electrico',
  'Automatizacion de Procesos',
  'Proyectos Solares Fotovoltaicos',
  'Python Developer',
  'Integracion de APIs & N8N',
  'Full Stack Dev (en formacion)'
];

let roleIndex = 0;
let charIndex  = 0;
let isDeleting = false;
const typingEl = document.getElementById('typing-text');

function typeLoop() {
  const current = roles[roleIndex];

  if (!isDeleting) {
    typingEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      setTimeout(() => { isDeleting = true; typeLoop(); }, 2200);
      return;
    }
  } else {
    typingEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex  = (roleIndex + 1) % roles.length;
    }
  }

  const speed = isDeleting ? 45 : 80;
  setTimeout(typeLoop, speed);
}

setTimeout(typeLoop, 1400);

/* --- Particle background --- */
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  for (let i = 0; i < 28; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size  = Math.random() * 4 + 1;
    const left  = Math.random() * 100;
    const delay = Math.random() * 18;
    const dur   = Math.random() * 14 + 10;
    const color = Math.random() > 0.5 ? 'rgba(249,115,22,0.6)' : 'rgba(59,130,246,0.6)';

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      bottom: -10px;
      background: ${color};
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
    `;
    container.appendChild(p);
  }
}
createParticles();

/* --- Scroll reveal --- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.dataset.delay = (i % 5) * 80;
  revealObserver.observe(el);
});

/* --- Language bars animation --- */
const langObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.lang-fill').forEach(bar => {
        const w = bar.dataset.width;
        setTimeout(() => { bar.style.width = w + '%'; }, 300);
      });
      langObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const langSection = document.querySelector('.languages');
if (langSection) langObserver.observe(langSection);

/* --- Contact form --- */
const form    = document.getElementById('contact-form');
const formMsg = document.getElementById('form-msg');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"] span');
    const origText = btn.textContent;
    btn.textContent = 'Enviando...';

    setTimeout(() => {
      formMsg.textContent = 'Gracias por tu mensaje! Me pondre en contacto contigo pronto.';
      formMsg.style.color = '#4ade80';
      btn.textContent = origText;
      form.reset();
      setTimeout(() => { formMsg.textContent = ''; }, 5000);
    }, 1200);
  });
}

/* --- Smooth scroll for anchor links --- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
