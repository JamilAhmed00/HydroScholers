

var filters 	= [];
var dateFilters = {dateStart:'', dateEnd:''};
var endDate = $('#endDateHidden').val();

$( document ).ready( function( ){
	$.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

	$( '.btn-datepicker' ).click( function( event ){
		event.stopPropagation();
	});

	$( '.btn.btn-filter:not(".btn-datepicker")' ).click( function( ){
		$( this ).toggleClass( 'btn-active' );
		document.activeElement.blur();

		if( $( this ).hasClass( 'btn-filter-toggle' ) )
		{
			var filterGlyphicon = $( this ).find( '.glyphicon-filter' ),
				glyphicon = $( this ).find( '.glyphicon' );
			if( filterGlyphicon.length > 0 )
			{
				glyphicon.removeClass( 'glyphicon-filter' ).addClass( 'glyphicon-remove' );
			}else{
				glyphicon.removeClass( 'glyphicon-remove' ).addClass( 'glyphicon-filter' );
			}
		}else
		{
			// Get list of active filters to perform filtering.
			var viewportWidth = $( 'body' ).outerWidth();

			if( viewportWidth > 768 )
			{
				var hiddenClass = 'hidden-lg';
			}else{
				var hiddenClass = 'hidden-xs';
			}

			filters = [];
			$( '.btn.btn-filter.btn-active:not(".btn-filter-toggle"):not(".btn-datepicker")' ).each(function(){
				filters.push( $( this ).data( 'filter' ) );
			});
			// reset the explore more url on filter change
			// remove any extra URL parameters and attach them at the end
			loc = window.location.href;
			if (loc.indexOf('?') != -1) {
				param = loc.split('?').pop();
				param = '?'+param;
				loc = loc.substring(0, loc.indexOf('?'));
			} else {
				param = '';
			}						
			$('.explore-more').attr('data-href', loc+'/getRecords'+param);

			displayResults( true );
		}
	});

	$('body').click( closeDatepicker );

	$( window ).on( 'resize orientationchange', closeDatepicker );

	$( '.btn-datepicker' ).click( function(){
		$( this ).toggleClass( 'btn-datepicker-active' );
		$( '.landing-filters.landing-filters-visible' );
	});

	// datepicker initilization and event binding
	$( '.btn-datepicker' ).popover({
		content: '<div class="popover-datepicker">' +
			'<form role="form" method="post">' +
				'<div class="form-group">' +
					'<div class="input-group date" id="end-date">' +
						'<input type="text" class="form-control" placeholder="Select Date" value='+endDate+' onKeyPress = "updateClearButton()" />' + 
						'<a href = "javascript:clearEndDate()" class = "clear-date hidden no-underline" title = "Clear End Date"><span class="glyphicon glyphicon-remove"></span></a>' +
						'<span class="input-group-addon">' +
							'<span class="glyphicon glyphicon-calendar"></span>' +
						'</span>' +
					'</div>' +
				'</div>' +
			'</form>' +
			'</div>',
		html: true,
		placement: "bottom",
		trigger: 'click'
	}).on( 'shown.bs.popover', function(){
		var startDate = $('#startDateHidden').val(),
			endDate = $('#endDateHidden').val();

		$('.popover-datepicker').parent().parent().on( 'click', function(event){
			event.stopPropagation();
		});

		$( '#end-date' ).datetimepicker({
			viewMode: 'years',
			format: 'MM/YYYY',
			focusOnShow: false,
			useCurrent: false,
			defaultDate: endDate,
			minDate: startDate == '' ? false : startDate,
			maxDate: moment().hour(23).minute(59).minute(59)
		}).on( 'dp.change', function(e){
			updateClearButton( $( this ).find( 'input' ) );

			dateFilters.dateEnd = $( '#end-date input').val( );
			// reset the explore more url on filter change			
			// remove any extra URL parameters and attach them at the end
			loc = window.location.href;
			var index = loc.indexOf("?");    
    		if(index !== -1) {
    			param = loc.split('?').pop();
    			param = '?'+param;
    			loc = loc.substring(0, loc.indexOf('?'));
    		} else {
    			param = '';
    		}
			$('.explore-more').attr('data-href', loc+'/getRecords'+param);

			displayResults( true );
		});

		if( endDate.length > 0 ) updateClearButton( $( '#end-date input' ) );
	}).on( 'hide.bs.popover', function(){
		if ($( '#start-date input').length > 0) {
			$('#startDateHidden').val($( '#start-date input').val( ));
		}
		if ($( '#end-date input').length > 0) {
			endDateFormatted = $( '#end-date input').val( );
			endDateFormatted = endDateFormatted.split('/');
			var lastday = function(y,m){
				return new Date(y, m +1, 0).getDate();
			}
			fullEndDate = endDateFormatted[1]+'-'+endDateFormatted[0]+'-'+lastday(endDateFormatted[1],endDateFormatted[0]);
			if (isNaN(fullEndDate)) {
				// do nothing - don't change the date
			} else {
				$('#endDateHidden').val(fullEndDate);
			}
		}
	});

	$( '.landing-container .explore-more' ).click( function( event ) { if( !$( this ).hasClass( 'inactive' ) ) displayResults( false ); });

	setLandingCards( $( '.row.landing-cards' ));	
	setTimeout( function( ) {
		// for IE
		setLandingCards( $( '.row.landing-cards' ));
	}, 500 );
	$( window ).on( 'resize orientationchange', function( ) {
		setLandingCards( $( '.row.landing-cards' ));
		setTimeout( function( ) {
			setLandingCards( $( '.row.landing-cards' ));
		}, 600 );
	});
});

