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
            return row
        }
        return this.dropPiece(idx, currPlayer, --row)
    }


    winner(row, col, currPlayer) {
        if (this.rowWin(row, col, currPlayer) || this.colWin(row, col, currPlayer) || this.diagWin(row, col, currPlayer)) return true;
        return false;
    }


    rowWin(row, col, currPlayer) {

        let spot0 = this.board[row][col - 3]
        let spot1 = this.board[row][col - 2]
        let spot2 = this.board[row][col - 1]
        let spot3 = this.board[row][col - 0]
        let spot4 = this.board[row][col + 1]
        let spot5 = this.board[row][col + 2]
        let spot6 = this.board[row][col + 3]

        const cnt4 = [spot0, spot1, spot2, spot3, spot4, spot5, spot6]
        .reduce( (accu, spot) => {
            if (accu === 4) return 4;
            if (spot === currPlayer) accu++;
            return accu
        }, 0)

        return ( cnt4 === 4) ? true : false
    }


    colWin(row, col, currPlayer) {
        let spot0 = this.board[row - 3] ? this.board[row - 3][col] : undefined
        let spot1 = this.board[row - 2] ? this.board[row - 2][col] : undefined
        let spot2 = this.board[row - 1] ? this.board[row - 1][col] : undefined
        let spot3 = this.board[row - 0] ? this.board[row - 0][col] : undefined
        let spot4 = this.board[row + 1] ? this.board[row + 1][col] : undefined
        let spot5 = this.board[row + 2] ? this.board[row + 2][col] : undefined
        let spot6 = this.board[row + 3] ? this.board[row + 3][col] : undefined

        const cnt4 = [spot0, spot1, spot2, spot3, spot4, spot5, spot6]
        .reduce((accu, spot) => {
            if (accu === 4) return 4;
            if (spot === currPlayer) accu++;
            return accu
        }, 0)

        return (cnt4 === 4) ? true : false
    }


    diagWin(row, col, currPlayer) {

        let spot0 = this.board[row - 3] ? this.board[row - 3][col - 3] : undefined
        let spot1 = this.board[row - 2] ? this.board[row - 2][col - 2] : undefined
        let spot2 = this.board[row - 1] ? this.board[row - 1][col - 1] : undefined
        let spot3 = this.board[row - 0] ? this.board[row - 0][col] : undefined
        let spot4 = this.board[row + 1] ? this.board[row + 1][col + 1] : undefined
        let spot5 = this.board[row + 2] ? this.board[row + 2][col + 2] : undefined
        let spot6 = this.board[row + 3] ? this.board[row + 3][col + 3] : undefined

        let cnt4 = [spot0, spot1, spot2, spot3, spot4, spot5, spot6]
        .reduce((accu, spot) => {
            if (accu === 4) return 4;
            if (spot === currPlayer) accu++;
            return accu
        }, 0)

        if (cnt4 === 4) return true

        spot0 = this.board[row - 3] ? this.board[row - 3][col + 3] : undefined
        spot1 = this.board[row - 2] ? this.board[row - 2][col + 2] : undefined
        spot2 = this.board[row - 1] ? this.board[row - 1][col + 1] : undefined
        spot3 = this.board[row - 0] ? this.board[row - 0][col] : undefined
        spot4 = this.board[row + 1] ? this.board[row + 1][col - 1] : undefined
        spot5 = this.board[row + 2] ? this.board[row + 2][col - 2] : undefined
        spot6 = this.board[row + 3] ? this.board[row + 3][col - 3] : undefined

        cnt4 = [spot0, spot1, spot2, spot3, spot4, spot5, spot6]
            .reduce((accu, spot) => {
                if (accu === 4) return 4;
                if (spot === currPlayer) accu++;
                return accu
            }, 0)

        return (cnt4 === 4) ? true : false
    }



}