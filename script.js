// 1. Definimos nuestros proyectos como un Array de Objetos
const proyectos = [
    {
        titulo: "Sistema de Inventario",
        descripcion: "Una aplicación en Python para gestionar stock de productos con base de datos SQLite.",
        link: "https://github.com/Kramorant/inventario",
        tecnologia: "Python"
    },
    {
        titulo: "Analizador de Vulnerabilidades",
        descripcion: "Script que escanea puertos abiertos y detecta versiones de servicios obsoletos.",
        link: "https://github.com/Kramorant/scanner",
        tecnologia: "Bash / Ciberseguridad"
    },
    {
        titulo: "Web de Documentación",
        descripcion: "Este mismo portafolio, creado con HTML, CSS y JS puro.",
        link: "#",
        tecnologia: "Frontend"
    }
];

// 2. Función para renderizar los proyectos en el HTML
function cargarProyectos() {
    const contenedor = document.getElementById('project-list');
    
    // Limpiamos el contenedor por si acaso
    contenedor.innerHTML = "";

    // Recorremos el array y creamos el HTML de cada tarjeta
    proyectos.forEach(proyecto => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <h3>${proyecto.titulo}</h3>
            <p><strong>${proyecto.tecnologia}</strong></p>
            <p>${proyecto.descripcion}</p>
            <a href="${proyecto.link}" target="_blank" class="btn-small">Ver en GitHub</a>
        `;
        
        contenedor.appendChild(card);
    });
}

// 3. Manejo del formulario de contacto
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la página se recargue
        alert('¡Gracias por tu mensaje! (Esta es una simulación, necesitas un backend para recibirlo)');
        contactForm.reset();
    });
}

// Ejecutar la carga al iniciar
document.addEventListener('DOMContentLoaded', cargarProyectos);
