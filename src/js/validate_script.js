function validate(form, options) {
    var setings = {
        errorFunction: null,
        submitFunction: null,
        highlightFunction: null,
        unhighlightFunction: null
    }
    $.extend(setings, options);

    var $form = $(form);

    if ($form.length && $form.attr('novalidate') === undefined) {
        $form.on('submit', function (e) {
            e.preventDefault();
        });

        $form.validate({
            errorClass: 'errorText',
            focusCleanup: true,
            focusInvalid: false,
            ignore: ".ignore",
            invalidHandler: function (event, validator) {
                if (typeof (setings.errorFunction) === 'function') {
                    setings.errorFunction(form);
                }
            },
            errorPlacement: function (error, element) {
                error.appendTo(element.closest('.form_input'));
            },
            highlight: function (element, errorClass, validClass) {
                $(element).addClass('error');
                $(element).closest('.form_row').addClass('error').removeClass('valid');
                if (typeof (setings.highlightFunction) === 'function') {
                    setings.highlightFunction(form);
                }
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass('error');
                if ($(element).closest('.form_row').is('.error')) {
                    $(element).closest('.form_row').removeClass('error').addClass('valid');
                }
                if (typeof (setings.unhighlightFunction) === 'function') {
                    setings.unhighlightFunction(form);
                }
            },
            submitHandler: function (form) {
                if (typeof (setings.submitFunction) === 'function') {
                    setings.submitFunction(form);
                } else {
                    $form.submit();
                }
            }
        });

        $('[required]', $form).each(function () {

            if (language == 'ru') {
                $(this).rules("add", {
                    required: true,
                    messages: {
                        required: "Вы пропустили"
                    }
                });
            };

            if (language == 'ua') {
                $(this).rules("add", {
                    required: true,
                    messages: {
                        required: "Ви пропустили"
                    }
                });
            };
            if (language == 'en') {
                $(this).rules("add", {
                    required: true,
                    messages: {
                        required: "You missed"
                    }
                });
            };


        });

        if ($('[type="email"]', $form).length) {
            if (language == 'ru') {
                $('[type="email"]', $form).rules("add",
                    {
                        messages: {
                            email: "Невалидный email"
                        }
                    });
            };
            if (language == 'ua') {
                $('[type="email"]', $form).rules("add",
                    {
                        messages: {
                            email: "Неправильний email"
                        }
                    });
            };
            if (language == 'en') {
                $('[type="email"]', $form).rules("add",
                    {
                        messages: {
                            email: "Invalid email"
                        }
                    });
            };


        }

        if ($('.tel-mask[required]', $form).length) {
            $('.tel-mask[required]', $form).rules("add",
                {
                    messages: {
                        required: "Введите номер мобильного телефона."
                    }
                });
        };
        $('[type="password"]', $form).each(function () {
            if (language == 'ru') {
                if ($(this).is("#re_password") == true) {
                    $(this).rules("add", {
                        minlength: 1,
                        equalTo: "#password",
                        messages: {

                            equalTo: "Неверный пароль.",
                            minlength: "Недостаточно символов."
                        }
                    });
                }
            };
            if (language == 'ua') {
                if ($(this).is("#re_password") == true) {
                    $(this).rules("add", {
                        minlength: 1,
                        equalTo: "#password",
                        messages: {

                            equalTo: "Неправильний пароль.",
                            minlength: "Недостатньо символів."
                        }
                    });
                }
            };
            if (language == 'en') {
                if ($(this).is("#re_password") == true) {
                    $(this).rules("add", {
                        minlength: 1,
                        equalTo: "#password",
                        messages: {
                            equalTo: "Invalid password.",
                            minlength: "Insufficient number of characters in the password"
                        }
                    });
                }
            };

        });

    }
}

// вихід
function exitGvent() {
    var user_logout = {
        action : "exit"
    };
    $.ajax({
        url: ajaxurl,
        data: user_logout,
        method: 'POST',
        success: function (data) {
            if ( parseInt(data) == 1) {
                var url = 'index.html';
                document.location.replace(url);
            }
        }
    });
}

// вхід

function logIn(form) {
    var thisForm = $(form);
    var formSur = thisForm.serialize();
    var replacement;

    //ajaxurl = 'js/json/login_false.json';
   // ajaxurl = 'js/json/login_true.json';
    $.ajax({
        url: ajaxurl,
        data: formSur,
        method: 'POST',
        success: function (data) {
            
            var res = JSON.parse(data);
            
            //var res = data;

            if ( parseInt(res.answer) === 0 ) {

                $('form').trigger("reset");
                $(form).find('.error-text').removeClass('hide-it');
                $(form).find('.error-text').addClass('show');
                //$('.error-text').text(res.message);

            }
            else if ( parseInt(res.answer) == 1 ) {

                document.location.replace(res.location);

            }
        }
    });
}


// форма востановления пароля

function reset_pass(form) {
    var thisForm = $(form);
    var formSur = thisForm.serialize();

   // ajaxurl = 'js/json/reset_pass_false.json';
   // ajaxurl = 'js/json/reset_pass_true.json';

    $.ajax({
        url: ajaxurl,
        data: formSur,
        method: 'POST',
        success: function (data) {
            var res = JSON.parse(data);    
            
            //var res = data;
            
             //console.log(res);
            if ( parseInt(res.answer) === 0 ) {
                $('form').trigger("reset");
                $(form).find('.error-text').removeClass('hide-it');
                $(form).find('.error-text').addClass('show');
                $('.error-text').text(res.message);

            }
            else if ( parseInt(res.answer)  == 1) {
                var url = res.location;
                $('.call-title').text(res.message);
                $('.call-subtitle').text('');
                popNext();
                var timer1 = null;
                timer1 = setTimeout(function () {
                    document.location.replace(url);
                }, 2000);
            }
        }
    });
}


// реєстрація

function registerForm(form) {
    
    if(grecaptcha.getResponse().length === 0){
        $(form).find('.reCaptcha-wrap>div>div>div').addClass('error-recapture');
    } else if(!$('#linka-check').is( ":checked" )){
       // console.log('not check');
        // open menu width
        
    } /*else if( $(form).find('input[name=reg_password]').val().length < 4 && $(form).find('input[name=confirm_reg_password]').val().length < 4 ){
        $(form).find('input[type=password]').addClass('error-field');
    } */ else{

        var thisForm = $(form);
        var formSur = thisForm.serialize();

        //ajaxurl = 'js/json/register_true.json';
        //ajaxurl = 'js/json/register_false_email.json';
        //ajaxurl = 'js/json/register_false_login.json';

        $.ajax({
            url: ajaxurl,
            data: formSur,
            method: 'POST',
            success: function (data) {
               // console.log(data);
                 var res = JSON.parse(data);
                
               // var res = data;
                
                if ( parseInt(res.answer) === 0) {
                    if (res.error_email){
                        thisForm.find('input[type="email"]').closest('.form_row').addClass('error');
                        thisForm.find('input[type="email"]').closest('.form_row').removeClass('valid');
                        thisForm.find('input[type="email"]').addClass('false-field');
                    }
                    if (res.error_login){
                        thisForm.find('input[name="reg_login"]').closest('.form_row').addClass('error');
                        thisForm.find('input[name="reg_login"]').closest('.form_row').removeClass('valid');
                        thisForm.find('input[name="reg_login"]').addClass('false-field');
                    }
                // $('form').trigger("reset");
                    thisForm.find('.error-text').removeClass('hide-it');
                    thisForm.find('.error-text').addClass('show');
                    $('.error-text').text(res.message);

                }
                else if (res.answer == 1) {
                    var url = res.location;
                    $('.call-title').text(res.message);
                    $('.call-subtitle').text('');
                    
                    popNext();
                    
                    var timer1 = null;
                    
                    timer1 = setTimeout(function () {
                        document.location.replace(url);
                    }, 2000);
                    
                }
            }
        });
        

    }


}


// зміна данних користувача

