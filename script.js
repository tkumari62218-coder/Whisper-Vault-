// ============================================
// WHISPER VAULT - JAVASCRIPT ANIMATIONS
// ============================================

// === PARTICLE ANIMATION ===
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random positioning
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles on load
window.addEventListener('load', createParticles);

// === SCROLL ANIMATIONS ===
function fadeInOnScroll() {
    const elements = document.querySelectorAll('.feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
}

// Initialize scroll animations
window.addEventListener('load', fadeInOnScroll);

// === SMOOTH SCROLL FOR NAVIGATION ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// === BUTTON NAVIGATION MAPPING ===
const buttonActions = {
    'Write Now': 'thoughts.html',
    'Send Letter': 'letters.html',
    'Confess': 'confessions.html',
    'Read Stories': 'stories.html',
    'Enter the Vault': 'thoughts.html'
};

// === BUTTON CLICK EFFECTS WITH NAVIGATION ===
document.querySelectorAll('.card-btn, .cta-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Navigate to respective page
        const buttonText = this.textContent.trim();
        const targetPage = buttonActions[buttonText];
        
        if (targetPage) {
            // Show loading message
            const message = document.createElement('div');
            message.className = 'nav-message';
            message.innerHTML = `
                <div class="message-content">
                    <p>🖤 Opening ${buttonText}...</p>
                    <p class="message-note">Page coming soon! For now, this is a demo.</p>
                    <button onclick="this.parentElement.parentElement.remove()" class="close-msg">Got it!</button>
                </div>
            `;
            document.body.appendChild(message);
            
            // In production, uncomment this:
            // setTimeout(() => {
            //     window.location.href = targetPage;
            // }, 1000);
        }
    });
});

// === RIPPLE EFFECT STYLES (Dynamic) ===
const style = document.createElement('style');
style.textContent = `
    .card-btn, .cta-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-message {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    }
    
    .message-content {
        background: linear-gradient(135deg, #1a0a1a 0%, #0a0a0a 100%);
        border: 2px solid #d4af37;
        border-radius: 15px;
        padding: 40px;
        text-align: center;
        max-width: 500px;
        box-shadow: 0 20px 60px rgba(212, 175, 55, 0.3);
    }
    
    .message-content p {
        color: #e8e8e8;
        font-size: 20px;
        margin-bottom: 10px;
        font-family: 'Playfair Display', serif;
    }
    
    .message-note {
        font-size: 14px !important;
        color: #a8a8a8 !important;
        font-family: 'Poppins', sans-serif !important;
        margin-top: 20px !important;
    }
    
    .close-msg {
        margin-top: 25px;
        background: #d4af37;
        border: none;
        color: #0a0a0a;
        padding: 12px 30px;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 1px;
        cursor: pointer;
        border-radius: 5px;
        transition: all 0.3s ease;
        font-family: 'Poppins', sans-serif;
    }
    
    .close-msg:hover {
        transform: scale(1.05);
        box-shadow: 0 5px 20px rgba(212, 175, 55, 0.5);
    }
`;
document.head.appendChild(style);

// === PARALLAX EFFECT ON HERO ===
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled * 0.002);
    }
});

// === NAVBAR BACKGROUND ON SCROLL ===
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// === CURSOR GLOW EFFECT (Optional - Advanced) ===
let glowTimeout;
document.addEventListener('mousemove', function(e) {
    // Throttle the glow effect
    clearTimeout(glowTimeout);
    glowTimeout = setTimeout(() => {
        const glow = document.createElement('div');
        glow.style.position = 'fixed';
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
        glow.style.width = '200px';
        glow.style.height = '200px';
        glow.style.background = 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)';
        glow.style.pointerEvents = 'none';
        glow.style.transform = 'translate(-50%, -50%)';
        glow.style.zIndex = '0';
        glow.style.transition = 'opacity 0.3s ease';
        
        document.body.appendChild(glow);
        
        setTimeout(() => {
            glow.style.opacity = '0';
            setTimeout(() => glow.remove(), 300);
        }, 100);
    }, 50);
});

// === CONSOLE MESSAGE (Easter Egg) ===
console.log('%c🖤 Whisper Vault 🖤', 'font-size: 20px; color: #d4af37; font-weight: bold;');
console.log('%cYour secrets are safe here...', 'font-size: 14px; color: #e8e8e8;');
console.log('%cBuilt with love and shadows 🌙', 'font-size: 12px; color: #a8a8a8;');

// === KEYBOARD SHORTCUTS (Easter Egg) ===
document.addEventListener('keydown', function(e) {
    // Press 'V' to enter vault directly
    if (e.key === 'v' || e.key === 'V') {
        console.log('Quick access: Vault mode activated! 🖤');
    }
});
