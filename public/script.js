/* ================================
   Mobile Menu Toggle
================================ */
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

/* ================================
   Creative Neon Mouse Trail Effect (Canvas-based - Performance Optimized)
================================ */
class NeonTrailCanvas {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.id = 'neon-trail-canvas';
        this.canvas.style.cssText = 'position: fixed; top: 0; left: 0; pointer-events: none; z-index: 0;';
        document.body.insertBefore(this.canvas, document.body.firstChild);
        
        this.trails = [];
        this.maxTrails = 12;
        this.colors = ['#00d9ff', '#a366ff', '#ff006e', '#39ff14'];
        this.mouseX = 0;
        this.mouseY = 0;
        this.throttleMouseMove = true;
        
        this.resize();
        this.init();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        window.addEventListener('resize', () => this.resize());
        
        document.addEventListener('mousemove', (e) => {
            if (this.throttleMouseMove) {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;
                this.createTrail();
                this.throttleMouseMove = false;
                setTimeout(() => { this.throttleMouseMove = true; }, 50);
            }
        });
        
        this.animate();
    }

    createTrail() {
        this.trails.push({
            x: this.mouseX,
            y: this.mouseY,
            life: 100,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            size: Math.random() * 3 + 1.5
        });
        
        if (this.trails.length > this.maxTrails) {
            this.trails.shift();
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = this.trails.length - 1; i >= 0; i--) {
            const trail = this.trails[i];
            trail.life -= 8;
            
            if (trail.life <= 0) {
                this.trails.splice(i, 1);
                continue;
            }
            
            const opacity = trail.life / 100;
            this.ctx.fillStyle = trail.color + Math.floor(opacity * 255).toString(16).padStart(2, '0');
            this.ctx.shadowColor = trail.color;
            this.ctx.shadowBlur = trail.size * 3;
            
            this.ctx.beginPath();
            this.ctx.arc(trail.x, trail.y, trail.size, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize only if not on slow connection
if (navigator.connection?.effectiveType !== '4g' || !navigator.connection) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => new NeonTrailCanvas());
    } else {
        new NeonTrailCanvas();
    }
}

/* ================================
   HACKER VIBE ENHANCEMENTS - Performance Optimized
================================ */

// 1. Boot Sequence Animation on Page Load
const bootSequence = () => {
    const bootMessages = [
        '> INITIALIZING NEURAL.SYS',
        '> LOADING CYBERPUNK.EXE',
        '> ESTABLISHING SECURE CONNECTION...',
        '> NEURAL NETWORK ONLINE',
        '> READY FOR INTERACTION'
    ];
    
    let index = 0;
    const style = document.createElement('style');
    
    const showBootMessage = () => {
        if (index < bootMessages.length) {
            console.log('%c' + bootMessages[index], 'color: #00d9ff; font-weight: bold; font-family: monospace; font-size: 12px;');
            index++;
            setTimeout(showBootMessage, 300);
        }
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showBootMessage);
    } else {
        showBootMessage();
    }
};

bootSequence();

// 2. CRT Scanlines Overlay (CSS-based, very efficient)
const addScanlineEffect = () => {
    const scanlineStyle = document.createElement('style');
    scanlineStyle.textContent = `
        /* Dynamic Scanline Effect */
        body {
            position: relative;
        }
        
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: repeating-linear-gradient(
                0deg,
                rgba(0, 0, 0, 0.15) 0px,
                rgba(0, 0, 0, 0.15) 1px,
                transparent 1px,
                transparent 2px
            );
            pointer-events: none;
            z-index: 999;
            animation: scanline-flicker 0.15s infinite;
        }
        
        @keyframes scanline-flicker {
            0% { opacity: 0.15; }
            50% { opacity: 0.25; }
            100% { opacity: 0.15; }
        }
    `;
    document.head.appendChild(scanlineStyle);
};

addScanlineEffect();

// 3. Random Screen Glitch Effect (low frequency)
const addRandomGlitch = () => {
    setInterval(() => {
        if (Math.random() > 0.92) {
            document.documentElement.style.filter = 'hue-rotate(15deg)';
            setTimeout(() => {
                document.documentElement.style.filter = 'hue-rotate(0deg)';
            }, 80);
        }
    }, 1500);
};

addRandomGlitch();

// 4. Typewriter Effect on Section Headers
const typewriterHeaders = () => {
    document.querySelectorAll('h2').forEach(header => {
        const text = header.textContent;
        if (text.length > 0 && !header.closest('.fade-in')) {
            header.textContent = '';
            header.style.minHeight = '1.5em';
            
            let index = 0;
            const typeChar = () => {
                if (index < text.length) {
                    header.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeChar, 30);
                }
            };
            
            // Trigger on scroll into view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && header.textContent === '') {
                        typeChar();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(header);
        }
    });
};

