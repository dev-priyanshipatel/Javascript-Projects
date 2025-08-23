let startBtn = document.getElementById("start-btn");
let resetBtn = document.getElementById("reset-btn");
let pauseBtn = document.getElementById("pause-btn");
let showTimer = document.getElementById("showtimer");
let displayQoutes = document.getElementById("showqoutes");
let sound = document.getElementById("sound");
let flag = false;
let timerInterval = null;
let totalSeconds = 0;

const qoutes = [
  "Coding is like learning a new language every day.",
  "Every great app starts with one simple line of code.",
  "Debugging is just problem solving in disguise.",
  "Small steps in coding lead to big results.",
  "Coding is not just about logic, it’s also about creativity.",
  "Behind every screen is a story written in code.",
  "Errors are proof that you’re trying and learning.",
  "Coding teaches patience, practice, and persistence.",
  "A good programmer is always a good learner.",
  "With every bug fixed, you become a better coder.",
];

function showQoutes() {
  let randomIdx = parseInt(Math.random() * 10);
  displayQoutes.innerHTML = `<div class="wrapper mb-3">
                                        <div  class="text-center p-2 h5 blue-text fw-semibold">
                                            ${qoutes[randomIdx]}
                                        </div>
                                      </div>`;
}

function removeQoutes() {
  displayQoutes.innerHTML = "";
}

function resetTime() {
  clearInterval(timerInterval);
  document.getElementById("hour").value = "";
  document.getElementById("minute").value = "";
  document.getElementById("second").value = "";
  showTimer.innerText = "00 : 00 : 00";
  flag = false;
}

function pauseTime() {
  clearInterval(timerInterval);
  sound.pause();
  flag = false;
}
function formatTime(totalSeconds) {
  let hour = parseInt(totalSeconds / 3600);
  totalSeconds = totalSeconds % 3600;

  let minute = parseInt(totalSeconds / 60);
  totalSeconds = totalSeconds % 60;

  let second = parseInt(totalSeconds);

  return `${hour.toString().padStart(2, "0")} : ${minute
    .toString()
    .padStart(2, "0")} : ${second.toString().padStart(2, "0")}`;
}

function startTimer() {
  if (!flag) {
    flag = true;

    let hour = parseInt(document.getElementById("hour").value) || 0;
    let minute = parseInt(document.getElementById("minute").value) || 0;
    let second = parseInt(document.getElementById("second").value) || 0;

    totalSeconds = hour * 3600 + minute * 60 + parseInt(second);

    if (hour < 0) hour = 0;
    if (minute < 0 || minute > 59) minute = 0;
    if (second < 0 || second > 59) second = 0;

    if (hour === 0 && minute === 0 && second === 0) {
      Swal.fire({
        icon: "warning",
        text: "Please enter a valid time",
        timer: 2200,
        timerProgressBar: true,
      });
      flag = false;
      return;
    }

    removeQoutes();

    showTimer.innerText = formatTime(totalSeconds);

    timerInterval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        showTimer.innerHTML = formatTime(totalSeconds);
      } else {
        clearInterval(timerInterval);
        resetTime();
        showQoutes();
        launchConfetti();
        sound.play();
        sound.loop = true;
        flag = false;
      }
    }, 1000);
  }
}

startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTime);
pauseBtn.addEventListener("click", pauseTime);

// confetti script

function launchConfetti() {
  var duration = 15 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  var interval = setInterval(function () {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration);

    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);
}
