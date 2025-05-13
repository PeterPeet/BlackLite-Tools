 (function() {
 if (window.blackliteToolsInitialized)
	 return;
 window.blackliteToolsInitialized = true;

 const preservedStyles = [
	 'background-color', 'color', 'border-color', 'fill', 'stroke', 'font-size',
	 'border-radius', 'padding', 'margin', 'width', 'height'
 ];

 const unsuitableForBackground = [
	 'input', 'select', 'option', 'small', 'pre', 'a', 'label', 'h1', 'h2', 'h3',
	 'h4', 'h5', 'h6', 'p', 'li'
 ];

 const toolsContainer = document.createElement('div');
 toolsContainer.id = 'blacklite-tools';
 toolsContainer.style.cssText = `
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

 // Append the container to the DOM
 document.body.appendChild(toolsContainer);

 // Global state
 const State = {
	 activeTab : 'theme', // 'theme', 'backgrounds', 'presets'
	 themes : {
		 default : null,
		 savedThemes : {},
		 activeTheme : 'unsaved'
	 },
	 backgrounds : {
		 elements : {}, // Stores element selector -> background image data
		 filters : {}   // Stores filters applied to elements
	 }
 };

 const PresetManager = {
	 attachEventListeners() {
		 // Handle preset actions
		 const saveButton = document.getElementById('save-preset');
		 const exportButton = document.getElementById('export-preset');
		 const importButton = document.getElementById('import-preset');
		 const deleteButton = document.getElementById('delete-preset');
		 const presetSelect = document.getElementById('preset-select');

		 if (saveButton) {
			 saveButton.addEventListener('click', () => {
				 const presetName =
					 document.getElementById('preset-name').value.trim();
				 if (presetName) {
					 this.savePreset(presetName);
					 ThemeManager.renderThemeEditor();
				 } else {
					 alert('Please enter a preset name');
				 }
			 });
		 }
			 
		 if (exportButton) {
			 exportButton.addEventListener('click', () => {
				 const selectedPreset = presetSelect.value;
				 if (selectedPreset && selectedPreset !== 'unsaved') {
					 this.exportPreset(selectedPreset);
				 } else {
					 alert('Please select a saved preset to export');
				 }
			 });
		 }

		 if (importButton) {
			 importButton.addEventListener('click', () => {
				 const fileInput = document.createElement('input');
				 fileInput.type = 'file';
				 fileInput.accept = '.css';
				 fileInput.style.display = 'none';
				 document.body.appendChild(fileInput);

				 fileInput.addEventListener('change', (e) => {
					 if (e.target.files && e.target.files[0]) {
						 const file = e.target.files[0];
						 const reader = new FileReader();

						 reader.onload = (e) => {
							 try {
								 const cssText = e.target.result;
								 const styleSheet = new CSSStyleSheet();
								 styleSheet.replaceSync(cssText);

								 // Parse and apply only valid styles
								 Array.from(styleSheet.cssRules)
									 .forEach(rule => {
										 if (rule.type === CSSRule.STYLE_RULE) {
											 const selector = rule.selectorText;
											 const styles = {};

											 for (let i = 0;
												  i < rule.style.length; i++) {
												 const prop = rule.style[i];
												 const value =
													 rule.style.getPropertyValue(
														 prop);

												 if (preservedStyles.includes(
														 prop)) {
													 styles[prop] = value;
												 }
											 }

											 if (Object.keys(styles).length >
												 0) {
												 ThemeManager
													 .currentStyles[selector] = {
													 ...ThemeManager
														 .currentStyles
															 [selector],
													 ...styles
												 };

												 // Apply to DOM
												 const elements =
													 document.querySelectorAll(
														 selector);
												 elements.forEach(el => {
													 Object.entries(styles)
														 .forEach(
															 ([ prop, val ]) => {
																 el.style[prop] =
																	 val;
															 });
												 });
											 }
										 }
									 });

								 State.themes.activeTheme = 'unsaved';
								 ThemeManager.renderThemeEditor();
							 } catch (err) {
								 alert('Invalid CSS file');
								 console.error('Error importing CSS:', err);
							 }
						 };

						 reader.readAsText(file);
					 }
					 document.body.removeChild(fileInput);
				 });

				 fileInput.click();
			 });
		 }

		 if (deleteButton) {
			 deleteButton.addEventListener('click', () => {
				 const selectedPreset = presetSelect.value;
				 if (selectedPreset && selectedPreset !== 'unsaved') {
					 if (confirm(`Are you sure you want to delete the preset "${
							 selectedPreset}"?`)) {
						 delete State.themes.savedThemes[selectedPreset];
						 State.themes.activeTheme = 'unsaved';
						 ThemeManager.renderThemeEditor();
					 }
				 } else {
					 alert('Please select a saved preset to delete');
				 }
			 });
		 }

		 if (presetSelect) {
			 presetSelect.addEventListener('change', (e) => {
				 const selectedPreset = e.target.value;
				 if (selectedPreset && selectedPreset !== 'unsaved') {
					 this.applyPreset(selectedPreset);
				 }
			 });
		 }
	 },

	 savePreset(name) {
		 const preset = {
			 styles : JSON.parse(JSON.stringify(ThemeManager.currentStyles)),
			 backgrounds : {
				 elements :
					 JSON.parse(JSON.stringify(State.backgrounds.elements)),
				 filters : JSON.parse(JSON.stringify(State.backgrounds.filters))
			 }
		 };

		 State.themes.savedThemes[name] = preset;
		 State.themes.activeTheme = name;
	 },

	 exportPreset(presetName) {
		 const preset = State.themes.savedThemes[presetName];
		 if (!preset)
			 return;

		 const exportData = {
			 name : presetName,
			 version : '1.0',
			 timestamp : new Date().toISOString(),
			 data : preset
		 };

		 const blob = new Blob([ JSON.stringify(exportData, null, 2) ],
							   {type : 'application/json'});
		 const link = document.createElement('a');
		 link.href = URL.createObjectURL(blob);
		 link.download = `blacklite-theme-${
			 presetName.toLowerCase().replace(/\s+/g, '-')}.json`;
		 link.click();
	 },
	 
	 renderPresetsTab() {
	   return `
	 <div style="padding: 10px;">
	 <h4>Preset Management (Coming Soon)</h4>
	 <p>This section will allow you to save, load, and manage custom themes.</p>
	 </div>
	 `;
	 },
	 
	 applyPreset(presetName) {
		 const preset = State.themes.savedThemes[presetName];
		 if (!preset)
			 return;

		 // Apply styles
		 ThemeManager.currentStyles = JSON.parse(JSON.stringify(preset.styles));

		 Object.keys(ThemeManager.currentStyles).forEach(selector => {
			 try {
				 const elements = document.querySelectorAll(selector);
				 elements.forEach(el => {
					 if (el) {
						 const styles = ThemeManager.currentStyles[selector];
						 Object.entries(styles).forEach(
							 ([ prop, value ]) => { el.style[prop] = value; });
					 }
				 });
			 } catch (e) {
				 console.warn(`Could not apply style for selector: ${selector}`,
							  e);
			 }
		 });

		 // Apply backgrounds
		 BackgroundManager.reset(); // Clear current backgrounds first

		 if (preset.backgrounds && preset.backgrounds.elements) {
			 State.backgrounds.elements =
				 JSON.parse(JSON.stringify(preset.backgrounds.elements));
			 State.backgrounds.filters =
				 JSON.parse(JSON.stringify(preset.backgrounds.filters || {}));

			 // Apply backgrounds to DOM
			 Object.keys(State.backgrounds.elements).forEach(selector => {
				 const imageData = State.backgrounds.elements[selector];
				 if (imageData) {
					 BackgroundManager.applyBackground(selector, imageData);

					 // Apply filters if any
					 const filter = State.backgrounds.filters[selector];
					 if (filter) {
						 try {
							 const elements =
								 document.querySelectorAll(selector);
							 elements.forEach(
								 el => { el.style.filter = filter; });
						 } catch (e) {
							 console.warn(
								 `Could not apply filter to ${selector}`, e);
						 }
					 }
				 }
			 });
		 }

		 State.themes.activeTheme = presetName;
	 },

	 renderPresetsTab() {
		 const presetOptions = Object.keys(State.themes.savedThemes)
								   .map(name => `<option value="${name}" ${
											State.themes.activeTheme === name
												? 'selected'
												: ''}>${name}</option>`)
								   .join('');

		 return `
	  <div style="margin-bottom: 10px; padding: 10px; background-color: #2e2e2e;">
	   <h4 style="margin-top: 0;">Current Theme</h4>
	   <select id="preset-select" style="width: 100%; padding: 5px; color: black;">
		<option value="unsaved" ${
			 State.themes.activeTheme === 'unsaved' ? 'selected'
													: ''}>Unsaved Theme</option>
		${presetOptions}
	   </select>
	  </div>
	  
	  <div style="margin-bottom: 10px; padding: 10px; background-color: #2e2e2e;">
	   <h4 style="margin-top: 0;">Save Current Theme</h4>
	   <div style="display: flex; margin-bottom: 10px;">
		<input type="text" id="preset-name" placeholder="Theme Name" style="flex: 1; padding: 5px; color: black;">
		<button id="save-preset" style="
		 padding: 5px 10px;
		 color: white;
		 background-color: #129c00;
		 border: none;
		 cursor: pointer;
		 margin-left: 5px;
		">Save</button>
	   </div>
	  </div>
	  
	  <div style="margin-bottom: 10px; padding: 10px; background-color: #2e2e2e;">
	   <h4 style="margin-top: 0;">Theme Actions</h4>
	   <div style="display: flex; justify-content: space-between;">
		<button id="export-preset" style="
		 padding: 5px 10px;
		 color: white;
		 background-color: #337ab7;
		 border: none;
		 cursor: pointer;
		 flex: 1;
		 margin-right: 5px;
		">Export Theme</button>
		<button id="import-preset" style="
		 padding: 5px 10px;
		 color: white;
		 background-color: #337ab7;
		 border: none;
		 cursor: pointer;
		 flex: 1;
		 margin-right: 5px;
		">Import CSS</button>
		<button id="delete-preset" style="
		 padding: 5px 10px;
		 color: white;
		 background-color: #d9534f;
		 border: none;
		 cursor: pointer;
		 flex: 1;
		">Delete</button>
	   </div>
	  </div>
	  
	  <div style="margin-top: 20px; padding: 10px; background-color: #2e2e2e;">
	   <button id="reset-to-default" onclick="window.blackliteTools.reset()" style="
		padding: 5px 10px;
		color: white;
		background-color: #337ab7;
		border: none;
		cursor: pointer;
		width: 100%;
	   ">Reset to Default Theme</button>
	   <button id="export-css-button" onclick="window.blackliteTools.exportCSS()" style="
		padding: 5px 10px;
		color: white;
		background-color: #337ab7;
		border: none;
		cursor: pointer;
		width: 100%;
		margin-top: 10px;
	   ">Export CSS</button>
	  </div>
	 `;
	 }
 };


 const ThemeManager = {
	 originalStyles : {},
	 currentStyles : {},
	 searchTerm : '',
	 collapsedSelectors : new Set(),
	 scrollPosition : 0,
	 inspectorActive : false,

	 init() {
		 this.originalStyles = {};
		 this.currentStyles = {};
		 this.collapsedSelectors.clear();
		 this.scrollPosition = 0;
		 this.inspectorActive = false;

		 const sensitiveSelectors =
			 [ 'body', 'html', 'head', '#blacklite-tools' ];
		 const elements = document.body.getElementsByTagName('*');

		 for (let el of elements) {
			 const selector = this.generateUniqueSelector(el);
			 if (sensitiveSelectors.some(s => selector.includes(s)))
				 continue;

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

			 const bgImage = computedStyle.getPropertyValue('background-image');
			 if (bgImage && bgImage !== 'none') {
				 this.originalStyles[selector]['background-image'] = bgImage;
				 this.currentStyles[selector]['background-image'] = bgImage;
			 }
		 }

		 if (!State.themes.default) {
			 State.themes.default =
				 JSON.parse(JSON.stringify(this.originalStyles));
		 }

		 Object.keys(this.originalStyles)
			 .forEach(selector => { this.collapsedSelectors.add(selector); });

		 this.renderThemeEditor();
	 },
	 
	 reset() {
		 // Restore default theme
		 if (State.themes.default) {
			 ThemeManager.currentStyles =
				 JSON.parse(JSON.stringify(State.themes.default));

			 Object.keys(ThemeManager.currentStyles).forEach(selector => {
				 try {
					 const elements = document.querySelectorAll(selector);
					 elements.forEach(el => {
						 const styles = ThemeManager.currentStyles[selector];
						 Object.entries(styles).forEach(
							 ([ prop, value ]) => { el.style[prop] = value; });
					 });
				 } catch (e) {
					 console.warn(`Could not reset styles for selector: ${selector}`,
								  e);
				 }
			 });
		 }

		 // Reset backgrounds
		 BackgroundManager.reset();

		 State.themes.activeTheme = 'unsaved';
		 ThemeManager.renderThemeEditor();
	 },
	 
	 generateUniqueSelector(element) {
		 if (element.id)
			 return `#${element.id}`;
		 if (element.className && typeof element.className === 'string') {
			 const classes =
				 element.className.split(' ').filter(c => c.trim() !== '');
			 if (classes.length > 0)
				 return '.' + classes[0];
		 }
		 return element.tagName.toLowerCase();
	 },

	 isElementSuitableForBackground(selector) {
		 const tagName = selector.toLowerCase().replace(/[#.][^#.]+/g, '');
		 if (tagName.startsWith('#'))
			 return true; // Allow ID selectors
		 return !unsuitableForBackground.includes(tagName);
	 },

	 handleClick(event) {
		 if (event.target.closest('#blacklite-tools') &&
			 !event.target.classList.contains('selector-toggle')) {
			 return;
		 }

		 if (!this.inspectorActive)
			 return;

		 event.preventDefault();
		 event.stopPropagation();

		 const selector = this.generateUniqueSelector(event.target);
		 this.searchTerm = selector;
		 this.renderThemeEditor();

		 if (State.activeTab === 'backgrounds') {
			 BackgroundManager.selectedElement = selector;
		 }

		 return false;
	 },

	 reset() {
		 const changedStyles = {};

		 Object.keys(this.currentStyles).forEach(selector => {
			 const current = this.currentStyles[selector];
			 const original = this.originalStyles[selector];

			 if (!original)
				 return;

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
						 Object.entries(styles).forEach(
							 ([ prop, value ]) => { el.style[prop] = value; });
					 }
				 });
			 } catch (e) {
				 console.warn(`Could not reset styles for selector: ${selector}`,
							  e);
			 }
		 });

		 State.themes.activeTheme = 'unsaved';
		 BackgroundManager.reset();
		 this.renderThemeEditor();
	 },

	 exportCSS() {
		 let cssText = '/* BlackLite Custom Theme */\n';
		 Object.keys(this.currentStyles).forEach(selector => {
			 const styles = this.currentStyles[selector];
			 const originalStyles = this.originalStyles[selector];
			 const validStyles = Object.keys(styles).filter(
				 prop => styles[prop] !== originalStyles[prop]);

			 if (validStyles.length > 0) {
				 cssText += `${selector} {\n`;
				 validStyles.forEach(
					 prop => { cssText += `  ${prop}: ${styles[prop]};\n`; });
				 cssText += '}\n\n';
			 }
		 });

		 // Add background image data
		 Object.keys(State.backgrounds.elements).forEach(selector => {
			 const imageData = State.backgrounds.elements[selector];
			 const filter = State.backgrounds.filters[selector] || '';

			 if (imageData) {
				 cssText += `${selector} {\n`;
				 cssText += `  background-image: url(${imageData});\n`;
				 cssText += `  background-size: cover;\n`;
				 if (filter) {
					 cssText += `  filter: ${filter};\n`;
				 }
				 cssText += '}\n\n';
			 }
		 });

		 const blob = new Blob([ cssText ], {type : 'text/css'});
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
			 const validStyles = Object.keys(styles).filter(
				 prop => styles[prop] !== originalStyles[prop]);

			 if (validStyles.length > 0) {
				 cssText += `${selector} {\n`;
				 validStyles.forEach(
					 prop => { cssText += `  ${prop}: ${styles[prop]};\n`; });
				 cssText += '}\n\n';
			 }
		 });

		 // Add background image data
		 Object.keys(State.backgrounds.elements).forEach(selector => {
			 const imageData = State.backgrounds.elements[selector];
			 const filter = State.backgrounds.filters[selector] || '';

			 if (imageData) {
				 cssText += `${selector} {\n`;
				 cssText += `  background-image: url(${imageData});\n`;
				 cssText += `  background-size: cover;\n`;
				 if (filter) {
					 cssText += `  filter: ${filter};\n`;
				 }
				 cssText += '}\n\n';
			 }
		 });

		 const win = window.open('', '_blank', 'width=600,height=400');
		 win.document.write(`<pre style="color: #aaa;">${cssText}</pre>`);
		 win.document.close();
	 },

	 renderThemeEditor() {
		 const scrollContainer =
			 toolsContainer.querySelector('.scroll-container');
		 if (scrollContainer) {
			 this.scrollPosition = scrollContainer.scrollTop;
		 }

		 const content = `
	  <div style="margin-bottom: 5px;">
	   <h3 style="font-size: 28px; margin: 0; padding: 0; width: 100%;">BlackLite Tools</h3>
	  </div>
	  <div style="display: flex; margin-bottom: 10px;">
	   <div class="tab-button ${
			 State.activeTab === 'theme' ? 'active-tab'
										 : ''}" data-tab="theme" style="
		flex: 1;
		text-align: center;
		padding: 5px;
		cursor: pointer;
		background-color: ${
			 State.activeTab === 'theme' ? '#337ab7' : '#2e2e2e'};
		border-radius: 4px 0 0 4px;
	   ">Theme</div>
	   <div class="tab-button ${
			 State.activeTab === 'backgrounds'
				 ? 'active-tab'
				 : ''}" data-tab="backgrounds" style="
		flex: 1;
		text-align: center;
		padding: 5px;
		cursor: pointer;
		background-color: ${
			 State.activeTab === 'backgrounds' ? '#337ab7' : '#2e2e2e'};
	   ">Backgrounds</div>
	   <div class="tab-button ${
			 State.activeTab === 'presets' ? 'active-tab'
										   : ''}" data-tab="presets" style="
		flex: 1;
		text-align: center;
		padding: 5px;
		cursor: pointer;
		background-color: ${
			 State.activeTab === 'presets' ? '#337ab7' : '#2e2e2e'};
		border-radius: 0 4px 4px 0;
	   ">Presets</div>
	  </div>
	  ${this.renderTabContent()}
  `;

		 toolsContainer.innerHTML = content;

		 this.attachEventListeners();

		 const newScrollContainer =
			 toolsContainer.querySelector('.scroll-container');
		 if (newScrollContainer) {
			 newScrollContainer.scrollTop = this.scrollPosition;
		 }

		 if (State.activeTab === 'backgrounds') {
			 BackgroundManager.attachEventListeners();
		 } else if (State.activeTab === 'presets') {
			 PresetManager.attachEventListeners();
		 }
	 },

	 renderTabContent() {
		 switch (State.activeTab) {
		 case 'theme':
			 return this.renderThemeTab();
		 case 'backgrounds':
			 return BackgroundManager.renderBackgroundsTab();
		 case 'presets':
			 return PresetManager.renderPresetsTab();
		 default:
			 return this.renderThemeTab();
		 }
	 },

	 renderThemeTab() {
		 return `
	  <div style="display: flex; margin-bottom: 5px;">
	   <input type="text" id="theme-filter" placeholder="Filter..." style="flex:1; padding: 5px; color: black;" value="${
			 this.searchTerm}">
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
	   ">${this.inspectorActive ? 'Turn 🔍 OFF' : 'Turn 🔍 ON'}</button>
	   <button id="toggle-collapse" style="
		padding: 5px 10px;
		color: white;
		background-color: #337ab7;
		border: none;
		cursor: pointer;
		margin-right: 5px;
	   ">${
			 this.collapsedSelectors.size ===
					 Object.keys(this.originalStyles).length
				 ? 'Open ALL'
				 : 'Close ALL'}</button>
	   <button id="show-css-button" style="
		padding: 5px 10px;
		color: white;
		background-color: #337ab7;
		border: 1px solid #2e6da4;
		cursor: pointer;
	   ">Show CSS</button>
	  </div>
	  <div class="scroll-container" style="max-height: 475px; overflow-y: auto;">
	   ${this.renderStyleGroups()}
	  </div>
	 `;
	 },

	 attachEventListeners() {
		 document.removeEventListener('click', this.boundHandleClick);
		 this.boundHandleClick = this.handleClick.bind(this);
		 document.addEventListener('click', this.boundHandleClick);

		 const tabButtons = document.querySelectorAll('.tab-button');
		 tabButtons.forEach(button => {
			 button.addEventListener('click', () => {
				 State.activeTab = button.dataset.tab;
				 this.renderThemeEditor();
			 });
		 });

		 const inspectButton = document.getElementById('inspect-bg-element');
		 if (inspectButton) {
			 inspectButton.addEventListener('click',
											() => { this.startInspector(); });
		 }

		 if (State.activeTab === 'theme') {
			 document.getElementById('toggle-inspector')
				 .addEventListener('click', () => {
					 this.inspectorActive = !this.inspectorActive;
					 this.renderThemeEditor();
				 });

			 document.getElementById('toggle-collapse')
				 .addEventListener('click', () => {
					 const allSelectors = Object.keys(this.originalStyles);
					 const isAllCollapsed = allSelectors.every(
						 selector => this.collapsedSelectors.has(selector));

					 if (isAllCollapsed) {
						 this.collapsedSelectors.clear();
					 } else {
						 this.collapsedSelectors.clear();
						 allSelectors.forEach(
							 selector => this.collapsedSelectors.add(selector));
					 }

					 this.renderThemeEditor();
				 });

			 document.getElementById('show-css-button')
				 .addEventListener('click', () => this.showChanges());

			 document.getElementById('apply-filter')
				 .addEventListener('click', () => {
					 this.searchTerm =
						 document.getElementById('theme-filter').value;
					 this.updateFilterResults();
					 this.renderThemeEditor();
				 });

			 document.getElementById('theme-filter')
				 .addEventListener('keypress', (e) => {
					 if (e.key === 'Enter') {
						 this.searchTerm =
							 document.getElementById('theme-filter').value;
						 this.updateFilterResults();
						 this.renderThemeEditor();
					 }
				 });

			 const toggles = document.querySelectorAll('.selector-toggle');
			 toggles.forEach(toggle => {
				 toggle.addEventListener('click', (e) => {
					 e.stopPropagation();
					 const selector = toggle.dataset.selector;
					 if (this.collapsedSelectors.has(selector)) {
						 this.collapsedSelectors.delete(selector);
					 } else {
						 this.collapsedSelectors.add(selector);
					 }
					 this.renderThemeEditor();
				 });
			 });
		 } else if (State.activeTab === 'backgrounds') {
			 BackgroundManager.attachEventListeners();
		 } else if (State.activeTab === 'presets') {
			 PresetManager.attachEventListeners();
		 }
	 },

	 renderStyleGroups() {
		 const allSelectors = Object.keys(this.currentStyles);

		 return allSelectors
			 .map(selector => {
				 const isCollapsed = this.collapsedSelectors.has(selector);
				 const styles = this.currentStyles[selector];

				 const filteredProps = Object.keys(styles).filter(
					 prop => this.matchesFilter(prop, selector));

				 if (filteredProps.length === 0 && this.searchTerm &&
					 !this.matchesFilter("", selector)) {
					 return '';
				 }

				 return `
		<div style="margin-top: 5px;">
		<div class="selector-toggle" data-selector="${selector}" 
		  style="cursor: pointer; padding: 5px; background-color: #2e2e2e; color: white;">
		 ${selector}
		 <span style="float:right;">${isCollapsed ? '▶' : '▼'}</span>
		</div>
		${
					 isCollapsed ? ''
								 : `
				 <div style="background-color: #3e3e3e; margin: 5px 0; padding: 5px;">
				 ${
									   filteredProps
										   .map(prop => `
		   <div style="display: flex; align-items: center; margin: 5px 0;">
			<span style="flex-grow: 1; margin-right: 10px; color: #aaa;">${
													prop}</span>
			<input 
			 type="${prop.includes('color') ? 'color' : 'text'}" 
			 value="${this.currentStyles[selector][prop]}" 
			 style="width: 100px; padding: 2px; color: black;"
			 onchange="window.blackliteTools.updateStyle('${selector}', '${
													prop}', this.value)"
			>
		   </div>
		  `).join('')}
				 </div>
		`}
	   </div>
	  `;
			 })
			 .join('');
	 },

	 updateFilterResults() {
		 if (!this.searchTerm.trim())
			 return;

		 this.collapsedSelectors.clear();

		 Object.keys(this.currentStyles).forEach(selector => {
			 const styles = this.currentStyles[selector];
			 const hasMatchingProp = Object.keys(styles).some(
				 prop => this.matchesFilter(prop, selector));
			 const selectorMatches = this.matchesFilter("", selector);

			 if (hasMatchingProp || selectorMatches) {
				 this.collapsedSelectors.delete(selector);
			 } else {
				 this.collapsedSelectors.add(selector);
			 }
		 });
	 },

	 matchesFilter(prop, selector) {
		 if (!this.searchTerm)
			 return true;

		 const sanitizedTerm =
			 this.searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
				 .replace(/\*/g, '.*');
		 const pattern = new RegExp(`.*${sanitizedTerm}.*`, 'i');

		 return pattern.test(prop) || pattern.test(selector);
	 }
 };

 const BackgroundManager = {
	 selectedElement : null,
	 searchTerm : '',
	 collapsedSelectors : new Set(),
	 inspectorActive : false,

	 startInspector() {
		 const overlay = document.createElement('div');
		 overlay.id = 'bg-inspector-overlay';
		 overlay.style.cssText = `
	  position: fixed;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	  background: rgba(0,0,0,0.3);
	  z-index: 9999;
	  cursor: crosshair;
	 `;

		 overlay.innerHTML = `
	  <div style="
	   position: absolute;
	   top: 10px;
	   left: 50%;
	   transform: translateX(-50%);
	   background: #333;
	   color: white;
	   padding: 10px;
	   border-radius: 5px;
	  ">
	   Click on an element to select it for background customization
	  </div>
	 `;

		 document.body.appendChild(overlay);

		 overlay.addEventListener('click', (e) => {
			 if (e.target === overlay) {
				 return;
			 }

			 const element = e.target;
			 const selector = ThemeManager.generateUniqueSelector(element);
			 this.selectedElement = selector;

			 document.body.removeChild(overlay);
			 ThemeManager.renderThemeEditor();
		 });
	 },

	 attachEventListeners() {
		 document.getElementById('bg-filter')
			 .addEventListener('keypress', (e) => {
				 if (e.key === 'Enter') {
					 this.searchTerm =
						 document.getElementById('bg-filter').value;
					 this.updateFilterResults();
					 ThemeManager.renderThemeEditor();
				 }
			 });

		 document.getElementById('apply-bg-filter')
			 .addEventListener('click', () => {
				 this.searchTerm = document.getElementById('bg-filter').value;
				 this.updateFilterResults();
				 ThemeManager.renderThemeEditor();
			 });

		 document.getElementById('toggle-bg-inspector')
			 .addEventListener('click', () => {
				 this.inspectorActive = !this.inspectorActive;
				 this.renderBackgroundsTab(); // Update button text
			 });

		 document.getElementById('toggle-bg-collapse')
			 .addEventListener('click', () => {
				 const allSelectors =
					 Object.keys(ThemeManager.currentStyles)
						 .filter(selector =>
									 ThemeManager.isElementSuitableForBackground(
										 selector));
				 const isAllCollapsed = allSelectors.every(
					 selector => this.collapsedSelectors.has(selector));

				 if (isAllCollapsed) {
					 this.collapsedSelectors.clear();
				 } else {
					 this.collapsedSelectors.clear();
					 allSelectors.forEach(
						 selector => this.collapsedSelectors.add(selector));
				 }

				 ThemeManager.renderThemeEditor();
			 });

		 const toggles = document.querySelectorAll('.bg-selector-toggle');
		 toggles.forEach(toggle => {
			 toggle.addEventListener('click', (e) => {
				 e.stopPropagation();
				 const selector = toggle.dataset.selector;
				 if (this.collapsedSelectors.has(selector)) {
					 this.collapsedSelectors.delete(selector);
				 } else {
					 this.collapsedSelectors.add(selector);
				 }
				 ThemeManager.renderThemeEditor();
			 });
		 });

		 const fileInputs = document.querySelectorAll('.bg-file-input');
		 fileInputs.forEach(input => {
			 input.addEventListener('change', (e) => {
				 if (e.target.files && e.target.files[0]) {
					 const file = e.target.files[0];
					 const reader = new FileReader();
					 const selector = input.dataset.selector;

					 reader.onload = (e) => {
						 State.backgrounds.elements[selector] = e.target.result;
						 this.applyBackground(selector, e.target.result);
						 ThemeManager.renderThemeEditor();
					 };

					 reader.readAsDataURL(file);
				 }
			 });
		 });

		 const effectSliders = document.querySelectorAll('.bg-effect-slider');
		 effectSliders.forEach(slider => {
			 slider.addEventListener('input', (e) => {
				 const selector = slider.dataset.selector;
				 const effect = slider.dataset.effect;
				 const value = e.target.value;
				 const unit = slider.dataset.unit || '';

				 this.updateFilter(selector, effect, value + unit);
			 });
		 });
	 },

	 updateFilterResults() {
		 if (!this.searchTerm.trim())
			 return;

		 this.collapsedSelectors.clear();

		 Object.keys(ThemeManager.currentStyles)
			 .filter(selector =>
						 ThemeManager.isElementSuitableForBackground(selector))
			 .forEach(selector => {
				 if (this.matchesFilter(selector)) {
					 this.collapsedSelectors.delete(selector);
				 } else {
					 this.collapsedSelectors.add(selector);
				 }
			 });
	 },

	 matchesFilter(selector) {
		 if (!this.searchTerm)
			 return true;

		 const sanitizedTerm =
			 this.searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
				 .replace(/\*/g, '.*');
		 const pattern = new RegExp(`.*${sanitizedTerm}.*`, 'i');

		 return pattern.test(selector);
	 },

	 applyBackground(selector, imageData) {
		 try {
			 const elements = document.querySelectorAll(selector);
			 elements.forEach(el => {
				 el.style.backgroundImage = `url(${imageData})`;
				 el.style.backgroundSize = 'cover';
			 });
		 } catch (e) {
			 console.warn(`Could not apply background to ${selector}`, e);
		 }
	 },

	 updateFilter(selector, filterType, value) {
		 try {
			 const currentFilters = State.backgrounds.filters[selector] || '';
			 const filterObj = this.parseFilters(currentFilters);

			 filterObj[filterType] = value;

			 const newFilter = this.filtersToString(filterObj);
			 State.backgrounds.filters[selector] = newFilter;

			 const elements = document.querySelectorAll(selector);
			 elements.forEach(el => { el.style.filter = newFilter; });
		 } catch (e) {
			 console.warn(`Could not apply filter to ${selector}`, e);
		 }
	 },

	 parseFilters(filterString) {
		 const filters = {};
		 if (!filterString)
			 return filters;

		 const filterRegex = /([\w-]+)\(([^)]+)\)/g;
		 let match;

		 while ((match = filterRegex.exec(filterString)) !== null) {
			 filters[match[1]] = match[2];
		 }

		 return filters;
	 },

	 filtersToString(filterObj) {
		 return Object.entries(filterObj)
			 .map(([ filter, value ]) => `${filter}(${value})`)
			 .join(' ');
	 },

	 reset() {
		 Object.keys(State.backgrounds.elements).forEach(selector => {
			 try {
				 const elements = document.querySelectorAll(selector);
				 elements.forEach(el => {
					 el.style.backgroundImage = '';
					 el.style.filter = '';
				 });
			 } catch (e) {
				 console.warn(`Could not reset background for ${selector}`, e);
			 }
		 });

		 State.backgrounds.elements = {};
		 State.backgrounds.filters = {};
		 this.selectedElement = null;
		 this.searchTerm = '';
		 this.collapsedSelectors.clear();
	 },

	 renderBackgroundsTab() {
		 const toggleText =
			 this.collapsedSelectors.size === 0 ? 'Close ALL' : 'Open ALL';

		 return `
	  <div style="display: flex; margin-bottom: 5px;">
	   <input type="text" id="bg-filter" placeholder="Filter elements..." style="flex:1; padding: 5px; color: black;" value="${
			 this.searchTerm}">
	   <button id="apply-bg-filter" style="
		padding: 5px 10px;
		color: white;
		background-color: #129c00;
		border: 1px solid #2e6da4;
		cursor: pointer;
	   ">GO</button>
	  </div>
	  <div style="margin-bottom: 5px;">
	   <button id="toggle-bg-inspector" style="
		padding: 5px 10px;
		color: white;
		background-color: #129c00;
		border: none;
		cursor: pointer;
		margin-right: 5px;
	   ">${this.inspectorActive ? 'Turn 🔍 OFF' : 'Turn 🔍 ON'}</button>
	   <button id="toggle-bg-collapse" style="
		padding: 5px 10px;
		color: white;
		background-color: #337ab7;
		border: none;
		cursor: pointer;
		margin-right: 5px;
	   ">${toggleText}</button>
	  </div>
	  <div class="scroll-container" style="max-height: 475px; overflow-y: auto;">
	   ${this.renderBackgroundSelectors()}
	  </div>
	 `;
	 },

	 renderBackgroundSelectors() {
		 const suitableSelectors =
			 Object.keys(ThemeManager.currentStyles)
				 .filter(selector => ThemeManager.isElementSuitableForBackground(
							 selector))
				 .filter(selector =>
							 !this.searchTerm || this.matchesFilter(selector));

		 return suitableSelectors
			 .map(selector => {
				 const isCollapsed = this.collapsedSelectors.has(selector);
				 const hasBackground = State.backgrounds.elements[selector];

				 const currentFilters = this.parseFilters(
					 State.backgrounds.filters[selector] || '');
				 const opacity = currentFilters.opacity || 1;
				 const saturation = currentFilters.saturate || 1;
				 const brightness = currentFilters.brightness || 1;
				 const blur =
					 currentFilters.blur ? parseInt(currentFilters.blur) : 0;

				 return `
		<div style="margin-top: 5px;">
		<div class="bg-selector-toggle" data-selector="${selector}" 
		  style="cursor: pointer; padding: 5px; background-color: #2e2e2e; color: white;">
		 ${selector} ${hasBackground ? '🖼️' : ''}
		 <span style="float:right;">${isCollapsed ? '▶' : '▼'}</span>
		</div>
		${
					 isCollapsed
						 ? ''
						 : `
				 <div style="background-color: #3e3e3e; margin: 5px 0; padding: 5px;">
				 <div style="margin-bottom: 10px;">
				 <p style="margin: 5px 0;">Background Image:</p>
				 <input type="file" class="bg-file-input" data-selector="${
							   selector}" style="color: white;" onchange="previewImage(this, '${
							   selector}')">
				 <button onclick="deleteBackground('${
							   selector}')">🗑️</button>
				 <img id="preview-${
							   selector}" src="" style="max-width: 100%; margin-top: 10px;">
				 </div>
				 <div style="margin-bottom: 10px;">
				 <label>Opacity:</label>
				 <input type="range" min="0" max="1" step="0.01" value="${
							   opacity}"
				 data-selector="${
							   selector}" data-effect="opacity" class="bg-effect-slider">
				 </div>
				 <div style="margin-bottom: 10px;">
				 <label>Saturation:</label>
				 <input type="range" min="0" max="2" step="0.01" value="${
							   saturation}"
				 data-selector="${
							   selector}" data-effect="saturate" class="bg-effect-slider">
				 </div>
				 <div style="margin-bottom: 10px;">
				 <label>Brightness:</label>
				 <input type="range" min="0" max="2" step="0.01" value="${
							   brightness}"
				 data-selector="${
							   selector}" data-effect="brightness" class="bg-effect-slider">
				 </div>
				 <div style="margin-bottom: 10px;">
				 <label>Blur:</label>
				 <input type="range" min="0" max="10" step="0.01" value="${
							   blur}"
				 data-selector="${
							   selector}" data-effect="blur" class="bg-effect-slider">
				 </div>
				 </div>
		`}
	   </div>
	  `;
			 })
			 .join('');
	 }
 };

 function deleteBackground(selector) {
	 delete State.backgrounds.elements[selector];
	 ThemeManager.renderThemeEditor();
 }

 function previewImage(input, selector) {
	 const img = document.getElementById(`preview-${selector}`);
	 if (input.files && input.files[0]) {
		 const reader = new FileReader();
		 reader.onload = function(e) { img.src = e.target.result; };
		 reader.readAsDataURL(input.files[0]);
	 }
 }

 function initBlackliteTools() { ThemeManager.init(); }

 initBlackliteTools();
 })();
