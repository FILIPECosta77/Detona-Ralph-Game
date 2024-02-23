const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemyy: document.querySelector(".enemy"),
    timeLeft: document.querySelector(".menu-time_timer"),
    score: document.querySelector(".menu-score_score"),
    hearths: document.querySelector(".menu-lives_hearths"),
    HigherScore: document.querySelector(".subMenu-higherScore_higherScore"),
  },
  values: {
    hearths: 3,
    timerId: null,
    currentTime: 60,
    countDownTimerId: setInterval(countDown, 1000),
    gameSpeed: 1000,
    hitPosition: 0,
    score: 0,
    HigherScore: localStorage.getItem("HigherScore") | 0,
  },
};

function putEnemyOnWindow() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomSquare = parseInt(Math.random() * 9);
  let selectedSquare = state.view.squares[randomSquare];
  selectedSquare.classList.add("enemy");
  state.values.hitPosition = selectedSquare.id;
}

function moveEnemy() {
  state.values.timerId = setInterval(putEnemyOnWindow, state.values.gameSpeed);
}

function addLiestenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.score++;
        state.view.score.textContent = state.values.score;
        state.values.hitPosition = null;
        playsound();
      } else {
        playerHeathsReducer();
      }
    });
  });
}

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    clearInterval(state.values.countDownTimerId);
    clearInterval(state.values.timerId);
    alert("Gmae Over! O seu resultado foi: " + state.values.score);
    setHigherScore();
    window.location.reload();
  }
}

function playsound() {
  let audio = new Audio("./src/sounds/hit.m4a");
  audio.volume = 0.03;
  audio.play();
}

function playerHeathsReducer() {
  state.values.hearths--;
  state.view.hearths.textContent = "x" + state.values.hearths;

  if (state.values.hearths <= 0) {
    alert("GAME OVER, Suas Vidas Acabaram");
    setHigherScore();
    window.location.reload();
  }
}

function setHigherScore() {
  if (state.values.score > state.values.HigherScore) {
    state.values.HigherScore = state.values.score;
    localStorage.setItem("HigherScore", state.values.HigherScore);
  }
}

function showHigherScore() {
  state.view.HigherScore.textContent = localStorage.getItem("HigherScore") | 0;
}

function main() {
  showHigherScore();
  moveEnemy();
  addLiestenerHitBox();
}

main();
