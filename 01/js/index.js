$(function(){
  // a #올라가는거 막는거 
  $(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault()
  });

  $('#header').each(function(){ 
    var $win = $(window),
        $header_inner = $(this);

    var headerOffsetTop = $header_inner.offset().top;

    $win.scroll(function(){
      var scrollTop = $win.scrollTop(),
          header_inner = ('#header');

      var scroll = Math.floor(scrollTop),
          offset = Math.floor(headerOffsetTop);

      if( scroll > offset ) {
        $header_inner.addClass('on');
      } else {
        $header_inner.removeClass('on');
      }
    });
  });

  $('.side_btn').on('click', function() {
    $(this).addClass('on');
    $('.sideWrap').addClass('on');
  });

  $('.sideMark .clo_btn').on('click', function() {
    $('.side_btn').removeClass('on');
    $('.sideWrap').removeClass('on');
  });

  $(window).on('scroll', function() {
    setScrollUI();
  });

  function setScrollUI() {
    var scrollTop = $(document).scrollTop();

    if (scrollTop > 880) {
      $('#brand_story').addClass('on');
    }
    else {
      $('#brand_story').removeClass('on');
    }

  }

  $('#gourmet .gouremt_inner .over:first-child').addClass('on');
  $('#gourmet .gouremt_inner .over').on('mouseenter', function() {
    $('#gourmet .gouremt_inner .over').removeClass('on');
    $(this).toggleClass('on');
  });

  $('#sub1 .mainText ul li a').on('mouseenter' , function() {
    var index = $('#sub1 .mainText ul li').index($(this).parent());
    //alert(index)

    $('#sub1 main span').removeClass('on');
    $('#sub1 main span:eq('+ index + ')').addClass('on');
  })

  $('#sub1 .mainText ul li a').on('click' , function() {
    $('#sub1 #dining').addClass('on');
    $('#sub1 .mainText').addClass('on');
  })

  $('#sub1 #dining .cont_wrap .back a').on('click', function() {
    $('#sub1 #dining').removeClass('on');
    $('#sub1 .mainText').removeClass('on');
  })

  $('#sub4 .sct7 .add .down a').on('click', function() {
    $('#sub4 .sct7').toggleClass('on')
  })



})