function settingsForm(form) {
    var myForm = $(form);
    var formData = new FormData(form);
    var swicher;

    //ajaxurl = 'js/json/settings_true.json';
    //ajaxurl = 'js/json/settings_false.json';

    $.ajax({
        url: ajaxurl,
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        method: 'POST',
        success: function (data) {
            var res = JSON.parse(data);

            if ( parseInt(res.answer) === 0) {
                swicher = 0;

                $('form').trigger("reset");
                $(form).find('.error-text').removeClass('hide-it');
                $(form).find('.error-text').addClass('show');
                $('.error-text').text(res.message);
            }
            else if ( parseInt(res.answer) == 1) {
                swicher = 1;

                loadingStartDogFB();

                if (res.imageUrl != '') {
                    userAvatar = res.imageUrl;
                    $('#avatarImg').attr('src', res.imageUrl);
                    $('.user-image img').attr('src', res.imageUrl);
                };

                $(form).find('input[name=current_password]').val('');
                $(form).find('input[name=settings_pass]').val('');
                $(form).find('input[name=settings_pass_confirm]').val('');

                if (language == 'ru') {
                    $('.call-title').text('Ваши данные успешно изменены');
                    $('.call-subtitle').text('');
                };
                if (language == 'ua') {
                    $('.call-title').text('Ваші дані успішно змінені');
                    $('.call-subtitle').text('');
                };
                if (language == 'en') {
                    $('.call-title').text('Your data was successfully changed');
                    $('.call-subtitle').text('');
                };

            }
            var timer = null;
        }
    }).done(function () {
        if (swicher == 1) {
            timer = setTimeout(function () {
                $.fancybox.close("#call-popup");
                popNext();
            }, 200);
        }
    });


}

// техническая поддержка
function supportForm(form) {
     if(grecaptcha.getResponse().length != 0){
         
        var thisForm = $(form);
        var formSur = thisForm.serialize();
    // popNext();

    // ajaxurl = 'js/json/support_true.json';
    // ajaxurl = 'js/json/support_false.json';

        $.ajax({
            url: ajaxurl,
            data: formSur,
            processData: false,
            method: 'POST',
            success: function (data) {
                
              var res = JSON.parse(data);
             //var res = data;

                if ( parseInt(res.answer) === 0) {
                    var timer1 = null;

                    timer1 = setTimeout(function () {
                        $.fancybox.close("#call-popup");
                    }, 500);

                    //$('form').trigger("reset");
                // $.fancybox.close("#call-popup");
                    //$('form').trigger("reset");
                    $(form).find('.error-text').removeClass('hide-it');
                    $(form).find('.error-text').addClass('show');
                    $('.error-text').text(res.message);
                    //document.location.replace();
                }
                else if ( parseInt(res.answer) == 1) {

                    $('form').trigger("reset");

                    var url = res.location;
                    var textMassage = res.message;

                    $('.call-title').text(textMassage);

                    popResult();

                    var timer = null;

                    timer = setTimeout(function () {
                        document.location.replace(url);
                        $.fancybox.close("#call_success");
                    }, 2000);
                    $('form').trigger("reset");
                }
            }
        }).done(function () {
            //console.log("finish");
        });

     }
    function popNext() {

        $.fancybox.open("#call-popup", {
            padding: 0,
            fitToView: false,
            wrapCSS: "call-popup",
            autoSize: true,
            'helpers': {
                'overlay': { 'closeClick': false }
            },
            afterClose: function () {
               // $('form').trigger("reset");
            }
        });

    }

    function popResult() {
        $.fancybox.open("#call_success", {
            padding: 0,
            fitToView: false,
            wrapCSS: "call-popup",
            autoSize: true,
            'helpers': {
                'overlay': { 'closeClick': false }
            },
            afterClose: function () {
                clearTimeout(timer);
            }
        });

    };
}



function popNext() {

    $.fancybox.open("#call_success", {
        padding: 0,
        fitToView: false,
        'closeBtn': false,
        wrapCSS: "call-popup",
        'showCloseButton':false,
        autoSize: true,
        afterClose: function () {
            $('form').trigger("reset");
            clearTimeout(timer1);
        }
    });

    var timer1 = null;

    timer1 = setTimeout(function () {
        $.fancybox.close("#call_success");
    }, 2000);

}

