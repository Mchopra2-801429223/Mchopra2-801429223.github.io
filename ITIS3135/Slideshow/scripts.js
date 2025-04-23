$(function () {
    let $slides = $(".slide-img");
    let $thumbs = $(".thumbs img");
  
    function showSlide(index) {
      $slides.hide().eq(index).fadeIn();
      $thumbs.removeClass("active").eq(index).addClass("active");
      let caption = $slides.eq(index).attr("alt");
      $("#caption").text(caption);
    }
  
    $thumbs.click(function () {
      let index = $(this).index();
      showSlide(index);
    });
  
    showSlide(0);
  });
  