var buttonColours = ["b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9"];

var isPlayingSequence = false;

var gamePattern = [];

var userClickedPattern = [];

var level = 0;
var gameStarted = false;

// START GAME
$(document).keydown(function () {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
});
$(document).on("click", ".start-button", function () {
  if (!gameStarted) {
    gameStarted = true;
    nextSequence();
  }
});

// BUTTON PRESS
$(".b").click(function () {
  if (isPlayingSequence) return; // ⛔ STOP kalau sequence lagi jalan

  var userChosenColour = $(this).attr("id");
  playSound("clicksound");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColour) {
  $("." + currentColour).addClass("bpress");
  setTimeout(() => {
    $("." + currentColour).removeClass("bpress");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * buttonColours.length);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  isPlayingSequence = true; // 🔒 lock input

  for (let i = 0; i < gamePattern.length; i++) {
    setTimeout(() => {
      $("#" + gamePattern[i]).addClass("bgreen");
      $("#" + gamePattern[i] + "b").addClass("blockgreen");

      setTimeout(() => {
        $("#" + gamePattern[i]).removeClass("bgreen");
        $("#" + gamePattern[i] + "b").removeClass("blockgreen");
      }, 250);
      playSound(gamePattern[i]);

      // buka lock setelah animasi terakhir
      if (i === gamePattern.length - 1) {
        setTimeout(() => {
          isPlayingSequence = false;
        }, 200);
      }
    }, i * 500);
  }
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      var delayBeforeNext = gamePattern.length * 250;

      setTimeout(function () {
        $("button").addClass("bgreen");
        $(".outerbox").addClass("blockgreen");

        setTimeout(() => {
          $("button").removeClass("bgreen");
          $(".outerbox").removeClass("blockgreen");
        }, 500);

        setTimeout(() => {
          nextSequence();
        }, 1000);
      }, 10);
    }
  } else {
    playSound("wrong");
    level = 0;
    gameStarted = false;
    gamePattern = [];
    userClickedPattern = [];
    $("button").addClass("bred");
    $(".outerbox").addClass("blockred");
    setTimeout(() => {
      $("button").removeClass("bred");
      $(".outerbox").removeClass("blockred");
    }, 500);
    $("h1").html('Press<button class="start-button">START</button>to Start');
  }
}
