import Board from "./board.js";
import Display from "./display.js";
import PieceDropper from "./pieceDropper.js";


class Game {

    constructor() {
        this.board = new Board();
        this.display = new Display(this.board)
        this.currPlayer = 'yellow'
        this.gameStart()
    }


    gameStart() {
        this.pieceDropper = new PieceDropper(this, this.makeMove)
    }


    makeMove(colIdx) {
        let rowIdx = this.board.dropPiece(colIdx, this.currPlayer);
        this.display.renderHTML()
        this.board.winner(rowIdx, colIdx, this.currPlayer)
        this.currPlayer = (this.currPlayer === 'yellow') ? 'red' : 'yellow';
    }

}

const newGmae = new Game;
