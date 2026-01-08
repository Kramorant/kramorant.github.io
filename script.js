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

// 4. Traducciones
const textos = {
    es: {
        hero_h2: "Hola, soy un estudiante de informática",
        about_h2: "Sobre mí",
        projects_h2: "Proyectos",
        contact_h2: "Contacto"
    },
    en: {
        hero_h2: "Hi, I'm a Computer Science student",
        about_h2: "About me",
        projects_h2: "Projects",
        contact_h2: "Contact"
    }
};

// 5. Lógica de Modo Oscuro
const darkModeBtn = document.getElementById('dark-mode-toggle');
darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Cambiamos el icono del botón
    darkModeBtn.innerText = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// 6. Lógica de Idioma
const langSelector = document.getElementById('language-selector');
langSelector.addEventListener('change', (e) => {
    const lang = e.target.value;
    
    // Cambiamos textos específicos por ID (necesitarás añadir IDs en tu HTML)
    // Ejemplo: <h2 id="hero-title">...</h2>
    document.querySelector('.hero h2').innerText = textos[lang].hero_h2;
    document.querySelector('#sobre-mi h2').innerText = textos[lang].about_h2;
    document.querySelector('#proyectos h2').innerText = textos[lang].projects_h2;
    document.querySelector('#contacto h2').innerText = textos[lang].contact_h2;
    
    // También podrías actualizar el array de proyectos aquí para que cambien sus descripciones
});
