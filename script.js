// ===== Элементы =====
const startBtn     = document.getElementById('startBtn');
const hero         = document.getElementById('hero');
const card         = document.getElementById('card');
const musicBtn     = document.getElementById('musicBtn');
const musicIcon    = document.getElementById('musicIcon');
const bgMusic      = document.getElementById('bgMusic');
const petalsWrap   = document.getElementById('petals');
const confettiLayer= document.getElementById('confettiLayer');
const hugBtn       = document.getElementById('hugBtn');

// ===== Запуск открытки =====
startBtn.addEventListener('click', () => {
    hero.classList.add('hide');

    setTimeout(() => {
        hero.style.display = 'none';
        card.classList.add('visible');
        document.body.style.overflow = 'auto';
    }, 800);

    playMusic();
    launchConfetti(120);
});

// ===== Управление музыкой =====
let isPlaying = false;

function playMusic() {
    bgMusic.volume = 0.5;
    bgMusic.play()
        .then(() => {
            isPlaying = true;
            musicIcon.textContent = '🎵';
            musicBtn.classList.add('playing');
        })
        .catch(err => {
            console.warn('Автовоспроизведение заблокировано:', err);
            isPlaying = false;
            musicIcon.textContent = '🔇';
        });
}

function toggleMusic() {
    if (isPlaying) {
        bgMusic.pause();
        isPlaying = false;
        musicIcon.textContent = '🔇';
        musicBtn.classList.remove('playing');
    } else {
        bgMusic.play();
        isPlaying = true;
        musicIcon.textContent = '🎵';
        musicBtn.classList.add('playing');
    }
}

musicBtn.addEventListener('click', toggleMusic);

// ===== Плавающие символы =====
const symbols = ['🎂', '🎈', '💛', '✨', '🌸', '🎁', '🌷', '💫'];

function createPetal() {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.fontSize = (16 + Math.random() * 18) + 'px';
    petal.style.animationDuration = (8 + Math.random() * 8) + 's';
    petal.style.animationDelay = Math.random() * 5 + 's';

    petalsWrap.appendChild(petal);
    setTimeout(() => petal.remove(), 17000);
}

setInterval(createPetal, 1100);
for (let i = 0; i < 6; i++) setTimeout(createPetal, i * 300);

// ===== Конфетти =====
const confettiColors = ['#d5921a', '#f1d881', '#f9f4e6', '#5b5643', '#443020'];

function launchConfetti(count = 80) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const c = document.createElement('div');
            c.className = 'confetti';
            c.style.left = Math.random() * 100 + 'vw';
            c.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            c.style.animationDuration = (2 + Math.random() * 2.5) + 's';
            c.style.width = (6 + Math.random() * 8) + 'px';
            c.style.height = (8 + Math.random() * 10) + 'px';
            c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            confettiLayer.appendChild(c);
            setTimeout(() => c.remove(), 5000);
        }, i * 25);
    }
}

// ===== Кнопка "Обнять маму" =====
hugBtn.addEventListener('click', () => {
    launchConfetti(150);
    hugBtn.textContent = '💛 ҙур ҡосаҡ ебәрәбеҙ! 💛';
    setTimeout(() => {
        hugBtn.textContent = '🤗';
    }, 2500);
});

// ===== Плавное появление блоков при скролле =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.wish-card, .family-photo, .wish-section, .birthday-badge, .final-wish')
    .forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });