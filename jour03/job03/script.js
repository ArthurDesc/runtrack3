$(document).ready(() => {
    const $grid = $('#grid');
    const $solveBtn = $('#solveBtn');
    const size = 3;
    let tiles = [
        1, 2, 3,
        4, 5, 6,
        7, 8, 0 // 0 represents the empty space
    ];

    // Shuffle the tiles
    tiles = tiles.sort(() => Math.random() - 0.5);

    // Function to create the grid based on tiles array
    function createGrid() {
        $grid.empty();
        tiles.forEach((tile, index) => {
            const $tile = $('<div></div>').addClass('tile');
            if (tile === 0) {
                $tile.addClass('empty');
            } else {
                const $img = $('<img>').attr('src', `./assets/pictures/${tile}.PNG`);
                $tile.append($img);
                $tile.on('click', () => moveTile(index));
            }
            $grid.append($tile);
        });
    }

    // Function to move a tile
    function moveTile(index) {
        const emptyIndex = tiles.indexOf(0);
        const validMoves = [index - 1, index + 1, index - size, index + size];

        if (validMoves.includes(emptyIndex)) {
            [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
            createGrid();
        }
    }

    // Function to solve the puzzle
    function solvePuzzle() {
        tiles = [
            1, 4, 7,
            2, 5, 8,
            3, 6, 0 // 0 represents the empty space
        ];
        createGrid();
    }

    // Event listener for the solve button
    $solveBtn.on('click', solvePuzzle);

    createGrid();
});