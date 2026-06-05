
/* ── 1. SPLASH SCREEN ── */
(function initSplash() {
  const splash = document.getElementById('splash');
  const app    = document.getElementById('app');
  if (!splash || !app) return;

  // Start loading bar animation (CSS handles it via @keyframes fillBar)
  // Dismiss splash after 3s
  const SPLASH_DURATION = 3000;
  setTimeout(() => {
    splash.classList.add('done');
    app.style.opacity = '0';
    app.style.transition = 'opacity .7s ease';
    // Small delay so splash fade starts first
    requestAnimationFrame(() => {
      setTimeout(() => {
        app.style.opacity = '1';
      }, 200);
    });
    // Remove from DOM after transition
    setTimeout(() => splash.remove(), 800);
  }, SPLASH_DURATION);
})();


/* ── 2. NAVBAR: scroll state + active link ── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  // Scrolled state
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Active link highlight via IntersectionObserver
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nl');

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => io.observe(s));
})();


/* ── 3. MOBILE DRAWER ── */
(function initDrawer() {
  const burger = document.getElementById('burger');
  const drawer = document.getElementById('drawer');
  if (!burger || !drawer) return;

  const toggle = () => {
    const open = drawer.classList.toggle('open');
    burger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  burger.addEventListener('click', toggle);

  // Close on link click
  drawer.querySelectorAll('.dl, .drawer-cta').forEach(a => {
    a.addEventListener('click', () => {
      drawer.classList.remove('open');
      burger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on outside tap
  document.addEventListener('click', e => {
    if (!drawer.contains(e.target) && !burger.contains(e.target)) {
      drawer.classList.remove('open');
      burger.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
})();


/* ── 4. STAR CANVAS ── */
(function initStarCanvas() {
  const canvas = document.getElementById('star-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, stars = [];
  const STAR_COUNT = 130;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function makeStars() {
    stars = Array.from({ length: STAR_COUNT }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      r:  Math.random() * 1.4 + 0.2,
      a:  Math.random(),
      da: (Math.random() * 0.004 + 0.001) * (Math.random() < .5 ? 1 : -1),
      vx: (Math.random() - .5) * 0.08,
      vy: (Math.random() - .5) * 0.08,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      s.x += s.vx; s.y += s.vy;
      s.a += s.da;
      if (s.a <= 0 || s.a >= 1) s.da *= -1;
      if (s.x < 0) s.x = W; if (s.x > W) s.x = 0;
      if (s.y < 0) s.y = H; if (s.y > H) s.y = 0;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.a * 0.55})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  makeStars();
  draw();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); makeStars(); }, 150);
  });
})();


/* ── 5. REVEAL ON SCROLL ── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = e.target.dataset.delay || 0;
        setTimeout(() => e.target.classList.add('in-view'), Number(delay));
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
})();


/* ── 6. BMI CALCULATOR ── */
(function initBMI() {
  const calcBtn     = document.getElementById('calcBtn');
  const resetBtn    = document.getElementById('resetBtn');
  const placeholder = document.getElementById('bmiPlaceholder');
  const resultsView = document.getElementById('bmiResults');
  const gaugeFill   = document.getElementById('gaugeFill');

  if (!calcBtn) return;

  // Goal tabs
  let selectedGoal = 'maintain';
  document.querySelectorAll('.goal-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.goal-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedGoal = btn.dataset.goal;
    });
  });

  calcBtn.addEventListener('click', calculate);
  resetBtn.addEventListener('click', reset);

  // Also recalculate live as user types (optional)
  ['bHeight','bWeight','bAge','bGender','bActivity'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => {
      if (resultsView.style.display !== 'none') calculate();
    });
  });

  function val(id) {
    return parseFloat(document.getElementById(id)?.value) || 0;
  }

  function calculate() {
    const height   = val('bHeight');   // cm
    const weight   = val('bWeight');   // kg
    const age      = val('bAge');
    const gender   = document.getElementById('bGender')?.value;
    const activity = parseFloat(document.getElementById('bActivity')?.value) || 1.55;

    if (!height || !weight || height < 50 || weight < 10) {
      shake(document.querySelector('.bmi-form-card'));
      return;
    }

    // BMI
    const hM  = height / 100;
    const bmi = weight / (hM * hM);

    // BMR (Mifflin-St Jeor)
    let bmr;
    if (gender === 'female') {
      bmr = 10 * weight + 6.25 * height - 5 * (age || 25) - 161;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * (age || 25) + 5;
    }
    if (!age) bmr = 10 * weight + 6.25 * height - 5 * 25 + 5; // default age

    let tdee = bmr * activity;

    // Adjust for goal
    if (selectedGoal === 'lose')   tdee -= 300;
    if (selectedGoal === 'gain')   tdee += 300;
    tdee = Math.round(tdee);

    // Macros (standard split: 40C / 30P / 30F)
    const carbs   = Math.round((tdee * 0.40) / 4);
    const protein = Math.round((tdee * 0.30) / 4);
    const fat     = Math.round((tdee * 0.30) / 9);

    // Render
    setEl('bmiNum',    bmi.toFixed(1));
    setEl('mCalories', tdee + ' kcal');
    setEl('mCarbs',    carbs + 'g');
    setEl('mProtein',  protein + 'g');
    setEl('mFat',      fat + 'g');

    // Flash animation on number
    const numEl = document.getElementById('bmiNum');
    if (numEl) { numEl.classList.remove('flash'); void numEl.offsetWidth; numEl.classList.add('flash'); }

    const cat = bmiCategory(bmi);
    const badge = document.getElementById('bmiCatBadge');
    badge.textContent = cat.label;
    badge.className   = 'bmi-cat-badge ' + cat.cls;

    animateGauge(bmi);

    placeholder.style.display  = 'none';
    resultsView.style.display  = 'flex';
  }

  function bmiCategory(bmi) {
    if (bmi < 18.5) return { label: 'Underweight', cls: 'warning' };
    if (bmi < 25)   return { label: 'Normal Weight', cls: '' };
    if (bmi < 30)   return { label: 'Overweight', cls: 'warning' };
    return { label: 'Obese', cls: 'danger' };
  }

  function animateGauge(bmi) {
    if (!gaugeFill) return;
    // Map BMI 10–40 → 0–1
    const pct = Math.min(Math.max((bmi - 10) / 30, 0), 1);
    const total = 283; // approx arc length for our SVG path
    const offset = total * (1 - pct);

    // Color by category
    let color = '#22c55e';
    if (bmi < 18.5 || (bmi >= 25 && bmi < 30)) color = '#f97316';
    if (bmi >= 30) color = '#ef4444';

    gaugeFill.style.transition = 'stroke-dashoffset .8s cubic-bezier(.22,1,.36,1), stroke .4s';
    gaugeFill.style.strokeDashoffset = offset;
    gaugeFill.style.stroke = color;
  }

  function reset() {
    ['bHeight','bWeight','bAge'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    const gen = document.getElementById('bGender');
    if (gen) gen.value = '';
    const act = document.getElementById('bActivity');
    if (act) act.value = '1.55';

    document.querySelectorAll('.goal-tab').forEach(b => b.classList.remove('active'));
    document.querySelector('.goal-tab[data-goal="maintain"]')?.classList.add('active');
    selectedGoal = 'maintain';

    placeholder.style.display  = 'flex';
    resultsView.style.display  = 'none';
  }

  function setEl(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function shake(el) {
    if (!el) return;
    el.style.animation = 'none';
    el.offsetHeight; // reflow
    el.style.animation = 'shake .4s ease';
  }
})();


/* ── 7. CONTACT FORM ── */
(function initContactForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form || !success) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

    // Simulate async send — wire up a real endpoint or EmailJS here
    setTimeout(() => {
      success.style.display = 'flex';
      form.reset();
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      setTimeout(() => (success.style.display = 'none'), 6000);
    }, 1400);
  });
})();


