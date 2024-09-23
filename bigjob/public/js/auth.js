document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('inscription-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const prenom = document.getElementById('prenom').value;
            const nom = document.getElementById('nom').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            fetch('/api/inscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prenom, nom, email, password }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    alert('Inscription réussie');
                    window.location.href = '/'; // Redirection vers la page d'accueil
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Une erreur est survenue lors de l\'inscription');
            });
        });
    }
});

const connexionForm = document.getElementById('connexion-form');
if (connexionForm) {
    connexionForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        fetch('/api/connexion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                window.location.href = '/'; // Redirection vers la page d'accueil
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Une erreur est survenue lors de la connexion');
        });
    });
}

// Fonction pour déconnecter l'utilisateur
function deconnecter() {
    fetch('/api/deconnexion', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            window.location.href = '/'; // Rediriger vers la page d'accueil
        })
        .catch(error => {
            console.error('Erreur lors de la déconnexion:', error);
        });
}

// Vous pouvez ajouter un bouton de déconnexion dans votre HTML et lui attacher cette fonction

function verifierConnexion() {
    fetch('/api/check-auth')
    .then(response => response.json())
    .then(data => {
        mettreAJourInterface(data.isAuthenticated, data.user);
    })
    .catch(error => {
        console.error('Erreur lors de la vérification de connexion:', error);
        mettreAJourInterface(false);
    });
}

function mettreAJourInterface(estConnecte, user) {
    const elementsConnecte = document.querySelectorAll('.connecte');
    const elementsDeconnecte = document.querySelectorAll('.deconnecte');

    if (estConnecte) {
        elementsConnecte.forEach(el => el.style.display = '');
        elementsDeconnecte.forEach(el => el.style.display = 'none');
        // Vous pouvez utiliser les informations de 'user' ici si nécessaire
    } else {
        elementsConnecte.forEach(el => el.style.display = 'none');
        elementsDeconnecte.forEach(el => el.style.display = '');
    }
}

function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.role === 'admin' || req.session.user.role === 'moderator') {
        next();
    } else {
        res.status(403).json({ error: 'Accès non autorisé' });
    }
}

function afficherAdministration(isAdmin) {
    const administration = document.getElementById('administration');
    if (isAdmin) {
        administration.style.display = 'block';
    }
}
document.addEventListener('DOMContentLoaded', verifierConnexion);
