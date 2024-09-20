const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs').promises;
const session = require('express-session');
const { insertUser, findUserByEmail, insertReservation } = require('./database');

const app = express();

// Configuration de la session
app.use(session({
    secret: 'Hy8$Xp2#Zq9!Wm7@Lc6^Td5&Sf4*Bg3(Nh',
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
app.post('/api/inscription', async (req, res) => {
    const { prenom, nom, email, password } = req.body;
    
    // Vérification du domaine de l'email
    if (!email.endsWith('@laplateforme.io')) {
        return res.status(400).json({ error: 'Seules les adresses email de La Plateforme_ sont autorisées.' });
    }

    try {
        await insertUser({ prenom, nom, email, password });
        res.status(201).json({ message: 'Utilisateur inscrit avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de l\'inscription' });
    }
});

// Nouvelle route pour la connexion
app.post('/api/connexion', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await findUserByEmail(email);
        if (user && user.password === password) {
            req.session.user = { id: user.id, email: user.email, prenom: user.prenom, nom: user.nom };
            res.json({ message: 'Connexion réussie' });
        } else {
            res.status(401).json({ error: 'Email ou mot de passe incorrect' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
});

// Route pour la déconnexion
app.post('/api/deconnexion', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la déconnexion' });
        }
        res.json({ message: 'Déconnexion réussie' });
    });
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

// Route pour vérifier l'état de connexion
app.get('/api/check-auth', (req, res) => {
    if (req.session.user) {
        res.json({ isAuthenticated: true, user: req.session.user });
    } else {
        res.json({ isAuthenticated: false });
    }
});

module.exports = app;
