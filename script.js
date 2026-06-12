const card = document.getElementById('card');
const openLetter = document.getElementById('openLetter');
const sparkBtn = document.getElementById('sparkBtn');
const musicBtn = document.getElementById('musicBtn');
const toast = document.getElementById('toast');
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

let particles = [];
let musicPlaying = false;
const music = new Audio('POV_ you are falling in love - Love & Chill Vibes - Copia - Copia.mp3');
music.loop = true;

function resize() {
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}

function createParticles() {
  particles = Array.from({ length: 85 }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: Math.random() * 2.8 + .5,
    speed: Math.random() * .45 + .12,
    alpha: Math.random() * .55 + .12,
    drift: Math.random() * .5 - .25
  }));
}

function animateBackground() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  ctx.fillStyle = 'rgba(0,0,0,.18)';
  ctx.fillRect(0, 0, innerWidth, innerHeight);

  for (const p of particles) {
    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
    gradient.addColorStop(0, `rgba(255, 23, 56, ${p.alpha})`);
    gradient.addColorStop(1, 'rgba(255, 23, 56, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
    ctx.fill();

    p.y -= p.speed;
    p.x += p.drift;
    if (p.y < -20) {
      p.y = innerHeight + 20;
      p.x = Math.random() * innerWidth;
    }
  }
  requestAnimationFrame(animateBackground);
}

function burstHearts(amount = 18) {
  for (let i = 0; i < amount; i++) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = Math.random() > .35 ? '❤' : '✦';
    heart.style.left = `${Math.random() * 90 + 5}vw`;
    heart.style.bottom = `${Math.random() * 24 + 8}px`;
    heart.style.fontSize = `${Math.random() * 20 + 16}px`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1900);
  }
}

async function startMusic() {
  if (musicPlaying) return;

  try {
    await music.play();
    musicPlaying = true;
    musicBtn.textContent = '🎵 Música tocando';
  } catch (err) {
    console.error(err);
    musicBtn.textContent = 'Tocar música';
  }
}

function tryAutoPlay() {
  startMusic().catch(() => {
    musicBtn.textContent = 'Tocar música';
  });
}

openLetter.addEventListener('click', () => {
  card.classList.toggle('open');
  toast.classList.add('hide');
  burstHearts(26);
  startMusic().catch(() => {});
});

sparkBtn.addEventListener('click', () => burstHearts(35));
musicBtn.addEventListener('click', () => startMusic().catch(() => {}));

window.addEventListener('resize', () => {
  resize();
  createParticles();
});

resize();
createParticles();
animateBackground();
setTimeout(() => toast.classList.add('hide'), 4800);
tryAutoPlay();
