"use strict";
/**
 * Класс "Генерации замены стандартного елемента select на пользовательский"
 *
 * @class
 * @classdesc Ищет все элементы SELECT и заменяет их на пользовательскую конструкцию.
 *
 * @author Ildar Ibragimov <iibragimov84@gmail.com>
 * @copyright Ildar Ibragimov 2016
 */
(function CustomSelect() {
    /**
     * Метод поиска строки по списку вариантов пользовательского SELECT
     *
     * @method
     * @private
     * @description Получает значение поля "select__field" и ищет совпадения с значениями элементов списка вариантов пользовательского SELECT. Элементы с найденными совпадениями подсвечиваются цветом. Если совпадения не найдены поле поиска подсвечивается красным цветом
     *
     * @param {object} select - Объект пользовательского SELECT, по списку вариантов которого необходимо произвести поиск совпадений
     *
     * @return {array} result - Массив элементов списка, значения которых начинаются с значения поисковой строки
     */
    function _searchOption(select) {
        /**
         * Объявление локальных переменных метода
         *
         * @property {object} needle - Объект поля поиска по списку вариантов пользовательского SELECT
         * @property {string} needleValue - Значение поля поиска
         * @property {object} haystack - Коллекция элементов спискавыбора SELECT
         * @property {array} result - Массив элементов списка, значения которых начинаются с значения поисковой строки
         */
        var needle = select.querySelector(".select__field"),
            needleValue = needle.value,
            haystack = select.querySelectorAll(".select__option"),
            result = new Array;
        // Перебор коллекции вариантов выбора в цикле
        for (var i = 0, l = haystack.length; i < l; i++) {
            // Если элемент подходит по критерию поиска:
            if (haystack[i].dataset.value.substr(0, needleValue.length) == needleValue && needleValue != '') {
                // Добавление элементу CSS-класса "select__option_search-result"
                haystack[i].classList.add("select__option_search-result");
                // Добавление элемента в конец массива "result"
                result.push(haystack[i]);
            }
            // Иначе, если элемент не подходит по критерию поиска
            else {
                // Удаление у элемента CSS-класса "select__option_search-result"
                haystack[i].classList.remove("select__option_search-result");
            }
        }
        // Переключение CSS-класса списку вариантов, в зависисмости от результата поиска
        select.querySelector(".select__list").classList.toggle("select__list_filtered", result.length > 0);
        // Переключение CSS-класса визуального указания на отсутствие совпадений в результате поиска
        needle.classList.toggle("select__field_no-result", (result.length == 0 && needleValue.length > 0));
        // Возврат результата метода
        return result;
    }
    /**
     * Метод установки выбранного значения списка вариантов пользовательского SELECT в поле результата
     *
     * @method
     * @private
     * @description Получает в параметре вызова объект пользовательского SELECT, определяет значение выбранного элемента списка вариантов пользовательского SELECT и устанавливает полученное значение в поле результата выбора SELECT.
     *
     * @param {object} select - Объект пользовательского SELECT, выбранное значение которого необходимо установить в поле результата
     *
     * @return void
     */
    function _setSelectResult(select) {
        // Присвоение полю результата выбора SELECT значения выбранного элемента его списка выбора
        select.querySelector(".select__result").value = select.querySelector(".select__option_selected").dataset.value;
    }
    /**
     * Метод смены вариантов выбора SELECT
     *
     * @method
     * @private
     * @description Получает объект события и последовательно меняет текущее значение выбора на следеющее (предыдущее) по порядку у SELECT (на котором всплыло событие), в зависимости от направления смены вариантов.
     *
     * @param {object} event - Объект события
     *
     * @return void
     */
    function _changeOption(event) {
        /**
         * Объявление локальных переменных метода
         *
         * @property {object} select - Элемент, к которому привязан обработчик
         * @property {object} selected - Текущий выбранный элемент списка выбора SELECT
         * @property {object} first - Первый элемент списка выбора SELECT
         * @property {object} last - Последний элемент списка выбора SELECT
         */
        var select = parent(event.target, ".select"),
            selected = select.querySelector(".select__option_selected") || null,
            first = select.querySelector(".select__list").firstElementChild,
            last = select.querySelector(".select__list").lastElementChild;
        // Удаление CSS-класса "select__option_selected" у текущего выбранного элемента списка вариантов
        selected !== null && selected.classList.remove("select__option_selected");
        // Если тип события - "keydown"
        if (event.type == "keydown") {
            // Определение нового выбранного элемента списка вариантов
            selected = (event.keyCode > 38) ? ((selected === null || selected == last) ? first : selected.nextElementSibling) : ((selected === null || selected == first) ? last : selected.previousElementSibling);
        }
        // Если тип события - "click"
        if (event.type == "click") {
            selected = (event.target.classList.contains("select__option") && event.target) || parent(event.target, ".select__option");
        }
        // Добавление CSS-класса "select__option_selected" новому выбранному элемену списка вариантов
        selected.classList.add("select__option_selected");
        // Вызов метода установки нового значения выбора в поле результата выбора пользовательского SELECT
        _setSelectResult(select);
    }
    /**
     * Метод "_toggleSelect"
     *
     * @private
     * @description Раскрывает/Скрывает содержимое пользовательского SELECT. При раскрытии устанавливает фокус на поле поиска по списку вариантов, если параметр "Живой поиск" включен
     *
     * @param {object} select - Ссылка на объект польSELECT, которому необходимо привязать события
     *
     * @return void
     */
    function _toggleSelect(select) {
        var searchField = select.querySelector(".select__field");
        // Переключение CSS-класса корневому элементу пользовательского SELECT
        select.classList.toggle("select_open", !select.state);
        // Переключение значения статуса ("раскрыт/свернут") пользовательскому SELECT
        select.state = !select.state;
        // Сброс значения поля поиска SELECT
        searchField.value = '';
        // Уладение CSS-класса
        searchField.classList.remove("select__field_no-result");
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
    function _controller(event) {
        /**
         * Объявление локальных переменных метода
         *
         * @property {object} type - Тип вызванного события
         * @property {object} target - Элемент, который вызвал событие
         * @property {object} currentTarget - Элемент, к которому привязан обработчик
         * @property {object} relatedTarget - Предыдущий (следующий) элемент
         * @property {object} keys - Объект кодов клавиш, нажатие которых не блокируется
         */
        var type = event.type,
            target = event.target,
            currentTarget = event.currentTarget,
            relatedTarget = event.relatedTarget,
            keys = {
                9: 1, // 9 - "tab"
                13: 1, // 13 - "Enter"
                16: 1, // 16 - "Shift"
                17: 1, // 17 - "Ctrl"
                18: 1, // 18 - "Alt"
                37: 1, // 37 - Стрелка "Влево"
                38: 1, // 38 - Стрелка "Вверх"
                39: 1, // 39 - Стрелка "Вправо"
                40: 1, // 40 - Стрелка "Вниз"
                116: 1 // 116 - "F5"
            };
        // Обработка событий в зависисмости от типа
        switch (type) {
            // Если тип события - "click"
            case "click":
                /**
                 * Объявление локальных переменных
                 *
                 * @property {object} openSelect - Развернутый SELECT
                 * @property {object} select - Текущий SELECT
                 */
                var openSelect = document.querySelector(".select_open"),
                    select = target.classList.contains("select") || parent(target, ".select");
                // Если клик был по другому пользовательскому SELECT, либо не по элементу SELECT
                if (openSelect && (!select || openSelect != select)) {
                    // Сворачивание пользовательского SELECT
                    _toggleSelect(openSelect);
                }
                // Если клик был в пределах SELECT:
                if (select) {
                    /**
                     * Объявление локальных переменных
                     *
                     * @property {object} content - Раскрывающееся содержимое SELECT
                     * @property {object} list - Список вариантов выбора
                     * @property {object} search - Блок формы поиска по списку вариантов выбора
                     * @property {object} searchField - Поле поиска SELECT
                     */
                    var content = target.classList.contains("select__content") || parent(target, ".select__content"),
                        list = target.classList.contains("select__list") || parent(target, ".select__list"),
                        search = target.classList.contains("select__search") || parent(target, ".select__search"),
                        searchField = select.querySelector(".select__search .select__field");
                    // Отмена действий браузера по умолчанию на событие
                    event.preventDefault();
                    // Если клик был не по полю поиска:
                    if (!search) { 
                        // Сворачивание/Разворачивание пользовательского SELECT
                        _toggleSelect(select);
                    }
                    // Если клик был не в области раскрывающегося содержимого SELECT:
                    if (!content) {
                        // Передача фокуса полю поиска по списку вариантов SELECT, если поле поиска найдено
                        searchField && searchField.focus();
                    }
                    // Если клик был в области списка вариантов выбора SELECT:
                    if (list) {
                        // Вызов метода смены варианта выбора SELECT
                        _changeOption(event);
                        // Передача фокуса полю результата выбора SELECT
                        select.querySelector(".select__result").focus();
                    }
                }
                // Прерывание выполнения и выход из конструкции "switch"
                break;
            // Если тип события - "keydown"
            case "keydown":
                // Если ввод происходит в поле результата выбора SELECT:
                if (target.classList.contains("select__result")) {
                    // Если пользователь нажимает клавиши стрелок "влево", "вверх", "вправо" или "вниз":
                    if (event.keyCode >= 37 && event.keyCode <= 40) {
                        // Вызов метода смены варианта выбора SELECT
                        _changeOption(event);
                    }
                    // Если пользователь нажимает на клавиши, коды которых не присутствуют в массиве не блокируемых клавиш:
                    if (!keys[event.keyCode]) {
                        // Отмена действия по умолчанию браузера на событие
                        event.preventDefault();
                        // Разворачивание содержимого пользовательского SELECT
                        _toggleSelect(currentTarget);
                        // Установка фокуса полю поиска по списку вариантов
                        currentTarget.querySelector(".select__search .select__field").focus();
                    }
                }
                // Прерывание выполнения и выход из конструкции "switch"
                break;
            case "keyup":
                // Если ввод происходит в поле поиска SELECT:
                if (target.classList.contains("select__field")) {
                    // Если пользователь нажимает на клавиши, коды которых не присутствуют в массиве не блокируемых клавиш:
                    if (!keys[event.keyCode]) {
                        // Вызов метода поиска подходящих вариантов выбора SELECT
                        _searchOption(currentTarget);
                    }
                }
                // Прерывание выполнения и выход из конструкции "switch"
                break;
        }
    }
    /**
     * Метод "_getLiveSearch"
     *
     * @private
     * @description Получает в параметре вызова js-объект пользовательского SELECT и создаёт HTML-конструкцию формы "живого" поиска по списку вариантов выбора
     *
     * @param {object} select - Ссылка на js-объект SELECT, для которого необходимо создать форму
     *
     * @return {object} search - Объект HTML-конструкции формы "живого" поиска
     */
    function _getLiveSearch(select) {
        /**
         * Объявление локальных переменных метода
         *
         * @property {object} search - блок с формой "живого" поиска
         * @property {object} field - Поле поиска по списку вариантов выбора
         * @property {object} icon - Иконка поля поиска
         */
        var search = document.createElement('div'),
            field = document.createElement('input'),
            icon = document.createElement('span');
        // Добавление элементу "field" атрибутов "type", "class", "data-starting-value", "autocomplete"
        field.setAttribute("type", "text");
        field.setAttribute("class", "select__field");
        field.setAttribute("data-starting-value", "");
        field.setAttribute("autocomplete", "off");
        // Добавление элементу "icon" атрибута "class"
        icon.setAttribute("class", "select__icon icon icon_search icon_size_x16 select__icon_search");
        // Добавление элементу "search" атрибута "class"
        search.setAttribute("class", "select__search");
        // Вставка формы "живого" поиска и иконки "поиск" в блок
        search.appendChild(field);
        search.appendChild(icon);
        // Возврат объекта блока с формой "живого" поиска
        return search;
    }
    /**
     * Метод "_getOptions"
     *
     * @private
     * @description Получает в параметре вызова массив объектов OPTION и создаёт HTML-конструкцию списка вариантов выбора для пользовательского SELECT
     *
     * @param {array} options - Ссылка на массив объектов OPTION
     *
     * @return {object} list - Объект HTML-конструкции списка вариантов выбора для пользовательского SELECT
     */
    function _getOptions(options) {
        /**
         * Объявление локальных переменных метода
         *
         * @property {object} list - Список выбора вариантов "UL"
         * @property {object} itemTpl - Элемент списка "LI"
         */
        var list = document.createElement('ul'),
            itemTpl = document.createElement('li');
        // Добавление элементу "list" атрибута "class"
        list.setAttribute("class", "select__list");
        // Добавление элементу "itemTpl" атрибута "class"
        itemTpl.setAttribute("class", "select__option");
        // Перебор коллекции элементов списка "options" в цикле
        for (var i = 0, l = options.length; i < l; i++) {
            /**
             * Объявление локальных переменных
             *
             * @property {object} item - Клон объекта элемента списка "LI"
             */
            var item = itemTpl.cloneNode(true);
            // Вставка содержимого элемента списка
            item.innerHTML = options[i].content;
            // Добавление элементу списка атрибута "data-value"
            item.setAttribute("data-value", options[i].value);
            // Вставка элемента списка в конец списка выбора вариантов "UL"
            list.appendChild(item);
        }
        // Возврат объекта списка вариантов выбора для пользовательского SELECT
        return list;
    }
    /**
     * Метод "_createSelect"
     *
     * @private
     * @description Получает в параметре вызова js-объект и создаёт на его основе HTML-конструкцию пользовательского SELECT
     *
     * @param {object} select - Ссылка на js-объект SELECT, для которого необходимо создать пользовательскую версию
     *
     * @return {object} newSelect - Объект HTML-конструкции пользовательского SELECT
     */
    function _createSelect(select) {
        /**
         * Объявление локальных переменных метода
         *
         * @property {object} newSelect - Корневой DOM-элемент пользовательского SELECT
         * @property {object} selectContent - Раскрывающееся содержимое пользовательского SELECT
         * @property {object} result - Поле с результатом выбора пользовательского SELECT
         * @property {object} icon - Иконка поля результата выбора пользовательского SELECT
         */
        var newSelect = document.createElement('div'),
            selectContent = document.createElement('div'),
            result = document.createElement('input'),
            icon = document.createElement('span');
        // Добавление элементу "selectContent" атрибута "class"
        selectContent.setAttribute("class", "select__content");
        // Вставка списка вариантов выбора для пользовательского SELECT
        selectContent.appendChild(_getOptions(select.options));
        // Вставка формы "живого" поиска по списку вариантов пользовательского SELECT, если параметр "Живой поиск" включен
        select.search && selectContent.appendChild(_getLiveSearch(select));
        // Добавление элементу "result" атрибутов "class", "name", "type", "placeholder", "data-starting-value", "autocomplete"
        result.setAttribute("class", "select__result");
        result.setAttribute("name", select.name);
        result.setAttribute("type", "text");
        result.setAttribute("placeholder", select.placeholder);
        result.setAttribute("data-starting-value", "");
        result.setAttribute("autocomplete", "off");
        // Добавление элементу "icon" атрибута "class"
        icon.setAttribute("class", "select__icon select__icon_arrow-down");
        // Добавление элементу "newSelect" атрибута "class"
        newSelect.setAttribute("class", "form__select select");
        // Вставка в конструкцию пользовательского SELECT раскрываемого содержимого, поля результата выбора и иконки "стрелка"
        newSelect.appendChild(selectContent);
        newSelect.appendChild(result);
        newSelect.appendChild(icon);
        // Возврат объекта созданного SELECT
        return newSelect;
    }
    /**
     * Конструктор класса
     *
     * @constructor
     *
     * @return void
     */
    function _constructor() {
        /**
         * Объявление локальных переменных метода
         *
         * @property {object} selects - Коллекция элементов SELECT
         * @property {array} customSelects - Массив объектов SELECT, для дальнейшей кастомизации
         */
        var selects = document.querySelectorAll("select"),
            customSelects = new Array;
        // Перебор коллекции в цикле
        for (var i = 0, l = selects.length; i < l; i++) {
            /**
             * Объявление локальных переменных в контексте текущего цикла
             *
             * @property {object} options - Коллекция элементов OPTION текущего SELECT
             * @property {array} customOptions - Массив объектов OPTION, для дальнейшей кастомизации
             */
            var options = selects[i].querySelectorAll("option:not([value = 'placeholder'])"),
                customOptions = new Array;
            // Обход коллекции в цикле
            for (var j = 0, k = options.length; j < k; j++) {
                // Создание объекта OPTION
                customOptions[j] = {
                    // Содержимое OPTION
                    content: options[j].innerHTML,
                    // Значение, передаваемое на сервер
                    value: options[j].getAttribute("value")
                };
            }
            // Сортировка массива объектов OPTION по свойству "content" по алфавиту по возрастанию
            customOptions.sort(function (a, b) {
                return (a.content > b.content) ? 1 : ((a.content < b.content) ? -1 : 0);
            });
            // Созданеи объекта "Сustom Select"
            customSelects[i] = {
                // Непосредственный DOM-элемент родитель текущего SELECT
                parent: selects[i].parentElement,
                // Значение атрибута "name"
                name: selects[i].getAttribute("name"),
                // Опция "живой поиск по списку OPTIONS" (true - поиск включен, false - поиск выключен)
                search: selects[i].classList.contains("select_live"),
                // Свойство "поле обязательно для заполнения" (true - обязательно, false - не обязательно)
                required: selects[i].getAttribute("required"),
                // Значение подсказывающего текста
                placeholder: selects[i].querySelector("option[value = 'placeholder']").innerHTML,
                // Массив объектов OPTIONS текущего SELECT
                options: customOptions,
                // Состояние SELECT (true - раскрыт, false - скрыт)
                state: false
            };
            // Создание пользовательского SELECT
            var customSelect = _createSelect(customSelects[i]);
            // Назначение обработчиков событий, вызываемых на элементах блоков пользовательских SELECT
            document.addEventListener("click", _controller);
            customSelect.addEventListener("keydown", _controller);
            customSelect.addEventListener("keyup", _controller);
            // Замена страндартной конструкции SELECT на пользовательскую версию
            selects[i].parentElement.replaceChild(customSelect, selects[i])
        }
    }
    // Вызов конструктора объекта
    _constructor();
})();
