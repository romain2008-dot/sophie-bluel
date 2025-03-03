document.addEventListener('DOMContentLoaded', function () {
    // Supposons que tu as déjà récupéré les données des projets
    fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(data => {
            // Récupérer les catégories uniques
            let categories = data.map(project => project.category.name);
            categories = [...new Set(categories)];  // Enlever les doublons

            // Créer un bouton "Tous"
            let filtersContainer = document.querySelector('.filters');
            let allButton = document.createElement('button');
            allButton.textContent = 'Tous';
            allButton.classList.add('filter-button');
            allButton.addEventListener('click', () => filterProjects('all'));
            filtersContainer.appendChild(allButton);

            // Créer un bouton pour chaque catégorie
            categories.forEach(category => {
                let categoryButton = document.createElement('button');
                categoryButton.textContent = category;
                categoryButton.classList.add('filter-button');
                categoryButton.addEventListener('click', () => filterProjects(category));
                filtersContainer.appendChild(categoryButton);
            });
        })
        .catch(error => console.error('Erreur lors du chargement des projets:', error));
});

// Fonction pour filtrer les projets
function filterProjects(category) {
    const allProjects = document.querySelectorAll('.gallery figure');
    allProjects.forEach(project => {
        const projectCategory = project.getAttribute('data-category');
        if (category === 'all' || projectCategory === category) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}
