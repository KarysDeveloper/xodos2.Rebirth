// ===== XoDos:Re — App JS =====

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });
}

// ===== Scroll to Top Button =====
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== Release Filters =====
const filterBtns = document.querySelectorAll('.filter-btn');
const releaseCards = document.querySelectorAll('.release-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    releaseCards.forEach(card => {
      if (filter === 'all') {
        card.style.display = '';
      } else if (filter === 'stable' && card.dataset.type === 'stable') {
        card.style.display = '';
      } else if (filter === 'prerelease' && card.dataset.type === 'prerelease') {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ===== Copy Crypto Address =====
function copyAddress() {
  const address = '0x96e8c405d10da473f5afbe02b514d405131a3804';
  navigator.clipboard.writeText(address).then(() => {
    const feedback = document.getElementById('copyFeedback');
    feedback.classList.add('show');
    setTimeout(() => feedback.classList.remove('show'), 2000);
  }).catch(() => {
    const textarea = document.createElement('textarea');
    textarea.value = address;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    const feedback = document.getElementById('copyFeedback');
    feedback.classList.add('show');
    setTimeout(() => feedback.classList.remove('show'), 2000);
  });
}

// ===== Intersection Observer — Fade-in Animations =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.section, .release-card, .contributor-card, .thanks-block').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.opacity = '0.75';
    link.style.color = '';
    link.style.textShadow = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.opacity = '1';
      link.style.color = 'var(--accent-color)';
      link.style.textShadow = '0 0 10px var(--accent-color)';
    }
  });
});
