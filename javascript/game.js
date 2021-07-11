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
        this.startButton = document.getElementById('start')
        this.statusDiv = document.getElementById('status-div')
        this.startButton.addEventListener('click', this.gameStart.bind(this)) 
    }
    
    gameStart() {
        this.statusDiv.innerHTML = ''
        this.pieceDropper = new PieceDropper(this, this.makeMove)
        this.dropperControllerArr = Array.from(document.getElementById('piece-dropper').childNodes)
        this.playTurn()
    }

    async playTurn() {
        // console.log(this.currPlayer)
        this.updateTurn()
        if (this.currPlayer === 'red') {
            this.dropperControllerArr.forEach(button => {
                button.disabled = true
                button.classList.remove('active')
            })
            await new Promise(_r => setTimeout(_r, 2000));
            this.computerPlayer.makeMove(this)
        } else {
            this.dropperControllerArr.forEach((button, i) => {
                // console.log(this.board.board[0])
                if (!this.board.board[0][i]) {
                    button.disabled = false
                    button.classList.add('active')
                }
            })
        }
    }

    makeMove(colIdx) {
        let rowIdx = this.board.dropPiece(this.board.board, colIdx, this.currPlayer);
        let winner = this.board.winner(this.board.board, rowIdx, colIdx, this.currPlayer);
        this.display.renderHTML()
        if (winner) {
            this.endGame()
            return;
        }
        this.currPlayer = (this.currPlayer === 'yellow') ? 'red' : 'yellow';
        this.playTurn();
    }

    updateTurn() {
        let status = this.currPlayer === 'yellow' 
        ?
        '<div><span id="turn">Turn: <span id="hum-player">Human Player</span></span></div>'
        :
        '<div><span id="turn">Turn: <span id="com-player">Computer Player</span></span></div>';
        this.statusDiv.innerHTML = status
    }

    endGame() {
        let status = this.currPlayer === 'yellow'
            ?
            '<div><span id="turn">Winner: <span id="hum-player">Human Player</span></span></div>'
            :
            '<div><span id="turn">Winner: <span id="com-player">Computer Player</span></span></div>';
        this.statusDiv.innerHTML = status

        let tryBtn = document.createElement('button')

        tryBtn.innerText = 'Play Again'

        tryBtn.id = 'try-again'

        tryBtn.addEventListener('click', this.resetGame.bind(this))

        this.statusDiv.appendChild(tryBtn)
    }

    resetGame() {
        this.statusDiv.innerHTML = '<button id="start">Start</button>'
        this.board = new Board();
        this.computerPlayer = new ComputerPlayer(this.board);
        this.display = new Display(this.board)
        this.currPlayer = 'yellow'
        this.startButton = document.getElementById('start')
        this.statusDiv = document.getElementById('status-div')
        document.getElementById('piece-dropper').innerHTML = ''
        this.gameStart()
    }

}

new Game;
