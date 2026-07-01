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
// Initialize Everything
// --------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    initMobileNav();
    initCMS();
    initSmoothScroll();
    initScrollHeader();

    console.log("Portfolio initialized successfully.");
});

// --------------------------------------------
// Netlify CMS Login Button (Optional)
// --------------------------------------------
function openAdmin() {
    window.location.href = "/admin/";
}