function loadingStartDogFB() {
    $.fancybox.open("#call-popup", {
        padding: 0,
        fitToView: false,
        wrapCSS: "call-popup",
        autoSize: true,
        'helpers': {
            'overlay': { 'closeClick': false }
        },
        afterClose: function () {
            $('form').trigger("reset");
        }
    });
}


function showErrorField(form) {

    $(form).find('.error-text').addClass('show');

}


function showErrorFieldPassFormAgain(form) {
    var errorLength = $(form).find('.form_row.error').length;
    if (errorLength !== 0) {
        $(form).find('.error-text').removeClass('hide-it');
    }
    else {
        $(form).find('.error-text').addClass('hide-it');
        $('.error-text').text('Неправильно указанный Email');
    }
}

function showHideErrorFieldAgain(form) {
    var errorLength = $(form).find('.form_row.error').length;
    if (errorLength !== 0) {
        $(form).find('.error-text').removeClass('hide-it');
    } else {
        $(form).find('.error-text').addClass('hide-it');

        if (language == 'ru') {
            $('.error-text').text('Неправильно указан логин и/или пароль');
        };
        if (language == 'ua') {
            $('.error-text').text('Неправильно вказаний логін і/або пароль');
        };
        if (language == 'en') {
            $('.error-text').text('The username or password you entered is incorrect');
        };
    }
    
}

function onchangeTestDate() {

    var date = new Date();
    var str = $('#datepicker').val();
    var inputDate = str.split('/', 3);
    $('.date-select').addClass('error');
    $('.date-select').closest('.form_row').removeClass('valid').addClass('error');

    if (inputDate[2] <= date.getFullYear()) {
        if (inputDate[0] <= (date.getMonth() + 1)) {
            if (inputDate[1] <= date.getDate()) {
                $('.date-select').closest('.form_row').removeClass('error').addClass('valid');
                $('.date-select').removeClass('error');
            }
            else {
                $('#datepicker').val('');
            };
        }
        else {
            $('#datepicker').val('');
        };
    }
    else {
        //(date.getMonth()+1)+ '/' + date.getDate() +'/' + date.getFullYear()
        $('#datepicker').val('');
    };
}


function setDatePickerRussian() {
    $.datepicker.regional['ru'] = {
        closeText: 'Закрыть',
        prevText: '&#x3c;Пред',
        nextText: 'След&#x3e;',
        currentText: 'Сегодня',
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
            'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
        dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
        dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false
    };

    $.datepicker.setDefaults($.datepicker.regional['ru']);
}

function setDatePickerUkraine() {
    $.datepicker.regional['ua'] = {
        clearText: 'Очистити', clearStatus: '',
        closeText: 'Закрити', closeStatus: '',
        prevText: '&lt;&lt;', prevStatus: '',
        nextText: '&gt;&gt;', nextStatus: '',
        currentText: 'Сьогодні', currentStatus: '',
        monthNames: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
            'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
        monthNamesShort: ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер',
            'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'],
        monthStatus: '', yearStatus: '',
        weekHeader: 'Не', weekStatus: '',
        dayNames: ['неділя', 'понеділок', 'вівторок', 'середа', 'четвер', 'пятниця', 'суббота'],
        dayNamesShort: ['нед', 'пнд', 'вів', 'срд', 'чтв', 'птн', 'сбт'],
        dayNamesMin: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        dayStatus: 'DD', dateStatus: 'D, M d',
        dateFormat: 'dd/mm/yy', firstDay: 1,
        initStatus: '', isRTL: false
    };
    $.datepicker.setDefaults($.datepicker.regional['ua']);
}

function setDatePickerEnglish() {
    $.datepicker.regional['en'] = {
        closeText: 'Done',
        prevText: 'Prev',
        nextText: 'Next',
        currentText: 'Today',
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        weekHeader: 'Wk',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['en']);
}

