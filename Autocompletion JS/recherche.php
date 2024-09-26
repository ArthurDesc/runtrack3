<?php
require_once './config.php';

$search_term = isset($_GET['search']) ? $_GET['search'] : '';
$results = ['exact' => [], 'partial' => []];

if (!empty($search_term)) {
    $results = $database->fullSearch($search_term);
}

// Le reste de votre code HTML...
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
                            </form>
                        </div>
                    </div>
                </div>
            </header>

            <main class="container">
                <h1 class="my-4">Résultats de recherche pour "<?php echo htmlspecialchars($search_term); ?>"</h1>

                <?php if (empty($results['exact']) && empty($results['partial'])): ?>
                    <p>Aucun résultat trouvé.</p>
                <?php else: ?>
                    <?php if (!empty($results['exact'])): ?>
                        <h2>Résultats exacts</h2>
                        <ul class="list-group mb-4">
                            <?php foreach ($results['exact'] as $animal): ?>
                                <li class="list-group-item">
                                    <a href="element.php?id=<?php echo $animal['id']; ?>">
                                        <?php echo htmlspecialchars($animal['nom']); ?>
                                    </a>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    <?php endif; ?>

                    <?php if (!empty($results['partial'])): ?>
                        <h2>Résultats partiels</h2>
                        <ul class="list-group">
                            <?php foreach ($results['partial'] as $animal): ?>
                                <li class="list-group-item">
                                    <a href="element.php?id=<?php echo $animal['id']; ?>">
                                        <?php echo htmlspecialchars($animal['nom']); ?>
                                    </a>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    <?php endif; ?>
                <?php endif; ?>
            </main>
            <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
            <script src="./script.js"></script>
        </body>
</html>


