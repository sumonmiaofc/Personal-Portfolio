/* ================================================================
   MD SUMON MIA — Portfolio JavaScript  |  v2.0
   ================================================================ */

/* ================================================================
   EMAILJS SETUP GUIDE
   ─────────────────────────────────────────────────────────────────
   1. Go to https://www.emailjs.com → Sign up FREE
   2. Dashboard → Email Services → Add Service (Gmail)
      → Copy your SERVICE ID
   3. Dashboard → Email Templates → Create Template
      Use these template variables:
        {{from_name}}   — Client's name
        {{from_email}}  — Client's email
        {{phone}}       — Client's phone
        {{service}}     — Selected service
        {{message}}     — Project details
        {{budget}}      — Budget (optional)
      → Copy your TEMPLATE ID
   4. Dashboard → Account → API Keys → Copy PUBLIC KEY
   5. Replace the 3 values below
   ================================================================ */
const EMAILJS_SERVICE_ID  = 'service_xxxxxxx';  // ← Your EmailJS Service ID
const EMAILJS_TEMPLATE_ID = 'template_xxxxxxx'; // ← Your EmailJS Template ID
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';  // ← Your EmailJS Public Key

/* ─── NAVBAR + SCROLL HANDLERS ─── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  // Sticky CTA
  const stickyCta = document.getElementById('stickyCta');
  if (stickyCta) stickyCta.classList.toggle('show', window.scrollY > 400);

  // Back to Top button
  const backTop = document.getElementById('backToTop');
  if (backTop) backTop.classList.toggle('show', window.scrollY > 500);

  // Active nav link
  const sections = ['home', 'about', 'services', 'portfolio', 'contact'];
  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 120) current = id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

/* ─── BACK TO TOP ─── */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ─── MOBILE MENU ─── */
const ham = document.getElementById('hamburger');
const mob = document.getElementById('mobileMenu');

ham.addEventListener('click', () => {
  ham.classList.toggle('open');
  mob.classList.toggle('open');
  document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
});

function closeMob() {
  ham.classList.remove('open');
  mob.classList.remove('open');
  document.body.style.overflow = '';
}

/* ─── INTERSECTION OBSERVER — scroll reveals + counters + skills ─── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('visible');
    e.target.querySelectorAll('.skill-fill').forEach(bar => bar.classList.add('animate'));

    if (e.target.classList.contains('counter-item')) {
      const el = e.target.querySelector('.count-up');
      if (el && !el.dataset.done) {
        el.dataset.done = '1';
        animateCount(el, parseInt(el.dataset.target));
      }
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .counter-item')
  .forEach(el => revealObs.observe(el));

const aboutEl = document.getElementById('about');
if (aboutEl) {
  new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.transform = `scaleX(${(parseInt(bar.dataset.width) || 80) / 100})`;
      });
    });
  }, { threshold: 0.2 }).observe(aboutEl);
}

/* ─── COUNTER ANIMATION ─── */
function animateCount(el, target) {
  const duration = 2000;
  let start = null;
  function tick(ts) {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  }
  requestAnimationFrame(tick);
}

/* ─── TESTIMONIALS SLIDER ─── */
let testiIdx = 0;
const testiTrack = document.getElementById('testiTrack');
const testiDots  = document.querySelectorAll('.testi-dot');

function getPerView() {
  const w = window.innerWidth;
  if (w <= 768)  return 1;
  if (w <= 1024) return 2;
  return 3;
}

function goToSlide(i) {
  const cards   = testiTrack.querySelectorAll('.testi-card');
  const perView = getPerView();
  const maxIdx  = Math.max(0, cards.length - perView);
  testiIdx      = Math.min(i, maxIdx);
  testiTrack.style.transform = `translateX(-${testiIdx * (cards[0].offsetWidth + 24)}px)`;
  testiDots.forEach((d, j) => d.classList.toggle('active', j === testiIdx));
}

setInterval(() => {
  const maxIdx = Math.max(0, testiTrack.querySelectorAll('.testi-card').length - getPerView());
  goToSlide((testiIdx + 1) > maxIdx ? 0 : testiIdx + 1);
}, 5000);

window.addEventListener('resize', () => goToSlide(testiIdx));

/* ─── PORTFOLIO FILTERS ─── */
document.getElementById('portFilters').addEventListener('click', e => {
  const btn = e.target.closest('.port-filter');
  if (!btn) return;
  document.querySelectorAll('.port-filter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const filter = btn.dataset.filter;
  document.querySelectorAll('.port-card').forEach(card => {
    card.style.display = (filter === 'all' || card.dataset.cat === filter) ? '' : 'none';
  });
});

/* ─── PORTFOLIO MODAL ─── */
function openModal(title, desc, tech, client, timeline, result) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalDesc').textContent  = desc;
  document.getElementById('modalLabel').textContent = title.slice(0, 2).toUpperCase();
  document.getElementById('modalMeta').innerHTML = `
    <div class="modal-meta-item"><span class="label">Client</span><span class="val">${client}</span></div>
    <div class="modal-meta-item"><span class="label">Timeline</span><span class="val">${timeline}</span></div>
    <div class="modal-meta-item"><span class="label">Result</span><span class="val" style="color:var(--green)">${result}</span></div>`;
  document.getElementById('modalTags').innerHTML = tech.split(',').map(t => `<span class="tag">${t.trim()}</span>`).join('');
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(e, force) {
  if (force || (e && e.target === document.getElementById('modalOverlay'))) {
    document.getElementById('modalOverlay').classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(null, true); });

/* ─── FAQ ACCORDION ─── */
function toggleFaq(el) {
  const item   = el.parentElement;
  const ans    = item.querySelector('.faq-a');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => {
    i.classList.remove('open');
    i.querySelector('.faq-a').style.maxHeight = '0';
  });
  if (!isOpen) {
    item.classList.add('open');
    ans.style.maxHeight = ans.scrollHeight + 'px';
  }
}