function reloadLighting() {
    setInterval(function () {
        var lighting = {
            action: "energyStatus"
        }
        $.ajax({
            url: ajaxurl,
            data: lighting,
            method: 'POST',
            success: function (data) {
                var res = JSON.parse(data);
                $(".lighting").text(res[0]);
            }
        });
    }, interval_update * 1000);
}



var interval_update = 5000;
// Перевірка розширення файлу
(function ($) {
    $.fn.checkFileType = function (options) {
        var defaults = {
            allowedExtensions: [],
            success: function () { },
            error: function () { }
        };
        options = $.extend(defaults, options);

        return this.each(function () {

            $(this).on('change', function () {
                var value = $(this).val(),
                    file = value.toLowerCase(),
                    extension = file.substring(file.lastIndexOf('.') + 1);

                if ($.inArray(extension, options.allowedExtensions) == -1) {
                    options.error();
                    $(this).focus();
                } else {
                    options.success();
                }
            });
        });
    };

})(jQuery);

// buy more scripts

    function buyMorePopup(){

        $('.convert-resurses .button-plus').fancybox({
            autoSize:true,
            fitToView:true,
            padding:0,
            wrapCSS:'fancybox-buy-more'
        });

        // callback on gold buying submit

        function validateGoldBuying(form){

            var thisForm = $(form);
            var formSur = thisForm.serialize();

            $.ajax({
                url:'js/json/buy_gold_page_path.json',//'http://gwent.sheep.fish/wp-admin/admin-ajax.php'
                data:{action:'buy_gold', formData:formSur},
                method:'POST',
                success:function(data){

                    window.location.pathname = data.path;

                }
            })

        }

        // /callback on gold buying submit

        // validate on gold buying form

        validate('.buy-gold-form', {submitFunction:validateGoldBuying});

        // /validate on gold buying form

        // callback on silver buying form

        function validateSilverBuying(form){

            var thisForm = $(form);
            var formSur = thisForm.serialize();

            $.ajax({
                url:'js/json/exchange_silver_error.json', //exchange_silver_error.json //'http://gwent.sheep.fish/wp-admin/admin-ajax.php'
                data:{action:'exchange_gold_to_silver', formData:formSur},
                method:'POST',
                success:function(data){

                    if(data.change == 0){

                        popupCalling('exchange_error_gold', "exchange-error-wrap", thisForm);

                    }else if(data.change == 1){

                        $('.header-box .resurses .gold').text(data.gold_count);
                        $('.header-box .resurses .silver').text(data.silver_count);

                        $.fancybox.close();

                    }

                }
            });

        }

        // /callback on silver buying form

        // validate on silver buying

        validate('.buy-silver-form', {submitFunction:validateSilverBuying});

        // /validate on silver buying

        // energy excahnge

        $(document).on('click', '.excahnge-energy .exchange-button-main', function(){

            var type = $(this).data('type');
            var energyCount = $(this).data('energy-count');

            $.ajax({
                url:'js/json/energy_exchange_to_'+type+'.json',// 'http://gwent.sheep.fish/wp-admin/admin-ajax.php'
                data:{action:'energy_exchange', valueType:type, energyCount:energyCount},
                method:'POST',
                success:function(data){
                    if(data.change == 0){

                        popupCalling('exchange_error_'+type, "exchange-error-wrap");

                    }else if(data.change == 1){

                        $('.header-box .lighting').text(data.energy);
                        $('.header-box .'+type).text(data[type]);

                        $.fancybox.close();

                    }
                }
            });

        });

        // / energy excahnge

    }

    // call popup by ajax

        function popupCalling(popupId, popupWrap, thisForm){

            var timer = null;

            $.fancybox.open('#'+popupId, {
                padding:0,
                fitToView:false,
                'closeBtn': false,
                wrapCSS: popupWrap,
                autoSize: true,
                afterClose: function () {
                    if(thisForm != 'undefined'){
                        thisForm.trigger("reset");
                    }
                    clearTimeout(timer);
                }
            });

            timer = setTimeout(function(){
                $.fancybox.close();
            },2000);

        }

    // /call popup by ajax

    //buying silver scripts

        function buyingSilver(item){

            var inputVal = parseInt(item.val());
            var textBlockRadion = item.parents('.form-row').find('.exchange-value');
            var countBlockCoof = textBlockRadion.data('exchange-koof');

            var silverCount = inputVal * countBlockCoof;

            textBlockRadion.text(silverCount.toFixed());

        }

    // /buying silver scripts

