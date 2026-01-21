/* MODO OSCURO */
const toggleBtn = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
    if (toggleBtn) toggleBtn.textContent = currentTheme === "light" ? "🌙" : "☀️";
} else 
    document.documentElement.setAttribute("data-theme", "dark");
}

if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
        let theme = document.documentElement.getAttribute("data-theme") || "dark";
        let newTheme = theme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        toggleBtn.textContent = newTheme === "light" ? "🌙" : "☀️";
    });
}

/* CURSOR PERSONALIZADO */
const cursorOrb = document.querySelector(".cursor-orb");
if (cursorOrb && window.gsap) {
    window.addEventListener("mousemove", (e) => {
        gsap.to(cursorOrb, {
            duration: 0.18,
            x: e.clientX,
            y: e.clientY,
            ease: "power2.out"
        });
    });
}

/* EFECTO TILT 3D */
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

/* FILTRO PROYECTOS (solo en projects.html) */
const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");

if (filterButtons.length && window.gsap) {
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

/* TRANSICIÓN ENTRE PÁGINAS */
const pageTransition = document.querySelector(".page-transition");

function playTransition(href) {
    if (!pageTransition || !window.gsap) {
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

if (pageTransition && window.gsap) {
    // Entrada de página
    gsap.fromTo(
        pageTransition,
        { scaleX: 1, transformOrigin: "right" },
        { scaleX: 0, duration: 0.6, ease: "power4.inOut", delay: 0.1 }
    );

    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            if (!href) return;
            e.preventDefault();
            playTransition(href);
        });
    });

    // Animaciones de entrada hero/header
    gsap.from("header", {
        opacity: 0,
        y: -40,
        duration: 1.2,
        ease: "power4.out"
    });

    if (document.querySelector(".hero")) {
        gsap.from(".hero .glitch", {
            opacity: 0,
            y: 40,
            duration: 1.4,
            ease: "power4.out"
        });

        gsap.from(".hero-subtitle", {
            opacity: 0,
            y: 20,
            duration: 1.4,
            delay: 0.2,
            ease: "power4.out"
        });

        gsap.from(".hero p", {
            opacity: 0,
            y: 20,
            duration: 1.4,
            delay: 0.3,
            ease: "power2.out"
        });

        gsap.from(".btn-primary", {
            opacity: 0,
            scale: 0.8,
            duration: 1,
            delay: 0.4,
            ease: "back.out(1.7)"
        });
    }

    // Animaciones adicionales al hacer scroll
    if (window.ScrollTrigger) {
        gsap.utils.toArray("section").forEach(sec => {
            if (sec.classList.contains("hero")) return;

            gsap.from(sec, {
                opacity: 0,
                y: 30,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sec,
                    start: "top 80%"
                }
            });
        });
    }
}

