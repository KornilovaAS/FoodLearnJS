function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {
    // делаем слайдер на странице
    //1. находим элементы с которыми будем работать 

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field), // поле с нашими слайдами 
        // находим ширину слайда через стили CSS доступные через объект window методом getComputedStyle - он вернет нам  объект
        // со всеми свойствами у которого мы возьмем только ширину
        width = window.getComputedStyle(slidesWrapper).width;

    // // 2. индекс определяющий положение в слайдере
    let sliderIndex = 1; // let - потому что в дальнейшем это значение будет меняться 
    let offset = 0; // изменяющися элемент показывающий сколько мы уже отступили
    //1. slidesField - будет занимать большое количество пространства вокруг себя и внутри себя выстраивать слайды 
    // устанавливаем этому блоку ширину 

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${sliderIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = sliderIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    // выравниваем слайды чтобы они стояли в одну линию с помощью flex
    slidesField.style.display = 'flex';
    // делаем более гибкое переключение слайдов (все эти свойста хорошо бы прописывать именно в CSS!)
    slidesField.style.transition = '0.5s all';
    // чтобы страница не прокручивалась вбок из за вытянувшихся картинок, скрываем все элементы 
    slidesWrapper.style.overflow = 'hidden';

    // устанавливаем каждому сладу одинаковую ширину чтобы они поместились в slidesField
    slides.forEach(slides => {
        slides.style.width = width;
    });

    // relative
    // Положение элемента устанавливается относительно его исходного места
    slider.style.position = 'relative';
    // создаем большую обертку для всех точек и стилизуем
    const indicators = document.createElement('ol'),
        // создадим вручную массив 
        dots = [];
    indicators.classList.add('.carousel-indicators');
    indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
`;
    // помещаем нашу обертку прямо во внутрь слайдера 
    slider.append(indicators);
    // на основе количества слайдов создаем количество точек 
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
    `;
        if (i == 0) {
            dot.style.opacity = 1;
            // opacity - Определяет уровень прозрачности элемента веб-страницы
        }
        indicators.append(dot);
        dots.push(dot);
    }
    // digits - цыфры в пер.
    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }
    // назначаем обработчик события чтобы передвигать наш слайдер
    next.addEventListener('click', () => {
        // когда мы нажмаем на кнопку - необходимо сдвинуть слайд
        // условие если наш отступ будет равен ширине одного слайда умноженная количество слайдов минус 1 то уходим в ноль начало
        if (offset == deleteNotDigits(width) * (slides.length - 1)) { // т.к. сейчас width = 500px, то надо приврать значение в числовой тип данных!
            // для этого надо отрезать буквы от конца строки и использовать унарный оператор +!
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }
        if (sliderIndex == slides.length) {
            sliderIndex = 1;
        } else {
            sliderIndex++;
        }
        if (slides.length < 10) {
            current.textContent = `0${sliderIndex}`;
        } else {
            current.textContent = sliderIndex;
        }

        slidesField.style.transform = `translateX(-${offset}px)`; // используем именно ось Х и не забываем про ед. измерения тут пиксели!

        dots.forEach(dot => {
            dot.style.opacity = '.5'
        });
        dots[sliderIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        // когда мы узначи что слайд первый 
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1)
        } else {
            offset -= deleteNotDigits(width);
        }

        if (sliderIndex == 1) {
            sliderIndex = slides.length;
        } else {
            sliderIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${sliderIndex}`;
        } else {
            current.textContent = sliderIndex;
        }

        slidesField.style.transform = `translateX(-${offset}px)`; // используем именно ось Х и не забываем про ед. измерения тут пиксели!

        dots.forEach(dot => {
            dot.style.opacity = '.5'
        });
        dots[sliderIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const slideTo = event.target.getAttribute('data-slide-to');
            sliderIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            if (slides.length < 10) {
                current.textContent = `0${sliderIndex}`;
            } else {
                current.textContent = sliderIndex;
            }
            dots.forEach(dot => {
                dot.style.opacity = '.5'
            });
            dots[sliderIndex - 1].style.opacity = 1;
        });
    });
}

export default slider;