import { getResource } from '../services/services';

function cards() {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src; // путь к картинке на карточке
            this.alt = alt; // алтернативное название картинки если она сломается
            this.title = title; // заголовой меню
            this.descr = descr; // содеражание
            this.price = price; // цена по условию она приходит с сервера в долларах
            this.parent = document.querySelector(parentSelector); // здесь лежит именно ДОМ элемент
            this.classes = classes; // сюда будет попадать массив! тк использован рест оператор который собирает элементы в массив
            this.transfer = 27; // курс валюты для конвертации по условию в гривны
            this.convertToUAH(); // методы тоже можно выносить 
        }
        convertToUAH() {
            this.price = this.price * this.transfer;
        }
        // render - универсальное название метода который создает HTML элементы на странице
        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = "menu__item";
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
              <img src=${this.src} alt=${this.alt}>
              <h3 class="menu__item-subtitle">${this.title}</h3>
              <div class="menu__item-descr">${this.descr}</div>
              <div class="menu__item-divider"></div>
              <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
          `;

            this.parent.append(element);
        }
    }
    // если объект будет использоваться один раз то его можно создать без переменной 
    // но тогда надо помнить что после использования он удалиться ссылка на него не сохраняется!


    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
}

export default cards;