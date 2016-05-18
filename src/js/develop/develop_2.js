function UpdateTime() {
    var CurrentTime = new Date();
    var InputTime = $('.time');
    h = CurrentTime.getHours();
    if (h < 10) h = "0" + h;
    m = CurrentTime.getMinutes();
    if (m < 10) m = "0" + m;
    s = CurrentTime.getSeconds();
    if (s < 10) s = "0" + s;
    outString = h + ":" + m + ":" + s;
    InputTime.text(outString);

    setTimeout("UpdateTime()", 1000);
}

function selectStyled() {
    $('.style-select').styler();
    $('.date-select').styler({
        selectPlaceholder: 'Дата рождения'
    });

    if (language == 'ru') {
        $('.male-select').styler({
            selectPlaceholder: 'Выроб расы'
        });
    };
    if (language == 'en') {
        $('.male-select').styler({
            selectPlaceholder: 'Select rase'
        });
    };
    if (language == 'ua') {
        $('.male-select').styler({
            selectPlaceholder: 'Выроб расы'
        });
    };
}

function marketScrollInit() {
    $('.market-cards-wrap').jScrollPane({
        contentWidth: '0px',
        autoReinitialise: true,
        autoReinitialiseDelay: 0,
        verticalDragMaxHeight: 65,
        verticalDragMinHeight: 65,
        showArrows: true
    });
}

function searchPlayConfig() {
    if ($('#look-for-oponent').length != '') {
        setInterval(function () {
            var serch = {
                "action": "searchOponent"
            };

            ajaxUrl = 'js/json/searchOponent_false.json';
            // ajaxUrl = 'js/json/searchOponent_true.json';

            $.ajax({
                url: ajaxUrl,
                data: serch,
                method: 'POST',
                success: function (data) {
                    if (data.answer === 0) {
                        //console.log('none');
                    }
                    else if (data.answer == 1) {
                        var url = data.location;
                        $('.call-title').text(data.message);
                        $('.call-subtitle').text('');
                        popNext();
                        var timer1 = null;
                        timer1 = setTimeout(function () {
                            document.location.replace(url);
                        }, 2000);
                    }
                }
            });
        }, 5000);
    }
}

