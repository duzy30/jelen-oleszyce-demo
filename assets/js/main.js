/**
 * Jeleń Oleszyce — front-end scripts.
 *
 * @package Jelen_Oleszyce
 */
(function () {
	'use strict';

	document.documentElement.classList.add('jelen-js');

	function initHeroStats(root) {
		var slides = Array.prototype.slice.call(root.querySelectorAll('.jelen-hero-stats__slide'));
		var dots = Array.prototype.slice.call(root.querySelectorAll('.jelen-hero-stats__dot'));
		if (slides.length < 2) {
			return;
		}

		var index = 0;
		var timer = null;
		var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		var intervalMs = 3200;

		function goTo(next) {
			index = (next + slides.length) % slides.length;
			slides.forEach(function (slide, i) {
				var on = i === index;
				slide.classList.toggle('is-active', on);
				slide.setAttribute('aria-hidden', on ? 'false' : 'true');
			});
			dots.forEach(function (dot, i) {
				var on = i === index;
				dot.classList.toggle('is-active', on);
				if (on) {
					dot.setAttribute('aria-current', 'true');
				} else {
					dot.removeAttribute('aria-current');
				}
			});
		}

		function stop() {
			if (timer) {
				window.clearInterval(timer);
				timer = null;
			}
		}

		function start() {
			if (reduced) {
				return;
			}
			stop();
			timer = window.setInterval(function () {
				goTo(index + 1);
			}, intervalMs);
		}

		dots.forEach(function (dot) {
			dot.addEventListener('click', function () {
				var n = parseInt(dot.getAttribute('data-go'), 10);
				if (!isNaN(n)) {
					goTo(n);
					start();
				}
			});
		});

		root.addEventListener('mouseenter', stop);
		root.addEventListener('mouseleave', start);
		root.addEventListener('focusin', stop);
		root.addEventListener('focusout', function (e) {
			if (!root.contains(e.relatedTarget)) {
				start();
			}
		});

		document.addEventListener('visibilitychange', function () {
			if (document.hidden) {
				stop();
			} else {
				start();
			}
		});

		goTo(0);
		start();
	}

	function initMobileNav() {
		var nav = document.querySelector('.jelen-nav.wp-block-navigation');
		if (!nav) {
			return;
		}

		var openBtn = nav.querySelector('.wp-block-navigation__responsive-container-open');
		var closeBtn = nav.querySelector('.wp-block-navigation__responsive-container-close');
		var container = nav.querySelector('.wp-block-navigation__responsive-container');
		var dialog = nav.querySelector('.wp-block-navigation__responsive-dialog');
		if (!openBtn || !container) {
			return;
		}

		function setOpen(open) {
			container.classList.toggle('is-menu-open', open);
			container.classList.toggle('has-modal-open', open);
			document.documentElement.classList.toggle('has-modal-open', open);
			openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
			if (dialog) {
				if (open) {
					dialog.setAttribute('aria-modal', 'true');
					dialog.setAttribute('role', 'dialog');
					dialog.setAttribute('aria-label', 'Menu');
				} else {
					dialog.removeAttribute('aria-modal');
					dialog.removeAttribute('role');
				}
			}
			if (open && closeBtn) {
				closeBtn.focus();
			} else if (!open) {
				openBtn.focus();
			}
		}

		openBtn.addEventListener('click', function (e) {
			e.preventDefault();
			setOpen(true);
		});

		if (closeBtn) {
			closeBtn.addEventListener('click', function (e) {
				e.preventDefault();
				setOpen(false);
			});
		}

		container.addEventListener('click', function (e) {
			if (e.target === container) {
				setOpen(false);
			}
		});

		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape' && container.classList.contains('is-menu-open')) {
				setOpen(false);
			}
		});

		nav.querySelectorAll('.wp-block-navigation__responsive-container-content a').forEach(function (link) {
			link.addEventListener('click', function () {
				if (container.classList.contains('is-menu-open')) {
					setOpen(false);
				}
			});
		});
	}

	function neutralizeHashLinks() {
		document.querySelectorAll('a[href="#"]').forEach(function (a) {
			a.addEventListener('click', function (e) {
				e.preventDefault();
			});
		});
	}

	document.addEventListener('DOMContentLoaded', function () {
		document.querySelectorAll('[data-jelen-stats]').forEach(initHeroStats);
		initMobileNav();
		neutralizeHashLinks();
	});
})();
