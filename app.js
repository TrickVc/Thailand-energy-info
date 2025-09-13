// Thailand Household Energy Efficiency Page JavaScript

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
    
    // Add entrance animations after a delay
    setTimeout(addEntranceAnimations, 500);
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

// Modal functionality
function initializeModals() {
    const modal = document.getElementById('checklist');
    const checklistBtn = document.querySelector('.checklist-btn');
    const closeBtn = document.querySelector('.modal__close');
    
    // Open modal
    if (checklistBtn) {
        checklistBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openModal();
        });
    }
    
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
}

function openModal() {
    const modal = document.getElementById('checklist');
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Focus the close button for accessibility
        const closeBtn = modal.querySelector('.modal__close');
        if (closeBtn) {
            setTimeout(() => closeBtn.focus(), 100);
        }
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
    const linkCards = document.querySelectorAll('.link-card');
    
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
        
        .loaded {
            animation: fadeIn 0.5s ease-out;
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
});

// Make functions globally available
window.scrollToTop = scrollToTop;
window.closeModal = closeModal;
window.openModal = openModal;

// Ensure external links open in new tabs
document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        if (!link.hasAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
});

// Add visual feedback for external link clicks
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.href.startsWith('http')) {
        // Add a brief visual feedback
        const link = e.target;
        const originalColor = link.style.color;
        link.style.color = '#1f4e79';
        setTimeout(() => {
            link.style.color = originalColor;
        }, 200);
    }
});