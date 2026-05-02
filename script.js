/* ============================================================
   MD SUMON MIA — Portfolio SPA
   Replace EMAILJS_SVC, EMAILJS_TPL, EMAILJS_KEY below
   ============================================================ */

var EMAILJS_SVC = 'service_xxxxxxx';
var EMAILJS_TPL = 'template_xxxxxxx';
var EMAILJS_KEY = 'YOUR_PUBLIC_KEY';

/* ── URL MAPS ── */
var URL_MAP = {
  '':'home','home':'home','about':'about','services':'services',
  'portfolio':'portfolio','contact':'contact','get-quote':'quote',
  'hot-deals':'hotdeals','wordpress':'wordpress','shopify':'shopify',
  'webflow':'webflow','framer':'framer','wix':'wix',
  'seo':'seo','smm':'smm','gfx':'gfx'
};
var PAGE_URL = {
  'home':'','about':'about','services':'services','portfolio':'portfolio',
  'contact':'contact','quote':'get-quote','hotdeals':'hot-deals',
  'wordpress':'wordpress','shopify':'shopify','webflow':'webflow',
  'framer':'framer','wix':'wix','seo':'seo','smm':'smm','gfx':'gfx'
};

/* ── ROUTER ── */
function goTo(pageId, pushHistory) {
  if (pushHistory === undefined) pushHistory = true;
  var pages = document.querySelectorAll('.spa-page');
  for (var i = 0; i < pages.length; i++) pages[i].classList.remove('active');
  var target = document.getElementById('page-' + pageId);
  if (!target) {
    var home = document.getElementById('page-home');
    if (home) { home.classList.add('active'); pageId = 'home'; }
    return;
  }
  target.classList.add('active');
  window.scrollTo(0, 0);
  try {
    var slug = PAGE_URL[pageId] || '';
    var newPath = slug ? '/' + slug : '/';
    if (pushHistory && window.location.protocol !== 'file:') {
      history.pushState({ page: pageId }, '', newPath);
    }
  } catch(e) {}
  document.querySelectorAll('.nav-link').forEach(function(el) {
    var navKey = el.dataset.nav;
    var svcPages = ['wordpress','shopify','webflow','framer','wix','seo','smm','gfx'];
    var isActive = navKey === pageId || (navKey === 'services' && svcPages.indexOf(pageId) !== -1);
    el.classList.toggle('active', isActive);
  });
  setTimeout(initReveal, 80);
  if (pageId === 'home') setTimeout(initCounters, 150);
  if (pageId === 'quote') setTimeout(function(){ initBudget(); initTimeline(); initQuoteLive(); initPhones(); }, 100);
  closeMob();
}

function urlToPage() {
  try {
    var path = window.location.pathname.replace(/^\/+/, '').replace(/\/+$/, '').replace(/\.html$/, '');
    return URL_MAP[path] || 'home';
  } catch(e) { return 'home'; }
}

window.addEventListener('popstate', function(e) {
  var pg = (e.state && e.state.page) ? e.state.page : urlToPage();
  goTo(pg, false);
});

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', function() {
  if (typeof emailjs !== 'undefined') {
    try { emailjs.init(EMAILJS_KEY); } catch(e) {}
  }
  initMobileMenu();
  initNavDropdown();
  initReveal();
  initCounters();
  initPhones();
  var pg = urlToPage();
  goTo(pg, false);
  try { history.replaceState({ page: pg }, '', window.location.pathname); } catch(e) {}
});

/* ── NAV DROPDOWN ── */
function initNavDropdown() {
  document.querySelectorAll('.nav-dropdown').forEach(function(dd) {
    var trigger = dd.querySelector('.nav-dd-trigger');
    var menu = dd.querySelector('.nav-dd-menu');
    if (!trigger || !menu) return;
    trigger.addEventListener('click', function(e) {
      if (window.innerWidth < 1024) return;
      e.stopPropagation();
      var isOpen = menu.classList.contains('dd-open');
      closeAllDropdowns();
      if (!isOpen) menu.classList.add('dd-open');
    });
  });
  document.addEventListener('click', closeAllDropdowns);
}
function closeAllDropdowns() {
  document.querySelectorAll('.nav-dd-menu.dd-open').forEach(function(m) { m.classList.remove('dd-open'); });
}

