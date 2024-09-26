<?php
// Assurez-vous d'inclure vos fichiers de configuration si nécessaire
// require_once 'config.php';

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;
$nom = isset($_GET['nom']) ? htmlspecialchars($_GET['nom']) : '';

// Vous pouvez ajouter ici une vérification en base de données si vous le souhaitez
// Par exemple : $animal = $database->getAnimalById($id);
// if ($animal) { $nom = $animal['nom']; }

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $nom; ?></title>
    <!-- Incluez ici vos fichiers CSS si nécessaire -->
</head>
<body>
    <h1><?php echo $nom; ?></h1>
    <!-- Vous pouvez ajouter plus d'informations sur l'animal ici si vous le souhaitez -->
</body>
</html>