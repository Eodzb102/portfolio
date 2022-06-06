$(function(){
  
  $(document).ready(function(){
    preventDefaultAnchor();   
  });

  function preventDefaultAnchor() {
    $(document).on('click', 'a[href="#"]', function(e) {
        e.preventDefault();
    });
  }


  //  한국어 클릭
  $('div.language > a').on('click focus', function(e) {
    e.stopPropagation(); // 이벤트 버블링 없애주는거 
    $(this).toggleClass('on');  
  });

  $('#header .language ul li:last-child a').on('focusout', function() {
    $('div.language > a').removeClass('on');
  })

  $('#gnb > ul > li > a').on('mouseenter focus', function() {
    $('#gnb > ul > li > ul').css({'display': 'none'});
    $(this).next().css({'display': 'block'});
    if ($(this).parent().find('ul').length >= 1) {
      $('#header').addClass('on');
    } else {
      $('#header').removeClass('on');
    }
  });

  $('#header #gnb > ul > li:last-child ul li:last-child a').on('focusout', function() {
    $('#header #gnb > ul > li:last-child ul').css({'display': 'none'});
    $('#header').removeClass('on')
  })

  $('#header').on('mouseleave', function() {
      $('#gnb > ul > li > ul').css({'display': 'none'});
      $('#header').removeClass('on');
  });

  // 메인 슬라이드
  var numSlide = $('div.image_slide ul.slide_wrap li').length
  var slideNow = 0;
  var slideNext = 0;
  var slidePrev = 0;
  var firstSlide = 1;
  // 타이머 변수
  var timerId = '';
  var timerSpeed = 5000;
  var isTimerOn = true; 


  // 타이머 이미지 바꾸기 이거는 처음 시작일때  
  if (isTimerOn === true) {
      $('div.image_slide p.control a.play').addClass('on');
  } else {
      $('div.image_slide p.control a.play').removeClass('on');
  }

  // 타이머 클릭했을때 
  $('div.image_slide p.control a.play').on('click', function (){
      if (isTimerOn === true) {
          clearTimeout(timerId);
          $(this).removeClass('on');
          isTimerOn = false;
      } else {
          timerId = setTimeout(function (){showSlide(slideNext)}, timerSpeed);
          $(this).addClass('on');
          isTimerOn = true
      }
  });


  $('.image_slide .indicator li a').on('click', function (){
      var index = $('.image_slide .indicator li').index($(this).parent());
      showSlide(index + 1);
      // alert('에라이')
  });

  $('.main_slide > a:eq(0)').on('click', function (){
    showSlide(slidePrev);
    // alert('prev');
  });

  $('.main_slide > a:eq(1)').on('click', function (){
    showSlide(slideNext);
  });

  showSlide(firstSlide)

  function showSlide (n) {
      clearTimeout(timerId);
      if (slideNow === n) return false;
      if (slideNow !== 0) {
        $('.image_slide .slide_wrap li:eq(' + (slideNow - 1) + ')').removeClass('on').addClass('off').one('animationend', function() {
            $(this).removeClass('off');  /* css에 off 를 붙이면 z-index가 20 이라서 클릭이 안됌 그래서 on을 때고 off를 붙이고 애니메이션 끝나고 off를 때라 (one)이벤트는 한번만 하고 버리는거 (animationend)애니메이션 끝나고 라는거  */
        });
      }
      $('.image_slide .slide_wrap li:eq(' + (n - 1) + ')').addClass('on');
      $('.image_slide .indicator li').removeClass('on');
      $('.image_slide .indicator li:eq(' + (n - 1) + ')').addClass('on');

      slideNow = n;
      slidePrev = (n === 1) ? numSlide : (n - 1);
      slideNext = (n === numSlide) ? 1 : (n + 1);
      // alert( slidePrev + '/' + slideNow + '/' + slideNext )

      // 타이머 실행 함수
      if (isTimerOn === true) {
          timerId = setTimeout(function (){showSlide(slideNext)}, timerSpeed)
      }
  }

  // 탭메뉴
  $('.gift_menu .tab_view:first-child').addClass('on');
  $('.tab li:first-child a').addClass('on');
  $('.tab li a').on('click', function() {
    var index = $('.tab li').index($(this).parent());
    // alert(index)
    $('.tab li a').removeClass('on');
    $(this).addClass('on');
    $('.gift_menu .tab_view').removeClass('on');
    $('.gift_menu .tab_view:eq('+ index +')').addClass('on');
  })

  // 배너
  instarBanner('.with')
  instarBanner('.instar')
  function instarBanner(selector) {
    
    var numBanner = $(selector).find('.figure ul li').length;
    // alert(numBanner)
    var bannerNow = 0;
    var bannerPrev = 0;
    var bannerNext = 0;
    var widthBox = $(selector).find('.figure').innerWidth(); // 여기서는 마지막 빈공간 없애기 
    var widthBar = 0;
    var minOffsetLeft = 0;  // offsetleft 값인데 왼쪽으로 최대한 갈수 있는 값 box를 삐져나간 값
    

    $(selector).find('.figure ul li').each(function() {
      widthBar += $(this).outerWidth(true);    // += 증가 시키는 연산자  마진까지 포함 해야 하기 때문ㅇ에 .outerWidth(true) 함니다.
    });
    $(selector).find('.figure ul').css({'width': widthBar + 'px'});  // 위에서 구한 값을 씌우기
    minOffsetLeft = widthBox - widthBar;  // 박스에서 막대기 값 빼기 음수 나올라고 


    $(selector).find('.figure .control a.next').on('click', function() {
      showBanner(bannerNext);
      // alert('되고있다 ')
    })
    
    // showBanner(2)
    function showBanner(n) {
      //  css 넣을 left 값 왼ㅉ고으로 빠져나가야 되니가 - 한다
      var offsetLeft = -$(selector).find('.figure ul li:eq(' + (n - 1) + ')').position().left;
      // alert(minOffsetLeft)
      if (offsetLeft <= minOffsetLeft) {
        offsetLeft = minOffsetLeft  
        numBanner = n;   
      }

      $(selector).find('.figure ul').stop(true).animate({'left': offsetLeft + 'px'},300);
      bannerNow = n;
      bannerPrev = (n === 1) ? numBanner : (n - 1);
      bannerNext = (n === numBanner) ? 1 : (n + 1);
      
      // console.log(bannerPrev + '/' + bannerNow + '/' + bannerNext)
    }
  }

  
  // event 배너
  $('.banner .event').click(
    function(){
      alert('아모레 퍼시픽 공식 사이트몰 로 이동합니다!!')
  })


  // 서브 1에서만 실행 되게끔!! 에러 비슷한게 뜹니다.
  if ($('body').hasClass('sub1')) {
    // console.log('실행')
    pageScroll('.sub1')
  } else if ($('body').hasClass('sub5')) {
    // console.log('실행x')
    return false
  }


  //  브랜드 스토리 원페이지 스크롤
  function pageScroll(selector) {
    // console.log('pageScroll 실행!!')
    var numPage = $(selector).find('section').length;
    var pageNow = 0;
    var pagePrev = 0;
    var pageNext = 0;
    var eventScroll = '';
    var onAnimation = false;
  
    eventScroll = ('onmousewheel' in window) ? 'mousewheel' : 'DOMMouseScroll';
  
    $(selector).find('.indicator li a').on('click', function() {
      if (onAnimation === true) return false;
      var index = $(selector).find('.indicator li').index($(this).parent());
      // alert(index);
  
      // 문제 n가져올때 내까지 으로는 다 올라고 뒤로는 내려가게 
      // $('.sub1 section').css({'top': '0'})
      $(selector).find('section:eq('+ index +')').prevUntil('main').stop(true).animate({'top': '0'},1000, function() {
        onAnimation = true;
      });
      $(selector).find('section:eq('+ (index - 1) +')').nextUntil('ul').stop(true).animate({'top': '100vh'},1000, function() {
        onAnimation = true;
      });
      showPage(index + 1);
      // console.log(onAnimation)
    })
  
    showPage(1);
    
    window.addEventListener(eventScroll, function(e) {
      e.preventDefault();
      // if ($('body.sub1') === false ) return false;
      if(onAnimation === true) return false;
      var delta = (eventScroll === 'mousewheel') ? (e.wheelDelta / -120) : (e.detail / 3);// wheelDelta 크롬 ie detail 은 파폭
      // console.log(delta)
      if (delta > 0) {
        showPage(pageNext);
        // console.log('pageNext 실행!!' + '/' + pageNow)
      } else if (delta < 0) {
        prevPage(pagePrev);
        // console.log('pagePrev 실행!!' + '/' + pageNow)
      }
      
    }, {passive: false});
  
    
    function showPage(n) {
      $(selector).find('section').find('.fade_in').removeClass('on');
      onAnimation = true;
      $(selector).find('section:eq('+ (n - 1) +')').stop(true).animate({'top': 0}, 1000, function() {
        onAnimation = false;
        // alert($(this).hasClass()) 
        $(this).find('.fade_in').addClass('on');
      });
      $(selector).find('.indicator li').removeClass('on');
      $(selector).find('.indicator li:eq('+ (n - 1) +')').addClass('on');
      
      pageNow = n;
      pagePrev = (n === 1) ? 1 : (n - 1);
      pageNext = (n === numPage) ? numPage : (n + 1);
  
    }
  
    function prevPage(n) {
      $(selector).find('section').find('.fade_in').removeClass('on');
      onAnimation = true;
      $(selector).find('section:eq('+ (n) +')').stop(true).animate({'top': '100vh'}, 1000, function() {
        onAnimation = false;
        $(this).find('.fade_in').addClass('on');
      });
      $(selector).find('.indicator li').removeClass('on');
      $(selector).find('.indicator li:eq('+ (n - 1) +')').addClass('on');
      
      pageNow = n;
      pagePrev = (n === 1) ? 1 : (n - 1);
      pageNext = (n === numPage) ? numPage : (n + 1); 
  
    } 
  }

  $('footer .container .top_btn').on('click', function() {
    // alert('zzzzzzzz')
    $('html,body').animate({'scrollTop': 0},400)
  })




  

  
  
  
  
});