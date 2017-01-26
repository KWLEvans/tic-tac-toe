///////////////////////////////
//Back-End
//////////////////////////////
var playerX;
var playerO;
var gameBoard;
var activePlayer;
var centerSquarePlayer;

//Player object which contains "X" or "O" as their mark
function Player(mark) {
  this.mark = mark;
}

//Square object with an X and Y index
function Square(xIndex, yIndex) {
  this.xIndex = xIndex;
  this.yIndex = yIndex;
}

//Marks corresponding square on front end with the player's mark and sets the centerSquarePlayer variable if a player marks the center square
Square.prototype.mark = function(player) {
  $("#board").children().eq(this.yIndex - 1).children().eq(this.xIndex - 1).text(player.mark);
  if (this.xIndex === 2 && this.yIndex === 2) {
    centerSquarePlayer = this.markedBy();
  }
  changeActivePlayer();
  Game.over();
}

//Gives the mark on a given square
Square.prototype.markedBy = function() {
  var mark = $("#board").children().eq(this.yIndex - 1).children().eq(this.xIndex - 1).text();
  return mark;
}

//Sets the Board object and gives it an empty array of squares
function Board() {
  this.squares = [];
}

//Prototype used to build each board using squares
Board.prototype.build = function() {
  for (i = 1; i <=3; i++) {
    for (j = 1; j <= 3; j++) {
      this.squares.push(new Square(i, j));
    }
  }
}

//Prototype used to find a square based on its X and Y indexes
Board.prototype.find = function(xIndex, yIndex) {
  var foundSquare;
  this.squares.forEach(function(square) {
    if (square.xIndex === xIndex && square.yIndex === yIndex) {
      foundSquare = square;
    }
  });
  return foundSquare;
}

//
var Game = {
  start: function() {
    playerX = new Player("X");
    activePlayer = playerX;
    playerO = new Player("O");
    gameBoard = new Board();
    gameBoard.build();
  },
  over: function() {
    var markedSquares = [];
    var winner;

    for (i = 0; i < gameBoard.squares.length; i++) {
      if (gameBoard.squares[i].markedBy()) {
        markedSquares.push(gameBoard.squares[i]);
      }
    }

    if (centerSquarePlayer) {
      if ((gameBoard.find(1,1).markedBy() === centerSquarePlayer && gameBoard.find(3,3).markedBy() === centerSquarePlayer) || (gameBoard.find(1,3).markedBy() === centerSquarePlayer && gameBoard.find(3,1).markedBy() === centerSquarePlayer)) {
        winner = centerSquarePlayer;
      }
    }

    if (markedSquares.length >= 5) {
      for (i = 1; i <= 3; i++) {
        var markedXs = markedSquares.filter(function(square) {
          return square.xIndex === i;
        });
        var markedYs = markedSquares.filter(function(square) {
          return square.yIndex === i;
        });
        if (markedXs.length === 3 && markedXs[0].markedBy() === markedXs[1].markedBy() && markedXs[1].markedBy() === markedXs[2].markedBy()) {
          winner = markedXs[0].markedBy();
          break;
        } else if (markedYs.length === 3 && markedYs[0].markedBy() === markedYs[1].markedBy() && markedYs[1].markedBy() === markedYs[2].markedBy()) {
          winner = markedYs[0].markedBy();
          break;
        }
      }
    }
    console.log(winner + " wins!");
  }
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
