// Performance monitoring helper
(function () {
    'use strict';

    // Debounce scroll events for better performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Passive event listeners for better scroll performance
    const passiveSupported = () => {
        let passive = false;
        try {
            const options = {
                get passive() {
                    passive = true;
                    return false;
                }
            };
            window.addEventListener('test', null, options);
            window.removeEventListener('test', null, options);
        } catch (err) {
            passive = false;
        }
        return passive;
    };

    // Apply passive listeners to scroll events
    if (passiveSupported()) {
        const scrollers = document.querySelectorAll('.services-grid, .carousel-track');
        scrollers.forEach(scroller => {
            if (scroller) {
                ['scroll', 'touchstart', 'touchmove'].forEach(event => {
                    scroller.addEventListener(event, debounce(() => { }, 16), { passive: true });
                });
            }
        });
    }

    // Lazy load images when they're near viewport
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        // Observe all images with lazy loading
        document.addEventListener('DOMContentLoaded', () => {
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        });
    }

    // Reduce motion for users who prefer it
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        document.querySelectorAll('*').forEach(el => {
            el.style.animationDuration = '0.01ms';
            el.style.transitionDuration = '0.01ms';
        });
    }

    // Monitor performance
    if (window.performance && window.performance.now) {
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;

            console.log('Performance Metrics:');
            console.log('Page Load Time:', pageLoadTime + 'ms');
            console.log('DOM Ready Time:', domReadyTime + 'ms');

            // Report to analytics if needed
            if (window.gtag) {
                gtag('event', 'timing_complete', {
                    'name': 'load',
                    'value': pageLoadTime,
                    'event_category': 'Page Performance'
                });
            }
        });
    }

    // Prevent layout shifts by reserving space for dynamic content
    const reserveSpace = () => {
        const images = document.querySelectorAll('img:not([width]):not([height])');
        images.forEach(img => {
            if (img.naturalWidth && img.naturalHeight) {
                img.setAttribute('width', img.naturalWidth);
                img.setAttribute('height', img.naturalHeight);
            }
        });
    };

    // Run after images load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', reserveSpace);
    } else {
        reserveSpace();
    }
})();
