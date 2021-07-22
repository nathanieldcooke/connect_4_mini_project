export default class ComputerPlayer {
    constructor(board) {
        this.board = board;
        this.boardState = board.board;
        this.tree = new Tree(this.board);
    }

    makeMove(game) {

        this.tree.buildTree(6, game.board.board)

        let colIdx = this.tree.nextMove()

        let rowIdx = this.board.dropPiece(this.boardState, colIdx, 'RR');

        let winner = this.board.winner(this.boardState, rowIdx, colIdx, 'RR');

        game.display.renderHTML()

        if (winner) {
            game.endGame()
            return;
        }
        game.currPlayer = 'YY'
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
    buildTree(depthLimit, boardState, currPlayer = 'RR') {

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
                    if (win && currPlayer === 'RR') {
                        moveVal = 1;
                    } else if (win && currPlayer === 'YY') {
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
            currPlayer = currPlayer === 'RR' ? 'YY' : 'RR'
        }
    }


    
    // find shallowest next node that is end game state.
    minimax(node, myTurn = false) {
        if (node.val === -1 || node.val === 1 || !node.children.length) return node;

        if (myTurn) {
            return node.children.reduce((accu, child) => {
                let testNode = this.minimax(child, false)
                let score = Math.max(testNode.val, accu.val)
                if ((testNode.val === accu.val === -1 || testNode.val === accu.val === 1)) {
                    if (this.findNodeDepth(testNode) > this.findNodeDepth(accu)) {
                        return accu
                    } else {
                        return testNode
                    }
                }
                return (accu.val === score) ? accu : testNode
            }, new Node(null, -Infinity, null))
        } else {
            return node.children.reduce((accu, child) => {
                let testNode = this.minimax(child, true)
                let score = Math.min(testNode.val, accu.val)
                if ((testNode.val === accu.val === 1 || testNode.val === accu.val === -1)) {
                    if (this.findNodeDepth(testNode) > this.findNodeDepth(accu)) {
                        return accu
                    } else {
                        return testNode
                    }
                }
                return (accu.val === score) ? accu : testNode
            }, new Node(null, Infinity, null))
        }
    }

    // find depth of node passed in. 
    findNodeDepth(targetNode, node = this.root, depth = 0) {
        if (node === targetNode) return depth

        if (node.children.length) {
            for (let i = 0; i < node.children.length; i++) {
                let childNode = node.children[i];
                let res = this.findNodeDepth(targetNode, childNode, depth + 1)
                if (typeof res === 'number') {
                    return res
                }
            }
        }

        return false;
    }


    nextMove() {

        let children = this.root.children;
        
        const winsObj = {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
        }
        
        const loseObj = {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
        }

        const loseArr = []
        
        // determine which columns are already full, add to invalidMoves = []
        const invalidMoves = []
        for (let i = 0; i < 7; i++) {
            if (this.board.board[0][i]) invalidMoves.push(i)
        }

        // console.log('=======================================')
        children.forEach(childNode => {
            let node = this.minimax(childNode)
            let depth = this.findNodeDepth(node)

            console.log(`Node ${childNode.col}: `, node)
            let valOfMove = [node.val, depth]

            if (valOfMove[0] === 1) winsObj[valOfMove[1]].push(childNode.col)

            if (valOfMove[0] === -1) {
                loseObj[valOfMove[1]].push(childNode.col)
                loseArr.push(childNode.col)
            }
            
        })

        console.log('Root: ', this.root)
        console.log('Wins: ', winsObj)
        console.log('Lose: ', loseObj)



        // will return win that is shortest amount of turns
        for (let i = 0; i < 8; i++) {
            let winsArr = winsObj[i] 
            if (winsArr.length) {
                console.log('Win Move: ', winsArr[0])
                return winsArr[0];
            }
        }

        // will pick a non-losing and non-invalid move.
        const potMoves = []
        for (let i = 0; i < 7; i++) {
            if (!loseArr.includes(i) && !invalidMoves.includes(i)) {
                potMoves.push(i)
            }
            // return i; // randomize
        }
        if (potMoves.length) {
            let move = potMoves[Math.floor(Math.random() * potMoves.length)]
            console.log('Reg Move: ', move)
            return move
        }

        // will pick losing move that is most moves away, hopefully human does not see thier win
        for (let i = 0; i < 8; i++) {
            let loseArr = loseObj[i]
            if (loseArr.length) {
                console.log('Lose Move: ', loseArr[0])
                return loseArr[0];
            }
        }
    
    }

} 