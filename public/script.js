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

    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

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