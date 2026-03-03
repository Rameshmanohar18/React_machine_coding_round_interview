# Multipage Website — Final Project

**What you get**: a complete, accessible, responsive multipage website built with plain HTML/CSS/JS. Files included below: `index.html`, `about.html`, `products.html`, `contact.html`, `css/style.css`, `js/main.js`, `js/carousel.js`, `assets/` placeholders. Copy files into a folder and open `index.html` in a browser.

---

## File: index.html

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="Demo multipage website — products, about, contact. Responsive and accessible." />
  <title>Acme Demo — Home</title>
  <link rel="stylesheet" href="css/style.css" />
  <script defer src="js/carousel.js"></script>
  <script defer src="js/main.js"></script>
</head>
<body>
  <header class="site-header">
    <div class="container">
      <a href="index.html" class="brand">Acme Demo</a>
      <nav aria-label="Main navigation">
        <button id="menu-toggle" aria-expanded="false" aria-controls="main-nav">☰</button>
        <ul id="main-nav" class="nav-list">
          <li><a href="index.html">Home</a></li>
          <li><a href="products.html">Products</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="container">
        <h1>Welcome to Acme Demo</h1>
        <p>Robust multipage sample with search, pagination, accessibility and responsive layout.</p>
        <p><a class="btn" href="products.html">View Products</a></p>
      </div>
    </section>

    <section class="carousel-section" aria-label="Featured items">
      <div class="container">
        <div id="carousel" class="carousel" data-interval="4000">
          <div class="slides">
            <div class="slide" aria-hidden="false">
              <img src="assets/hero1.jpg" alt="Sample product 1" />
              <div class="slide-caption">Featured — Product 1</div>
            </div>
            <div class="slide" aria-hidden="true">
              <img src="assets/hero2.jpg" alt="Sample product 2" />
              <div class="slide-caption">Featured — Product 2</div>
            </div>
            <div class="slide" aria-hidden="true">
              <img src="assets/hero3.jpg" alt="Sample product 3" />
              <div class="slide-caption">Featured — Product 3</div>
            </div>
          </div>
          <button class="carousel-prev" aria-label="Previous slide">‹</button>
          <button class="carousel-next" aria-label="Next slide">›</button>
        </div>
      </div>
    </section>

    <section class="features container">
      <article>
        <h2>Responsive</h2>
        <p>Layouts adapt to any screen with CSS Grid and media queries.</p>
      </article>
      <article>
        <h2>Accessible</h2>
        <p>Semantic HTML, ARIA where needed, keyboard-friendly controls.</p>
      </article>
      <article>
        <h2>Searchable Products</h2>
        <p>Products page includes client-side search, pagination and a carousel.</p>
      </article>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container">
      <p>&copy; <span id="year"></span> Acme Demo. Built for demonstration.</p>
      <nav aria-label="Footer">
        <a href="privacy.html">Privacy</a> · <a href="terms.html">Terms</a>
      </nav>
    </div>
  </footer>
</body>
</html>
```

---

## File: products.html

```html

```

---

## File: about.html

```html

