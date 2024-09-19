// Fonction pour vérifier si l'utilisateur est connecté
function estConnecte() {
    return fetch('/api/user')
        .then(response => response.json())
        .then(data => data.isConnected);
}

// Fonction pour obtenir les informations de l'utilisateur
function getUtilisateur() {
    return fetch('/api/user')
        .then(response => response.json())
        .then(data => data.user);
}

// Fonction pour mettre à jour l'interface utilisateur en fonction de l'état de connexion
function mettreAJourInterface() {
    estConnecte().then(connecte => {
        const elementsConnecte = document.querySelectorAll('.connecte');
        const elementsDeconnecte = document.querySelectorAll('.deconnecte');

        if (connecte) {
            elementsConnecte.forEach(el => el.style.display = '');
            elementsDeconnecte.forEach(el => el.style.display = 'none');
            
            // Mettre à jour le nom de l'utilisateur si nécessaire
            getUtilisateur().then(user => {
                const nomUtilisateurElements = document.querySelectorAll('.nom-utilisateur');
                nomUtilisateurElements.forEach(el => {
                    el.textContent = `${user.prenom} ${user.nom}`;
                });
            });
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