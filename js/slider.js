let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');
let item1 = document.getElementById('item1');
let item2 = document.getElementById('item2');
let item3 = document.getElementById('item3');
let item4 = document.getElementById('item4');

let carouselDom = document.querySelector('.hero');
let SliderDom = carouselDom.querySelector('.hero__items');
let thumbnailBorderDom = document.querySelector('.hero__thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.hero__timer');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

item1.onclick = function(){
    showSlider('next');    
}

item2.onclick = function(){
    showSlider('next');    
}

item3.onclick = function(){
    showSlider('next');    
}

item4.onclick = function(){
    showSlider('next');    
}

nextDom.onclick = function(){
    showSlider('next');    
}
prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.hero__items .item');
    let thumbnailItemsDom = document.querySelectorAll('.hero__thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}