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