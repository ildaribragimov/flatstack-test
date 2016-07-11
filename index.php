<!DOCTYPE html>
<html lang="ru">
    <head>
		<meta name="viewport" content="width=device-width, initial-scale=0.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />
		<meta charset="utf-8">
        <title>Front-end Developer Test Task</title>
        <link rel="icon" href="/img/system/favicon.ico" type="image/x-icon">
        <?php
            // Сборка и подключение базовых CSS-стилей
            include_once "css/system/styles.php";
        ?>
    </head>
    <body class="page">
        <div class="page__wrapper">
            <div class="page__content">
                <div class="order__placement clr">
                    <?php
                        // Вставка блока спецификации заказа
                        include_once "includes/orderInvoice.php";
                        // Вставка блока формы оформления заказа
                        include_once "includes/orderForm.php";
                    ?>
                </div>
            </div>
        </div>
        <?php
            // Вставка верхней пенели навигации
            include "includes/topPannel.php";
        ?>
        <?php
            // Сборка и подключение базовых js-скриптов
            include_once "js/scripts.php";
        ?>
    </body>
</html>