/* Repositorios dinámicos */
async function loadRepos() {
    const container = document.getElementById("repo-list");
    if (!container) return;

    const res = await fetch("https://api.github.com/users/Kramorant/repos");
    const repos = await res.json();

    repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6)
        .forEach(repo => {
            const card = document.createElement("div");
            card.className = "repo-card";
            card.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || "Sin descripción"}</p>
                <p>⭐ ${repo.stargazers_count} — 🍴 ${repo.forks_count}</p>
                <a href="${repo.html_url}" target="_blank">Ver en GitHub</a>
            `;
            container.appendChild(card);
        });
}

/* Actividad reciente */
async function loadActivity() {
    const list = document.getElementById("activity-list");
    if (!list) return;

    const res = await fetch("https://api.github.com/users/Kramorant/events");
    const events = await res.json();

    events.slice(0, 5).forEach(ev => {
        const li = document.createElement("li");
        li.textContent = `${ev.type} — ${ev.repo.name}`;
        list.appendChild(li);
    });
}

// Load repos and activity when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        loadRepos();
        loadActivity();
    });
} else {
    loadRepos();
    loadActivity();
}

/* --- Animaciones GSAP para el Dashboard --- */

document.addEventListener("DOMContentLoaded", () => {
    // Solo ejecutamos si estamos en el dashboard
    if (!document.body.classList.contains("dashboard-body")) return;

    loadGitHubDashboard();

    if (typeof gsap !== "undefined") {
        // Animación nav holográfica
        gsap.to(".holographic-nav", {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.3
        });

        // Título principal con efecto holográfico
        gsap.from(".dashboard-container h1", {
            opacity: 0,
            y: -40,
            duration: 1.2,
            ease: "power3.out"
        });

        // Paneles que aparecen uno por uno
        gsap.from(".panel", {
            opacity: 0,
            y: 40,
            duration: 1.2,
            stagger: 0.25,
            ease: "power3.out"
        });

        // Avatar con efecto de zoom holográfico
        gsap.from(".gh-avatar", {
            opacity: 0,
            scale: 0.6,
            duration: 1.2,
            delay: 0.5,
            ease: "back.out(1.7)"
        });

        // Glow pulsante en el borde del avatar
        gsap.to(".gh-avatar", {
            boxShadow: "0 0 25px var(--accent)",
            repeat: -1,
            yoyo: true,
            duration: 2.5,
            ease: "sine.inOut"
        });

        // Estadísticas con fade-in suave
        gsap.from(".gh-stats img", {
            opacity: 0,
            scale: 0.9,
            duration: 1.2,
            stagger: 0.2,
            ease: "power2.out"
        });

        // Repos destacados con efecto de aparición holográfica
        gsap.from("#featured-list .repo-card", {
            opacity: 0,
            y: 30,
            duration: 1,
            stagger: 0.15,
            ease: "power2.out",
            delay: 1
        });

        // Actividad reciente con deslizamiento lateral
        gsap.from("#activity-list li", {
            opacity: 0,
            x: -30,
            duration: 1,
            stagger: 0.15,
            ease: "power2.out",
            delay: 1.2
        });

        // Animación del banner glitch futurista
gsap.to(".banner-glitch", {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "power3.out",
    delay: 0.4
});

// Efecto de aparición secuencial del texto
gsap.from(".banner-sub", {
    opacity: 0,
    x: -20,
    duration: 0.8,
    stagger: 0.15,
    ease: "power2.out",
    delay: 0.7
});

// Pequeño glitch en el título
gsap.fromTo(".banner-title",
    { x: -2 },
    {
        x: 2,
        repeat: 6,
        yoyo: true,
        duration: 0.05,
        ease: "sine.inOut",
        delay: 1.1
    }
);

// --- EFECTO DE ESCRITURA PARA EL BANNER ---

function typeLine(elementId, text, delay = 0) {
    const el = document.getElementById(elementId);
    if (!el) return;

    el.textContent = "";
    el.classList.add("typing-cursor");

    let i = 0;

    setTimeout(() => {
        const interval = setInterval(() => {
            el.textContent += text[i];
            i++;

            if (i === text.length) {
                clearInterval(interval);
                el.classList.remove("typing-cursor");
            }
        }, 40); // velocidad de escritura
    }, delay);
}

// Ejecutar typing effect después del despliegue del banner
setTimeout(() => {
    typeLine("boot-1", "Boot sequence initialized...", 0);
    typeLine("boot-2", "Loading GitHub modules... OK", 600);
    typeLine("boot-3", "Dashboard status: ONLINE", 1200);
}, 900);
        
    }
});

/* --- CONFIG --- */
const GH_USER = "Kramorant";

/* --- PERFIL + REPOS DESTACADOS + ACTIVIDAD --- */
async function loadGitHubDashboard() {
    try {
        const profileRes = await fetch(`https://api.github.com/users/${GH_USER}`);
        const profile = await profileRes.json();

        const avatar = document.getElementById("gh-avatar");
        const nameEl = document.getElementById("gh-name");
        const bioEl = document.getElementById("gh-bio");
        const followersEl = document.getElementById("gh-followers");

        if (avatar) avatar.src = profile.avatar_url;
        if (nameEl) nameEl.textContent = profile.name || profile.login;
        if (bioEl) bioEl.textContent = profile.bio || "Sin biografía";
        if (followersEl) followersEl.textContent = `👥 ${profile.followers} seguidores`;

        const reposRes = await fetch(`https://api.github.com/users/${GH_USER}/repos`);
        const repos = await reposRes.json();

        const featuredContainer = document.getElementById("featured-list");
        if (featuredContainer) {
            const featured = repos.filter(r => r.topics && r.topics.includes("portfolio"));
            featuredContainer.innerHTML = "";
            featured.forEach(repo => {
                const card = document.createElement("div");
                card.className = "repo-card";
                card.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description || "Sin descripción"}</p>
                    <a href="${repo.html_url}" target="_blank">Ver proyecto</a>
                `;
                featuredContainer.appendChild(card);
            });
        }

        const eventsRes = await fetch(`https://api.github.com/users/${GH_USER}/events`);
        const events = await eventsRes.json();

        const activityList = document.getElementById("activity-list");
        if (activityList) {
            activityList.innerHTML = "";
            events.slice(0, 5).forEach(ev => {
                const li = document.createElement("li");
                li.textContent = `${ev.type} — ${ev.repo.name}`;
                activityList.appendChild(li);
            });
        }
    } catch (err) {
        console.error("Error cargando dashboard:", err);
    }
}

/* --- TERMINAL --- */
const terminalOutput = document.getElementById("terminal-output");
const terminalInput = document.getElementById("terminal-input");

function printToTerminal(text) {
    if (!terminalOutput) return;
    const line = document.createElement("div");
    line.textContent = text;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

async function runCommand(cmd) {
    switch (cmd) {
        case "help":
            printToTerminal("Comandos disponibles:");
            printToTerminal("help - Mostrar ayuda");
            printToTerminal("whoami - Información del usuario");
            printToTerminal("repos - Lista de repositorios");
            printToTerminal("activity - Actividad reciente");
            printToTerminal("about - Información personal");
            printToTerminal("clear - Limpia la terminal");
            printToTerminal("motd - Versión compactada del banner");
            break;

        case "whoami":
            printToTerminal(`Usuario: ${GH_USER}`);
            break;

        case "repos": {
            const res = await fetch(`https://api.github.com/users/${GH_USER}/repos`);
            const repos = await res.json();
            repos.forEach(r => printToTerminal(`- ${r.name}`));
            break;
        }

        case "activity": {
            const res = await fetch(`https://api.github.com/users/${GH_USER}/events`);
            const events = await res.json();
            events.slice(0, 5).forEach(ev => printToTerminal(`${ev.type} — ${ev.repo.name}`));
            break;
        }

        case "about": 
    printToTerminal("Nombre: Pablo (alias: Kramorant)");
    printToTerminal("Rol: Estudiante de informática y desarrollador web en crecimiento");
    printToTerminal("Estilo: Interfaces futuristas, estética neon gamer, HUDs animados");
    printToTerminal("Filosofía: Crear experiencias que se sientan vivas, no solo páginas web");
    printToTerminal("Stack: HTML, CSS, JavaScript, GitHub, GSAP, UI/UX");
    printToTerminal("Proyecto actual: Dashboard holográfico personal");
    printToTerminal("Objetivo: Convertir mi portafolio en un ecosistema interactivo y evolutivo");
    break;
        
    case "clear":
    terminalOutput.innerHTML = "";
    break;

    case "motd":
    printToTerminal("=== KRAMORANT // SYSTEM ===");
    printToTerminal("Boot sequence initialized...");
    printToTerminal("Modules loaded successfully.");
    printToTerminal("Dashboard status: ONLINE");
    break;

        default:
            printToTerminal(`Comando no reconocido: ${cmd}`);
    }
}

if (terminalInput) {
    terminalInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const cmd = terminalInput.value.trim();
            if (!cmd) return;
            printToTerminal("> " + cmd);
            runCommand(cmd);
            terminalInput.value = "";
        }
    });
}
