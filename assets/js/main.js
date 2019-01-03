'use strict';

(function ($) {
"use strict";



	

	/**
   * [isMobile description]
   * @type {Object}
   */
	window.isMobile = {
		Android: function Android() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function BlackBerry() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function iOS() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function Opera() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function Windows() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function any() {
			return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
		}
	};
	window.isIE = /(MSIE|Trident\/|Edge\/)/i.test(navigator.userAgent);
	window.windowHeight = window.innerHeight;
	window.windowWidth = window.innerWidth;

	/**
   * Match height 
   */
	$('.row-eq-height > [class*="col-"]').matchHeight();

	var myEfficientFn = debounce(function () {
		$('.row-eq-height > [class*="col-"]').matchHeight();
	}, 250);

	window.addEventListener('resize', myEfficientFn);

	// Wow js
	var wow = new WOW({
		boxClass: 'wow',
		animateClass: 'animated',
		offset: 100,
		mobile: false,
		live: false
	});
	$(window).on('load', function () {
		wow.init();
	});

	/**
   * [debounce description]
   * @param  {[type]} func      [description]
   * @param  {[type]} wait      [description]
   * @param  {[type]} immediate [description]
   * @return {[type]}           [description]
   */
	function debounce(func, wait, immediate) {
		var timeout;
		return function () {
			var context = this,
				    args = arguments;
			var later = function later() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}

	/**
   * Count To
   */
	$(window).ready(function () {

		$('.countTo_module').each(function () {
			var self = $(this),
				    offsettop = self.offset().top,
				    countNumber = $('.countTo__number', self),
				    didScroll,
				    a = 0;

			$(window).scroll(function () {
				var scroll = $(window).scrollTop(),
					    wh = $(window).height();

				if (a == 0 && scroll + wh > offsettop + wh / 4) {
					var optData = eval('(' + self.attr('data-options') + ')'),
						    optDefault = {
						from: 50,
						to: 2500,
						speed: 1000,
						refreshInterval: 50
						// formatter: function (value, options) {
						//      	return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
						//    }
					},
						    options = $.extend(optDefault, optData);

					countNumber.countTo(options);

					a = 1;
				}
			});
		});
	});

	/**
   * Masonry
   */
	$('.grid__inner').masonry({
		itemSelector: '.grid-item',
		columnWidth: '.grid-sizer'
	});


	// 产品中心
	// $.ajax({
	// 	url:"assets/json/chanping.json",
	// 	dataType:'json',
	// 	success:function(res){
	// 		res.list.forEach((ele,index) => {
	// 			$('.cpTypeList').append(`<li style="font-size:14px"><a href="#" data-filter=".cat${index + 1}">${ele.type}</a></li>`)
	// 			var items = ele.data;
	// 			for(var i=0;i<4;i++){
	// 				if(items[i]){
	// 					$('.cpList').append(
	// 						`<div class="grid-item normal cat${index+1} ">
	// 							<div class="grid-item__inner">
	// 								<div class="grid-item__content-wrapper">
	// 									<div class="portfolio" href="assets/img/chanping/${index+1}/${items[i].url}">
	// 										<a class="portfolio__bg" href="assets/img/chanping/${index+1}/${items[i].url}" style="background-image: url('assets/img/chanping/${index+1}/${items[i].url}');" data-effect="mfp-zoom-in">
	// 											<img src="assets/img/chanping/${index+1}/${items[i].url}"/>
	// 										</a>
	// 									</div>
	// 								</div>
	// 							</div>
	// 						</div>`
	// 					)
	// 				}else   break;
	// 			}
	// 		});
			
	// 		$.fn.reCalWidth = function () {
	// 			var $self = $(this);
	// 			$self.on('reCalWidth', function () {
	// 				var _self = $(this);
	// 				_self.css('width', '');
	// 				var width = Math.floor(_self.width());
	// 				_self.css('width', width + 'px');
	// 				var height = Math.floor(_self.parent().children('.wide').width() / 2);
	// 				_self.parent().children('.wide').css('height', height + 'px');
	// 			});
	// 			$(window).on('resize', function () {
	// 				$self.trigger('reCalWidth');
	// 			});
	// 		};
	// 		function work() {
	// 			$('.grid-css').each(function () {
	// 				var workWrapper = $(this),
	// 						workContainer = $('.grid__inner', workWrapper),
	// 						filters = $('.filter', workWrapper),
	// 						filterCurrent = $('.current a', filters),
	// 						filterLiCurrent = $('.current', filters),
	// 						duration = 0.3;
	// 				workContainer.imagesLoaded(function () {
		
	// 					// Fix Height
	// 					if (workWrapper.hasClass('grid-css--fixheight')) {
	// 						workContainer.find('.grid-item__content-wrapper').matchHeight();
	// 					}
		
	// 					workContainer.isotope({
	// 						layoutMode: 'masonry',
	// 						itemSelector: '.grid-item',
	// 						transitionDuration: duration + 's',
	// 						masonry: {
	// 							columnWidth: '.grid-sizer'
	// 						}
	// 						// hiddenStyle: {},
	// 						// visibleStyle: {}
	// 					});
	// 				});
	// 				filters.on('click', 'a', function (e) {
	// 					e.preventDefault();
	// 					var $el = $(this);
	// 					var selector = $el.attr('data-filter');
	// 					filters.find('.current').removeClass('current');
	// 					$el.parent().addClass('current');
	// 					workContainer.isotope({
	// 						filter: selector
	// 					});
	// 				});
		
	// 				filters.find('.select-filter').change(function () {
	// 					var $el = $(this);
	// 					var selector = $el.val();
	// 					workContainer.isotope({
	// 						filter: selector
	// 					});
	// 				});
		
	// 				$('.grid-item', workWrapper).reCalWidth();
	// 			});
	// 		}
	// 		work();
		
	// 		$('.portfolio').magnificPopup({
	// 			delegate: 'a',
	// 			type: 'image',
	// 			closeOnContentClick: true,
	// 			closeBtnInside: true,
	// 			fixedContentPos: true,
	// 			closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="pe-7s-close"></i></button>',
		
	// 			removalDelay: 500, //delay removal by X to allow out-animation
	// 			callbacks: {
	// 				beforeOpen: function beforeOpen() {
	// 					this.st.mainClass = this.st.el.attr('data-effect');
	// 				}
	// 			},
	// 			midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
	// 		});
		
	// 		$('.portfolio .popup-video').magnificPopup({
	// 			disableOn: 700,
	// 			type: 'iframe',
	// 			preloader: false,
	// 			closeOnContentClick: true,
	// 			closeBtnInside: true,
	// 			fixedContentPos: true,
	// 			closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="pe-7s-close"></i></button>',
		
	// 			removalDelay: 500, //delay removal by X to allow out-animation
	// 			callbacks: {
	// 				beforeOpen: function beforeOpen() {
	// 					this.st.mainClass = this.st.el.attr('data-effect');
	// 				}
	// 			},
	// 			midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
	// 		});
		
	// 		$('.video .popup-video').magnificPopup({
	// 			disableOn: 700,
	// 			type: 'iframe',
	// 			preloader: false,
	// 			closeOnContentClick: true,
	// 			closeBtnInside: true,
	// 			fixedContentPos: true,
	// 			closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="pe-7s-close"></i></button>',
		
	// 			removalDelay: 500, //delay removal by X to allow out-animation
	// 			callbacks: {
	// 				beforeOpen: function beforeOpen() {
	// 					this.st.mainClass = this.st.el.attr('data-effect');
	// 				}
	// 			},
	// 			midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
	// 		});
	// 	}
	// })
	var res = {
		"list":[
			{
				"type":"智能网关",
				"data":[
					{
						"url":"1.jpg"
					},
					{
						"url":"2.jpg"
					},
					{
						"url":"3.jpg"
					}
				]
			},
			{
				"type":"智能开关",
				"data":[
					{
						"url":"K01.jpg"
					},
					{
						"url":"K02.jpg"
					},
					{
						"url":"K03.jpg"
					},
					{
						"url":"K04.jpg"
					},
					{
						"url":"K05.jpg"
					},
					{
						"url":"K06.jpg"
					},
					{
						"url":"K07.jpg"
					},
					{
						"url":"K08.jpg"
					},
					{
						"url":"K09.jpg"
					},
					{
						"url":"K10.jpg"
					},
					{
						"url":"K11.jpg"
					},
					{
						"url":"K12.jpg"
					},
					{
						"url":"K13.jpg"
					},
					{
						"url":"K14.jpg"
					},
					{
						"url":"K15.jpg"
					},
					{
						"url":"K16.jpg"
					},
					{
						"url":"K17.jpg"
					},
					{
						"url":"K18.jpg"
					},
					{
						"url":"K19.jpg"
					},
					{
						"url":"K20.jpg"
					},
					{
						"url":"K21.jpg"
					},
					{
						"url":"K22.jpg"
					},
					{
						"url":"K23.jpg"
					},
					{
						"url":"K24.jpg"
					},
					{
						"url":"K25.jpg"
					},
					{
						"url":"K26.jpg"
					},
					{
						"url":"K27.jpg"
					},
					{
						"url":"K28.jpg"
					},
					{
						"url":"K29.jpg"
					},
					{
						"url":"K30.jpg"
					},
					{
						"url":"K31.jpg"
					},
					{
						"url":"K32.jpg"
					},
					{
						"url":"K33.jpg"
					},
					{
						"url":"K34.jpg"
					},
					{
						"url":"K35.jpg"
					},
					{
						"url":"K36.jpg"
					},
					{
						"url":"K37.jpg"
					},
					{
						"url":"K38.jpg"
					},
					{
						"url":"K39.jpg"
					},
					{
						"url":"K40.jpg"
					}
				]
			},
			{
				"type":"智能插座",
				"data":[
					{
						"url":"C01.jpg"
					},
					{
						"url":"C02.jpg"
					},
					{
						"url":"C03.jpg"
					},
					{
						"url":"C04.jpg"
					},
					{
						"url":"C05.jpg"
					},
					{
						"url":"C06.jpg"
					},
					{
						"url":"C07.jpg"
					},
					{
						"url":"C08.jpg"
					},
					{
						"url":"C09.jpg"
					},
					{
						"url":"C10.jpg"
					},
					{
						"url":"C11.jpg"
					},
					{
						"url":"C12.jpg"
					},
					{
						"url":"C13.jpg"
					}
				]
			},
			{
				"type":"智能遥控",
				"data":[
					{
						"url":"Y01.jpg"
					},
					{
						"url":"Y02.jpg"
					},
					{
						"url":"Y03.jpg"
					},
					{
						"url":"Y04.jpg"
					},
					{
						"url":"Y05.jpg"
					},
					{
						"url":"Y06.jpg"
					}
				]
			},
			{
				"type":"智能安防",
				"data":[
					{
						"url":"A01.jpg"
					},
					{
						"url":"A02.jpg"
					},
					{
						"url":"A03.jpg"
					},
					{
						"url":"A04.jpg"
					},
					{
						"url":"A05.jpg"
					},
					{
						"url":"A06.jpg"
					},
					{
						"url":"A07.jpg"
					},
					{
						"url":"A08.jpg"
					},
					{
						"url":"A09.jpg"
					},
					{
						"url":"A10.jpg"
					}
				]
			},
			{
				"type":"智能照明",
				"data":[
					{
						"url":"Z01.jpg"
					},
					{
						"url":"Z02.jpg"
					},
					{
						"url":"Z03.jpg"
					},
					{
						"url":"Z04.jpg"
					},
					{
						"url":"Z05.jpg"
					},
					{
						"url":"Z06.jpg"
					},
					{
						"url":"Z07.jpg"
					},
					{
						"url":"Z08.jpg"
					},
					{
						"url":"Z09.jpg"
					},
					{
						"url":"Z10.jpg"
					},
					{
						"url":"Z11.jpg"
					},
					{
						"url":"Z12.jpg"
					}
				]
			},
			{
				"type":"智能门锁",
				"data":[
					{
						"url":"M01.jpg"
					},
					{
						"url":"M02.jpg"
					},
					{
						"url":"M03.jpg"
					},
					{
						"url":"M04.jpg"
					},
					{
						"url":"M05.jpg"
					},
					{
						"url":"M06.jpg"
					},
					{
						"url":"M07.jpg"
					},
					{
						"url":"M08.jpg"
					},
					{
						"url":"M09.jpg"
					},
					{
						"url":"M10.jpg"
					},
					{
						"url":"M11.jpg"
					},
					{
						"url":"M12.jpg"
					},
					{
						"url":"M13.jpg"
					},
					{
						"url":"M14.jpg"
					}
				]
			},
			{
				"type":"智能环境",
				"data":[
					{
						"url":"H01.jpg"
					},
					{
						"url":"H02.jpg"
					},
					{
						"url":"H03.jpg"
					},
					{
						"url":"H04.jpg"
					}
				]
			},
			{
				"type":"智能语音控制",
				"data":[
					{
						"url":"B01.jpg"
					},
					{
						"url":"B02.jpg"
					},
					{
						"url":"B03.jpg"
					},
					{
						"url":"B04.jpg"
					},
					{
						"url":"B05.jpg"
					}
				]
			},
			{
				"type":"智能家电控制",
				"data":[
					{
						"url":"J01.jpg"
					},
					{
						"url":"J02.jpg"
					},
					{
						"url":"J03.jpg"
					}
				]
			},
			{
				"type":"智能窗帘窗户",
				"data":[
					{
						"url":"L01.jpg"
					},
					{
						"url":"L02.jpg"
					},
					{
						"url":"L03.jpg"
					},
					{
						"url":"L04.jpg"
					},
					{
						"url":"L05.jpg"
					},
					{
						"url":"L06.jpg"
					}
				]
			},
			{
				"type":"智能晾衣架",
				"data":[
					{
						"url":"D01.jpg"
					},
					{
						"url":"D02.jpg"
					}
				]
			},
			{
				"type":"灯厂照明",
				"data":[
					{
						"url":"E01.jpg"
					},
					{
						"url":"E02.jpg"
					},
					{
						"url":"E03.jpg"
					},
					{
						"url":"E04.jpg"
					},
					{
						"url":"E05.jpg"
					},
					{
						"url":"E06.jpg"
					},
					{
						"url":"E07.jpg"
					},
					{
						"url":"E08.jpg"
					},
					{
						"url":"E09.jpg"
					},
					{
						"url":"E10.jpg"
					},
					{
						"url":"E11.jpg"
					},
					{
						"url":"E12.jpg"
					},
					{
						"url":"E13.jpg"
					},
					{
						"url":"E14.jpg"
					},
					{
						"url":"E15.jpg"
					},
					{
						"url":"E16.jpg"
					},
					{
						"url":"E17.jpg"
					},
					{
						"url":"E18.jpg"
					},
					{
						"url":"E19.jpg"
					},
					{
						"url":"E20.jpg"
					},
					{
						"url":"E21.jpg"
					},
					{
						"url":"E22.jpg"
					},
					{
						"url":"E23.jpg"
					},
					{
						"url":"E24.jpg"
					},
					{
						"url":"E25.jpg"
					},
					{
						"url":"E26.jpg"
					},
					{
						"url":"E27.jpg"
					},
					{
						"url":"E28.jpg"
					},
					{
						"url":"E29.jpg"
					},
					{
						"url":"E30.jpg"
					},
					{
						"url":"E31.jpg"
					},
					{
						"url":"E32.jpg"
					},
					{
						"url":"E33.jpg"
					},
					{
						"url":"E34.jpg"
					},
					{
						"url":"E35.jpg"
					},
					{
						"url":"E36.jpg"
					},
					{
						"url":"E37.jpg"
					},
					{
						"url":"E38.jpg"
					},
					{
						"url":"E39.jpg"
					},
					{
						"url":"E40.jpg"
					},
					{
						"url":"E41.jpg"
					},
					{
						"url":"E42.jpg"
					},
					{
						"url":"E43.jpg"
					},
					{
						"url":"E44.jpg"
					},
					{
						"url":"E45.jpg"
					},
					{
						"url":"E46.jpg"
					},
					{
						"url":"E47.jpg"
					},
					{
						"url":"E48.jpg"
					},
					{
						"url":"E49.jpg"
					},
					{
						"url":"E50.jpg"
					}
				]
			}
		]
	}
	res.list.forEach((ele,index) => {
		// $('.cpTypeList').append(`<li style="font-size:14px"><a href="#" data-filter=".cat${index + 1}">${ele.type}</a></li>`)
		var items = ele.data;
		for(var i=0;i<8;i++){
			if(items[i]){
				$('.cpList').append(
					`<div class="grid-item normal cat${index+1} ">
						<div class="grid-item__inner">
							<div class="grid-item__content-wrapper">
								<div class="portfolio" href="assets/img/chanping/${index+1}/${items[i].url}">
									<a class="portfolio__bg" href="assets/img/chanping/${index+1}/${items[i].url}" style="background-image: url('assets/img/chanping/${index+1}/${items[i].url}');" data-effect="mfp-zoom-in">
										<img src="assets/img/chanping/${index+1}/${items[i].url}"/>
									</a>
								</div>
							</div>
						</div>
					</div>`
				)
			}else   break;
		}
	});
	
	$.fn.reCalWidth = function () {
		var $self = $(this);
		$self.on('reCalWidth', function () {
			var _self = $(this);
			_self.css('width', '');
			var width = Math.floor(_self.width());
			_self.css('width', width + 'px');
			var height = Math.floor(_self.parent().children('.wide').width() / 2);
			_self.parent().children('.wide').css('height', height + 'px');
		});
		$(window).on('resize', function () {
			$self.trigger('reCalWidth');
		});
	};
	function work() {
		$('.grid-css').each(function () {
			var workWrapper = $(this),
					workContainer = $('.grid__inner', workWrapper),
					filters = $('.filter', workWrapper),
					filterCurrent = $('.current a', filters),
					filterLiCurrent = $('.current', filters),
					duration = 0.3;
			workContainer.imagesLoaded(function () {

				// Fix Height
				if (workWrapper.hasClass('grid-css--fixheight')) {
					workContainer.find('.grid-item__content-wrapper').matchHeight();
				}

				workContainer.isotope({
					layoutMode: 'masonry',
					itemSelector: '.grid-item',
					transitionDuration: duration + 's',
					masonry: {
						columnWidth: '.grid-sizer'
					}
					// hiddenStyle: {},
					// visibleStyle: {}
				});
			});
			workContainer.isotope({
				filter: '.cat6'
			});
			filters.on('click', 'span', function (e) {
				e.preventDefault();
				var $el = $(this);
				var selector = $el.attr('data-filter');
				filters.find('.current').removeClass('current');
				$el.parent().addClass('current');
				workContainer.isotope({
					filter: selector
				});
			});

			// filters.find('.select-filter').change(function () {
			// 	var $el = $(this);
			// 	var selector = $el.val();
			// 	workContainer.isotope({
			// 		filter: selector
			// 	});
			// });

			$('.grid-item', workWrapper).reCalWidth();
		});
	}
	work();

	$('.portfolio').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: true,
		fixedContentPos: true,
		// closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="pe-7s-close"></i></button>',

		removalDelay: 500, //delay removal by X to allow out-animation
		callbacks: {
			beforeOpen: function beforeOpen() {
				this.st.mainClass = this.st.el.attr('data-effect');
			}
		},
		midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
	});

	$('.portfolio .popup-video').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		preloader: false,
		closeOnContentClick: true,
		closeBtnInside: true,
		fixedContentPos: true,
		// closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="pe-7s-close"></i></button>',

		removalDelay: 500, //delay removal by X to allow out-animation
		callbacks: {
			beforeOpen: function beforeOpen() {
				this.st.mainClass = this.st.el.attr('data-effect');
			}
		},
		midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
	});

	$('.video .popup-video').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		preloader: false,
		closeOnContentClick: true,
		closeBtnInside: true,
		fixedContentPos: true,
		// closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="pe-7s-close"></i></button>',

		removalDelay: 500, //delay removal by X to allow out-animation
		callbacks: {
			beforeOpen: function beforeOpen() {
				this.st.mainClass = this.st.el.attr('data-effect');
			}
		},
		midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
	});

	/**
   * ProgressBar
   */
	var progress = $('.progress');

	progress.each(function () {

		var _self = $(this);
		var progressNumber = _self.find('.progress__number');
		progressNumber.text('0%');

		_self.waypoint(function (direction) {
			var progressBar = _self.find('.progress__bar'),
				    delay = progressBar.data("delay"),
				    durations = progressBar.data("duration"),
				    timing = progressBar.data("timing"),
				    getPercent = progressBar.data('progress-percent');

			console.log(durations);

			progressBar.css({
				'width': getPercent + '%',
				'transition': 'all ' + durations + 'ms ' + timing,
				'transition-delay': delay + 'ms'
			});

			setTimeout(function () {
				progressNumber.prop('Counter', 0).animate({
					Counter: getPercent
				}, {
					duration: durations,
					easing: 'swing',
					step: function step(now) {
						$(this).text(Math.ceil(now) + '%');
					}
				});
			}, delay);

			this.destroy();
		}, {
			offset: function offset() {
				return Waypoint.viewportHeight() - _self.outerHeight() - 150;
			}
		});
	});

	var smokyBG = $('#smoky-bg').waterpipe({
		gradientStart: '#51ff00',
		gradientEnd: '#001eff',
		smokeOpacity: 0.1,
		smokeSize: 100,
		numCircles: 1,
		maxMaxRad: 'auto',
		minMaxRad: 'auto',
		minRadFactor: 0,
		iterations: 8,
		drawsPerFrame: 10,
		lineWidth: 2,
		speed: 10,
		bgColorInner: "#111",
		bgColorOuter: "#000"
	});
	/**
   * Swiper
   */
	$('.swiper__module').each(function () {
		var self = $(this),
			    wrapper = $('.swiper-wrapper', self),
			    optData = eval('(' + self.attr('data-options') + ')'),
			    optDefault = {
			paginationClickable: true,
			pagination: self.find('.swiper-pagination-custom'),
			nextButton: self.find('.swiper-button-next-custom'),
			prevButton: self.find('.swiper-button-prev-custom'),
			spaceBetween: 30
		},
			    options = $.extend(optDefault, optData);
		wrapper.children().wrap('<div class="swiper-slide"></div>');
		var swiper = new Swiper(self, options);

		function thumbnails(selector) {

			if (selector.length > 0) {
				var wrapperThumbs = selector.children('.swiper-wrapper'),
					    optDataThumbs = eval('(' + selector.attr('data-options') + ')'),
					    optDefaultThumbs = {
					spaceBetween: 10,
					centeredSlides: true,
					slidesPerView: 3,
					touchRatio: 0.3,
					slideToClickedSlide: true,
					pagination: selector.find('.swiper-pagination-custom'),
					nextButton: selector.find('.swiper-button-next-custom'),
					prevButton: selector.find('.swiper-button-prev-custom')
				},
					    optionsThumbs = $.extend(optDefaultThumbs, optDataThumbs);
				wrapperThumbs.children().wrap('<div class="swiper-slide"></div>');
				var swiperThumbs = new Swiper(selector, optionsThumbs);
				swiper.params.control = swiperThumbs;
				swiperThumbs.params.control = swiper;
			}
		}
		thumbnails(self.next('.swiper-thumbnails__module'));
	});

	/**
   * Tabs
   */
	$('.tabs__module').each(function () {
		var self = $(this),
			    optData = eval('(' + self.attr('data-options') + ')'),
			    optDefault = {
			active: 0,
			activeEvent: 'click',
			navigatorPosition: 'top'
		},
			    options = $.extend(optDefault, optData);
		self.aweTabs(options);
	});

	$('.video .popup-video').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		preloader: false,
		closeOnContentClick: true,
		closeBtnInside: true,
		fixedContentPos: true,
		// closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="pe-7s-close"></i></button>',

		removalDelay: 500, //delay removal by X to allow out-animation
		callbacks: {
			beforeOpen: function beforeOpen() {
				this.st.mainClass = this.st.el.attr('data-effect');
			}
		},
		midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
	});
	/**
  * Footer
  */

	$('#back-to-top').on('click', function (e) {
		e.preventDefault();
		$('html,body').animate({
			scrollTop: 0
		}, 700);
	});
	//*
	// Header
	//*


	var wh = $(window).height(),
		    half = wh / 2,
		    headerHeight = $('header').outerHeight();

	$(window).scroll(function () {
		var scrollTop = $(window).scrollTop();

		if (scrollTop >= half) {
			$('header').addClass('is-scroll');
		} else {
			$('header').removeClass('is-scroll');
		}
	});

	$('.onepage-nav').dropdownMenu({
		menuClass: 'onepage-menu',
		breakpoint: 1200,
		toggleClass: 'active',
		classButtonToggle: 'navbar-toggle',
		subMenu: {
			class: 'sub-menu',
			parentClass: 'menu-item-has-children',
			toggleClass: 'active'
		}
	});

	$('.onepage-nav').onePageNav({
		currentClass: 'current-menu-item',
		scrollOffset: headerHeight
	});

	//*
	// Back to top
	//*

	$(window).scroll(function () {
		var wh = $(window).height(),
			    scrollTop = $(window).scrollTop();

		if (scrollTop >= wh) {
			$('#back-to-top').addClass('is-visible');
		} else {
			$('#back-to-top').removeClass('is-visible');
		}
	});

	var headerHeight = $('header').outerHeight();

	$('#back-to-down').on('click', function () {
		var offsets = $(this).closest('.hero').next().offset().top - headerHeight;

		$('html,body').animate({
			scrollTop: offsets
		}, 700);
	});


		// 百度地图API功能
		function G(id) {
			return document.getElementById(id);
		}
		var map = new BMap.Map("l-map");
		//map.centerAndZoom("厦门",12);    // 初始化地图,设置城市和地图级别。
		map.enableScrollWheelZoom();   	//启用滚轮放大缩小，默认禁用
		map.enableContinuousZoom();    	//启用地图惯性拖拽，默认禁用
		var local = new BMap.LocalSearch(map, {
			renderOptions:{map: map}
		});
		var msearch = '无锡市梁溪区广益路291号';
		local.search(msearch);  //百度地图关键字检索 默认加载一次
	
})(jQuery);