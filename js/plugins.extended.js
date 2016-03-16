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


			$( target+':nth-child('+ ( $( this ).index()+1 ) +')' )
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
			/*
			<--
			#other animations properties
				.toggle( time );
				.slideToggle( time );
			-->
			*/
			$( trigger )
			.attr( 'data-active', false );
			$( target )
			.attr( 'data-active', false );
		}
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
			'font-size':'10vw'
		});
		//----->
		$( trigger )
		.unbind( event )
		.bind( event, function(){
			$( target )
			.fadeIn( time );
			/*
			<--
			#other animations properties
				.toggle( time );
				.slideToggle( time );
			-->
			*/
			$( this ).attr( 'data-active', true );
			$( target ).attr( 'data-active', true );
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
				'position':'absolute'
			});
			$( '[data-modal="outer"]' )
			.unbind( 'click' )
			.bind( 'click', close );
		}
		$( target ).css( 'display', 'none' );
	}
});