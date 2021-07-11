export default class Display {
    constructor(board) {
        this.board = board.board;
        this.htmlBoard = this.buildHTMLBoard(document.getElementById('board'))
    }


    buildHTMLBoard(boardDiv) {
        boardDiv.innerHTML = null;
        this.board.forEach((row) => {
            let rowDiv = document.createElement('div');
            rowDiv.classList.add('row');
                row.forEach((spot) => {
                    let spotDiv = document.createElement('div');
                    spotDiv.classList.add('spot');
                    rowDiv.appendChild(spotDiv);
                })
            boardDiv.appendChild(rowDiv);
        })
        return boardDiv
    }


    renderHTML() {
        const htmlBoardNodes = Array.from(this.htmlBoard.childNodes).map(row => Array.from(row.childNodes))
        this.board.forEach((row, i) => {
            row.forEach((spot, j) => {
                let spotDiv = htmlBoardNodes[i][j]
                if (spot) {
                    if (spot === 'red') {
                        spotDiv.className = ('spot red')
                    } else if (spot === 'yellow') {
                        spotDiv.className = ('spot yellow')
                    }
                } 
            })
        })
    }
}