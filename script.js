/* MODO OSCURO */
const toggleBtn = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
    toggleBtn.textContent = currentTheme === "dark" ? "☀️" : "🌙";
}

toggleBtn.addEventListener("click", () => {
    let theme = document.documentElement.getAttribute("data-theme");
    let newTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    toggleBtn.textContent = newTheme === "dark" ? "☀️" : "🌙";
});

/* FILTRO DE TAGS EN projects.html */
const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".filter-btn.active").classList.remove("active");
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        projectItems.forEach(item => {
            const category = item.getAttribute("data-category");

            if (filter === "all" || filter === category) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
});
