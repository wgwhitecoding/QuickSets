/* =========================================================================
   SECTION: Initialise AOS (Animate on Scroll)
   ========================================================================= */
   document.addEventListener("DOMContentLoaded", function () {
    AOS.init({
        duration: 800, // Animation duration in milliseconds
        easing: "ease-in-out", // Animation easing
        once: true, // Whether animation should happen only once
    });
});

/* =========================================================================
   SECTION: Adjust Scroll Position for Cross-Page Navigation
   ========================================================================= */
function adjustScrollPosition() {
    const navbar = document.querySelector(".navbar");

    if (window.location.hash) {
        const targetId = window.location.hash.substring(1); // Remove the '#'
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = targetElement.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
            });
        }
    }
}

window.addEventListener("load", function () {
    setTimeout(adjustScrollPosition, 100);
});

/* =========================================================================
   SECTION: Handle Navigation Link Clicks and Menu Collapse
   ========================================================================= */
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");
    const navbarCollapse = document.querySelector(".navbar-collapse"); // Collapsible menu
    const navLinks = document.querySelectorAll(".nav-link");

    // Collapse menu on link click
    navLinks.forEach((link) => {
        link.addEventListener("click", function () {
            if (navbarCollapse && navbarCollapse.classList.contains("show")) {
                const bootstrapCollapse = new bootstrap.Collapse(navbarCollapse);
                bootstrapCollapse.hide();
            }
        });
    });

    // Smooth scroll for current page or redirect for other pages
    document.querySelectorAll('a[href]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href") || "";
            const isHashLink = href.includes("#");
            const isIndexPage = window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("/");

            if (isHashLink) {
                e.preventDefault();

                const parts = href.split("#");
                const targetId = parts[1];
                const targetElement = document.getElementById(targetId);

                if (isIndexPage && targetElement) {
                    // Smooth scroll on the same page
                    const navbarHeight = navbar ? navbar.offsetHeight : 0;
                    const targetPosition = targetElement.offsetTop - navbarHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth",
                    });
                } else {
                    // Redirect to index.html with the hash
                    window.location.href = href;
                }
            } else {
                window.location.href = href;
            }
        });
    });
});

/* =========================================================================
   SECTION: Sticky Navbar Scroll Effect (Always Active)
   ========================================================================= */
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");

    // Toggle .scrolled class based on scrollY
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    handleScroll();

    document.addEventListener("scroll", handleScroll);
});

/* =========================================================================
   SECTION: Highlight Active Navbar Link Based on Scroll Position
   ========================================================================= */
document.addEventListener("DOMContentLoaded", function () {
    const navbarLinks = document.querySelectorAll(".nav-link");
    const navbar = document.querySelector(".navbar");
    const sections = document.querySelectorAll("section, header[id], div[id]");
    const navbarHeight = navbar ? navbar.offsetHeight : 0;

    function highlightActiveLink() {
        let currentSection = null;

        // Check for scroll position and active section
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - (navbarHeight + 50);
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSection = section.getAttribute("id");
            }
        });

        navbarLinks.forEach((link) => {
            const href = link.getAttribute("href") || "";
            const linkTarget = href.includes("#") ? href.split("#")[1] : null;

            if (linkTarget === currentSection) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    function highlightForStaticPage() {
        const currentPath = window.location.pathname;

        navbarLinks.forEach((link) => {
            const href = link.getAttribute("href") || "";

            if (href.includes("contact.html") && currentPath.includes("contact.html")) {
                link.classList.add("active");
            } else if (href.includes("index.html") && currentPath.includes("index.html")) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    // Initial check on load
    if (window.location.pathname.includes("contact.html")) {
        highlightForStaticPage();
    } else {
        highlightActiveLink();
    }

    document.addEventListener("scroll", function () {
        if (!window.location.pathname.includes("contact.html")) {
            highlightActiveLink();
        }
    });
});

/* =========================================================================
   SECTION: Dynamic Year for Footer
   ========================================================================= */
document.addEventListener("DOMContentLoaded", function () {
    const yearSpan = document.getElementById("currentYear");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

/* =========================================================================
   SECTION: Ensure Fade-in Animations Play
   ========================================================================= */
document.addEventListener("DOMContentLoaded", function () {
    const fadeElements = document.querySelectorAll(".fade-in");
    fadeElements.forEach((element) => {
        element.style.animationPlayState = "running";
    });
});







