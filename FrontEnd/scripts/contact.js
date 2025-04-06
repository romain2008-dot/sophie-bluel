document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const confirmationMessage = document.getElementById('confirmation-message');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Récupération des valeurs du formulaire
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Validation basique
        if (name && email && message) {
            // Afficher le message de confirmation
            confirmationMessage.classList.remove('none');
            
            // Réinitialisation du formulaire
            contactForm.reset();

            // Cacher le message après 3 secondes
            setTimeout(() => {
                confirmationMessage.classList.add('none');
            }, 3000);
        }
    });
});