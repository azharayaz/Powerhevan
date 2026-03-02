// Mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
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
