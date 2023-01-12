const button = document.querySelector(".button-nav");
const burgerOpen = document.querySelector(".burger-menu");

const buttonClose = document.querySelector(".burger-button-close");

button.addEventListener("click", () => {
    button.classList.toggle("open");
    burgerOpen.classList.toggle("open");
})

buttonClose.addEventListener("click", () => {
    burgerOpen.classList.toggle("open");
})

const buttonDesktop = document.querySelector(".button-nav-desktop");
const burgerOpenDesktop = document.querySelector(".burger-menu");

const buttonCloseDesktop = document.querySelector(".close-burger-desktop");

buttonDesktop.addEventListener("click", () => {
    buttonDesktop.classList.toggle("open");
    burgerOpenDesktop.classList.toggle("open");
})

buttonCloseDesktop.addEventListener("click", () => {
    burgerOpenDesktop.classList.toggle("open");
})