setTimeout(typewriterHeaders, 500);

// 5. Add HUD Corner Brackets to Key Elements
const addHUDBrackets = () => {
    const hudStyle = document.createElement('style');
    hudStyle.textContent = `
        .hud-target {
            position: relative;
        }
        
        .hud-target::before,
        .hud-target::after {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            border: 2px solid var(--neon-cyan);
            animation: hud-pulse 1.5s ease-in-out infinite;
        }
        
        .hud-target::before {
            top: -8px;
            left: -8px;
            border-right: none;
            border-bottom: none;
        }
        
        .hud-target::after {
            bottom: -8px;
            right: -8px;
            border-left: none;
            border-top: none;
        }
        
        @keyframes hud-pulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
        }
    `;
    document.head.appendChild(hudStyle);
    
    // Apply to hero and main project cards
    document.querySelectorAll('.hero-content, .project-card:first-of-type').forEach(el => {
        el.classList.add('hud-target');
    });
};

setTimeout(addHUDBrackets, 1000);

// 6. Glitch Text Effect on Hover for Project Cards
const addTextGlitch = () => {
    document.querySelectorAll('.project-card h3').forEach(card => {
        const originalText = card.textContent;
        
        card.addEventListener('mouseenter', function() {
            let glitchCount = 0;
            const glitchDuration = 8; // More glitch iterations
            
            const glitchInterval = setInterval(() => {
                if (glitchCount < glitchDuration) {
                    // Create completely random characters for glitch effect
                    const glitchText = originalText.split('').map(() => {
                        const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
                        return chars.charAt(Math.floor(Math.random() * chars.length));
                    }).join('');
                    this.textContent = glitchText;
                    glitchCount++;
                } else {
                    // Always restore original text
                    this.textContent = originalText;
                    clearInterval(glitchInterval);
                }
            }, 80);
        });
        
        // Ensure original text is always displayed on mouseleave
        card.addEventListener('mouseleave', function() {
            this.textContent = originalText;
        });
    });
};

setTimeout(addTextGlitch, 800);

// 7. Add Data Stream Animation to Background
const addDataStream = () => {
    const dataStyle = document.createElement('style');
    dataStyle.textContent = `
        @keyframes data-flow {
            0% { transform: translateY(-100%); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(100%); opacity: 0; }
        }
        
        .data-stream {
            position: fixed;
            right: 20px;
            top: 0;
            font-family: 'Courier New', monospace;
            font-size: 10px;
            color: var(--neon-green);
            opacity: 0.3;
            pointer-events: none;
            white-space: nowrap;
            mix-blend-mode: screen;
            z-index: 1;
            animation: data-flow 8s linear infinite;
        }
    `;
    document.head.appendChild(dataStyle);
};

addDataStream();

// 8. Interactive Element Highlight on Focus
const addFocusGlow = () => {
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        input:focus,
        textarea:focus,
        select:focus {
            box-shadow: 0 0 20px rgba(0, 217, 255, 0.6), inset 0 0 10px rgba(0, 217, 255, 0.2) !important;
            border-color: var(--neon-cyan) !important;
        }
        
        button:hover,
        a:hover {
            text-shadow: 0 0 10px rgba(0, 217, 255, 0.8);
        }
    `;
    document.head.appendChild(focusStyle);
};

addFocusGlow();

// 9. Pixel Corruption Effect on Random Elements
const addPixelNoise = () => {
    const noiseCanvas = document.createElement('canvas');
    noiseCanvas.width = 100;
    noiseCanvas.height = 100;
    const ctx = noiseCanvas.getContext('2d');
    
    for (let i = 0; i < 100; i++) {
        ctx.fillStyle = `rgba(0, 217, 255, ${Math.random() * 0.3})`;
        ctx.fillRect(
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 10,
            Math.random() * 10
        );
    }
    
    const noiseStyle = document.createElement('style');
    noiseStyle.textContent = `
        .project-card {
            background-image: url('${noiseCanvas.toDataURL()}');
            background-size: 200px;
            background-attachment: fixed;
            background-blend-mode: overlay;
        }
    `;
    document.head.appendChild(noiseStyle);
};

setTimeout(addPixelNoise, 1200);

// 10. Signal Strength Indicator Animation
const addSignalIndicator = () => {
    const html = `
        <div id="signal-strength" style="
            position: fixed;
            bottom: 20px;
            left: 20px;
            display: flex;
            gap: 3px;
            z-index: 100;
            opacity: 0.4;
        ">
            <div style="width: 3px; height: 8px; background: var(--neon-green); animation: signal-bar 0.6s ease-in-out infinite;"></div>
            <div style="width: 3px; height: 12px; background: var(--neon-green); animation: signal-bar 0.6s ease-in-out infinite 0.1s;"></div>
            <div style="width: 3px; height: 16px; background: var(--neon-green); animation: signal-bar 0.6s ease-in-out infinite 0.2s;"></div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
    
    const signalStyle = document.createElement('style');
    signalStyle.textContent = `
        @keyframes signal-bar {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
        }
    `;
    document.head.appendChild(signalStyle);
};

