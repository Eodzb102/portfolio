$(function() {


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
  

  scrollGrowth('#main .gs_growth');
  scrollGrowth('#main .challenge');
  function scrollGrowth(selector) {
    var scrollTop = $(document).scrollTop();
    var topArea = $(selector).outerHeight();
    var scroll = (scrollTop - $(selector).offset().top);
    var minScroll = $(selector).offset().top - $(window).height();
    var maxScroll = $(selector).offset().top + $(selector).outerHeight();
    // console.log(positionTop)

    // 스크롤 클래스
    if (scrollTop > maxScroll) {
      // console.log('위');
      $(selector).addClass('up');
      $(selector).removeClass('down now');  
      $(selector).children().removeClass('on');
    } else if (scrollTop > minScroll) {
      // console.log('지금');
      $(selector).addClass('now');
      $(selector).removeClass('up down');
      if (scrollTop > topArea/4) {
        $(selector).find('h3').css({'top': 120  + -(scroll / 8)}).addClass('on') ;
        // console.log(190  -(scrollTop / 15))
      } if (scrollTop > topArea/3) {
        $(selector).find('h3 + p').css({ 'top': 200 - (scroll / 8)}).addClass('on');
      } if (scrollTop > topArea/3.5) {
        $(selector).find('.gs_video').css({ 'top': 280 - (scroll / 8)}).addClass('on');
        $(selector).find('.gs_text').css({ 'top': 810 - (scroll / 8)}).addClass('on');
        $(selector).find('.product').css({ 'top': 280 - (scroll / 8)}).addClass('on');
        $(selector).find('.info_icons').css({ 'top': 700 - (scroll / 8)}).addClass('on');
      }
    } else {
      // console.log('아래');
      $(selector).addClass('down');
      $(selector).removeClass('up now');
      $(selector).children().removeClass('on');
    }
  }



  /* 이게 안됀이유 사실 되기는 했지만 이렇게 하려면 pc2개 모바일 2개 해서 총 4개가 필요했음 */
  // scrollChallenge();
  // function scrollChallenge() {
  //   var scrollTop = $(document).scrollTop();
  //   var showTop = $(document).scrollTop() - $(window).height();
  //   var top = $('.challenge').outerHeight();
  //   var minScroll = $('.challenge').offset().top - $(window).height();
  //   var maxScroll = $('.challenge').offset().top + $('.challenge').outerHeight();

  //   if (scrollTop > maxScroll) {
  //     $('.challenge').addClass('up');
  //    $('.challenge').removeClass('down now');
  //    $('.challenge').children().removeClass('on');
  //   } else if (scrollTop > minScroll) {
  //     $('.challenge').addClass('now');
  //     $('.challenge').removeClass('up down');
  //     if (scrollTop > top/2) {
  //       $('.challenge > h3').css({'top':250 + -(showTop /15)}).addClass('on');
  //     } if (scrollTop > top/4) {
  //       $('.challenge > h3 + p ').css({'top':300  + -(showTop /20)}).addClass('on');
  //     } if (scrollTop > top/4) {
  //       $('#main .challenge .product').css({'top': 430  + -(showTop /13)}).addClass('on');
  //       $('#main .challenge .info_icons').css({'top':820  + -(showTop /20)}).addClass('on');
  //     }
  //   } else {
  //     $('.challenge').addClass('down');
  //     $('.challenge').removeClass('up now');
  //     $('.challenge').children().removeClass('on');
  //   }
  // }


  /* 이게 안된 이유 scrollChallenge 실행할 경우 위로 올라갈때 와 내려갈때 값을 다르게 주어서 if문을 썻는데 음... 조건을 어떻게 써야할지 몰라서 이렇게 씀 영역 잡기 애매함 그리고 on클라스도 한번에 들어가버림 */
  // function scrollChallenge(selector, top) {
  //   var scrollTop = $(document).scrollTop();
  //   // scroll 은 스크롤 양이 너무 커버려서 해당영역에 닿으면 그때무터 스크롤양이 체크됬으면 해서 나온거임

  //   // 이게 위영역          바로 이부분 if 어떻게 쓸거니?
  //   $(selector).css({ 'top': top - scroll / 20+'px'}).addClass('on');
  //   // 아래 영역
  //   $(selector).css({ 'top': top - scrollTop/ 15 +'px'}).addClass('on');

  //   // console.log(scrollTop)
  // }

  //  위에거 하다가 바로 켜지자마자 실행되서 영역을 잡으려고 ㅐㅎㅆ지만? else부분처럼 다써야 했었고 일단 안됨
  // function checkVisibility (selector) {
  //   var scrollTop = $(document).scrollTop();
  //   $(selector).each(function() {
  //     var $selector = $(this);
  //     var minScroll = $selector.offset().top - $(window).height();
  //     var maxScroll = $selector.offset().top + $selector.outerHeight();
  //     if (scrollTop < minScroll) {
  //       ;
  //     } else if (scrollTop > maxScroll) {
  //       ;
  //     } else {
  //       $selector.addClass('now');
  //       if ($selector.hasClass('now gs_growth')) {
  //         scrollChallenge('.gs_growth > h3', 100);
  //         scrollChallenge('.gs_growth > h3 + p', 160);
  //         scrollChallenge('#main .gs_growth .gs_video', 240);
  //         scrollChallenge('#main .gs_growth .gs_text', 750);
  //       } else if ($selector.hasClass('now challenge')) {
  //         scrollChallenge('.challenge > h3', 100);
  //         scrollChallenge('.challenge > h3 + p', 160);
  //         scrollChallenge('#main .challenge .product', 240);
  //         scrollChallenge('#main .challenge .info_icons', 650);
  //       }
  //     }
  //   })
  // }





  // 아래걸로 하다보니 모바일에서 바로 width가 20%로 줄어버림 그래서 on 클라스로 함 pc에서 width가 비는 부분은 어쩔수 없는거같긴 한데 해결하기가 어렵네 이렇게 하니까 모바일되면 괜찮기니함 
  // $('#main .main_visual ul li').on('mouseenter', function() {
  //   // var windowWidth = $(window).resize().width();
    
  //   // if ($(window).width() < 1024 || windowWidth < 1024) 
  //   // alert(document.documentElement.clientWidth);
  //   if(document.documentElement.clientWidth < 1024){
  //     return false;
  //   }
  //   else{
  //     $(this).animate({'width': '40%'},0, function() {    
  //       $(this).addClass('on');
  //     });
  //     $('#main .main_visual ul li').not($(this)).animate({'width': '20%'},0);
  //   }
  // }) 
  
  // $(window).resize(function() {
  //   // var windowWidth = $(window).width();
  //   // console.log(windowWidth);
  //   // if (windowWidth < 1024) 

  //   // alert(document.documentElement.clientWidth);
  //   if(document.documentElement.clientWidth < 1024){
  //     $('#main .main_visual ul li').css({'width': '100%'});
  //   }else{
  //     $('#main .main_visual ul li').on('mouseleave', function() {
  //       $('#main .main_visual ul li').removeClass('on').animate({'width': '25%'},0);
  //     })
  //   }
  // })

  // $('#main .main_visual ul li').on('mouseleave', function() {
  //   var windowWidth = $(window).resize().width();
  //   if ($(window).width() < 1024 || windowWidth < 1024) 
  //   return false;
  //   $('#main .main_visual ul li').removeClass('on').animate({'width': '25%'},0);
  // })


 

});