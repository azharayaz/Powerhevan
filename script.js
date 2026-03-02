// Sound effects
const btnSound = new Audio('audio/button.mp3');
const popupSound = new Audio('audio/pop up.wav');

function playBtnSound() {
    btnSound.currentTime = 0;
    btnSound.play();
}

function playPopupSound() {
    popupSound.currentTime = 0;
    popupSound.play();
}

// Add click sound to all buttons and links
document.addEventListener('click', (e) => {
    const target = e.target.closest('button, .hero-btn, .slider-btn, .pricing-btn, .contact-btn, .explore-item, .header nav ul li a');
    if (target) playBtnSound();
});

// Mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const menuOverlay = document.getElementById('menu-overlay');

function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
}

function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
}

hamburger.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', closeMenu);

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Modal cards
const modalOverlay = document.getElementById('modal-overlay');
const modalCards = document.querySelectorAll('.modal-card');
const modalTriggers = document.querySelectorAll('[data-modal]');
const modalCloses = document.querySelectorAll('.modal-close');

function openModal(modalId) {
    modalCards.forEach(c => c.classList.remove('active'));
    document.getElementById(modalId).classList.add('active');
    modalOverlay.classList.add('active');
}

function closeModal() {
    modalOverlay.classList.remove('active');
    modalCards.forEach(c => c.classList.remove('active'));
}

modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeMenu();
        openModal(btn.dataset.modal);
    });
});

modalCloses.forEach(btn => {
    btn.addEventListener('click', closeModal);
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

// Close explore modal links and scroll
document.querySelectorAll('.explore-item').forEach(item => {
    item.addEventListener('click', () => {
        closeModal();
    });
});

// Toast notifications
const toastJoin = document.getElementById('toast-join');
const toastJourney = document.getElementById('toast-journey');

function showToast(toastEl) {
    toastEl.classList.add('show');
    toastEl.classList.remove('hide');
    setTimeout(playPopupSound, 200);
    setTimeout(() => {
        toastEl.classList.remove('show');
        toastEl.classList.add('hide');
    }, 3500);
}

const goalMessages = {
    'weight-loss': 'Your Weight Loss session is booked!',
    'muscle-gain': 'Your Muscle Gain session is booked!',
    'endurance': 'Your Endurance session is booked!',
    'general': 'Your General Fitness session is booked!'
};

const planMessages = {
    'basic': 'Welcome to Basic! Your fitness journey starts now.',
    'pro': 'Great choice! Pro members get the full experience.',
    'elite': 'Elite mode activated! You get everything we offer.'
};

// Join Now form
document.getElementById('modal-join').querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.querySelector('input[type="text"]').value.trim() || 'Champion';
    const plan = e.target.querySelector('select').value;
    document.getElementById('toast-join-name').textContent = name;
    document.getElementById('toast-join-msg').textContent = planMessages[plan] || 'We will meet you in the gym!';
    closeModal();
    e.target.reset();
    showToast(toastJoin);
});

// Start Your Journey form
document.getElementById('modal-journey').querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.querySelector('input[type="text"]').value.trim() || 'Champion';
    const goal = e.target.querySelector('select').value;
    document.getElementById('toast-journey-name').textContent = name;
    document.getElementById('toast-journey-msg').textContent = goalMessages[goal] || 'Your session is booked!';
    closeModal();
    e.target.reset();
    showToast(toastJourney);
});

// Contact form toast
const toastContact = document.getElementById('toast-contact');
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.querySelector('input[type="text"]').value.trim() || 'Friend';
    document.getElementById('toast-contact-name').textContent = name;
    e.target.reset();
    showToast(toastContact);
});

// Pricing buttons - open join modal with plan pre-selected
document.querySelectorAll('.pricing-btn[data-plan]').forEach(btn => {
    btn.addEventListener('click', () => {
        const plan = btn.dataset.plan;
        const joinSelect = document.querySelector('#modal-join select');
        joinSelect.value = plan;
        openModal('modal-join');
    });
});

// Floating particles background
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = [];
const particleCount = 100;

for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.6,
        speedY: (Math.random() - 0.5) * 0.6,
        opacity: Math.random() * 0.5 + 0.1
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(224, 67, 67, ${p.opacity})`;
        ctx.fill();
    });

    requestAnimationFrame(animateParticles);
}
animateParticles();

// Typewriter effect
const typewriter = document.getElementById('typewriter');
const phrases = [
    'TRANSFORM YOUR BODY.',
    'PUSH YOUR LIMITS.',
    'BUILD YOUR STRENGTH.',
    'CONQUER YOUR GOALS.'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
        typewriter.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriter.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === current.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}
setTimeout(typeEffect, 1500);

// Stats counter animation
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateCounters() {
    statNumbers.forEach(stat => {
        const target = +stat.dataset.target;
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            stat.textContent = Math.floor(target * eased) + '+';
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    });
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            animateCounters();
        }
    });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) statsObserver.observe(statsSection);

// Slider
const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider-btn-left');
const btnRight = document.querySelector('.slider-btn-right');

const totalSlides = slides.length;

// Clone first and last slide for seamless looping
const cloneEnd = slides[0].cloneNode(true);
track.appendChild(cloneEnd);
const cloneStart = slides[totalSlides - 1].cloneNode(true);
track.prepend(cloneStart);

let currentIndex = 1;

function updateSlider(animate) {
    if (animate === false) {
        track.style.transition = 'none';
    } else {
        track.style.transition = 'transform 0.5s ease';
    }
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Set initial position without animation
updateSlider(false);

btnRight.addEventListener('click', () => {
    currentIndex++;
    updateSlider(true);

    if (currentIndex >= totalSlides + 1) {
        setTimeout(() => {
            currentIndex = 1;
            updateSlider(false);
        }, 500);
    }
});

btnLeft.addEventListener('click', () => {
    currentIndex--;
    updateSlider(true);

    if (currentIndex < 1) {
        setTimeout(() => {
            currentIndex = totalSlides;
            updateSlider(false);
        }, 500);
    }
});
