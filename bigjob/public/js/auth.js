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
                    // Assurez-vous que data.user contient les informations de l'utilisateur
                    if (data.user) {
                        localStorage.setItem('user', JSON.stringify(data.user));
                        localStorage.setItem('userId', data.user.id);
                        mettreAJourInterface(); // Mettre à jour l'interface après la connexion
                        window.location.href = '/'; // ou '/dashboard' si vous avez une page de tableau de bord
                    } else {
                        console.error('Données utilisateur manquantes dans la réponse');
                    }
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
                // Stocker les informations de l'utilisateur dans le localStorage
                localStorage.setItem('user', JSON.stringify(data.user));
                // Rediriger vers le tableau de bord ou la page d'accueil après connexion
                window.location.href = '/'; // ou '/dashboard' si vous avez une page de tableau de bord
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Une erreur est survenue lors de la connexion');
        });
    });
}

// Fonction pour vérifier si l'utilisateur est connecté
function estConnecte() {
    return localStorage.getItem('user') !== null;
}

// Fonction pour déconnecter l'utilisateur
function deconnecter() {
    fetch('/api/deconnexion', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            localStorage.removeItem('user');
            alert(data.message);
            window.location.href = '/'; // Rediriger vers la page d'accueil
        })
        .catch(error => {
            console.error('Erreur lors de la déconnexion:', error);
        });
}

// Vous pouvez ajouter un bouton de déconnexion dans votre HTML et lui attacher cette fonction
