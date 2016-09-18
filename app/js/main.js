
$(document).ready(function(){

  $('.btn-toggle').on('click', function(e) {
   e.preventDefault(); 
   $('.nav').slideToggle();
 });

  $(".slider-1").owlCarousel({
    singleItem : true,
    autoHeight : true,
    navigation : true,
    loop:true,
    navigationText : ["",""]

    // "singleItem:true" is a shortcut for:
      // items : 1, 
      // itemsDesktop : false,
      // itemsDesktopSmall : false,
      // itemsTablet: false,
      // itemsMobile : false
    });


$(".fancybox-media").click(function() {
    $.fancybox({
      'padding'   : 0,
      'autoScale'   : false,
      'transitionIn'  : 'none',
      'transitionOut' : 'none',
      'title'     : this.title,
      'maxWidth':  840,
      'maxHeight'    : 460,
      'href'      : this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
      'type'      : 'swf',
      'swf'     : {
      'wmode'       : 'transparent',
      'allowfullscreen' : 'true'
      }
    });

    return false;
  });


// $(window).on('load resize', function(e) {
//     if ( $(document).width() <= 991 ) {
//       $(document).bind('click.mynamespace', function(e) {
//         if(!$(e.target).is('.fixed-menu .container, .fixed-menu, .nav li, .btn-menu, .btn-menu i')) {
//           $('.nav').slideUp();
//         }
//       });
//     }
//     else {
//       $(document).unbind('click.mynamespace');
//       // console.log('q');
//     }
//   });



 //    $("a.modal-form").fancybox({
 //       'hideOnContentClick': true,
 //          minWidth : 230,
 //          padding : 0,
 //          closeBtn : true
 
 // });

$('a.scr[href^="#"]').on('click', function(event) {

    var target = $( $(this).attr('href') );

    if( target.length ) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: target.offset().top 
        }, 600);
    }

});

//  jQuery(function($){ 
//    $(".phone_mask_1").mask("+7(999) 999-9999");
//    $("#phone_mask_2").mask("+7(999) 999-9999");
// });

});

