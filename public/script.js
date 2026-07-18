/* ================================
   Mobile Menu Toggle
   ================================ */
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const expanded = mobileMenu.classList.toggle('hidden');
    menuToggle.setAttribute('aria-expanded', !expanded);
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
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

fadeInOnScroll();
window.addEventListener('scroll', fadeInOnScroll);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.hero .fade-in').forEach(el => {
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
let greetingFetched = false;

const toggleChat = () => {
  const isOpen = chatPopup.classList.contains('open');
  chatPopup.classList.toggle('open');
  chatBubble.setAttribute('aria-expanded', !isOpen);
  if (!isOpen && !greetingFetched) {
    greetingFetched = true;
    fetchGreeting();
  }
  if (!isOpen) {
    setTimeout(() => chatInput?.focus(), 200);
  }
};

if (chatBubble && chatPopup && closeChat) {
  chatBubble.addEventListener('click', toggleChat);
  chatBubble.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleChat();
    }
  });
  closeChat.addEventListener('click', toggleChat);
}

const fetchGreeting = async () => {
  try {
    const response = await fetch('/chat/greeting');
    if (response.ok) {
      const data = await response.json();
      if (document.getElementById('chat-greeting')) {
        addMessage('bot', data.greeting, true);
      }
    }
  } catch (e) {
    console.error('Failed to fetch greeting:', e);
  }
};

const addMessage = (sender, message, useTypingEffect = false) => {
  if (sender === 'user') {
    const escapedMessage = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const messageHtml = escapedMessage.replace(/\n/g, '<br>');
    const html = `
      <div class="chat-message justify-end">
        <div class="chat-bubble user"><p>${messageHtml}</p></div>
        <div class="chat-avatar user"><i class="fas fa-user"></i></div>
      </div>
    `;
    chatMessages.insertAdjacentHTML('beforeend', html);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  } else {
    if (useTypingEffect) {
      typeMessage(message);
    } else {
      const messageHtml = marked.parse(message);
      const html = `
        <div class="chat-message">
          <div class="chat-avatar bot"><i class="fas fa-robot"></i></div>
          <div class="chat-bubble bot">${messageHtml}</div>
        </div>
      `;
      chatMessages.insertAdjacentHTML('beforeend', html);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }
};

const typeMessage = (message) => {
  const messageId = 'bot-msg-' + Date.now();
  const html = `
    <div class="chat-message">
      <div class="chat-avatar bot"><i class="fas fa-robot"></i></div>
      <div class="chat-bubble bot">
        <div id="${messageId}"></div><span class="typing-cursor"></span>
      </div>
    </div>
  `;
  chatMessages.insertAdjacentHTML('beforeend', html);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  const messageElement = document.getElementById(messageId);
  let charIndex = 0;
  const speed = 20;

  const typeChar = () => {
    if (charIndex < message.length) {
      const char = message.charAt(charIndex);
      messageElement.textContent += char;
      charIndex++;
      chatMessages.scrollTop = chatMessages.scrollHeight;
      setTimeout(typeChar, speed);
    } else {
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

  const typingHtml = `
    <div id="typing-indicator" class="chat-message">
      <div class="chat-avatar bot"><i class="fas fa-robot"></i></div>
      <div class="chat-bubble bot">
        <div class="typing-indicator">
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
        </div>
      </div>
    </div>
  `;
  chatMessages.insertAdjacentHTML('beforeend', typingHtml);
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
    addMessage('bot', data.response, true);
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
   Dynamic Copyright Year
   ================================ */
const yearEl = document.getElementById('currentYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();
