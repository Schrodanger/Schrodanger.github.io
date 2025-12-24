/* ==========================================
   🚀 ULTRA MODERN PORTFOLIO - JavaScript
   Sourav Sharma | Microsoft SDE
   ========================================== */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initCustomCursor();
    initNavigation();
    initTerminalAnimation();
    initScrollAnimations();
    initSkillBars();
    initCounterAnimation();
    initThemeToggle();
    initFormValidation();
    initSmoothScroll();
    initBackToTop();
    initTiltEffect();
    init3DCardEffect();
});

/* ====================
   Custom Cursor
   ==================== */
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    // Check if device is touch-enabled
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
        return;
    }

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        // Cursor follows instantly
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Follower has more lag
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .nav-link, .social-link, .skill-card, .achievement-card, .profile-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
}

/* ====================
   Navigation
   ==================== */
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect on navbar
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    });
}

/* ====================
   Terminal Animation
   ==================== */
function initTerminalAnimation() {
    const typingElement = document.getElementById('terminalCommand');
    const outputElement = document.getElementById('terminalOutput');
    
    if (!typingElement || !outputElement) return;

    const commands = [
        { cmd: 'whoami', output: ['Sourav Sharma', 'Software Engineer @ Microsoft', 'NIT Warangal \'23'] },
        { cmd: 'cat skills.txt', output: ['C# • .NET • Python • Azure', 'REST APIs • React • Node.js', 'Payment Systems Expert'] },
        { cmd: 'ls projects/', output: ['SEPA_Payments/', 'UPI_Integration/', 'VPA_Masking/', 'Teams_Clone/'] },
        { cmd: 'echo $STATUS', output: ['🟢 Available for opportunities', '💼 Building Global Payments @Microsoft'] },
        { cmd: 'cat achievements.txt', output: ['Google Code Jam - Rank 851', 'Google Foobar - Completed', 'INSPIRE Scholar'] },
    ];

    let cmdIndex = 0;
    let charIndex = 0;
    let isTyping = true;
    let isDeleting = false;
    let currentCmd = '';

    function typeCommand() {
        currentCmd = commands[cmdIndex].cmd;
        
        if (isTyping && !isDeleting) {
            // Typing command
            if (charIndex < currentCmd.length) {
                typingElement.textContent = currentCmd.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(typeCommand, 80 + Math.random() * 40);
            } else {
                // Command fully typed, show output
                isTyping = false;
                setTimeout(showOutput, 300);
            }
        }
    }

    function showOutput() {
        outputElement.innerHTML = '';
        const outputs = commands[cmdIndex].output;
        
        outputs.forEach((line, index) => {
            setTimeout(() => {
                const outputLine = document.createElement('div');
                outputLine.className = 'output-line';
                outputLine.textContent = '→ ' + line;
                outputLine.style.opacity = '0';
                outputLine.style.transform = 'translateX(-10px)';
                outputElement.appendChild(outputLine);
                
                // Animate in
                setTimeout(() => {
                    outputLine.style.transition = 'all 0.3s ease';
                    outputLine.style.opacity = '1';
                    outputLine.style.transform = 'translateX(0)';
                }, 50);
                
                // After last line, wait and then delete
                if (index === outputs.length - 1) {
                    setTimeout(startDeleting, 2500);
                }
            }, index * 150);
        });
    }

    function startDeleting() {
        isDeleting = true;
        deleteCommand();
    }

    function deleteCommand() {
        if (charIndex > 0) {
            charIndex--;
            typingElement.textContent = currentCmd.substring(0, charIndex);
            setTimeout(deleteCommand, 30);
        } else {
            // Clear output and move to next command
            outputElement.innerHTML = '';
            isDeleting = false;
            isTyping = true;
            cmdIndex = (cmdIndex + 1) % commands.length;
            setTimeout(typeCommand, 500);
        }
    }

    // Start animation after a short delay
    setTimeout(typeCommand, 1000);
}

/* ====================
   Scroll Animations (Reveal on Scroll)
   ==================== */
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal, .timeline-item, .skill-card, .achievement-card, .highlight-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

/* ====================
   Skill Bars Animation
   ==================== */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress + '%';
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => observer.observe(bar));
}

/* ====================
   Counter Animation
   ==================== */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-value');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => observer.observe(counter));
}

/* ====================
   Theme Toggle
   ==================== */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle?.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle?.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

/* ====================
   Form Validation
   ==================== */
function initFormValidation() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        let isValid = true;
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });

        if (!isValid) return;

        const btn = form.querySelector('.btn-submit');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;

        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                btn.style.background = 'linear-gradient(135deg, #00ff88, #00cc6a)';
                form.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            } else {
                throw new Error('Failed');
            }
        })
        .catch(error => {
            btn.innerHTML = '<i class="fas fa-times"></i> Error!';
            btn.style.background = 'linear-gradient(135deg, #ff4444, #cc0000)';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        });
    });

    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim()) {
                input.classList.remove('error');
            }
        });
    });
}

/* ====================
   Smooth Scroll
   ==================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ====================
   Back to Top Button
   ==================== */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ====================
   3D Tilt Effect
   ==================== */
function initTiltEffect() {
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

/* ====================
   3D Card Effect on Visual Card
   ==================== */
function init3DCardEffect() {
    const visualCard = document.querySelector('.visual-card');
    
    if (!visualCard) return;

    visualCard.addEventListener('mousemove', (e) => {
        const rect = visualCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * 8;
        const rotateY = ((centerX - x) / centerX) * 8;
        
        visualCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    visualCard.addEventListener('mouseleave', () => {
        visualCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
}

/* ====================
   Magnetic Button Effect
   ==================== */
document.querySelectorAll('.btn-primary, .btn-ghost').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

/* ====================
   Glitch Effect Enhancement
   ==================== */
const glitchElements = document.querySelectorAll('.glitch');
glitchElements.forEach(el => {
    el.setAttribute('data-text', el.textContent);
});

/* ====================
   Parallax Effect for Orbs
   ==================== */
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const orbs = document.querySelectorAll('.orb');
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.1;
        orb.style.transform = `translateY(${scrollY * speed}px)`;
    });
});

/* ====================
   Loading Animation
   ==================== */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-role, .hero-description, .hero-cta, .hero-stats');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200 + index * 100);
    });
});

/* ====================
   Easter Egg: Konami Code
   ==================== */
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// Add rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

console.log('%c🚀 Portfolio by Sourav Sharma', 'font-size: 20px; font-weight: bold; background: linear-gradient(135deg, #00f0ff, #7b2fff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cSoftware Engineer @ Microsoft', 'font-size: 14px; color: #00f0ff;');
