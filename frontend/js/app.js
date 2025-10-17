// Enhanced Main Application JavaScript with Modern Features
class StriveHiveApp {
    constructor() {
        this.currentUser = null;
        this.currentSection = 'dashboard';
        this.achievements = [];
        this.animationId = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadUserData();
        this.showSection('dashboard');
        this.updateDashboard();
        this.createFloatingElements();
        this.startParticleAnimation();
        this.showWelcomeToast();
    }

    // Create floating background elements
    createFloatingElements() {
        const container = document.getElementById('floatingElements');
        if (!container) return;

        // Create 15 floating elements
        for (let i = 0; i < 15; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            
            // Random positioning
            element.style.left = Math.random() * 100 + '%';
            element.style.animationDelay = Math.random() * 15 + 's';
            element.style.animationDuration = (15 + Math.random() * 10) + 's';
            
            // Random sizes
            const size = 10 + Math.random() * 20;
            element.style.width = size + 'px';
            element.style.height = size + 'px';
            
            container.appendChild(element);
        }
    }

    // Start particle animation
    startParticleAnimation() {
        const particles = document.querySelectorAll('.floating-element');
        particles.forEach((particle, index) => {
            setTimeout(() => {
                particle.style.animationPlayState = 'running';
            }, index * 1000);
        });
    }

    // Show welcome toast notification
    showWelcomeToast() {
        setTimeout(() => {
            this.showToast('Welcome to Strive Hive! 🎉 Ready to transform your health journey?', 'success');
        }, 1500);
    }

    // Enhanced toast notification system
    showToast(message, type = 'success') {
        // Remove existing toasts
        const existingToasts = document.querySelectorAll('.toast');
        existingToasts.forEach(toast => toast.remove());

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }

    // Add achievement
    addAchievement(title, icon = 'medal') {
        const achievement = { title, icon, timestamp: new Date() };
        this.achievements.push(achievement);
        this.updateAchievementsList();
        this.showToast(`Achievement Unlocked: ${title}! 🏆`, 'success');
    }

    // Update achievements list in the dashboard
    updateAchievementsList() {
        const container = document.getElementById('achievements-list');
        if (!container) return;

        container.innerHTML = '';
        
        if (this.achievements.length === 0) {
            container.innerHTML = '<div class="achievement-badge"><i class="fas fa-star"></i><span>Complete your first activity to earn achievements! ⭐</span></div>';
            return;
        }

        // Show latest 3 achievements
        const recentAchievements = this.achievements.slice(-3).reverse();
        recentAchievements.forEach(achievement => {
            const badge = document.createElement('div');
            badge.className = 'achievement-badge';
            badge.innerHTML = `<i class="fas fa-${achievement.icon}"></i><span>${achievement.title}</span>`;
            container.appendChild(badge);
        });
    }

    // Enhanced setup event listeners with animations
    setupEventListeners() {
        // Initialize navigation functionality
        this.initializeNavigation();
        
        // Enhanced form submissions
        this.setupFormHandlers();
        
        // Add button hover effects
        this.addButtonAnimations();
        
        // Setup footer interactions
        this.setupFooterInteractions();
        
        // Setup goals editing functionality
        this.setupGoalsEditing();
        
        // Setup profile form real-time updates
        this.setupProfileRealTimeUpdates();
    }

    // Initialize complete navigation system
    initializeNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');

        // Set up navigation links with IMMEDIATE menu close
        navLinks.forEach(link => {
            // Create a super aggressive click handler
            const handleNavClick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                
                console.log('🔥 NAV LINK CLICKED - FORCE CLOSING MENU');
                
                // Add a CSS override style that will force hide the menu
                let forceHideStyle = document.getElementById('force-hide-nav');
                if (!forceHideStyle) {
                    forceHideStyle = document.createElement('style');
                    forceHideStyle.id = 'force-hide-nav';
                    document.head.appendChild(forceHideStyle);
                }
                
                // Inject CSS that overrides everything
                forceHideStyle.textContent = `
                    #nav-menu {
                        display: none !important;
                        visibility: hidden !important;
                        opacity: 0 !important;
                        transform: translateX(-100%) !important;
                        left: -100% !important;
                        top: -100vh !important;
                        z-index: -9999 !important;
                        pointer-events: none !important;
                        animation: none !important;
                        transition: none !important;
                    }
                    body {
                        overflow: auto !important;
                        position: static !important;
                    }
                    #hamburger {
                        animation: none !important;
                        transition: none !important;
                    }
                `;
                
                // Get elements directly each time
                const hamburger = document.getElementById('hamburger');
                const navMenu = document.getElementById('nav-menu');
                const body = document.body;
                
                // NUCLEAR OPTION - Force remove ALL nav classes and reset body
                if (hamburger) {
                    hamburger.className = hamburger.className.replace(/active/g, '');
                    hamburger.style.cssText = '';
                }
                
                if (navMenu) {
                    navMenu.className = navMenu.className.replace(/active/g, '');
                    navMenu.style.cssText = `
                        transform: translateX(-100%) !important;
                        left: -100% !important;
                        opacity: 0 !important;
                        visibility: hidden !important;
                        display: none !important;
                        pointer-events: none !important;
                        animation: none !important;
                        transition: none !important;
                    `;
                }
                
                if (body) {
                    // Remove nav-open class multiple ways
                    body.classList.remove('nav-open');
                    body.className = body.className.replace(/nav-open/g, '');
                    body.className = body.className.replace(/\s+/g, ' ').trim();
                    
                    // Force reset body overflow
                    body.style.overflow = '';
                    body.style.position = '';
                    body.style.width = '';
                }
                
                console.log('🔥 NUCLEAR MENU CLOSE - Body classes:', body.className);
                
                // Aggressive cleanup loop - keep removing nav-open until it's gone
                let cleanupAttempts = 0;
                const cleanupInterval = setInterval(() => {
                    cleanupAttempts++;
                    if (body.classList.contains('nav-open') && cleanupAttempts < 10) {
                        body.classList.remove('nav-open');
                        body.style.overflow = '';
                        console.log('🧹 Cleanup attempt', cleanupAttempts, '- removing persistent nav-open');
                    } else {
                        clearInterval(cleanupInterval);
                        console.log('🧹 Cleanup complete after', cleanupAttempts, 'attempts');
                    }
                }, 50);
                
                // Handle navigation after menu is closed
                const targetSection = link.getAttribute('href').substring(1);
                
                // Update active nav link
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                });
                link.classList.add('active');
                
                // Navigate to section
                this.showSection(targetSection);
                
                console.log('🎯 Navigation completed, menu should be hidden');
                
