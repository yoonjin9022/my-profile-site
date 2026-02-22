// Full screen menu toggle
const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const fullMenu = document.getElementById('full-menu');

menuToggle.addEventListener('click', () => {
  fullMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
});

menuClose.addEventListener('click', () => {
  fullMenu.classList.remove('open');
  document.body.style.overflow = '';
});

// Close menu on link click
document.querySelectorAll('.menu-link').forEach(link => {
  link.addEventListener('click', () => {
    fullMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Navbar background change based on scroll position
const navbar = document.getElementById('navbar');
const hero = document.getElementById('hero');

function updateNavbar() {
  const heroBottom = hero.offsetTop + hero.offsetHeight;
  const scrollY = window.scrollY;

  navbar.classList.remove('scrolled', 'scrolled-past-hero');

  if (scrollY > heroBottom - 80) {
    navbar.classList.add('scrolled-past-hero');
  } else if (scrollY > 50) {
    navbar.classList.add('scrolled');
  }
}

window.addEventListener('scroll', updateNavbar);
updateNavbar();

// Scroll-based reveal animation using IntersectionObserver
const scrollElements = document.querySelectorAll('.scroll-animate');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

scrollElements.forEach(el => observer.observe(el));

// Skills hover interaction
const skillItems = document.querySelectorAll('.skill-item');
const previewImage = document.getElementById('skill-preview-image');
const previewTools = document.getElementById('skill-preview-tools');

function updateSkillPreview(item) {
  const image = item.dataset.image;
  const tools = item.dataset.tools.split(',');

  // Highlight active item
  skillItems.forEach(si => si.classList.remove('active'));
  item.classList.add('active');

  // Animate image swap
  previewImage.classList.add('fading');
  setTimeout(() => {
    previewImage.src = image;
    previewImage.onload = () => {
      previewImage.classList.remove('fading');
    };
    // Fallback remove fading if image is cached
    setTimeout(() => previewImage.classList.remove('fading'), 100);
  }, 150);

  // Update tool badges
  previewTools.innerHTML = tools
    .map(tool => `<span class="skill-tool-badge px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700">${tool.trim()}</span>`)
    .join('');
}

skillItems.forEach(item => {
  item.addEventListener('mouseenter', () => updateSkillPreview(item));
});

// Also handle touch for mobile
skillItems.forEach(item => {
  item.addEventListener('click', () => updateSkillPreview(item));
});
