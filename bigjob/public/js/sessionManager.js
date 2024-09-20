// Fonction pour vérifier si l'utilisateur est connecté
function estConnecte() {
    return fetch('/api/check-auth')
        .then(response => response.json())
        .then(data => data.isAuthenticated);
}

// Fonction pour obtenir les informations de l'utilisateur
function getUtilisateur() {
    return fetch('/api/check-auth')
        .then(response => response.json())
        .then(data => data.isAuthenticated ? data.user : null);
}

// Fonction pour mettre à jour l'interface utilisateur en fonction de l'état de connexion
function mettreAJourInterface() {
    getUtilisateur().then(utilisateur => {
        const elementsConnecte = document.querySelectorAll('.connecte');
        const elementsDeconnecte = document.querySelectorAll('.deconnecte');

        if (utilisateur) {
            elementsConnecte.forEach(el => el.style.display = '');
            elementsDeconnecte.forEach(el => el.style.display = 'none');
            // Vous pouvez ajouter ici du code pour afficher le nom de l'utilisateur, etc.
        } else {
            elementsConnecte.forEach(el => el.style.display = 'none');
            elementsDeconnecte.forEach(el => el.style.display = '');
        }
    });
}

// Fonction pour déconnecter l'utilisateur
function deconnecter() {
    fetch('/api/deconnexion', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            mettreAJourInterface();
            window.location.href = '/'; // Rediriger vers la page d'accueil
        })
        .catch(error => {
            console.error('Erreur lors de la déconnexion:', error);
        });
}

// Appeler cette fonction au chargement de chaque page
document.addEventListener('DOMContentLoaded', mettreAJourInterface);
