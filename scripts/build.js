const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

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
const imageSize = filename => {
  const data = fs.readFileSync(path.join(root, filename));
  for (let i = 2; i < data.length - 9; i++) if (data[i] === 0xff && [0xc0, 0xc1, 0xc2].includes(data[i + 1])) return { height: data.readUInt16BE(i + 5), width: data.readUInt16BE(i + 7) };
  return { width: 1200, height: 1200 };
};
const widthsFor = width => [...new Set([400, 800, 1200, 1920].filter(value => value <= width).concat(width))].sort((a, b) => a - b);
const picture = (image, { lazy = true } = {}) => {
  const size = imageSize(image.filename), widths = widthsFor(size.width), directory = path.posix.dirname(image.filename), base = path.posix.basename(image.filename, path.posix.extname(image.filename));
  const srcset = extension => widths.map(width => `${directory}/optimized/${base}-${width}w.${extension} ${width}w`).join(', ');
  return `<picture><source type="image/avif" srcset="${srcset('avif')}" sizes="(max-width: 700px) 92vw, (max-width: 1200px) 46vw, 800px"><source type="image/webp" srcset="${srcset('webp')}" sizes="(max-width: 700px) 92vw, (max-width: 1200px) 46vw, 800px"><img src="${image.filename}" srcset="${srcset('jpg')}" sizes="(max-width: 700px) 92vw, (max-width: 1200px) 46vw, 800px" alt="${esc(image.alt_zh || image.alt_en)}" width="${size.width}" height="${size.height}"${lazy ? ' loading="lazy"' : ''} decoding="async"></picture>`;
};
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
  return `<a class="work-card" data-work-card data-year="${esc(work.year)}" data-search="${esc(search)}" href="works/${esc(work.slug)}"><figure>${picture(first)}</figure><div class="works-card-meta"><strong lang="en">${esc(work.title_en)}</strong>${work.title_zh ? `<span>${esc(work.title_zh)}</span>` : ''}<time>${esc(work.year)}</time></div></a>`;
}
const indexTemplate = read('works-index.html');
const years = [...new Set(works.map(work => work.year))].sort((a, b) => b - a);
const hreflang = url => `<link rel="alternate" hreflang="zh-Hant" href="${url}"><link rel="alternate" hreflang="en" href="${url}"><link rel="alternate" hreflang="x-default" href="${url}">`;
const indexPage = render(indexTemplate, { yearOptions: years.map(year => `<option value="${year}">${year}</option>`).join(''), workCards: works.map(card).join(''), hreflang: hreflang(`${site}/works`) });
write(path.join(root, 'works', 'index.html'), indexPage);
write(path.join(root, 'works.html'), indexPage);

