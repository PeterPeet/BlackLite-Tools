(function () {
    // =============================================
    // KLITE Character Manager - Enhanced Version
    // Copyrights Peter Hauer
    // under GPL-3.0 license
    // see https://github.com/PeterPeet/
    // =============================================
    'use strict';
    console.log('Loading KLITECharacterManager Enhanced');

    // =============================================
    // GLOBAL CONFIGURATION
    // =============================================
    const CONFIG = {
        TOOL_ID: 'KLITECharacterManager',
        VERSION: 'v1.5',
        MOBILE_BREAKPOINT: 768,
        DB_NAME: 'KLITECharacterManagerDB',
        DB_VERSION: 1,
        STORE_NAME: 'characters'
    };

    // =============================================
    // STYLES
    // =============================================
    const CharacterManagerStyles = `
        .KLITECharacterManager {
            position: fixed !important;
            top: 0 !important;
            right: 0px !important;
            left: auto !important;
            width: 350px !important;
            height: 100vh !important;
            max-height: 100vh !important;
            background-color: rgb(51, 51, 51) !important;
            color: white !important;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1) !important;
            z-index: 99998 !important;
            padding: 10px !important;
            font-family: sans-serif !important;
            overflow: visible !important;
            display: flex !important;
            flex-direction: column !important;
            resize: none !important;
            min-width: 350px !important;
            transform: translateX(0);
            transition: transform 0.3s ease;
        }

        .KLITECharacterManager.collapsed {
            transform: translateX(100%);
        }

        .KLITECharacterManager .KLITECharacterManager-header {
            cursor: default !important;
            padding: 5px 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: rgb(38, 38, 38);
            border-radius: 5px;
            margin-bottom: 10px;
        }

        .KLITECharacterManager .KLITECharacterManager-header h3 {
            margin: 0;
            font-size: 18px;
        }

        .KLITECharacterManager .KLITECharacterManager-toggle-handle {
            position: absolute !important;
            left: -20px !important;
            top: 25% !important;
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

        .KLITECharacterManager .KLITECharacterManager-toggle-handle::after {
            content: "◀";
            position: relative;
            transition: all 0.2s ease;
        }

        .KLITECharacterManager.collapsed .KLITECharacterManager-toggle-handle::after {
            content: "▶";
            left: 1px;
        }

        .KLITECharacterManager:not(.collapsed) .KLITECharacterManager-toggle-handle::after {
            content: "◀";
            left: -1px;
        }

        .KLITECharacterManager .KLITECharacterManager-content-wrapper {
            flex: 1;
            display: flex;
            flex-direction: column;
            min-height: 0;
        }

        .KLITECharacterManager .KLITECharacterManager-scroll-container {
            overflow-y: auto !important;
            width: 100% !important;
            box-sizing: border-box !important;
            flex-grow: 1 !important;
            padding-bottom: 10px !important;
            margin-bottom: 10px !important;
        }

        .KLITECharacterManager .KLITECharacterManager-section {
            margin-bottom: 10px;
            border-bottom: 1px solid #444 !important;
            border-radius: 5px;
            overflow: hidden;
        }

        .KLITECharacterManager .KLITECharacterManager-section-header {
            padding: 8px 10px;
            background-color: rgb(38, 38, 38) !important;
            border-left: none !important;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            user-select: none;
        }

        .KLITECharacterManager .KLITECharacterManager-section-header span:last-child {
            margin-left: 10px;
        }

        .KLITECharacterManager .KLITECharacterManager-section-content {
            padding: 10px;
            background-color: rgb(64, 64, 64);
            transition: all 0.3s ease;
            overflow: hidden;
            will-change: height;
        }

        .KLITECharacterManager .KLITECharacterManager-section.collapsed .KLITECharacterManager-section-content {
            display: none;
            border-bottom: 1px solid #444 !important;
        }

        .KLITECharacterManager .KLITECharacterManager-character-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 2px;
            margin-top: 2px;
            align-items: center;
        }

        .KLITECharacterManager .KLITECharacterManager-tag {
            background: #333;
            color: #ccc;
            padding: 2px 5px;
            font-size: 9px;
            border: 1px solid #444;
            border-radius: 3px;
            line-height: 1.2;
        }

        .KLITECharacterManager .KLITECharacterManager-add-tag-btn {
            background: #444;
            color: #ccc;
            border: 1px solid #555;
            width: 16px;
            height: 16px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            font-weight: bold;
            transition: all 0.2s;
            border-radius: 3px;
        }

        .KLITECharacterManager .KLITECharacterManager-add-tag-btn:hover {
            background: #555;
            color: #fff;
        }

        .KLITECharacterManager .KLITECharacterManager-button {
            padding: 6px 12px;
            font-size: 14px;
            border: none;
            border-radius: 4px;
            background-color: rgb(51, 122, 183);
            color: white;
            cursor: pointer;
            margin: 2px 0;
            transition: background-color 0.3s ease;
            white-space: nowrap;
        }

        .KLITECharacterManager .KLITECharacterManager-button:hover {
            opacity: 0.9;
        }

        .KLITECharacterManager .KLITECharacterManager-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .KLITECharacterManager .KLITECharacterManager-button:disabled:hover {
            opacity: 0.5;
        }

        .KLITECharacterManager .KLITECharacterManager-button.scenario-btn {
            background-color:rgb(51, 122, 183);

        }

        .KLITECharacterManager .KLITECharacterManager-button.worldinfo-btn {
            background-color:rgb(51, 122, 183);
        }

        .KLITECharacterManager .KLITECharacterManager-button.delete-btn {
            background-color:rgb(51, 122, 183);
        }

        .KLITECharacterManager .KLITECharacterManager-input {
            width: 100%;
            padding: 4px 6px;
            color: black;
            margin-bottom: 5px;
            border: 1px solid #ccc;
            border-radius: 3px;
            box-sizing: border-box;
        }

        .KLITECharacterManager .KLITECharacterManager-upload-zone {
            border: 1px dashed #444;
            background: #1a1a1a;
            padding: 8px;
            text-align: center;
            margin-bottom: 8px;
            cursor: pointer;
            font-size: 11px;
            color: #888;
            transition: all 0.2s;
            border-radius: 4px;
        }

        .KLITECharacterManager .KLITECharacterManager-upload-zone:hover,
        .KLITECharacterManager .KLITECharacterManager-upload-zone.dragover {
            border-color: #666;
            background: #222;
            color: #aaa;
        }

        .KLITECharacterManager .KLITECharacterManager-character-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
            overflow-y: auto;
            flex: 1;
            padding: 4px;
            max-height: 400px;
        }

        .KLITECharacterManager .KLITECharacterManager-character-card {
            background: #1a1a1a;
            border: 1px solid #333;
            cursor: pointer;
            transition: all 0.2s;
            position: relative;
            overflow: hidden;
            border-radius: 6px;
            min-height: 180px;
            display: flex;
            flex-direction: column;
        }

        .KLITECharacterManager .KLITECharacterManager-character-card:hover {
            border-color: #555;
            background: #222;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }

        .KLITECharacterManager .KLITECharacterManager-character-card.selected {
            border-color: #666;
            background: #2a2a2a;
        }

        .KLITECharacterManager .KLITECharacterManager-character-image {
            width: 100%;
            aspect-ratio: 2/3; /* 1:1.5 ratio */
            object-fit: cover;
            background: #333;
            display: block;
            flex-shrink: 0;
        }

        .KLITECharacterManager .KLITECharacterManager-character-info {
            padding: 6px;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            min-height: 40px;
        }

        .KLITECharacterManager .KLITECharacterManager-character-name {
            font-weight: 600;
            font-size: 12px;
            color: #e0e0e0;
            line-height: 1.2;
            margin-bottom: 2px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            max-height: 30px;
        }

        .KLITECharacterManager .KLITECharacterManager-character-creator {
            font-size: 10px;
            color: #999;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            margin-bottom: 2px;
            line-height: 1.2;
            max-height: 14px;
        }

        .KLITECharacterManager .KLITECharacterManager-character-rating {
            margin-top: auto;
        }

        .KLITECharacterManager .KLITECharacterManager-rating-dropdown {
            width: 100%;
            padding: 2px 4px;
            font-size: 8px;
            background: #333;
            color: #ccc;
            border: 1px solid #444;
            border-radius: 2px;
            cursor: pointer;
        }

        .KLITECharacterManager .KLITECharacterManager-rating-dropdown:focus {
            outline: none;
            border-color: #555;
            background: #2a2a2a;
        }

        .KLITECharacterManager .KLITECharacterManager-fullscreen-view {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgb(51, 51, 51);
            z-index: 1;
            display: none;
            overflow-y: auto;
        }

        .KLITECharacterManager .KLITECharacterManager-fullscreen-view.show {
            display: block;
        }

        .KLITECharacterManager .KLITECharacterManager-fullscreen-header {
            background: rgb(38, 38, 38);
            border-bottom: 1px solid #333;
            padding: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            position: sticky;
            top: 0;
            z-index: 2;
        }

        .KLITECharacterManager .KLITECharacterManager-fullscreen-actions {
            grid-template-columns: 1fr 1fr;
            display: grid;
            flex-wrap: wrap;
            gap: 8px;
            justify-content: center;
            max-width: 600px;
            margin: 2px 10px;
        }

        .KLITECharacterManager .KLITECharacterManager-fullscreen-actions .KLITECharacterManager-button {
            padding: 4px 8px;
            font-size: 12px;
            margin: 1px 0;
        }

        .KLITECharacterManager .KLITECharacterManager-fullscreen-content {
            padding: 15px;
            color: #e0e0e0;
        }

        .KLITECharacterManager .KLITECharacterManager-fullscreen-image {
            width: 100%;
            max-width: 200px;
            border: 1px solid #333;
            background: #1a1a1a;
            display: block;
            margin: 0 auto 15px auto;
            border-radius: 4px;
        }

        .KLITECharacterManager .KLITECharacterManager-fullscreen-name {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 8px;
            color: #fff;
        }

        .KLITECharacterManager .KLITECharacterManager-fullscreen-creator {
            color: #888;
            margin-bottom: 15px;
            font-size: 12px;
        }

        .KLITECharacterManager .KLITECharacterManager-fullscreen-rating {
            margin-bottom: 15px;
        }

        .KLITECharacterManager .KLITECharacterManager-fullscreen-rating select {
            padding: 4px 8px;
            background: #333;
            color: #ccc;
            border: 1px solid #444;
            border-radius: 4px;
            font-size: 12px;
        }

        .KLITECharacterManager .KLITECharacterManager-detail-section h3 {
            color: #fff;
            margin-bottom: 8px;
            font-size: 14px;
            border-bottom: 1px solid #333;
            padding-bottom: 4px;
        }

        .KLITECharacterManager .KLITECharacterManager-detail-section p {
            line-height: 1.4;
            color: #ccc;
            margin-bottom: 8px;
            font-size: 12px;
            white-space: pre-wrap;
            word-wrap: break-word;
        }

        .KLITECharacterManager .KLITECharacterManager-kobold-status {
            color: #888;
            font-size: 11px;
            padding: 4px 8px;
            border: 1px solid #444;
            background: #222;
            border-radius: 4px;
        }

        .KLITECharacterManager .KLITECharacterManager-kobold-status.available {
            color: #00aa00;
            border-color: #004400;
            background: #001100;
        }

        .KLITECharacterManager .KLITECharacterManager-kobold-status.unavailable {
            color: #aa0000;
            border-color: #440000;
            background: #110000;
        }

        .KLITECharacterManager .KLITECharacterManager-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 100;
        }

        .KLITECharacterManager .KLITECharacterManager-modal:not(.hidden) {
            display: flex;
        }

        .KLITECharacterManager .KLITECharacterManager-modal-content {
            background: rgb(51, 51, 51);
            border: 1px solid #333;
            padding: 20px;
            max-width: 400px;
            width: 90%;
            border-radius: 5px;
        }

        .KLITECharacterManager .KLITECharacterManager-modal-content h3 {
            margin-bottom: 15px;
            color: #fff;
        }

        .KLITECharacterManager .KLITECharacterManager-modal-content input {
            width: 100%;
            padding: 8px;
            border: 1px solid #444;
            background: #222;
            color: #e0e0e0;
            margin-bottom: 15px;
            box-sizing: border-box;
            border-radius: 4px;
        }

        .KLITECharacterManager .KLITECharacterManager-modal-content input:focus {
            outline: none;
            border-color: #555;
            background: #2a2a2a;
        }

        .KLITECharacterManager .KLITECharacterManager-modal-buttons {
            display: flex;
            gap: 8px;
            justify-content: flex-end;
        }

        .KLITECharacterManager .KLITECharacterManager-success-message {
            background: #006600;
            color: #fff;
            padding: 8px 12px;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 101;
            border: 1px solid #008800;
            display: none;
            border-radius: 4px;
        }

        .KLITECharacterManager .KLITECharacterManager-success-message.show {
            display: block;
        }

        /* Unified fullscreen section styles */
        .KLITECharacterManager .KLITECharacterManager-fullscreen-section {
            margin-bottom: 10px;
            border: 1px solid #444;
            border-radius: 5px;
            overflow: hidden;
            background-color: rgb(64, 64, 64);
        }

        .KLITECharacterManager .KLITECharacterManager-fullscreen-section-header {
            padding: 8px 10px;
            background-color: rgb(38, 38, 38);
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            user-select: none;
            color: #e0e0e0;
            font-weight: 600;
            font-size: 14px;
        }

        .KLITECharacterManager .KLITECharacterManager-fullscreen-section-header:hover {
            background-color: rgb(48, 48, 48);
        }

        .KLITECharacterManager .KLITECharacterManager-fullscreen-section-content {
            padding: 10px;
            background-color: rgb(51, 51, 51);
            color: #ccc;
            font-size: 12px;
            line-height: 1.5;
            white-space: pre-wrap;
            word-wrap: break-word;
            max-height: none;
            overflow: visible;
        }

        .KLITECharacterManager .KLITECharacterManager-fullscreen-section.collapsed .KLITECharacterManager-fullscreen-section-content {
            display: none;
        }

        .KLITECharacterManager .KLITECharacterManager-fullscreen-section-arrow {
            transition: transform 0.2s ease;
            color: #888;
        }

        .KLITECharacterManager .KLITECharacterManager-fullscreen-section.collapsed .KLITECharacterManager-fullscreen-section-arrow {
            transform: rotate(-90deg);
        }

        /* Rating filter styles */
        .KLITECharacterManager .KLITECharacterManager-rating-filter {
            width: 100%;
            padding: 4px 6px;
            color: black;
            margin-bottom: 5px;
            border: 1px solid #ccc;
            border-radius: 3px;
            box-sizing: border-box;
            background: white;
        }

        /* Character info header section */
        .KLITECharacterManager .KLITECharacterManager-character-header {
            background: rgb(38, 38, 38);
            border: 1px solid #444;
            border-radius: 5px;
            padding: 20px;
            margin-bottom: 10px;
            text-align: center;
        }

        .KLITECharacterManager .KLITECharacterManager-character-header-image {
            width: 250px;
            height: 375px;
            object-fit: cover;
            border: 1px solid #333;
            background: #1a1a1a;
            border-radius: 8px;
            margin: 0 auto 15px auto;
            display: block;
        }

        .KLITECharacterManager .KLITECharacterManager-character-header-info {
            text-align: center;
        }

        .KLITECharacterManager .KLITECharacterManager-character-header-name {
            font-size: 24px;
            font-weight: 600;
            color: #fff;
            margin-bottom: 5px;
        }

        .KLITECharacterManager .KLITECharacterManager-character-header-meta {
            font-size: 13px;
            color: #888;
            margin-bottom: 10px;
        }

        /* Tags in header */
        .KLITECharacterManager .KLITECharacterManager-character-header-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            align-items: center;
            margin-top: 10px;
        }

        .KLITECharacterManager .KLITECharacterManager-fullscreen-rating {
            margin-bottom: 12px;
            text-align: center;
        }

        .KLITECharacterManager .KLITECharacterManager-fullscreen-rating select {
            padding: 6px 12px;
            background: #333;
            color: #ccc;
            border: 1px solid #444;
            border-radius: 4px;
            font-size: 13px;
        }

        /* World info entry styling */
        .KLITECharacterManager .KLITECharacterManager-wi-entry {
            background: rgb(45, 45, 45);
            border: 1px solid #3a3a3a;
            padding: 8px;
            margin-bottom: 8px;
            border-radius: 4px;
        }

        .KLITECharacterManager .KLITECharacterManager-wi-entry-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 6px;
        }

        .KLITECharacterManager .KLITECharacterManager-wi-keys {
            font-weight: 600;
            color: #4a9eff;
            font-size: 12px;
        }

        .KLITECharacterManager .KLITECharacterManager-wi-options {
            display: flex;
            gap: 8px;
            font-size: 10px;
            color: #777;
        }

        .KLITECharacterManager .KLITECharacterManager-wi-content {
            color: #ccc;
            font-size: 11px;
            line-height: 1.4;
            white-space: pre-wrap;
            word-wrap: break-word;
        }

        /* World Info section styles */
        .KLITECharacterManager .KLITECharacterManager-worldinfo-section {
            margin-top: 20px;
            border-top: 1px solid #444;
            padding-top: 15px;
        }

        .KLITECharacterManager .KLITECharacterManager-worldinfo-entry {
            background: #2a2a2a;
            border: 1px solid #333;
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 4px;
        }

        .KLITECharacterManager .KLITECharacterManager-worldinfo-entry-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }

        .KLITECharacterManager .KLITECharacterManager-worldinfo-keys {
            font-weight: 600;
            color: #4a9eff;
            font-size: 13px;
        }

        .KLITECharacterManager .KLITECharacterManager-worldinfo-options {
            display: flex;
            gap: 10px;
            font-size: 11px;
            color: #888;
        }

        .KLITECharacterManager .KLITECharacterManager-worldinfo-option {
            display: flex;
            align-items: center;
            gap: 3px;
        }

        .KLITECharacterManager .KLITECharacterManager-worldinfo-content {
            color: #ccc;
            font-size: 12px;
            line-height: 1.4;
            white-space: pre-wrap;
            word-wrap: break-word; 
        }

        .KLITECharacterManager .KLITECharacterManager-format-indicator {
            background: #444;
            color: #aaa;
            padding: 2px 6px;
            font-size: 10px;
            border-radius: 3px;
            display: inline-block;
            margin-left: 10px;
        }

        .KLITECharacterManager .KLITECharacterManager-example-messages {
            background: #1a1a1a;
            border: 1px solid #333;
            padding: 10px;
            margin-top: 10px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 11px;
            white-space: pre-wrap;
            word-wrap: break-word; 
            color: #aaa;
            max-height: 200px;
            overflow-y: auto;
        }

        .KLITECharacterManager .KLITECharacterManager-alternate-greeting {
            background: #2a2a2a;
            border: 1px solid #333;
            padding: 8px;
            margin-bottom: 8px;
            border-radius: 4px;
            font-size: 12px;
            color: #ccc;
            white-space: pre-wrap;
            word-wrap: break-word; 
        }

        .KLITECharacterManager .KLITECharacterManager-greeting-number {
            font-weight: 600;
            color: #4a9eff;
            margin-bottom: 4px;
        }

        @media (max-width: 768px) {
            .KLITECharacterManager {
                left: auto !important;
                right: 0px !important;
                width: 90% !important;
                max-width: 350px !important;
                border-left: 0px solid #333 !important;
            }
            
            .KLITECharacterManager .KLITECharacterManager-character-grid {
                grid-template-columns: repeat(2, 1fr) !important;
            }
            
            .KLITECharacterManager .KLITECharacterManager-fullscreen-actions {
                grid-template-columns: 1fr 1fr;
                gap: 8px;
                display: grid;
            }

            .KLITECharacterManager .KLITECharacterManager-fullscreen-actions .KLITECharacterManager-button {
                padding: 6px 12px;
                font-size: 16px;
                margin: 2px;
            }

            .KLITECharacterManager .KLITECharacterManager-scroll-container {
                padding-bottom: 15px !important;
            }
        }
    `;

    // =============================================
    // FORMAT DETECTION AND CONVERSION
    // =============================================
    const FormatDetector = {
        detectFormat(data) {
            // V2 format - most specific check first
            if (data.spec === 'chara_card_v2' && data.data) {
                return 'v2';
            }
            
            // Tavern AI format (has specific fields)
            if (data.name && data.description && (data.personality || data.scenario || data.first_mes)) {
                return 'v1';
            }
            
            // Agnai format
            if (data.kind === 'character' || (data.name && data.persona)) {
                return 'agnai';
            }
            
            // Ooba format
            if (data.char_name && data.char_persona) {
                return 'ooba';
            }
            
            // NovelAI format
            if (data.scenarioVersion && data.prompt) {
                return 'novelai';
            }
            
            // AID (AI Dungeon) format
            if (Array.isArray(data) && data[0]?.keys) {
                return 'aid';
            }
            
            return 'unknown';
        },

        async convertToV2(data, format) {
            console.log(`Converting ${format} format to V2`);
            
            switch (format) {
                case 'v1':
                    return this.convertV1ToV2(data);
                case 'agnai':
                    return this.convertAgnaiToV2(data);
                case 'ooba':
                    return this.convertOobaToV2(data);
                case 'novelai':
                    return this.convertNovelAIToV2(data);
                case 'aid':
                    return this.convertAIDToV2(data);
                case 'v2':
                    return data; // Already V2
                default:
                    throw new Error(`Unknown format: ${format}`);
            }
        },

        convertV1ToV2(v1Data) {
            return {
                spec: 'chara_card_v2',
                spec_version: '2.0',
                data: {
                    name: v1Data.name || 'Unknown Character',
                    description: v1Data.description || '',
                    personality: v1Data.personality || '',
                    scenario: v1Data.scenario || '',
                    first_mes: v1Data.first_mes || '',
                    mes_example: v1Data.mes_example || '',
                    
                    // V2 specific fields with defaults
                    creator_notes: v1Data.creator_notes || '',
                    system_prompt: v1Data.system_prompt || '',
                    post_history_instructions: v1Data.post_history_instructions || '',
                    alternate_greetings: v1Data.alternate_greetings || [],
                    character_book: v1Data.character_book || undefined,
                    tags: v1Data.tags || [],
                    creator: v1Data.creator || 'Unknown',
                    character_version: v1Data.character_version || '',
                    extensions: v1Data.extensions || {},
                    
                    // Preserve any extra data
                    _format: 'v1',
                    _originalData: v1Data
                }
            };
        },

        convertAgnaiToV2(agnaiData) {
            const v2Data = {
                spec: 'chara_card_v2',
                spec_version: '2.0',
                data: {
                    name: agnaiData.name || 'Unknown Character',
                    description: agnaiData.persona || agnaiData.description || '',
                    personality: agnaiData.personality || '',
                    scenario: agnaiData.scenario || '',
                    first_mes: agnaiData.greeting || agnaiData.first_mes || '',
                    mes_example: agnaiData.sampleChat || agnaiData.example_dialogue || '',
                    
                    creator_notes: '',
                    system_prompt: agnaiData.systemPrompt || '',
                    post_history_instructions: agnaiData.postHistoryInstructions || '',
                    alternate_greetings: agnaiData.alternateGreetings || [],
                    tags: agnaiData.tags || [],
                    creator: agnaiData.creator || 'Unknown',
                    character_version: agnaiData.version || '',
                    extensions: {},
                    
                    _format: 'agnai',
                    _originalData: agnaiData
                }
            };

            // Convert Agnai memory book to character book
            if (agnaiData.memoryBook) {
                v2Data.data.character_book = this.convertAgnaiMemoryBook(agnaiData.memoryBook);
            }

            return v2Data;
        },

        convertAgnaiMemoryBook(memoryBook) {
            return {
                name: memoryBook.name || 'Character Book',
                description: memoryBook.description || '',
                scan_depth: memoryBook.scanDepth || 50,
                token_budget: memoryBook.tokenBudget || 500,
                recursive_scanning: memoryBook.recursiveScanning !== false,
                extensions: {},
                entries: (memoryBook.entries || []).map((entry, index) => ({
                    keys: entry.keywords || [],
                    content: entry.entry || '',
                    extensions: {},
                    enabled: entry.enabled !== false,
                    insertion_order: entry.priority || index,
                    case_sensitive: entry.caseSensitive || false,
                    name: entry.name || '',
                    priority: entry.weight || 10,
                    id: index,
                    comment: '',
                    selective: false,
                    secondary_keys: [],
                    constant: false,
                    position: 'before_char'
                }))
            };
        },

        convertOobaToV2(oobaData) {
            return {
                spec: 'chara_card_v2',
                spec_version: '2.0',
                data: {
                    name: oobaData.char_name || oobaData.name || 'Unknown Character',
                    description: oobaData.char_persona || oobaData.description || '',
                    personality: oobaData.char_personality || '',
                    scenario: oobaData.world_scenario || oobaData.scenario || '',
                    first_mes: oobaData.char_greeting || oobaData.greeting || '',
                    mes_example: oobaData.example_dialogue || '',
                    
                    creator_notes: '',
                    system_prompt: '',
                    post_history_instructions: '',
                    alternate_greetings: [],
                    tags: [],
                    creator: 'Unknown',
                    character_version: '',
                    extensions: {},
                    
                    _format: 'ooba',
                    _originalData: oobaData
                }
            };
        },

        convertNovelAIToV2(naiData) {
            const v2Data = {
                spec: 'chara_card_v2',
                spec_version: '2.0',
                data: {
                    name: 'NovelAI Import',
                    description: '',
                    personality: '',
                    scenario: naiData.prompt || '',
                    first_mes: '',
                    mes_example: '',
                    
                    creator_notes: '',
                    system_prompt: '',
                    post_history_instructions: '',
                    alternate_greetings: [],
                    tags: [],
                    creator: 'Unknown',
                    character_version: '',
                    extensions: {},
                    
                    _format: 'novelai',
                    _originalData: naiData
                }
            };

            // Extract context
            if (naiData.context && naiData.context.length > 0) {
                let memory = '';
                for (let ctx of naiData.context) {
                    memory += ctx.text + '\n';
                }
                v2Data.data.description = memory.trim();
            }

            // Convert NovelAI lorebook
            if (naiData.lorebook) {
                v2Data.data.character_book = this.convertNovelAILorebook(naiData.lorebook);
            }

            return v2Data;
        },

        convertNovelAILorebook(lorebook) {
            return {
                name: lorebook.lorebookVersion ? 'NovelAI Lorebook' : 'Character Book',
                description: '',
                scan_depth: 50,
                token_budget: 500,
                recursive_scanning: false,
                extensions: {},
                entries: (lorebook.entries || []).map((entry, index) => ({
                    keys: entry.keys || [],
                    content: entry.text || '',
                    extensions: {},
                    enabled: entry.enabled !== false,
                    insertion_order: entry.insertorder || index,
                    case_sensitive: false,
                    name: entry.displayName || '',
                    priority: 10,
                    id: index,
                    comment: entry.comment || '',
                    selective: false,
                    secondary_keys: [],
                    constant: entry.alwaysActive || false,
                    position: 'before_char'
                }))
            };
        },

        convertAIDToV2(aidData) {
            // AID format is just world info entries
            return {
                spec: 'chara_card_v2',
                spec_version: '2.0',
                data: {
                    name: 'AID World Info Import',
                    description: 'Imported from AI Dungeon World Info',
                    personality: '',
                    scenario: '',
                    first_mes: '',
                    mes_example: '',
                    
                    creator_notes: '',
                    system_prompt: '',
                    post_history_instructions: '',
                    alternate_greetings: [],
                    tags: [],
                    creator: 'Unknown',
                    character_version: '',
                    extensions: {},
                    
                    character_book: {
                        name: 'AID World Info',
                        description: '',
                        scan_depth: 50,
                        token_budget: 500,
                        recursive_scanning: false,
                        extensions: {},
                        entries: aidData.map((entry, index) => ({
                            keys: entry.keys ? entry.keys.split(',').map(k => k.trim()) : [],
                            content: entry.value || '',
                            extensions: {},
                            enabled: true,
                            insertion_order: index,
                            case_sensitive: false,
                            name: '',
                            priority: 10,
                            id: index,
                            comment: '',
                            selective: false,
                            secondary_keys: [],
                            constant: false,
                            position: 'before_char'
                        }))
                    },
                    
                    _format: 'aid',
                    _originalData: aidData
                }
            };
        }
    };

    // =============================================
    // INDEXEDDB STORAGE MANAGER
    // =============================================
    const IndexedDBManager = {
        db: null,

        async init() {
            return new Promise((resolve, reject) => {
                const request = indexedDB.open(CONFIG.DB_NAME, CONFIG.DB_VERSION);
                
                request.onerror = () => reject(request.error);
                request.onsuccess = () => {
                    this.db = request.result;
                    resolve(this.db);
                };
                
                request.onupgradeneeded = (event) => {
                    const db = event.target.result;
                    if (!db.objectStoreNames.contains(CONFIG.STORE_NAME)) {
                        const store = db.createObjectStore(CONFIG.STORE_NAME, { keyPath: 'id' });
                        store.createIndex('name', 'name', { unique: false });
                        store.createIndex('creator', 'creator', { unique: false });
                        store.createIndex('tags', 'tags', { unique: false, multiEntry: true });
                        store.createIndex('rating', 'rating', { unique: false });
                    }
                };
            });
        },

        async saveCharacter(character) {
            if (!this.db) await this.init();
            
            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction([CONFIG.STORE_NAME], 'readwrite');
                const store = transaction.objectStore(CONFIG.STORE_NAME);
                const request = store.put(character);
                
                request.onerror = () => reject(request.error);
                request.onsuccess = () => resolve(request.result);
            });
        },

        async getAllCharacters() {
            if (!this.db) await this.init();
            
            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction([CONFIG.STORE_NAME], 'readonly');
                const store = transaction.objectStore(CONFIG.STORE_NAME);
                const request = store.getAll();
                
                request.onerror = () => reject(request.error);
                request.onsuccess = () => resolve(request.result);
            });
        },

        async deleteCharacter(id) {
            if (!this.db) await this.init();
            
            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction([CONFIG.STORE_NAME], 'readwrite');
                const store = transaction.objectStore(CONFIG.STORE_NAME);
                const request = store.delete(id);
                
                request.onerror = () => reject(request.error);
                request.onsuccess = () => resolve(request.result);
            });
        },

        async clearAllCharacters() {
            if (!this.db) await this.init();
            
            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction([CONFIG.STORE_NAME], 'readwrite');
                const store = transaction.objectStore(CONFIG.STORE_NAME);
                const request = store.clear();
                
                request.onerror = () => reject(request.error);
                request.onsuccess = () => resolve(request.result);
            });
        }
    };

    // =============================================
    // KOBOLDAI INTEGRATION FUNCTIONS
    // =============================================
    const KoboldAIIntegration = {
        isAvailable() {
            return typeof window.load_selected_file === 'function';
        },

        async loadAsScenario(characterData) {
            if (!this.isAvailable()) {
                throw new Error('KoboldAI functions not available');
            }

            try {
                console.log('Loading character via simulated file drop:', characterData.name);

                // Create a File object from our stored character data
                const file = await this.createFileFromCharacterData(characterData);
                
                if (!file) {
                    throw new Error('Could not create file from character data');
                }

                // Use KoboldAI's native file loading system - this will restart the session
                window.load_selected_file(file);
                
                console.log('Character file submitted to native loader - session will restart');
                return true;
                
            } catch (error) {
                console.error('Error loading character as scenario:', error);
                throw error;
            }
        },

        async createFileFromCharacterData(characterData) {
            if (!characterData._imageBlob) {
                throw new Error('No _imageBlob found - character storage is broken');
            }
            
            if (!(characterData._imageBlob instanceof Blob)) {
                throw new Error('_imageBlob is not a valid Blob object - storage corruption');
            }

            const fileName = `${characterData.name || 'character'}.png`;
            return new File([characterData._imageBlob], fileName, {
                type: 'image/png',
                lastModified: Date.now()
            });
        },

        async addToWorldInfo(characterData) {
            if (!this.isAvailable()) {
                throw new Error('KoboldAI functions not available');
            }

            try {
                if (typeof window.start_editing_wi === 'function') {
                    window.start_editing_wi();
                }

                const groupName = characterData.name || "Character";
                const entries = this.buildCharacterWIEntries(characterData, groupName);
                
                entries.forEach(entry => {
                    window.pending_wi_obj.push(entry);
                });
                
                if (characterData.character_book?.entries && typeof window.load_tavern_wi === 'function') {
                    const tavernWI = window.load_tavern_wi(
                        characterData.character_book, 
                        characterData.name, 
                        window.localsettings.chatname
                    );
                    tavernWI.forEach(entry => {
                        entry.wigroup = groupName;
                        window.pending_wi_obj.push(entry);
                    });
                }
                
                if (typeof window.commit_wi_changes === 'function') {
                    window.commit_wi_changes();
                }
                
                if (typeof window.update_wi === 'function') {
                    window.update_wi();
                }
                
                return true;
            } catch (error) {
                console.error('Error adding character to World Info:', error);
                throw error;
            }
        },

        buildCharacterWIEntries(characterData, groupName) {
            const entries = [];
            const baseName = characterData.name || "Character";
            
            if (characterData.description) {
                entries.push({
                    key: baseName,
                    keysecondary: "",
                    keyanti: "",
                    content: `Character: ${baseName}\n\nDescription: ${characterData.description}`,
                    comment: `${baseName} - Character Description`,
                    folder: null,
                    selective: false,
                    constant: false,
                    probability: 100,
                    wigroup: groupName,
                    widisabled: false
                });
            }
            
            if (characterData.personality) {
                entries.push({
                    key: `${baseName}, personality`,
                    keysecondary: "",
                    keyanti: "",
                    content: `${baseName}'s Personality: ${characterData.personality}`,
                    comment: `${baseName} - Personality`,
                    folder: null,
                    selective: false,
                    constant: false,
                    probability: 100,
                    wigroup: groupName,
                    widisabled: false
                });
            }
            
            if (characterData.scenario) {
                entries.push({
                    key: `${baseName}, scenario, setting`,
                    keysecondary: "",
                    keyanti: "",
                    content: `Scenario: ${characterData.scenario}`,
                    comment: `${baseName} - Scenario/Setting`,
                    folder: null,
                    selective: false,
                    constant: false,
                    probability: 100,
                    wigroup: groupName,
                    widisabled: false
                });
            }
            
            if (characterData.first_mes) {
                entries.push({
                    key: `${baseName}, greeting, first meeting`,
                    keysecondary: "",
                    keyanti: "",
                    content: `${baseName}'s Greeting: ${characterData.first_mes}`,
                    comment: `${baseName} - First Message/Greeting`,
                    folder: null,
                    selective: false,
                    constant: false,
                    probability: 100,
                    wigroup: groupName,
                    widisabled: false
                });
            }
            
            return entries;
        },

        async removeFromWorldInfo(characterName) {
            if (!this.isAvailable()) {
                throw new Error('KoboldAI functions not available');
            }

            try {
                if (typeof window.start_editing_wi === 'function') {
                    window.start_editing_wi();
                }

                const groupName = characterName;
                const originalCount = window.pending_wi_obj.length;
                
                window.pending_wi_obj = window.pending_wi_obj.filter(entry => {
                    return entry.wigroup !== groupName;
                });
                
                const removedCount = originalCount - window.pending_wi_obj.length;
                
                if (typeof window.commit_wi_changes === 'function') {
                    window.commit_wi_changes();
                }
                
                if (typeof window.update_wi === 'function') {
                    window.update_wi();
                }
            
                return removedCount;
            } catch (error) {
                console.error('Error removing character from World Info:', error);
                throw error;
            }
        }
    };

    // =============================================
    // SECTION HANDLERS
    // =============================================
    const SectionHandlers = {
        handleSectionHeader(e) {
            const sectionHeader = e.target.closest('.KLITECharacterManager-section-header');
            if (sectionHeader) {
                e.preventDefault();
                e.stopImmediatePropagation();
                const section = sectionHeader.closest('.KLITECharacterManager-section');
                section.classList.toggle('collapsed');
                const arrow = sectionHeader.querySelector('span:last-child');
                arrow.textContent = section.classList.contains('collapsed') ? '▶' : '▼';
                return true;
            }
            return false;
        }
    };

    // =============================================
    // SECURITY & SANITIZATION UTILITIES
    // =============================================
    const SecurityUtils = {
        // HTML sanitization
        sanitizeHTML(text) {
            if (typeof text !== 'string') return text;
            
            // Create a temporary div to safely escape HTML
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        },

        sanitizeCharacterDataPreserveFormat(characterData) {
            const sanitized = {
                ...characterData,
                name: SecurityUtils.sanitizeCharacterName(characterData.name),
                creator: SecurityUtils.sanitizeCreatorName(characterData.creator),
                tags: SecurityUtils.sanitizeTags(characterData.tags)
            };

            // Sanitize text fields while preserving formatting
            const textFields = ['description', 'scenario', 'personality', 'first_mes', 'mes_example', 
                            'creator_notes', 'system_prompt', 'post_history_instructions'];
            textFields.forEach(field => {
                if (sanitized[field]) {
                    sanitized[field] = SecurityUtils.sanitizeTextPreserveFormat(sanitized[field]);
                }
            });

            // Handle nested character book data
            if (sanitized.character_book && sanitized.character_book.entries) {
                sanitized.character_book.entries = sanitized.character_book.entries.map(entry => ({
                    ...entry,
                    content: SecurityUtils.sanitizeTextPreserveFormat(entry.content || ''),
                    comment: SecurityUtils.sanitizeTextPreserveFormat(entry.comment || ''),
                    key: SecurityUtils.sanitizeTextPreserveFormat(entry.key || ''),
                    keysecondary: SecurityUtils.sanitizeTextPreserveFormat(entry.keysecondary || ''),
                    keyanti: SecurityUtils.sanitizeTextPreserveFormat(entry.keyanti || '')
                }));
            }

            // Handle alternate greetings
            if (Array.isArray(sanitized.alternate_greetings)) {
                sanitized.alternate_greetings = sanitized.alternate_greetings
                    .map(greeting => SecurityUtils.sanitizeTextPreserveFormat(greeting));
            }

            return sanitized;
        },

        // Remove potentially dangerous content
        sanitizeTextPreserveFormat(text) {
            if (typeof text !== 'string') return text;
            
            return text
                // Remove script tags and their content
                .replace(/<script[\s\S]*?<\/script>/gi, '')
                // Remove javascript: URLs
                .replace(/javascript:/gi, '')
                // Remove on* event handlers
                .replace(/\s*on\w+\s*=\s*[^>]*/gi, '')
                // Remove data: URLs (except safe image types)
                .replace(/data:(?!image\/(png|jpg|jpeg|gif|svg\+xml))[^;]*/gi, '');
                // DO NOT escape HTML entities - preserve formatting
        },

        // Validate and sanitize character name
        sanitizeCharacterName(name) {
            if (!name || typeof name !== 'string') {
                return 'Unknown Character';
            }
            
            // Remove control characters and limit length
            const cleaned = name
                .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
                .trim()
                .substring(0, 100); // Limit to 100 characters
                
            return cleaned || 'Unknown Character';
        },

        // Validate and sanitize creator name
        sanitizeCreatorName(creator) {
            if (!creator || typeof creator !== 'string') {
                return 'Unknown';
            }
            
            const cleaned = creator
                .replace(/[\x00-\x1F\x7F]/g, '')
                .trim()
                .substring(0, 50); // Limit creator name length
                
            return cleaned || 'Unknown';
        },

        // Sanitize tags array
        sanitizeTags(tags) {
            if (!Array.isArray(tags)) {
                return [];
            }
            
            return tags
                .filter(tag => typeof tag === 'string')
                .map(tag => tag
                    .replace(/[\x00-\x1F\x7F]/g, '')
                    .trim()
                    .substring(0, 30) // Limit tag length
                )
                .filter(tag => tag.length > 0)
                .slice(0, 20); // Limit number of tags
        },

        // Comprehensive character data sanitization
        sanitizeCharacterData(characterData) {
            const sanitized = {
                ...characterData,
                name: this.sanitizeCharacterName(characterData.name),
                creator: this.sanitizeCreatorName(characterData.creator),
                tags: this.sanitizeTags(characterData.tags)
            };

            // Sanitize all text fields
            const textFields = ['description', 'scenario', 'personality', 'first_mes', 'mes_example'];
            textFields.forEach(field => {
                if (sanitized[field]) {
                    sanitized[field] = this.sanitizeText(sanitized[field]);
                }
            });

            // Handle nested character book data
            if (sanitized.character_book && sanitized.character_book.entries) {
                sanitized.character_book.entries = sanitized.character_book.entries.map(entry => ({
                    ...entry,
                    content: this.sanitizeText(entry.content || ''),
                    comment: this.sanitizeText(entry.comment || ''),
                    key: this.sanitizeText(entry.key || ''),
                    keysecondary: this.sanitizeText(entry.keysecondary || ''),
                    keyanti: this.sanitizeText(entry.keyanti || '')
                }));
            }

            // Handle alternate greetings
            if (Array.isArray(sanitized.alternate_greetings)) {
                sanitized.alternate_greetings = sanitized.alternate_greetings
                    .map(greeting => this.sanitizeText(greeting))
                    .filter(greeting => greeting.length > 0);
            }

            return sanitized;
        }
    };

    // =============================================
    // ENHANCED CHARACTER MANAGER CLASS
    // =============================================
    class EnhancedCharacterManager {
        constructor() {
            this.characters = [];
            this.selectedCharacter = null;
            this.currentTagCharacter = null;
            this.selectedTag = '';
            this.selectedRating = '';
            this.searchTerm = '';
            this.toolContainer = null;
            this.fileInput = null;
            this.toggleHandle = null;
            this.collapsed = false;
            this.collapsedSections = new Set();
            this.collapsedFullscreenSections = new Set();
        }

        async init() {
            console.log('Initializing KLITECharacterManager');
            this.injectStyles();
            this.createToolContainer();
            await this.loadCharacters();
            this.initEventListeners();
            this.updateGallery();
            this.updateTagFilter();
            this.updateRatingFilter();
            this.updateKoboldAIStatus();
        }

        injectStyles() {
            const existingStyle = document.getElementById('enhanced-character-manager-styles');
            if (existingStyle) {
                existingStyle.remove();
            }

            const styleElement = document.createElement('style');
            styleElement.id = 'enhanced-character-manager-styles';
            styleElement.textContent = CharacterManagerStyles;
            document.head.appendChild(styleElement);
        }

        createToolContainer() {
            const existing = document.getElementById(CONFIG.TOOL_ID);
            if (existing) {
                existing.remove();
            }

            this.toolContainer = document.createElement('div');
            this.toolContainer.id = CONFIG.TOOL_ID;
            this.toolContainer.className = 'KLITECharacterManager';
            
            if (this.collapsed) {
                this.toolContainer.classList.add('collapsed');
            }

            this.toolContainer.innerHTML = `
                <div class="KLITECharacterManager-header">
                    <h3>KLITE Character Manager ${CONFIG.VERSION}</h3>
                </div>
                <div class="KLITECharacterManager-content-wrapper">
                    <div class="KLITECharacterManager-scroll-container">
                        <!-- Import Section -->
                        <div class="KLITECharacterManager-section">
                            <div class="KLITECharacterManager-section-header" data-section="import">
                                <span>Import Characters</span>
                                <span>▼</span>
                            </div>
                            <div class="KLITECharacterManager-section-content">
                                <div class="KLITECharacterManager-upload-zone" id="char-upload-zone">
                                    Drop PNG/WEBP/JSON files here or click to browse
                                </div>
                                <div style="display: flex; gap: 5px; margin-top: 5px;">
                                    <button class="KLITECharacterManager-button" id="char-import-btn" style="flex: 1;">
                                        Import Files
                                    </button>
                                    <button class="KLITECharacterManager-button delete-btn" id="char-clear-btn" style="flex: 1;">
                                        Clear All
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Search & Filter Section -->
                        <div class="KLITECharacterManager-section">
                            <div class="KLITECharacterManager-section-header" data-section="search">
                                <span>Search & Filter</span>
                                <span>▼</span>
                            </div>
                            <div class="KLITECharacterManager-section-content">
                                <input type="text" id="char-search-input" placeholder="Search characters..." 
                                    class="KLITECharacterManager-input" value="${this.searchTerm}">
                                <select id="char-tag-filter" class="KLITECharacterManager-input">
                                    <option value="">All Tags</option>
                                </select>
                                <select id="char-rating-filter" class="KLITECharacterManager-rating-filter">
                                    <option value="">All Ratings</option>
                                    <option value="5">★★★★★ (5 stars)</option>
                                    <option value="4">★★★★☆ (4 stars)</option>
                                    <option value="3">★★★☆☆ (3 stars)</option>
                                    <option value="2">★★☆☆☆ (2 stars)</option>
                                    <option value="1">★☆☆☆☆ (1 star)</option>
                                    <option value="0">☆ Unrated</option>
                                </select>
                            </div>
                        </div>

                        <!-- Character Gallery Section -->
                        <div class="KLITECharacterManager-section">
                            <div class="KLITECharacterManager-section-header" data-section="gallery">
                                <span>Character Gallery</span>
                                <span>▼</span>
                            </div>
                            <div class="KLITECharacterManager-section-content">
                                <div id="char-gallery-stats" style="color: #888; font-size: 11px; margin-bottom: 8px;">
                                    0 characters loaded
                                </div>
                                <div class="KLITECharacterManager-character-grid" id="char-character-grid">
                                    <!-- Characters will be populated here -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Fullscreen Character View -->
                <div class="KLITECharacterManager-fullscreen-view" id="char-fullscreen-view">
                    <div class="KLITECharacterManager-fullscreen-header">
                        <button class="KLITECharacterManager-button" id="char-back-btn">
                            ← Back
                        </button>
                        <span id="char-fullscreen-title">Character Details</span>
                    </div>
                    <div class="KLITECharacterManager-fullscreen-actions">
                        <button class="KLITECharacterManager-button scenario-btn" id="char-load-scenario-btn">
                            Load as Scenario
                        </button>
                        <button class="KLITECharacterManager-button delete-btn" id="char-remove-character-btn">
                            Delete Character
                        </button>
                    </div>
                    <div class="KLITECharacterManager-fullscreen-actions">
                        <button class="KLITECharacterManager-button worldinfo-btn" id="char-add-worldinfo-btn">
                            Add to World Info
                        </button>
                        <button class="KLITECharacterManager-button delete-btn" id="char-remove-worldinfo-btn">
                            Remove from WI
                        </button>
                    </div>
                    <div class="KLITECharacterManager-fullscreen-content" id="char-fullscreen-content">
                        <!-- Content will be populated dynamically -->
                    </div>
                </div>

                <!-- Tag Modal -->
                <div class="KLITECharacterManager-modal hidden" id="char-tag-modal">
                    <div class="KLITECharacterManager-modal-content">
                        <h3>Add Tag</h3>
                        <input type="text" id="char-tag-input" placeholder="Enter tag name...">
                        <div class="KLITECharacterManager-modal-buttons">
                            <button class="KLITECharacterManager-button" id="char-tag-cancel-btn">Cancel</button>
                            <button class="KLITECharacterManager-button" id="char-tag-add-btn">Add</button>
                        </div>
                    </div>
                </div>

                <!-- Success Message -->
                <div class="KLITECharacterManager-success-message" id="char-success-message">
                    Character loaded successfully!
                </div>
            `;

            this.toggleHandle = document.createElement('div');
            this.toggleHandle.className = 'KLITECharacterManager-toggle-handle';
            this.toggleHandle.title = 'Click to toggle';
            
            this.toolContainer.appendChild(this.toggleHandle);
            
            this.toggleHandle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleMinimize();
            });

            // Create hidden file input
            this.fileInput = document.createElement('input');
            this.fileInput.type = 'file';
            this.fileInput.accept = '.png,.webp,.json';
            this.fileInput.multiple = true;
            this.fileInput.style.display = 'none';
            
            document.body.appendChild(this.toolContainer);
            document.body.appendChild(this.fileInput);

            const resizeObserver = new ResizeObserver(() => {
                const scrollContainer = this.toolContainer.querySelector('.KLITECharacterManager-scroll-container');
                if (scrollContainer) {
                    const headerHeight = this.toolContainer.querySelector('.KLITECharacterManager-header')?.offsetHeight || 50;
                    const availableHeight = this.toolContainer.offsetHeight - headerHeight - 20;
                    scrollContainer.style.maxHeight = `${Math.max(availableHeight, 100)}px`;
                }
            });
            
            resizeObserver.observe(this.toolContainer);
        }

        toggleMinimize() {
            console.log('toggleMinimize called, current collapsed state:', this.collapsed);
            this.collapsed = !this.collapsed;
            this.toolContainer.classList.toggle('collapsed');
            console.log('New collapsed state:', this.collapsed);
            
            setTimeout(() => {
                this.toolContainer.style.display = 'none';
                this.toolContainer.offsetHeight;
                this.toolContainer.style.display = 'flex';
            }, 0);
        }

        updateKoboldAIStatus() {
            const statusElement = document.getElementById('char-kobold-status');
            if (statusElement) {
                const isAvailable = KoboldAIIntegration.isAvailable();
                statusElement.textContent = isAvailable ? 'OK' : 'nOK';
                statusElement.className = `KLITECharacterManager-kobold-status ${isAvailable ? 'available' : 'unavailable'}`;
            }
        }

        initEventListeners() {
            // Core event handlers
            this.toolContainer.addEventListener('click', (e) => {
                if (SectionHandlers.handleSectionHeader(e)) return;
            });

            // File handling
            const uploadZone = document.getElementById('char-upload-zone');
            const importBtn = document.getElementById('char-import-btn');
            const clearBtn = document.getElementById('char-clear-btn');

            uploadZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadZone.classList.add('dragover');
            });

            uploadZone.addEventListener('dragleave', () => {
                uploadZone.classList.remove('dragover');
            });

            uploadZone.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadZone.classList.remove('dragover');
                this.handleFiles(e.dataTransfer.files);
            });

            uploadZone.addEventListener('click', () => {
                this.fileInput.click();
            });

            this.fileInput.addEventListener('change', (e) => {
                this.handleFiles(e.target.files);
            });

            importBtn.addEventListener('click', () => this.fileInput.click());
            clearBtn.addEventListener('click', () => this.clearAll());

            // Search and filter
            const searchInput = document.getElementById('char-search-input');
            const tagFilter = document.getElementById('char-tag-filter');
            const ratingFilter = document.getElementById('char-rating-filter');

            searchInput.addEventListener('input', () => {
                this.searchTerm = searchInput.value;
                this.updateGallery();
            });

            tagFilter.addEventListener('change', () => {
                this.selectedTag = tagFilter.value;
                this.updateGallery();
            });

            ratingFilter.addEventListener('change', () => {
                this.selectedRating = ratingFilter.value;
                this.updateGallery();
            });

            // Fullscreen view
            const backBtn = document.getElementById('char-back-btn');
            const loadScenarioBtn = document.getElementById('char-load-scenario-btn');
            const addWorldInfoBtn = document.getElementById('char-add-worldinfo-btn');
            const removeWorldInfoBtn = document.getElementById('char-remove-worldinfo-btn');
            const removeCharacterBtn = document.getElementById('char-remove-character-btn');

            backBtn.addEventListener('click', () => this.closeFullscreen());
            loadScenarioBtn.addEventListener('click', () => {
                if (this.selectedCharacter) {
                    this.loadAsScenario(this.selectedCharacter);
                }
            });
            addWorldInfoBtn.addEventListener('click', () => {
                if (this.selectedCharacter) {
                    this.addToWorldInfo(this.selectedCharacter);
                }
            });
            removeWorldInfoBtn.addEventListener('click', () => {
                if (this.selectedCharacter) {
                    this.removeFromWorldInfo(this.selectedCharacter);
                }
            });
            removeCharacterBtn.addEventListener('click', () => {
                if (this.selectedCharacter) {
                    this.removeCharacter(this.selectedCharacter);
                }
            });

            // Tag modal
            const tagModal = document.getElementById('char-tag-modal');
            const tagInput = document.getElementById('char-tag-input');
            const tagCancelBtn = document.getElementById('char-tag-cancel-btn');
            const tagAddBtn = document.getElementById('char-tag-add-btn');

            tagCancelBtn.addEventListener('click', () => this.closeTagModal());
            tagAddBtn.addEventListener('click', () => this.addTag());
            
            tagInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.addTag();
                }
            });

            tagModal.addEventListener('click', (e) => {
                if (e.target.id === 'char-tag-modal') {
                    this.closeTagModal();
                }
            });
        }

        cleanTextEncoding(characterData) {
            // PRESERVE binary data before JSON serialization
            const preservedBlob = characterData._imageBlob;
            const preservedImageData = characterData._imageData;
            
            console.log('Before cleaning - has blob:', !!preservedBlob);
            console.log('Before cleaning - blob type:', preservedBlob?.constructor.name);
            
            // Create deep copy for text cleaning (this removes blobs)
            const cleaned = JSON.parse(JSON.stringify(characterData));
            
            // Function to clean text in any string value
            const cleanText = (text) => {
                if (typeof text !== 'string') return text;
                
                return text
                    // Fix common UTF-8 encoding artifacts
                    .replace(/â€™/g, "'")           // Smart apostrophe artifacts
                    .replace(/â€œ/g, '"')          // Smart quote artifacts  
                    .replace(/â€/g, '"')          // Smart quote artifacts
                    .replace(/â€"/g, '—')          // Em dash artifacts
                    .replace(/â€"/g, '–')          // En dash artifacts
                    .replace(/Â /g, ' ')           // Non-breaking space artifacts
                    .replace(/â€¦/g, '…')         // Ellipsis artifacts
                    .replace(/â€¢/g, '•')         // Bullet point artifacts

                    // Fix specific Unicode apostrophe and quote characters by char code
                    .replace(/\u2019/g, "'")     // Right single quotation mark (8217) → standard apostrophe
                    .replace(/\u2018/g, "'")     // Left single quotation mark (8216) → standard apostrophe  
                    .replace(/\u201C/g, '"')     // Left double quotation mark (8220) → standard quote
                    .replace(/\u201D/g, '"')     // Right double quotation mark (8221) → standard quote
                    
                    // Fix various quote and apostrophe characters (iPad/Mac/device specific)
                    .replace(/['']/g, "'")       // Smart apostrophes/single quotes → standard apostrophe
                    .replace(/[""]/g, '"')       // Smart double quotes → standard double quotes
                    .replace(/[´`]/g, "'")       // Acute accent & grave accent → standard apostrophe
                    .replace(/[‚„]/g, '"')       // Bottom quotes → standard double quotes
                    .replace(/[‹›]/g, "'")       // Single angle quotes → standard apostrophe
                    .replace(/[«»]/g, '"')       // Double angle quotes → standard double quotes
                    
                    // Fix accented characters
                    .replace(/Ã¡/g, 'á')         // á character
                    .replace(/Ã©/g, 'é')         // é character
                    .replace(/Ã­/g, 'í')         // í character
                    .replace(/Ã³/g, 'ó')         // ó character
                    .replace(/Ãº/g, 'ú')         // ú character
                    .replace(/Ã±/g, 'ñ')         // ñ character
                    .replace(/Ã¼/g, 'ü')         // ü character
                    .replace(/Ã¶/g, 'ö')         // ö character
                    .replace(/Ã¤/g, 'ä')         // ä character
                    .replace(/Ã /g, 'à')         // à character
                    .replace(/Ã¨/g, 'è')         // è character
                    .replace(/Ã¬/g, 'ì')         // ì character
                    .replace(/Ã²/g, 'ò')         // ò character
                    .replace(/Ã¹/g, 'ù')         // ù character
                    .replace(/Ã‡/g, 'Ç')         // Ç character
                    
                    // Additional common patterns
                    .replace(/â€™\s/g, "' ")       // Apostrophe with space
                    .replace(/â€™([a-zA-Z])/g, "'$1") // Apostrophe before letters
                    .replace(/â€œ\s/g, '" ')       // Quote with space
                    .replace(/â€œ([a-zA-Z])/g, '"$1') // Quote before letters
                    
                    // DO NOT collapse multiple spaces or trim - preserve formatting!
                    // .replace(/\s+/g, ' ')        // REMOVED - this was destroying formatting
                    // .trim();                     // REMOVED - preserve leading/trailing whitespace
                    ;
            };
            
            // Recursively clean all string properties
            const cleanObject = (obj) => {
                if (typeof obj === 'string') {
                    return cleanText(obj);
                } else if (Array.isArray(obj)) {
                    return obj.map(cleanObject);
                } else if (obj && typeof obj === 'object') {
                    const result = {};
                    for (const [key, value] of Object.entries(obj)) {
                        result[key] = cleanObject(value);
                    }
                    return result;
                }
                return obj;
            };

            const encodingCleaned = cleanObject(cleaned);
            
            // Sanitize the import for security with formatting preservation
            const sanitized = SecurityUtils.sanitizeCharacterDataPreserveFormat(encodingCleaned);
            
            // RESTORE binary data after cleaning and sanitization
            if (preservedBlob) {
                sanitized._imageBlob = preservedBlob;
                console.log('Restored blob to cleaned data');
            }
            
            if (preservedImageData) {
                sanitized._imageData = preservedImageData;
                console.log('Restored image data to cleaned data');
            }
            
            console.log('After cleaning - has blob:', !!sanitized._imageBlob);
            
            return sanitized;
        }

        async handleFiles(files) {
            for (const file of files) {
                try {
                    if (file.size > 50 * 1024 * 1024) {
                        throw new Error(`File too large: ${file.name}`);
                    }
                    
                    if (file.type === 'application/json' || file.name.endsWith('.json')) {
                        await this.loadJSONFile(file);
                    } else if (file.type === 'image/png' || file.name.endsWith('.png')) {
                        await this.loadPNGFile(file);
                    } else if (file.type === 'image/webp' || file.name.endsWith('.webp')) {
                        await this.loadWEBPFile(file);
                    } else {
                        throw new Error(`Unsupported file type: ${file.name}`);
                    }
                } catch (error) {
                    alert(`Error loading ${file.name}: ${error.message}`);
                }
            }
            this.updateGallery();
            this.updateTagFilter();
        }

        async loadJSONFile(file) {
            const text = await file.text();
            let data;
            
            try {
                data = JSON.parse(text);
            } catch (e) {
                throw new Error('Invalid JSON file');
            }

            // Detect format
            const format = FormatDetector.detectFormat(data);
            console.log(`Detected format: ${format} for file: ${file.name}`);

            if (format === 'unknown') {
                throw new Error('Unknown character card format');
            }

            // Convert to V2 format
            const v2Data = await FormatDetector.convertToV2(data, format);
            
            // Clean and add character
            const cleanedData = this.cleanTextEncoding(v2Data.data);
            cleanedData._importFormat = format;
            await this.addCharacter(cleanedData);
        }

        async loadPNGFile(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    try {
                        const arrayBuffer = e.target.result;
                        const uint8Array = new Uint8Array(arrayBuffer);
                        
                        console.log(`Processing PNG file: ${file.name}, size: ${uint8Array.length} bytes`);
                        
                        let textChunks = [];
                        try {
                            textChunks = this.extractPNGTextChunks(uint8Array);
                        } catch (parseError) {
                            console.error('PNG parsing failed:', parseError);
                            reject(new Error(`PNG parsing failed: ${parseError.message}`));
                            return;
                        }
                        
                        let characterData = null;
                        
                        for (const chunk of textChunks) {
                            if (chunk.keyword === 'chara' || chunk.keyword === 'ccv2') {
                                try {
                                    const decodedData = atob(chunk.text);
                                    const parsed = JSON.parse(decodedData);
                                    if (parsed.spec === 'chara_card_v2' && parsed.data) {
                                        characterData = parsed.data;
                                        console.log('Found character data:', characterData.name);
                                        break;
                                    }
                                } catch (e) {
                                    console.warn('Failed to parse chunk data:', e);
                                    continue;
                                }
                            }
                        }
                        
                        if (characterData) {
                            const blob = new Blob([uint8Array], { type: 'image/png' });
                            const imageUrl = URL.createObjectURL(blob);
                            
                            characterData._imageData = imageUrl;
                            characterData._imageBlob = blob;

                            const cleanedData = this.cleanTextEncoding(characterData);

                            console.log('Created image URL:', imageUrl);
                            await this.addCharacter(cleanedData);
                            resolve();
                        } else {
                            reject(new Error('No Character Format V2 data found in PNG'));
                        }
                    } catch (error) {
                        console.error('Error in loadPNGFile:', error);
                        reject(error);
                    }
                };
                reader.onerror = () => reject(new Error('Failed to read file'));
                reader.readAsArrayBuffer(file);
            });
        }

        async loadWEBPFile(file) {
            // WEBP support - extract EXIF data
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    try {
                        const arrayBuffer = e.target.result;
                        const uint8Array = new Uint8Array(arrayBuffer);
                        
                        // Try to extract character data from WEBP EXIF
                        const characterData = this.extractWEBPCharacterData(uint8Array);
                        
                        if (characterData) {
                            const blob = new Blob([uint8Array], { type: 'image/webp' });
                            const imageUrl = URL.createObjectURL(blob);
                            
                            characterData._imageData = imageUrl;
                            characterData._imageBlob = blob;
                            
                            const cleanedData = this.cleanTextEncoding(characterData);
                            await this.addCharacter(cleanedData);
                            resolve();
                        } else {
                            reject(new Error('No character data found in WEBP'));
                        }
                    } catch (error) {
                        reject(error);
                    }
                };
                reader.onerror = () => reject(new Error('Failed to read file'));
                reader.readAsArrayBuffer(file);
            });
        }

        extractPNGTextChunks(uint8Array) {
            const chunks = [];
            let offset = 8;
            let iterations = 0;
            const maxIterations = 1000;
            
            console.log(`Starting PNG parsing, file size: ${uint8Array.length} bytes`);
            
            // Verify PNG signature
            const signature = [137, 80, 78, 71, 13, 10, 26, 10];
            for (let i = 0; i < 8; i++) {
                if (uint8Array[i] !== signature[i]) {
                    throw new Error('Invalid PNG signature');
                }
            }
            
            while (offset < uint8Array.length && iterations < maxIterations) {
                iterations++;
                
                if (offset + 8 > uint8Array.length) {
                    console.log('Reached end of file - insufficient bytes for chunk header');
                    break;
                }
                
                const length = (uint8Array[offset] << 24) | 
                              (uint8Array[offset + 1] << 16) | 
                              (uint8Array[offset + 2] << 8) | 
                              uint8Array[offset + 3];
                
                const type = String.fromCharCode(
                    uint8Array[offset + 4],
                    uint8Array[offset + 5],
                    uint8Array[offset + 6],
                    uint8Array[offset + 7]
                );
                
                console.log(`Chunk ${iterations}: type="${type}", length=${length}, offset=${offset}`);
                
                if (length < 0 || length > 100 * 1024 * 1024) {
                    console.warn(`Invalid chunk length: ${length}, stopping parsing`);
                    break;
                }
                
                const totalChunkSize = 8 + length + 4;
                if (offset + totalChunkSize > uint8Array.length) {
                    console.warn(`Chunk extends beyond file end`);
                    break;
                }
                
                if (type === 'tEXt' && length > 0) {
                    try {
                        const chunkData = uint8Array.slice(offset + 8, offset + 8 + length);
                        const nullIndex = chunkData.indexOf(0);
                        
                        if (nullIndex !== -1 && nullIndex < chunkData.length - 1) {
                            let keyword = '';
                            for (let i = 0; i < nullIndex; i++) {
                                keyword += String.fromCharCode(chunkData[i]);
                            }
                            
                            let text = '';
                            for (let i = nullIndex + 1; i < chunkData.length; i++) {
                                text += String.fromCharCode(chunkData[i]);
                            }
                            
                            chunks.push({ keyword, text });
                            console.log(`Found tEXt chunk: keyword="${keyword}", text length=${text.length}`);
                        }
                    } catch (e) {
                        console.warn('Error parsing tEXt chunk:', e);
                    }
                }
                
                if (type === 'IEND') {
                    console.log('Found IEND chunk, stopping parsing');
                    break;
                }
                
                offset = offset + 8 + length + 4;
            }
            
            console.log(`PNG parsing completed. Iterations: ${iterations}, chunks found: ${chunks.length}`);
            return chunks;
        }

        extractWEBPCharacterData(uint8Array) {
            console.log("Attempting WEBP import...");
            
            // Check WEBP header
            if (!(uint8Array[0] === 0x52 && uint8Array[1] === 0x49 && 
                  uint8Array[2] === 0x46 && uint8Array[3] === 0x46 &&
                  uint8Array[8] === 0x57 && uint8Array[9] === 0x45 && 
                  uint8Array[10] === 0x42 && uint8Array[11] === 0x50)) {
                console.log("Invalid WEBP header");
                return null;
            }
            
            // Search for EXIF data
            let offset = 12;
            while (offset < uint8Array.length - 8) {
                // Read chunk header
                if (offset + 8 > uint8Array.length) break;
                
                const chunkType = String.fromCharCode(
                    uint8Array[offset], uint8Array[offset + 1],
                    uint8Array[offset + 2], uint8Array[offset + 3]
                );
                
                const chunkSize = uint8Array[offset + 4] | 
                                 (uint8Array[offset + 5] << 8) |
                                 (uint8Array[offset + 6] << 16) |
                                 (uint8Array[offset + 7] << 24);
                
                console.log(`WEBP chunk: ${chunkType}, size: ${chunkSize}`);
                
                if (chunkType === 'EXIF' && chunkSize > 0) {
                    // Found EXIF chunk
                    const exifData = uint8Array.slice(offset + 8, offset + 8 + chunkSize);
                    
                    // Look for UserComment in EXIF data
                    const userComment = this.findEXIFUserComment(exifData);
                    if (userComment) {
                        try {
                            const parsed = JSON.parse(userComment);
                            console.log("Found character data in WEBP EXIF");
                            
                            // Detect format and convert
                            const format = FormatDetector.detectFormat(parsed);
                            if (format !== 'unknown') {
                                const v2Data = FormatDetector.convertToV2(parsed, format);
                                v2Data.data._importFormat = format;
                                return v2Data.data;
                            }
                            
                            return parsed.data || parsed;
                        } catch (e) {
                            console.warn('Failed to parse WEBP character data:', e);
                        }
                    }
                }
                
                // Move to next chunk (add padding for odd sizes)
                offset += 8 + chunkSize + (chunkSize % 2);
            }
            
            console.log("No character data found in WEBP");
            return null;
        }

        findEXIFUserComment(exifData) {
            // Simple EXIF parser looking for UserComment tag (0x9286)
            for (let i = 0; i < exifData.length - 20; i++) {
                // Look for UserComment tag
                if ((exifData[i] === 0x92 && exifData[i + 1] === 0x86) ||
                    (exifData[i] === 0x86 && exifData[i + 1] === 0x92)) {
                    
                    // Found UserComment tag, extract the string data
                    let start = i + 10; // Skip tag and type info
                    let end = start;
                    
                    // Find the end of the string data
                    while (end < exifData.length && end < start + 10000) {
                        if (exifData[end] === 0 && exifData[end + 1] === 0) break;
                        end++;
                    }
                    
                    if (end > start) {
                        let comment = '';
                        for (let j = start; j < end; j++) {
                            if (exifData[j] !== 0) {
                                comment += String.fromCharCode(exifData[j]);
                            }
                        }
                        
                        // Try to find JSON in the comment
                        const jsonStart = comment.indexOf('{');
                        if (jsonStart !== -1) {
                            const jsonEnd = comment.lastIndexOf('}');
                            if (jsonEnd > jsonStart) {
                                return comment.substring(jsonStart, jsonEnd + 1);
                            }
                        }
                    }
                }
            }
            return null;
        }

        async addCharacter(characterData) {
            const character = {
                id: Date.now() + Math.random(),
                name: characterData.name,
                description: characterData.description || '',
                scenario: characterData.scenario || '',
                creator: characterData.creator || 'Unknown',
                // STORE THE BLOB OBJECT, NOT THE URL
                imageBlob: characterData._imageBlob || null, // Store actual blob
                tags: characterData.tags || [],
                rating: 0,
                rawData: characterData,
                importedAt: new Date().toISOString()
            };
            
            this.characters.push(character);
            await IndexedDBManager.saveCharacter(character);
        }

        async removeCharacter(character) {
            if (!character) {
                console.error('No character provided to removeCharacter');
                alert('Error: No character selected for removal');
                return;
            }

            const confirmMsg = `Are you sure you want to permanently delete "${character.name}"?\n\nThis action cannot be undone.`;
            
            if (!confirm(confirmMsg)) {
                return;
            }

            try {
                const removeBtn = document.getElementById('char-remove-character-btn');
                if (removeBtn) {
                    removeBtn.textContent = 'Removing...';
                    removeBtn.disabled = true;
                }

                // Clean up blob URL if it exists
                if (character.image && character.image.startsWith('blob:')) {
                    URL.revokeObjectURL(character.image);
                    console.log('Cleaned up blob URL for character:', character.name);
                }

                // Remove from IndexedDB first
                await IndexedDBManager.deleteCharacter(character.id);
                console.log('Character removed from IndexedDB');
                
                // Remove from local array
                const index = this.characters.findIndex(c => c.id === character.id);
                if (index !== -1) {
                    this.characters.splice(index, 1);
                    console.log(`Character removed from array at index ${index}`);
                }

                // Update UI
                this.updateGallery();
                this.updateTagFilter();
                this.updateRatingFilter();
                this.closeFullscreen();
                this.showSuccessMessage(`"${character.name}" has been removed`);
                
            } catch (error) {
                console.error('Error removing character:', error);
                alert(`Failed to remove character: ${error.message}`);
            } finally {
                const removeBtn = document.getElementById('char-remove-character-btn');
                if (removeBtn) {
                    removeBtn.textContent = 'Remove this Char';
                    removeBtn.disabled = false;
                }
            }
        }

        async loadCharacters() {
            try {
                this.characters = await IndexedDBManager.getAllCharacters();
                
                // Recreate blob URLs for each character
                this.characters.forEach(char => {
                    if (char.rating === undefined) {
                        char.rating = 0;
                    }
                    
                    // RECREATE BLOB URL FROM STORED BLOB
                    if (char.imageBlob && !char.image) {
                        char.image = URL.createObjectURL(char.imageBlob);
                        console.log(`Recreated blob URL for ${char.name}:`, char.image);
                    }
                });
                
                console.log(`Loaded ${this.characters.length} characters from IndexedDB`);
            } catch (error) {
                console.error('Error loading characters:', error);
                this.characters = [];
            }
        }

        updateGallery() {
            const grid = document.getElementById('char-character-grid');
            
            const filteredCharacters = this.characters.filter(char => {
                const matchesSearch = !this.searchTerm || 
                    char.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                    char.creator.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                    char.tags.some(tag => tag.toLowerCase().includes(this.searchTerm.toLowerCase()));
                
                const matchesTag = !this.selectedTag || char.tags.includes(this.selectedTag);
                
                const matchesRating = !this.selectedRating || char.rating.toString() === this.selectedRating;
                
                return matchesSearch && matchesTag && matchesRating;
            });
            
            grid.innerHTML = '';
            
            filteredCharacters.forEach(character => {
                const card = this.createCharacterCard(character);
                grid.appendChild(card);
            });
            
            document.getElementById('char-gallery-stats').textContent = 
                `${filteredCharacters.length} of ${this.characters.length} characters`;
        }

        createCharacterCard(character) {
            const card = document.createElement('div');
            card.className = 'KLITECharacterManager-character-card';
            
            // Ensure we have a valid image URL
            let imageUrl = character.image;
            if (!imageUrl && character.imageBlob) {
                imageUrl = URL.createObjectURL(character.imageBlob);
                character.image = imageUrl; // Cache the URL
            }
            
            card.innerHTML = `
                <img src="${imageUrl || ''}" alt="${character.name}" 
                    class="KLITECharacterManager-character-image" 
                    onerror="this.style.display='none';">
                <div class="KLITECharacterManager-character-info">
                    <div class="KLITECharacterManager-character-name">${character.name}</div>
                    <div class="KLITECharacterManager-character-creator">${character.creator}</div>
                    <div class="KLITECharacterManager-character-rating">
                        <select class="KLITECharacterManager-rating-dropdown" data-char-id="${character.id}">
                            <option value="0" ${character.rating === 0 ? 'selected' : ''}>☆ Unrated</option>
                            <option value="5" ${character.rating === 5 ? 'selected' : ''}>★★★★★</option>
                            <option value="4" ${character.rating === 4 ? 'selected' : ''}>★★★★☆</option>
                            <option value="3" ${character.rating === 3 ? 'selected' : ''}>★★★☆☆</option>
                            <option value="2" ${character.rating === 2 ? 'selected' : ''}>★★☆☆☆</option>
                            <option value="1" ${character.rating === 1 ? 'selected' : ''}>★☆☆☆☆</option>
                        </select>
                    </div>
                </div>
            `;
            
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('KLITECharacterManager-rating-dropdown')) {
                    this.openFullscreen(character);
                }
            });

            card.querySelector('.KLITECharacterManager-rating-dropdown')
                .addEventListener('change', async (e) => {
                    e.stopPropagation();
                    character.rating = parseInt(e.target.value);
                    await IndexedDBManager.saveCharacter(character);
                });
            
            return card;
        }

        openFullscreen(character) {
            this.selectedCharacter = character;
            const fullscreenView = document.getElementById('char-fullscreen-view');
            const fullscreenContent = document.getElementById('char-fullscreen-content');
            const fullscreenTitle = document.getElementById('char-fullscreen-title');
            
            fullscreenTitle.textContent = character.name;
            
            // Format indicator
            const formatIndicator = character.rawData._importFormat || character.rawData._format || 'v2';
            
            // Ensure we have a valid image URL
            let imageUrl = character.image;
            if (!imageUrl && character.imageBlob) {
                imageUrl = URL.createObjectURL(character.imageBlob);
                character.image = imageUrl;
            }
            
            const isKoboldAvailable = KoboldAIIntegration.isAvailable();
            const loadBtn = document.getElementById('char-load-scenario-btn');
            const wiBtn = document.getElementById('char-add-worldinfo-btn');
            const removeWiBtn = document.getElementById('char-remove-worldinfo-btn');
            const removeCharBtn = document.getElementById('char-remove-character-btn');
            
            if (loadBtn) {
                loadBtn.disabled = !isKoboldAvailable;
                loadBtn.title = isKoboldAvailable ? 'Load character as new scenario' : 'KoboldAI not available';
            }
            
            if (wiBtn) {
                wiBtn.disabled = !isKoboldAvailable;
                wiBtn.title = isKoboldAvailable ? 'Add character to World Info' : 'KoboldAI not available';
            }

            if (removeWiBtn) {
                removeWiBtn.disabled = !isKoboldAvailable;
                removeWiBtn.title = isKoboldAvailable ? 'Remove character from World Info' : 'KoboldAI not available';
            }

            if (removeCharBtn) {
                removeCharBtn.disabled = false;
                removeCharBtn.title = 'Delete this character permanently';
            }
            
            // Build unified fullscreen content with centered layout
            let fullscreenHTML = `
                <!-- Character Header - Centered -->
                <div class="KLITECharacterManager-character-header">
                    <img src="${imageUrl || ''}" alt="${character.name}" 
                        class="KLITECharacterManager-character-header-image"
                        onerror="this.style.display='none';">
                    <div class="KLITECharacterManager-character-header-info">
                        <div class="KLITECharacterManager-character-header-name">${character.name}</div>
                        <div class="KLITECharacterManager-character-header-meta">
                            Created by ${character.creator} • Format: ${formatIndicator.toUpperCase()}
                        </div>
                        <div class="KLITECharacterManager-fullscreen-rating">
                            <label>Rating: </label>
                            <select id="char-fullscreen-rating-dropdown" data-char-id="${character.id}">
                                <option value="0" ${character.rating === 0 ? 'selected' : ''}>☆ Unrated</option>
                                <option value="5" ${character.rating === 5 ? 'selected' : ''}>★★★★★ (5 stars)</option>
                                <option value="4" ${character.rating === 4 ? 'selected' : ''}>★★★★☆ (4 stars)</option>
                                <option value="3" ${character.rating === 3 ? 'selected' : ''}>★★★☆☆ (3 stars)</option>
                                <option value="2" ${character.rating === 2 ? 'selected' : ''}>★★☆☆☆ (2 stars)</option>
                                <option value="1" ${character.rating === 1 ? 'selected' : ''}>★☆☆☆☆ (1 star)</option>
                            </select>
                        </div>
                        <div class="KLITECharacterManager-character-header-tags">
                            ${character.tags.map(tag => 
                                `<span class="KLITECharacterManager-tag" style="padding: 4px 8px; font-size: 11px;">${tag}</span>`
                            ).join('')}
                            <button class="KLITECharacterManager-add-tag-btn" data-char-id="${character.id}" 
                                    style="width: 20px; height: 20px; font-size: 12px;">+</button>
                        </div>
                    </div>
                </div>
            `;

            // Helper function to create collapsible sections
            const createSection = (title, content, defaultOpen = true) => {
                if (!content || (typeof content === 'string' && content.trim() === '')) return '';
                
                const sectionId = `section-${title.toLowerCase().replace(/\s+/g, '-')}-${character.id}`;
                const isCollapsed = this.collapsedFullscreenSections && this.collapsedFullscreenSections.has(sectionId);
                
                return `
                    <div class="KLITECharacterManager-fullscreen-section ${isCollapsed ? 'collapsed' : ''}" data-section-id="${sectionId}">
                        <div class="KLITECharacterManager-fullscreen-section-header" onclick="window.toggleFullscreenSection('${sectionId}')">
                            <span>${title}</span>
                            <span class="KLITECharacterManager-fullscreen-section-arrow">▼</span>
                        </div>
                        <div class="KLITECharacterManager-fullscreen-section-content">${content}</div>
                    </div>
                `;
            };

            // Add sections in order
            if (character.rawData.creator_notes) {
                fullscreenHTML += createSection('Creator Notes', character.rawData.creator_notes);
            }

            if (character.description) {
                fullscreenHTML += createSection('Description', character.description);
            }
            
            if (character.rawData.personality) {
                fullscreenHTML += createSection('Personality', character.rawData.personality);
            }

            if (character.scenario) {
                fullscreenHTML += createSection('Scenario', character.scenario);
            }

            if (character.rawData.system_prompt) {
                fullscreenHTML += createSection('System Prompt', character.rawData.system_prompt);
            }

            if (character.rawData.post_history_instructions) {
                fullscreenHTML += createSection('Post History Instructions', character.rawData.post_history_instructions);
            }
            
            // First Message as its own section
            if (character.rawData.first_mes) {
                fullscreenHTML += createSection('First Message', character.rawData.first_mes);
            }

            // Each alternate greeting as a separate section
            if (character.rawData.alternate_greetings && character.rawData.alternate_greetings.length > 0) {
                character.rawData.alternate_greetings.forEach((greeting, index) => {
                    fullscreenHTML += createSection(`Alternate Greeting ${index + 2}`, greeting);
                });
            }

            // Example messages
            if (character.rawData.mes_example) {
                fullscreenHTML += createSection('Example Messages', character.rawData.mes_example);
            }

            // Character Book / World Info
            if (character.rawData.character_book && character.rawData.character_book.entries && character.rawData.character_book.entries.length > 0) {
                const book = character.rawData.character_book;
                let wiContent = `
                    <div style="color: #888; font-size: 11px; margin-bottom: 10px;">
                        WorldInfo: ${book.entries.length} entries
                        Scan Depth: ${book.scan_depth || 50}
                        Token Budget: ${book.token_budget || 500}
                    </div>
                `;

                // Sort entries by insertion order
                const sortedEntries = [...book.entries].sort((a, b) => 
                    (a.insertion_order || 0) - (b.insertion_order || 0)
                );

                for (const entry of sortedEntries) {
                    if (!entry.enabled && entry.enabled !== undefined) continue;
                    
                    const keys = Array.isArray(entry.keys) ? entry.keys : 
                                (entry.key ? [entry.key] : []);
                    const keyDisplay = keys.join(', ') || '[No keys]';
                    
                    wiContent += `
                    <div class="KLITECharacterManager-wi-entry">
                        <div class="KLITECharacterManager-wi-entry-header">
                            <div class="KLITECharacterManager-wi-keys">${keyDisplay}</div>
                            <div class="KLITECharacterManager-wi-options">
                    `;

                    // Add entry properties
                    if (entry.constant) {
                        wiContent += `<span>📌 Constant</span>`;
                    }
                    if (entry.selective) {
                        wiContent += `<span>🎯 Selective</span>`;
                    }
                    if (entry.case_sensitive) {
                        wiContent += `<span>Aa Case</span>`;
                    }
                    if (entry.priority && entry.priority !== 10) {
                        wiContent += `<span>P:${entry.priority}</span>`;
                    }

                    wiContent += `
                            </div>
                        </div>
                        <div class="KLITECharacterManager-wi-content">${entry.content || '[No content]'}</div>
                    `;

                    // Add secondary keys if present
                    if (entry.secondary_keys && entry.secondary_keys.length > 0) {
                        wiContent += `
                        <div style="margin-top: 5px; font-size: 10px; color: #666;">
                            Secondary: ${entry.secondary_keys.join(', ')}
                        </div>
                        `;
                    }

                    // Add comment if present
                    if (entry.comment) {
                        wiContent += `
                        <div style="margin-top: 5px; font-size: 10px; color: #666; font-style: italic;">
                            ${entry.comment}
                        </div>
                        `;
                    }

                    wiContent += `</div>`;
                }

                fullscreenHTML += createSection(`Character Book / World Info (${book.name || 'Character Book'})`, wiContent, false);
            }

            fullscreenContent.innerHTML = fullscreenHTML;

            // Set up event listeners
            const fullscreenRatingDropdown = fullscreenContent.querySelector('#char-fullscreen-rating-dropdown');
            if (fullscreenRatingDropdown) {
                fullscreenRatingDropdown.addEventListener('change', async (e) => {
                    const newRating = parseInt(e.target.value);
                    character.rating = newRating;
                    await IndexedDBManager.saveCharacter(character);
                    this.updateGallery();
                    this.updateRatingFilter();
                });
            }

            const fullscreenAddTagBtn = fullscreenContent.querySelector('.KLITECharacterManager-add-tag-btn');
            if (fullscreenAddTagBtn) {
                fullscreenAddTagBtn.addEventListener('click', () => {
                    this.openTagModal(character.id);
                });
            }
            
            fullscreenView.classList.add('show');
        }


        closeFullscreen() {
            document.getElementById('char-fullscreen-view').classList.remove('show');
            this.selectedCharacter = null;
        }

        updateTagFilter() {
            const tagFilter = document.getElementById('char-tag-filter');
            const allTags = new Set();
            
            this.characters.forEach(char => {
                char.tags.forEach(tag => allTags.add(tag));
            });
            
            const sortedTags = Array.from(allTags).sort();
            
            tagFilter.innerHTML = `
                <option value="">All Tags</option>
                ${sortedTags.map(tag => 
                    `<option value="${tag}" ${this.selectedTag === tag ? 'selected' : ''}>${tag}</option>`
                ).join('')}
            `;
        }

        updateRatingFilter() {
            const ratingFilter = document.getElementById('char-rating-filter');
            if (ratingFilter) {
                // Keep the current selection
                ratingFilter.value = this.selectedRating;
            }
        }

        openTagModal(characterId) {
            this.currentTagCharacter = this.characters.find(c => c.id === characterId);
            const modal = document.getElementById('char-tag-modal');
            modal.classList.remove('hidden');
            document.getElementById('char-tag-input').focus();
        }

        closeTagModal() {
            const modal = document.getElementById('char-tag-modal');
            modal.classList.add('hidden');
            document.getElementById('char-tag-input').value = '';
            this.currentTagCharacter = null;
        }

        async addTag() {
            const tagInput = document.getElementById('char-tag-input');
            const tagName = tagInput.value.trim();
            
            if (tagName && this.currentTagCharacter) {
                if (!this.currentTagCharacter.tags.includes(tagName)) {
                    this.currentTagCharacter.tags.push(tagName);
                    await IndexedDBManager.saveCharacter(this.currentTagCharacter);
                    this.updateGallery();
                    this.updateTagFilter();
                    
                    if (this.selectedCharacter && this.selectedCharacter.id === this.currentTagCharacter.id) {
                        this.openFullscreen(this.currentTagCharacter);
                    }
                }
                this.closeTagModal();
            }
        }

        async clearAll() {
            if (confirm('Are you sure you want to delete all characters?')) {
                // Clean up all blob URLs before clearing
                this.characters.forEach(char => {
                    if (char.image && char.image.startsWith('blob:')) {
                        URL.revokeObjectURL(char.image);
                    }
                });

                this.characters = [];
                this.selectedCharacter = null;
                this.selectedTag = '';
                this.selectedRating = '';
                this.searchTerm = '';
                
                await IndexedDBManager.clearAllCharacters();
                
                this.updateGallery();
                this.updateTagFilter();
                this.updateRatingFilter();
                this.closeFullscreen();
                
                document.getElementById('char-search-input').value = '';
                document.getElementById('char-tag-filter').value = '';
                document.getElementById('char-rating-filter').value = '';
            }
        }

        showSuccessMessage(message) {
            const successMsg = document.getElementById('char-success-message');
            successMsg.textContent = message;
            successMsg.classList.add('show');
            setTimeout(() => {
                successMsg.classList.remove('show');
            }, 3000);
        }

        async loadAsScenario(character) {
            if (!KoboldAIIntegration.isAvailable()) {
                alert('KoboldAI not available');
                return;
            }

            if (!confirm(`Load "${character.name}" as scenario? This will restart the session.`)) {
                return;
            }

            try {
                await KoboldAIIntegration.loadAsScenario(character.rawData);
                // Note: Tool will restart automatically, so no need for success message/hide

            } catch (error) {
                alert(`Failed to load character: ${error.message}`);
                const loadBtn = document.getElementById('char-load-scenario-btn');
                if (loadBtn) {
                    loadBtn.textContent = 'Load as Scenario';
                    loadBtn.disabled = false;
                }
            }
        }

        async addToWorldInfo(character) {
            if (!KoboldAIIntegration.isAvailable()) {
                alert('KoboldAI functions not available. Make sure you are running this in KoboldAI Lite.');
                return;
            }

            try {
                const addBtn = document.getElementById('char-add-worldinfo-btn');
                addBtn.textContent = 'Adding...';
                addBtn.disabled = true;

                await KoboldAIIntegration.addToWorldInfo(character.rawData);
                
                this.showSuccessMessage(`"${character.name}" added to World Info!`);

            } catch (error) {
                console.error('Error adding character to World Info:', error);
                alert(`Failed to add character to World Info: ${error.message}`);
            } finally {
                const addBtn = document.getElementById('char-add-worldinfo-btn');
                if (addBtn) {
                    addBtn.textContent = 'Add to World Info';
                    addBtn.disabled = !KoboldAIIntegration.isAvailable();
                }
            }
        }

        async removeFromWorldInfo(character) {
            if (!KoboldAIIntegration.isAvailable()) {
                alert('KoboldAI functions not available. Make sure you are running this in KoboldAI Lite.');
                return;
            }

            const confirmMsg = `Remove "${character.name}" from World Info?\n\n⚠️ Warning: Any changes you made to the World Info entries will NOT be merged back to the stored character card. Only the original character data will remain.`;
            
            if (!confirm(confirmMsg)) {
                return;
            }

            try {
                const removeBtn = document.getElementById('char-remove-worldinfo-btn');
                removeBtn.textContent = 'Removing...';
                removeBtn.disabled = true;

                const removedCount = await KoboldAIIntegration.removeFromWorldInfo(character.name);
                
                if (removedCount > 0) {
                    this.showSuccessMessage(`"${character.name}" removed from World Info! (${removedCount} entries removed)`);
                } else {
                    this.showSuccessMessage(`No World Info entries found for "${character.name}"`);
                }

            } catch (error) {
                console.error('Error removing character from World Info:', error);
                alert(`Failed to remove character from World Info: ${error.message}`);
            } finally {
                const removeBtn = document.getElementById('char-remove-worldinfo-btn');
                if (removeBtn) {
                    removeBtn.textContent = 'Remove from WI';
                    removeBtn.disabled = !KoboldAIIntegration.isAvailable();
                }
            }
        }

        show() {
            this.toolContainer.classList.add('show');
            this.updateKoboldAIStatus();
            // Auto-collapse after a brief delay
            setTimeout(() => {
                if (!this.collapsed) {
                    this.toggleMinimize();
                }
            }, 750);
        }

        hide() {
            if (this.toolContainer && this.toolContainer.parentNode) {
                this.toolContainer.parentNode.removeChild(this.toolContainer);
            }
        }

        cleanup() {
            this.characters.forEach(char => {
                if (char.image && char.image.startsWith('blob:')) {
                    URL.revokeObjectURL(char.image);
                }
            });
            
            if (this.toolContainer && this.toolContainer.parentNode) {
                this.toolContainer.parentNode.removeChild(this.toolContainer);
            }
            if (this.fileInput && this.fileInput.parentNode) {
                this.fileInput.parentNode.removeChild(this.fileInput);
            }
            
            const styleElement = document.getElementById('enhanced-character-manager-styles');
            if (styleElement) {
                styleElement.remove();
            }
        }
    }

    // =============================================
    // INITIALIZATION
    // =============================================
    
    let enhancedCharacterManagerInstance = null;

    window.initEnhancedCharacterManager = async function() {
        console.log('Initializing KLITECharacterManager for KoboldAI Integration');
        try {
            if (enhancedCharacterManagerInstance) {
                enhancedCharacterManagerInstance.cleanup();
            }
            
            enhancedCharacterManagerInstance = new EnhancedCharacterManager();
            await enhancedCharacterManagerInstance.init();
            enhancedCharacterManagerInstance.show();
            
            window.EnhancedCharacterManagerInitialized = true;
            console.log('KLITECharacterManager initialized successfully');
        } catch (error) {
            console.error('Error initializing KLITECharacterManager:', error);
        }
    };

    window.toggleFullscreenSection = function(sectionId) {
        const section = document.querySelector(`[data-section-id="${sectionId}"]`);
        if (section) {
            section.classList.toggle('collapsed');
            
            // Store collapsed state
            if (!window.enhancedCharacterManagerInstance.collapsedFullscreenSections) {
                window.enhancedCharacterManagerInstance.collapsedFullscreenSections = new Set();
            }
            
            if (section.classList.contains('collapsed')) {
                window.enhancedCharacterManagerInstance.collapsedFullscreenSections.add(sectionId);
            } else {
                window.enhancedCharacterManagerInstance.collapsedFullscreenSections.delete(sectionId);
            }
        }
    };

    window.cleanupEnhancedCharacterManager = function() {
        console.log('Cleaning up KLITECharacterManager');
        try {
            if (enhancedCharacterManagerInstance) {
                enhancedCharacterManagerInstance.cleanup();
                enhancedCharacterManagerInstance = null;
            }
            window.EnhancedCharacterManagerInitialized = false;
        } catch (error) {
            console.error('Error during KLITECharacterManager cleanup:', error);
        }
    };

    // Initialize
    window.initEnhancedCharacterManager();

    // Cleanup on page unload (untested)
    window.addEventListener('beforeunload', () => {
        if (typeof window.cleanupEnhancedCharacterManager === 'function') {
            window.cleanupEnhancedCharacterManager();
        }
    });

})();