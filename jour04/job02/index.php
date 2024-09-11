<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test de jsonValueKey</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        textarea {
            width: 100%;
            height: 150px;
        }
        input, button {
            margin-top: 10px;
        }
        #result {
            margin-top: 20px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>Test de la fonction jsonValueKey</h1>
    <textarea id="jsonInput">
{
    "name": "La Plateforme_",
    "address": "8 rue d'hozier",
    "city": "Marseille",
    "nb_staff": "11",
    "creation": "2019"
}
    </textarea>
    <br>
    <input type="text" id="keyInput" placeholder="Entrez la clé à rechercher">
    <button id="searchButton">Rechercher</button>
    <div id="result"></div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="script.js"></script>
</body>
</html>
