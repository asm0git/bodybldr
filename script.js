// BODYBLDR - a fitness website for lifters and gymgoers.
// In partial fulfillment of the requirements for Introduction to Web Programming for Computer Science (6WEBCS)
// Author: Aerith Catap | Block: CS-201 | Date: October 21, 2025
// Submitted to: Mr. Chris Almocera

// ==========================================
// COVER SECTION - Rotating quotes & images
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const cover = document.querySelector("#cover");
  const content = document.querySelector(".cover-content");
  const title = document.querySelector("#cover-title");

  const titles = [
    `<span class="medium">Your</span> <span class="extrabold">body</span>,<br><span class="medium">your</span> <span class="extrabold"> blueprint.</span>`,
    `<span class="extrabold">Muscle is earned,</span><br><span class="medium">not gifted.</span>`,
    `<span class="extrabold">Train</span> <span class="medium">smarter</span>,<br><span class="medium">grow</span> <span class="extrabold">stronger.</span>`
  ];

  const images = [
    "assets/arnold.png",
    "assets/cbum.png",
    "assets/ronnie.png"
  ];

  let index = 0;

  // Initial fade-in
  setTimeout(() => {
    cover.style.backgroundImage = `url(${images[index]})`;
    title.innerHTML = titles[index];
    content.classList.add("visible");
  }, 800);

  // Cycle every 6 seconds
  setInterval(() => {
    index = (index + 1) % images.length;
    
    title.style.opacity = '0';
    setTimeout(() => {
      title.innerHTML = titles[index];
      title.style.opacity = '1';
    }, 400);

    cover.style.backgroundImage = `url(${images[index]})`;
  }, 6000);

  // Desktop: dim/brighten on hover
  if (window.innerWidth >= 1025) {
    cover.addEventListener("mouseenter", () => cover.classList.remove("dimmed"));
    cover.addEventListener("mouseleave", () => cover.classList.add("dimmed"));
    cover.classList.add("dimmed");
  }

  // Tablet/Mobile: dim when scrolled past
  if (window.innerWidth < 1025) {
    window.addEventListener("scroll", () => {
      const rect = cover.getBoundingClientRect();
      if (rect.bottom < window.innerHeight * 0.5) {
        cover.classList.add("dimmed");
      } else {
        cover.classList.remove("dimmed");
      }
    });
  }
});

// ==========================================
// TRAINING SECTION - Scroll animations & dimming
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const training = document.querySelector('#training');
  const trainingPhases = document.querySelectorAll('.training-phase');
  
  // Desktop: dim/brighten on hover
  if (training && window.innerWidth >= 1025) {
    training.addEventListener('mouseenter', () => training.classList.remove('dimmed'));
    training.addEventListener('mouseleave', () => training.classList.add('dimmed'));
    training.classList.add('dimmed');
  }

  // Tablet/Mobile: dim when out of view
  if (training && window.innerWidth < 1025) {
    window.addEventListener('scroll', () => {
      const rect = training.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) {
        training.classList.add('dimmed');
      } else {
        training.classList.remove('dimmed');
      }
    });
  }

  // Staggered fade-in for training phases
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 200);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  });
  
  trainingPhases.forEach(phase => observer.observe(phase));
});

