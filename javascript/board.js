export default class Board {

    constructor() {
        this.board = this.buildBoard();
    }


    buildBoard() {
        const board = [];
        for (let i = 0; i < 6; i++) {
            board.push(new Array(7).fill(undefined, 0, 7));
        }
        return board;
    }

    
    dropPiece(idx, currPlayer, row = 5) {
        if (!this.board[row][idx]) {
            this.board[row][idx] = currPlayer
            return
        }
        this.dropPiece(idx, currPlayer, --row)
    }
}