function stopSearchPlay() {
    if ($('#look-for-oponent').length != '') {
        var serch = {
            "action": "stopSearch"
        };

        //ajaxUrl = 'js/json/stopSearchOponent_false.json';
       // ajaxUrl = 'js/json/stopSearchOponent_true.json';

        $.ajax({
            url: ajaxUrl,
            data: serch,
            method: 'POST',
            success: function (data) {
                if (data.answer === 0) {
                    $('.button-leave .form-button').css('pointer-events', 'auto');
                }
                else if (data.answer == 1) {
                    var url = data.location;
                    $('.call-title').text(data.message);
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

function fancyboxForm() {
    $('.fancybox-form').fancybox({
        openEffect: 'fade',
        closeEffect: 'fade',
        autoResize: true,
        wrapCSS: 'fancybox-form',
        'closeBtn': true,
        fitToView: true,
        padding: '0'
    })
}


/* проверка паролей */
function checkPassInput () {
        
    $('.register-form input[type=password]').on('keyup', function () {

        if ($('input[name=reg_password]').val() != $('input[name=confirm_reg_password]').val()) {
            $('input[type=password]').addClass('error-field');

        } else {
            $('input[type=password]').removeClass('error-field');
        }
    }); 
    
    $('.settings_form input[name=settings_pass_confirm] , .settings_form input[name=settings_pass]').on('keyup', function () {
        if ($('input[name=settings_pass_confirm]').val() != $('input[name=settings_pass]').val()) {
            
            $('.settings_form input[name=settings_pass_confirm]').addClass('error-field');
            $('.settings_form input[name=settings_pass]').addClass('error-field');
            

        } else {
            $('.settings_form input[name=settings_pass_confirm]').removeClass('error-field');
            $('.settings_form input[name=settings_pass]').removeClass('error-field');
        }
    }); 
}


function showFormOnMain() {
    $('.forget-pass-form button').click(function (event) {
        if ($(this).hasClass('show-form-please')) {
            event.preventDefault();
            $('.form-wrap-for-rows').slideDown(500);
            $(this).removeClass('show-form-please');
        }

    });
}

function showWindowAboutOnMain() {
    $('.drop-menu-open').click(function () {

        event.preventDefault();

        $(this).css('pointer-events', 'none');
        var that = $(this);
        if (!$(this).hasClass('drop-menu-hide')) {

            $('.convert-about').slideDown(500, function () {
                $('.button-dropdown').css('top', $('.convert-about').height() + 20);
                that.css('pointer-events', 'auto');
            });

            that.addClass('drop-menu-hide');

        } else {

            $('.convert-about').slideUp(300, function () {
                that.css('pointer-events', 'auto');
            });

            $('.button-dropdown').css('top', 93);

            $(this).removeClass('drop-menu-hide');
        }
    });
}


$(document).ready(function () {
    
    $('.hovered-block .description').jScrollPane({
        showArrows: true
    });
    
    $('.hovered-block .button-easy').click(function(event){
        event.preventDefault();
        $('.forget-pass-form .button-buy-next').click();
        $('.forget-pass-form input[name=login]').focus();
    });
    

    $('.button-leave .form-button').click(function () {
        $(this).css('pointer-events', 'none');
        stopSearchPlay();
    });

    $('.register-form input[name="reg_email"] , .register-form input[name="reg_login"]  ').on('focus', function () {
        if ($(this).hasClass("false-field")) { $(this).removeClass('false-field'); }
    });


    $('.swicher-maker').click(function () {

        if ($(this).closest('div').find('input').is(':checked')) {
            $('.swicher-maker').closest('div').find('input').prop('checked', true);
            $('.swicher-maker').addClass('turn-on');

        } else {
            $('.swicher-maker').closest('div').find('input').prop('checked', false);
            $('.swicher-maker').removeClass('turn-on');
        }
    });


    $('#confirm-popup').on('change', function () {
        $('#linka-check').prop('checked', $('#confirm-popup').is(":checked"));
    });

    searchPlayConfig();

    UpdateTime();

    selectStyled();

    oneHeightItems();

    marketScrollInit();

    fancyboxForm();

    showFormOnMain();

    showWindowAboutOnMain();
    
    checkPassInput (); 

});

var userAvatar;
var userName;
var userEmail;
var userOnline;

$(window).load(function () {

    if ( $('body').find('.header-box').length == 1) {
        // ajaxurl = 'js/json/current_user_false.json';
        //ajaxurl = 'js/json/current_user_true.json';

        var currentUser = {
            action: "on_load_page"
        };

        $.ajax({
            url: ajaxurl,
            data: currentUser,
            method: 'POST',
            success: function (data) {

                var res = JSON.parse(data);
                //var res = data;

                if (res.answer == 1) {
                    userName = res.name;
                    userAvatar = res.imageUrl;
                    userOnline = res.onlineUsers;
                    userEmail = res.userEmail;
                    
                    $('.user-name').html(userName);
                    $('.user-image img').attr('src', userAvatar);                    
                    $('.people-box .people').html(userOnline);
                    

                    $('.header-box .convert-resurses .gold').html(res.gold);
                    $('.header-box .convert-resurses .silver').html(res.silver);                    
                    $('.header-box .convert-resurses .lighting').html(res.energy);
                    
                    if( $('body').find('#avatarImg').length == 1) {
                        $('#avatarImg').attr('src', userAvatar);
                    }
                    
                    if( $('body').find('.settings-page').length == 1) {
                        $('.settings_form input[type=email]').val(userEmail).prop("disabled", true); 
                        $('.settings_form .form-title').html(userName); 
                    }

                } else {
                    console.log('error');
                }
            }
        });
    }
    
    
});