"use strict";

/* ===============================
   ABY Portfolio - script.js
   Vanilla JavaScript
================================ */

document.addEventListener("DOMContentLoaded", () => {
  initNavbarScroll();
  initActiveNavigation();
  initScrollReveal();
  initScrollProgress();
  initBackToTop();
  initTypingEffect();
  initIntro();

initMouseGlow();
});

/* ===============================
   NAVBAR SCROLL EFFECT
================================ */

function initNavbarScroll() {
  const header = document.querySelector(".site-header");

  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll);
}

/* ===============================
   ACTIVE NAVIGATION
================================ */

function initActiveNavigation() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: "-45% 0px -50% 0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const currentId = entry.target.getAttribute("id");

      navLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentId}`) {
          link.classList.add("active");
        }
      });
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

/* ===============================
   SCROLL REVEAL
================================ */

function initScrollReveal() {
  const revealItems = document.querySelectorAll(
    ".section-header, .about-text, .info-card, .skill-card, .project-card, .blog-card, .contact-box"
  );

  if (!revealItems.length) return;

  revealItems.forEach((item, index) => {
    item.classList.add("reveal");
    item.style.transitionDelay = `${Math.min(index * 60, 240)}ms`;
  });

  const observerOptions = {
    root: null,
    threshold: 0.12,
    rootMargin: "0px 0px -80px 0px",
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    });
  }, observerOptions);

  revealItems.forEach((item) => revealObserver.observe(item));
}

/* ===============================
   SCROLL PROGRESS BAR
================================ */

function initScrollProgress() {
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  document.body.appendChild(progressBar);

  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (docHeight <= 0) {
      progressBar.style.width = "0%";
      return;
    }

    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${progress}%`;
  };

  updateProgress();
  window.addEventListener("scroll", updateProgress);
}

/* ===============================
   BACK TO TOP BUTTON
================================ */

function initBackToTop() {
  const backToTop = document.createElement("button");
  backToTop.className = "back-to-top";
  backToTop.setAttribute("type", "button");
  backToTop.setAttribute("aria-label", "Yukarı çık");
  backToTop.innerHTML = "↑";

  document.body.appendChild(backToTop);

  const toggleButton = () => {
    if (window.scrollY > 500) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  };

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  toggleButton();
  window.addEventListener("scroll", toggleButton);
}
/* ===============================
   TYPING EFFECT
================================ */

function initTypingEffect() {
  const heading = document.querySelector(".profile-info p");

  if (!heading) return;

  const words = [
    "IT Specialist",
    "System Administrator",
    "Frontend Developer",
    "IT Support"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const currentWord = words[wordIndex];

    if (!deleting) {
      heading.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentWord.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      heading.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        deleting = false;
        wordIndex++;

        if (wordIndex >= words.length) {
          wordIndex = 0;
        }
      }
    }

    setTimeout(type, deleting ? 45 : 90);
  }

  type();
}

/* ===============================
   PARALLAX HERO
================================ */

window.addEventListener("mousemove", (e) => {
  const card = document.querySelector(".profile-card");

  if (!card) return;

  const x = (window.innerWidth / 2 - e.clientX) / 40;
  const y = (window.innerHeight / 2 - e.clientY) / 40;

  card.style.transform =
    `rotateY(${-x}deg) rotateX(${y}deg)`;
});

window.addEventListener("mouseleave", () => {
  const card = document.querySelector(".profile-card");

  if (!card) return;

  card.style.transform =
    "rotateY(0deg) rotateX(0deg)";
});

/* ===============================
   BUTTON RIPPLE EFFECT
================================ */

const buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {
  button.addEventListener("click", function (e) {

    const circle = document.createElement("span");

    const diameter = Math.max(
      this.clientWidth,
      this.clientHeight
    );

    circle.style.width = diameter + "px";
    circle.style.height = diameter + "px";

    circle.style.left =
      e.clientX -
      this.getBoundingClientRect().left -
      diameter / 2 +
      "px";

    circle.style.top =
      e.clientY -
      this.getBoundingClientRect().top -
      diameter / 2 +
      "px";

    circle.classList.add("ripple");

    const ripple = this.querySelector(".ripple");

    if (ripple) {
      ripple.remove();
    }

    this.appendChild(circle);
  });
});

/* ===============================
   SMOOTH APPEAR
================================ */

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

/* ===============================
   CONSOLE MESSAGE
================================ */



function initMouseGlow() {
  const glow = document.createElement("div");
  glow.className = "mouse-glow";
  document.body.appendChild(glow);

  window.addEventListener("mousemove", (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}


function initIntro(){

    const intro=document.getElementById("intro");
    const logo=document.querySelector(".intro-logo");

    window.addEventListener("load",()=>{

        setTimeout(()=>{

            logo.classList.add("hide");

        },1700);

        setTimeout(()=>{

            intro.classList.add("hide");

        },2300);

    });

}