if($("body").hasClass("main-body")){
	$(window).on('beforeunload', function() {
	    $(window).scrollTop(0);
	});
}
function checkInitAnimateUnits(){
	$(".animateSection:not(.header)").each(function(){
		counter=0;
		var elem=$(this).find(".initAnimate");
		var image=$(this).find(".initAnimateImage");
		image.each(function(){
			
			var animateElem=$(this);

			if(animateElem.isInViewport()){
				counter++
				setTimeout(function(){
					animateElem.addClass("inView");
					setTimeout(function(){
						animateElem.addClass("animateEnd");
					},500);
				},counter*50);
				
			}	
		})
		counter=0;
		elem.each(function(){
			
			var animateElem=$(this);

			if(animateElem.isInViewport()){
				counter++;
				setTimeout(function(){
					animateElem.addClass("inView");
					setTimeout(function(){
						animateElem.addClass("animateEnd");
						animateElem.removeClass("inView");
					},450);
				},counter*50);
				
			}	
		})
		
		
	})
	
}

function checkInitAnimateUnitsHeader(){
	$(".animateSection.header").each(function(){
		counter=0;
		var elem=$(this).find(".initAnimate");
		elem.each(function(){
			
			var animateElem=$(this);

			if(animateElem.isInViewport()){
				counter++
				setTimeout(function(){
					animateElem.addClass("inView");
					setTimeout(function(){
						animateElem.addClass("animateEnd");
						animateElem.removeClass("inView");
					},450);
				},counter*50);
				
			}	
		})
	})
}
/* Trigger when page is ready */
$(document).ready(function(){
	// Your functions go here
	var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if(isSafari&&iOS){
    	$(".main-slider-unit:not(:first)").addClass("main-slider-unit_safari");
    }
    if(isSafari){
    	$(".main-body").addClass("safariBody");
    }
	$(".config").each(function(){
		var title=$(this).find(".config-title").html();
		$(this).find(".config-bg").html(title);
	})
	$(".gallery_bgText").each(function(){
		$(".gallery-info-unit").each(function(){
			var title=$(this).find(".gallery-info-title").html();
			$(this).find(".gallery-info-unit-bgText").html(title);
		})
		
	})
	$(".companyConditions-unit").each(function(){
		var title=$(this).find(".companyConditions-unit-title").html();
		$(this).find(".companyConditions-unit-bg").html(title);
	})
	$(".recoupmentPage-main").each(function(){
		var title=$(this).find(".recoupmentPage-main-title").html();
		$(this).find(".recoupmentPage-main-bg").html(title);
	})
	$(".recoupment").each(function(){
		var title=$(this).find(".recoupment-title").html();
		$(this).find(".recoupment-bg").html(title);
	})
	$('.main-slider-wrap').on('edge', function(event, slick, direction){
  		if(direction=="left"){
		  	$("html").removeClass("static");
		  	$("body").removeClass("static");
		  }
	});

	$(".gallery").each(function(){
		var gallery=$(this);
		var nextButton=gallery.find(".gallery-thumbs-next .button_arrow");
		var infoSlider=gallery.find(".gallery-info");
		var infoSliderId=infoSlider.attr('id');
		var imageSlider=gallery.find(".gallery-media");
		var imageSliderId=imageSlider.attr('id');
		var thumbsSlider=gallery.find(".gallery-thumbs");
		var thumbsSliderId=thumbsSlider.attr('id');
		var additionalSlider=gallery.find(".gallery-additional");
		imageSlider.on('init', function(event,slick ){
			var slides=slick.$slides;
			slides.each(function(){
				var index=$(this).index();
				var prevImage=$(this).prev(".slick-slide").find(".gallery-media-unit-inner:not(.gallery-media-unit-inner_next,.gallery-media-unit-inner_prev)").clone();

				var nextImage=$(this).next(".slick-slide").find(".gallery-media-unit-inner:not(.gallery-media-unit-inner_next,.gallery-media-unit-inner_prev)").clone();
				if(index==0){
					prevImage=$(this).parents(".gallery-media").find(".slick-slide").eq(slides.length-1).find(".gallery-media-unit-inner:not(.gallery-media-unit-inner_next,.gallery-media-unit-inner_prev)").clone();
				} else if(index==slides.length-1){
					nextImage=$(this).parents(".gallery-media").find(".slick-slide").eq(0).find(".gallery-media-unit-inner:not(.gallery-media-unit-inner_next,.gallery-media-unit-inner_prev)").clone();
				}
				prevImage.addClass("gallery-media-unit-inner_prev").removeClass("gallery-media-unit-inner_main");
				nextImage.addClass("gallery-media-unit-inner_next").removeClass("gallery-media-unit-inner_main");
				
				$(this).prepend(prevImage);
				$(this).append(nextImage);
			})
		});
		imageSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
			var _this=$(this)
			var direction;
			if (currentSlide === 0 && nextSlide === slick.$slides.length - 1) {
			    // its going from the first slide to the last slide (backwards)
			    direction = 'prev';
			} else if (nextSlide > currentSlide || (currentSlide === (slick.$slides.length - 1) && nextSlide === 0 )) {
			    // its either going normally forwards or going from the last slide to the first
			    direction = 'next';
			} else {
			    direction = 'prev';
			}
			$(".gallery-wrap").find(".gallery-media-unit-inner").removeClass("gallery-media-unit-inner_primary");
			var nextSlide=$(this).find(".gallery-media-unit").eq(nextSlide);

			_this.addClass("gallery-media_switching");
			setTimeout(function(){
	           _this.removeClass("gallery-media_switching");
	        }, 1000);
			if(direction=="prev"){
				nextSlide.find(".gallery-media-unit-inner_next").addClass("gallery-media-unit-inner_primary");
			} else if(direction=="next"){
				nextSlide.find(".gallery-media-unit-inner_prev").addClass("gallery-media-unit-inner_primary");
			}

		});
		if(!gallery.hasClass("gallery_textMedia")){
			infoSlider.slick({
				rtl:true,
				//asNavFor:"#"+imageSliderId+" , "+"#"+thumbsSliderId,
				draggable:false,
				accessibility:false,
				scroll:false,
				swipe:false,
				touchMove:false,
				focusOnSelect:true,
				arrows:false,
				//nextArrow:"",
				//prevArrow:nextButton,
			})
		}
		
		imageSlider.slick({
			rtl:true,
			fade:true,
			speed:400,
			slide:".gallery-media-unit",
			draggable:false,
			accessibility:false,
			scroll:false,
			swipe:false,
			touchMove:false,
			focusOnSelect:true,
			//asNavFor:"#"+infoSliderId+" , "+"#"+thumbsSliderId,
			arrows:false,
			//nextArrow:"",
			//prevArrow:nextButton,
		});
		thumbsSlider.slick({
			initialSlide:1,
			rtl:true,
			slide:".gallery-thumbs-unit",
			draggable:false,
			accessibility:false,
			scroll:false,
			swipe:false,
			touchMove:false,
			//focusOnSelect:true,
			variableWidth: true,
			//asNavFor:"#"+infoSliderId+" , "+"#"+imageSliderId,
			arrows:false,
			//nextArrow:"",
			//prevArrow:nextButton,
		})
		additionalSlider.slick({
			rtl:true,
			//asNavFor:"#"+imageSliderId+" , "+"#"+thumbsSliderId,
			draggable:false,
			accessibility:false,
			scroll:false,
			swipe:false,
			touchMove:false,
			focusOnSelect:true,
			arrows:false,
			//nextArrow:"",
			//prevArrow:nextButton,
		});
		nextButton.click(function(){
			var button=$(this);
			
			if(!nextButton.hasClass("gallery-thumbs-next_disabled")){
				button.addClass("gallery-thumbs-next_disabled");
				if(timer){
					window.clearTimeout(timer);
				}
				if(!gallery.hasClass("gallery_textMedia")){
					infoSlider.slick("slickPrev");
				}
				thumbsSlider.slick("slickPrev");
				imageSlider.slick("slickPrev");
				
				additionalSlider.slick("slickPrev");
				
				var timer=window.setTimeout(function(){
					button.removeClass("gallery-thumbs-next_disabled");
				},400)
			}
		})
	})
	$(".gallery-thumbs-unit").click(function(){
		var gallery=$(this).parents(".gallery");
		var imageSlider=gallery.find(".gallery-media");
		var thumbsSlider=gallery.find(".gallery-thumbs");
		var additionalSlider=gallery.find(".gallery-additional");	
		var thumb=$(this);
		var index=thumb.attr("data-slick-index");
		additionalSlider.slick("slickGoTo",index,false);
		imageSlider.slick("slickGoTo",index,false);
		var index = $(this).index();
        if (thumbsSlider.slick('slickCurrentSlide') !== index) {
              thumbsSlider.slick('slickGoTo', index);
        }
		
	})
	$(".selectmenu-wrap").each(function(){
		var selectmenuWrap=$(this);
		var selectmenu=$(this).find(".selectmenu");
		selectmenu.selectmenu({
			classes:{
				"ui-selectmenu-icon":"icon-dropdown"
			},
			appendTo:selectmenuWrap,
			select: function( event, ui ) {
				$(event.currentTarget).siblings().removeClass("ui-menu-item-active");
				$(event.currentTarget).addClass("ui-menu-item-active");
			}
		});
	})
	function randomIntFromInterval(min,max){
   	 return Math.floor(Math.random()*(max-min+1)+min);
	}
	$(".companyReviews-selectors-unit .selectmenu").on('selectmenuchange', function() {
    	var wrap=$(".companyReviews-content");
    	wrap.addClass("companyReviews-content_switching");
    	var cards=wrap.find(".companyReviews-unit");
    	counter=0;
    	cards.each(function(){
    		counter++;
    		var _this=$(this);

    		setTimeout(function(){
    			_this.addClass("companyReviews-unit_switching");
    			setTimeout(function(){
    				_this.removeClass("companyReviews-unit_switching");
    			},500)
    		},counter*50);
    	})
    	
    	
	});
	$(".recoupment-selectmenu").on('selectmenuchange', function() {
    	var table=$(".recoupment-table");
    	table.find(".recoupment-table-line_clone").remove();
    	
    	
    	var counter=0;
    	var tablelineExample=table.find(".recoupment-table-line").eq(2).clone();
    	tablelineExample.addClass("recoupment-table-line_clone");
		var randomAmount=randomIntFromInterval(1,5);
		for(var i=1;i<=randomAmount;i++){
			table.append(tablelineExample.clone());
		}
		var tableLines=table.find(".recoupment-table-line");
    	tableLines.each(function(){
    		var _this=$(this);
    		counter++
    		setTimeout(function(){
    			if(_this.hasClass("recoupment-table-line_clone")){
    					_this.addClass("recoupment-table-line_clone_static");
    				}
    			_this.addClass("recoupment-table-line_switching");
    			setTimeout(function(){
    				_this.removeClass("recoupment-table-line_switching");
    				
    			},500)
    		},counter*50)

    		
    	})
    	
    	
	});
	$('.main-slider-wrap').on('afterChange', function(event, slick, currentSlide){
  		if(currentSlide==slick.slideCount-1){
  			$(".main-slider-controls-arrows-unit_next").addClass("lastSlideArrow");
  		} else{
  			$(".main-slider-controls-arrows-unit_next").removeClass("lastSlideArrow");
  		}
  		
	});

	$(document).on("click",".lastSlideArrow",function(){
		$("html").removeClass("static");
		$("body").removeClass("static");
		setTimeout(function(){
			checkInitAnimateUnits();
			checkInitAnimateUnitsHeader();
	   },1000);

	})
	$('.main-slider-wrap').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		$(".main-slider-controls-nav-unit").removeClass("main-slider-controls-nav-unit_active");
		if(nextSlide!=0){
	  		$(".main-slider-controls-nav-unit").eq(nextSlide-1).addClass("main-slider-controls-nav-unit_active");
	  	}
	  	if(nextSlide>=1){
	  		$(".main-slider-controls-arrows").removeClass("main-slider-controls-arrows_hidden");
	  	} else{
	  		$(".main-slider-controls-arrows").addClass("main-slider-controls-arrows_hidden");
	  	}
	});
	$(".reviews-wrap").on('init', function(event,slick ){
		var slides=slick.$slides;
		slides.each(function(){
			var index=$(this).index();
			var prevImage=$(this).prev(".slick-slide").find(".reviews-unit-media-unit:not(.reviews-unit-media-unit_next,.reviews-unit-media-unit_prev)").clone();
			var nextImage=$(this).next(".slick-slide").find(".reviews-unit-media-unit:not(.reviews-unit-media-unit_next,.reviews-unit-media-unit_prev)").clone();
			if(index==0){
				prevImage=$(this).parents(".reviews-wrap").find(".slick-slide").eq(slides.length-1).find(".reviews-unit-media-unit:not(.reviews-unit-media-unit_next,.reviews-unit-media-unit_prev)").clone();
			} else if(index==slides.length-1){
				nextImage=$(this).parents(".reviews-wrap").find(".slick-slide").eq(0).find(".reviews-unit-media-unit:not(.reviews-unit-media-unit_next,.reviews-unit-media-unit_prev)").clone();
			}
			prevImage.addClass("reviews-unit-media-unit_prev").removeClass("reviews-unit-media-unit_main");
			nextImage.addClass("reviews-unit-media-unit_next").removeClass("reviews-unit-media-unit_main");
			$(this).find(".reviews-unit-media-wrap").prepend(prevImage);
			$(this).find(".reviews-unit-media-wrap").append(nextImage);
		})
	});
	$(".reviews-wrap").on('beforeChange', function(event, slick, currentSlide, nextSlide){
		var direction;
		if (currentSlide === 0 && nextSlide === slick.$slides.length - 1) {
		    // its going from the first slide to the last slide (backwards)
		    direction = 'prev';
		} else if (nextSlide > currentSlide || (currentSlide === (slick.$slides.length - 1) && nextSlide === 0 )) {
		    // its either going normally forwards or going from the last slide to the first
		    direction = 'next';
		} else {
		    direction = 'prev';
		}
		$(".reviews-wrap").find(".reviews-unit-media-unit").removeClass("reviews-unit-media-unit_primary");
		var nextSlide=$(this).find(".reviews-unit").eq(nextSlide);
		$(".reviews-unit-media").addClass("reviews-unit-media_switching");
		setTimeout(function(){
           $(".reviews-unit-media").removeClass("reviews-unit-media_switching");
        }, 1000);
		if(direction=="prev"){
			nextSlide.find(".reviews-unit-media-unit_next").addClass("reviews-unit-media-unit_primary");
		} else if(direction=="next"){
			nextSlide.find(".reviews-unit-media-unit_prev").addClass("reviews-unit-media-unit_primary");
		}

	});
	
   
    //smoothscroll
   $(".companyPage-nav-unit.companyPage-nav-unit_scroll").on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
       
        $('.companyPage-nav-unit').each(function () {
            $(this).removeClass('companyPage-nav-unit_active');
        })
        $(this).addClass('companyPage-nav-unit_active');
     
        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top-60
        }, 500, 'swing', function () {
           // window.location.hash = target;
           //$(document).on("scroll", onScroll);
        });
    });
 	$(".computersCard-nav-unit").on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
       
        $('.computersCard-nav-unit').each(function () {
            $(this).removeClass('computersCard-nav-unit_active');
        })
        $(this).addClass('computersCard-nav-unit_active');
     
        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top-60
        }, 500, 'swing', function () {
           // window.location.hash = target;
           //$(document).on("scroll", onScroll);
        });
    });
   
    
    function onScroll(event){
    	
        var scrollPos = $(document).scrollTop();

       $('.recoupmentPage , .process').find(".companyPage-nav-unit_scroll").each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.outerHeight(true) > scrollPos) {
                $('.companyPage-nav-unit').removeClass("companyPage-nav-unit_active");
                currLink.addClass("companyPage-nav-unit_active");
            }
            else{
                currLink.removeClass("companyPage-nav-unit_active");
            }
            if(scrollPos<100){
 
                 $('.companyPage-nav-unit:first-child').addClass("companyPage-nav-unit_active");
            }
 
        });
       $(".computersCard-nav").find(".computersCard-nav-unit:not(.computersCard-nav-unit_config)").each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.outerHeight(true) > scrollPos) {
                $('.computersCard-nav-unit').removeClass("computersCard-nav-unit_active");
                currLink.addClass("computersCard-nav-unit_active");
            }
            else{
                currLink.removeClass("computersCard-nav-unit_active");
            }
            if(scrollPos<100){
 
                 $('.computersCard-nav-unit:first-child').addClass("computersCard-nav-unit_active");
            }
 
        });
    }
    
	
	$(document).on("scroll", onScroll);
	
	$(".reviews-wrap").slick({
		arrows:false,
		accessibility:false,
		fade:true,
		speed:400,
		adaptiveHeight:true,
		
	});
	$(".reviews-unit-nav-next").click(function(){
		$(".reviews-wrap").slick("slickNext");
	})
	$(".popup-media").each(function(){
		var slider=$(this);
		var popup=slider.parents(".popup");
		var sliderNext=popup.find(".popup-next");
		var sliderPrev=popup.find(".popup-prev");
		slider.slick({
			fade:true,
			acessibiility:true,
			prevArrow:sliderPrev,
			nextArrow:sliderNext
		})
	})

	$(".popup-close").click(function(){
		$(this).parents(".popup").removeClass("popup_active");
	})
	$(".popup").click(function(){
		$(this).removeClass("popup_active");

	})
	
	$(".popup-next, .popup-prev, .popup-media, .popup-info").click(function(e){
		e.stopPropagation();
	})
	$(document).keyup(function(e) {
  		if (e.keyCode === 27){ // esc
  		 $('.popup').removeClass("popup_active"); 
  		} 
  		if (e.keyCode === 37){ // left
  		 $('.popup.popup_active').find(".slick-slider").slick("slickPrev");
  		} 
  		if (e.keyCode === 39){ // left
  		 $('.popup.popup_active').find(".slick-slider").slick("slickNext");
  		} 
  		if($(".main-slider")){
	  		if($(".main-slider").isInViewport()){
	  			if (e.keyCode === 38){ // up
		  		 $(".main-slider-wrap").slick("slickPrev");
		  		} 
		  		if (e.keyCode === 40){ // down
		  		 $(".main-slider-wrap").slick("slickNext");
		  		} 
		  		if (e.keyCode === 37){ // left
		  		 $(".main-slider-wrap").slick("slickPrev");
		  		} 
		  		if (e.keyCode === 39){ // left
		  		  $(".main-slider-wrap").slick("slickNext");
		  		}
	  		}
	  	}
	});
	$(".main-slider-unit-play").click(function(){
		$(".popup").addClass("popup_active");
	})
	$(document).on('click', '.button_play', function (e) {
			$(".popup_gallery").addClass("popup_active");
	})
	
	$(".configurator-selections-unit input").change(function(){
		var parent=$(this).parents(".configurator-selections-unit");
		parent.siblings(".configurator-selections-unit").removeClass("configurator-selections-unit_active");
		parent.addClass("configurator-selections-unit_active");
	})
	$(".label-radio input").change(function(){
		var parent=$(this).parents(".order-form-radio");
		parent.siblings(".order-form-radio").removeClass("order-form-radio_active");
		parent.addClass("order-form-radio_active");
	})
	$(".main-slider-header-burger").click(function(){
		$(this).toggleClass("open");
		$(".header-burger").toggleClass("open");
		$(".menu-mobile").toggleClass("open");
	})
	$(".header-burger").click(function(){
		$(this).toggleClass("open");
		$(".main-slider-header-burger").toggleClass("open");
		$(".header").toggleClass("header_menuOpen");
		$(".menu-mobile").toggleClass("open");
	})
	$(".main-slider-wrap").slick({
		prevArrow:".main-slider-controls-arrows-unit_prev",
		nextArrow:".main-slider-controls-arrows-unit_next",
		fade:true,
		infinite:false,
	})
	var lastScrollTop = 0;
	
	$(window).on('scroll',function(event) {
		
		var st = $(this).scrollTop();
	   	if (st > lastScrollTop){
	   		$(".header_jsStick").addClass("header_jsStick_hide");
	   		$(".configurator-nav").addClass("configurator-nav_moved");
	   		$(".computersCard-nav").addClass("computersCard-nav_moved");
	   		$(".companyPage-nav").addClass("companyPage-nav_moved");
	   	} else {
	   		$(".header_jsStick").removeClass("header_jsStick_hide");
	   		$(".configurator-nav").removeClass("configurator-nav_moved");
	   		$(".computersCard-nav").removeClass("computersCard-nav_moved");
	   		$(".companyPage-nav").removeClass("companyPage-nav_moved");
	        if(st<=0){
	        	if($("body").hasClass("main-body")){
					$("html").addClass("static");
					$("body").addClass("static");
				}
			}
	   	}

	   	lastScrollTop = st;
		
	})
	
	$("html").on('mousewheel',function(event) {
		checkInitAnimateUnits();

	});
	if($(".main-body").hasClass("safariBody")){
		


		
		$('.main-slider').on('mousewheel', _.debounce(function(event) {
	
		    if(event.deltaY==-1){
		   	var prevSlide=$(".main-slider-wrap").slick('slickCurrentSlide');
		    	$(".main-slider-wrap").slick("slickNext");
		    	var currentSlide=$(".main-slider-wrap").slick('slickCurrentSlide');
		    	if(currentSlide==4&&currentSlide==prevSlide){
		    		$("html").removeClass("static");
		    		$("body").removeClass("static");
		    		setTimeout(function(){
		    			checkInitAnimateUnits();
		    			checkInitAnimateUnitsHeader();
		    		},1000);
		    	}
		    } else{
		    	$(".main-slider-wrap").slick("slickPrev");
	    
		    }
		},50));
		
		
	} else{
		$('.main-slider').on('mousewheel',function(event) {
		
		    if(event.deltaY==-1){
		   	var prevSlide=$(".main-slider-wrap").slick('slickCurrentSlide');
		    	$(".main-slider-wrap").slick("slickNext");
		    	var currentSlide=$(".main-slider-wrap").slick('slickCurrentSlide');
		    	if(currentSlide==4&&currentSlide==prevSlide){
		    		$("html").removeClass("static");
		    		$("body").removeClass("static");
		    		setTimeout(function(){
		    			checkInitAnimateUnits();
		    			checkInitAnimateUnitsHeader();
		    		},1000);
		    	}
		    } else{
		    	$(".main-slider-wrap").slick("slickPrev");
	    
		    }
		});
		
	}
	
	$(".main-slider-controls-nav-unit").click(function(){
		var index=$(this).index();
		$(".main-slider-wrap").slick("slickGoTo",index+1,false);
	})
	$('.main-slider-unit').each(function(){
		$(this).mousemove(function(event) {

			var parentHeight=$(this).height();
			var parentWidth=$(this).width();
			var relX = event.pageX - $(this).offset().left;
	        var relY = event.pageY - $(this).offset().top;
	        var mousePercentsX=relX/parentWidth*100-50;
	        var mousePercentsY=relY/parentHeight*100-50;
	        var background=$(this).find(".main-slider-unit-bg");
	        var content=$(this).find(".main-slider-unit-content");
	       	var x1=1-Math.abs(mousePercentsX)/10000;
	       	var x2=mousePercentsY/10000;
	       	var x3=0;//смещают кнопку видео под слой,делая ее некликабельной
	       	//var x3=mousePercentsX/1000000000;
	       	var x4=mousePercentsX/2000000;
	       	var x5=-mousePercentsX/1000000;
	       	var x6=1-Math.abs(mousePercentsY)/10000;
	       	var x7=0;//смещают кнопку видео под слой,делая ее некликабельной
	        //	var x7=mousePercentsY/1000000000;
	       	var x8=mousePercentsY/2000000;
	       	var x9=0;
	       	var x10=0
	       	var x11=1-Math.abs(mousePercentsX)/10000-Math.abs(mousePercentsY)/10000;
	       	var x12=0;
	       	var x13=20*(mousePercentsX/50);
	       	//var x13=0;
	       	var x14=20*(mousePercentsY/50);
	       	//var x14=0;
	       	var x15=0;
	       	var x16=1;
	       	var emptyMatrix='1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1';
	        var transformMatrix=x1+","+x2+","+x3+","+x4+","+x5+","+x6+","+x7+","+x8+","+x9+","+x10+","+x11+","+x12+","+x13+","+x14+","+x15+","+x16;
	        $(this).css("transform","matrix3d("+transformMatrix+")");
	       	content.css("transform","matrix3d("+transformMatrix+")");
	       
		});
	})

	//x1  x2  x3  x4
	//x5  x6  x7  x8
	//x9  x10 x11 x12
	//x13 x14 x16 x16
	
	$('.blogPreview-unit').each(function(){
		var title=$(this).find(".blogPreview-unit-title");
		var image=$(this).find(".blogPreview-unit-image-inner");
		title.hover(
			function(){
				image.addClass("blogPreview-unit-image-inner_hover")
			},function(){
				image.removeClass("blogPreview-unit-image-inner_hover");
			}
		)
		image.hover(
			function(){
				title.addClass("blogPreview-unit-title_hover")
			},function(){
				title.removeClass("blogPreview-unit-title_hover");
			}
		)
	})
	$('.blog-unit').each(function(){
		var title=$(this).find(".blog-unit-title");
		var image=$(this).find(".blog-unit-image-inner");
		title.hover(
			function(){
				image.addClass("blog-unit-image-inner_hover")
			},function(){
				image.removeClass("blog-unit-image-inner_hover");
			}
		)
		image.hover(
			function(){
				title.addClass("blog-unit-title_hover")
			},function(){
				title.removeClass("blog-unit-title_hover");
			}
		)
	})
	
	$(document).on('click', '.js-popup-chars', function (e) {
			$(".popup-characteristics").addClass("popup_active");
	})
	$(document).on('click', '.js-popup-games', function (e) {
			$(".popup-games").addClass("popup_active");
	})
	$(document).on('click', '.js-popup-params', function (e) {
			$(".popup-params").addClass("popup_active");
	})
	$(document).on('click', '.js-popup-about', function (e) {
			$(".popup-about").addClass("popup_active");
	})
	$(".configurator-nav").stick_in_parent({
		parent:".configurator",
		offset_top:70,
	});
	
	$(".companyPage-nav").stick_in_parent({
		parent:".companyPage",
		offset_top:70,
	});
	
	$(".computersCard-nav").stick_in_parent({
		parent:".computersCard",
		offset_top:70,
	});
	$(".main-slider-unit-next").click(function(){
		$(".main-slider-wrap").slick("slickNext");
	})
	$(".configurator-unit-controls-confirm").click(function(){
		var current=$(".configurator-body").find(".configurator-unit.active");
		current.removeClass("active");
		var currentIndex=current.index();
		 $(".configurator-body").find(".configurator-unit").eq(currentIndex+1).addClass("active");
		if(!$(this).parents(".configurator-selections").hasClass("configurator-selections_result")){
			$(this).parents(".configurator-unit").addClass("configurator-unit_selected");
			
		}
		updateConfigurator(currentIndex+1);
	})

	$('.configurator-nav-mobile .selectmenu').on('selectmenuchange', function(event,ui) {
	    var index=ui.item.index;
	    var current=$(".configurator-body").find(".configurator-unit.active");
		current.removeClass("active");
	    $(".configurator-body").find(".configurator-unit").eq(index).addClass("active");
	    updateConfigurator(index);
	});
	$(".configurator-unit-controls-back").click(function(){
		var current=$(".configurator-body").find(".configurator-unit.active");
		current.removeClass("active");
		var currentIndex=current.index();
		$(".configurator-body").find(".configurator-unit").eq(currentIndex-1).addClass("active");
		updateConfigurator(currentIndex-1);
	})
	$
	function updateConfigurator(nextSlide){
		var selectValue;
		switch(nextSlide){
			case 0:
				selectValue="серия";
				break;
			case 1:
				selectValue="память";
				break;
			case 2:
				selectValue="видеокарта";
				break;
			case 3:
				selectValue="диск";
				break;
			case 4:
				selectValue="дизайн";
				break;
			case 5:
				selectValue="итого";
				break;
		}
		$('.configurator-nav-mobile .selectmenu').val(selectValue).selectmenu('refresh');
		var navUnit=$(".configurator-nav-unit");
		navUnit.removeClass("configurator-nav-unit_current");
		navUnit.eq(nextSlide).addClass("configurator-nav-unit_current");
		$('html, body').animate({
	        scrollTop: $(".configurator-title").offset().top-$(".configurator-title").height()-50
	    }, 500);
	}
	/*
	$(".configurator-body").slick({
		arrows:false,
		infinite:false,
		initialSlide:0,
		draggable:false,
		fade:true,
		speed:700,
		accessibility:false,
		scroll:false,
		swipe:false,
		touchMove:false,
		focusOnSelect:true,
		adaptiveHeight:true,

	})
	*/
	$(".configurator-nav-unit").click(function(){
		var current=$(".configurator-body").find(".configurator-unit.active");
		current.removeClass("active");
		var index=$(this).index();
		$(".configurator-body").find(".configurator-unit").eq(index).addClass("active");
		updateConfigurator(index);
	})

	$(".configurator-series-unit-button").click(function(){
		var current=$(".configurator-body").find(".configurator-unit.active");
		var currentIndex=current.index();
		current.removeClass("active");
		$(".configurator-body").find(".configurator-unit").eq(currentIndex+1).addClass("active");
		updateConfigurator(currentIndex+1);
	});
	
	$(".accordion-title").click(function(){

		var accordion=$(this).parents(".accordion");
		var bodyHeight=accordion.find(".accordion-body-wrap").outerHeight(true);
		var bodyUnit=accordion.find(".accordion-body");
		if(accordion.hasClass("accordion_open")){
			bodyUnit.css("max-height",0+"px");
		} else{
			$(".accordion").each(function(){
				$(this).removeClass("accordion_open");
				$(this).find(".accordion-body").css("max-height",0+"px");
			})
			bodyUnit.css("max-height",bodyHeight+"px");
		}
		accordion.toggleClass("accordion_open");
	})

	$(".order-stick").stick_in_parent({
		parent:".order-wrap",
		offset_top:70,
	});
	$(".configurator-selections").each(function(){
		var _this=$(this);

		parentElem=_this.parents(".configurator-unit-body");
		
		
		_this.stick_in_parent({
			parent:parentElem,
			offset_top:70,
		});
		
	});
	$(".configurator-total").each(function(){
		var _this=$(this);

		parentElem=_this.parents(".configurator-unit-body");
		
		
		_this.stick_in_parent({
			parent:parentElem,
			offset_top:70,
		});
		
	});
	/*preloader
    var perfData = window.performance.timing, // The PerformanceTiming interface represents timing-related performance information for the given page.
    EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
    time = parseInt((EstimatedTime/1000)%60)*100;


	$(".preloader img").css({
		WebkitTransition : 'all '+time/1000+'s ease-out',
	    MozTransition    : 'all '+time/1000+'s ease-out',
	    MsTransition     : 'all '+time/1000+'s ease-out',
	    OTransition      : 'all '+time/1000+'s ease-out',
	    transition       : 'all '+time/1000+'s ease-out'
	});;
	*/
	$(".preloader img").addClass("animate");
	

	

});
$(document).on("touchend",function(e){
	var elem=e.target;
	//console.log($(e.target).closest('.ui-selectmenu-button').length);
	if(!$(elem).parents().hasClass('ui-selectmenu-menu')&&$(e.target).closest('.ui-selectmenu-button').length != 1){
		$(".ui-selectmenu-open").removeClass("ui-selectmenu-open");
		$(".ui-selectmenu-button-open").removeClass("ui-selectmenu-button-open");
	}
})
$.fn.isInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
}

