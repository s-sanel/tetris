import Game from './game';
import GameView from './game_view';


document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("tetris");
  canvas.width = 200;
  canvas.height = 400;
  const context = canvas.getContext("2d");
  // context.scale(2, 2) ;

  const canvasNext = document.getElementById('next-tetromino');
  canvasNext.width = 100;
  canvasNext.height = 100;
  const contextNext = canvasNext.getContext("2d");

  new Game(context).board.drawEnd(context);

  document.getElementById("start").addEventListener("click", (e) => {
    document.getElementById("start").disabled = true;
    const game = new Game(context, contextNext);
    new GameView(game, context).start();
  });

  document.getElementById("sound").addEventListener("click", (e) => {
    var audio = document.getElementById('tetris-audio');
    if (audio.paused) {
        audio.play();
        document.getElementById('full-sound').style.color = "#333";
        document.getElementById('no-sound').style.color = "#999";
    }else{
        audio.pause();
        document.getElementById('full-sound').style.color = "#999";
        document.getElementById('no-sound').style.color = "#333";
        // audio.currentTime = 0
    }
  });

});
