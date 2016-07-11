<?php 
/**
 * Описание шаблона вывода блока со спецификацией заказа
 */
?>
<div class="order__invoice">
    <div class="invoice">
        <div class="invoice__header clr">
            <h6 class="h h_lev_6">Order Summary</h6>
            <span class="invoice__control_edit"><a class="link" href="/" target="_self">edit order</a></span>
        </div>
        <div class="invoice__content">
            <ul class="order__items">
                <template class="tpl_order-item">
                    <li class="order__item clr">
                        <div class="order__item-photo photo_preview photo_size_s">
                            <a class="link link_block" target="_blank"><img class="" src="" alt=""></a>
                        </div><div class="order__item-description">
                            <div class="order__item-name"><a class="link link_inverted" target="_blank"></a></div>
                            <div class="order__item-extra-info"></div>
                            <div class="order__item-quantity"></div>
                        </div><div class="order__item-total-price"></div>
                    </li>
                </template>
            </ul>
            
            <ul class="order__total">
                <li class="clr">
                    <span>Subtotal</span>
                    <span class="order__subtotal-sum order__total-val"></span>
                </li>
                <li class="clr">
                    <span>Shipping</span>
                    <span class="order__shipping-sum order__total-val"></span>
                </li>
                <li class="clr">
                    <span>Taxes</span>
                    <span class="order__taxes-sum order__total-val"></span>                    
                </li>
            </ul>
            <ul class="order__total order__total_foot">
                <li class="clr">
                    <span>Total</span>
                    <span class="order__total-sum order__total-val"></span>
                </li>
            </ul>
        </div>
    </div>
</div>