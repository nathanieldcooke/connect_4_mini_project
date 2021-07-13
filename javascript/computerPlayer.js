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


    // Generates next board states(next potential moves), of current root node;
    buildTree(depthLimit, boardState, currPlayer = 'red') {

        this.root = new Node(boardState, 0, null); // current board state.
        let nodes = [this.root];
        let childrenNodes = [];

        for (let j = depthLimit; j > 0; j--){ // limits the depth of the tree. **most computers can't calculate all potential moves

            nodes = nodes.concat(childrenNodes);
            childrenNodes = [];

            while (nodes.length) { // will get next board state permutations, for nodes in the array.

                let currNode = nodes.pop()

                // There are 7 potential columns a token can be dropped into, 
                // thus there are 7 potentail next board state for any given currNode
                // This loop will generate those states, by dropping a token in the respective columns,
                // creating nodes from those potential next boards, and adding them to currNodes.children.
                for (let i = 0; i < 7; i++) { 
                    let col = i;
        
                    if (currNode.boardState[0][col]) continue; // check if column is filled with tokens, skip if it is full.
                    
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

            // After simulating all potential moves of currPlayer, change currPlayer for next set of potentail moves 
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
        const invalidMoves = []


        children.forEach(childNode => {
            let valOfMove = this.minimax(childNode)
            if (valOfMove === 1) winMoves.push(childNode.col)
            if (valOfMove === -1) loseMoves.push(childNode.col)
        })

        for (let i = 0; i < 7; i++) {
            if (this.board.board[0][i]) invalidMoves.push(i)
        }

        if (winMoves.length) {
            return winMoves[0]
        } else if (loseMoves.length) {
            for (let i = 0; i < 7; i++) {
                if (!loseMoves.includes(i) && !invalidMoves.includes(i)) return i;
            }
        }

        let num = Math.floor(Math.random() * children.length);
        return children[num].col;
    }
}