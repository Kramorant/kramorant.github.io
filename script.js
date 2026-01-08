/* MODO OSCURO */
const toggleBtn = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
    if (toggleBtn) toggleBtn.textContent = currentTheme === "dark" ? "☀️" : "🌙";
}

if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
        let theme = document.documentElement.getAttribute("data-theme") || "light";
        let newTheme = theme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        toggleBtn.textContent = newTheme === "dark" ? "☀️" : "🌙";
    });
}

/* CURSOR PERSONALIZADO */
const cursorOrb = document.querySelector(".cursor-orb");
if (cursorOrb) {
    window.addEventListener("mousemove", (e) => {
        gsap.to(cursorOrb, {
            duration: 0.18,
            x: e.clientX,
            y: e.clientY,
            ease: "power2.out"
        });
    });
}

/* EFECTO TILT 3D (si existen .tilt) */
document.querySelectorAll(".tilt").forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        card.style.transform = `rotateY(${x / 20}deg) rotateX(${-y / 20}deg) scale(1.05)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
    });
});

/* FILTRO DE PROYECTOS (solo en projects.html) */
const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");

if (filterButtons.length) {
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const active = document.querySelector(".filter-btn.active");
            if (active) active.classList.remove("active");
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");

            projectItems.forEach(item => {
                const category = item.getAttribute("data-category");

                if (filter === "all" || filter === category) {
                    item.style.display = "block";
                    gsap.fromTo(item,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
                    );
                } else {
                    gsap.to(item, {
                        opacity: 0,
                        y: 10,
                        duration: 0.25,
                        onComplete: () => (item.style.display = "none")
                    });
                }
            });
        });
    });
}

/* TRANSICIÓN ENTRE PÁGINAS (tipo SPA) */
const pageTransition = document.querySelector(".page-transition");

function playTransition(href) {
    if (!pageTransition) {
        window.location.href = href;
        return;
    }

    gsap.to(pageTransition, {
        scaleX: 1,
        transformOrigin: "left",
        duration: 0.5,
        ease: "power4.inOut",
        onComplete: () => {
            window.location.href = href;
        }
    });
}

if (pageTransition) {
    // Página entrando
    gsap.fromTo(
        pageTransition,
        { scaleX: 1, transformOrigin: "right" },
        { scaleX: 0, duration: 0.6, ease: "power4.inOut", delay: 0.1 }
    );

    // Interceptar clics en enlaces internos
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            if (!href) return;
            e.preventDefault();
            playTransition(href);
        });
    });
}

/* ANIMACIONES GSAP EXTRA (scroll suave sobre secciones) */
if (window.gsap && window.ScrollTrigger) {
    gsap.utils.toArray("section").forEach(sec => {
        gsap.from(sec, {
            opacity: 0,
            y: 40,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
                trigger: sec,
                start: "top 80%"
            }
        });
    });
}
