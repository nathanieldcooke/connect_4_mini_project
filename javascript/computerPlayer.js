export default class ComputerPlayer {
    constructor(board) {
        this.board = board;
        this.boardState = board.board;
        this.tree = new Tree(this.board);
    }

    makeMove() {
        this.tree.buildTree(7, this.boardState)
        console.log(this.tree.root)
    }
}

class Node {

    constructor(boardState, val) {
        this.boardState = boardState // current boardState
        this.val = val // -1 = lose, 0 = neutral, 1 = win
        this.children = []  // every next move board permutaion
    }

}

class Tree {

    constructor(board) {
        this.board = board;
        this.root = null; 
    }


    buildTree(depthLimit, boardState, currPlayer = 'red') {
        this.root = new Node(boardState, 0);

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
                    let childNode = new Node(boardStateDupe, moveVal)
                    currNode.children.push(childNode)
                    childrenNodes.push(childNode)
                }
            }
            currPlayer = currPlayer === 'red' ? 'yellow' : 'red'
        }
    }

    nextMove() {
        //determine if next move(roots direct children) is going to be win
        this.root.children.reduce
    }
}