document.addEventListener('DOMContentLoaded', () => {
  // Get all sections that have an ID defined
  const sections = document.querySelectorAll('section[id], div[id]');
  
  // Get all navigation links with href attributes that start with #
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  // Add active class to style.css
  const style = document.createElement('style');
  style.textContent = `
    .link--metis.active::after {
      transform-origin: 0% 50%;
      transform: scaleX(1);
    }
  `;
  document.head.appendChild(style);
  
  // Function to determine which section is currently in view
  function setActiveLink() {
    let currentSection = '';
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;
    
    // Get references to important sections
    const inicioSection = document.getElementById('inicio');
    const serviciosSection = document.getElementById('servicios');
    const cambiosSection = document.getElementById('cambios');
    
    // Special case: If we're near the bottom of the page, activate the footer link
    if (scrollPosition + windowHeight > documentHeight - 300) {
      currentSection = '#footer';
    } 
    // Special case: Check if we're below the cambios section but not yet at the very bottom
    else if (cambiosSection && scrollPosition >= cambiosSection.offsetTop + cambiosSection.clientHeight - 200) {
      currentSection = '#footer';
    }
    // Special case: If we're at the very top of the page, activate inicio
    else if (scrollPosition < 100) {
      currentSection = '#inicio';
    }
    // Special case: If we're in the inicio section area
    else if (inicioSection && scrollPosition >= inicioSection.offsetTop - 100 && 
             scrollPosition < (serviciosSection ? serviciosSection.offsetTop - 100 : documentHeight)) {
      currentSection = '#inicio';
    }
    // Special case: If we're in the servicios section area
    else if (serviciosSection && scrollPosition >= serviciosSection.offsetTop - 100) {
      // Find the next section after servicios to determine the end boundary
      let nextSectionTop = documentHeight;
      sections.forEach(section => {
        const id = section.getAttribute('id');
        if (id !== 'servicios' && id !== 'inicio' && section.offsetTop > serviciosSection.offsetTop) {
          if (section.offsetTop < nextSectionTop) {
            nextSectionTop = section.offsetTop;
          }
        }
      });
      
      if (scrollPosition < nextSectionTop - 100) {
        currentSection = '#servicios';
      }
    }
    
    // If no special case matched, use the regular section detection
    if (!currentSection) {
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Check if the section is in the viewport
        if (scrollPosition >= sectionTop - 200 && 
            scrollPosition < sectionTop + sectionHeight - 200) {
          currentSection = '#' + section.getAttribute('id');
        }
      });
    }
    
    // Remove active class from all links
    navLinks.forEach(link => {
      link.classList.remove('active');
    });
    
    // Add active class to the link that corresponds to the current section
    if (currentSection) {
      navLinks.forEach(link => {
        if (link.getAttribute('href') === currentSection) {
          link.classList.add('active');
        }
      });
    } else {
      // If no section is active (e.g., at the very top), activate the first link
      if (navLinks.length > 0 && navLinks[0].getAttribute('href') === '#inicio') {
        navLinks[0].classList.add('active');
      }
    }
  }
  
  // Set active link on page load
  setActiveLink();
  
  // Set active link on scroll
  window.addEventListener('scroll', setActiveLink);
});
