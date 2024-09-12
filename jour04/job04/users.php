<?php
// Paramètres de connexion à la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "utilisateurs";

// Définir le type de contenu de la réponse comme JSON
header('Content-Type: application/json');

try {
    // Créer une connexion PDO
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    
    // Configurer PDO pour lancer des exceptions en cas d'erreur
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Préparer et exécuter la requête SQL
    $stmt = $conn->prepare("SELECT * FROM utilisateurs");
    $stmt->execute();
    
    // Récupérer tous les résultats
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Encoder les résultats en JSON et les afficher
    echo json_encode($result);
}
catch(PDOException $e) {
    // En cas d'erreur, renvoyer un message d'erreur en JSON
    echo json_encode(["error" => "Erreur de connexion: " . $e->getMessage()]);
}

// Fermer la connexion
$conn = null;
?>