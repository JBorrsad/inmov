/**
 * App - Inicialización de la aplicación
 */

const App = (function($) {
	'use strict';

	function init() {
		Navigation.init();
		HeroSearch.init();
		FutureSection.init();
		Properties.init();
		ContactForm.init();
		Effects.init();
	}

	return {
		init: init
	};
})(jQuery);

// Iniciar aplicación cuando el DOM esté listo
$(document).ready(function() {
	App.init();
});

