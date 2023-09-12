/*carousel*/
document.querySelectorAll(".carousel").forEach((carousel) => {
  const items = carousel.querySelectorAll(".carousel__item");
  const buttonsHtml = Array.from(items, () => {
    return `<span class="carousel_button"></span>`;
  });

  carousel.insertAdjacentHTML(
    "beforeend",
    `
    <div class="carousel_nav">
        ${buttonsHtml.join(" ")}
     </div>
   `
  );

  const buttons = carousel.querySelectorAll(".carousel_button");

  buttons.forEach((button, i) => {
    button.addEventListener("click", () => {
      items.forEach((item) =>
        item.classList.remove("carousel__item--selected")
      );
      buttons.forEach((button) =>
        button.classList.remove("carousel_button--selected")
      );

      timeLeft = 10;
      document.getElementById("seconds").innerHTML = String(timeLeft);

      items[i].classList.add("carousel__item--selected");
      button[i].classList.add("carousel_button--selected");
    });
  });
  items[0].classList.add("carousel__item--selected");
  buttons[0].classList.add("carousel_button--selected");
});

//compte à rebours 10 secondes
timeLeft = 10;

function countdown() {
  timeLeft--;
  document.getElementById("seconds").innerHTML = String(timeLeft);
  if (timeLeft > 0) {
    setTimeout(countdown, 1000);
  }
}

setTimeout(countdown, 1000);

//compte à rebours 30 seconds par exercice
/*var timeLeft = 30;
var elem = document.getElementById("countdown");

var timerId = setInterval(countdown, 1000);

function countdown() {
  if (timeLeft == 0) {
    clearTimeout(timerId);
    doSomething();
  } else {
    elem.innerHTML = timeLeft;
    timeLeft--;
  }
}
*/
