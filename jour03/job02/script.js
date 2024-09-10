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

// Vérification de l'existence des éléments DOM
if (!imageContainer || !shuffleButton || !messageDiv) {
    console.error('Éléments DOM manquants');
    throw new Error('Éléments DOM manquants');
}

// Fonction pour créer une image cliquable
function createImageElement(src, index) {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'image';
    img.dataset.index = index;
    img.draggable = true;
    img.alt = `Partie ${index + 1} de l'arc-en-ciel`;
    img.setAttribute('aria-label', `Partie ${index + 1} de l'arc-en-ciel. Glissez-déposez pour réorganiser.`);
    return img;
}

// Fonction pour afficher les images (on donne images en attendant mais le paramètre final est imagePaths)
function displayImages(images) {
    imageContainer.innerHTML = '';
    images.forEach((path, index) => {
        imageContainer.appendChild(createImageElement(path, index));
    });
}

// Fonction pour mélanger les images
function shuffleImages() {
    const shuffledImages = [...imagePaths].sort(() => Math.random() - 0.5);
    displayImages(shuffledImages);
    messageDiv.classList.add('hidden');
}

// Fonction pour gérer les échanges d'images
function swapImages(draggedEl, targetEl) {
    const tempSrc = draggedEl.src;
    const tempIndex = draggedEl.dataset.index;

    // Exchanging data
    draggedEl.src = targetEl.src;
    draggedEl.dataset.index = targetEl.dataset.index;
    draggedEl.alt = `Partie ${parseInt(targetEl.dataset.index) + 1} de l'arc-en-ciel`;
    draggedEl.setAttribute('aria-label', `Partie ${parseInt(targetEl.dataset.index) + 1} de l'arc-en-ciel. Glissez-déposez pour réorganiser.`);

    targetEl.src = tempSrc;
    targetEl.dataset.index = tempIndex;
    targetEl.alt = `Partie ${parseInt(tempIndex) + 1} de l'arc-en-ciel`;
    targetEl.setAttribute('aria-label', `Partie ${parseInt(tempIndex) + 1} de l'arc-en-ciel. Glissez-déposez pour réorganiser.`);
}

// Function to check images order
function checkOrder() {
    // Create array from image container
    const images = Array.from(imageContainer.children);
    const currentOrder = images.map(img => parseInt(img.dataset.index));
    // Check if index = value
    const isCorrect = currentOrder.every((value, index) => value === index);

    messageDiv.textContent = isCorrect ? 'Vous avez gagné' : 'Vous avez perdu';
    messageDiv.style.color = isCorrect ? 'green' : 'red';
    messageDiv.classList.remove('hidden');
}

// Gestion des événements de drag and drop avec délégation
imageContainer.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains('image')) {
        e.dataTransfer.setData('text/plain', e.target.id);
        e.target.classList.add('dragging');
    }
});

imageContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    const draggingEl = document.querySelector('.dragging');
    if (draggingEl && e.target.classList.contains('image') && draggingEl !== e.target) {
        e.target.classList.add('drag-over');
    }
});

imageContainer.addEventListener('dragleave', (e) => {
    if (e.target.classList.contains('image')) {
        e.target.classList.remove('drag-over');
    }
});

imageContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    const draggingEl = document.querySelector('.dragging');
    if (draggingEl && e.target.classList.contains('image') && draggingEl !== e.target) {
        swapImages(draggingEl, e.target);
        checkOrder();
    }
    document.querySelectorAll('.image').forEach(img => {
        img.classList.remove('dragging', 'drag-over');
    });
});

imageContainer.addEventListener('dragend', (e) => {
    if (e.target.classList.contains('image')) {
        e.target.classList.remove('dragging');
    }
    document.querySelectorAll('.image').forEach(img => {
        img.classList.remove('drag-over');
    });
});

// Initialiser les images et ajouter l'événement de mélange
shuffleButton.addEventListener('click', shuffleImages);
displayImages(imagePaths);