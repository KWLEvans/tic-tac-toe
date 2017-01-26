///////////////////////////////
//Back-End
//////////////////////////////
var playerX;
var playerO;
var gameBoard;
var activePlayer;

function Player(mark) {
  this.mark = mark;
}

function Square(xIndex, yIndex) {
  this.xIndex = xIndex;
  this.yIndex = yIndex;
}

Square.prototype.mark = function(player) {
  $("#board").children().eq(this.yIndex - 1).children().eq(this.xIndex - 1).text(player.mark);
  changeActivePlayer();
  // Game.over();
}

Square.prototype.markedBy = function() {
  var mark = $("#board").children().eq(this.yIndex - 1).children().eq(this.xIndex - 1).text();
  return mark;
}

function Board() {
  this.squares = [];
}

Board.prototype.build = function() {
  for (i = 1; i <=3; i++) {
    for (j = 1; j <= 3; j++) {
      this.squares.push(new Square(i, j));
    }
  }
}

Board.prototype.find = function(xIndex, yIndex) {
  var foundSquare;
  this.squares.forEach(function(square) {
    if (square.xIndex === xIndex && square.yIndex === yIndex) {
      foundSquare = square;
    }
  });
  return foundSquare;
}

var Game = {
  start: function() {
    playerX = new Player("X");
    activePlayer = playerX;
    playerO = new Player("O");
    gameBoard = new Board();
    gameBoard.build();
  },
  // over: function() {
  //   var xX = ["X"];
  //   var xY = ["X"];
  //   var oX = ["O"];
  //   var oY = ["O"];
  //   var allArrays = [];
  //   var winner;
  //
  //   for (i = 1; i < gameBoard.squares.length; i++) {
  //     if (gameBoard.squares[i].markedBy() === "X") {
  //       xX.push(gameBoard.squares[i].xIndex);
  //     } else if (gameBoard.squares[i].markedBy() === "O") {
  //       oX.push(gameBoard.squares[i].xIndex);
  //     }
  //     if (gameBoard.squares[i].markedBy() === "X") {
  //       xY.push(gameBoard.squares[i].yIndex);
  //     } else if (gameBoard.squares[i].markedBy() === "O") {
  //       oY.push(gameBoard.squares[i].yIndex);
  //     }
  //   }
  //
  //   allArrays.push(xX, xY, oX, oY);
  //
  //   for (i = 0; i < allArrays.length; i++) {
  //     if (allArrays[i].length === 4) {
  //       console.log(allArrays);
  //       console.log(allArrays[i]);
  //       winner = allArrays[i][0];
  //       alert("The winner is " + winner + "!");
  //     }
  //   }
  // }
}

function changeActivePlayer() {
  if (activePlayer.mark === "X") {
    activePlayer = playerO;
  } else {
    activePlayer = playerX;
  }
}



///////////////////////////////
//Front-End
//////////////////////////////

$(function() {
  Game.start();

  $(".row div").click(function() {
    $(this).unbind("click");
    var xIndex = 3 - $(this).nextAll().length;
    var yIndex = 3 - $(this).parent().nextAll().length;
    gameBoard.find(xIndex, yIndex).mark(activePlayer);
  });
});
