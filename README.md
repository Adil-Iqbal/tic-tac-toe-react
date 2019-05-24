# Tic-Tac-Toe in React!
> This is an implementation of Tic-Tac-Toe written using the ReactJS framework.

## Table of contents
* [General info](#general-info)
* [Screenshots](#screenshots)
* [Technologies](#technologies)
* [Features](#features)
* [Status](#status)
* [Setup](#setup)
* [Contact](#contact)
* [Development Notes](#development-notes)

## General info
This app is a one-player game of Tic-Tac-Toe.  The computer opponent uses a **[Minimax Algorithm](https://en.wikipedia.org/wiki/Minimax)** to determine its move.  In keeping with how this game is typically played in real world, the initial move is assigned randomly to either the player or the computer.  The 'X' and 'O' delimiters are also assigned randomly.  This project was written for the following reasons:
* **Demonstrate my ability to ...**
  * ... use the React framework.
  * ... integrate type-checking in React applications.
  * ... integrate Node, ESLint, and Webpack into my React projects.
  * ... implement a recursive algorithm.

* **Give myself the opportunity to ...**
  * ... construct a build scaffold to stream-line production of future React projects.
  * ... learn and implement best-practices in my code.
  * ... keep myself up-to-date on skills that have already been acquired (Node, Webpack, ESLint, Sass, etc). 
  * ... provide a foundation for learning other React technologies (React Router, Redux, and React-Native).

## Screenshots
![Example screenshot](https://via.placeholder.com/500.jpg?text=Place+screenshot+here.)

## Technologies 
* **React** - version 16.8.6
* **Webpack** - version 4.32.0
* **Node** - version 10.15.3
* **ESLint** - version 5.16.0
* **Sass** - version 3.6.0
* **Babel** - version 7.4.6

See the 'package.json' file in the root directory for complete and detailed information on all technologies used as well as versioning.

## Features

## Status
This project is currently **in active development** and *not ready* for publishing. This section will be updated often during the development process. Once published, a live version will be viewable on **[my portfolio page](https://www.adil-iqbal.com/)**.

## Setup
Describe how to install / setup your local environment / add link to demo version.

## Contact
Created by [Adil Iqbal](https://www.adil-iqbal.com/).

E-mail: main@adil-iqbal.com

## Development Notes
This section was written prior to the beginning of development. This section's purpose is to help me clarify how to reason about coding this application.

DISCLAIMER: The completed source code will likely differ from the plan I have set here (for many reasons). Since this plan is written in plain english, it is likely to contain human error which I will debug during the development process. Also, the full functionality has not yet been strongly defined; there will likely be situations when I begin developing that I have not yet forseen. Finally, the below plan omits the need for react life-cycle methods since that is something I intend to grapple with in the development process.   My hope is that this section gives us an idea of my thought process going into this project. *Regardless, I will not be amending this section once development begins.*

* **Goals of this section:**
  * Ensure minimal & uni-directional data flow as much as possible.
  * Propose data-structures that will be required.
  * Propose functionality that will be required.
  * Establish the structure of the application (parent-child relationships).
  * Use plain english to describe what needs to be done.

* **GLOBAL SCOPE**
  * Player is represented by 1.
  * Computer is represented by -1.
  * Though not explicitly stated, a 0 will represent neither.

* **APP**
  * **State**
    * board: Array of 9 integers that represent the state of board.
    * winConditions: 2-dimensional 7x3 array with integers representing indicies of win conditions.
    * playerIsX: Boolean representing whether player is assigned 'X'.
    * playersTurn: Boolean representing whether its currently the players turn.
    * blunderChance: A floating point number between 0 and 1 representing the blunder chance of the computer.
    * score: An object containing representing the score board.
      * wins: Integer representing player wins.
      * losses: Integer representing player losses.
      * draws: Integer representing player draws.
  * **Business Logic.**
    * Initialize game.
      * Set playersTurn randomly.
      * Set playerIsX randomly.
      * Set blunderChance randomly.
      * Fill board array with 0.
      * If playersTurn is false, the Computer moves.
    * Define click event handlers
      * handleTileClick: Function that handles a Tile Component being clicked.
        * If tile's boardStringChar is ' ' and it's playersTurn, 
          * Change board to reflect which tile was claimed.
          * Begin next move.
      * handleResetClick: Function that handles a 'Forfeit and Reset' button being clicked.
        * Increments score.losses.
        * Initialize next game.
      * handleClearScoreClick: 'Function that handles a 'Forfeit and Reset' button being clicked.
        * Set score properties to 0.
        * Initialize next game.
    * computersMove: Method that determines the computer's move.
      * Checks whether the computer blunders.
      * If it blunders, the computer claims a random empty Tile.
      * If it doesn't blunder, the computer claims the optimal Tile (based on Minimax Algorithm).
    * checkWin: Method that checks whether player/computer has met a win condition.
    * checkDraw: Method that checks whether a draw has occurred.
    * gameOver: Method called when game is to conclude.
      * Highlight Tiles involved in win condition.
        * Player wins. 
          * Green
          * Increment score.wins.
        * Computer wins.
          * Red
          * Increment score.losses.
        * Draw
          * All tiles blue.
          * Increment score.draws.
      * Wait for 800ms.
      * Re-initialize game board.
    * nextTurn: Method that is called whenever a turn has concluded.
        * Checks win conditions.
        * Checks draw conditions.
        * Toggles playerTurn
        * If not playersTurn, invokes computer's move.
    * boardToString: Method that converts board to string of length 9, containing only 'X', 'O', and ' '.
    * booleanRoll: Method that returns a random boolean value.
    * doesBlunder: Method that returns a boolean value based on the blunderChance.
  * **Renders**
    * Renders UI component.
    * Renders Board component.
    * Passes app state to sub-components as props.
    * Passes click event handlers to components as props.

* **BOARD COMPONENT**
  * **Props**
    * board as string.
    * handleTileClick
  * **Renders**
    * 9 Tile components.
    * Pass props to sub-components.

* **TILE COMPONENT**
  * **Props**
    * boardIndex - Integer representing tile's corresponding index in board array.
    * boardStringChar - String representing tile's corresponding character in board string.
    * handleTileClick
  * **Renders**
    * boardStringChar.
    * Executes handleTileClick on click.

* **UI COMPONENT**
  * **Props**
    * score
    * handleResetClick
    * handleClearScoreClick
    * blunderChance
  * **Renders**
    * Score board data.
    * Board intelligence data (1 - blunderChance).
    * 'Clear Scoreboard' button that executes handleClearScoreClick on click.
    * 'Forfeit and Reset' button that executes handleResetClick on click.
