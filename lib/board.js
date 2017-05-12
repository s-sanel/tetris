class Board {
  constructor(ctx) {
    this.level = 1;
    this.clearedRows = 0;
    this.grid = this.createMatrix(10, 20);
    this.ctx = ctx;
  }

  createMatrix(width, height) {
    const matrix = [];
    while (height--) {
      matrix.push(new Array(width).fill(null));
    }
    return matrix;
  }

  draw(ctx, height, width) {
    const padding = 20;

    for (var row = 0; row < 20; row++) {
      for (let col = 0; col < 10; col++) {
        let x = col * padding;
        let y = row * padding;


        if (this.grid[row][col]) {
          ctx.fillStyle = this.grid[row][col].color;
          ctx.fillRect(x, y, padding,padding);
          ctx.lineWidth = 1;
          ctx.strokeStyle = "#666";
          ctx.strokeRect(x,y,padding,padding);
        }
        else {
          ctx.fillStyle = "#666";
          ctx.fillRect(x, y, padding,padding);

          ctx.lineWidth = 1;
          ctx.strokeStyle = "#888";
          ctx.strokeRect(x,y,padding,padding);

          ctx.clearRect(x, y, x + padding, y + padding);
        }
      }
    }

  }

  drawRow(ctx, row) {
    const padding = 20;
    for (let col = 0; col < 10; col++) {
      let x = col * padding;
      let y = row * padding;
      ctx.fillStyle = "#666";
      ctx.fillRect(x, y, padding,padding);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#999";
      ctx.strokeRect(x,y,padding,padding);
    }
  }

  clearRow(ctx, row) {
    const padding = 20;
    for (let col = 0; col < 10; col++) {
      let x = col * padding;
      let y = row * padding;
      ctx.fillStyle = "#c4d0b0";
      ctx.fillRect(x, y, padding,padding);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#888";
      ctx.strokeRect(x,y,padding,padding);
      // ctx.clearRect(x, y, x + padding, y + padding);
    }
  }

  drawEnd(ctx){
    this.addAll(ctx);
    setTimeout(() => {
      this.clearAll(ctx)
    }, 1300);
  }

  addAll(ctx) {
    let i = 19;
    let addRowsInterval = setInterval( ()=> {
      if(i === 0) {
      clearInterval(addRowsInterval);
      }
       this.drawRow(ctx, i--);
    }, 50);
  }

  clearAll(ctx) {
    let j = 0;
    let clearRowsInterval = setInterval( ()=> {
      if(j === 20) {
      clearInterval(clearRowsInterval);
      }
      this.clearRow(ctx, j++);
    }, 50);
  }

  pos(coords) {
    let[x, y] = coords;
    return this.grid[x][y];
  }

  update(piece) {
    piece.coords.forEach(coords => {
      let[x, y] = coords;
      this.grid[x][y] = piece;
    });
  }

  remove(piece) {
    piece.coords.forEach(coords => {
      let[x, y] = coords;
      this.grid[x][y] = null;
    });
  }

  clearFullRows(){

    let fullRows = [];
    const padding = 20;

    for (var row = 0; row < 20; row++) {
      let fullRow = true;
      for (let col = 0; col < 10; col++) {
        if (this.grid[row][col] === null) {
          fullRow = false;
        }
      }
      if(fullRow){
        fullRows.push(row);
      }
    }
    if (fullRows.length == 4) {
      this.clearedRows += 2;
    }
    this.clearedRows += fullRows.length;

    if (fullRows.length > 0) {
      this.removeRows(fullRows);
      this.updateStats();
    }
  }

  removeRows(rowNumbers) {
    rowNumbers.forEach( row => {
      this.removeRow(row);
    });
  }

  // highlightRows(x, y){}
  //
  // removeRows(rowNumbers) {
  //   this.highlightRows(rowNumbers[0], rowNumbers.length);
  //   this.grid.splice(rowNumbers[0], rowNumbers.length);
  //   for (let i = 0; i < rowNumbers.length; i++) {
  //     this.grid.unshift(new Array(10).fill(null));
  //   }
  // }

  removeRow(rowNumber) {
    this.grid.splice(rowNumber,1);
    this.grid.unshift(new Array(10).fill(null));
  }


  updateStats() {
    this.updateScore();
    this.updateLevel();
  }

  updateScore() {
    let scoreElement = document.getElementById("score");
    let score = this.clearedRows * 50;
    let scoreText = document.createTextNode(score);
    scoreElement.innerText = " ";
    scoreElement.appendChild(scoreText);
  }

  resetScore() {
    let scoreElement = document.getElementById("score");
    scoreElement.innerText = "0";
    let levelElement = document.getElementById("level");
    levelElement.innerText = "1";
  }

  updateLevel() {
    this.level = 1 + Math.floor(this.clearedRows / 10);
    let levelElement = document.getElementById("level");
    let levelText = document.createTextNode(this.level);
    levelElement.innerText = " ";
    levelElement.appendChild(levelText);
  }

  onTop(piece) {
    for (let i = 0; i < piece.coords.length; i++) {
      let coord = piece.coords[i];
      let [x, y] = coord;
      if (x === 0) {
        return true;
      }
    }
    return false;
  }

  collision(piece) {
     for (let i = 0; i < piece.coords.length; i++) {
       let coord = piece.coords[i];
       let [x, y] = coord;
       if (x === 19  || (!piece.coordsIncluded([x + 1, y]) && this.filled([x  + 1, y]))) {
         return true;
       }
     }
     return false;
   }

   filled(coords) {
     return this.pos(coords) !== null;
   }

   rotationAllowed(piece) {
     let potentialCoords = piece.nextRotationCoords();
    //  debugger
     for (let i = 0; i < potentialCoords.length; i++) {
       let [x, y] = potentialCoords[i];
       if( (!this.inBoundaries(x, y)) || (this.occupied(x, y) &&  !piece.coordsIncluded([x,y])) ) {
         return false;
       }
     }
     return true;
   }

   movementAllowed(piece, xMove, yMove){
     for (let i = 0; i < piece.coords.length; i++) {
       let coord = piece.coords[i];
       let [pieceX, pieceY] = coord;
       let x = pieceX + xMove;
       let y = pieceY + yMove;

       if( (!this.inBoundaries(x, y)) || (this.occupied(x, y) &&  !piece.coordsIncluded([x,y])) ) {
         return false;
       }
     }
     return true;
   }

   inBoundaries(x, y) {
     return ( y >= 0 && y < 20) && x < 20;
   }

   occupied(x, y){
     return this.grid[x][y] !== null;
   }
}

export default Board;
