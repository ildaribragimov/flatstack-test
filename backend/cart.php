<?php
/**
 * Скрипт отвечающий на XHR-запрос об содержимом корзины пользователя.
 * Скрипт типовой, необходим лишь для демонстрации реализации логики работы клиентской стороны
 *
 * Оборачивая в комментарии элементы массива можно имитировать результат запроса в БД на Бэкэнде
 */
$cartItems = array(
    array(
        id => "001",
        name => "The Chelsea Boot",
        href => "/001",
        photo => "/media/products/001/001_1x.png",
        extraInfo => "Black",
        price => 235,
        quantity => 1
    ),
    array(
        id => "023",
        name => "The Twill Snap Backpack",
        href => "/023",
        photo => "/media/products/023/023_1x.png",
        extraInfo => "Reverse Denim + Brown leather",
        price => 65,
        quantity => 1
    ),
    array(
        id => "037",
        name => "The Twill Zip Tote",
        href => "/037",
        photo => "/media/products/037/037_1x.png",
        extraInfo => "Reverse Denim + Black leather",
        price => 48,
        quantity => 1
    )
);
echo json_encode($cartItems);
?>