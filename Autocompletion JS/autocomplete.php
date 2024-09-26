<?php
require_once 'includes/Database.php';
require_once 'config.php';

header('Content-Type: application/json');

error_log("Requête reçue dans autocomplete.php");

if (isset($_GET['search_term']) && trim($_GET['search_term']) !== '') {
    $term = trim($_GET['search_term']);
    error_log("Terme de recherche : " . $term);
    $results = $database->search($term);
    error_log("Résultats : " . json_encode($results));
    echo json_encode($results);
} else {
    error_log("Aucun terme de recherche fourni");
    echo json_encode([]);
}
?>