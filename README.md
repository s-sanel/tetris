# Tetris

[Live link][tetris]

[tetris]: http://sanel-selmanovic.us/tetris/

![Wireframe](assets/tetris-screenshot.png)

### How to play

"Tetriminos" are game pieces shaped like tetrominoes, geometric shapes composed of four square blocks each. A random sequence of Tetriminos fall down the playing field (a rectangular vertical shaft, called the "well" or "matrix"). The objective of the game is to manipulate these Tetriminos, by moving each one sideways (if the player feels the need) and rotating it by 90 degree units, with the aim of creating a horizontal line of ten units without gaps. When such a line is created, it disappears, and any block above the deleted line will fall. When a certain number of lines are cleared, the game enters a new level. As the game progresses, each level causes the Tetriminos to fall faster, and the game ends when the stack of Tetriminos reaches the top of the playing field and no new Tetriminos are able to enter.


### Functionality

In this game, users are able to:
* Start the game by pressing the start button
* Move Tetriminos left, right and down by pressing keyboard left, right and down arrows
* Rotate Tetrimonos by pressing keyboard up arrow
* Drop Tetriminos immediately by pressing space on keyboard
* See the Score which is updated with clearing the rows (extra points when four rows are cleared)
* See the Level which increases as the score grows and with each level Tetriminos are moving faster
* See the upcoming (next) Tetrimino


### Implementation

This project is implemented with using following technologies:
* JavaScript
* Vanilla JavaScript DOM API
* HTML5 Canvas for drawing the game's grid and the moving pieces


<!-- ### Technical Details

#### Tetrimino



```JavaScript
function name(a, b){

}
``` -->


### Future Development
- [ ] Add the ability to hold a piece
- [ ] Choose a level when starting the game
- [ ] Add a score board
