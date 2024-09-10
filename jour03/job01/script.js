// Sélectionner les éléments
const showMessageButton = document.getElementById('show-message-button');
const hideMessageButton = document.getElementById('hide-message-button');
const messageContainer = document.getElementById('message-container');

// Fonction pour afficher le texte
function showMessage() {
    messageContainer.style.display = 'block';
}

// Fonction pour cacher le texte
function hideMessage() {
    messageContainer.style.display = 'none';
}

// Ajouter des écouteurs d'événements aux boutons
showMessageButton.addEventListener('click', showMessage);
hideMessageButton.addEventListener('click', hideMessage);
