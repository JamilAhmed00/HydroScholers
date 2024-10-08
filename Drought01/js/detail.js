

$( document ).ready( function( ){
	// display panel CTAs after resources and before the subscribe CTA on mobile without duplicate code in display file
	$( '.panel.panel-cta' ).each( function(){
		$( this ).clone().removeClass( 'hidden-xs' ).wrap( $( '<div class = "col-xs-12" />' ) ).parent().wrap( $( '<div class = "row visible-xs" />' ) ).parent().insertBefore( $( '.cta-subscribe-detail' ).parent() );
	});

	// display meta box under the first image on mobile without duplicate code in display file
	$( '.panel.panel-default' ).each( function(){
		if( $( this ).hasClass( 'panel-circle-container' ) )
		{
			var panel = $( this ).clone().removeClass( 'hidden-xs' ).addClass( 'visible-xs panel-map-mobile' ).insertAfter( $( '.detail-header' ).eq( 0 ) );
		}else if( $( this ).hasClass( 'panel-slideshow-container' ) )
		{
			var panel = $( this ).clone().removeClass( 'hidden-xs' ).addClass( 'visible-xs panel-map-mobile' ).insertAfter( $( '.panel.slideshow-viewer-panel' ).eq( 0 ) );


			panel.find( '.panel-map' ).detach().appendTo( panel.find( '.panel-body-mobile' ) );
			panel.find( '.panel-map-description' ).detach().appendTo( panel.find( '.panel-body-mobile' ) );


			addPopovers( panel.find( '[data-toggle="popover"]' ) );
		}else if( $( this ).hasClass( 'panel-slideshow-container-all' ) )
		{
			var panel = $( this ).clone().removeClass( 'hidden-xs' ).addClass( 'visible-xs panel-map-mobile' ).insertAfter( $( '.panel.image-viewer-panel' ).eq( $('.panel.image-viewer-panel').length - 1 ) );


			panel.find( '.panel-map' ).detach().appendTo( panel.find( '.panel-body-mobile' ) );
			panel.find( '.panel-map-description' ).detach().appendTo( panel.find( '.panel-body-mobile' ) );


			addPopovers( panel.find( '[data-toggle="popover"]' ) );
		}else
		{
			var panel = $( this ).clone().removeClass( 'hidden-xs' ).addClass( 'visible-xs panel-map-mobile' ).insertBefore( $( '.references' ).eq( 0 ) );


			panel.find( '.panel-map' ).detach().appendTo( panel.find( '.panel-body-mobile' ) );
			panel.find( '.panel-map-description' ).detach().appendTo( panel.find( '.panel-body-mobile' ) );
			panel.find( '.panel-iotd-nav').detach().appendTo( panel.find( '.panel-body-mobile' ) );


			addPopovers( panel.find( '[data-toggle="popover"]' ) );
		}
	});

	// expand and collapse panel functionality
	$( 'body' ).on( 'click', '.panel-expand-collapse', function(){
		var panel = $( this ).closest( '.panel' ),
			arrow = $( this ).find( '.arrow' );
		if( arrow.hasClass( 'down' ) )
		{
			arrow.removeClass( 'down' ).addClass( 'up' );
			panel.find( '.panel-body-mobile' ).addClass( 'expanded' );
		}else if( arrow.hasClass( 'up' ) )
		{
			arrow.removeClass( 'up' ).addClass( 'down' );
			panel.find( '.panel-body-mobile' ).removeClass( 'expanded' );
		}
	});

	// "You Might Also Be Interested In" animations
	$( '.cta-interest' ).each( function(){
		var element1 = $( this ).parent(),
			element2 = $( this ).parent().siblings().eq(0),
			class1 = element1.attr( 'class' ).match(/(^|\s)col-sm-\S+/g),
			class2 = element2.attr( 'class' ).match(/(^|\s)col-sm-\S+/g);

		if( !element1.is("[data-original-class]") && class1 !== null ) element1.attr( 'data-original-class', class1[0] );
		if( !element2.is("[data-original-class]") && class2 !== null ) element2.attr( 'data-original-class', class2[0] );
	});

	$( '.cta-interest' ).mouseenter( function( event ){
		var element1 = $( this ).parent(),
			element2 = $( this ).parent().siblings().eq(0);

		if( $( this ).hasClass( 'in-view-complete' ) && element1.is( '[data-original-class]' ) ){

			element1.attr( 'class', function( i, c ){ return c.replace(/(^|\s)col-sm-\S+/g, '') }).addClass( 'col-sm-9' );
			element2.attr( 'class', function( i, c ){ return c.replace(/(^|\s)col-sm-\S+/g, '') }).addClass( 'col-sm-3' );
			setTimeout( updateInterestCTAVisibility, 600);
		}
	}).mouseleave( function( event ){
		var element1 = $( this ).parent(),
			element2 = $( this ).parent().siblings().eq(0);

		if( $( this ).hasClass( 'in-view-complete' ) && element1.is( '[data-original-class]' ) ){

			element1.delay( 500 ).attr( 'class', function( i, c ){ return c.replace(/(^|\s)col-sm-\S+/g, '') }).addClass( element1.attr( 'data-original-class' ) );
			element2.delay( 500 ).attr( 'class', function( i, c ){ return c.replace(/(^|\s)col-sm-\S+/g, '') }).addClass( element2.attr( 'data-original-class' ) );
			setTimeout( updateInterestCTAVisibility, 800);
		}
	});

	$( window ).scroll( animateSlideIn );
	$( document ).ready( animateSlideIn );

	// do not show clipped "You might also be interested in" CTA title
	updateInterestCTAVisibility();
});

// Slide in and fade in
function animateSlideIn()
{
	$( ".animate-slide-left,.animate-slide-right" ).each(function( i, el ){
		var el = $( el );
		if( el.visible( false, false, 'vertical' ) ){
			el.addClass( "in-view" ).delay( 2000 ).addClass( "in-view-complete" );
		}
		setTimeout( updateInterestCTAVisibility, 600);
	});
}

function updateInterestCTAVisibility()
{
	// currently only does this for the 5th CTA (the one to the left of the subscribe element)
	var el = $( '.cta-interest-subscribe' ).parent().siblings( '[data-original-class]' ).find( '.cta-interest h2' );
	if( el.visible( false, false, 'horizontal' ) ){
		el.css( 'opacity', 1 );
	}else{
		el.css( 'opacity', 0 );
	}
}