/* ─── SERVICE AUTO-SELECT (with highlight animation) ─── */
function setService(val) {
  const sel = document.getElementById('fservice');
  if (!sel) return;
  sel.value = val;
  sel.dispatchEvent(new Event('change'));
  sel.classList.remove('error');
  sel.classList.add('success');
  sel.style.borderColor = 'var(--green)';
  sel.style.boxShadow   = '0 0 0 3px rgba(0,230,118,0.18)';
  setTimeout(() => {
    sel.style.borderColor = '';
    sel.style.boxShadow   = '';
  }, 2500);
  // Scroll to contact form
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

/* ─── REAL-TIME FIELD VALIDATION ─── */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize EmailJS
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  const liveFields = [
    { id: 'fname',    errId: 'fnameErr',    check: v => v.trim().length > 1 },
    { id: 'femail',   errId: 'femailErr',   check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
    { id: 'fservice', errId: 'fserviceErr', check: v => v !== '' },
    { id: 'fdetails', errId: 'fdetailsErr', check: v => v.trim().length > 10 },
  ];

  liveFields.forEach(({ id, errId, check }) => {
    const el  = document.getElementById(id);
    const err = document.getElementById(errId);
    if (!el || !err) return;

    const validate = () => {
      if (el.value.trim() === '' && !el.classList.contains('touched')) return;
      el.classList.add('touched');
      const ok = check(el.value);
      el.classList.toggle('error',   !ok);
      el.classList.toggle('success',  ok && el.value.trim() !== '');
      err.classList.toggle('visible', !ok && el.value.trim() !== '');
    };

    el.addEventListener('blur',   () => { el.classList.add('touched'); validate(); });
    el.addEventListener('input',  validate);
    el.addEventListener('change', validate);
  });
});

/* ================================================================
   CONTACT FORM SUBMIT — EmailJS
   ================================================================ */
function submitForm(e) {
  e.preventDefault();

  /* ── Validate all required fields ── */
  let valid = true;
  const fields = [
    { id: 'fname',    errId: 'fnameErr',    check: v => v.trim().length > 1 },
    { id: 'femail',   errId: 'femailErr',   check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
    { id: 'fservice', errId: 'fserviceErr', check: v => v !== '' },
    { id: 'fdetails', errId: 'fdetailsErr', check: v => v.trim().length > 10 },
  ];

  fields.forEach(({ id, errId, check }) => {
    const el  = document.getElementById(id);
    const err = document.getElementById(errId);
    const ok  = check(el.value);
    el.classList.add('touched');
    el.classList.toggle('error',   !ok);
    el.classList.toggle('success', ok);
    err.classList.toggle('visible', !ok);
    if (!ok) valid = false;
  });

  if (!valid) {
    /* Shake animation on invalid submit */
    const formWrap = document.querySelector('.contact-form-wrap');
    formWrap.classList.add('shake');
    setTimeout(() => formWrap.classList.remove('shake'), 600);
    /* Scroll to first error */
    const firstErr = document.querySelector('.form-group input.error, .form-group select.error, .form-group textarea.error');
    if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  /* ── Collect form data ── */
  const templateParams = {
    to_email:   'sumonmiaofc@gmail.com',
    from_name:  document.getElementById('fname').value.trim(),
    from_email: document.getElementById('femail').value.trim(),
    phone:      document.getElementById('fphone').value.trim() || 'Not provided',
    service:    document.getElementById('fservice').value,
    message:    document.getElementById('fdetails').value.trim(),
    budget:     document.getElementById('fbudget').value.trim() || 'Not specified',
    reply_to:   document.getElementById('femail').value.trim(),
    subject:    `New Project Inquiry — ${document.getElementById('fservice').value}`,
  };

  /* ── Show loading state ── */
  const btn = document.getElementById('submitBtn');
  btn.innerHTML = `<span class="btn-spinner"></span> Sending...`;
  btn.disabled  = true;

  /* ── Send via EmailJS ── */
  if (typeof emailjs === 'undefined') {
    /* Fallback: EmailJS not loaded (e.g. offline demo) */
    console.warn('EmailJS not loaded. Replace EMAILJS keys to activate.');
    setTimeout(showSuccessMessage, 1200);
    return;
  }

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(() => {
      showSuccessMessage();
    })
    .catch((err) => {
      console.error('EmailJS error:', err);
      showFormError();
      btn.innerHTML = `Send Message <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>`;
      btn.disabled  = false;
    });
}

function showSuccessMessage() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('successMsg');
  form.style.transition = 'opacity .4s ease, transform .4s ease';
  form.style.opacity    = '0';
  form.style.transform  = 'translateY(-12px)';
  setTimeout(() => {
    form.style.display = 'none';
    success.style.display = 'flex';
    requestAnimationFrame(() => success.classList.add('show'));
  }, 400);
}

function showFormError() {
  const el = document.getElementById('formErrBanner');
  if (!el) return;
  el.style.display = 'flex';
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.style.display = 'none', 400);
  }, 6000);
}

/* ─── SMOOTH SCROLL for all # links ─── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
  });
});
