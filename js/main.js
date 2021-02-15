
document.querySelector('.page').classList.add('loaded');

function showBlocks(i) {
    for (let j = i; j >= 0; j--) {
        toScroll[j].classList.add('visible');
        toScroll[j].classList.remove('hidden');
    }
}

function showCurrentBlock() {
    if (document.documentElement.scrollTop !== 0) {
        header.style.background = 'rgba(255,255,255,0.5)';
        changingColorBlock.style.color = "#000000";
        changingColorBlock.querySelector('svg > *').style.fill = "#000000";
        for (let i = 0; i < berries.length; i++) {
            berries[i].style.opacity = '0.5';
        }
        if (document.documentElement.scrollHeight <= document.documentElement.scrollTop + document.documentElement.offsetHeight + footer.scrollHeight/2) {
            for (let i = 0; i < berries.length; i++) {
                berries[i].style.opacity = '';
                berries[i].style.top = '110vh';
            }
        } else {
            for (let i = 0; i < berries.length; i++) {
                berries[i].style.opacity = '0.5';
                berries[i].style.top = '';
            }
        }
    } else {
        header.style.background = '';
        changingColorBlock.style.color = "#ffffff";
        changingColorBlock.querySelector('svg > *').style.fill = "#ffffff";
        for (let i = 0; i < berries.length; i++) {
            berries[i].style.opacity = '';
        }
    }
    for(let i = 0; i < toScroll.length; i++) {
        if (toScroll[i].offsetTop <= document.documentElement.scrollTop + 0.8 * document.documentElement.clientHeight) {
            toScroll[i].classList.add('visible');
            toScroll[i].classList.remove('hidden');
        }
    }
}

//появление элементов при скролле

let burgerInput = document.getElementById('burger');
let lists = document.querySelector('.header').querySelectorAll('ul');
let toScroll = document.querySelectorAll('.toScroll');
let indexOfCurrentBlock = 0;

let changingColorBlock = document.querySelector('.header__right');
let header = document.querySelector('.header');

let left = document.createElement('img');
let right = document.createElement('img');
let footer = document.querySelector('.footer');

for(let i = 0; i < toScroll.length; i++) {
    if (toScroll[i].offsetTop > document.documentElement.scrollTop + 0.8 * document.documentElement.clientHeight) {
        toScroll[i].classList.add('hidden');
    }
    if (toScroll[i].offsetTop <= document.documentElement.scrollTop) {
        indexOfCurrentBlock = i;
    }
}

if (document.documentElement.scrollWidth >= 1025) {
    toScroll[indexOfCurrentBlock].scrollIntoView({
        behavior: 'smooth'
    });
}

window.addEventListener('scroll', showCurrentBlock);

window.addEventListener('mousewheel', function (event) {
    if (document.documentElement.scrollWidth >= 1025) {
        if (event.deltaY > 0 || event.wheelDelta < 0) {
            if (document.documentElement.scrollTop + document.documentElement.offsetHeight + 10 >= toScroll[indexOfCurrentBlock].offsetTop + toScroll[indexOfCurrentBlock].offsetHeight) {
                if (toScroll[indexOfCurrentBlock+1]) {
                    toScroll[++indexOfCurrentBlock].scrollIntoView({
                        block: 'start',
                        behavior: 'smooth'
                    });
                }
            } else {
                if (!(event.deltaY)) {
                    toScroll[indexOfCurrentBlock].scrollIntoView(false);
                } else {
                    toScroll[indexOfCurrentBlock].scrollIntoView({
                        block: 'end',
                        behavior: 'smooth'
                    });
                }
            }
        } else if (event.deltaY < 0 || event.wheelDelta > 0) {
            if (document.documentElement.scrollTop <= toScroll[indexOfCurrentBlock].offsetTop) {
                if (toScroll[indexOfCurrentBlock-1]) {
                    if (!(event.deltaY)) {
                        toScroll[--indexOfCurrentBlock].scrollIntoView(false);
                    } else {
                        toScroll[--indexOfCurrentBlock].scrollIntoView({
                            block: 'end',
                            behavior: 'smooth'
                        });
                    }
                }
            } else {
                toScroll[indexOfCurrentBlock].scrollIntoView({
                    block: 'start',
                    behavior: 'smooth'
                });
            }
        }
    }
    showBlocks();
});

