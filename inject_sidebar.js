const fs = require('fs');

function extractAndInject(liveFile, localFile, targetAnchor) {
    if (!fs.existsSync(liveFile) || !fs.existsSync(localFile)) {
        console.log(`Skipping ${localFile} (Files missing)`);
        return;
    }

    let liveContent = fs.readFileSync(liveFile, 'utf8');
    let localContent = fs.readFileSync(localFile, 'utf8');

    // 1. Extract CSS
    const styleRegex = /<style>([\s\S]*?)<\/style>/i;
    const liveStyleMatch = liveContent.match(styleRegex);
    let extractedStyles = '';
    if (liveStyleMatch && liveStyleMatch[1]) {
        // Only keep sidebar/content-area related styles to avoid breaking new design
        const sidebarStyleRegex = /(\.page-container[\s\S]*?)(?=\/\* Footer Styles \*\/|<\/style>)/i;
        const styleMatch = liveStyleMatch[1].match(sidebarStyleRegex);
        if (styleMatch) {
            extractedStyles = styleMatch[0];
        } else {
            // fallback, just get page-container to the end of styles if it's there
            const fallbackRegex = /(\.page-container[\s\S]*?)<\/style>/i;
            const fbMatch = liveContent.match(fallbackRegex);
            if (fbMatch) extractedStyles = fbMatch[1];
        }
    }

    // 2. Extract page-container (Sidebar & Content)
    let pageContainer = '';
    // Use an index-based exact match to avoid regex stack overflows
    let startIndex = liveContent.indexOf('<div class="page-container"');
    if (startIndex === -1) startIndex = liveContent.indexOf('<!-- Page Content');
    
    if (startIndex !== -1) {
        // Find closing tag of page-container, usually right before <!-- Footer -->
        let endIndex = liveContent.indexOf('<!-- Footer -->');
        if (endIndex === -1) endIndex = liveContent.indexOf('<footer>');
        
        if (endIndex !== -1) {
            pageContainer = liveContent.substring(startIndex, endIndex).trim();
            // In live_cert, it might end up grabbing extra stuff, let's just make sure it's closed properly
            pageContainer += '\n';
        }
    }

    // 3. Extract Sidebar JS
    const jsRegex = /<script>([\s\S]*?toggleSidebarMenu[\s\S]*?)<\/script>/i;
    let extractedJS = '';
    const jsMatch = liveContent.match(jsRegex);
    if (jsMatch && jsMatch[0]) {
        extractedJS = jsMatch[0];
    }

    if (!pageContainer) {
        console.log(`Could not extract page content from ${liveFile}`);
        return;
    }

    // Now inject into localFile
    // Inject Styles
    if (extractedStyles && !localContent.includes('.page-container')) {
        localContent = localContent.replace('</style>', `\n        /* Injected Sidebar Styles */\n        ${extractedStyles}\n    </style>`);
    }

    // Inject Container before targetAnchor
    if (!localContent.includes('class="page-container"')) {
        localContent = localContent.replace(targetAnchor, `\n    <!-- Injected Detailed Information with Side Index -->\n    ${pageContainer}\n\n    ${targetAnchor}`);
    }

    // Inject JS before </body>
    if (extractedJS && !localContent.includes('toggleSidebarMenu')) {
        localContent = localContent.replace('<script src="translations.js"></script>', `${extractedJS}\n    <script src="translations.js"></script>`);
    }

    fs.writeFileSync(localFile, localContent, 'utf8');
    console.log(`Updated ${localFile} with sidebar and content!`);
}

extractAndInject('live_cert.html', 'certification.html', '<!-- Case Study -->');
// For assessment, insert before Final CTA or somewhere appropriate. 
// local assessment.html might just have a final CTA. Let's find out what's in local assessment
extractAndInject('live_assessment.html', 'assessment.html', '<div id="footer-placeholder"></div>'); // Just dump before footer if no specific anchor
extractAndInject('live_consult.html', 'consulting.html', '<div id="footer-placeholder"></div>');
