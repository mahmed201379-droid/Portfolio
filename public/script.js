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

const addMessage = (sender, message) => {
    let messageContainerHtml;

    if (sender === 'user') {
        // Escape user input to prevent XSS and format newlines
        const escapedMessage = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const messageHtml = escapedMessage.replace(/\n/g, '<br>');

        messageContainerHtml = `
            <div class="flex justify-end items-end mb-4 animate-fade-in">
                <div class="bg-blue-100 p-3 rounded-lg rounded-br-none max-w-xs lg:max-w-md">
                    <p class="primary-text">${messageHtml}</p>
                </div>
                <div class="flex-shrink-0 h-8 w-8 rounded-full bg-primary-color flex items-center justify-center ml-3">
                    <i class="fas fa-user text-white text-sm"></i>
                </div>
            </div>
        `;
    } else { // bot
        // Parse markdown for bot responses using the 'marked' library
        const messageHtml = marked.parse(message);

        messageContainerHtml = `
            <div class="flex justify-start items-end mb-4 animate-fade-in">
                <div class="flex-shrink-0 h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                    <i class="fas fa-robot text-gray-600"></i>
                </div>
                <div class="bot-message-content bg-gray-200 text-gray-800 p-3 rounded-lg rounded-bl-none max-w-xs lg:max-w-md">
                    ${messageHtml}
                </div>
            </div>
        `;
    }
    
    chatMessages.insertAdjacentHTML('beforeend', messageContainerHtml);
    chatMessages.scrollTop = chatMessages.scrollHeight;
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
        addMessage('bot', data.response);
        chatHistory.push({ "role": "assistant", "content": data.response });
    } catch (error) {
        console.error('Error with chat API:', error);
        document.getElementById('typing-indicator')?.remove();
        addMessage('bot', 'Sorry, I seem to be having trouble connecting. Please try again later.');
    }
};

if (chatForm) {
    chatForm.addEventListener('submit', handleChatSubmit);
}