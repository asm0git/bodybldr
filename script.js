// BODYBLDR - a fitness website for lifters and gymgoers.
// In partial fulfillment of the requirements for Introduction to Web Programming for Computer Science (6WEBCS)

// Author: Aerith Catap
// Block: CS-201
// Date: October 21, 2025
// Submitted to: Mr. Chris Almocera

// File: script.js

document.addEventListener("DOMContentLoaded", () => {
  const cover = document.getElementById("cover");
  const coverContent = document.querySelector(".cover-content");
  const title = document.getElementById("cover-title");

  const quotes = [
    `<span class="medium">Your</span> <span class="extrabold">body, your blueprint.</span>`,
    `<span class="extrabold">Muscle is earned,</span> <span class="medium">not gifted.</span>`,
    `<span class="extrabold">Train</span> <span class="medium">smarter</span>, <span class="medium">grow</span> <span class="extrabold">stronger</span>`
  ];

  const images = ["assets/arnold.png", "assets/cbum.png", "assets/ronnie.png"];

  let index = 0;

  // Page load animation
  setTimeout(() => {
    cover.style.opacity = "1";
    coverContent.classList.add("animate-in");
  }, 800);

  // Quote & Image rotation
  setInterval(() => {
    index = (index + 1) % quotes.length;
    title.innerHTML = quotes[index];
    cover.style.backgroundImage = `linear-gradient(to right, rgba(10,10,13,1) 0%, rgba(10,10,13,0.91) 91%, rgba(10,10,13,0) 100%), url(${images[index]})`;
  }, 6000);

  // Desktop mouse opacity effect
  if (window.innerWidth > 1024) {
    document.body.addEventListener("mouseenter", () => {
      coverContent.style.opacity = "1";
    });
    document.body.addEventListener("mouseleave", () => {
      coverContent.style.opacity = "0.2";
    });
  }

  // Tablet/Mobile scroll opacity
  if (window.innerWidth <= 1024) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        coverContent.style.opacity = entry.isIntersecting ? "1" : "0.2";
      },
      { threshold: 0.1 }
    );
    observer.observe(cover);
  }
});