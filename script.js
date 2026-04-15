/* ============================================
   PORTFOLIO JAVASCRIPT
   ============================================ */

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- Mobile hamburger menu ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close menu on nav link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ---- Scroll reveal animation ----
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger animations for elements in the same parent
        const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.visible)');
        let delay = 0;
        siblings.forEach(sibling => {
          if (sibling === entry.target) {
            sibling.style.transitionDelay = `${delay}ms`;
          }
        });
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px',
  }
);

revealElements.forEach(el => revealObserver.observe(el));

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinkEls.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(sec => sectionObserver.observe(sec));

// ---- Skill tag hover glow ----
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', () => {
    tag.style.boxShadow = '0 0 14px rgba(99, 220, 255, 0.4)';
  });
  tag.addEventListener('mouseleave', () => {
    tag.style.boxShadow = 'none';
  });
});

// ---- Smooth stagger for hero stats ----
window.addEventListener('load', () => {
  const stats = document.querySelectorAll('.stat');
  stats.forEach((stat, i) => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(20px)';
    setTimeout(() => {
      stat.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      stat.style.opacity = '1';
      stat.style.transform = 'translateY(0)';
    }, 600 + i * 120);
  });

  // Hero content reveal
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(40px)';
    setTimeout(() => {
      heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 100);
  }
});

// ---- Typing cursor effect on hero title ----
(function typingEffect() {
  const titles = [
    'Senior Backend Engineer',
    'Distributed Systems Architect',
    'Cloud-Native Developer',
    'Identity Platform Expert',
  ];
  const el = document.querySelector('.hero-title');
  if (!el) return;

  let titleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let pause = false;

  function tick() {
    const current = titles[titleIdx];

    if (!isDeleting) {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        pause = true;
        setTimeout(() => { pause = false; isDeleting = true; tick(); }, 2200);
        return;
      }
    } else {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        titleIdx = (titleIdx + 1) % titles.length;
      }
    }

    const speed = isDeleting ? 45 : 75;
    if (!pause) setTimeout(tick, speed);
  }

  // Start after a short delay
  setTimeout(tick, 1200);
})();

// ---- Parallax glow effect on mouse move ----
document.addEventListener('mousemove', (e) => {
  const glow1 = document.querySelector('.glow-1');
  const glow2 = document.querySelector('.glow-2');
  if (!glow1 || !glow2) return;

  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  glow1.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
  glow2.style.transform = `translate(${-x * 20}px, ${-y * 20}px)`;
});