function closeDatepicker()
{
	if ( $('.btn-datepicker').is('[aria-describedby]') ) {
		$('.btn-datepicker').trigger('click');
	}
}

function updateClearButton( obj )
{
	if( obj.val().length == 0 )
	{
		obj.siblings( '.clear-date' ).addClass( 'hidden' );
	}else{
		obj.siblings( '.clear-date' ).removeClass( 'hidden' );
	}
}

function clearStartDate()
{
	$( '#start-date' ).data( "DateTimePicker" ).date(null);
}

function clearEndDate()
{
	$( '#end-date' ).data( "DateTimePicker" ).date(null);
}

function resizeCards( rows )
{
	rows.each( function( ) {
		var row = $( this );

		row.find( 'div.thumbnail'   ).css( 'min-height', 0 );
		row.find( 'p.btn-tag-group' ).removeClass( 'card-bottom' );

		var cardHeight1 = 0,
			cardHeight2 = 0;

		var card3  = row.find( ' .card3 .thumbnail' ),
			card4  = row.find( ' .card4 .thumbnail' ),
			card5  = row.find( ' .card5 .thumbnail' ),
			card8  = row.find( ' .card8 .thumbnail' ),
			card9  = row.find( ' .card9 .thumbnail' ),
			card10 = row.find( '.card10 .thumbnail' );

		var card3height  =  card3.outerHeight( ),
			card4height  =  card4.outerHeight( ),
			card5height  =  card5.outerHeight( ),
			card8height  =  card8.outerHeight( ),
			card9height  =  card9.outerHeight( ),
			card10height = card10.outerHeight( );

		var difference1 = card3.length > 0 &&  card4.length > 0 ? card4.parent( ).position( ).top -  card3.parent( ).position( ).top : 0,
			difference2 = card9.length > 0 && card10.length > 0 ? card9.parent( ).position( ).top - card10.parent( ).position( ).top : 0;

		// Set bottom of cards 3-5 to line up at the bottom
		if( card4height > card5height ) cardHeight1 = card4height;
								   else cardHeight1 = card5height;

		card4.css( 'min-height', cardHeight1 + 'px' );
		card5.css( 'min-height', cardHeight1 + 'px' );

		if( cardHeight1 > card3height - difference1 ) {
			card3.css( 'min-height', cardHeight1 + difference1 + 'px' );
			card3.find( 'p.btn-tag-group' ).addClass( 'card-bottom' );
		} else {
			var newCardHeight1 = card3height - difference1;

			card4.css( 'min-height', newCardHeight1 + 'px' );
			card5.css( 'min-height', newCardHeight1 + 'px' );
		}

		card4.find( 'p.btn-tag-group' ).addClass( 'card-bottom' );
		card5.find( 'p.btn-tag-group' ).addClass( 'card-bottom' );

		// Set bottom of cards 8-10 to line up at the bottom
		if( card8height > card9height ) cardHeight2 = card8height;
								   else cardHeight2 = card9height;

		card8.css( 'min-height', cardHeight2 + 'px' );
		card9.css( 'min-height', cardHeight2 + 'px' );

		if( cardHeight2 > card10height - difference2 ) {
			card10.css( 'min-height', cardHeight2 + difference2 + 'px' );
			card10.find( 'p.btn-tag-group' ).addClass( 'card-bottom' );
		} else {
			var newCardHeight2 = card10height - difference2;

			card8.css( 'min-height', newCardHeight2 + 'px' );
			card9.css( 'min-height', newCardHeight2 + 'px' );
		}

		card8.find( 'p.btn-tag-group' ).addClass( 'card-bottom' );
		card9.find( 'p.btn-tag-group' ).addClass( 'card-bottom' );

		// adjust container height
		setTimeout( function( ) {
			if( row.find( '.masonry-item' ).length == 2 && row.find( '.card2' ).length > 0 )
			{
				row.css( 'height', row.find( '.card2' ).outerHeight( ) + 'px' );
			}else if( row.find( '.masonry-item' ).length == 2 && row.find( '.card6' ).length > 0 )
			{
				var card6Height = row.find( '.card6' ).outerHeight( ),
					card7Height = row.find( '.card7' ).outerHeight( ),
					heightToUse = card7Height !== null && card7Height > card6Height ? card7Height : card6Height;

				row.css( 'height', heightToUse + 'px' );
			}else
			{
				row.css( 'height', row.find( '.card1' ).outerHeight( ) + row.find( '.card3' ).outerHeight( ) + row.find( '.card6' ).outerHeight( ) + row.find( '.card8' ).outerHeight( ) + 'px' );
			}
		}, 500 );

		setTimeout( function( ) {
			row.removeClass( 'appended' );
		}, 550 );
	});
}

