const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const site = 'https://porenhuang.com';
const works = JSON.parse(fs.readFileSync(path.join(root, 'data', 'works.json'), 'utf8')).sort((a, b) => a.order - b.order);
const read = name => fs.readFileSync(path.join(root, 'templates', name), 'utf8');
const write = (file, value) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, value); };
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const clean = value => String(value ?? '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
const render = (template, values) => template.replace(/{{(\w+)}}/g, (_, key) => values[key] ?? '');
const title = work => [work.title_en, work.title_zh].filter(Boolean).join(' ');
const imageUrl = image => `${site}/${image.filename}`;
const dimText = dimension => [dimension.shape, dimension.size && `${dimension.size}${dimension.unit || ''}`].filter(Boolean).join(' ');
const workDescription = work => clean([work.description_zh, work.description_en].filter(Boolean).join(' ')) || `${title(work)}, ${work.year}. A sculpture by Poren Huang 黃柏仁.`;
const numberValues = work => {
  const first = work.dimensions?.[0];
  if (!first) return {};
  const values = String(first.size || '').match(/[\d.]+/g)?.map(Number) || [];
  const unit = first.unit === 'cm' ? 'CMT' : undefined;
  const quantitative = value => value === undefined ? undefined : { '@type': 'QuantitativeValue', value, unitCode: unit };
  return { width: quantitative(values[0]), height: quantitative(values[1]), depth: quantitative(values[2]) };
};
const person = JSON.parse(read('person-schema.json'));
function artworkSchema(work) {
  return {
    '@context': 'https://schema.org', '@type': 'VisualArtwork', '@id': `${site}/works/${work.slug}#artwork`,
    name: work.title_en, ...(work.title_zh ? { alternateName: work.title_zh } : {}),
    image: work.images.map(imageUrl), creator: { '@id': person['@id'], name: person.name, alternateName: person.alternateName },
    dateCreated: String(work.year), artMedium: work.material_en, artform: 'Sculpture',
    ...numberValues(work), description: workDescription(work), url: `${site}/works/${work.slug}`
  };
}
function card(work) {
  const first = work.images[0];
  const search = [work.title_en, work.title_zh, work.year, work.material_en, work.material_zh].filter(Boolean).join(' ').toLocaleLowerCase();
  return `<a class="work-card" data-work-card data-year="${esc(work.year)}" data-search="${esc(search)}" href="works/${esc(work.slug)}"><figure><img src="${esc(first.filename)}" alt="${esc(first.alt_zh || first.alt_en)}" loading="lazy" decoding="async"></figure><div class="works-card-meta"><strong>${esc(work.title_en)}</strong>${work.title_zh ? `<span>${esc(work.title_zh)}</span>` : ''}<time>${esc(work.year)}</time></div></a>`;
}
const indexTemplate = read('works-index.html');
const years = [...new Set(works.map(work => work.year))].sort((a, b) => b - a);
const indexPage = render(indexTemplate, { yearOptions: years.map(year => `<option value="${year}">${year}</option>`).join(''), workCards: works.map(card).join('') });
write(path.join(root, 'works', 'index.html'), indexPage);
write(path.join(root, 'works.html'), indexPage);

const detailTemplate = read('work-page.html');
works.forEach((work, index) => {
  const previous = works[(index - 1 + works.length) % works.length];
  const next = works[(index + 1) % works.length];
  const metadata = [
    work.dimensions?.length ? `<p>${work.dimensions.map(dimText).map(esc).join('<br>')}</p>` : '',
    work.material_en ? `<p>${esc(work.material_en)}${work.material_zh ? ` / ${esc(work.material_zh)}` : ''}</p>` : '',
    work.edition ? `<p>Edition: ${esc(work.edition)}</p>` : '',
    work.colorway ? `<p>${esc(work.colorway)}</p>` : ''
  ].filter(Boolean).join('');
  const thumbnails = work.images.map((image, imageIndex) => `<button type="button" class="${imageIndex === 0 ? 'active' : ''}" data-work-image="${esc(image.filename)}" data-work-alt="${esc(image.alt_zh || image.alt_en)}"><img src="${esc(image.filename)}" alt="${esc(image.alt_zh || image.alt_en)}" loading="lazy" decoding="async"></button>`).join('');
  const description = [work.description_en, work.description_zh].filter(Boolean).join('\n');
  const values = {
    title: esc(`${title(work)} | Poren Huang Studio 黃柏仁`), description: esc(workDescription(work)), canonical: `${site}/works/${work.slug}`,
    ogImage: imageUrl(work.images[0]), schema: JSON.stringify(artworkSchema(work)), mainImage: esc(work.images[0].filename), mainAlt: esc(work.images[0].alt_zh || work.images[0].alt_en),
    thumbnails, heading: `${esc(work.title_en)}${work.title_zh ? `<small>${esc(work.title_zh)}</small>` : ''}`, year: esc(work.year), metadata,
    descriptionBlock: description ? `<div class="work-description"><p>${esc(description).replace(/\n/g, '<br>')}</p></div>` : '',
    neighbors: `<a href="works/${esc(previous.slug)}"><span>Prev</span><strong>${esc(previous.title_en)}</strong></a><a href="works/${esc(next.slug)}"><span>Next</span><strong>${esc(next.title_en)}</strong></a>`
  };
  write(path.join(root, 'works', `${work.slug}.html`), render(detailTemplate, values));
});

// The shared Person source is inserted on the two manually-authored pages on every build.
['index.html', 'about.html'].forEach(file => {
  const target = path.join(root, file);
  let html = fs.readFileSync(target, 'utf8');
  const personScript = `<script type="application/ld+json">${JSON.stringify(person)}</script>`;
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, personScript);
  write(target, html);
});

const routes = ['', 'about', 'works', 'exhibitions', 'press', ...works.map(work => `works/${work.slug}`)];
write(path.join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(route => `  <url><loc>${site}/${route}</loc></url>`).join('\n')}\n</urlset>\n`);
console.log(`Built ${works.length} static work pages, works index and sitemap.`);
