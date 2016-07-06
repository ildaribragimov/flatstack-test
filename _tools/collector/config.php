<?php 
// Путь к корневой директории сайта
$config["root"] = $_SERVER['DOCUMENT_ROOT'];

// Параметр включения/выключения кэша
$config["cacheEnable"] = false;

/**
 * Файл опций
 */
// Порядок загрузки CSS-стилей
$config["css"] = array(
    // reset styles
    "/_blocks/reset/reset_begin.css",
        "/_blocks/reset/html/html.css",
        "/_blocks/reset/body/body.css",
        "/_blocks/reset/a/a.css",
        "/_blocks/reset/blockquote/blockquote.css",
        "/_blocks/reset/hr/hr.css",
        "/_blocks/reset/ul/ul.css",
        "/_blocks/reset/ol/ol.css",
        "/_blocks/reset/nav/nav.css",
        "/_blocks/reset/menu/menu.css",
        "/_blocks/reset/img/img.css",
        "/_blocks/reset/input/input.css",
        "/_blocks/reset/textarea/textarea.css",
        "/_blocks/reset/button/button.css",
        "/_blocks/reset/header/header.css",
        "/_blocks/reset/section/section.css",
        "/_blocks/reset/footer/footer.css",
    "/_blocks/reset/reset_end.css",

    // base styles
    "/_blocks/base/base_begin.css",
        // base styles for desktop
        "/_blocks/base/desktop/base_desktop_begin.css",
            "/_blocks/base/desktop/body/body.css",
        "/_blocks/base/desktop/base_desktop_end.css",
    "/_blocks/base/base_end.css",
    
    // project template styles
    "/_blocks/project/project_begin.css",
        // project template styles for desktop
        "/_blocks/project/desktop/project-template_desktop_begin.css",
            "/_blocks/project/desktop/html/html.css",
            "/_blocks/project/desktop/body/body.css",
            "/_blocks/project/desktop/page/page.css",
        "/_blocks/project/desktop/project-template_desktop_end.css",
    "/_blocks/project/project_end.css",
);
?>