                // Remove the override styles after navigation is complete
                setTimeout(() => {
                    if (forceHideStyle && forceHideStyle.parentNode) {
                        forceHideStyle.remove();
                    }
                    // Reset menu display so it can be opened again
                    if (navMenu) {
                        navMenu.style.display = '';
                    }
                    console.log('🧹 Override styles removed and menu reset');
                }, 300);
            };
            
            // Add multiple event listeners for maximum compatibility
            link.addEventListener('click', handleNavClick, true); // Use capture phase
            link.addEventListener('touchstart', handleNavClick, true);
            link.addEventListener('touchend', handleNavClick, true);

            // Add hover effects
            link.addEventListener('mouseenter', () => {
                if (!link.classList.contains('active')) {
                    link.style.transform = 'translateY(-2px)';
                }
            });

            link.addEventListener('mouseleave', () => {
                if (!link.classList.contains('active')) {
                    link.style.transform = 'translateY(0)';
                }
            });
        });

        // Mobile hamburger menu toggle with enhanced animations
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', (e) => {
                e.stopPropagation();
                console.log('🍔 HAMBURGER CLICKED');
                
                // Remove any force-hide styles first
                const forceHideStyle = document.getElementById('force-hide-nav');
                if (forceHideStyle) {
                    forceHideStyle.remove();
                    console.log('🧹 Removed force-hide styles to allow menu toggle');
                }
                
                // Simple approach: if menu is open, just hide it completely
                if (navMenu.classList.contains('active')) {
                    console.log('🍔 Menu is open, hiding it immediately');
                    navMenu.style.display = 'none';
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('nav-open');
                    document.body.style.overflow = '';
                    
                    // Reset menu display after brief moment
                    setTimeout(() => {
                        navMenu.style.display = '';
                    }, 100);
                } else {
                    console.log('🍔 Opening menu');
                    this.toggleMobileMenu();
                }
            });
            
            // Add global click handler to close menu on ANY click outside
            document.addEventListener('click', (e) => {
                if (navMenu.classList.contains('active')) {
                    console.log('🌍 GLOBAL CLICK - Checking if should close menu');
                    const isNavMenu = e.target.closest('#nav-menu');
                    const isHamburger = e.target.closest('#hamburger');
                    
                    if (!isNavMenu && !isHamburger) {
                        console.log('🔥 GLOBAL CLICK - CLOSING MENU');
                        this.forceCloseMobileMenu();
                    }
                }
            });
            
            // Special mobile-only handler
            if (window.innerWidth <= 768) {
                document.addEventListener('touchstart', (e) => {
                    if (navMenu.classList.contains('active')) {
                        const isNavMenu = e.target.closest('#nav-menu');
                        const isHamburger = e.target.closest('#hamburger');
                        
                        if (!isNavMenu && !isHamburger) {
                            console.log('📱 MOBILE TOUCH - CLOSING MENU');
                            this.forceCloseMobileMenu();
                        }
                    }
                });
            }

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (navMenu.classList.contains('active')) {
                    const clickedInsideMenu = e.target.closest('#nav-menu');
                    const clickedHamburger = e.target.closest('#hamburger');
                    if (!clickedInsideMenu && !clickedHamburger) {
                        this.forceCloseMobileMenu();
                    }
                }
            });

            // Also close on touchstart for mobile
            document.addEventListener('touchend', (e) => {
                if (navMenu.classList.contains('active')) {
                    const clickedInsideMenu = e.target.closest('#nav-menu');
                    const clickedHamburger = e.target.closest('#hamburger'); 
                    if (!clickedInsideMenu && !clickedHamburger) {
                        this.forceCloseMobileMenu();
                    }
                }
            });

            // Close mobile menu on window resize
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    this.closeMobileMenu();
                }
            });

            // Smooth scroll effect on page load
            window.addEventListener('load', () => {
                document.body.classList.add('page-loaded');
            });
        }

        // Ensure initial section is shown
        this.showSection('dashboard');
    }

    // Toggle mobile menu with enhanced animations
    toggleMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        console.log('🍔 toggleMobileMenu called');
        
        // Always clean up any force-hide styles first
        const forceHideStyle = document.getElementById('force-hide-nav');
        if (forceHideStyle) {
            forceHideStyle.remove();
            console.log('🧹 Cleaned up force-hide styles in toggleMobileMenu');
        }
        
        if (hamburger && navMenu) {
            const isActive = navMenu.classList.contains('active');
            
            console.log('Menu is currently active:', isActive);
            
            if (isActive) {
                // Force close immediately instead of animation
                console.log('🔥 Menu is active, force closing...');
                this.forceCloseMobileMenu();
            } else {
                // Clear any existing animation classes and reset styles before opening
                navMenu.classList.remove('closing', 'slideInMobile', 'slideOutMobile');
                navMenu.style.cssText = ''; // Clear all inline styles
                navMenu.style.animation = 'none';
                
                // Open menu
                hamburger.classList.add('active');
                navMenu.classList.add('active');
                document.body.classList.add('nav-open');
                
                console.log('🍔 Menu opened successfully');
                
                // Animate menu items with staggered effect
                const menuItems = navMenu.querySelectorAll('.nav-link');
                menuItems.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.transition = 'all 0.3s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100 + (index * 100));
                });
            }
        }
    }

    // Close mobile menu with smooth animation
    closeMobileMenuWithAnimation() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu) {
            // Animate menu items out
            const menuItems = navMenu.querySelectorAll('.nav-link');
            menuItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-20px)';
                }, index * 50);
            });
            
            // Close menu after animation
            setTimeout(() => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
                
                // Reset item styles
                menuItems.forEach(item => {
                    item.style.opacity = '';
                    item.style.transform = '';
                    item.style.transition = '';
                });
            }, 300);
        }
    }

    // Force close mobile menu immediately (no animations)
    forceCloseMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const body = document.body;
        
        console.log('🔥 forceCloseMobileMenu called');
        
        if (hamburger && navMenu) {
            // Remove ALL possible conflicting classes
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('nav-open');
            body.classList.remove('page-loaded'); // Remove page-loaded that might interfere
            
            // Stop any ongoing animations by removing transition classes
            navMenu.classList.remove('slideInMobile', 'slideOutMobile');
            hamburger.classList.remove('animate');
            
            // Force multiple CSS properties to hide menu immediately
            navMenu.style.cssText = `
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                left: -100% !important;
                transform: translateX(-100%) !important;
                transition: none !important;
                animation: none !important;
                z-index: -1 !important;
            `;
            
            hamburger.style.cssText = `
                transition: none !important;
                animation: none !important;
            `;
            
            // Reset styles after ensuring menu is closed
            setTimeout(() => {
                navMenu.style.cssText = '';
                hamburger.style.cssText = '';
                // Re-add page-loaded after menu operations are complete
                body.classList.add('page-loaded');
            }, 200);
            
            // Reset any menu item animations
            const menuItems = navMenu.querySelectorAll('.nav-link');
            menuItems.forEach(item => {
                item.style.cssText = '';
            });
            
            console.log('🔥 Mobile menu FORCE CLOSED with page-loaded class reset');
        }
    }

    // Close mobile menu (simplified for external calls)
    closeMobileMenu() {
        this.forceCloseMobileMenu();
    }

    // Add interactive button animations with enhanced effects
    addButtonAnimations() {
        document.querySelectorAll('.btn').forEach(btn => {
            // Enhanced hover effects
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px) scale(1.02)';
                this.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.4)';
                
                // Add ripple effect
                const ripple = document.createElement('div');
                ripple.className = 'btn-ripple';
                ripple.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    transform: translate(-50%, -50%);
                    animation: rippleEffect 0.6s ease-out;
                    pointer-events: none;
                `;
                
                if (this.style.position !== 'absolute' && this.style.position !== 'relative') {
                    this.style.position = 'relative';
                }
                this.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 600);
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'var(--shadow-md)';
            });
            
            // Enhanced click effect
            btn.addEventListener('click', function(e) {
                // Create click wave effect
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const clickWave = document.createElement('div');
                clickWave.className = 'click-wave';
                clickWave.style.cssText = `
                    position: absolute;
                    left: ${x}px;
                    top: ${y}px;
                    width: 0;
                    height: 0;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.5);
                    transform: translate(-50%, -50%);
                    animation: clickWaveEffect 0.5s ease-out;
                    pointer-events: none;
                `;
                
                this.appendChild(clickWave);
                
                // Button press animation
                this.style.transform = 'scale(0.96) translateY(-2px)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-4px) scale(1.02)';
                }, 150);
                
                setTimeout(() => {
                    if (clickWave.parentNode) {
                        clickWave.parentNode.removeChild(clickWave);
                    }
                }, 500);
            });
            
            // Add focus styles
            btn.addEventListener('focus', function() {
                this.style.outline = 'none';
                this.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.3), var(--shadow-lg)';
            });
            
            btn.addEventListener('blur', function() {
                this.style.boxShadow = 'var(--shadow-md)';
            });
        });

        // Add card interaction animations
        document.querySelectorAll('.card, .stat-card, .goal-progress-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'var(--shadow-md)';
            });
        });

        // Add CSS animations for the new effects
        this.addButtonAnimationStyles();
    }

    // Add dynamic CSS for button animations
    addButtonAnimationStyles() {
        if (document.getElementById('dynamic-button-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'dynamic-button-styles';
        style.textContent = `
            @keyframes rippleEffect {
                to {
                    width: 100px;
                    height: 100px;
                    opacity: 0;
                }
            }
            
            @keyframes clickWaveEffect {
                to {
                    width: 50px;
                    height: 50px;
                    opacity: 0;
                }
            }
            
            @keyframes pulseGlow {
                0%, 100% {
                    box-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
                }
                50% {
                    box-shadow: 0 0 40px rgba(102, 126, 234, 0.6);
                }
            }
            
            .btn-ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                pointer-events: none;
            }
            
            .click-wave {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                pointer-events: none;
            }
            
            /* Enhanced card hover effects */
            .card, .stat-card, .goal-progress-card {
                transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            /* Smooth section transitions */
            .section {
                transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            /* Mobile menu enhancements */
            @media (max-width: 768px) {
                .nav-link {
                    transition: all 0.3s ease;
                }
            }
            
            /* Page load animation */
            .page-loaded {
                animation: pageLoadFade 0.8s ease-out;
            }
            
            @keyframes pageLoadFade {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    // Enhanced section switching with smooth animations
    showSectionWithAnimation(sectionName) {
        console.log('showSectionWithAnimation called with:', sectionName);
        
        // Update navigation with smooth transitions
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            link.style.transform = 'scale(1)';
        });
        
        const targetNavLink = document.querySelector(`[href="#${sectionName}"]`);
        if (targetNavLink) {
            targetNavLink.classList.add('active');
            // Add a subtle pulse effect
            targetNavLink.style.animation = 'pulseGlow 0.6s ease';
            setTimeout(() => targetNavLink.style.animation = '', 600);
        }

        // Hide current section with smooth fade and slide
        const currentSection = document.querySelector('.section.active');
        
        if (currentSection) {
            // Add page transition overlay
            this.showPageTransition();
            
            currentSection.style.opacity = '0';
            currentSection.style.transform = 'translateY(30px) scale(0.95)';
            
            setTimeout(() => {
                currentSection.classList.remove('active');
                this.showNewSectionEnhanced(sectionName);
                // Remove transition overlay
                setTimeout(() => this.hidePageTransition(), 200);
            }, 300);
        } else {
            this.showNewSectionEnhanced(sectionName);
        }

        this.currentSection = sectionName;
    }

    // Show new section with enhanced animations
    showNewSectionEnhanced(sectionName) {
        const newSection = document.getElementById(sectionName);
        
        if (newSection) {
            newSection.classList.add('active');
            newSection.style.opacity = '0';
            newSection.style.transform = 'translateY(30px) scale(0.95)';
            
            // Trigger smooth entrance animation
            setTimeout(() => {
                newSection.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                newSection.style.opacity = '1';
                newSection.style.transform = 'translateY(0) scale(1)';
                
                // Add subtle bounce effect
                setTimeout(() => {
                    newSection.style.transform = 'translateY(0) scale(1.01)';
                    setTimeout(() => {
                        newSection.style.transform = 'translateY(0) scale(1)';
                        // Reset transition for future changes
                        setTimeout(() => newSection.style.transition = '', 200);
                    }, 100);
                }, 400);
            }, 50);

            // Trigger entrance animations for child elements
            this.animateSectionElements(newSection);
        } else {
            console.error('Section not found:', sectionName);
        }
    }

    // Animate section elements with staggered entrance
    animateSectionElements(section) {
        const cards = section.querySelectorAll('.card, .stat-card, .goal-progress-card, .personal-records-card');
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                
                // Add a subtle hover preparation
                setTimeout(() => {
                    card.style.transition = '';
                }, 400);
            }, 150 + (index * 100));
        });
    }

    // Show page transition overlay
    showPageTransition() {
        let overlay = document.getElementById('page-transition-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'page-transition-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(59, 130, 246, 0.1));
                backdrop-filter: blur(2px);
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
            `;
            document.body.appendChild(overlay);
        }
        
        setTimeout(() => overlay.style.opacity = '1', 10);
    }

    // Hide page transition overlay
    hidePageTransition() {
        const overlay = document.getElementById('page-transition-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
            }, 300);
        }
    }

    // Enhanced progress tracking
    updateProgressBars() {
        const user = this.getCurrentUser();
        if (!user) return;

        // Calculate daily calorie progress
        const dailyCalories = this.getTodayCalories();
        const calorieGoal = user.calorieGoal || 2000;
        const caloriePercentage = Math.min((dailyCalories / calorieGoal) * 100, 100);
        
        this.animateProgressBar('calorie-progress', caloriePercentage);
        document.getElementById('calorie-progress-text').textContent = `${dailyCalories}/${calorieGoal}`;

        // Calculate activity progress
        const todayActivity = this.getTodayActivityMinutes();
        const activityGoal = user.activityGoal || 60;
        const activityPercentage = Math.min((todayActivity / activityGoal) * 100, 100);
        
        this.animateProgressBar('activity-progress', activityPercentage);
        document.getElementById('activity-progress-text').textContent = `${todayActivity}/${activityGoal} min`;

        // Check for achievements
        this.checkForAchievements(dailyCalories, todayActivity, calorieGoal, activityGoal);
    }

    // Animate progress bar with smooth transition
    animateProgressBar(elementId, targetPercentage) {
        const progressBar = document.getElementById(elementId);
        if (!progressBar) return;

        let currentWidth = 0;
        const increment = targetPercentage / 50; // 50 steps for smooth animation
        
        const animate = () => {
            currentWidth += increment;
            if (currentWidth >= targetPercentage) {
                currentWidth = targetPercentage;
                progressBar.style.width = currentWidth + '%';
                return;
            }
            
            progressBar.style.width = currentWidth + '%';
            requestAnimationFrame(animate);
        };
        
        requestAnimationFrame(animate);
    }

    // Check for new achievements
    checkForAchievements(calories, activity, calorieGoal, activityGoal) {
        // First workout achievement
        const workoutCount = this.getWorkoutCount();
        if (workoutCount === 1 && !this.hasAchievement('First Workout')) {
            this.addAchievement('First Workout', 'dumbbell');
        }

        // Calorie goal achievement
        if (calories >= calorieGoal && !this.hasAchievement('Daily Calorie Goal')) {
            this.addAchievement('Daily Calorie Goal', 'fire');
        }

        // Activity goal achievement
        if (activity >= activityGoal && !this.hasAchievement('Daily Activity Goal')) {
            this.addAchievement('Daily Activity Goal', 'running');
        }

        // Weekly achievements
        if (workoutCount >= 7 && !this.hasAchievement('Weekly Warrior')) {
            this.addAchievement('Weekly Warrior', 'trophy');
        }
    }

    // Check if user has specific achievement
    hasAchievement(title) {
        return this.achievements.some(achievement => achievement.title === title);
    }

    // Get today's total calories consumed
    getTodayCalories() {
        const nutritionEntries = this.getNutritionEntries();
        const today = new Date().toDateString();
        
        return nutritionEntries
            .filter(entry => new Date(entry.date).toDateString() === today)
            .reduce((total, entry) => total + (entry.calories || 0), 0);
    }

    // Get today's activity minutes
    getTodayActivityMinutes() {
        const activities = this.getFitnessActivities();
        const today = new Date().toDateString();
        
        return activities
            .filter(activity => new Date(activity.date).toDateString() === today)
            .reduce((total, activity) => total + (activity.duration || 0), 0);
    }

    // Get total workout count
    getWorkoutCount() {
        const activities = this.getFitnessActivities();
        return activities.length;
    }

    setupFormHandlers() {
        // Profile form
        const profileForm = document.getElementById('profile-form');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleProfileSubmit(e);
            });
        }

        // Fitness form
        const fitnessForm = document.getElementById('fitness-form');
        if (fitnessForm) {
            fitnessForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFitnessSubmit(e);
            });
        }

        // Nutrition form
        const nutritionForm = document.getElementById('nutrition-form');
        if (nutritionForm) {
            nutritionForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNutritionSubmit(e);
            });
        }

        // Reports functionality is handled by setupReportEventListeners() method
        // which is called when loadReportsData() is invoked
    }

    // Setup Goals Editing Functionality
    setupGoalsEditing() {
        const editGoalsBtn = document.getElementById('edit-goals-btn');
        const modal = document.getElementById('edit-goals-modal');
        const closeModalBtn = document.getElementById('close-goals-modal');
        const cancelBtn = document.getElementById('cancel-goals-edit');
        const resetBtn = document.getElementById('reset-goals-default');
        const goalsForm = document.getElementById('goals-edit-form');

        // Current goals (default values)
        this.currentGoals = {
            caloriesGoal: 2500,
            workoutTimeGoal: 300,
            workoutDaysGoal: 5,
            streakGoal: 30
        };

        // Load saved goals from localStorage
        this.loadSavedGoals();

        // Edit Goals Button Click
        if (editGoalsBtn) {
            editGoalsBtn.addEventListener('click', () => {
                this.openGoalsModal();
            });
        }

        // Close Modal Events
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                this.closeGoalsModal();
            });
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                this.closeGoalsModal();
            });
        }

        // Close modal when clicking outside
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeGoalsModal();
                }
            });
        }

        // Reset to Default Goals
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetGoalsToDefault();
            });
        }

        // Form Submission
        if (goalsForm) {
            goalsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveGoals();
            });
        }

        // Real-time preview updates
        const goalInputs = ['calories-goal', 'workout-time-goal', 'workout-days-goal', 'streak-goal'];
        goalInputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                input.addEventListener('input', () => {
                    this.updateGoalPreview();
                });
            }
        });

        // Initial preview update
        this.updateGoalPreview();
    }

    // Load saved goals from localStorage
    loadSavedGoals() {
        const savedGoals = localStorage.getItem('striveHiveGoals');
        if (savedGoals) {
            try {
                this.currentGoals = { ...this.currentGoals, ...JSON.parse(savedGoals) };
            } catch (error) {
                console.error('Error loading saved goals:', error);
            }
        }
        this.updateGoalsDisplay();
    }

    // Open Goals Modal
    openGoalsModal() {
        const modal = document.getElementById('edit-goals-modal');
        if (modal) {
            // Populate form with current values
            document.getElementById('calories-goal').value = this.currentGoals.caloriesGoal;
            document.getElementById('workout-time-goal').value = this.currentGoals.workoutTimeGoal;
            document.getElementById('workout-days-goal').value = this.currentGoals.workoutDaysGoal;
            document.getElementById('streak-goal').value = this.currentGoals.streakGoal;

            // Update preview
            this.updateGoalPreview();

            // Show modal with animation
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // Close Goals Modal
    closeGoalsModal() {
        const modal = document.getElementById('edit-goals-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Reset Goals to Default Values
    resetGoalsToDefault() {
        const defaultGoals = {
            caloriesGoal: 2500,
            workoutTimeGoal: 300,
            workoutDaysGoal: 5,
            streakGoal: 30
        };

        // Update form inputs
        document.getElementById('calories-goal').value = defaultGoals.caloriesGoal;
        document.getElementById('workout-time-goal').value = defaultGoals.workoutTimeGoal;
        document.getElementById('workout-days-goal').value = defaultGoals.workoutDaysGoal;
        document.getElementById('streak-goal').value = defaultGoals.streakGoal;

        // Update preview
        this.updateGoalPreview();

        this.showToast('Goals reset to recommended defaults! 🎯', 'success');
    }

    // Update Goal Preview in Modal
    updateGoalPreview() {
        const caloriesGoal = parseInt(document.getElementById('calories-goal')?.value) || 2500;
        const workoutTimeGoal = parseInt(document.getElementById('workout-time-goal')?.value) || 300;
        const workoutDaysGoal = parseInt(document.getElementById('workout-days-goal')?.value) || 5;

        // Calculate daily averages
        const dailyCalories = Math.round(caloriesGoal / 7);
        const dailyTime = Math.round(workoutTimeGoal / workoutDaysGoal);

        // Update preview elements
        const previewDailyCalories = document.getElementById('preview-daily-calories');
        const previewDailyTime = document.getElementById('preview-daily-time');
        const previewSchedule = document.getElementById('preview-schedule');

        if (previewDailyCalories) {
            previewDailyCalories.textContent = `${dailyCalories} cal`;
        }
        if (previewDailyTime) {
            previewDailyTime.textContent = `${dailyTime} min`;
        }
        if (previewSchedule) {
            previewSchedule.textContent = `${workoutDaysGoal} workout days`;
        }
    }

    // Save Goals
    saveGoals() {
        try {
            const newGoals = {
                caloriesGoal: parseInt(document.getElementById('calories-goal').value),
                workoutTimeGoal: parseInt(document.getElementById('workout-time-goal').value),
                workoutDaysGoal: parseInt(document.getElementById('workout-days-goal').value),
                streakGoal: parseInt(document.getElementById('streak-goal').value)
            };

            // Validate inputs
            if (newGoals.caloriesGoal < 500 || newGoals.caloriesGoal > 10000) {
                this.showToast('Calories goal must be between 500-10000 calories per week.', 'error');
                return;
            }

            if (newGoals.workoutTimeGoal < 60 || newGoals.workoutTimeGoal > 1200) {
                this.showToast('Workout time goal must be between 60-1200 minutes per week.', 'error');
                return;
            }

            if (newGoals.workoutDaysGoal < 1 || newGoals.workoutDaysGoal > 7) {
                this.showToast('Workout days goal must be between 1-7 days per week.', 'error');
                return;
            }

            if (newGoals.streakGoal < 7 || newGoals.streakGoal > 365) {
                this.showToast('Streak goal must be between 7-365 days.', 'error');
                return;
            }

            // Save to current goals and localStorage
            this.currentGoals = newGoals;
            localStorage.setItem('striveHiveGoals', JSON.stringify(newGoals));

            // Update goals display in the UI
            this.updateGoalsDisplay();

            // Close modal
            this.closeGoalsModal();

            // Show success message
            this.showToast('Goals updated successfully! 🎯 Your new targets are now active.', 'success');

            // Add achievement if this is their first time setting custom goals
            const hasCustomizedGoals = localStorage.getItem('hasCustomizedGoals');
            if (!hasCustomizedGoals) {
                localStorage.setItem('hasCustomizedGoals', 'true');
                this.addAchievement('Goal Setter', 'target');
            }

        } catch (error) {
            console.error('Error saving goals:', error);
            this.showToast('Error saving goals. Please try again.', 'error');
        }
    }

    // Update Goals Display in the UI
    updateGoalsDisplay() {
        // Update the goals cards in the fitness section
        const goalCards = document.querySelectorAll('.goal-card');
        
        goalCards.forEach((card, index) => {
            const progressFill = card.querySelector('.progress-fill');
            const currentSpan = card.querySelector('.current');
            const targetSpan = card.querySelector('.target');
            const progressText = card.querySelector('.progress-text');

            // Mock current progress (in a real app, this would come from actual user data)
            let current, target, percentage;

            switch (index) {
                case 0: // Calories Goal
                    current = 1250; // Mock current calories burned this week
                    target = this.currentGoals.caloriesGoal;
                    percentage = Math.min(Math.round((current / target) * 100), 100);
                    if (currentSpan) currentSpan.textContent = current.toLocaleString();
                    if (targetSpan) targetSpan.textContent = target.toLocaleString();
                    break;
                    
                case 1: // Workout Time Goal
                    current = 180; // Mock current workout time this week
                    target = this.currentGoals.workoutTimeGoal;
                    percentage = Math.min(Math.round((current / target) * 100), 100);
                    if (currentSpan) currentSpan.textContent = current;
                    if (targetSpan) targetSpan.textContent = target;
                    break;
                    
                case 2: // Workout Days Goal
                    current = 4; // Mock current workout days this week
                    target = this.currentGoals.workoutDaysGoal;
                    percentage = Math.min(Math.round((current / target) * 100), 100);
                    if (currentSpan) currentSpan.textContent = current;
                    if (targetSpan) targetSpan.textContent = target;
                    break;
                    
                case 3: // Streak Goal
                    current = 12; // Mock current streak
                    target = this.currentGoals.streakGoal;
                    percentage = Math.min(Math.round((current / target) * 100), 100);
                    if (currentSpan) currentSpan.textContent = current;
                    if (targetSpan) targetSpan.textContent = target;
                    break;
            }

            // Update progress bar
            if (progressFill) {
                progressFill.style.width = `${percentage}%`;
            }
            
            if (progressText) {
                progressText.textContent = `${percentage}% Complete`;
            }
        });
    }

    showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionName;
        }

        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[href="#${sectionName}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Load section-specific data
        this.loadSectionData(sectionName);
    }

    loadSectionData(sectionName) {
        switch (sectionName) {
            case 'dashboard':
                this.updateDashboard();
                break;
            case 'profile':
                this.loadProfileData();
                break;
            case 'fitness':
                this.loadFitnessActivities();
                break;
            case 'nutrition':
                this.loadNutritionData();
                break;
            case 'reports':
                // Ensure activity distribution is initialized first
                this.initializeActivityDistribution();
                // Then load reports data
                setTimeout(() => {
                    this.loadReportsData();
                }, 200);
                break;
        }
    }

    async handleProfileSubmit(e) {
        const formData = new FormData(e.target);
        const userData = Object.fromEntries(formData.entries());
        
        // Convert numeric fields
        userData.age = parseInt(userData.age);
        userData.height = parseFloat(userData.height);
        userData.weight = parseFloat(userData.weight);
        
        // Add weight goal if not provided
        if (!userData.weightGoal) {
            userData.weightGoal = userData.weight; // Default to current weight
        } else {
            userData.weightGoal = parseFloat(userData.weightGoal);
        }
        
        // Add calorie goal based on BMR and activity level
        if (!userData.calorieGoal) {
            userData.calorieGoal = this.calculateCalorieGoal(userData);
        } else {
            userData.calorieGoal = parseInt(userData.calorieGoal);
        }

        this.showLoading(true);

        try {
            let savedUser;
            
            if (this.currentUser && this.currentUser.id) {
                // Update existing user via API class (uses OfflineAPI fallback)
                savedUser = await API.saveUser({ id: this.currentUser.id, ...userData });
                this.showToast('Profile updated successfully! \u{1F389}', 'success');
            } else {
                // Create new user via API class
                savedUser = await API.saveUser(userData);
                this.showToast('Profile created successfully! Welcome to Strive Hive! \u{1F680}', 'success');
                // Add achievement for completing profile
                this.addAchievement('Profile Complete', 'user');
            }
            
            this.currentUser = savedUser;
            this.saveUserData();
            this.updateHealthMetrics();
            this.displayUserInfo(); // Update profile summary immediately
            this.loadProfileData(); // Refresh form with server data including calculated fields
            
        } catch (error) {
            console.error('Error saving profile:', error);
            this.showToast('Error saving profile. Please try again.', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async handleFitnessSubmit(e) {
        const formData = new FormData(e.target);
        const activityData = Object.fromEntries(formData.entries());
        
        if (!this.currentUser) {
            this.showToast('Please create your profile first', 'warning');
            this.showSection('profile');
            return;
        }

        // Convert numeric fields
        activityData.duration = parseInt(activityData.duration);
        activityData.caloriesBurned = parseFloat(activityData.caloriesBurned);
        activityData.userId = this.currentUser.id;

        this.showLoading(true);

        try {
            await API.saveActivity(activityData);
            this.loadFitnessActivities();
            this.updateDashboard();
            e.target.reset();
            this.showToast('Activity added successfully!', 'success');
        } catch (error) {
            console.error('Error saving activity:', error);
            this.showToast('Error saving activity. Please try again.', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async handleNutritionSubmit(e) {
        const formData = new FormData(e.target);
        const nutritionData = Object.fromEntries(formData.entries());
        
        if (!this.currentUser) {
            this.showToast('Please create your profile first', 'warning');
            this.showSection('profile');
            return;
        }

        // Convert numeric fields
        nutritionData.servingSize = parseFloat(nutritionData.servingSize);
        nutritionData.calories = parseFloat(nutritionData.calories);
        nutritionData.protein = parseFloat(nutritionData.protein);
        nutritionData.carbs = parseFloat(nutritionData.carbs);
        nutritionData.fat = parseFloat(nutritionData.fat);
        nutritionData.userId = this.currentUser.id;

        this.showLoading(true);

        try {
            await API.saveNutrition(nutritionData);
            this.loadNutritionData();
            this.updateDashboard();
            e.target.reset();
            this.showToast('Nutrition entry added successfully!', 'success');
        } catch (error) {
            console.error('Error saving nutrition entry:', error);
            this.showToast('Error saving nutrition entry. Please try again.', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    loadUserData() {
        const savedUser = localStorage.getItem('striveHiveUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.loadProfileData();
            this.updateHealthMetrics();
        }
    }

    saveUserData() {
        if (this.currentUser) {
            localStorage.setItem('striveHiveUser', JSON.stringify(this.currentUser));
        }
    }

    async loadProfileData() {
        // Try to load user from backend if we have an ID (uses API class)
        if (this.currentUser && this.currentUser.id) {
            try {
                const userData = await API.getUserById(this.currentUser.id);
                if (userData) {
                    this.currentUser = userData;
                    this.saveUserData();
                }
            } catch (error) {
                console.log('Using local user data - backend not available');
            }
        } else {
            // If no current user, try to load the first user (demo data) via API
            try {
                const users = await API.getUsers();
                if (users && users.length > 0) {
                    this.currentUser = users[0]; // Use first user as demo
                    this.saveUserData();
                }
            } catch (error) {
                console.log('Backend not available - using demo data');
            }
        }

        // Populate form with current user data
        if (this.currentUser) {
            const form = document.getElementById('profile-form');
            if (form) {
                // Map form fields to user properties
                const fieldMappings = {
                    'name': 'name',
                    'email': 'email',
                    'age': 'age',
                    'gender': 'gender',
                    'height': 'height',
                    'weight': 'weight',
                    'activityLevel': 'activityLevel',
                    'fitnessGoal': 'fitnessGoal'
                };

                Object.entries(fieldMappings).forEach(([fieldName, userProp]) => {
                    const field = form.querySelector(`[name="${fieldName}"]`);
                    if (field && this.currentUser[userProp] !== null && this.currentUser[userProp] !== undefined) {
                        field.value = this.currentUser[userProp];
                    }
                });
            }
            
            // Update health metrics
            this.updateHealthMetrics();
        }
    }

    updateHealthMetrics() {
        if (!this.currentUser) return;

        // Use backend-calculated values if available, otherwise calculate locally
        const bmi = this.currentUser.bmi || this.calculateBMI(this.currentUser.height, this.currentUser.weight);
        const bmr = this.currentUser.bmr || this.calculateBMR(this.currentUser);
        const status = this.currentUser.healthStatus || this.getBMIStatus(bmi);

        // Update profile metrics
        const profileBMI = document.getElementById('profile-bmi');
        const profileBMR = document.getElementById('profile-bmr');
        const profileStatus = document.getElementById('profile-status');
        
        if (profileBMI) profileBMI.textContent = bmi.toFixed(1);
        if (profileBMR) profileBMR.textContent = Math.round(bmr) + ' kcal/day';
        if (profileStatus) {
            profileStatus.textContent = status;
            // Add color based on status
            profileStatus.className = `metric-value status-${status.toLowerCase()}`;
        }

        // Update dashboard BMI
        const dashboardBMI = document.getElementById('bmi-value');
        if (dashboardBMI) dashboardBMI.textContent = bmi.toFixed(1);

        // Show additional user info if available
        this.displayUserInfo();
    }

    calculateBMI(height, weight) {
        const heightInM = height / 100;
        return weight / (heightInM * heightInM);
    }

    calculateBMR(user) {
        // Mifflin-St Jeor Formula (more accurate than Harris-Benedict)
        const heightCm = user.height || 170;
        const weight = user.weight || 70;
        const age = user.age || 25;
        
        if (user.gender === 'male') {
            return 10 * weight + 6.25 * heightCm - 5 * age + 5;
        } else {
            return 10 * weight + 6.25 * heightCm - 5 * age - 161;
        }
    }

    calculateCalorieGoal(userData) {
        const bmr = this.calculateBMR(userData);
        const activityMultipliers = {
            'sedentary': 1.2,
            'lightly_active': 1.375,
            'moderately_active': 1.55,
            'very_active': 1.725,
            'extremely_active': 1.9
        };
        
        const multiplier = activityMultipliers[userData.activityLevel] || 1.55;
        const tdee = bmr * multiplier;
        
        // Adjust based on fitness goal
        switch (userData.fitnessGoal) {
            case 'weight_loss':
                return Math.round(tdee - 500); // 500 calorie deficit
            case 'weight_gain':
                return Math.round(tdee + 500); // 500 calorie surplus
            case 'muscle_gain':
                return Math.round(tdee + 300); // 300 calorie surplus
            default: // maintain
                return Math.round(tdee);
        }
    }

    getBMIStatus(bmi) {
        if (bmi < 18.5) return 'Underweight';
        if (bmi < 25) return 'Normal';
        if (bmi < 30) return 'Overweight';
        return 'Obese';
    }

    displayUserInfo() {
        if (!this.currentUser) return;

        // Add user info card if it doesn't exist
        let userInfoCard = document.getElementById('user-info-card');
        if (!userInfoCard) {
            const profileGrid = document.querySelector('.profile-grid');
            if (profileGrid) {
                const userInfoHTML = `
                    <div class="profile-card" id="user-info-card">
                        <h3>📊 Profile Summary</h3>
                        <div class="user-info-grid">
                            <div class="info-item">
                                <div class="info-icon">
                                    <i class="fas fa-user"></i>
                                </div>
                                <div class="info-content">
                                    <span class="info-label">Name</span>
                                    <span class="info-value" id="user-name-display">-</span>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="info-icon">
                                    <i class="fas fa-envelope"></i>
                                </div>
                                <div class="info-content">
                                    <span class="info-label">Email</span>
                                    <span class="info-value" id="user-email-display">-</span>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="info-icon">
                                    <i class="fas fa-birthday-cake"></i>
                                </div>
                                <div class="info-content">
                                    <span class="info-label">Age</span>
                                    <span class="info-value" id="user-age-display">-</span>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="info-icon">
                                    <i class="fas fa-venus-mars"></i>
                                </div>
                                <div class="info-content">
                                    <span class="info-label">Gender</span>
                                    <span class="info-value" id="user-gender-display">-</span>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="info-icon">
                                    <i class="fas fa-ruler-vertical"></i>
                                </div>
                                <div class="info-content">
                                    <span class="info-label">Height</span>
                                    <span class="info-value" id="user-height-display">-</span>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="info-icon">
                                    <i class="fas fa-weight"></i>
                                </div>
                                <div class="info-content">
                                    <span class="info-label">Weight</span>
                                    <span class="info-value" id="user-weight-display">-</span>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="info-icon">
                                    <i class="fas fa-bullseye"></i>
                                </div>
                                <div class="info-content">
                                    <span class="info-label">Goal</span>
                                    <span class="info-value" id="user-goal-display">-</span>
                                </div>
                            </div>
                            <div class="info-item">
                                <div class="info-icon">
                                    <i class="fas fa-fire"></i>
                                </div>
                                <div class="info-content">
                                    <span class="info-label">Calorie Goal</span>
                                    <span class="info-value" id="user-calorie-goal-display">-</span>
                                </div>
                            </div>
                        </div>
                        ${this.currentUser.updatedAt ? `
                            <div class="profile-timestamps">
                                <small><i class="fas fa-clock"></i> Last updated: ${new Date(this.currentUser.updatedAt).toLocaleDateString()}</small>
                            </div>
                        ` : ''}
                    </div>
                `;
                profileGrid.insertAdjacentHTML('beforeend', userInfoHTML);
            }
        }

        // Update user info display
        const updates = {
            'user-name-display': this.currentUser.name || '-',
            'user-email-display': this.currentUser.email || '-',
            'user-age-display': this.currentUser.age ? `${this.currentUser.age} years` : '-',
            'user-gender-display': this.currentUser.gender ? this.currentUser.gender.charAt(0).toUpperCase() + this.currentUser.gender.slice(1) : '-',
            'user-height-display': this.currentUser.height ? `${this.currentUser.height} cm` : '-',
            'user-weight-display': this.currentUser.weight ? `${this.currentUser.weight} kg` : '-',
            'user-goal-display': this.currentUser.fitnessGoal ? this.formatGoal(this.currentUser.fitnessGoal) : '-',
            'user-calorie-goal-display': this.currentUser.calorieGoal ? `${this.currentUser.calorieGoal} kcal/day` : '-'
        };

        Object.entries(updates).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });
    }

    formatGoal(goal) {
        const goalMap = {
            'weight_loss': 'Weight Loss',
            'weight_gain': 'Weight Gain',
            'maintain': 'Maintain Weight',
            'muscle_gain': 'Muscle Gain'
        };
        return goalMap[goal] || goal;
    }

    // Setup real-time updates for profile form
    setupProfileRealTimeUpdates() {
        const profileForm = document.getElementById('profile-form');
        if (!profileForm) return;

        // Fields that trigger real-time updates
        const watchFields = ['name', 'email', 'age', 'gender', 'height', 'weight', 'activityLevel', 'fitnessGoal', 'weightGoal', 'calorieGoal'];
        
        watchFields.forEach(fieldName => {
            const field = profileForm.querySelector(`[name="${fieldName}"]`);
            if (field) {
                // Add event listeners for both input and change events
                const updatePreview = () => {
                    this.updateProfilePreview();
                };
                
                field.addEventListener('input', updatePreview);
                field.addEventListener('change', updatePreview);
                field.addEventListener('blur', updatePreview);
            }
        });
    }

    // Update profile preview in real-time
    updateProfilePreview() {
        const form = document.getElementById('profile-form');
        if (!form) return;

        // Get current form values
        const formData = new FormData(form);
        const previewData = Object.fromEntries(formData.entries());
        
        // Convert numeric fields
        if (previewData.age) previewData.age = parseInt(previewData.age);
        if (previewData.height) previewData.height = parseFloat(previewData.height);
        if (previewData.weight) previewData.weight = parseFloat(previewData.weight);
        if (previewData.weightGoal) previewData.weightGoal = parseFloat(previewData.weightGoal);
        if (previewData.calorieGoal) previewData.calorieGoal = parseInt(previewData.calorieGoal);

        // Update preview displays if they exist
        this.updatePreviewDisplay(previewData);
        
        // Update health metrics preview if we have height and weight
        if (previewData.height && previewData.weight) {
            this.updateHealthMetricsPreview(previewData);
        }
    }

    // Update preview display elements
    updatePreviewDisplay(data) {
        const updates = {
            'user-name-display': data.name || '-',
            'user-email-display': data.email || '-',
            'user-age-display': data.age ? `${data.age} years` : '-',
            'user-gender-display': data.gender ? data.gender.charAt(0).toUpperCase() + data.gender.slice(1) : '-',
            'user-height-display': data.height ? `${data.height} cm` : '-',
            'user-weight-display': data.weight ? `${data.weight} kg` : '-',
            'user-goal-display': data.fitnessGoal ? this.formatGoal(data.fitnessGoal) : '-',
            'user-calorie-goal-display': data.calorieGoal ? `${data.calorieGoal} kcal/day` : (data.height && data.weight && data.age && data.gender && data.activityLevel && data.fitnessGoal ? `${this.calculateCalorieGoal(data)} kcal/day (calculated)` : '-')
        };

        Object.entries(updates).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                // Add updating animation class
                element.classList.add('updating');
                element.textContent = value;
                
                // Remove animation class after animation completes
                setTimeout(() => {
                    element.classList.remove('updating');
                }, 600);
            }
        });
    }

    // Update health metrics preview
    updateHealthMetricsPreview(data) {
        if (!data.height || !data.weight) return;

        const bmi = this.calculateBMI(data.height, data.weight);
        const bmr = this.calculateBMR(data);
        const status = this.getBMIStatus(bmi);

        // Update preview metrics
        const profileBMI = document.getElementById('profile-bmi');
        const profileBMR = document.getElementById('profile-bmr');
        const profileStatus = document.getElementById('profile-status');
        
        if (profileBMI) {
            profileBMI.classList.add('updating');
            profileBMI.textContent = bmi.toFixed(1);
            setTimeout(() => {
                profileBMI.classList.remove('updating');
            }, 800);
        }
        
        if (profileBMR) {
            profileBMR.classList.add('updating');
            profileBMR.textContent = Math.round(bmr) + ' kcal/day';
            setTimeout(() => {
                profileBMR.classList.remove('updating');
            }, 800);
        }
        
        if (profileStatus) {
            profileStatus.classList.add('updating');
            profileStatus.textContent = status;
            profileStatus.className = `metric-value status-${status.toLowerCase()} updating`;
            setTimeout(() => {
                profileStatus.classList.remove('updating');
            }, 800);
        }

        // Update dashboard BMI as well
        const dashboardBMI = document.getElementById('bmi-value');
        if (dashboardBMI) {
            dashboardBMI.textContent = bmi.toFixed(1);
        }
    }

    async updateDashboard() {
        if (!this.currentUser) {
            this.showEmptyDashboard();
            return;
        }

        try {
            // Get today's data
            const today = new Date().toISOString().split('T')[0];
            const activities = await API.getActivitiesForDate(this.currentUser.id, today);
            const nutrition = await API.getNutritionForDate(this.currentUser.id, today);

            // Update stats with animation
            const totalCaloriesBurned = activities.reduce((sum, activity) => sum + activity.caloriesBurned, 0);
            const totalCaloriesConsumed = nutrition.reduce((sum, entry) => sum + entry.calories, 0);

            this.animateCountUp('total-calories-burned', totalCaloriesBurned);
            this.animateCountUp('total-calories-consumed', totalCaloriesConsumed);

            // Get weekly workout count
            const weekStart = this.getWeekStart();
            const weeklyActivities = await API.getActivitiesForPeriod(this.currentUser.id, weekStart, new Date());
            this.animateCountUp('total-workouts', weeklyActivities.length);

            // Update BMI
            if (this.currentUser.height && this.currentUser.weight) {
                const bmi = this.calculateBMI(this.currentUser.weight, this.currentUser.height);
                document.getElementById('bmi-value').textContent = bmi.toFixed(1);
            }

            // Update progress bars
            this.updateProgressBars();
            
            // Update achievements
            this.updateAchievementsList();

            // Update recent activities on dashboard
            this.updateRecentActivities(activities.slice(0, 5));
            this.updateTodaysNutrition(nutrition);

            // Update recent workouts section (fitness hub)
            this.updateRecentWorkouts();
            
            // Ensure fitness hub workouts are displayed
            if (typeof displayRecentWorkouts === 'function') {
                displayRecentWorkouts();
            }

        } catch (error) {
            console.error('Dashboard update failed:', error);
            this.showOfflineDashboard();
        }
    }

    // Animate number count up effect
    animateCountUp(elementId, targetValue) {
        const element = document.getElementById(elementId);
        if (!element) return;

        let currentValue = 0;
        const increment = targetValue / 30; // 30 steps for smooth animation
        const duration = 1000; // 1 second
        const stepTime = duration / 30;

        const animate = () => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                element.textContent = Math.round(targetValue);
                return;
            }
            element.textContent = Math.round(currentValue);
            setTimeout(animate, stepTime);
        };

        animate();
    }

    // Fallback dashboard update for offline mode
    showOfflineDashboard() {
        document.getElementById('total-calories-burned').textContent = '0';
        document.getElementById('total-calories-consumed').textContent = '0';
        document.getElementById('total-workouts').textContent = '0';
        document.getElementById('bmi-value').textContent = '--';
        
        this.updateProgressBars();
        this.updateAchievementsList();
        this.showToast('Working offline - showing cached data', 'warning');
    }

    updateRecentActivities(activities) {
        const container = document.getElementById('recent-activities');
        
        if (!activities.length) {
            container.innerHTML = '<p class="no-data">No activities recorded yet</p>';
            return;
        }

        container.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-header">
                    <span class="activity-type">${activity.activityType}</span>
                    <span class="activity-time">${this.formatTime(activity.recordedAt)}</span>
                </div>
                <div class="activity-details">
                    <span><i class="fas fa-clock"></i> ${activity.duration} min</span>
                    <span><i class="fas fa-fire"></i> ${activity.caloriesBurned} kcal</span>
                </div>
            </div>
        `).join('');
    }

    updateTodaysNutrition(entries) {
        const container = document.getElementById('todays-nutrition');
        
        if (!entries.length) {
            container.innerHTML = '<p class="no-data">No nutrition data for today</p>';
            return;
        }

        const totalCalories = entries.reduce((sum, entry) => sum + entry.calories, 0);
        const totalProtein = entries.reduce((sum, entry) => sum + entry.protein, 0);
        const totalCarbs = entries.reduce((sum, entry) => sum + entry.carbs, 0);
        const totalFat = entries.reduce((sum, entry) => sum + entry.fat, 0);

        container.innerHTML = `
            <div class="nutrition-summary">
                <div class="macro-item">
                    <span class="macro-value">${Math.round(totalCalories)}</span>
                    <span class="macro-label">Calories</span>
                </div>
                <div class="macro-breakdown">
                    <div class="macro-detail">
                        <span>Protein: ${totalProtein.toFixed(1)}g</span>
                    </div>
                    <div class="macro-detail">
                        <span>Carbs: ${totalCarbs.toFixed(1)}g</span>
                    </div>
                    <div class="macro-detail">
                        <span>Fat: ${totalFat.toFixed(1)}g</span>
                    </div>
                </div>
            </div>
        `;
    }

    showEmptyDashboard() {
        document.getElementById('total-calories-burned').textContent = '0';
        document.getElementById('total-calories-consumed').textContent = '0';
        document.getElementById('total-workouts').textContent = '0';
        document.getElementById('bmi-value').textContent = '--';
        
        document.getElementById('recent-activities').innerHTML = '<p class="no-data">Create your profile to start tracking</p>';
        document.getElementById('todays-nutrition').innerHTML = '<p class="no-data">Create your profile to start tracking</p>';
    }

    async loadFitnessActivities() {
        try {
            // Load activities from multiple sources
            const localActivities = JSON.parse(localStorage.getItem('fitness-activities') || '[]');
            
            if (this.currentUser) {
                try {
                    const apiActivities = await API.getUserActivities(this.currentUser.id);
                    // Combine API and local activities
                    const allActivities = [...localActivities, ...apiActivities];
                    this.displayFitnessActivities(allActivities);
                } catch (apiError) {
                    console.warn('API unavailable, using local data:', apiError);
                    this.displayFitnessActivities(localActivities);
                }
            } else {
                this.displayFitnessActivities(localActivities);
            }

            // Always update recent workouts display
            this.updateRecentWorkouts();
            
            // Call the global display function if it exists
            if (typeof displayRecentWorkouts === 'function') {
                displayRecentWorkouts();
            }

        } catch (error) {
            console.error('Error loading fitness activities:', error);
            // Show empty state with encouragement
            const container = document.getElementById('fitness-activities');
            if (container) {
                container.innerHTML = `
                    <div class="no-workouts">
                        <i class="fas fa-dumbbell"></i>
                        <h4>Ready to start your fitness journey?</h4>
                        <p>Log your first workout to see your progress here!</p>
                    </div>
                `;
            }
        }
    }

    displayFitnessActivities(activities) {
        const container = document.getElementById('fitness-activities');
        
        if (!container) return;
        
        if (!activities || !activities.length) {
            container.innerHTML = `
                <div class="no-workouts">
                    <i class="fas fa-dumbbell"></i>
                    <h4>Ready to start your fitness journey?</h4>
                    <p>Log your first workout above to see your progress here!</p>
                    <div class="motivation-stats">
                        <div class="stat-card">
                            <i class="fas fa-target"></i>
                            <p>Set your goals and start tracking your fitness journey!</p>
                        </div>
                    </div>
                </div>
            `;
            return;
        }

        // Sort by timestamp (most recent first)
        const sortedActivities = activities
            .sort((a, b) => new Date(b.timestamp || b.recordedAt) - new Date(a.timestamp || a.recordedAt))
            .slice(0, 15); // Show last 15 activities

        container.innerHTML = sortedActivities.map((activity, index) => {
            const date = new Date(activity.timestamp || activity.recordedAt);
            const timeAgo = this.getTimeAgo(date);
            
            return `
                <div class="workout-item" style="animation-delay: ${index * 0.1}s">
                    <div class="workout-icon">
                        <i class="fas ${this.getWorkoutIcon(activity.activityType)}"></i>
                    </div>
                    <div class="workout-details">
                        <div class="workout-header">
                            <h4>${activity.activityType.charAt(0).toUpperCase() + activity.activityType.slice(1)}</h4>
                            <span class="workout-time">${timeAgo}</span>
                        </div>
                        <div class="workout-stats">
                            <span><i class="fas fa-clock"></i> ${activity.duration} min</span>
                            <span><i class="fas fa-fire"></i> ${activity.caloriesBurned} cal</span>
                            <span class="intensity-badge intensity-${activity.intensity?.toLowerCase() || 'medium'}">${activity.intensity || 'Medium'}</span>
                        </div>
                        ${activity.notes ? `<p class="workout-notes">${activity.notes}</p>` : ''}
                    </div>
                    <div class="workout-actions">
                        <button class="btn-icon" onclick="app.repeatWorkout('${activity.id || Date.now()}')" title="Repeat">
                            <i class="fas fa-redo"></i>
                        </button>
                        <button class="btn-icon" onclick="app.viewWorkoutDetails('${activity.id || Date.now()}')" title="Details">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        // Update summary stats
        this.updateWorkoutSummaryStats(activities);
    }
    
    updateWorkoutSummaryStats(activities) {
        const statsContainer = document.querySelector('.workout-summary-stats');
        if (!statsContainer || !activities.length) return;
        
        const totalWorkouts = activities.length;
        const totalCalories = activities.reduce((sum, activity) => sum + (activity.caloriesBurned || 0), 0);
        const totalMinutes = activities.reduce((sum, activity) => sum + (activity.duration || 0), 0);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        
        statsContainer.innerHTML = `
            <div class="summary-stat">
                <span class="stat-number">${totalWorkouts}</span>
                <span class="stat-label">Total Workouts</span>
            </div>
            <div class="summary-stat">
                <span class="stat-number">${totalCalories}</span>
                <span class="stat-label">Calories Burned</span>
            </div>
            <div class="summary-stat">
                <span class="stat-number">${hours}h ${minutes}m</span>
                <span class="stat-label">Time Exercised</span>
            </div>
        `;
    }

    async loadNutritionData() {
        if (!this.currentUser) return;

        try {
            const today = new Date().toISOString().split('T')[0];
            const entries = await API.getNutritionForDate(this.currentUser.id, today);
            this.displayNutritionData(entries);
        } catch (error) {
            console.error('Error loading nutrition data:', error);
        }
    }

    displayNutritionData(entries) {
        // Update summary
        const totalCalories = entries.reduce((sum, entry) => sum + entry.calories, 0);
        const totalProtein = entries.reduce((sum, entry) => sum + entry.protein, 0);
        const totalCarbs = entries.reduce((sum, entry) => sum + entry.carbs, 0);
        const totalFat = entries.reduce((sum, entry) => sum + entry.fat, 0);

        document.getElementById('total-calories-today').textContent = Math.round(totalCalories);
        document.getElementById('total-protein').textContent = totalProtein.toFixed(1) + 'g';
        document.getElementById('total-carbs').textContent = totalCarbs.toFixed(1) + 'g';
        document.getElementById('total-fat').textContent = totalFat.toFixed(1) + 'g';

        // Update progress bars (assuming daily targets)
        const proteinTarget = this.currentUser ? this.calculateProteinTarget() : 150;
        const carbsTarget = this.currentUser ? this.calculateCarbsTarget() : 200;
        const fatTarget = this.currentUser ? this.calculateFatTarget() : 70;

        this.updateProgressBar('protein-progress', totalProtein, proteinTarget);
        this.updateProgressBar('carbs-progress', totalCarbs, carbsTarget);
        this.updateProgressBar('fat-progress', totalFat, fatTarget);

        // Display entries
        const container = document.getElementById('nutrition-entries');
        const entriesHtml = container.querySelector('.entries-list') || container;
        
        if (!entries.length) {
            entriesHtml.innerHTML = '<h4>Recent Entries</h4><p class="no-data">No nutrition entries for today</p>';
            return;
        }

        const entriesListHtml = entries.map(entry => `
            <div class="nutrition-item">
                <div class="nutrition-header">
                    <span class="food-name">${entry.foodName}</span>
                    <span class="meal-type">${entry.mealType}</span>
                </div>
                <div class="nutrition-details">
                    <span><i class="fas fa-fire"></i> ${entry.calories} kcal</span>
                    <span>P: ${entry.protein}g</span>
                    <span>C: ${entry.carbs}g</span>
                    <span>F: ${entry.fat}g</span>
                </div>
            </div>
        `).join('');

        entriesHtml.innerHTML = `<h4>Recent Entries</h4>${entriesListHtml}`;
    }

    calculateProteinTarget() {
        if (!this.currentUser) return 150;
        // 1.2-2.0g per kg body weight
        return this.currentUser.weight * 1.6;
    }

    calculateCarbsTarget() {
        if (!this.currentUser) return 200;
        // 45-65% of calories from carbs (assuming 2000 kcal diet)
        return (2000 * 0.55) / 4; // 4 kcal per gram of carbs
    }

    calculateFatTarget() {
        if (!this.currentUser) return 70;
        // 20-35% of calories from fat (assuming 2000 kcal diet)
        return (2000 * 0.275) / 9; // 9 kcal per gram of fat
    }

    updateProgressBar(elementId, current, target) {
        const element = document.getElementById(elementId);
        if (element) {
            const percentage = Math.min((current / target) * 100, 100);
            element.style.width = percentage + '%';
        }
    }

    // Old generateReport function removed - using new enhanced version

    async fetchReportData(period) {
        const endDate = new Date();
        const startDate = new Date();
        
        if (period === 'week') {
            startDate.setDate(endDate.getDate() - 7);
        } else {
            startDate.setMonth(endDate.getMonth() - 1);
        }

        const activities = await API.getActivitiesForPeriod(this.currentUser.id, startDate, endDate);
        const nutrition = await API.getNutritionForPeriod(this.currentUser.id, startDate, endDate);

        return {
            period,
            startDate,
            endDate,
            activities,
            nutrition,
            summary: this.calculateReportSummary(activities, nutrition)
        };
    }

    calculateReportSummary(activities, nutrition) {
        return {
            totalWorkouts: activities.length,
            totalCaloriesBurned: activities.reduce((sum, a) => sum + a.caloriesBurned, 0),
            totalCaloriesConsumed: nutrition.reduce((sum, n) => sum + n.calories, 0),
            avgCaloriesPerDay: nutrition.reduce((sum, n) => sum + n.calories, 0) / 7,
            mostPopularActivity: this.getMostPopularActivity(activities),
            totalProtein: nutrition.reduce((sum, n) => sum + n.protein, 0),
            totalCarbs: nutrition.reduce((sum, n) => sum + n.carbs, 0),
            totalFat: nutrition.reduce((sum, n) => sum + n.fat, 0)
        };
    }

    getMostPopularActivity(activities) {
        const activityCounts = {};
        activities.forEach(activity => {
            activityCounts[activity.activityType] = (activityCounts[activity.activityType] || 0) + 1;
        });

        let mostPopular = null;
        let maxCount = 0;
        Object.entries(activityCounts).forEach(([activity, count]) => {
            if (count > maxCount) {
                maxCount = count;
                mostPopular = activity;
            }
        });

        return mostPopular || 'None';
    }

    displayReport(reportData, period) {
        const { summary } = reportData;
        const periodName = period === 'week' ? 'Weekly' : 'Monthly';

        const reportHtml = `
            <div class="report-header">
                <h2>${periodName} Health Report</h2>
                <p class="report-period">${this.formatDate(reportData.startDate)} - ${this.formatDate(reportData.endDate)}</p>
            </div>

            <div class="report-stats">
                <div class="report-stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-dumbbell"></i>
                    </div>
                    <div class="stat-content">
                        <h3>${summary.totalWorkouts}</h3>
                        <p>Total Workouts</p>
                    </div>
                </div>

                <div class="report-stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-fire"></i>
                    </div>
                    <div class="stat-content">
                        <h3>${Math.round(summary.totalCaloriesBurned)}</h3>
                        <p>Calories Burned</p>
                    </div>
                </div>

                <div class="report-stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-utensils"></i>
                    </div>
                    <div class="stat-content">
                        <h3>${Math.round(summary.totalCaloriesConsumed)}</h3>
                        <p>Calories Consumed</p>
                    </div>
                </div>

                <div class="report-stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="stat-content">
                        <h3>${Math.round(summary.avgCaloriesPerDay)}</h3>
                        <p>Avg Daily Calories</p>
                    </div>
                </div>
            </div>

            <div class="report-insights">
                <div class="insight-card">
                    <h3>Activity Insights</h3>
                    <p><strong>Most Popular Activity:</strong> ${summary.mostPopularActivity}</p>
                    <p><strong>Average Workouts per Day:</strong> ${(summary.totalWorkouts / (period === 'week' ? 7 : 30)).toFixed(1)}</p>
                </div>

                <div class="insight-card">
                    <h3>Nutrition Insights</h3>
                    <p><strong>Total Protein:</strong> ${summary.totalProtein.toFixed(1)}g</p>
                    <p><strong>Total Carbs:</strong> ${summary.totalCarbs.toFixed(1)}g</p>
                    <p><strong>Total Fat:</strong> ${summary.totalFat.toFixed(1)}g</p>
                </div>

                <div class="insight-card">
                    <h3>Health Score</h3>
                    <div class="health-score">
                        <div class="score-circle">
                            <span class="score-value">${this.calculateHealthScore(summary)}</span>
                            <span class="score-label">/ 100</span>
                        </div>
                        <p class="score-description">${this.getHealthScoreDescription(this.calculateHealthScore(summary))}</p>
                    </div>
                </div>
            </div>

            <div class="report-recommendations">
                <h3>Recommendations</h3>
                <ul>
                    ${this.generateRecommendations(summary).map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
        `;

        document.getElementById('report-content').innerHTML = reportHtml;
    }

    calculateHealthScore(summary) {
        let score = 0;
        
        // Workout frequency (30 points)
        const workoutScore = Math.min((summary.totalWorkouts / 7) * 30, 30);
        score += workoutScore;

        // Calorie balance (40 points)
        const calorieBalance = summary.totalCaloriesBurned / Math.max(summary.totalCaloriesConsumed, 1);
        const balanceScore = Math.min(calorieBalance * 40, 40);
        score += balanceScore;

        // Consistency (30 points)
        const consistencyScore = summary.totalWorkouts > 0 ? 30 : 0;
        score += consistencyScore;

        return Math.round(Math.min(score, 100));
    }

    getHealthScoreDescription(score) {
        if (score >= 80) return 'Excellent! Keep up the great work!';
        if (score >= 60) return 'Good progress! You\'re on the right track.';
        if (score >= 40) return 'Making progress! Consider increasing activity.';
        return 'Let\'s work on building healthier habits!';
    }

    generateRecommendations(summary) {
        const recommendations = [];

        if (summary.totalWorkouts < 3) {
            recommendations.push('Try to exercise at least 3 times per week for better health benefits.');
        }

        if (summary.totalCaloriesConsumed > summary.totalCaloriesBurned * 1.5) {
            recommendations.push('Consider balancing your calorie intake with more physical activity.');
        }

        if (summary.mostPopularActivity === 'None') {
            recommendations.push('Start with simple activities like walking or light cardio.');
        }

        if (summary.totalProtein < summary.totalCaloriesConsumed * 0.15 / 4) {
            recommendations.push('Consider increasing your protein intake for better muscle recovery.');
        }

        if (recommendations.length === 0) {
            recommendations.push('You\'re doing great! Keep maintaining your healthy lifestyle.');
        }

        return recommendations;
    }

    getWeekStart() {
        const now = new Date();
        const day = now.getDay();
        const diff = now.getDate() - day;
        return new Date(now.setDate(diff));
    }

    formatTime(dateString) {
        return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    formatDateTime(dateString) {
        return new Date(dateString).toLocaleString([], { 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }

    formatDate(date) {
        return date.toLocaleDateString([], { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    setupFooterInteractions() {
        // Social links hover animations
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                const icon = link.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(10deg)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            });
            
            link.addEventListener('mouseleave', () => {
                const icon = link.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });

        // Smooth scrolling for footer links
        const footerLinks = document.querySelectorAll('.footer-links a[href^="#"]');
        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    
                    // Navigate to the section
                    if (window.striveHiveApp) {
                        window.striveHiveApp.showSectionWithAnimation(targetId);
                    }
                }
            });
        });
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showLoading(show) {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.classList.toggle('active', show);
        }
    }

    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;

        container.appendChild(toast);

        // Remove toast after 4 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 4000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.striveHiveApp = new StriveHiveApp();
    initializeFitnessSection();
    displayRecentWorkouts();
    addWorkoutStyles();
});

// Enhanced Fitness functionality
function initializeFitnessSection() {
    const activityOptions = document.querySelectorAll('.activity-option');
    const intensityOptions = document.querySelectorAll('.intensity-option');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const durationSlider = document.getElementById('duration-slider');
    const durationInput = document.getElementById('duration');
    const caloriesBurnedInput = document.getElementById('calories-burned');
    const fitnessForm = document.getElementById('fitness-form');
    const templateCards = document.querySelectorAll('.template-card');

    // Initialize activity selection
    activityOptions.forEach(option => {
        option.addEventListener('click', () => {
            activityOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            document.getElementById('activity-type').value = option.dataset.activity;
            calculateCalories();
        });
    });

    // Initialize intensity selection
    intensityOptions.forEach(option => {
        option.addEventListener('click', () => {
            intensityOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            document.getElementById('intensity').value = option.dataset.intensity;
            calculateCalories();
        });
    });

    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(`${targetTab}-tab`).classList.add('active');
        });
    });

    // Duration slider sync
    if (durationSlider && durationInput) {
        durationSlider.addEventListener('input', () => {
            durationInput.value = durationSlider.value;
            calculateCalories();
        });

        durationInput.addEventListener('input', () => {
            durationSlider.value = durationInput.value;
            calculateCalories();
        });
    }

    // Template cards
    templateCards.forEach(card => {
        card.addEventListener('click', () => {
            const template = card.dataset.template;
            applyTemplate(template);
        });
    });

    // Form submission
    if (fitnessForm) {
        fitnessForm.addEventListener('submit', handleFitnessSubmit);
    }

    // Initialize with default selections
    if (intensityOptions.length > 1) {
        intensityOptions[1].click(); // Select medium intensity by default
    }

    // Update fitness overview
    updateFitnessOverview();
    
    // Animate chart bars
    animateChartBars();
}

function calculateCalories() {
    const activityTypeEl = document.getElementById('activity-type');
    const durationEl = document.getElementById('duration');
    const intensityEl = document.getElementById('intensity');
    const caloriesBurnedInput = document.getElementById('calories-burned');

    const activityType = activityTypeEl ? activityTypeEl.value : '';
    const duration = parseInt(durationEl ? durationEl.value : '0') || 0;
    const intensity = intensityEl ? intensityEl.value : '';

    if (!activityType || !duration || !caloriesBurnedInput) return;

    // Calorie calculation based on activity type and intensity
    const baseCalories = {
        running: 12,
        weightlifting: 8,
        cycling: 10,
        swimming: 11,
        yoga: 4,
        other: 6
    };

    const intensityMultiplier = {
        low: 0.8,
        medium: 1.0,
        high: 1.3
    };

    const baseCal = baseCalories[activityType] || 6;
    const multiplier = intensityMultiplier[intensity] || 1.0;
    const estimatedCalories = Math.round(duration * baseCal * multiplier);

    caloriesBurnedInput.value = estimatedCalories;
}

function applyTemplate(templateName) {
    const templates = {
        'cardio-blast': {
            activity: 'running',
            duration: 30,
            intensity: 'high',
            calories: 350
        },
        'strength-builder': {
            activity: 'weightlifting',
            duration: 45,
            intensity: 'medium',
            calories: 280
        },
        'yoga-flow': {
            activity: 'yoga',
            duration: 25,
            intensity: 'low',
            calories: 120
        },
        'hiit-power': {
            activity: 'other',
            duration: 20,
            intensity: 'high',
            calories: 400
        }
    };

    const template = templates[templateName];
    if (!template) return;

    // Apply template values
    const activityOption = document.querySelector(`[data-activity="${template.activity}"]`);
    if (activityOption) activityOption.click();

    const intensityOption = document.querySelector(`[data-intensity="${template.intensity}"]`);
    if (intensityOption) intensityOption.click();

    const durationInput = document.getElementById('duration');
    const durationSlider = document.getElementById('duration-slider');
    
    if (durationInput) {
        durationInput.value = template.duration;
        if (durationSlider) durationSlider.value = template.duration;
    }

    showToast(`Applied ${templateName.replace('-', ' ')} template!`, 'success');
}

function handleFitnessSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const fitnessData = {
        activityType: formData.get('activityType'),
        duration: parseInt(formData.get('duration')),
        caloriesBurned: parseFloat(formData.get('caloriesBurned')),
        intensity: formData.get('intensity'),
        heartRate: formData.get('heartRate') ? parseInt(formData.get('heartRate')) : null,
        notes: formData.get('notes'),
        timestamp: new Date().toISOString()
    };

    if (!fitnessData.activityType || !fitnessData.duration || !fitnessData.caloriesBurned) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    // Save to localStorage
    const existingData = JSON.parse(localStorage.getItem('fitness-activities') || '[]');
    existingData.unshift(fitnessData);
    localStorage.setItem('fitness-activities', JSON.stringify(existingData));

    // Update displays
    updateFitnessOverview();
    displayRecentWorkouts();
    animateChartBars();

    // Reset form
    event.target.reset();
    document.querySelectorAll('.activity-option').forEach(opt => opt.classList.remove('selected'));
    document.querySelectorAll('.intensity-option').forEach(opt => opt.classList.remove('selected'));

    // Show success message
    showToast(`${fitnessData.activityType} workout logged successfully! 🎉`, 'success');

    // Trigger achievement check
    checkFitnessAchievements(existingData);
}

function updateFitnessOverview() {
    const activities = JSON.parse(localStorage.getItem('fitness-activities') || '[]');
    const now = new Date();
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());

    const weeklyActivities = activities.filter(activity => {
        const activityDate = new Date(activity.timestamp);
        return activityDate >= weekStart;
    });

    const weeklyCalories = weeklyActivities.reduce((sum, activity) => sum + activity.caloriesBurned, 0);
    const weeklyMinutes = weeklyActivities.reduce((sum, activity) => sum + activity.duration, 0);
    const weeklySessions = weeklyActivities.length;

    // Calculate streak
    let streak = 0;
    const sortedActivities = activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    let currentDate = new Date();
    
    for (let activity of sortedActivities) {
        const activityDate = new Date(activity.timestamp);
        const daysDiff = Math.floor((currentDate - activityDate) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === streak) {
            streak++;
            currentDate = activityDate;
        } else if (daysDiff > streak + 1) {
            break;
        }
    }

    // Update display
    animateCounter('weekly-calories-burned', weeklyCalories);
    animateCounter('weekly-workout-time', weeklyMinutes);
    animateCounter('weekly-sessions', weeklySessions);
    animateCounter('fitness-streak', streak);

    // Update progress bars
    setTimeout(() => {
        const cards = document.querySelectorAll('.fitness-overview-card');
        const card0Fill = cards[0] && cards[0].querySelector('.mini-progress-fill');
        const card1Fill = cards[1] && cards[1].querySelector('.mini-progress-fill');
        const card2Fill = cards[2] && cards[2].querySelector('.mini-progress-fill');
        const card3Fill = cards[3] && cards[3].querySelector('.mini-progress-fill');
        
        if (card0Fill) card0Fill.style.width = Math.min(100, (weeklyCalories / 2000) * 100) + '%';
        if (card1Fill) card1Fill.style.width = Math.min(100, (weeklyMinutes / 300) * 100) + '%';
        if (card2Fill) card2Fill.style.width = Math.min(100, (weeklySessions / 7) * 100) + '%';
        if (card3Fill) card3Fill.style.width = Math.min(100, (streak / 30) * 100) + '%';
    }, 500);
}

function displayRecentWorkouts() {
    const activities = JSON.parse(localStorage.getItem('fitness-activities') || '[]');
    const container = document.getElementById('fitness-activities');

    if (!container) return;

    if (activities.length === 0) {
        container.innerHTML = `
            <div class="no-workouts">
                <i class="fas fa-dumbbell"></i>
                <h4>Ready to start your fitness journey?</h4>
                <p>Log your first workout above to see your progress here!</p>
                <div class="motivation-stats">
                    <div class="stat-card">
                        <i class="fas fa-target"></i>
                        <p>Set your first goal and start tracking!</p>
                    </div>
                </div>
            </div>
        `;
        return;
    }

    // Sort activities by timestamp (most recent first)
    const sortedActivities = activities
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 10);

    const workoutsHTML = sortedActivities.map((activity, index) => {
        const date = new Date(activity.timestamp);
        const timeAgo = getTimeAgo(date);
        
        return `
            <div class="workout-item" style="animation-delay: ${index * 0.1}s">
                <div class="workout-icon">
                    <i class="fas ${getActivityIcon(activity.activityType)}"></i>
                </div>
                <div class="workout-details">
                    <div class="workout-header">
                        <h4>${activity.activityType.charAt(0).toUpperCase() + activity.activityType.slice(1)}</h4>
                        <span class="workout-time">${timeAgo}</span>
                    </div>
                    <div class="workout-stats">
                        <span><i class="fas fa-clock"></i> ${activity.duration} min</span>
                        <span><i class="fas fa-fire"></i> ${activity.caloriesBurned} cal</span>
                        <span class="intensity-badge intensity-${activity.intensity.toLowerCase()}">${activity.intensity}</span>
                    </div>
                    ${activity.notes ? `<p class="workout-notes">${activity.notes}</p>` : ''}
                </div>
                <div class="workout-actions">
                    <button class="btn-icon" onclick="app.repeatWorkout('${activity.id || Date.now()}')" title="Repeat">
                        <i class="fas fa-redo"></i>
                    </button>
                    <button class="btn-icon" onclick="app.viewWorkoutDetails('${activity.id || Date.now()}')" title="Details">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = workoutsHTML;

    // Update workout summary stats
    const totalWorkouts = activities.length;
    const totalCalories = activities.reduce((sum, activity) => sum + activity.caloriesBurned, 0);
    const totalMinutes = activities.reduce((sum, activity) => sum + activity.duration, 0);
    
    // Update stats if elements exist
    const statsContainer = document.querySelector('.workout-summary-stats');
    if (statsContainer) {
        statsContainer.innerHTML = `
            <div class="summary-stat">
                <span class="stat-number">${totalWorkouts}</span>
                <span class="stat-label">Total Workouts</span>
            </div>
            <div class="summary-stat">
                <span class="stat-number">${totalCalories}</span>
                <span class="stat-label">Calories Burned</span>
            </div>
            <div class="summary-stat">
                <span class="stat-number">${Math.round(totalMinutes / 60)}h ${totalMinutes % 60}m</span>
                <span class="stat-label">Time Exercised</span>
            </div>
        `;
    }
}

function getActivityIcon(activityType) {
    const icons = {
        running: 'fa-running',
        cycling: 'fa-bicycle',
        swimming: 'fa-swimmer',
        weightlifting: 'fa-dumbbell',
        yoga: 'fa-spa',
        other: 'fa-heartbeat'
    };
    return icons[activityType] || 'fa-heartbeat';
}

function animateChartBars() {
    const bars = document.querySelectorAll('.chart-bar');
    bars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.transform = 'scaleY(1)';
            bar.style.opacity = '1';
        }, index * 100);
    });
}

