
fetch('http://localhost:5678/api/categories')
    .then(function(response) {
        return response.json();
    })
    .then(function(categories) {
        const filtersContainer = document.querySelector('.filters');

        const allButton = document.createElement('button');
        allButton.textContent = 'Tous';
        allButton.classList.add('filter-button');
        allButton.classList.add('filter-button-selected'); 
        filtersContainer.appendChild(allButton);

        function handleButtonClick(event) {
            const buttons = document.querySelectorAll('.filter-button');
            buttons.forEach(button => {
                button.classList.remove('filter-button-selected');
            });

            event.target.classList.add('filter-button-selected');
        }

        allButton.addEventListener('click', handleButtonClick);

        categories.forEach(category => {
            const categoryButton = document.createElement('button');
            categoryButton.textContent = category.name;
            categoryButton.classList.add('filter-button');
            filtersContainer.appendChild(categoryButton);

            categoryButton.addEventListener('click', handleButtonClick);
        });
    })
    .catch(function(error) {
        console.error('Erreur lors du chargement des catégories:', error);
    });
