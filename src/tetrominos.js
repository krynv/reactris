export const TETROMINOS = {
    0: { //clean cell (when we're not shwoing any cells)
        shape: [[0]],
        colour: '0, 0, 0'
    },
    I: { // the long one
        shape: [
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
        ],
        colour: '80, 227, 230'
    },

    J: { // the J looking one
        shape: [
            [0, 'J', 0],
            [0, 'J', 0],
            ['J', 'J', 0],
        ],
        colour: '36, 95, 223'
    },

    L: { // the L looking one
        shape: [
            [0, 'L', 0],
            [0, 'L', 0],
            [0, 'L', 'L'],
        ],
        colour: '223, 173, 36'
    },

    O: { // the O/ cube looking one
        shape: [
            ['O', 'O']
            ['O', 'O']
        ],
        colour: '223, 217, 36'
    },

    S: { // the S looking one
        shape: [
            [0, 'S', 'S'],
            ['S', 'S', 0],
            [0, 0, 0],
        ],
        colour: '48, 211, 56'
    },

    T: { // the T looking one
        shape: [
            [0, 0, 0],
            ['T', 'T', 'T'],
            [0, 'T', 0],
        ],
        colour: '132, 61, 198'
    },

    Z: { // the Z looking one
        shape: [
            ['Z', 'Z', 0],
            [0, 'Z', 'Z'],
            [0, 0, 0],
        ],
        colour: '227, 68, 78'
    },
}

export const randomTetromino = () => {
    const tetrominos = 'IJLOSTZ';
    const randomTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
    return TETROMINOS[randomTetromino];

}