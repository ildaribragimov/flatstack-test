<?php
// Подключение файла опций загрузки
include_once dirname(__FILE__)."/"."config.php";

/**
 * Класс сборщика файлов
 *
 * @version 1.0
 *
 * @author Ildar Ibragimov <iibragimov84@gmail.com>
 * @copyright Ildar Ibragimov, 2016 
 *
 * @method void setProperty(string $name, string $value) Переопределяет значение свойству объекта
 * @method string getFilesContents($files, $initialString, $finalString) Читает содержимое файлов, объединяет его и записывает в переменную
 * @method string getFileContent($file) Читает и фозвращает содержимое файла, если он существует
 * @method boolean compareFiles($file1, $file2) Сравнивает MD5-хэш содержимого двух файлов
 * @method void createBundle($outputFilePath, $outputFileName) Создает файл сборки
 */
class Collector
{
    protected $filesType    = null;
    protected $config       = null;
    /**
     * Конструктор Класса
     *
     * @constructor
     * @param string $filesType - Тип файлов, которые необходимо собрать
     * @param array $config - Массив опций сборщика
     *
     * @return void
     */
    function __construct ($filesType, $config)
    {
        // Установка значений свойствам класса
        $this->setProperty("filesType", $filesType);
        $this->setProperty("config", $config);
    }
    /**
     * Метод переопределяет значение свойства объекта
     *
     * @param string $name - Имя переопределяемого свойства объекта
     * @param string $value - Значение свойства объекта
     *
     * @return void
     */
    protected function setProperty($name, $value)
    {
        $this->$name = $value;
    }
    /**
     * Метод читает содержимое файлов, объединяет его и записывает в переменную
     *
     * @param array $files - Массив файлов, которые необходимо собрать в сборку
     * @param string $initialString - Начальная строка
     * @param string $finalString - Конечная строка
     *
     * @return string $fileContent - Итоговое содержимое файла сборки
     */
    protected function getFilesContents($files, $initialString = null, $finalString = null) {
        // Обход массива файлов в цикле
        foreach ($files as $value) {
            // получает содержимое файла в строку
            $file = $this->config["root"].$value;
            $fileSize = filesize($file);
            if ($fileSize > 0) {
                $handle = fopen($file, "r");
                $fileContent .= fread($handle, $fileSize);
                fclose($handle);
            }
        }
        if (strstr($this->filesType, "js")) {
            $fileContent = str_replace('"use strict";', '', $fileContent);
        }
        // Добавление конечной строки
        return $initialString.$fileContent.$finalString;
    }
    /**
     * Метод читает и фозвращает содержимое файла, если он существует
     *
     * @param string $file - Путь до файла (включая его имя), содержимое которого необходимо получить
     *
     * @return string - Содержимое файла
     */
    protected function getFileContent($file) {
        // Проверяем наличие указанного файла
        if (file_exists($file)) {
            // Получаем содержимое файла в виде строки
            return file_get_contents($file);
        }
        return false;
    }
    /**
     * Метод сравнивает MD5-хэш содержимого двух файлов
     *
     * @param string $file1 - Содержимое первого файла
     * @param string $file2 - Содержимое второго файла
     *
     * @return boolean "true" (если файлы идертичны), "false" (если файлы не идентичны)
     */
    protected function compareFiles($file1, $file2) {
        return md5($file1) == md5($file2);
    }
    /**
     * Метод создает файл сборки
     */
    public function createBundle($outputFilePath, $outputFileName, $initialString = null, $finalString = null) {
        // Генерируем путь до выходного файла, включая имя
        $outputFile = $this->config["root"].$outputFilePath.$outputFileName;
        // ЕСЛИ выходной файл еще не существует ИЛИ кэширование выключено (опция "createBundle" имеет значение "false")
        if ( !file_exists($outputFile) || !$this->config["createBundle"] ) {
            // Создаем новую сборку
            $newOutputFile = $this->getFilesContents($this->config[$this->filesType], $initialString, $finalString);
            // Если существующий файл бандла и вновь созданный не идентичны
            if ( !$this->compareFiles($this->getFileContent($outputFile), $newOutputFile) ) {
                // открываем файл, если файл не существует, делается попытка создать его
                $file = fopen($outputFile, "w");
                // записываем в файл текст
                fwrite($file, $newOutputFile);
                // закрываем файл
                fclose($file);
            }
        }
    }
}
?>