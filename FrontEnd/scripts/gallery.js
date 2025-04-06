// Variable globale pour stocker tous les projets
let allProjects = [];

// Fonction pour récupérer et afficher les projets
function loadProjects() {
    fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(projects=> {
            // Stocker tous les projets dans la variable globale
            allProjects = projects;
            // Afficher tous les projets au chargement initial
            displayProjects(projects);
        })
        .catch(error => console.error("Erreur lors de la récupération des projets :", error));
}

loadProjects();

// Fonction pour afficher les projets
function displayProjects(projects) {
    const gallery = document.querySelector(".gallery");
    gallery.replaceChildren(); // Vider la galerie avant d'afficher les projets

    projects.forEach(project => {
        const figure = document.createElement("figure");

        const img = document.createElement("img");
        img.src = project.imageUrl;
        img.alt = project.title;

        const caption = document.createElement("figcaption");
        caption.textContent = projects.title;

        figure.appendChild(img);
        figure.appendChild(caption);
        gallery.appendChild(figure);
    });
}
