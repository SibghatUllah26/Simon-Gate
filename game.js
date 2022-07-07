var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
$(".instructions").click(function(){
  alert("Press any key to start the game.\n\nA color will flash.\n\nRepeat the sequence by pressing the same color.\n\nThe game will continue, after each light sequence you repeat successfully a new light will be added to the end.\n\nWhen you don't repeat a sequence successfully the game will be over.\n\nGood Luck!!!");
});
$(document).keypress(function() {
  if (level === 0) {
    nextSequence();
  }
});

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").html("level "+level);
  var randomNumber = Math.floor((Math.random()*4));
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
};
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
      $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
    }
}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
};
function animatePress(currentColour){
  $("#"+currentColour).addClass(".pressed");
  setTimeout(function () {
  $("#" + currentColor).removeClass(".pressed");
  }, 100);
};
