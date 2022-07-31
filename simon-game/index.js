//------Variables and Constants------
const colorBtns = ["red", "green", "blue", "yellow"];
var levelLog = ["start"];
var playerLog = ["start"];
var clickLock = ["start"]; /*the clickLock prevents players from spamming the game by clicking repeatedly on a colored button*/



//------Functions------
function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  $("h1").text("Game Over, Press Any Key or Click a Button to Restart");
  clearLog(levelLog);
  clearLog(playerLog);

}

function playSound(btnSound) {
  var sound = new Audio("sounds/" + btnSound + ".mp3");
  sound.play();
}

function clearLog(log) {
  for (var i=0; i<log.length; i) {
    log.pop();
  }
  log.push("start");
}

function simonSays() {
    var levelColor = colorBtns[Math.floor(Math.random()*4)];
    var levelBtn = $("#" + levelColor);
    levelBtn.addClass("pressed");
    playSound(levelColor);
    setTimeout(function() {
      levelBtn.removeClass("pressed");
    }, 250);
    levelLog.push(levelColor);
    clickLock.unshift("start");
}

function check() {
  for (var i=0; i<playerLog.length; i++) {
    if (playerLog[i] === levelLog[i]) {
    } else {
      gameOver();
    }
  }
  if (playerLog.length > 1 && levelLog.length === playerLog.length) {
    clearLog(playerLog);
    setTimeout(function() {
      $("h1").text("Level " + levelLog.length);
    }, 1000);
    setTimeout(function() {
      simonSays();
    }, 2000);
  } else {
    clickLock.unshift("start");
  }
}

function startGame() {
  $("body").removeClass("game-over");
  $("h1").text("Level " + levelLog.length);
  setTimeout(function() {
    simonSays();
  }, 1000);
}

//------Player Initiated Functions------

/*When player presses a keyboard key the game will initiate or restart*/
$("html").on("keydown", function() {
  if (levelLog.length == 1) {
    startGame();
  }
});

/*When player clicks on a colored button the game will tack their entries and check if they are correct*/
$(".btn").on("click", function() {
    if (levelLog.length > "1" && clickLock[0] == "start") {
      clickLock.unshift("lock");
      var playerColor = this.classList[1];
      var playerBtn = $("#" + playerColor);
      playerBtn.addClass("pressed");
      playSound(playerColor);
      setTimeout(function() {
        playerBtn.removeClass("pressed");
      }, 250);
      playerLog.push(playerColor);
      check ();
    } else if (document.querySelector("h1").textContent == "Game Over, Press Any Key or Click a Button to Restart") {
      startGame();
    }
    if (document.querySelector("h1").textContent == "Press A Key or Click a Button to Start") {
      startGame();
    }
});
