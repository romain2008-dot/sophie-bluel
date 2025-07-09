import { API_BASE_URL } from "./config.js";

// Variable globale pour stocker tous les projets
let allProjects = [];

// Fonction pour récupérer et afficher les projets
async function loadProjects() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/works`);
        if (!response.ok) throw new Error('Erreur réseau');
        
        const projects = await response.json();
        allProjects = projects;
        displayProjects(projects);
    } catch (error) {
        console.error("Erreur lors de la récupération des projets :", error);
    }
}

// Appel de la fonction au chargement
loadProjects();

// Fonction d'affichage des projets
function displayProjects(projects) {
    const gallery = document.querySelector(".gallery");
    gallery.replaceChildren();

    projects.forEach(project => {
        const figure = document.createElement("figure");
        figure.dataset.id = project.id;

        const img = document.createElement("img");
        // Remplacer les URLs localhost par l'URL de production
        if (project.imageUrl.includes('localhost')) {
            const filename = project.imageUrl.split('/').pop();
            img.src = `${API_BASE_URL}/images/${filename}`;
        } else {
            img.src = project.imageUrl.startsWith('http') ? project.imageUrl : API_BASE_URL + project.imageUrl;
        }
        img.alt = project.title;

        const caption = document.createElement("figcaption");
        caption.textContent = project.title;

        figure.appendChild(img);
        figure.appendChild(caption);
        gallery.appendChild(figure);
    });
}

// Exporter les éléments nécessaires
export { allProjects, displayProjects, loadProjects };
