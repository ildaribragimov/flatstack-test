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
function parent(a,b){var c=a,d=document.querySelectorAll(b);while(c!=null){c=c.parentNode;var i=getIndex(c,d);if(i!==false){return d[i];}}return false;};/*
    jQuery Masked Input Plugin
    Copyright (c) 2007 - 2015 Josh Bush (digitalbush.com)
    Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
    Version: 1.4.1
*/
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b,c=navigator.userAgent,d=/iphone/i.test(c),e=/chrome/i.test(c),f=/android/i.test(c);a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},a.fn.extend({caret:function(a,b){var c;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof a?(b="number"==typeof b?b:a,this.each(function(){this.setSelectionRange?this.setSelectionRange(a,b):this.createTextRange&&(c=this.createTextRange(),c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select())})):(this[0].setSelectionRange?(a=this[0].selectionStart,b=this[0].selectionEnd):document.selection&&document.selection.createRange&&(c=document.selection.createRange(),a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length),{begin:a,end:b})},unmask:function(){return this.trigger("unmask")},mask:function(c,g){var h,i,j,k,l,m,n,o;if(!c&&this.length>0){h=a(this[0]);var p=h.data(a.mask.dataName);return p?p():void 0}return g=a.extend({autoclear:a.mask.autoclear,placeholder:a.mask.placeholder,completed:null},g),i=a.mask.definitions,j=[],k=n=c.length,l=null,a.each(c.split(""),function(a,b){"?"==b?(n--,k=a):i[b]?(j.push(new RegExp(i[b])),null===l&&(l=j.length-1),k>a&&(m=j.length-1)):j.push(null)}),this.trigger("unmask").each(function(){function h(){if(g.completed){for(var a=l;m>=a;a++)if(j[a]&&C[a]===p(a))return;g.completed.call(B)}}function p(a){return g.placeholder.charAt(a<g.placeholder.length?a:0)}function q(a){for(;++a<n&&!j[a];);return a}function r(a){for(;--a>=0&&!j[a];);return a}function s(a,b){var c,d;if(!(0>a)){for(c=a,d=q(b);n>c;c++)if(j[c]){if(!(n>d&&j[c].test(C[d])))break;C[c]=C[d],C[d]=p(d),d=q(d)}z(),B.caret(Math.max(l,a))}}function t(a){var b,c,d,e;for(b=a,c=p(a);n>b;b++)if(j[b]){if(d=q(b),e=C[b],C[b]=c,!(n>d&&j[d].test(e)))break;c=e}}function u(){var a=B.val(),b=B.caret();if(o&&o.length&&o.length>a.length){for(A(!0);b.begin>0&&!j[b.begin-1];)b.begin--;if(0===b.begin)for(;b.begin<l&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}else{for(A(!0);b.begin<n&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}h()}function v(){A(),B.val()!=E&&B.change()}function w(a){if(!B.prop("readonly")){var b,c,e,f=a.which||a.keyCode;o=B.val(),8===f||46===f||d&&127===f?(b=B.caret(),c=b.begin,e=b.end,e-c===0&&(c=46!==f?r(c):e=q(c-1),e=46===f?q(e):e),y(c,e),s(c,e-1),a.preventDefault()):13===f?v.call(this,a):27===f&&(B.val(E),B.caret(0,A()),a.preventDefault())}}function x(b){if(!B.prop("readonly")){var c,d,e,g=b.which||b.keyCode,i=B.caret();if(!(b.ctrlKey||b.altKey||b.metaKey||32>g)&&g&&13!==g){if(i.end-i.begin!==0&&(y(i.begin,i.end),s(i.begin,i.end-1)),c=q(i.begin-1),n>c&&(d=String.fromCharCode(g),j[c].test(d))){if(t(c),C[c]=d,z(),e=q(c),f){var k=function(){a.proxy(a.fn.caret,B,e)()};setTimeout(k,0)}else B.caret(e);i.begin<=m&&h()}b.preventDefault()}}}function y(a,b){var c;for(c=a;b>c&&n>c;c++)j[c]&&(C[c]=p(c))}function z(){B.val(C.join(""))}function A(a){var b,c,d,e=B.val(),f=-1;for(b=0,d=0;n>b;b++)if(j[b]){for(C[b]=p(b);d++<e.length;)if(c=e.charAt(d-1),j[b].test(c)){C[b]=c,f=b;break}if(d>e.length){y(b+1,n);break}}else C[b]===e.charAt(d)&&d++,k>b&&(f=b);return a?z():k>f+1?g.autoclear||C.join("")===D?(B.val()&&B.val(""),y(0,n)):z():(z(),B.val(B.val().substring(0,f+1))),k?b:l}var B=a(this),C=a.map(c.split(""),function(a,b){return"?"!=a?i[a]?p(b):a:void 0}),D=C.join(""),E=B.val();B.data(a.mask.dataName,function(){return a.map(C,function(a,b){return j[b]&&a!=p(b)?a:null}).join("")}),B.one("unmask",function(){B.off(".mask").removeData(a.mask.dataName)}).on("focus.mask",function(){if(!B.prop("readonly")){clearTimeout(b);var a;E=B.val(),a=A(),b=setTimeout(function(){B.get(0)===document.activeElement&&(z(),a==c.replace("?","").length?B.caret(0,a):B.caret(a))},10)}}).on("blur.mask",v).on("keydown.mask",w).on("keypress.mask",x).on("input.mask paste.mask",function(){B.prop("readonly")||setTimeout(function(){var a=A(!0);B.caret(a),h()},0)}),e&&f&&B.off("input.mask").on("input.mask",u),A()})}})});
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
 * Класс "Форма отправки e-mail"
 *
 * @class
 * @classdesc Проверяет данные полей формы на допустимость значений и отправляет форму на сервер
 *
 * @param {object} form - Ссылка на объект формы, которую необходимо предварительно проверить перед отправкой
 *
 * @author Ildar Ibragimov <iibragimov84@gmail.com>
 * @copyright Ildar Ibragimov 2016
 */
