$.fn.isVisible = function(offset) {
	// Am I visible?
	// Height and Width are not explicitly necessary in visibility detection, the bottom, right, top and left are the
	// essential checks. If an image is 0x0, it is technically not visible, so it should not be marked as such.
	// That is why either width or height have to be > 0.
	var rect = this[0].getBoundingClientRect();
	return (
		(rect.height > 0 || rect.width > 0) &&
		rect.bottom >= 0 &&
		rect.right >= 0 &&
		rect.top <= (window.innerHeight - offset || document.documentElement.clientHeight - offset) &&
		rect.left <= (window.innerWidth - offset || document.documentElement.clientWidth - offset)
	);
};

$.fn.timeline = function(options){

	var settings = $.extend({
		animLeft: "bounceInLeft",
		animRight: "bounceInRight",
		animCenter: "bounceInUp",
		animSpeed: 300,
		offset: 150
	}, options);

	var elem = this;

	var timeline_items = $(this).find('.timeline-list li');

	window.addEventListener('scroll', function(){
		var scrollPos = $(window).scrollTop();
		if($('.timeline-list li.hidden').length > 0){
			if(scrollPos > $(elem).offset().top - 600){
				$(timeline_items).each(function () {

					if ($(this).isVisible(settings.offset)) {
						$(this).removeClass('hidden').addClass('animated').css({"animation-duration": settings.animSpeed + "ms"});
						if (!$(this).hasClass('rightside')) {
							if ($(this).hasClass('centered')) {
								$(this).addClass(settings.animCenter)
							} else {
								$(this).addClass(settings.animLeft)
							}
						} else {

							$(this).addClass(settings.animRight)

						}
					}
				});
			}
		}


	});

	return this;
};