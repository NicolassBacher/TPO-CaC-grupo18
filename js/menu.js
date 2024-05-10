//MENU RESPONSIVE
let btnOpenMenu = document.querySelector("#open-menu");
let btnCloseMenu = document.querySelector("#close-menu");
let menuMobile = document.querySelector("#mobile-menu");
let links = document.querySelectorAll(".nav_link");

btnOpenMenu.addEventListener("click", () => {
    menuMobile.classList.remove("disabled")
    btnCloseMenu.classList.remove("disabled")
    btnOpenMenu.classList.add("disabled")
})

btnCloseMenu.addEventListener("click", () => {
    menuMobile.classList.add("disabled")
    btnCloseMenu.classList.add("disabled")
    btnOpenMenu.classList.remove("disabled")
})

links.forEach(link => link.addEventListener("click", () => {  
    menuMobile.classList.add("disabled")
}))
//FIN MENU RESPONSIVE