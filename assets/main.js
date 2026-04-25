// Moment Lab — Shared JS

document.addEventListener('DOMContentLoaded', () => {

  // ── Mobile nav toggle ──────────────────────────────────
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ── Testimonials carousel (initialises only when section is revealed) ──
  const tSection = document.querySelector('.testimonials');
  if (tSection && !tSection.hidden) {
    const slides = tSection.querySelectorAll('.t-slide');
    const dots   = tSection.querySelectorAll('.t-dot');
    const track  = tSection.querySelector('.t-track');
    const DELAY  = 7000;
    let current  = 0;
    let timer    = null;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function goTo(idx) {
      slides[current].classList.remove('is-active');
      dots[current].classList.remove('is-active');
      dots[current].setAttribute('aria-pressed', 'false');
      current = ((idx % slides.length) + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      dots[current].classList.add('is-active');
      dots[current].setAttribute('aria-pressed', 'true');
    }

    function resetTimer() {
      clearInterval(timer);
      if (!prefersReduced) timer = setInterval(() => goTo(current + 1), DELAY);
    }

    tSection.querySelectorAll('.t-stage-prev, .t-mob-prev').forEach(btn =>
      btn.addEventListener('click', () => { goTo(current - 1); resetTimer(); })
    );
    tSection.querySelectorAll('.t-stage-next, .t-mob-next').forEach(btn =>
      btn.addEventListener('click', () => { goTo(current + 1); resetTimer(); })
    );
    dots.forEach((dot, i) =>
      dot.addEventListener('click', () => { goTo(i); resetTimer(); })
    );
    tSection.addEventListener('mouseenter', () => clearInterval(timer));
    tSection.addEventListener('mouseleave', resetTimer);

    if (track) {
      let touchStartX = 0;
      track.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
      }, { passive: true });
      track.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 50) { goTo(dx < 0 ? current + 1 : current - 1); resetTimer(); }
      }, { passive: true });
    }
    resetTimer();
  }

  // ── Scroll reveal (transform + opacity only) ───────────
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');

  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  }

});
