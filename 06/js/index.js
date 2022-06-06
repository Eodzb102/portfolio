'use strict';
$(function() {
    $('body .first').addClass('on');
    $('#header').addClass('on');
    $('#main').addClass('on');


    setTextAnimation ('#index #main h2', 'show-up');
    function setTextAnimation(selector, className) {
        var text = $(selector).text();
        var numText = text.length;
        var newHtml = '';
        var effectType = className;
        
        for (var i = 0; i < numText; i++) {
            if (text[i] === ' ') {
                newHtml += '<span class="blank"></span><br>';
            } else {
                newHtml += '<span>' + text[i] + ' </span>';
            }
            // console.log(i)
        }
        $(selector).html(newHtml);
        $(selector).find('span').each(function(i) {
            setTimeout(function() {$(selector).find('span:eq(' + i + ')').addClass(effectType);}, (i * 80));
        });
    }
    
    
    $('#main > ul > li > a').each(function() {
        var text =  $(this).find('strong').text();
        // console.log(text);
        var numText = text.length;
        var newHtml = '';
        
        for (var i = 0; i < numText; i++) {
            if (text[i] === ' ') {
                newHtml += '<span class="blank"></span>';
            } else {
                newHtml += '<span>'+ text[i] +' </span>';
            }
        }
        $(this).find('strong').html(newHtml);

        $(this).find('span').each(function(i) {
            $(this).css({'transform':'translate(-50%, 0) rotate('+ ((360/numText) * i) +'deg)'});
        });
    });
    
    $('.pop_up .image-slide .slide li a').on('click', function(e) {
        e.stopPropagation();
        e.preventDefault();

        var attr = $(this).attr('href');

        setTimeout(function() {
            window.open(attr);
        },1500)
        
        $('body .first').removeClass('on').addClass('off');

        setTimeout(function() {
            $('body .first').removeClass('off');
        },1500);

    });

    $('#main > ul > li > a').on('mouseenter', function() {
        $(this).find('strong').addClass('on')
    });

    $('#main > ul > li > a').on('mouseleave', function() {
        $(this).find('strong').removeClass('on')
    });

    $('#main > ul > li > a').on('click', function(e) {
        e.stopPropagation();

        $(this).next().find('.indicator li a').eq(0).addClass('on');
        $(this).next().find('.slide li').eq(0).css({'display':'block'});
        $('main').addClass('pop_up_on');
        $(this).parents('li').addClass('show');
        
    });


    $('.pop_up .image-slide .indicator li a').on('click', function(e) {
        e.stopPropagation();
        var index = $('.pop_up .image-slide .indicator li').index($(this).parent());

        $('.pop_up .image-slide .indicator li a').removeClass('on');
        $(this).addClass('on');
        $('.pop_up .image-slide .slide li').css({'display': 'none'});
        $('.pop_up .image-slide .slide li:eq('+ index +')').css({'display': 'block'});
    });

    $('.pop_up .image-slide .slide li a').on('mouseenter', function() {
        $(this).parent().addClass('on');
    });

    $('.pop_up .image-slide .slide li a').on('mouseleave', function() {
        $(this).parent().removeClass('on');
    });


    $(document).click(function(e) {
        if(!$(e.target).parents('li').hasClass('.show') && $('#main ul li.show .pop_up').is(':visible')) {
            $('.pop_up .image-slide .indicator li a').removeClass('on');
            $('.pop_up .image-slide .slide li').css({'display': 'none'});
            $(this).next().find('.slide li').eq(0).css({'display':'block'});


            $('#main').removeClass('pop_up_on');
            $('#main > ul > li').removeClass('show');
        }
    });


});