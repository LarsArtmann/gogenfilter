const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  const lightIcon = themeToggle.querySelector(".theme-icon-light");
  const darkIcon = themeToggle.querySelector(".theme-icon-dark");
  const themeColorMetas = document.querySelectorAll('meta[name="theme-color"]');

  function applyTheme() {
    const isLight = document.documentElement.dataset.theme === "light";
    if (lightIcon) lightIcon.classList.toggle("hidden", !isLight);
    if (darkIcon) darkIcon.classList.toggle("hidden", isLight);
    themeToggle.setAttribute("aria-pressed", String(isLight));
    const color = isLight ? "#fafaf9" : "#0c0a09";
    themeColorMetas.forEach((m) => m.setAttribute("content", color));
  }

  applyTheme();

  themeToggle.addEventListener("click", () => {
    const isLight = document.documentElement.dataset.theme !== "light";
    document.documentElement.dataset.theme = isLight ? "light" : "dark";
    localStorage.setItem("starlight-theme", isLight ? "light" : "dark");
    applyTheme();
  });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    var stored = localStorage.getItem("starlight-theme") || localStorage.getItem("theme");
    if (!stored || stored === "auto") {
      const isLight = !e.matches;
      document.documentElement.dataset.theme = isLight ? "light" : "dark";
      applyTheme();
    }
  });
}

const toggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");
if (toggle && navLinks) {
  const menuIcon = toggle.querySelector(".menu-icon");
  const closeIcon = toggle.querySelector(".close-icon");

  toggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    if (menuIcon) menuIcon.classList.toggle("hidden", isOpen);
    if (closeIcon) closeIcon.classList.toggle("hidden", !isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      if (menuIcon) menuIcon.classList.remove("hidden");
      if (closeIcon) closeIcon.classList.add("hidden");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}
