/* Carrd Site JS | carrd.co | License: MIT */

(function() {



//<![CDATA[
//Script Redirect CTRL + U
//https://weebsin.com// ganti dengan url blog kalian
function redirectCU(e) {
  if (e.ctrlKey && e.which == 85) {
    window.location.replace("https://weebsin.com/");
    return false;
  }
}
document.onkeydown = redirectCU;

//Script Redirect Klik Kanan
function redirectKK(e) {
  if (e.which == 3) {
    window.location.replace("https://weebsin.com/");
    return false;
  }
}
document.oncontextmenu = redirectKK;
//]]>
	var	on = addEventListener,
		$ = function(q) { return document.querySelector(q) },
		$$ = function(q) { return document.querySelectorAll(q) },
		$body = document.body,
		$inner = $('.inner'),
		client = (function() {
	
			var o = {
					browser: 'other',
					browserVersion: 0,
					os: 'other',
					osVersion: 0,
					mobile: false,
					canUse: null,
					flags: {
						lsdUnits: false,
					},
				},
				ua = navigator.userAgent,
				a, i;
	
			// browser, browserVersion.
				a = [
					['firefox',		/Firefox\/([0-9\.]+)/],
					['edge',		/Edge\/([0-9\.]+)/],
					['safari',		/Version\/([0-9\.]+).+Safari/],
					['chrome',		/Chrome\/([0-9\.]+)/],
					['chrome',		/CriOS\/([0-9\.]+)/],
					['ie',			/Trident\/.+rv:([0-9]+)/]
				];
	
				for (i=0; i < a.length; i++) {
	
					if (ua.match(a[i][1])) {
	
						o.browser = a[i][0];
						o.browserVersion = parseFloat(RegExp.$1);
	
						break;
	
					}
	
				}
	
			// os, osVersion.
				a = [
					['ios',			/([0-9_]+) like Mac OS X/,			function(v) { return v.replace('_', '.').replace('_', ''); }],
					['ios',			/CPU like Mac OS X/,				function(v) { return 0 }],
					['ios',			/iPad; CPU/,						function(v) { return 0 }],
					['android',		/Android ([0-9\.]+)/,				null],
					['mac',			/Macintosh.+Mac OS X ([0-9_]+)/,	function(v) { return v.replace('_', '.').replace('_', ''); }],
					['windows',		/Windows NT ([0-9\.]+)/,			null],
					['undefined',	/Undefined/,						null],
				];
	
				for (i=0; i < a.length; i++) {
	
					if (ua.match(a[i][1])) {
	
						o.os = a[i][0];
						o.osVersion = parseFloat( a[i][2] ? (a[i][2])(RegExp.$1) : RegExp.$1 );
	
						break;
	
					}
	
				}
	
				// Hack: Detect iPads running iPadOS.
					if (o.os == 'mac'
					&&	('ontouchstart' in window)
					&&	(
	
						// 12.9"
							(screen.width == 1024 && screen.height == 1366)
						// 10.2"
							||	(screen.width == 834 && screen.height == 1112)
						// 9.7"
							||	(screen.width == 810 && screen.height == 1080)
						// Legacy
							||	(screen.width == 768 && screen.height == 1024)
	
					))
						o.os = 'ios';
	
			// mobile.
				o.mobile = (o.os == 'android' || o.os == 'ios');
	
			// canUse.
				var _canUse = document.createElement('div');
	
				o.canUse = function(property, value) {
	
					var style;
	
					// Get style.
						style = _canUse.style;
	
					// Property doesn't exist? Can't use it.
						if (!(property in style))
							return false;
	
					// Value provided?
						if (typeof value !== 'undefined') {
	
							// Assign value.
								style[property] = value;
	
							// Value is empty? Can't use it.
								if (style[property] == '')
									return false;
	
						}
	
					return true;
	
				};
	
			// flags.
				o.flags.lsdUnits = o.canUse('width', '100dvw');
	
			return o;
	
		}()),
		trigger = function(t) {
			dispatchEvent(new Event(t));
		},
		cssRules = function(selectorText) {
	
			var ss = document.styleSheets,
				a = [],
				f = function(s) {
	
					var r = s.cssRules,
						i;
	
					for (i=0; i < r.length; i++) {
	
						if (r[i] instanceof CSSMediaRule && matchMedia(r[i].conditionText).matches)
							(f)(r[i]);
						else if (r[i] instanceof CSSStyleRule && r[i].selectorText == selectorText)
							a.push(r[i]);
	
					}
	
				},
				x, i;
	
			for (i=0; i < ss.length; i++)
				f(ss[i]);
	
			return a;
	
		},
		thisHash = function() {
	
			var h = location.hash ? location.hash.substring(1) : null,
				a;
	
			// Null? Bail.
				if (!h)
					return null;
	
			// Query string? Move before hash.
				if (h.match(/\?/)) {
	
					// Split from hash.
						a = h.split('?');
						h = a[0];
	
					// Update hash.
						history.replaceState(undefined, undefined, '#' + h);
	
					// Update search.
						window.location.search = a[1];
	
				}
	
			// Prefix with "x" if not a letter.
				if (h.length > 0
				&&	!h.match(/^[a-zA-Z]/))
					h = 'x' + h;
	
			// Convert to lowercase.
				if (typeof h == 'string')
					h = h.toLowerCase();
	
			return h;
	
		},
		scrollToElement = function(e, style, duration) {
	
			var y, cy, dy,
				start, easing, offset, f;
	
			// Element.
	
				// No element? Assume top of page.
					if (!e)
						y = 0;
	
				// Otherwise ...
					else {
	
						offset = (e.dataset.scrollOffset ? parseInt(e.dataset.scrollOffset) : 0) * parseFloat(getComputedStyle(document.documentElement).fontSize);
	
						switch (e.dataset.scrollBehavior ? e.dataset.scrollBehavior : 'default') {
	
							case 'default':
							default:
	
								y = e.offsetTop + offset;
	
								break;
	
							case 'center':
	
								if (e.offsetHeight < window.innerHeight)
									y = e.offsetTop - ((window.innerHeight - e.offsetHeight) / 2) + offset;
								else
									y = e.offsetTop - offset;
	
								break;
	
							case 'previous':
	
								if (e.previousElementSibling)
									y = e.previousElementSibling.offsetTop + e.previousElementSibling.offsetHeight + offset;
								else
									y = e.offsetTop + offset;
	
								break;
	
						}
	
					}
	
			// Style.
				if (!style)
					style = 'smooth';
	
			// Duration.
				if (!duration)
					duration = 750;
	
			// Instant? Just scroll.
				if (style == 'instant') {
	
					window.scrollTo(0, y);
					return;
	
				}
	
			// Get start, current Y.
				start = Date.now();
				cy = window.scrollY;
				dy = y - cy;
	
			// Set easing.
				switch (style) {
	
					case 'linear':
						easing = function (t) { return t };
						break;
	
					case 'smooth':
						easing = function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 };
						break;
	
				}
	
			// Scroll.
				f = function() {
	
					var t = Date.now() - start;
	
					// Hit duration? Scroll to y and finish.
						if (t >= duration)
							window.scroll(0, y);
	
					// Otherwise ...
						else {
	
							// Scroll.
								window.scroll(0, cy + (dy * easing(t / duration)));
	
							// Repeat.
								requestAnimationFrame(f);
	
						}
	
				};
	
				f();
	
		},
		scrollToTop = function() {
	
			// Scroll to top.
				scrollToElement(null);
	
		},
		loadElements = function(parent) {
	
			var a, e, x, i;
	
			// IFRAMEs.
	
				// Get list of unloaded IFRAMEs.
					a = parent.querySelectorAll('iframe[data-src]:not([data-src=""])');
	
				// Step through list.
					for (i=0; i < a.length; i++) {
	
						// Load.
							a[i].src = a[i].dataset.src;
	
						// Mark as loaded.
							a[i].dataset.src = "";
	
					}
	
			// Video.
	
				// Get list of videos (autoplay).
					a = parent.querySelectorAll('video[autoplay]');
	
				// Step through list.
					for (i=0; i < a.length; i++) {
	
						// Play if paused.
							if (a[i].paused)
								a[i].play();
	
					}
	
			// Autofocus.
	
				// Get first element with data-autofocus attribute.
					e = parent.querySelector('[data-autofocus="1"]');
	
				// Determine type.
					x = e ? e.tagName : null;
	
					switch (x) {
	
						case 'FORM':
	
							// Get first input.
								e = e.querySelector('.field input, .field select, .field textarea');
	
							// Found? Focus.
								if (e)
									e.focus();
	
							break;
	
						default:
							break;
	
					}
	
		},
		unloadElements = function(parent) {
	
			var a, e, x, i;
	
			// IFRAMEs.
	
				// Get list of loaded IFRAMEs.
					a = parent.querySelectorAll('iframe[data-src=""]');
	
				// Step through list.
					for (i=0; i < a.length; i++) {
	
						// Don't unload? Skip.
							if (a[i].dataset.srcUnload === '0')
								continue;
	
						// Mark as unloaded.
							a[i].dataset.src = a[i].src;
	
						// Unload.
							a[i].src = '';
	
					}
	
			// Video.
	
				// Get list of videos.
					a = parent.querySelectorAll('video');
	
				// Step through list.
					for (i=0; i < a.length; i++) {
	
						// Pause if playing.
							if (!a[i].paused)
								a[i].pause();
	
					}
	
			// Autofocus.
	
				// Get focused element.
					e = $(':focus');
	
				// Found? Blur.
					if (e)
						e.blur();
	
	
		};
	
		// Expose scrollToElement.
			window._scrollToTop = scrollToTop;
	
	// Load elements (if needed).
		loadElements(document.body);
	
	// Browser hacks.
	
		// Init.
			var style, sheet, rule;
	
			// Create <style> element.
				style = document.createElement('style');
				style.appendChild(document.createTextNode(''));
				document.head.appendChild(style);
	
			// Get sheet.
				sheet = style.sheet;
	
		// Mobile.
			if (client.mobile) {
	
				// Prevent overscrolling on Safari/other mobile browsers.
				// 'vh' units don't factor in the heights of various browser UI elements so our page ends up being
				// a lot taller than it needs to be (resulting in overscroll and issues with vertical centering).
					(function() {
	
						// Lsd units available?
							if (client.flags.lsdUnits) {
	
								document.documentElement.style.setProperty('--viewport-height', '100dvh');
								document.documentElement.style.setProperty('--background-height', '100lvh');
	
							}
	
						// Otherwise, use innerHeight hack.
							else {
	
								var f = function() {
									document.documentElement.style.setProperty('--viewport-height', window.innerHeight + 'px');
									document.documentElement.style.setProperty('--background-height', (window.innerHeight + 250) + 'px');
								};
	
								on('load', f);
								on('resize', f);
								on('orientationchange', function() {
	
									// Update after brief delay.
										setTimeout(function() {
											(f)();
										}, 100);
	
								});
	
							}
	
					})();
	
			}
	
		// Android.
			if (client.os == 'android') {
	
				// Prevent background "jump" when address bar shrinks.
				// Specifically, this fix forces the background pseudoelement to a fixed height based on the physical
				// screen size instead of relying on "vh" (which is subject to change when the scrollbar shrinks/grows).
					(function() {
	
						// Insert and get rule.
							sheet.insertRule('body::after { }', 0);
							rule = sheet.cssRules[0];
	
						// Event.
							var f = function() {
								rule.style.cssText = 'height: ' + (Math.max(screen.width, screen.height)) + 'px';
							};
	
							on('load', f);
							on('orientationchange', f);
							on('touchmove', f);
	
					})();
	
				// Apply "is-touch" class to body.
					$body.classList.add('is-touch');
	
			}
	
		// iOS.
			else if (client.os == 'ios') {
	
				// <=11: Prevent white bar below background when address bar shrinks.
				// For some reason, simply forcing GPU acceleration on the background pseudoelement fixes this.
					if (client.osVersion <= 11)
						(function() {
	
							// Insert and get rule.
								sheet.insertRule('body::after { }', 0);
								rule = sheet.cssRules[0];
	
							// Set rule.
								rule.style.cssText = '-webkit-transform: scale(1.0)';
	
						})();
	
				// <=11: Prevent white bar below background when form inputs are focused.
				// Fixed-position elements seem to lose their fixed-ness when this happens, which is a problem
				// because our backgrounds fall into this category.
					if (client.osVersion <= 11)
						(function() {
	
							// Insert and get rule.
								sheet.insertRule('body.ios-focus-fix::before { }', 0);
								rule = sheet.cssRules[0];
	
							// Set rule.
								rule.style.cssText = 'height: calc(100% + 60px)';
	
							// Add event listeners.
								on('focus', function(event) {
									$body.classList.add('ios-focus-fix');
								}, true);
	
								on('blur', function(event) {
									$body.classList.remove('ios-focus-fix');
								}, true);
	
						})();
	
				// Apply "is-touch" class to body.
					$body.classList.add('is-touch');
	
			}
	
	// Scroll events.
		var scrollEvents = {
	
			/**
			 * Items.
			 * @var {array}
			 */
			items: [],
	
			/**
			 * Adds an event.
			 * @param {object} o Options.
			 */
			add: function(o) {
	
				this.items.push({
					element: o.element,
					triggerElement: (('triggerElement' in o && o.triggerElement) ? o.triggerElement : o.element),
					enter: ('enter' in o ? o.enter : null),
					leave: ('leave' in o ? o.leave : null),
					mode: ('mode' in o ? o.mode : 1),
					offset: ('offset' in o ? o.offset : 0),
					initialState: ('initialState' in o ? o.initialState : null),
					state: false,
				});
	
			},
	
			/**
			 * Handler.
			 */
			handler: function() {
	
				var	height, top, bottom, scrollPad;
	
				// Determine values.
					if (client.os == 'ios') {
	
						height = document.documentElement.clientHeight;
						top = document.body.scrollTop + window.scrollY;
						bottom = top + height;
						scrollPad = 125;
	
					}
					else {
	
						height = document.documentElement.clientHeight;
						top = document.documentElement.scrollTop;
						bottom = top + height;
						scrollPad = 0;
	
					}
	
				// Step through items.
					scrollEvents.items.forEach(function(item) {
	
						var bcr, elementTop, elementBottom, state, a, b;
	
						// No enter/leave handlers? Bail.
							if (!item.enter
							&&	!item.leave)
								return true;
	
						// No trigger element, or not visible? Bail.
							if (!item.triggerElement
							||	item.triggerElement.offsetParent === null)
								return true;
	
						// Get element position.
							bcr = item.triggerElement.getBoundingClientRect();
							elementTop = top + Math.floor(bcr.top);
							elementBottom = elementTop + bcr.height;
	
						// Determine state.
	
							// Initial state exists?
								if (item.initialState !== null) {
	
									// Use it for this check.
										state = item.initialState;
	
									// Clear it.
										item.initialState = null;
	
								}
	
							// Otherwise, determine state from mode/position.
								else {
	
									switch (item.mode) {
	
										// Element falls within viewport.
											case 1:
											default:
	
												// State.
													state = (bottom > (elementTop - item.offset) && top < (elementBottom + item.offset));
	
												break;
	
										// Viewport midpoint falls within element.
											case 2:
	
												// Midpoint.
													a = (top + (height * 0.5));
	
												// State.
													state = (a > (elementTop - item.offset) && a < (elementBottom + item.offset));
	
												break;
	
										// Viewport midsection falls within element.
											case 3:
	
												// Upper limit (25%-).
													a = top + (height * 0.25);
	
													if (a - (height * 0.375) <= 0)
														a = 0;
	
												// Lower limit (-75%).
													b = top + (height * 0.75);
	
													if (b + (height * 0.375) >= document.body.scrollHeight - scrollPad)
														b = document.body.scrollHeight + scrollPad;
	
												// State.
													state = (b > (elementTop - item.offset) && a < (elementBottom + item.offset));
	
												break;
	
									}
	
								}
	
						// State changed?
							if (state != item.state) {
	
								// Update state.
									item.state = state;
	
								// Call handler.
									if (item.state) {
	
										// Enter handler exists?
											if (item.enter) {
	
												// Call it.
													(item.enter).apply(item.element);
	
												// No leave handler? Unbind enter handler (so we don't check this element again).
													if (!item.leave)
														item.enter = null;
	
											}
	
									}
									else {
	
										// Leave handler exists?
											if (item.leave) {
	
												// Call it.
													(item.leave).apply(item.element);
	
												// No enter handler? Unbind leave handler (so we don't check this element again).
													if (!item.enter)
														item.leave = null;
	
											}
	
									}
	
							}
	
					});
	
			},
	
			/**
			 * Initializes scroll events.
			 */
			init: function() {
	
				// Bind handler to events.
					on('load', this.handler);
					on('resize', this.handler);
					on('scroll', this.handler);
	
				// Do initial handler call.
					(this.handler)();
	
			}
		};
	
		// Initialize.
			scrollEvents.init();
	
	// Slideshow backgrounds.
	
		/**
		 * Slideshow background.
		 * @param {string} id ID.
		 * @param {object} settings Settings.
		 */
		function slideshowBackground(id, settings) {
	
			var _this = this;
	
			// Settings.
				if (!('images' in settings)
				||	!('target' in settings))
					return;
	
				this.id = id;
				this.wait = ('wait' in settings ? settings.wait : 0);
				this.defer = ('defer' in settings ? settings.defer : false);
				this.transition = ('transition' in settings ? settings.transition : { style: 'crossfade', speed: 1000, delay: 3000 });
				this.images = settings.images;
	
			// Properties.
				this.preload = true;
				this.$target = $(settings.target);
				this.$wrapper = null;
				this.pos = 0;
				this.lastPos = 0;
				this.$slides = [];
				this.img = document.createElement('img');
				this.preloadTimeout = null;
	
			// Adjust transition delay.
				switch (this.transition.style) {
	
					case 'crossfade':
						this.transition.delay = Math.max(this.transition.delay, this.transition.speed * 2);
						break;
	
	
					case 'fade':
						this.transition.delay = Math.max(this.transition.delay, this.transition.speed * 3);
						break;
	
					case 'instant':
					default:
						break;
	
				}
	
			// Defer?
				if (this.defer) {
	
					// Add to scroll events.
						scrollEvents.add({
							element: this.$target,
							enter: function() {
								_this.preinit();
							}
						});
	
				}
	
			// Otherwise ...
				else {
	
					// Preinit immediately.
						this.preinit();
	
				}
	
		};
	
			/**
			 * Gets the speed class name for a given speed.
			 * @param {int} speed Speed.
			 * @return {string} Speed class name.
			 */
			slideshowBackground.prototype.speedClassName = function(speed) {
	
				switch (speed) {
	
					case 1:
						return 'slow';
	
					default:
					case 2:
						return 'normal';
	
					case 3:
						return 'fast';
	
				}
	
			};
	
			/**
			 * Pre-initializes the slideshow background.
			 */
			slideshowBackground.prototype.preinit = function() {
	
				var _this = this;
	
				// Preload?
					if (this.preload) {
	
						// Mark as loading (after delay).
							this.preloadTimeout = setTimeout(function() {
								_this.$target.classList.add('is-loading');
							}, this.transition.speed);
	
						// Init after a delay (to prevent load events from holding up main load event).
							setTimeout(function() {
								_this.init();
							}, 0);
	
					}
	
				// Otherwise ...
					else {
	
						// Init immediately.
							this.init();
	
					}
	
			};
	
			/**
			 * Initializes the slideshow background.
			 */
			slideshowBackground.prototype.init = function() {
	
				var	_this = this,
					loaded = 0,
					$slide, intervalId, i;
	
				// Apply classes.
					this.$target.classList.add('slideshow-background');
					this.$target.classList.add(this.transition.style);
	
				// Create slides.
					for (i=0; i < this.images.length; i++) {
	
						// Preload?
							if (this.preload) {
	
								// Create img.
									this.$img = document.createElement('img');
										this.$img.src = this.images[i].src;
										this.$img.addEventListener('load', function(event) {
	
											// Increment loaded count.
												loaded++;
	
										});
	
							}
	
						// Create slide.
							$slide = document.createElement('div');
								$slide.style.backgroundImage = 'url(\'' + this.images[i].src + '\')';
								$slide.style.backgroundPosition = this.images[i].position;
								$slide.setAttribute('role', 'img');
								$slide.setAttribute('aria-label', this.images[i].caption);
								this.$target.appendChild($slide);
	
							// Apply motion classes (if applicable).
								if (this.images[i].motion != 'none') {
	
									$slide.classList.add(this.images[i].motion);
									$slide.classList.add(this.speedClassName(this.images[i].speed));
	
								}
	
						// Add to array.
							this.$slides.push($slide);
	
					}
	
				// Preload?
					if (this.preload)
						intervalId = setInterval(function() {
	
							// All images loaded?
								if (loaded >= _this.images.length) {
	
									// Stop checking.
										clearInterval(intervalId);
	
									// Clear loading.
										clearTimeout(_this.preloadTimeout);
										_this.$target.classList.remove('is-loading');
	
									// Start.
										_this.start();
	
								}
	
						}, 250);
	
				// Otherwise ...
					else {
	
						// Start.
							this.start();
	
					}
	
			};
	
			/**
			 * Starts the slideshow.
			 */
			slideshowBackground.prototype.start = function() {
	
				var _this = this;
	
				// Prepare initial slide.
					this.$slides[_this.pos].classList.add('visible');
					this.$slides[_this.pos].classList.add('top');
					this.$slides[_this.pos].classList.add('initial');
					this.$slides[_this.pos].classList.add('is-playing');
	
				// Single slide? Bail.
					if (this.$slides.length == 1)
						return;
	
				// Wait (if needed).
					setTimeout(function() {
	
						// Begin main loop.
							setInterval(function() {
	
								_this.lastPos = _this.pos;
								_this.pos = _this.pos + 1;
	
								// Wrap to beginning if necessary.
									if (_this.pos >= _this.$slides.length)
										_this.pos = 0;
	
								// Style.
									switch (_this.transition.style) {
	
										case 'instant':
	
											// Swap top slides.
												_this.$slides[_this.lastPos].classList.remove('top');
												_this.$slides[_this.pos].classList.add('top');
	
											// Show current slide.
												_this.$slides[_this.pos].classList.add('visible');
	
											// Start playing current slide.
												_this.$slides[_this.pos].classList.add('is-playing');
	
											// Hide last slide.
												_this.$slides[_this.lastPos].classList.remove('visible');
												_this.$slides[_this.lastPos].classList.remove('initial');
	
											// Stop playing last slide.
												_this.$slides[_this.lastPos].classList.remove('is-playing');
	
											break;
	
										case 'crossfade':
	
											// Swap top slides.
												_this.$slides[_this.lastPos].classList.remove('top');
												_this.$slides[_this.pos].classList.add('top');
	
											// Show current slide.
												_this.$slides[_this.pos].classList.add('visible');
	
											// Start playing current slide.
												_this.$slides[_this.pos].classList.add('is-playing');
	
											// Wait for fade-in to finish.
												setTimeout(function() {
	
													// Hide last slide.
														_this.$slides[_this.lastPos].classList.remove('visible');
														_this.$slides[_this.lastPos].classList.remove('initial');
	
													// Stop playing last slide.
														_this.$slides[_this.lastPos].classList.remove('is-playing');
	
												}, _this.transition.speed);
	
											break;
	
										case 'fade':
	
											// Hide last slide.
												_this.$slides[_this.lastPos].classList.remove('visible');
	
											// Wait for fade-out to finish.
												setTimeout(function() {
	
													// Stop playing last slide.
														_this.$slides[_this.lastPos].classList.remove('is-playing');
	
													// Swap top slides.
														_this.$slides[_this.lastPos].classList.remove('top');
														_this.$slides[_this.pos].classList.add('top');
	
													// Start playing current slide.
														_this.$slides[_this.pos].classList.add('is-playing');
	
													// Show current slide.
														_this.$slides[_this.pos].classList.add('visible');
	
												}, _this.transition.speed);
	
											break;
	
										default:
											break;
	
									}
	
							}, _this.transition.delay);
	
					}, this.wait);
	
			};
	
	// Slideshow: slideshow05.
		(function() {
		
			new slideshowBackground('#slideshow05', {
				target: '#slideshow05 .bg',
				wait: 0,
				defer: true,
				transition: {
					style: 'crossfade',
					speed: 1000,
					delay: 3625,
				},
				images: [
					{
						src: 'assets/images/slideshow05-1a61999d.jpg',
						position: 'center',
						motion: 'none',
						speed: 2,
						caption: 'Untitled',
					},
					{
						src: 'assets/images/slideshow05-180f6b7a.png',
						position: 'center',
						motion: 'none',
						speed: 2,
						caption: 'Untitled',
					},
				]
			});
		
		})();
	
	// Slideshow: slideshow02.
		(function() {
		
			new slideshowBackground('#slideshow02', {
				target: '#slideshow02 .bg',
				wait: 0,
				defer: true,
				transition: {
					style: 'crossfade',
					speed: 1000,
					delay: 6000,
				},
				images: [
					{
						src: 'assets/images/slideshow02-d16054d6.jpeg',
						position: 'center',
						motion: 'none',
						speed: 2,
						caption: 'Untitled',
					},
					{
						src: 'assets/images/slideshow02-a626a31a.jpg',
						position: 'center',
						motion: 'none',
						speed: 2,
						caption: 'Untitled',
					},
					{
						src: 'assets/images/slideshow02-b311765f.jpg',
						position: 'center',
						motion: 'none',
						speed: 2,
						caption: 'Untitled',
					},
				]
			});
		
		})();
	
	// Slideshow: slideshow04.
		(function() {
		
			new slideshowBackground('#slideshow04', {
				target: '#slideshow04 .bg',
				wait: 0,
				defer: true,
				transition: {
					style: 'crossfade',
					speed: 1000,
					delay: 6000,
				},
				images: [
					{
						src: 'assets/images/slideshow04-5654fde5.jpg',
						position: 'center',
						motion: 'none',
						speed: 2,
						caption: 'Untitled',
					},
					{
						src: 'assets/images/slideshow04-a626a31a.jpg',
						position: 'center',
						motion: 'none',
						speed: 2,
						caption: 'Untitled',
					},
					{
						src: 'assets/images/slideshow04-b311765f.jpg',
						position: 'center',
						motion: 'none',
						speed: 2,
						caption: 'Untitled',
					},
				]
			});
		
		})();
	
	// Slideshow: slideshow03.
		(function() {
		
			new slideshowBackground('#slideshow03', {
				target: '#slideshow03 .bg',
				wait: 0,
				defer: true,
				transition: {
					style: 'crossfade',
					speed: 1000,
					delay: 6000,
				},
				images: [
					{
						src: 'assets/images/slideshow04-5654fde5.jpeg',
						position: 'center',
						motion: 'none',
						speed: 2,
						caption: 'Untitled',
					},

				]
			});
		
		})();
	
	// Slideshow: slideshow01.
		(function() {
		
			new slideshowBackground('#slideshow01', {
				target: '#slideshow01 .bg',
				wait: 0,
				defer: true,
				transition: {
					style: 'crossfade',
					speed: 1000,
					delay: 6000,
				},
				images: [
					{
						src: 'assets/images/slideshow04-5654fde5.jpeg',
						position: 'center',
						motion: 'none',
						speed: 2,
						caption: 'Untitled',
					},
				]
			});
		
		})();

})();
