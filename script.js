document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       ELEMENTS
    ================================================= */

    const body = document.body;

    const themeToggle =
        document.getElementById("themeToggle");

    const themeIcon =
        themeToggle
            ? themeToggle.querySelector("i")
            : null;

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.getElementById("navLinks");

    const navbar =
        document.getElementById("navbar");

    const cursorGlow =
        document.querySelector(".cursor-glow");

    const currentYear =
        document.getElementById("currentYear");


    /* =================================================
       ANNÉE AUTOMATIQUE
    ================================================= */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =================================================
       THEME
    ================================================= */

    const savedTheme =
        localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {

        body.classList.add("light");

    }


    function updateThemeIcon() {

        if (!themeIcon) return;

        if (body.classList.contains("light")) {

            themeIcon.className =
                "fas fa-sun";

        } else {

            themeIcon.className =
                "fas fa-moon";

        }

    }


    updateThemeIcon();


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                body.classList.toggle("light");

                const isLight =
                    body.classList.contains("light");

                localStorage.setItem(
                    "portfolio-theme",
                    isLight
                        ? "light"
                        : "dark"
                );

                updateThemeIcon();

            }
        );

    }


    /* =================================================
       MENU MOBILE
    ================================================= */

    if (menuToggle && navLinks) {

        menuToggle.addEventListener(
            "click",
            () => {

                navLinks.classList.toggle("active");

                const isOpen =
                    navLinks.classList.contains("active");

                const icon =
                    menuToggle.querySelector("i");

                if (icon) {

                    icon.className =
                        isOpen
                            ? "fas fa-xmark"
                            : "fas fa-bars";

                }

            }
        );


        navLinks
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        navLinks.classList.remove(
                            "active"
                        );

                        const icon =
                            menuToggle.querySelector("i");

                        if (icon) {

                            icon.className =
                                "fas fa-bars";

                        }

                    }
                );

            });

    }


    /* =================================================
       NAVBAR AU SCROLL
    ================================================= */

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 30) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        updateNavbar,
        {
            passive: true
        }
    );


    updateNavbar();


    /* =================================================
       REVEAL AU SCROLL
    ================================================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =================================================
       CURSEUR LUMINEUX
    ================================================= */

    const supportsFinePointer =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;


    if (
        cursorGlow &&
        supportsFinePointer
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let glowX = 0;
        let glowY = 0;


        document.addEventListener(
            "mousemove",
            event => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;

            }
        );


        function animateGlow() {

            glowX +=
                (mouseX - glowX) * 0.12;

            glowY +=
                (mouseY - glowY) * 0.12;


            cursorGlow.style.left =
                `${glowX}px`;

            cursorGlow.style.top =
                `${glowY}px`;


            requestAnimationFrame(
                animateGlow
            );

        }


        animateGlow();

    } else if (cursorGlow) {

        cursorGlow.style.display =
            "none";

    }


    /* =================================================
       TILT CARDS
    ================================================= */

    const tiltCards =
        document.querySelectorAll(
            ".tilt-card"
        );


    if (supportsFinePointer) {

        tiltCards.forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const centerX =
                        rect.width / 2;


                    const centerY =
                        rect.height / 2;


                    const rotateY =
                        ((x - centerX) /
                            centerX) * 4;


                    const rotateX =
                        ((centerY - y) /
                            centerY) * 4;


                    card.style.transform =
                        `
                        perspective(900px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateY(-4px)
                        scale(1.01)
                        `;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        });

    }


    /* =================================================
       ESC POUR FERMER LE MENU
    ================================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                if (
                    navLinks &&
                    navLinks.classList.contains("active")
                ) {

                    navLinks.classList.remove(
                        "active"
                    );

                }

                if (menuToggle) {

                    const icon =
                        menuToggle.querySelector("i");

                    if (icon) {

                        icon.className =
                            "fas fa-bars";

                    }

                }

            }

        }
    );


});