// ==========================================
// NUTRITION SECTION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const nutritionSection = document.querySelector('.nutrition-section');
  
  // Desktop: dim/brighten on hover
  if (nutritionSection && window.innerWidth >= 1025) {
    nutritionSection.addEventListener("mouseenter", () => nutritionSection.classList.remove("dimmed"));
    nutritionSection.addEventListener("mouseleave", () => nutritionSection.classList.add("dimmed"));
    nutritionSection.classList.add("dimmed");
  }

  // Tablet/Mobile: dim when out of view
  if (nutritionSection && window.innerWidth < 1025) {
    window.addEventListener('scroll', () => {
      const rect = nutritionSection.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) {
        nutritionSection.classList.add('dimmed');
      } else {
        nutritionSection.classList.remove('dimmed');
      }
    });
  }

  // Macro carousel
  const macroImg = document.getElementById("macro-image");
  const macroText = document.getElementById("macro-text");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  const macroModes = [
    { label: "Maintenance", src: "assets/maintenance_macro.png" },
    { label: "Fat loss",    src: "assets/fatloss_macro.png" },
    { label: "Muscle gain", src: "assets/bulking_macro.png" },
  ];
  let macroIndex = 0;

  function applyMacro() {
    if (!macroImg || !macroText) return;
    
    macroImg.style.opacity = "0";
    macroText.style.opacity = "0";
    
    setTimeout(() => {
      const mode = macroModes[macroIndex];
      macroImg.src = mode.src;
      macroText.textContent = mode.label;
      
      const fadeIn = () => {
        macroImg.style.opacity = "1";
        macroText.style.opacity = "1";
      };
      
      if (macroImg.complete) {
        requestAnimationFrame(fadeIn);
      } else {
        macroImg.onload = fadeIn;
      }
    }, 160);
  }

  prevBtn?.addEventListener("click", () => {
    macroIndex = (macroIndex + macroModes.length - 1) % macroModes.length;
    applyMacro();
  });
  
  nextBtn?.addEventListener("click", () => {
    macroIndex = (macroIndex + 1) % macroModes.length;
    applyMacro();
  });

  // Food choice cards: show examples on hover
  const foodLists = {
    protein: ["Chicken breast", "Eggs", "Fish (tuna, salmon)", "Lean beef", "Greek yogurt"],
    carbohydrates: ["Rice", "Oats", "Sweet potatoes", "Whole-grain bread", "Bananas"],
    fats: ["Avocado", "Olive oil", "Nuts", "Peanut butter", "Chia seeds"],
  };

  document.querySelectorAll(".nutrition-food-choice-container").forEach((card) => {
    const titleEl = card.querySelector("h5");
    const pEl = card.querySelector("p");
    if (!titleEl || !pEl) return;

    const titleText = titleEl.textContent.trim().toLowerCase();
    const originalHTML = pEl.innerHTML;

    card.addEventListener("mouseenter", () => {
      const list = foodLists[titleText];
      if (list) pEl.innerHTML = list.join("<br>");
    });

    card.addEventListener("mouseleave", () => {
      pEl.innerHTML = originalHTML;
    });
  });
});

// ==========================================
// FACTS & FAQs SECTION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const factsFaqsSection = document.querySelector('#facts-faqs');
  const qaItems = document.querySelectorAll("#facts-faqs .qa-item");

  // Desktop: dim/brighten on hover
  if (factsFaqsSection && window.innerWidth >= 1025) {
    factsFaqsSection.addEventListener("mouseenter", () => factsFaqsSection.classList.remove("dimmed"));
    factsFaqsSection.addEventListener("mouseleave", () => factsFaqsSection.classList.add("dimmed"));
    factsFaqsSection.classList.add("dimmed");
  }

  // Tablet/Mobile: dim when out of view
  if (factsFaqsSection && window.innerWidth < 1025) {
    window.addEventListener('scroll', () => {
      const rect = factsFaqsSection.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) {
        factsFaqsSection.classList.add("dimmed");
      } else {
        factsFaqsSection.classList.remove("dimmed");
      }
    });
  }

  // QA item click interactions
  const contentMap = [
    { type: "fact", default: "Skipping one workout ruins everything.", clicked: "One missed day won't matter. What counts is showing up again the next time." },
    { type: "faq", default: "How often should I work out?", clicked: "Start with 3–4 days a week, giving your muscles time to rest and recover between sessions." },
    { type: "fact", default: "Lifting is only for men.", clicked: "Strength training benefits everyone — it builds confidence, posture, and overall health." },
    { type: "faq", default: "How long before I see progress?", clicked: "Most beginners notice progress in 4–8 weeks — stay consistent and it will show." },
    { type: "fact", default: "You should lose or gain weight before starting.", clicked: "You can start training at any stage. Exercise helps your body adapt — whether you're aiming to tone up, gain strength, or lose fat." },
    { type: "faq", default: "Do I need supplements right away?", clicked: "Not at all. Focus on real food, sleep, and consistency — supplements can come later." },
  ];

  qaItems.forEach((item, index) => {
    const textEl = item.querySelector(".qa-text");
    const arrowEl = item.querySelector(".qa-arrow img");
    const data = contentMap[index];
    let clicked = false;

    item.addEventListener("click", () => {
      clicked = !clicked;

      if (clicked) {
        const computedWidth = window.getComputedStyle(item).width;
        item.style.width = computedWidth;
        item.style.transform = "none";
        item.style.backgroundColor = "var(--clr-tertiary)";
        textEl.style.color = "var(--clr-main)";
        if (arrowEl) arrowEl.style.filter = "invert(1)";
        textEl.textContent = data.clicked;
      } else {
        item.style.width = "";
        item.style.backgroundColor = "var(--clr-secondary)";
        textEl.style.color = "var(--clr-tertiary)";
        if (arrowEl) arrowEl.style.filter = "invert(0)";
        textEl.textContent = data.default;
      }
    });
  });

  // Disable hover transform on tablet/mobile
  function disableHoverOnMobile() {
    const isMobile = window.matchMedia("(max-width: 1024px)").matches;
    qaItems.forEach(item => {
      if (isMobile) item.style.transform = "none";
    });
  }

  window.addEventListener("resize", disableHoverOnMobile);
  window.addEventListener("load", disableHoverOnMobile);
});

