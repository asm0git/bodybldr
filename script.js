// BODYBLDR - a fitness website for lifters and gymgoers.
// In partial fulfillment of the requirements for Introduction to Web Programming for Computer Science (6WEBCS)

// Author: Aerith Catap
// Block: CS-201
// Date: October 21, 2025
// Submitted to: Mr. Chris Almocera

// File: script.js

document.addEventListener("DOMContentLoaded", () => {
  const cover = document.querySelector("#cover");
  const content = document.querySelector(".cover-content");
  const title = document.querySelector("#cover-title");

  // Quotes (rotating every 6s)
  const titles = [
    `<span class="medium">Your</span> <span class="extrabold">body</span>,<br><span class="medium">your</span> <span class="extrabold"> blueprint.</span>`,
    `<span class="extrabold">Muscle is earned,</span><br><span class="medium">not gifted.</span>`,
    `<span class="extrabold">Train</span> <span class="medium">smarter</span>,<br><span class="medium">grow</span> <span class="extrabold">stronger.</span>`
  ];

  // Background images
  const images = [
    "assets/arnold.png",
    "assets/cbum.png",
    "assets/ronnie.png"
  ];

  let index = 0;

  // Initial fade-in animation
  setTimeout(() => {
    cover.style.backgroundImage = `url(${images[index]})`;
    // set initial title at the same time as other animations
    title.innerHTML = titles[index];
    content.classList.add("visible");
  }, 800);

  // Cycle every 6s
  setInterval(() => {
    index = (index + 1) % images.length;
    // Smoothly fade title out, change text, then fade back in
    title.style.opacity = '0';
    setTimeout(() => {
      title.innerHTML = titles[index];
      title.style.opacity = '1';
    }, 400);

    // Change background image smoothly
    cover.style.backgroundImage = `url(${images[index]})`;
  }, 6000);

  // Desktop: opacity change on hover
  if (window.innerWidth >= 1025) {
    cover.addEventListener("mouseenter", () => cover.classList.remove("dimmed"));
    cover.addEventListener("mouseleave", () => cover.classList.add("dimmed"));
    cover.classList.add("dimmed");
  }

  // Mirror behavior for training section
  const training = document.querySelector('#training');
  if (training) {
    if (window.innerWidth >= 1025) {
      training.addEventListener('mouseenter', () => training.classList.remove('dimmed'));
      training.addEventListener('mouseleave', () => training.classList.add('dimmed'));
      training.classList.add('dimmed');
    }
  }

  // Tablet/Mobile: opacity when scrolled out of view
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

  // Tablet/Mobile: training dim on scroll / intersection
  if (window.innerWidth < 1025 && training) {
    window.addEventListener('scroll', () => {
      const rect = training.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) {
        training.classList.add('dimmed');
      } else {
        training.classList.remove('dimmed');
      }
    });
  }
});

// Training Section Scroll Animations
document.addEventListener('DOMContentLoaded', function() {
    const trainingPhases = document.querySelectorAll('.training-phase');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200); // Stagger animation by 200ms
            }
        });
    }, observerOptions);
    
    trainingPhases.forEach(phase => {
        observer.observe(phase);
    });
});

let showingAlt = false;
function toggleMessage() {
  const text = document.getElementById('message-text');
  showingAlt = !showingAlt;
  text.textContent = showingAlt
    ? "What you eat fuels your progress, recovery, and results."
    : "Your body is built in the gym – but shaped in the kitchen.";
}

const lists = {
  protein: [
    "Chicken breast",
    "Eggs",
    "Fish (tuna, salmon)",
    "Lean beef",
    "Greek yogurt"
  ],
  carbs: [
    "Rice", "Oats", "Sweet potatoes", "Whole-grain bread", "Bananas"
  ],
  fats: [
    "Avocado", "Olive oil", "Nuts", "Peanut butter", "Chia seeds"
  ]
};

function toggleList(type) {
  const el = document.getElementById(`${type}-text`);
  if (el.dataset.toggled === "true") {
    el.innerHTML = el.dataset.original;
    el.dataset.toggled = "false";
  } else {
    el.dataset.original = el.innerHTML;
    el.innerHTML = lists[type].join("<br>");
    el.dataset.toggled = "true";
  }
}

