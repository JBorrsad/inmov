/**
 * ContactForm - Validación de contacto
 */

const ContactForm = (function($) {
	'use strict';
	let checkbox;
	let submitBtn;

	function init() {
		checkbox = $('#privacy-checkbox');
		submitBtn = $('#contact-submit');
		
		if (checkbox.length && submitBtn.length) {
			initCheckboxValidation();
		}
	}

	function initCheckboxValidation() {
		checkbox.on('change', function() {
			toggleSubmitButton();
		});
		
		submitBtn.on('click', function(e) {
			if (!checkbox.prop('checked')) {
				e.preventDefault();
				alert('Debes aceptar la política de privacidad para continuar.');
			} else {
				alert('Formulario enviado correctamente. Gracias por contactar con nosotros.');
			}
		});
	}

	function toggleSubmitButton() {
		if (checkbox.prop('checked')) {
			submitBtn.prop('disabled', false);
			submitBtn.css('opacity', '1');
		} else {
			submitBtn.prop('disabled', true);
			submitBtn.css('opacity', '0.5');
		}
	}

	return {
		init: init
	};
})(jQuery);

