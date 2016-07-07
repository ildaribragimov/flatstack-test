"use strict";
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