function setCardCSS( div, left, top ) { div.css({ 'position' : 'absolute', 'left' : left + '%', 'top' : top + 'px' }); }

function setCard1( row, div ) { setCardCSS( div,  0, 5 ); }
function setCard2( row, div ) { setCardCSS( div, 40, 5 ); }

function setCard3( row, div )
{
	var topDiv   = row.find( '.card1' ),
		thisTop  = topDiv.position( ).top + topDiv.outerHeight( );

	setCardCSS( div, 0, thisTop );
}

function setCard4( row, div )
{
	var topDiv   = row.find( '.card2' ),
		thisTop  = topDiv.position( ).top + topDiv.outerHeight( );

	setCardCSS( div, 40, thisTop );
}

function setCard5( row, div )
{
	var topDiv   = row.find( '.card2' ),
		thisTop  = topDiv.position( ).top + topDiv.outerHeight( );

	setCardCSS( div, 70, thisTop );
}

function setCard6( row, div ) { setCardCSS( div,  0, 5 ); }
function setCard7( row, div ) { setCardCSS( div, 60, 5 ); }

function setCard8( row, div )
{
	var topDiv   = row.find( '.card6' ),
		thisTop  = topDiv.position( ).top + topDiv.outerHeight( );

	setCardCSS( div, 0, thisTop );
}

function setCard9( row, div )
{
	var topDiv   = row.find( '.card6' ),
		thisTop  = topDiv.position( ).top + topDiv.outerHeight( );

	setCardCSS( div, 30, thisTop );
}

function setCard10( row, div )
{
	var topDiv   = row.find( '.card7' ),
		thisTop  = topDiv.position( ).top + topDiv.outerHeight( );

	setCardCSS( div, 60, thisTop );
}

