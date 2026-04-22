// Ozford Chatbot Embed Script
(function () {
  var CHATBOT_URL = 'https://abhij9920.github.io/Ozford-Chatbot/';

  var iframe = document.createElement('iframe');
  iframe.src = CHATBOT_URL;
  iframe.id = 'ozford-chatbot-frame';
  iframe.style.cssText = [
    'position: fixed',
    'bottom: 0',
    'right: 0',
    'width: 100px',
    'height: 100px',
    'border: none',
    'background: transparent',
    'z-index: 999999',
    'overflow: hidden',
    'transition: width 0.3s, height 0.3s'
  ].join(';');
  iframe.setAttribute('allowtransparency', 'true');
  iframe.setAttribute('scrolling', 'no');
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('title', 'Ozford Chat Assistant');

  // Listen for messages from the iframe to resize it
  window.addEventListener('message', function(e) {
    if (e.data === 'oz-open') {
      iframe.style.width = window.innerWidth <= 420 ? '100vw' : '460px';
      iframe.style.height = '680px';
    }
    if (e.data === 'oz-close') {
      iframe.style.width = '100px';
      iframe.style.height = '100px';
    }
  });

  document.body.appendChild(iframe);
})();
