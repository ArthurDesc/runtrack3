// Fonction pour vérifier si l'utilisateur est connecté
function estConnecte() {
    return fetch('/api/check-session', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => data.isAuthenticated)
    .catch(error => {
        console.error('Erreur lors de la vérification de la session:', error);
        return false;
    });
}

// Fonction pour obtenir les informations de l'utilisateur
function getUtilisateur() {
    return fetch('/api/user-info', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => data.user)
    .catch(error => {
        console.error('Erreur lors de la récupération des informations utilisateur:', error);
        return null;
    });
}

// Fonction pour mettre à jour l'interface utilisateur en fonction de l'état de connexion
async function mettreAJourInterface() {
    const connecte = await estConnecte();
    const elementsConnecte = document.querySelectorAll('.connecte');
    const elementsDeconnecte = document.querySelectorAll('.deconnecte');

    if (connecte) {
        const utilisateur = await getUtilisateur();
        elementsConnecte.forEach(el => el.style.display = '');
        elementsDeconnecte.forEach(el => el.style.display = 'none');
        document.querySelectorAll('.nom-utilisateur').forEach(el => {
            el.textContent = `${utilisateur.prenom} ${utilisateur.nom}`;
        });
    } else {
        elementsConnecte.forEach(el => el.style.display = 'none');
        elementsDeconnecte.forEach(el => el.style.display = '');
    }
}

// Fonction pour déconnecter l'utilisateur
function deconnecter() {
    return fetch('/api/deconnexion', { 
        method: 'POST',
        credentials: 'include'
    })
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

// Exporter les fonctions pour les utiliser dans d'autres fichiers si nécessaire
export { estConnecte, getUtilisateur, mettreAJourInterface, deconnecter };
