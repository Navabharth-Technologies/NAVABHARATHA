const fs = require('fs');

const file = 'c:/Users/NBT/Desktop/ZED/index.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Add CSS
if (!content.includes('service_toggle.css')) {
    content = content.replace(
        '<link rel="stylesheet" href="notification.css">',
        '<link rel="stylesheet" href="notification.css">\n    <link rel="stylesheet" href="service_toggle.css">'
    );
}

// 2. Add Service Toggle to Certification
const certRegex = /(<p data-translate="service1_description">[\s\S]*?<\/p>)([\s]*)(<a href="certification.html" class="learn-more-btn")/i;
if (certRegex.test(content) && !content.includes('fas fa-history')) {
    content = content.replace(certRegex, `$1$2
                            <!-- Toggle Button -->
                            <i class="fas fa-chevron-down service-toggle" aria-label="Toggle Details"></i>
                            
                            <!-- Expandable Side Index Details -->
                            <div class="service-details hidden">
                                <ul style="list-style: none; padding: 0; margin-bottom: 15px;">
                                    <li style="margin-bottom: 8px;"><i class="fas fa-history" style="color: var(--primary-color); width: 20px;"></i> Brief History</li>
                                    <li style="margin-bottom: 8px;"><i class="fas fa-info-circle" style="color: var(--primary-color); width: 20px;"></i> Introduction & Objective</li>
                                    <li style="margin-bottom: 8px;"><i class="fas fa-layer-group" style="color: var(--primary-color); width: 20px;"></i> ZED Levels & Components</li>
                                    <li style="margin-bottom: 8px;"><i class="fas fa-hand-holding-usd" style="color: var(--primary-color); width: 20px;"></i> Subsidy & Eligibility</li>
                                    <li style="margin-bottom: 8px;"><i class="fas fa-sync" style="color: var(--primary-color); width: 20px;"></i> Certification Process</li>
                                    <li style="margin-bottom: 8px;"><i class="fas fa-redo" style="color: var(--primary-color); width: 20px;"></i> Surveillance & Renewal</li>
                                </ul>
                            </div>
$2$3`);
}

// 3. Add Service Toggle to Consulting
const consultRegex = /(<p data-translate="service5_description">[\s\S]*?<\/p>)([\s]*)(<a href="consulting.html" class="learn-more-btn")/i;
if (consultRegex.test(content) && !content.includes('Consulting Overview')) {
    content = content.replace(consultRegex, `$1$2
                            <!-- Toggle Button -->
                            <i class="fas fa-chevron-down service-toggle" aria-label="Toggle Details"></i>
                            
                            <!-- Expandable Side Index Details -->
                            <div class="service-details hidden">
                                <ul style="list-style: none; padding: 0; margin-bottom: 15px;">
                                    <li style="margin-bottom: 8px;"><i class="fas fa-info-circle" style="color: var(--primary-color); width: 20px;"></i> Consulting Overview</li>
                                    <li style="margin-bottom: 8px;"><i class="fas fa-sync" style="color: var(--primary-color); width: 20px;"></i> Implementation Process</li>
                                    <li style="margin-bottom: 8px;"><i class="fas fa-box-open" style="color: var(--primary-color); width: 20px;"></i> Key Deliverables</li>
                                    <li style="margin-bottom: 8px;"><i class="fas fa-hands-helping" style="color: var(--primary-color); width: 20px;"></i> Advisory Support</li>
                                </ul>
                            </div>
$2$3`);
}

// 4. Add Service Toggle to Assessment
const assessRegex = /(<p data-translate="service4_description">[\s\S]*?<\/p>)([\s]*)(<a href="assessment.html" class="learn-more-btn")/i;
if (assessRegex.test(content) && !content.includes('Assessment Overview')) {
    content = content.replace(assessRegex, `$1$2
                            <!-- Toggle Button -->
                            <i class="fas fa-chevron-down service-toggle" aria-label="Toggle Details"></i>
                            
                            <!-- Expandable Side Index Details -->
                            <div class="service-details hidden">
                                <ul style="list-style: none; padding: 0; margin-bottom: 15px;">
                                    <li style="margin-bottom: 8px;"><i class="fas fa-info-circle" style="color: var(--primary-color); width: 20px;"></i> Assessment Overview</li>
                                    <li style="margin-bottom: 8px;"><i class="fas fa-sync" style="color: var(--primary-color); width: 20px;"></i> Assessment Process</li>
                                    <li style="margin-bottom: 8px;"><i class="fas fa-award" style="color: var(--primary-color); width: 20px;"></i> Benefits</li>
                                </ul>
                            </div>
$2$3`);
}

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully injected service details dropdowns into index.html');
