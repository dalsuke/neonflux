const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.2 }
);

reveals.forEach((el) => observer.observe(el));

const faqButtons = document.querySelectorAll('.faq-question');
faqButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    item.classList.toggle('active');
  });
});

const supportFab = document.getElementById('supportFab');
const supportPanel = document.getElementById('supportPanel');
const supportClose = document.getElementById('supportClose');

const toggleSupport = (open) => {
  if (!supportPanel) return;
  supportPanel.classList.toggle('open', open);
  supportPanel.setAttribute('aria-hidden', String(!open));
};

if (supportFab && supportPanel) {
  supportFab.addEventListener('click', () => {
    const isOpen = supportPanel.classList.contains('open');
    toggleSupport(!isOpen);
  });
}

if (supportClose) {
  supportClose.addEventListener('click', () => toggleSupport(false));
}

const countdownEl = document.getElementById('countdown');
const countdownWrap = document.querySelector('[data-countdown]');

if (countdownEl && countdownWrap) {
  const target = new Date(countdownWrap.dataset.countdown).getTime();
  const tick = () => {
    const now = Date.now();
    const diff = Math.max(target - now, 0);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    countdownEl.textContent = `${String(days).padStart(2, '0')}d ${String(hours).padStart(2, '0')}h ${String(mins).padStart(2, '0')}m ${String(secs).padStart(2, '0')}s`;
  };
  tick();
  setInterval(tick, 1000);
}


const openChatButtons = document.querySelectorAll('.open-chat-btn');
const chatModal = document.getElementById('chatModal');
const chatClose = document.getElementById('chatClose');
const chatForm = document.getElementById('chatForm');
const chatText = document.getElementById('chatText');
const chatBody = document.getElementById('chatBody');

const toggleChat = (open) => {
  if (!chatModal) return;
  chatModal.classList.toggle('open', open);
  chatModal.setAttribute('aria-hidden', String(!open));
  if (open && chatText) chatText.focus();
};

if (openChatButtons.length) {
  openChatButtons.forEach((btn) => {
    btn.addEventListener('click', () => toggleChat(true));
  });
}

if (chatClose) {
  chatClose.addEventListener('click', () => toggleChat(false));
}

if (chatModal) {
  chatModal.addEventListener('click', (event) => {
    if (event.target === chatModal) toggleChat(false);
  });
}

let supportAutoSent = false;

if (chatForm && chatText && chatBody) {
  chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = chatText.value.trim();
    if (!value) return;
    const msg = document.createElement('div');
    msg.className = 'chat-msg outgoing';
    msg.textContent = value;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
    chatText.value = '';

    if (!supportAutoSent) {
      supportAutoSent = true;
      const reply = document.createElement('div');
      reply.className = 'chat-msg incoming';
      reply.textContent =
        'Спасибо за обращение! Переключаем на оператора, пожалуйста, оставайтесь на связи.';
      setTimeout(() => {
        chatBody.appendChild(reply);
        chatBody.scrollTop = chatBody.scrollHeight;
      }, 700);
    }
  });
}
