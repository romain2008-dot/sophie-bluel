import { API_BASE_URL } from './config.js';

function createGalleryItem(work, container) {
    const div = document.createElement("div");
    div.classList.add("photo-item");
    div.dataset.id = work.id;

    const img = document.createElement("img");
    img.src = work.imageUrl.startsWith('http') ? work.imageUrl : API_BASE_URL + work.imageUrl;
    img.alt = work.title;

    const iconContainer = document.createElement("div");
    iconContainer.classList.add("icon-container");

    const trashIcon = document.createElement("i");
    trashIcon.classList.add("fa-solid", "fa-trash-can");
    
    div.addEventListener("click", async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/works/${work.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                // Supprimer les éléments visuels
                div.remove();
                const galleryItem = document.querySelector(`.gallery [data-id="${work.id}"]`);
                if (galleryItem) galleryItem.remove();
                await loadProjects();
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
        const response = await fetch(`${API_BASE_URL}/api/works`);
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

// Prévisualisation de l'image
const MAX_FILE_SIZE = 4 * 1024 * 1024;

photoInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    
    if (file) {
        // Vérification de la taille
        if (file.size > MAX_FILE_SIZE) {
            showError('Le fichier ne doit pas dépasser 4mo');
            photoInput.value = ''; // Réinitialise l'input
            return;
        }

        // Si tout est ok, continuer avec la prévisualisation
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
    showError('');
    const formData = new FormData();
    const photo = photoInput.files[0];
    const title = titleInput.value;
    const category = categorySelect.value;

    // Validation
    if (!photo || !title || !category || category === 'Sélectionnez une Catégorie') {
        showError('Tous les champs sont requis');
        return;
    }

    formData.append('image', photo);
    formData.append('title', title);
    formData.append('category', parseInt(category));

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/api/works`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (response.ok) {
            
            // Mettre à jour les données
            const worksResponse = await fetch(`${API_BASE_URL}/api/works`);
            const works = await worksResponse.json();
            
            // Mettre à jour la galerie principale
            allProjects = works;
            displayProjects(works);
            
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
            // Au lieu de block, utilisez la valeur d'affichage appropriée pour chaque élément
            uploadBox.querySelector('i').style.display = '';  // Supprime le style inline
            uploadBox.querySelector('.upload-text').style.display = '';  // Supprime le style inline
            uploadBox.querySelector('.file-format').style.display = '';  // Supprime le style inline
            
            // Fermer la modal d'ajout et revenir à la galerie
            fileModal.classList.add('none');
            modalContent.classList.add('none');
            modal.classList.add('none');
        } else {
            throw new Error('Erreur lors de l\'ajout du projet');
        }
    } catch (error) {
        console.error('Erreur:', error);
        showError("Une erreur est survenue lors de l'envoi du formulaire");
    }
});

const submitButton = form.querySelector('input[type="submit"]');

function checkFormValidity() {
    const isPhotoValid = photoInput.files.length > 0;
    
    if (isPhotoValid) {
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