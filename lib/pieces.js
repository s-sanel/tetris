const oPiece = {
  color: "yellow",
  coords: [[0, 4],[0, 5],[1, 4],[1, 5]],
  defaultCoords: [[0, 4],[0, 5],[1, 4],[1, 5]],
  center: [1, 5],
  defaultCenter: [1, 5],
  type: "staticPiece",
  draw: ctx => {
    ctx.fillStyle = "yellow";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#666";
    ctx.fillRect(30, 30, 20, 20);
    ctx.strokeRect(30, 30, 20, 20);
    ctx.fillRect(30, 50, 20, 20);
    ctx.strokeRect(30, 50, 20, 20);
    ctx.fillRect(50, 30, 20, 20);
    ctx.strokeRect(50, 30, 20, 20);
    ctx.fillRect(50, 50, 20, 20);
    ctx.strokeRect(50, 50, 20, 20);
  }
}

const sPiece = {
  color: "magenta",
  coords: [[0, 4],[0, 5],[1, 3],[1, 4]],
  defaultCoords: [[0, 4],[0, 5],[1, 3],[1, 4]],
  type: "togglePiece",
  center: [1, 4],
  defaultCenter: [1, 4],
  draw: ctx => {
    ctx.fillStyle = "magenta";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#666";

    ctx.fillRect(40, 50, 20, 20);
    ctx.strokeRect(40, 50, 20, 20);

    ctx.fillRect(40, 30, 20, 20);
    ctx.strokeRect(40, 30, 20, 20);

    ctx.fillRect(60, 30, 20, 20);
    ctx.strokeRect(60, 30, 20, 20);

    ctx.fillRect(20, 50, 20, 20);
    ctx.strokeRect(20, 50, 20, 20);
  }
}

const zPiece = {
  color: "green",
  coords: [[0, 3],[0, 4],[1, 4],[1, 5]],
  defaultCoords: [[0, 3],[0, 4],[1, 4],[1, 5]],
  type: "togglePiece",
  center: [1, 4],
  defaultCenter: [1, 4],
  draw: ctx => {
    ctx.fillStyle = "green";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#666";

    ctx.fillRect(40, 50, 20, 20);
    ctx.strokeRect(40, 50, 20, 20);
    ctx.fillRect(60, 50, 20, 20);
    ctx.strokeRect(60, 50, 20, 20);
    ctx.fillRect(40, 30, 20, 20);
    ctx.strokeRect(40, 30, 20, 20);
    ctx.fillRect(20, 30, 20, 20);
    ctx.strokeRect(20, 30, 20, 20);
  }

}

const tPiece = {
  color: "black",
  coords: [[0, 4],[1, 3],[1, 4],[1, 5]],
  defaultCoords: [[0, 4],[1, 3],[1, 4],[1, 5]],
  center: [1, 4],
  defaultCenter: [1, 4],
  type: "rotatePiece",
  draw: ctx => {
    ctx.fillStyle = "black";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#666";

    ctx.fillRect(40, 50, 20, 20);
    ctx.strokeRect(40, 50, 20, 20);
    ctx.fillRect(20, 50, 20, 20);
    ctx.strokeRect(20, 50, 20, 20);
    ctx.fillRect(60, 50, 20, 20);
    ctx.strokeRect(60, 50, 20, 20);
    ctx.fillRect(40, 30, 20, 20);
    ctx.strokeRect(40, 30, 20, 20);
  }
}

const iPiece = {
  color: "red",
  coords: [[0, 4],[1, 4],[2, 4],[3, 4]],
  defaultCoords: [[0, 4],[1, 4],[2, 4],[3, 4]],
  center: [2, 4],
  defaultCenter: [2, 4],
  type: "togglePiece",
  draw: ctx => {
    ctx.fillStyle = "red";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#666";

    ctx.fillRect(40, 30, 20, 20);
    ctx.strokeRect(40, 30, 20, 20);
    ctx.fillRect(40, 10, 20, 20);
    ctx.strokeRect(40, 10, 20, 20);
    ctx.fillRect(40, 50, 20, 20);
    ctx.strokeRect(40, 50, 20, 20);
    ctx.fillRect(40, 70, 20, 20);
    ctx.strokeRect(40, 70, 20, 20);
  }
}

