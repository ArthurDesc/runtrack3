<?php
spl_autoload_register(function($class) {
    // Définir les dossiers où chercher les classes
    $directories = [
        __DIR__ . '/',
        __DIR__ . '/class/'
    ];

    // Parcourir les dossiers pour trouver la classe
    foreach ($directories as $directory) {
        $file = $directory . $class . '.php';
        if (file_exists($file)) {
            require_once $file;
            return;
        }
    }
});

// Inclure les fichiers de configuration
require_once __DIR__ . '/config.php';

// Démarrer la session si nécessaire
Session::start();
?>