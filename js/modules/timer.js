function timer(id, deadline) {
    // работа с акцией
    // 1. функция которая будет устанавливать наш таймер
    // 2. функционал который будет определять разницу между временем
    // 3. функционал который будет заниматься обновлением времени акции

    // Таймер

    const deadLine = '2020-08-30'; // дата окончания акции
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
    setClock(id, deadline);
}

export default timer;