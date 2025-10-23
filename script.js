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
        factsFaqsSection.classList.add('dimmed');
      } else {
        factsFaqsSection.classList.remove('dimmed');
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