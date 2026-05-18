// ===== Fix scroll on refresh =====
window.addEventListener("load", () => {
  if (window.location.hash) {
    history.replaceState(null, document.title, window.location.pathname);
    window.scrollTo(0, 0);
  }
});

// ===== DOM Ready =====
document.addEventListener("DOMContentLoaded", () => {

  // --- Mobile Menu ---
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => navLinks.classList.toggle("active"));
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => navLinks.classList.remove("active"));
    });
  }

  // --- Active Nav Highlight ---
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-links a[data-section]");

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(a => a.classList.remove("active"));
        const active = document.querySelector(`.nav-links a[data-section="${entry.target.id}"]`);
        if (active) active.classList.add("active");
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => navObserver.observe(s));

  // --- Scroll Animations ---
  const animatedEls = document.querySelectorAll(
    ".highlight-card, .skill-card, .project-card, .contact-card, .about-text, .section-title"
  );
  animatedEls.forEach((el, i) => {
    el.classList.add("fade-hidden");
    el.style.transitionDelay = (i % 4) * 0.1 + "s";
  });

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-visible");
        scrollObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: "0px 0px -40px 0px" });

  animatedEls.forEach(el => scrollObserver.observe(el));

  // --- Typewriter ---
  const twEl = document.getElementById("typewriter");
  if (twEl) {
    const texts = ["Full-Stack Developer", "Software Engineer" , "Clean Code Advocate"];
    let ti = 0, ci = 0, deleting = false;

    function type() {
      const cur = texts[ti];
      twEl.textContent = deleting ? cur.slice(0, ci - 1) : cur.slice(0, ci + 1);
      deleting ? ci-- : ci++;
      let delay = deleting ? 50 : 90;
      if (!deleting && ci === cur.length) { delay = 1800; deleting = true; }
      else if (deleting && ci === 0) { deleting = false; ti = (ti + 1) % texts.length; delay = 400; }
      setTimeout(type, delay);
    }
    type();
  }

});

// ===== Particles =====
(function () {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const COUNT = 90, DIST = 150, COLOR = "20, 184, 166";
  let particles = [], animId;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function init() {
    particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 1,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < DIST) {
          ctx.strokeStyle = `rgba(${COLOR}, ${(1 - d / DIST) * 0.25})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${COLOR}, 0.5)`;
      ctx.fill();
    });
    animId = requestAnimationFrame(draw);
  }

  window.addEventListener("resize", () => {
    cancelAnimationFrame(animId);
    resize(); init(); draw();
  });

  resize(); init(); draw();
})();

// ===== Scroll to Top =====
(function () {
  const btn = document.getElementById("scroll-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 400);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();