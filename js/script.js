// ===== NAVBAR (scroll + mobile menu) =====
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ===== ACTIVE LINK BERDASARKAN SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinksItems = document.querySelectorAll('.nav-link');

function highlightNav() {
  const scrollPos = window.scrollY + 120;
  let current = '';

  sections.forEach((section) => {
    if (scrollPos >= section.offsetTop) {
      current = section.id;
    }
  });

  navLinksItems.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', highlightNav);

// ===== CURSOR CIRCLE =====
const cursorGlow = document.getElementById('cursorGlow');

document.addEventListener('mousemove', (e) => {
  if (window.innerWidth <= 768) return;
  cursorGlow.style.opacity = '1';
  cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
});

document.querySelectorAll('a, button, .btn, input, textarea').forEach((el) => {
  el.addEventListener('mouseenter', () => cursorGlow.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursorGlow.classList.remove('hover'));
});

// ===== TYPEWRITER EFFECT =====
const roles = ['Linux User', 'TJKT Student'];
const typeWriter = document.getElementById('typeWriter');
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = roles[roleIndex];
  if (!deleting) {
    typeWriter.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
    setTimeout(typeLoop, 100);
  } else {
    typeWriter.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeLoop, 400);
      return;
    }
    setTimeout(typeLoop, 50);
  }
}
typeLoop();

// ===== ANIMASI PROGRESS BAR =====
const progressBars = document.querySelectorAll('.progress-bar');
const progressObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width;
      }
    });
  },
  { threshold: 0.5 }
);
progressBars.forEach((bar) => progressObserver.observe(bar));

// ===== ANIMASI REVEAL SAAT SCROLL =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// ===== FORM KONTAK =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  formStatus.className = 'form-status';
  formStatus.textContent = '';

  // validasi sederhana di sisi client
  let valid = true;
  contactForm.querySelectorAll('input, textarea').forEach((field) => {
    field.classList.remove('invalid');
    if (!field.checkValidity()) {
      field.classList.add('invalid');
      valid = false;
    }
  });
  if (!valid) {
    formStatus.className = 'form-status error';
    formStatus.textContent = 'Mohon lengkapi semua kolom dengan benar.';
    return;
  }

  formStatus.textContent = 'Mengirim pesan...';
  formStatus.className = 'form-status';

  try {
    const res = await fetch('php/contact.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(contactForm)),
    });
    const data = await res.json();

    if (data.success) {
      formStatus.className = 'form-status success';
      formStatus.textContent = data.message;
      contactForm.reset();
    } else {
      formStatus.className = 'form-status error';
      formStatus.textContent = data.message;
    }
  } catch (err) {
    formStatus.className = 'form-status error';
    formStatus.textContent = 'Terjadi kesalahan koneksi. Pastikan server XAMPP menyala.';
  }
});
}
