<?php
require_once 'config.php';
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recherche d'Animaux</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet">
    <!-- Votre CSS personnalisé -->
    <link rel="stylesheet" href="./css/style.css">
</head>
<body>
    <header class="bg-light py-3">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-4">
                    <h1 class="h3 mb-0"><a href="index.php" class="text-dark text-decoration-none">Monde Animal</a></h1>
                </div>
                <div class="col-md-8">
                    <form action="recherche.php" method="GET" class="main-search-form">
                        <div class="input-group">
                            <input type="text" class="form-control" name="search" id="main-search" placeholder="Entrez le nom d'un animal" aria-label="Recherche d'animaux" aria-describedby="button-search" autocomplete="off">
                            <button class="btn btn-primary" type="submit" id="button-search">
                                <i class="bi bi-search"></i> Rechercher
                            </button>
                        </div>
                        <div id="autocomplete-results" class="autocomplete-results"></div>
                    </form>
                </div>
            </div>
        </div>
    </header>
    <div id="main-suggestions"></div>
    <div id="search-suggestions" class="position-absolute bg-white border rounded-bottom shadow-sm" style="display: none; z-index: 1000;"></div>


<main class="container">
    <section class="py-5 text-center">
        <h1>Découvrez le Monde Animal</h1>
        <p class="lead">Explorez notre base de données d'animaux fascinants</p>
    </section>


</main>
<!-- Bootstrap JavaScript -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="./script.js"></script>
<!-- Votre script personnalisé -->
</body>
</html>
