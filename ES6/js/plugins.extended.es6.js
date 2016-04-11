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
	init(){
		const _this = this;
		$( _this.trigger )
		.unbind(  _this.event )
		.bind(  _this.event , function(){			
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
	init(){
		const _this = this;
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
	init(){
		const _this = this;
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
	init(){
		const _this = this;
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
class Modal extends Default{
		//SET THE close function, to bind in elements
		close(){
			$( this.target )
			.fadeOut( this.time );

			$( this.trigger )
			.attr( 'data-active', false );
			$( this.target )
			.attr( 'data-active', false );
		}
		/*
			#other animations properties
				.toggle( time )
				.slideToggle( time )
				.slideDown( time )
				.slideUp( time )
				*/
		//<-----
		//styles
		//set modal panel style
		init(){
			const _this = this;
			$( _this.target ).css({
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
		$( _this.trigger )
		.unbind( _this.event )
		.bind( _this.event, function(){
			$( this )
			.attr( 'data-active', true )
			.nextAll( _this.target )
			.eq(0)
			.fadeIn( _this.time )
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
			.bind( 'click', _this.close );
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
			.bind( 'click', _this.close );
		}
		$( _this.target ).css( 'display', 'none' );
	}
}
// PARALLAX CLASS
class Parallax extends Default{
	constructor( element , xPos , dataAttr ){
		// it's necessary to call constructor of super class to overwrite it
		super();
		this.element = element;
		this.xPos = xPos;
		this.dataAttr = dataAttr;
		// and it's necessary to return the overwritter constructor too
		return this;
	}
	init(){
		const _this = this;
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