setTimeout(addSignalIndicator, 1500);

/* ================================
   Back to Top Button
================================ */
const backToTopButton = document.getElementById('backToTop');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ================================
   Smooth Scrolling for Nav Links
================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

/* ================================
   Fade-in Animations on Scroll
================================ */
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('is-visible');
        }
    });
};

// Initial check
fadeInOnScroll();

// Check on scroll
window.addEventListener('scroll', fadeInOnScroll);

// Handle initial hero fade-in
document.addEventListener('DOMContentLoaded', () => {
    // Show hero fade-in immediately
    document.querySelectorAll('.hero-content .fade-in').forEach(el => {
        el.classList.add('is-visible');
    });
});

/* ================================
   Chatbot
================================ */
const chatBubble = document.getElementById('chat-bubble');
const chatPopup = document.getElementById('chat-popup');
const closeChat = document.getElementById('close-chat');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

let chatHistory = [];

const toggleChat = () => {
    chatPopup.classList.toggle('hidden');
};

if (chatBubble && chatPopup && closeChat) {
    chatBubble.addEventListener('click', toggleChat);
    closeChat.addEventListener('click', toggleChat);
}

const addMessage = (sender, message, useTypingEffect = false) => {
    if (sender === 'user') {
        // Escape user input to prevent XSS and format newlines
        const escapedMessage = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const messageHtml = escapedMessage.replace(/\n/g, '<br>');

        const messageContainerHtml = `
            <div class="flex justify-end items-end mb-4 animate-fade-in">
                <div class="user-message-content p-3 rounded-lg rounded-br-none max-w-xs lg:max-w-md">
                    <p style="color: var(--neon-cyan); margin: 0;">${messageHtml}</p>
                </div>
                <div class="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ml-3" style="background: linear-gradient(135deg, var(--neon-cyan), var(--neon-purple)); box-shadow: 0 0 15px rgba(0, 217, 255, 0.5);">
                    <i class="fas fa-user text-white text-sm"></i>
                </div>
            </div>
        `;
        chatMessages.insertAdjacentHTML('beforeend', messageContainerHtml);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    } else { // bot
        if (useTypingEffect) {
            typeMessage(message);
        } else {
            const messageHtml = marked.parse(message);
            const messageContainerHtml = `
                <div class="flex justify-start items-end mb-4 animate-fade-in">
                    <div class="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mr-3" style="background: linear-gradient(135deg, rgba(0, 217, 255, 0.3), rgba(163, 102, 255, 0.3)); border: 1px solid var(--neon-cyan); box-shadow: 0 0 15px rgba(0, 217, 255, 0.4);">
                        <i class="fas fa-robot" style="color: var(--neon-cyan);"></i>
                    </div>
                    <div class="bot-message-content p-3 rounded-lg rounded-bl-none max-w-xs lg:max-w-md">
                        ${messageHtml}
                    </div>
                </div>
            `;
            chatMessages.insertAdjacentHTML('beforeend', messageContainerHtml);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
};

// Typing effect function
const typeMessage = (message) => {
    const messageId = 'bot-msg-' + Date.now();
    const messageContainerHtml = `
        <div class="flex justify-start items-end mb-4 animate-fade-in">
            <div class="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mr-3" style="background: linear-gradient(135deg, rgba(0, 217, 255, 0.3), rgba(163, 102, 255, 0.3)); border: 1px solid var(--neon-cyan); box-shadow: 0 0 15px rgba(0, 217, 255, 0.4);">
                <i class="fas fa-robot" style="color: var(--neon-cyan);"></i>
            </div>
            <div class="bot-message-content p-3 rounded-lg rounded-bl-none max-w-xs lg:max-w-md">
                <div id="${messageId}"></div><span class="typing-cursor"></span>
            </div>
        </div>
    `;
    chatMessages.insertAdjacentHTML('beforeend', messageContainerHtml);
    
    const messageElement = document.getElementById(messageId);
    let charIndex = 0;
    const speed = 20; // milliseconds per character
    
    const typeChar = () => {
        if (charIndex < message.length) {
            const char = message.charAt(charIndex);
            messageElement.textContent += char;
            charIndex++;
            chatMessages.scrollTop = chatMessages.scrollHeight;
            setTimeout(typeChar, speed);
        } else {
            // Remove cursor and parse markdown after typing complete
            const cursor = messageElement.parentElement.querySelector('.typing-cursor');
            if (cursor) cursor.remove();
            const fullHtml = marked.parse(message);
            messageElement.parentElement.innerHTML = fullHtml;
        }
    };
    
    typeChar();
};

const handleChatSubmit = async (e) => {
    e.preventDefault();
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    addMessage('user', userMessage);
    chatInput.value = '';
    
    chatHistory.push({ "role": "user", "content": userMessage });

    const typingIndicatorHtml = `
        <div id="typing-indicator" class="flex justify-start items-end mb-4 animate-fade-in">
            <div class="flex-shrink-0 h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                <i class="fas fa-robot text-gray-600"></i>
            </div>
            <div class="bg-gray-200 text-gray-800 p-3 rounded-lg rounded-bl-none">
                <div class="flex items-center justify-center space-x-1 h-5">
                    <span class="typing-dot"></span>
                    <span class="typing-dot" style="animation-delay: 0.2s;"></span>
                    <span class="typing-dot" style="animation-delay: 0.4s;"></span>
                </div>
            </div>
        </div>
    `;
    chatMessages.insertAdjacentHTML('beforeend', typingIndicatorHtml);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage, history: chatHistory.slice(0, -1) }),
        });

        if (!response.ok) throw new Error('Network response was not ok.');

        const data = await response.json();
        document.getElementById('typing-indicator')?.remove();
        addMessage('bot', data.response, true); // Enable typing effect
        chatHistory.push({ "role": "assistant", "content": data.response });
    } catch (error) {
        console.error('Error with chat API:', error);
        document.getElementById('typing-indicator')?.remove();
        addMessage('bot', 'Sorry, I seem to be having trouble connecting. Please try again later.', true);
    }
};

