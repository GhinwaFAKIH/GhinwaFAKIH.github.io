document.addEventListener("DOMContentLoaded", () => {

    console.log("✅ Ginwa portfolio JavaScript loaded");


    /* =====================================================
       HERO AI NETWORK
    ===================================================== */

    const canvas = document.getElementById("ai-network");
    const hero = document.querySelector(".hero");

    if (canvas && hero) {

        const ctx = canvas.getContext("2d");

        let width = 0;
        let height = 0;

        const mouse = {
            x: null,
            y: null
        };

        const nodes = [];

        const nodeCount =
            window.innerWidth < 800 ? 30 : 75;

        function resizeCanvas() {

            const rect = hero.getBoundingClientRect();

            width = rect.width;
            height = rect.height;

            const dpr = window.devicePixelRatio || 1;

            canvas.width = width * dpr;
            canvas.height = height * dpr;

            canvas.style.width = width + "px";
            canvas.style.height = height + "px";

            ctx.setTransform(
                dpr,
                0,
                0,
                dpr,
                0,
                0
            );
        }

        resizeCanvas();

        window.addEventListener(
            "resize",
            resizeCanvas
        );


        /* CREATE NODES */

        for (let i = 0; i < nodeCount; i++) {

            nodes.push({

                x: Math.random() * width,
                y: Math.random() * height,

                vx:
                    (Math.random() - 0.5) *
                    0.35,

                vy:
                    (Math.random() - 0.5) *
                    0.35,

                radius:
                    Math.random() * 2 + 1.5
            });
        }


        /* MOUSE */

        hero.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    hero.getBoundingClientRect();

                mouse.x =
                    event.clientX -
                    rect.left;

                mouse.y =
                    event.clientY -
                    rect.top;
            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                mouse.x = null;
                mouse.y = null;
            }
        );


        /* ANIMATION */

        function animateNetwork() {

            ctx.clearRect(
                0,
                0,
                width,
                height
            );


            /* MOVE NODES */

            nodes.forEach(node => {

                node.x += node.vx;
                node.y += node.vy;


                if (
                    node.x < 0 ||
                    node.x > width
                ) {

                    node.vx *= -1;
                }


                if (
                    node.y < 0 ||
                    node.y > height
                ) {

                    node.vy *= -1;
                }


                /* MOUSE REPULSION */

                if (
                    mouse.x !== null &&
                    mouse.y !== null
                ) {

                    const dx =
                        node.x - mouse.x;

                    const dy =
                        node.y - mouse.y;

                    const distance =
                        Math.sqrt(
                            dx * dx +
                            dy * dy
                        );

                    const radius = 180;


                    if (
                        distance < radius &&
                        distance > 0
                    ) {

                        const force =
                            (radius - distance) /
                            radius;

                        node.x +=
                            (dx / distance) *
                            force *
                            1.5;

                        node.y +=
                            (dy / distance) *
                            force *
                            1.5;
                    }
                }

            });


            /* CONNECTIONS */

            for (
                let i = 0;
                i < nodes.length;
                i++
            ) {

                for (
                    let j = i + 1;
                    j < nodes.length;
                    j++
                ) {

                    const a = nodes[i];
                    const b = nodes[j];

                    const dx =
                        a.x - b.x;

                    const dy =
                        a.y - b.y;

                    const distance =
                        Math.sqrt(
                            dx * dx +
                            dy * dy
                        );


                    if (distance < 170) {

                        const opacity =
                            (1 - distance / 170) *
                            0.28;

                        ctx.beginPath();

                        ctx.moveTo(
                            a.x,
                            a.y
                        );

                        ctx.lineTo(
                            b.x,
                            b.y
                        );

                        ctx.strokeStyle =
                            `rgba(39,75,69,${opacity})`;

                        ctx.lineWidth = 1;

                        ctx.stroke();
                    }
                }
            }


            /* NODES */

            nodes.forEach(node => {

                ctx.beginPath();

                ctx.arc(
                    node.x,
                    node.y,
                    node.radius,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    "rgba(39,75,69,0.7)";

                ctx.fill();


                /* node glow */

                ctx.beginPath();

                ctx.arc(
                    node.x,
                    node.y,
                    node.radius * 3,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    "rgba(39,75,69,0.06)";

                ctx.fill();
            });


            requestAnimationFrame(
                animateNetwork
            );
        }


        animateNetwork();

        console.log(
            "✅ AI network animation running"
        );
    }


    /* =====================================================
       CURSOR GLOW
    ===================================================== */

    const glow =
        document.querySelector(
            ".cursor-glow"
        );


    if (glow) {

        document.addEventListener(
            "mousemove",
            event => {

                glow.style.left =
                    event.clientX + "px";

                glow.style.top =
                    event.clientY + "px";
            }
        );
    }

/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
    ".section-label, " +
    ".section h2, " +
    ".card, " +
    ".project, " +
    ".publication, " +
    ".teaching-grid, " +
    ".skills > div, " +
    ".contact"
);

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.05,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    revealElements.forEach((element, index) => {

        element.classList.add("reveal");

        element.style.setProperty(
            "--animation-delay",
            `${Math.min(index * 70, 350)}ms`
        );

        revealObserver.observe(element);
    });

} else {

    /* Fallback for browsers without IntersectionObserver */

    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}

    /* =====================================================
       PROJECT 3D EFFECT
    ===================================================== */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    projectCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth <= 800
                ) {
                    return;
                }


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


                const rotateX =
                    ((y - centerY) /
                    centerY) * -3;


                const rotateY =
                    ((x - centerX) /
                    centerX) * 3;


                card.style.setProperty(
                    "--rotate-x",
                    `${rotateX}deg`
                );

                card.style.setProperty(
                    "--rotate-y",
                    `${rotateY}deg`
                );
            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.setProperty(
                    "--rotate-x",
                    "0deg"
                );

                card.style.setProperty(
                    "--rotate-y",
                    "0deg"
                );
            }
        );
    });


    /* =====================================================
       PROFILE 3D EFFECT
    ===================================================== */

    const profileCard =
        document.querySelector(
            ".profile-card"
        );


    if (profileCard) {

        profileCard.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth <= 800
                ) {
                    return;
                }


                const rect =
                    profileCard.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;


                const rotateX =
                    ((y / rect.height) -
                    0.5) * -10;


                const rotateY =
                    ((x / rect.width) -
                    0.5) * 10;


                profileCard.style.setProperty(
                    "--profile-x",
                    `${rotateX}deg`
                );

                profileCard.style.setProperty(
                    "--profile-y",
                    `${rotateY}deg`
                );
            }
        );


        profileCard.addEventListener(
            "mouseleave",
            () => {

                profileCard.style.setProperty(
                    "--profile-x",
                    "0deg"
                );

                profileCard.style.setProperty(
                    "--profile-y",
                    "0deg"
                );
            }
        );
    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            ".nav-links a"
        );


    function updateNavigation() {

        let current = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;


            if (
                window.scrollY >= sectionTop
            ) {

                current =
                    section.id;
            }
        });


        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );


            if (
                link.getAttribute("href") ===
                `#${current}`
            ) {

                link.classList.add(
                    "active"
                );
            }
        });
    }


    window.addEventListener(
        "scroll",
        updateNavigation
    );


    updateNavigation();


    /* =====================================================
       SMOOTH BUTTON FEEDBACK
    ===================================================== */

    document
        .querySelectorAll(".button")
        .forEach(button => {

            button.addEventListener(
                "mouseenter",
                () => {

                    button.style.transform =
                        "translateY(-4px)";
                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform =
                        "translateY(0)";
                }
            );
        });


    console.log(
        "🚀 All portfolio animations initialized"
    );

});