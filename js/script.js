require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

// объединяем все созданные модули в главный через импорт 
import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import { openModalWindow } from './modules/modal';

// начинаем с глобалального обработика событий ДОМконтент
window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => openModalWindow('.modal', modalTimerId), 3000);

    // вызываем только что импортированные функции
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2020-08-30');
    cards();
    calc();
    forms('form', modalTimerId);
    // передаем объект который будет содержать определенные настройки
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });

});