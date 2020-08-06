// начинаем с глобалального обработика событий ДОМконтент
window.addEventListener('DOMContentLoaded', () => {
    // задачи
    //1. Функци которая будет скрывать ненужные нам табы;
    //2. Показать нужный таб;
    //3. Назначить обработчики событий на меню, кот будет манипулировать функциями;

    // Получаем те элементы с которыми будем взаимодействовать
    //табы - меню
    const tabs = document.querySelectorAll('.tabheader__item'),
        //весь контент внутри табов
        tabsContent = document.querySelectorAll('.tabcontent'),
        //родитель который будет содержать все эти табы для применения делегирования событий он один!
        tabsParent = document.querySelector('.tabheader__items');

    //задача 1 функция скрывающая ненужные табы hide - скрывать
    function hideTabsContent() {
        //работая с псевдомассивом перебираем его через forEach и скрываем каждый эл отдельно
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        //также удаляем у эл с классом active
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }
    // функция показывающая нужный таб один! поэтому пишем без перебора
    function showTabsContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabsContent();
    showTabsContent();

    // задача 3 делегирование событий
    tabsParent.addEventListener('click', (event) => {
        // удобно положить event.target в переменную если будем пользоваться несколько раз
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabsContent();
                    showTabsContent(i);
                }
            });
        }
    });


    // работа с акцией
    // 1. функция которая будет устанавливать наш таймер
    // 2. функционал который будет определять разницу между временем
    // 3. функционал который будет заниматься обновлением времени акции

    // Таймер

    const deadLine = '2020-07-30'; // дата окончания акции
    // создаем функцию считающуя остаток времени акции в милисекундах remaining - гл осталось
    // время в js отсчитывается от 01.01.1970г если надо более поздние даты используется
    // отрицательное значение
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()), // получили количество милисекунд
            days = Math.floor(t / (1000 * 60 * 60 * 24)), // Math.floor округляет значение до целого числа
            // узнали сколько осталось суток до окнчания акции
            hours = Math.floor((t / (1000 * 60 * 60) % 24)), // находим хвостик часов от полных суток, который 
            // и будем помещать в окошко часы
            minutes = Math.floor((t / (1000 * 60) % 60)),
            seconds = Math.floor((t / 1000) % 60);

        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }; // возвращаем объект
    }
    // пишем функцию которая подставляет ноль для красоты отображения единиц в счетчике
    function getZiro(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }
    // пишем функцию которая будет устанавливать наши значения на страничку
    function setClock(selector, endtime) {
        // находим элементы на странице с кот будем взаимодействовать
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
        // вручную запустим функцию updateClock чтобы не было задержки отображения правильного счетчика!
        updateClock();

        // функция обновляющая наш таймер каждую секунду
        function updateClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZiro(t.days);
            hours.innerHTML = getZiro(t.hours);
            minutes.innerHTML = getZiro(t.minutes);
            seconds.innerHTML = getZiro(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadLine);

    // модальное окно
    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'); // надо найти именно само модальное окно


    function openModalWindow() {
        const modalTimerId = setTimeout(openModalWindow, 5000);
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden'; // стиль не позволяющий прокручиваться
        // странице когда открыто модальное окно
        clearInterval(modalTimerId); // если пользователь сам открыл модальное окно
        //то автоматически оно больше не будет ему показываться
        window.removeEventListener('scroll', showModalbyScroll);
    }

    function closeModalWindow() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = ''; // пустая строка браузер сам вернет прокручивание
    }

    modalTrigger.forEach(item => {
        item.addEventListener('click', (event) => {
            openModalWindow();
        });
    });

    // если кликнуть на подложку модального окна оно закроется, но если
    // на само диалоговое окно останется открытым
    modal.addEventListener('click', (event) => {
        //если событие происходит на модальном окне или событие происходи на элементе у которого есть атрибут дата-клоз 
        // то окно будет закрыто - делегирование событий - таким образом новое окно с оповещением пользователю сможет быть закрыто нажатием на крестик
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModalWindow();
        }
    });

    // вешаем обработчик событий на объект document нажатие клавиши esc
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            closeModalWindow();
        };
    });

    // модификация модального окна
    // 1. окно появляется само через какое-то время
    // 2. появляется после прокрутки всей страницы
    // 3. появляется один раз после прокрутки страницы



    // вешаем глобальный обработчик событий - прокручивание
    function showModalbyScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModalWindow();
            window.removeEventListener('scroll', showModalbyScroll);
        }
    }

    window.addEventListener('scroll', showModalbyScroll);
    //window.pageYOffset - прокрученная часть стр 
    //+ documentElement.clientHeight - то что  видит пользователь в этот момент на сайте без прокрутки
    // documentElement.scrollHeight - вся длина прокрутки сайта
    // Чтобы удалить обработчик событий нужна ФУНКЦИЯ кот исполнялась! у нас showModalByScroll

    // делаем шаблон карточек с меню через классы  (description - описание)

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
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        15,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        11,
        '.menu .container'
    ).render();

    // Forms 
    // 1. получаем все формы которые есть у нас на странице
    const forms = document.querySelectorAll('form');
    // 10. создадим объект кот будет содержать список фраз для разных стадий отправки данных на сервер
    const messege = {
        loading: 'img/form/spinner.svg', // чтобы использовать картинку мы прописываем пусть к картинке
        success: 'Спасибо! Мы скоро с Вами свяжемся',
        failure: 'Что-то пошло не так...'
    };
    // 14. берем каждую из наших форм и подвязываем к ним функцию postData
    forms.forEach(item => {
        postData(item);
    });
    // 2. прописываем функция которая будет отвечать за постинг данных
    function postData(form) {
        // 3 вешаем на аргумент форм обработчик событий, submit - событие срабатывает каждый раз когда мы хотим отправить какую либо форму
        form.addEventListener('submit', (event) => {
            // 4 чтобы при отправке формы страница не перезагружалась очень важно отменить стандартное поведение браузера!!!
            event.preventDefault();
            // 11. создается новый блок на странице для сообщений пользователю о результате отпрвки формы на сервер
            const statusMessege = document.createElement('img');
            // 12. ему добавляется класс
            statusMessege.src = messege.loading;
            // 13. добавляем текс из ранее созданного объекта 
            statusMessege.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            //размещаем объект
            // используем более гибский метод для помещения элемента на страницу, он принимает два аргумента куда вставляем
            // и сам элемент который бдем вставлять 
            form.insertAdjacentElement('afterend', statusMessege);




            const formData = new FormData(form); // аналог JSON по работе с формами отправки на сервер
            // 8 метод для отпавки самого запроса на сервер т.к. у нас post запрос то у метода  send будет body
            // Переделываем запрос на сервер в JSON
            // Создаем новый объект, перебираем formData и помещаем ин-фу в новый объект
            const object = {};
            formData.forEach(function(value, key) {
                object[key] = value;
            });
            // создаем новый объект в который превращаем в JSON для отправки на сервер
            // 5 создаем сам объект для отпрвки запроса на сервер
            // делаем запрос на сервер через fetch API
            // первый аргументом у объекта будет адрес сервера, вторым объект содержащий данные о запросе, заголовке и саму инфу которую будет отправлять 
            fetch('server.php', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(object)
                })
                .then(data => {
                    showThanksModal(messege.success);
                    // 16. уберем доп сообщение о статусе отправки формы через пару секунд
                    statusMessege.remove();
                })
                .catch(() => {
                    showThanksModal(messege.failure);
                })
                .finally(() => {
                    // 15. очистим форму после заполнения и успешной отправки на сервер - в любом случае очищаем форму
                    form.reset();
                });
        });
    }
    // делаем красивое модальное окно - оповещение пользователю
    // создаем саму функцию нового модального окна
    function showThanksModal(message) {
        // находим элемент форма модального окна (prevent - предотвращать)
        const prevModalDialog = document.querySelector('.modal__dialog');
        // скрываем модальное окно - важно не удалить а скрыть чтобы пользователь в дальнейшем мог еще с ним работать!
        prevModalDialog.classList.add('hide');
        openModalWindow();
        // приступаем к созданию нашего нового контента, понадобиться обертка для нового контента 
        const thanksModal = document.createElement('div');
        // этому диву назначаем классы для стилизации
        thanksModal.classList.add('modal__dialog');
        // формируем верстку которая будет находится в этом модальном окне
        thanksModal.innerHTML = `
            <div class="modal__content">
                 <div class = "modal__close" data-close>×</div>
                 <div class = "modal__title">${message}</div>
        </div>
        `;
        // добавляем наше новое окно на страницу
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModalWindow();
        }, 4000)

    }
    // технология FETCH API встроенная в браузер, позволяет общаться с сервером и она построена на promis
    // jsonplaceholder.com - база для тестирования 

});