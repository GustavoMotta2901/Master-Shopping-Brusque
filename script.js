(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.main-nav');

    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        const isOpen = nav.classList.contains('open');
        nav.classList.toggle('open', !isOpen);
        nav.classList.toggle('mobile', true);
        toggle.setAttribute('aria-expanded', String(!isOpen));
        if (!isOpen) {
          const firstLink = nav.querySelector('a');
          firstLink && firstLink.focus();
        }
      });
    }

    const revealTargets = document.querySelectorAll('.reveal-hidden');

    if ('IntersectionObserver' in window && revealTargets.length) {
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      revealTargets.forEach(t => io.observe(t));
    } else {
      revealTargets.forEach(t => t.classList.add('is-visible'));
    }

  
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.length > 1) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (nav && nav.classList.contains('open')) {
              nav.classList.remove('open');
              toggle && toggle.setAttribute('aria-expanded', 'false');
            }
          }
        }
      });
    });

    
    try {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        document.querySelectorAll('video[autoplay]').forEach(v => { v.pause(); v.removeAttribute('autoplay'); });
      }
    } catch (e) {}

    
  });
})();
