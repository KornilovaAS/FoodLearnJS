'use strict';

// // 1. обычная функция this = window, но если use strict - undefined
// // 2. контекст у методов объекта - сам объект
// // 3. this в функциях-конструкторах и классах- это новый экземпляр объекта
// // 4. присваивание контекста вручную call и apply
// // bind - создает новую функцию! с привязанным контекстом! важно запомнить

// // function showThis () {
// //    console.log(this);
// // }
// // showThis();



// // function showThis(a, b) {
// //     console.log(this);

// //     function sum() {
// //         console.log(this);
// //         // если написать return this.a + this.b работать сумма не будет получим из примера 
// //         // два раза undefined
// //         // это решается замыканием функции убираем слово this и тогда функция сначала ищет у себя 
// //         // a b, а потом поднимается вверх к родителю
// //         return a + b;
// //     }
// //     console.log(sum());
// // }
// // showThis(4, 5);

// // const obj = {
// //    a: 10,
// //    b: 20,
// //    sum: function() {
// //       console.log(this);
// //       return console.log(this.a + this.b);
// //       function show(){
// //          console.log(this); // метод внутри метода контекст теряется!
// //       }
// //       show();
// //    }
// // };
// // obj.sum();
// // obj.sum.show();

// // function User(name, id) {
// //     this.name = name;
// //     this.id = id;
// //     this.human = true;
// //     this.hello = function() {
// //         console.log(this);
// //         console.log(`Hallo ${this.name}`);
// //     };
// // }

// // let ivan = new User('Ivan', 29);

// // function count(num) {
// //     return this * num;
// // }

// // const double = count.bind(2); //double - это новая функция у которой есть жестко привязанный контекст
// // // 2 которая передается в функцию count, метод встречается очень часто!

// // console.log(double(3));

// // const btn = document.querySelector('button');

// // btn.addEventListener('click', function() { 
// //     console.log(this);
// // }); // когда обработчик написан в классическом стиле с полной колбэк функцией 
// // //то контекстом в этом случае будет сам ЭЛЕМЕНТ на котором произошло событие т.е. button

// // const obj = {
// //     num: 5,
// //     sayNum: function () {
// // const say = () => {
// // console.log(this); // у стрелочной функции нет своего контекста, она всегда берет контекст
// // // у родителя! в данном примерне контектом будет являться функция sayNum у которой контекст сам объект
// // // если в этом примере внутри метода sayNum написать обычную функцию то будет ошибка - undefined
// // };
// // say();
// //     }
// // };

// // obj.sayNum();

// // синтаксис стрелочных функций
// // // если помещается в одну строку и у функции один аргумент можно писать сокращенно
// // const double = a => a * 2;
// // console.log(double(6));
// // //работает без () и ключевого слова return

// // название класса всегда должно начинаться с большой буквы
// // классы как и функции конструкторы служат для создания новых объектов
// // rectangle - прямоугольник
// // class Rectangle {
// //     constructor(height, width) {
// //         this.height = height;
// //         this.width = width;
// //     }
// //     calcArea() {
// //         return this.height * this.width; //методы в классы записываются сразу с наименования
// //         // между свойствами и методами запятая не ставится как и точно с запятой
// //         // это может привести к ошибкам!
// //     }
// // }

// // // наследование классов, механизм для повторного использования когда
// // // в class с помощью ключевого слова EXTENDS
// // class ColoredRectangleWithText extends Rectangle {
// //     constructor(height, width, text, bgColor) {
// //         super(height, width); // универсальная вещь ктр. вызывает супер конструктор родителя
// //         // главное правильно super - должно всегда стоять первым в конструкторе!
// //         this.text = text;
// //         this.bgColor = bgColor;
// //     }
// //     showMyProps() {
// //         console.log(`Text: ${this.text}, Color: ${this.bgColor}`);
// //     }
// // }
// // // const square = new Rectangle(10, 10); // новый объект создается через ключевое слово new 

// // // console.log(square.calcArea());

// // const div = new ColoredRectangleWithText(23, 56, "Hallo", "blue");

// // div.showMyProps();
// // console.log(div.calcArea());

// // подготавливаем данные для передачи через JSON на сервер - текстовый формат обмена данными

// // const persone = {
// //     name: 'Alex',
// //     tel: '+74995764915'
// // };

// // // объект JSON пишется всегда большими буквами и он встроен в браузер!
// // // самое главное правило в JSON что все сущности записаны в двойные кавычки только тогда сервер сможет их принять и обработать

// // // console.log(JSON.stringify(persone));

// // // {"name":"Alex","tel":"+74995764915"}

// // // получаем данные с сервера и изменяем их для дальнейшего использования 

// // console.log(JSON.parse(JSON.stringify(persone)));
// // //{ name: 'Alex', tel: '+74995764915' }
// // популярность JSON маленький вес файлов и простота чтения для человека

