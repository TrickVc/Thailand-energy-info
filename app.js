// Thailand Household Energy Efficiency Page JavaScript - Updated with Fixed Modal

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize smooth scrolling for internal links
    initializeSmoothScrolling();
    
    // Initialize modal functionality
    initializeModals();
    
    // Initialize checklist functionality
    initializeChecklist();
    
    // Initialize link card interactions
    initializeLinkCards();
    
    // Initialize back to top button
    initializeBackToTop();
    
    // Add animations
    addAnimations();
    
    // Initialize external link handling
    initializeExternalLinks();
    
    // Add entrance animations after a delay
    setTimeout(addEntranceAnimations, 500);
    
    // Add competition judge focus indicators
    initializeCompetitionFeatures();
}

// Smooth scrolling for internal navigation
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or modal trigger
            if (href === '#' || href === '#checklist') {
                return;
            }
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Modal functionality - Fixed for checklist button
function initializeModals() {
    const modal = document.getElementById('checklist');
    const checklistBtns = document.querySelectorAll('.checklist-btn, [data-target="#checklist"]');
    const closeBtn = document.querySelector('.modal__close');
    
    // Open modal - handle multiple possible selectors
    checklistBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Checklist button clicked'); // Debug log
            openModal();
        });
        
        // Also handle keyboard events for buttons
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                console.log('Checklist button activated via keyboard'); // Debug log
                openModal();
            }
        });
    });
    
    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal();
        });
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
    
    console.log('Modal system initialized. Found', checklistBtns.length, 'checklist buttons'); // Debug log
}

function openModal() {
    const modal = document.getElementById('checklist');
    console.log('Opening modal...', modal); // Debug log
    
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Focus the close button for accessibility
        const closeBtn = modal.querySelector('.modal__close');
        if (closeBtn) {
            setTimeout(() => closeBtn.focus(), 100);
        }
        
        console.log('Modal opened successfully'); // Debug log
    } else {
        console.error('Modal element not found!'); // Debug log
    }
}

function closeModal() {
    const modal = document.getElementById('checklist');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        document.body.style.overflow = '';
        
        // Return focus to the checklist button
        const checklistBtn = document.querySelector('.checklist-btn');
        if (checklistBtn) {
            checklistBtn.focus();
        }
        
        console.log('Modal closed successfully'); // Debug log
    }
}

// Checklist functionality
function initializeChecklist() {
    const checklistItems = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    
    checklistItems.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const item = this.closest('.checklist-item');
            const span = item.querySelector('span');
            
            if (this.checked) {
                item.style.opacity = '0.7';
                span.style.textDecoration = 'line-through';
            } else {
                item.style.opacity = '1';
                span.style.textDecoration = 'none';
            }
            
            updateChecklistProgress();
        });
    });
}

function updateChecklistProgress() {
    const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    const checked = document.querySelectorAll('.checklist-item input[type="checkbox"]:checked');
    
    const progress = checked.length;
    const total = checkboxes.length;
    
    // Show completion message when all items are checked
    if (progress === total && total > 0) {
        showCompletionMessage();
    }
}

