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

chargerProjets();

// Fonction pour afficher les projets
function afficherProjets(projets) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = ""; // Vider la galerie avant d'afficher les projets

    projets.forEach(projet => {
        const figure = document.createElement("figure");
        figure.dataset.id = projet.id; // Ajouter l'ID comme attribut de données

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
