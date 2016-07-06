<?php
// Имя до выходного файла
$outputFileName = "styles.css";
// Путь до выходного файла
$outputFilePath = "/css/system/";

// Подключение файла опций загрузки
include_once $_SERVER['DOCUMENT_ROOT']."/_tools/collector/collector.php";

// Создание экземпляра объекта "Сборщика"
$cssBundle = new Collector("css", $config);
// Вызов метода "Создать Сборку" объекта "Сборщика"
$cssBundle->createBundle($outputFilePath, $outputFileName);

echo '<link href="'.$outputFilePath.$outputFileName.'" rel="stylesheet" type="text/css">';
?>
