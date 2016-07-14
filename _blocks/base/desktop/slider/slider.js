"use strict";
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
