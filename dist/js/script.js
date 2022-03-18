$(document).ready(function(){
    $('.header').slick({
        infinite: true,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              arrows: false
            }
          }
        ]
      });
      $('.expert__wrapper').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              arrows: false,
              dots: true
            }
          }
        ]
      });

      new WOW().init();

      // Modal

      $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
      });
      $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks').fadeOut('slow');
      });

      // validate form

      function validateForm(form) {
        $(form).validate({
          rules: {
            name: "required",
            phone: "required",
            email: {
              required: true,
              email: true
            }
          },
          messages: {
            name: "Пожалуйста, введите свое имя",
            phone: "Пожалуйста, введите свой номер телефона",
            email: {
              required: "Пожалуйста, введите свой email",
              email: "Неправильно введен адрес email"
            }
          }
        });
      }
      
      validateForm('#consultation form');

      $("#phone").mask("+7 (999) 999-99-99");

      $('.feed-form').submit(function(e) {
        e.preventDefault();
        $.ajax({
          type: "POST",
          url: "../mailer/smart.php",
          data: $(this).serialize()
        }).done(function() {
          $(this).find("input").val("");
          $('#consultation').fadeOut();
          $('.overlay, #thanks').fadeIn('slow');

          $('.feed-form').trigger('reset');
        });
        return false;
      });

      $('.footer__company, .footer__module, .footer__industries, .footer__aboutus').on('click', function() {
        $(this).toggleClass('active');
      });
      

      $(document).on('mouseup', function(e) {
        let s = $('.footer__company.active, .footer__module.active, .footer__industries.active, .footer__aboutus.active');
        if(!s.is(e.target) && s.has(e.target).length === 0) {
          s.removeClass('active');
        }
      });
  });