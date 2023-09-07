chrome.alarms.create("postureTimer", {
  periodInMinutes: 1 / 60,
});

chrome.storage.local.get(["timer", "isRunning", "timeOption"], (res) => {
  chrome.storage.local.set({
    timer: "timer" in res ? res.timer : 0,
    timeOption: "timeOption" in res ? res.timeOption : 1,
    isRunning: "isRunning" in res ? res.isRunning : false,
  });
});

//res.timer= récupéré dans le stockage local
//res.timeOption : durée définie par l'utilisateur
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "postureTimer") {
    chrome.storage.local.get(["timer", "isRunning", "timeOption"], (res) => {
      if (res.isRunning) {
        let timer = res.timer + 1;
        let isRunning = true;
        if (timer === 60 * res.timeOption) {
          timer = 0; //le timer est initilisé à 0
          isRunning = false; //le timer n'est plus en cours d'exécution
        }

        //réinitialisation du minuteur
        chrome.storage.local.set({
          timer,
          isRunning,
        });
      }
    });
  }
});