document.querySelectorAll("#facts-faqs .qa-item .qa-text").forEach(el => {
  const inner = document.createElement("span");
  inner.classList.add("qa-inner");
  inner.textContent = el.textContent.trim();
  el.textContent = "";
  el.appendChild(inner);
});


document.addEventListener("DOMContentLoaded", () => {
  const qaItems = document.querySelectorAll("#facts-faqs .qa-item");

  const contentMap = [
    {
      type: "fact",
      default: "Skipping one workout ruins everything.",
      clicked: "One missed day won’t matter. What counts is showing up again the next time.",
    },
    {
      type: "faq",
      default: "How often should I work out?",
      clicked: "Start with 3–4 days a week, giving your muscles time to rest and recover between sessions.",
    },
    {
      type: "fact",
      default: "Lifting is only for men.",
      clicked: "Strength training benefits everyone — it builds confidence, posture, and overall health.",
    },
    {
      type: "faq",
      default: "How long before I see progress?",
      clicked: "Most beginners notice progress in 4–8 weeks — stay consistent and it will show.",
    },
    {
      type: "fact",
      default: "You should lose or gain weight before starting.",
      clicked: "You can start training at any stage. Exercise helps your body adapt — whether you’re aiming to tone up, gain strength, or lose fat.",
    },
    {
      type: "faq",
      default: "Do I need supplements right away?",
      clicked: "Not at all. Focus on real food, sleep, and consistency — supplements can come later.",
    },
  ];

  qaItems.forEach((item, index) => {
    const textEl = item.querySelector(".qa-text");
    const arrowEl = item.querySelector(".qa-arrow img");
    const data = contentMap[index];
    let clicked = false;

    item.addEventListener("click", () => {
      clicked = !clicked;

      // Freeze width to prevent reflow when hovered
      if (clicked) {
        const computedWidth = window.getComputedStyle(item).width;
        item.style.width = computedWidth; // lock width
      } else {
        item.style.width = ""; // unlock width on revert
      }

      // Reset hover scaling
      item.style.transform = "none";

      if (clicked) {
        // Invert colors and update text
        item.style.backgroundColor = "var(--clr-tertiary)";
        textEl.style.color = "var(--clr-main)";
        if (arrowEl) arrowEl.style.filter = "invert(1)";
        textEl.textContent = data.clicked;
      } else {
        // Revert to default
        item.style.backgroundColor = "var(--clr-secondary)";
        textEl.style.color = "var(--clr-tertiary)";
        if (arrowEl) arrowEl.style.filter = "invert(0)";
        textEl.textContent = data.default;
      }
    });
  });
});
// Disable hover animation on smaller screens
function disableHoverOnMobile() {
  const qaItems = document.querySelectorAll("#facts-faqs .qa-item");
  const isMobile = window.matchMedia("(max-width: 1024px)").matches;
  qaItems.forEach(item => {
    if (isMobile) item.style.transform = "none";
  });
}

