$.extend({
	init: function( exec, event, trigger, target, time ){
		//<--
		//it's possible to execute using 'eval' js method
		//exec = "$."+exec;
		//eval( exec )( event, trigger, target );
		//but let's use only jquery 
		//-->
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

			//<--
			//desactivate others when effect comes up
			// $( trigger+'[data-active="true"]' )
			// .attr( "data-active", false )
			// .next( target )
			// .slideToggle( time )
			// .attr( "data-active", false );
			//-->

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
		$( trigger+':nth-child(1) ' ).trigger("click");
	}
});