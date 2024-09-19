document.addEventListener('DOMContentLoaded', function() {
    const connexionForm = document.getElementById('connexion-form');
    if (connexionForm) {
        connexionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            connexion(email, password)
                .then(() => {
                    window.location.href = '/'; // Rediriger vers la page d'accueil après connexion
                })
                .catch(error => {
                    alert(error.message);
                });
        });
    }

    // Gestionnaire d'événements pour le formulaire d'inscription
    const inscriptionForm = document.getElementById('inscription-form');
    if (inscriptionForm) {
        inscriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const prenom = document.getElementById('prenom').value;
            const nom = document.getElementById('nom').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            inscription(prenom, nom, email, password)
                .then(() => {
                    window.location.href = '/'; // Rediriger vers la page d'accueil après inscription
                })
                .catch(error => {
                    alert(error.message);
                });
        });
    }
});

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

// Fonction pour gérer la connexion
function connexion(email, password) {
    return fetch('/api/connexion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.error || 'Erreur de connexion') });
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            throw new Error(data.error);
        }
        // Mettre à jour l'interface utilisateur ici
        mettreAJourInterface();
        return data;
    });
}

// Fonction pour gérer l'inscription
function inscription(prenom, nom, email, password) {
    return fetch('/api/inscription', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prenom, nom, email, password }),
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            throw new Error(data.error);
        }
        return data;
    });
}

// Fonction pour déconnecter l'utilisateur
function deconnecter() {
    return fetch('/api/deconnexion', { 
        method: 'POST',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            throw new Error(data.error);
        }
        window.location.href = '/'; // Rediriger vers la page d'accueil
    })
    .catch(error => {
        console.error('Erreur lors de la déconnexion:', error);
    });
}

// Exporter les fonctions pour les utiliser dans d'autres fichiers si nécessaire
export { estConnecte, connexion, inscription, deconnecter };
