// Thailand Household Energy Efficiency Page JavaScript - Fixed Version

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    console.log('Initializing Thailand Energy Efficiency App...');
    
    // Initialize all components
    initializeSmoothScrolling();
    initializeModals();
    initializeChecklist();
    initializeLinkCards();
    initializeBackToTop();
    initializeExternalLinks();
    initializeKeyboardNavigation();
    addAnimations();
    
    // Add entrance animations after a delay
    setTimeout(addEntranceAnimations, 300);
    
    console.log('App initialized successfully');
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

// Modal functionality - Fixed
function initializeModals() {
    const modal = document.getElementById('checklist');
    const checklistBtn = document.querySelector('.checklist-btn');
    const closeBtn = document.querySelector('.modal__close');
    
    console.log('Modal elements found:', { modal: !!modal, checklistBtn: !!checklistBtn, closeBtn: !!closeBtn });
    
    // Open modal
    if (checklistBtn) {
        checklistBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Checklist button clicked');
            openModal();
        });
    }
    
    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Close button clicked');
            closeModal();
        });
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                console.log('Clicked outside modal');
                closeModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            console.log('Escape key pressed');
            closeModal();
        }
    });
}

function openModal() {
    const modal = document.getElementById('checklist');
    if (modal) {
        console.log('Opening modal...');
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation
        const content = modal.querySelector('.modal__content');
        if (content) {
            content.style.animation = 'modalSlideIn 0.3s ease-out';
        }
        
        // Focus the close button for accessibility
        const closeBtn = modal.querySelector('.modal__close');
        if (closeBtn) {
            setTimeout(() => closeBtn.focus(), 100);
        }
        
        // Update progress display
        updateChecklistProgress();
    }
}

function closeModal() {
    const modal = document.getElementById('checklist');
    if (modal) {
        console.log('Closing modal...');
        const content = modal.querySelector('.modal__content');
        if (content) {
            content.style.animation = 'modalSlideOut 0.3s ease-in';
        }
        
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
        
        // Return focus to the checklist button
        const checklistBtn = document.querySelector('.checklist-btn');
        if (checklistBtn) {
            checklistBtn.focus();
        }
    }
}

// Checklist functionality - Fixed
function initializeChecklist() {
    const checklistItems = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    console.log('Found checklist items:', checklistItems.length);
    
    checklistItems.forEach((checkbox, index) => {
        checkbox.addEventListener('change', function() {
            updateChecklistItemAppearance(this);
            updateChecklistProgress();
        });
    });
    
    // Initial progress update
    updateChecklistProgress();
}

function updateChecklistItemAppearance(checkbox) {
    const item = checkbox.closest('.checklist-item');
    const span = item.querySelector('span');
    
    if (checkbox.checked) {
        item.style.opacity = '0.7';
        item.style.background = '#D1E7DD';
        span.style.textDecoration = 'line-through';
        span.style.color = '#0F5132';
    } else {
        item.style.opacity = '1';
        item.style.background = '';
        span.style.textDecoration = 'none';
        span.style.color = '';
    }
}

function updateChecklistProgress() {
    const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    const checked = document.querySelectorAll('.checklist-item input[type="checkbox"]:checked');
    
    const progress = checked.length;
    const total = checkboxes.length;
    
    console.log(`Checklist progress: ${progress}/${total}`);
    
    // Show completion message when all items are checked
    if (progress === total && total > 0) {
        showCompletionMessage();
    }
    
    // Update progress in modal header if exists
    updateProgressDisplay(progress, total);
}

function updateProgressDisplay(progress, total) {
    const modalHeader = document.querySelector('.modal__header h3');
    if (modalHeader) {
        const existingProgress = modalHeader.querySelector('.progress-indicator');
        if (existingProgress) {
            existingProgress.remove();
        }
        
        if (total > 0) {
            const progressIndicator = document.createElement('span');
            progressIndicator.className = 'progress-indicator';
            progressIndicator.style.cssText = `
                font-size: 14px;
                background: #0D6EFD;
                color: white;
                padding: 4px 8px;
                border-radius: 12px;
                margin-left: 12px;
                font-weight: 500;
            `;
            progressIndicator.textContent = `${progress}/${total}`;
            modalHeader.appendChild(progressIndicator);
        }
    }
}