/* ── MOBILE MENU ── */
var _ham = null, _mob = null;
function initMobileMenu() {
  _ham = document.getElementById('hamburger');
  _mob = document.getElementById('mobileMenu');
  if (_ham) {
    _ham.addEventListener('click', function() {
      _ham.classList.toggle('open');
      _mob.classList.toggle('open');
      document.body.style.overflow = _mob.classList.contains('open') ? 'hidden' : '';
    });
  }
}
function closeMob() {
  if (_ham) _ham.classList.remove('open');
  if (_mob) _mob.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── SCROLL ── */
window.addEventListener('scroll', function() {
  var nb = document.getElementById('navbar');
  var sc = document.getElementById('stickyCta');
  var bt = document.getElementById('backToTop');
  var y = window.scrollY;
  if (nb) nb.classList.toggle('scrolled', y > 50);
  if (sc) sc.classList.toggle('show', y > 400);
  if (bt) bt.classList.toggle('show', y > 500);
});

/* ── REVEAL ANIMATIONS ── */
var _revObs = null;
function initReveal() {
  if (_revObs) _revObs.disconnect();
  _revObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      e.target.querySelectorAll('.skill-fill').forEach(function(b) {
        b.style.transform = 'scaleX(' + ((parseInt(b.dataset.width) || 80) / 100) + ')';
      });
    });
  }, { threshold: 0.12 });
  var active = document.querySelector('.spa-page.active');
  if (active) {
    active.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(function(el) { _revObs.observe(el); });
  }
}

/* ── COUNTERS ── */
function animateCount(el, target) {
  if (el._done) return;
  el._done = true;
  var dur = 2000, start = null;
  function tick(ts) {
    if (!start) start = ts;
    var p = Math.min((ts - start) / dur, 1);
    el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
    if (p < 1) requestAnimationFrame(tick); else el.textContent = target;
  }
  requestAnimationFrame(tick);
}
function initCounters() {
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      var el = e.target.querySelector('.count-up');
      if (el) animateCount(el, parseInt(el.dataset.target));
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.counter-item').forEach(function(el) { el._done = false; obs.observe(el); });
}

/* ── TESTIMONIALS ── */
var _testiIdx = 0;
(function() {
  var track = document.getElementById('testiTrack');
  if (!track) return;
  function getPerView() { return window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3; }
  function goSlide(i) {
    var cards = track.querySelectorAll('.testi-card');
    var pv = getPerView();
    var max = Math.max(0, cards.length - pv);
    _testiIdx = Math.min(i, max);
    if (cards.length > 0) track.style.transform = 'translateX(-' + (_testiIdx * (cards[0].offsetWidth + 24)) + 'px)';
    document.querySelectorAll('.testi-dot').forEach(function(d, j) { d.classList.toggle('active', j === _testiIdx); });
  }
  setInterval(function() {
    var cards = track.querySelectorAll('.testi-card');
    var max = Math.max(0, cards.length - getPerView());
    goSlide(_testiIdx + 1 > max ? 0 : _testiIdx + 1);
  }, 5000);
  window.addEventListener('resize', function() { goSlide(_testiIdx); });
})();

/* ── PORTFOLIO ── */
document.addEventListener('DOMContentLoaded', function() {
  var pf = document.getElementById('portFilters');
  if (!pf) return;
  pf.addEventListener('click', function(e) {
    var btn = e.target.closest('.port-filter');
    if (!btn) return;
    document.querySelectorAll('.port-filter').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    var f = btn.dataset.filter;
    document.querySelectorAll('.port-card').forEach(function(c) {
      c.style.display = (f === 'all' || c.dataset.cat === f) ? '' : 'none';
    });
  });
});