// // // promis - обещание
// // работа с асинхронным кодом 

// console.log('Запрос данных...');
// // для того чтобы не создать коллбэк хэл использую промис
// // resolve, reject - функции 
// // resolve - означает что то что мы ожидали выполнилось
// // reject - наше ожидание не выполнилось и что-то пошло не так 
// const req = new Promise(function(resolve, reject) {
//     setTimeout(() => {
//         console.log('Подготовка данных...');
//         const product = {
//             name: 'TV',
//             price: 2000
//         };
//         resolve(product);
//     }, 2000);
// });
// // then метод который обработывает положительные результаты
// req.then((product) => {
//     // можно использовать стрелочные функции
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             product.status = 'order';
//             resolve(product);
//         }, 2000);
//     });
// }).then(data => {
//     console.log(data);
// });

// методы перебора массивов полезная тема для работы с данными с сервера
// filter - фильтрует элементы внутри массива
// важно понимать что метод filter - возвращает новый массив уже как то измененный 

// const names = ['Ann', 'Pavel', 'Prokofij', 'Elizavetta'];

// const shotNames = names.filter(function(name) {
// return name.length < 7; 
// // важно понять что функция должна именно возвращать! массив в котором соблюдаются поставленные условия 
// });

// console.log(shotNames);

// // метод map - позволяет взять исходный массив и изменить каждый элемент внутри него
// const answers = ['IvAn', 'allA', 'Julia'];

// const newAnswer = answers.map(name => name.toLowerCase() );
// console.log(newAnswer);

// // every/some - методы возвращающие булиновое значение либо true, либо  falce
// // some - метод перебирающий весь массив и если хотя бы один элемент удовлетворяет условию он нам вернет true, если нет - falce
// // every - если все элементы массива подходят под условие, только в этом случае вернется true
//  const some = [4, 'that', 'than'];
// // console.log(some.some(item => typeof(item) === "number"));

// console.log(some.every(item => typeof(item) === "number"));

// reduce - метод служит чтобы схлопывать или собирать массив в одно единое целое 
// const arr = [4, 9, 7, 3, 8, 2, 5];
// // наша задача получить сумму всех этих элементов 
// const res = arr.reduce((sum, current) => sum + current);
// console.log(res);

// const arr = ['apple', 'pear', 'banana'];

// const res = arr.reduce((sum, item ) => `${sum}, ${item}`, 'lemon');
// console.log(res);

// // тогда получится 
// // // lemon, apple, pear, banana
// // // reduce принимает еще один аргумент, после колл-бэк функции ставится запятая и можно задать начальное значение

// // практика!
// // чтобы превратить объект в матрицу массивов удобно использовать метод entries!!! получится массив с массивами

// const obj = {
//     ivan: 'persone',
//     ann: 'persone',
//     dog: 'animal',
//     cat: 'animal'
// };

// const newArr = Object.entries(obj)
//     .filter(item => item[1] === 'persone')
//     .map(item => item[0]);


// console.log(newArr);

// // использовали цепочку методов перебора массивов чейнинг

// Регулярные выражения - технология позволяющая удобно работать со строками
// РВ состоят из двух частей паттерн и флаги 
// патерн это шаблон, т.е например что мы ищем в этой строке или что пытаемся удалить 

//1. создание патерна при помощи конструктора 
// Regular Exprassion 
// new RegExp ('pattern', 'flags');

// //2. сокращенная запись на 99% использующаяся в скриптах

// /pattern/flags
// Флаги:
// 1. i - когда хотим что то найти вне зависимости от регистра 
// 2. g - global - когда пытаемся найти сразу несколько вхождений
// 3. m - включает многострочный режим


//1 метод использования search ПОИСК

// const pr = prompt('Введите имя');
// const reg = /n/ig;

// // console.log(pr.search(reg));

// //2. Метод match - более мощный метод возвращающи массив 

// console.log(pr.match(reg));
//["n", index: 3, input: "Jhon", groups: undefined]
// g - находит все нужные символы возвращает массив 
// (6) ["N", "N", "N", "N", "N", "N"]
// 0: "N"
// 1: "N"
// 2: "N"
// 3: "N"
// 4: "N"
// 5: "N"
// length: 6
// __proto__: Array(0)
// флаги можно совмещать

// 3. метод replace - заменяет одно на другое 

// const pass = prompt('Введите пароль');

// console.log(pass.replace(/./g, '*')); // где /./ спец символ означающий что взяли все значения которые введет пользователь

// используем модули для сборки проекта

function myModule() {
    this.hello = function() {
        console.log('Hello!');
    };
    this.goodbye = function() {
        console.log('Bye!');
    };
}

// обращаемся к объекту модуль, у него есть свойство экспорт и туда мы помещаем то что хотели бы экспортировать

module.exports = myModule;