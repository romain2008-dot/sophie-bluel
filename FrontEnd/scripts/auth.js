import { API_BASE_URL } from "./config.js";

// Fonction pour vérifier si l'utilisateur est connecté
function checkAuth() {
    const token = localStorage.getItem("token");
    const loginLink = document.querySelector("nav li a[href='login.html']");
    
    if (loginLink === null || loginLink === undefined) return; 

    if (token) { // verifier si le token existe
        loginLink.textContent = "logout";
        loginLink.addEventListener("click", function(event) {
            if (localStorage.getItem("token")) {
                event.preventDefault();
                logout();
            }
        });
    } else {
        loginLink.textContent = "login";
    }
}

// Fonction pour déconnecter l'utilisateur
function logout() {
    localStorage.removeItem("token");
    
    const editMode = document.querySelector(".edit__mode");
    const modifier = document.querySelector(".modifier");
    const filtersContainer = document.querySelector(".filters");
    
    editMode.classList.add("none");
    modifier.classList.add("none");
    filtersContainer.classList.remove("none");
    
    const loginLink = document.querySelector("nav li a[href='login.html']");
    if (loginLink) loginLink.textContent = "login";
}

// Fonction pour afficher un message d'erreur
function showError(message) {
    const errorContainer = document.querySelector('.error-message-container');
    const errorMessage = document.querySelector('.error-message');
    
    errorMessage.textContent = message;
}

// Si on est sur la page de connexion
if (document.querySelector(".form")) {
    const loginForm = document.querySelector(".form");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        showError('');

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch(`${API_BASE_URL}/api/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                window.location.href = "index.html";
            } else {
                showError("Erreur dans l'identifiant ou le mot de passe");
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            showError("Une erreur est survenue lors de la connexion");
        }
    });
}

// Exécuter checkAuth au chargement de la page
document.addEventListener("DOMContentLoaded", checkAuth);