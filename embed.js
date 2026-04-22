// Ozford Chatbot Embed Script
(function () {
  var CHATBOT_URL = 'https://abhij9920.github.io/Ozford-Chatbot/';
  var isOpen = false;

  // Inject styles
  var style = document.createElement('style');
  style.textContent = [
    '#oz-embed-bubble {',
    '  position: fixed; bottom: 28px; right: 28px;',
    '  width: 62px; height: 62px; border-radius: 50%;',
    '  background: #003366; border: none; cursor: pointer;',
    '  display: flex; align-items: center; justify-content: center;',
    '  box-shadow: 0 4px 18px rgba(0,51,102,0.35);',
    '  z-index: 999999; transition: transform 0.18s;',
    '}',
    '#oz-embed-bubble:hover { transform: scale(1.07); }',
    '#oz-embed-iframe {',
    '  position: fixed; bottom: 100px; right: 28px;',
    '  width: 360px; height: 560px;',
    '  border: none; border-radius: 18px;',
    '  z-index: 999998; display: none;',
    '  box-shadow: 0 8px 40px rgba(0,0,0,0.18);',
    '}',
    '@media (max-width: 420px) {',
    '  #oz-embed-iframe { width: calc(100vw - 16px); right: 8px; bottom: 92px; }',
    '  #oz-embed-bubble { bottom: 16px; right: 16px; }',
    '}'
  ].join('');
  document.head.appendChild(style);

  // Create bubble button directly on the page
  var bubble = document.createElement('button');
  bubble.id = 'oz-embed-bubble';
  bubble.setAttribute('aria-label', 'Open Ozford chat');
  bubble.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';

  // Create iframe (hidden by default)
  var iframe = document.createElement('iframe');
  iframe.id = 'oz-embed-iframe';
  iframe.src = CHATBOT_URL + '?embedded=true';
  iframe.setAttribute('allowtransparency', 'true');
  iframe.setAttribute('scrolling', 'no');
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('title', 'Ozford Chat Assistant');

  bubble.addEventListener('click', function () {
    isOpen = !isOpen;
    iframe.style.display = isOpen ? 'block' : 'none';
    bubble.innerHTML = isOpen
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
  });

  // Listen for close signal from iframe
  window.addEventListener('message', function (e) {
    if (e.data === 'oz-close') {
      isOpen = false;
      iframe.style.display = 'none';
      bubble.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
    }
  });

  document.body.appendChild(bubble);
  document.body.appendChild(iframe);
})();