function showCompletionMessage() {
    // Remove existing message if any
    const existingMessage = document.querySelector('.completion-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create a completion message
    const message = document.createElement('div');
    message.className = 'completion-message';
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #198754;
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        font-size: 14px;
        box-shadow: 0 4px 16px rgba(25, 135, 84, 0.3);
        z-index: 1001;
        animation: slideIn 0.3s ease-out;
        max-width: 320px;
        border: 2px solid #146C43;
    `;
    
    message.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 18px;">🎉</span>
            <div>
                <div style="font-weight: 600;">ยินดีด้วย! ครบทุกข้อแล้ว</div>
                <div style="font-size: 12px; opacity: 0.9; margin-top: 2px;">All energy saving tips completed!</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(message);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (message.parentNode) {
            message.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 300);
        }
    }, 5000);
}

// Link card interactions
function initializeLinkCards() {
    const linkCards = document.querySelectorAll('.link-card');
    console.log('Found link cards:', linkCards.length);
    
    linkCards.forEach(card => {
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
            this.style.transform = 'scale(0.98) translateY(-1px)';
        }, { passive: true });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        }, { passive: true });
        
        card.addEventListener('touchcancel', function() {
            this.style.transform = '';
        }, { passive: true });
        
        // Add hover effect enhancement
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.borderColor = '#0D6EFD';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.borderColor = '';
            }
        });
    });
}

// Back to top functionality - Fixed
function initializeBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    console.log('Back to top button found:', !!backToTopBtn);
    
    if (backToTopBtn) {
        // Make button visible initially with low opacity
        backToTopBtn.style.position = 'fixed';
        backToTopBtn.style.bottom = '20px';
        backToTopBtn.style.right = '20px';
        backToTopBtn.style.zIndex = '999';
        backToTopBtn.style.transition = 'all 0.3s ease';
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
        backToTopBtn.style.transform = 'translateY(10px)';
        
        // Click handler
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Back to top clicked');
            scrollToTop();
        });
        
        // Show/hide based on scroll position
        const handleScroll = throttle(function() {
            const scrolled = window.pageYOffset;
            if (scrolled > 400) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
                backToTopBtn.style.transform = 'translateY(0)';
            } else if (scrolled > 200) {
                backToTopBtn.style.opacity = '0.7';
                backToTopBtn.style.visibility = 'visible';
                backToTopBtn.style.transform = 'translateY(0)';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
                backToTopBtn.style.transform = 'translateY(10px)';
            }
        }, 100);
        
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call
    }
}

function scrollToTop() {
    console.log('Scrolling to top...');
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// External links functionality - Fixed
function initializeExternalLinks() {
    // Wait for all links to be loaded
    setTimeout(() => {
        const externalLinks = document.querySelectorAll('a[href^="http"]');
        console.log('Found external links:', externalLinks.length);
        
        externalLinks.forEach(link => {
            // Ensure external links open in new tabs
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            
            // Add visual feedback for external link clicks
            link.addEventListener('click', function(e) {
                console.log('External link clicked:', this.href);
                
                // Add a brief visual feedback
                const originalTransform = this.style.transform;
                this.style.transform = 'scale(0.95)';
                this.style.transition = 'transform 0.1s ease';
                
                setTimeout(() => {
                    this.style.transform = originalTransform;
                }, 150);
                
                // Show a brief "opening" indicator
                showLinkOpenIndicator();
            });
        });
    }, 100);
}

function showLinkOpenIndicator() {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #0D6EFD;
        color: white;
        padding: 8px 16px;
        border-radius: 4px;
        font-size: 12px;
        z-index: 1000;
        animation: fadeInOut 2s ease forwards;
        pointer-events: none;
    `;
    indicator.textContent = 'เปิดลิงก์ในแท็บใหม่... / Opening link in new tab...';
    
    document.body.appendChild(indicator);
    
    setTimeout(() => {
        if (indicator.parentNode) {
            indicator.parentNode.removeChild(indicator);
        }
    }, 2000);
}

// Keyboard navigation
function initializeKeyboardNavigation() {
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Alt + T for back to top
        if (e.altKey && e.key === 't') {
            e.preventDefault();
            scrollToTop();
        }
        
        // Alt + C for checklist
        if (e.altKey && e.key === 'c') {
            e.preventDefault();
            const checklistBtn = document.querySelector('.checklist-btn');
            if (checklistBtn) {
                checklistBtn.click();
            }
        }
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
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInOut {
            0% {
                opacity: 0;
                transform: translateX(-50%) translateY(-10px);
            }
            20%, 80% {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
            100% {
                opacity: 0;
                transform: translateX(-50%) translateY(-10px);
            }
        }
        
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: scale(0.8) translateY(-50px);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
        
        @keyframes modalSlideOut {
            from {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
            to {
                opacity: 0;
                transform: scale(0.8) translateY(-50px);
            }
        }
        
        .loaded {
            animation: fadeIn 0.6s ease-out;
        }
        
        .section {
            opacity: 0;
            transform: translateY(20px);
        }
        
        .section.animate-in {
            animation: fadeIn 0.8s ease-out forwards;
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
                    entry.target.classList.add('animate-in');
                    entry.target.style.opacity = '1';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.animationDelay = `${index * 0.1}s`;
            observer.observe(section);
        });
    } else {
        // Fallback for older browsers
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = '1';
                section.classList.add('animate-in');
            }, index * 100);
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
    updateChecklistProgress();
    console.log('Page fully loaded');
});

// Make functions globally available
window.scrollToTop = scrollToTop;
window.closeModal = closeModal;
window.openModal = openModal;

console.log('Thailand Energy Efficiency App JavaScript loaded');