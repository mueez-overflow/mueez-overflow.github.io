/* ============================================================
   RENDERING + INTERACTION LOGIC
   Usually you should not need to edit anything below this line.
   ============================================================ */
(() => {
  const esc = (value = '') => String(value)
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;').replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const externalLink = (url, label, className = '') =>
    `<a${className ? ` class="${className}"` : ''} href="${esc(url)}" target="_blank" rel="noopener noreferrer">${label} <span aria-hidden="true">↗</span></a>`;

  const renderPublications = () => {
    const target = document.querySelector('#publication-list');
    if (!target) return;
    target.innerHTML = CONTENT.publications.map(pub => {
      const underReview = /review/i.test(pub.status || '');
      const action = pub.paperUrl
        ? externalLink(pub.paperUrl, `Read paper<span class="sr-only">: ${esc(pub.title)}</span>`, 'paper-link')
        : '<span class="paper-unavailable">Paper link not yet available</span>';
      return `<article class="publication">
        <div class="publication-body">
          <h3>${esc(pub.title)}</h3>
          <p class="authors"><span></span><span>${pub.authors.replace('A. Mueez', '<strong>A. Mueez</strong>')}</span></p>
          <div class="publication-meta">
            <p>${esc(pub.venue)}</p>
            <div class="publication-actions">
              <span class="status${underReview ? ' under-review' : ''}"><i aria-hidden="true"></i>${esc(pub.status)}</span>
              ${action}
            </div>
          </div>
        </div>
      </article>`;
    }).join('');
  };

  const renderEducation = () => {
    const target = document.querySelector('#education-list');
    if (!target) return;
    target.innerHTML = CONTENT.education.map(item => {
      const extras = (item.extras || []).map(html => `<p>${html}</p>`).join('');
      const thesis = item.thesis
        ? `<div class="thesis"><span class="mono">THESIS</span>${externalLink(item.thesis.url, esc(item.thesis.title))}</div>`
        : '';
      return `<article>
        <div class="degree-date mono"><span>${esc(item.date)}</span></div>
        <h3>${esc(item.degree)}</h3>
        <p class="institution">${esc(item.institution)}</p>
        ${extras}
        ${thesis}
      </article>`;
    }).join('');
  };

  const renderExperience = () => {
    const target = document.querySelector('#experience-list');
    if (!target) return;
    target.innerHTML = CONTENT.experience.map((item, index) => `
      <article>
        <div class="experience-date mono">${esc(item.date)}</div>
        <div class="experience-detail">
          <h3>${esc(item.role)}</h3>
          <p class="organization">${esc(item.organization)}</p>
          <ul>${(item.details || []).map(detail => `<li>${detail}</li>`).join('')}</ul>
        </div>
        <span aria-hidden="true" class="experience-index mono">${String(index + 1).padStart(2, '0')}</span>
      </article>`).join('');
  };

  const renderProjects = () => {
    const target = document.querySelector('#projects-list');
    if (!target) return;
    target.innerHTML = CONTENT.projects.map(project => `
      <article>
        <div class="project-title"><h3>${esc(project.title)}</h3></div>
        <div class="project-description">
          <p>${esc(project.description)}</p>
          ${project.url ? externalLink(project.url, esc(project.linkText || 'Explore project'), 'text-link') : ''}
        </div>
      </article>`).join('');
  };

  renderPublications();
  renderEducation();
  renderExperience();
  renderProjects();

  // Follow the operating system theme on every page load by default.
  // The switch is a temporary override for the current page session only.
  const root = document.documentElement;
  const themeSwitch = document.querySelector('.theme-switch');
  const darkMQ = matchMedia('(prefers-color-scheme: dark)');
  let manualTheme = null;

  const paintSwitch = (dark) => {
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
    paintSwitch(dark);
  };

  const syncSystemTheme = () => {
    if (manualTheme === null) applyTheme(darkMQ.matches);
  };
  syncSystemTheme();
  darkMQ.addEventListener?.('change', syncSystemTheme);

  if (themeSwitch) {
    const toggle = () => {
      manualTheme = root.dataset.theme !== 'dark';
      applyTheme(manualTheme);
    };
    themeSwitch.addEventListener('click', toggle);
    themeSwitch.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggle();
      }
    });
  }

  // Active-section navigation.
  const navLinks = [...document.querySelectorAll('.site-header nav a[href^="#"]')];
  const sections = navLinks.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const id = entry.target.id;
        navLinks.forEach((a) => {
          if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'location');
          else a.removeAttribute('aria-current');
        });
      }
    }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  // Observation image parallax.
  const field = document.querySelector('.observation');
  const reduceMQ = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;

  if (field) {
    const move = (event) => {
      // if (reduceMQ.matches || event.pointerType !== 'mouse') return;
      if (event.pointerType !== 'mouse') return;
      const box = field.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        field.style.setProperty('--look-x', `${x * 14}px`);
        field.style.setProperty('--look-y', `${y * 10}px`);
      });
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      field.style.setProperty('--look-x', '0px');
      field.style.setProperty('--look-y', '0px');
    };
    field.addEventListener('pointermove', move);
    field.addEventListener('pointerleave', reset);
  }
})();