function setLandingCards( rows )
{
	var viewportWidth = $( 'body' ).outerWidth();

	rows.each( function( ) {
		var row 	  = $( this );
		var rowHeight = 0;

		row.find( '.masonry-item' ).each( function( ) {
			$( this ).css({ 'position' : 'relative', 'left' : 'auto', 'top' : 'auto' });
			$( this ).find( '.thumbnail' ).css({ 'min-height' : 0, 'height' : 'auto' });
			$( this ).find( 'p.btn-tag-group' ).removeClass( 'card-bottom' );

			rowHeight += $( this ).outerHeight( );
		});

		if( viewportWidth > 768 ) {
			row.css( 'height', row.outerHeight( ) + 'px' );

			$( '.masonry-item' ).each( function( ) {
				var div = $( this ),
					thisRow = div.parent( '.row' );

				if( div.hasClass( 'card1'  )) setCard1(  thisRow, div );
				if( div.hasClass( 'card2'  )) setCard2(  thisRow, div );
				if( div.hasClass( 'card3'  )) setCard3(  thisRow, div );
				if( div.hasClass( 'card4'  )) setCard4(  thisRow, div );
				if( div.hasClass( 'card5'  )) setCard5(  thisRow, div );
				if( div.hasClass( 'card6'  )) setCard6(  thisRow, div );
				if( div.hasClass( 'card7'  )) setCard7(  thisRow, div );
				if( div.hasClass( 'card8'  )) setCard8(  thisRow, div );
				if( div.hasClass( 'card9'  )) setCard9(  thisRow, div );
				if( div.hasClass( 'card10' )) setCard10( thisRow, div );
				if( div.hasClass( 'card6'  )) setTimeout( function( ) { setCard6(  thisRow, div ) }, 50 );
				if( div.hasClass( 'card7'  )) setTimeout( function( ) { setCard7(  thisRow, div ) }, 50 );
				if( div.hasClass( 'card8'  )) setTimeout( function( ) { setCard8(  thisRow, div ) }, 50 );
				if( div.hasClass( 'card9'  )) setTimeout( function( ) { setCard9(  thisRow, div ) }, 50 );
				if( div.hasClass( 'card10' )) setTimeout( function( ) { setCard10( thisRow, div ) }, 50 );
			});

			setTimeout( function( ) { resizeCards( row ); }, 50 );
		} else {
			row.css( 'height', rowHeight + 'px' ).removeClass( 'appended' );
		}
	});
}

