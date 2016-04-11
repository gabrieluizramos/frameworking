'use strict';
class Default{
	constructor( event, trigger, target, time ){
		this.event = event;
		this.trigger = trigger;
		this.target = target;
		this.time = time;
	}
	get instance(){
		return this;
	}
}
// DROPDOWN CLASS
class Dropdown extends Default{
	constructor( event, trigger, target, time ){
		super( event, trigger, target, time )
	}
	init(){
		var _this = this;
		$(  _this.trigger )
		.unbind(  _this.event )
		.bind(  _this.event, function(){			
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
			 	.next(  _this.target )
			 	.slideToggle(  _this.time )
			 	.attr( "data-active", false );
			 	return;
			 }


			 $( this )
			 .attr( "data-active", true )
			 .next(  _this.target )
			 .slideToggle(  _this.time )
			 .attr( "data-active",  true );

			});
	}
}
// SLIDER CLASS
class Slider extends Default{
	constructor( event, trigger, target, time ){
		super( event, trigger, target, time )
	}
	init(){
		var _this = this;
		$( _this.trigger )
		.unbind( _this.event )
		.bind( _this.event, function(){

			$( _this.target )
			.attr( "data-active", false)
			.slideUp( _this.time );

			$( _this.trigger )
			.attr( "data-active", false );


			$( _this.target+':nth-child('+ ( $( this ).index() + 1) +')' )
			.slideDown( _this.time )
			.attr( "data-active", true );

			$( this )
			.attr( "data-active", true );

		});
		$( _this.trigger+':nth-child(1) ' ).trigger( "click" );
	}
}
// TABS CLASS
class Tabs extends Default{
	constructor( event, trigger, target, time ){
		super( event, trigger, target, time )
	}
	init(){
		var _this = this;
		$( _this.trigger )
		.unbind( _this.event )
		.bind( _this.event, function(){

			$( _this.target )
			.attr( 'data-active', false )
			.css( 'display', 'none' );

			$( _this.trigger )
			.attr( 'data-active', false );

			$( _this.target+':nth-of-type('+ ( $( this ).index() + 1 ) +')' )
			.toggle( _this.time )
			.attr( 'data-active', true );

			$( this )
			.attr( 'data-active', true );

		});
		$( _this.trigger+':nth-child(1)' ).trigger( 'click' );
	}
}
// ACCORDION CLASS
class Accordion extends Default{
	constructor( event, trigger, target, time ){
		super( event, trigger, target, time )
	}
	init(){
		var _this = this;
		$( _this.trigger )
		.unbind( _this.event )
		.bind( _this.event, function(){

			if ( $( this ).attr( 'data-active' ) == 'true' ) {
				
				$( this )
				.attr( 'data-active', false );

				$( this )
				.next( _this.target )
				.slideToggle( _this.time )
				.attr( 'data-active', false );
				return;
			}

			$( _this.trigger+'[data-active="true"]' )
			.attr( 'data-active', false )
			.next( _this.target )
			.slideToggle( _this.time )
			.attr( 'data-active', false );

			$( _this.trigger )
			.attr( 'data-active', false );

			$( _this.target )
			.attr( 'data-active', false );

			$( this )
			.attr( 'data-active', true )
			.next( _this.target )
			.slideToggle( _this.time )
			.attr( 'data-active', true );

		});
		$( _this.target ).css('display', 'none');
	}
}
// MODAL CLASS
// PARALLAX CLASS
class Parallax{
	constructor( element , xPos , dataAttr ){
		this.element = element;
		this.xPos = xPos;
		this.dataAttr = dataAttr;
	}
	init(){
		var _this = this;
		if ( !_this.xPos ) _this.xPos = '50%';
		if ( !_this.dataAttr ) _this.dataAttr = _this.element;
		_this.dataAttr = _this.dataAttr.replace('[','').replace(']','');
		$( _this.element ).each(function() {
			$( this ).css({
				'width':' 100%',
				'max-width':'100%',
				'position':' relative',
				'background-position': _this.xPos +' 0' ,
				'background-repeat':' no-repeat',
				'background-attachment':' fixed',
			});
			var $obj = $( this );
			$( window ).scroll(function() {
				var offset = $obj.offset();
				var yPos = - ( $(window).scrollTop() - offset.top ) / $obj.attr( _this.dataAttr );
				var bgPos = _this.xPos + '' + yPos + 'px';
				$obj.css('background-position', bgPos);
			});
		});
	}
}