$(window).on("scroll",function(){
	checkInitAnimateUnits();
})

$(window).on("load",function(){
	 $('.preloader').fadeOut(500);
	 $('body').addClass("is-loaded");
	 if(!$("body").hasClass(".main-body")){
	 	checkInitAnimateUnitsHeader();
	 }
	  checkInitAnimateUnits();
})

$(window).on("load resize",function(){
	var windowWidth= $(window).outerWidth();
	$(".accordion").each(function(){
		var accordion=$(this);
		var bodyHeight=accordion.find(".accordion-body-wrap").outerHeight(true);
		var bodyUnit=accordion.find(".accordion-body");
		if(accordion.hasClass("accordion_open")){
			bodyUnit.css("max-height",bodyHeight+"px");
		}
	})
	
	if(windowWidth<1600){
		$(".reviews-unit").each(function(){
			var unit=$(this);
			var unitMedia=$(this).find(".reviews-unit-media");
			unitMedia.remove();
			unit.find(".reviews-unit-text").after(unitMedia);
		})
	} else{
		$(".reviews-unit").each(function(){
			var unit=$(this);
			var unitMedia=$(this).find(".reviews-unit-media");
			unitMedia.remove();
			unit.prepend(unitMedia);
		})
	}
	
	if(windowWidth<768){
		$(".config:not(.config_main)").each(function(){
			var unit=$(this);
			var unitImage=$(this).find(".config-image");
			unitImage.remove();
			unit.find(".config-title").after(unitImage);
		})
	} else{
		$(".config:not(.config_main)").each(function(){
			var unit=$(this);
			var unitImage=$(this).find(".config-image");
			unitImage.remove();
			unit.find(".config-info").after(unitImage);
		})
	}
	
	
	if(windowWidth<1201){
		var instagramSegment=$(".instagram-segment").eq(0);
		var instagramSegment2=$(".instagram-segment").eq(1);
		var instagramUnit=$(".instagram-segment").find(".instagram-unit-js-swap");
		instagramUnit.remove();
		instagramSegment2.prepend(instagramUnit);

	} else{
		var instagramSegment=$(".instagram-segment").eq(0);
		var instagramSegment2=$(".instagram-segment").eq(1);
		var instagramUnit=$(".instagram-segment").find(".instagram-unit-js-swap");
		instagramUnit.remove();
		instagramSegment.append(instagramUnit);
	}
	if(windowWidth<1201){
		$(".configurator-selections").trigger("sticky_kit:detach");
		$(".configurator-total").trigger("sticky_kit:detach");
		$(".order-stick").trigger("sticky_kit:detach");
	} else{
		$(".order-stick").stick_in_parent({
		parent:".order-wrap",
		offset_top:70,
		});
		$(".configurator-selections").each(function(){
			var _this=$(this);

			parentElem=_this.parents(".configurator-unit-body");
			
			
			_this.stick_in_parent({
				parent:parentElem,
				offset_top:70,
			});
			
		});
		$(".configurator-total").each(function(){
			var _this=$(this);

			parentElem=_this.parents(".configurator-unit-body");
			
			
			_this.stick_in_parent({
				parent:parentElem,
				offset_top:70,
			});
			
		});
	}
})
