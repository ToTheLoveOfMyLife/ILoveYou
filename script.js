// Transition between sections
function showSection(nextId) {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.add('hidden');
  });
  const nextSection = document.getElementById(nextId);
  nextSection.classList.remove('hidden');

  // Trigger fall-in animation for gallery images in the newly visible section
  const galleryImages = nextSection.querySelectorAll('.gallery .memory');
  galleryImages.forEach((img, index) => {
    img.style.animationDelay = `${index * 0.2}s`;
    img.classList.add('fall-in');
  });
}

// Confetti Animation using Canvas
function launchConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confettiCount = 150;
  const confetti = [];

  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * confettiCount,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      tilt: Math.floor(Math.random() * 10) - 10,
      tiltAngleIncremental: (Math.random() * 0.07) + 0.05,
      tiltAngle: 0
    });
  }

  function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(c => {
      c.tiltAngle += c.tiltAngleIncremental;
      c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2;
      c.x += Math.sin(c.d);
      c.tilt = Math.sin(c.tiltAngle) * 15;
      ctx.beginPath();
      ctx.lineWidth = c.r;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt + c.r / 3, c.y);
      ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 5);
      ctx.stroke();
    });
  }

  function updateConfetti() {
    drawConfetti();
    for (let i = 0; i < confettiCount; i++) {
      if (confetti[i].y > canvas.height) {
        confetti[i].y = -10;
        confetti[i].x = Math.random() * canvas.width;
      }
    }
  }

  const confettiInterval = setInterval(updateConfetti, 20);
  setTimeout(() => {
    clearInterval(confettiInterval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 5000);
}

// Generate 300 sticky notes and animate any gallery images present on page load
window.addEventListener('load', function() {
  // Generate sticky notes for Section 2
  const container = document.getElementById('sticky-notes-container');
  const reasons = [
    "Reason 1: Your kindness lights up my world.",
    "Reason 2: Your smile makes every day brighter.",
    "Reason 3: You are incredibly caring.",
    "Reason 4: Your laughter is contagious.",
    "Reason 5: We share hobbies together.",
    "Reason 6: Your creativity amazes me.",
    "Reason 7: You are my constant support.",
    "Reason 8: Your intelligence inspires me.",
    "Reason 9: Your heart is pure and loving.",
    "Reason 10: We say the same thing at the same time often.",
    "Reason 11: You always make me laugh.",
    "Reason 12: Your butt is super nice.",
    "Reason 13: I can be myself with you.",
    "Reason 14: You are such a great mother.",
    "Reason 15: You bring joy to my life.",
    "Reason 16: You are my support.",
    "Reason 17: Your optimism lifts me up.",
    "Reason 18: Your honesty means the world.",
    "Reason 19: You are my rock.",
    "Reason 20: Your spirit is beautiful.",
    "Reason 21: You work hard to be the best of yourself.",
    "Reason 22: Your love is unconditional.",
    "Reason 23: You make me a better person.",
    "Reason 24: Your charm is irresistible.",
    "Reason 25: You make me a happier person.",
    "Reason 26: Your energy is contagious.",
    "Reason 27: You push me to want to be the best of myself.",
    "Reason 28: We can dance and sing together in the kitchen like no one is watching.",
    "Reason 29: You also love to embarrass the kids.",
    "Reason 30: Your presence is my peace.",
    "Reason 31: You love your family so much.",
    "Reason 32: You light up the darkest days.",
    "Reason 33: Your way to show love is by giving.",
    "Reason 34: You inspire my every moment.",
    "Reason 35: You make life sparkle.",
    "Reason 36: Your heart overflows with love.",
    "Reason 37: You are my greatest adventure.",
    "Reason 38: Your words always comfort me.",
    "Reason 39: Your eyes hold endless wonder.",
    "Reason 40: You are my forever inspiration.",
    "Reason 41: Your love is my greatest gift.",
    "Reason 42: You make every moment special.",
    "Reason 43: Your energy brightens my day.",
    "Reason 44: You fill my life with joy.",
    "Reason 45: Your love is my inspiration.",
    "Reason 46: You make my heart sing.",
    "Reason 47: Your spirit is my light.",
    "Reason 48: You are my true north.",
    "Reason 49: You bring magic to my life.",
    "Reason 50: I cherish every moment with you."
  ];
  
  for (let i = 0; i < 300; i++) {
    let note = document.createElement('div');
    note.className = 'sticky-note';
    let left = Math.random() * 90;
    let top = 20 + Math.random() * 60;
    let rotate = (Math.random() * 10 - 5).toFixed(1) + "deg";
    let delay = (0.2 + Math.random() * 5.3).toFixed(1) + "s";
    note.style.left = left + '%';
    note.style.top = top + '%';
    note.style.setProperty('--rotate', rotate);
    note.style.animationDelay = delay;
    note.innerHTML = "<p>" + reasons[i % 50] + "</p>";
    container.appendChild(note);
  }

  // Animate any gallery images already visible on page load
  document.querySelectorAll('.gallery').forEach(gallery => {
    const images = gallery.querySelectorAll('.memory');
    images.forEach((img, index) => {
      img.style.animationDelay = `${index * 0.2}s`;
      img.classList.add('fall-in');
    });
  });
});

// Start the journey: play music and transition to Section 2
document.getElementById('startBtn').addEventListener('click', function() {
  const bgMusic = document.getElementById('bgMusic');
  bgMusic.play();
  showSection('section2');
});

// Handle "Next" button transitions between sections
document.querySelectorAll('.nextBtn').forEach(button => {
  button.addEventListener('click', function() {
    const nextId = this.getAttribute('data-next');
    showSection(nextId);
  });
});

// Final acceptance in Section 5: trigger confetti and then show Section 6 (final sweet message)
document.getElementById('finalBtn').addEventListener('click', function() {
  launchConfetti();
  setTimeout(() => {
    showSection('section6');
  }, 1500);
});
