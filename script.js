// Enhanced JavaScript for TopoBDA GitHub Pages

// Copy citation to clipboard with improved feedback
function copyToClipboard() {
    const citationElement = document.getElementById('citation-text');
    const citationText = citationElement ? citationElement.innerText.trim() : '';

    if (!citationText) {
        showCopyFeedback('Failed to find citation text', 'error');
        return;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(citationText).then(function() {
            showCopyFeedback('Citation copied to clipboard', 'success');
        }).catch(function(err) {
            fallbackCopyTextToClipboard(citationText);
        });
    } else {
        fallbackCopyTextToClipboard(citationText);
    }
}

// Fallback copy method for older browsers
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.cssText = "position: fixed; top: 0; left: 0; opacity: 0;";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        showCopyFeedback(
            successful ? 'Citation copied to clipboard' : 'Failed to copy citation',
            successful ? 'success' : 'error'
        );
    } catch (err) {
        showCopyFeedback('Failed to copy citation', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Enhanced feedback system
function showCopyFeedback(message, type = 'success') {
    const feedback = document.createElement('div');
    feedback.textContent = message;
    
    const colors = {
        success: { bg: '#28a745', text: 'white' },
        error: { bg: '#dc3545', text: 'white' },
        info: { bg: '#17a2b8', text: 'white' }
    };
    
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type].bg};
        color: ${colors[type].text};
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 10000;
        font-weight: 500;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
        transform: translateX(100%);
        opacity: 0;
    `;
    
    document.body.appendChild(feedback);
    
    // Animate in
    requestAnimationFrame(() => {
        feedback.style.transform = 'translateX(0)';
        feedback.style.opacity = '1';
    });
    
    // Animate out and remove
    setTimeout(() => {
        feedback.style.opacity = '0';
        feedback.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (feedback.parentNode) {
                document.body.removeChild(feedback);
            }
        }, 300);
    }, 3000);
}

// Enhanced DOM ready functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize image handling
    initImageHandling();
    
    // Initialize animations
    initScrollAnimations();
    
    // Initialize table interactions
    initTableInteractions();
    
    // Initialize accessibility features
    initAccessibility();
    
    // Initialize performance optimizations
    initPerformanceOptimizations();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Add visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
                
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Enhanced image handling with modal functionality
function initImageHandling() {
    const researchFigures = document.querySelectorAll('.research-figure');
    
    // Create modal if it doesn't exist
    let modal = document.getElementById('imageModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'imageModal';
        modal.className = 'image-modal';
        modal.innerHTML = `
            <span class="close">&times;</span>
            <img id="modalImage" src="" alt="">
        `;
        document.body.appendChild(modal);
    }
    
    const modalImg = modal.querySelector('#modalImage');
    const closeBtn = modal.querySelector('.close');
    
    // Add click listeners to research figures
    researchFigures.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
        
        // Add keyboard accessibility
        img.setAttribute('tabindex', '0');
        img.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Close modal functionality
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Keyboard controls for modal
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block' && e.key === 'Escape') {
            closeModal();
        }
    });
    
    // Add loading animation for images
    researchFigures.forEach(img => {
        if (img.complete && img.naturalHeight !== 0) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
            
            img.addEventListener('error', function() {
                console.warn('Failed to load image:', this.src);
                this.style.opacity = '0.5';
                this.style.filter = 'grayscale(100%)';
            });
        }
    });
}

// Enhanced scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Special handling for performance tables
                if (entry.target.classList.contains('performance-table')) {
                    animateTableNumbers(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements
    const elementsToObserve = document.querySelectorAll(`
        section, 
        .method-item, 
        .result-item, 
        .analysis-item, 
        .sota-item, 
        .innovation-item,
        .performance-table
    `);
    
    elementsToObserve.forEach(el => {
        observer.observe(el);
    });

    // Add animation styles
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .fade-in {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(40px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        section:not(.fade-in), 
        .method-item:not(.fade-in), 
        .result-item:not(.fade-in), 
        .analysis-item:not(.fade-in), 
        .sota-item:not(.fade-in), 
        .innovation-item:not(.fade-in) {
            opacity: 0;
            transform: translateY(40px);
        }
    `;
    document.head.appendChild(animationStyle);
}

// Animate table numbers - DISABLED to keep values static
function animateTableNumbers(table) {
    // Animation disabled - values remain static
    return;
}

// Enhanced table interactions
function initTableInteractions() {
    const tables = document.querySelectorAll('.performance-table');
    
    tables.forEach(table => {
        const rows = table.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            row.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
                this.style.zIndex = '10';
                this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                this.style.transition = 'all 0.3s ease';
            });
            
            row.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.zIndex = '1';
                this.style.boxShadow = 'none';
            });
            
            // Add click to highlight
            row.addEventListener('click', function() {
                // Remove previous highlights
                rows.forEach(r => r.classList.remove('highlighted'));
                this.classList.add('highlighted');
            });
        });
    });
    
    // Add highlight styles
    const highlightStyle = document.createElement('style');
    highlightStyle.textContent = `
        .performance-table tbody tr.highlighted {
            background-color: #e3f2fd !important;
            border-left: 4px solid #667eea;
        }
        
        .performance-table tbody tr {
            cursor: pointer;
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(highlightStyle);
}

// Accessibility improvements
function initAccessibility() {
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Alt + number shortcuts
        if (e.altKey) {
            const shortcuts = {
                '1': '#abstract',
                '2': '#method', 
                '3': '#results',
                '4': '#innovations',
                '5': '#paper'
            };
            
            if (shortcuts[e.key]) {
                e.preventDefault();
                const target = document.querySelector(shortcuts[e.key]);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    target.focus();
                }
            }
        }
        
        // Escape to close modals/overlays
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal, .overlay');
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
    
    // Add focus indicators
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        *:focus {
            outline: 2px solid #667eea;
            outline-offset: 2px;
        }
        
        .pdf-embed-container:focus-within {
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
        }
    `;
    document.head.appendChild(focusStyle);
}

// Performance optimizations
function initPerformanceOptimizations() {
    // Lazy load images if any
    const images = document.querySelectorAll('img[data-src]');
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Add loading state management
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Remove any loading indicators
        const loadingElements = document.querySelectorAll('.loading, .spinner');
        loadingElements.forEach(el => el.remove());
    });
    
    // Add print styles
    const printStyle = document.createElement('style');
    printStyle.media = 'print';
    printStyle.textContent = `
        @media print {
            header nav, .copy-btn, .pdf-embed-container, .buttons {
                display: none;
            }
            
            body {
                font-size: 12pt;
                line-height: 1.4;
                color: #000;
            }
            
            h1, h2, h3 {
                page-break-after: avoid;
                color: #000;
            }
            
            .performance-table {
                font-size: 10pt;
                border-collapse: collapse;
            }
            
            .performance-table th,
            .performance-table td {
                border: 1px solid #000;
                padding: 8px;
            }
            
            .citation-box {
                background: #f8f9fa !important;
                border: 2px solid #000;
                page-break-inside: avoid;
            }
        }
    `;
    document.head.appendChild(printStyle);
}

// Utility functions
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

// Export functions for global access
window.copyToClipboard = copyToClipboard;
window.showCopyFeedback = showCopyFeedback;
