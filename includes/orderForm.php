<?php 
/**
 * Описание шаблона вывода блока формы оформления заказа
 */
?>
<div class="order__form">
    <div class="slider slider_forms slider_move-direction_horiz">
        <div class="slider__control slider__control_stages-group stages"><a class="stages__stage stages__stage_active link" target="_self" title="" data-target="1" href="">Shipping</a><span class="stages__separator"></span><a class="stages__stage link" target="_self" title="" data-target="2" href="">Billing</a><span class="stages__separator"></span><a class="stages__stage link" target="_self" title="" data-target="3" href="">Payment</a></div>
        <div class="slider__viewport">
                <ul class="slider__slides">
                    <li class="slider__slide slider__slide_current" data-number="1">
                        <div class="slider__slide-desc">
                            <form class="form_shipping" action="/#form_order" method="post" accept-charset="utf-8" autocomplete="on" novalidate="">
                                <div class="form__header">
                                    <h3 class="h h_lev_3">Shipping Info</h3>
                                </div>
                                <div class="form_content">
                                    <fieldset class="form__element-group">
                                        <legend class="form__element-group-label h h_lev_6">Recipient</legend>
                                        <div class="form__element form__element_input">
                                            <input name="name" type="text" placeholder="Full Name" data-starting-value=""   required="required" value="" class="form__field">
                                        </div><div class="form__element form__element_input form__element_phone">
                                            <input name="daytimePhone" type="tel" placeholder="Daytime Phone" data-starting-value="" required="required" value="" class="form__field block_w-50per">
                                            <div class="form__label">For delivery <br>questions only</div>
                                        </div>
                                    </fieldset>
                                    <fieldset class="form__element-group">
                                        <legend class="form__element-group-label h h_lev_6">Address</legend>
                                        <div class="form__element form__element_input">
                                            <input name="streetAddress" type="text" placeholder="Street Address" data-starting-value=""   required="required" value="" class="form__field">
                                        </div><div class="form__element form__element_input">
                                            <input name="apartment" type="text" placeholder="Apt, Suite, Bldg, Gate Code. (optional)" data-starting-value="" required="required" value="" class="form__field">
                                        </div><div class="form__element form__element_input form__element_city">
                                            <input name="сity" type="text" placeholder="City" data-starting-value=""   required="required" value="" class="form__field">
                                        </div><div class="form__element form__element_input form__element_country block_w-60per">
                                            <input name="country" type="text" placeholder="Country" data-starting-value=""   required="required" value="" class="form__field">
                                        </div><div class="form__element form__element_input form__element_zip block_w-40per">
                                            <input name="zip" type="text" placeholder="Zip" data-starting-value=""   required="required" value="" class="form__field">
                                        </div>
                                    </fieldset>
                                    <fieldset class="form__element-group">
                                        <button class="form__element form__element_button form__button"  type="submit" name="submit" value="send-shipping-info"><span class="button__title">Continue</span></button>
                                    </fieldset>
                                </div>
                            </form>
                        </div>
                    </li><li class="slider__slide" data-number="2">
                        <div class="slider__slide-desc">
                            <form class="form_billing" action="/#form_order" method="post" accept-charset="utf-8" autocomplete="on" novalidate="">
                                <div class="form__header">
                                    <h3 class="h h_lev_3">Billing Information</h3>
                                </div>
                                <div class="form_content">
                                    <fieldset class="form__element-group">
                                        <legend class="form__element-group-label h h_lev_6">Billing Contact</legend>
                                        <div class="form__element form__element_input">
                                            <input name="name" type="text" placeholder="Full Name" data-starting-value=""   required="required" value="" class="form__field">
                                        </div>
                                        <div class="form__element form__element_input form__element_email">
                                            <input name="email" type="email" placeholder="Email Address" data-starting-value="" required="required" value="" class="form__field">
                                        </div>
                                    </fieldset>
                                    <fieldset class="form__element-group">
                                        <legend class="form__element-group-label h h_lev_6">Billing Address</legend>
                                        <div class="form__element form__element_input">
                                            <input name="streetAddress" type="text" placeholder="Street Address" data-starting-value=""   required="required" value="" class="form__field">
                                        </div>
                                        <div class="form__element form__element_input">
                                            <input name="apartment" type="text" placeholder="Apt, Suite, Bldg, Gate Code. (optional)" data-starting-value="" required="required" value="" class="form__field">
                                        </div>
                                        <div class="form__element form__element_input form__element_city">
                                            <input name="сity" type="text" placeholder="City" data-starting-value=""   required="required" value="" class="form__field">
                                        </div><div class="form__element form__element_input form__element_country block_w-60per">
                                            <input name="country" type="text" placeholder="Country" data-starting-value=""   required="required" value="" class="form__field">
                                        </div><div class="form__element form__element_input form__element_zip block_w-40per">
                                            <input name="zip" type="text" placeholder="Zip" data-starting-value=""   required="required" value="" class="form__field">
                                        </div>
                                    </fieldset>
                                    <fieldset class="form__element-group">
                                        <button class="form__element form__element_button form__button"  type="submit" name="submit" value="send-shipping-info"><span class="button__title">Continue</span></button>
                                    </fieldset>
                                </div>
                            </form>
                        </div>
                    </li><li class="slider__slide" data-number="3">
                        <div class="slider__slide-desc">
                            <form class="form_payment" action="/#form_order" method="post" accept-charset="utf-8" autocomplete="on" novalidate="">
                                <div class="form__header">
                                    <h3 class="h h_lev_3">Payment</h3>
                                </div>
                                <div class="form_content">
                                    <fieldset class="form__element-group">
                                        <legend class="form__element-group-label h h_lev_6">Cardholder Name</legend>
                                        <div class="form__element form__element_input">
                                            <input name="cardholderName" type="text" placeholder="Name as it appears on your card" data-starting-value="" required="required" value="" class="form__field">
                                        </div>
                                    </fieldset>
                                    <fieldset class="form__element-group">
                                        <legend class="form__element-group-label h h_lev_6">Card Number</legend>
                                        <div class="form__element form__element_input form__element_card-number">
                                            <input name="cardNumber" type="text" placeholder="XXXX XXXX XXXX XXXX XXXX" data-starting-value="" required="required" value="" class="form__field">
                                        </div>
                                    </fieldset>
                                    <fieldset class="form__element-group block_w-30per">
                                        <legend class="form__element-group-label h h_lev_6">Expire Date</legend>
                                        <div class="form__element form__element_input form__element_expire-date">
                                            <input name="expireDate" type="text" placeholder="MM / YY" data-starting-value=""   required="required" value="" class="form__field">
                                        </div>
                                    </fieldset>
                                    <fieldset class="form__element-group block_w-30per">
                                        <legend class="form__element-group-label h h_lev_6">Security Code</legend>
                                        <div class="form__element form__element_input form__element_security-code">
                                            <input name="securityCode" type="text" placeholder="" data-starting-value=""   required="required" value="" class="form__field">
                                        </div>
                                    </fieldset>
                                    <fieldset class="form__element-group">
                                        <button class="form__element form__element_button form__button" type="submit" name="submit" value="send-shipping-info"><span class="button__title">Pay Securely</span></button>
                                    </fieldset>
                                </div>
                            </form>
                        </div>
                    </li>
                </ul>
        </div>
    </div>
</div>