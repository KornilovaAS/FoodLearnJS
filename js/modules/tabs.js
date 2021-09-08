function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // задачи
    //1. Функци которая будет скрывать ненужные нам табы;
    //2. Показать нужный таб;
    //3. Назначить обработчики событий на меню, кот будет манипулировать функциями;

    // Получаем те элементы с которыми будем взаимодействовать
    //табы - меню
    const tabs = document.querySelectorAll(tabsSelector),
        //весь контент внутри табов
        tabsContent = document.querySelectorAll(tabsContentSelector),
        //родитель который будет содержать все эти табы для применения делегирования событий он один!
        tabsParent = document.querySelector(tabsParentSelector);

    //задача 1 функция скрывающая ненужные табы hide - скрывать
    function hideTabsContent() {
        //работая с псевдомассивом перебираем его через forEach и скрываем каждый эл отдельно
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        //также удаляем у эл с классом active
        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }
    // функция показывающая нужный таб один! поэтому пишем без перебора
    function showTabsContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabsContent();
    showTabsContent();

    // задача 3 делегирование событий
    tabsParent.addEventListener('click', (event) => {
        // удобно положить event.target в переменную если будем пользоваться несколько раз
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabsContent();
                    showTabsContent(i);
                }
            });
        }
    });
}

export default tabs;