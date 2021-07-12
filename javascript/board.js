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


    dropPiece(board, idx, currPlayer, row = 5) {
        if (!board[row][idx]) {
            board[row][idx] = currPlayer
            return row
        }
        return this.dropPiece(board, idx, currPlayer, --row)
    }


    winner(board, row, col, currPlayer) {
        if (this.rowWin(board, row, col, currPlayer) || this.colWin(board, row, col, currPlayer) || this.diagWin(board, row, col, currPlayer)) return true;
        return false;
    }


    rowWin(board, row, col, currPlayer) {

        let spot0 = board[row][col - 3]
        let spot1 = board[row][col - 2]
        let spot2 = board[row][col - 1]
        let spot3 = board[row][col - 0]
        let spot4 = board[row][col + 1]
        let spot5 = board[row][col + 2]
        let spot6 = board[row][col + 3]

        const cnt4 = [spot0, spot1, spot2, spot3, spot4, spot5, spot6]
        .reduce( (accu, spot) => {
            if (accu === 4) return 4;
            if (spot === currPlayer) {
                accu++;
            } else {
                accu = 0;
            }
            return accu;
        }, 0)

        return ( cnt4 === 4) ? true : false
    }


    colWin(board, row, col, currPlayer) {
        let spot0 = board[row - 3] ? board[row - 3][col] : undefined
        let spot1 = board[row - 2] ? board[row - 2][col] : undefined
        let spot2 = board[row - 1] ? board[row - 1][col] : undefined
        let spot3 = board[row - 0] ? board[row - 0][col] : undefined
        let spot4 = board[row + 1] ? board[row + 1][col] : undefined
        let spot5 = board[row + 2] ? board[row + 2][col] : undefined
        let spot6 = board[row + 3] ? board[row + 3][col] : undefined

        const cnt4 = [spot0, spot1, spot2, spot3, spot4, spot5, spot6]
        .reduce((accu, spot) => {
            if (accu === 4) return 4;
            if (spot === currPlayer) {
                accu++;
            } else {
                accu = 0;
            }
            return accu;
        }, 0)

        return (cnt4 === 4) ? true : false
    }


    diagWin(board, row, col, currPlayer) {

        let spot0 = board[row - 3] ? board[row - 3][col - 3] : undefined
        let spot1 = board[row - 2] ? board[row - 2][col - 2] : undefined
        let spot2 = board[row - 1] ? board[row - 1][col - 1] : undefined
        let spot3 = board[row - 0] ? board[row - 0][col] : undefined
        let spot4 = board[row + 1] ? board[row + 1][col + 1] : undefined
        let spot5 = board[row + 2] ? board[row + 2][col + 2] : undefined
        let spot6 = board[row + 3] ? board[row + 3][col + 3] : undefined

        let cnt4 = [spot0, spot1, spot2, spot3, spot4, spot5, spot6]
        .reduce((accu, spot) => {
            if (accu === 4) return 4;
            if (spot === currPlayer) {
                accu++;
            } else {
                accu = 0;
            }
            return accu;
        }, 0)

        if (cnt4 === 4) return true

        spot0 = board[row - 3] ? board[row - 3][col + 3] : undefined
        spot1 = board[row - 2] ? board[row - 2][col + 2] : undefined
        spot2 = board[row - 1] ? board[row - 1][col + 1] : undefined
        spot3 = board[row - 0] ? board[row - 0][col] : undefined
        spot4 = board[row + 1] ? board[row + 1][col - 1] : undefined
        spot5 = board[row + 2] ? board[row + 2][col - 2] : undefined
        spot6 = board[row + 3] ? board[row + 3][col - 3] : undefined

        cnt4 = [spot0, spot1, spot2, spot3, spot4, spot5, spot6]
            .reduce((accu, spot) => {
                if (accu === 4) return 4;
                if (spot === currPlayer) {
                    accu++;
                } else {
                    accu = 0;
                }
                return accu;
            }, 0)

        return (cnt4 === 4) ? true : false
    }



}