```

---

## File: contact.html


---

## File: css/style.css

```css
/* Simple reset */
*{box-sizing:border-box}
html,body{height:100%;margin:0;font-family:Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial}
.container{max-width:1100px;margin:0 auto;padding:1rem}
.site-header{background:#0b3b4a;color:#fff}
.site-header .container{display:flex;align-items:center;justify-content:space-between}
.brand{font-weight:700;color:inherit;text-decoration:none}
.nav-list{list-style:none;padding:0;margin:0;display:flex;gap:1rem}
.nav-list a{color:inherit;text-decoration:none}
#menu-toggle{display:none}
.hero{padding:3rem 0;background:linear-gradient(90deg,#e6f7ff,#ffffff)}
.hero h1{margin:0 0 .5rem}
.btn{display:inline-block;padding:.6rem 1rem;border-radius:8px;background:#0b7285;color:#fff;text-decoration:none}
.carousel{position:relative;overflow:hidden;border-radius:10px}
.slides{display:flex;transition:transform .5s ease}
.slide{min-width:100%;position:relative}
.slide img{width:100%;height:320px;object-fit:cover;display:block}
.carousel-prev,.carousel-next{position:absolute;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.4);color:#fff;border:none;padding:.4rem 0.7rem;border-radius:4px}
.carousel-prev{left:.5rem}.carousel-next{right:.5rem}
.features{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;padding:2rem 0}
.product-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;margin-top:1rem}
.card{border:1px solid #e6e6e6;padding:1rem;border-radius:8px;background:#fff}
.card img{width:100%;height:160px;object-fit:cover;border-radius:6px}
.controls{display:flex;gap:.5rem;align-items:center;flex-wrap:wrap}
.pagination{display:flex;gap:.5rem;justify-content:center;padding:1rem 0}
.pagination button{padding:.4rem .6rem}
.site-footer{background:#f2f6f8;padding:1rem 0;margin-top:2rem}
.about .team-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem}
.team-grid img{width:100%;height:200px;object-fit:cover;border-radius:8px}
.contact form{display:grid;gap:.6rem;max-width:640px}
input,textarea,select{padding:.5rem;border:1px solid #ccc;border-radius:6px}
@media (max-width:700px){
  #menu-toggle{display:inline-block}
  .nav-list{display:none;flex-direction:column;background:#08313a;padding:.5rem;border-radius:6px}
  .nav-list.show{display:flex}
}
```

---

## File: js/carousel.js

```javascript
// Basic accessible carousel that supports keyboard
class SimpleCarousel {
  constructor(root){
    this.root = root;
    this.slides = root.querySelectorAll('.slide');
    this.index = 0;
    this.prevBtn = root.querySelector('.carousel-prev');
    this.nextBtn = root.querySelector('.carousel-next');
    this.interval = parseInt(root.dataset.interval,10) || 4000;
    this.timer = null;
    this.init();
  }
  init(){
    this.show(0);
    this.prevBtn.addEventListener('click', ()=>this.prev());
    this.nextBtn.addEventListener('click', ()=>this.next());
    this.root.addEventListener('keydown', e=>{
      if(e.key === 'ArrowLeft') this.prev();
      if(e.key === 'ArrowRight') this.next();
    });
    this.root.tabIndex = 0;
    this.start();
    this.root.addEventListener('mouseenter', ()=>this.stop());
    this.root.addEventListener('mouseleave', ()=>this.start());
  }
  show(i){
    this.index = (i + this.slides.length) % this.slides.length;
    const offset = -this.index * 100;
    this.root.querySelector('.slides').style.transform = `translateX(${offset}%)`;
    this.slides.forEach((s,idx)=> s.setAttribute('aria-hidden', idx!==this.index));
  }
  next(){ this.show(this.index+1); }
  prev(){ this.show(this.index-1); }
  start(){ this.stop(); this.timer = setInterval(()=>this.next(), this.interval); }
  stop(){ if(this.timer) { clearInterval(this.timer); this.timer = null; } }
}

window.addEventListener('DOMContentLoaded', ()=>{
  const c = document.getElementById('carousel');
  if(c) new SimpleCarousel(c);
});
```

---

## File: js/main.js

```javascript
// Shared small scripts: menu toggle, year, product rendering, search, pagination, contact form
document.addEventListener('DOMContentLoaded', ()=>{
  // menu toggle for mobile
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  if(toggle && nav){
    toggle.addEventListener('click', ()=>{
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('show');
    });
  }

  // footer year
  const yrs = document.querySelectorAll('#year,#year2,#year3,#year4');
  yrs.forEach(el=> el && (el.textContent = new Date().getFullYear()));

  // Products page logic
  if(window.location.pathname.endsWith('products.html') || window.location.pathname.endsWith('/products.html')){
    initProductsPage(window.PRODUCTS || []);
  }

  // Contact form validation
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const status = document.getElementById('formStatus');
      if(!form.checkValidity()){
        status.textContent = 'Please fill all required fields correctly.';
        return;
      }
      // simulate submit
      status.textContent = 'Sending...';
      await new Promise(r=>setTimeout(r,800));
      status.textContent = 'Thanks — message sent!';
      form.reset();
    });
  }
});

function initProductsPage(products){
  const grid = document.getElementById('product-grid');
  const search = document.getElementById('search');
  const perPageSelect = document.getElementById('perPage');
  const pagination = document.getElementById('pagination');
  let filtered = products.slice();
  let currentPage = 1;
  let perPage = parseInt(perPageSelect.value,10);

  function render(){
    const start = (currentPage-1)*perPage;
    const pageItems = filtered.slice(start, start+perPage);
    grid.innerHTML = pageItems.map(p=>`
      <article class="card" role="article">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <p><strong>$${p.price}</strong></p>
        ${p.video?`<video controls width="100%" src="${p.video}"></video>`:''}
      </article>
    `).join('') || '<p>No products found.</p>';

    renderPagination();
  }

  function renderPagination(){
    const total = filtered.length;
    const pages = Math.max(1, Math.ceil(total/perPage));
    pagination.innerHTML = '';
    const makeBtn = (label, page, disabled=false)=>{
      const btn = document.createElement('button');
      btn.textContent = label;
      btn.disabled = disabled;
      btn.addEventListener('click', ()=>{ currentPage = page; render(); scrollToTop(); });
      return btn;
    };
    pagination.appendChild(makeBtn('Prev', Math.max(1,currentPage-1), currentPage===1));
    // show up to 7 page buttons
    const startPage = Math.max(1, currentPage-3);
    const endPage = Math.min(pages, startPage+6);
    for(let i=startPage;i<=endPage;i++){
      const b = makeBtn(String(i), i);
      if(i===currentPage) { b.setAttribute('aria-current','page'); }
      pagination.appendChild(b);
    }
    pagination.appendChild(makeBtn('Next', Math.min(pages,currentPage+1), currentPage===pages));
  }

  function doSearch(q){
    if(!q) filtered = products.slice();
    else {
      const t = q.trim().toLowerCase();
      filtered = products.filter(p=> (p.name + ' ' + p.desc).toLowerCase().includes(t));
    }
    currentPage = 1;
    render();
  }

  search && search.addEventListener('input', e=> doSearch(e.target.value));
  perPageSelect && perPageSelect.addEventListener('change', e=>{ perPage = parseInt(e.target.value,10); currentPage = 1; render(); });

  render();
}

function scrollToTop(){ window.scrollTo({top:0,behavior:'smooth'}); }
```

---

## Assets

* Place placeholder images at `assets/hero1.jpg`, `assets/hero2.jpg`, `assets/hero3.jpg`
* Place product images `assets/prod1.jpg` ... `prod6.jpg`
* Optional sample videos `assets/video1.mp4` etc.
* Team images `assets/team1.jpg`, `assets/team2.jpg`.

---

## Notes, accessibility & SEO checklist

* Use semantic tags (header, main, nav, footer). ARIA used where dynamic controls exist.
* Images include `alt` text and `loading="lazy"` for performance.
* Pages include meta description and responsive viewport meta.
* Keyboard accessible carousel and menu.
* Use `aria-live` on product grid so screen readers know results changed.

---

## How to run

1. Create folder structure as shown and save files.
2. Open `index.html` in your browser. For the contact form or to fetch real products, serve with a local static server (e.g., `npx http-server` or `python -m http.server`).
3. Replace `assets/` placeholders with real images/videos.

---

## Ideas to extend (project suggestions)

* Replace PRODUCTS with real API endpoints and add server-side pagination.
* Add unit tests for JS (Jest) and visual tests (Playwright).
* Convert to a SPA with React or Next.js and implement SSR for SEO.
* Add CI/CD: GitHub Actions to build and deploy to Netlify/Vercel.

---

If you want, I can also:

* Produce this as a downloadable zip.
* Convert it to a React + Tailwind version.
* Add detailed tests, Lighthouse audit suggestions, or deployment scripts.

Happy to keep building — tell me which option you want next.
