
class Game {
    constructor() {
        this.board = this.buildBoard();
        console.log(this.board)
    }

    buildBoard() {
        const board = [];
        for (let i = 0; i < 6; i++) {
            board.push(new Array(7).fill(undefined, 0, 7));
        }
        return board;
    }
}

const newGmae = new Game;
