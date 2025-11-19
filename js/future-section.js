/**
 * FutureSection - Sección "Elige tu futuro"
 */

const FutureSection = (function($) {
	'use strict';
	let $cards;
	let $section;
	let currentBackground = null;

	function init() {
		cacheDom();
		initCardHover();
	}

	function cacheDom() {
		$cards = $('.iv-future__card');
		$section = $('.iv-future');
	}

	function initCardHover() {
		$cards.on('mouseenter', function() {
			const imageUrl = $(this).data('image');
			
			if (imageUrl) {
				changeBackground(imageUrl);
				setActiveCard($(this));
			}
		});

		$cards.on('click', function() {
			const imageUrl = $(this).data('image');
			
			if (imageUrl) {
				changeBackground(imageUrl);
				setActiveCard($(this));
			}
		});
	}

	function setActiveCard($card) {
		// Quitar clase activa de todas las tarjetas
		$cards.removeClass('iv-future__card--active');
		
		// Añadir clase activa a la tarjeta actual
		$card.addClass('iv-future__card--active');
	}

	function changeBackground(imageUrl) {
		// Solo cambiar si es diferente al fondo actual
		if (currentBackground === imageUrl) {
			return;
		}
		
		currentBackground = imageUrl;
		
		// Crear un div temporal con la nueva imagen
		const $newBg = $('<div class="iv-future__background-temp"></div>');
		$newBg.css({
			'position': 'absolute',
			'top': 0,
			'left': 0,
			'width': '100%',
			'height': '100%',
			'background-image': 'url(' + imageUrl + ')',
			'background-size': 'cover',
			'background-position': 'center',
			'opacity': 0,
			'z-index': 0
		});
		
		$section.append($newBg);
		
		// Fade in de la nueva imagen
		$newBg.animate({ opacity: 0.3 }, 600, function() {
			// Eliminar fondos temporales anteriores
			$('.iv-future__background-temp').not($newBg).remove();
		});
	}

	return {
		init: init
	};
})(jQuery);

