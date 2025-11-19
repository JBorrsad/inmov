/**
 * HeroSearch - Buscador de propiedades
 */

const HeroSearch = (function($) {
	'use strict';
	const state = {
		estado: null,
		tipo: null,
		poblacion: null,
		zona: null,
		precioDesde: null,
		precioHasta: null,
		banos: null,
		piscina: false
	};

	// Cache DOM
	let $form;
	let $advanced;

	function init() {
		cacheDom();
		bindEvents();
	}

	function cacheDom() {
		$form = $('#iv-search-form');
		$advanced = $('#iv-search-advanced');
	}

	function bindEvents() {
		// Abrir/cerrar dropdowns
		$(document).on('click', '.iv-search__select', onSelectClick);
		$(document).on('click', '.iv-search__option', onOptionClick);
		$(document).on('click', onDocumentClickOutside);

		// Búsqueda avanzada
		$('.iv-search__btn--advanced').on('click', onAdvancedToggle);

		// Botones de acción
		$('.iv-search__btn--clear').on('click', onClearClick);
		$('.iv-search__btn--submit').on('click', onSubmitClick);
	}

	function onSelectClick(e) {
		e.preventDefault();
		e.stopPropagation();
		const field = $(this).data('field');
		toggleDropdown(field);
	}

	function onOptionClick(e) {
		e.preventDefault();
		e.stopPropagation();
		const $option = $(this);
		const field = $option.closest('.iv-search__field').data('field');
		const value = $option.data('value');
		const label = $option.text().trim();
		selectOption(field, value, label);
		closeAllDropdowns();
	}

	function onDocumentClickOutside(e) {
		const $target = $(e.target);
		if (!$target.closest('.iv-search__field').length) {
			closeAllDropdowns();
		}
	}

	function onAdvancedToggle(e) {
		e.preventDefault();
		$advanced.stop(true, true).slideToggle(300);
		$advanced.toggleClass('iv-search__advanced--open');
	}

	function onClearClick(e) {
		e.preventDefault();
		resetFilters();
		
		// Llamar a Properties para limpiar filtros
		if (typeof Properties !== 'undefined' && Properties.applyFilters) {
			Properties.applyFilters({});
		}
	}

	function onSubmitClick(e) {
		e.preventDefault();
		const filters = getFilters();
		
		// Llamar a Properties para aplicar filtros
		if (typeof Properties !== 'undefined' && Properties.applyFilters) {
			Properties.applyFilters(filters);
		}
		
		// Scroll a resultados
		scrollToResults();
	}

	function toggleDropdown(field) {
		const $dropdown = $('.iv-search__dropdown[data-field="' + field + '"]');
		const $field = $('.iv-search__field[data-field="' + field + '"]');
		
		if ($dropdown.is(':visible')) {
			// Cerrar este dropdown
			$dropdown.slideUp(200);
			$field.removeClass('iv-search__field--open');
		} else {
			// Cerrar todos los demás primero
			closeAllDropdowns();
			
			// Abrir este dropdown
			$dropdown.slideDown(200);
			$field.addClass('iv-search__field--open');
		}
	}

	function closeAllDropdowns() {
		$('.iv-search__dropdown').slideUp(200);
		$('.iv-search__field').removeClass('iv-search__field--open');
	}

	function selectOption(field, value, label) {
		// Actualizar estado interno
		state[field] = value || null;
		
		// Actualizar UI
		const $field = $('.iv-search__field[data-field="' + field + '"]');
		$field.find('.iv-search__select-label').text(label);
	}

	function resetFilters() {
		// Reset estado interno
		state.estado = null;
		state.tipo = null;
		state.poblacion = null;
		state.zona = null;
		state.precioDesde = null;
		state.precioHasta = null;
		state.banos = null;
		state.piscina = false;

		// Reset UI - labels de dropdowns con sus valores por defecto
		const defaultLabels = {
			'estado': 'Estado',
			'tipo': 'Tipo',
			'poblacion': 'Población',
			'zona': 'Zona'
		};

		$('.iv-search__field').each(function() {
			const field = $(this).data('field');
			const $label = $(this).find('.iv-search__select-label');
			
			if (defaultLabels[field]) {
				$label.text(defaultLabels[field]);
			}
		});

		// Reset inputs numéricos y checkbox
		$form.find('input[type="number"]').val('');
		$form.find('input[type="checkbox"]').prop('checked', false);
	}

	function scrollToResults() {
		const $target = $('#iv-featured');
		if ($target.length) {
			$('html, body').animate({
				scrollTop: $target.offset().top - 120
			}, 600, 'swing');
		}
	}

	function getFilters() {
		const filters = {};

		// Filtros de dropdowns
		if (state.estado) filters.estado = state.estado;
		if (state.tipo) filters.tipo = state.tipo;
		if (state.poblacion) filters.poblacion = state.poblacion;
		if (state.zona) filters.zona = state.zona;

		// Filtros de campos avanzados
		const precioDesde = parseInt($form.find('[name="precio_desde"]').val(), 10);
		const precioHasta = parseInt($form.find('[name="precio_hasta"]').val(), 10);
		const banos = parseInt($form.find('[name="banos"]').val(), 10);
		const piscina = $form.find('[name="piscina"]').is(':checked');

		if (!isNaN(precioDesde) && precioDesde > 0) filters.precioDesde = precioDesde;
		if (!isNaN(precioHasta) && precioHasta > 0) filters.precioHasta = precioHasta;
		if (!isNaN(banos) && banos > 0) filters.banos = banos;
		if (piscina) filters.piscina = true;

		return filters;
	}

	return {
		init: init,
		getFilters: getFilters
	};
})(jQuery);
