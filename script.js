// Background Canvas Particles
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.3;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;

        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particlesArray = [];
for (let i = 0; i < 80; i++) {
    particlesArray.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

animate();

// Touch responsiveness fix for mobile devices
document.querySelectorAll('section').forEach(s => s.addEventListener('touchstart', () => {}, {passive: true}));

// Sneak Peeks (SP) Scrollable Gallery Modal Toggle
const openSpModal = document.getElementById('open-sp-modal');
const closeSpModal = document.getElementById('close-sp-modal');
const spModal = document.getElementById('sp-modal');

if (openSpModal && closeSpModal && spModal) {
    // Open Modal and lock background scrolling
    openSpModal.addEventListener('click', () => {
        spModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Function to close modal and restore background scrolling
    const closeModal = () => {
        spModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeSpModal.addEventListener('click', closeModal);

    // Close when clicking on the dark background overlay
    spModal.addEventListener('click', (e) => {
        if (e.target === spModal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && spModal.classList.contains('active')) {
            closeModal();
        }
    });
}
