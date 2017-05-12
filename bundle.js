/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _board = __webpack_require__(1);

var _board2 = _interopRequireDefault(_board);

var _pieces = __webpack_require__(3);

var _pieces2 = _interopRequireDefault(_pieces);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(ctxMain, ctxNext) {
    _classCallCheck(this, Game);

    this.board = new _board2.default(ctxMain);
    this.ctxMain = ctxMain;
    this.ctxNext = ctxNext;
    this.spawnPiece();
    this.insert();
    this.over = false;
    this.canHold = true;
    // this.getHold = false;
  }

  _createClass(Game, [{
    key: 'move',
    value: function move() {
      this.drop();
      this.insert();
    }
  }, {
    key: 'clearFullRows',
    value: function clearFullRows() {
      this.board.clearFullRows();
    }
  }, {
    key: 'gameOver',
    value: function gameOver() {
      return this.collision(this.currentTetromino) && this.board.onTop(this.currentTetromino);
    }
  }, {
    key: 'draw',
    value: function draw() {
      this.ctxMain.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
      this.board.draw(this.ctxMain);
      this.nextTetromino.previewTetromino(this.ctxNext);
      if (this.holdTetromino) {
        this.holdTetromino.previewHoldTetromino();
      }
    }
  }, {
    key: 'drawEndOfGame',
    value: function drawEndOfGame(ctx) {
      this.board.drawEnd(ctx);
      this.board.resetScore();
      // this.board.resetLevel();
    }
  }, {
    key: 'handleHold',
    value: function handleHold() {
      // debugger
      if (this.canHold) {
        // this.getHold = true;
        if (this.holdTetromino) {
          // let temp = this.holdTetromino;
          // this.holdTetromino = this.currentTetromino;
          // this.board.remove(this.currentTetromino);
          // this.currentTetromino = temp;
          var temp = this.currentTetromino;
          this.board.remove(this.currentTetromino);

          this.currentTetromino = this.holdTetromino;
          this.holdTetromino = temp;

          this.currentTetromino.coords = this.currentTetromino.defaultCoords;
          this.currentTetromino.center = this.currentTetromino.defaultCenter;
          // this.insert();
          this.canHold = false;
        } else {
          // debugger
          if (this.currentTetromino) {
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
  }, {
    key: 'spawnPiece',
    value: function spawnPiece() {
      if (!this.nextTetromino) {
        this.currentTetromino = _pieces2.default.randomPiece();
      } else {
        this.currentTetromino = this.nextTetromino;
      }
      this.nextTetromino = _pieces2.default.randomPiece();
      this.canHold = true;
    }

    // spawnPiece(){
    //   if (!this.nextTetromino) {
    //     this.currentTetromino = Piece.randomPiece();
    //   } else {
    //     this.currentTetromino = this.nextTetromino;
    //   }
    //   this.nextTetromino = Piece.randomPiece();
    // }

  }, {
    key: 'insert',
    value: function insert() {
      this.board.update(this.currentTetromino);
    }
  }, {
    key: 'drop',
    value: function drop() {
      if (this.gameOver()) {
        this.over = true;
      } else if (this.collision()) {
        this.clearFullRows();
        this.spawnPiece();
      } else {
        this.board.remove(this.currentTetromino);
        this.currentTetromino.drop();
      }
    }
  }, {
    key: 'collision',
    value: function collision() {
      return this.board.collision(this.currentTetromino);
    }
  }, {
    key: 'moveLeft',
    value: function moveLeft() {
      if (this.board.movementAllowed(this.currentTetromino, 0, -1)) {
        this.board.remove(this.currentTetromino);
        this.currentTetromino.moveLeft();
        this.insert();
      }
    }
  }, {
    key: 'moveRight',
    value: function moveRight() {
      if (this.board.movementAllowed(this.currentTetromino, 0, 1)) {
        this.board.remove(this.currentTetromino);
        this.currentTetromino.moveRight();
        this.insert();
      }
    }
  }, {
    key: 'slam',
    value: function slam() {
      while (this.board.movementAllowed(this.currentTetromino, 1, 0)) {
        this.drop();
      }
      this.board.remove(this.currentTetromino);
      this.insert();
    }
  }, {
    key: 'rotate',
    value: function rotate() {
      if (this.board.rotationAllowed(this.currentTetromino)) {
        this.board.remove(this.currentTetromino);
        this.currentTetromino.rotate(this.currentTetromino);
        this.insert();
      } else {
        // console.log("Game: can't rotate");
      }
    }
  }]);

  return Game;
}();

Game.WIDTH = 200;
Game.HEIGHT = 400;

exports.default = Game;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
  function Board(ctx) {
    _classCallCheck(this, Board);

    this.level = 1;
    this.clearedRows = 0;
    this.grid = this.createMatrix(10, 20);
    this.ctx = ctx;
  }

  _createClass(Board, [{
    key: "createMatrix",
    value: function createMatrix(width, height) {
      var matrix = [];
      while (height--) {
        matrix.push(new Array(width).fill(null));
      }
      return matrix;
    }
  }, {
    key: "draw",
    value: function draw(ctx, height, width) {
      var padding = 20;

      for (var row = 0; row < 20; row++) {
        for (var col = 0; col < 10; col++) {
          var x = col * padding;
          var y = row * padding;

          if (this.grid[row][col]) {
            ctx.fillStyle = this.grid[row][col].color;
            ctx.fillRect(x, y, padding, padding);
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#666";
            ctx.strokeRect(x, y, padding, padding);
          } else {
            ctx.fillStyle = "#666";
            ctx.fillRect(x, y, padding, padding);

            ctx.lineWidth = 1;
            ctx.strokeStyle = "#888";
            ctx.strokeRect(x, y, padding, padding);

            ctx.clearRect(x, y, x + padding, y + padding);
          }
        }
      }
    }
  }, {
    key: "drawRow",
    value: function drawRow(ctx, row) {
      var padding = 20;
      for (var col = 0; col < 10; col++) {
        var x = col * padding;
        var y = row * padding;
        ctx.fillStyle = "#666";
        ctx.fillRect(x, y, padding, padding);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#999";
        ctx.strokeRect(x, y, padding, padding);
      }
    }
  }, {
    key: "clearRow",
    value: function clearRow(ctx, row) {
      var padding = 20;
      for (var col = 0; col < 10; col++) {
        var x = col * padding;
        var y = row * padding;
        ctx.fillStyle = "#c4d0b0";
        ctx.fillRect(x, y, padding, padding);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#888";
        ctx.strokeRect(x, y, padding, padding);
        // ctx.clearRect(x, y, x + padding, y + padding);
      }
    }
  }, {
    key: "drawEnd",
    value: function drawEnd(ctx) {
      var _this = this;

      this.addAll(ctx);
      setTimeout(function () {
        _this.clearAll(ctx);
      }, 1300);
    }
  }, {
    key: "addAll",
    value: function addAll(ctx) {
      var _this2 = this;

      var i = 19;
      var addRowsInterval = setInterval(function () {
        if (i === 0) {
          clearInterval(addRowsInterval);
        }
        _this2.drawRow(ctx, i--);
      }, 50);
    }
  }, {
    key: "clearAll",
    value: function clearAll(ctx) {
      var _this3 = this;

      var j = 0;
      var clearRowsInterval = setInterval(function () {
        if (j === 20) {
          clearInterval(clearRowsInterval);
        }
        _this3.clearRow(ctx, j++);
      }, 50);
    }
  }, {
    key: "pos",
    value: function pos(coords) {
      var _coords = _slicedToArray(coords, 2),
          x = _coords[0],
          y = _coords[1];

      return this.grid[x][y];
    }
  }, {
    key: "update",
    value: function update(piece) {
      var _this4 = this;

      piece.coords.forEach(function (coords) {
        var _coords2 = _slicedToArray(coords, 2),
            x = _coords2[0],
            y = _coords2[1];

        _this4.grid[x][y] = piece;
      });
    }
  }, {
    key: "remove",
    value: function remove(piece) {
      var _this5 = this;

      piece.coords.forEach(function (coords) {
        var _coords3 = _slicedToArray(coords, 2),
            x = _coords3[0],
            y = _coords3[1];

        _this5.grid[x][y] = null;
      });
    }
  }, {
    key: "clearFullRows",
    value: function clearFullRows() {

      var fullRows = [];
      var padding = 20;

      for (var row = 0; row < 20; row++) {
        var fullRow = true;
        for (var col = 0; col < 10; col++) {
          if (this.grid[row][col] === null) {
            fullRow = false;
          }
        }
        if (fullRow) {
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
  }, {
    key: "removeRows",
    value: function removeRows(rowNumbers) {
      var _this6 = this;

      rowNumbers.forEach(function (row) {
        _this6.removeRow(row);
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

  }, {
    key: "removeRow",
    value: function removeRow(rowNumber) {
      this.grid.splice(rowNumber, 1);
      this.grid.unshift(new Array(10).fill(null));
    }
  }, {
    key: "updateStats",
    value: function updateStats() {
      this.updateScore();
      this.updateLevel();
    }
  }, {
    key: "updateScore",
    value: function updateScore() {
      var scoreElement = document.getElementById("score");
      var score = this.clearedRows * 50;
      var scoreText = document.createTextNode(score);
      scoreElement.innerText = " ";
      scoreElement.appendChild(scoreText);
    }
  }, {
    key: "resetScore",
    value: function resetScore() {
      var scoreElement = document.getElementById("score");
      scoreElement.innerText = "0";
      var levelElement = document.getElementById("level");
      levelElement.innerText = "1";
    }
  }, {
    key: "updateLevel",
    value: function updateLevel() {
      this.level = 1 + Math.floor(this.clearedRows / 10);
      var levelElement = document.getElementById("level");
      var levelText = document.createTextNode(this.level);
      levelElement.innerText = " ";
      levelElement.appendChild(levelText);
    }
  }, {
    key: "onTop",
    value: function onTop(piece) {
      for (var i = 0; i < piece.coords.length; i++) {
        var coord = piece.coords[i];

        var _coord = _slicedToArray(coord, 2),
            x = _coord[0],
            y = _coord[1];

        if (x === 0) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: "collision",
    value: function collision(piece) {
      for (var i = 0; i < piece.coords.length; i++) {
        var coord = piece.coords[i];

        var _coord2 = _slicedToArray(coord, 2),
            x = _coord2[0],
            y = _coord2[1];

        if (x === 19 || !piece.coordsIncluded([x + 1, y]) && this.filled([x + 1, y])) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: "filled",
    value: function filled(coords) {
      return this.pos(coords) !== null;
    }
  }, {
    key: "rotationAllowed",
    value: function rotationAllowed(piece) {
      var potentialCoords = piece.nextRotationCoords();
      //  debugger
      for (var i = 0; i < potentialCoords.length; i++) {
        var _potentialCoords$i = _slicedToArray(potentialCoords[i], 2),
            x = _potentialCoords$i[0],
            y = _potentialCoords$i[1];

        if (!this.inBoundaries(x, y) || this.occupied(x, y) && !piece.coordsIncluded([x, y])) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: "movementAllowed",
    value: function movementAllowed(piece, xMove, yMove) {
      for (var i = 0; i < piece.coords.length; i++) {
        var coord = piece.coords[i];

        var _coord3 = _slicedToArray(coord, 2),
            pieceX = _coord3[0],
            pieceY = _coord3[1];

        var x = pieceX + xMove;
        var y = pieceY + yMove;

        if (!this.inBoundaries(x, y) || this.occupied(x, y) && !piece.coordsIncluded([x, y])) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: "inBoundaries",
    value: function inBoundaries(x, y) {
      return y >= 0 && y < 20 && x < 20;
    }
  }, {
    key: "occupied",
    value: function occupied(x, y) {
      return this.grid[x][y] !== null;
    }
  }]);

  return Board;
}();

exports.default = Board;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _game = __webpack_require__(0);

var _game2 = _interopRequireDefault(_game);

var _board = __webpack_require__(1);

var _board2 = _interopRequireDefault(_board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameView = function () {
  function GameView(game, ctx) {
    var _this = this;

    _classCallCheck(this, GameView);

    this.game = game;
    this.ctx = ctx;
    document.body.onkeydown = function (e) {
      return _this.bindKeyHandlers(e);
    };
    document.body.onkeyup = function (e) {
      return _this.bindKeyHandlersUp(e);
    };
    this.idInterval = null;
    this.initialSpeed = 700;
    this.speed = 700;
    this.gameStarted = false;
  }

  _createClass(GameView, [{
    key: 'bindKeyHandlersUp',
    value: function bindKeyHandlersUp(e) {
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
  }, {
    key: 'bindKeyHandlers',
    value: function bindKeyHandlers(e) {
      // debugger
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
          // this.playSlamSound();
          this.game.slam();
          this.game.move();
          document.getElementById("space").style.color = "#666";
          break;
        case "p":
          if (this.gameStarted) {
            this.pause();
          }
          break;
        case "h":
          // this.game.getHold = true;
          this.game.handleHold();
          break;
      }
    }
  }, {
    key: 'pause',
    value: function pause() {
      alert("resume!");
    }
  }, {
    key: 'start',
    value: function start() {
      var _this2 = this;

      this.gameStarted = true;
      var startSpeed = this.speed;

      this.idInterval = setInterval(function () {
        // if(!this.game.getHold) {
        _this2.game.move();
        // }else{
        //   this.game.getHold = false;
        //     // clearInterval(this.idInterval);
        //     // this.start();
        //   this.game.draw();
        // }

        var speed = _this2.initialSpeed + 100 - _this2.game.board.level * 100;
        if (speed < 100) {
          speed = 100;
        }
        if (startSpeed != speed) {
          clearInterval(_this2.idInterval);
          _this2.speed = speed;
          startSpeed = speed;
          _this2.start();
        }
      }, startSpeed);
      requestAnimationFrame(this.animate.bind(this));
    }
  }, {
    key: 'animate',
    value: function animate() {
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
  }, {
    key: 'playSlamSound',
    value: function playSlamSound() {
      var audio = new Audio('./assets/music.mp3');
      audio.play();
    }
  }]);

  return GameView;
}();

exports.default = GameView;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var oPiece = {
  color: "yellow",
  coords: [[0, 4], [0, 5], [1, 4], [1, 5]],
  defaultCoords: [[0, 4], [0, 5], [1, 4], [1, 5]],
  center: [1, 5],
  defaultCenter: [1, 5],
  type: "staticPiece",
  draw: function draw(ctx) {
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
};

var sPiece = {
  // // coords: [[0, 3],[0, 4],[1, 4],[1, 5]],
  color: "magenta",
  coords: [[0, 4], [0, 5], [1, 3], [1, 4]],
  defaultCoords: [[0, 4], [0, 5], [1, 3], [1, 4]],
  type: "togglePiece",
  center: [1, 4],
  defaultCenter: [1, 4],
  draw: function draw(ctx) {
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
  // ,
  // getRotationData: (state, coords, center) => {
  //   // let center;
  //   let nextCoords = [];
  //   let newRotationState;
  //   switch (state) {
  //     case 1:
  //       center = coords[0];
  //       nextCoords.push([center[0], center[1]]);
  //       nextCoords.push([center[0], center[1] + 1]);
  //       nextCoords.push([center[0] + 1, center[1] + 1]);
  //       nextCoords.push([center[0] - 1, center[1]]);
  //       newRotationState = 2;
  //       break;
  //     case 2:
  //       center = coords[0];
  //       nextCoords.push([center[0], center[1]]);
  //       nextCoords.push([center[0] - 1, center[1]]);
  //       nextCoords.push([center[0] - 1, center[1] + 1]);
  //       nextCoords.push([center[0], center[1] - 1]);
  //       newRotationState = 1;
  //       break;
  //   }
  //   return [nextCoords, newRotationState];
  // }
};

var zPiece = {
  color: "green",
  // coords: [[0, 4],[0, 5],[1, 3],[1, 4]],
  coords: [[0, 3], [0, 4], [1, 4], [1, 5]],
  defaultCoords: [[0, 3], [0, 4], [1, 4], [1, 5]],
  type: "togglePiece",
  center: [1, 4],
  defaultCenter: [1, 4],
  draw: function draw(ctx) {
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

};

var tPiece = {
  color: "black",
  coords: [[0, 4], [1, 3], [1, 4], [1, 5]],
  defaultCoords: [[0, 4], [1, 3], [1, 4], [1, 5]],
  center: [1, 4],
  defaultCenter: [1, 4],
  type: "rotatePiece",
  draw: function draw(ctx) {
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
};

var iPiece = {
  color: "red",
  coords: [[0, 4], [1, 4], [2, 4], [3, 4]],
  defaultCoords: [[0, 4], [1, 4], [2, 4], [3, 4]],
  center: [2, 4],
  defaultCenter: [2, 4],
  type: "togglePiece",
  draw: function draw(ctx) {
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
};

var lPiece = {
  color: "orange",
  coords: [[0, 4], [1, 4], [2, 4], [2, 5]],
  defaultCoords: [[0, 4], [1, 4], [2, 4], [2, 5]],
  center: [1, 4],
  defaultCenter: [1, 4],
  type: "rotatePiece",
  draw: function draw(ctx) {
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
};

var jPiece = {
  color: "blue",
  coords: [[0, 5], [1, 5], [2, 5], [2, 4]],
  defaultCoords: [[0, 5], [1, 5], [2, 5], [2, 4]],
  center: [1, 5],
  defaultCenter: [1, 5],
  type: "rotatePiece",
  draw: function draw(ctx) {
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
};

var Piece = function () {
  function Piece(options) {
    _classCallCheck(this, Piece);

    this.coords = options.coords;
    this.defaultCoords = options.defaultCoords;
    this.color = options.color;
    this.draw = options.draw;
    this.center = options.center;
    this.defaultCenter = options.defaultCenter;

    this.getRotationData = options.getRotationData;
    this.rotationState = 1;
  }

  _createClass(Piece, [{
    key: "previewHoldTetromino",
    value: function previewHoldTetromino() {
      var canvas = document.getElementById("hold-tetromino");
      canvas.height = 100;
      canvas.width = 100;
      var ctxHold = canvas.getContext("2d");
      ctxHold.clearRect(0, 0, 100, 100);
      this.draw(ctxHold);
    }
  }, {
    key: "previewTetromino",
    value: function previewTetromino(ctx) {
      ctx.clearRect(0, 0, 100, 100);
      this.draw(ctx);
    }
  }, {
    key: "moveLeft",
    value: function moveLeft() {
      this.coords = this.coords.map(function (coord) {
        var _coord = _slicedToArray(coord, 2),
            x = _coord[0],
            y = _coord[1];

        return [x, y - 1];
      });
      this.center = [this.center[0], this.center[1] - 1];
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      this.coords = this.coords.map(function (coord) {
        var _coord2 = _slicedToArray(coord, 2),
            x = _coord2[0],
            y = _coord2[1];

        return [x, y + 1];
      });
      this.center = [this.center[0], this.center[1] + 1];
    }
  }, {
    key: "drop",
    value: function drop() {
      this.coords = this.coords.map(function (coord) {
        var _coord3 = _slicedToArray(coord, 2),
            x = _coord3[0],
            y = _coord3[1];

        return [x + 1, y];
      });
      this.center = [this.center[0] + 1, this.center[1]];
    }
  }, {
    key: "nextRotationCoords",
    value: function nextRotationCoords() {
      var _this = this;

      var nextCoords = [];
      nextCoords = this.coords.map(function (coord) {
        return _this.rotateCoord(coord);
      });
      return nextCoords;
    }
  }, {
    key: "rotate",
    value: function rotate() {
      var _this2 = this;

      this.coords = this.coords.map(function (coord) {
        return _this2.rotateCoord(coord);
      });
    }
  }, {
    key: "rotateCoord",
    value: function rotateCoord(coord) {
      var _center = _slicedToArray(this.center, 2),
          centerX = _center[0],
          centerY = _center[1];

      var posFromCenter = [coord[0] - centerX, coord[1] - centerY];
      var row = posFromCenter[0],
          col = posFromCenter[1];

      return [col + centerX, row * -1 + centerY];
    }
  }, {
    key: "coordsIncluded",
    value: function coordsIncluded(coord) {
      for (var i = 0; i < this.coords.length; i++) {
        var _coords$i = _slicedToArray(this.coords[i], 2),
            oldx = _coords$i[0],
            oldy = _coords$i[1];

        if (oldx === coord[0] && oldy === coord[1]) {
          return true;
        }
      }
      return false;
    }
  }]);

  return Piece;
}();

exports.default = Piece;

// I, S, Z

var TogglePiece = function (_Piece) {
  _inherits(TogglePiece, _Piece);

  function TogglePiece(options) {
    _classCallCheck(this, TogglePiece);

    return _possibleConstructorReturn(this, (TogglePiece.__proto__ || Object.getPrototypeOf(TogglePiece)).call(this, options));
  }
  // rotate(){
  //   console.log("rotate toggle piece...");
  //   let state = this.rotationState;
  //   let coords = this.coords;
  //   let center = this.center;
  //   let data = this.getRotationData(state, coords, center);
  //   let[newCoords, newRotationState] = data;
  //   this.coords = newCoords;
  //   this.rotationState = newRotationState;
  //
  // }


  return TogglePiece;
}(Piece);

// T, L, J


var RotatePiece = function (_Piece2) {
  _inherits(RotatePiece, _Piece2);

  function RotatePiece(options) {
    _classCallCheck(this, RotatePiece);

    return _possibleConstructorReturn(this, (RotatePiece.__proto__ || Object.getPrototypeOf(RotatePiece)).call(this, options));
  }

  return RotatePiece;
}(Piece);

// O


var StaticPiece = function (_Piece3) {
  _inherits(StaticPiece, _Piece3);

  function StaticPiece(options) {
    _classCallCheck(this, StaticPiece);

    return _possibleConstructorReturn(this, (StaticPiece.__proto__ || Object.getPrototypeOf(StaticPiece)).call(this, options));
  }

  _createClass(StaticPiece, [{
    key: "rotate",
    value: function rotate() {
      return;
    }
  }]);

  return StaticPiece;
}(Piece);

Piece.PIECES = [oPiece, sPiece, zPiece, tPiece, iPiece, lPiece, jPiece];

Piece.randomPiece = function () {
  var random = Math.floor(Math.random() * 7);
  var options = Piece.PIECES[random];

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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(0);

var _game2 = _interopRequireDefault(_game);

var _game_view = __webpack_require__(2);

var _game_view2 = _interopRequireDefault(_game_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("tetris");
  canvas.width = 200;
  canvas.height = 400;
  var context = canvas.getContext("2d");
  // context.scale(2, 2) ;

  var canvasNext = document.getElementById('next-tetromino');
  canvasNext.width = 100;
  canvasNext.height = 100;
  var contextNext = canvasNext.getContext("2d");

  // const canvasHold = document.getElementById('next-tetromino');
  // canvasHold.width = 100;
  // canvasHold.height = 100;
  // const contextHold = canvasHold.getContext("2d");

  // const game = new Game(context, {rows: 20, cols: 10, render: { placeholder: "tetris"}} );
  new _game2.default(context).board.drawEnd(context);

  document.getElementById("start").addEventListener("click", function (e) {
    document.getElementById("start").disabled = true;
    var game = new _game2.default(context, contextNext);
    new _game_view2.default(game, context).start();
  });

  document.getElementById("sound").addEventListener("click", function (e) {
    var audio = document.getElementById('tetris-audio');
    if (audio.paused) {
      audio.play();
      document.getElementById('full-sound').style.color = "#333";
      document.getElementById('no-sound').style.color = "#999";
    } else {
      audio.pause();
      document.getElementById('full-sound').style.color = "#999";
      document.getElementById('no-sound').style.color = "#333";
      // audio.currentTime = 0
    }
  });
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map