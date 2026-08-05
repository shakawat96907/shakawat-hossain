/* ============================================
   Md. Shakawat Hossain - Portfolio Scripts
   Mobile Navigation & CMS Integration
   ============================================ */

// --------------------------------------------
// Mobile Navigation Toggle
// --------------------------------------------
function initMobileNav() {
    const navMenu = document.getElementById("nav-menu");
    const navToggle = document.getElementById("nav-toggle");
    const navClose = document.getElementById("nav-close");
    const navLinks = document.querySelectorAll(".nav__link");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.add("show");
        });
    }

    if (navClose && navMenu) {
        navClose.addEventListener("click", () => {
            navMenu.classList.remove("show");
        });
    }

    // Close menu when clicking a link
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("show");
        });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove("show");
        }
    });
}

// --------------------------------------------
// Decap CMS Integration
// --------------------------------------------
function initCMS() {
    if (window.CMS_CONFIG) {
        // Wait for Decap CMS to be ready
        window.addEventListener("load", () => {
            // Decap CMS auto-initializes from CMS_CONFIG
            // This function provides hooks for dynamic content loading
            console.log("Decap CMS configured successfully.");
        });
    }

    // Handle Netlify Identity authentication
    if (typeof netlifyIdentity !== "undefined") {
        netlifyIdentity.on("init", (user) => {
            if (!user) {
                netlifyIdentity.on("login", () => {
                    document.location.href = "/admin/";
                });
            }
        });
    }
}

// --------------------------------------------
// Smooth Scroll for Anchor Links
// --------------------------------------------
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
        link.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector(".header").offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });
            }
        });
    });
}

// --------------------------------------------
// Header Scroll Effect
// --------------------------------------------
function initScrollHeader() {
    const header = document.querySelector(".header");
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        lastScroll = currentScroll;
    });
}

// --------------------------------------------
// Certificate Lightbox
// --------------------------------------------
function initCertificateLightbox() {
    const modal = document.getElementById("certificate-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalViewer = document.getElementById("modal-viewer");
    const modalClose = document.getElementById("modal-close");
    const zoomInBtn = document.getElementById("modal-zoom-in");
    const zoomOutBtn = document.getElementById("modal-zoom-out");
    const resetBtn = document.getElementById("modal-reset");

    if (!modal || !modalViewer) return;

    let currentScale = 1;
    const scaleStep = 0.25;
    const minScale = 0.5;
    const maxScale = 3;

    const certificateCards = document.querySelectorAll(".certificate-card");

    certificateCards.forEach((card) => {
        card.addEventListener("click", () => {
            const certPath = card.getAttribute("data-cert");
            const title = card.querySelector(".certificate-card__content h4")?.textContent || "Certificate";
            const fileExt = certPath.split(".").pop().toLowerCase();

            modalTitle.textContent = title;
            modalViewer.innerHTML = "";
            currentScale = 1;

            if (fileExt === "pdf") {
                const embed = document.createElement("embed");
                embed.src = certPath;
                embed.type = "application/pdf";
                embed.style.width = "100%";
                embed.style.height = "65vh";
                embed.style.borderRadius = "0.35rem";
                modalViewer.appendChild(embed);
            } else {
                const img = document.createElement("img");
                img.src = certPath;
                img.alt = title;
                img.style.maxWidth = "100%";
                img.style.maxHeight = "65vh";
                img.style.borderRadius = "0.35rem";
                modalViewer.appendChild(img);
            }

            modal.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });

    const closeModal = () => {
        modal.classList.remove("active");
        modalViewer.innerHTML = '<p class="placeholder">Loading certificate...</p>';
        document.body.style.overflow = "";
        currentScale = 1;
        applyZoom();
    };

    const applyZoom = () => {
        const viewerContent = modalViewer.firstElementChild;
        if (!viewerContent) return;
        viewerContent.style.transform = `scale(${currentScale})`;
        viewerContent.style.transition = "transform 0.2s ease";
    };

    if (modalClose) modalClose.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
        if (!modal.classList.contains("active")) return;
        if (e.key === "Escape") closeModal();
        if (e.key === "+" || e.key === "=") {
            currentScale = Math.min(maxScale, currentScale + scaleStep);
            applyZoom();
        }
        if (e.key === "-") {
            currentScale = Math.max(minScale, currentScale - scaleStep);
            applyZoom();
        }
        if (e.key === "0") {
            currentScale = 1;
            applyZoom();
        }
    });

    if (zoomInBtn) {
        zoomInBtn.addEventListener("click", () => {
            currentScale = Math.min(maxScale, currentScale + scaleStep);
            applyZoom();
        });
    }

    if (zoomOutBtn) {
        zoomOutBtn.addEventListener("click", () => {
            currentScale = Math.max(minScale, currentScale - scaleStep);
            applyZoom();
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            currentScale = 1;
            applyZoom();
        });
    }
}

// --------------------------------------------
// Initialize Everything
// --------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    initMobileNav();
    initCMS();
    initSmoothScroll();
    initScrollHeader();
    initCertificateLightbox();

    console.log("Portfolio initialized successfully.");
});

// --------------------------------------------
// Netlify CMS Login Button (Optional)
// --------------------------------------------
function openAdmin() {
    window.location.href = "/admin/";
}