//скролл при нажатии на пункт меню


function closeBurger() {
    burgerInput.checked = false;
}

let _loop = function _loop(links, i) {
    links[i].addEventListener('click', function (event) {
        event.preventDefault();

        if (toScroll[i]) {
            indexOfCurrentBlock = i;
            toScroll[indexOfCurrentBlock].scrollIntoView({
                behavior: 'smooth'
            });
            closeBurger();
            showBlocks(indexOfCurrentBlock);
        }
    });
};

for (let i = 0; i < lists.length; i++) {
    let links = lists[i].querySelectorAll('a');

    for (let i = 0; i < links.length; i++) {
        _loop(links, i);
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
let berries = berriesBlock.querySelectorAll('.berry');

setTimeout(function () {
    for (let i = 0; i < berries.length; i++) {
        berries[i].classList.add('berry' + (i+1));
    }
}, 3000)



/*
let berriesBlock = document.querySelector('.berries');
let sources = ['blackberry','blackcurrant','blueberry','cherry','raspberry','strawberry','blackberry2','blackcurrant2','raspberry2']

setTimeout(function () {
    let srcLeft = Math.floor(Math.random()*sources.length);
    let srcRight = Math.floor(Math.random()*sources.length);
    left.classList.add('berry');
    left.classList.add('berry-left');
    left.src = 'img/berries/' + sources[srcLeft] + '.png';
    left.alt = '';
    right.classList.add('berry');
    right.classList.add('berry-right');
    right.src = 'img/berries/' + sources[srcRight] + '.png';
    right.alt = '';
    berriesBlock.appendChild(left);
    left.style.animation = '8s linear 0s infinite forwards rotating';
    berriesBlock.appendChild(right);
    right.style.animation = '8s linear 0s infinite forwards rotating';
    setTimeout(function () {
        if (document.documentElement.scrollHeight <= document.documentElement.scrollTop + document.documentElement.offsetHeight + footer.scrollHeight/2) {
            left.style.top = '105vh';
            right.style.top = '105vh';
        } else {
            left.style.top = '50vh';
            right.style.top = '50vh';
        }
    }, 1000)
    setInterval(function () {
        let newSrcLeft = Math.floor(Math.random()*sources.length);
        let newSrcRight = Math.floor(Math.random()*sources.length);
        left.style.opacity = '0';
        right.style.opacity = '0';
        setTimeout(function() {
            left.src = 'img/berries/' + sources[newSrcLeft] + '.png';
            right.src = 'img/berries/' + sources[newSrcRight] + '.png';
            left.style.opacity = '';
            right.style.opacity = '';
        },1050)
    }, 5000)
}, 3000)
*/
//карусель-слайдер на странице услуги

$(document).ready(function() {
    if ($('.advantages').length) {
        let owlImages = $('.advantages .advantages__slider.owl-carousel');
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

        $('.advantages__next-button').click(function() {
            owlImages.trigger('next.owl.carousel');
            owlImages.trigger('stop.owl.autoplay');
            owlImages.data('owl.carousel').settings.autoplay = false;
            owlImages.data('owl.carousel').options.autoplay = false;
            owlImages.trigger('refresh.owl.carousel');
            setTimeout(function () {
                owlImages.trigger('play.owl.autoplay');
                owlImages.data('owl.carousel').settings.autoplay = true;
                owlImages.data('owl.carousel').options.autoplay = true;
                owlImages.trigger('refresh.owl.carousel');
            },100)
        });

        let owlImagesSlider = document.querySelector('.advantages').querySelector('.advantages__block');
        let fullList = document.querySelector('.advantages').querySelector('.advantages__full-list');
        let showButton = $('.advantages__show-list-button');
        let hideButton = $('.advantages__hide-list-button');
        showButton.click(function() {
            owlImagesSlider.style.maxHeight = '0';
            owlImagesSlider.style.minHeight = '0';
            fullList.style.maxHeight = fullList.scrollHeight + 'px';
            showButton.css({'display': 'none'});
            hideButton.css({'display': 'block'});
        })
        hideButton.click(function() {
            owlImagesSlider.style.maxHeight = '';
            owlImagesSlider.style.minHeight = '';
            fullList.style.maxHeight = '';
            showButton.css({'display': 'block'});
            hideButton.css({'display': 'none'});
        })
    }
});