document.addEventListener("DOMContentLoaded", () => {
  // --- Initialize Dynamic Typography (Typing Effect) ---
  initTypewriter();

  // --- Initialize Network Background Canvas ---
  initNetworkCanvas();

  // --- Initialize Scroll Reveals & Active Nav Tracking ---
  initScrollObservers();

  // --- Initialize Mobile Navigation Menu ---
  initMobileMenu();

  // --- Initialize Project Modals ---
  initProjectModals();

  // --- Initialize Skills Progress Trigger ---
  initSkillsTrigger();

  // --- Initialize Contact Form Handler ---
  initContactForm();
});

/* ==========================================
   Typewriter Effect
   ========================================== */
function initTypewriter() {
  const typedSpan = document.querySelector(".typed-text");
  if (!typedSpan) return;

  const words = ["Cloud Engineer", "DevOps Enthusiast", "Infrastructure Builder", "Linux SysAdmin"];
  const typingSpeed = 100;
  const erasingSpeed = 60;
  const newWordDelay = 2000; // Delay between words
  let wordIndex = 0;
  let charIndex = 0;
  let isErasing = false;

  function type() {
    const currentWord = words[wordIndex];
    if (isErasing) {
      typedSpan.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isErasing = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
      } else {
        setTimeout(type, erasingSpeed);
      }
    } else {
      typedSpan.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentWord.length) {
        isErasing = true;
        setTimeout(type, newWordDelay);
      } else {
        setTimeout(type, typingSpeed);
      }
    }
  }

  // Start typewriter
  setTimeout(type, 1000);
}

/* ==========================================
   Network Packet Canvas Animation
   ========================================== */
function initNetworkCanvas() {
  const canvas = document.getElementById("network-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = canvas.parentElement.offsetWidth);
  let height = (canvas.height = canvas.parentElement.offsetHeight);

  const particles = [];
  // Reduce density for mobile screens
  const particleCount = window.innerWidth < 768 ? 25 : 55;
  const connectionDistance = 110;

  // Particle Class
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 2 + 1.5;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off walls
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.fill();
    }
  }

  // Populate particles array
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Animation Loop
  function animate() {
    // Only animate if the hero is in view to conserve resources
    const rect = canvas.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      ctx.clearRect(0, 0, width, height);

      // Draw connections first (layering)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            // Linear opacity mapping
            const alpha = (1 - dist / connectionDistance) * 0.12;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
    }

    requestAnimationFrame(animate);
  }

  // Handle Resize
  window.addEventListener("resize", () => {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  });

  animate();
}

/* ==========================================
   Scroll Observers (Reveal & Nav Tracking)
   ========================================== */
function initScrollObservers() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");
  const header = document.querySelector("header");

  // Style Header on Scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Reveal Animations on scroll
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target); // Trigger once
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // Active Link Tracker based on section viewport position
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentId}`) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    { threshold: 0.4 } // Trigger when section occupies 40% of viewport
  );

  sections.forEach((sec) => navObserver.observe(sec));
}

/* ==========================================
   Mobile Nav Menu
   ========================================== */
function initMobileMenu() {
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  const navLinksList = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");

  if (!mobileBtn || !navLinksList) return;

  function toggleMenu() {
    navLinksList.classList.toggle("active");
    // Change icon between burger and X
    const icon = mobileBtn.querySelector("i");
    if (icon) {
      if (navLinksList.classList.contains("active")) {
        icon.className = "lucide-x";
        lucide.createIcons(); // refresh icons
      } else {
        icon.className = "lucide-menu";
        lucide.createIcons();
      }
    }
  }

  mobileBtn.addEventListener("click", toggleMenu);

  // Close menu when clicking link
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (navLinksList.classList.contains("active")) {
        toggleMenu();
      }
    });
  });
}

/* ==========================================
   Project Modals
   ========================================== */
function initProjectModals() {
  const projectCards = document.querySelectorAll(".project-card");
  const modalOverlay = document.getElementById("project-modal");
  const modalClose = document.getElementById("modal-close");

  if (!modalOverlay || !modalClose) return;

  // Open modal clicking card
  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      const projectId = card.getAttribute("data-id");
      const projectData = PROJECTS_DATA.find((p) => p.id === projectId);

      if (projectData) {
        populateModal(projectData);
        modalOverlay.classList.add("active");
        document.body.style.overflow = "hidden"; // disable background scroll
      }
    });
  });

  // Close modal clicking X
  modalClose.addEventListener("click", closeModal);

  // Close modal clicking outside content container
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Close modal on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeModal();
    }
  });

  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  function populateModal(data) {
    const headerTag = modalOverlay.querySelector(".modal-header-tag");
    const title = modalOverlay.querySelector(".modal-title");
    const subtitle = modalOverlay.querySelector(".modal-subtitle");
    const fullDesc = modalOverlay.querySelector(".modal-full-desc");
    const highlightsList = modalOverlay.querySelector(".modal-highlights-list");
    const techTagsContainer = modalOverlay.querySelector(".modal-tech-tags");

    // Populate standard text
    headerTag.textContent = data.category;
    title.textContent = data.title;
    subtitle.textContent = data.subtitle;
    fullDesc.textContent = data.fullDescription;

    // Populate highlights list
    highlightsList.innerHTML = "";
    data.highlights.forEach((hl) => {
      const li = document.createElement("li");
      li.textContent = hl;
      highlightsList.appendChild(li);
    });

    // Populate technical tags
    techTagsContainer.innerHTML = "";
    data.techStack.forEach((tech) => {
      const tag = document.createElement("span");
      tag.className = "modal-tag";
      tag.textContent = tech;
      techTagsContainer.appendChild(tag);
    });
  }
}

/* ==========================================
   Skills Trigger (Progress Bar Animation)
   ========================================== */
function initSkillsTrigger() {
  const skillsSection = document.getElementById("skills");
  if (!skillsSection) return;

  const progressBars = document.querySelectorAll(".progress-bar-fill");

  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate progress bars to their respective values
          progressBars.forEach((bar) => {
            const widthValue = bar.getAttribute("data-width");
            bar.style.width = widthValue;
          });
          // Unobserve section once animations trigger
          skillsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  skillsObserver.observe(skillsSection);
}

/* ==========================================
   Contact Form Validation & Mock Submit
   ========================================== */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const successFeedback = document.getElementById("feedback-success");
  const errorFeedback = document.getElementById("feedback-error");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Clear previous feedback
    successFeedback.style.display = "none";
    errorFeedback.style.display = "none";

    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const subject = document.getElementById("contact-subject").value.trim();
    const message = document.getElementById("contact-message").value.trim();
    const submitBtn = form.querySelector('button[type="submit"]');

    // Simple fields validation
    if (!name || !email || !subject || !message) {
      showError("Please fill out all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      showError("Please enter a valid email address.");
      return;
    }

    // Toggle button loading state
    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="lucide-loader-2 animate-spin"></i> Sending...';
    lucide.createIcons(); // refresh loader spin icon

    // Mock API request delay
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
      lucide.createIcons();

      // Show success feedback and clear form
      successFeedback.style.display = "block";
      successFeedback.textContent = `Thank you, ${name}! Your message has been sent successfully. Midhun will respond shortly.`;
      form.reset();
    }, 1800);
  });

  function showError(msg) {
    errorFeedback.style.display = "block";
    errorFeedback.textContent = msg;
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}
