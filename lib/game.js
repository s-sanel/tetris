import Board from './board';
import Piece from './pieces';

class Game {
  constructor(ctxMain, ctxNext) {
    this.board = new Board(ctxMain);
    this.ctxMain = ctxMain;
    this.ctxNext = ctxNext;
    this.spawnPiece();
    this.insert();
    this.over = false;
    this.canHold = true;
  }

  move(){
    this.drop();
    this.insert();
  }

  clearFullRows() {
    this.board.clearFullRows();
  }

  gameOver(){
    return (this.collision(this.currentTetromino) && this.board.onTop(this.currentTetromino))
  }

  draw(){
      this.ctxMain.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
      this.board.draw(this.ctxMain);
      this.nextTetromino.previewTetromino(this.ctxNext);
      if(this.holdTetromino){
        this.holdTetromino.previewHoldTetromino();
      }
  }

  drawEndOfGame(ctx) {
    this.board.drawEnd(ctx);
    this.board.resetScore();
  }

  handleHold() {
    if (this.canHold) {
      if(this.holdTetromino) {
        let temp = this.currentTetromino;
        this.board.remove(this.currentTetromino);

        this.currentTetromino = this.holdTetromino;
        this.holdTetromino = temp;

        this.currentTetromino.coords = this.currentTetromino.defaultCoords;
        this.currentTetromino.center = this.currentTetromino.defaultCenter;
        this.canHold = false;
      }else {
        if(this.currentTetromino){
          this.holdTetromino = this.currentTetromino;
          this.board.remove(this.currentTetromino);
          this.spawnPiece();
        }
      }
      this.insert();
    } else {
      console.log("can't hold again same piece");
    }

  }

  spawnPiece(){
    if (!this.nextTetromino) {
      this.currentTetromino = Piece.randomPiece();
    } else {
      this.currentTetromino = this.nextTetromino;
    }
    this.nextTetromino = Piece.randomPiece();
    this.canHold = true;
  }

  insert() {
    this.board.update(this.currentTetromino);
  }

  drop(){
    if(this.gameOver()){
      this.over = true;
    }
    else if (this.collision()) {
      this.clearFullRows();
      this.spawnPiece();
    }
    else {
      this.board.remove(this.currentTetromino);
      this.currentTetromino.drop();
    }
  }

  collision() {
    return this.board.collision(this.currentTetromino);
  }

  moveLeft(){
    if(this.board.movementAllowed(this.currentTetromino, 0, -1)){
      this.board.remove(this.currentTetromino);
      this.currentTetromino.moveLeft();
      this.insert();
    }
  }

  moveRight(){
    if(this.board.movementAllowed(this.currentTetromino, 0, 1)){
      this.board.remove(this.currentTetromino);
      this.currentTetromino.moveRight();
      this.insert();
    }
  }

  slam(){
    while(this.board.movementAllowed(this.currentTetromino, 1, 0)){
      this.drop();
    }
    this.board.remove(this.currentTetromino);
    this.insert();
  }

  rotate() {
    if (this.board.rotationAllowed(this.currentTetromino)){
      this.board.remove(this.currentTetromino);
      this.currentTetromino.rotate(this.currentTetromino);
      this.insert();
    } else { }
  }

}

Game.WIDTH = 200;
Game.HEIGHT = 400;

export default Game;
