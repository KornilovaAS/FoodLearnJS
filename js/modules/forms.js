import { closeModalWindow, openModalWindow } from './modal';
import { postData } from '../services/services';

function forms(formSelector, modalTimerId) {
    // Forms 
    // 1. получаем все формы которые есть у нас на странице
    const forms = document.querySelectorAll(formSelector);
    // 10. создадим объект кот будет содержать список фраз для разных стадий отправки данных на сервер
    const messege = {
        loading: 'img/form/spinner.svg', // чтобы использовать картинку мы прописываем пусть к картинке
        success: 'Спасибо! Мы скоро с Вами свяжемся',
        failure: 'Что-то пошло не так...'
    };
    // 14. берем каждую из наших форм и подвязываем к ним функцию postData
    forms.forEach(item => {
        bindPostData(item);
    });


    // 2. прописываем функция которая будет отвечать за постинг данных
    // bind - привязывать пер.
    function bindPostData(form) {
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
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            // создаем новый объект в который превращаем в JSON для отправки на сервер
            // 5 создаем сам объект для отпрвки запроса на сервер
            // делаем запрос на сервер через fetch API
            // первый аргументом у объекта будет адрес сервера, вторым объект содержащий данные о запросе, заголовке и саму инфу которую будет отправлять 

            postData('http://localhost:3000/requests', json)
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
        openModalWindow('.modal', modalTimerId);
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
            closeModalWindow('.modal');
        }, 4000)

    }
    // технология FETCH API встроенная в браузер, позволяет общаться с сервером и она построена на promis
    // jsonplaceholder.com - база для тестирования 

}

export default forms;