const detailTemplate = read('work-page.html');
works.forEach((work, index) => {
  // Colour/material variants share a title, but adjacent navigation should
  // always lead to a different artwork rather than another version of itself.
  const adjacentDistinct = direction => {
    for (let offset = 1; offset < works.length; offset++) {
      const candidate = works[(index + direction * offset + works.length) % works.length];
      if (candidate.title_en !== work.title_en) return candidate;
    }
    return work;
  };
  const previous = adjacentDistinct(-1);
  const next = adjacentDistinct(1);
  const metadata = [
    work.dimensions?.length ? `<p>${work.dimensions.map(dimText).map(esc).join('<br>')}</p>` : '',
    work.material_en ? `<p>${esc(work.material_en)}${work.material_zh ? ` / ${esc(work.material_zh)}` : ''}</p>` : '',
    work.edition ? `<p>Edition: ${esc(work.edition)}</p>` : '',
    work.colorway ? `<p>${esc(work.colorway)}</p>` : ''
  ].filter(Boolean).join('');
  const thumbnails = work.images.map((image, imageIndex) => `<button type="button" class="${imageIndex === 0 ? 'active' : ''}" data-work-image="${esc(image.filename)}" data-work-alt="${esc(image.alt_zh || image.alt_en)}">${picture(image)}</button>`).join('');
  const description = [work.description_en, work.description_zh].filter(Boolean).join('\n');
  const relatedWorks = [...works.slice(index + 1), ...works.slice(0, index)].slice(0, 4).map(item => `<a href="works/${esc(item.slug)}"><span class="square-media">${picture(item.images[0])}</span><span lang="en">${esc(item.title_en)} · ${esc(item.year)}</span></a>`).join('');
  const contactSubject = `Contact — ${title(work)} (${work.year})`;
  const contactBody = `Hello Poren Huang Studio,\n\nI am contacting you about: ${title(work)} (${work.year}).\n\nHow should we address you?\nName:\nContact information:\nMessage:\n`;
  const values = {
    title: esc(`${title(work)} | Poren Huang Studio 黃柏仁`), description: esc(workDescription(work)), canonical: `${site}/works/${work.slug}`,
    ogImage: imageUrl(work.images[0]), schema: JSON.stringify(artworkSchema(work)), mainImage: picture(work.images[0], { lazy: false }), mainAlt: esc(work.images[0].alt_zh || work.images[0].alt_en), hreflang: hreflang(`${site}/works/${work.slug}`),
    thumbnails, heading: `<span lang="en">${esc(work.title_en)}</span>${work.title_zh ? `<small>${esc(work.title_zh)}</small>` : ''}`, year: esc(work.year), metadata,
    workContact: `<a class="work-contact-me" target="_blank" rel="noopener noreferrer" href="https://mail.google.com/mail/?view=cm&fs=1&to=pr_dogs@yahoo.com.tw&su=${encodeURIComponent(contactSubject)}&body=${encodeURIComponent(contactBody)}">CONTACT ME</a>`,
    descriptionBlock: description ? `<div class="work-description"><p>${esc(description).replace(/\n/g, '<br>')}</p></div>` : '', relatedWorks,
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

function addHreflangToStaticPages() {
  const rootPages = fs.readdirSync(root).filter(file => file.endsWith('.html'));
  const workPages = fs.readdirSync(path.join(root, 'works')).filter(file => file.endsWith('.html')).map(file => path.join('works', file));
  [...rootPages, ...workPages].forEach(relative => {
    const target = path.join(root, relative);
    let html = fs.readFileSync(target, 'utf8');
    // Repair legacy escaped attribute quotes before normalising hreflang.
    html = html.replace(/\\(?=")/g, '');
    const route = relative === 'index.html' ? '' : relative.replace(/index\.html$/, '').replace(/\.html$/, '');
    const url = `${site}/${route}`.replace(/\/$/, '/');
    html = html.replace(/<link rel="alternate" hreflang="(?:zh-Hant|en|x-default)"[^>]*>/g, '');
    html = html.replace('</head>', `${hreflang(url)}</head>`);
    html = html.replaceAll(String.fromCharCode(92, 34), '"');
    write(target, html);
  });
}

async function optimizeImages() {
  const cacheFile = path.join(root, '.cache', 'image-optimization.json');
  const cache = fs.existsSync(cacheFile) ? JSON.parse(fs.readFileSync(cacheFile, 'utf8')) : {};
  const images = works.flatMap(work => work.images);
  let created = 0, skipped = 0;
  for (const image of images) {
    const source = path.join(root, image.filename);
    if (!fs.existsSync(source)) continue;
    const stat = fs.statSync(source);
    const size = imageSize(image.filename);
    const directory = path.dirname(source);
    const base = path.basename(source, path.extname(source));
    const optimized = path.join(directory, 'optimized');
    const widths = widthsFor(size.width);
    const outputs = widths.flatMap(width => ['avif', 'webp', 'jpg'].map(extension => path.join(optimized, `${base}-${width}w.${extension}`)));
    if (cache[image.filename]?.mtimeMs === stat.mtimeMs && outputs.every(fs.existsSync)) { skipped++; continue; }
    fs.mkdirSync(optimized, { recursive: true });
    for (const width of widths) {
      const pipeline = sharp(source).resize({ width, withoutEnlargement: true });
      await Promise.all([
        pipeline.clone().avif({ quality: 55 }).toFile(path.join(optimized, `${base}-${width}w.avif`)),
        pipeline.clone().webp({ quality: 78 }).toFile(path.join(optimized, `${base}-${width}w.webp`)),
        pipeline.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(optimized, `${base}-${width}w.jpg`))
      ]);
    }
    cache[image.filename] = { mtimeMs: stat.mtimeMs, widths };
    created++;
  }
  fs.mkdirSync(path.dirname(cacheFile), { recursive: true });
  fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2));
  return { created, skipped };
}

addHreflangToStaticPages();
optimizeImages().then(result => console.log(`Built ${works.length} static work pages, sitemap and optimized images (${result.created} processed, ${result.skipped} cached).`)).catch(error => { console.error(error); process.exitCode = 1; });
