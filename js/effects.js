/**
 * Effects - Animaciones y efectos visuales
 */

const Effects = (function($) {
	'use strict';
	let animatedElements = [];

	function init() {
		initScrollArrow();
		initScrollAnimations();
	}

	function initScrollArrow() {
		$('#iv-scroll-arrow').on('click', function(e) {
			e.preventDefault();
			
			// Scroll hacia la sección de futuro (primera sección después del hero)
			const $target = $('#iv-future');
			
			if ($target.length) {
				$('html, body').animate({
					scrollTop: $target.offset().top - 100
				}, 900, 'swing');
			}
		});
	}

	function initScrollAnimations() {
		// Seleccionar elementos que queremos animar
		const $elements = $('.iv-future, .iv-featured-property, .iv-properties, .iv-welcome, .iv-news');
		
		// Función para comprobar y animar elementos visibles
		function checkAndAnimate() {
			$elements.each(function() {
				const $el = $(this);
				
				// Si ya fue animado, saltar
				if (animatedElements.indexOf(this) !== -1) {
					return;
				}
				
				// Si está en viewport, animar
				if (isElementInViewport(this)) {
					// Añadir clases de Animate.css 4
					$el.addClass('animate__animated animate__fadeInUp');
					
					// Marcar como animado
					animatedElements.push(this);
				}
			});
		}
		
		// Ejecutar al hacer scroll
		$(window).on('scroll', checkAndAnimate);
		
		// Ejecutar al cargar
		checkAndAnimate();
	}

	function isElementInViewport(el) {
		const rect = el.getBoundingClientRect();
		const windowHeight = window.innerHeight || document.documentElement.clientHeight;
		
		return (
			rect.top <= windowHeight * 0.85 &&
			rect.bottom >= 0
		);
	}

	return {
		init: init
	};
})(jQuery);

