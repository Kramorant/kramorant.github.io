const projects = [
    {
        title: "Sistema de Gestión",
        description: "Aplicación CRUD desarrollada con Java y MySQL.",
        repo: "https://github.com/usuario/proyecto1"
    },
    {
        title: "Página Web Personal",
        description: "Sitio web estático con HTML, CSS y JS.",
        repo: "https://github.com/usuario/proyecto2"
    },
    {
        title: "API REST",
        description: "API creada con Node.js y Express.",
        repo: "https://github.com/usuario/proyecto3"
    }
];

const projectList = document.getElementById("project-list");

projects.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <a href="${p.repo}" target="_blank">Ver repositorio</a>
    `;
    projectList.appendChild(card);
});

document.getElementById("contact-form").addEventListener("submit", e => {
    e.preventDefault();
    alert("Mensaje enviado correctamente");
});
