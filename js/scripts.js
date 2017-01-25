///////////////////////////////
//Back-End
//////////////////////////////
var mark = "X";

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
    changeMark();
  });
});
