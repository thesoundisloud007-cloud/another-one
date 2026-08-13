// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  
  // ================= 1. LOADING SCREEN FADE OUT =================
  window.addEventListener("load", () => {
    const loader = document.getElementById("loading-screen");
    if (loader) {
      setTimeout(() => {
        loader.classList.add("opacity-0", "invisible");
      }, 800); // short delay to show the nice unfold animation
    }
  });

  // Backup loading dismiss in case window load event already fired
  setTimeout(() => {
    const loader = document.getElementById("loading-screen");
    if (loader && !loader.classList.contains("opacity-0")) {
      loader.classList.add("opacity-0", "invisible");
    }
  }, 3000);

  // ================= 2. TYPEWRITER ANIMATION =================
  const words = [
    "Designing Experiences",
    "Building with Python",
    "Exploring Artificial Intelligence",
    "Creating Modern Interfaces"
  ];
  
  let i = 0;
  let timer;
  const typingSpeed = 100;
  const eraseSpeed = 50;
  const wordDelay = 2000;
  const targetElement = document.getElementById("typing-text");

  function typingEffect() {
    let word = words[i].split("");
    var loopTyping = function() {
      if (word.length > 0) {
        targetElement.innerHTML += word.shift();
        timer = setTimeout(loopTyping, typingSpeed);
      } else {
        timer = setTimeout(erasingEffect, wordDelay);
      }
    };
    loopTyping();
  }

  function erasingEffect() {
    let word = words[i].split("");
    var loopErasing = function() {
      if (word.length > 0) {
        word.pop();
        targetElement.innerHTML = word.join("");
        timer = setTimeout(loopErasing, eraseSpeed);
      } else {
        if (words.length > i + 1) {
          i++;
        } else {
          i = 0;
        }
        timer = setTimeout(typingEffect, 500);
      }
    };
    loopErasing();
  }

  if (targetElement) {
    typingEffect();
  }

  // ================= 3. GSAP SCROLL REVEAL ANIMATIONS =================
  // Register GSAP ScrollTrigger
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    // About Me reveal
    gsap.from("#about bg-[#fbfbf9]", {
      scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
        toggleActions: "play none none none"
      },
      x: -50,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    });

    gsap.from("#about .sticky-note", {
      scrollTrigger: {
        trigger: "#about",
        start: "top 75%",
        toggleActions: "play none none none"
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.25,
      ease: "back.out(1.5)"
    });

    // Education Timeline nodes
    gsap.from("#education .relative.mb-12", {
      scrollTrigger: {
        trigger: "#education",
        start: "top 75%",
        toggleActions: "play none none none"
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out"
    });

    // Skills Cards
    gsap.from("#skills .bg-white", {
      scrollTrigger: {
        trigger: "#skills",
        start: "top 80%",
        toggleActions: "play none none none"
      },
      y: 50,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: "back.out(1.2)"
    });

    // Experience Card
    gsap.from("#experience .bg-white", {
      scrollTrigger: {
        trigger: "#experience",
        start: "top 75%",
        toggleActions: "play none none none"
      },
      scale: 0.95,
      opacity: 0,
      duration: 0.9,
      ease: "back.out(1.4)"
    });

    // Achievements Sticky Notes
    gsap.from("#achievements .sticky-note, #achievements .bg-white", {
      scrollTrigger: {
        trigger: "#achievements",
        start: "top 75%",
        toggleActions: "play none none none"
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.18,
      ease: "back.out(1.5)"
    });

    // Projects Grid Cards
    gsap.from("#projects .bg-white", {
      scrollTrigger: {
        trigger: "#projects",
        start: "top 75%",
        toggleActions: "play none none none"
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out"
    });

    // Contact Panel
    gsap.from("#contact .envelope, #contact .block", {
      scrollTrigger: {
        trigger: "#contact",
        start: "top 80%",
        toggleActions: "play none none none"
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out"
    });
  }

  // ================= 4. CONTACT FORM HANDLER =================
  const contactForm = document.getElementById("scrapbook-contact-form");
  const successNote = document.getElementById("form-success-note");

  if (contactForm && successNote) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Gather input values (mock form processing)
      const name = document.getElementById("form-name").value;
      const source = document.getElementById("form-source").value;
      const subject = document.getElementById("form-subject").value;
      const message = document.getElementById("form-message").value;
      const email = document.getElementById("form-email").value;

      console.log("Scrapbook Letter Submitted:", { name, source, subject, message, email });

      // Show the success sticky note overlay in the letter container
      successNote.classList.remove("hidden");
      successNote.classList.add("flex", "animate-[fade-in_0.3s_ease-out]");

      // Play soft transition effect
      if (typeof gsap !== "undefined") {
        gsap.from(successNote, {
          scale: 0.9,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(1.7)"
        });
      }
    });
  }
});

// ================= 5. OFFER LETTER MODAL TOGGLE =================
function toggleModal(show) {
  const modal = document.getElementById("offer-letter-modal");
  if (!modal) return;
  
  const modalContent = modal.querySelector(".offer-letter-content");

  if (show) {
    modal.classList.remove("invisible", "opacity-0");
    modalContent.classList.remove("scale-95");
    modalContent.classList.add("scale-100");
    document.body.style.overflow = "hidden"; // disable scroll
  } else {
    modal.classList.add("opacity-0");
    modalContent.classList.remove("scale-100");
    modalContent.classList.add("scale-95");
    
    // Add hidden state after transition completes
    setTimeout(() => {
      modal.classList.add("invisible");
      document.body.style.overflow = ""; // restore scroll
    }, 300);
  }
}

// Close modal when clicking outside content area
document.getElementById("offer-letter-modal")?.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    toggleModal(false);
  }
});

// Dismiss success note function
function dismissSuccessNote() {
  const successNote = document.getElementById("form-success-note");
  const contactForm = document.getElementById("scrapbook-contact-form");
  
  if (successNote) {
    successNote.classList.add("hidden");
    successNote.classList.remove("flex");
  }
  if (contactForm) {
    contactForm.reset();
  }
}
