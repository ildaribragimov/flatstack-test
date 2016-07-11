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

    // global styles
    "/_blocks/global/global_begin.css",
        // base styles for desktop
        "/_blocks/global/desktop/global_desktop_begin.css",
            //"/_blocks/global/desktop/block/block.css",
                "/_blocks/global/desktop/block/__wrapper/block__wrapper.css",
                "/_blocks/global/desktop/block/_align/block_align.css",
            "/_blocks/global/desktop/clr/clr.css",
        "/_blocks/global/desktop/global_desktop_end.css",
    "/_blocks/global/global_end.css",

    // base styles
    "/_blocks/base/base_begin.css",
        // base styles for desktop
        "/_blocks/base/desktop/base_desktop_begin.css",
            "/_blocks/base/desktop/html/html.css",
            "/_blocks/base/desktop/body/body.css",
            "/_blocks/base/desktop/link/link.css",
                "/_blocks/base/desktop/link/_inverted/link_inverted.css",
                "/_blocks/base/desktop/link/_block/link_block.css",
            "/_blocks/base/desktop/icon/icon.css",
                "/_blocks/base/desktop/icon/_size/icon_size.css",
            //"/_blocks/base/desktop/page/page.css",
                "/_blocks/base/desktop/page/__wrapper/page__wrapper.css",
            "/_blocks/base/desktop/top-pannel/top-pannel.css",
                "/_blocks/base/desktop/top-pannel/__wrapper/top-pannel__wrapper.css",
                "/_blocks/base/desktop/top-pannel/__logo/top-pannel__logo.css",
                "/_blocks/base/desktop/top-pannel/__menu/top-pannel__menu.css",
            //"/_blocks/base/desktop/menu/menu.css",
                "/_blocks/base/desktop/menu/__wrapper/menu__wrapper.css",
                "/_blocks/base/desktop/menu/__items/menu__items.css",
                "/_blocks/base/desktop/menu/__item/menu__item.css",
                "/_blocks/base/desktop/menu/__link/menu__link.css",
        "/_blocks/base/desktop/base_desktop_end.css",
    "/_blocks/base/base_end.css",
    
    // project template styles
    "/_blocks/project/project_begin.css",
        // project template styles for desktop
        "/_blocks/project/desktop/project-template_desktop_begin.css",
            "/css/system/fonts.css",
            "/_blocks/project/desktop/html/html.css",
            "/_blocks/project/desktop/body/body.css",
            "/_blocks/project/desktop/h/h.css",
                "/_blocks/project/desktop/h/_lev/h_lev.css",
            "/_blocks/project/desktop/icon/icon.css",
                "/_blocks/project/desktop/icon/_set/icon_set.css",
            "/_blocks/project/desktop/page/page.css",
                "/_blocks/project/desktop/page/__wrapper/page__wrapper.css",
                //"/_blocks/project/desktop/page/__content/page__content.css",
            "/_blocks/project/desktop/top-pannel/top-pannel.css",
                "/_blocks/project/desktop/top-pannel/__wrapper/top-pannel__wrapper.css",
                "/_blocks/project/desktop/top-pannel/__logo/top-pannel__logo.css",
                "/_blocks/project/desktop/top-pannel/__menu/top-pannel__menu.css",
            "/_blocks/project/desktop/logo/logo.css",
                "/_blocks/project/desktop/logo/__mark/logo__mark.css",
                "/_blocks/project/desktop/logo/__name/logo__name.css",
            //"/_blocks/project/desktop/menu/menu.css",
                "/_blocks/project/desktop/menu/__link/menu__link.css",
                "/_blocks/project/desktop/menu/__item-icon/menu__item-icon.css",
                "/_blocks/project/desktop/menu/__item-title/menu__item-title.css",
                "/_blocks/project/desktop/menu/__item-notification/menu__item-notification.css",
            //"/_blocks/project/desktop/order/order.css",
                "/_blocks/project/desktop/order/__placement/order__placement.css",
                "/_blocks/project/desktop/order/__invoice/order__invoice.css",
                "/_blocks/project/desktop/order/__form/order__form.css",
                "/_blocks/project/desktop/order/__item/order__item.css",
                "/_blocks/project/desktop/order/__item-photo/order__item-photo.css",
                "/_blocks/project/desktop/order/__item-description/order__item-description.css",
                "/_blocks/project/desktop/order/__item-name/order__item-name.css",
                "/_blocks/project/desktop/order/__item-quantity/order__item-quantity.css",
                "/_blocks/project/desktop/order/__item-extra-info/order__item-extra-info.css",
                "/_blocks/project/desktop/order/__item-total-price/order__item-total-price.css",
                "/_blocks/project/desktop/order/__total/order__total.css",
                "/_blocks/project/desktop/order/__total-val/order__total-val.css",
                "/_blocks/project/desktop/order/__total/_foot/order__total_foot.css",
            "/_blocks/project/desktop/invoice/invoice.css",
                "/_blocks/project/desktop/invoice/__header/invoice__header.css",
                "/_blocks/project/desktop/invoice/__header/invoice__header.css",
                "/_blocks/project/desktop/invoice/__control/_edit/invoice__control_edit.css",
        "/_blocks/project/desktop/project-template_desktop_end.css",
    "/_blocks/project/project_end.css",
);
// Порядок загрузки JS-скриптов библиотеки
$config["js"] = array(
    "/js/helpers/ajax.js",
    
    "/_blocks/project/desktop/cart/cart.js",
    "/_blocks/project/desktop/order/order.js"
);
?>