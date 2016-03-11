$.extend({
	init: function(exec, event, trigger, target, time){
		//<--
		//it's possible to execute using 'eval' js method
		//exec = "$."+exec;
		//eval( exec )( event, trigger, target );
		//but let's use only jquery 
		//-->
		$[ exec ]( event , trigger , target , time);
	},
	dropdown: function( event, trigger, target, time ){
		$( trigger )
		.unbind( event )
		.bind( event, function(){
			if ($(trigger).hasClass("active")) {
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
	}
});