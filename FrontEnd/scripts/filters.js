let categoriesGlobales = [];

fetch("http://localhost:5678/api/categories")
    .then(function(response) {
        return response.json();
    })
    .then(function(categories) {
        categoriesGlobales = categories; // Stocker les catégories dans la variable globale

        // Déclencher un événement personnalisé pour notifier que les catégories sont prêtes
        const event = new CustomEvent('categoriesLoaded', { detail: categoriesGlobales });
        document.dispatchEvent(event);

        // Création du bouton "Tous"
        const filtersContainer = document.querySelector(".filters");

        const allButton = document.createElement("button");
        allButton.textContent = "Tous";
        allButton.classList.add("filter-button");
        allButton.classList.add("filter-button-selected");
        filtersContainer.appendChild(allButton);

        // Ajouter ou enlever la classe filter-button-selected des boutons
        function handleButtonClick(event) {
            const buttons = document.querySelectorAll(".filter-button");
            buttons.forEach(button => {
                button.classList.remove("filter-button-selected");
            });

            event.target.classList.add("filter-button-selected");
        }

        // Ajout d'un event listener sur le bouton "Tous"
        allButton.addEventListener("click", (event) => {
            handleButtonClick(event);
            // S'assurer que filterProjects est disponible
            if (typeof filterProjects === "function") {
                filterProjects("Tous");
            } else {
                console.error("La fonction filterProjects n'est pas disponible");
            }
        });

        // Création des boutons filtres grâce à la réponse de l'API
        categories.forEach(category => {
            const categoryButton = document.createElement("button");
            categoryButton.textContent = category.name;
            categoryButton.classList.add("filter-button");
            filtersContainer.appendChild(categoryButton);

            // Ajout d'un event listener sur les boutons filtres
            categoryButton.addEventListener("click", (event) => {
                handleButtonClick(event);
                // S'assurer que filterProjects est disponible
                if (typeof filterProjects === "function") {
                    filterProjects(category.name);
                } else {
                    console.error("La fonction filterProjects n'est pas disponible");
                }
            });
        });
    })
    // Gestion des erreurs
    .catch(function(error) {
        console.error("Erreur lors du chargement des catégories:", error);
    });

// Fonction pour filtrer les projets par catégorie
function filterProjects(categoryName) {
    let projetsFiltres;
    
    if (categoryName === "Tous") {
        // Si on clique sur "Tous", afficher tous les projets
        projetsFiltres = tousLesProjets;
    } else {
        // Sinon, filtrer les projets par catégorie
        projetsFiltres = tousLesProjets.filter(projet => projet.category.name === categoryName);
    }
    
    // Afficher les projets filtrés
    afficherProjets(projetsFiltres);
}