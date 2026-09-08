/* ============================================================
   SITE BEHAVIOR ONLY
   Portfolio content is intentionally kept in index.html.
   ============================================================ */
(() => {
  'use strict';

  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  const themeSwitch = document.querySelector('.theme-switch');
  const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  // ------------------------------------------------------------
  // Theme
  // Follow the operating-system theme on each page load. A switch
  // click is a temporary override for the current page session.
  // ------------------------------------------------------------
  let manualTheme = null;

  const paintThemeSwitch = (dark) => {
    if (!themeSwitch) return;

    themeSwitch.setAttribute('aria-checked', String(dark));
    themeSwitch.toggleAttribute('data-checked', dark);
    themeSwitch.toggleAttribute('data-unchecked', !dark);

    const thumb = themeSwitch.querySelector('[data-slot="switch-thumb"]');
    if (thumb) {
      thumb.toggleAttribute('data-checked', dark);
      thumb.toggleAttribute('data-unchecked', !dark);
    }
  };

  const applyTheme = (dark) => {
    root.dataset.theme = dark ? 'dark' : 'light';
    paintThemeSwitch(dark);
  };

  const syncSystemTheme = () => {
    if (manualTheme === null) applyTheme(darkModeQuery.matches);
  };

  syncSystemTheme();
  darkModeQuery.addEventListener?.('change', syncSystemTheme);

  themeSwitch?.addEventListener('click', () => {
    manualTheme = root.dataset.theme !== 'dark';
    applyTheme(manualTheme);
  });

  // ------------------------------------------------------------
  // Active navigation
  // Use one deterministic scroll position instead of reacting to
  // whichever IntersectionObserver entry happens to arrive last.
  // This prevents the underline from appearing under the wrong item
  // when a header link (notably Projects) is clicked.
  // ------------------------------------------------------------
  const navLinks = [...document.querySelectorAll('.site-header nav a[href^="#"]')];
  const sectionEntries = navLinks
    .map((link) => {
      const id = link.getAttribute('href')?.slice(1);
      const section = id ? document.getElementById(id) : null;
      return section ? { id, link, section } : null;
    })
    .filter(Boolean);

  let activeId = '';
  let frame = 0;
  let clickLockId = null;
  let clickLockTimer = 0;

  const setActiveNav = (id) => {
    if (!id || id === activeId) return;
    activeId = id;

    sectionEntries.forEach(({ id: sectionId, link }) => {
      if (sectionId === id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };

  const getScrollPaddingTop = () => {
    const value = parseFloat(getComputedStyle(root).scrollPaddingTop);
    return Number.isFinite(value) ? value : (header?.offsetHeight ?? 0);
  };

  const sectionIsAtAnchor = (section) => {
    const targetTop = getScrollPaddingTop();
    return Math.abs(section.getBoundingClientRect().top - targetTop) <= 6;
  };

  const activeSectionFromScroll = () => {
    if (!sectionEntries.length) return '';

    const headerBottom = header?.getBoundingClientRect().bottom ?? 0;
    const marker = headerBottom + Math.min(window.innerHeight * 0.22, 170);
    let current = sectionEntries[0].id;

    for (const { id, section } of sectionEntries) {
      if (section.getBoundingClientRect().top <= marker) current = id;
      else break;
    }

    const atPageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (atPageBottom) current = sectionEntries.at(-1).id;

    return current;
  };

  const updateActiveNav = () => {
    frame = 0;

    if (clickLockId) {
      const locked = sectionEntries.find(({ id }) => id === clickLockId);
      if (locked && !sectionIsAtAnchor(locked.section)) {
        setActiveNav(clickLockId);
        return;
      }
      clickLockId = null;
      window.clearTimeout(clickLockTimer);
    }

    setActiveNav(activeSectionFromScroll());
  };

  const queueActiveNavUpdate = () => {
    if (!frame) frame = window.requestAnimationFrame(updateActiveNav);
  };

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const id = link.getAttribute('href')?.slice(1);
      if (!id) return;

      clickLockId = id;
      setActiveNav(id);
      window.clearTimeout(clickLockTimer);
      clickLockTimer = window.setTimeout(() => {
        clickLockId = null;
        queueActiveNavUpdate();
      }, 1600);
    });
  });

  window.addEventListener('scroll', queueActiveNavUpdate, { passive: true });
  window.addEventListener('resize', queueActiveNavUpdate);
  window.addEventListener('hashchange', () => {
    const id = window.location.hash.slice(1);
    if (sectionEntries.some((entry) => entry.id === id)) setActiveNav(id);
    queueActiveNavUpdate();
  });
  queueActiveNavUpdate();

  // ------------------------------------------------------------
  // Observation image parallax
  // Respect prefers-reduced-motion and limit pointer work to mouse.
  // ------------------------------------------------------------
  const observation = document.querySelector('.observation');
  let parallaxFrame = 0;

  const resetParallax = () => {
    if (!observation) return;
    window.cancelAnimationFrame(parallaxFrame);
    observation.style.setProperty('--look-x', '0px');
    observation.style.setProperty('--look-y', '0px');
  };

  const moveParallax = (event) => {
    if (!observation || reducedMotionQuery.matches || event.pointerType !== 'mouse') return;

    const box = observation.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;

    window.cancelAnimationFrame(parallaxFrame);
    parallaxFrame = window.requestAnimationFrame(() => {
      observation.style.setProperty('--look-x', `${x * 14}px`);
      observation.style.setProperty('--look-y', `${y * 10}px`);
    });
  };

  observation?.addEventListener('pointermove', moveParallax);
  observation?.addEventListener('pointerleave', resetParallax);
  reducedMotionQuery.addEventListener?.('change', resetParallax);
})();
