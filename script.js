const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".nav-menu a, .nav-cta");
const form = document.querySelector(".contact-form");
const revealElements = document.querySelectorAll(
  ".section-header, .about-upper-copy, .about-tech-card, .value-card, .service-card, .contact-copy, .contact-form"
);

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

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -70px 0px",
    }
  );

  revealElements.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 80}ms`);
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}

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