// ==========================================
// HEADER ANIMATIONS - Scroll-triggered directional slide
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const animatedHeaders = document.querySelectorAll("h3, h4");
  
  function updateHeaderPositions() {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight / 2;
    
    animatedHeaders.forEach(header => {
      const rect = header.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      const elementHeight = rect.height;
      
      const startScroll = elementTop - viewportHeight;
      const endScroll = elementTop - viewportCenter + (elementHeight / 2);
      
      let progress = (scrollY - startScroll) / (endScroll - startScroll);
      progress = Math.max(0, Math.min(1, progress));
      
      // Ease-in-out
      const eased = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      
      if (header.tagName === "H3") {
        const translateX = -100 + (100 * eased);
        header.style.transform = `translateX(${translateX}%)`;
      } else if (header.tagName === "H4") {
        const translateX = 100 - (100 * eased);
        header.style.transform = `translateX(${translateX}%)`;
      }
    });
  }
  
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateHeaderPositions();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
  
  updateHeaderPositions();
  window.addEventListener("resize", updateHeaderPositions, { passive: true });
});

// ==========================================
// FACTS & FAQS: Form validation
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("question-form-element");
  if (!form) return;

  const nameInput = document.getElementById("user-name");
  const emailInput = document.getElementById("user-email");
  const questionInput = document.getElementById("user-question");
  const successMessage = document.getElementById("success-message");
  const submitBtn = document.getElementById("submit-question-btn");

  function showError(input, errorId, message) {
    const errorEl = document.getElementById(errorId);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add("show");
    }
    if (input) {
      input.classList.add("error");
      input.setAttribute("aria-invalid", "true");
    }
  }
  
  function clearError(input, errorId) {
    const errorEl = document.getElementById(errorId);
    if (errorEl) {
      errorEl.textContent = "";
      errorEl.classList.remove("show");
    }
    if (input) {
      input.classList.remove("error");
      input.removeAttribute("aria-invalid");
    }
  }

  function clearAllErrors() {
    document.querySelectorAll(".error-message").forEach(el => {
      el.textContent = "";
      el.classList.remove("show");
    });
    document.querySelectorAll(".question-input").forEach(i => {
      i.classList.remove("error");
      i.removeAttribute("aria-invalid");
    });
  }

  // validation rules (return null when valid, string when invalid)
  function validateName(value) {
    const trimmed = (value || "").trim();
    if (!trimmed) return "Please enter your name";
    if (trimmed.length < 2) return "Name must be at least 2 characters";
    if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) return "Name can only contain letters, spaces, hyphens, and apostrophes";
    return null;
  }

  function validateEmail(value) {
    const trimmed = (value || "").trim();
    if (!trimmed) return "Please enter your email";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmed)) return "Please enter a valid email address";
    return null;
  }

  function validateQuestion(value) {
    const trimmed = (value || "").trim();
    if (!trimmed) return "Please enter your question";
    if (trimmed.length < 10) return "Question must be at least 10 characters";
    if (trimmed.length > 500) return "Question must be less than 500 characters";
    return null;
  }

  // real-time validation
  nameInput?.addEventListener("input", () => {
    const err = validateName(nameInput.value);
    if (err) showError(nameInput, "name-error", err);
    else clearError(nameInput, "name-error");
  });

  emailInput?.addEventListener("input", () => {
    const err = validateEmail(emailInput.value);
    if (err) showError(emailInput, "email-error", err);
    else clearError(emailInput, "email-error");
  });

  questionInput?.addEventListener("input", () => {
    const err = validateQuestion(questionInput.value);
    if (err) showError(questionInput, "question-error", err);
    else clearError(questionInput, "question-error");
  });

  // click handler for the button (prevent native submit/navigation)
  submitBtn?.addEventListener("click", (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    // Defensive: remove any fragment that might cause jump
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    clearAllErrors();

    const nameErr = validateName(nameInput?.value);
    const emailErr = validateEmail(emailInput?.value);
    const questionErr = validateQuestion(questionInput?.value);

    if (nameErr) showError(nameInput, "name-error", nameErr);
    if (emailErr) showError(emailInput, "email-error", emailErr);
    if (questionErr) showError(questionInput, "question-error", questionErr);

    // focus first invalid field
    const firstInvalid = form.querySelector(".question-input.error");
    if (firstInvalid) {
      firstInvalid.focus({ preventScroll: true });
      return;
    }

    // All valid -> simulate submit
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    // show success message
    if (successMessage) successMessage.classList.add("show");

    // simulate async submit
    setTimeout(() => {
      form.reset();
      clearAllErrors();
      if (successMessage) {
        // keep success visible briefly
        setTimeout(() => successMessage.classList.remove("show"), 4000);
      }
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Question";
    }, 800);
  });

  // Also prevent unexpected native form submit (safety)
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
});

