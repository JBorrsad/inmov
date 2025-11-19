/**
 * Navigation - Gestión del menú y navegación
 */

const Navigation = (function($) {
	'use strict';
	let header;
	let mobileMenu;
	let menuToggle;
	let menuClose;
	let menuOverlay;
	let body;

	function init() {
		cacheDom();
		bindEvents();
		initStickyHeader();
		initSmoothScroll();
	}

	function cacheDom() {
		header = $('.iv-header');
		mobileMenu = $('#iv-mobile-menu');
		menuToggle = $('#iv-menu-toggle');
		menuClose = $('#iv-menu-close');
		menuOverlay = $('.iv-header__mobile-overlay');
		body = $('body');
	}

	function bindEvents() {
		menuToggle.on('click', openMobileMenu);
		menuClose.on('click', closeMobileMenu);
		menuOverlay.on('click', closeMobileMenu);
		
		// Cerrar menú al hacer click en un enlace
		$('.iv-header__mobile-list a').on('click', function() {
			closeMobileMenu();
		});
	}

	function openMobileMenu() {
		mobileMenu.addClass('iv-header__mobile-menu--open');
		body.addClass('iv-body--menu-open');
	}

	function closeMobileMenu() {
		mobileMenu.removeClass('iv-header__mobile-menu--open');
		body.removeClass('iv-body--menu-open');
	}

	function initStickyHeader() {
		$(window).on('scroll', function() {
			if ($(window).scrollTop() > 100) {
				header.addClass('iv-header--scrolled');
			} else {
				header.removeClass('iv-header--scrolled');
			}
		});
	}

	function initSmoothScroll() {
		$('a[href^="#"]').on('click', function(e) {
			let target = $(this).attr('href');
			
			if (target === '#' || target === '') {
				return;
			}
			
			let $target = $(target);
			
			if ($target.length) {
				e.preventDefault();
				
				$('html, body').animate({
					scrollTop: $target.offset().top - 100
				}, 800, 'swing');
			}
		});
	}

	return {
		init: init
	};
})(jQuery);