/* ── MODAL ── */
function openModal(title, desc, tech, client, timeline, result) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalDesc').textContent = desc;
  document.getElementById('modalLabel').textContent = title.slice(0, 2).toUpperCase();
  document.getElementById('modalMeta').innerHTML =
    '<div class="modal-meta-item"><span class="label">Client</span><span class="val">' + client + '</span></div>' +
    '<div class="modal-meta-item"><span class="label">Timeline</span><span class="val">' + timeline + '</span></div>' +
    '<div class="modal-meta-item"><span class="label">Result</span><span class="val" style="color:var(--green)">' + result + '</span></div>';
  document.getElementById('modalTags').innerHTML = tech.split(',').map(function(t) {
    return '<span class="tag">' + t.trim() + '</span>';
  }).join('');
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(e, force) {
  var ov = document.getElementById('modalOverlay');
  if (force || (e && e.target === ov)) {
    ov.classList.remove('open');
    document.body.style.overflow = '';
  }
}
document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeModal(null, true); });

/* ── FAQ ── */
function toggleFaq(el) {
  var item = el.parentElement;
  var ans = item.querySelector('.faq-a');
  var isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(function(i) {
    i.classList.remove('open');
    var a = i.querySelector('.faq-a');
    if (a) a.style.maxHeight = '0';
  });
  if (!isOpen && ans) { item.classList.add('open'); ans.style.maxHeight = ans.scrollHeight + 'px'; }
}

/* ── HOT DEALS ── */
function switchPkg(platform) {
  document.querySelectorAll('.ptab').forEach(function(t) { t.classList.toggle('active', t.dataset.platform === platform); });
  document.querySelectorAll('.pkg-group').forEach(function(g) { g.classList.toggle('active', g.id === 'grp-' + platform); });
}

/* ── PHONE WITH COUNTRY CODE ── */

/* ════════════════════════════════════════════════════
   FLAG PHONE PICKER — fp* functions
   Works on quote form (fp-quote) and contact (fp-contact)
   ════════════════════════════════════════════════════ */
