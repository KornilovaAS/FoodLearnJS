function openModalWindow(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; // стиль не позволяющий прокручиваться
    // странице когда открыто модальное окно
    // создаем условие что если только есть модалтаймерад будет запускать очистку таймера
    if (modalTimerId) {
        clearInterval(modalTimerId); // если пользователь сам открыл модальное окно
        //то автоматически оно больше не будет ему показываться
    }
}


function closeModalWindow(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = ''; // пустая строка браузер сам вернет прокручивание
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    // модальное окно
    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector); // надо найти именно само модальное окно

    modalTrigger.forEach(item => {
        item.addEventListener('click', () => openModalWindow(modalSelector, modalTimerId)); // такое написание позволяет сохранить последовательность действий!
    });

    // если кликнуть на подложку модального окна оно закроется, но если
    // на само диалоговое окно останется открытым
    modal.addEventListener('click', (event) => {
        //если событие происходит на модальном окне или событие происходи на элементе у которого есть атрибут дата-клоз 
        // то окно будет закрыто - делегирование событий - таким образом новое окно с оповещением пользователю сможет быть закрыто нажатием на крестик
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModalWindow(modalSelector);
        }
    });

    // вешаем обработчик событий на объект document нажатие клавиши esc
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            closeModalWindow(modalSelector);
        };
    });



    // модификация модального окна
    // 1. окно появляется само через какое-то время
    // 2. появляется после прокрутки всей страницы
    // 3. появляется один раз после прокрутки страницы



    // вешаем глобальный обработчик событий - прокручивание
    function showModalbyScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModalWindow(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalbyScroll);
        }
    }

    window.addEventListener('scroll', showModalbyScroll);
    //window.pageYOffset - прокрученная часть стр 
    //+ documentElement.clientHeight - то что  видит пользователь в этот момент на сайте без прокрутки
    // documentElement.scrollHeight - вся длина прокрутки сайта
    // Чтобы удалить обработчик событий нужна ФУНКЦИЯ кот исполнялась! у нас showModalByScroll

}

export default modal;
// делаем два именнованных экспорта, чтобы отправка формы заработала нормально
export { closeModalWindow };
export { openModalWindow };