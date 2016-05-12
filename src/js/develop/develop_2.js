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
         ajaxUrl = 'js/json/stopSearchOponent_true.json';

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

function fancyboxForm(){
  $('.fancybox-form').fancybox({
    openEffect  : 'fade',
    closeEffect : 'fade',
    autoResize:true,
    wrapCSS:'fancybox-form',
    'closeBtn' : true,
    fitToView:true,
    padding:'0'
  })
}



function showFormOnMain(){
    $('.forget-pass-form button').click(function(event){
        if ($(this).hasClass('show-form-please') ){
            event.preventDefault();
            $('.form-wrap-for-rows').slideDown(500);
            $(this).removeClass('show-form-please');
        }

    });
}

$(document).ready(function () {

    $('.button-leave .form-button').click(function () {
        $(this).css('pointer-events', 'none');
        stopSearchPlay();
    });

    $('.register-form input[name="reg_email"] , .register-form input[name="reg_login"]  ').on('focus', function () {
        if ($(this).hasClass("false-field")) { $(this).removeClass('false-field');}
    });

    $('.swicher-maker').click(function(){
        console.log($(this).closest('div'));
        if ( $(this).closest('div').find('input').is(':checked') ){
            $('.swicher-maker').closest('div').find('input').prop('checked', true);
            $('.swicher-maker').addClass('turn-on');
            console.log('false');
        } else {
            $('.swicher-maker').closest('div').find('input').prop('checked', false);
            $('.swicher-maker').removeClass('turn-on');
            console.log('true');
        }
    });

    searchPlayConfig();

    UpdateTime();

    selectStyled();

    //oneHeightItems();

    marketScrollInit();

    fancyboxForm();

    showFormOnMain();

});

