$(document).ready(function() {
    var sections = $('section');
    var navLinks = $('.progress-bar li');

    $(window).on('scroll', function() {
        var currentPosition = $(this).scrollTop();

        sections.each(function() {
            var top = $(this).offset().top - 50;
            var bottom = top + $(this).outerHeight();

            if (currentPosition >= top && currentPosition <= bottom) {
                var id = $(this).attr('id');
                navLinks.removeClass('active');
                $('.progress-bar li[data-target="#' + id + '"]').addClass('active');
            }
        });
    });

    navLinks.on('click', function() {
        var target = $(this).data('target');
        $('html, body').animate({
            scrollTop: $(target).offset().top - 50
        }, 800);
    });
});
