"use strict";
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
