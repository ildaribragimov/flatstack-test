"use strict"; document.addEventListener("DOMContentLoaded", function() {
/**
 * Класс XMLHttpRequest-запроса
 *
 * @class
 * @classdesc Выполняет XMLHttpRequest-запрос и возвращает в функциях обратного вызова результат. Принимает в параметрах все необъодимые данные для осуществления XMLHttpRequest-запроса.
 *
 * @param {object} settings - Объект параметров запроса XMLHttpRequest
 * @param {string} settings.url - Адрес запроса
 * @param {string} [settings.data = null] - Данные, отправляемые на сервер. Могут быть переданы только как URI-строка или javascript-объект
 * @param {string} [settings.method = get] - Метод отправки запроса
 * @param {boolean} [settings.async = true] - Тип запроса: асинхронный ("true"), синхронный ("false")
 * @param {requestCallback} [settings.error = null] - Функция, которая будет вызвана в случае неудачного завершения запроса к серверу
 * @param {requestCallback} [settings.success = null] - Функция, которая будет вызвана в случае удачного завершения запроса к серверу
 *
 * @author Ildar Ibragimov <iibragimov84@gmail.com>
 * @copyright Ildar Ibragimov 2016
 */
function ajax(settings) {
    // Назначение значений по умолчанию параметрам объекта, если они не были переданы в вызове
    settings.data = settings.data || null;
    settings.method = settings.method || "get";
    settings.async = settings.async || "true";
    settings.error = settings.error || null;
    settings.success = settings.success || null;
    /**
     * Метод формирует URI-строку запроса
     *
     * @private
     * @description Формирует URI-строку запроса из javascript-объекта параметров, полученных при создании экземпляра объекта AJAX.
     *
     * @param {object} obj - Параметры в виде объекта, которые необходимо преобразовать в URI-строку
     *
     * @return {string} str - Сформированная URI-строка
     */
    function getUriParams(obj) {
        var str = "";
        for (var param in obj) {
            // Добавление подстроки "параметр=значение" к основной URI-строке, если текущее свойство - собственное (не унаследованное)
            if (obj.hasOwnProperty(param)) {
                str += param + "=" + encodeURIComponent(obj[param]) + "&";
            }
        }
        return str.substring(0, str.length - 1);
    }
    // Определение значения по умолчанию тела запроса
    var body = null;
    // Если объект передаваемых данных не пуст
    if (settings.data) {
        // Преобразование объекта данных в URI-строку, если объект отправляемых данных не пуст
        if (typeof settings.data === 'object') {
            settings.data = getUriParams(settings.data);
        }
        // Формирвоание URI-строки или тела запроса в зависимости от метода отправки запроса.
        switch (settings.method) {
            case "get":
                settings.url = settings.url + "?" + settings.data;
                break;
            case "post":
                body = settings.data;
                break;
        }
    }
    // Получение объекта, поддерживаемого браузером (ActiveXObject - для IE6, IE5)
    var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    // Отслеживание состояния завершенности запроса
    xhr.onreadystatechange = function () {
        // Если запрос завершен
        if (xhr.readyState === 4) {
            // Вызов функции обратного вызова при успешном завершении запроса
            if (xhr.status === 200) {
                if (settings.success) {
                    settings.success(xhr.responseText);
                }
                return;
            }
            // Вызов функции обратного вызова при неудачном завершении запроса
            if (settings.error) {
                settings.error(xhr.status + ": " + xhr.statusText);
            }
        }
    };
    // Установка параметров запроса
    xhr.open(settings.method, settings.url, settings.async);
    // Установка заголовка POST-запроса, если метод запроса - POST
    if (settings.method == "post") {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    // Открытие соединения и отправка запроса
    xhr.send(body);
}

/**
 * Функция "getIndex" проверяет присутствует ли значение "needle" в массиве (коллекции) "haystack". Если присутствует, функция возвращает в качестве результата ключ найденноо элемента в искомом массиве (коллекции)
 */
function getIndex(c,b){for(var a=0,d=b.length;a<d;a++){if(b[a]==c){return a;}}return !1;};
/**
 * Функция "parent" ищет родителя элемента и возвращает ссылку на него
 */
function parent(a,b){var c=a,d=document.querySelectorAll(b);while(c!=null){c=c.parentNode;var i=getIndex(c,d);if(i!==false){return d[i];}}return false;};
/**
 * Класс "Слайдер"
 *
 * @class
 * @classdesc Прокручивает ленту со слайдами в горизонтальном и вертикальном направлении.
 *
 * @param {array} selector - DOM-элемент на котором необходимо инициализировать объект Слайдера
 *
 * @author Ildar Ibragimov <iibragimov84@gmail.com>
 * @copyright Ildar Ibragimov 2016
 */
function Slider(selector) {
    /**
     * @property {object} self - Ссылка на текущий объект
     * @property {object} contentRatio - Значение атрибута "data-content-ratio", в числовом типе данных
     * @property {object} viewport - Область просмотра слайдера
     * @property {object} style - Объект CSS-стилей блока области просмотра слайдера
     * @property {object} slidesContainer - Лента слайдов
     * @property {object} slidesContainerStyle - Объект CSS-стилей блока ленты слайдов слайдера
     * @property {object} slides - Коллекция (объект, массив) слайдов
     * @property {object} currentSlide - Текущий слайд
     * @property {object} controlPrev - Кнопка "Предыдущий слайд"
     * @property {object} controlNext - Кнопка "Следующий слайд"
     * @property {object} initialPoint - Объект начальных координат точки прикосновения экрана
     * @property {object} currentPoint - Объект координат точки прикосновения экрана, меняющей позицию при перемещении
     * @property {boolean} detection - Флаг начала отслеживания координат касания или курсора мыши
     * @property {boolean} swipeDetected - Флаг идентификации жеста как "swipe"
     * @private
     */
    var self = this,
        contentRatio = parseFloat(selector.getAttribute('data-content-ratio')),
        viewport = selector.querySelector(".slider__viewport"),
        viewportStyle = getComputedStyle(viewport),
        slidesContainer = viewport.querySelector(".slider__slides"),
        slidesContainerStyle = getComputedStyle(slidesContainer),
        slides = slidesContainer.querySelectorAll(".slider__slide"),
        currentSlide = slidesContainer.querySelector(".slider__slide_current"),
        controlPrev = selector.querySelector(".slider__control_arrow_prev"),
        controlNext = selector.querySelector(".slider__control_arrow_next"),
        initialPoint = {},
        currentPoint = {},
        detection = false,
        swipeDetected = false;
    /**
     * Метод проверяет доступность пролистывания слайдера к указанной позиции
     * 
     * @method
     * @private
     * @description Проверяет, является ли текущий активный слайд первым или последним в списке слайдов и разрешает или запрещает прокрутку в случаях, когда пользователь отправляет команду пролестнуть слайдер назад или вперед соответственно.
     *
     * @param {number} direction - Направление смены слайда ("-1" - к предыдущему слайду; "1" - к следующему слайду)
     *
     * @return {boolean} - true (пролистывание разрешено) / false (запрещено)
     */
    function checkAccess(direction) {
        return ((direction == -1 && slidesContainer.firstElementChild == currentSlide) || (direction == 1 && slidesContainer.lastElementChild == currentSlide)) ? false: true;
    }
    /**
     * Метод отслеживает доступность кнопок управления слайдером
     * 
     * @method
     * @private
     * @description Деактивирует соответствующие кнопки последовательной смены слайдов, если текущий слайд является либо первым, либо последним. Активирует эти кнопки в случае, если условие не удовлетворяется.
     *
     * @return void
     */
    function controlTracking() {
        // Смена переключателей "stages"
        selector.querySelector(".stages__stage_active").classList.remove("stages__stage_active");
        selector.querySelectorAll(".stages__stage")[currentSlide.getAttribute("data-number") - 1].classList.add("stages__stage_active");        
    }
    /**
     * Внутренний метод смены слайда
     *
     * @method
     * @private
     * @description Смещает ленту слайдов в направлении и до слайда, указанных в параметрах вызова метода.
     *
     * @param {number} [direction = null] - Направление смены слайда ("-1" - к предыдущему слайду; "1" - к следующему слайду)
     * @param {number} [target = null] - Порядковый номер целевого слайда, к которому необходимо перейти
     *
     * @return bool
     */
    function slideTo(direction, target) {
        // Назначение параметрам метода значений по умолчанию
        direction = direction || null;
        target = target || null;
        // Выход из метода, если пролистывание в назначенную сторону не допустимо
        if (direction !== null && !checkAccess(direction)) return false;
        /**
         * Объявление локальных переменных метода
         *
         * @property {object} prev - Кнопка "Предыдущий слайд"
         * @property {object} next - Кнопка "Следующий слайд"
         */
        var viewportWidth = parseFloat(viewportStyle.width),
            currentSlideNumber = +currentSlide.getAttribute("data-number"),
            newSlideNumber = null,
            x = null;
        // Определение порядкового номера целевого слайда
        newSlideNumber = (direction !== null) ? (currentSlideNumber + direction) : (target !== null/* && target !== currentSlideNumber*/) ? target : null;
        // Выход из метода, если переменная "newSlideNumber" равна "null" или неопределена
        if (!newSlideNumber) return false;
        // Вычисление значения отступа с левого края для ленты слайдов
        x = (newSlideNumber - 1) * viewportWidth;
        // Назначение ленте слайдов отступа с левого края
        slidesContainer.style.transform = "translate(" + x * -1 + "px, 0)";
        slidesContainer.style.transform = "translate3d(" + x * -1 + "px, 0, 0)";
        // Удаление CSS-класса "slider__slide_current" у текущего слайда
        currentSlide.classList.remove("slider__slide_current");
        // Назначение статуса "текущий слайд" целевому слайду
        currentSlide = selector.querySelector(".slider__slide[data-number = '" + newSlideNumber + "']");
        // Добавление CSS-класса "slider__slide_current" новому текущему слайду
        currentSlide.classList.add("slider__slide_current");
        // Вызов метода отслеживания доступности кнопок управления слайдером
        controlTracking();
        // Выход из метода и возвращение логического значения успешного выполнения
        return true;
    }
    /**
     * Контроллер событий
     *
     * @method
     * @private
     * @description Получает объект события и назначает им соответствующую обработку.
     *
     * @param {object} event - Объект события
     *
     * @return void
     */
    function controller(event) {
        // Если целевой элемент имеет CSS-класс "slider__control", или является дочерним элементом элемента с CSS-классом "slider__control"
        if (event.target.classList.contains("slider__control") || parent(event.target, ".slider__control")) {
            // Отмена действия по умолчанию браузера на событие
            event.preventDefault();
            if (event.target.classList.contains("stages__stage_disable") || parent(event.target, ".stages__stage_disable") || event.target.classList.contains("stages__stage_active") || parent(event.target, ".stages__stage_active")) { return false; }
            var t = event.target,
                direction = +t.getAttribute("data-direction"),
                target = +t.getAttribute("data-target");
            // Вызывов метода перелистывания слайдов
            slideTo(direction, target);
        }
    }
    /**
     * Метод пересчитывает размеры конструкционных элементов слайдера
     * 
     * @method
     * @private
     * @description Получает значение ширины области просмотра сайдера и устанавливает полученное значение ширины в качестве ширины каждому из слайдов. Метод также расчитывает и устанавливает значение высоты области просмотра слайдера исходя из ее ширины и соотношения сторон, которое указывается в значении атрибута "data-content-ratio" корневого DOM-элемента слайдера.
     *
     * @return void
     */
    function redefinitionSizes() {
        /**
         * Объявление локальных переменных метода
         *
         * @property {number} viewportWidth - Ширина блока области просмотра слайдера
         * @property {number} viewportHeight - Высота блока области просмотра слайдера
         * @property {boolean} albumView - Флаг, указывающий альбомная ли ориентация у устройства
         */
        var viewportWidth = parseFloat(viewportStyle.width),
            viewportHeight = parseFloat(viewportStyle.height),
            albumView = (viewportWidth / viewportHeight > 1.5) ? true : false;
        // Добавление корневому элементу слайдера допольнительного описательного CSS-класса "slider_orientation_album"
        selector.classList.toggle("slider_orientation_album", albumView)
        // Назначние ширины блоку ленты сладов
        slidesContainer.style.width = 'auto';
        // Перебор слайдов в цикле
        for (var i = 0; i < slides.length; i++) {
            // Назначение ширины слайдам, равной ширине блока области просмотра
            slides[i].style.width = viewportWidth + "px";
        }
        // Установка высоты блоку области просмотра текущего слайдера в соответствии с указанным в атрибуте слайдера соотношением сторон (ширина/высота), если атрибут был указан
        if (Boolean(contentRatio)) {
            viewport.style.height = Math.round(viewportWidth * contentRatio) + "px";
        }
        // Корректировка позиции блока ленты сладов
        slideTo(null, (+currentSlide.getAttribute("data-number")));
    }
    /**
     * Конструктор класса
     *
     * @constructor
     * @param {array} selector - DOM-элемент на котором необходимо инициализировать объект
     *
     * @return void
     */
    function constructor(selector) {
        // Вызов приватного метода перерасчета размеров конструкционных элементов слайдера
        redefinitionSizes();
        // Назначение обработчика событию "click" по кнопкам управления слайдером, на стадии всплытия
        selector.addEventListener("click", controller, false);
        // Назначение обработчика события "on resize" окна браузера
        window.addEventListener("resize", redefinitionSizes);
    }
    // Вызов конструктора объекта
    constructor(selector);
}

/**
 * Объявление глобальных переменных
 *
 * @property {object} xhr - Экземпляр объекта "ajax"
 * @global
 */
var xhr = new ajax({
        url: "backend/cart.php",
        method: "get",
        success: function(result){
            /**
             * Объявление локальных переменных
             *
             * @property {object} xhrDataObtained - Объект события "XHR-данные получены"
             */
            var xhrDataObtained = new CustomEvent("xhrDataObtained", {
                    detail: JSON.parse(result)
                });
            // Отправка события о "xhrDataObtained" в общую систему событий
            document.dispatchEvent(xhrDataObtained);
        }
    });
// Назначение обработчика события "xhrDataObtained"
document.addEventListener("xhrDataObtained", function(event) {
    /**
     * Объявление локальных переменных
     *
     * @property {object} cartItems - Объект корзины товаров пользователя
     * @property {object} cartNotification - Блок уведомления
     */
    var cartItems = event.detail,
        cartNotification  = document.querySelector(".cart__items-count");
    // Скрытие Уведомления или смена количества товаров, в зависимости от результата XHR-запроса
    (cartItems.length == 0) ? cartNotification.style.display = "none" : cartNotification.innerHTML = cartItems.length;
});

/**
 * 
 */
function getOrderItems(orderItems) {
    //console.log(cartItems);

    // 
    var tpl = document.querySelector('.tpl_order-item');
    // 
    for (var i = 0, l = orderItems.length; i < l; i++) {
        /**
         *
         */
        var orderItem = orderItems[i],
            item = tpl.content.cloneNode(true),
            link = item.querySelectorAll("a"),
            img = item.querySelector("img");
        //
        for (var j = 0, k = link.length; j < k; j++) {
            link[j].setAttribute("href", orderItem.href);
        }
        //
        img.setAttribute("src", orderItem.photo);
        img.setAttribute("alt", orderItem.name);
        //
        item.querySelector(".order__item-name a").innerHTML = orderItem.name;
        item.querySelector(".order__item-extra-info").innerHTML = orderItem.extraInfo;
        item.querySelector(".order__item-quantity").innerHTML = "Quantity: " + orderItem.quantity;
        //
        item.querySelector(".order__item-total-price").innerHTML = "$" + (orderItem.quantity * orderItem.price);
        //
        tpl.parentNode.appendChild(item);
    }
}
/**
 *
 */
function calculateOrder(cartItems) {
    //
    var order = document.querySelector('.order__invoice'),
        subtotal = 0,
        shipping = 0,
        taxes = 0.03;
    //
    for (var i = 0, l = cartItems.length; i < l; i++) {
        subtotal += cartItems[i].quantity * cartItems[i].price;
    }
    taxes = subtotal * taxes;
    order.querySelector('.order__subtotal-sum').innerHTML = "$" + subtotal;
    order.querySelector('.order__shipping-sum').innerHTML = "$" + shipping;
    order.querySelector('.order__taxes-sum').innerHTML = "$" + (Math.ceil(taxes * 100)/100);
    order.querySelector('.order__total-sum').innerHTML = "$" + (subtotal + taxes);
}
// Назначение обработчика события "xhrDataObtained"
document.addEventListener("xhrDataObtained", function(event) {
    /**
     * Объявление локальных переменных
     *
     * @property {object} cartItems - Объект корзины товаров пользователя
     * @property {object} cartNotification - Блок уведомления
     */
    var cartItems = event.detail;
    // Скрытие Уведомления или смена количества товаров, в зависимости от результата XHR-запроса
    if (cartItems.length !== 0) {
        //
        getOrderItems(cartItems);
        //
        calculateOrder(cartItems);
    }
});

/**
 * Объявление глобальных переменных функции
 *
 * @global
 * @property {object} slider_forms - Экземпляр объекта "Слайдер форм"
 */
var slider_forms = new Slider(document.querySelector(".slider_forms"));
});