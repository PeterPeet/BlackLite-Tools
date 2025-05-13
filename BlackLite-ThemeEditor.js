/*
 * BlackLite-ThemeEditor for KoboldAI Lite
 *
 * IMPORTANT INJECTION NOTES:
 * For KoboldAI Lite, only two injection methods work reliably:
 *
 * Method 1: setTimeout Injection
 * setTimeout(() => {
 *     // Your code here
 * }, 1000);
 *
 * Method 2: Self-executing function with global export
 * (function() {
 *     window.yourGlobalFunction = function() { ... };
 *     window.yourGlobalFunction(); // Execute immediately
 * })();
 *
 * This script uses the self-executing function with global export approach for reliability.
 * DO NOT MODIFY INJECTION METHOD without testing on KoboldAI Lite.
 */

(function() {
	 if (window.koboldaiThemeEditorInitialized) return;
	 window.koboldaiThemeEditorInitialized = true;
	 
	 const preservedStyles = [
		 'background-color', 'color', 'border-color',
		 'fill', 'stroke', 'font-size', 'border-radius',
		 'padding', 'margin', 'width', 'height'
	 ];
	 
	 const themeEditorContainer = document.createElement('div');
	 themeEditorContainer.id = 'koboldai-theme-editor';
	 themeEditorContainer.style.cssText = `
		position: fixed;
		top: 50px;
		right: 20px;
		width: 350px;
		height: 640px;
		background-color: #1e1e1e;
		color: white;
		border-radius: 8px;
		box-shadow: 0 4px 6px rgba(0,0,0,0.1);
		z-index: 2000;
		padding: 5px 10px;
		font-family: sans-serif;
		overflow: hidden;
	`;
	 
	 const ThemeManager = {
		 originalStyles: {},
		 currentStyles: {},
		 searchTerm: '',
		 collapsedSelectors: new Set(),
		 scrollPosition: 0,
		 inspectorActive: false,
		 
		 init() {
			 this.originalStyles = {};
			 this.currentStyles = {};
			 this.collapsedSelectors.clear();
			 this.scrollPosition = 0;
			 this.inspectorActive = false;
			 
			 // Add click listener to capture element selection
			 document.addEventListener('click', this.handleClick.bind(this));
			 
			 // Store original element selectors and their styles
			 const sensitiveSelectors = ['body', 'html', 'head', '#koboldai-theme-editor'];
			 const elements = document.body.getElementsByTagName('*');
			 
			 for (let el of elements) {
				 const selector = this.generateUniqueSelector(el);
				 if (sensitiveSelectors.some(s => selector.includes(s))) continue;
				 
				 const computedStyle = window.getComputedStyle(el);
				 this.originalStyles[selector] = {};
				 this.currentStyles[selector] = {};
				 
				 preservedStyles.forEach(prop => {
					 const value = computedStyle.getPropertyValue(prop);
					 if (value) {
						 this.originalStyles[selector][prop] = value;
						 this.currentStyles[selector][prop] = value;
					 }
				 });
			 }
			 
			 Object.keys(this.originalStyles).forEach(selector => {
				 this.collapsedSelectors.add(selector);
			 });
			 
			 this.renderEditor();
		 },
		 
		 generateUniqueSelector(element) {
			 if (element.id) return `#${element.id}`;
			 if (element.className) return '.' + element.className.split(' ')[0];
			 return element.tagName.toLowerCase();
		 },
		 
		 handleClick(event) {
			 // Skip processing for elements inside the theme editor
			 if (event.target.closest('#koboldai-theme-editor') && !event.target.classList.contains('selector-toggle')) {
				 return;
			 }
			 
			 if (!this.inspectorActive) return;
			 
			 const selector = this.generateUniqueSelector(event.target);
			 this.searchTerm = selector;
			 this.renderEditor();
		 },
		 
		 reset() {
			 const changedStyles = {};
			 
			 Object.keys(this.currentStyles).forEach(selector => {
				 const current = this.currentStyles[selector];
				 const original = this.originalStyles[selector];
				 
				 if (!original) return;
				 
				 changedStyles[selector] = {};
				 Object.keys(current).forEach(prop => {
					 if (current[prop] !== original[prop]) {
						 changedStyles[selector][prop] = original[prop];
					 }
				 });
			 });
			 
			 this.currentStyles = JSON.parse(JSON.stringify(this.originalStyles));
			 
			 Object.keys(changedStyles).forEach(selector => {
				 try {
					 const elements = document.querySelectorAll(selector);
					 elements.forEach(el => {
						 if (el) {
							 const styles = changedStyles[selector];
							 Object.entries(styles).forEach(([prop, value]) => {
								 el.style[prop] = value;
							 });
						 }
					 });
				 } catch (e) {
					 console.warn(`Could not reset styles for selector: ${selector}`, e);
				 }
			 });
			 
			 this.renderEditor();
		 },
		 
		 exportCSS() {
			 let cssText = '/* BlackLite Custom Theme */\n';
			 Object.keys(this.currentStyles).forEach(selector => {
				 const styles = this.currentStyles[selector];
				 const originalStyles = this.originalStyles[selector];
				 const validStyles = Object.keys(styles).filter(prop =>
																styles[prop] !== originalStyles[prop]
																);
				 
				 if (validStyles.length > 0) {
					 cssText += `${selector} {\n`;
					 validStyles.forEach(prop => {
						 cssText += `  ${prop}: ${styles[prop]};\n`;
					 });
					 cssText += '}\n\n';
				 }
			 });
			 
			 const blob = new Blob([cssText], {type: 'text/css'});
			 const link = document.createElement('a');
			 link.href = URL.createObjectURL(blob);
			 link.download = 'blacklite-custom-theme.css';
			 link.click();
		 },
		 
		 showChanges() {
			 let cssText = '/* BlackLite Custom Theme */\n';
			 Object.keys(this.currentStyles).forEach(selector => {
				 const styles = this.currentStyles[selector];
				 const originalStyles = this.originalStyles[selector];
				 const validStyles = Object.keys(styles).filter(prop =>
																styles[prop] !== originalStyles[prop]
																);
				 
				 if (validStyles.length > 0) {
					 cssText += `${selector} {\n`;
					 validStyles.forEach(prop => {
						 cssText += `  ${prop}: ${styles[prop]};\n`;
					 });
					 cssText += '}\n\n';
				 }
			 });
			 
			 const win = window.open('', '_blank', 'width=600,height=400');
			 win.document.write(`<pre style="color: #aaa;">${cssText}</pre>`);
			 win.document.close();
		 },
		 
		 renderEditor() {
			 const scrollContainer = themeEditorContainer.querySelector('.scroll-container');
			 if (scrollContainer) {
				 const toggles = scrollContainer.querySelectorAll('.selector-toggle');
				 toggles.forEach(toggle => {
					 toggle.addEventListener('click', () => {
						 const selector = toggle.dataset.selector;
						 if (ThemeManager.collapsedSelectors.has(selector)) {
							 ThemeManager.collapsedSelectors.delete(selector);
						 } else {
							 ThemeManager.collapsedSelectors.add(selector);
						 }
						 ThemeManager.renderEditor();
					 });
				 });
			 }
			 this.scrollPosition = scrollContainer ? scrollContainer.scrollTop : 0;
			 
			 themeEditorContainer.innerHTML = `
				<div style="margin-bottom: 5px;">
					<h3 style="font-size: 28px; margin: 0; padding: 0; width: 100%;">BlackLite Theme-Editor</h3>
				</div>
				<div style="display: flex; margin-bottom: 5px;">
					<input type="text" id="theme-filter" placeholder="Filter..." style="flex:1; padding: 5px; color: black;" value="${this.searchTerm}">
					<button id="apply-filter" style="
						padding: 5px 10px;
						color: white;
						background-color: #129c00;
						border: 1px solid #2e6da4;
						cursor: pointer;
					">GO</button>
				</div>
				<div style="margin-bottom: 5px;">
					<button id="toggle-inspector" style="
						padding: 5px 10px;
						color: white;
						background-color: #129c00;
						border: none;
						cursor: pointer;
						margin-right: 5px;
					">{{inspectorLabel}}</button>
					<button id="toggle-collapse" style="
						padding: 5px 10px;
						color: white;
						background-color: #337ab7;
						border: none;
						cursor: pointer;
						margin-right: 5px;
					">{{collapseLabel}}</button>
					<button id="reset-button" style="
						padding: 5px 10px;
						color: white;
						background-color: #337ab7;
						border: 1px solid #2e6da4;
						cursor: pointer;
						margin-right: 5px;
					">RESET</button>
					<button id="show-css-button" style="
						padding: 5px 10px;
						color: white;
						background-color: #337ab7;
						border: 1px solid #2e6da4;
						cursor: pointer;
						margin-right: 5px;
					">Show CSS</button>
					<button id="export-css-button" style="
						padding: 5px 10px;
						color: white;
						background-color: #337ab7;
						border: 1px solid #2e6da4;
						cursor: pointer;
					">Export CSS</button>
					<button id="scroll-top" style="padding: 5px; background-color: #337ab7; border: none; cursor: pointer;">↑</button>
					<button id="scroll-bottom" style="padding: 5px; background-color: #337ab7; border: none; cursor: pointer;">↓</button>
				</div>
				<div class="scroll-container" style="max-height: 475px; overflow-y: auto;">
					${this.renderStyleGroups()}
				</div>
			`;
			 
			 // Replace placeholders
			 const inspectorButton = themeEditorContainer.querySelector('#toggle-inspector');
			 const collapseButton = themeEditorContainer.querySelector('#toggle-collapse');
			 
			 inspectorButton.textContent = this.inspectorActive ? 'Turn 🔍 OFF' : 'Turn 🔍 ON';
			 collapseButton.textContent = this.collapsedSelectors.size === Object.keys(this.originalStyles).length
			 ? 'Open ALL'
			 : 'Close ALL';
			 
			 const newScrollContainer = themeEditorContainer.querySelector('.scroll-container');
			 if (newScrollContainer) {
				 newScrollContainer.scrollTop = this.scrollPosition;
			 }
			 
			 this.attachEventListeners();
		 },
		 
		 attachEventListeners() {
			 const scrollContainer = themeEditorContainer.querySelector('.scroll-container');
			 
			 document.getElementById('toggle-inspector').addEventListener('click', () => {
				 const wasActive = this.inspectorActive;
				 this.inspectorActive = !this.inspectorActive;
				 
				 if (!this.inspectorActive) {
					 // this.searchTerm = '';  ← Remove this line
					 //this.collapsedSelectors.clear();
					 //Object.keys(this.originalStyles).forEach(selector => {
					 //    this.collapsedSelectors.add(selector);
					 //});
					 
				 } else {
					 // Clear collapsedSelectors to expand all when turning on
					 this.collapsedSelectors.clear();
				 }
				 
				 this.renderEditor();
			 });
			 
			 document.getElementById('toggle-collapse').addEventListener('click', () => {
				 const allSelectors = Object.keys(this.originalStyles);
				 const isAllCollapsed = allSelectors.every(selector => this.collapsedSelectors.has(selector));
				 
				 if (isAllCollapsed) {
					 this.collapsedSelectors.clear();
				 } else {
					 this.collapsedSelectors.clear();
					 allSelectors.forEach(selector => this.collapsedSelectors.add(selector));
				 }
				 
				 this.renderEditor();
			 });
			 
			 document.getElementById('reset-button').addEventListener('click', () => this.reset());
			 document.getElementById('show-css-button').addEventListener('click', () => this.showChanges());
			 document.getElementById('export-css-button').addEventListener('click', () => this.exportCSS());
			 
			 document.getElementById('apply-filter').addEventListener('click', () => {
				 this.searchTerm = document.getElementById('theme-filter').value;
				 this.updateFilterResults();
				 this.renderEditor();
			 });
			 
			 document.getElementById('theme-filter').addEventListener('keypress', (e) => {
				 if (e.key === 'Enter') {
					 this.searchTerm = document.getElementById('theme-filter').value;
					 this.updateFilterResults();
					 this.renderEditor();
				 }
			 });
			 
			 document.getElementById('scroll-top').addEventListener('click', () => {
				 if (scrollContainer) scrollContainer.scrollTop = 0;
			 });
			 
			 document.getElementById('scroll-bottom').addEventListener('click', () => {
				 if (scrollContainer) scrollContainer.scrollTop = scrollContainer.scrollHeight;
			 });
			 
			 const toggles = document.querySelectorAll('.selector-toggle');
			 toggles.forEach(toggle => {
				 toggle.addEventListener('click', () => {
					 const selector = toggle.dataset.selector;
					 if (this.collapsedSelectors.has(selector)) {
						 this.collapsedSelectors.delete(selector);
					 } else {
						 this.collapsedSelectors.add(selector);
					 }
					 this.renderEditor();
				 });
			 });
		 },
		 
		 renderStyleGroups() {
			 const allSelectors = Object.keys(this.currentStyles);
			 
			 return allSelectors.map(selector => {
				 const isCollapsed = this.collapsedSelectors.has(selector);
				 const styles = this.currentStyles[selector];
				 
				 const filteredProps = Object.keys(styles).filter(prop => this.matchesFilter(prop, selector));
				 
				 if (filteredProps.length === 0 && this.searchTerm && !this.matchesFilter("", selector)) {
					 return '';
				 }
				 
				 return `
						<div style="margin-top: 5px;">
						<div class="selector-toggle" data-selector="${selector}" 
							 style="cursor: pointer; padding: 5px; background-color: #2e2e2e; color: white;">
							${selector}
							<span style="float:right;">${isCollapsed ? '▶' : '▼'}</span>
						</div>
						${isCollapsed ? '' : `
				 <div style="background-color: #3e3e3e; margin: 5px 0; padding: 5px;">
				 ${filteredProps.map(prop => `
									<div style="display: flex; align-items: center; margin: 5px 0;">
										<span style="flex-grow: 1; margin-right: 10px; color: #aaa;">${prop}</span>
										<input 
											type="${prop.includes('color') ? 'color' : 'text'}" 
											value="${this.currentStyles[selector][prop]}" 
											style="width: 100px; padding: 2px; color: black;"
											onchange="window.koboldaiThemeEditor.updateStyle('${selector}', '${prop}', this.value)"
										>
									</div>
								`).join('')}
				 </div>
						`}
					</div>
				`;
			 }).join('');
		 },
		 
		 updateFilterResults() {
			 if (!this.searchTerm.trim()) return;
			 
			 // Clear all previous collapses for this search
			 this.collapsedSelectors.clear();
			 
			 Object.keys(this.currentStyles).forEach(selector => {
				 const styles = this.currentStyles[selector];
				 const hasMatchingProp = Object.keys(styles).some(prop => this.matchesFilter(prop, selector));
				 const selectorMatches = this.matchesFilter("", selector);
				 
				 if (hasMatchingProp || selectorMatches) {
					 this.collapsedSelectors.add(selector);
				 }
			 });
		 },
		 
		 matchesFilter(prop, selector) {
			 if (!this.searchTerm) return true;
			 
			 const sanitizedTerm = this.searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&').replace(/\*/g, '.*');
			 const pattern = new RegExp(`.*${sanitizedTerm}.*`, 'i');
			 
			 if (pattern.test(prop)) return true;
			 if (selector && pattern.test(selector)) return true;
			 
			 return false;
		 }
	 };
	 
	 function initThemeEditor() {
		 document.body.appendChild(themeEditorContainer);
		 
		 window.koboldaiThemeEditor = {
			 updateStyle: (selector, prop, value) => {
				 try {
					 ThemeManager.currentStyles[selector][prop] = value;
					 const elements = document.querySelectorAll(selector);
					 elements.forEach(el => {
						 el.style[prop] = value;
					 });
				 } catch (err) {
					 console.warn(`Could not update style ${prop} for ${selector}`, err);
				 }
			 },
			 reset: () => ThemeManager.reset(),
			 exportCSS: () => ThemeManager.exportCSS()
		 };
		 
		 ThemeManager.init();
	 }
	 
	 initThemeEditor();
 })();
