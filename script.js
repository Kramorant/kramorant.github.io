/* MODO OSCURO */
const toggleBtn = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
    if (toggleBtn) toggleBtn.textContent = currentTheme === "light" ? "🌙" : "☀️";
} else {
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

loadActivity();

}

loadRepos();

/* --- GitHub Dashboard --- */

async function loadGitHubDashboard() {
    const user = "Kramorant";

/* --- PERFIL --- */
async function loadGitHubDashboard() {
    const user = "Kramorant";

    const profileRes = await fetch(`https://api.github.com/users/${user}`);
    const profile = await profileRes.json();

    document.getElementById("gh-avatar").src = profile.avatar_url;
    document.getElementById("gh-name").textContent = profile.name || profile.login;
    document.getElementById("gh-bio").textContent = profile.bio || "Sin biografía";
    document.getElementById("gh-followers").textContent = `👥 ${profile.followers} seguidores`;

    /* PROYECTOS DESTACADOS */
    const reposRes = await fetch(`https://api.github.com/users/${user}/repos`);
    const repos = await reposRes.json();

    const featured = repos.filter(r => r.topics && r.topics.includes("portfolio"));
    const featuredContainer = document.getElementById("featured-list");

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

    /* ACTIVIDAD RECIENTE */
    const eventsRes = await fetch(`https://api.github.com/users/${user}/events`);
    const events = await eventsRes.json();

    const activityList = document.getElementById("activity-list");

    events.slice(0, 5).forEach(ev => {
        const li = document.createElement("li");
        li.textContent = `${ev.type} — ${ev.repo.name}`;
        activityList.appendChild(li);
    });
}

loadGitHubDashboard();

/* --- TERMINAL --- */
const terminalOutput = document.getElementById("terminal-output");
const terminalInput = document.getElementById("terminal-input");

function printToTerminal(text) {
    const line = document.createElement("div");
    line.textContent = text;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

async function runCommand(cmd) {
    const user = "Kramorant";

    switch (cmd) {
        case "help":
            printToTerminal("help - Mostrar ayuda");
            printToTerminal("whoami - Información del usuario");
            printToTerminal("repos - Lista de repositorios");
            printToTerminal("activity - Actividad reciente");
            break;

        case "whoami":
            printToTerminal(`Usuario: ${user}`);
            break;

        case "repos":
            const reposRes = await fetch(`https://api.github.com/users/${user}/repos`);
            const repos = await reposRes.json();
            repos.forEach(r => printToTerminal(`- ${r.name}`));
            break;

        case "activity":
            const eventsRes = await fetch(`https://api.github.com/users/${user}/events`);
            const events = await eventsRes.json();
            events.slice(0, 5).forEach(ev => printToTerminal(`${ev.type} — ${ev.repo.name}`));
            break;

        default:
            printToTerminal(`Comando no reconocido: ${cmd}`);
    }
}

terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const cmd = terminalInput.value.trim();
        printToTerminal("> " + cmd);
        runCommand(cmd);
        terminalInput.value = "";
    }
});

/* --- LOGS EN VIVO --- */
const logsContainer = document.getElementById("logs-container");

function addLog(text, type = "log-purple") {
    const entry = document.createElement("div");
    entry.className = `log-entry ${type}`;
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${text}`;
    logsContainer.appendChild(entry);
    logsContainer.scrollTop = logsContainer.scrollHeight;
}

async function updateLogs() {
    const user = "Kramorant";
    const res = await fetch(`https://api.github.com/users/${user}/events`);
    const events = await res.json();

    events.slice(0, 5).forEach(ev => {
        let color = "log-purple";

        if (ev.type.includes("Push")) color = "log-green";
        if (ev.type.includes("Watch")) color = "log-blue";
        if (ev.type.includes("Fork")) color = "log-yellow";

        addLog(`${ev.type} — ${ev.repo.name}`, color);
    });
}

updateLogs();
setInterval(updateLogs, 30000);

/* --- ANIMACIONES GSAP --- */
document.addEventListener("DOMContentLoaded", () => {

    gsap.to(".holographic-nav", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3
    });

    gsap.from(".panel", {
        opacity: 0,
        y: 40,
        duration: 1.2,
        stagger: 0.25,
        ease: "power3.out"
    });
});
