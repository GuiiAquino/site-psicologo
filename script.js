/* =================================================
   PSYCHOLOGIST WEBSITE — JAVASCRIPT
   Navbar scroll, mobile menu, scroll reveal, form
   ================================================= */

(function () {
  'use strict';

  /* ---- NAVBAR SCROLL ---- */
  const navbar = document.getElementById('navbar');
  function handleScroll() {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ---- MOBILE HAMBURGER ---- */
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('nav-mobile');
  hamburger.addEventListener('click', () => {
    navMobile.classList.toggle('open');
  });
  // close on link click
  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navMobile.classList.remove('open'));
  });

  /* ---- SMOOTH SCROLL ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- SCROLL REVEAL ---- */
  const reveals = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  reveals.forEach(el => revealObs.observe(el));

  /* ---- CONTACT FORM ---- */
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');
  const btnText = document.getElementById('btn-text');
  const submitBtn = document.getElementById('form-submit');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();

      if (!name || !email) {
        shakeField(!name ? 'name' : 'email');
        return;
      }
      if (!isValidEmail(email)) {
        shakeField('email');
        return;
      }

      // Simulate submit
      submitBtn.disabled = true;
      btnText.textContent = 'Enviando...';

      setTimeout(() => {
        form.style.display = 'none';
        successMsg.classList.remove('hidden');
      }, 1200);
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function shakeField(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.borderColor = '#c0776a';
    el.style.animation = 'shake 0.4s ease';
    el.focus();
    setTimeout(() => {
      el.style.borderColor = '';
      el.style.animation = '';
    }, 800);
  }

  /* ---- SHAKE KEYFRAMES (injected) ---- */
  const shakeStyle = document.createElement('style');
  shakeStyle.textContent = `
    @keyframes shake {
      0%,100%{ transform: translateX(0); }
      20%{ transform: translateX(-6px); }
      40%{ transform: translateX(6px); }
      60%{ transform: translateX(-4px); }
      80%{ transform: translateX(4px); }
    }
  `;
  document.head.appendChild(shakeStyle);

  /* ---- ACTIVE NAV LINK HIGHLIGHT ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');

  const sectionObs = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active-nav', link.getAttribute('href') === '#' + id);
          });
        }
      });
    },
    { threshold: 0.4 }
  );
  sections.forEach(s => sectionObs.observe(s));

  /* ---- PARALLAX HERO BLOBS (subtle) ---- */
  const blob1 = document.querySelector('.blob-1');
  const blob2 = document.querySelector('.blob-2');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (blob1) blob1.style.transform = `translateY(${y * 0.12}px)`;
    if (blob2) blob2.style.transform = `translateY(${y * -0.08}px)`;
  }, { passive: true });

})();