function formValidator(form) {
    /**
     * @property {collection} buttons - Коллекция только кнопок формы
     * @property {collection} fields - Коллекция элементов (не кнопок) формы
     */
    var buttons = form.querySelectorAll('.form__element_button'),
        fields = form.querySelectorAll(':not(.form__element_button) .form__field');
    /**
     * Метод проверяет пуста ли форма
     *
     * @return {boolean} false/true - "ДА" / "НЕТ"
     * 
     * @description Вспомогательный внутренний метод. Проверяет, если ли хотя бы одно незаполненное поле. Возвращает "ДА", если форма имеет хотя бы одно незаполненное поле; "НЕТ", Если форма заполнена полностью.
     */
    function isFormEmpty() {
        // Обход коллеции объектов в массиве
        for (var f = 0; f < fields.length; f++) {
            // Если тип элемента формы - captcha
            if ( ~fields[f].name.toLowerCase().indexOf('captcha') ) {
                // Прерывание выполнения текущей итерации и переход к следующей итерации
                continue;
            }
            // Если содержимое элемента формы пустое
            if ( (fields[f].value == '' || fields[f].value == fields[f].dataset.startingValue) && fields[f].hasAttribute('required') ) {
                // Возвращение результата "Да, форма либо пуста, либо не все элементы заполнены"
                return true;
            }
        }
        // Возвращение результата "Нет, форма заполнена полностью"
        return false;
    }
    /**
     * Метод активирует/деактивирует кнопки действий формы
     *
     * @param {boolean} state - Статус доступности кнопок действий формы
     * @return void
     *
     * @description Вспомогательный внутренний метод. Проверяет, текущее состояние доступности кнопок формы и Активирует/Деактивирует их в зависимости от готовности формы к проверке содержимого. Устанавливает состояние "true", если кнопки доступны или false, если кнопки не доступны.
     */
    function enableFormActions(state) {
        // Обход коллекции кнопок действий в цикле
        for ( var b = 0; b < buttons.length; b++ ) {
            // Переключаем атрибут "disabled" в завсисимости от готовности формы к проверке
            ( state )
                ? buttons[b].removeAttribute('disabled')
                : buttons[b].setAttribute('disabled','')
        }
    }
    /**
     * Метод проверяет значения поля формы на допустимость и валидность
     *
     * @return {object} result - Объект системных сообщений о результатах проверки
     */
    function checkFormData() {
        // Объявление переменных:
        var logMsgs = [], // Массив сообщений об ошибках
            result = {
                type: 'success',
                report: ['Проверка данных прошла успешно!']
            };
        // Обход коллеции объектов в массиве
        for (var f = 0; f < fields.length; f++) {
            // Объявление переменных:
            var tagName = fields[f].tagName.toLowerCase(), // Название тега элемента формы
                name = fields[f].name, // Значение атрибута "name" элемента формы
                type = fields[f].type, // Значение атрибута "type" элемента формы
                value = fields[f].value.trim(); // Содержимое элемента формы
            // Если тип элемента формы - captcha
            if ( ~name.toLowerCase().indexOf('captcha') ) {
                // Если содержимое элемента формы не пустое
                if ( value != '' ) {
                    // Формирование сообщения об ошибке
                    logMsgs[f] = 'Ошибка идентификации!';
                    // Прерывание выполнения цикла, выход из цикла
                    break;
                }
                // Прерывание выполнения текущей итерации и переход к следующей итерации
                continue;
            }
            // Если содержимое элемента формы пустое
            if ( value == '' ) {
                // Формирование сообщения об ошибке
                logMsgs[f] = 'Поле не должно быть пустым!';
                // Прерывание выполнения текущей итерации и переход к следующей итерации
                continue;
            }
            // Проверка (по значнию атрибута "name") содержимого элемента формы на соответствие присвоенному типу поля
            switch ( name ) {
                case 'name':
                    // Формирование регулярного выражения (только буквы русского и латинского алфавита и пробелы) для поиска совпадений
                    var regExp = /(^[а-яА-ЯёЁa-zA-Z\s]*$)/i;
                    // Если совпадения найдены
                    if ( regExp.exec(value) == null) {
                        // Формирование сообщения об ошибке
                        logMsgs[f] = 'Имя должно состоять только из букв русского или латинского алфавита!';
                    }
                    // Прерывание выполнения конструкции "switch"
                    break;
                case 'cardholderName':
                    // Формирование регулярного выражения (только заглавные буквы латинского алфавита и пробелы) для поиска совпадений
                    var regExp = /(^[A-Z\s]*$)/i;
                    // Если совпадения найдены
                    if ( regExp.exec(value) == null) {
                        // Формирование сообщения об ошибке
                        logMsgs[f] = 'Имя владельца карты должно быть введено в точности как указано на карте!';
                    }
                    // Прерывание выполнения конструкции "switch"
                    break;
                case 'email':
                    // Формирование регулярного выражения (только буквы латинского алфавита, цифры, знаки "-", "_", "@") для поиска совпадений
                    var regExp = /(^([a-z0-9]+[-._]{0,1})+@([a-z0-9]+[-._]{0,1})+\.+[a-z]{2,8}$)/i;
                    // Если совпадения найдены
                    if ( regExp.exec(value) == null) {
                        // Формирование сообщения об ошибке
                        logMsgs[f] = 'E-mail указан не верно!';
                    }
                    // Прерывание выполнения конструкции "switch"
                    break;
                case 'phone':
                    // Формирование регулярного выражения (только цифры, пробелы, знаки "(", ")", "-", "+") для поиска совпадений
                    var regExp = /(\+?[7,8][\s\-{1}]?[\({1}]?\d{3,6}[\){1}]?[\s\-{1}]?\d{1,3}[\s\-{1}]?\d{2}[\s\-{1}]?\d{2}\b)/;
                    // Если совпадения найдены ИЛИ длина значения поля меньше 6 символов
                    if ( regExp.exec(value) == null ) {
                        // Формирование сообщения об ошибке
                        logMsgs[f] = 'Номер телефона указан не верно!';
                    }
                    // Прерывание выполнения конструкции "switch"
                    break;
                case 'zip':
                case 'securityCode':
                    // Формирование регулярного выражения (только целые числа) для поиска совпадений
                    var regExp = /(^[0-9]*$)/;
                    // Если совпадения найдены
                    if ( regExp.exec(value) == null) {
                        // Формирование сообщения об ошибке
                        if (name = "zip") logMsgs[f] = 'Индекс должен состоять только из цифр!';
                        if (name = "securityCode") logMsgs[f] = 'Код безопасности должен состоять только из цифр!';
                    }
                    // Прерывание выполнения конструкции "switch"
                    break;
                case 'cardNumber':
                    // Формирование регулярного выражения (только целые числа и пробелы) для поиска совпадений
                    var regExp = /(^[0-9\s]*$)/;
                    // Если совпадения найдены
                    if ( regExp.exec(value) == null) {
                        // Формирование сообщения об ошибке
                        logMsgs[f] = 'Номер карты должен состоять только из цифр!';
                    }
                    // Прерывание выполнения конструкции "switch"
                    break;
                case 'expireDate':
                    // Формирование регулярного выражения (только целые числа, пробелы и символ "/") для поиска совпадений
                    var regExp = /(\d{2}[\s{1}]?[\/{1}][\s{1}]?\d{2})/,
                        arr = value.split(" / "),
                        today = new Date(),
                        year = today.getFullYear().toString();
                    // Если совпадения найдены
                    if ( regExp.exec(value) == null || arr[0] > 12 || arr[1] < year.substr(year.length - 2)) {
                        // Формирование сообщения об ошибке
                        logMsgs[f] = 'Формат срока действия карты введен не корректно!';
                    }
                    // Прерывание выполнения конструкции "switch"
                    break;
                case 'message':
                    // Формирование регулярного выражения (любые символы кроме руссих букв и пробела) для поиска совпадений
                    var regExp = /([\<\>]|script|style)/i;
                    // Если совпадения найдены
                    if ( regExp.exec(value) !== null) {
                        // Формирование сообщения об ошибке
                        logMsgs[f] = 'Вводите только текст! HTML-теги недопустимы!';
                    }
                    // Прерывание выполнения конструкции "switch"
                    break;
                default:
                    // Прерывание выполнения конструкции "switch"
                    break;
            }
        }
        // Если массив сообщений об ошибках не пустой
        if ( logMsgs.length > 0 ) {
            result.type = 'fail';
            result.report = logMsgs;
        }
        // Возвращение результата проверки
        return result;
    }

    // Вызов метода деактивации кнопок действий формы, если содержимое хотя бы одного элемента формы пустое
    enableFormActions( !isFormEmpty() );

    // Назначение обработчика события отправки формы на сервер
    form.addEventListener("submit", function(event) {
        var checkResult = checkFormData();
        // Если проверка данных формы вернула ошибку в данных
        if ( checkResult.type == 'fail' ) {
            console.log(checkResult.report);
            //alert ('Данные формы НЕ корректны!');
            // Отмена действия по умолчанию браузера на событие
            event.preventDefault();
        } else {
            // Здесь вызываем методы, формирующие дополнитеьльные данные для проверки пользователя по тестам Тьюринга на сервере
        }
    });

    // Назначение обработчиков событий изменения содержимого элементов формы
    for (var f = 0; f < fields.length; f++) {
        // Если тип элемента формы - captcha
        if ( ~fields[f].name.toLowerCase().indexOf('captcha') ) {
            // Прерывание выполнения текущей итерации и переход к следующей итерации
            continue;
        }
        // Назначение обработчика событий "onkeyup", "oninput", "onchange" 
        fields[f].onkeyup = fields[f].oninput = fields[f].onchange = function () {
            // Вызов метода проверки заполненности всех полей формы с последующей активацией/деактивацией кнопок действий формы
            enableFormActions( !isFormEmpty() );
        };
        // Назначение обработчика событий "onchange" для IE 8-
        fields[f].onpropertychange = function() {
            // Если имя изменённого свойства (атрибута) - "value"
            if (event.propertyName == "value") {
                // Вызов метода проверки заполненности всех полей формы с последующей активацией/деактивацией кнопок действий формы
                enableFormActions( !isFormEmpty() );
            }
        };
        // Назначние обработчика события "oncut"
        fields[f].oncut = function() {
            // Вызов метода проверки заполненности всех полей формы с последующей активацией/деактивацией кнопок действий формы
            setTimeout( enableFormActions( !isFormEmpty() ), 0); // на момент oncut значение еще старое
        };
        // Назначение обработчика событий "onfocus", "onblur"
        fields[f].onfocus = fields[f].onblur = function(event) {
            var field = event.target;
            if (field.dataset.startingValue) {
                switch (event.type) {
                    case 'focus':
                        if (field.value == '') {
                            field.value = field.dataset.startingValue;
                        }
                        // Прерывание выполнения конструкции "switch"
                        break;
                    case 'blur':
                        if (field.value == field.dataset.startingValue) {
                            field.value = '';
                        }
                        // Прерывание выполнения конструкции "switch"
                        break;
                }
            }
        };
    }
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

/**
 * @property {object} sendMailForm - Экзепляр объекта "Accordion"
 * @public
 */
var form_shipping = new formValidator(document.querySelector('.form_shipping')),
    form_billing = new formValidator(document.querySelector('.form_billing')),
    form_payment = new formValidator(document.querySelector('.form_payment'));

$(function(){
    // Применение маски ввода для поля "Daytime Phone"
    $('.form__field[name="daytimePhone"]').mask("+7 (999) 999-99-99");
    // Применение маски ввода для поля "Card Number"
    $('.form__field[name="cardNumber"]').mask("9999 9999 9999 9999 9999");
    // Применение маски ввода для поля "Expire Date"
    $('.form__field[name="expireDate"]').mask("99 / 99");
});
});