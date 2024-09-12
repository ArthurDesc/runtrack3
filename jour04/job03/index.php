<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Filtre Pokémon</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        form { margin-bottom: 20px; }
        input, select { margin: 5px; padding: 5px; }
        #results { border: 1px solid #ddd; padding: 10px; }
    </style>
    <!-- Ajout du script jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <h1>Filtre Pokémon</h1>
    <form id="pokemonFilter">
        <input type="text" id="idFilter" placeholder="ID">
        <input type="text" id="nameFilter" placeholder="Nom">
        <select id="typeFilter">
            <option value="">Tous les types</option>
        </select>
        <input type="button" id="filterButton" value="Filtrer">
    </form>
    <div id="results"></div>

    <script src="script.js"></script>
</body>
</html>