var FP_COUNTRIES = [
  ['🇧🇩','Bangladesh','+880'],
  ['🇺🇸','United States','+1'],
  ['🇬🇧','United Kingdom','+44'],
  ['🇦🇺','Australia','+61'],
  ['🇨🇦','Canada','+1'],
  ['🇮🇳','India','+91'],
  ['🇵🇰','Pakistan','+92'],
  ['🇸🇦','Saudi Arabia','+966'],
  ['🇦🇪','UAE','+971'],
  ['🇶🇦','Qatar','+974'],
  ['🇰🇼','Kuwait','+965'],
  ['🇧🇭','Bahrain','+973'],
  ['🇴🇲','Oman','+968'],
  ['🇾🇪','Yemen','+967'],
  ['🇯🇴','Jordan','+962'],
  ['🇱🇧','Lebanon','+961'],
  ['🇸🇾','Syria','+963'],
  ['🇮🇱','Israel','+972'],
  ['🇵🇸','Palestine','+970'],
  ['🇮🇷','Iran','+98'],
  ['🇮🇶','Iraq','+964'],
  ['🇹🇷','Turkey','+90'],
  ['🇪🇬','Egypt','+20'],
  ['🇩🇿','Algeria','+213'],
  ['🇲🇦','Morocco','+212'],
  ['🇹🇳','Tunisia','+216'],
  ['🇱🇾','Libya','+218'],
  ['🇸🇩','Sudan','+249'],
  ['🇪🇹','Ethiopia','+251'],
  ['🇰🇪','Kenya','+254'],
  ['🇳🇬','Nigeria','+234'],
  ['🇬🇭','Ghana','+233'],
  ['🇿🇦','South Africa','+27'],
  ['🇹🇿','Tanzania','+255'],
  ['🇺🇬','Uganda','+256'],
  ['🇸🇳','Senegal','+221'],
  ['🇨🇮','Ivory Coast','+225'],
  ['🇨🇲','Cameroon','+237'],
  ['🇿🇲','Zambia','+260'],
  ['🇿🇼','Zimbabwe','+263'],
  ['🇲🇿','Mozambique','+258'],
  ['🇩🇪','Germany','+49'],
  ['🇫🇷','France','+33'],
  ['🇬🇧','United Kingdom','+44'],
  ['🇮🇹','Italy','+39'],
  ['🇪🇸','Spain','+34'],
  ['🇳🇱','Netherlands','+31'],
  ['🇸🇪','Sweden','+46'],
  ['🇳🇴','Norway','+47'],
  ['🇩🇰','Denmark','+45'],
  ['🇫🇮','Finland','+358'],
  ['🇨🇭','Switzerland','+41'],
  ['🇦🇹','Austria','+43'],
  ['🇧🇪','Belgium','+32'],
  ['🇵🇹','Portugal','+351'],
  ['🇬🇷','Greece','+30'],
  ['🇵🇱','Poland','+48'],
  ['🇨🇿','Czech Republic','+420'],
  ['🇭🇺','Hungary','+36'],
  ['🇷🇴','Romania','+40'],
  ['🇧🇬','Bulgaria','+359'],
  ['🇭🇷','Croatia','+385'],
  ['🇷🇺','Russia','+7'],
  ['🇺🇦','Ukraine','+380'],
  ['🇸🇰','Slovakia','+421'],
  ['🇸🇮','Slovenia','+386'],
  ['🇷🇸','Serbia','+381'],
  ['🇪🇪','Estonia','+372'],
  ['🇱🇻','Latvia','+371'],
  ['🇱🇹','Lithuania','+370'],
  ['🇲🇩','Moldova','+373'],
  ['🇦🇱','Albania','+355'],
  ['🇧🇦','Bosnia','+387'],
  ['🇲🇰','N. Macedonia','+389'],
  ['🇲🇪','Montenegro','+382'],
  ['🇮🇸','Iceland','+354'],
  ['🇮🇪','Ireland','+353'],
  ['🇲🇹','Malta','+356'],
  ['🇨🇾','Cyprus','+357'],
  ['🇱🇺','Luxembourg','+352'],
  ['🇸🇬','Singapore','+65'],
  ['🇲🇾','Malaysia','+60'],
  ['🇯🇵','Japan','+81'],
  ['🇰🇷','South Korea','+82'],
  ['🇨🇳','China','+86'],
  ['🇭🇰','Hong Kong','+852'],
  ['🇹🇼','Taiwan','+886'],
  ['🇮🇩','Indonesia','+62'],
  ['🇹🇭','Thailand','+66'],
  ['🇵🇭','Philippines','+63'],
  ['🇻🇳','Vietnam','+84'],
  ['🇱🇰','Sri Lanka','+94'],
  ['🇳🇵','Nepal','+977'],
  ['🇲🇲','Myanmar','+95'],
  ['🇰🇭','Cambodia','+855'],
  ['🇱🇦','Laos','+856'],
  ['🇧🇳','Brunei','+673'],
  ['🇲🇻','Maldives','+960'],
  ['🇲🇳','Mongolia','+976'],
  ['🇰🇿','Kazakhstan','+7'],
  ['🇺🇿','Uzbekistan','+998'],
  ['🇹🇲','Turkmenistan','+993'],
  ['🇹🇯','Tajikistan','+992'],
  ['🇰🇬','Kyrgyzstan','+996'],
  ['🇦🇿','Azerbaijan','+994'],
  ['🇬🇪','Georgia','+995'],
  ['🇦🇲','Armenia','+374'],
  ['🇦🇫','Afghanistan','+93'],
  ['🇳🇿','New Zealand','+64'],
  ['🇧🇷','Brazil','+55'],
  ['🇲🇽','Mexico','+52'],
  ['🇦🇷','Argentina','+54'],
  ['🇨🇴','Colombia','+57'],
  ['🇨🇱','Chile','+56'],
  ['🇵🇪','Peru','+51'],
  ['🇻🇪','Venezuela','+58'],
  ['🇺🇾','Uruguay','+598'],
  ['🇵🇾','Paraguay','+595'],
  ['🇧🇴','Bolivia','+591'],
  ['🇪🇨','Ecuador','+593'],
  ['🇬🇹','Guatemala','+502'],
  ['🇵🇦','Panama','+507'],
  ['🇨🇷','Costa Rica','+506'],
  ['🇩🇴','Dominican Rep.','+1'],
  ['🇯🇲','Jamaica','+1'],
  ['🇹🇹','Trinidad','+1'],
  ['🇵🇷','Puerto Rico','+1'],
];

var _fpSelected = { quote: FP_COUNTRIES[0], contact: FP_COUNTRIES[0] };

