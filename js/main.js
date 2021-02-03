
document.querySelector('.page').classList.add('loaded');

let burgerInput = document.getElementById('burger');
let lists = document.querySelector('.header').querySelectorAll('ul');
let toScroll = document.querySelectorAll('.toScroll');

for(let i = 0; i < toScroll.length; i++) {
    if (toScroll[i].offsetTop > document.documentElement.scrollTop + 0.8 * document.documentElement.clientHeight) {
        toScroll[i].classList.add('hidden');
    }
}

function scrollCheck() {
    for(let i = 0; i < toScroll.length; i++) {
        if (toScroll[i].offsetTop <= document.documentElement.scrollTop + 0.8 * document.documentElement.clientHeight) {
            toScroll[i].classList.add('visible');
            toScroll[i].classList.remove('hidden');
        }
    }
}

window.addEventListener('scroll', scrollCheck);

//скролл при нажатии на пункт меню

function closeBurger() {
    burgerInput.checked = false;
}

for (let i = 0; i < lists.length; i++) {
    let links = lists[i].querySelectorAll('a');

    let _loop = function _loop(i) {
        links[i].addEventListener('click', function (event) {
            event.preventDefault();

            if (toScroll[i]) {
                toScroll[i].scrollIntoView({
                    behavior: 'smooth'
                });
                closeBurger();
            }
        });
    };

    for (let i = 0; i < links.length; i++) {
        _loop(i);
    }
}

//форма

//phone mask

"use strict";

function mask(event) {
    let matrix = "+7 (___) ___-__-__",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
    if (def.length >= val.length) val = def;
    this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
    });

    if (event.type === "blur") {
        if (this.value.length === 2) this.value = "";
    }
}

let phones = document.querySelectorAll("._phone");
for (let i = 0; i < phones.length; i++) {
    phones[i].addEventListener("input", mask, false);
    phones[i].addEventListener("focus", mask, false);
    phones[i].addEventListener("blur", mask, false);
}

// validation

function formSend(form) {
    let error = formValidate(form);

    if (error === 0) {
        //отправка формы
        return true;
    }

    return false;
}

function formValidate(form) {
    let error = 0;
    let formReq = form.querySelectorAll('._req');

    for (let index = 0; index < formReq.length; index++) {
        let input = formReq[index];
        input.classList.remove('_error');

        if (input.classList.contains('_phone')) {
            if (input.value.length < 18) {
                input.classList.add('_error');
                error++;
            }
        } else {
            if (input.value.length < 3 || input.value.length > 32) {
                input.classList.add('_error');
                error++;
            }
        }
    }

    return error;
}

//всплывающее окно

if ($('.popup-callback-bg').length) {

    let popupCallbackBackground = document.querySelector('.popup-callback-bg');
    let popupCallbackOpenBtns = document.querySelectorAll('.popup-callback-open-btn');
    let popupCallbackCloseBtn = popupCallbackBackground.querySelector('.popup-callback__close');
    let popupCallbackForm = popupCallbackBackground.querySelector('.popup-callback__form');
    let popupThanksBackground = document.querySelector('.popup-thanks-bg');
    let popupThanksCloseBtns = popupThanksBackground.querySelectorAll('.popup-thanks__close');
    popupCallbackForm.addEventListener('submit', function (event) {
        event.preventDefault();
        let isSend = formSend(popupCallbackForm);

        if (isSend) {
            popupThanksBackground.classList.add('popup-thanks-bg-visible');
            popupCallbackBackground.classList.remove('popup-callback-bg-visible');
        }
    });
    for (let i = 0; i < popupCallbackOpenBtns.length; i++) {
        popupCallbackOpenBtns[i].addEventListener('click', function () {
            popupCallbackBackground.classList.add('popup-callback-bg-visible');
        });
    }
    popupCallbackBackground.addEventListener('click', function (event) {
        if (event.target === popupCallbackBackground) {
            popupCallbackBackground.classList.remove('popup-callback-bg-visible');
        }
    });
    popupCallbackCloseBtn.addEventListener('click', function () {
        popupCallbackBackground.classList.remove('popup-callback-bg-visible');
    });
    popupThanksBackground.addEventListener('click', function (event) {
        if (event.target === popupThanksBackground) {
            popupThanksBackground.classList.remove('popup-thanks-bg-visible');
        }
    });
    for (let i = 0; i < popupThanksCloseBtns.length; i++) {
        popupThanksCloseBtns[i].addEventListener('click', function () {
            popupThanksBackground.classList.remove('popup-thanks-bg-visible');
        });
    }
}

