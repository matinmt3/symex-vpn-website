'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const doc = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-button');
  const mainNav = document.querySelector('.main-nav');
  const toast = document.getElementById('toast');
  const demoButton = document.getElementById('connect-demo');
  const demoStatus = document.getElementById('demo-status');
  const demoLabel = document.getElementById('demo-label');
  const cursorGlow = document.querySelector('.cursor-glow');

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 18);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const closeMenu = () => {
    menuButton?.classList.remove('active');
    mainNav?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };

  menuButton?.addEventListener('click', () => {
    const isOpen = !mainNav?.classList.contains('open');
    menuButton.classList.toggle('active', isOpen);
    mainNav?.classList.toggle('open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen);
  });

  mainNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2200);
  };

  document.querySelectorAll('[data-copy]').forEach(button => {
    button.addEventListener('click', async () => {
      const value = button.getAttribute('data-copy') || '';
      try {
        await navigator.clipboard.writeText(value);
      } catch {
        const input = document.createElement('textarea');
        input.value = value;
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        input.remove();
      }
      showToast('شناسه کانال کپی شد');
    });
  });

  demoButton?.addEventListener('click', () => {
    const connected = demoButton.getAttribute('aria-pressed') !== 'true';
    const phone = demoButton.closest('.phone-card');
    demoButton.setAttribute('aria-pressed', String(connected));
    demoButton.classList.toggle('connected', connected);
    phone?.classList.toggle('connected', connected);
    if (demoStatus) demoStatus.textContent = connected ? 'اتصال نمایشی' : 'آمادهٔ شبیه‌سازی';
    if (demoLabel) demoLabel.textContent = connected ? 'اتصال آزمایشی فعال است' : 'برای شبیه‌سازی اتصال لمس کنید';
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Intl.DateTimeFormat('fa-IR', { year: 'numeric' }).format(new Date());

  const revealWithObserver = () => {
    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          });
        }, { threshold: 0.14 })
      : null;

    document.querySelectorAll('[data-reveal]').forEach(element => {
      if (observer) observer.observe(element);
      else element.classList.add('is-visible');
    });
  };

  const animateCountersFallback = () => {
    const counterObserver = 'IntersectionObserver' in window
      ? new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const element = entry.target;
            const target = Number(element.dataset.count || 0);
            const duration = 900;
            const startedAt = performance.now();
            const tick = now => {
              const progress = Math.min((now - startedAt) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              element.textContent = String(Math.round(target * eased));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            counterObserver.unobserve(element);
          });
        }, { threshold: 0.7 })
      : null;

    document.querySelectorAll('[data-count]').forEach(element => {
      if (counterObserver) counterObserver.observe(element);
      else element.textContent = element.dataset.count || '0';
    });
  };

  const splitWords = () => {
    document.querySelectorAll('[data-split]').forEach(element => {
      const text = element.textContent || '';
      const parts = text.split(/(\s+)/);
      element.textContent = '';
      parts.forEach(part => {
        if (!part) return;
        if (/\s+/.test(part)) {
          element.appendChild(document.createTextNode(part));
          return;
        }
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = part;
        element.appendChild(span);
      });
    });
  };

  const initGsap = () => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger || reduceMotion) {
      revealWithObserver();
      animateCountersFallback();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    splitWords();

    gsap.set('[data-reveal]', { opacity: 0, y: 34 });
    gsap.set('.split-title .word', { opacity: 0, yPercent: 120, filter: 'blur(10px)' });
    gsap.set('.hero-copy', { opacity: 1, y: 0 });
    gsap.set('.hero-copy .eyebrow, .hero-text, .hero-actions, .trust-row', { opacity: 0, y: 18 });
    gsap.set('.hero-visual', { opacity: 0, y: 24, rotateX: 6 });

    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl
      .to('.hero-copy [data-split] .word', { opacity: 1, yPercent: 0, filter: 'blur(0px)', duration: .95, stagger: .045 })
      .to('.hero-copy .eyebrow, .hero-text, .hero-actions, .trust-row', { opacity: 1, y: 0, duration: .72, stagger: .08 }, '-=.65')
      .to('.hero-visual', { opacity: 1, y: 0, rotateX: 0, duration: .85 }, '-=.75');

    gsap.utils.toArray('[data-reveal]').forEach((element, index) => {
      if (element.closest('.hero-copy') || element.classList.contains('hero-visual')) return;
      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: .75,
        delay: (index % 4) * .03,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 84%',
          once: true
        }
      });
    });

    gsap.utils.toArray('[data-count]').forEach(element => {
      const target = Number(element.dataset.count || 0);
      ScrollTrigger.create({
        trigger: element,
        start: 'top 84%',
        once: true,
        onEnter: () => gsap.fromTo(element, { innerText: 0 }, {
          innerText: target,
          duration: 1.15,
          ease: 'power3.out',
          snap: { innerText: 1 },
          onUpdate: () => { element.textContent = String(Math.round(Number(element.innerText))); }
        })
      });
    });

    gsap.to('.radar-wrap', {
      y: -18,
      rotateZ: 8,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });

    gsap.to('.phone-card', {
      y: 28,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2
      }
    });

    gsap.to('.signal-card', {
      rotate: 8,
      y: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.immersive-section',
        start: 'top 78%',
        end: 'bottom 42%',
        scrub: 1
      }
    });

    gsap.utils.toArray('.flow-card').forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, y: 46, rotateX: 7 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: .78,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            once: true
          },
          delay: index * .08
        }
      );
    });
  };

  const initTiltCards = () => {
    if (reduceMotion || window.matchMedia('(pointer: coarse)').matches) return;
    document.querySelectorAll('.tilt-card').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateX = ((y / rect.height) - .5) * -9;
        const rotateY = ((x / rect.width) - .5) * 9;
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
      });
      card.addEventListener('pointerleave', () => {
        card.style.transform = '';
      });
    });
  };

  const initMagnetic = () => {
    if (reduceMotion || window.matchMedia('(pointer: coarse)').matches) return;
    document.querySelectorAll('.magnetic').forEach(element => {
      element.addEventListener('pointermove', event => {
        const rect = element.getBoundingClientRect();
        const relX = event.clientX - rect.left - rect.width / 2;
        const relY = event.clientY - rect.top - rect.height / 2;
        element.style.transform = `translate(${relX * .12}px, ${relY * .18}px)`;
      });
      element.addEventListener('pointerleave', () => {
        element.style.transform = '';
      });
    });
  };

  const initCursorGlow = () => {
    if (!cursorGlow || reduceMotion || window.matchMedia('(pointer: coarse)').matches) return;
    window.addEventListener('pointermove', event => {
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
    }, { passive: true });
  };

  const initCanvasMesh = () => {
    const canvas = document.getElementById('mesh-canvas');
    if (!canvas || reduceMotion) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const points = [];
    const pointer = { x: -9999, y: -9999 };
    let width = 0;
    let height = 0;
    let rafId = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      points.length = 0;
      const count = Math.min(70, Math.floor(width * height / 22000));
      for (let i = 0; i < count; i += 1) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - .5) * .18,
          vy: (Math.random() - .5) * .18,
          r: Math.random() * 1.8 + .7
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 130) {
          p.x += dx / Math.max(distance, 1) * .28;
          p.y += dy / Math.max(distance, 1) * .28;
        }
      }

      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const a = points[i];
          const b = points[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance > 125) continue;
          ctx.globalAlpha = (1 - distance / 125) * .32;
          ctx.strokeStyle = '#39e5ff';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      ctx.globalAlpha = .72;
      ctx.fillStyle = '#7ddfff';
      for (const p of points) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', event => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    }, { passive: true });
    window.addEventListener('pagehide', () => cancelAnimationFrame(rafId), { once: true });
  };

  initGsap();
  initTiltCards();
  initMagnetic();
  initCursorGlow();
  initCanvasMesh();
});
