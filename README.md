# MD Sumon Mia — Portfolio Website

> Professional portfolio website for MD Sumon Mia, Web Designer & Digital Marketing Specialist based in Dhaka, Bangladesh.

---

## 📁 File Structure

```
portfolio/
├── index.html      # Main SPA — all 15 pages
├── style.css       # All styles (92KB)
├── script.js       # All JavaScript — routing, forms, phone flag (23KB)
└── README.md       # This file
```

> ⚠️ **All 3 files must be in the same folder.** The HTML links to `style.css` and `script.js` by relative path.

---

## 🚀 Pages Included

| Page | URL Path | Description |
|------|----------|-------------|
| Home | `/` | Hero, services overview, why me, testimonials |
| About | `/about` | Full about page with skills, stats, testimonials |
| Services | `/services` | All 8 service cards |
| Portfolio | `/portfolio` | Filterable project grid with modals |
| Contact | `/contact` | Contact form + social links |
| Get Quote | `/get-quote` | Full quote request form |
| Hot Deals | `/hot-deals` | Package pricing for all platforms |
| WordPress | `/wordpress` | WordPress service page |
| Shopify | `/shopify` | Shopify service page |
| Webflow | `/webflow` | Webflow service page |
| Framer | `/framer` | Framer service page |
| Wix | `/wix` | Wix service page |
| SEO | `/seo` | SEO services page |
| Social Media | `/smm` | Social media marketing page |
| Graphics Design | `/gfx` | Graphics design service page |

---

## ⚙️ EmailJS Setup (Required for forms to work)

Forms will NOT send emails until you add your EmailJS credentials.

### Step 1 — Create EmailJS account
Go to [emailjs.com](https://www.emailjs.com) → Sign up (free plan: 200 emails/month)

### Step 2 — Create an Email Service
Dashboard → Email Services → Add New Service → Connect Gmail/Outlook

### Step 3 — Create an Email Template
Dashboard → Email Templates → Create New Template

Use these template variables:
```
From: {{from_name}} <{{from_email}}>
Reply-To: {{reply_to}}
Subject: {{subject}}

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Company: {{company}}
Service: {{service}}
Message: {{message}}
Timeline: {{timeline}}
Budget: {{budget}}
Notes: {{notes}}
```

### Step 4 — Add your credentials to script.js

Open `script.js` and replace the top 3 lines:

```javascript
var EMAILJS_SVC = 'service_xxxxxxx';   // → Your Service ID
var EMAILJS_TPL = 'template_xxxxxxx';  // → Your Template ID
var EMAILJS_KEY = 'YOUR_PUBLIC_KEY';   // → Your Public Key
```

Find these values in your EmailJS dashboard:
- **Service ID**: Email Services → your service → Service ID
- **Template ID**: Email Templates → your template → Template ID
- **Public Key**: Account → General → Public Key

---

## 🌐 Deployment

### Option A — Upload to any web host (Recommended)
1. Upload all 3 files to your hosting root (`public_html/` or `www/`)
2. Make sure your domain points to that folder
3. Visit your domain — the site is live!

Works on: Hostinger, Namecheap, GoDaddy, SiteGround, cPanel, etc.

### Option B — Netlify (Free, fastest)
1. Go to [netlify.com](https://netlify.com) → Sign up free
2. Drag and drop all 3 files onto the Netlify dashboard
3. Get a live URL instantly (e.g. `random-name.netlify.app`)
4. Connect your custom domain in Site Settings

### Option C — Vercel (Free)
1. Go to [vercel.com](https://vercel.com)
2. Import from GitHub or drag-and-drop files
3. Live instantly with custom domain support

### Option D — GitHub Pages (Free)
1. Create a GitHub repository
2. Upload all 3 files
3. Settings → Pages → Source: main branch
4. Live at `yourusername.github.io/repo-name`

---

## 🔧 Customization Guide

### Change Personal Info
Search and replace in `index.html`:
- `sumonmiaofc@gmail.com` → your email
- `+880 1823-259348` → your phone
- `8801823259348` → your WhatsApp number (no + or spaces)
- `sumonmiaofc` → your Behance/LinkedIn/Instagram/Facebook username

### Change Colors
In `style.css`, find the `:root` block at the top:
```css
:root {
  --green: #00e676;        /* Main accent color */
  --bg: #080c10;           /* Page background */
  --bg2: #0d1117;          /* Section alternate bg */
  --text: #f0f6fc;         /* Main text color */
}
```

### Add Portfolio Items
In `index.html`, find `id="portGrid"` and add cards:
```html
<div class="port-card" data-cat="web" onclick="openModal(
  'Project Title',
  'Project description here.',
  'WordPress, WooCommerce, SEO',
  'Client Name',
  '3 weeks',
  '+65% conversions'
)">
  <div class="port-card-img" style="background:linear-gradient(135deg,#1a2a1a,#0d1a0d)">
    <div class="port-card-label">WD</div>
  </div>
  <div class="port-card-info">
    <h3>Project Title</h3>
    <p>Short description of the project.</p>
    <div class="port-tags">
      <span class="tag">WordPress</span>
      <span class="tag">WooCommerce</span>
    </div>
  </div>
</div>
```

### Change Packages Pricing
In `index.html`, search for `$400` and `$800` to update prices.

---

## 📱 Features

- ✅ Single Page Application (SPA) — no page reloads
- ✅ URL routing (`/about`, `/wordpress`, `/get-quote` etc.)
- ✅ Mobile responsive — tested on all screen sizes
- ✅ Phone field with country code + flag (120 countries)
- ✅ EmailJS contact form + quote form
- ✅ Portfolio filter + modal popup
- ✅ FAQ accordion
- ✅ Testimonials slider
- ✅ Animated counters
- ✅ Scroll reveal animations
- ✅ Services dropdown (navbar)
- ✅ Mobile hamburger menu
- ✅ WhatsApp float button
- ✅ Back to top button
- ✅ Hot Deals platform tabs
- ✅ 10% first-order discount banner
- ✅ Dark theme with green accents

---

## 🐛 Troubleshooting

**Site shows only header and footer**
→ Make sure all 3 files are in the same folder.
→ Open using a web server (not double-clicking the HTML file).
→ For local testing, use VS Code Live Server extension.

**Forms not sending emails**
→ Check that EMAILJS_SVC, EMAILJS_TPL, EMAILJS_KEY are all filled in `script.js`.
→ Make sure your EmailJS account is active.
→ Check browser console (F12) for error messages.

**Phone flag not showing**
→ The flag emoji requires a modern browser (Chrome, Firefox, Safari, Edge).
→ Make sure `script.js` is loading (check Network tab in DevTools).

**Styles not loading**
→ Confirm `style.css` is in the same folder as `index.html`.
→ Check the browser console for 404 errors.

---

## 📞 Contact

**MD Sumon Mia**
- 📧 [sumonmiaofc@gmail.com](mailto:sumonmiaofc@gmail.com)
- 💼 [behance.net/sumonmiaofc](https://www.behance.net/sumonmiaofc)
- 🔗 [linkedin.com/in/sumonmiaofc](https://www.linkedin.com/in/sumonmiaofc/)
- 📱 WhatsApp: [+880 1823-259348](https://wa.me/8801823259348)

---

*Built with ♥ — MD Sumon Mia Portfolio © 2024*
