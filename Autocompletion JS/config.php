<?php
require_once 'includes/Database.php';

$database = new Database();
$conn = $database->getConnection();

if (!$conn) {
    die("La connexion à la base de données a échoué.");
}
?>