if (chatForm) {
    chatForm.addEventListener('submit', handleChatSubmit);
}

/* ================================
   ENHANCED HACKER EFFECTS
================================ */

// Add glitch effect on page load
window.addEventListener('load', () => {
    document.querySelectorAll('h1, h2, h3').forEach(el => {
        el.style.animation = `glow-flicker 3s ease-in-out infinite`;
    });
});

// Add interactive glitch on hover for headings
document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
    heading.addEventListener('mouseenter', function() {
        this.style.animation = `digital-glitch 0.6s ease-out`;
    });
    heading.addEventListener('mouseleave', function() {
        this.style.animation = `glow-flicker 3s ease-in-out infinite`;
    });
});

// Add random data corruption effect on project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const randomNum = Math.floor(Math.random() * 3);
        this.style.filter = `hue-rotate(${randomNum * 15}deg) brightness(${1 + randomNum * 0.05})`;
    });
    card.addEventListener('mouseleave', function() {
        this.style.filter = 'hue-rotate(0deg) brightness(1)';
    });
});

// Add terminal cursor effect
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .terminal-command::after {
        animation: terminal-blink 1s infinite;
    }
`;
document.head.appendChild(cursorStyle);

// Random scanline intensity variation
setInterval(() => {
    const scanlines = document.querySelectorAll('body::after');
    const opacity = 0.3 + Math.random() * 0.2;
    document.body.style.setProperty('--scanline-opacity', opacity);
}, 3000);

// Add digital rain effect to footer on hover
const footer = document.querySelector('footer');
if (footer) {
    footer.addEventListener('mouseenter', function() {
        this.style.textShadow = '0 0 10px rgba(0, 217, 255, 0.5)';
    });
    footer.addEventListener('mouseleave', function() {
        this.style.textShadow = 'none';
    });
}

// Add system status indicator animation
document.querySelectorAll('.system-status').forEach(status => {
    setInterval(() => {
        const colors = ['var(--neon-green)', 'var(--neon-cyan)', 'var(--neon-purple)'];
        status.style.color = colors[Math.floor(Math.random() * colors.length)];
    }, 2000);
});

// Binary digital rain effect
function createRainEffect() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-rain';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    canvas.style.opacity = '0.2';
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d', { alpha: true });
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    const chars = '01';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00d9ff';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            ctx.fillText(text, x, y);
            
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 50);
}

// Initialize rain effect after page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createRainEffect);
} else {
    createRainEffect();
}