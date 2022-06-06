$(function() {

    $(document).on('click', 'a[href="#"]', function(e) {
        e.preventDefault()
    });

    
    $('#header .gnb > ul > li > a').on('mouseenter focus', function() {
        var next12 = $(this).next().text();
        // alert(next12);
        $(this).parent().addClass('on');
        
        if (next12 === '') {
            // 없으면 아무것도 하지마
        } else {
            $('#header').addClass('on');
        }

        // alert($(this)
    })
    
    $('#header .gnb > ul > li').on('mouseleave', function() {
        $('#header .gnb > ul > li > a').parent().removeClass('on');
        $('#header').removeClass('on');
    })

    $(window).on('scroll', function() {
        setScrollUI();
    })

    setScrollUI();
    function setScrollUI() {
        var scrollTop = $(document).scrollTop();
        console.log(scrollTop)
        if (scrollTop > 850) {
            $('#header .fixed').addClass('on');
            fixedClick();
        } else {
            $('#header .fixed').removeClass('on');
        }
    }


    function fixedClick () {
        $('#header .fixed .guide > li > a').on('click', function (){
            $('#header .fixed .guide > li > a').next().removeClass('on');
            $(this).next().toggleClass('on');
        });

        $('.fixed .gnb_menu > div > a').on('click', function (){
            $(this).toggleClass('on');
            if ($('.fixed .gnb_menu > div > a > p').text() == 'MENU') {
                $('.fixed .gnb_menu > div > a > p').text('CLOSE')
            } else {
                $('.fixed .gnb_menu > div > a > p').text('MENU')
            }
            $('.fixed .gnb_menu > div + div').toggleClass('on');
        });
    }

    $('.fixed .scroll_top a').on('click', function() {
        $('html,body').animate({'scrollTop': 0},400)
    })

    // 메인슬라이드
    mainSlide('#main_visual .slide_wrap')
    // 슬라이드 next prev 없는거
    function mainSlide (selector ) {
        var numSlide = $(selector).find('.slider li').length
        var slideNow = 0;
        var slideNext = 0;
        var slidePrev = 0;
        var firstSlide = 1;
        // 타이머 변수
        var timerId = '';
        var timerSpeed = 5000;
        var isTimerOn = true; 


        $(selector).find('.indicator li a').on('click', function (){
            var index = $(selector).find('.indicator li').index($(this).parent());
            showSlide(index + 1)
        });


        showSlide(firstSlide)

        function showSlide (n) {
            clearTimeout(timerId);
            $(selector).find('.slider li').css({'opacity': '0'}).removeClass('on');
            $(selector).find('.slider li:eq('+ (n - 1) + ')').css({'opacity': '1'}).addClass('on');
            $(selector).find('.indicator li').removeClass('on');
            $(selector).find('.indicator li:eq('+ (n - 1) + ')').addClass('on');

            slideNow = n;
            slidePrev = (n === 1) ? numSlide : (n - 1);
            slideNext = (n === numSlide) ? 1 : (n + 1);

            // 타이머 실행 함수
            if (isTimerOn === true) {
                timerId = setTimeout(function (){showSlide(slideNext)}, timerSpeed)
            }
        }
    }

    // 멤버쉽 인디케이터 없는거 
    noIndicator ('#membership')
    noIndicator ('#news .news_card')
    function noIndicator (selector) {
        var numSlide = $(selector).find('ul li').length;
        var slideNow = 0;
        var slideNext = 0;
        var slidePrev = 0;
        var firstSlide = 1;


        $(selector).find('.control .prev').on('click', function() {
            // alert('d?')
            showSlide(slidePrev);
        });
    
        $(selector).find('.control .next').on('click', function() {
            showSlide(slideNext);
        });

        showSlide(firstSlide)

        function showSlide (n) {
            $(selector).find('li').css({'opacity': '0'}).removeClass('on');
            $(selector).find('li:eq('+ (n - 1) + ')').css({'opacity': '1'}).addClass('on');

            slideNow = n;
            slidePrev = (n === 1) ? numSlide : (n - 1);
            slideNext = (n === numSlide) ? 1 : (n + 1);
        }
    }


    // 무한 배너
    setCardInfinite('.card_slide');
    
    function setCardInfinite(selector) {
        var numCard = $(selector).find('ul li').length;
        var cardNow = 0;
        var cardPrev = 0;
        var cardNext = 0;
        var widthBox = $(selector).innerWidth();
        var widthBar = 0;
        var offsetLeft = 0;
        var minNumCard = 0;

        // li width 더하고 data-num 속성 추가
        $(selector).find('ul li').each(function(i) {
            widthBar += $(this).outerWidth(true);
            $(this).attr({'data-num': (i + 1)});
        });
        $(selector).find('ul').css({'width': widthBar + 'px'});

        checkMinNumCard();
        showCard(1)

        
        $('.card_slide  .control .prev').on('click', function() {
            showCard(cardPrev)    
        })
        $('.card_slide  .control .next').on('click', function() {
            showCard(cardNext)
        })

        // 이거는 기존 슬라이드 느낌
        function showCard (n) {
            checkVisibility(n);
            var $cardNow = null;
            $(selector).find('ul li').each(function() {
                if (Number($(this).attr('data-num')) === n) {
                    $cardNow =$(this);
                    return false; 
                }
            });
            offsetLeft = -$cardNow.position().left + (widthBox / 2) - $cardNow.outerWidth() / 2;  
            if (cardNow === 0) {
                $(selector).find('ul').css({'transition': 'none', 'left': offsetLeft + 'px'});
            } else {
                $(selector).find('ul').css({'transition': 'left 0.5s', 'left': offsetLeft + 'px'});
            }
            $(selector).find('ul li').removeClass('on');
            $cardNow.addClass('on');

            cardNow = n;
            cardPrev = (n - 1) < 1 ? numCard : n - 1;
            cardNext = (n + 1) > numCard ? 1 : n + 1;
        }

        // 폭보다 ㅏ작들때 움직이지 않아도 됄때 느낌
        function checkMinNumCard() {
            var widthBox = $(selector).innerWidth();
            var sumWidth = 0;
            $(selector).find('ul li').each(function(i) {
                sumWidth += $(this).outerWidth(true);
                if (sumWidth > widthBox) {
                    // 정수로 나누기
                    minNumCard = Math.floor((i + 1) / 2);
                    return false
                }
            })
        }

        // 공백이 생기면 하나를 끍어다 가지고오는거 쓰는거 
        function checkVisibility(n) {
            var $cardNow = null;
            $(selector).find('ul li').each(function() {
                if (Number($(this).attr('data-num')) === n) {
                    $cardNow = $(this);
                    return false;
                }
            });
            for (var i = $cardNow.prevAll().length; i < minNumCard; i++) {
                $cardNow.parent().prepend($(selector).find('ul li:last').clone());
                $(selector).find('ul li:last').remove();
                offsetLeft -= $(selector).find('ul li:eq(0)').outerWidth(true);
                $(selector).find('ul').css({'transition': 'none', 'left': offsetLeft + 'px'});
                console.log(offsetLeft);
            }
            for (var i = $cardNow.nextAll().length; i < minNumCard; i++) {
                $cardNow.parent().append($(selector).find('ul li:eq(0)').clone());
                $(selector).find('ul li:eq(0)').remove();
                offsetLeft += $(selector).find('ul li:last').outerWidth(true);
                $(selector).find('ul').css({'transition': 'none', 'left': offsetLeft + 'px'});
            }
        }

    }



})