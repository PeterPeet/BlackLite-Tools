
   // =============================================
   // KLITE Hotkeys Mod
   // Copyrights Peter Hauer
   // under GPL-3.0 license
   // see https://github.com/PeterPeet/
   // =============================================

// Hotkeys Mod for KoboldAI Lite v1.0
// Ctrl+Shift+Enter = Generate/Submit
// Ctrl+Shift+R = Retry
// Ctrl+Shift+Z = Undo/Back
// Ctrl+Shift+Y = Redo

document.addEventListener('keydown', function(event) {
    // Check if we're not in an input field (to avoid interfering with normal typing)
    const isInInput = event.target.tagName === 'INPUT' || 
                     event.target.tagName === 'TEXTAREA' || 
                     event.target.contentEditable === 'true';
    
    // Ctrl+Shift+Enter for Generate/Submit
    if (event.ctrlKey && event.shiftKey && event.key === 'Enter') {
        event.preventDefault();
        
        // Check if generate button is available and not disabled
        const generateBtn = document.getElementById('btnsend');
        if (generateBtn && !generateBtn.disabled) {
            prepare_submit_generation();
        }
        return;
    }
    
    // Ctrl+Shift+R for Retry
    if (event.ctrlKey && event.shiftKey && event.key === 'R') {
        event.preventDefault();
        btn_retry();
        return;
    }
    
    // Ctrl+Shift+Z for Undo/Back
    if (event.ctrlKey && event.shiftKey && event.key === 'Z') {
        event.preventDefault();
        btn_back();
        return;
    }
    
    // Ctrl+Shift+Y for Redo
    if (event.ctrlKey && event.shiftKey && event.key === 'Y') {
        event.preventDefault();
        btn_redo();
        return;
    }
    
    // Ctrl+Shift+A for Abort Generation
    if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        event.preventDefault();
        abort_generation();
        return;
    }
});

// Show a notification that hotkeys are active
console.log('🔥 Hotkeys Mod Loaded!');
console.log('Hotkeys:');
console.log('  Ctrl+Shift+Enter = Generate/Submit');
console.log('  Ctrl+Shift+R = Retry');
console.log('  Ctrl+Shift+Z = Undo/Back');
console.log('  Ctrl+Shift+Y = Redo');
console.log('  Ctrl+Shift+A = Abort Generation');

// Show a brief notification in the UI
if (typeof msgbox === 'function') {
    setTimeout(() => {
        const notification = document.createElement('div');
        notification.innerHTML = '🔥 Hotkeys Mod Active!<br>Ctrl+Shift+Enter=Generate, Ctrl+Shift+R=Retry';
        notification.style.cssText = `
            position: fixed; 
            top: 20px; 
            right: 20px; 
            background: #333; 
            color: white; 
            padding: 10px; 
            border-radius: 5px; 
            z-index: 10000; 
            font-size: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }, 1000);
};