// Fonction pour vérifier si l'utilisateur est connecté
function estConnecte() {
    return localStorage.getItem('user') !== null;
}

// Fonction pour obtenir les informations de l'utilisateur
function getUtilisateur() {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
}

// Fonction pour mettre à jour l'interface utilisateur en fonction de l'état de connexion
function mettreAJourInterface() {
    const utilisateur = getUtilisateur();
    const elementsConnecte = document.querySelectorAll('.connecte');
    const elementsDeconnecte = document.querySelectorAll('.deconnecte');

    if (utilisateur) {
        elementsConnecte.forEach(el => el.style.display = '');
        elementsDeconnecte.forEach(el => el.style.display = 'none');
        // Mettez à jour les éléments avec les informations de l'utilisateur
        document.querySelectorAll('.nom-utilisateur').forEach(el => el.textContent = `${utilisateur.prenom} `);
    } else {
        elementsConnecte.forEach(el => el.style.display = 'none');
        elementsDeconnecte.forEach(el => el.style.display = '');
    }
}

// Fonction pour déconnecter l'utilisateur
function deconnecter() {
    fetch('/api/deconnexion', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            localStorage.removeItem('user');
            mettreAJourInterface();
            window.location.href = '/'; // Rediriger vers la page d'accueil
        })
        .catch(error => {
            console.error('Erreur lors de la déconnexion:', error);
        });
}

// Appeler cette fonction au chargement de chaque page
document.addEventListener('DOMContentLoaded', mettreAJourInterface);
