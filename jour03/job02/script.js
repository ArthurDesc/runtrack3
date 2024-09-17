// Chemin des images
const imagePaths = [
    'assets/pictures/arc1.png',
    'assets/pictures/arc2.png',
    'assets/pictures/arc3.png',
    'assets/pictures/arc4.png',
    'assets/pictures/arc5.png',
    'assets/pictures/arc6.png'
];

// Vérification de l'existence des éléments DOM
if ($('#image-container').length === 0 || $('#shuffle-button').length === 0 || $('#message').length === 0) {
    console.error('Éléments DOM manquants');
    throw new Error('Éléments DOM manquants');
}

// Fonction pour créer une image cliquable
function createImageElement(src, index) {
    return $('<img>', {
        src: src,
        class: 'image',
        'data-index': index,
        draggable: true,
        alt: `Partie ${index + 1} de l'arc-en-ciel`,
        'aria-label': `Partie ${index + 1} de l'arc-en-ciel. Glissez-déposez pour réorganiser.`
    });
}

// Fonction pour afficher les images
function displayImages(images) {
    $('#image-container').empty();
    $.each(images, (index, path) => {
        $('#image-container').append(createImageElement(path, index));
    });
}

// Fonction pour mélanger les images
function shuffleImages() {
    const shuffledImages = [...imagePaths].sort(() => Math.random() - 0.5);
    displayImages(shuffledImages);
    $('#message').addClass('hidden');
}

// Fonction pour gérer les échanges d'images
function swapImages($draggedEl, $targetEl) {
    const tempSrc = $draggedEl.attr('src');
    const tempIndex = $draggedEl.data('index');

    $draggedEl.attr({
        src: $targetEl.attr('src'),
        'data-index': $targetEl.data('index'),
        alt: `Partie ${parseInt($targetEl.data('index')) + 1} de l'arc-en-ciel`,
        'aria-label': `Partie ${parseInt($targetEl.data('index')) + 1} de l'arc-en-ciel. Glissez-déposez pour réorganiser.`
    });

    $targetEl.attr({
        src: tempSrc,
        'data-index': tempIndex,
        alt: `Partie ${parseInt(tempIndex) + 1} de l'arc-en-ciel`,
        'aria-label': `Partie ${parseInt(tempIndex) + 1} de l'arc-en-ciel. Glissez-déposez pour réorganiser.`
    });
}

// Function to check images order
function checkOrder() {
    const currentOrder = $('#image-container').children().map((_, img) => parseInt($(img).data('index'))).get();
    const isCorrect = currentOrder.every((value, index) => value === index);

    $('#message').text(isCorrect ? 'Vous avez gagné' : 'Vous avez perdu')
                 .css('color', isCorrect ? 'green' : 'red')
                 .removeClass('hidden');
}

// Gestion des événements de drag and drop
$('#image-container').on({
    dragstart: function(e) {
        if ($(e.target).hasClass('image')) {
            e.originalEvent.dataTransfer.setData('text/plain', e.target.id);
            $(e.target).addClass('dragging');
        }
    },
    dragover: function(e) {
        e.preventDefault();
        const $draggingEl = $('.dragging');
        if ($draggingEl.length && $(e.target).hasClass('image') && $draggingEl[0] !== e.target) {
            $(e.target).addClass('drag-over');
        }
    },
    dragleave: function(e) {
        if ($(e.target).hasClass('image')) {
            $(e.target).removeClass('drag-over');
        }
    },
    drop: function(e) {
        e.preventDefault();
        const $draggingEl = $('.dragging');
        if ($draggingEl.length && $(e.target).hasClass('image') && $draggingEl[0] !== e.target) {
            swapImages($draggingEl, $(e.target));
            checkOrder();
        }
        $('.image').removeClass('dragging drag-over');
    },
    dragend: function() {
        $('.image').removeClass('dragging drag-over');
    }
});

// Initialiser les images et ajouter l'événement de mélange
$('#shuffle-button').on('click', shuffleImages);
displayImages(imagePaths);