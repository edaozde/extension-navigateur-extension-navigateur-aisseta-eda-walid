//fonction pour mettre à jour le minuteur

function updateTime() {
  //on récupère les 3 valeurs dans le storage local de chrome
  chrome.storage.local.get(["timer", "timeStarter", "isRunning"], (res) => {
    const time = document.getElementById("time"); //pour afficher en html

    //la variable minute et calcul des minutes restantes
    //si timeStarter = 25 et timer = 1 pour que le timer passe à 24
    const minutes = String(
      res.timeStarter - Math.ceil(res.timer / 60)
    ).padStart(2, "0");

    //res.timeStarter: C'est la valeur de l'option de temps provenant d'un objet stocké dans le stockage local de Chrome.res.timer: C'est la valeur du minuteur, également obtenue à partir de l'objet stocké dans le stockage local de Chrome.
    let seconds = "00";
    if (res.timer % 60 != 0) {
      seconds = `${60 - (res.timer % 60)}`.padStart(2, "0");
    }
    time.textContent = `${minutes}:${seconds}`;
    startTimerBtn.textContent = res.isRunning ? "Pause Timer" : "Start Timer";
  });
}

updateTime();
setInterval(updateTime, 1000);

const startTimerBtn = document.getElementById("start-timer-btn"); //on stock dans la variable
startTimerBtn.addEventListener("click", () => {
  //on detecte le click de l'utilisateur
  chrome.storage.local.get(["isRunning"], (res) => {
    chrome.storage.local.set(
      {
        isRunning: !res.isRunning,
      },
      () => {
        /*startTimerBtn.textContent = !res.isRunning
          ? "Pause Timer"
          : "Start Timer";*/
        if (res.isRunning) {
          startTimerBtn.textContent = "Start Timer";
        } else {
          startTimerBtn.textContent = "Pause Timer";
        }
      }
    );
  });
});

const resetTimerBtn = document.getElementById("reset-timer-btn");
resetTimerBtn.addEventListener("click", () => {
  chrome.storage.local.set(
    {
      timer: 0,
      isRunning: false,
    },
    () => {
      startTimerBtn.textContent = "Start Timer";
    }
  );
});

const input = document.querySelector(".choose input");
const button = document.querySelector(".choose button");

button.addEventListener("click", () => {
  chrome.storage.local.set(
    {
      timeStarter : input.value
    }
  )
});

const fifteen = document.getElementById("fifteen-min");
fifteen.addEventListener("click", () => {
  chrome.storage.local.set(
    {
      timeStarter : 15,
    }
  )
});

const thirty = document.getElementById("thirty-min");
thirty.addEventListener("click", () => {
  chrome.storage.local.set(
    {
      timeStarter : 30,
    }
  )
});

const fortyFive = document.getElementById("fortyfive-min");
fortyFive.addEventListener("click", () => {
  chrome.storage.local.set(
    {
      timeStarter : 45,
    }
  )
});

const sixty = document.getElementById("sixty-min");
sixty.addEventListener("click", () => {
  chrome.storage.local.set(
    {
      timeStarter : 60,
    }
  )
});