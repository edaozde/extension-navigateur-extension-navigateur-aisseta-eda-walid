//fonction pour mettre à jour le minuteur
const body = document.querySelector('.container')
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
  chrome.storage.local.set({
    timeStarter: input.value,
  });
});

const fifteen = document.getElementById("fifteen-min");
fifteen.addEventListener("click", () => {
  chrome.storage.local.set({
    timeStarter: 15,
  });
});

const thirty = document.getElementById("thirty-min");
thirty.addEventListener("click", () => {
  chrome.storage.local.set({
    timeStarter: 30,
  });
});

const fortyFive = document.getElementById("fortyfive-min");
fortyFive.addEventListener("click", () => {
  chrome.storage.local.set({
    timeStarter: 45,
  });
});

const sixty = document.getElementById("sixty-min");
sixty.addEventListener("click", () => {
  chrome.storage.local.set({
    timeStarter: 60,
  });
});



// function play() {
//   var audio = document.getElementById("audio");
//   audio.play();
// }

const video = document.querySelector(".video");
const main = document.getElementById("back-main-screen");
const songInput = document.getElementById("input-song");
const nextSong = document.getElementById("next-song");
const lastSong = document.getElementById("last-song");
const sound = [{
  song1: 'Chill.mp3',
  song2: 'Chill2.mp3',
  song3: 'Chill3.mp3'
}]
let currentAudio = null;

const audioPlay = () => {
  if (currentAudio === null || currentAudio.paused) {
    const randomSong = sound[0][`song${Math.floor(Math.random() * 3) + 1}`];
    currentAudio = new Audio(randomSong);
    currentAudio.play();
  } else {
    currentAudio.pause();
  }
}

songInput.addEventListener("click", audioPlay)

nextSong.addEventListener("click", () => {
  if (currentAudio === null || currentAudio.paused) {
    const randomSong = sound[0][`song${Math.floor(Math.random() * 3) + 1}`];
    currentAudio = new Audio(randomSong);
    currentAudio.play();
  }else{
    currentAudio.pause();
    const randomSong = sound[0][`song${Math.floor(Math.random() * 3) + 1}`];
    currentAudio = new Audio(randomSong);
    currentAudio.play();
  }
  video.classList.add('fadeIn');
  video.classList.add('dissapear');
  body.classList.add('fadeIn');
  body.style.backgroundImage = "url(/images/chill2.jpg)";
  document.body.style.color = 'white'
  startTimerBtn.style.color = 'white'
  resetTimerBtn.style.color = 'white'
})

lastSong.addEventListener("click", () => {
  currentAudio.pause()
  currentAudio.play()
  video.classList.add('fadeIn');
  video.classList.add('dissapear');
  body.classList.add('fadeIn');
  body.style.background = "url(/images/chill.jpg)";
  body.style.backgroundSize = "cover";
  document.body.style.color = 'white'
  startTimerBtn.style.color = 'white'
  resetTimerBtn.style.color = 'white'
});

main.addEventListener("click", () => {
  video.classList.add('fadeIn');
  video.classList.add('nodissapear');
  document.body.style.color = 'black'
  startTimerBtn.style.color = 'black'
  resetTimerBtn.style.color = 'black'
});