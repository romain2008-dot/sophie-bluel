document.addEventListener("DOMContentLoaded", async () => {
    const container = document.querySelector(".photos__container");

    try {
        const response = await fetch("http://localhost:5678/api/works");
        if (!response.ok) throw new Error("Erreur lors de la récupération des données");

        const works = await response.json();
        
        works.forEach(work => {
            const img = document.createElement("img");
            img.src = work.imageUrl;
            img.alt = work.title;

            container.appendChild(img);
        });

    } catch (error) {
        console.error(error);
    }
});
