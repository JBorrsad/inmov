/**
 * Properties - Gestión de propiedades y favoritos
 */

const Properties = (function($) {
	'use strict';
	let favorites = [];
	const STORAGE_KEY = 'iv_favorites';

	function init() {
		loadFavorites();
		initFavorites();
		bindEvents();
	}

	function bindEvents() {
		// Click en botón de favoritos
		$(document).on('click', '.iv-properties__card-favorite', function(e) {
			e.preventDefault();
			e.stopPropagation();
			
			const propertyId = $(this).data('property-id');
			toggleFavorite(propertyId, $(this));
		});
	}

	function initFavorites() {
		// Marcar propiedades que ya están en favoritos
		favorites.forEach(function(propertyId) {
			const $btn = $('[data-property-id="' + propertyId + '"]');
			markAsFavorite($btn);
		});
	}

	function toggleFavorite(propertyId, $button) {
		const index = favorites.indexOf(propertyId);
		
		if (index > -1) {
			// Ya está en favoritos, quitar
			favorites.splice(index, 1);
			unmarkAsFavorite($button);
		} else {
			// No está en favoritos, agregar
			favorites.push(propertyId);
			markAsFavorite($button);
		}
		
		saveFavorites();
	}

	function markAsFavorite($button) {
		$button.addClass('iv-properties__card-favorite--active');
		const $icon = $button.find('.iv-favorite-icon');
		$icon.attr('src', 'Assets/icon_heart_fill.svg');
	}

	function unmarkAsFavorite($button) {
		$button.removeClass('iv-properties__card-favorite--active');
		const $icon = $button.find('.iv-favorite-icon');
		$icon.attr('src', 'Assets/Icon feather-heart-outline.svg');
	}

	function saveFavorites() {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
		} catch (e) {
			console.warn('No se pudieron guardar favoritos:', e);
		}
	}

	function loadFavorites() {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				favorites = JSON.parse(stored);
			}
		} catch (e) {
			console.warn('No se pudieron cargar favoritos:', e);
			favorites = [];
		}
	}

	function applyFilters(filters) {
		const $properties = $('.iv-properties__card');
		const hasFilters = Object.keys(filters).length > 0;
		
		// Si no hay filtros, mostrar todas las propiedades
		if (!hasFilters) {
			$properties.fadeIn(300);
			return;
		}
		
		// Filtrar cada propiedad
		let matchCount = 0;
		
		$properties.each(function() {
			const $card = $(this);
			let matches = true;
			
			// Obtener datos de la tarjeta
			const cardData = {
				estado: $card.data('estado'),
				tipo: $card.data('tipo'),
				poblacion: $card.data('poblacion'),
				zona: $card.data('zona'),
				precio: parseInt($card.data('precio'), 10),
				banos: parseInt($card.data('banos'), 10),
				piscina: $card.data('piscina') === 'true' || $card.data('piscina') === true
			};
			
			// Comprobar filtro de estado
			if (filters.estado && cardData.estado !== filters.estado) {
				matches = false;
			}
			
			// Comprobar filtro de tipo
			if (filters.tipo && cardData.tipo !== filters.tipo) {
				matches = false;
			}
			
			// Comprobar filtro de población
			if (filters.poblacion && cardData.poblacion !== filters.poblacion) {
				matches = false;
			}
			
			// Comprobar filtro de zona
			if (filters.zona && cardData.zona !== filters.zona) {
				matches = false;
			}
			
			// Comprobar precio desde
			if (filters.precioDesde && cardData.precio < filters.precioDesde) {
				matches = false;
			}
			
			// Comprobar precio hasta
			if (filters.precioHasta && cardData.precio > filters.precioHasta) {
				matches = false;
			}
			
			// Comprobar baños (al menos el número especificado)
			if (filters.banos && cardData.banos < filters.banos) {
				matches = false;
			}
			
			// Comprobar piscina
			if (filters.piscina === true && !cardData.piscina) {
				matches = false;
			}
			
			// Mostrar u ocultar según coincida
			if (matches) {
				$card.fadeIn(300);
				matchCount++;
			} else {
				$card.fadeOut(300);
			}
		});
	}

	return {
		init: init,
		applyFilters: applyFilters
	};
})(jQuery);

