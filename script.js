document.addEventListener('DOMContentLoaded', function() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    createParticles();
  }
 
  initAnimations();
  
  window.addEventListener('scroll', handleScroll);

  initTypingAnimation();
  initSkillAnimation();
  handleImageError();
  initMobileNav();
  initSmoothScroll();
  
  setTimeout(() => {
    document.querySelector('.loader').classList.add('hidden');
  }, 800);
});

function createParticles() {
  const particlesContainer = document.querySelector('.particles');
  if (!particlesContainer) return;
  
  const particleCount = 15; 
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const size = Math.random() * 40 + 10;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 15 + 10;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.opacity = Math.random() * 0.15 + 0.05;
    
    particlesContainer.appendChild(particle);
  }
}

function handleScroll() {
  const header = document.querySelector('.site-header');
  const scrollY = window.scrollY;
  
  if (scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(reveal => {
    const windowHeight = window.innerHeight;
    const elementTop = reveal.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add('show');
    }
  });
}

function initAnimations() {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add('reveal');
  });
  
  handleScroll();
}

function initTypingAnimation() {
  const typedEl = document.querySelector('.subtitle');
  if (!typedEl) return;
  
  const words = [
    'Frontend & UI Designer',
    'Pembuat Website Aesthetic',
    'Specialist Modern Web',
    'Minimalist & Elegant Design'
  ];
  
  let currentWordIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let isPaused = false;
  
  function type() {
    if (isPaused) return;
    
    const currentWord = words[currentWordIndex];
    
    if (!isDeleting) {
      typedEl.textContent = currentWord.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      
      if (currentCharIndex === currentWord.length) {
        isPaused = true;
        setTimeout(() => {
          isPaused = false;
          isDeleting = true;
          setTimeout(type, 100);
        }, 2000);
        return;
      }
    } else {
      typedEl.textContent = currentWord.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      
      if (currentCharIndex === 0) {
        isDeleting = false;
        currentWordIndex = (currentWordIndex + 1) % words.length;
      }
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(type, speed);
  }
  
  setTimeout(type, 1000);
}

function initSkillAnimation() {
  const skillContainer = document.querySelector('.skill-container');
  if (!skillContainer) return;
  
  skillContainer.addEventListener('mouseenter', () => {
    const track = skillContainer.querySelector('.skill-track');
    if (track) {
      track.style.animationPlayState = 'paused';
    }
  });
  
  skillContainer.addEventListener('mouseleave', () => {
    const track = skillContainer.querySelector('.skill-track');
    if (track) {
      track.style.animationPlayState = 'running';
    }
  });
}

function handleImageError() {
  const profileImg = document.getElementById('profileImg');
  if (profileImg) {
    profileImg.onerror = function() {
      console.log('Gambar profil tidak ditemukan');
      this.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 24 24"><path fill="%235eead4" d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12Zm-8 8v-2.8q0-.85.438-1.563T5.6 14.55q1.55-.775 3.15-1.163T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20H4Z"/></svg>';
      this.alt = 'Default profile icon';
    };
  }
}

let mobileNav = null;
const hamburger = document.getElementById('hamburger');

function initMobileNav() {
  if (!hamburger) return;
  
  hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleMobileNav();
  });
  
  document.addEventListener('click', function(event) {
    if (mobileNav && mobileNav.classList.contains('show') && 
        !mobileNav.contains(event.target) && 
        !hamburger.contains(event.target)) {
      closeMobileNav();
    }
  });
  
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && mobileNav && mobileNav.classList.contains('show')) {
      closeMobileNav();
    }
  });
}

function toggleMobileNav() {
  if (!mobileNav) {
    mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    mobileNav.innerHTML = `
      <button class="mobile-nav-close" onclick="closeMobileNav()">X</button>
      <a href="#home" onclick="scrollToSection('home')">Home</a>
      <a href="#about" onclick="scrollToSection('about')">About</a>
      <a href="#projects" onclick="scrollToSection('projects')">Project</a>
      <a href="#education" onclick="scrollToSection('education')">Education</a>
    `;
    document.body.appendChild(mobileNav);
  }
  
  mobileNav.classList.toggle('show');
  hamburger.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', mobileNav.classList.contains('show'));
  
  document.body.style.overflow = mobileNav.classList.contains('show') ? 'hidden' : '';
}

function closeMobileNav() {
  if (mobileNav) {
    mobileNav.classList.remove('show');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const targetId = href.substring(1);
      if (targetId && document.getElementById(targetId)) {
        e.preventDefault();
        scrollToSection(targetId);
      }
    });
  });
}

function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    const header = document.querySelector('.site-header');
    const headerHeight = header ? header.offsetHeight : 80;
    
    window.scrollTo({
      top: element.offsetTop - headerHeight,
      behavior: 'smooth'
    });
  }
  closeMobileNav();
}

window.toggleMobileNav = toggleMobileNav;
window.closeMobileNav = closeMobileNav;
window.scrollToSection = scrollToSection;