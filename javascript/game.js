import Board from "./board.js";
import Display from "./display.js";
import PieceDropper from "./pieceDropper.js";
import ComputerPlayer from "./computerPlayer.js"


class Game {

    constructor() {
        this.board = new Board();
        this.computerPlayer = new ComputerPlayer(this.board);
        this.display = new Display(this.board)
        this.currPlayer = 'yellow'
        this.gameStart()
    }


    gameStart() {
        this.pieceDropper = new PieceDropper(this, this.makeMove)

        this.playTurn()
    }

    playTurn() {
        if (this.currPlayer === 'red') {
            // disable pieceDropper Controller
            // have computer make move
            this.computerPlayer.makeMove(this)
        } else {
            // enable pieceDropper
        }
    }

    makeMove(colIdx) {
        let rowIdx = this.board.dropPiece(this.board.board, colIdx, this.currPlayer);
        this.display.renderHTML()
        console.log(this.board.winner(this.board.board, rowIdx, colIdx, this.currPlayer))
        this.currPlayer = (this.currPlayer === 'yellow') ? 'red' : 'yellow';
        this.playTurn()
    }

}

const newGmae = new Game;
