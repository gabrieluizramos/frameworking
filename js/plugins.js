<!-- 
GABRIEL RAMOS FRAMEWORK
PLUGINS BASED ONLY JQUERY LIB
-->
<!-- PLUGINS -->
<!-- JQUERY -->
<script src="jquery-1.11.3.min.js"></script>
<!-- ACCORDION ADDING/REMOVING CLASS ACTIVE ON PARENT ELEMENT -->
<script>
    $('.accordion .accordion-link').on('click',function(){
        // CHECK, IF THE ELEMENT CLICKED IS ACTIVE, IT CLOSES AND BREAK THE FUNCTION
        // COMMENT THIS 'IF' IF YOU WANT AN 'UNACTIVE' ACCORDION
        if ($(this).hasClass('active')) {
            $(this).removeClass('active').next('.accordion-content').slideToggle();
            return;
        }
        $('.accordion-link.active').removeClass('active').next('.accordion-content').slideToggle();
        $(this).addClass('active').next('.accordion-content').slideToggle();
    });
// INITIALIZE FIRST ACCORDION ITEM ACTIVE
$(document).ready(function(){
    $('.accordion-item:first-child .accordion-link').click();
});
</script>
<!-- SLIDER UP AND DOWN ADDING/REMOVING CLASS ACTIVE ON MENU LINKS -->
<script>
    $('.slider-menu-link').on('click',function(){
        $('.slider-menu-link').removeClass('active');
        $('.slider-image').removeClass('active').slideUp().fadeOut(200);
        $('.slider-image:nth-child('+($(this).index()+1)+')').slideDown().fadeIn(600).addClass('active');
        $(this).addClass('active');
        clearInterval(sliderAuto);
        sliderAuto = setInterval(slider, 5000);
    });
    // AUTOMATIC PLAY, 5 SECONDS
    function slider(){
        var nextActiveItem = $('.slider-menu-link.active').index()+2;
        var totalItem = $('.slider-menu-link').length;
        if (nextActiveItem > totalItem) {
            nextActiveItem = 1;
        }
        $('.slider-menu-link:nth-child('+nextActiveItem+')').click();
    }
    function sliderPrev(){
        var activeItem = $('.slider-menu-link.active').index();
        var nextActiveItem = activeItem;
        if (nextActiveItem < 1) {
            nextActiveItem = totalItem;
        }
        $('.slider-menu-link:nth-child('+nextActiveItem+')').click();
    }
// INITIALIZE FIRST SLIDER MENU LINK CLICKED
$(document).ready(function(){
    $('.slider-menu-link:first-child').click();
});
// SET INTERVAL FOR ALL SLIDERS
$(document).ready(function(){
    var sliderAuto = setInterval(slider, 5000);
});
$('.slider-next').click(function(){
    slider();
});
$('.slider-prev').click(function(){
    sliderPrev();
});
</script>
<!-- DROP DOWN (LIKE RESPONSIVE MENUS) -->
<script>
    $('.drop-link').on('click',function(){
        $(this).toggleClass('active').next('.drop-content').slideToggle();
    });
</script>