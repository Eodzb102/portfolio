$(function() {

  $(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault()
  });

  // 스크롤헤더 pc
  var hasBusiness = $('body').hasClass('business_guide');
  // 해당된느게 많은 조건 을 위에 먼저 쓴다ㅏㅏㅏ 
  function setScrollUI() {
    var scrollTop = $(document).scrollTop();
    if (scrollTop > 50 && hasBusiness ) {
      $('#header_pc').addClass('on top');
    } else if (scrollTop > 50 ) {
      $('#header_pc').addClass('on');
    } else {
      $('#header_pc').removeClass('on top');
    }
    }
  
  // 스크롤헤더 모바일
  function setScrollUIM() {
    var scrollTop = $(document).scrollTop();
    if (scrollTop > 50 && hasBusiness ) {
      $('#header_mobile').addClass('on top');
    } else if (scrollTop > 50 ) {
      $('#header_mobile').addClass('on');
    } else {
      $('#header_mobile').removeClass('on top');
    }
  }

  $('#header_pc .s_nav > li + li').on('focusout', function() {
    $('#header_pc').removeClass('over');
  })



  // scroll 이벤트 실행
  setScrollUI();
  $(window).on('scroll', function() {
    if(hasBusiness) {
      setScrollUI();
      setScrollUIM();
    } else {
      setScrollUI();
      setScrollUIM();
      scrollGrowth('#main .gs_growth');
      scrollGrowth('#main .challenge');
    }
  });

  function scrollGrowth(selector) {
    var scrollTop = $(document).scrollTop();
    var topArea = $(selector).outerHeight();
    var scroll = (scrollTop - $(selector).offset().top);
    var minScroll = $(selector).offset().top - $(window).height();
    var maxScroll = $(selector).offset().top + $(selector).outerHeight();
    // console.log(positionTop)

    // 스크롤 클래스
    if (scrollTop > maxScroll) {
      if ($(selector).hasClass('up') !== true) {
        $(selector).addClass('up');
        $(selector).removeClass('down now');  
        $(selector).children().removeClass('on');
      }
    } else if (scrollTop > minScroll) {
      if ($(selector).hasClass('now') !== true) {
        $(selector).addClass('now');
        $(selector).removeClass('up down');
        setCount($('ul.setCount li:eq(1) p + p em'));
        setCount($('ul.setCount li:eq(2) p + p em'));
      }
      if (scrollTop > topArea/4) {
        $(selector).find('h3').css({'top': 120  + -(scroll / 8)}).addClass('on') ;
      } if (scrollTop > topArea/3) {
        $(selector).find('h3 + p').css({ 'top': 200 - (scroll / 8)}).addClass('on');
      } if (scrollTop > topArea/3.5) {
        $(selector).find('.gs_video').css({ 'top': 280 - (scroll / 8)}).addClass('on');
        $(selector).find('.gs_text').css({ 'top': 810 - (scroll / 8)}).addClass('on');
        $(selector).find('.product').css({ 'top': 280 - (scroll / 8)}).addClass('on');
        $(selector).find('.info_icons').css({ 'top': 700 - (scroll / 8)}).addClass('on');
      }
    } else {
      if ($(selector).hasClass('down') !== true ) {
        $(selector).addClass('down');
        $(selector).removeClass('up now');
        $(selector).children().removeClass('on');
      }
    }
  }

  // 성장과 변화 숫자 
  setCount($('.result ul li:eq(1) em'))
  setCount($('.result ul li:eq(2) em'))

  function setCount(selector, step, duration) {
    var targetNumber = parseInt($(selector).text());
    // alert(targetNumber)
    var numberNow = 0;
    var timerId = '';
    $(selector).text('0');
    timerId = setInterval(function() {
      numberNow += 7527;
      if (numberNow >= targetNumber) {
        numberNow = targetNumber;
        numberNowComma = numberNow;
        $(selector).text(numberNowComma);
        clearInterval(timerId);
      } else {
        $(selector).text(numberNow);
      }
    }, 30);
  }

  // 시작하면 nav search 위아래 나오기
  $('#header_pc').animate({'top': 0},1000);
  $('#main .main_visual .product_search').animate({'bottom': 0},300);

  // 돋보기누르면 나오기 / 닫기
  $('#header_pc .s_nav .search > a').on('click', function() {
    $('#header_pc .product_search').addClass('on')
  })
  $('#header_pc .product_search > a').on('click', function() {
    $('#header_pc .product_search').removeClass('on')
  })

  // gnb 나오기 나가기
  $('.gnb').on('mouseenter focusin', function() {
    $('#header_pc').addClass('over');
  })
  $('#header_pc').on('mouseleave', function() {
    $('#header_pc').removeClass('over');
  })

  // lang 토글
  $('#header_pc .s_nav > li + li > a').on('click', function() {
    $(this).parent().toggleClass('on');      
  })

  // 모바일 메뉴
  $('#header_mobile > a').on('click', function() {
    $(this).toggleClass('close');
    $('#header_mobile .gnb').toggleClass('on');
  })  

  // 모바일 검색 열기 닫기
  $('#header_mobile .s_nav .search > a').on('click', function() {
    $('#header_mobile .product_search').addClass('on')
  })
  $('#header_mobile .product_search > a').on('click', function() {
    $('#header_mobile .product_search').removeClass('on')
  })

  // lang 모바일
  $('#header_mobile .gnb > li + li > a').on('click', function() {
    $(this).parent().toggleClass('on');
    $(this).next().slideToggle();
  })

  $('#main .main_visual ul li').on('mouseenter', function() {
    if ($(window).width() > 1024) {
      $('#main .main_visual ul li').animate({'width':'25%'},1); 
      $('#main .main_visual ul li').on('mouseenter', function() {
        $(this).animate({'width': '40%'},1 , function() {
          $(this).addClass('showNow');
        });
        $(this).siblings().animate({'width': '20%'}, 1);
      });
    }
  });

  // resize 할때 막기
  $(window).resize(function() {
    if ($(window).width() <= 1024) {
      $('#main .main_visual ul li').animate({'width': '100%'});
      $('#main .main_visual ul li').off('mouseenter');
      $('#main .main_visual ul').off('mouseleave');
    } else if ($(window).width() > 1024) {
      $('#main .main_visual ul li').css({'width':'25%'});
      $('#main .main_visual ul li').on('mouseenter', function() {
        $(this).css({'width': '40%'}, function() {
          $(this).addClass('showNow');
        });
        $(this).siblings().css({'width': '20%'});
      });
      // $('#main .main_visual ul').on('mouseleave', function() {
      //   $('#main .main_visual ul li').css({'width': '25%'}); 
      // })
    }
  })

  $('#main .main_visual ul li').on('mouseleave', function() {
    $('#main .main_visual ul li').removeClass('showNow');
  });

  $('#main .main_visual ul').on('mouseleave', function() {
    if ($(window).width() > 1024) {
      $('#main .main_visual ul li').css({'width': '25%'}); 
    }
  });

  // business_guide header 메뉴
  $('.business_guide #header_pc.top .menu_select > dt > a').on('click', function() {
    $($('.business_guide .menu_select')).toggleClass('on');
  })
  $('.business_guide #header_mobile.top .menu_select > dt > a').on('click', function() {
    $($('.business_guide .menu_select')).toggleClass('on');
  })
  $('.business_guide .menu_select > dt > a').on('click', function() {
    $($('.business_guide .menu_select')).toggleClass('on');
  })

  // business_guide 탭메뉴
  $('.business_guide .history dl:eq(0)').addClass('on');
  $('.business_guide .history dl dt a').on('click', function() {
    if ($('.business_guide .history dl').hasClass('on')) {
      $('.business_guide .history dl').removeClass('on');
    }
      $(this).parents('dl').addClass('on');
  });

  // footer 영역
  $('#footer .family_site > a').on('click', function() {
    $(this).next().toggleClass('on');
    // alert('ddd?')
  })
  $('#main .fixed_icon p a').on('click', function() {
    $('html,body').animate({'scrollTop': 0},400)
  })



});