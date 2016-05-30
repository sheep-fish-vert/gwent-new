
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
            },200);
        });
    }
}

/*rating page*/
function ratingPage(){
    if( $('.rating-page').length ) {
        var scrollElem = $('.rating-table-main .item.active .item-wrap');
        var api = null;

        function initScroll(){ // init scroll in table
            scrollElem.bind('jsp-initialised',function(event, isScrollable){
                    console.info('123');
                }
            );
            scrollElem.jScrollPane({
            contentWidth: '0px',
            showArrows: true,
            //autoReinitialise: true
            });
            api = scrollElem.data('jsp');

            if ( $('.rating-table-main-wrap .row.current').length > 0){ // add position user to => center
                var top = $('.rating-table-main-wrap .row.current').position().top;
                var containerHeight = $('.jspContainer').outerHeight();

                api.scrollBy(0,top-containerHeight/2);
                return false;
            }

        }
        initScroll();

        function destroyScroll(){ // destroy scroll in table
            api.destroy();
        }


        $(document).on('click', '.rating-table-title-tab .item', function(event) {
            event.preventDefault();
            var liga = parseInt($(this).data('item'));

            // $('.rating-table-title-tab .item').removeClass('active');
            // $('.rating-table-main').addClass('hide');
            // $('.rating-page .preloader').addClass('active');

            console.log('liga ' , liga);
            var ratingData;
            $.ajax({
                url:'js/json/rating_lig.json', //js/json/market_'+marketFractionValue+'.json //'js/json/market_'+marketFractionValue+'_effects.json'
                data:{action:'rating_lig', name_lig:liga},
                method:'POST',
                success:function(data){
                    console.log('start ajax');
                    if(typeof data == 'object'){
                        ratingData = data;
                    }else{
                        ratingData = JSON.parse(data);
                    }

                    console.log(ratingData);
                }
            });

        });

    }

}
/*/rating page*/







$(document).ready(function(){
    ratingPage();
    settingsInputFile();
    marketSelection();
    contentCardSelect();
    leftMenuWidth();
    mainPageHeight();

});
$(window).load(function() {
    //marketSelection();
});