document.addEventListener("DOMContentLoaded", async () => {
    const container = document.querySelector(".photos-container");

    try {
        const response = await fetch("http://localhost:5678/api/works");
        if (!response.ok) throw new Error("Erreur lors de la récupération des données");

        const works = await response.json();
        
        works.forEach(work => {
            const div = document.createElement("div");
            div.classList.add("photo-item");
            div.dataset.id = work.id; // Ajouter l'ID comme attribut de données

            const img = document.createElement("img");
            img.src = work.imageUrl;
            img.alt = work.title;

            const iconContainer = document.createElement("div");
            iconContainer.classList.add("icon-container");

            const trashIcon = document.createElement("i");
            trashIcon.classList.add("fa-solid", "fa-trash-can");
            // Ajouter l'événement de clic pour la suppression
            trashIcon.addEventListener("click", async () => {
                try {
                    const token = localStorage.getItem('token');
                    const response = await fetch(`http://localhost:5678/api/works/${work.id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        // Supprime l'élément de la modal
                        div.remove();
                        
                        // Supprime l'élément de la galerie principale
                        const galleryItem = document.querySelector(`.gallery [data-id="${work.id}"]`);
                        if (galleryItem) galleryItem.remove();
                        
                        // Mettre à jour tousLesProjets
                        tousLesProjets = tousLesProjets.filter(projet => projet.id !== work.id);
                        
                        // Réafficher la galerie avec les projets mis à jour
                        afficherProjets(tousLesProjets);
                    } else {
                        throw new Error('Erreur lors de la suppression');
                    }
                } catch (error) {
                    console.error('Erreur:', error);
                }
            });

            iconContainer.appendChild(trashIcon);
            div.appendChild(img);
            div.appendChild(iconContainer);
            container.appendChild(div);
        });

    } catch (error) {
        console.error(error);
    }

    // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem('token');
    if (token !== null) {
        const editMode = document.querySelector(".edit__mode");
        const modifier = document.querySelector(".modifier");
        const filtersContainer = document.querySelector(".filters");
        editMode.classList.remove("none");
        modifier.classList.remove("none");
        filtersContainer.classList.add("none");
    }
});

// Gestion de l'ouverture et de la fermeture de la modal
const modifierButton = document.querySelector(".modifier");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const closeButtons = document.querySelectorAll(".close");
const modalButton = document.querySelector("#modal-button");
const fileModal = document.querySelector(".modal-add-file");
const backButton = document.querySelector(".fa-solid.fa-arrow-left");

modifierButton.addEventListener("click", () => {
    modalContent.classList.remove("none");
    modal.classList.remove("none");
});

closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        modalContent.classList.add("none");
        fileModal.classList.add("none");
        modal.classList.add("none");
    });
});

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modalContent.classList.add("none");
        modal.classList.add("none");
        fileModal.classList.add("none");
    }
});

modalButton.addEventListener("click", () => {
    modalContent.classList.add("none");
    fileModal.classList.remove("none");
});

backButton.addEventListener("click", () => {
    fileModal.classList.add("none");
    modalContent.classList.remove("none");
});

document.addEventListener('categoriesLoaded', (event) => {
    const categories = event.detail;
    const select = document.querySelector("#category");
    categories.forEach(category => {
        const categoryOption = document.createElement("option");
        categoryOption.value = category.id;
        categoryOption.textContent = category.name;
        select.appendChild(categoryOption);
    });
});

