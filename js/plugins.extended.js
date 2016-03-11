// Enconding: UTF-8
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
			console.error( "Error trying to execute "+ exec );
			console.error("Error: "+ err);
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
			if ( $( trigger ).hasClass( "active" ) ) {
				$( trigger )
				.toggleClass( "active" )
				.next( target )
				.slideToggle( time )
				.toggleClass( "active" );
				return;
			}
			$( trigger )
			.toggleClass( "active" )
			.next( target )
			.slideToggle( time )
			.toggleClass( "active" );
		});
	},
	slider: function( event, trigger, target, time ){
		$( trigger )
		.unbind( event )
		.bind( event, function(){
				$( target )
				.removeClass( "active" )
				.slideUp( time );

				$( trigger )
				.removeClass( 'active' );
			//$( target+".active").toggleClass( "active" ).slideUp( time ).fadeOut();
			$( target+':nth-child('+ ( $(this).index()+1) +')' )
			.slideDown( time )
			.addClass( 'active' );

			$( this )
			.addClass( 'active' );
		});
		$( trigger+':nth-child(1) ' ).trigger("click");
	}
});