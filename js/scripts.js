///////////////////////////////
//Back-End
//////////////////////////////
var mark = "X";

function Player(mark) {
  this.mark = mark;
}

function Square(xIndex, yIndex) {
  this.xIndex = xIndex;
  this.yIndex = yIndex;
}

Square.prototype.mark = function(player) {
  $("#board").nth-child(this.yIndex).nth-child(this.xIndex).text(player.mark);
}

Square.prototype.markedBy = function() {
  var mark = $("#board").nth-child(this.yIndex).nth-child(this.xIndex).text();
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

function changeMark() {
  if (mark === "X") {
    mark = "O";
  } else {
    mark = "X";
  }
}
///////////////////////////////
//Front-End
//////////////////////////////


$(function() {
  $(".row div").click(function() {
    $(this).text(mark);
    $(this).unbind("click");
    var xIndex = 3 - $(this).nextAll().length;
    var yIndex = 3 - $(this).parent().nextAll().length;
    console.log("X index: " + xIndex);
    console.log("Y index: " + yIndex);
    changeMark();
  });
});
