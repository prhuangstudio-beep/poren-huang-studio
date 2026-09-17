(() => {
  const filter = document.querySelector('.works-year-filter');
  const input = document.querySelector('.works-search input');
  const cards = [...document.querySelectorAll('[data-work-card]')];
  if (!cards.length) return;
  const update = () => {
    const year = filter?.value || '';
    const query = (input?.value || '').trim().toLocaleLowerCase();
    cards.forEach(card => {
      const matchYear = !year || card.dataset.year === year;
      const matchText = !query || (card.dataset.search || '').includes(query);
      card.hidden = !(matchYear && matchText);
    });
  };
  filter?.addEventListener('change', update);
  input?.addEventListener('input', update);
})();
