let globalCategories = [];

async function loadCategories() {
    try {
        const response = await fetch("http://localhost:5678/api/categories");
        if (!response.ok) throw new Error('Erreur réseau');
        
        const categories = await response.json();
        globalCategories = categories;

        // Déclencher l'événement
        const event = new CustomEvent('categoriesLoaded', { detail: globalCategories });
        document.dispatchEvent(event);

        // Création des boutons
        const filtersContainer = document.querySelector(".filters");

        // Bouton "Tous"
        const allButton = document.createElement("button");
        allButton.textContent = "Tous";
        allButton.classList.add("filter-button", "filter-button-selected");
        filtersContainer.appendChild(allButton);

        // Gestionnaire de clic pour les boutons
        function handleButtonClick(event) {
            document.querySelectorAll(".filter-button")
                .forEach(button => button.classList.remove("filter-button-selected"));
            event.target.classList.add("filter-button-selected");
        }

        // Event listener pour "Tous"
        allButton.addEventListener("click", (event) => {
            handleButtonClick(event);
            if (typeof filterProjects === "function") {
                filterProjects("Tous");
            }
        });

        // Création des boutons de catégorie
        categories.forEach(category => {
            const categoryButton = document.createElement("button");
            categoryButton.textContent = category.name;
            categoryButton.classList.add("filter-button");
            filtersContainer.appendChild(categoryButton);

            categoryButton.addEventListener("click", (event) => {
                handleButtonClick(event);
                if (typeof filterProjects === "function") {
                    filterProjects(category.name);
                }
            });
        });

    } catch (error) {
        console.error("Erreur lors du chargement des catégories:", error);
    }
}

// Appel de la fonction au chargement
loadCategories();

// Fonction de filtrage des projets
function filterProjects(categoryName) {
    const filteredProjects = categoryName === "Tous" 
        ? allProjects 
        : allProjects.filter(projet => projet.category.name === categoryName);
    displayProjects(filteredProjects);
}