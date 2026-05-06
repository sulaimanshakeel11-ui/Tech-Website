const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".nav-menu a, .nav-cta");
const form = document.querySelector(".contact-form");

function refreshIcons() {
  if (window.lucide) {
    lucide.createIcons();
  }
}

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 14);
}

function closeMenu() {
  document.body.classList.remove("menu-open");
  header.classList.remove("menu-active");
  menuToggle.setAttribute("aria-expanded", "false");
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

menuToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("menu-active");
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = form.querySelector("button");
  button.innerHTML = 'Inquiry Sent <i data-lucide="check"></i>';
  refreshIcons();
});

refreshIcons();