window.addEventListener("resize", disableHoverOnMobile);
window.addEventListener("load", disableHoverOnMobile);
// === Nutrition interactions ===
document.addEventListener("DOMContentLoaded", () => {
  // 1) Macro arrows: cycle image + text
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
    window.setTimeout(() => {
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

  // 2) Nutrition Food Choice hover -> show food lists; mouseout -> restore
  const foodLists = {
    protein: [
      "Chicken breast",
      "Eggs",
      "Fish (tuna, salmon)",
      "Lean beef",
      "Greek yogurt",
    ],
    carbohydrates: [
      "Rice",
      "Oats",
      "Sweet potatoes",
      "Whole-grain bread",
      "Bananas",
    ],
    fats: [
      "Avocado",
      "Olive oil",
      "Nuts",
      "Peanut butter",
      "Chia seeds",
    ],
  };

  // Fixed: query for .nutrition-food-choice-container and use h5
  document.querySelectorAll(".nutrition-food-choice-container").forEach((card) => {
    const titleEl = card.querySelector("h5");  // changed from h3 to h5
    const pEl = card.querySelector("p");
    if (!titleEl || !pEl) return;

    const titleText = titleEl.textContent.trim().toLowerCase();
    const originalHTML = pEl.innerHTML;

    card.addEventListener("mouseenter", () => {
      const list = foodLists[titleText];
      if (list) {
        pEl.innerHTML = list.join("<br>");
      }
    });

    card.addEventListener("mouseleave", () => {
      pEl.innerHTML = originalHTML;
    });
  });
});

// Add this to your existing DOMContentLoaded block or create a new one:

document.addEventListener("DOMContentLoaded", () => {
  const nutritionSection = document.querySelector('.nutrition-section');
  
  if (nutritionSection) {
    // Desktop: dim on mouse leave, brighten on mouse enter
    if (window.innerWidth >= 1025) {
      nutritionSection.addEventListener("mouseenter", () => nutritionSection.classList.remove("dimmed"));
      nutritionSection.addEventListener("mouseleave", () => nutritionSection.classList.add("dimmed"));
      nutritionSection.classList.add("dimmed"); // start dimmed
    }

    // Tablet/Mobile: dim when scrolled out of view
    if (window.innerWidth < 1025) {
      window.addEventListener('scroll', () => {
        const rect = nutritionSection.getBoundingClientRect();
        if (rect.top > window.innerHeight || rect.bottom < 0) {
          nutritionSection.classList.add('dimmed');
        } else {
          nutritionSection.classList.remove('dimmed');
        }
      });
    }
  }
});

// Add this to your existing DOMContentLoaded blocks:

document.addEventListener("DOMContentLoaded", () => {
  const factsFaqsSection = document.querySelector('#facts-faqs');
  
  if (factsFaqsSection) {
    // Desktop: dim on mouse leave, brighten on mouse enter
    if (window.innerWidth >= 1025) {
      factsFaqsSection.addEventListener("mouseenter", () => factsFaqsSection.classList.remove("dimmed"));
      factsFaqsSection.addEventListener("mouseleave", () => factsFaqsSection.classList.add("dimmed"));
      factsFaqsSection.classList.add("dimmed"); // start dimmed
    }

    // Tablet/Mobile: dim when scrolled out of view
    if (window.innerWidth < 1025) {
      window.addEventListener('scroll', () => {
        const rect = factsFaqsSection.getBoundingClientRect();
        if (rect.top > window.innerHeight || rect.bottom < 0) {
          factsFaqsSection.classList.add('dimmed');
        } else {
          factsFaqsSection.classList.remove('dimmed');
        }
      });
    }
  }
});

// Add scroll-triggered centering animation for h3 and h4
document.addEventListener("DOMContentLoaded", () => {
  const animatedHeaders = document.querySelectorAll("h3, h4");
  
  // Add scroll-animate class to all h3 and h4
  animatedHeaders.forEach(header => {
    header.classList.add("scroll-animate");
  });

  // Intersection Observer to detect when elements are centered
  const observerOptions = {
    threshold: [0, 0.5, 1], // track visibility at 0%, 50%, 100%
    rootMargin: "-20% 0px -20% 0px" // consider element centered when in middle 60% of viewport
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        // Element is centered in viewport
        entry.target.classList.add("centered");
      } else {
        // Element is not centered
        entry.target.classList.remove("centered");
      }
    });
  }, observerOptions);

  // Observe all h3 and h4 elements
  animatedHeaders.forEach(header => {
    observer.observe(header);
  });

  // Optional: Manual scroll handler for smoother transitions
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        animatedHeaders.forEach(header => {
          const rect = header.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const elementCenter = rect.top + (rect.height / 2);
          const viewportCenter = viewportHeight / 2;
          
          // Calculate how far from center (0 = centered, 1 = at edge)
          const distanceFromCenter = Math.abs(elementCenter - viewportCenter) / viewportCenter;
          
          // Apply gradual transform based on distance
          if (header.tagName === "H3") {
            const translateX = -40 * distanceFromCenter; // moves left when not centered
            header.style.transform = `translateX(${translateX}vw)`;
          } else if (header.tagName === "H4") {
            const translateX = 40 * distanceFromCenter; // moves right when not centered
            header.style.transform = `translateX(${translateX}vw)`;
          }
        });
        ticking = false;
      });
      ticking = true;
    }
  });
});