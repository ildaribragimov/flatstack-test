"use strict";
/**
 * @property {object} sendMailForm - Экзепляр объекта "Accordion"
 * @public
 */
var form_shipping = new formValidator(document.querySelector('.form_shipping')),
    form_billing = new formValidator(document.querySelector('.form_billing')),
    form_payment = new formValidator(document.querySelector('.form_payment'));

/*
var customSelect = new CustomSelect({
    elem: "country-select",          // The id of the pseudo-select container
    result: "country-select-result", // The id of the hidden input field the selected option will be written into
    openSelect: false,             // [optional] Show the select opened or closed
    openClass: "b-select_open",    // [optional] CSS class of the opened select
    titleClass: "b-select__title"  // [optional] CSS class for select's main and always visible element
});
*/

$(function(){
    // Применение маски ввода для поля "Daytime Phone"
    $('.form__field[name="daytimePhone"]').mask("+7 (999) 999-99-99");
    // Применение маски ввода для поля "Card Number"
    $('.form__field[name="cardNumber"]').mask("9999 9999 9999 9999 9999");
    // Применение маски ввода для поля "Expire Date"
    $('.form__field[name="expireDate"]').mask("99 / 99");
});
