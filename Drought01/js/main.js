
if( navigator.userAgent.match(/Windows Phone/i) !== null || navigator.userAgent.match(/iemobile/i) !== null ) document.getElementsByTagName("HTML")[0].setAttribute("class", "is-ie-mobile");

$( document ).ready( function( ){
	$( 'body' ).on( 'click', 'a.search-toggle', function( event ){
		event.stopPropagation();
		var form = $( this ).closest( 'div.search-container' ).find( '.navbar-form' );
		form.toggleClass( 'search-open' );
		if( form.hasClass( 'search-open' ) ){
			form.find( '.form-control' ).focus( );
		}
	});

	$( '.btn,.navbar-toggle' ).on( 'click', function(){
		$( this ).blur();
	});

	$( 'body' ).on( 'click contextmenu', '.navbar .navbar-form', function( event ){
		event.stopPropagation();
	});

	$( 'body' ).on( 'click', '.search-submit', function( event ){
		$( this ).closest( 'form' ).submit();
	});

	$( document ).click( function( ){
		$( '.navbar .navbar-form' ).removeClass( 'search-open' );
	});

	$( '.world.hidden-xs .btn-group .btn' ).click( function( ){
		$( this ).toggleClass( 'btn-active' );
		document.activeElement.blur();
	});

	$( '.navmenu.offcanvas' ).on( 'show.bs.offcanvas', function( event ){
		$( '.navbar-toggle' ).addClass( 'navbar-toggle-active' ).removeClass( 'collapsed' );
		$( '.mobileNavBar, .mobileNavBarScroll' ).show( );
	});

	$( '.navmenu.offcanvas' ).on( 'hide.bs.offcanvas', function( event ){
		$( '.navbar-toggle' ).removeClass( 'navbar-toggle-active' ).addClass( 'collapsed' );
		$( '.navmenu.offcanvas .dropdown-menu-backdrop' ).removeClass( 'dropdown-menu-backdrop-active' );
		$( '.navmenu.offcanvas .navmenu-nav > li.open > a' ).trigger( 'click' );
		$( '.mobileNavBar, .mobileNavBarScroll' ).hide( );
	});

	$( '.navmenu.offcanvas .navmenu-nav > li' ).on( 'show.bs.dropdown', function( event ){
		$( '.navmenu.offcanvas .dropdown-menu-backdrop' ).addClass( 'dropdown-menu-backdrop-active' );
		$( '.navmenu.offcanvas .navmenu-nav > li' ).not( $( this ) ).find( 'a' ).addClass( 'btn-inactive' );
	});

	$( '.navmenu.offcanvas .navmenu-nav > li' ).on( 'hide.bs.dropdown', function( event ){
		$( '.navmenu.offcanvas .dropdown-menu-backdrop' ).removeClass( 'dropdown-menu-backdrop-active' );
		$( '.navmenu.offcanvas .navmenu-nav > li .btn-inactive' ).removeClass( 'btn-inactive' );
	});

	$( '.navmenu.offcanvas .dropdown-menu-backdrop, .navmenu.offcanvas li > .dropdown-menu a' ).click( function( event ){
		event.stopPropagation();
	});

	$( '.slideshow-wrapper' ).click( function( event ){
		var slideNum = ($(this).find('.slideshow-slides').attr('slidenr'));
		if( slideNum == 1 ) var slideClass = '.slideshow-slide-front';
		if( slideNum == 2 ) var slideClass = '.slideshow-slide-top';
		if( slideNum == 3 ) var slideClass = '.slideshow-slide-back';
		if( slideNum == 4 ) var slideClass = '.slideshow-slide-bottom';
		var href = $( slideClass ).attr( 'data-href' );
		//if( href != '#' ) window.location = href;
	});

	$( '.caption[data-href]' ).click( function( event ){
		var href = $( this ).attr( 'data-href' );
		if( href != '#' ) window.location = href;
	});

	$( '.thumbnail[data-href],.panel-cta[data-href]' ).click( function( event ){
		var href = $( this ).attr( 'data-href' );
		if( href != '#' ) window.location = href;
	});

	$( '.thumbnail[data-href] a' ).click( function( event ){
		event.stopPropagation();
	});

	$(document.body).on('click', '.thumbnail[data-href]', function( event ){
		var href = $( this ).attr( 'data-href' );
		if( href != '#' ) window.location = href;
	});

	$(document.body).on('click', '.thumbnail[data-href] a', function( event ){
		event.stopPropagation();
	});

	$( '.btn-filter-toggle' ).click( function( event ){
		$( '.landing-filters' ).toggleClass( 'landing-filters-visible' );
	});

	$( '.navmenu.offcanvas .mobile-left-nav' ).html( $( '.navbar-collapse.collapse.navbar-responsive-collapse' ).html() );

	$grid = '';
	setupMasonry();

	$( window ).on( 'resize orientationchange', setupMasonry );

	var ieVersion = detectIE();
	if( ieVersion > 0 && ieVersion != 11 ) $( 'html' ).addClass( 'is-ie' );
	if( ieVersion == 11 ) $( 'html' ).addClass( 'is-ie11' );
	if( ieVersion == 10 ) $( 'html' ).addClass( 'is-ie10' );

	addPopovers( $( '[data-toggle="popover"]' ) );

	(function($){
		/* Adjustments for Safari on Mac */
		if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Mac') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
			$( 'html' ).addClass( 'safari-mac' );
		}
		/* Adjustments for Chrome */
		if( !!window.chrome && !!window.chrome.webstore ) $( 'html' ).addClass( 'is-chrome' );
	})(jQuery);

	document.addEventListener('touchstart', function addtouchclass(e){ // first time user touches the screen
		document.documentElement.classList.add('can-touch'); // add "can-touch" class to document root using classList API
		document.removeEventListener('touchstart', addtouchclass, false); // de-register touchstart event
	}, false);
});

/* IE Detection Resource: https://codepen.io/gapcode/pen/vEJNZN */
function detectIE() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
	// IE 10 or older => return version number
	return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
	// IE 11 => return version number
	var rv = ua.indexOf('rv:');
	return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
	// Edge (IE 12+) => return version number
	return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return -1;
}

// Card positioning
function setupMasonry()
{
	var viewportWidth = $( 'body' ).outerWidth();

	// reset card heights
	$( '.masonry-container p.btn-tag-group' ).removeClass( 'card-bottom' );
	$( '.masonry-container div.thumbnail'   ).css( 'min-height', 0 );

	if( viewportWidth > 768 )
	{
		if( $grid == '' ){
			$grid = $( '.masonry-container' ).masonry({
				itemSelector: '.masonry-item',
				columnWidth: '.grid-sizer',
				percentPosition: true
			});

			$grid.imagesLoaded().progress( function() {
				$grid.masonry( 'layout' );
			});
		}else{
			$grid.masonry('layout');
		}
	}else{
		if( $grid != '' ){
			$grid.masonry('destroy');
			$grid = '';
		}
	}
}

// Initialization of bootstrap popovers
function addPopovers( elements )
{
	elements.popover({ trigger: "manual" , html: true, animation:false})
		.on("mouseenter", function () {
			var _this = this;
			$(this).popover("show");
			$(".popover").on("mouseleave", function () {
				$(_this).popover('hide');
			});
		}).on("mouseleave", function () {
			var _this = this;
			setTimeout(function () {
				if (!$(".popover:hover").length) {
					$(_this).popover("hide");
				}
			}, 300);
	});
}