const lPiece = {
  color: "orange",
  coords: [[0, 4],[1, 4],[2, 4],[2, 5]],
  defaultCoords: [[0, 4],[1, 4],[2, 4],[2, 5]],
  center: [1, 4],
  defaultCenter: [1, 4],
  type: "rotatePiece",
  draw: ctx => {
    ctx.fillStyle = "orange";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#666";

    ctx.fillRect(30, 20, 20, 20);
    ctx.strokeRect(30, 20, 20, 20);
    ctx.fillRect(30, 40, 20, 20);
    ctx.strokeRect(30, 40, 20, 20);
    ctx.fillRect(30, 60, 20, 20);
    ctx.strokeRect(30, 60, 20, 20);
    ctx.fillRect(50, 60, 20, 20);
    ctx.strokeRect(50, 60, 20, 20);
  }
}

const jPiece = {
  color: "blue",
  coords: [[0, 5],[1, 5],[2, 5],[2, 4]],
  defaultCoords: [[0, 5],[1, 5],[2, 5],[2, 4]],
  center: [1, 5],
  defaultCenter: [1, 5],
  type: "rotatePiece",
  draw: ctx => {
    ctx.fillStyle = "blue";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#666";

    ctx.fillRect(50, 20, 20, 20);
    ctx.strokeRect(50, 20, 20, 20);
    ctx.fillRect(50, 40, 20, 20);
    ctx.strokeRect(50, 40, 20, 20);
    ctx.fillRect(50, 60, 20, 20);
    ctx.strokeRect(50, 60, 20, 20);
    ctx.fillRect(30, 60, 20, 20);
    ctx.strokeRect(30, 60, 20, 20);
  }
}

class Piece {
  constructor(options){
    this.coords = options.coords;
    this.defaultCoords = options.defaultCoords;
    this.color  = options.color;
    this.draw   = options.draw;
    this.center = options.center;
    this.defaultCenter = options.defaultCenter;

    this.getRotationData = options.getRotationData;
    this.rotationState = 1;
  }

  previewHoldTetromino(){
    const canvas = document.getElementById("hold-tetromino");
    canvas.height = 100;
    canvas.width = 100;
    const ctxHold = canvas.getContext("2d");
    ctxHold.clearRect(0,0,100,100);
    this.draw(ctxHold);
  }

  previewTetromino(ctx) {
    ctx.clearRect(0, 0, 100, 100);
    this.draw(ctx);
  }

  moveLeft() {
    this.coords = this.coords.map( coord => {
      let [x, y] = coord;
      return [x, y - 1];
    });
    this.center = [this.center[0], this.center[1] - 1];
  }

  moveRight() {
    this.coords = this.coords.map( coord => {
      let [x, y] = coord;
      return [x, y + 1];
    });
    this.center = [this.center[0], this.center[1] + 1];
  }

  drop() {
    this.coords = this.coords.map(coord => {
      let [x, y] = coord;
      return [x + 1, y];
    });
    this.center = [this.center[0] + 1, this.center[1]];
  }

  nextRotationCoords() {
    let nextCoords = [];
    nextCoords = this.coords.map(coord => {
      return this.rotateCoord(coord);
    });
    return nextCoords;
  }

  rotate() {
    this.coords = this.coords.map(coord => {
      return this.rotateCoord(coord);
    });
  }

  rotateCoord(coord) {
    let [centerX, centerY] = this.center;
    let posFromCenter = [coord[0] - centerX, coord[1] - centerY];
    let [row, col] = posFromCenter;
    return [col + centerX, (row * -1) + centerY];
  }

  coordsIncluded(coord) {
    for (let i = 0; i < this.coords.length; i++) {
      let [oldx, oldy] = this.coords[i];
      if (oldx === coord[0] && oldy === coord[1]) {
        return true;
      }
    }
    return false;
  }

}


export default Piece;

// I, S, Z
class TogglePiece extends Piece {
  constructor(options) {
    super(options);
  }
}

// T, L, J
class RotatePiece extends Piece {
  constructor(options) {
    super(options);
  }
}

// O
class StaticPiece extends Piece {
  constructor(options) {
    super(options);
  }
  rotate(){
    return;
  }
}


Piece.PIECES = [oPiece, sPiece, zPiece, tPiece, iPiece, lPiece, jPiece];

Piece.randomPiece = () => {
  let random = Math.floor(Math.random() * 7);
  let options = Piece.PIECES[random];

  switch (options.type) {
    case "staticPiece":
      return new StaticPiece(options);
    case "togglePiece":
      return new TogglePiece(options);
    case "rotatePiece":
      return new RotatePiece(options);
    default:
      console.log("No type");
  }
};
