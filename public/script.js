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
   Chatbot (ByteBuddy)
   ================================ */
const chatBubble = document.getElementById('chat-bubble');
const chatPopup = document.getElementById('chat-popup');
const closeChat = document.getElementById('close-chat');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');
const sendBtn = chatForm?.querySelector('button[type="submit"]');

let chatHistory = [];
let isRequestActive = false;
let requestController = null;

const GREETING_MESSAGE = "Hello! I'm **ByteBuddy**, Md Sayem Ahamed's personal AI assistant. Ask me anything about his skills, projects, or experience — I'm here to help!";
const PLACEHOLDER_TEXT = "Ask about Sayem's research, projects or experience.";
const MAX_HISTORY = 20;
const REQUEST_TIMEOUT_MS = 25000;

function sanitizeHistory(history) {
  return history
    .filter(h => h && typeof h.content === 'string')
    .map(h => ({
      role: h.role === 'assistant' ? 'assistant' : 'user',
      content: h.content.slice(0, 1200)
    }))
    .slice(-MAX_HISTORY);
}

function setLoadingState(loading) {
  isRequestActive = loading;
  if (chatInput) chatInput.disabled = loading;
  if (sendBtn) {
    sendBtn.disabled = loading;
    sendBtn.setAttribute('aria-busy', loading);
  }
  chatForm?.classList.toggle('loading', loading);
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#039;');
}

function addMessage(sender, message, useTypingEffect = false) {
  const safeMessage = escapeHtml(message);
  const messageHtml = marked.parse(safeMessage);

  if (sender === 'user') {
    const html = `
      <div class="chat-message justify-end">
        <div class="chat-bubble user"><p>${safeMessage.replace(/\n/g, '<br>')}</p></div>
        <div class="chat-avatar user"><i class="fas fa-user"></i></div>
      </div>
    `;
    chatMessages.insertAdjacentHTML('beforeend', html);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  } else {
    if (useTypingEffect) {
      typeMessage(messageHtml);
    } else {
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
}

function typeMessage(messageHtml) {
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
  if (!messageElement) return;

  let charIndex = 0;
  const speed = 15;
  const plainText = messageElement.textContent || '';

  const typeChar = () => {
    if (charIndex < plainText.length) {
      messageElement.textContent += plainText.charAt(charIndex);
      charIndex++;
      chatMessages.scrollTop = chatMessages.scrollHeight;
      setTimeout(typeChar, speed);
    } else {
      const cursor = messageElement.parentElement.querySelector('.typing-cursor');
      if (cursor) cursor.remove();
      messageElement.innerHTML = messageHtml;
    }
  };
  typeChar();
}

function showError(message) {
  const html = `
    <div class="chat-message">
      <div class="chat-avatar bot"><i class="fas fa-robot"></i></div>
      <div class="chat-bubble bot error">${escapeHtml(message)}</div>
    </div>
  `;
  chatMessages.insertAdjacentHTML('beforeend', html);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
  document.getElementById('typing-indicator')?.remove();
}

function showTypingIndicator() {
  const html = `
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
  chatMessages.insertAdjacentHTML('beforeend', html);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

const toggleChat = () => {
  const isOpen = chatPopup.classList.contains('open');
  chatPopup.classList.toggle('open');
  chatBubble.setAttribute('aria-expanded', !isOpen);
  if (!isOpen && chatMessages.children.length === 0) {
    addMessage('bot', GREETING_MESSAGE, true);
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

const handleChatSubmit = async (e) => {
  e.preventDefault();
  if (isRequestActive) return;

  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  addMessage('user', userMessage);
  chatInput.value = '';
  chatHistory.push({ role: 'user', content: userMessage });

  setLoadingState(true);
  showTypingIndicator();

  requestController = new AbortController();
  const timeoutId = setTimeout(() => requestController.abort(), REQUEST_TIMEOUT_MS);

  try {
    const sanitizedHistory = sanitizeHistory(chatHistory.slice(0, -1));
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage, history: sanitizedHistory }),
      signal: requestController.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      if (response.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      }
      if (response.status >= 500) {
        throw new Error('The assistant is temporarily unavailable. Please try again later.');
      }
      throw new Error(errData.error || 'Something went wrong. Please try again.');
    }

    const data = await response.json();
    removeTypingIndicator();

    if (data.answer) {
      addMessage('bot', data.answer, true);
      chatHistory.push({ role: 'assistant', content: data.answer });
      chatHistory = chatHistory.slice(-MAX_HISTORY);
    } else {
      showError('Received an empty response. Please try again.');
    }
  } catch (error) {
    clearTimeout(timeoutId);
    removeTypingIndicator();

    if (error.name === 'AbortError') {
      showError('The request timed out. Please try again.');
    } else if (error instanceof TypeError && error.message.includes('fetch')) {
      showError('Network error. Please check your connection and try again.');
    } else {
      console.error('Chat error:', error);
      showError(error.message || 'Something went wrong. Please try again.');
    }
  } finally {
    setLoadingState(false);
    requestController = null;
  }
};

if (chatForm) {
  chatForm.addEventListener('submit', handleChatSubmit);
}

if (chatInput) {
  chatInput.placeholder = PLACEHOLDER_TEXT;
}

/* ================================
   Dynamic Copyright Year
   ================================ */
const yearEl = document.getElementById('currentYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();