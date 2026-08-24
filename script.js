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
        this.y = Math.random() * canvas.height; // Distributes particles across the entire viewport initially
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

document.querySelectorAll('section').forEach(s => s.addEventListener('touchstart', () => {}, {passive: true}));

// Audio playback and CD spinning controls
const audioPlayers = document.querySelectorAll('audio');

audioPlayers.forEach(audio => {
  audio.addEventListener('play', (event) => {
    // Pause other audio players when one plays
    audioPlayers.forEach(otherAudio => {
      if (otherAudio !== event.target) {
        otherAudio.pause();
      }
    });

    const currentCard = audio.closest('[class*="music-card"]');
    if (currentCard) {
      const disc = currentCard.querySelector('.cd-disc');
      disc?.classList.add('spinning');
    }
  });

  audio.addEventListener('pause', () => {
    const currentCard = audio.closest('[class*="music-card"]');
    if (currentCard) {
      const disc = currentCard.querySelector('.cd-disc');
      disc?.classList.remove('spinning');
    }
  });

  audio.addEventListener('ended', () => {
    const currentCard = audio.closest('[class*="music-card"]');
    if (currentCard) {
      const disc = currentCard.querySelector('.cd-disc');
      disc?.classList.remove('spinning');
    }
  });
});