function showCompletionMessage() {
    // Remove existing message if any
    const existingMessage = document.querySelector('.completion-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create a simple completion message
    const message = document.createElement('div');
    message.className = 'completion-message';
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2d5a27;
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        font-size: 14px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        animation: slideIn 0.3s ease-out;
        max-width: 280px;
    `;
    
    message.innerHTML = `
        <div>🎉 ยินดีด้วย! คุณได้ทำครบทุกข้อแล้ว</div>
        <div style="font-size: 12px; opacity: 0.9; margin-top: 4px;">Congratulations! You've completed all items</div>
    `;
    
    document.body.appendChild(message);
    
    // Remove message after 4 seconds
    setTimeout(() => {
        if (message.parentNode) {
            message.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 300);
        }
    }, 4000);
}

// Link card interactions
function initializeLinkCards() {
    const linkCards = document.querySelectorAll('.primary-source-card, .additional-link-card, .checklist-btn');
    
    linkCards.forEach(card => {
        // Add specific handling for checklist button
        if (card.classList.contains('checklist-btn')) {
            // Ensure it's treated as a button
            card.setAttribute('type', 'button');
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            
            // Add visual feedback
            card.addEventListener('mousedown', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            card.addEventListener('mouseup', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
            });
        }
        
        // Add keyboard navigation for button elements
        if (card.tagName === 'BUTTON') {
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        }
        
        // Add touch feedback for mobile
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
        
        card.addEventListener('touchcancel', function() {
            this.style.transform = '';
        });
    });
}

// Competition judge features - highlight primary sources
function initializeCompetitionFeatures() {
    const primarySources = document.querySelector('.primary-sources');
    
    if (primarySources) {
        // Add a subtle pulse effect to draw attention
        primarySources.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 25px rgba(212, 175, 55, 0.3), 0 0 0 3px rgba(212, 175, 55, 0.1)';
        });
        
        primarySources.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    }
    
    // Add source counting for judges
    const sourceCards = document.querySelectorAll('.primary-source-card');
    if (sourceCards.length > 0) {
        console.log(`Primary sources loaded for competition judges: ${sourceCards.length} sources`);
    }
    
    // Add analytics for judge interaction
    sourceCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            console.log(`Judge clicked primary source ${index + 1}: ${this.href}`);
        });
    });
}

// External links handling
function initializeExternalLinks() {
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    
    externalLinks.forEach(link => {
        // Ensure external links open in new tabs
        if (!link.hasAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
        
        // Add visual feedback for clicks
        link.addEventListener('click', function(e) {
            // Add a brief visual feedback
            const originalTransform = this.style.transform;
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = originalTransform;
            }, 150);
            
            // Log for debugging
            console.log('External link clicked:', this.href);
        });
        
        // Add loading indicator for primary sources
        if (link.classList.contains('primary-source-card')) {
            link.addEventListener('click', function() {
                showLinkLoadingFeedback(this);
            });
        }
    });
}

function showLinkLoadingFeedback(linkElement) {
    const originalText = linkElement.innerHTML;
    const loadingIndicator = document.createElement('div');
    loadingIndicator.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: #1f4e79;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 11px;
        z-index: 10;
    `;
    loadingIndicator.textContent = 'เปิดแล้ว / Opened';
    
    linkElement.style.position = 'relative';
    linkElement.appendChild(loadingIndicator);
    
    setTimeout(() => {
        if (loadingIndicator.parentNode) {
            loadingIndicator.parentNode.removeChild(loadingIndicator);
        }
    }, 2000);
}

// Back to top functionality
function initializeBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        // Make sure the button has the click handler
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToTop();
        });
        
        // Show/hide based on scroll position
        const handleScroll = throttle(function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity = '0.7';
                backToTopBtn.style.visibility = 'visible';
            }
        }, 100);
        
        window.addEventListener('scroll', handleScroll);
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add CSS animations dynamically
function addAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-20px);
            }
        }
        
        @keyframes pulseGold {
            0%, 100% {
                box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.3);
            }
            50% {
                box-shadow: 0 0 0 10px rgba(212, 175, 55, 0);
            }
        }
        
        .loaded {
            animation: fadeIn 0.5s ease-out;
        }
        
        .primary-sources {
            animation: pulseGold 3s ease-in-out infinite;
        }
    `;
    document.head.appendChild(style);
}

// Add entrance animations for sections
function addEntranceAnimations() {
    const sections = document.querySelectorAll('.section');
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
                    entry.target.style.opacity = '1';
                    observer.unobserve(entry.target);
                    
                    // Special handling for primary sources
                    if (entry.target.classList.contains('primary-sources')) {
                        setTimeout(() => {
                            entry.target.style.animation += ', pulseGold 3s ease-in-out infinite';
                        }, 600);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        sections.forEach(section => {
            section.style.opacity = '0';
            observer.observe(section);
        });
    } else {
        // Fallback for older browsers
        sections.forEach(section => {
            section.style.opacity = '1';
        });
    }
}

// Performance optimization: Throttle function
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Handle orientation change for mobile devices
window.addEventListener('orientationchange', function() {
    // Close modal on orientation change to avoid layout issues
    setTimeout(() => {
        const modal = document.getElementById('checklist');
        if (modal && !modal.classList.contains('hidden')) {
            closeModal();
        }
    }, 100);
});

// Add loading state management
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Show welcome message for judges
    setTimeout(() => {
        showJudgeWelcomeMessage();
    }, 1000);
});

function showJudgeWelcomeMessage() {
    const primarySources = document.querySelector('.primary-sources');
    if (primarySources && !sessionStorage.getItem('judge-welcomed')) {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #d4af37, #ff8c42);
            color: white;
            padding: 24px;
            border-radius: 12px;
            font-size: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 1002;
            text-align: center;
            max-width: 400px;
            animation: fadeIn 0.5s ease-out;
        `;
        
        message.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 8px;">🏆 สำหรับกรรมการตัดสิน</div>
            <div style="font-size: 14px;">แหล่งข้อมูลที่ใช้ในโปสเตอร์แสดงด้านบน</div>
            <div style="font-size: 12px; opacity: 0.9; margin-top: 8px;">Primary sources used in infographic shown above</div>
            <button onclick="this.parentNode.remove(); sessionStorage.setItem('judge-welcomed', 'true');" style="margin-top: 12px; background: rgba(255,255,255,0.2); border: 1px solid white; color: white; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px;">เข้าใจแล้ว / Understood</button>
        `;
        
        document.body.appendChild(message);
        
        // Auto-remove after 8 seconds
        setTimeout(() => {
            if (message.parentNode) {
                message.style.animation = 'fadeOut 0.5s ease-in forwards';
                setTimeout(() => {
                    if (message.parentNode) {
                        message.parentNode.removeChild(message);
                        sessionStorage.setItem('judge-welcomed', 'true');
                    }
                }, 500);
            }
        }, 8000);
    }
}

// Make functions globally available
window.scrollToTop = scrollToTop;
window.closeModal = closeModal;
window.openModal = openModal;

// Add performance monitoring for competition purposes
window.addEventListener('beforeunload', function() {
    const performance = window.performance;
    const navigationTiming = performance.getEntriesByType('navigation')[0];
    
    if (navigationTiming) {
        console.log('Page performance for judges:', {
            loadTime: navigationTiming.loadEventEnd - navigationTiming.loadEventStart,
            domContentLoaded: navigationTiming.domContentLoadedEventEnd - navigationTiming.domContentLoadedEventStart,
            primarySourcesLoaded: document.querySelectorAll('.primary-source-card').length
        });
    }
});

// Add keyboard shortcuts for judges
document.addEventListener('keydown', function(e) {
    // Press 'J' to jump to primary sources
    if (e.key === 'j' || e.key === 'J') {
        const primarySources = document.querySelector('.primary-sources');
        if (primarySources) {
            primarySources.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }
    
    // Press 'A' to jump to additional resources
    if (e.key === 'a' || e.key === 'A') {
        const additionalResources = document.querySelector('.additional-resources');
        if (additionalResources) {
            additionalResources.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }
});

// Initialize accessibility enhancements
function initializeAccessibility() {
    // Add skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#primary-sources';
    skipLink.textContent = 'Skip to Primary Sources';
    skipLink.style.cssText = `
        position: absolute;
        top: -100px;
        left: 0;
        background: #1f4e79;
        color: white;
        padding: 8px 16px;
        text-decoration: none;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-100px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize accessibility after DOM is ready
setTimeout(initializeAccessibility, 500);