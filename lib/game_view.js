import Game from './game';
import Board from './board';

class GameView {
  constructor(game, ctx){
    this.game = game;
    this.ctx = ctx;
    document.body.onkeydown = (e) => this.bindKeyHandlers(e);
    document.body.onkeyup = (e) => this.bindKeyHandlersUp(e);
    this.idInterval = null;
    this.initialSpeed = 700;
    this.speed = 700;
    this.gameStarted = false;
  }

  bindKeyHandlersUp(e) {
    e.preventDefault();
    switch (e.key) {
    case "ArrowLeft":
      document.getElementById("left").style.color = "black";
      break;
    case "ArrowRight":
      document.getElementById("right").style.color = "black";
      break;
    case "ArrowDown":
        document.getElementById("down").style.color = "black";
      break;
    case "ArrowUp":
      document.getElementById("up").style.color = "black";
      break;
    case " ":
      document.getElementById("space").style.color = "black";
      break;
    }
  }

  bindKeyHandlers(e){
    e.preventDefault();
    switch (e.key) {
    case "ArrowLeft":
      this.game.moveLeft();
      document.getElementById("left").style.color = "#666";
      break;
    case "ArrowRight":
      this.game.moveRight();
      document.getElementById("right").style.color = "#666";
      break;
    case "ArrowDown":
      this.game.move();
      document.getElementById("down").style.color = "#666";
      break;
    case "ArrowUp":
      this.game.rotate();
      document.getElementById("up").style.color = "#666";
      break;
    case " ":
      this.game.slam();
      this.game.move();
      document.getElementById("space").style.color = "#666";
      break;
    case "p":
      if(this.gameStarted){
        this.pause();
      }
      break;
    case "h":
      this.game.handleHold();
      break;
    }
  }

  pause(){
    alert("resume!");
  }

  start(){
    this.gameStarted = true;
    let startSpeed = this.speed;

    this.idInterval = setInterval(() => {
      this.game.move();
      let speed = this.initialSpeed + 100 - (this.game.board.level * 100);
      if (speed < 100) { speed = 100; }
      if(startSpeed != speed){
        clearInterval(this.idInterval);
        this.speed = speed;
        startSpeed = speed;
        this.start();
      }
    }, startSpeed);
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(){
    this.game.draw();
    if (this.game.over) {
      this.game.drawEndOfGame(this.ctx);
      clearInterval(this.idInterval);
      this.gameStarted = false;
      document.getElementById("start").disabled = false;
      return;
    }
    requestAnimationFrame(this.animate.bind(this));
  }

  playSlamSound(){
    var audio = new Audio('./assets/music.mp3');
    audio.play()
  }

}

export default GameView;
