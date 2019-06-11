<a name="App"></a>

## App
App Comonent. Handles all business-logic of the app.

**Kind**: global class

* [App](#App)
    * [.componentDidMount()](#App+componentDidMount)
    * [.componentDidUpdate()](#App+componentDidUpdate)
    * [.newGame()](#App+newGame)
    * [.checkWin(board, isNode, returnPlayer)](#App+checkWin) ⇒ <code>boolean</code> \| <code>number</code> \| <code>null</code>
    * [.resolveGame(index, winner)](#App+resolveGame)
    * [.highlightBoard(index, player)](#App+highlightBoard) ⇒ <code>Array.&lt;number&gt;</code>
    * [.checkDraw()](#App+checkDraw)
    * [.drawGame()](#App+drawGame)
    * [.handleTileClick(obj)](#App+handleTileClick)
    * [.claimTile(index, player)](#App+claimTile)
    * [.doesBlunder()](#App+doesBlunder) ⇒ <code>boolean</code>
    * [.boardToString()](#App+boardToString) ⇒ <code>string</code>
    * [.isTerminalNode(depth, emptyTiles, winner)](#App+isTerminalNode)
    * [.minimaxA(node, depth, alpha, beta, first)](#App+minimaxA) ⇒ <code>number</code>
    * [.minimaxB(node, depth, alpha, beta)](#App+minimaxB) ⇒ <code>number</code>
    * [.computersMove()](#App+computersMove)
    * [.randomMove()](#App+randomMove) ⇒ <code>number</code>
    * [.handleResetGame()](#App+handleResetGame)
    * [.handleClearScore()](#App+handleClearScore)
    * [.render()](#App+render)

<a name="App+componentDidMount"></a>

### app.componentDidMount()
React life-cycle method. Called after component is initially mounted.

**Kind**: instance method of [<code>App</code>](#App)
<a name="App+componentDidUpdate"></a>

### app.componentDidUpdate()
React life-cycle method. Called after a render.

**Kind**: instance method of [<code>App</code>](#App)
<a name="App+newGame"></a>

### app.newGame()
Clears the board and resets the game.

**Kind**: instance method of [<code>App</code>](#App)
<a name="App+checkWin"></a>

### app.checkWin(board, isNode, returnPlayer) ⇒ <code>boolean</code> \| <code>number</code> \| <code>null</code>
Checks if the current board or node meets a win condition.

**Kind**: instance method of [<code>App</code>](#App)
**Returns**: <code>boolean</code> \| <code>number</code> \| <code>null</code> - Return type depends on setting of isNode &
returnPlayer params.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| board | <code>Array.&lt;number&gt;</code> |  | The current board or node to be evaluated. |
| isNode | <code>boolean</code> | <code>false</code> | If true, returns boolean. If false, resolves game if win occurs. |
| returnPlayer | <code>boolean</code> | <code>false</code> | If true, returns integer representation of winning player. |

<a name="App+resolveGame"></a>

### app.resolveGame(index, winner)
Increments score, highlights winning move, and starts next game.

**Kind**: instance method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | Index of state.winCondition that was met. |
| winner | <code>number</code> | Integer representation of winning player. |

<a name="App+highlightBoard"></a>

### app.highlightBoard(index, player) ⇒ <code>Array.&lt;number&gt;</code>
Tells the render method which tiles to highlight in which color.

**Kind**: instance method of [<code>App</code>](#App)
**Returns**: <code>Array.&lt;number&gt;</code> - Number array to replace state.highlight.

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | Index of state.winCondition that was met. |
| player | <code>number</code> | Integer representation of winning player. |

<a name="App+checkDraw"></a>

### app.checkDraw()
Checks if the current board meets the draw condition.

**Kind**: instance method of [<code>App</code>](#App)
<a name="App+drawGame"></a>

### app.drawGame()
Increments score, highlights board, and starts next game.

**Kind**: instance method of [<code>App</code>](#App)
<a name="App+handleTileClick"></a>

### app.handleTileClick(obj)
Handles a tile being clicked.

**Kind**: instance method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | Object containing index of tile that was clicked. |

<a name="App+claimTile"></a>

### app.claimTile(index, player)
Registers tile ownership.

**Kind**: instance method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | Index of state.board that was claimed. |
| player | <code>number</code> | Integer representation of player claiming tile. |

<a name="App+doesBlunder"></a>

### app.doesBlunder() ⇒ <code>boolean</code>
Compares state.blunderChance to a random number.

**Kind**: instance method of [<code>App</code>](#App)
**Returns**: <code>boolean</code> - Result of comparison.
<a name="App+boardToString"></a>

### app.boardToString() ⇒ <code>string</code>
Converts state.board from number array to string Xs and Os.

**Kind**: instance method of [<code>App</code>](#App)
**Returns**: <code>string</code> - String representation of state.board.
<a name="App+isTerminalNode"></a>

### app.isTerminalNode(depth, emptyTiles, winner)
Checks if a node is terminal.

**Kind**: instance method of [<code>App</code>](#App)

| Param | Type | Description |
| --- | --- | --- |
| depth | <code>number</code> | Indicates the depth of the node. |
| emptyTiles | <code>Array.&lt;number&gt;</code> | The indices of empty tiles in the node. |
| winner | <code>number</code> \| <code>null</code> | Integer representation of the winning player, if any. |

<a name="App+minimaxA"></a>

### app.minimaxA(node, depth, alpha, beta, first) ⇒ <code>number</code>
Determines the best move by constructing a search tree of all possible AI moves.

**Kind**: instance method of [<code>App</code>](#App)
**Returns**: <code>number</code> - If root node, returns index of best move. Otherwise returns heuristic value.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| node | <code>Array.&lt;number&gt;</code> |  | The state of the board after possible moves are played. |
| depth | <code>number</code> | <code>0</code> | The depth of the tree. |
| alpha | <code>number</code> |  | Prunes nodes that could not possibly be maximizing. |
| beta | <code>number</code> |  | Prunes nodes that could not possibly be minimizing. |
| first | <code>boolean</code> | <code>true</code> | If true, designates the root node. |

<a name="App+minimaxB"></a>

### app.minimaxB(node, depth, alpha, beta) ⇒ <code>number</code>
Determines the best move by constructing a search tree of all possible human moves.

**Kind**: instance method of [<code>App</code>](#App)
**Returns**: <code>number</code> - The heuristic value of this node.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| node | <code>Array.&lt;number&gt;</code> |  | The state of the board after possible moves are played. |
| depth | <code>number</code> | <code>0</code> | The depth of the tree. |
| alpha | <code>number</code> |  | Prunes nodes that could not possibly be maximizing. |
| beta | <code>number</code> |  | Prunes nodes that could not possibly be minimizing. |

<a name="App+computersMove"></a>

### app.computersMove()
possible move.t will claim a random tile. If it does not blunder, it will make the bestet

**Kind**: instance method of [<code>App</code>](#App)
<a name="App+randomMove"></a>

### app.randomMove() ⇒ <code>number</code>
Chooses an empty tile at random.

**Kind**: instance method of [<code>App</code>](#App)
**Returns**: <code>number</code> - Index of a random empty tile.
<a name="App+handleResetGame"></a>

### app.handleResetGame()
Increments loss counter, highlights board, and starts new game.

**Kind**: instance method of [<code>App</code>](#App)
<a name="App+handleClearScore"></a>

### app.handleClearScore()
Clears score, highlights board, and starts new game.

**Kind**: instance method of [<code>App</code>](#App)
<a name="App+render"></a>

### app.render()
React method. Renders UI.

**Kind**: instance method of [<code>App</code>](#App)

* * *

&copy; 2019 Adil Iqbal