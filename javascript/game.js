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


    makeMove(idx) {
        this.board.dropPiece(idx, this.currPlayer);
        this.currPlayer = (this.currPlayer === 'yellow') ? 'red' : 'yellow';
        this.display.renderHTML()
    }

}

const newGmae = new Game;
