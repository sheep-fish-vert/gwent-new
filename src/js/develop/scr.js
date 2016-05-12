jQuery.browser = {};
jQuery.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
jQuery.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
jQuery.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
jQuery.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());

var scroller=jQuery.browser.webkit ? "body": "html";

/* modernize */
function modernize() {
	// placeholder
	if(!Modernizr.input.placeholder){
		$('[placeholder]').each(function() {
			$(this).watermark($(this).attr('placeholder'));
		});
	}
}


/* input only Number  */
function inputNumber(block, options) {

    var callbacks = {
        keyupFunc:null,
        keydownFunc:null,
        blurFunc:null
    }

    $.extend(callbacks, options);



    $(block).each(function() {

        var item = $(this);

    	item.find('input').keypress(function(e) {

            var charCode = (e.which) ? e.which : e.keyCode;

    		if (($(this).val().length != 0 && (charCode >= 47 && charCode <= 57)) || ($(this).val().length == 0 && (charCode >= 49 && charCode <= 57))){
                if(callbacks.keydownFunc != null){
                    callbacks.keydownFunc($(this));
                }
            }
    		else return false;
    	});

    	item.find('input').keyup(function() {

    		$inputNum = $(this);

    		if(item.data('max') != 'undefined' && $inputNum.val() > parseInt(item.data('max'))){
                $inputNum.val(item.data('max'));
            }

            if(callbacks.keyupFunc != null){
                callbacks.keyupFunc($(this));
            }

    	});

        item.find('input').blur(function(){


            var text = $(this).val();

            if(!/^\d+$/.test(text)){

                if(item.data('min') != 'undefined'){
                    $(this).val(item.data('min'));
                }else{
                    $(this).val('');
                }

            }else{
                if((item.data('min') == 'undefined') && (item.find('input').val == '' || item.find('input').val() == 0)){
                    item.val('');
                }else if((item.data('min') != 'undefined') && (item.find('input').val == '' || item.find('input').val() < parseInt(item.data('min')))){
                    item.find('input').val(item.data('min'));
                }
            }

            if(callbacks.blurFunc != null){
                callbacks.blurFunc($(this));
            }

        });

    });

}

/* u_tabs */
function u_tabs(link, block) {
	$(link).click(function(e) {
		var $currentTab = $(this);
		var tabId = $currentTab.data('utab');

		$(link).removeClass('active');
		$currentTab.addClass('active');

		$(block).hide().removeClass('active');
		$(block+'[data-utab="' + tabId + '"]').show().addClass('active');
		if($(link).is('a')){
			e.preventDefault();
		}
	});
	$(link).eq(0).click();
}

/* scrollUp */
function scrollUp(block,targetBlock) {

	$(block).click(function(e){
		var target = $(targetBlock).offset().top;

		$(scroller).animate({scrollTop:target},800);
		return false;

		e.preventDefault();
	});
}

function oneHeightItems(){

	function oneHeight(block){
		var height=0;
		block.removeAttr('style');
		block.each(function(){
			if($(this).height()>height){
				height=$(this).height();
			}
		});
		block.css('height', height);
	}

	oneHeight($('.oneHeight'));
}

