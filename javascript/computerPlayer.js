export default class ComputerPlayer {
    constructor(board) {
        this.board = board;
        this.boardState = board.board;
        this.tree = new Tree(this.board);
    }

    makeMove(game) {

        this.tree.buildTree(5, game.board.board)

        let colIdx = this.tree.nextMove()

        let rowIdx = this.board.dropPiece(this.boardState, colIdx, 'red');

        let winner = this.board.winner(this.boardState, rowIdx, colIdx, 'red');
        
        game.display.renderHTML()

        if (winner) {
            game.endGame()
            return;
        }
        game.currPlayer = 'yellow'
        game.playTurn()
    }

}

class Node {

    constructor(boardState, val, col) {
        this.boardState = boardState // current boardState
        this.val = val // -1 = lose, 0 = neutral, 1 = win
        this.col = col
        this.children = []  // every next move board permutaion
    }

}

class Tree {

    constructor(board) {
        this.board = board;
        this.root = null; 
    }


    buildTree(depthLimit, boardState, currPlayer = 'red') {
        this.root = new Node(boardState, 0, null);

        // loop to generate children;
        let nodes = [this.root];
        let childrenNodes = [];
        for (let j = depthLimit; j > 0; j--){
            nodes = nodes.concat(childrenNodes);
            childrenNodes = [];
            while(nodes.length) {
                let currNode = nodes.pop()
                for (let i = 0; i < 7; i++) {
                    let col = i;
        
                    if (currNode.boardState[0][col]) continue;
                    
                    // dupe board
                    let boardStateDupe = currNode.boardState.map(row => {
                        let newRow = [];
                        row.forEach(el => {
                            newRow.push(el);
                        })
                        return newRow;
                    }) 
        
                    // make move on dup of root board.
                    let row = this.board.dropPiece(boardStateDupe, col, currPlayer);
                    
                    // determine if next move is win, nuetral, or lose
                    let win = this.board.winner(boardStateDupe, row, col, currPlayer);
                    let moveVal = null;
        
                    if (win && currPlayer === 'red') {
                        moveVal = 1;
                    } else if (win && currPlayer === 'yellow') {
                        moveVal = -1;
                    } else if (!win) {
                        moveVal = 0;
                    } 
                    // generate child node of root
                    let childNode = new Node(boardStateDupe, moveVal, col)
                    currNode.children.push(childNode)
                    if (moveVal === 0) childrenNodes.push(childNode)
                }
            }
            currPlayer = currPlayer === 'red' ? 'yellow' : 'red'
        }
    }


    minimax(node, isMax = true) {
        if (node.val === -1 || node.val === 1) return node.val;
        
        if (isMax) {
            let maxEval = -Infinity;
            node.children.forEach(child => {
                let val = this.minimax(child, false);
                maxEval = Math.max(maxEval, val);
            });
            return maxEval;
        } else {
            let minEval = Infinity;
            node.children.forEach(child => {
                let val = this.minimax(child, true);
                minEval = Math.min(minEval, val);
            });
            return minEval;
        }
    }

    nextMove() {

        let children = this.root.children;
        const winMoves = []
        const loseMoves = []
        const neutMoves = []


        children.forEach(childNode => {
            let valOfMove = this.minimax(childNode)
            if (valOfMove === 1) winMoves.push(childNode.col)
            if (valOfMove === -1) loseMoves.push(childNode.col)
            if (valOfMove === 0) neutMoves.push(childNode.col) 
        })

        if (winMoves.length) {
            return winMoves[0]
        } else if (loseMoves.length) {
            for (let i = 0; i < 7; i++) {
                if (!loseMoves.includes(i)) return i;
            }
        }

        let num = Math.floor(Math.random() * children.length);
        return children[num].col;
    }
}