function checkFitnessAchievements(activities) {
    const achievements = [];
    
    // Check various achievements
    if (activities.length === 1) {
        achievements.push('First Workout Complete! 🎉');
    } else if (activities.length === 10) {
        achievements.push('10 Workouts Complete! 💪');
    } else if (activities.length === 50) {
        achievements.push('Fitness Enthusiast - 50 Workouts! 🏆');
    }

    // Check calorie milestones
    const totalCalories = activities.reduce((sum, activity) => sum + activity.caloriesBurned, 0);
    if (totalCalories >= 1000 && totalCalories < 1100) {
        achievements.push('Calorie Crusher - 1000 calories burned! 🔥');
    }

    // Show achievements
    achievements.forEach((achievement, index) => {
        setTimeout(() => {
            showToast(achievement, 'achievement');
        }, index * 2000);
    });
}

function getTimeAgo(date) {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
        return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
        return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
        return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
}

function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const duration = 1000;
    const increment = targetValue / (duration / 16);
    let currentValue = 0;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        element.textContent = Math.floor(currentValue);
    }, 16);
}

// Add CSS for workout items
function addWorkoutStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .workout-item {
            display: flex;
            align-items: flex-start;
            gap: 15px;
            padding: 15px;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 12px;
            margin-bottom: 10px;
            transition: all 0.3s ease;
            opacity: 0;
            animation: slideInLeft 0.5s ease forwards;
        }

        .workout-item:hover {
            background: rgba(255, 255, 255, 0.05);
            transform: translateX(5px);
        }

        .workout-icon {
            width: 40px;
            height: 40px;
            background: var(--gradient-secondary);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 16px;
        }

        .workout-details {
            flex: 1;
        }

        .workout-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }

        .workout-header h4 {
            margin: 0;
            font-size: 1rem;
            font-weight: 600;
        }

        .workout-time {
            font-size: 0.8rem;
            color: var(--text-muted);
        }

        .workout-stats {
            display: flex;
            gap: 15px;
            margin-bottom: 8px;
            font-size: 0.85rem;
            color: var(--text-muted);
        }

        .intensity-badge {
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 0.7rem;
            font-weight: 600;
            text-transform: uppercase;
        }

        .intensity-low { background: #4ade80; color: white; }
        .intensity-medium { background: #f59e0b; color: white; }
        .intensity-high { background: #ef4444; color: white; }

        .workout-notes {
            font-size: 0.85rem;
            color: var(--text-muted);
            margin: 0;
            font-style: italic;
        }

        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Export for use in other modules
window.StriveHiveApp = StriveHiveApp;

// Enhanced Fitness Section Functionality
class FitnessTracker {
    constructor() {
        this.currentWorkoutType = null;
        this.workoutTimer = null;
        this.startTime = null;
        this.selectedIntensity = 'moderate';
        this.weeklyGoals = {
            calories: { current: 1250, target: 2500 },
            time: { current: 180, target: 300 },
            days: { current: 4, target: 5 },
            streak: { current: 7, target: 14 }
        };
        this.workoutTypes = {
            strength: { icon: 'dumbbell', caloriesPerMin: 8 },
            cardio: { icon: 'running', caloriesPerMin: 12 },
            yoga: { icon: 'leaf', caloriesPerMin: 4 },
            cycling: { icon: 'biking', caloriesPerMin: 10 }
        };
        
        // Ensure activity distribution is populated immediately
        this.activityDistributionInitialized = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateWeeklyGoals();
        this.updateWeeklyProgress();
        this.updateRecentWorkouts();
        this.updateQuickTemplates();
        
        // Initialize activity distribution with default data immediately
        setTimeout(() => {
            this.initializeActivityDistribution();
        }, 100);
        
        // Initialize reports data - ensures activity distribution section is populated  
        setTimeout(() => {
            this.loadReportsData();
        }, 1000);
    }

    initializeActivityDistribution() {
        console.log('🎯 Initializing activity distribution with default data...');
        
        // Create sample fitness activities data that matches the expected format
        this.sampleFitnessActivities = [
            // Running activities (21 sessions - 45%)
            ...Array(21).fill(0).map((_, i) => ({ activityType: 'running', caloriesBurned: 350 + i * 10 })),
            // Strength training activities (14 sessions - 30%) 
            ...Array(14).fill(0).map((_, i) => ({ activityType: 'weightlifting', caloriesBurned: 280 + i * 15 })),
            // Cycling activities (7 sessions - 15%)
            ...Array(7).fill(0).map((_, i) => ({ activityType: 'cycling', caloriesBurned: 400 + i * 20 })),
            // Other activities (5 sessions - 10%)
            ...Array(5).fill(0).map((_, i) => ({ activityType: i % 2 === 0 ? 'swimming' : 'yoga', caloriesBurned: 200 + i * 30 }))
        ];
        
        const defaultActivityBreakdown = {
            running: 45,        // 21 sessions
            strength: 30,       // 14 sessions  
            cycling: 15,        // 7 sessions
            other: 10          // 5 sessions
        };
        
        // Populate activity distribution immediately with default data
        this.updateActivityBreakdown(defaultActivityBreakdown);
        
        // Also directly create the pie chart with immediate data
        setTimeout(() => {
            this.createImmediatePieChart();
            this.setDefaultViewState();
        }, 100);
        
        console.log('✅ Activity distribution initialized with default data');
    }

    createImmediatePieChart() {
        const pieChartContainer = document.querySelector('.pie-chart-container');
        if (pieChartContainer && !this.activityDistributionInitialized) {
            console.log('🎯 Creating immediate pie chart with default data');
            
            const activityStats = {
                'running': { count: 21, percentage: 45, color: '#667eea', icon: '🏃‍♂️' },
                'strength training': { count: 14, percentage: 30, color: '#764ba2', icon: '🏋️‍♂️' },
                'cycling': { count: 7, percentage: 15, color: '#f093fb', icon: '🚴‍♂️' },
                'other activities': { count: 5, percentage: 10, color: '#4facfe', icon: '🏊‍♂️' }
            };
            
            const pieChartHTML = `
                <div class="pie-chart-section">
                    <div class="pie-chart-wrapper">
                        <div class="pie-chart" id="activity-pie-chart">
                            ${this.generatePieChartSVG(activityStats)}
                        </div>
                        <div class="total-sessions">
                            <div class="total-number">47</div>
                            <div class="total-label">TOTAL SESSIONS</div>
                        </div>
                    </div>
                    <div class="activity-legend">
                        ${Object.keys(activityStats).map(activity => {
                            const stats = activityStats[activity];
                            return `
                                <div class="legend-item">
                                    <div class="legend-color" style="background-color: ${stats.color}"></div>
                                    <span class="legend-text">${stats.icon} ${activity.charAt(0).toUpperCase() + activity.slice(1)}: ${stats.percentage}%</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
            pieChartContainer.innerHTML = pieChartHTML;
            
            // Mark as initialized
            this.activityDistributionInitialized = true;
            
            // Add animation
            setTimeout(() => {
                const pieChart = document.getElementById('activity-pie-chart');
                if (pieChart) {
                    pieChart.classList.add('animated');
                }
            }, 50);
            
            console.log('✅ Immediate pie chart created successfully');
        }
    }

    setDefaultViewState() {
        const pieChartContainer = document.querySelector('.pie-chart-container');
        const breakdownStats = document.querySelector('.activity-breakdown-stats');
        
        if (pieChartContainer) {
            pieChartContainer.style.display = 'block';
            pieChartContainer.style.opacity = '1';
        }
        
        if (breakdownStats) {
            breakdownStats.style.display = 'none';
            breakdownStats.style.opacity = '0';
        }
        
        // Ensure chart toggle button is active
        const chartBtn = document.querySelector('.view-toggle-btn[data-view="chart"]');
        if (chartBtn) {
            chartBtn.classList.add('active');
        }
        
        const listBtn = document.querySelector('.view-toggle-btn[data-view="list"]');
        if (listBtn) {
            listBtn.classList.remove('active');
        }
    }

    setupEventListeners() {
        // Workout type selection
        document.querySelectorAll('.workout-type-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.selectWorkoutType(card.dataset.type);
            });
        });

        // Intensity selection
        document.querySelectorAll('.enhanced-intensity-option').forEach(option => {
            option.addEventListener('click', (e) => {
                this.selectIntensity(option.dataset.intensity);
            });
        });

        // Duration buttons
        document.querySelectorAll('.duration-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setDuration(btn.dataset.duration);
            });
        });

        // Timer functionality
        const startTimerBtn = document.querySelector('.workout-timer button');
        if (startTimerBtn) {
            startTimerBtn.addEventListener('click', () => {
                this.toggleTimer();
            });
        }

        // Form submission
        const workoutForm = document.getElementById('workout-form');
        if (workoutForm) {
            workoutForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.logWorkout();
            });
        }

        // Template selection
        document.querySelectorAll('.template-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.useTemplate(item.dataset.template);
            });
        });

        // Real-time calorie calculation
        const durationInput = document.getElementById('workout-duration');
        if (durationInput) {
            durationInput.addEventListener('input', () => {
                this.updateCalorieEstimate();
            });
        }
    }

    selectWorkoutType(type) {
        // Remove active class from all cards
        document.querySelectorAll('.workout-type-card').forEach(card => {
            card.classList.remove('active');
        });

        // Add active class to selected card
        const selectedCard = document.querySelector(`[data-type="${type}"]`);
        if (selectedCard) {
            selectedCard.classList.add('active');
            this.currentWorkoutType = type;
            this.updateCalorieEstimate();
        }
    }

    selectIntensity(intensity) {
        // Remove active class from all options
        document.querySelectorAll('.enhanced-intensity-option').forEach(option => {
            option.classList.remove('active');
        });

        // Add active class to selected option
        const selectedOption = document.querySelector(`[data-intensity="${intensity}"]`);
        if (selectedOption) {
            selectedOption.classList.add('active');
            this.selectedIntensity = intensity;
            this.updateCalorieEstimate();
        }
    }

    setDuration(minutes) {
        const durationInput = document.getElementById('workout-duration');
        if (durationInput) {
            durationInput.value = minutes;
            
            // Update button states
            document.querySelectorAll('.duration-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            const selectedBtn = document.querySelector(`[data-duration="${minutes}"]`);
            if (selectedBtn) {
                selectedBtn.classList.add('active');
            }
            
            this.updateCalorieEstimate();
        }
    }

    updateCalorieEstimate() {
        const duration = parseInt(document.getElementById('workout-duration')?.value || 0);
        const caloriesDisplay = document.querySelector('.calories-display span');
        
        if (!this.currentWorkoutType || !duration || !caloriesDisplay) return;

        let baseCalories = this.workoutTypes[this.currentWorkoutType].caloriesPerMin * duration;
        
        // Adjust for intensity
        const intensityMultiplier = {
            light: 0.8,
            moderate: 1.0,
            vigorous: 1.3
        };
        
        const totalCalories = Math.round(baseCalories * intensityMultiplier[this.selectedIntensity]);
        caloriesDisplay.textContent = totalCalories;
    }

    toggleTimer() {
        const timerBtn = document.querySelector('.workout-timer button');
        
        if (!this.workoutTimer) {
            // Start timer
            this.startTime = new Date();
            this.workoutTimer = setInterval(() => {
                this.updateTimerDisplay();
            }, 1000);
            
            timerBtn.textContent = 'Stop Timer';
            timerBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        } else {
            // Stop timer
            clearInterval(this.workoutTimer);
            this.workoutTimer = null;
            
            const duration = Math.floor((new Date() - this.startTime) / 60000);
            const durationInput = document.getElementById('workout-duration');
            if (durationInput) {
                durationInput.value = duration;
            }
            
            timerBtn.textContent = 'Start Timer';
            timerBtn.style.background = 'var(--gradient-success)';
            this.updateCalorieEstimate();
        }
    }

    updateTimerDisplay() {
        if (!this.startTime) return;
        
        const elapsed = Math.floor((new Date() - this.startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        
        const timerBtn = document.querySelector('.workout-timer button');
        if (timerBtn) {
            timerBtn.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    logWorkout() {
        const formData = new FormData(document.getElementById('workout-form'));
        const workoutData = {
            type: this.currentWorkoutType,
            name: formData.get('workout-name'),
            duration: parseInt(formData.get('workout-duration')),
            intensity: this.selectedIntensity,
            calories: parseInt(document.querySelector('.calories-display span').textContent),
            notes: formData.get('workout-notes'),
            timestamp: new Date()
        };

        // Save workout data
        this.saveWorkout(workoutData);
        
        // Reset form
        this.resetWorkoutForm();
        
        // Update displays
        this.updateWeeklyGoals();
        this.updateWeeklyProgress();
        this.updateRecentWorkouts();
        
        // Show success message
        this.showWorkoutSuccess(workoutData);
    }

    saveWorkout(workoutData) {
        let workouts = JSON.parse(localStorage.getItem('workouts') || '[]');
        workouts.unshift(workoutData);
        
        // Keep only last 50 workouts
        if (workouts.length > 50) {
            workouts = workouts.slice(0, 50);
        }
        
        localStorage.setItem('workouts', JSON.stringify(workouts));
    }

    resetWorkoutForm() {
        const form = document.getElementById('workout-form');
        if (form) {
            form.reset();
        }
        
        // Reset selections
        document.querySelectorAll('.workout-type-card').forEach(card => {
            card.classList.remove('active');
        });
        
        document.querySelectorAll('.enhanced-intensity-option').forEach(option => {
            option.classList.remove('active');
        });
        
        document.querySelectorAll('.duration-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Reset timer
        if (this.workoutTimer) {
            clearInterval(this.workoutTimer);
            this.workoutTimer = null;
        }
        
        const timerBtn = document.querySelector('.workout-timer button');
        if (timerBtn) {
            timerBtn.textContent = 'Start Timer';
            timerBtn.style.background = 'var(--gradient-success)';
        }
        
        this.currentWorkoutType = null;
        this.selectedIntensity = 'moderate';
    }

    updateWeeklyGoals() {
        Object.keys(this.weeklyGoals).forEach(goalType => {
            const goal = this.weeklyGoals[goalType];
            const progress = Math.min((goal.current / goal.target) * 100, 100);
            
            // Update progress bars
            const progressBar = document.querySelector(`[data-goal="${goalType}"] .progress-fill`);
            if (progressBar) {
                progressBar.style.width = `${progress}%`;
            }
            
            // Update numbers
            const currentElement = document.querySelector(`[data-goal="${goalType}"] .current`);
            const targetElement = document.querySelector(`[data-goal="${goalType}"] .target`);
            const progressText = document.querySelector(`[data-goal="${goalType}"] .progress-text`);
            
            if (currentElement) currentElement.textContent = goal.current;
            if (targetElement) targetElement.textContent = goal.target;
            if (progressText) progressText.textContent = `${Math.round(progress)}% complete`;
        });
    }

    updateWeeklyProgress() {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const workoutMinutes = [45, 60, 0, 30, 75, 90, 45]; // Sample data
        
        days.forEach((day, index) => {
            const dayColumn = document.querySelector(`[data-day="${day.toLowerCase()}"]`);
            if (dayColumn) {
                const barFill = dayColumn.querySelector('.bar-fill');
                const dayStats = dayColumn.querySelector('.day-stats small');
                
                if (barFill) {
                    const height = Math.max((workoutMinutes[index] / 90) * 100, 5);
                    barFill.style.height = `${height}%`;
                }
                
                if (dayStats) {
                    dayStats.textContent = `${workoutMinutes[index]}min`;
                }
            }
        });
        
        // Update summary stats
        const totalTime = workoutMinutes.reduce((sum, time) => sum + time, 0);
        const workoutDays = workoutMinutes.filter(time => time > 0).length;
        const avgDuration = workoutDays > 0 ? Math.round(totalTime / workoutDays) : 0;
        
        const summaryStats = document.querySelectorAll('.summary-stat .stat-value');
        if (summaryStats.length >= 3) {
            summaryStats[0].textContent = `${totalTime}min`;
            summaryStats[1].textContent = workoutDays;
            summaryStats[2].textContent = `${avgDuration}min`;
        }
    }

    async updateRecentWorkouts() {
        const workoutsList = document.querySelector('.workouts-list');
        
        if (!workoutsList) return;
        
        workoutsList.innerHTML = '';
        
        try {
            // Get workouts from both local storage and API
            const localWorkouts = JSON.parse(localStorage.getItem('workouts') || '[]');
            const fitnessActivities = JSON.parse(localStorage.getItem('fitness-activities') || '[]');
            
            // Combine and sort all workouts by timestamp
            const allWorkouts = [...localWorkouts, ...fitnessActivities.map(activity => ({
                id: activity.id || Date.now(),
                name: activity.activityType,
                type: activity.activityType.toLowerCase(),
                duration: activity.duration,
                calories: activity.caloriesBurned,
                intensity: activity.intensity,
                timestamp: activity.timestamp || activity.recordedAt,
                notes: activity.notes
            }))];
            
            // Sort by timestamp (most recent first) and take top 5
            const recentWorkouts = allWorkouts
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                .slice(0, 5);
            
            if (recentWorkouts.length === 0) {
                workoutsList.innerHTML = `
                    <div class="no-workouts">
                        <i class="fas fa-dumbbell"></i>
                        <h4>Ready to start your fitness journey?</h4>
                        <p>Log your first workout to see your progress here! 💪</p>
                        <button class="btn-primary" onclick="app.showSection('fitness')">
                            <i class="fas fa-plus"></i> Log Workout
                        </button>
                    </div>
                `;
                return;
            }
            
            recentWorkouts.forEach((workout, index) => {
                const workoutItem = document.createElement('div');
                workoutItem.className = 'workout-item';
                workoutItem.style.animationDelay = `${index * 0.1}s`;
                
                const workoutIcon = this.getWorkoutIcon(workout.type || workout.name);
                const timeAgo = this.getTimeAgo(new Date(workout.timestamp));
                
                workoutItem.innerHTML = `
                    <div class="workout-icon">
                        <i class="fas ${workoutIcon}"></i>
                    </div>
                    <div class="workout-details">
                        <h4>${workout.name || workout.type}</h4>
                        <p>${timeAgo}</p>
                        <div class="workout-stats">
                            <span><i class="fas fa-clock"></i> ${workout.duration} min</span>
                            <span><i class="fas fa-fire"></i> ${workout.calories} cal</span>
                            <span class="intensity-badge intensity-${workout.intensity?.toLowerCase() || 'medium'}">${workout.intensity || 'Medium'}</span>
                        </div>
                        ${workout.notes ? `<p class="workout-notes">${workout.notes}</p>` : ''}
                    </div>
                    <div class="workout-actions">
                        <button class="btn-icon" onclick="app.repeatWorkout('${workout.id}')" title="Repeat Workout">
                            <i class="fas fa-redo"></i>
                        </button>
                        <button class="btn-icon" onclick="app.viewWorkoutDetails('${workout.id}')" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                `;
                workoutsList.appendChild(workoutItem);
            });
            
        } catch (error) {
            console.error('Error updating recent workouts:', error);
            workoutsList.innerHTML = `
                <div class="no-workouts">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h4>Error loading workouts</h4>
                    <p>Please try refreshing the page.</p>
                </div>
            `;
        }
    }
    
    getWorkoutIcon(type) {
        const icons = {
            running: 'fa-running',
            cycling: 'fa-bicycle',
            swimming: 'fa-swimmer',
            weightlifting: 'fa-dumbbell',
            yoga: 'fa-leaf',
            cardio: 'fa-heart',
            strength: 'fa-dumbbell',
            walking: 'fa-walking',
            hiking: 'fa-mountain',
            dancing: 'fa-music',
            boxing: 'fa-fist-raised',
            tennis: 'fa-tennis-ball'
        };
        return icons[type?.toLowerCase()] || 'fa-dumbbell';
    }
    
    getTimeAgo(date) {
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        if (minutes < 60) return `${minutes} min ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days === 1) return 'Yesterday';
        if (days < 7) return `${days} days ago`;
        return date.toLocaleDateString();
    }
    
    repeatWorkout(workoutId) {
        const localWorkouts = JSON.parse(localStorage.getItem('workouts') || '[]');
        const fitnessActivities = JSON.parse(localStorage.getItem('fitness-activities') || '[]');
        
        // Find the workout
        let workout = localWorkouts.find(w => w.id === workoutId) || 
                     fitnessActivities.find(w => w.id === workoutId);
        
        if (workout) {
            // Switch to fitness section and pre-fill the form
            this.showSection('fitness');
            
            // Pre-fill the workout form
            setTimeout(() => {
                if (workout.activityType) {
                    // From fitness activities
                    document.getElementById('activity-type').value = workout.activityType;
                    document.getElementById('duration').value = workout.duration;
                    document.getElementById('intensity').value = workout.intensity;
                    if (document.getElementById('notes')) {
                        document.getElementById('notes').value = `Repeated from ${this.getTimeAgo(new Date(workout.timestamp))}`;
                    }
                } else {
                    // From workouts
                    document.getElementById('activity-type').value = workout.type;
                    document.getElementById('duration').value = workout.duration;
                    document.getElementById('intensity').value = workout.intensity;
                }
                
                this.showSuccessToast('Workout template loaded! Adjust as needed and log it.');
            }, 300);
        }
    }
    
    viewWorkoutDetails(workoutId) {
        const localWorkouts = JSON.parse(localStorage.getItem('workouts') || '[]');
        const fitnessActivities = JSON.parse(localStorage.getItem('fitness-activities') || '[]');
        
        // Find the workout
        let workout = localWorkouts.find(w => w.id === workoutId) || 
                     fitnessActivities.find(w => w.id === workoutId);
        
        if (workout) {
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                <div class="modal-content workout-details-modal">
                    <div class="modal-header">
                        <h3><i class="fas ${this.getWorkoutIcon(workout.type || workout.activityType)}"></i> Workout Details</h3>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="workout-detail-card">
                            <h4>${workout.name || workout.activityType}</h4>
                            <p class="workout-date">${this.formatDate(new Date(workout.timestamp || workout.recordedAt))}</p>
                            
                            <div class="workout-stats-grid">
                                <div class="stat-item">
                                    <i class="fas fa-clock"></i>
                                    <span class="stat-value">${workout.duration}</span>
                                    <span class="stat-label">Minutes</span>
                                </div>
                                <div class="stat-item">
                                    <i class="fas fa-fire"></i>
                                    <span class="stat-value">${workout.calories || workout.caloriesBurned}</span>
                                    <span class="stat-label">Calories</span>
                                </div>
                                <div class="stat-item">
                                    <i class="fas fa-bolt"></i>
                                    <span class="stat-value">${workout.intensity}</span>
                                    <span class="stat-label">Intensity</span>
                                </div>
                            </div>
                            
                            ${workout.notes ? `
                                <div class="workout-notes-section">
                                    <h5><i class="fas fa-sticky-note"></i> Notes</h5>
                                    <p>${workout.notes}</p>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">Close</button>
                        <button class="btn-primary" onclick="app.repeatWorkout('${workout.id}'); this.closest('.modal-overlay').remove();">
                            <i class="fas fa-redo"></i> Repeat Workout
                        </button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
        }
    }

    updateQuickTemplates() {
        const templates = [
            { name: 'Quick HIIT', icon: 'bolt', duration: '20 min', type: 'cardio' },
            { name: 'Strength Focus', icon: 'dumbbell', duration: '45 min', type: 'strength' },
            { name: 'Yoga Flow', icon: 'leaf', duration: '30 min', type: 'yoga' },
            { name: 'Cycling', icon: 'biking', duration: '60 min', type: 'cycling' }
        ];
        
        const templatesGrid = document.querySelector('.templates-grid');
        if (!templatesGrid) return;
        
        templatesGrid.innerHTML = '';
        
        templates.forEach(template => {
            const templateItem = document.createElement('div');
            templateItem.className = 'template-item';
            templateItem.dataset.template = template.type;
            templateItem.innerHTML = `
                <div class="template-icon">
                    <i class="fas fa-${template.icon}"></i>
                </div>
                <div class="template-info">
                    <h4>${template.name}</h4>
                    <p>${template.duration}</p>
                </div>
            `;
            templatesGrid.appendChild(templateItem);
        });
    }

    useTemplate(templateType) {
        // Pre-fill form with template data
        this.selectWorkoutType(templateType);
        
        const templates = {
            cardio: { name: 'HIIT Cardio', duration: 20, intensity: 'vigorous' },
            strength: { name: 'Strength Training', duration: 45, intensity: 'moderate' },
            yoga: { name: 'Yoga Session', duration: 30, intensity: 'light' },
            cycling: { name: 'Cycling Workout', duration: 60, intensity: 'moderate' }
        };
        
        const template = templates[templateType];
        if (!template) return;
        
        // Fill form fields
        const nameInput = document.getElementById('workout-name');
        const durationInput = document.getElementById('workout-duration');
        
        if (nameInput) nameInput.value = template.name;
        if (durationInput) durationInput.value = template.duration;
        
        this.selectIntensity(template.intensity);
        this.updateCalorieEstimate();
        
        // Scroll to form
        document.querySelector('.workout-logger-card').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }

    formatDate(date) {
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
        
        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours}h ago`;
        if (diffInHours < 48) return 'Yesterday';
        
        return date.toLocaleDateString();
    }

    showWorkoutSuccess(workoutData) {
        const message = `Great job! You've completed "${workoutData.name}" and burned ${workoutData.calories} calories! 🔥`;
        
        // Create success toast
        const toast = document.createElement('div');
        toast.className = 'toast success';
        toast.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }
}

// Enhanced Goal Progress & Personal Records Animations
class EnhancedAnimations {
    constructor() {
        this.initAnimatedCounters();
        this.initProgressAnimations();
        this.initSpectacularEffects();
    }

    initAnimatedCounters() {
        const counters = document.querySelectorAll('.animated-counter');
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
                element.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 200);
            }
        };

        updateCounter();
    }

    initProgressAnimations() {
        const progressBars = document.querySelectorAll('.progress-fill-goal');
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -20px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target.getAttribute('data-progress');
                    entry.target.style.setProperty('--progress', progress + '%');
                    entry.target.style.width = progress + '%';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        progressBars.forEach(bar => observer.observe(bar));
    }

    initSpectacularEffects() {
        // Add sparkle effects to completed goals
        const completedElements = document.querySelectorAll('.completed-fill, .golden-medal, .completed');
        completedElements.forEach(element => {
            this.addSparkleEffect(element);
        });

        // Add floating particles to champion cards
        const championCards = document.querySelectorAll('.champion-card');
        championCards.forEach(card => {
            this.addFloatingParticles(card);
        });
    }

    addSparkleEffect(element) {
        const sparkles = document.createElement('div');
        sparkles.className = 'sparkle-container';
        sparkles.innerHTML = `
            <div class="sparkle" style="--delay: 0s; --x: 20%; --y: 30%;"></div>
            <div class="sparkle" style="--delay: 0.5s; --x: 80%; --y: 20%;"></div>
            <div class="sparkle" style="--delay: 1s; --x: 50%; --y: 80%;"></div>
            <div class="sparkle" style="--delay: 1.5s; --x: 10%; --y: 60%;"></div>
        `;
        
        element.style.position = 'relative';
        element.appendChild(sparkles);
    }

    addFloatingParticles(card) {
        const particles = document.createElement('div');
        particles.className = 'floating-particles';
        
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.setProperty('--delay', `${i * 0.5}s`);
            particle.style.setProperty('--x', `${Math.random() * 100}%`);
            particle.style.setProperty('--y', `${Math.random() * 100}%`);
            particles.appendChild(particle);
        }
        
        card.appendChild(particles);
    }

    // Reports Section Methods - Enhanced Backend Integration
    async loadReportsData() {
        console.log('🔄 Loading Reports Data...');
        try {
            this.currentReportPeriod = 'week';
            console.log('📊 Setting up reports for period:', this.currentReportPeriod);
            
            // Test backend connection first via API class
            try {
                const health = await API.request('/health');
                if (health) {
                    console.log('✅ Backend connection successful');
                    await this.generateReport(this.currentReportPeriod);
                } else {
                    console.warn('⚠️ Backend health check returned no body - using fallback data');
                    this.showOfflineReportsData();
                }
            } catch (err) {
                console.warn('⚠️ Backend health check failed - using fallback data', err);
                this.showOfflineReportsData();
            }
            
            this.setupReportEventListeners();
            this.initializeCharts();
            console.log('✅ Reports data loaded successfully');
        } catch (error) {
            console.error('❌ Error loading reports:', error);
            console.log('🔄 Loading fallback data instead...');
            // Show offline data as fallback
            this.showOfflineReportsData();
            this.setupReportEventListeners();
            this.initializeCharts();
        }
    }

    setupReportEventListeners() {
        console.log('🎯 Setting up report event listeners...');
        
        // Period selector buttons
        const periodBtns = document.querySelectorAll('.period-btn');
        console.log(`🔘 Found ${periodBtns.length} period buttons`);
        periodBtns.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                console.log('📅 Period button clicked:', e.target.dataset.period);
                document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentReportPeriod = e.target.dataset.period;
                await this.generateReport(this.currentReportPeriod);
            });
        });

        // Export PDF button
        const exportBtn = document.getElementById('export-pdf');
        if (exportBtn) {
            console.log('📄 Export PDF button found and connected');
            exportBtn.addEventListener('click', (e) => {
                console.log('📄 Export PDF button clicked');
                e.preventDefault();
                this.exportReport('pdf');
            });
        } else {
            console.warn('⚠️ Export PDF button not found');
        }

        // Share report button
        const shareBtn = document.getElementById('share-report');
        if (shareBtn) {
            console.log('🔗 Share report button found and connected');
            shareBtn.addEventListener('click', (e) => {
                console.log('🔗 Share report button clicked');
                e.preventDefault();
                this.shareReport();
            });
        } else {
            console.warn('⚠️ Share report button not found');
        }

        // Refresh data button
        const refreshBtn = document.getElementById('refresh-data');
        if (refreshBtn) {
            console.log('🔄 Refresh data button found and connected');
            refreshBtn.addEventListener('click', async (e) => {
                console.log('🔄 Refresh data button clicked');
                e.preventDefault();
                await this.generateReport(this.currentReportPeriod);
                this.showToast('success', 'Reports data refreshed!');
            });
        } else {
            console.warn('⚠️ Refresh data button not found');
        }

        // Chart type selector buttons
        const chartBtns = document.querySelectorAll('.chart-btn');
        console.log(`📊 Found ${chartBtns.length} chart buttons`);
        chartBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                console.log('📊 Chart button clicked:', e.target.dataset.type);
                document.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.updateChartType(e.target.dataset.type);
            });
        });

        // View toggle buttons for activity distribution
        const viewToggleBtns = document.querySelectorAll('.view-toggle-btn');
        console.log(`🔄 Found ${viewToggleBtns.length} view toggle buttons`);
        viewToggleBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                console.log('🔄 View toggle clicked:', e.target.dataset.view);
                document.querySelectorAll('.view-toggle-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.toggleActivityView(e.target.dataset.view);
            });
        });
        
        console.log('✅ Report event listeners setup complete');
    }

    toggleActivityView(view) {
        console.log(`🔄 Toggling activity view to: ${view}`);
        const pieChartContainer = document.querySelector('.pie-chart-container');
        const breakdownStats = document.querySelector('.activity-breakdown-stats');
        
        // Update button states
        document.querySelectorAll('.view-toggle-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`.view-toggle-btn[data-view="${view}"]`)?.classList.add('active');
        
        // Add subtle loading animation
        const activityCard = document.querySelector('.activity-distribution-card');
        if (activityCard) {
            activityCard.style.transition = 'transform 0.2s ease';
            activityCard.style.transform = 'scale(0.99)';
            setTimeout(() => {
                activityCard.style.transform = 'scale(1)';
            }, 100);
        }
        
        if (view === 'chart') {
            // Hide stats first
            if (breakdownStats) {
                breakdownStats.style.opacity = '0';
                setTimeout(() => {
                    breakdownStats.style.display = 'none';
                }, 150);
            }
            
            // Show chart with smooth transition
            if (pieChartContainer) {
                setTimeout(() => {
                    pieChartContainer.style.display = 'block';
                    pieChartContainer.style.opacity = '0';
                    setTimeout(() => {
                        pieChartContainer.style.opacity = '1';
                    }, 50);
                }, 150);
            }
        } else if (view === 'list') {
            // Hide chart first
            if (pieChartContainer) {
                pieChartContainer.style.opacity = '0';
                setTimeout(() => {
                    pieChartContainer.style.display = 'none';
                }, 150);
            }
            
            // Show stats with smooth transition
            if (breakdownStats) {
                setTimeout(() => {
                    breakdownStats.style.display = 'block';
                    breakdownStats.style.opacity = '0';
                    setTimeout(() => {
                        breakdownStats.style.opacity = '1';
                    }, 50);
                }, 150);
            }
        }
        
        // Show confirmation
        this.showToast('success', `📊 Switched to ${view} view`);
        console.log(`✅ View switched to ${view} successfully`);
    }

    async generateReport(period) {
        const userId = this.storage.getItem('currentUser')?.id || '1';
        console.log(`📈 Generating ${period} report for user ${userId}`);

        try {
            this.showReportLoading(true);
            
            const response = await API.request(`/reports/${userId}/${period}`);
            const reportData = response;
            console.log('📊 Report data received:', reportData);
            this.updateReportDisplay(reportData);
            
            // Also get trends data for better insights
            try {
                const trendsData = await API.request(`/reports/${userId}/trends`);
                this.updateTrendsDisplay(trendsData);
            } catch (err) {
                console.warn('⚠️ Trends data not available', err);
            }

        } catch (error) {
            console.error('❌ Error generating report:', error);
            this.showToast('error', `Failed to generate report: ${error.message}`);
            this.showOfflineReportsData();
        } finally {
            this.showReportLoading(false);
        }
    }

    updateReportDisplay(reportData) {
        console.log('📊 Updating report display with data:', reportData);
        
        // Update key metrics with smooth animations
        this.animateCountUp('total-calories-metric', reportData.summary?.totalCaloriesBurned || 0);
        this.animateCountUp('total-time-metric', Math.round((reportData.summary?.totalWorkoutTime || 0) / 60));
        this.animateCountUp('avg-session-metric', reportData.summary?.averageWorkoutDuration || 0);
        this.animateCountUp('goal-completion-metric', reportData.healthScore || 0);

        // Update metric changes
        this.updateMetricChanges(reportData);

        // Update charts
        this.updateFitnessChart(reportData.weeklyProgress);
        
        // Update activity breakdown with enhanced pie chart
        this.updateActivityBreakdown(reportData.activityBreakdown);

        // Update recommendations
        this.updateRecommendations(reportData.recommendations);

        // Store current report data
        this.currentReportData = reportData;
        
        console.log('✅ Report display updated successfully');
    }

    animateCountUp(elementId, targetValue) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const startValue = 0;
        const duration = 1500; // 1.5 seconds
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.round(startValue + (targetValue - startValue) * easeOutQuart);
            
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    updateMetricChanges(reportData) {
        // Calculate percentage changes based on previous period
        const changes = {
            calories: reportData.changes?.caloriesChange || Math.floor(Math.random() * 30) - 10,
            time: reportData.changes?.timeChange || Math.floor(Math.random() * 40) - 15,
            session: reportData.changes?.sessionChange || Math.floor(Math.random() * 20) - 10,
            goal: reportData.changes?.goalChange || Math.floor(Math.random() * 15)
        };

        this.updateMetricChange('total-calories-metric', changes.calories);
        this.updateMetricChange('total-time-metric', changes.time);
        this.updateMetricChange('avg-session-metric', changes.session);
        this.updateMetricChange('goal-completion-metric', changes.goal);
    }

    updateMetricChange(metricId, changePercent) {
        const metricCard = document.getElementById(metricId)?.closest('.metric-card-advanced');
        if (!metricCard) return;

        const changeElement = metricCard.querySelector('.metric-change');
        if (!changeElement) return;

        const changeSpan = changeElement.querySelector('span');
        const changeIcon = changeElement.querySelector('i');

        if (changeSpan) {
            changeSpan.textContent = `${changePercent > 0 ? '+' : ''}${changePercent}% vs last ${this.currentReportPeriod}`;
        }

        // Update styling based on change
        changeElement.className = 'metric-change';
        if (changePercent > 0) {
            changeElement.classList.add('positive');
            if (changeIcon) changeIcon.className = 'fas fa-trending-up';
        } else if (changePercent < 0) {
            changeElement.classList.add('negative');
            if (changeIcon) changeIcon.className = 'fas fa-trending-down';
        } else {
            changeElement.classList.add('neutral');
            if (changeIcon) changeIcon.className = 'fas fa-minus';
        }
    }

    updateFitnessChart(weeklyData) {
        const chartContainer = document.querySelector('.fitness-trend-chart');
        if (!chartContainer || !weeklyData) return;

        const pointsContainer = chartContainer.querySelector('.trend-points-advanced');
        if (!pointsContainer) return;

        pointsContainer.innerHTML = '';

        weeklyData.forEach((day, index) => {
            const percentage = Math.min(95, (day.caloriesBurned / 600) * 100); // Max 600 cal scale
            const leftPosition = 5 + (index * 15); // Space points evenly

            const point = document.createElement('div');
            point.className = 'trend-point-advanced';
            point.style.left = `${leftPosition}%`;
            point.style.bottom = `${Math.max(5, percentage)}%`;
            point.dataset.value = day.caloriesBurned;

            point.innerHTML = `
                <div class="point-tooltip">
                    <strong>${day.dayName}</strong><br>
                    ${day.caloriesBurned} cal<br>
                    ${day.workouts} workout${day.workouts !== 1 ? 's' : ''}
                </div>
            `;

            pointsContainer.appendChild(point);
        });

        // Update chart stats
        if (weeklyData.length > 0) {
            const totalCalories = weeklyData.reduce((sum, day) => sum + day.caloriesBurned, 0);
            const avgDaily = Math.round(totalCalories / weeklyData.length);
            const peakCalories = Math.max(...weeklyData.map(day => day.caloriesBurned));

            const statsItems = document.querySelectorAll('.chart-stats .stat-item');
            if (statsItems[0]) statsItems[0].querySelector('.stat-value').textContent = `${peakCalories} cal`;
            if (statsItems[1]) statsItems[1].querySelector('.stat-value').textContent = `${avgDaily} cal`;
        }
    }

    updateActivityBreakdown(activityBreakdown) {
        // Update activity distribution visualization with proper data
        console.log('📊 Updating activity breakdown:', activityBreakdown);
        
        // Calculate proper activity breakdown from fitness activities
        let activities = this.storage.getItem('fitnessActivities') || [];
        
        // If no activities and we have sample data (offline mode), use sample data
        if (activities.length === 0 && this.sampleFitnessActivities) {
            activities = this.sampleFitnessActivities;
        }
        
        const totalSessions = activities.length;
        
        // Count activities by type
        const activityCounts = {};
        activities.forEach(activity => {
            const type = activity.activityType || activity.type;
            activityCounts[type] = (activityCounts[type] || 0) + 1;
        });
        
        // Calculate percentages
        const activityStats = {
            running: {
                count: activityCounts.running || 0,
                percentage: totalSessions > 0 ? Math.round((activityCounts.running || 0) / totalSessions * 100) : 0,
                color: '#667eea',
                icon: '🏃‍♂️'
            },
            'strength training': {
                count: (activityCounts.weightlifting || 0) + (activityCounts['strength training'] || 0),
                percentage: totalSessions > 0 ? Math.round(((activityCounts.weightlifting || 0) + (activityCounts['strength training'] || 0)) / totalSessions * 100) : 0,
                color: '#764ba2',
                icon: '🏋️‍♂️'
            },
            cycling: {
                count: activityCounts.cycling || 0,
                percentage: totalSessions > 0 ? Math.round((activityCounts.cycling || 0) / totalSessions * 100) : 0,
                color: '#f093fb',
                icon: '🚴‍♂️'
            },
            'other activities': {
                count: totalSessions - (activityCounts.running || 0) - (activityCounts.cycling || 0) - ((activityCounts.weightlifting || 0) + (activityCounts['strength training'] || 0)),
                percentage: 0,
                color: '#4facfe',
                icon: '🏊‍♂️'
            }
        };
        
        // Calculate other activities percentage
        activityStats['other activities'].percentage = 100 - activityStats.running.percentage - activityStats['strength training'].percentage - activityStats.cycling.percentage;
        if (activityStats['other activities'].percentage < 0) activityStats['other activities'].percentage = 0;
        
        // Update the pie chart breakdown display
        this.updatePieChartBreakdown(activityStats, totalSessions);
        
        // Update activity bars if they exist
        const breakdownContainer = document.querySelector('.activity-breakdown');
        if (breakdownContainer) {
            Object.keys(activityStats).forEach(activity => {
                const activityElement = breakdownContainer.querySelector(`[data-activity="${activity}"]`);
                if (activityElement) {
                    const stats = activityStats[activity];
                    const bar = activityElement.querySelector('.activity-bar');
                    if (bar) {
                        bar.style.width = `${stats.percentage}%`;
                        bar.style.backgroundColor = stats.color;
                    }
                    const value = activityElement.querySelector('.activity-value');
                    if (value) {
                        value.textContent = `${stats.percentage}%`;
                    }
                    const count = activityElement.querySelector('.activity-count');
                    if (count) {
                        count.textContent = `${stats.count} sessions`;
                    }
                }
            });
        }
    }

    updatePieChartBreakdown(activityStats, totalSessions) {
        // Update the pie chart container
        const pieChartContainer = document.querySelector('.pie-chart-container');
        if (pieChartContainer) {
            const pieChartHTML = `
                <div class="pie-chart-section">
                    <div class="pie-chart-wrapper">
                        <div class="pie-chart" id="activity-pie-chart">
                            ${this.generatePieChartSVG(activityStats)}
                        </div>
                        <div class="total-sessions">
                            <div class="total-number">${totalSessions}</div>
                            <div class="total-label">TOTAL SESSIONS</div>
                        </div>
                    </div>
                </div>
            `;
            pieChartContainer.innerHTML = pieChartHTML;
            
            // Add animation to pie chart
            setTimeout(() => {
                const pieChart = document.getElementById('activity-pie-chart');
                if (pieChart) {
                    pieChart.classList.add('animated');
                }
            }, 100);
        }
        
        // Update the breakdown stats section
        this.updateActivityBreakdownStats(activityStats, totalSessions);
    }

    updateActivityBreakdownStats(activityStats, totalSessions) {
        // Update total workouts display
        const totalDisplay = document.getElementById('total-workouts-display');
        if (totalDisplay) {
            this.animateCountUp('total-workouts-display', totalSessions);
        }
        
        // Find most popular activity
        const sortedActivities = Object.keys(activityStats)
            .filter(key => activityStats[key].count > 0)
            .sort((a, b) => activityStats[b].count - activityStats[a].count);
            
        if (sortedActivities.length > 0) {
            const popularActivity = sortedActivities[0];
            const popularStats = activityStats[popularActivity];
            
            // Update popular activity display
            const popularIcon = document.getElementById('popular-activity-icon');
            const popularName = document.getElementById('popular-activity-name');
            const popularStatsEl = document.getElementById('popular-activity-stats');
            
            if (popularIcon) popularIcon.textContent = popularStats.icon;
            if (popularName) popularName.textContent = popularActivity.charAt(0).toUpperCase() + popularActivity.slice(1);
            if (popularStatsEl) popularStatsEl.textContent = `${popularStats.count} sessions (${popularStats.percentage}%)`;
        }
        
        // Update breakdown list
        const breakdownList = document.querySelector('.activity-breakdown-list');
        if (breakdownList) {
            const activitiesHTML = Object.keys(activityStats)
                .filter(activity => activityStats[activity].count > 0)
                .sort((a, b) => activityStats[b].count - activityStats[a].count)
                .map(activity => {
                    const stats = activityStats[activity];
                    const displayName = activity.charAt(0).toUpperCase() + activity.slice(1);
                    return `
                        <div class="activity-breakdown-item" data-activity="${activity}">
                            <div class="activity-icon-large">
                                ${stats.icon}
                            </div>
                            <div class="activity-details">
                                <div class="activity-name">${displayName}</div>
                                <div class="activity-stats">${stats.count} sessions • Average duration varies</div>
                                <div class="activity-progress-bar">
                                    <div class="activity-progress-fill" style="width: ${stats.percentage}%"></div>
                                </div>
                                <div class="activity-insights">
                                    ${this.getActivityInsight(activity, stats)}
                                </div>
                            </div>
                            <div class="activity-percentage">${stats.percentage}%</div>
                        </div>
                    `;
                }).join('');
                
            breakdownList.innerHTML = activitiesHTML;
            
            // Animate progress bars
            setTimeout(() => {
                document.querySelectorAll('.activity-progress-fill').forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
            }, 200);
        }
    }

    getActivityInsight(activity, stats) {
        const insights = {
            'running': stats.percentage >= 40 ? 'Excellent cardio focus! 🔥' : 'Good cardio base 👍',
            'strength training': stats.percentage >= 30 ? 'Strong strength focus! 💪' : 'Build more strength 📈',
            'cycling': stats.percentage >= 20 ? 'Great cycling routine! 🚴‍♂️' : 'Nice variety activity 🌟',
            'other activities': 'Good activity diversity! 🎯'
        };
        
        return insights[activity] || 'Keep it up! 💪';
    }

    generatePieChartSVG(activityStats) {
        const radius = 80;
        const centerX = 100;
        const centerY = 100;
        let currentAngle = -90; // Start from top
        
        const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe'];
        const activities = Object.keys(activityStats);
        
        let svgPaths = '';
        
        activities.forEach((activity, index) => {
            const stats = activityStats[activity];
            if (stats.percentage > 0) {
                const angle = (stats.percentage / 100) * 360;
                const startAngle = currentAngle;
                const endAngle = currentAngle + angle;
                
                const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
                const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
                const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
                const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);
                
                const largeArcFlag = angle > 180 ? 1 : 0;
                
                const pathData = [
                    `M ${centerX} ${centerY}`,
                    `L ${x1} ${y1}`,
                    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                    'Z'
                ].join(' ');
                
                svgPaths += `<path d="${pathData}" fill="${stats.color}" stroke="white" stroke-width="2" class="pie-slice" data-activity="${activity}" data-percentage="${stats.percentage}"/>`;
                
                currentAngle += angle;
            }
        });
        
        return `
            <svg width="200" height="200" viewBox="0 0 200 200" class="pie-chart-svg">
                ${svgPaths}
            </svg>
        `;
    }

    updateRecommendations(recommendations) {
        const recommendationsContainer = document.querySelector('.recommendations-list');
        if (!recommendationsContainer || !recommendations) return;

        recommendationsContainer.innerHTML = recommendations.map(rec => `
            <div class="recommendation-item">
                <div class="recommendation-icon">
                    <i class="fas ${this.getRecommendationIcon(rec.type)}"></i>
                </div>
                <div class="recommendation-content">
                    <h4>${rec.title}</h4>
                    <p>${rec.description}</p>
                </div>
            </div>
        `).join('');
    }

    getRecommendationIcon(type) {
        const icons = {
            'workout': 'fa-dumbbell',
            'nutrition': 'fa-apple-alt',
            'rest': 'fa-bed',
            'goal': 'fa-target',
            'general': 'fa-lightbulb'
        };
        return icons[type] || 'fa-lightbulb';
    }

    updateTrendsDisplay(trendsData) {
        // Update trends analysis
        const trendAnalysis = trendsData.trendAnalysis;
        
        // Update overall trend indicator
        this.updateOverallTrend(trendAnalysis.overallTrend);
        
        // Update weekly pattern if available
        if (trendsData.weeklyPattern) {
            this.updateWeeklyPattern(trendsData.weeklyPattern);
        }
    }

    updateOverallTrend(overallTrend) {
        // Add trend indicator to the fitness chart
        const chartHeader = document.querySelector('.fitness-trends-card .header-content p');
        if (chartHeader) {
            let trendIcon = '📈';
            let trendText = 'improving';
            let trendColor = '#10b981';

            if (overallTrend === 'declining') {
                trendIcon = '📉';
                trendText = 'needs attention';
                trendColor = '#ef4444';
            } else if (overallTrend === 'mixed') {
                trendIcon = '📊';
                trendText = 'mixed results';
                trendColor = '#f59e0b';
            }

            chartHeader.innerHTML = `Track your performance over time with detailed analytics <span style="color: ${trendColor};">${trendIcon} ${trendText}</span>`;
        }
    }

    async exportReport(format) {
        const userId = this.storage.getItem('currentUser')?.id || '1';
        console.log(`📄 Exporting ${format} report for user ${userId}`);

        try {
            this.showExportLoading(true);
            
            const exportData = await API.request(`/reports/${userId}/export/${format}`);
            console.log('📊 Export data received:', exportData);
            
            if (format === 'pdf') {
                // Generate PDF using browser's print functionality
                console.log('🖨️ Generating PDF report...');
                this.generatePDFReport(exportData.reportData || this.currentReportData);
            } else {
                // Handle other formats by creating download link
                console.log('💾 Creating download link...');
                this.downloadReport(exportData);
            }
            
            this.showToast('success', `Report exported as ${format.toUpperCase()}!`);
        } catch (error) {
            console.error('❌ Export error:', error);
            this.showToast('error', `Failed to export report: ${error.message}`);
        } finally {
            this.showExportLoading(false);
        }
    }

    generatePDFReport(reportData) {
        // Create a new window with printable report
        const printWindow = window.open('', '_blank');
        const reportHTML = this.generatePrintableReport(reportData);
        
        printWindow.document.write(reportHTML);
        printWindow.document.close();
        
        // Trigger print dialog after content loads
        setTimeout(() => {
            printWindow.print();
        }, 500);
    }

    generatePrintableReport(reportData) {
        const currentDate = new Date().toLocaleDateString();
        const period = this.currentReportPeriod || 'weekly';
        
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Strive Hive Health Report</title>
                <style>
                    body { font-family: Arial; margin: 40px; color: #333; line-height: 1.6; }
                    .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #667eea; padding-bottom: 20px; }
                    .logo { font-size: 24px; font-weight: bold; color: #667eea; margin-bottom: 10px; }
                    .report-title { font-size: 20px; margin: 10px 0; }
                    .report-period { color: #666; }
                    .metrics-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 30px 0; }
                    .metric-box { padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; text-align: center; }
                    .metric-value { font-size: 24px; font-weight: bold; color: #667eea; }
                    .metric-label { color: #666; margin-top: 8px; }
                    .section { margin: 30px 0; }
                    .section-title { font-size: 18px; font-weight: bold; margin-bottom: 15px; color: #374151; }
                    .recommendations { list-style: none; padding: 0; }
                    .recommendation { padding: 15px; margin: 10px 0; background: #f8fafc; border-left: 4px solid #667eea; border-radius: 4px; }
                    .footer { margin-top: 50px; text-align: center; color: #666; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 20px; }
                    @media print { body { margin: 20px; } }
                </style>
            </head>
            <body>
                <div class="header">
                    <div class="logo">🏃‍♂️ Strive Hive</div>
                    <div class="report-title">${period.charAt(0).toUpperCase() + period.slice(1)} Health Report</div>
                    <div class="report-period">Generated on ${currentDate}</div>
                </div>
                
                <div class="metrics-grid">
                    <div class="metric-box">
                        <div class="metric-value">${reportData.summary?.totalWorkouts || 0}</div>
                        <div class="metric-label">Total Workouts</div>
                    </div>
                    <div class="metric-box">
                        <div class="metric-value">${reportData.summary?.totalCaloriesBurned || 0}</div>
                        <div class="metric-label">Calories Burned</div>
                    </div>
                    <div class="metric-box">
                        <div class="metric-value">${Math.round((reportData.summary?.totalWorkoutTime || 0) / 60)}h</div>
                        <div class="metric-label">Total Exercise Time</div>
                    </div>
                    <div class="metric-box">
                        <div class="metric-value">${reportData.healthScore || 0}%</div>
                        <div class="metric-label">Health Score</div>
                    </div>
                </div>
                
                <div class="section">
                    <div class="section-title">📊 Daily Averages</div>
                    <p><strong>Calories Burned:</strong> ${reportData.dailyAverages?.caloriesBurned || 0} per day</p>
                    <p><strong>Workout Frequency:</strong> ${reportData.dailyAverages?.workoutFrequency || 0} times per day</p>
                    <p><strong>Average Session:</strong> ${reportData.summary?.averageWorkoutDuration || 0} minutes</p>
                </div>
                
                <div class="section">
                    <div class="section-title">💡 Recommendations</div>
                    <ul class="recommendations">
                        ${(reportData.recommendations || []).map(rec => 
                            `<li class="recommendation"><strong>${rec.title}</strong><br>${rec.description}</li>`
                        ).join('')}
                    </ul>
                </div>
                
                <div class="footer">
                    Report generated by Strive Hive Health & Fitness Tracker<br>
                    Visit us at strivehive.app for more insights
                </div>
            </body>
            </html>
        `;
    }

    downloadReport(exportData) {
        // Create downloadable link for other formats
        const link = document.createElement('a');
        link.href = exportData.downloadUrl || '#';
        link.download = `strive-hive-report-${this.currentReportPeriod}.${exportData.format || 'json'}`;
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    async shareReport() {
        const userId = this.storage.getItem('currentUser')?.id || '1';
        console.log(`🔗 Creating share link for user ${userId}`);

        try {
            try {
                const shareData = await API.request(`/reports/${userId}/share`);
                console.log('🔗 Share data received:', shareData);
                this.showShareModal(shareData);
            } catch (err) {
                throw err;
            }
            
        } catch (error) {
            console.error('❌ Share error:', error);
            this.showToast('error', `Failed to generate share link: ${error.message}`);
        }
    }

    showShareModal(shareData) {
        // Remove existing modal if any
        const existingModal = document.querySelector('.modal-overlay');
        if (existingModal) existingModal.remove();

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content share-modal">
                <div class="modal-header">
                    <h3><i class="fas fa-share-alt"></i> Share Your Report</h3>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="share-options">
                        <div class="share-link-section">
                            <label>Share Link</label>
                            <div class="link-input-group">
                                <input type="text" value="${shareData.shareUrl}" readonly id="share-link-input">
                                <button class="copy-btn" onclick="window.fitnessTracker.copyShareLink()">
                                    <i class="fas fa-copy"></i> Copy
                                </button>
                            </div>
                            <p class="share-note">This link will expire on ${new Date(shareData.expiresAt).toLocaleDateString()}</p>
                        </div>
                        
                        <div class="social-share">
                            <h4>Share on Social Media</h4>
                            <div class="social-buttons">
                                <button class="social-btn twitter" onclick="window.fitnessTracker.shareOnTwitter('${shareData.shortUrl || shareData.shareUrl}')">
                                    <i class="fab fa-twitter"></i> Twitter
                                </button>
                                <button class="social-btn facebook" onclick="window.fitnessTracker.shareOnFacebook('${shareData.shareUrl}')">
                                    <i class="fab fa-facebook"></i> Facebook
                                </button>
                                <button class="social-btn linkedin" onclick="window.fitnessTracker.shareOnLinkedIn('${shareData.shareUrl}')">
                                    <i class="fab fa-linkedin"></i> LinkedIn
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.currentShareData = shareData;

        // Add modal background click to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    copyShareLink() {
        const input = document.getElementById('share-link-input');
        if (input) {
            input.select();
            try {
                document.execCommand('copy');
                this.showToast('success', 'Share link copied to clipboard!');
            } catch (err) {
                // Fallback for modern browsers
                navigator.clipboard?.writeText(input.value).then(() => {
                    this.showToast('success', 'Share link copied to clipboard!');
                });
            }
        }
    }

    shareOnTwitter(url) {
        const text = encodeURIComponent("Check out my fitness progress! 💪 #StriveHive #FitnessJourney");
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`, '_blank');
    }

    shareOnFacebook(url) {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    }

    shareOnLinkedIn(url) {
        const title = encodeURIComponent("My Fitness Progress Report - Strive Hive");
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${title}`, '_blank');
    }

    showReportLoading(show) {
        const container = document.querySelector('#reports .container');
        if (!container) return;

        const loadingOverlay = container.querySelector('.reports-loading');
        
        if (show) {
            if (!loadingOverlay) {
                const overlay = document.createElement('div');
                overlay.className = 'reports-loading';
                overlay.innerHTML = `
                    <div class="loading-content">
                        <div class="loading-spinner"></div>
                        <p>Generating your report...</p>
                    </div>
                `;
                container.appendChild(overlay);
            }
        } else {
            if (loadingOverlay) {
                loadingOverlay.remove();
            }
        }
    }

    showExportLoading(show) {
        const exportBtn = document.getElementById('export-pdf');
        if (!exportBtn) return;

        if (show) {
            exportBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Exporting...';
            exportBtn.disabled = true;
            exportBtn.style.opacity = '0.7';
        } else {
            exportBtn.innerHTML = '<i class="fas fa-file-pdf"></i> Export PDF';
            exportBtn.disabled = false;
            exportBtn.style.opacity = '1';
        }
    }

    showOfflineReportsData() {
        // Show realistic demo data that matches the pie chart design
        const demoReportData = {
            period: "Weekly",
            summary: {
                totalWorkouts: 47,
                totalCaloriesBurned: 2850,
                totalWorkoutTime: 2350, // ~39 hours
                averageWorkoutDuration: 50
            },
            healthScore: 87,
            weeklyProgress: [
                { dayName: "Mon", caloriesBurned: 380, workouts: 2 },
                { dayName: "Tue", caloriesBurned: 420, workouts: 2 },
                { dayName: "Wed", caloriesBurned: 350, workouts: 1 },
                { dayName: "Thu", caloriesBurned: 480, workouts: 2 },
                { dayName: "Fri", caloriesBurned: 390, workouts: 2 },
                { dayName: "Sat", caloriesBurned: 450, workouts: 2 },
                { dayName: "Sun", caloriesBurned: 380, workouts: 1 }
            ],
            activityBreakdown: {
                running: 45,        // 21 sessions
                strength: 30,       // 14 sessions  
                cycling: 15,        // 7 sessions
                other: 10          // 5 sessions
            },
            recommendations: [
                {
                    title: "Excellent Running Consistency!",
                    description: "Your running sessions make up 45% of your activities. Great cardiovascular work!",
                    type: "workout"
                },
                {
                    title: "Balance Your Training",
                    description: "Consider adding more strength training to complement your cardio work.",
                    type: "general"
                },
                {
                    title: "Diversify Activities",
                    description: "Try incorporating swimming or yoga for cross-training benefits.",
                    type: "general"
                }
            ],
            dailyAverages: {
                caloriesBurned: 407,
                workoutFrequency: 1.7
            }
        };
        
        // Add some sample fitness activities for the pie chart
        this.sampleFitnessActivities = [
            // Running activities (21 sessions - 45%)
            ...Array(21).fill(0).map((_, i) => ({ activityType: 'running', caloriesBurned: 350 + i * 10 })),
            // Strength training activities (14 sessions - 30%) 
            ...Array(14).fill(0).map((_, i) => ({ activityType: 'weightlifting', caloriesBurned: 280 + i * 15 })),
            // Cycling activities (7 sessions - 15%)
            ...Array(7).fill(0).map((_, i) => ({ activityType: 'cycling', caloriesBurned: 400 + i * 20 })),
            // Other activities (5 sessions - 10%)
            ...Array(5).fill(0).map((_, i) => ({ activityType: i % 2 === 0 ? 'swimming' : 'yoga', caloriesBurned: 200 + i * 30 }))
        ];
        
        this.updateReportDisplay(demoReportData);
        this.showToast('info', 'Showing enhanced demo data with 47 total sessions');
    }

    initializeCharts() {
        // Initialize chart interactions and any third-party chart libraries
        this.setupChartInteractions();
        this.setupChartTooltips();
    }

    setupChartInteractions() {
        // Add hover effects and interactions to chart elements
        document.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('trend-point-advanced')) {
                e.target.style.transform = 'scale(1.2)';
                const tooltip = e.target.querySelector('.point-tooltip');
                if (tooltip) tooltip.style.opacity = '1';
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            if (e.target.classList.contains('trend-point-advanced')) {
                e.target.style.transform = 'scale(1)';
                const tooltip = e.target.querySelector('.point-tooltip');
                if (tooltip) tooltip.style.opacity = '0';
            }
        });
    }

    setupChartTooltips() {
        // Enhanced tooltip positioning and styling
        document.querySelectorAll('.trend-point-advanced').forEach(point => {
            const tooltip = point.querySelector('.point-tooltip');
            if (tooltip) {
                tooltip.style.position = 'absolute';
                tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                tooltip.style.color = 'white';
                tooltip.style.padding = '8px 12px';
                tooltip.style.borderRadius = '4px';
                tooltip.style.fontSize = '12px';
                tooltip.style.whiteSpace = 'nowrap';
                tooltip.style.zIndex = '1000';
                tooltip.style.transform = 'translateX(-50%)';
                tooltip.style.bottom = '100%';
                tooltip.style.left = '50%';
                tooltip.style.marginBottom = '5px';
                tooltip.style.opacity = '0';
                tooltip.style.transition = 'opacity 0.2s ease';
            }
        });
    }

    updateChartType(type) {
        // Update chart visualization type
        const chartArea = document.querySelector('.fitness-trend-chart');
        if (chartArea) {
            chartArea.className = `fitness-trend-chart chart-type-${type}`;
            
            // Add visual feedback
            this.showToast('info', `Chart updated to ${type} view`);
        }
    }
}

// Initialize fitness tracker when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.fitnessTracker = new FitnessTracker();
    window.enhancedAnimations = new EnhancedAnimations();
});