// /buy more scripts

/*buy-gold-page*/

    function buyGoldInput(item){
        var input = item;
        var coef = input.data('coef');
        var valueHolder = $('#gold-page-price');
        var value = input.val();
        var newVal = (value * coef).toFixed(2);

        valueHolder.text(newVal);
    }

    function buyGoldAjax(){
        $('.gold-page-pay').on('click', function(event) {
            event.preventDefault();

            var valueHolder = +($('#gold-page-price'));

            $.ajax({
                url:'js/json/buyGoldAjax_succes.json',//'http://gwent.sheep.fish/wp-admin/admin-ajax.php'
                data:{action:'buyGoldAjax', formData:valueHolder},
                method:'POST',
                success:function(data){

                    if ( data.answer == 1 ){
                        $.fancybox.open(data.text_succes+" "+data.gold+" золота.",{
                            'closeBtn': false,
                            wrapCSS: "call-popup",
                            'showCloseButton':false,
                            autoSize: true
                        })

                    }else if( data.answer == 0 ){

                    }

                }
            })
        });
    }

/*/buy-gold-page*/

// call scripts call scripts call scripts call scripts call scripts call scripts call scripts call scripts call scripts

$(window).load(function () {
    if ($(".lighting").length > 0) {
        reloadLighting();
    };
})

$(document).ready(function () {


    if ($("#datepicker").length > 0) {
        if (language == 'ru') {
            setDatePickerRussian();
        };
        if (language == 'ua') {
            setDatePickerUkraine();
        };
        if (language == 'en') {
            setDatePickerEnglish();
        };

        $("#datepicker").datepicker({
            maxDate: new Date,
            minDate: new Date(1920, 1, 1),
            startDate: new Date(1992, 1, 1),
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
            yearRange: "-100:+0"
        });
    }

    //reload lighting

    if ($(".lighting").length > 0) {
        reloadLighting();
    };

    $('.log_out_menu').click(function (e) {
        e.preventDefault();
        exitGvent();
    });


    $('#file').checkFileType({
        allowedExtensions: ['jpg', 'jpeg', 'png'],
        success: function () {
            console.log("good");
        },
        error: function () {
            console.log("suck");
            $('#file').val('');
        }
    });

    $('.footer_placeholder').height($('.footer').outerHeight());

    validate('.pass-form', {
        submitFunction: reset_pass,
        errorFunction: showErrorField,
        highlightFunction: showErrorFieldPassFormAgain,
        unhighlightFunction: showHideErrorFieldAgain
    });

    validate('.forget-pass-form', {
        submitFunction: logIn,
        errorFunction: showErrorField,
        highlightFunction: showHideErrorFieldAgain,
        unhighlightFunction: showHideErrorFieldAgain
    });

    validate('.support-form', { submitFunction: supportForm,
        errorFunction: showErrorField,
        highlightFunction: showHideErrorFieldAgain,
        unhighlightFunction: showHideErrorFieldAgain
    });

    validate('.register-form', { submitFunction: registerForm,
        errorFunction: showErrorField,
        highlightFunction: showHideErrorFieldAgain,
        unhighlightFunction: showHideErrorFieldAgain
    });

    validate('.settings_form', {
        submitFunction: settingsForm,
        errorFunction: showErrorField,
        highlightFunction: showHideErrorFieldAgain,
        unhighlightFunction: showHideErrorFieldAgain
    });

    buyGoldAjax();

    buyingSilver($('.buy-silver-form input'));
    inputNumber('.num-only-silver',{blurFunc:buyingSilver});

    buyGoldInput($('.buy-gold-page-item-counter input'));
    inputNumber('.buy-gold-page-item-counter',{keyupFunc:buyGoldInput});

});


/* from server */

