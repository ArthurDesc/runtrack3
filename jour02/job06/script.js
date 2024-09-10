// Le code Konami sous forme de tableau
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let userInput = [];

// Écouteur d'événements pour détecter les touches du clavier
document.addEventListener('keydown', function(event) {
    // Ajouter le code de la touche pressée dans le tableau userInput
    userInput.push(event.keyCode);

    // Delete the remaining elements if it's longer than the code length
    if (userInput.length > konamiCode.length) {
        userInput.shift();
    }

    // Vérifier si le tableau userInput correspond au code Konami
    if (JSON.stringify(userInput) === JSON.stringify(konamiCode)) {
        activateKonamiStyle();
    }
});

// Fonction pour appliquer le style de La Plateforme_
function activateKonamiStyle() {
    // Ajouter la classe pour changer le style du body
    document.body.classList.add('body-konami');

    // Afficher la navbar
    document.getElementById('navbar').style.display = 'block';
}
