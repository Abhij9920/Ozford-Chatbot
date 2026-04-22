// Ozford Chatbot Embed Script
// Replace GITHUB_PAGES_URL with your actual GitHub Pages URL
(function () {
  var CHATBOT_URL = 'https://abhij9920.github.io/Ozford-Chatbot/';

  var iframe = document.createElement('iframe');
  iframe.src = CHATBOT_URL;
  iframe.id = 'ozford-chatbot-frame';
  iframe.style.cssText = [
    'position: fixed',
    'bottom: 0',
    'right: 0',
    'width: 420px',
    'height: 640px',
    'border: none',
    'background: transparent',
    'z-index: 999999',
    'pointer-events: none'
  ].join(';');
  iframe.setAttribute('allowtransparency', 'true');
  iframe.setAttribute('scrolling', 'no');
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('title', 'Ozford Chat Assistant');

  // Enable pointer events once loaded
  iframe.onload = function () {
    iframe.style.pointerEvents = 'all';
  };

  document.body.appendChild(iframe);
})();
