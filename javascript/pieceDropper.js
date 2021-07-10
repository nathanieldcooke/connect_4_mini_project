export default class PieceDropper {
    constructor(game, makeMove) {
        this.game = game
        this.makeMove = makeMove
        this.dropperController = this.buildController(document.getElementById('pieceDropper'));
    }


    buildController(dropperDiv) {
        for(let i = 0; i < 7; i++) { 
            let newButton = document.createElement('button')
            newButton.classList.add('dropper-button')
            newButton.addEventListener('click', this.makeMove.bind(this.game, i))
            dropperDiv.appendChild(newButton)
        }
    }
}