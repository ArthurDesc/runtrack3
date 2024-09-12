<?php
require_once 'autoload.php';

Session::start();

$user = Session::get('user');
$isConnected = !empty($user);
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accueil</title>
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
    <div class="container">
        <h1>Bienvenue sur notre site</h1>
        
        <?php if ($isConnected): ?>
            <p>Bonjour <?php echo htmlspecialchars($user['prenom'] . ' ' . $user['nom']); ?> !</p>
            <nav>
                <ul>
                    <li><a href="profil.php">Mon profil</a></li>
                    <li><a href="deconnexion.php">Déconnexion</a></li>
                </ul>
            </nav>
            <!-- Ajoutez ici le contenu spécifique aux utilisateurs connectés -->
        <?php else: ?>
            <p>Bienvenue, visiteur !</p>
            <nav>
                <ul>
                    <li><a href="connexion.php">Connexion</a></li>
                    <li><a href="inscription.php">Inscription</a></li>
                </ul>
            </nav>
            <!-- Ajoutez ici le contenu pour les visiteurs non connectés -->
        <?php endif; ?>
        
        <!-- Contenu commun à tous les utilisateurs -->
        <section>
            <h2>À propos de notre site</h2>
            <p>Ceci est une description de notre site web...</p>
        </section>
    </div>
</body>
</html>