function selectStyled(){
	$('.style-select').styler();
	$('.date-select').styler({
		selectPlaceholder:'Дата рождения'
	});
	/*
	$('.male-select').styler({
		selectPlaceholder:'Пол'
	});
	*/
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



// loading info about cards by class 'card-load-info'

function contentCardLoad(){

	$('.card-load-info').each(function(){

		var background = $(this).data('mainimg');
		var value = $(this).data('value');
		var subTypeMas = $(this).data('subtypemas').split(',');
		var titleText = $(this).data('title');
		var icon = $(this).data('icon');
		var contentText = $(this).data('contenttext');
		var cardType = $(this).data('cardtype');
		var cardRole = $(this).data('cardrole');

		if(cardType != undefined){
			$(this).addClass(cardType).removeAttr('data-cardtype');
		}

		$(this).addClass(cardType).removeClass('card-load-info').removeAttr('data-mainimg data-value data-subtypemas data-title data-icon data-contenttext data-cardrole');
		// remove all unusless attr and classes

		$(this).css({'background-image':'url('+background+')'});
		$(this).find('.label-power-card-wrap span').text(value);
		$(this).find('.card-game-status-role').append('<span class="'+cardRole+'"></span>');
		for(var i=0;i<subTypeMas.length;i++){
			$(this).find('.card-game-status-wrap').append('<span class="'+subTypeMas[i]+'"></span>');
		}
		$(this).find('.card-name-property p').text(titleText);
		$(this).find('.block-image-describe').prepend('<img src="'+icon+'" alt="" />');
		$(this).find('.block-text-describe-main-wrap').html(contentText);

	});

}

function cardOpenFancybox(){

	var timerFancy = null;

	$(document).on('click','.fog', function(){
    	$('.cart-open').removeClass('open');
    	setTimeout(function(){
    		$.fancybox.close();
    	},750);
	})

    $(document).on('click', '.card-popup', function(event) {

    	var itemHtml = $(this).parent().html();

        $.fancybox([{
            href : '#cart-open',
            wrapCSS:'fancybox-card-open',
            'closeBtn' : false,
            fitToView:true,
            padding:'0',
            helpers:{
            	overlay:{
            		closeClick:false
            	}
            },
            beforeLoad:function(){

            	$('.cart-open').html(itemHtml).find('.card-popup').removeClass('card-popup'); //reaquired to remove

                var cardRice = $('.cart-open .content-card-item-main').data('race');
                $('.cart-open').addClass(cardRice);

            	$('.cart-open .block-text-describe-wrap').jScrollPane({
			        contentWidth: '0px',
			        autoReinitialise:true,
			        showArrows:true,
			        verticalDragMaxHeight:20
			    });

            },
            afterLoad:function(){
            	$('.fancybox-overlay').addClass('fog'); //adding fog
            },
            afterShow:function(){
            	$('.cart-open').addClass('open');
            }
        }]);

    });

}

// /loading info about cards by class 'card-load-info'

// artem help (card moving to prevent field)

function cardMoving(){

	//select card
	function selectCard(){
		$('.user-card-stash>#sortable-user-cards>li').click(function(){
	        resetFields();
	        $('#sortable-user-cards>li').removeClass('chossen-card').addClass('grayscl');
	        $('#sortable-user-cards>li').css('margin-top', '0px');
	        $(this).addClass('chossen-card');
	        $('#sortable-user-cards>li.chossen-card').removeClass('grayscl');
	        $('#notSortableOne').html($(this).clone().removeAttr('style'));
	        $(this).css('margin-top', '-40px');

	        $('#notSortableOne').addClass('show');

	        fieldsShow($(this));

	    });
	}

	// fieltering field by cliking card
	function fieldsShow(item){

    	var type = item.find('.card-game-status-role span').attr('class');

    	$('.user .field-for-cards').addClass('unselectable-row grayscl');

    	if(type == 'bow'){
    		$('.user .field-for-cards.field-range').removeClass('unselectable-row grayscl').addClass('swapable');
    	}
    	else if(type == 'axe'){
    		$('.user .field-for-cards.field-meele').removeClass('unselectable-row grayscl').addClass('swapable');
    	}
    	else if(type == "lighting"){
    		$('.user .field-for-cards.field-super-renge').removeClass('unselectable-row grayscl').addClass('swapable');
    	}
    	else if(type == 'bow-axe'){
    		$('.user .field-for-cards.field-meele, .user .field-for-cards.field-range').removeClass('unselectable-row grayscl').addClass('swapable');
    	}
    	else if(type == 'lighting-bow'){
    		$('.user .field-for-cards.field-range, .user .field-for-cards.field-super-renge').removeClass('unselectable-row grayscl').addClass('swapable');
    	}
    	else if(type == 'lighting-axe'){
    		$('.user .field-for-cards.field-meele, .user .field-for-cards.field-super-renge').removeClass('unselectable-row grayscl').addClass('swapable');
    	}
    	else{
    		$('.user .field-for-cards').removeClass('unselectable-row grayscl').addClass('swapable');
    	}

	}

	//function card position

	function cardPositon(cardList){

		var cardsCount = cardList.length;
		var cardsPosValue = 100/(cardsCount+1);
		var currentValue = cardsPosValue;

		cardList.each(function(){
			$(this).css({'left': 'calc('+currentValue+'% - 45px)'});
			currentValue+=cardsPosValue;
		});

	}

	// card anim after chosing field
	function cardAnim(){

		$(document).on('click', '.field-for-cards.swapable', function(){

			// anim params
			var field = $(this);
			var bigCardPosLeftWrap = $('#sortable-user-cards').offset().left;
			var fieldsLeftPos = $('.fields-for-cards-wrap').offset().left;
			var fieldsLeftPosCenter = fieldsLeftPos + ($('.fields-for-cards-wrap').width()/2);
			var typeField = field.data('fieldtype');
			var topPos = field.offset().top;
			var bigCardPosTop = $('#sortable-user-cards .chossen-card').offset().top;
			var topPosDiferens = topPos - bigCardPosTop;
			var cardMovePos = null;

			var bigCardPosLeft = $('#sortable-user-cards .chossen-card').offset().left;

			if(field.find('li').length == 0){
				cardMovePos = (bigCardPosLeft - bigCardPosLeftWrap - 60) + (fieldsLeftPosCenter - bigCardPosLeft);
			}
			else{
				cardMovePos = (bigCardPosLeft - bigCardPosLeftWrap - 60) + (field.find('li:last-child').offset().left - bigCardPosLeft);
			}
			$('#sortable-user-cards .chossen-card').addClass('moving-card').css({'left':cardMovePos+'px', 'top':topPosDiferens + 'px', 'opacity':'0'});

			setTimeout(function(){

				var item = $('#sortable-user-cards .chossen-card').remove();

				field.find('ul').append(item).find('.moving-card').removeAttr('style').removeClass('moving-card chossen-card');
				cardPositon(field.find('li'));
				cardPositon($('#sortable-user-cards li'));
				$('#notSortableOne li').remove();

			}, 400);

			$('#sortable-user-cards li').removeClass('grayscl');
			$('.field-for-cards').removeClass('unselectable-row grayscl');
			$('#notSortableOne').removeClass('show');


		});

	}

	// --- //

	selectCard();
	cardAnim();

	// sort all cards

	$('.sort').each(function(){
		cardPositon($(this).find('li'));
		$(this).removeClass('sort');
	});

};

// /artem help (card moving to prevent field)

// market scripts

    function marketScripts(){

        /* change fraction in market */

            function marketChangeFraction(){

                /* ajax function by changing fraction */

                    function marketAjax(marketFractionValue){

                        $('.market-page').addClass('loading');

                        /* in what we market (cards or effects) */

                        var effects = false;

                        if($('.effect-market-wrap').length){
                            marketFractionValue = marketFractionValue + '_effects';
                            effects = true;
                        }

                        /* /in what we market (cards or effer) */

                        $.ajax({
                            url:'js/json/market_'+marketFractionValue+'.json', //'http://gwent.sheep.fish/wp-admin/admin-ajax.php'
                            data:{action:'market_cards_by_fraction', fraction:marketFractionValue},
                            success:function(data){

                                if(typeof data == 'object'){
                                    var marketData = data;
                                }else{
                                    var marketData = JSON.parse(data);
                                }

                                /* removing cards from market */

                                    $('.market-card-wrap').remove();

                                /* /removing cards from market */

                                /* removing market_effect items */

                                    $('.main-table tr').remove();

                                /* /removing market_effect items */

                                var marketDataLength = 0;

                                if(!effects){
                                    marketDataLength = marketData.cards.length;
                                }else{
                                    marketDataLength = marketData.effects.length;
                                }

                                var marketDataLogo = marketData.logo;

                                if(marketDataLogo != 'none'){
                                    $('.market-selection .select-rase-img').addClass('active').find('img').attr('src', marketDataLogo);
                                }else{
                                   $('.market-selection .select-rase-img').removeClass('active');
                                }

                                if(effects == false){

                                    /* if we in cards market change rase */

                                        marketData.cards.forEach(function(item, index){

                                            var lider = '';
                                            if(typeof item.lider != 'undefined'){
                                                lider = item.lider;
                                            }

                                            var abilitiesRow = '';
                                            item.cardAbilities.forEach(function(itemTwo, indexTwo){
                                                abilitiesRow = abilitiesRow + '<span class="' + itemTwo + '"></span>';
                                            });

                                            var cardPriceText = '';
                                            if(typeof item.cardPrice.silver != 'undefined'){
                                                cardPriceText = '<span class="card-silver-price"><img src="images/header_logo_silver.png" alt=""><span class="card-price-value">'+item.cardPrice.silver+'</span></span>';
                                            }
                                            if(typeof item.cardPrice.gold != 'undefined'){
                                                cardPriceText = cardPriceText + '<span class="card-gold-price"><img src="images/header_logo_gold.png" alt=""><span class="card-price-value">'+item.cardPrice.gold+'</span></span>';
                                            }

                                            var cardRaceImg = '<img src='+$('.user img').attr('src')+' alt="" />';
                                            if(item.cardRace != 'none'){
                                                cardRaceImg = '<img src='+item.cardRace+' alt="" />';
                                            }

                                            $('.market-cards-items-wrap').prepend('<div class="market-card-wrap"><div class="market-card-main-wrap"><div class="content-card-item-main card-popup '+lider+' '+item.cardFraction+'" style="background-image:url('+item.imageSrc+')" data-race='+item.cardFraction+'><div class="label-power-card"><span class="label-power-card-wrap"><span>'+item.cardPower+'</span></span></div><div class="hovered-items"><div class="card-game-status"><div class="card-game-status-role"><span class="'+item.cardRole+'"></span></div><div class="card-game-status-wrap">'+abilitiesRow+'</div></div><div class="card-name-property"><p>'+item.cardName+'</p></div><div class="block-describe"><div class="block-image-describe">'+cardRaceImg+'</div><div class="block-text-describe"><div class="block-text-describe-wrap"><div class="block-text-describe-main-wrap"><p>'+item.cardDescription+'</p></div></div></div></div></div></div></div><div class="card-name">'+item.cardName+'</div><div class="market-card-item-price">'+cardPriceText+'</div><div class="market-card-item-buy"><a href="#" class="button-buy" data-card-id='+item.cardId+'>Купить</a></div></div>');

                                            /* card name one height */

                                                if(index == (marketDataLength - 1)){

                                                    var cardNameHeight = 0;
                                                    var cardNameLength = $('.card-name').length;
                                                    var cardNameIndex = 0;

                                                    $('.card-name').each(function(){

                                                        if($(this).height() > cardNameHeight){
                                                            cardNameHeight = $(this).height();
                                                        }

                                                        if(cardNameIndex == (cardNameLength-1)){
                                                            $('.card-name').height(cardNameHeight);

                                                            /* remove class loading if all items added & their title height calced */

                                                            $('.market-page').removeClass('loading');

                                                            /* /remove class loading if all items added & their title height calced */
                                                        }

                                                        cardNameIndex++;

                                                    });
                                                }

                                            /* /card name one height */

                                        });

                                    /* /if we in cards market change rase */

                                }else{

                                    /* if we in effects market change rase */

                                        var mainTable = $('.main-table');

                                        mainTable.append('<tr><th class="no-border"></th><th></th><th>Название</th><th>Описание</th><th>затраты энергии</th><th colspan="2"><table><tr><th colspan="2">Цена</th></tr><tr><th>Золото</th><th>Серебро</th></tr></table></th><th>Статус</th><th>Дата  окончания</th></tr>');

                                        marketData.effects.forEach(function(item, index){

                                            var unactive = '';
                                            if(!item.status == "false"){
                                                unactive = "done";
                                            }

                                            mainTable.append('<tr><td class="effect-buy no-border"><a href="#" class="button-plus"></a></td><td class="effect-img"><img src='+item.img+' alt="" /></td><td class="effect-title">'+item.title+'</td><td class="effect-descript">'+item.descript+'</td><td class="energy-effect">'+item.energy_cost+'</td><td class="gold-tableCell">'+item.gold_cost+'</td><td class="silver-tableCell">'+item.silver_cost+'</td><td class="market-status-wrap'+unactive+'"><div class="market-status"><span></span></div></td><td class="effect-date">'+item.ending_date+'</td></tr>');

                                            if(index == (marketDataLength - 1)){

                                                $('.loading').removeClass('loading');

                                            }

                                        });

                                    /* /if we in effects market change rase */

                                }

                            }
                        });

                    }

                /* /ajax function by changing fraction */

                var marketSelection = $('.market-selection');

                marketSelection.find('.selection-rase select').change(function(){

                    marketAjax(marketSelection.find('.selection-rase select').val());

                });

                marketAjax(marketSelection.find('.selection-rase select').val());

            };

            marketChangeFraction();

        /* /change fraction in market */

        /* market buy card script */

            function marketBuyCard(){

                var cardId = null;

                /* buying card fancy opening */

                    $(document).on('click', '.market-card-item-buy .button-buy', function(e){

                        e.preventDefault();

                        cardId = $(this).data('card-id');

                        $.fancybox.open("#call_success",{
                            padding: 0,
                            fitToView: false,
                            wrapCSS: "call-popup",
                            autoSize: true,
                            'helpers': {
                                'overlay': { 'closeClick': false }
                            },
                            afterClose:function(){
                                $('#call_success').removeClass('done');
                                $('#call_success .call-title-message').text('');
                            }
                        });

                    });

                /* /buying card fancy opening */

                /* ajax calling if you want buy card */

                    $(document).on('click', '.call-subtitle a', function(e){

                        e.preventDefault();

                        if($(this).is('.button-accept')){

                            $('#call_success').addClass('loading');

                            $.ajax({
                                url:'js/json/market_card_buying_true.json', //'js/json/market_card_buying_false.json' //'http://gwent.sheep.fish/wp-admin/admin-ajax.php'
                                data:{action:'market_cards_buying', cardId:cardId},
                                success:function(data){

                                    if(typeof data == 'object'){
                                        var buyingData = data;
                                    }else{
                                        var buyingData = JSON.parse(data);
                                    }

                                    if(buyingData.buy){

                                        /* successfuly card buying and calling func to remath resurces */

                                        howMuchResursesAjax();

                                        $('#call_success').addClass('done').find('.call-title-message').text('Спасибо за покупку!');
                                        $('#call_success').removeClass('loading');

                                        /* /successfuly card buying and calling func to remath resurces */

                                    }else if(!buyingData.buy){

                                        /* error card buying */

                                        $('#call_success').addClass('done').find('.call-title-message').text(buyingData.error);

                                        /* /error card buying */

                                    }

                                    setTimeout(function(){

                                        $.fancybox.close();

                                    }, 1000);

                                    // checkpoint

                                }
                            });
                        }else{

                            $.fancybox.close();

                        }

                    });

                /* /ajax calling if you want buy card */

            }

            marketBuyCard();

        /* /market buy card script */

        /* market jscrollpane init */

            $('.market-cards-wrap').jScrollPane({
                contentWidth: '0px',
                autoReinitialise:true,
                autoReinitialiseDelay:0,
                verticalDragMaxHeight:65,
                verticalDragMinHeight:65,
                showArrows:true
            });

        /* /market jscrollpane init */

        /* special effects shop */

            var timer=null;

            function closeAnim(item){
                clearTimeout(timer);
                item.addClass('disable-anim');
                timer = setTimeout(function(){
                    $('.market-status').removeClass('disable-anim');
                },500);
            }

            $(document).on('click', '.market-status.disabled', function(event) {
                closeAnim($(this));
            });

            function chekedStatus(){
                $('.market-status:not(.disabled)').click(function(event) {
                    if($('.market-status.active').length!==3 && !$(this).is('.active') ){
                        $(this).addClass('active');
                    }else if($(this).is('.active')){
                        $(this).removeClass('active');
                    }else{
                        closeAnim($(this));
                    }
                });
            }

            chekedStatus();

        /* /special effects shop */

    }

// /market scripts

/* user race */

    function userRace(){

        $.ajax({
            url:'js/json/user_race.json',//'http://gwent.sheep.fish/wp-admin/admin-ajax.php'
            data:{action:'what_user_race'},
            method:'POST',
            success:function(data){

                var userRace = data;
                //var userRace = JSON.parse(data);

                $('body').addClass(userRace.race+'-race');
                $('.user img').attr('src', 'images/logo-'+userRace.race+'.png');

            }
        });

    }

/* user race */

/* DOCUMENT READY  */
$(document).ready(function() {

	//modernize();
	$('.footer_placeholder').height($('.footer').outerHeight());

	selectStyled();

	oneHeightItems();

	contentCardLoad();

	cardOpenFancybox();

	cardMoving();

    buyMorePopup();

    inputNumber('.num-only');

    marketScripts();

    userRace();

});

$(window).load(function(){

});

$(window).resize(function() {

    $('.footer_placeholder').height($('.footer').outerHeight());
});