// ягоды

let berriesBlock = document.querySelector('.berries');
let sources = ['blackberry','blackcurrant','blueberry','cherry','raspberry','strawberry','blackberry2','blackcurrant2','raspberry2']

setInterval(function () {
    let srcLeft = Math.floor(Math.random()*sources.length);
    let srcRight = Math.floor(Math.random()*sources.length);
    let left = document.createElement('img');
    left.classList.add('berry');
    left.classList.add('berry-left');
    left.src = 'img/berries/' + sources[srcLeft] + '.png';
    left.alt = '';
    let right = document.createElement('img');
    right.classList.add('berry');
    right.classList.add('berry-right');
    right.src = 'img/berries/' + sources[srcRight] + '.png';
    right.alt = '';
    berriesBlock.appendChild(left);
    left.style.animation = '4s linear 0s 1 forwards flyDown';
    berriesBlock.appendChild(right);
    right.style.animation = '4s linear 1.5s 1 forwards flyDown';
    setTimeout(function () {
        left.parentNode.removeChild(left);
    }, 4500)
    setTimeout(function () {
        right.parentNode.removeChild(right);
    }, 6500)
}, 3000)

//карусель-слайдер на странице услуги

$(document).ready(function() {
    if ($('.advantages').length) {
        let owlList = $('.advantages .advantages__slider.owl-carousel');
        if (owlList.length) {
            if (document.documentElement.scrollWidth > 1270) {
                owlList.owlCarousel({
                    items: 1,
                    center: true,
                    mouseDrag: false,
                    touchDrag: false,
                    stagePadding: 410,
                    autoplay: true,
                    autoplayTimeout: 5000,
                    autoplaySpeed: 1000,
                    loop: true,
                    nav: false,
                    dots: false,
                });
            } else {
                owlList.owlCarousel({
                    items: 1,
                    center: true,
                    mouseDrag: false,
                    touchDrag: false,
                    autoplay: true,
                    autoplayTimeout: 5000,
                    autoplaySpeed: 1000,
                    loop: true,
                    nav: false,
                    dots: false,
                });
            }
        }
        let owlImages = $('.advantages .advantages__images.owl-carousel');
        if (owlImages.length) {
            owlImages.owlCarousel({
                items: 1,
                mouseDrag: false,
                touchDrag: false,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplaySpeed: 1000,
                loop: true,
                nav: false,
                dots: false,
            });
        }
        let owlListSlider = document.querySelector('.advantages').querySelector('.advantages__slider');
        let owlImagesSlider = document.querySelector('.advantages').querySelector('.advantages__images');
        let fullList = document.querySelector('.advantages').querySelector('.advantages__full-list');
        let fullListImages = document.querySelector('.advantages').querySelector('.advantages__full-list-images');
        let showButton = $('.advantages__show-list-button');
        let hideButton = $('.advantages__hide-list-button');
        showButton.click(function() {
            owlListSlider.style.maxHeight = '0';
            owlImagesSlider.style.maxHeight = '0';
            owlImagesSlider.style.minHeight = '0';
            fullList.style.maxHeight = fullList.scrollHeight + 'px';
            fullListImages.style.maxHeight = fullListImages.scrollHeight + 'px';
            showButton.css({'display': 'none'});
            hideButton.css({'display': 'block'});
        })
        hideButton.click(function() {
            owlListSlider.style.maxHeight = '';
            owlImagesSlider.style.maxHeight = '';
            owlImagesSlider.style.minHeight = '';
            fullList.style.maxHeight = '';
            fullListImages.style.maxHeight = '';
            showButton.css({'display': 'block'});
            hideButton.css({'display': 'none'});
        })
    }
});