// Small helpers for the portfolio: theme toggle, mobile menu, footer year.
(function () {
  var root = document.documentElement;

  // ---------- 1. Light / dark theme toggle ----------
  var themeBtn = document.querySelector(".theme-toggle");

  function updateThemeButton() {
    var isDark = root.getAttribute("data-theme") === "dark";
    themeBtn.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  }

  themeBtn.hidden = false; // only shown when JavaScript works
  updateThemeButton();

  themeBtn.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    updateThemeButton();
  });

  // ---------- 2. Mobile menu ----------
  var menuBtn = document.querySelector(".menu-toggle");
  var nav = document.getElementById("primary-nav");

  function setMenu(open) {
    nav.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  menuBtn.addEventListener("click", function () {
    setMenu(!nav.classList.contains("open"));
  });

  // Close the menu after choosing a link
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });

  // Close the menu with the Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      setMenu(false);
      menuBtn.focus();
    }
  });

  // ---------- 3. Footer year ----------
  document.getElementById("year").textContent = new Date().getFullYear();
})();
