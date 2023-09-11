chrome.alarms.create("postureTimer", {
  periodInMinutes: 1 / 60,
});

chrome.storage.local.get(["timer", "isRunning", "startTimer"], function (res) {
  var dataToSet = {}; //pour stocker les éléments, on verifie si chaques clés existe dans storage

  //dans res, il y a les clés récupérés dans stockage.local
  //est-ce que timer existe dans res
  if ("timer" in res) {
    dataToSet.timer = res.timer; //si la clé timer existe, on lui assigne la valeur res.timer
  } else {
    dataToSet.timer = 0; //sinon on lui attribut la valeur par défaut
  }

  if ("timeStarter" in res) {
    dataToSet.timeStarter = res.timeStarter;
  } else {
    dataToSet.timeStarter = 1;
  }

  if ("isRunning" in res) {
    dataToSet.isRunning = res.isRunning;
  } else {
    dataToSet.isRunning = false;
  }

  chrome.storage.local.set(dataToSet);
});

//res.timer= récupéré dans le stockage local
//res.timeStarter : durée définie par l'utilisateur
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "postureTimer") {
    chrome.storage.local.get(["timer", "isRunning", "timeStarter"], (res) => {
      if (res.isRunning) {
        let timer = res.timer + 1;
        let isRunning = true;
        if (timer === 60 * res.timeStarter) {
          chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
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
