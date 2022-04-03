
const navMenu = document.querySelector('.main-menu');
const btnBurger = document.querySelector('.menu-btn');

const showcaseBackground = document.querySelector('.showcase');
const btnImg = document.querySelector('.btn02');

// menuBurger
function ShowMenuBurger(){
    navMenu.classList.toggle('show');
}

//showcase background change
function backgroundChange(){
    showcaseBackground.classList.toggle('show02');
}

btnImg.addEventListener('click', (backgroundChange));
btnBurger.addEventListener('click', (ShowMenuBurger));
