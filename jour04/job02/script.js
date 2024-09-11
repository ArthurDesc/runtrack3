function jsonValueKey(jsonString, key) {
    try {
        const obj = JSON.parse(jsonString);
        return (key in obj) ? obj[key] : "La clé n'existe pas dans l'objet JSON.";
    } catch (error) {
        return "Erreur : La chaîne JSON n'est pas valide.";
    }
}

$(document).ready(function() {
    $('#searchButton').on('click', function() {
        const jsonString = $('#jsonInput').val();
        const key = $('#keyInput').val();
        const result = jsonValueKey(jsonString, key);
        $('#result').text(`Résultat : ${result}`);
    });

    // Exemple d'utilisation dans la console
    const chaine = `{
        "name": "La Plateforme_",
        "address": "8 rue d'hozier",
        "city": "Marseille",
        "nb_staff": "11",
        "creation": "2019"
    }`;

});
