//scroll

const navLinks = [...document.querySelectorAll("nav a")];
const sections = [...document.querySelectorAll("section")];

let sectionsPosition;

function positionCalculation() {
  sectionsPosition = sections.map((section) => section.offsetTop);
}

positionCalculation();
console.log(sectionsPosition);

navLinks.forEach((link) => link.addEventListener("click", addScrollSmooth));

function addScrollSmooth(e) {
  const linkIndex = navLinks.indexOf(e.target);
  window.scrollTo({
    top: sectionsPosition[linkIndex],
    behavior: "smooth",
  });
}

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
// swipe effect

//code petit mot
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["une pause", "un moment", "une inspiration ", "un break"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // On DOM Load initiate the effect
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});
