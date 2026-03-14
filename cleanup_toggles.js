const fs = require('fs');

const file = 'c:/Users/NBT/Desktop/ZED/index.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Remove CSS link
content = content.replace(/<link rel="stylesheet" href="service_toggle.css">[\s]*/i, '');

// 2. Remove Toggle sections using regex
// This matches from <!-- Toggle Button --> through the closing </div> of service-details
const toggleSectionRegex = /[\s]*<!-- Toggle Button -->[\s\S]*?<!-- Expandable Side Index Details -->[\s\S]*?<div class="service-details hidden">[\s\S]*?<\/div>/gi;

content = content.replace(toggleSectionRegex, '');

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully removed service details dropdowns from index.html');
