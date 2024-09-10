// Chemin des images
const imagePaths = [
    'assets/pictures/arc1.png',
    'assets/pictures/arc2.png',
    'assets/pictures/arc3.png',
    'assets/pictures/arc4.png',
    'assets/pictures/arc5.png',
    'assets/pictures/arc6.png'
];

// Référence aux éléments du DOM
const imageContainer = document.getElementById('image-container');
const shuffleButton = document.getElementById('shuffle-button');
const messageDiv = document.getElementById('message');

// Fonction pour créer une image cliquable
function createImageElement(src, index) {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'image';
    img.dataset.index = index;
    img.draggable = true;

    // Événement lors du début du drag
    img.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', index);
        e.target.classList.add('dragging');
    });

    // Événement lors du drag sur un autre élément
    img.addEventListener('dragover', (e) => {
        e.preventDefault(); // Permet de déposer l'élément
    });

    // Événement lors du drop
    img.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggedIndex = e.dataTransfer.getData('text/plain');
        swapImages(draggedIndex, index);
        e.target.classList.remove('dragging');
        checkOrder();
    });

    // Événement pour enlever l'effet visuel du drag
    img.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragging');
    });

    return img;
}

// Fonction pour afficher les images
function displayImages(images) {
    imageContainer.innerHTML = '';
    images.forEach((path, index) => {
        imageContainer.appendChild(createImageElement(path, index));
    });
}

// Fonction pour mélanger les images
function shuffleImages() {
    const shuffledImages = imagePaths.sort(() => Math.random() - 0.5);
    displayImages(shuffledImages);
}

// Fonction pour échanger les images
function swapImages(index1, index2) {
    const images = Array.from(document.querySelectorAll('#image-container .image'));
    const img1 = images[index1];
    const img2 = images[index2];

    // Réorganiser les images dans le conteneur
    imageContainer.insertBefore(img2, img1);
    imageContainer.insertBefore(img1, img2.nextSibling);
}

// Fonction pour vérifier l'ordre des images
function checkOrder() {
    const images = Array.from(document.querySelectorAll('#image-container .image'));
    const correctOrder = imagePaths.map((_, index) => index);
    const currentOrder = images.map(img => parseInt(img.dataset.index));

    if (JSON.stringify(currentOrder) === JSON.stringify(correctOrder)) {
        messageDiv.textContent = 'Vous avez gagné';
        messageDiv.style.color = 'green';
    } else {
        messageDiv.textContent = 'Vous avez perdu';
        messageDiv.style.color = 'red';
    }
    messageDiv.classList.remove('hidden');
}

// Initialiser les images et ajouter l'événement de mélange
shuffleButton.addEventListener('click', shuffleImages);
displayImages(imagePaths);