/* ── 8. VIDEO MODAL ── */
(function initVideoModal() {
  const modal    = document.getElementById('videoModal');
  const backdrop = document.getElementById('modalBackdrop');
  const closeBtn = document.getElementById('modalClose');
  const watchBtn = document.getElementById('watchDemoBtn');
  const iframe   = document.getElementById('demoIframe');
  const placeholder = document.getElementById('videoPlaceholder');
  if (!modal) return;


  //yt embed url
  const DEMO_SRC = 'https://www.youtube.com/embed/UEJMcwXHHX0?si=b536Vv3o-jajXB7w';

  function openModal() {
    if (DEMO_SRC) {
      iframe.src = DEMO_SRC;
      placeholder.style.display = 'none';
    } else {
      placeholder.style.display = 'flex';
    }
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { if (iframe) iframe.src = ''; }, 300);
  }

  watchBtn?.addEventListener('click', e => { e.preventDefault(); openModal(); });
  closeBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
})();


/* ── 9. SMOOTH SCROLL (fallback for older browsers) ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 62;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ── 10. SHAKE KEYFRAME (injected dynamically) ── */
(function injectShake() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%,100% { transform: translateX(0); }
      20%      { transform: translateX(-6px); }
      40%      { transform: translateX(6px); }
      60%      { transform: translateX(-4px); }
      80%      { transform: translateX(4px); }
    }
  `;
  document.head.appendChild(style);
})();


/* ── 11. HERO CURSOR PARALLAX ── */
(function initParallax() {
  const visual = document.querySelector('.hero-visual');
  if (!visual) return;
  const hero = document.querySelector('.hero');
  if (!hero) return;

  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;   // -0.5 → 0.5
    const dy = (e.clientY - cy) / rect.height;

    visual.style.transform = `translate(${dx * 14}px, ${dy * 10}px)`;
  });
  hero.addEventListener('mouseleave', () => {
    visual.style.transform = '';
  });
})();


/* ── 12. TEAM CARD STAGGER REVEAL ── */
(function initTeamStagger() {
  const cards = document.querySelectorAll('.tm-card');
  if (!cards.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        cards.forEach((c, i) => {
          setTimeout(() => {
            c.style.opacity = '1';
            c.style.transform = 'none';
          }, i * 70);
        });
        io.disconnect();
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(c => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(18px)';
    c.style.transition = 'opacity .5s ease, transform .5s cubic-bezier(.22,1,.36,1), background .25s, border-color .25s';
  });

  const panel = document.querySelector('.team-panel');
  if (panel) io.observe(panel);
})();