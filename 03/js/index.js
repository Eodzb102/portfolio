$(function(){

  // a #올라가는거 막는거 
  $(document).on('click', 'a[href="#"]', function(e) {
      e.preventDefault()
  });

  // scroll 하면 색상 변경
  setGnb()
  function setGnb() {
    $(window).on('scroll', function() {
      var scrollTop = $(document).scrollTop();
      if (scrollTop > 50) {
        $('#header').addClass('on');
      } else {
        $('#header').removeClass('on enter');
      }
    });  
    
    
    // mouse enter 하면 sub_nav 나오고 on 붙이기 
    $('#header').on('mouseenter focusin', function() {
      $(this).addClass('on');
    });
    
    $('#header .gnb').on('mouseenter focusin', function() {
      var barLeft = $(this).position().left;
      var barWidth = $(this).outerWidth();
      $('.header_inner .nav_gnb dd').css({'display': 'none'});
      $(this).next().css({'display': 'block'});
      $('#header').addClass('on enter');
      $('#header .gnb').removeClass('on');
      $(this).addClass('on');

      $('#header span.bar').css({'left': barLeft + 'px', 'width': (barWidth)+ 'px'});
    });

    
    $('#header .nav_gnb dd').on('mouseleave', function() {
      $('#header .gnb').removeClass('on');
      $('#header').removeClass('enter');
      $(this).slideUp();
      $('#header span.bar').css({'width': 0});
    });  

  }
  

  $('#story .quick_bar li:last-child a').on('click', function() {
    if ($('#story .quick_bar li:last-child a').text() == '더보기') {
      $(this).text('닫기')
    } else {
      $(this).text('더보기')
    }
    $('#story .quick_bar li:nth-child(4), #story .quick_bar li:nth-child(5)').slideToggle();
    $('#story .quick_bar').toggleClass('on')
  })


  setImageSlide('#story .image-slide', 'fade', 1, true, 3000);
  setImageSlide('#news .news_cont .image-slide','fade', 1, true, 3000);
  setImageSlide('#business .image-slide','left', 1, false, 500);

  // setImageSlide('#business .image-slide', 1);
  // 슬라이드 
  function setImageSlide(selector, type, first, started, speed ) {
    var numSlide = $(selector).find('.slide li').length;
    var slideNow = 0;
    var slideNext = 0;
    var slidePrev = 0;
    var firstSlide = first;
    var timerId = '';
    var timerSpeed = speed;
    var isTimerOn = started;
    var showType = type;

    if (isTimerOn === true) {
      $(selector).find('.control .play').addClass('on');
    } else {
        $(selector).find('.control .play').removeClass('on');
    }

    $(selector).find('.control .play').on('click', function() {
      if (isTimerOn === true) {
        clearTimeout(timerId);
        $(this).addClass('on');
        isTimerOn = false;
      } else {
        timerId = setTimeout(function (){showSlide(slideNext)}, timerSpeed);
        $(this).removeClass('on');
        isTimerOn = true
      }
    });

    $(selector).find('.indicator li a').on('click', function() {
      var index =  $(selector).find('ul.indicator li').index($(this).parent());
      showSlide(index + 1);
    });

    $(selector).find('p.control a.prev').on('click', function() {
      showSlide(slidePrev);
    });

    $(selector).find('p.control a.next').on('click', function() {
      showSlide(slideNext);
    });


    showSlide(firstSlide)

    function showSlide (n) {
      clearTimeout(timerId);
      if (showType === 'left') {
          $(selector).find('.slide').css({'transition':'none', 'left': -((n - 1) * 100) + '%'});
          $(selector).find('.slide').css({'transition':'all 0.3s', 'left': -((n - 1) * 100) + '%'});
      } else if (showType === 'fade') {
        $(selector).find('.slide li').css({'opacity': '0'});
        $(selector).find('.slide li:eq('+ (n - 1) + ')').css({'opacity': '1'});
      }
      $(selector).find('.indicator li a').removeClass('on');
      $(selector).find('.indicator li:eq('+ (n - 1) + ') a').addClass('on');
      
      slideNow = n;
      slidePrev = (n === 1) ? numSlide : (n - 1);
      slideNext = (n === numSlide) ? 1 : (n + 1);
      // alert( slidePrev + '/' + slideNow + '/' + slideNext )
      
      // 타이머 실행 함수
      if (isTimerOn === true) {
          timerId = setTimeout(function (){showSlide(slideNext)}, timerSpeed)
      }
    }
  }

  $('#news .news_card ul li a').on('click', function() {
    var index = $('#news .news_card ul li').index($(this).parent());
    $('#news .news_card ul li a').removeClass('on');
    $(this).addClass('on');
    $('#news .news_card > div').css({'display': 'none'});
    $('#news .news_card > div:eq('+ index +')').css({'display': 'block'});
  })

  // 배너
  var numBanner = $('div.banner-slide ul.banner li').length;
  var bannerNow = 0;
  var bannerPrev = 0;
  var bannerNext = 0;
  var widthBox = $('div.banner-slide div.banner_box').innerWidth();
  var widthBar = 0;
  var minOffsetLeft = 0;
  var timerId = '';
  var timerSpeed = 3000;
  var isTimerOn = true;

  $('div.banner-slide ul.banner li').each(function() {
    widthBar += $(this).outerWidth(true); 
  });

  $('div.banner-slide ul.banner').css({'width': widthBar + 'px'}); 
  minOffsetLeft = widthBox - widthBar; 

  $('div.link_banner p.control a.prev').on('click', function() {
    showBanner(bannerPrev);
  })
  $('div.link_banner p.control a.next').on('click', function() {
    showBanner(bannerNext);
  })
  
  showBanner(1)
  function showBanner(n) {
    clearTimeout(timerId);
    var offsetLeft = -$('div.banner-slide ul.banner li:eq(' + (n - 1) + ')').position().left;
    if (offsetLeft <= minOffsetLeft) { 
    offsetLeft = minOffsetLeft 
    numBanner = n;   
    // 
    }
    
    $('div.banner-slide ul.banner').stop(true).animate({'left': offsetLeft + 'px'},300);
    bannerNow = n;
    bannerPrev = (n === 1) ? numBanner : (n - 1);
    bannerNext = (n === numBanner) ? 1 : (n + 1);

    // 타이머 실행 함수
    if (isTimerOn === true) {
      timerId = setTimeout(function (){showBanner(bannerNext)}, timerSpeed)
    }
  }

  // footer 패밀리 사이트
  $('footer .f_bot .family_site').on('click', function() {
    $(this).toggleClass('on');
  })

  // 모바일 맵 
  $('.m_header .icon_menu').on('click', function() {
    $('.m_map_bg').addClass('on');
    $('.m_header .m_map_bg .m_map').css({'width': '70%'})
  })

  $('.m_header .m_map .close a').on('click', function() {
    $('.m_header .m_map_bg').removeClass('on');
  })

  $('.m_header .m_map dl dt a').on('click', function() {
    var index = $('.m_header .m_map dl dt').index($(this).parent())
    $('.m_header .m_map dl dt').removeClass('on');
    $('.m_header .m_map dl dt:eq('+ index + ')').addClass('on');

  })
  $('.m_header .m_map dl dd > a').on('click', function() {
    $('.m_header .m_map dl dd ul').stop().slideUp();
    $(this).next().slideToggle();
  });



  

})