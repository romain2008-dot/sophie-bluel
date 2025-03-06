document.addEventListener("DOMContentLoaded", async () => {
    const container = document.querySelector(".photos-container");

    try {
        const response = await fetch("http://localhost:5678/api/works");
        if (!response.ok) throw new Error("Erreur lors de la récupération des données");

        const works = await response.json();
        
        works.forEach(work => {
            const div = document.createElement("div");
            div.classList.add("photo-item");

            const img = document.createElement("img");
            img.src = work.imageUrl;
            img.alt = work.title;

            const iconContainer = document.createElement("div");
            iconContainer.classList.add("icon-container");

            const trashIcon = document.createElement("i");
            trashIcon.classList.add("fa-solid", "fa-trash-can");

            iconContainer.appendChild(trashIcon);
            div.appendChild(img);
            div.appendChild(iconContainer);
            container.appendChild(div);
        });

    } catch (error) {
        console.error(error);
    }
});
