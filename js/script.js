function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (overlay) {
    overlay.onclick = function() {
      sidebar.classList.remove('open');
    };
  }
});

// Cosmic Star Field Background
const canvas = document.getElementById("stars-canvas");
const ctx = canvas.getContext("2d");

// Shooting Stars
const shootingStars = [];

function createShootingStar() {
  if (Math.random() < 0.02) {
    // 2% chance per frame
    shootingStars.push({
      x: Math.random() * canvas.width,
      y: (Math.random() * canvas.height) / 2,
      length: Math.random() * 80 + 50,
      speed: Math.random() * 5 + 6,
      angle: Math.PI / 4,
      opacity: 1,
    });
  }
}

function drawShootingStars() {
  shootingStars.forEach((star, index) => {
    const xEnd = star.x + star.length * Math.cos(star.angle);
    const yEnd = star.y + star.length * Math.sin(star.angle);

    ctx.beginPath();
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(xEnd, yEnd);
    ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Move the shooting star
    star.x += star.speed * Math.cos(star.angle);
    star.y += star.speed * Math.sin(star.angle);
    star.opacity -= 0.02;

    // Remove when fully faded
    if (star.opacity <= 0) {
      shootingStars.splice(index, 1);
    }
  });
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const stars = [];
const STAR_COLORS = [
  [255, 255, 255], // white
  [200, 220, 255], // blueish
  [255, 244, 200], // yellowish
  [255, 220, 220], // reddish
];

for (let i = 0; i < 200; i++) {
  const color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 1.8 + 0.5, // varied star sizes
    speed: Math.random() * 0.3 + 0.1, // more parallax
    opacity: Math.random() * 0.7 + 0.3,
    baseOpacity: Math.random() * 0.7 + 0.3,
    color,
    twinkleSpeed: Math.random() * 0.03 + 0.01,
    twinklePhase: Math.random() * Math.PI * 2,
  });
}

function drawStars() {
  stars.forEach((star) => {
    ctx.save();
    ctx.beginPath();
    const [r, g, b] = star.color;
    const gradient = ctx.createRadialGradient(
      star.x,
      star.y,
      0,
      star.x,
      star.y,
      star.size
    );
    gradient.addColorStop(0, `rgba(${r},${g},${b},${star.opacity})`);
    gradient.addColorStop(0.4, `rgba(${r},${g},${b},${star.opacity * 0.4})`);
    gradient.addColorStop(1, "transparent");
    ctx.fillStyle = gradient;
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    // Occasional flare
    if (star.flare && Math.random() < 0.01) {
      ctx.save();
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},0.5)`;
      ctx.shadowColor = `rgba(${r},${g},${b},0.8)`;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.restore();
    }
  });
}

function moveStars() {
  stars.forEach((star) => {
    star.y += star.speed;
    // Twinkle: vary opacity and size
    star.opacity =
      star.baseOpacity +
      Math.sin(performance.now() * star.twinkleSpeed + star.twinklePhase) *
        0.25;
    star.opacity = Math.max(0.2, Math.min(1, star.opacity));
    star.size +=
      Math.sin(performance.now() * star.twinkleSpeed + star.twinklePhase) *
      0.01;
    star.size = Math.max(0.4, Math.min(2.5, star.size));
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
}

// Add cosmic nebula clouds
function drawNebula() {
  for (let i = 0; i < 3; i++) {
    const nebulaX =
      canvas.width * (0.2 + 0.3 * i) +
      Math.sin(performance.now() / (4000 + i * 1000)) * 80;
    const nebulaY =
      canvas.height * (0.2 + 0.2 * i) +
      Math.cos(performance.now() / (3000 + i * 1200)) * 60;
    const nebulaGradient = ctx.createRadialGradient(
      nebulaX,
      nebulaY,
      0,
      nebulaX,
      nebulaY,
      180 + i * 40
    );
    nebulaGradient.addColorStop(0, "rgba(120, 80, 255, 0.18)");
    nebulaGradient.addColorStop(0.3, "rgba(80, 200, 255, 0.10)");
    nebulaGradient.addColorStop(0.7, "rgba(255, 120, 255, 0.07)");
    nebulaGradient.addColorStop(1, "transparent");
    ctx.save();
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.arc(nebulaX, nebulaY, 180 + i * 40, 0, Math.PI * 2);
    ctx.fillStyle = nebulaGradient;
    ctx.fill();
    ctx.restore();
  }
}

// Add cosmic dust (tiny, fast-moving particles)
const dustParticles = [];
for (let i = 0; i < 60; i++) {
  dustParticles.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.2 + 0.5, // larger dust
    speed: Math.random() * 1.2 + 0.5,
    alpha: Math.random() * 0.5 + 0.3, // more opaque
  });
}
function drawDust() {
  dustParticles.forEach((d) => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${d.alpha})`;
    ctx.fill();
    ctx.restore();
    d.x += d.speed;
    if (d.x > canvas.width) {
      d.x = 0;
      d.y = Math.random() * canvas.height;
    }
  });
}

// Add a pulsing galactic core at the center
function drawGalacticCore() {
  const coreX = canvas.width / 2;
  const coreY = canvas.height / 2;
  const pulse = 40 + Math.sin(performance.now() / 700) * 10;
  const gradient = ctx.createRadialGradient(
    coreX,
    coreY,
    0,
    coreX,
    coreY,
    pulse
  );
  gradient.addColorStop(0, "rgba(255,255,255,0.18)");
  gradient.addColorStop(0.3, "rgba(255,200,255,0.10)");
  gradient.addColorStop(0.7, "rgba(120,80,255,0.08)");
  gradient.addColorStop(1, "transparent");
  ctx.save();
  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  ctx.arc(coreX, coreY, pulse, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.restore();
}

// Spacy, subtle ripple effect for cosmic theme
let ripples = [];
window.addEventListener("mousemove", function (e) {
  const rect = canvas.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
  const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
  ripples.push({
    x,
    y,
    radius: 0,
    maxRadius: 48 + Math.random() * 22,
    alpha: 0.13 + Math.random() * 0.07,
    colorStops: [
      { stop: 0, color: "rgba(255,255,255,0.18)" },
      { stop: 0.4, color: "rgba(120,180,255,0.10)" },
      { stop: 0.8, color: "rgba(120,80,255,0.06)" },
      { stop: 1, color: "rgba(0,0,0,0)" },
    ],
  });
});

function drawRipples() {
  for (let i = ripples.length - 1; i >= 0; i--) {
    const r = ripples[i];
    ctx.save();
    const gradient = ctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, r.radius);
    r.colorStops.forEach((cs) => gradient.addColorStop(cs.stop, cs.color));
    ctx.globalAlpha = r.alpha;
    ctx.beginPath();
    ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.shadowColor = "rgba(120,80,255,0.10)";
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.restore();
    r.radius += 2.1;
    r.alpha *= 0.98;
    if (r.radius > r.maxRadius || r.alpha < 0.02) {
      ripples.splice(i, 1);
    }
  }
}

// Update animation loop to exclude comet
function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawNebula();
  drawGalacticCore();
  drawStars();
  drawDust();
  moveStars();
  createShootingStar();
  drawShootingStars();
  drawRipples();
  requestAnimationFrame(animateStars);
}

animateStars();

// Sidebar close on outside click
function closeSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (sidebar.classList.contains("open")) {
    sidebar.classList.remove("open");
  }
}

document.addEventListener("click", function (e) {
  const sidebar = document.getElementById("sidebar");
  const hamburger = document.querySelector(".hamburger");
  if (!sidebar.classList.contains("open")) return;
  if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
    closeSidebar();
  }
});