function fpBuildList(form, filter) {
  var el = document.getElementById('fp-list-' + form);
  if (!el) return;
  var list = filter ? FP_COUNTRIES.filter(function(c) {
    return c[1].toLowerCase().indexOf(filter) !== -1 || c[2].indexOf(filter) !== -1;
  }) : FP_COUNTRIES;
  var h = '';
  for (var i = 0; i < list.length; i++) {
    var c = list[i];
    var idx = FP_COUNTRIES.indexOf(c);
    h += '<div class="fp-item" onclick="fpPick(' + idx + ',\'' + form + '\')">' +
      '<span class="fp-item-flag">' + c[0] + '</span>' +
      '<span class="fp-item-name">' + c[1] + '</span>' +
      '<span class="fp-item-code">' + c[2] + '</span>' +
      '</div>';
  }
  el.innerHTML = h;
}

function fpToggle(form) {
  var dd = document.getElementById('fp-dropdown-' + form);
  if (!dd) return;
  var isOpen = dd.classList.contains('fp-open');
  fpCloseAll();
  if (!isOpen) {
    dd.classList.add('fp-open');
    var s = dd.querySelector('.fp-search');
    if (s) { s.value = ''; fpBuildList(form, ''); setTimeout(function(){ s.focus(); }, 60); }
  }
}

function fpCloseAll() {
  document.querySelectorAll('.fp-dropdown.fp-open').forEach(function(d) { d.classList.remove('fp-open'); });
}

function fpSearch(input, form) {
  fpBuildList(form, input.value.toLowerCase().trim());
}

function fpPick(idx, form) {
  var c = FP_COUNTRIES[idx];
  if (!c) return;
  _fpSelected[form] = c;
  var flagEl = document.getElementById('fp-flag-' + form);
  var codeEl = document.getElementById('fp-code-' + form);
  if (flagEl) flagEl.textContent = c[0];
  if (codeEl) codeEl.textContent = c[2];
  fpCloseAll();
}

function fpGetPhone(form) {
  var c = _fpSelected[form] || FP_COUNTRIES[0];
  var inputId = form === 'quote' ? 'qPhone' : 'fphone';
  var num = document.getElementById(inputId);
  return c[2] + ' ' + (num ? num.value.trim() : '');
}

function initPhones() {
  fpBuildList('quote', '');
  fpBuildList('contact', '');
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.fp-wrap')) fpCloseAll();
  });
}

/* ── stubs for any legacy calls ── */
function buildSelectOptions() {}
function updateQuoteCountry() {}
function updateContactCountry() {}
function openPhoneDrop() {}
function pickCountry() {}
function filterPhone() {}
function buildPhoneList() {}
function setFlagDisplay() {}


/* ── SET SERVICE (Hot Deals → Quote) ── */
function setService(val) {
  var sel = document.getElementById('qService');
  if (!sel) return;
  var matched = false;
  for (var i = 0; i < sel.options.length; i++) {
    if (sel.options[i].value === val) { sel.value = val; matched = true; break; }
  }
  if (!matched) {
    var vl = val.toLowerCase();
    for (var j = 0; j < sel.options.length; j++) {
      var ol = sel.options[j].value.toLowerCase();
      if ((ol.indexOf('full') !== -1 && vl.indexOf('full') !== -1) ||
          (ol.indexOf('half') !== -1 && vl.indexOf('half') !== -1)) {
        sel.value = sel.options[j].value; matched = true; break;
      }
    }
  }
  if (!matched && val) {
    var opt = document.createElement('option');
    opt.value = val; opt.textContent = val; opt.selected = true;
    sel.appendChild(opt);
  }
  sel.classList.remove('error');
  sel.classList.add('valid');
  sel.style.borderColor = 'var(--green)';
  sel.style.boxShadow = '0 0 0 3px rgba(0,230,118,.15)';
  setTimeout(function() { sel.style.borderColor = ''; sel.style.boxShadow = ''; }, 2500);
}

