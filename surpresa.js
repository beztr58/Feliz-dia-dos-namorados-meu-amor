const hearts = document.querySelectorAll('.hunt-heart');
const meterFill = document.getElementById('meterFill');
const gameStatus = document.getElementById('gameStatus');
const finalLetter = document.getElementById('finalLetter');
const resetGame = document.getElementById('resetGame');
let found = 0;
const phrases = [
  'Você achou um pedacinho do meu amor.',
  'Mais um coração batendo por você.',
  'Seu sorriso desbloqueou outro segredo.',
  'Minha estrelinha está quase chegando lá.',
  'Agora sim... a homenagem é toda sua.'
];

function updateGame() {
  const percent = Math.round((found / hearts.length) * 100);
  meterFill.style.width = percent + '%';
  gameStatus.textContent = phrases[Math.max(0, found - 1)] || 'Toque nos corações escondidos para abrir a homenagem.';

  if (found === hearts.length) {
    finalLetter.classList.add('show');
    gameStatus.textContent = 'Amor completo: 100%. Leia sua homenagem, minha vida.';
    burstHearts(55);
  }
}

hearts.forEach((heart) => {
  heart.addEventListener('click', () => {
    if (heart.classList.contains('found')) return;
    heart.classList.add('found');
    found++;
    burstHearts(12);
    startMusic().catch(() => {});
    updateGame();
  });
});

resetGame.addEventListener('click', () => {
  found = 0;
  hearts.forEach((heart) => heart.classList.remove('found'));
  finalLetter.classList.remove('show');
  meterFill.style.width = '0%';
  gameStatus.textContent = 'Toque nos corações escondidos para abrir a homenagem.';
  burstHearts(20);
});
