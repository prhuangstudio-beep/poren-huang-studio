(() => {
  const filter = document.querySelector('.works-year-filter');
  const input = document.querySelector('.works-search input');
  const cards = [...document.querySelectorAll('[data-work-card]')];
  if (!cards.length) return;
  const normalize = value => String(value || '').normalize('NFKC').toLocaleLowerCase().replace(/[\s\-–—_.,，。'"!！?？/\\()（）]/g, '');
  const update = () => {
    const year = filter?.value || '';
    const query = normalize(input?.value);
    cards.forEach(card => {
      const matchYear = !year || card.dataset.year === year;
      const searchable = normalize(`${card.dataset.search || ''} ${card.textContent || ''}`);
      const matchText = !query || searchable.includes(query);
      card.hidden = !(matchYear && matchText);
    });
  };
  filter?.addEventListener('change', update);
  input?.addEventListener('input', update);
  input?.addEventListener('search', update);
  document.querySelector('.works-search button')?.addEventListener('click', () => { input?.focus(); update(); });
})();
