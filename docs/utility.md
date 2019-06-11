## Constants

<dl>
<dt><a href="#HUMAN">HUMAN</a></dt>
<dd><p>Integer representation of the human player.</p>
</dd>
<dt><a href="#COMPUTER">COMPUTER</a></dt>
<dd><p>Integer representation of the AI player.</p>
</dd>
<dt><a href="#EMPTY">EMPTY</a></dt>
<dd><p>Integer representation of an empty tile.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#rollBoolean">rollBoolean()</a> ⇒ <code>boolean</code></dt>
<dd><p>Coin toss.</p>
</dd>
<dt><a href="#rollBlunder">rollBlunder(max, min)</a> ⇒ <code>number</code></dt>
<dd><p>Returns a random number.</p>
</dd>
<dt><a href="#sleep">sleep(ms)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Halts execution of code for set amount of time.</p>
</dd>
<dt><a href="#getEmptyTiles">getEmptyTiles(node)</a> ⇒ <code>Array.&lt;number&gt;</code></dt>
<dd><p>Finds all empty tiles on a board.</p>
</dd>
<dt><a href="#createChildNode">createChildNode(parent, index, player)</a> ⇒ <code>Array.&lt;number&gt;</code></dt>
<dd><p>Creates a hypothetical move on a given board.</p>
</dd>
<dt><a href="#pickRandomElement">pickRandomElement(array)</a> ⇒ <code>any</code></dt>
<dd><p>Picks a random element in an array.</p>
</dd>
</dl>

<a name="HUMAN"></a>

## HUMAN
Integer representation of the human player.

**Kind**: global constant
<a name="COMPUTER"></a>

## COMPUTER
Integer representation of the AI player.

**Kind**: global constant
<a name="EMPTY"></a>

## EMPTY
Integer representation of an empty tile.

**Kind**: global constant
<a name="rollBoolean"></a>

## rollBoolean() ⇒ <code>boolean</code>
Coin toss.

**Kind**: global function
**Returns**: <code>boolean</code> - Result of coin toss.
<a name="rollBlunder"></a>

## rollBlunder(max, min) ⇒ <code>number</code>
Returns a random number.

**Kind**: global function
**Returns**: <code>number</code> - Random number.

| Param | Type | Description |
| --- | --- | --- |
| max | <code>number</code> | Maximum value of random number. |
| min | <code>number</code> | Minimum value of random number. |

<a name="sleep"></a>

## sleep(ms) ⇒ <code>Promise.&lt;void&gt;</code>
Halts execution of code for set amount of time.

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| ms | <code>number</code> | Milliseconds of delay. |

<a name="getEmptyTiles"></a>

## getEmptyTiles(node) ⇒ <code>Array.&lt;number&gt;</code>
Finds all empty tiles on a board.

**Kind**: global function
**Returns**: <code>Array.&lt;number&gt;</code> - Indices of empty tiles.

| Param | Type | Description |
| --- | --- | --- |
| node | <code>Array.&lt;number&gt;</code> | Board state. |

<a name="createChildNode"></a>

## createChildNode(parent, index, player) ⇒ <code>Array.&lt;number&gt;</code>
Creates a hypothetical move on a given board.

**Kind**: global function
**Returns**: <code>Array.&lt;number&gt;</code> - New board state after move is made.

| Param | Type | Description |
| --- | --- | --- |
| parent | <code>Array.&lt;number&gt;</code> | Board on which to make move. |
| index | <code>number</code> | Index on which the move is made. |
| player | <code>number</code> | Integer representation of player making the move. |

<a name="pickRandomElement"></a>

## pickRandomElement(array) ⇒ <code>any</code>
Picks a random element in an array.

**Kind**: global function
**Returns**: <code>any</code> - Item to be returned.

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array.&lt;any&gt;</code> | Array to be processed. |


* * *

&copy; 2019 Adil Iqbal