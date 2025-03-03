
    fetch("http://localhost:5678/api/works")
        .then(response => response.json()) // Convertir la réponse en JSON
        .then(projets => afficherProjets(projets)) // Appeler la fonction pour afficher les projets
        .catch(error => console.error("Erreur lors de la récupération des projets :", error));


function afficherProjets(projets) {
    const gallery = document.querySelector(".gallery"); 

    projets.forEach(projet => {
        const figure = document.createElement("figure"); 

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
