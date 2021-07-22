# Connect 4 (with MiniMax AI)

### **Live Link: [Connect 4](https://codepen.io/nathanieldcooke/pen/zYwoYvq)**

_Connect 4_, is a two player game, in-which players take turns dropping their colored tokens into one of seven available slots. The winner is whoever is able to get four of their tokens to line up vertically, horizontally, or diagonally.

<a href="https://codepen.io/nathanieldcooke/pen/zYwoYvq" target="_blank" rel="noopener noreferrer"><img src="./img/connect4.png" width="450"></a>

### Why this project

During this hackathon groups of 1-3 we're tasked with building a toy project, that utilized the topic of the week... Trees. 

### Integration of Trees in project

Having to work with trees on this project. I accomplished building a move tree, then traversing the move tree with the well know MiniMax algorithm. This creates an AI capable of making meaningful/competitive moves, during game play. 

* Building Move Tree

<img src="./img/moveTree.png" width="450">


`./javascript/computerPlayer.js`
```js
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
                // thus there are 7 potential next board state for any given currNode
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
```

* Run MiniMax Algorithm on Move Tree nodes

<a href="https://www.youtube.com/watch?v=l-hh51ncgDI&t=279s" target="_blank" rel="noopener noreferrer"><img src="./img/minimax.png" width="450"></a>

`./javascript/computerPlayer.js`
```js
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
```

## Future Implementations 
- Minimax can have further optimizations for determining the next best move. Such as accounting for the depth of win/lose game nodes, to determine the nearest wins or loses, to the root board state. 
- Optimizing for big-o time/space complexities
- Adding a visualization of the Move Tree

## Connect4 Developer
- [@nathanieldcooke](https://github.com/nathanieldcooke)