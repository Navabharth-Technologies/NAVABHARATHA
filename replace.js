const fs = require('fs');

const files = [
    'index.html',
    'assessment.html',
    'career.html',
    'certification.html',
    'consulting.html',
    'local_assessment.html',
    'privacy.html',
    'remote_assessment.html',
    'terms.html',
    'service_aware_response.html',
    'admin_query_template.html',
    'thank_you_image_template.html',
    'thank_you_template.html'
];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;
    
    // Header Replacement
    const headerRegex = /(?:<!--\s*Header.*?-->)?\s*<header>[\s\S]*?id="hamburger"[\s\S]*?<\/button>\s*<\/div>\s*<\/div>\s*<\/div>/i;
    content = content.replace(headerRegex, '\n    <div id="header-placeholder"></div>');
    
    // Footer Replacement
    const footerRegex = /(?:<!--\s*Footer.*?-->)?\s*<footer>[\s\S]*?<\/footer>/i;
    content = content.replace(footerRegex, '\n    <div id="footer-placeholder"></div>');
    
    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        console.log("Processed and updated " + file);
    } else {
        console.log("No changes needed or matching failed for " + file);
    }
});