// ==========================================
// NAVBAR ACTIVE LINK (Desktop + Mobile Burger): Scroll spy + URL sync
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // Helper to grab all nav links from both desktop and mobile menus
  const getAllNavLinks = () =>
    Array.from(document.querySelectorAll(".nav-links a, .mobile-nav-links a"));

  // Sections are derived from desktop links that target in-page anchors
  const desktopLinks = Array.from(document.querySelectorAll(".nav-links a"));
  const sectionIds = desktopLinks
    .map(a => (a.getAttribute("href") || "").trim())
    .filter(href => href.startsWith("#"))
    .map(href => href.slice(1));

  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  function setActiveById(id) {
    const allLinks = getAllNavLinks();
    allLinks.forEach(a => {
      const href = (a.getAttribute("href") || "").trim();
      a.classList.toggle("active", href === `#${id}`);
    });
  }

  function setActiveByLocation() {
    const allLinks = getAllNavLinks();
    const loc = window.location;
    const curPath = new URL(loc.href).pathname.replace(/\/+$/, "");
    const curHash = loc.hash;

    allLinks.forEach(a => {
      const url = new URL(a.href, loc.origin);
      const aPath = url.pathname.replace(/\/+$/, "");
      const aHash = url.hash;

      // If link has a hash, prefer hash match; else match by path
      const isActive = aHash ? (aHash === curHash && (!aPath || aPath === curPath)) : (aPath === curPath);
      a.classList.toggle("active", isActive);
    });
  }

  // Scroll-based active detection (for in-page sections)
  function updateActiveByScroll() {
    if (!sections.length) {
      setActiveByLocation();
      return;
    }
    const vpCenter = window.innerHeight / 2;
    let best = null;
    let bestDist = Infinity;

    for (const sec of sections) {
      const rect = sec.getBoundingClientRect();
      const secCenter = rect.top + rect.height / 2;
      const dist = Math.abs(secCenter - vpCenter);
      if (dist < bestDist) {
        best = sec;
        bestDist = dist;
      }
    }
    if (best) setActiveById(best.id);
  }

  // Expose for use by burger block after it clones links
  window.__updateActiveByScroll = updateActiveByScroll;
  window.__setActiveByLocation = setActiveByLocation;

  // Init + listeners
  updateActiveByScroll(); // handles both section and non-section pages

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveByScroll();
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateActiveByScroll, { passive: true });
  window.addEventListener("hashchange", () => {
    // Sync active state on hash navigation (e.g., clicking anchor links)
    updateActiveByScroll();
  }, { passive: true });

  // Delegate: after any nav link is clicked (desktop or mobile), re-evaluate once scroll settles
  document.addEventListener("click", (e) => {
    const a = e.target.closest(".nav-links a, .mobile-nav-links a");
    if (!a) return;
    setTimeout(updateActiveByScroll, 120);
  });
});

// ==========================================
// Mobile Burger Menu (<=414px) - non-intrusive, with active syncing
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const desktopLinks = document.querySelector(".nav-links");

  if (!burger || !mobileMenu || !desktopLinks) return;

  // Build mobile list by cloning existing nav links (no duplication to maintain)
  function ensureMobileList() {
    if (mobileMenu.querySelector(".mobile-nav-links")) return;
    const clone = desktopLinks.cloneNode(true);
    clone.classList.remove("nav-links");
    clone.classList.add("mobile-nav-links");
    mobileMenu.innerHTML = "";
    mobileMenu.appendChild(clone);

    // Close menu when a mobile link is clicked
    clone.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", closeMenu, { passive: true });
    });

    // Sync active state for the newly created links
    if (window.__updateActiveByScroll) window.__updateActiveByScroll();
    if (window.__setActiveByLocation) window.__setActiveByLocation();
  }

  function openMenu() {
    ensureMobileList();
    burger.setAttribute("aria-expanded", "true");
    mobileMenu.classList.add("open");
    mobileMenu.removeAttribute("hidden");
    mobileMenu.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");

    // Re-sync active state right after opening
    if (window.__updateActiveByScroll) window.__updateActiveByScroll();
  }

  function closeMenu() {
    burger.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("open");
    mobileMenu.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
  }

  function toggleMenu() {
    const expanded = burger.getAttribute("aria-expanded") === "true";
    expanded ? closeMenu() : openMenu();
  }

  // Toggle on button
  burger.addEventListener("click", (e) => {
    e.preventDefault();
    toggleMenu();
  });

  // Close when clicking outside list area
  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) closeMenu();
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Defensive: close menu if resizing above mobile
  window.addEventListener("resize", () => {
    if (window.innerWidth > 414) closeMenu();
  }, { passive: true });
});