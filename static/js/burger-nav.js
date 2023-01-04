const button = document.querySelector(".burger-button");
const burgerOpen = document.querySelector(".burger-menu");

const buttonClose = document.querySelector(".burger-button-close");

button.addEventListener("click", () => {
    button.classList.toggle("open");
    burgerOpen.classList.toggle("open");
})

buttonClose.addEventListener("click", () => {
    burgerOpen.classList.toggle("open");
})