/* ── BUDGET SLIDER ── */
function initBudget() {
  var range = document.getElementById('budgetRange');
  var disp  = document.getElementById('budgetDisplay');
  var hid   = document.getElementById('qBudget');
  if (!range) return;
  function upd() {
    var v = parseInt(range.value);
    var lbl = v >= 5000 ? '$5,000+' : '$' + v.toLocaleString();
    if (disp) disp.textContent = lbl;
    if (hid) hid.value = lbl;
    var pct = ((v - 100) / (5000 - 100)) * 100;
    range.style.background = 'linear-gradient(to right,var(--green) ' + pct + '%,var(--glass-border) ' + pct + '%)';
  }
  range.addEventListener('input', upd);
  upd();
}

/* ── TIMELINE PILLS ── */
function initTimeline() {
  document.querySelectorAll('.tl-pill').forEach(function(pill) {
    pill.onclick = function() {
      document.querySelectorAll('.tl-pill').forEach(function(p) { p.classList.remove('active'); });
      pill.classList.add('active');
      var hid = document.getElementById('qTimeline');
      if (hid) hid.value = pill.dataset.val;
    };
  });
}

/* ── QUOTE LIVE VALIDATION ── */
function initQuoteLive() {
  var lf = [
    {id:'qName',   errId:'qNameErr',    check:function(v){return v.trim().length>1;}},
    {id:'qEmail',  errId:'qEmailErr',   check:function(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);}},
    {id:'qService',errId:'qServiceErr', check:function(v){return v!=='';}},
    {id:'qDetails',errId:'qDetailsErr', check:function(v){return v.trim().length>10;}}
  ];
  lf.forEach(function(f) {
    var el = document.getElementById(f.id);
    var er = document.getElementById(f.errId);
    if (!el || !er) return;
    function validate() {
      if (!el._touched && !el.value.trim()) return;
      el._touched = true;
      var ok = f.check(el.value);
      el.classList.toggle('error', !ok);
      el.classList.toggle('valid', ok && !!el.value.trim());
      er.classList.toggle('show', !ok && !!el.value.trim());
    }
    el.addEventListener('blur', function() { el._touched = true; validate(); });
    el.addEventListener('input', validate);
    el.addEventListener('change', validate);
  });
}

/* ── QUOTE FORM SUBMIT ── */
function submitQuote() {
  var valid = true;
  var qf = [
    {id:'qName',   errId:'qNameErr',    check:function(v){return v.trim().length>1;}},
    {id:'qEmail',  errId:'qEmailErr',   check:function(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);}},
    {id:'qService',errId:'qServiceErr', check:function(v){return v!=='';}},
    {id:'qDetails',errId:'qDetailsErr', check:function(v){return v.trim().length>10;}}
  ];
  qf.forEach(function(f) {
    var el = document.getElementById(f.id);
    var er = document.getElementById(f.errId);
    if (!el || !er) return;
    var ok = f.check(el.value);
    el._touched = true;
    el.classList.toggle('error', !ok);
    el.classList.toggle('valid', ok);
    er.classList.toggle('show', !ok);
    if (!ok) valid = false;
  });
  if (!valid) {
    var fp = document.getElementById('qFormPanel');
    if (fp) { fp.classList.add('shake'); setTimeout(function(){ fp.classList.remove('shake'); }, 550); }
    return;
  }
  var btn = document.getElementById('qSubmitBtn');
  if (btn) { btn.innerHTML = '<span class="btn-spinner"></span> Sending...'; btn.disabled = true; }

  var phoneVal = fpGetPhone('quote');

  var params = {
    to_email:   'sumonmiaofc@gmail.com',
    from_name:  document.getElementById('qName')    ? document.getElementById('qName').value.trim()    : '',
    from_email: document.getElementById('qEmail')   ? document.getElementById('qEmail').value.trim()   : '',
    phone:      phoneVal || 'Not provided',
    company:    document.getElementById('qCompany') ? (document.getElementById('qCompany').value.trim() || 'Not provided') : 'Not provided',
    service:    document.getElementById('qService') ? document.getElementById('qService').value : '',
    message:    document.getElementById('qDetails') ? document.getElementById('qDetails').value.trim() : '',
    timeline:   document.getElementById('qTimeline')? (document.getElementById('qTimeline').value || 'Flexible') : 'Flexible',
    budget:     document.getElementById('qBudget')  ? (document.getElementById('qBudget').value || 'Not specified') : 'Not specified',
    notes:      document.getElementById('qNotes')   ? (document.getElementById('qNotes').value.trim() || 'None') : 'None',
    reply_to:   document.getElementById('qEmail')   ? document.getElementById('qEmail').value.trim()   : '',
    subject:    'New Quote — ' + (document.getElementById('qService') ? document.getElementById('qService').value : '')
  };

  if (typeof emailjs === 'undefined') { setTimeout(showQuoteSuccess, 800); return; }
  emailjs.send(EMAILJS_SVC, EMAILJS_TPL, params)
    .then(showQuoteSuccess)
    .catch(function(err) {
      console.error('EmailJS:', err);
      if (btn) { btn.innerHTML = 'Send Project Request ↗'; btn.disabled = false; }
      var eb = document.getElementById('qErrBanner');
      if (eb) { eb.classList.add('show'); setTimeout(function(){ eb.classList.remove('show'); }, 6000); }
    });
}
function showQuoteSuccess() {
  var form = document.getElementById('qFormEl');
  var ss   = document.getElementById('qSuccess');
  if (form) { form.style.transition = 'opacity .4s'; form.style.opacity = '0'; }
  setTimeout(function() {
    if (form) form.style.display = 'none';
    if (ss) ss.classList.add('show');
  }, 400);
}

