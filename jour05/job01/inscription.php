<?php
require_once './autoload.php';
Session::start();

$errors = [];
$success = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nom = $_POST['nom'] ?? '';
    $prenom = $_POST['prenom'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    $confirmPassword = $_POST['confirmPassword'] ?? '';

    // Validation des champs
   

    // Si pas d'erreurs, on tente l'inscription
    if (empty($errors)) {
        $user = new User();
        try {
            if ($user->register($nom, $prenom, $email, $password)) {
                $success = true;
                // Redirection vers la page de connexion
                header('Location: connexion.php?inscription=success');
                exit;
            } else {
                $errors['general'] = "Une erreur est survenue lors de l'inscription.";
            }
        } catch (PDOException $e) {
            if ($e->getCode() == 23000) { // Code d'erreur pour une violation de contrainte unique
                $errors['email'] = "Cette adresse email est déjà utilisée.";
            } else {
                $errors['general'] = "Une erreur est survenue lors de l'inscription.";
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscription</title>
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
    <div class="container">
        <h1>Inscription</h1>
        <?php if ($success): ?>
            <p class="success">Inscription réussie ! Vous pouvez maintenant vous connecter.</p>
        <?php endif; ?>
        <?php if (isset($errors['general'])): ?>
            <p class="error"><?php echo $errors['general']; ?></p>
        <?php endif; ?>
        <form id="inscriptionForm" method="post" action="">
            <div>
                <label for="nom">Nom :</label>
                <input type="text" id="nom" name="nom" required>
                <span class="error" id="nomError"></span>
            </div>
            <div>
                <label for="prenom">Prénom :</label>
                <input type="text" id="prenom" name="prenom" required>
                <span class="error" id="prenomError"></span>
            </div>
            <div>
                <label for="email">Email :</label>
                <input type="email" id="email" name="email" required>
                <span class="error" id="emailError"></span>
            </div>
            <div>
                <label for="password">Mot de passe :</label>
                <input type="password" id="password" name="password" required>
                <span class="error" id="passwordError"></span>
            </div>
            <div>
                <label for="confirmPassword">Confirmer le mot de passe :</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required>
                <span class="error" id="confirmPasswordError"></span>
            </div>
            <button type="submit">S'inscrire</button>
        </form>
        <div id="generalError" class="error" style="display: none;"></div>
    </div>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="assets/js/script.js"></script>
</body>
</html>