function displayResults( isNew )
{
	var moreURL 	  	= $('.explore-more').attr('data-href');
	var cardCount 	  	= $( '.masonry-item'  ).length;
	var limit 		  	= isNew ? '0, 10' : cardCount + ', 5';
	var contentTypeID 	= $( '#contentTypeID' ).length > 0 ? $( '#contentTypeID' ).val( ) : 0;
	var topicID 	  	= $( '#topicID' 		).length > 0 ? $( '#topicID' 	   ).val( ) : 0;
	var filterList    	= filters.toString( );

	var dateStartArray	= (dateFilters.dateStart).split('/');
	var dateStartFull	= dateStartArray[0]+'/01/'+dateStartArray[1];
	var dateStart 	  	= new Date(dateStartFull).getTime() / 1000;

	var dateEndArray  	= (dateFilters.dateEnd).split('/');
	var dateEndFull		= new Date(dateEndArray[1], dateEndArray[0], 0);
	var dateEnd   	  	= new Date(dateEndFull).getTime() / 1000;

	if (isNaN(dateStart)) {
		dateStart = new Date('01-01-1997').getTime() / 1000;
		// Safari fix
		if (isNaN(dateStart)) {
			dateStart = new Date('1997-01-01').getTime() / 1000;
		}
	}
	if (isNaN(dateEnd)) {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		dateEnd = new Date(yyyy+'-'+mm+'-'+dd).getTime() / 1000;
		// Safari fix
		if (isNaN(dateEnd)) {
			dateEnd = new Date(yyyy + '-' + ('0' + mm).slice(-2) + '-' + ('0' + dd).slice(-2)).getTime() / 1000;
		}
	}
	if (filterList == '') {
		filterList = 'null';
	}

	var lastCard = $( '.masonry-item'  ).last( );
	var lastRow = $( '.row.landing-cards' ).length > 0 && !isNew ? $( '.row.landing-cards' ).last( ) : $( '.container .row' ).first( );

	$.ajax({
		type 	 : 'GET',
		url 	 : moreURL,
		data     : {
			filters 	  : filterList,
			dateStart     : dateStart,
			dateEnd 	  : dateEnd,
		},
		dataType : 'json',
		success  : function( results )
		{

			if( isNew ) {
				$( '.row.landing-cards' ).remove( );
				$( '.explore-more' ).removeClass( 'inactive' );
			}

			if( results['data'].length ) {

				$( '.landing-container' ).removeClass( 'no-results' );

				var row1 = $( '<div />' );
				var row2 = $( '<div />' );

				if( lastCard.hasClass( 'card10' ) || isNew ) var cardNum = 0; else var cardNum = 5;

				for( var i = 0; i < results['data'].length; i++ ) {
					cardNum++

					var clearfix  = cardNum == 2 || cardNum == 3 || cardNum == 4 ? '<div class = "clearfix"></div>' : '';
					var thumbnail = '';
					var column    = '';

					if( cardNum == 2 ) thumbnail = 'thumbnail-horizontal thumbnail-horizontal-top';
					if( cardNum == 3 ) thumbnail = 'thumbnail-horizontal';
					if( cardNum == 4 ) thumbnail = 'thumbnail-horizontal thumbnail-horizontal-bottom';

					if( cardNum == 4 || cardNum == 5 || cardNum == 8 || cardNum == 9  ) column = 'col-sm-30p';
					if( cardNum == 1 || cardNum == 3 || cardNum == 7 || cardNum == 10 ) column = 'col-sm-5';
					if( cardNum == 2 || cardNum == 6  ) 								column = 'col-sm-7';

					var topics = '';
					var topicList = '';

					$.each(results['data'][i].topics, function( key, value ) {
						topics += '<a href = "/topic/' + value.replace(/\s+/g, '-').toLowerCase() + '" class = "btn btn-tag hvr-rectangle-in btn-xs btn-' + key.replace(/\s+/g, '').toLowerCase() + '">' + value + '</a>';
						topicList += key.replace(/\s+/g, '-').toLowerCase() + ' ';
					});
					topicList = topicList.slice(0, -1);

					if (typeof(variable) != "undefined" && variable !== null) {
   						var cardType = '';
					} else {
						var cardType = '<span class = "thumbnail-topic thumbnail-topic-' + results['data'][i].type + '">' + results['data'][i].type_display + '</span>';
					}

					var cardContent = $( '<div class = "' + column + ' col-xs-12 masonry-item masonry-item-hidden card' + cardNum + '" data-tags = "' + topicList + '" data-date = "' + results['data'][i].date_formatted + '"><div class = "thumbnail ' + thumbnail + '" data-href = "' + results['data'][i].slug + '"><div class = "thumbnail-image"><a href="' + results['data'][i].slug + '"><img src = "' + results['data'][i].image_path + results['data'][i].thumbnail_file + '" alt = "' + results['data'][i].title + '" /></a></div><div class = "caption">' + cardType + '<span class = "thumbnail-date">' + results['data'][i].date_formatted + '</span><h4><a href="' + results['data'][i].slug + '">' + results['data'][i].title + '</a></h4><p>' + results['data'][i].caption_short + '</p><p class = "btn-tag-group">' + topics + '</p></div>' + clearfix + '</div></div>' );

					if( cardNum <= 5 || !isNew ) cardContent.appendTo( row1 );
								  			else cardContent.appendTo( row2 );
				}

				setTimeout(function() {
					$( '.masonry-item-hidden' ).removeClass( 'masonry-item-hidden' );
				}, 100);

				// append row 1
				row1.addClass( 'row thumbnail-cards landing-cards appended' );
				if( cardNum == 10 ) row1.addClass( 'full-landing-cards' );
				if( $('.full-landing-cards').length == 0 )
				{
					row1.find( '.thumbnail-image' ).eq( 0 ).addClass( 'thumbnail-image-no-padding' );
					row1.removeClass( 'full-landing-cards' ).addClass( 'first-landing-cards' );
				}
				row1.insertAfter( lastRow );
				setLandingCards( row1 );

				// append row 2
				if( isNew && results.length > 5 ) {
					row2.addClass( 'row thumbnail-cards landing-cards full-landing-cards' );
					row2.insertAfter( row1 );
					setLandingCards( row2 );
				}

				$('.explore-more').attr('data-href', results['next_page_url'].replace('http://', 'https://'));

				if( results['next_page_url'] === null ) $( '.explore-more' ).addClass( 'inactive' );

			} else {
				$( '.landing-container' ).addClass( 'no-results' );

				var row = $( '<div />' );

				var cardContent = $( '<div class = "col-xs-12 masonry-item card"><div class = "thumbnail no-results"><div class = "caption"><h4>No results found.</h4><p> Please adjust your search criteria and try again.</p></div></div></div>' ).appendTo( row );

				row.addClass( 'row thumbnail-cards landing-cards' );
				row.insertAfter( lastRow );

				$( '.explore-more' ).addClass( 'inactive' );
			}

			closeDatepicker();

			// support old thumbnails that are too narrow for the card window
		    $('.thumbnail .thumbnail-image img').each(function() {
			    if (this.naturalWidth < '720') {
			    	$(this).css({'width' : '', 'height' : '100%'});
			    }
		    });
		}
	});
}
