// Fonction pour créer un élément de galerie
function createGalleryItem(work, container) {
    const div = document.createElement("div");
    div.classList.add("photo-item");
    div.dataset.id = work.id;

    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;

    const iconContainer = document.createElement("div");
    iconContainer.classList.add("icon-container");

    const trashIcon = document.createElement("i");
    trashIcon.classList.add("fa-solid", "fa-trash-can");
    
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
                div.remove();
                const galleryItem = document.querySelector(`.gallery [data-id="${work.id}"]`);
                if (galleryItem) galleryItem.remove();
                tousLesProjets = tousLesProjets.filter(projet => projet.id !== work.id);
                afficherProjets(tousLesProjets);
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    });

    iconContainer.appendChild(trashIcon);
    div.appendChild(img);
    div.appendChild(iconContainer);
    container.appendChild(div);
}

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.querySelector(".photos-container");

    try {
        const response = await fetch("http://localhost:5678/api/works");
        if (!response.ok) throw new Error("Erreur lors de la récupération des données");

        const works = await response.json();
        works.forEach(work => createGalleryItem(work, container));
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

function updateModal(works) {
    const container = document.querySelector(".photos-container");
    container.replaceChildren() // Vider le conteneur

    works.forEach(work => createGalleryItem(work, container));
}

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

const form = document.querySelector(".modal-add-file form");
const photoInput = form.querySelector('input[type="file"]');
const titleInput = form.querySelector('#title');
const categorySelect = form.querySelector('#category');
const errorMessage = document.createElement('p');
errorMessage.classList.add('error-message');
form.appendChild(errorMessage);

// Prévisualisation de l'image
photoInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const preview = document.querySelector('.upload-box');
            
            // Création d'une nouvelle image
            const img = document.createElement('img');
            img.src = event.target.result;
            
            // Suppression de l'ancienne image si elle existe
            const oldImg = preview.querySelector('img');
            if (oldImg) oldImg.remove();
            
            // Masquer les éléments existants
            preview.querySelector('i').style.display = 'none';
            preview.querySelector('.upload-text').style.display = 'none';
            preview.querySelector('.file-format').style.display = 'none';
            
            // Ajouter la nouvelle image
            preview.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
});

// Soumission du formulaire
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorMessage.textContent = '';

    const formData = new FormData();
    const photo = photoInput.files[0];
    const title = titleInput.value;
    const category = categorySelect.value;

    // Validation
    if (!photo || !title || !category) {
        errorMessage.textContent = "Tous les champs sont requis";
        return;
    }

    formData.append('image', photo);
    formData.append('title', title);
    formData.append('category', parseInt(category));

    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (response.ok) {
            const newWork = await response.json();
            
            // Mettre à jour les données
            const worksResponse = await fetch("http://localhost:5678/api/works");
            const works = await worksResponse.json();
            
            // Mettre à jour la galerie principale
            tousLesProjets = works;
            afficherProjets(works);
            
            // Mettre à jour la modal
            const container = document.querySelector(".photos-container");
            container.innerHTML = ''; // Vider le conteneur
            
            works.forEach(work => createGalleryItem(work, container));
            
            // Réinitialiser le formulaire
            form.reset();
            const uploadBox = document.querySelector('.upload-box');
            const previewImage = uploadBox.querySelector('img');
            if (previewImage) {
                previewImage.remove();
            }
            uploadBox.querySelector('i').style.display = 'block';
            uploadBox.querySelector('.upload-text').style.display = 'block';
            uploadBox.querySelector('.file-format').style.display = 'block';
            
            // Fermer la modal d'ajout et revenir à la galerie
            fileModal.classList.add('none');
            modalContent.classList.remove('none');
        } else {
            throw new Error('Erreur lors de l\'ajout du projet');
        }
    } catch (error) {
        console.error('Erreur:', error);
        errorMessage.textContent = "Une erreur est survenue lors de l'envoi du formulaire";
    }
});

const submitButton = form.querySelector('input[type="submit"]');

function checkFormValidity() {
    const isPhotoValid = photoInput.files.length > 0;
    const isTitleValid = titleInput.value.trim() !== '';
    const isCategoryValid = categorySelect.value !== '' && categorySelect.value !== 'Sélectionnez une Catégorie';

    if (isPhotoValid && isTitleValid && isCategoryValid) {
        submitButton.classList.remove('submit-button-disabled');
    } else {
        submitButton.classList.add('submit-button-disabled');
    }
}

// Ajouter les écouteurs d'événements
photoInput.addEventListener('change', checkFormValidity);
titleInput.addEventListener('input', checkFormValidity);
categorySelect.addEventListener('change', checkFormValidity);

// Initialiser l'état du bouton au chargement
checkFormValidity();