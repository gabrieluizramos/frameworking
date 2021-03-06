$.extend({
	init: function( exec, event, trigger, target, time ){
		/*
		<--
		# it's possible to execute using 'eval' js method
			exec = "$."+exec;
			eval( exec )( event, trigger, target );
		# but let's use only jquery 
		//-->
		*/
		final = true;
		console.log( "<-----" );
		try{
			console.debug( "Init: "+ exec );
			if ( exec && typeof exec == 'string' ) {
				$[ exec ]( event , trigger , target , time );
			}
		} 
		catch( err ){
			console.trace( "Error trying to execute "+ exec );
			console.trace("Error: "+ err);
			final = false;
		}
		finally{
			console.debug( "Execution: "+ exec +" complete [ "+ final +" ]" );
		}
		console.log( "----->\n\n" );
	},
	dropdown: function( event, trigger, target, time ){
		$( trigger )
		.unbind( event )
		.bind( event, function(){			
			/*
			<--
			# desactivate others when effect comes up
				 $( trigger+'[data-active="true"]' )
				 .attr( "data-active", false )
				 .next( target )
				 .slideToggle( time )
				 .attr( "data-active", false );
			 -->
			 */

			 if ( $( this ).attr( "data-active") == "true" ) {
			 	$( this )
			 	.attr( "data-active", false )
			 	.next( target )
			 	.slideToggle( time )
			 	.attr( "data-active", false );
			 	return;
			 }


			 $( this )
			 .attr( "data-active", true )
			 .next( target )
			 .slideToggle( time )
			 .attr( "data-active",  true );

			});
	},
	slider: function( event, trigger, target, time ){
		$( trigger )
		.unbind( event )
		.bind( event, function(){

			$( target )
			.attr( "data-active", false)
			.slideUp( time );

			$( trigger )
			.attr( "data-active", false );


			$( target+':nth-child('+ ( $(this).index()+1) +')' )
			.slideDown( time )
			.attr( "data-active", true );

			$( this )
			.attr( "data-active", true );

		});
		$( trigger+':nth-child(1) ' ).trigger( "click" );
	},
	tabs: function( event, trigger, target, time ){
		$( trigger )
		.unbind( event )
		.bind( event, function(){

			$( target )
			.attr( 'data-active', false )
			.css( 'display', 'none' );

			$( trigger )
			.attr( 'data-active', false );


			$( target+':nth-of-type('+ ( $( this ).index()+1 ) +')' )
			.toggle( time )
			.attr( 'data-active', true );

			$( this )
			.attr( 'data-active', true );

		});
		$( trigger+':nth-child(1)' ).trigger( 'click' );
	},
	modal: function( event, trigger, target, time ){
		// <-----
		
		//SET THE closeModal function, to bind in elements
		close = function(){
			$( target )
			.fadeOut( time );

			$( trigger )
			.attr( 'data-active', false );
			$( target )
			.attr( 'data-active', false );
		}
		/*
			<--
			#other animations properties
				.toggle( time )
				.slideToggle( time )
				.slideDown( time )
				.slideUp( time )
			-->
			*/
		// ----->

		//<-----
		//styles
		//set modal panel style
		$( target ).css({
			'width': '100vw',
			'height': '100vh',
			'position': 'fixed',
			'background': 'rgba(0, 0, 0, 0.8)',
			'left':'0',
			'top':'0',
			'z-index': '5000'
		}); 
		// set modal content (white panel) style
		$( '[data-modal="content"' ).css({
			'width':'80vw',
			'height':'80vh',
			'left':'0',
			'right':'0',
			'margin': '0 auto',
			'top':'10vh',
			'background':'#FFF',
			'position':'absolute',
			'padding':'10vh',
			'color':'#000',
			'z-index':'10000',
			'font-size':'10vw',
			'cursor':'default'
		});
		//----->
		
		$( trigger )
		.unbind( event )
		.bind( event, function(){
			$( this )
			.attr( 'data-active', true )
			.nextAll( target )
			.eq(0)
			.fadeIn( time )
			.attr( 'data-active', true );
		});

		if ( $( '[data-modal="close"]' ) ) {
			//<-----
			$( '[data-modal="close"]' ).css({
				'width':' 5vw',
				'height':' 5vh',
				'position':'absolute',
				'right':' 0',
				'top':' 0',
				'line-height':' 5vh',
				'text-align':' center',
				'font-size':' 3vw',
				'color':'#FFF',
				'background':'#E85151',
				'cursor':'pointer'
			});
			//----->
			$( '[data-modal="close"]' )
			.unbind( 'click' )
			.bind( 'click', close );
		}
		if ( $( '[data-modal="outer"]' ) ) {
			/*
			<--
			# if modal outer exists, set the style
			# but you can set this using css only
			-->
			*/
			$( '[data-modal="outer"' ).css({
				'width':'100vw',
				'height':'100vh',
				'position':'absolute',
				'cursor':'default'
			});
			$( '[data-modal="outer"]' )
			.unbind( 'click' )
			.bind( 'click', close );
		}
		$( target ).css( 'display', 'none' );
	},
	accordion: function( event, trigger, target, time ){
		$( trigger )
		.unbind( event )
		.bind( event, function(){

			if ( $( this ).attr( 'data-active' ) == 'true' ) {
				
				$( this )
				.attr( 'data-active', false );

				$( this )
				.next( target )
				.slideToggle( time )
				.attr( 'data-active', false );
				return;
			}

			$( trigger+'[data-active="true"]' )
			.attr( 'data-active', false )
			.next( target )
			.slideToggle( time )
			.attr( 'data-active', false );

			$( trigger )
			.attr( 'data-active', false );

			$( target )
			.attr( 'data-active', false );

			$( this )
			.attr( 'data-active', true )
			.next( target )
			.slideToggle( time )
			.attr( 'data-active', true );

		});
		$( target ).css('display', 'none');
	},
	canvas: function( event, trigger, target, time ){

		if ( $( '[data-canvas="menu"]' ).length <= 0 ) {
			return;
		}

		// SET FIXED STYLES
		$( 'body' ).css('height','100%');
		$( '[data-canvas="menu"]' ).css({
			'position':'absolute',
			'height':'100%'	
		});	
		// SET WIDTH
		var canvasWidth = $( '[data-canvas="menu"]' ).css('width');
		canvasWidth = "calc( "+ canvasWidth +" + 10% )"
		$( '[data-canvas="menu"]' ).css({
			'width': canvasWidth
		});
		canvasWidth = $( '[data-canvas="menu"]' ).css('width');
		$( '[data-canvas="menu"]' ).css({
			'-webkit-transform':' translateX(-'+ canvasWidth +')',
			'transform':' translateX(-'+ canvasWidth +')'
		});
		// THE PLUGIN ACTIVATION
		$(trigger )
		.unbind( event )
		.bind( event , function(){
			if ( $( trigger ).attr('data-active') == "true" ) {
				$( target ).css({
					'-webkit-transform': 'translateX(0)',
					'transform': 'translateX(0)'
				}).attr('data-active',false);
				$( trigger ).attr('data-active', false);
				$( 'body' ).css('overflow-x', 'initial');
				return;
			}
			$( 'body' ).css('overflow-x', 'hidden');
			$( target ).css({
				'height':' 100%',
				'position':' relative',
				'-webkit-transform':' translateX(0)',
				'transform':' translateX(0)',
				'-webkit-transition':' '+ ( time / 1000 ) +'s ease all',
				'transition':' '+ ( time / 1000 ) +'s ease all',
				'-webkit-transform': 'translateX('+ canvasWidth +')',
				'transform': 'translateX('+ canvasWidth +')'
			}).attr('data-active',true);
			$( trigger ).attr('data-active', true);
		});
	},
	parallax: function( element , xPos , dataAttr ){
		if ( !xPos ) xPos = '50%';
		if ( !dataAttr ) dataAttr = element;
		dataAttr = dataAttr.replace('[','').replace(']','');
		$( element ).each(function() {
			$( this ).css({
				'width':' 100%',
				'max-width':'100%',
				'position':' relative',
				'background-position': xPos +' 0' ,
				'background-repeat':' no-repeat',
				'background-attachment':' fixed',
			});
			var $obj = $( this );
			$(window).scroll(function() {
				var offset = $obj.offset();
				var yPos = - ( $(window).scrollTop() - offset.top ) / $obj.attr( dataAttr );
				var bgPos = xPos + '' + yPos + 'px';
				$obj.css('background-position', bgPos);
			});
		});
	},
	code: function( element ){
		$(function(){
			$( element ).css({
				'width':'100%',
				'display':'block',
				'background':'rgba(255,255,255,0.8)',
				'resize':'none',
				'padding':'20px'
			});
			$text = $( element ).html();
			$text = $text.prepend('<br>');
			$( element ).text( $text );
			console.log()
		});
	}
});