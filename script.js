/* =========================================
   TAJUDEEN BAWUMIA - DEVELOPER PORTFOLIO
   JavaScript Functionality
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  // =====================================
  // 1. MOBILE HAMBURGER NAVIGATION
  // =====================================

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navigationItems = document.querySelectorAll(".nav-links a");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("active");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    });

    // Close the menu after selecting a navigation link
    navigationItems.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      });
    });

    // Close the menu when clicking outside it
    document.addEventListener("click", (event) => {
      const clickedInsideMenu = navLinks.contains(event.target);
      const clickedToggle = menuToggle.contains(event.target);

      if (!clickedInsideMenu && !clickedToggle) {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      }
    });
  }

  // =====================================
  // 2. DARK / LIGHT THEME
  // =====================================

  const themeToggle = document.querySelector(".theme-toggle");
  const themeIcon = document.querySelector(".theme-icon");

  const updateThemeButton = () => {
    const isLight = document.body.classList.contains("light-theme");

    if (themeIcon) {
      themeIcon.textContent = isLight ? "🌙" : "☀️";
    }

    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark theme" : "Switch to light theme"
      );
    }
  };

  // Restore the visitor's saved theme
  try {
    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {
      document.body.classList.add("light-theme");
    }
  } catch (error) {
    console.warn("Theme preference could not be restored.", error);
  }

  updateThemeButton();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");

      const isLight = document.body.classList.contains("light-theme");

      try {
        localStorage.setItem(
          "portfolio-theme",
          isLight ? "light" : "dark"
        );
      } catch (error) {
        console.warn("Theme preference could not be saved.", error);
      }

      updateThemeButton();
    });
  }

  // =====================================
  // 3. PROJECT DETAIL MODALS
  // =====================================

  const projectCards = document.querySelectorAll(".project-card");

  // Create the modal container
  const modalOverlay = document.createElement("div");

  modalOverlay.className = "modal-overlay";
  modalOverlay.setAttribute("aria-hidden", "true");

  modalOverlay.innerHTML = `
    <div
      class="project-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <button
        class="modal-close"
        type="button"
        aria-label="Close project details"
      >&times;</button>

      <p class="section-label">PROJECT DETAILS</p>
      <h2 id="modal-title"></h2>
      <p class="modal-description"></p>
      <div class="modal-technologies"></div>
      <div class="modal-actions"></div>
    </div>
  `;

  document.body.appendChild(modalOverlay);

  const modal = modalOverlay.querySelector(".project-modal");
  const modalTitle = modalOverlay.querySelector("#modal-title");
  const modalDescription = modalOverlay.querySelector(
    ".modal-description"
  );
  const modalTechnologies = modalOverlay.querySelector(
    ".modal-technologies"
  );
  const modalActions = modalOverlay.querySelector(".modal-actions");
  const modalClose = modalOverlay.querySelector(".modal-close");

  let previousFocus = null;

  const closeModal = () => {
    modalOverlay.classList.remove("active");
    modalOverlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (previousFocus) {
      previousFocus.focus();
    }
  };

  const openModal = (card, trigger) => {
    previousFocus = trigger;

    const title = card.querySelector("h3");
    const description = card.querySelector("p");
    const technologies = card.querySelectorAll(".project-tech span");
    const repository = card.querySelector(".project-link");
    const status = card.querySelector(".status");

    modalTitle.textContent = title ? title.textContent : "Project";
    modalDescription.textContent = description
      ? description.textContent
      : "";

    // Clear previous project technologies
    modalTechnologies.replaceChildren();

    technologies.forEach((technology) => {
      const tag = document.createElement("span");

      tag.textContent = technology.textContent;
      modalTechnologies.appendChild(tag);
    });

    // Display repository link or project status
    modalActions.replaceChildren();

    if (repository) {
      const repositoryLink = document.createElement("a");

      repositoryLink.href = repository.href;
      repositoryLink.target = "_blank";
      repositoryLink.rel = "noopener noreferrer";
      repositoryLink.className = "btn btn-primary";
      repositoryLink.textContent = "View GitHub Repository";

      modalActions.appendChild(repositoryLink);
    } else if (status) {
      const statusText = document.createElement("p");

      statusText.textContent = status.textContent;
      statusText.className = "modal-status";

      modalActions.appendChild(statusText);
    }

    modalOverlay.classList.add("active");
    modalOverlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    modalClose.focus();
  };

  // Add a details button to every project card
  projectCards.forEach((card) => {
    const detailsButton = document.createElement("button");

    detailsButton.type = "button";
    detailsButton.className = "project-details-btn";
    detailsButton.textContent = "View Project Details";

    detailsButton.addEventListener("click", () => {
      openModal(card, detailsButton);
    });

    card.appendChild(detailsButton);
  });

  // Close modal using the close button
  modalClose.addEventListener("click", closeModal);

  // Close modal by clicking the background
  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });

  // Close modal using the Escape key
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      modalOverlay.classList.contains("active")
    ) {
      closeModal();
    }
  });

  // =====================================
  // 4. CURRENT YEAR IN FOOTER
  // =====================================

  const footerText = document.querySelector(".footer p");

  if (footerText) {
    footerText.textContent =
      `© ${new Date().getFullYear()} Tajudeen Bawumia. ` +
      "Built with HTML, CSS, and JavaScript.";
  }

  // =====================================
  // 5. CONSOLE MESSAGE
  // =====================================

  console.log("Tajudeen Bawumia's portfolio loaded successfully!");
});
