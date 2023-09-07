document.querySelectorAll(".carousel").forEach(carousel => {
    const items = carousel.querySelectorAll(".carousel__item");
    const buttonsHtml = Array.from(items, () => {
        return `<span class="carousel_button"></span>`
    });

    carousel.insertAdjacentHTML( "beforeend",`
    <div class="carousel_nav">
        ${ buttonsHtml.join(" ")}
     </div>
   `)

   const buttons = carousel.querySelectorAll(".carousel_button");

    buttons.forEach((button, i) => {
        button.addEventListener("click", () => {
            items.forEach(item => item.classList.remove("carousel__item--selected"));
            buttons.forEach(button => button.classList.remove("carousel_button--selected"));

            items[i].classList.add("carousel__item--selected");
            button[i].classList.add("carousel_button--selected");

        });
    });
    items[0].classList.add("carousel__item--selected");
    buttons[0].classList.add("carousel_button--selected");  
});
