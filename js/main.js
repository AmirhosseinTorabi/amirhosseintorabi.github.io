// js/main.js

(function () {
  const STORAGE_KEY = "theme"; // "light" | "dark"
  const toggleBtn = document.getElementById("theme-toggle");

  if (!toggleBtn) return;

  // ---- Helpers
  const setTheme = (theme) => {
    const isDark = theme === "dark";
    document.body.classList.toggle("dark", isDark);
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
    toggleBtn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  };

  const getPreferredTheme = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;

    // If nothing saved, use system preference
    const prefersDark = window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    return prefersDark ? "dark" : "light";
  };

  // ---- Init
  setTheme(getPreferredTheme());

  // ---- Toggle
  toggleBtn.addEventListener("click", () => {
    const isCurrentlyDark = document.body.classList.contains("dark");
    const nextTheme = isCurrentlyDark ? "light" : "dark";
    localStorage.setItem(STORAGE_KEY, nextTheme);
    setTheme(nextTheme);
  });

  // Optional: react to system theme changes if user hasn't chosen manually
  const media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  if (media) {
    media.addEventListener("change", (e) => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "light" || saved === "dark") return; // user chose manually
      setTheme(e.matches ? "dark" : "light");
    });
  }
})();
// ===== Fix initial scroll on refresh =====
window.addEventListener("load", () => {
  if (window.location.hash) {
    history.replaceState(
      null,
      document.title,
      window.location.pathname + window.location.search
    );
    window.scrollTo(0, 0);
  }
});
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    // auto close on link click
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }
});
