"use strict";
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
