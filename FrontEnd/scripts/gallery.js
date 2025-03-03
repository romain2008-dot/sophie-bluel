// Variable globale pour stocker tous les projets
let tousLesProjets = [];

// Fonction pour récupérer et afficher les projets
function chargerProjets() {
    fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(projets => {
            // Stocker tous les projets dans la variable globale
            tousLesProjets = projets;
            // Afficher tous les projets au chargement initial
            afficherProjets(projets);
        })
        .catch(error => console.error("Erreur lors de la récupération des projets :", error));
}

// Fonction pour afficher les projets
function afficherProjets(projets) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = ''; // Vider la galerie avant d'afficher les projets

    projets.forEach(projet => {
        const figure = document.createElement("figure");

        const img = document.createElement("img");
        img.src = projet.imageUrl;
        img.alt = projet.title;

        const caption = document.createElement("figcaption");
        caption.textContent = projet.title;

        figure.appendChild(img);
        figure.appendChild(caption);
        gallery.appendChild(figure);
    });
}

// Fonction pour filtrer les projets par catégorie
function filterProjects(categoryName) {
    let projetsFiltres;
    
    if (categoryName === 'Tous') {
        // Si on clique sur "Tous", afficher tous les projets
        projetsFiltres = tousLesProjets;
    } else {
        // Sinon, filtrer les projets par catégorie
        projetsFiltres = tousLesProjets.filter(projet => projet.category.name === categoryName);
    }
    
    // Afficher les projets filtrés
    afficherProjets(projetsFiltres);
}

// Exécuter le chargement des projets au démarrage
chargerProjets();