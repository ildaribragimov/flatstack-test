"use strict";
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