/* ── CONTACT FORM SUBMIT ── */
function submitForm(e) {
  e.preventDefault();
  var valid = true;
  var fields = [
    {id:'fname',   errId:'fnameErr',   check:function(v){return v.trim().length>1;}},
    {id:'femail',  errId:'femailErr',  check:function(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);}},
    {id:'fservice',errId:'fserviceErr',check:function(v){return v!=='';}},
    {id:'fdetails',errId:'fdetailsErr',check:function(v){return v.trim().length>10;}}
  ];
  fields.forEach(function(f) {
    var el = document.getElementById(f.id);
    var er = document.getElementById(f.errId);
    if (!el || !er) return;
    var ok = f.check(el.value);
    el.classList.toggle('error', !ok);
    el.classList.toggle('success', ok);
    er.classList.toggle('visible', !ok);
    if (!ok) valid = false;
  });
  if (!valid) {
    var fw = document.querySelector('.contact-form-wrap');
    if (fw) { fw.classList.add('shake'); setTimeout(function(){ fw.classList.remove('shake'); }, 600); }
    return;
  }
  var btn = document.getElementById('submitBtn');
  if (btn) { btn.innerHTML = '<span class="btn-spinner"></span> Sending...'; btn.disabled = true; }

  var cPhoneVal = fpGetPhone('contact');

  var params = {
    to_email:   'sumonmiaofc@gmail.com',
    from_name:  document.getElementById('fname')   ? document.getElementById('fname').value.trim()   : '',
    from_email: document.getElementById('femail')  ? document.getElementById('femail').value.trim()  : '',
    phone:      cPhoneVal || 'Not provided',
    service:    document.getElementById('fservice')? document.getElementById('fservice').value : '',
    message:    document.getElementById('fdetails')? document.getElementById('fdetails').value.trim() : '',
    budget:     document.getElementById('fbudget') ? (document.getElementById('fbudget').value.trim() || 'Not specified') : 'Not specified',
    reply_to:   document.getElementById('femail')  ? document.getElementById('femail').value.trim()  : '',
    subject:    'New Contact — ' + (document.getElementById('fservice') ? document.getElementById('fservice').value : '')
  };

  if (typeof emailjs === 'undefined') { setTimeout(showContactSuccess, 800); return; }
  emailjs.send(EMAILJS_SVC, EMAILJS_TPL, params)
    .then(showContactSuccess)
    .catch(function(err) {
      console.error(err);
      if (btn) { btn.innerHTML = 'Send Message ↗'; btn.disabled = false; }
    });
}
function showContactSuccess() {
  var form = document.getElementById('contactForm');
  var succ = document.getElementById('successMsg');
  if (!form || !succ) return;
  form.style.transition = 'opacity .4s';
  form.style.opacity = '0';
  setTimeout(function() {
    form.style.display = 'none';
    succ.style.display = 'flex';
    requestAnimationFrame(function() { succ.classList.add('show'); });
  }, 400);
}
