document.addEventListener("DOMContentLoaded", () => {
  // Get all sections that have an ID defined
  const sections = document.querySelectorAll("section[id], div[id]");

  // Get all navigation links with href attributes that start with #
  const navLinks = document.querySelectorAll('a[href^="#"]');

  // Add active class to style.css
  const style = document.createElement("style");
  style.textContent = `
    .link--metis.active::after {
      transform-origin: 0% 50%;
      transform: scaleX(1);
    }
  `;
  document.head.appendChild(style);

  // Function to determine which section is currently in view
  function setActiveLink() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;

    // Get references to important sections
    const inicioSection = document.getElementById("inicio");
    const homeSection = document.getElementById("home");
    const serviciosSection = document.getElementById("servicios");
    const servicesSection = document.getElementById("services");
    const cambiosSection = document.getElementById("cambios");
    const changesSection = document.getElementById("changes");
    const footerSection = document.getElementById("footer");
    const footerEnSection = document.getElementById("footeren");

    let currentSection = "";

    // Check if we're at the bottom of the page
    if (
      scrollPosition + windowHeight > documentHeight - 300 ||
      (cambiosSection &&
        scrollPosition >=
          cambiosSection.offsetTop + cambiosSection.clientHeight - 200) ||
      (changesSection &&
        scrollPosition >=
          changesSection.offsetTop + changesSection.clientHeight - 200)
    ) {
      // Determine which footer section is present
      if (footerEnSection) {
        currentSection = "#footer-en";
      } else if (footerSection) {
        currentSection = "#footer";
      }
    }
    // Check if we're in the inicio/home section or at the top of the page
    else if (
      scrollPosition <
      (serviciosSection
        ? serviciosSection.offsetTop - 100
        : servicesSection
        ? servicesSection.offsetTop - 100
        : documentHeight)
    ) {
      currentSection = inicioSection ? "#inicio" : "#home";
    }
    // Check if we're in the servicios/services section
    else if (
      (serviciosSection &&
        scrollPosition >= serviciosSection.offsetTop - 100) ||
      (servicesSection && scrollPosition >= servicesSection.offsetTop - 100)
    ) {
      let nextSectionTop = documentHeight;
      sections.forEach((section) => {
        const id = section.getAttribute("id");
        if (
          id !== "servicios" &&
          id !== "services" &&
          id !== "inicio" &&
          id !== "home" &&
          section.offsetTop > (serviciosSection || servicesSection).offsetTop
        ) {
          nextSectionTop = Math.min(nextSectionTop, section.offsetTop);
        }
      });

      if (scrollPosition < nextSectionTop - 100) {
        currentSection = serviciosSection ? "#servicios" : "#services";
      }
    }

    // If no special case matched, use regular section detection
    if (!currentSection) {
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (
          scrollPosition >= sectionTop - 200 &&
          scrollPosition < sectionTop + sectionHeight - 200
        ) {
          const sectionId = section.getAttribute("id");
          // Special case for home/inicio section
          if (sectionId === "home" || sectionId === "inicio") {
            currentSection = inicioSection ? "#inicio" : "#home";
          } else {
            currentSection = "#" + sectionId;
          }
        }
      });
    }

    // Update active class on navigation links
    navLinks.forEach((link) => link.classList.remove("active"));

    if (currentSection) {
      navLinks.forEach((link) => {
        if (link.getAttribute("href") === currentSection) {
          link.classList.add("active");
        }
      });
    } else if (
      navLinks.length > 0 &&
      (navLinks[0].getAttribute("href") === "#inicio" ||
        navLinks[0].getAttribute("href") === "#home")
    ) {
      navLinks[0].classList.add("active");
    }
  }

  // Set active link on page load
  setActiveLink();

  // Set active link on scroll
  window.addEventListener("scroll", setActiveLink, { passive: true });
});
