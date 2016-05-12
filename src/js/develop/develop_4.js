
function leftMenuWidth(){
    var width = $('.left-menu-naviagation-wrap').outerWidth()+18;
    $('.nav-item-two,.nav-item-three').outerWidth(width);
}

function mainPageHeight(){
    if($('.main_page').length > 0){
    var header = parseInt($('.header').outerHeight()+$('.content-top-wrap').outerHeight());
    var container = parseInt($(window).outerHeight() - header);
   $('.content-wrap,.left-menu-wrap').outerHeight(container);
    }
}


function settingsInputFile(){
    $('.form-description-settings-inp-wrap input').styler({
        fileBrowse:" ",
        filePlaceholder:"Сменить аватар"
    });
}
function contentCardSelect(){
    if($('.content-card-select-wrap select').length > 0){
        $('.content-card-select-wrap select').styler({
            selectSmartPositioning:'-1'
        });
    }
}
function marketSelection(){
    if($('.selection-rase select').length > 0){
        $('.selection-rase select').styler({
            selectSmartPositioning:'-1'/*,
            onSelectClosed:function (){
                var selected = $(this).find('.selected').index();
                $('.select-rase-img').removeClass('active');
                $('.select-rase-img').eq(selected).addClass('active');
            }*/
        });
        $('.selection-rase-img').click(function() {
            $('.selection-rase .jq-selectbox__dropdown').show();
            setTimeout(function(){
                $('.selection-rase .jq-selectbox').addClass('opened');
            },200)
        });
    }
}


$(document).ready(function(){

    settingsInputFile();
    marketSelection();
    contentCardSelect();
    leftMenuWidth();
    mainPageHeight();

});
$(window).load(function() {
    //marketSelection();
});