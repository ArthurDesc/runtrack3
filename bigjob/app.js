const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs').promises;
const session = require('express-session');
const { insertUser, findUserByEmail, insertReservation } = require('./database');

const app = express();

// Configuration de la session
app.use(session({
    secret: 'votre_secret_ici',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Mettez à true si vous utilisez HTTPS
}));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Route pour servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route pour l'inscription
// Route pour l'inscription
app.post('/api/inscription', async (req, res) => {
    try {
        const { prenom, nom, email, password } = req.body;
        const result = await insertUser({ prenom, nom, email, password });
        
        if (result.insertId) {
            req.session.user = { id: result.insertId, prenom, nom, email };
            res.json({ success: true, message: 'Inscription réussie' });
        } else {
            res.status(400).json({ error: 'Erreur d\'inscription' });
        }
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// Nouvelle route pour la connexion
// Route pour la connexion
app.post('/api/connexion', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await findUserByEmail(email);
        
        if (user && user.password === password) { // Note: Dans un vrai système, utilisez bcrypt pour comparer les mots de passe
            req.session.user = { id: user.id, prenom: user.prenom, nom: user.nom, email: user.email };
            res.json({ success: true, message: 'Connexion réussie' });
        } else {
            res.status(401).json({ error: 'Identifiants invalides' });
        }
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// Route pour la déconnexion
app.post('/api/deconnexion', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.status(500).json({ error: 'Erreur lors de la déconnexion' });
        } else {
            res.json({ message: 'Déconnexion réussie' });
        }
    });
});

// Route pour vérifier l'état de connexion
app.get('/api/user', (req, res) => {
    if (req.session.user) {
        res.json({ isConnected: true, user: req.session.user });
    } else {
        res.json({ isConnected: false });
    }
});

// Middleware pour vérifier si l'utilisateur est connecté
function estConnecte(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ error: 'Non autorisé' });
    }
}

// Exemple de route protégée
app.get('/api/profil', estConnecte, (req, res) => {
    res.json({ user: req.session.user });
});

// Middleware pour vérifier si l'utilisateur est connecté
function estAuthentifie(req, res, next) {
    if (req.session.utilisateur) {
        next();
    } else {
        res.redirect('/connexion');
    }
}

// Route pour la réservation
app.post('/api/reservation', async (req, res) => {
    const { date } = req.body;
    
    // Vérifier si l'utilisateur est connecté
    if (!req.session || !req.session.user) {
        return res.status(401).json({ success: false, error: 'Utilisateur non connecté' });
    }

    // LA

    const userId = req.session.user.id;

    try {
        // Lire le fichier reservations.json
        let reservations = [];
        try {
            const data = await fs.readFile('reservations.json', 'utf8');
            reservations = JSON.parse(data);
        } catch (error) {
            // Si le fichier n'existe pas, on commence avec un tableau vide
            console.log('Création d\'un nouveau fichier reservations.json');
        }

        // Ajouter la nouvelle réservation
        reservations.push({ date, userId });

        // Écrire les données mises à jour dans reservations.json
        await fs.writeFile('reservations.json', JSON.stringify(reservations, null, 2));

        res.json({ success: true });
    } catch (error) {
        console.error('Erreur lors de la réservation:', error);
        res.status(500).json({ success: false, error: 'Erreur lors de la sauvegarde de la réservation' });
    }
});

// Route pour les réservations
app.get('/api/reservations', async (req, res) => {
    try {
        const data = await fs.readFile('reservations.json', 'utf8');
        const reservations = JSON.parse(data);
        res.json(reservations);
    } catch (error) {
        console.error('Erreur lors de la lecture des réservations:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

module.exports = app;
