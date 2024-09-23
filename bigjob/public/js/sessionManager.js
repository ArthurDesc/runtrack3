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
        const elementsAdmin = document.querySelectorAll('.admin-only');
        const elementsModerator = document.querySelectorAll('.moderator-only');

        if (utilisateur) {
            elementsConnecte.forEach(el => el.style.display = '');
            elementsDeconnecte.forEach(el => el.style.display = 'none');
            
            // Afficher le nom de l'utilisateur
            const nomUtilisateurElements = document.querySelectorAll('.nom-utilisateur');
            nomUtilisateurElements.forEach(el => el.textContent = `${utilisateur.prenom} `);
            
            // Afficher le bouton d'administration si l'utilisateur est admin ou moderator
            if (utilisateur.role === 'admin') {
                elementsAdmin.forEach(el => el.style.display = '');
                elementsModerator.forEach(el => el.style.display = 'none');
            }   else if (utilisateur.role === 'moderator') {
                elementsModerator.forEach(el => el.style.display = '');
                elementsAdmin.forEach(el => el.style.display = 'none');
            } else {
                elementsModerator.forEach(el => el.style.display = 'none');
                elementsAdmin.forEach(el => el.style.display = 'none');
            }
        } else {
            elementsConnecte.forEach(el => el.style.display = 'none');
            elementsDeconnecte.forEach(el => el.style.display = '');
            elementsAdmin.forEach(el => el.style.display = 'none');
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
