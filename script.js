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

