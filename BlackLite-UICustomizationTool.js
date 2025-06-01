(function () {
	// =============================================
	// BlackLite UI Customization Tool
	// Copyrights Peter Hauer
	// under GPL-3.0 license
	// see https://github.com/PeterPeet/BlackLite-Tools
	// =============================================
	'use strict';
	console.log('Loading Theme Editor');

	// =============================================
	// GLOBAL CONFIGURATION AND UTILITIES
	// =============================================
	let BLTOOLdynamicDefaultThemeCSS = '';

	const BLTOOLspecificstyles = `
		.BLTOOL-body {
		margin: 0;
		padding: 20px;
		font-family: Arial, sans-serif;
		background-color: #f0f0f0;
		}
		.BLTOOL-sample-content {
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
		background-color: white;
		border-radius: 8px;
		box-shadow: 0 2px 5px rgb(51, 51, 51);
		}
		.BLTOOL-h1 {
		color: #333;
		}
		.BLTOOL-button {
		padding: 6px 12px;
		font-size: 14px;
		border: none;
		border-radius: 4px;
		background-color:rgb(51, 122, 183);
		color: white;
		cursor: pointer;
		margin: 2px 0;
		transition: background-color 0.3s ease;
		white-space: nowrap;
		}
		.BLTOOL-button:hover {
		opacity: 0.9;
		}
        .BLTOOL-blacklite-tools {
            position: fixed !important;
            top: 0 !important;
            right: 0 !important;
            left: auto !important;
            width: 350px !important;
            height: 100vh !important;
            max-height: 100vh !important;
            background-color: rgb(51, 51, 51) !important;
            color: white !important;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1) !important;
            z-index: 99999 !important;
            padding: 10px !important;
            font-family: sans-serif !important;
            overflow: visible !important;
            display: flex !important;
            flex-direction: column !important;
            resize: none !important;
            min-width: 300px !important;
            transform: translateX(0);
            transition: transform 0.3s ease;
        }
        .BLTOOL-blacklite-tools.collapsed {
            transform: translateX(100%);
        }
		.BLTOOL-blacklite-tools .BLTOOL-header {
            cursor: default !important;
			padding: 5px 10px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: rgb(38, 38, 38);
			border-radius: 5px;
			margin-bottom: 10px;
		}
		.BLTOOL-blacklite-tools .BLTOOL-header h3 {
			margin: 0;
			font-size: 18px;
		}
		.BLTOOL-blacklite-tools .BLTOOL-header .BLTOOL-collapse-toggle {
			cursor: pointer;
			font-size: 14px;
			padding: 5px;
			transition: transform 0.3s ease;
		}
		.BLTOOL-blacklite-tools.collapsed .BLTOOL-content {
			display: none;
		}
		.BLTOOL-blacklite-tools.collapsed .BLTOOL-header .BLTOOL-collapse-toggle {
        	transform: rotate(180deg);
    	}
		.BLTOOL-tab-button {
			flex: 1;
			text-align: center;
			padding: 5px;
			cursor: pointer;
			background-color:rgb(38, 38, 38);;
			border: none;
		}
		.BLTOOL-tab-button.BLTOOL-active-tab {
			background-color: #337ab7;
		}
		.BLTOOL-content-wrapper {
			flex: 1;
			display: flex;
			flex-direction: column;
			min-height: 0;
		}
		.BLTOOL-scroll-container {
			overflow-y: auto !important;
			width: 100% !important;
			box-sizing: border-box !important;
			flex-grow: 1 !important;
			padding-bottom: 10px !important;
			margin-bottom: 10px !important;
		}
		.BLTOOL-section {
			margin-bottom: 10px;
			border-bottom: 1px solid #444 !important; ;
			border-radius: 5px;
			overflow: hidden;
		}
		.BLTOOL-section-header {
			padding: 8px 10px;
			background-color: rgb(38, 38, 38) !important;
			border-left: none !important;
			cursor: pointer;
			display: flex;
			justify-content: space-between;
			align-items: center;
            user-select: none;
		}
        .BLTOOL-section-header span:last-child {
            margin-left: 10px;
        }
		.BLTOOL-section-content {
			padding: 10px;
			background-color: rgb(64, 64, 64);
            transition: all 0.3s ease;
            overflow: hidden;
            will-change: height;
		}
		.BLTOOL-section.collapsed .BLTOOL-section-content {
			display: none;
			border-bottom: 1px solid #444 !important;
		}
        .BLTOOL-toggle-handle {
            position: absolute !important;
            left: -20px !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            width: 20px !important;
            height: 50px !important;
            background-color: rgb(38, 38, 38) !important;
            border-radius: 5px 0 0 5px !important;
            cursor: pointer !important;
            z-index: 1 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 0 !important;
            margin: 0 !important;
            border: none !important;
            color: white !important;
            font-size: 14px !important;
            pointer-events: auto !important;
            transition: all 0.3s ease !important;
            box-shadow: -2px 0 5px rgba(0,0,0,0.2); 
        }
        /* Arrow styles */
        .BLTOOL-toggle-handle::after {
            content: "◀";
            position: relative;
            transition: all 0.2s ease;
        }

        .BLTOOL-blacklite-tools.collapsed .BLTOOL-toggle-handle::after {
            content: "▶";
            left: 1px;
        }

        .BLTOOL-blacklite-tools:not(.collapsed) .BLTOOL-toggle-handle::after {
            content: "◀";
            left: -1px;
        }
        @media (max-width: 768px) {
            .BLTOOL-blacklite-tools {
                left: auto !important;
                right: 0px !important;
                border-left: 0px solid #333 !important;
            }
			.BLTOOL-tab-button {
				flex: 1 1 33%;
				font-size: 12px;
				padding: 3px;
			}
			.BLTOOL-scroll-container {
				padding-bottom: 15px !important;
			}
		}
	`;

	const CONFIG = {
        BLTOOL_VERSION: ['v3.2'],
		MOBILE_BREAKPOINT: 768,
        PRESERVED_STYLES: [
            /* Layout & Box Model */
            'align-content', 'align-items', 'align-self', 'all', 'aspect-ratio', 'block-size', 'box-sizing', 'clear', 
            'columns', 'column-count', 'column-fill', 'column-gap', 'column-rule', 'column-span', 'column-width',
            'contain', 'contain-intrinsic-size', 'display', 'flex', 'flex-basis', 'flex-direction', 'flex-flow', 
            'flex-grow', 'flex-shrink', 'flex-wrap', 'float', 'flow', 'gap', 'grid', 'grid-area', 'grid-auto-columns',
            'grid-auto-flow', 'grid-auto-rows', 'grid-column', 'grid-column-end', 'grid-column-start', 'grid-row', 
            'grid-row-end', 'grid-row-start', 'grid-template', 'grid-template-areas', 'grid-template-columns', 
            'grid-template-rows', 'height', 'inline-size', 'isolation', 'justify-content', 'justify-items', 
            'justify-self', 'line-height', 'margin', 'margin-block', 'margin-block-end', 'margin-block-start', 
            'margin-bottom', 'margin-inline', 'margin-inline-end', 'margin-inline-start', 'margin-left', 'margin-right', 
            'margin-top', 'max-block-size', 'max-height', 'max-inline-size', 'max-width', 'min-block-size', 'min-height', 
            'min-inline-size', 'min-width', 'mix-blend-mode', 'object-fit', 'object-position', 'order', 'overflow', 
            'overflow-wrap', 'overflow-x', 'overflow-y', 'overscroll-behavior', 'padding', 'padding-block', 
            'padding-block-end', 'padding-block-start', 'padding-bottom', 'padding-inline', 'padding-inline-end', 
            'padding-inline-start', 'padding-left', 'padding-right', 'padding-top', 'place-content', 'place-items', 
            'place-self', 'position', 'resize', 'row-gap', 'scroll-behavior', 'scroll-margin', 'scroll-padding', 
            'scroll-snap-align', 'scroll-snap-stop', 'scroll-snap-type', 'shape-image-threshold', 'shape-margin', 
            'shape-outside', 'size', 'text-size-adjust', 'vertical-align', 'visibility', 'width', 'will-change', 
            'wrap-after', 'wrap-before', 'wrap-flow', 'wrap-inside', 'wrap-through', 'z-index', 'zoom',
            
            /* Typography & Text */
            'direction', 'font', 'font-family', 'font-feature-settings', 'font-kerning', 'font-language-override', 
            'font-optical-sizing', 'font-palette', 'font-size', 'font-size-adjust', 'font-smooth', 'font-stretch', 
            'font-style', 'font-synthesis', 'font-variant', 'font-variant-alternates', 'font-variant-caps', 
            'font-variant-east-asian', 'font-variant-ligatures', 'font-variant-numeric', 'font-variant-position', 
            'font-weight', 'hanging-punctuation', 'hyphenate-character', 'hyphenate-limit-chars', 'hyphenate-limit-last', 
            'hyphenate-limit-lines', 'hyphenate-limit-zone', 'hyphens', 'letter-spacing', 'line-break', 'orphans', 
            'quotes', 'ruby-align', 'ruby-merge', 'ruby-position', 'tab-size', 'text-align', 'text-align-last', 
            'text-combine-upright', 'text-decoration', 'text-decoration-color', 'text-decoration-line', 
            'text-decoration-skip', 'text-decoration-skip-ink', 'text-decoration-style', 'text-decoration-thickness', 
            'text-emphasis', 'text-emphasis-color', 'text-emphasis-position', 'text-emphasis-style', 'text-indent', 
            'text-justify', 'text-orientation', 'text-overflow', 'text-rendering', 'text-shadow', 'text-transform', 
            'text-underline-offset', 'text-underline-position', 'transform-text', 'white-space', 'word-break', 
            'word-spacing', 'word-wrap', 'writing-mode',
            
            /* Visual Effects */
            'accent-color', 'backdrop-filter', 'background', 'background-attachment', 'background-blend-mode', 
            'background-clip', 'background-color', 'background-image', 'background-origin', 'background-position', 
            'background-position-x', 'background-position-y', 'background-repeat', 'background-size', 'border', 
            'border-block', 'border-block-color', 'border-block-end', 'border-block-end-color', 'border-block-end-style', 
            'border-block-end-width', 'border-block-start', 'border-block-start-color', 'border-block-start-style', 
            'border-block-start-width', 'border-block-style', 'border-block-width', 'border-bottom', 'border-bottom-color', 
            'border-bottom-left-radius', 'border-bottom-right-radius', 'border-bottom-style', 'border-bottom-width', 
            'border-collapse', 'border-color', 'border-end-end-radius', 'border-end-start-radius', 'border-image', 
            'border-image-outset', 'border-image-repeat', 'border-image-slice', 'border-image-source', 'border-image-width', 
            'border-inline', 'border-inline-color', 'border-inline-end', 'border-inline-end-color', 'border-inline-end-style', 
            'border-inline-end-width', 'border-inline-start', 'border-inline-start-color', 'border-inline-start-style', 
            'border-inline-start-width', 'border-inline-style', 'border-inline-width', 'border-left', 'border-left-color', 
            'border-left-style', 'border-left-width', 'border-radius', 'border-right', 'border-right-color', 
            'border-right-style', 'border-right-width', 'border-spacing', 'border-start-end-radius', 
            'border-start-start-radius', 'border-style', 'border-top', 'border-top-color', 'border-top-left-radius', 
            'border-top-right-radius', 'border-top-style', 'border-top-width', 'border-width', 'bottom', 'box-decoration-break', 
            'box-shadow', 'caption-side', 'caret-color', 'clip', 'clip-path', 'color', 'color-scheme', 'content', 
            'counter-increment', 'counter-reset', 'counter-set', 'cursor', 'empty-cells', 'filter', 'forced-color-adjust', 
            'image-orientation', 'image-rendering', 'image-resolution', 'inset', 'inset-block', 'inset-block-end', 
            'inset-block-start', 'inset-inline', 'inset-inline-end', 'inset-inline-start', 'left', 'list-style', 
            'list-style-image', 'list-style-position', 'list-style-type', 'mask', 'mask-border', 'mask-border-mode', 
            'mask-border-outset', 'mask-border-repeat', 'mask-border-slice', 'mask-border-source', 'mask-border-width', 
            'mask-clip', 'mask-composite', 'mask-image', 'mask-mode', 'mask-origin', 'mask-position', 'mask-repeat', 
            'mask-size', 'mask-type', 'offset', 'offset-anchor', 'offset-distance', 'offset-path', 'offset-position', 
            'offset-rotate', 'opacity', 'outline', 'outline-color', 'outline-offset', 'outline-style', 'outline-width', 
            'overflow-anchor', 'overflow-clip-margin', 'paint-order', 'perspective', 'perspective-origin', 'pointer-events', 
            'right', 'rotate', 'scale', 'scrollbar-color', 'scrollbar-gutter', 'scrollbar-width', 'stroke', 'stroke-dasharray', 
            'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke-width', 
            'top', 'transform', 'transform-box', 'transform-origin', 'transform-style', 'transition', 'transition-delay', 
            'transition-duration', 'transition-property', 'transition-timing-function', 'translate', 'unicode-bidi', 
            'user-select', 'vector-effect', 'view-transition-name', 
            
            /* Animation & Interactivity */
            'animation', 'animation-composition', 'animation-delay', 'animation-direction', 'animation-duration', 
            'animation-fill-mode', 'animation-iteration-count', 'animation-name', 'animation-play-state', 
            'animation-timeline', 'animation-timing-function', 'appearance', 'bookmark-label', 'bookmark-level', 
            'bookmark-state', 'break-after', 'break-before', 'break-inside', 'clip-rule', 'color-interpolation', 
            'color-interpolation-filters', 'color-rendering', 'dominant-baseline', 'fill', 'fill-opacity', 'fill-rule', 
            'flood-color', 'flood-opacity', 'lighting-color', 'marker-end', 'marker-mid', 'marker-start', 'nav-down', 
            'nav-left', 'nav-right', 'nav-up', 'order', 'page', 'pause', 'pause-after', 'pause-before', 'pitch', 
            'pitch-range', 'play-during', 'richness', 'speak', 'speak-header', 'speak-numeral', 'speak-punctuation', 
            'speech-rate', 'stress', 'text-anchor', 'voice-family', 'volume', 'writing-mode'
        ],
        UNSUITABLE_FOR_BACKGROUND: new Set([
            /* Void elements */
            'area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 
            'source', 'track', 'wbr',
            
            /* Elements with intrinsic rendering */
            'canvas', 'iframe', 'object', 'picture', 'script', 'style', 'svg', 'video',
            
            /* Form elements with OS-level rendering */
            'button', 'datalist', 'meter', 'optgroup', 'option', 'output', 'progress', 'select', 'textarea',
            
            /* Special content elements */
            'code', 'kbd', 'samp', 'pre', 'var', 'math', 'map',
            
            /* Text-level semantics */
            'a', 'abbr', 'b', 'bdi', 'bdo', 'cite', 'data', 'dfn', 'em', 'i', 'label', 'mark', 'q', 'rp', 'rt', 
            'ruby', 's', 'small', 'span', 'strong', 'sub', 'sup', 'time', 'u'
        ]),
        EXCLUDED_SELECTORS: [
            /* Document structure */
            'html', 'head', 'body', ':root',
            
            /* Pseudo-elements */
            '::after', '::before', '::first-letter', '::first-line', '::selection', '::backdrop', '::placeholder', 
            '::marker', '::spelling-error', '::grammar-error',
            
            /* Shadow DOM */
            '::part', '::slotted',
            
            /* Special state selectors */
            ':fullscreen', ':modal', ':target', ':defined'
        ],
        EXCLUDED_ELEMENTS: [
            /* Non-visual elements */
            'base', 'link', 'meta', 'script', 'style', 'template', 'title',
            
            /* Accessibility/semantic elements */
            'noscript', 'slot',
            
            /* Legacy/obsolete elements */
            'applet', 'basefont', 'bgsound', 'blink', 'frame', 'frameset', 'isindex', 'keygen', 'menuitem', 
            'multicol', 'nextid', 'noembed', 'noframes', 'plaintext', 'shadow', 'spacer',

            /* the theme tool itself */
            'blacklite-tools'
        ],
		BACKGROUND_FILTERS: {
			opacity: { min: 0, max: 1, step: 0.01, default: 1, unit: '' },
			blur: { min: 0, max: 20, step: 0.1, default: 0, unit: 'px' },
			brightness: { min: 0, max: 2, step: 0.05, default: 1, unit: '' },
			contrast: { min: 0, max: 2, step: 0.05, default: 1, unit: '' },
			grayscale: { min: 0, max: 1, step: 0.01, default: 0, unit: '' },
			'hue-rotate': { min: 0, max: 360, step: 1, default: 0, unit: 'deg' },
			invert: { min: 0, max: 1, step: 0.01, default: 0, unit: '' },
			saturate: { min: 0, max: 2, step: 0.05, default: 1, unit: '' },
			sepia: { min: 0, max: 1, step: 0.01, default: 0, unit: '' }
		}
	};

    const SELECTOR_REPLACEMENTS = {
        // Escape like this: '#navbarNavDropdown\.navbar-collapse\.collapse': '.navbarNavDropdown'
        // Background Inspector replacements
        background: {
            '#gametext': '#gamescreen',
            '#outerbodybg': '#outerbody',
            '#navbarNavDropdown': '#topmenu',
            '#input_text': '#inputrow'
        },
        // Theme Inspector replacements
        theme: {
            // Add theme-specific replacements here if needed
        }
    };

	const TOOL_ID = 'blacklite-tools';
	const State = {
		activeTab: 'theme',
		themes: {
			default: null,
			savedThemes: {},
			activeTheme: 'Default Theme'
		},
		backgrounds: {
			elements: {},
			filters: {}
		},
		toolState: {
			collapsed: false,
		}
	};

	// =============================================
	// UTILITY FUNCTIONS
	// =============================================
    function escapeSelector(selector) {
        if (!selector) return '';
        // Escape all non-alphanumeric characters except - and _
        return selector.replace(/([^a-zA-Z0-9_-])/g, '\\$&');
    }

	function debounce(func, delay) {
		let timeout;
		return (...args) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => func.apply(this, args), delay);
		};
	}

	function isExcludedElement(selector) {
		return selector.includes(TOOL_ID) ||
			selector === '.background-overlay' ||
			CONFIG.EXCLUDED_ELEMENTS.some(excluded => selector.includes(excluded));
	}

    function isValidSelector(selector) {
        try {
            document.querySelector(selector);
            return true;
        } catch (e) {
            return false;
        }
    }

	function parseDocumentStyles() {
		let cssText = '';
		const styleSheets = document.styleSheets;
		const toolStyleIds = ['bltool-default-styles', 'bltool-tool-styles', 'bltool-theme-styles', 'bltool-bg-styles'];
		
		for (let i = 0; i < styleSheets.length; i++) {
			const sheet = styleSheets[i];

			if (sheet.ownerNode && toolStyleIds.includes(sheet.ownerNode.id)) {
				continue;
			}
			
			try {
				if (sheet.href && !sheet.href.startsWith(window.location.origin)) {
					continue;
				}
				
				const rules = sheet.cssRules || sheet.rules;
				if (!rules) continue;
				
				for (let j = 0; j < rules.length; j++) {
					const rule = rules[j];
					
					if (rule instanceof CSSStyleRule) {
						if (!rule.selectorText.includes(TOOL_ID) && 
							!rule.selectorText.includes('BLTOOL')) {
							cssText += `${rule.selectorText} { ${rule.style.cssText} }\n`;
						}
					} else if (rule instanceof CSSMediaRule) {
						let mediaCss = '';
						for (let k = 0; k < rule.cssRules.length; k++) {
							const mediaRule = rule.cssRules[k];
							if (mediaRule instanceof CSSStyleRule && 
								!mediaRule.selectorText.includes(TOOL_ID) &&
								!mediaRule.selectorText.includes('BLTOOL')) {
								mediaCss += `  ${mediaRule.selectorText} { ${mediaRule.style.cssText} }\n`;
							}
						}
						if (mediaCss) {
							cssText += `@media ${rule.conditionText} {\n${mediaCss}}\n`;
						}
					}
				}
			} catch (e) {
				console.warn('Could not read styles from stylesheet:', sheet.href, e);
			}
		}
		// Store the parsed styles once
		BLTOOLdynamicDefaultThemeCSS = cssText;
		return cssText;
	}

    function isElementSuitableForBackground(selector) {
        // Skip excluded elements
        if (isExcludedElement(selector)) return false;
        if (!isValidSelector(selector)) return false;
        
        try {
            // Skip if selector is empty or obviously invalid
            if (!selector || selector.includes('<') || selector.includes('>')) {
                return false;
            }
            const elements = document.querySelectorAll(selector);
            if (elements.length === 0) return false;
            
            return Array.from(elements).every(el => {
                const tagName = el.tagName.toLowerCase();
                const computedStyle = window.getComputedStyle(el);
                
                // Check suitability
                return !CONFIG.UNSUITABLE_FOR_BACKGROUND.has(tagName) &&
                    computedStyle.display !== 'none' &&
                    computedStyle.visibility !== 'hidden' &&
                    el.offsetWidth > 0 &&
                    el.offsetHeight > 0;
            });
        } catch (e) {
            console.error('Invalid selector detected:', e);
            return false;
        }
    }

    function initializeConflictFixes() {
        // Add global CSS to help with common conflicts
        const conflictFixCSS = `
            /* Fix common background conflicts */
            [data-bltool-background]::before {
                content: "" !important;
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                z-index: -1 !important;
                pointer-events: none !important;
            }
            
            /* Ensure parent positioning */
            [data-bltool-background] {
                position: relative !important;
            }
            
            /* Handle overflow issues */
            [data-bltool-background] {
                overflow: visible !important;
            }
        `;
        
        let fixStyleElement = document.getElementById('bltool-bg-conflict-fixes');
        if (!fixStyleElement) {
            fixStyleElement = document.createElement('style');
            fixStyleElement.id = 'bltool-bg-conflict-fixes';
            document.head.appendChild(fixStyleElement);
        }
        fixStyleElement.textContent = conflictFixCSS;
    }

    const SectionHandlers = {
        handleSectionHeader(e) {
            const sectionHeader = e.target.closest('.BLTOOL-section-header');
            if (sectionHeader) {
                e.preventDefault();
                e.stopImmediatePropagation();
                const section = sectionHeader.closest('.BLTOOL-section');
                section.classList.toggle('collapsed');
                const arrow = sectionHeader.querySelector('span:last-child');
                arrow.textContent = section.classList.contains('collapsed') ? '▶' : '▼';
                return true;
            }
            return false;
        },

        handleSelectorToggle(e, manager = null) {
            const selectorToggle = e.target.closest('.BLTOOL-selector-toggle, .BLTOOL-bg-selector-toggle');
            if (!selectorToggle) return false;
            e.preventDefault();
            e.stopImmediatePropagation();
            const targetManager = selectorToggle.classList.contains('BLTOOL-bg-selector-toggle') 
                ? BackgroundManager 
                : ThemeManager;
            const selector = selectorToggle.dataset.selector;
            if (targetManager.collapsedSelectors.has(selector)) {
                targetManager.collapsedSelectors.delete(selector);
            } else {
                targetManager.collapsedSelectors.add(selector);
            }

            UIManager.render();
            return true;
        }
    }

	// =============================================
	// CORE MANAGERS
	// =============================================

	// 1. UIManager - Handles all UI rendering and tab management
	const UIManager = {
		toolsContainer: null,
		handleCoreClick: null,
		lastAppliedStyles: null,
		toggleHandle: null,
		
		init() {
			console.log('Initializing UIManager');
			this.createToolContainer();
			this.setupBaseStyles();
			this.attachGlobalEvents();
			this.render();
		},
		
        createToolContainer() {
            this.toolsContainer = document.createElement('div');
            this.toolsContainer.id = TOOL_ID;
            this.toolsContainer.className = 'BLTOOL-blacklite-tools';
                       
            this.toggleHandle = document.createElement('div');
            this.toggleHandle.className = 'BLTOOL-toggle-handle';
            this.toggleHandle.title = 'Click to toggle';
            
            this.toggleHandle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleMinimize();
            });
            
            this.toolsContainer.insertBefore(this.toggleHandle, this.toolsContainer.firstChild);
                        
            if (State.toolState.collapsed) {
                this.toolsContainer.classList.add('collapsed');
            }
			
			const resizeObserver = new ResizeObserver(() => {
				const scrollContainer = this.toolsContainer.querySelector('.BLTOOL-scroll-container');
				if (scrollContainer) {
					const headerHeight = this.toolsContainer.querySelector('.BLTOOL-header')?.offsetHeight || 50;
					const tabsHeight = this.toolsContainer.querySelector('.BLTOOL-tabs')?.offsetHeight || 30;
					const availableHeight = this.toolsContainer.offsetHeight - headerHeight - tabsHeight - 20;
					scrollContainer.style.maxHeight = `${Math.max(availableHeight, 100)}px`;
					scrollContainer.style.overflow = 'auto';
				}
			});
			
			document.body.appendChild(this.toolsContainer);
			resizeObserver.observe(this.toolsContainer);
		},
		
        toggleMinimize() {
            State.toolState.collapsed = !State.toolState.collapsed;
            this.toolsContainer.classList.toggle('collapsed');
            
            setTimeout(() => {
                this.toolsContainer.style.display = 'none';
                this.toolsContainer.offsetHeight;
                this.toolsContainer.style.display = 'flex';
            }, 0);
        },

		setupBaseStyles() {
		parseDocumentStyles();
		
		const defaultThemeStyleSheet = document.createElement('style');
		defaultThemeStyleSheet.type = 'text/css';
		defaultThemeStyleSheet.innerText = BLTOOLdynamicDefaultThemeCSS;
		defaultThemeStyleSheet.id = 'bltool-default-styles';
		document.head.appendChild(defaultThemeStyleSheet);

		const toolSpecificStyleSheet = document.createElement('style');
		toolSpecificStyleSheet.type = 'text/css';
		toolSpecificStyleSheet.innerText = BLTOOLspecificstyles;
		toolSpecificStyleSheet.id = 'bltool-tool-styles';
		document.head.appendChild(toolSpecificStyleSheet);

		this.dynamicStyleElement = document.createElement('style');
		this.dynamicStyleElement.id = 'bltool-theme-styles';
		this.dynamicStyleElement.type = 'text/css';
		document.head.appendChild(this.dynamicStyleElement);
		},
		
		attachGlobalEvents() {
			window.addEventListener('resize', debounce(this.handleResize.bind(this), 250));
		},

		handleResize() {
			if (window.innerWidth <= CONFIG.MOBILE_BREAKPOINT) {
				this.toolsContainer.style.width = '90%';
				this.toolsContainer.style.left = '5%';
				this.toolsContainer.style.right = 'auto';
				this.toolsContainer.style.top = '10px';
			} else {
				if (State.toolState.position.x === null || State.toolState.position.y === null) {
					this.toolsContainer.style.width = '350px';
					this.toolsContainer.style.left = 'auto';
					this.toolsContainer.style.right = '0';
					this.toolsContainer.style.top = '0';
				}
			}
		},
		
        render() {
                try {
                    console.log('Starting UI render for tab:', State.activeTab);
                    
                    const scrollContainer = this.toolsContainer.querySelector('.BLTOOL-scroll-container');
                    const scrollPosition = scrollContainer ? scrollContainer.scrollTop : 0;

                    const toggleHandle = this.toggleHandle;
                    
                    const children = Array.from(this.toolsContainer.children);
                    children.forEach(child => {
                        if (child !== toggleHandle) {
                            this.toolsContainer.removeChild(child);
                        }
                    });

                    const content = `
                        <div class="BLTOOL-header">
                            <h3>BlackLite UI Customization Tool ${CONFIG.BLTOOL_VERSION}</h3>
                        </div>
                        <div class="BLTOOL-content" style="${State.toolState.collapsed ? 'display: none;' : ''}">
                            <div style="display: flex; margin-bottom: 10px;">
                                <div class="BLTOOL-tab-button ${State.activeTab === 'theme' ? 'BLTOOL-active-tab' : ''}" data-tab="theme">Theme</div>
                                <div class="BLTOOL-tab-button ${State.activeTab === 'backgrounds' ? 'BLTOOL-active-tab' : ''}" data-tab="backgrounds">Backgrounds</div>
                                <div class="BLTOOL-tab-button ${State.activeTab === 'presets' ? 'BLTOOL-active-tab' : ''}" data-tab="presets">Presets</div>
                            </div>
                            <div class="BLTOOL-content-wrapper">
                                ${this.renderTabContent()}
                            </div>
                        </div>
                    `;

                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = content;
                    
                    while (tempDiv.firstChild) {
                        this.toolsContainer.appendChild(tempDiv.firstChild);
                    }

                    console.log('UI content rendered');

                    const newScrollContainer = this.toolsContainer.querySelector('.BLTOOL-scroll-container');
                    if (newScrollContainer) {
                        newScrollContainer.scrollTop = scrollPosition;
                    }

                    this.attachCoreEventListeners();
                    console.log('Core listeners attached');

                    console.log('Attaching tab-specific listeners');
                    switch (State.activeTab) {
                        case 'theme':
                            ThemeManager.attachEventListeners();
                            break;
                        case 'backgrounds':
                            BackgroundManager.attachEventListeners();
                            break;
                        case 'presets':
                            PresetManager.attachEventListeners();
                            break;
                    }

                } catch (e) {
                    console.error('Error during render:', e);
                }
            },
		
		renderTabContent() {
			switch (State.activeTab) {
				case 'theme':
					return ThemeManager.renderThemeTab();
				case 'backgrounds':
					return BackgroundManager.renderBackgroundsTab();
				case 'presets':
					return PresetManager.renderPresetsTab();
				default:
					return ThemeManager.renderThemeTab();
			}
		},
		
		attachCoreEventListeners() {
			console.log('Attaching core event listeners...');
			
			if (this.handleCoreClick) {
				this.toolsContainer.removeEventListener('click', this.handleCoreClick);
			}
			
			this.handleCoreClick = (e) => {
				const tabButton = e.target.closest('.BLTOOL-tab-button');
				if (tabButton) {
					e.preventDefault();
					State.activeTab = tabButton.dataset.tab;
					this.render();
				}

				const collapseToggle = e.target.closest('.BLTOOL-collapse-toggle');
				if (collapseToggle) {
					State.toolState.collapsed = !State.toolState.collapsed;
					this.toolsContainer.classList.toggle('collapsed', State.toolState.collapsed);
					this.render();
				}
			};
			
			this.toolsContainer.addEventListener('click', this.handleCoreClick);
						
			const resizeObserver = new ResizeObserver(() => {
				const scrollContainer = this.toolsContainer.querySelector('.BLTOOL-scroll-container');
				if (scrollContainer) {
					const headerHeight = this.toolsContainer.querySelector('.BLTOOL-header')?.offsetHeight || 50;
					const tabsHeight = this.toolsContainer.querySelector('[style*="display: flex; margin-bottom: 10px;"]')?.offsetHeight || 30;
					const availableHeight = this.toolsContainer.offsetHeight - headerHeight - tabsHeight - 25;
					scrollContainer.style.maxHeight = `${Math.max(availableHeight, 100)}px`;
				}
			});
			resizeObserver.observe(this.toolsContainer);
		},
	
		cleanup() {
			if (this.handleCoreClick) {
				this.toolsContainer.removeEventListener('click', this.handleCoreClick);
				this.handleCoreClick = null;
			}
			
			document.removeEventListener('mousemove', this.handleDragMove);
			document.removeEventListener('mouseup', this.handleDragEnd);
			
			if (this.toolsContainer && this.toolsContainer.parentNode) {
				this.toolsContainer.parentNode.removeChild(this.toolsContainer);
			}
		}
	};


    // 2. InspectorManager - Unified inspector functionality
    const InspectorManager = {
        activeInspector: null,
        lastHighlightedElement: null,
        currentFilterInputId: null,
        handleMouseOver: null,
        handleClick: null,
        
        startInspector(type, onSelection, filterInputId = null) {
            this.stopInspector();
            this.activeInspector = type;
            this.currentFilterInputId = filterInputId;
            
            document.body.style.cursor = 'crosshair';
            
            this.handleMouseOver = (event) => {
                if (event.target.closest(`#${TOOL_ID}`)) return;
                
                if (this.lastHighlightedElement) {
                    this.lastHighlightedElement.style.outline = '';
                }
                
                event.target.style.outline = '2px solid #ff0000';
                this.lastHighlightedElement = event.target;
                
                const selector = this.generateSelector(event.target, type);
                if (this.currentFilterInputId) {
                    const filterInput = document.getElementById(this.currentFilterInputId);
                    if (filterInput) filterInput.value = selector;
                }
            };
            
            this.handleClick = (event) => {
                if (event.target.closest(`#${TOOL_ID}`)) return;
                event.preventDefault();
                event.stopPropagation();
                
                const selector = this.generateSelector(event.target, type);
                if (typeof onSelection === 'function') {
                    onSelection(selector);
                }
                this.stopInspector();
            };
            
            document.addEventListener('mouseover', this.handleMouseOver, true);
            document.addEventListener('click', this.handleClick, true);
            
            UIManager.render();
        },
        
        stopInspector() {
            document.body.style.cursor = '';
            
            if (this.lastHighlightedElement) {
                this.lastHighlightedElement.style.outline = '';
                this.lastHighlightedElement = null;
            }
            
            if (this.handleMouseOver) {
                document.removeEventListener('mouseover', this.handleMouseOver, true);
                this.handleMouseOver = null;
            }
            
            if (this.handleClick) {
                document.removeEventListener('click', this.handleClick, true);
                this.handleClick = null;
            }
            
            this.activeInspector = null;
            this.currentFilterInputId = null;
            
            UIManager.render();
        },
        
        generateSelector(element, inspectorType) {
            // First generate the base selector
            let selector;
            if (element.id && !element.id.startsWith('ember') && element.id !== '') {
                selector = `#${escapeSelector(element.id)}`;
            } else if (element.classList.length > 0) {
                const classes = Array.from(element.classList);
                const validClass = classes.find(c => !c.startsWith('js-'));
                selector = validClass ? `.${escapeSelector(validClass)}` : element.tagName.toLowerCase();
            } else {
                selector = element.tagName.toLowerCase();
            }

            // Apply replacements for this inspector type
            return this.applySelectorReplacements(selector, inspectorType, element); 
        },

        applySelectorReplacements(selector, inspectorType, element) {
            const replacements = SELECTOR_REPLACEMENTS[inspectorType] || {};
            
            // 1. Check for exact matches
            if (replacements[selector]) {
                return replacements[selector];
            }
            
            // 2. Check for regex patterns in keys
            for (const [pattern, replacement] of Object.entries(replacements)) {
                try {
                    const regex = new RegExp(`^${pattern}$`);
                    if (regex.test(selector)) {
                        return replacement;
                    }
                } catch (e) {
                    console.warn('Invalid regex in selector replacement:', pattern);
                }
            }
            /*
            // 3. Apply special cases
            if (inspectorType === 'background' && element) {  // Check element exists
                // Special case: prefer class selectors over ID selectors
                if (selector.startsWith('#') && element.classList.length > 0) {
                    const firstClass = element.classList[0];
                    return `#${escapeSelector(firstClass)}`;
                }
            }
            */
            return selector;
        },
        
        cleanup() {
            this.stopInspector();
        }
    };

    // 3. FilterManager - Handles all filtering logic
    const FilterManager = {
        applyFilter(searchTerm, items, matchFn) {
            if (!searchTerm.trim()) return items;
            return items.filter(item => matchFn(searchTerm, item));
        },
        
        matchesFilter(searchTerm, text) {
            if (!searchTerm) return true;
            const sanitizedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const pattern = new RegExp(sanitizedTerm, 'i');
            return pattern.test(text);
        }
    };

    // =============================================
    // TAB-SPECIFIC MANAGERS
    // =============================================
    
    // 1. ThemeManager
    const ThemeManager = {
        originalStyles: {},
        currentStyles: {},
        searchTerm: '',
        collapsedSelectors: new Set(),
        showOnlyChangedElements: false,
        applyDebounce: null,
        lastAppliedStyles: null,
        handleThemeChange: null,
        handleThemeClick: null,
        
        init() {
            console.log('Initializing Improved ThemeManager');
            this.originalStyles = {};
            this.currentStyles = {};
            this.collapsedSelectors.clear();
            this.captureBaseStyles();
            
            State.themes.default = JSON.parse(JSON.stringify(this.originalStyles));
            
            Object.keys(this.originalStyles).forEach(selector => {
                this.collapsedSelectors.add(selector);
            });
        },

        toggleSelectorCollapse(selector) {
            if (this.collapsedSelectors.has(selector)) {
                this.collapsedSelectors.delete(selector);
            } else {
                this.collapsedSelectors.add(selector);
            }
            UIManager.render();
        },
        
        captureBaseStyles() {
            try {
                console.log('Starting style capture...');
                const allElements = document.querySelectorAll('*');
                const processedSelectors = new Set();
                
                if (!this.isElementExcluded(document.body)) {
                    this.captureElementStyles('body', document.body);
                    processedSelectors.add('body');
                }
                if (!this.isElementExcluded(document.documentElement)) {
                    this.captureElementStyles('html', document.documentElement);
                    processedSelectors.add('html');
                }

                allElements.forEach(el => {
                    if (this.isElementExcluded(el)) return;
                    
                    const selectors = this.generateAllPossibleSelectors(el);
                    
                    selectors.forEach(selector => {
                        if (!selector || processedSelectors.has(selector)) return;
                        
                        processedSelectors.add(selector);
                        this.captureElementStyles(selector, el);
                    });
                });
                
                console.log('Style capture completed. Found:', Object.keys(this.originalStyles).length, 'selectors');
            } catch (error) {
                console.error('Error capturing base styles:', error);
            }
        },

		generateAllPossibleSelectors(el) {
			const selectors = [];
			const tag = el.tagName.toLowerCase();
			
			// Always include ID selector if element has an ID
			if (el.id && !el.id.includes(TOOL_ID)) {
				selectors.push(`#${escapeSelector(el.id)}`);
			}
			
			// Get all class combinations if element has classes
			if (el.className && typeof el.className === 'string') {
				const classes = el.className.split(' ').filter(c => c.trim() !== '');
				if (classes.length > 0) {
					// Add each individual class
					classes.forEach(c => {
						selectors.push(`.${escapeSelector(c)}`);
					});
					
					// Add all classes combined
					if (classes.length > 1) {
						selectors.push(`.${classes.map(c => escapeSelector(c)).join('.')}`);
					}
					
					// Add tag with classes
					if (classes.length > 1) {
						selectors.push(`${tag}.${classes.map(c => escapeSelector(c)).join('.')}`);
					}
				}
			}
			
			// Simple tag selector (only if no ID or classes exist)
			if (!el.id && (!el.className || el.className.trim() === '')) {
				selectors.push(tag);
			}
			
			// Filter out duplicates and tool-related selectors
			return selectors.filter((v, i, a) => 
				v && 
				!v.includes(TOOL_ID) && 
				!v.includes('BLTOOL') &&
				a.indexOf(v) === i
			);
		},

		isBetterSelectorAvailable(selector, element) {    
			// If we already have this selector, we don't need to capture it again
			if (this.originalStyles[selector]) {
				return true;
			}
			
			// If this is an ID selector, it's always the best
			if (selector.startsWith('#')) {
				return false;
			}
			
			// Check if we have a more specific selector for this element
			const elementSelectors = this.generateAllPossibleSelectors(element);
			return elementSelectors.some(s => 
				s !== selector && 
				this.originalStyles[s] && 
				(s.startsWith('#') || s.split('.').length > selector.split('.').length)
			);
		},
        
		captureElementStyles(selector, element) {
			try {
				const computedStyle = window.getComputedStyle(element);
				
				// Only capture if this is the best available selector for the element
				if (this.isBetterSelectorAvailable(selector, element)) {
					return;
				}
				
				this.originalStyles[selector] = {};
				this.currentStyles[selector] = {};

				CONFIG.PRESERVED_STYLES.forEach(prop => {
					const value = computedStyle.getPropertyValue(prop);
					if (value && value !== 'initial' && value !== 'inherit') {
						this.originalStyles[selector][prop] = value;
						this.currentStyles[selector][prop] = value;
					}
				});
			} catch (error) {
				console.warn(`Error capturing styles for ${selector}:`, error);
			}
		},
       
        isElementExcluded(element) {
            if (!element || !element.tagName) return true;
            const tagName = element.tagName.toLowerCase();

            if (tagName === 'body' || tagName === 'html') {
                return element.closest(`#${TOOL_ID}`) ||
                       element.id === TOOL_ID ||
                       element.className.includes('BLTOOL') ||
                       element.hasAttribute('data-bltool-exclude');
            }
            
            return CONFIG.EXCLUDED_SELECTORS.includes(tagName) ||
                   element.closest(`#${TOOL_ID}`) ||
                   element.id === TOOL_ID ||
                   element.className.includes('BLTOOL') ||
                   element.hasAttribute('data-bltool-exclude');
        },
        
        isSelectorExcluded(selector) {
            if (!selector) return true;
            return selector.includes(TOOL_ID) ||
                   selector.includes('BLTOOL') ||
                   selector === '.background-overlay' ||
                   selector.includes('script') ||
                   selector.includes('style') ||
                   selector.includes('meta');
        },
        
        renderThemeTab() {
		try {
				const isAllCollapsed = Object.keys(this.originalStyles).every(selector => 
					this.collapsedSelectors.has(selector)
				);
				
				return `
					<div class="BLTOOL-scroll-container">
						<div class="BLTOOL-section">
							<div class="BLTOOL-section-header" data-section="filter">
								<span>Search & Inspector</span>
								<span>▼</span>
							</div>
							<div class="BLTOOL-section-content">
								<div style="display: flex; margin-bottom: 5px; align-items: center;">
									<input type="text" id="theme-filter" placeholder="Filter selectors..." 
										style="flex:1; padding: 4px 6px; color: black; height: 28px;" 
										value="${this.searchTerm}">
									<button id="clear-filter" class="BLTOOL-button" 
											style="margin-left: 5px; height: 28px;" 
											${!this.searchTerm ? 'disabled' : ''}>X</button>
								</div>
								<div style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 5px;">
									<button class="BLTOOL-button" id="toggle-inspector">
										${InspectorManager.activeInspector === 'theme' ? 'Stop Inspector' : 'Inspector'}
									</button>
								</div>
							</div>
						</div>
						
						<div class="BLTOOL-section">
							<div class="BLTOOL-section-header" data-section="controls">
								<span>Controls</span>
								<span>▼</span>
							</div>
							<div class="BLTOOL-section-content">
								<div style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 5px;">
									<button id="toggle-collapse" class="BLTOOL-button" style="flex: 1 1 48%;">
										${isAllCollapsed ? 'Open ALL' : 'Close ALL'}
									</button>
									<button id="filter-changes-button" class="BLTOOL-button" style="flex: 1 1 48%;">
										${this.showOnlyChangedElements ? 'Show All' : 'Show Changed'}
									</button>
								</div>
							</div>
						</div>
						
						<div class="BLTOOL-section">
							<div class="BLTOOL-section-header" data-section="elements">
								<span>Elements</span>
								<span>▼</span>
							</div>
							<div class="BLTOOL-section-content">
								${this.renderStyleGroups()}
							</div>
						</div>
					</div>
				`;
			} catch (e) {
				console.error('Error rendering theme tab:', e);
				return '<div>Error rendering theme tab</div>';
			}
		},
    
        renderStyleGroups() {
            try {
                const allSelectors = Object.keys(this.currentStyles);
                if (allSelectors.length === 0) {
                    return `<div style="padding: 10px; color: #aaa;">No elements found for customization.</div>`;
                }

                const filteredSelectors = allSelectors
                    .filter(selector => !this.isSelectorExcluded(selector))
                    .filter(selector => {
                        if (this.searchTerm && !FilterManager.matchesFilter(this.searchTerm, selector)) {
                            return false;
                        }
                        
                        if (this.showOnlyChangedElements) {
                            const originalStyles = this.originalStyles[selector] || {};
                            const currentStyles = this.currentStyles[selector] || {};
                            const hasChanges = Object.keys(currentStyles).some(
                                prop => currentStyles[prop] && currentStyles[prop] !== originalStyles[prop]
                            );
                            return hasChanges;
                        }
                        
                        return true;
                    });

                if (filteredSelectors.length === 0) {
                    return `<div style="padding: 10px; color: #aaa;">No matching elements found.</div>`;
                }

				return filteredSelectors.map(selector => {
						const isCollapsed = this.collapsedSelectors.has(selector);
						const styles = this.currentStyles[selector] || {};
						const originalStyles = this.originalStyles[selector] || {};
						
						const filteredProps = Object.keys(styles).filter(prop => {
							return CONFIG.PRESERVED_STYLES.includes(prop);
						});

						return `
							<div style="margin-top: 5px;">
								<div class="BLTOOL-selector-toggle" data-selector="${selector}"
									style="cursor: pointer; padding: 5px; background-color:rgb(51, 51, 51); color: white;">
									${selector}
									<span style="float:right;">${isCollapsed ? '▶' : '▼'}</span>
								</div>
								${isCollapsed ? '' : `
									<div style="background-color: #3e3e3e; margin: 5px 0; padding: 5px;">
										${filteredProps.map(prop => {
											const isColorProp = prop.includes('color');
											const changed = styles[prop] !== originalStyles[prop];
											
											return `
                                                <div style="display: flex; align-items: center; margin: 5px 0;">
                                                    <span style="flex-grow: 1; margin-right: 10px; color: #aaa;">${prop}</span>
                                                    ${isColorProp ? `
                                                        <input
                                                            type="color"
                                                            value="${styles[prop] || ''}"
                                                            style="width: 30px; height: 30px; padding: 2px;"
                                                            data-selector="${selector}"
                                                            data-prop="${prop}"
                                                            class="BLTOOL-style-color-input"
                                                        >
                                                    ` : ''}
                                                    <input
                                                        type="text"
                                                        value="${styles[prop] || ''}"
                                                        style="width: 100px; padding: 2px; color: black; ${isColorProp ? 'margin-left: 5px;' : ''}"
                                                        data-selector="${selector}"
                                                        data-prop="${prop}"
                                                        class="BLTOOL-style-input"
                                                    >
                                                    ${changed ? `
                                                        <button class="BLTOOL-reset-button" data-selector="${selector}" data-prop="${prop}"
                                                            style="background: none; border: none; color: #ff6b6b; cursor: pointer; margin-left: 5px; font-weight: bold;">
                                                            X
                                                        </button>
                                                    ` : ''}
                                                    ${prop === 'background-color' ? `
                                                        <button class="BLTOOL-transparent-button" 
                                                            data-selector="${selector}"
                                                            data-prop="${prop}"
                                                            style="background: none; border: none; color: #6b6bff; cursor: pointer; margin-left: 5px; font-weight: bold;"
                                                            title="Set to transparent">
                                                            T
                                                        </button>
                                                    ` : ''}
                                                </div>
                                            `;
										}).join('')}
									</div>
								`}
							</div>
						`;
					}).join('');
            } catch (e) {
                console.error('Error rendering style groups:', e);
                return '<div>Error rendering style groups</div>';
            }
        },

        applyAllStylesToDOM() {
            const currentStylesString = JSON.stringify(this.currentStyles);
            if (this.lastAppliedStyles === currentStylesString) {
                return;
            }
            
            this.lastAppliedStyles = currentStylesString;
            
            let cssText = '';
            
            Object.entries(this.currentStyles).forEach(([selector, styles]) => {
                const originalStyles = this.originalStyles[selector] || {};
                const changedStyles = {};
                
                Object.entries(styles).forEach(([prop, value]) => {
                    if (value !== originalStyles[prop]) {
                        changedStyles[prop] = value;
                    }
                });
                
                if (Object.keys(changedStyles).length > 0) {
                    cssText += `${selector} {\n`;
                    Object.entries(changedStyles).forEach(([prop, value]) => {
                        cssText += `  ${prop}: ${value} !important;\n`;
                    });
                    cssText += '}\n\n';
                }
            });
            
            UIManager.dynamicStyleElement.textContent = cssText;
        },
        
        attachEventListeners() {
            const container = document.getElementById(TOOL_ID);
            if (!container) return;

            if (this.handleThemeChange) {
                container.removeEventListener('change', this.handleThemeChange);
            }
            if (this.handleThemeClick) {
                container.removeEventListener('click', this.handleThemeClick);
            }

            const themeFilter = container.querySelector('#theme-filter');
            if (themeFilter) {
                const debouncedFilter = debounce(() => {
                    this.searchTerm = themeFilter.value || '';
                    UIManager.render();
                }, 750);
                
                themeFilter.addEventListener('input', debouncedFilter);
                themeFilter.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') debouncedFilter();
                });
            }

            container.querySelector('#toggle-inspector')?.addEventListener('click', (e) => {
                e.stopPropagation();
                if (InspectorManager.activeInspector === 'theme') {
                    InspectorManager.stopInspector();
                } else {
                    InspectorManager.startInspector(
                        'theme', 
                        (selector) => {
                            this.searchTerm = selector;
                            UIManager.render();
                        },
                        'theme-filter'
                    );
                }
            });

            container.addEventListener('click', (e) => {
                if (e.target.classList.contains('BLTOOL-transparent-button')) {
                    const selector = e.target.dataset.selector;
                    const prop = e.target.dataset.prop;
                    
                    // Find the color input and text input
                    const colorInput = container.querySelector(`.BLTOOL-style-color-input[data-selector="${selector}"][data-prop="${prop}"]`);
                    const textInput = container.querySelector(`.BLTOOL-style-input[data-selector="${selector}"][data-prop="${prop}"]`);
                    
                    if (colorInput) colorInput.value = '#000000';
                    if (textInput) textInput.value = 'rgba(0,0,0,0)';
                    
                    this.updateStyle(selector, prop, 'rgba(0,0,0,0)');
                }
            });

            this.handleThemeClick = (e) => {
                if (SectionHandlers.handleSectionHeader(e)) return;
                if (SectionHandlers.handleSelectorToggle(e)) return;

                if (e.target.id === 'toggle-inspector') {
                    e.stopPropagation();
                    if (InspectorManager.activeInspector === 'theme') {
                        InspectorManager.stopInspector();
                    } else {
                        InspectorManager.startInspector('theme-filter', (selector) => {
                            this.searchTerm = selector;
                            UIManager.render();
                        });
                    }
                    return;
                }
                
                if (e.target.id === 'toggle-collapse') {
                    const allSelectors = Object.keys(this.originalStyles);
                    const isAllCollapsed = allSelectors.every(selector => this.collapsedSelectors.has(selector));
                    this.collapsedSelectors = isAllCollapsed ? new Set() : new Set(allSelectors);
                    UIManager.render();
                    return;
                }

                if (e.target.id === 'filter-changes-button') {
                    this.showOnlyChangedElements = !this.showOnlyChangedElements;
                    UIManager.render();
                    return;
                }
                
                if (e.target.id === 'clear-filter') {
                    this.searchTerm = '';
                    UIManager.render();
                    return;
                }
            };

			this.handleThemeChange = (e) => {
				if (e.target.classList.contains('BLTOOL-style-input') || 
					e.target.classList.contains('BLTOOL-style-color-input')) {
					
					const selector = e.target.dataset.selector;
					const prop = e.target.dataset.prop;
					const value = e.target.value;
					
					if (prop.includes('color')) {
						const isColorInput = e.target.classList.contains('BLTOOL-style-color-input');
						const otherInput = isColorInput 
							? container.querySelector(`.BLTOOL-style-input[data-selector="${selector}"][data-prop="${prop}"]`)
							: container.querySelector(`.BLTOOL-style-color-input[data-selector="${selector}"][data-prop="${prop}"]`);
						
						if (otherInput) {
							otherInput.value = value;
						}
					}
					
					this.updateStyle(selector, prop, value);
				}
			};

			container.addEventListener('click', (e) => {
				if (e.target.classList.contains('BLTOOL-reset-button')) {
					const selector = e.target.dataset.selector;
					const prop = e.target.dataset.prop;
					
					const originalValue = this.originalStyles[selector]?.[prop];
					if (originalValue !== undefined) {
						if (prop.includes('color')) {
							const colorInput = container.querySelector(`.BLTOOL-style-color-input[data-selector="${selector}"][data-prop="${prop}"]`);
							const textInput = container.querySelector(`.BLTOOL-style-input[data-selector="${selector}"][data-prop="${prop}"]`);
							
							if (colorInput) colorInput.value = originalValue;
							if (textInput) textInput.value = originalValue;
						} else {
							const input = container.querySelector(`.BLTOOL-style-input[data-selector="${selector}"][data-prop="${prop}"]`);
							if (input) input.value = originalValue;
						}
						
						this.updateStyle(selector, prop, originalValue);
					}
				}
			});

            container.addEventListener('click', this.handleThemeClick);
            container.addEventListener('change', this.handleThemeChange);
        },
        
		updateStyle(selector, prop, value) {
			try {
				if (!this.currentStyles[selector]) {
					this.currentStyles[selector] = {};
				}
				this.currentStyles[selector][prop] = value;
				
				if (prop.includes('color')) {
					const previewDiv = document.querySelector(`.BLTOOL-selector-toggle[data-selector="${selector}"]`)
						?.closest('div')
						?.querySelector(`[data-selector="${selector}"] + div [style*="background-color"]`);
					
					if (previewDiv) {
						previewDiv.style.backgroundColor = value;
						const textSpan = previewDiv.nextElementSibling;
						if (textSpan) {
							textSpan.textContent = value || 'Not set';
						}
					}
				}
				
				if (!this.applyDebounce) {
					this.applyDebounce = debounce(() => {
						this.applyAllStylesToDOM();
						PresetManager.markAsUnsaved();
						this.applyDebounce = null;
					}, 100);
				}
				this.applyDebounce();
			} catch (e) {
				console.warn(`Could not apply style for selector: ${selector}`, e);
			}
		},
        
        showChanges() {
            try {
                const classicChecked = document.getElementById('theme-classic')?.checked || false;
                const aestheticChecked = document.getElementById('theme-aesthetic')?.checked || false;
                const corpoChecked = document.getElementById('theme-corpo')?.checked || false;

                let cssText = `/*\nBlackLite Custom Theme\n`;
                cssText += `Theme-Name: ${document.getElementById('preset-name')?.value || 'Custom'}\n`;
                cssText += `Theme-Description: ${document.getElementById('preset-description')?.value || 'No description'}\n`;
                cssText += `Creator: ${document.getElementById('preset-creator')?.value || 'Anonymous'}\n`;
                cssText += `Compatibility: ${classicChecked ? 'Classic' : ''}${aestheticChecked ? (classicChecked ? ', Aesthetic' : 'Aesthetic') : ''}${corpoChecked ? ((classicChecked || aestheticChecked) ? ', Corpo' : 'Corpo') : ''}\n`;
                cssText += `Date: ${new Date().toISOString()}\n*/\n\n`;
                
                let hasChanges = false;
                
                Object.entries(this.currentStyles).forEach(([selector, styles]) => {
                    const originalStyles = this.originalStyles[selector] || {};
                    const changedStyles = {};
                    
                    Object.entries(styles).forEach(([prop, value]) => {
                        if (value !== originalStyles[prop]) {
                            changedStyles[prop] = value;
                        }
                    });
                    
                    if (Object.keys(changedStyles).length > 0) {
                        hasChanges = true;
                        cssText += `${selector} {\n`;
                        Object.entries(changedStyles).forEach(([prop, value]) => {
                            cssText += `  ${prop}: ${value};\n`;
                        });
                        cssText += '}\n\n';
                    }
                });

                Object.entries(State.backgrounds.elements).forEach(([selector, imageData]) => {
                    if (imageData) {
                        hasChanges = true;
                        cssText += `${selector} {\n`;
                        cssText += `  /* background-image: data is too large to display here */\n`;
                        cssText += `  background-size: cover;\n`;
                        cssText += `  background-position: center;\n`;
                        
                        const filters = State.backgrounds.filters[selector] || {};
                        Object.entries(filters).forEach(([filter, value]) => {
                            const config = CONFIG.BACKGROUND_FILTERS[filter];
                            if (value !== config.default) {
                                cssText += `  ${filter}: ${value}${config.unit};\n`;
                            }
                        });
                        
                        cssText += '}\n\n';
                    }
                });

                if (!hasChanges) {
                    cssText += '/* No changes detected */';
                }

                const win = window.open('', '_blank', 'width=600,height=500');
                if (win) {
                    win.document.write(`
                        <html>
                            <head>
                                <title>Theme Changes</title>
                                <style>
                                    body { font-family: monospace; padding: 20px; background: #1a1a1a; color: #fff; }
                                    pre { white-space: pre-wrap; word-wrap: break-word; }
                                </style>
                            </head>
                            <body>
                                <h2>Current Theme Changes</h2>
                                <pre>${cssText}</pre>
                                <p><strong>Note:</strong> Background images are not shown in this preview as they would make the file too large for the Browser. Use the "Export Background Images" feature to get the actual images or Export the CSS.</p>
                            </body>
                        </html>
                    `);
                    win.document.close();
                }
            } catch (error) {
                console.error('Error showing changes:', error);
            }
        },
        
        cleanup() {
            if (this.applyDebounce) {
                this.applyDebounce.cancel();
                this.applyDebounce = null;
            }
            
            this.handleThemeChange = null;
            this.handleThemeClick = null;
        }
    };

    // 2. BackgroundManager
    const BackgroundManager = {
        searchTerm: '',
        collapsedSelectors: new Set(),
        selectorsInitialized: false,
        showOnlyWithBackground: false,
        applyDebounce: null,
        handleBgChange: null,
        handleBgClick: null,
        
        init() {
            console.log('Initializing BackgroundManager');

            // IMPORTANT: Initialize conflict fixes first
            initializeConflictFixes();

            if (!this.selectorsInitialized) {
                this.collapsedSelectors.clear();
                const allInitialSelectors = Object.keys(ThemeManager.currentStyles)
                    .filter(selector => isElementSuitableForBackground(selector));
                allInitialSelectors.forEach(selector => {
                    this.collapsedSelectors.add(selector);
                });
                this.selectorsInitialized = true;
            }
        },

        applyBackgroundsToDom() {
            let cssText = '';
            
            Object.entries(State.backgrounds.elements).forEach(([selector, imageData]) => {
                if (imageData) {
                    cssText += `
                        ${selector} {
                            position: relative !important;
                            background: transparent !important;
                        }
                        
                        ${selector}::before {
                            content: "" !important;
                            position: absolute !important;
                            top: 0 !important;
                            left: 0 !important; 
                            right: 0 !important;
                            bottom: 0 !important;
                            z-index: -1 !important;
                            background-image: url('${imageData}') !important;
                            background-repeat: no-repeat !important;
                            background-position: center !important;
                            background-size: cover !important;
                            pointer-events: none !important;
                    `;
                    
                    const filters = State.backgrounds.filters[selector] || {};
                    const filterString = Object.entries(filters)
                        .map(([filter, value]) => {
                            const config = CONFIG.BACKGROUND_FILTERS[filter];
                            return `${filter}(${value}${config?.unit || ''})`;
                        })
                        .join(' ');
                    
                    if (filterString) {
                        cssText += `filter: ${filterString} !important;`;
                    }
                    
                    cssText += '}\n\n';
                }
            });
            
            let bgStyleElement = document.getElementById('bltool-bg-styles');
            if (!bgStyleElement) {
                bgStyleElement = document.createElement('style');
                bgStyleElement.id = 'bltool-bg-styles';
                document.head.appendChild(bgStyleElement);
            }
            
            bgStyleElement.textContent = cssText;
            this.forceStyleRecalculation();
        },

        forceStyleRecalculation() {
            Object.keys(State.backgrounds.elements).forEach(selector => {
                try {
                    const elements = document.querySelectorAll(selector);
                    elements.forEach(element => {
                        element.offsetHeight;
                        element.classList.add('bltool-bg-force-update');
                        setTimeout(() => {
                            element.classList.remove('bltool-bg-force-update');
                        }, 10);
                    });
                } catch (e) {
                    console.warn(`Could not force recalculation for ${selector}:`, e);
                }
            });
        },
        
		renderBackgroundsTab() {
			try {
				const isAllCollapsed = Object.keys(ThemeManager.currentStyles)
					.filter(selector => isElementSuitableForBackground(selector))
					.every(selector => this.collapsedSelectors.has(selector));
					
				const toggleText = isAllCollapsed ? 'Open ALL' : 'Close ALL';
				
				return `
					<div class="BLTOOL-scroll-container">
						<div class="BLTOOL-section">
							<div class="BLTOOL-section-header" data-section="filter">
								<span>Search & Inspector</span>
								<span>▼</span>
							</div>
							<div class="BLTOOL-section-content">
								<div style="display: flex; margin-bottom: 5px; align-items: center;">
									<input type="text" id="bg-filter" placeholder="Filter elements..." 
										style="flex:1; padding: 4px 6px; color: black; height: 28px;" 
										value="${this.searchTerm}">
									<button id="clear-bg-filter" class="BLTOOL-button" 
											style="margin-left: 5px; height: 28px;" 
											${!this.searchTerm ? 'disabled' : ''}>X</button>
								</div>
								<div style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 5px;">
									<button class="BLTOOL-button" id="toggle-bg-inspector">
										${InspectorManager.activeInspector === 'background' ? 'Stop Inspector' : 'Inspector'}
									</button>
								</div>
							</div>
						</div>
						
						<div class="BLTOOL-section">
							<div class="BLTOOL-section-header" data-section="controls">
								<span>Controls</span>
								<span>▼</span>
							</div>
							<div class="BLTOOL-section-content">
								<div style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 5px;">
									<button id="toggle-bg-collapse" class="BLTOOL-button" style="flex: 1 1 48%;">
										${toggleText}
									</button>
									<button id="filter-images-button" class="BLTOOL-button" style="flex: 1 1 48%;">
										${this.showOnlyWithBackground ? 'Show All' : 'Show With BGs'}
									</button>
								</div>
							</div>
						</div>
						
						<div class="BLTOOL-section">
							<div class="BLTOOL-section-header" data-section="elements">
								<span>Elements</span>
								<span>▼</span>
							</div>
							<div class="BLTOOL-section-content">
								${this.renderBackgroundSelectors()}
							</div>
						</div>
					</div>
				`;
			} catch (e) {
				console.error('Error rendering backgrounds tab:', e);
				return '<div>Error rendering backgrounds tab</div>';
			}
		},
        
        renderBackgroundSelectors() {
            try {
                let suitableSelectors = Object.keys(ThemeManager.currentStyles)
                    .filter(selector => isElementSuitableForBackground(selector))
                    .filter(selector => !this.searchTerm || FilterManager.matchesFilter(this.searchTerm, selector));

                if (this.showOnlyWithBackground) {
                    suitableSelectors = suitableSelectors.filter(selector =>
                        State.backgrounds.elements[selector]
                    );
                }

                if (suitableSelectors.length === 0) {
                    return `<div style="padding: 10px; color: #aaa;">No suitable elements found for background customization.</div>`;
                }

                return suitableSelectors
                    .map(selector => {
                        const isCollapsed = this.collapsedSelectors.has(selector);
                        const hasBackground = State.backgrounds.elements[selector];
                        const bgImage = State.backgrounds.elements[selector] || '';
                        const filters = State.backgrounds.filters[selector] || {};
                        
                        Object.keys(CONFIG.BACKGROUND_FILTERS).forEach(filter => {
                            if (filters[filter] === undefined) {
                                filters[filter] = CONFIG.BACKGROUND_FILTERS[filter].default;
                            }
                        });

                        return `
                            <div style="margin-top: 5px; width: 100%; box-sizing: border-box;">
                                <div class="BLTOOL-bg-selector-toggle" data-selector="${selector}"
                                    style="cursor: pointer; padding: 5px; background-color: #2e2e2e; color: white; width: 100%; box-sizing: border-box;">
                                    ${selector} ${hasBackground ? '  🖼️  ' : ''}
                                    <span style="float:right;">${isCollapsed ? '▶' : '▼'}</span>
                                </div>
                                ${isCollapsed ? '' : `
                                    <div style="background-color: #3e3e3e; margin: 5px 0; padding: 5px; width: 100%; box-sizing: border-box;">
                                        <div style="margin-bottom: 10px; width: 100%;">
                                            <p style="margin: 5px 0; width: 100%;">Background Image:</p>
                                            <input type="file" class="BLTOOL-bg-file-input" data-selector="${selector}" style="color: white; display: inline-block; width: auto;">
                                            <button class="BLTOOL-button" data-selector="${selector}">X</button>
                                            <img id="preview-${selector}" src="${bgImage}" style="max-width: 100%; margin-top: 10px; display: ${bgImage ? 'block' : 'none'}; 
                                                box-sizing: border-box; filter: ${Object.entries(filters)
                                                    .map(([f, val]) => `${f}(${val}${CONFIG.BACKGROUND_FILTERS[f]?.unit || ''})`)
                                                    .join(' ')}">
                                        </div>
                                        ${hasBackground ? `
                                            <div style="margin-top: 10px;">
                                                <h4 style="margin: 10px 0 5px 0;">Image Filters</h4>
                                                ${Object.keys(CONFIG.BACKGROUND_FILTERS).map(filter => {
                                                    const config = CONFIG.BACKGROUND_FILTERS[filter];
                                                    return `
                                                        <div style="margin-bottom: 5px;">
                                                            <label style="display: flex; justify-content: space-between; align-items: center;">
                                                                <span style="flex: 1; text-align: left;">${filter}</span>
                                                                <span id="filter-value-${selector}-${filter}" style="min-width: 50px; text-align: right;">
                                                                    ${filters[filter]}${CONFIG.BACKGROUND_FILTERS[filter].unit}
                                                                </span>
                                                            </label>
                                                            <input type="range" 
                                                                class="BLTOOL-bg-filter-input" 
                                                                data-selector="${selector}" 
                                                                data-filter="${filter}"
                                                                min="${CONFIG.BACKGROUND_FILTERS[filter].min}" 
                                                                max="${CONFIG.BACKGROUND_FILTERS[filter].max}" 
                                                                step="${CONFIG.BACKGROUND_FILTERS[filter].step}" 
                                                                value="${filters[filter]}" 
                                                                style="width: 100%;">
                                                        </div>
                                                    `;
                                                }).join('')}
                                            </div>
                                        ` : ''}
                                    </div>
                                `}
                            </div>
                        `;
                    })
                    .join('');
            } catch (e) {
                console.error('Error rendering background selectors:', e);
                return '<div>Error rendering background selectors</div>';
            }
        },
        
        attachEventListeners() {
            const container = document.getElementById(TOOL_ID);
            if (!container) return;

            if (this.handleBgChange) {
                container.removeEventListener('change', this.handleBgChange);
            }
            if (this.handleBgClick) {
                container.removeEventListener('click', this.handleBgClick);
            }

            this.handleBgChange = (e) => {
                if (e.target.classList.contains('BLTOOL-bg-file-input')) {
                    const selector = e.target.dataset.selector;
                    if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        const reader = new FileReader();

                        reader.onload = (e) => {
                            this.applyBackgroundWithFallback(selector, e.target.result);
                        };

                        reader.readAsDataURL(file);
                    }
                }
                
                if (e.target.classList.contains('BLTOOL-bg-filter-input')) {
                    const selector = e.target.dataset.selector;
                    const filter = e.target.dataset.filter;
                    const value = parseFloat(e.target.value);
                    
                    const valueDisplay = document.getElementById(`filter-value-${selector}-${filter}`);
                    if (valueDisplay) {
                        valueDisplay.textContent = `${value}${CONFIG.BACKGROUND_FILTERS[filter].unit}`;
                    }
                    
                    this.applyFilter(selector, filter, value);
                }
            };

            container.querySelector('#toggle-bg-inspector')?.addEventListener('click', (e) => {
                e.stopPropagation();
                if (InspectorManager.activeInspector === 'background') {
                    InspectorManager.stopInspector();
                } else {
                    InspectorManager.startInspector(
                        'background', 
                        (selector) => {
                            this.searchTerm = selector;
                            UIManager.render();
                        },
                        'bg-filter'
                    );
                }
            });

            this.handleBgClick = (e) => {
                if (SectionHandlers.handleSectionHeader(e)) return;
                if (SectionHandlers.handleSelectorToggle(e)) return;               
                                
                if (e.target.closest('button') && e.target.closest('button').dataset.selector) {
                    const selector = e.target.closest('button').dataset.selector;
                    this.removeBackground(selector);
                }
                
                if (e.target.id === 'toggle-bg-inspector') {
                    e.stopPropagation();
                    if (InspectorManager.activeInspector === 'background') {
                        InspectorManager.stopInspector();
                    } else {
                        InspectorManager.startInspector('bg-filter', (selector) => {
                            this.searchTerm = selector;
                            UIManager.render();
                        });
                    }
                    return;
                }
                
                if (e.target.id === 'toggle-bg-collapse') {
                    const allSelectors = Object.keys(ThemeManager.currentStyles)
                        .filter(selector => isElementSuitableForBackground(selector));
                    const isAllCollapsed = allSelectors.every(selector => this.collapsedSelectors.has(selector));
                    
                    if (isAllCollapsed) {
                        this.collapsedSelectors.clear();
                    } else {
                        allSelectors.forEach(selector => this.collapsedSelectors.add(selector));
                    }
                    UIManager.render();
                    return;
                }

                if (e.target.id === 'filter-images-button') {
                    this.showOnlyWithBackground = !this.showOnlyWithBackground;
                    UIManager.render();
                    return;
                }
                
                if (e.target.id === 'clear-bg-filter') {
                    this.searchTerm = '';
                    UIManager.render();
                    return;
                }
            };

            container.addEventListener('change', this.handleBgChange);
            container.addEventListener('click', this.handleBgClick);

            const bgFilter = container.querySelector('#bg-filter');
            if (bgFilter) {
                const debouncedFilter = debounce(() => {
                    this.searchTerm = bgFilter.value;
                    UIManager.render();
                }, 750);
                
                bgFilter.addEventListener('input', debouncedFilter);
                bgFilter.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') debouncedFilter();
                });
            }
        },
        
        applyBackground(selector, imageData) {
            try {
                if (isExcludedElement(selector)) return;

                State.backgrounds.elements[selector] = imageData;
                
                if (!State.backgrounds.filters[selector]) {
                    State.backgrounds.filters[selector] = {};
                    Object.keys(CONFIG.BACKGROUND_FILTERS).forEach(filter => {
                        State.backgrounds.filters[selector][filter] = CONFIG.BACKGROUND_FILTERS[filter].default;
                    });
                }

                this.applyBackgroundsToDom();
                UIManager.render();
            } catch (e) {
                console.error(`Could not apply background to ${selector}`, e);
            }
        },

        applyBackgroundWithFallback(selector, imageData) {
            try {
                if (isExcludedElement(selector)) return;

                // Try ::before pseudo-element
                this.applyBackground(selector, imageData);
                
                // If ::before doesn't work, try I try direct background application
                setTimeout(() => {
                    const elements = document.querySelectorAll(selector);
                    let backgroundApplied = false;
                    
                    elements.forEach(element => {
                        const pseudoStyles = window.getComputedStyle(element, '::before');
                        if (pseudoStyles.backgroundImage === 'none' || 
                            !pseudoStyles.backgroundImage.includes('url')) {
                            
                            // Fallback to direct background
                            element.style.setProperty('background-image', `url('${imageData}')`, 'important');
                            element.style.setProperty('background-repeat', 'no-repeat', 'important');
                            element.style.setProperty('background-position', 'center', 'important');
                            element.style.setProperty('background-size', 'cover', 'important');
                            backgroundApplied = true;
                        }
                    });
                    
                    if (backgroundApplied) {
                        console.log(`Applied fallback background method for ${selector}`);
                    }
                }, 100);
                
            } catch (e) {
                console.error(`Could not apply background with fallback to ${selector}`, e);
            }
        },

        removeBackground(selector) {
            try {
                delete State.backgrounds.elements[selector];
                delete State.backgrounds.filters[selector];
                
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                    const originalBg = element.getAttribute('data-bltool-original-bg');
                    if (originalBg !== null) {
                        element.style.backgroundImage = originalBg || '';
                        element.removeAttribute('data-bltool-original-bg');
                    }
                    
                    element.style.removeProperty('background-repeat');
                    element.style.removeProperty('background-position');
                    element.style.removeProperty('background-size');
                });
                
                this.applyBackgroundsToDom();
                UIManager.render();
            } catch (e) {
                console.error(`Could not remove background from ${selector}`, e);
            }
        },

        applyFilter(selector, filter, value) {
            try {
                if (!State.backgrounds.filters[selector]) {
                    State.backgrounds.filters[selector] = {};
                }
                
                State.backgrounds.filters[selector][filter] = value;
                
                // Update preview image in real-time
                const previewImg = document.getElementById(`preview-${selector}`);
                if (previewImg) {
                    const filters = State.backgrounds.filters[selector] || {};
                    const filterString = Object.entries(filters)
                        .map(([f, val]) => {
                            const config = CONFIG.BACKGROUND_FILTERS[f];
                            return `${f}(${val}${config?.unit || ''})`;
                        })
                        .join(' ');
                    previewImg.style.filter = filterString;
                }
                
                this.applyBackgroundsToDom();
            } catch (e) {
                console.error(`Error applying filter to ${selector}:`, e);
            }
        },
        
        exportAllImages() {
            try {
                const images = Object.entries(State.backgrounds.elements);
                if (images.length === 0) {
                    alert('No background images to export.');
                    return;
                }

                const win = window.open('', '_blank', 'width=600,height=400,left=100,top=100');
                win.document.write(`
                    <html>
                        <head>
                            <title>Export Background Images</title>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    background-color: #1e1e1e;
                                    color: white;
                                    padding: 20px;
                                }
                                h1 {
                                    margin-top: 0;
                                }
                                ul {
                                    list-style: none;
                                    padding: 0;
                                }
                                li {
                                    margin-bottom: 10px;
                                }
                                a {
                                    color: #337ab7;
                                    text-decoration: none;
                                }
                                a:hover {
                                    text-decoration: underline;
                                }
                                button {
                                    background-color: #337ab7;
                                    color: white;
                                    border: none;
                                    padding: 10px 20px;
                                    cursor: pointer;
                                    margin-top: 20px;
                                }
                                button:hover {
                                    background-color: #286090;
                                }
                            </style>
                        </head>
                        <body>
                            <h1>Export Background Images</h1>
                            ${this.renderImageDownloadList()}
                            <button onclick="window.close()">Close</button>
                        </body>
                    </html>
                `);
                win.document.close();
            } catch (e) {
                console.error('Error preparing image download list:', e);
                alert('Error preparing image download list. Please try again.');
            }
        },
        
        renderImageDownloadList() {
            const images = Object.entries(State.backgrounds.elements);
            if (images.length === 0) {
                return '<p>No background images to display for download.</p>';
            }

            let html = '<ul>';
            images.forEach(([selector, imageData], index) => {
                const safeSelectorName = selector.replace(/[^a-zA-Z0-9_.-]/g, '_').substring(0, 50);
                html += `<li>
                    <span>${selector}:</span><br/>
                    <a href="${imageData}" download="background_${safeSelectorName}_${index + 1}.png">
                        Download Image ${index + 1}
                    </a>
                </li>`;
            });
            html += '</ul>';
            return html;
        },
        
        cleanup() {
            if (this.applyDebounce) {
                this.applyDebounce.cancel();
                this.applyDebounce = null;
            }
            
            this.handleBgChange = null;
            this.handleBgClick = null;
        }
    };

    // 3. PresetManager
 const PresetManager = {
    themes: {},
    currentTheme: 'Default Theme',
    unsavedChanges: false,
    
    init() {
        // Initialize with default theme
        this.themes['Default Theme'] = {
            metadata: {
                name: 'Default Theme',
                description: 'This is the KoboldAI Lite default theme.',
                creator: 'KoboldAI',
                date: new Date().toISOString(),
                classic: true,
                aesthetic: true,
                corpo: true
            },
            css: BLTOOLdynamicDefaultThemeCSS,
            backgrounds: {
                elements: {},
                filters: {}
            }
        };
        this.loadFromLocalStorage()
		this.applyTheme(this.currentTheme);
    },

    saveToLocalStorage() {
		let saveObj = {
			themes: this.themes,
			currentTheme: this.currentTheme
		}
		localStorage.setItem("BLTOOL_themestorage", JSON.stringify(saveObj))
	},

	loadFromLocalStorage() {
		let saveJson = localStorage.getItem("BLTOOL_themestorage")
		if (saveJson !== null)
		{
			let saveObj = JSON.parse(saveJson)
			this.themes = saveObj.themes,
			this.currentTheme = saveObj.currentTheme
		}
	},
    
    renderPresetsTab() {
	try {
			let optionsHtml = '';
			optionsHtml += `<option value="Default Theme" ${this.currentTheme === 'Default Theme' ? 'selected' : ''}>Default Theme</option>`;

			Object.keys(this.themes)
				.filter(name => name !== 'Default Theme')
				.forEach(name => {
					optionsHtml += `<option value="${name}" ${this.currentTheme === name ? 'selected' : ''}>${name}</option>`;
				});

			if (this.unsavedChanges) {
				optionsHtml += `<option value="unsaved" selected>Unsaved Changes</option>`;
			}

			const currentTheme = this.themes[this.currentTheme] || this.themes['Default Theme'];

			return `
				<div class="BLTOOL-scroll-container">
					<div class="BLTOOL-section">
						<div class="BLTOOL-section-header" data-section="theme-management">
							<span>Theme Management</span>
							<span>▼</span>
						</div>
						<div class="BLTOOL-section-content">
							<div style="margin-bottom: 10px;">
								<h4 style="margin-top: 0; margin-bottom: 5px;">Current Theme</h4>
								<select id="preset-select" style="width: 100%; padding: 5px; color: black; margin-bottom: 5px;">
									${optionsHtml}
								</select>
								<div style="display: flex; flex-wrap: wrap; gap: 5px;">
									<button id="apply-preset" class="BLTOOL-button" style="flex: 1 1 48%;">Apply Theme</button>
									<button id="save-preset" class="BLTOOL-button" style="flex: 1 1 48%;">Save Theme</button>
									<button id="delete-preset" class="BLTOOL-button" style="width: 100%; margin-top: 5px;">Delete Selected Theme</button>
								</div>
							</div>
						</div>
					</div>
					
					<div class="BLTOOL-section">
						<div class="BLTOOL-section-header" data-section="theme-info">
							<span>Theme Information</span>
							<span>▼</span>
						</div>
						<div class="BLTOOL-section-content">
							<div style="margin-bottom: 10px;">
								<input type="text" id="preset-name" placeholder="Theme Name (e.g., My Dark Mode)" 
									style="width: 100%; margin-bottom: 5px; color: black; padding: 4px; box-sizing: border-box;" 
									value="${currentTheme.metadata.name || ''}">
								<input type="text" id="preset-creator" placeholder="Author (e.g., Your Name)" 
									style="width: 100%; margin-bottom: 5px; color: black; padding: 4px; box-sizing: border-box;" 
									value="${currentTheme.metadata.creator || ''}">
								<textarea id="preset-description" placeholder="Theme Description (optional)" 
									style="width: 100%; height: 60px; resize: vertical; margin-bottom: 5px; color: black; padding: 4px; box-sizing: border-box;">${currentTheme.metadata.description || ''}</textarea>
								<div class="BLTOOL-checkbox-container">
									<h4 style="margin-top: 10px; margin-bottom: 5px;">Theme is compatible with:</h4>
									<label style="display: inline-block; margin-right: 10px;">
										<input type="checkbox" id="theme-classic" data-theme-type="classic" ${currentTheme.metadata.classic ? 'checked' : ''}> Classic
									</label>
									<label style="display: inline-block; margin-right: 10px;">
										<input type="checkbox" id="theme-aesthetic" data-theme-type="aesthetic" ${currentTheme.metadata.aesthetic ? 'checked' : ''}> Aesthetic
									</label>
									<label style="display: inline-block;">
										<input type="checkbox" id="theme-corpo" data-theme-type="corpo" ${currentTheme.metadata.corpo ? 'checked' : ''}> Corpo
									</label>
								</div>
							</div>
						</div>
					</div>
					
					<div class="BLTOOL-section">
						<div class="BLTOOL-section-header" data-section="theme-actions">
							<span>Theme Actions</span>
							<span>▼</span>
						</div>
						<div class="BLTOOL-section-content">
							<div style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 5px;">
								<button id="import-preset" class="BLTOOL-button" style="flex: 1 1 48%;">Import CSS</button>
								<button id="export-preset" class="BLTOOL-button" style="flex: 1 1 48%;">Export All</button>
								<button id="reset-to-default" class="BLTOOL-button" style="width: 100%;">Reset Everything</button>
							</div>
						</div>
					</div>
					
					<div class="BLTOOL-section">
						<div class="BLTOOL-section-header" data-section="export-actions">
							<span>Export Actions</span>
							<span>▼</span>
						</div>
						<div class="BLTOOL-section-content">
							<div style="display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 5px;">
								<button id="export-default" class="BLTOOL-button" style="flex: 1 1 48%;">Export Default</button>
								<button id="export-css-button" class="BLTOOL-button" style="flex: 1 1 48%;">Export Current</button>
								<button id="export-images" class="BLTOOL-button" style="width: 100%;">Export Images</button>
								<button id="show-css-button" class="BLTOOL-button" style="width: 100%;">Show CSS</button>
							</div>
						</div>
					</div>
				</div>
			`;
		} catch (e) {
			console.error('Error rendering presets tab:', e);
			return '<div style="color:red;">Error rendering presets tab. Check console for details.</div>';
		}
	},
    
    attachEventListeners() {
        const container = document.getElementById(TOOL_ID);
        if (!container) return;

        container.querySelector('#save-preset')?.addEventListener('click', () => {
            const name = document.getElementById('preset-name').value.trim();
            const description = document.getElementById('preset-description').value.trim();
            const creator = document.getElementById('preset-creator').value.trim();
            const classic = document.getElementById('theme-classic')?.checked || false;
            const aesthetic = document.getElementById('theme-aesthetic')?.checked || false;
            const corpo = document.getElementById('theme-corpo')?.checked || false;
            
            if (!name || name === 'Default Theme') {
                alert('Please enter a valid theme name (cannot be "Default Theme")');
                return;
            }
            
            this.saveCurrentChangesAsTheme(name, description, creator, classic, aesthetic, corpo);
        });

        container.querySelector('#apply-preset')?.addEventListener('click', () => {
            const selectedPreset = document.getElementById('preset-select').value;
            this.applyTheme(selectedPreset);
        });

        container.querySelector('#delete-preset')?.addEventListener('click', () => {
            const selectedPreset = document.getElementById('preset-select').value;
            if (selectedPreset && selectedPreset !== 'Default Theme') {
                this.deleteTheme(selectedPreset);
            } else {
                alert('Cannot delete the Default Theme');
            }
        });

        container.querySelector('#reset-to-default')?.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset everything? All saved themes will be deleted, and the UI will revert to the Default Theme.')) {
                this.resetEverything();
            }
        });

        container.querySelector('#import-preset')?.addEventListener('click', () => {
            this.importCSSFiles();
        });

        container.querySelector('#export-preset')?.addEventListener('click', () => {
            this.exportAllThemesAsCSS();
        });

        container.querySelector('#export-default')?.addEventListener('click', () => {
            this.exportDefaultThemeAsCSS();
        });

        container.querySelector('#export-css-button')?.addEventListener('click', () => {
            this.exportCurrentChangesAsCSS();
        });

        container.querySelector('#export-images')?.addEventListener('click', () => {
            BackgroundManager.exportAllImages();
        });

        container.querySelector('#show-css-button')?.addEventListener('click', () => {
            ThemeManager.showChanges();
        });

        const presetSelect = container.querySelector('#preset-select');
        if (presetSelect) {
            presetSelect.addEventListener('change', (e) => {
                this.updateThemeInfo(e.target.value);
            });
        }
    },
    
    resetEverything() {
        // Reset to default theme -> everything to start!
        this.themes = {
            'Default Theme': {
                metadata: {
                    name: 'Default Theme',
                    description: 'This is the KoboldAI Lite default theme.',
                    creator: 'KoboldAI',
                    date: new Date().toISOString(),
                    classic: true,
                    aesthetic: true,
                    corpo: true
                },
                css: BLTOOLdynamicDefaultThemeCSS,
                backgrounds: {
                    elements: {},
                    filters: {}
                }
            }
        };
        
        this.currentTheme = 'Default Theme';
        this.unsavedChanges = false;
        
        this.applyTheme('Default Theme');
        
        UIManager.dynamicStyleElement.textContent = '';
        
        State.backgrounds.elements = {};
        State.backgrounds.filters = {};
        BackgroundManager.applyBackgroundsToDom();
        
        UIManager.render();
    },
    
    applyTheme(themeName) {
        try {
            if (themeName === 'unsaved') return;

            const theme = this.themes[themeName];
            if (!theme) {
                console.warn(`Theme "${themeName}" not found`);
                return;
            }

            UIManager.dynamicStyleElement.textContent = theme.css;

            // JSON.parse(JSON.stringify()) led to recursion
            // found this:
            State.backgrounds.elements = {...(theme.backgrounds?.elements || {})};
            State.backgrounds.filters = Object.keys(theme.backgrounds?.filters || {}).reduce((acc, key) => {
                acc[key] = {...(theme.backgrounds.filters[key] || {})};
                return acc;
            }, {});

            BackgroundManager.applyBackgroundsToDom();
            this.currentTheme = themeName;
            this.unsavedChanges = false;
            this.saveToLocalStorage();
            UIManager.render();
        } catch (e) {
            console.error(`Error applying theme "${themeName}":`, e);
            // Fallback to default theme without recursion
            if (themeName !== 'Default Theme') {
                console.log('Falling back to default theme');
                const defaultTheme = this.themes['Default Theme'];
                UIManager.dynamicStyleElement.textContent = defaultTheme.css;
                State.backgrounds.elements = {};
                State.backgrounds.filters = {};
                BackgroundManager.applyBackgroundsToDom();
                this.currentTheme = 'Default Theme';
                this.unsavedChanges = false;
                this.saveToLocalStorage();
                UIManager.render();
            }
        }
    },
    
    saveCurrentChangesAsTheme(name, description = '', creator = '', classic = false, aesthetic = false, corpo = false) {
        try {
            const currentCSS = UIManager.dynamicStyleElement.textContent;
            
            const newTheme = {
                metadata: {
                    name: name.trim(),
                    description: description.trim(),
                    creator: creator.trim(),
                    date: new Date().toISOString(),
                    classic,
                    aesthetic,
                    corpo
                },
                css: currentCSS,
                backgrounds: {
                    elements: JSON.parse(JSON.stringify(State.backgrounds.elements)),
                    filters: JSON.parse(JSON.stringify(State.backgrounds.filters))
                }
            };
                
                let finalName = name;
                let counter = 1;
                while (this.themes[finalName]) {
                    finalName = `${name} (${counter})`;
                    counter++;
                }
                
                this.themes[finalName] = newTheme;
                this.currentTheme = finalName;
                this.unsavedChanges = false;
                
                this.saveToLocalStorage();
                UIManager.render();
                return true;
            } catch (e) {
                console.error('Error saving theme:', e);
                alert('Error saving theme: ' + e.message);
                return false;
            }
        },
        
        deleteTheme(themeName) {
            try {
                if (!this.themes[themeName]) {
                    console.warn(`Theme "${themeName}" not found`);
                    return;
                }

                if (confirm(`Are you sure you want to delete the theme "${themeName}"?`)) {
                    delete this.themes[themeName];
                    
                    if (this.currentTheme === themeName) {
                        this.applyTheme('Default Theme');
                    }
                    
                    this.saveToLocalStorage();
                    UIManager.render();
                }
            } catch (e) {
                console.error(`Error deleting theme "${themeName}":`, e);
                alert('Error deleting theme: ' + e.message);
            }
        },
        
        importCSSFiles() {
            try {
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = '.css';
                fileInput.multiple = true;
                fileInput.style.display = 'none';
                document.body.appendChild(fileInput);

                fileInput.addEventListener('change', (e) => {
                    if (e.target.files && e.target.files.length > 0) {
                        let importedCount = 0;
                        
                        Array.from(e.target.files).forEach(file => {
                            if (file.name.endsWith('.css')) {
                                const reader = new FileReader();
                                
                                reader.onload = (event) => {
                                    try {
                                        const cssContent = event.target.result;
                                        const themeName = file.name.replace('.css', '').replace(/^theme-/, '');
                                        
                                        const newTheme = {
                                            metadata: {
                                                name: themeName,
                                                description: 'Imported from ' + file.name,
                                                creator: 'Imported',
                                                date: new Date().toISOString(),
                                                classic: true,
                                                aesthetic: true,
                                                corpo: true
                                            },
                                            css: cssContent,
                                            backgrounds: {
                                                elements: {},
                                                filters: {}
                                            }
                                        };
                                        
                                        let finalName = themeName;
                                        let counter = 1;
                                        while (this.themes[finalName]) {
                                            finalName = `${themeName} (${counter})`;
                                            counter++;
                                        }
                                        
                                        this.themes[finalName] = newTheme;
                                        importedCount++;
                                        
                                        if (importedCount === e.target.files.length) {
                                            UIManager.render();
                                            alert(`Successfully imported ${importedCount} themes.`);
                                        }
                                    } catch (err) {
                                        console.error(`Error processing CSS file ${file.name}:`, err);
                                    }
                                };
                                
                                reader.readAsText(file);
                            }
                        });
                    }
                    document.body.removeChild(fileInput);
                });

                fileInput.click();
            } catch (e) {
                console.error('Error importing CSS files:', e);
                alert('Error importing CSS files: ' + e.message);
            }
        },
        
        exportAllThemesAsCSS() {
            try {
                const themes = { ...this.themes };
                themes['Default Theme'] = this.getDefaultThemeData();

                let downloadCount = 0;
                const totalThemes = Object.keys(themes).length;

                Object.entries(themes).forEach(([themeName, themeData], index) => {
                    setTimeout(() => {
                        const css = this.convertThemeToCSS(themeData);
                        const safeFileName = themeName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                        
                        const blob = new Blob([css], { type: 'text/css' });
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(blob);
                        link.download = `theme-${safeFileName || 'unnamed'}.css`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        URL.revokeObjectURL(link.href);
                        
                        downloadCount++;
                        if (downloadCount === totalThemes) {
                            alert(`Successfully exported ${totalThemes} themes as CSS files.`);
                        }
                    }, index * 500);
                });
            } catch (e) {
                console.error('Error exporting all themes as CSS:', e);
                alert('Error exporting themes: ' + e.message);
            }
        },
        
        exportDefaultThemeAsCSS() {
            try {
                const defaultThemeData = this.getDefaultThemeData();
                const css = this.convertThemeToCSS(defaultThemeData);
                
                const blob = new Blob([css], { type: 'text/css' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'theme-default.css';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
            } catch (e) {
                console.error('Error exporting default theme as CSS:', e);
                alert('Error exporting default theme: ' + e.message);
            }
        },
        
        exportCurrentChangesAsCSS() {
            try {
                const currentTheme = this.themes[this.currentTheme] || this.themes['Default Theme'];
                const classic = document.getElementById('theme-classic')?.checked || false;
                const aesthetic = document.getElementById('theme-aesthetic')?.checked || false;
                const corpo = document.getElementById('theme-corpo')?.checked || false;
                
                let cssText = `/*\nTheme: ${document.getElementById('preset-name')?.value || 'Custom'}\n`;
                cssText += `Creator: ${document.getElementById('preset-creator')?.value || 'Anonymous'}\n`;
                cssText += `Description: ${document.getElementById('preset-description')?.value || 'No description'}\n`;
                cssText += `Compatibility: ${classic ? 'Classic' : ''}${aesthetic ? (classic ? ', Aesthetic' : 'Aesthetic') : ''}${corpo ? ((classic || aesthetic) ? ', Corpo' : 'Corpo') : ''}\n`;
                cssText += `Date: ${new Date().toISOString()}\n*/\n\n`;
                cssText += UIManager.dynamicStyleElement.textContent;

                let bgCss = '';
                Object.entries(State.backgrounds.elements).forEach(([selector, imageData]) => {
                    if (imageData) {
                        bgCss += `${selector} {\n`;
                        bgCss += `  background-image: url('${imageData}');\n`;
                        bgCss += `  background-size: cover;\n`;
                        bgCss += `  background-position: center;\n`;
                        
                        const filters = State.backgrounds.filters[selector] || {};
                        Object.entries(filters).forEach(([filter, value]) => {
                            const config = CONFIG.BACKGROUND_FILTERS[filter];
                            if (value !== config.default) {
                                bgCss += `  ${filter}: ${value}${config.unit};\n`;
                            }
                        });
                        
                        bgCss += '}\n\n';
                    }
                });

                if (bgCss) {
                    cssText += '\n/* Background Styles */\n' + bgCss;
                }

                const blob = new Blob([cssText], { type: 'text/css' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'blacklite-custom-theme.css';
                link.click();
                URL.revokeObjectURL(link.href);
            } catch (error) {
                console.error('Error exporting CSS:', error);
            }
        },
        
        convertThemeToCSS(themeData) {
            try {
                let css = `/* Theme: ${themeData.metadata.name} */\n`;
                css += `/* Creator: ${themeData.metadata.creator} */\n`;
                css += `/* Description: ${themeData.metadata.description} */\n`;
                css += `/* Compatibility: ${themeData.metadata.classic ? 'Classic' : ''}${themeData.metadata.aesthetic ? (themeData.metadata.classic ? ', Aesthetic' : 'Aesthetic') : ''}${themeData.metadata.corpo ? ((themeData.metadata.classic || themeData.metadata.aesthetic) ? ', Corpo' : 'Corpo') : ''} */\n`;
                css += `/* Date: ${themeData.metadata.date} */\n\n`;
                css += themeData.css;
                
                if (themeData.backgrounds && themeData.backgrounds.elements) {
                    css += '\n/* Background Styles */\n';
                    Object.entries(themeData.backgrounds.elements).forEach(([selector, imageData]) => {
                        if (imageData) {
                            css += `${selector} {\n`;
                            css += `  background-image: url('${imageData}');\n`;
                            css += `  background-size: cover;\n`;
                            css += `  background-position: center;\n`;
                            
                            const filters = themeData.backgrounds.filters[selector] || {};
                            Object.entries(filters).forEach(([filter, value]) => {
                                const config = CONFIG.BACKGROUND_FILTERS[filter];
                                if (value !== config.default) {
                                    css += `  ${filter}: ${value}${config.unit};\n`;
                                }
                            });
                            
                            css += '}\n\n';
                        }
                    });
                }

                return css;
            } catch (e) {
                console.error('Error converting theme to CSS:', e);
                return `/* Error converting theme to CSS: ${e.message} */`;
            }
        },
        
        getDefaultThemeData() {
            return {
                metadata: {
                    name: 'Default Theme',
                    description: 'This is the KoboldAI Lite default theme.',
                    creator: 'KoboldAI',
                    date: new Date().toISOString(),
                    classic: true,
                    aesthetic: true,
                    corpo: true
                },
                css: BLTOOLdynamicDefaultThemeCSS,
                backgrounds: {
                    elements: {},
                    filters: {}
                }
            };
        },
        
        updateThemeInfo(themeName) {
            try {
                const nameInput = document.getElementById('preset-name');
                const creatorInput = document.getElementById('preset-creator');
                const descriptionInput = document.getElementById('preset-description');
                const classicCheckbox = document.getElementById('theme-classic');
                const aestheticCheckbox = document.getElementById('theme-aesthetic');
                const corpoCheckbox = document.getElementById('theme-corpo');

                if (themeName === 'unsaved') {
                    if (nameInput) nameInput.value = 'unsaved changes';
                    if (creatorInput) creatorInput.value = '';
                    if (descriptionInput) descriptionInput.value = '';
                    if (classicCheckbox) classicCheckbox.checked = false;
                    if (aestheticCheckbox) aestheticCheckbox.checked = false;
                    if (corpoCheckbox) corpoCheckbox.checked = false;
                    return;
                }

                const theme = this.themes[themeName];
                if (theme && theme.metadata) {
                    if (nameInput) nameInput.value = theme.metadata.name || '';
                    if (creatorInput) creatorInput.value = theme.metadata.creator || '';
                    if (descriptionInput) descriptionInput.value = theme.metadata.description || '';
                    if (classicCheckbox) classicCheckbox.checked = theme.metadata.classic || false;
                    if (aestheticCheckbox) aestheticCheckbox.checked = theme.metadata.aesthetic || false;
                    if (corpoCheckbox) corpoCheckbox.checked = theme.metadata.corpo || false;
                }
            } catch (e) {
                console.error('Error updating theme info:', e);
            }
        },
        
        markAsUnsaved() {
            if (this.currentTheme !== 'unsaved') {
                this.unsavedChanges = true;
                UIManager.render();
            }
        }
    };

    window.initBlackliteTools = function () {
        console.log('Initializing Blacklite Tools');
        try {
            // First create the tool container and set up base styles
            UIManager.createToolContainer();
            UIManager.setupBaseStyles();
            
            // Then initialize managers
            ThemeManager.init();
            BackgroundManager.init();
            PresetManager.init();
            
            // Render after a brief delay
            setTimeout(() => {
                UIManager.render();
                console.log('Initial render complete');
            }, 100);
            
            window.blackliteToolsInitialized = true;
        } catch (error) {
            console.error('Error initializing Blacklite Tools:', error);
        }
    };

    window.cleanupBlackliteTools = function() {
        console.log('Cleaning up Blacklite Tools');
        try {
            ThemeManager.cleanup();
            BackgroundManager.cleanup();
            InspectorManager.cleanup();
            UIManager.cleanup();
            
            document.querySelectorAll('style[id^="bltool"]').forEach(el => {
                if (el.id !== 'bltool-default-styles' && el.id !== 'bltool-tool-styles') {
                    el.remove();
                }
            });
            
            window.blackliteToolsInitialized = false;
        } catch (error) {
            console.error('Error during cleanup:', error);
        }
    };

    // IMPORTANT: only this type of instanciation works for user mod
    window.initBlackliteTools();

    window.addEventListener('beforeunload', () => {
        window.cleanupBlackliteTools();
    });
})();