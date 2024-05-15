//MENU RESPONSIVE
let btnOpenMenu = document.querySelector("#open-menu");
let btnCloseMenu = document.querySelector("#close-menu");
let menuMobile = document.querySelector("#mobile-menu");
let links = document.querySelectorAll(".nav_link");
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

enableScroll()

btnOpenMenu.addEventListener("click", () => {
    menuMobile.classList.remove("disabled")
    btnCloseMenu.classList.remove("disabled")
    btnOpenMenu.classList.add("disabled")
    disableScroll();
})

btnCloseMenu.addEventListener("click", () => {
    menuMobile.classList.add("disabled")
    btnCloseMenu.classList.add("disabled")
    btnOpenMenu.classList.remove("disabled")
    enableScroll()
})

links.forEach(link => link.addEventListener("click", () => {  
    menuMobile.classList.add("disabled")
    btnCloseMenu.classList.add("disabled")
    btnOpenMenu.classList.remove("disabled")
    enableScroll()
}))

// Para habilitar el scroll nuevamente
function enableScroll() {
    if (isMobile) {
      document.removeEventListener('touchmove', touchMoveHandler);
    }
  }
  
  // Para deshabilitar el scroll si es mobile
  function disableScroll() {
    if (isMobile) {
      document.addEventListener('touchmove', touchMoveHandler, { passive: false });
    }
  }
  
  // Controlador de eventos para prevenir el scroll en dispositivos mÃ³viles
  function touchMoveHandler(event) {
    event.preventDefault();
  }
//FIN MENU RESPONSIVE

//PAQUETES botones ver más
//en etapa backend el botón RESERVAR se vinculará con app
function goPaq() {
    window.location.assign("#paq")
  }
//FIN PAQUETES

//SLIDER

let items = document.querySelectorAll('.hero__items .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.hero__thumbnail .item');

// parámetros
let countItem = items.length;
let itemActive = 0;

// event next click
next.onclick = function(){
    itemActive = itemActive + 1;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showSlider();
}
//event prev click
prev.onclick = function(){
    itemActive = itemActive - 1;
    if(itemActive < 0){
        itemActive = countItem - 1;
    }
    showSlider();
}
// auto run slider
let refreshInterval = setInterval(() => {
    next.click();
}, 5000)
function showSlider(){
    // remove item active old
    let itemActiveOld = document.querySelector('.hero__items .item.active');
    let thumbnailActiveOld = document.querySelector('.hero__thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');

    // clear auto time run slider
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 8000)
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})

//FIN SLIDER