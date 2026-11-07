(() => {
  'use strict';
  const experiences = window.portfolioExperiences || [];
  const list = document.querySelector('#experience-list');
  const count = document.querySelector('#experience-count');
  const more = document.querySelector('#show-more');
  const filters = [...document.querySelectorAll('[data-filter]')];
  const markets = window.portfolioMarkets || {};
  const marketFilter = document.querySelector('#market-filter');
  const resetFilters = document.querySelector('#reset-filters');
  const emptyState = document.querySelector('#empty-experiences');
  let activeFilter = 'all';
  let activeMarket = 'all';
  let expanded = false;

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function renderExperience(experience) {
    const card = element('details', 'experience-card');
    const summary = element('summary', 'experience-summary');
    const brand = element('span', `company-mark mark-${experience.color}`, experience.monogram);
    if (experience.logo) {
      brand.classList.add('has-logo');
      const logo = element('img', 'client-logo');
      logo.src = experience.logo;
      logo.alt = '';
      logo.width = 96;
      logo.height = 60;
      logo.loading = 'lazy';
      logo.addEventListener('error', () => {
        brand.classList.remove('has-logo');
        brand.textContent = experience.monogram;
      }, { once: true });
      brand.replaceChildren(logo);
    } else if (experience.monogram.length > 2) brand.classList.add('company-mark-small');
    brand.setAttribute('aria-hidden', 'true');
    const identity = element('div', 'experience-identity');
    const companyLine = element('div', 'company-line');
    companyLine.append(element('h3', '', experience.company));
    if (experience.current) companyLine.append(element('span', 'current-badge', 'En cours'));
    const kind = experience.market ? 'Client' : 'Association';
    identity.append(element('p', 'experience-kind', kind), companyLine, element('p', 'experience-role', experience.role));
    const meta = element('div', 'experience-meta');
    meta.append(element('span', 'experience-period', experience.period));
    meta.append(element('span', 'experience-category', experience.market ? markets[experience.market] : 'Bénévolat · Culture & éducation'));
    const toggle = element('span', 'experience-toggle');
    toggle.setAttribute('aria-hidden', 'true');
    summary.append(brand, identity, meta, toggle);
    const body = element('div', 'experience-body');
    body.append(element('p', 'mission-lead', experience.summary));
    const projects = experience.projects || [experience];
    projects.forEach(project => {
      const block = element('div', experience.projects ? 'mission-project' : 'mission-content');
      const headingLevel = experience.projects ? 'h5' : 'h4';
      if (experience.projects) {
        const heading = element('div', 'project-heading');
        heading.append(element('h4', '', project.title), element('p', '', project.period));
        block.append(heading);
      }
      const columns = element('div', 'mission-columns');
      const context = element('div', 'mission-context');
      context.append(element(headingLevel, 'detail-heading', 'Le contexte'), element('p', '', project.context));
      const missions = element('div', 'mission-tasks');
      missions.append(element(headingLevel, 'detail-heading', 'Mon intervention'));
      const tasks = element('ul', 'task-list');
      project.missions.forEach(mission => tasks.append(element('li', '', mission)));
      missions.append(tasks);
      columns.append(context, missions);
      block.append(columns);
      if (project.outcome) block.append(element('p', 'mission-outcome', project.outcome));
      body.append(block);
    });
    const tools = element('ul', 'tool-tags');
    tools.setAttribute('aria-label', 'Outils et compétences mobilisés');
    experience.tools.forEach(tool => tools.append(element('li', '', tool)));
    body.append(tools);
    card.append(summary, body);
    return card;
  }

  function render() {
    const filtered = activeFilter !== 'all' || activeMarket !== 'all';
    const matching = experiences.filter(experience =>
      (activeFilter === 'all' || experience.categories.includes(activeFilter)) &&
      (activeMarket === 'all' || experience.market === activeMarket));
    const visible = !filtered && !expanded ? matching.slice(0, 6) : matching;
    list.replaceChildren(...visible.map(renderExperience));
    count.textContent = filtered ? `${matching.length} expérience${matching.length === 1 ? '' : 's'} sur ${experiences.length}` : `${visible.length} / ${matching.length} expériences`;
    more.hidden = filtered || matching.length <= 6;
    resetFilters.hidden = !filtered;
    emptyState.hidden = matching.length > 0;
    more.setAttribute('aria-expanded', String(expanded));
    more.replaceChildren(document.createTextNode(expanded ? 'Réduire le parcours ' : `Voir les ${matching.length} expériences `), element('span', '', expanded ? '−' : '＋'));
    more.lastElementChild.setAttribute('aria-hidden', 'true');
  }

  filters.forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    expanded = false;
    filters.forEach(filter => {
      const selected = filter === button;
      filter.classList.toggle('is-active', selected);
      filter.setAttribute('aria-pressed', String(selected));
    });
    render();
  }));

  Object.entries(markets).forEach(([value, label]) => {
    const option = element('option', '', label);
    option.value = value;
    marketFilter.append(option);
  });
  marketFilter.addEventListener('change', () => {
    activeMarket = marketFilter.value;
    expanded = false;
    render();
  });
  resetFilters.addEventListener('click', () => {
    activeFilter = 'all';
    activeMarket = 'all';
    expanded = false;
    marketFilter.value = 'all';
    filters.forEach(filter => {
      const selected = filter.dataset.filter === 'all';
      filter.classList.toggle('is-active', selected);
      filter.setAttribute('aria-pressed', String(selected));
    });
    render();
    filters[0].focus({ preventScroll: true });
  });

  more.addEventListener('click', () => {
    expanded = !expanded;
    render();
    if (expanded) list.children[6]?.querySelector('summary').focus({ preventScroll: true });
    else document.querySelector('#experiences').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  });
  render();
  document.querySelector('#volunteering-list').replaceChildren(...(window.portfolioVolunteering || []).map(renderExperience));

  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.navigation');
  function closeMenu() {
    menu.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  }
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menu.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!nav.contains(event.target) && !menu.contains(event.target)) closeMenu();
  });
  matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

  const sections = [...document.querySelectorAll('main > section[id]')];
  const navLinks = [...nav.querySelectorAll('a')];
  let scheduled = false;
  function updateNavigation() {
    let active = sections[0].id;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= 180) active = section.id;
    }
    navLinks.forEach(link => {
      if (link.hash === `#${active}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scheduled = false;
  }
  window.addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateNavigation); }
  }, { passive: true });
  updateNavigation();
  document.querySelector('#year').textContent = new Date().getFullYear();
})();
