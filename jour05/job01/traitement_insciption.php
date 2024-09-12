<?php
require_once 'autoload.php';
Session::start();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nom = $_POST['nom'] ?? '';
    $prenom = $_POST['prenom'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    // Validation côté serveur (en plus de la validation côté client)
    if (empty($nom) || empty($prenom) || empty($email) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Tous les champs sont requis.']);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Adresse email invalide.']);
        exit;
    }

    if (strlen($password) < 8) {
        echo json_encode(['success' => false, 'message' => 'Le mot de passe doit contenir au moins 8 caractères.']);
        exit;
    }

    // Tentative d'inscription
    $user = new User();
    try {
        if ($user->register($nom, $prenom, $email, $password)) {
            echo json_encode(['success' => true, 'message' => 'Inscription réussie.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'inscription.']);
        }
    } catch (PDOException $e) {
        // Gestion des erreurs spécifiques à la base de données
        if ($e->getCode() == '23000') { // Code pour violation de contrainte unique (email déjà utilisé)
            echo json_encode(['success' => false, 'message' => 'Cette adresse email est déjà utilisée.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Une erreur est survenue lors de l\'inscription.']);
        }
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée.']);
}
