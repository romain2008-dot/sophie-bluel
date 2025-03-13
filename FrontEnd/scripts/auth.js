// Fonction pour vérifier si l'utilisateur est connecté
function checkAuth() {
    const token = localStorage.getItem("token");
    const loginLink = document.querySelector("nav li a[href='login.html']");
    
    if (loginLink === null || loginLink === undefined) return; 

    if (token) { // verifier si le token existe
        loginLink.textContent = "logout";
        loginLink.addEventListener("click", function(event) {
            event.preventDefault();
            localStorage.removeItem("token");
            window.location.reload();
        });
    } else {
        loginLink.textContent = "login";
    }
}

// Si on est sur la page de connexion
if (document.querySelector(".form")) { // Vérifier si la classe .form existe
    const loginForm = document.querySelector(".form");
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("http://localhost:5678/api/users/login", {
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
                alert("Erreur dans l'identifiant ou le mot de passe");
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            alert("Une erreur est survenue lors de la connexion");
        }
    });
}

// Exécuter checkAuth au chargement de la page
document.addEventListener("DOMContentLoaded", checkAuth);