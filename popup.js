const startTimerBtn = document.getElementById("start-timer-btn");
startTimerBtn.addEventListener("click", () => {
  chrome.storage.local.get(["isRunning"], (res) => {
    chrome.storage.local.set(
      {
        isRunning: !res.isRunning,
      },
      () => {
        startTimerBtn.textContent = !res.isRunning
          ? "Pause Timer"
          : "Start Timer";
      }
    );
  });
});

const time = document.getElementById("time");
function updateTime() {
  chrome.storage.local.get(["timer"], (res) => {
    const time = document.getElementById("time");

    // get no. of minutes & secs
    const minutes = `${1 - Math.ceil(res.timer / 60)}`.padStart(2, "0");
    let seconds = "00";
    if (res.timer % 60 != 0) {
      seconds = `${60 - (res.timer % 60)}`.padStart(2, "0");
    }

    // show minutes & secs on UI
    time.textContent = `${minutes}:${seconds}`;
  });
}

updateTime();
setInterval(updateTime, 1000);

const resetTimerBtn = document.getElementById("reset-timer-btn");
resetTimerBtn.addEventListener("click", () => {
  chrome.storage.local.set(
    {
      // reset variables
      timer: 0,
      isRunning: false,
    },
    () => {
      // reset start button text-content
      startTimerBtn.textContent = "Start Timer";
    }
  );
});
