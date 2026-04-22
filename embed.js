(function () {
  var isOpen = false;

  // ── Styles ──
  var style = document.createElement('style');
  style.textContent = `
    #oz-bubble {
      position: fixed; bottom: 24px; right: 24px;
      width: 60px; height: 60px; border-radius: 50%;
      background: #003366; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 18px rgba(0,51,102,0.4);
      z-index: 2147483647;
      transition: transform 0.18s, background 0.18s;
      -webkit-tap-highlight-color: transparent;
    }
    #oz-bubble:hover { background: #004080; transform: scale(1.07); }
    #oz-panel {
      position: fixed; bottom: 96px; right: 24px;
      width: 340px; max-height: 520px;
      background: #fff; border-radius: 16px;
      box-shadow: 0 8px 40px rgba(0,0,0,0.18);
      display: flex; flex-direction: column; overflow: hidden;
      z-index: 2147483646;
      transform: scale(0.9) translateY(20px); opacity: 0;
      pointer-events: none;
      transition: transform 0.22s cubic-bezier(.4,0,.2,1), opacity 0.22s;
    }
    #oz-panel.oz-open {
      transform: scale(1) translateY(0); opacity: 1; pointer-events: all;
    }
    #oz-header {
      background: #003366; color: #fff;
      padding: 13px 15px; display: flex; align-items: center;
      gap: 10px; flex-shrink: 0;
    }
    #oz-header-avatar {
      width: 36px; height: 36px; border-radius: 50%;
      background: rgba(255,255,255,0.15);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    #oz-header-info { flex: 1; }
    #oz-header-info strong { display: block; font-size: 13.5px; font-weight: 600; font-family: sans-serif; }
    #oz-header-info span { font-size: 11px; opacity: 0.75; font-family: sans-serif; }
    #oz-dot { display:inline-block; width:7px; height:7px; background:#4ade80; border-radius:50%; margin-right:4px; vertical-align:middle; }
    #oz-msgs {
      flex: 1; overflow-y: auto; padding: 14px 12px;
      display: flex; flex-direction: column; gap: 10px;
      background: #f4f6f9; min-height: 0;
    }
    .oz-msg { max-width: 84%; font-size: 13px; line-height: 1.55; word-break: break-word; font-family: sans-serif; }
    .oz-msg.bot { align-self: flex-start; }
    .oz-msg.usr { align-self: flex-end; }
    .oz-bub-bot {
      background: #fff; color: #1a1a1a;
      padding: 9px 12px; border-radius: 4px 14px 14px 14px;
      border: 1px solid #e5e7eb;
    }
    .oz-bub-usr {
      background: #003366; color: #fff;
      padding: 9px 12px; border-radius: 14px 14px 4px 14px;
    }
    .oz-bub-bot a { color: #003366; font-weight: 500; }
    #oz-btns {
      padding: 8px 12px 6px; display: flex; flex-wrap: wrap;
      gap: 6px; background: #f4f6f9; flex-shrink: 0;
    }
    .oz-btn {
      background: #fff; border: 1.5px solid #003366; color: #003366;
      border-radius: 20px; padding: 6px 12px; font-size: 12px;
      cursor: pointer; font-family: sans-serif; font-weight: 500;
      -webkit-tap-highlight-color: transparent;
      transition: background 0.15s, color 0.15s;
      touch-action: manipulation;
    }
    .oz-btn:hover, .oz-btn:active { background: #003366; color: #fff; }
    #oz-foot {
      padding: 8px 12px 12px; background: #f4f6f9;
      border-top: 1px solid #e5e7eb; flex-shrink: 0;
      text-align: center; font-size: 11px; color: #999; font-family: sans-serif;
    }
    #oz-foot a { color: #003366; }
    .oz-typing { display:flex; align-items:center; gap:4px; padding: 9px 12px; }
    .oz-typing span { width:6px; height:6px; background:#ccc; border-radius:50%; animation: ozb 1.2s infinite; }
    .oz-typing span:nth-child(2){animation-delay:.2s}
    .oz-typing span:nth-child(3){animation-delay:.4s}
    @keyframes ozb { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }
    @media(max-width:400px){
      #oz-panel { width: calc(100vw - 16px); right: 8px; bottom: 86px; }
      #oz-bubble { bottom: 16px; right: 16px; }
    }
  `;
  document.head.appendChild(style);

  // ── Data ──
  var DATA = {
    welcome: {
      text: "👋 Hi there! Welcome to Ozford Institute. I'm here to help you with information about our courses, admissions, and more.\n\nWhat would you like to know?",
      replies: ["📚 Courses offered","🎓 How to apply","💰 Fees & payment","📍 Location & campus","📞 Contact us","🌏 International students"]
    },
    nodes: {
      "📚 Courses offered": { text: "Which level are you interested in?", replies: ["🎓 Postgraduate courses","📖 Undergraduate courses","🔙 Back to start"] },
      "🎓 Postgraduate courses": { text: "Our postgraduate programs include:\n\n• <a href='https://ozford.edu.au/study/postgraduate/master-of-information-technology/' target='_blank'>Master of Information Technology (MIT)</a>\n• <a href='https://ozford.edu.au/study/postgraduate/master-of-business-administration/' target='_blank'>Master of Business Administration (MBA)</a>\n• <a href='https://ozford.edu.au/study/postgraduate/master-of-professional-accounting/' target='_blank'>Master of Professional Accounting (MPA)</a>\n• <a href='https://ozford.edu.au/study/postgraduate/graduate-diploma-in-information-technology/' target='_blank'>Graduate Diploma in IT</a>\n• <a href='https://ozford.edu.au/study/postgraduate/graduate-diploma-in-management/' target='_blank'>Graduate Diploma in Management</a>\n• <a href='https://ozford.edu.au/study/postgraduate/graduate-certificate-in-information-technology/' target='_blank'>Graduate Certificate in IT</a>\n• <a href='https://ozford.edu.au/study/postgraduate/graduate-certificate-in-management/' target='_blank'>Graduate Certificate in Management</a>\n\nClick any course to learn more.", replies: ["🎓 How to apply","💰 Fees & payment","🔙 Back to courses"] },
      "📖 Undergraduate courses": { text: "Our undergraduate programs include:\n\n• <a href='https://ozford.edu.au/study/undergraduate/bachelor-of-cyber-security/' target='_blank'>Bachelor of Cyber Security</a>\n• <a href='https://ozford.edu.au/study/undergraduate/bachelor-of-information-systems/' target='_blank'>Bachelor of Information Systems</a>\n• <a href='https://ozford.edu.au/study/undergraduate/bachelor-of-business-accounting/' target='_blank'>Bachelor of Business (Accounting)</a>\n• <a href='https://ozford.edu.au/study/undergraduate/bachelor-of-business/' target='_blank'>Bachelor of Business</a>\n• <a href='https://ozford.edu.au/study/undergraduate/diploma-of-business/' target='_blank'>Diploma of Business</a>", replies: ["🎓 How to apply","💰 Fees & payment","🔙 Back to courses"] },
      "🔙 Back to courses": { text: "Which level are you interested in?", replies: ["🎓 Postgraduate courses","📖 Undergraduate courses","🔙 Back to start"] },
      "🎓 How to apply": { text: "Are you a domestic or international student?", replies: ["🏠 Domestic student","🌏 International student","🔙 Back to start"] },
      "🏠 Domestic student": { text: "To apply as a domestic student:\n\n1. Prepare your documents (transcripts, ID, etc.)\n2. Visit our <a href='https://ozford.edu.au/admissions/how-to-apply/domestic-student/' target='_blank'>Domestic Application page</a>\n3. Register and complete your application\n\n📋 Check <a href='https://ozford.edu.au/admissions/entry-requirements/higher-education/' target='_blank'>Entry Requirements</a> before applying.", replies: ["💰 Fees & payment","📅 Intakes & dates","📞 Contact us","🔙 Back to start"] },
      "🌏 International students": { text: "Ozford warmly welcomes international students!\n\n• Apply via our <a href='https://ozford.edu.au/admissions/how-to-apply/international-student/' target='_blank'>International Application page</a>\n• Melbourne & Brisbane campuses available\n• <a href='https://ozford.edu.au/admissions/accommodation/' target='_blank'>Accommodation support</a>\n• <a href='https://ozford.edu.au/about/authorized-agents/' target='_blank'>Find an authorised agent</a>", replies: ["💰 Fees & payment","📅 Intakes & dates","📞 Contact us","🔙 Back to start"] },
      "🌏 International student": { text: "Ozford warmly welcomes international students!\n\n• Apply via our <a href='https://ozford.edu.au/admissions/how-to-apply/international-student/' target='_blank'>International Application page</a>\n• Melbourne & Brisbane campuses available\n• <a href='https://ozford.edu.au/admissions/accommodation/' target='_blank'>Accommodation support</a>\n• <a href='https://ozford.edu.au/about/authorized-agents/' target='_blank'>Find an authorised agent</a>", replies: ["💰 Fees & payment","📅 Intakes & dates","📞 Contact us","🔙 Back to start"] },
      "💰 Fees & payment": { text: "For 2026 fee information visit our <a href='https://ozford.edu.au/admissions/fees/' target='_blank'>Fees page</a>.\n\nPayment options:\n• Online payment\n• Bank transfer\n• FEE-HELP (eligible domestic students)\n\n📅 <a href='https://ozford.edu.au/admissions/fees/#payment_due_dates' target='_blank'>Payment Due Dates</a>\n💳 <a href='https://ozford.edu.au/admissions/fees/#payment_methods' target='_blank'>Payment Methods</a>", replies: ["ℹ️ FEE-HELP info","📅 Intakes & dates","🔙 Back to start"] },
      "ℹ️ FEE-HELP info": { text: "FEE-HELP is a government loan for eligible domestic students.\n\n📋 Visit our <a href='https://ozford.edu.au/admissions/fees/#fee_help' target='_blank'>FEE-HELP page</a> or contact:\n\n📧 admissions@ozford.edu.au\n📞 +61 3 8663 7188", replies: ["💰 Fees & payment","📞 Contact us","🔙 Back to start"] },
      "📍 Location & campus": { text: "Ozford has two campuses:\n\n🏢 <b>Melbourne (Head Office)</b>\n333 Queen Street, Melbourne VIC 3000\n\n🏢 <b>Brisbane Campus</b>\n433 Boundary Street, Spring Hill QLD 4000\n\n🕐 Hours: 8:30 AM – 5:00 PM (AEST)", replies: ["📞 Contact us","🌏 International students","🔙 Back to start"] },
      "📞 Contact us": { text: "📞 <b>Phone:</b> +61 3 8663 7188\n📧 <b>Email:</b> info@ozford.edu.au\n📧 <b>Admissions:</b> admissions@ozford.edu.au\n🌐 <a href='https://ozford.edu.au/about/contact-us/' target='_blank'>Contact page</a>\n\n🕐 Mon–Fri, 8:30 AM – 5:00 PM (AEST)", replies: ["🎓 How to apply","📚 Courses offered","🔙 Back to start"] },
      "📅 Intakes & dates": { text: "Ozford has multiple intakes throughout the year.\n\n📅 <a href='https://ozford.edu.au/admissions/intakes/' target='_blank'>View Intakes & Term Dates</a>\n📋 <a href='https://ozford.edu.au/admissions/orientations/' target='_blank'>View Orientations</a>", replies: ["🎓 How to apply","💰 Fees & payment","🔙 Back to start"] },
      "🔙 Back to start": { text: "What else can I help you with?", replies: ["📚 Courses offered","🎓 How to apply","💰 Fees & payment","📍 Location & campus","📞 Contact us","🌏 International students"] }
    }
  };

  // ── Build HTML ──
  var bubble = document.createElement('button');
  bubble.id = 'oz-bubble';
  bubble.setAttribute('aria-label','Open Ozford chat');
  bubble.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';

  var panel = document.createElement('div');
  panel.id = 'oz-panel';
  panel.innerHTML = `
    <div id="oz-header">
      <div id="oz-header-avatar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
      </div>
      <div id="oz-header-info">
        <strong>Ozford Assistant</strong>
        <span><span id="oz-dot"></span>Online — here to help</span>
      </div>
    </div>
    <div id="oz-msgs"></div>
    <div id="oz-btns"></div>
    <div id="oz-foot">Ozford Institute · <a href="https://ozford.edu.au/about/contact-us/" target="_blank">Contact Us</a></div>
  `;

  document.body.appendChild(panel);
  document.body.appendChild(bubble);

  var msgsEl = panel.querySelector('#oz-msgs');
  var btnsEl = panel.querySelector('#oz-btns');
  var started = false;

  bubble.addEventListener('click', function() {
    isOpen = !isOpen;
    panel.classList.toggle('oz-open', isOpen);
    bubble.innerHTML = isOpen
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
    if (isOpen && !started) { started = true; addBot(DATA.welcome.text, DATA.welcome.replies); }
  });

  function addBot(text, replies) {
    var t = document.createElement('div');
    t.className = 'oz-msg bot';
    t.innerHTML = '<div class="oz-bub-bot"><div class="oz-typing"><span></span><span></span><span></span></div></div>';
    msgsEl.appendChild(t); scroll();
    setTimeout(function() {
      t.remove();
      var m = document.createElement('div');
      m.className = 'oz-msg bot';
      var b = document.createElement('div');
      b.className = 'oz-bub-bot';
      b.innerHTML = text.replace(/\n/g,'<br>');
      m.appendChild(b); msgsEl.appendChild(m);
      setReplies(replies); scroll();
    }, 600);
  }

  function addUser(text) {
    btnsEl.innerHTML = '';
    var m = document.createElement('div');
    m.className = 'oz-msg usr';
    var b = document.createElement('div');
    b.className = 'oz-bub-usr';
    b.textContent = text;
    m.appendChild(b); msgsEl.appendChild(m); scroll();
  }

  function setReplies(replies) {
    btnsEl.innerHTML = '';
    replies.forEach(function(r) {
      var btn = document.createElement('button');
      btn.className = 'oz-btn';
      btn.textContent = r;
      btn.addEventListener('click', function() {
        addUser(r);
        var node = DATA.nodes[r];
        if (node) addBot(node.text, node.replies);
        else addBot("Please contact us at info@ozford.edu.au or +61 3 8663 7188", ["🔙 Back to start"]);
      });
      btnsEl.appendChild(btn);
    });
  }

  function scroll() { setTimeout(function(){ msgsEl.scrollTop = msgsEl.scrollHeight; }, 50); }
})();
