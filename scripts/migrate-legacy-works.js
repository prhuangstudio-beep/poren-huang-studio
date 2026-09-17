/* One-time importer for the pre-SSG catalogue. The build itself only reads data/works.json. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'assets', 'works-catalog.js'), 'utf8');
function readConst(name) {
  const start = source.indexOf(`const ${name}=`);
  if (start < 0) throw new Error(`Missing ${name}`);
  const valueStart = source.indexOf('=', start) + 1;
  let depth = 0, quote = '', escaped = false, end = valueStart;
  for (; end < source.length; end++) {
    const char = source[end];
    if (quote) {
      escaped = char === '\\' && !escaped;
      if (char === quote && !escaped) quote = '';
      if (char !== '\\') escaped = false;
      continue;
    }
    if (`'\"\``.includes(char)) { quote = char; continue; }
    if (char === '[' || char === '{') depth++;
    if (char === ']' || char === '}') depth--;
    if (depth === 0 && char === ';') break;
  }
  return vm.runInNewContext(`(${source.slice(valueStart, end).trim()})`);
}

const catalog = readConst('catalog');
const englishTitles = readConst('englishTitles');
const concepts = readConst('concepts');
const details = readConst('details');
const dimensions = readConst('dimensions');
const imageOrders = readConst('imageOrders');
const legacyChineseTitles = {
  '2005-mission-bronze-black':'任務','2005-territory-bronze-black':'地盤','2005-absorption-bronze-black':'吸收','2005-continuation-bronze-black':'延續','2005-going-home-bronze-black':'回家','2005-waiting-bronze-black':'等待','2005-lackey-bronze-black':'狗腿子','2005-security-guard-bronze-black':'保全','2005-looking-down-bronze-black':'狗眼看人低','2005-man-and-woman-bronze-black':'男&女','2005-unhappy-bronze-black':'不爽','2005-unhappy-stainless-steel':'不爽','2006-no-entry-bronze-black':'禁區','2006-happy-time-bronze-black':'快樂時光','2006-warm-winter-bronze-black':'暖冬','2006-banquet-bronze-black-gold':'赴宴','2006-territory-ii-bronze-black':'地盤(二)','2006-memory-bronze-black':'記憶','2007-big-ears-bronze-black':'大耳朵','2007-territory-iii-bronze-black':'地盤(三)','2007-every-day-bronze-gold-leaf':'每一天','2007-holding-the-line-bronze-gold-leaf':'堅守岡位','2007-embrace-of-love-bronze-black-gold':'愛的擁抱','2007-dream-911-bronze-black':'夢想911','2008-21st-century-bronze-black-white':'21世紀','2008-night-patrol-stainless-steel':'夜巡','2008-wise-mind-bronze-black-gold':'智者的思維','2008-world-so-big-bronze-black-white':'世界那麼大','2009-father-and-son-bronze-black':'父子','2009-pride-of-heaven-bronze-black-gold-leaf':'天之驕子','2009-message-bronze-gold-leaf':'訊息','2009-new-world-bronze-black':'新大陸','2009-dreams-bronze-black':'夢想','2010-what-the-heck-stainless-steel':'哇靠','2010-little-rascal-stainless-steel':'小淘氣','2010-backbone-stainless-steel':'骨氣','2010-grumpy-stainless-steel':'臭脾氣','2010-the-loved-one-stainless-steel':'天之驕子','2015-shh-stainless-steel':'噓','2015-chu-copper-foil-stainless-steel':'啾咪','power-food':'','super-power':'超動力'
};
// Preserve every previously curated Chinese title from the old page generator.
const generatorSource = fs.readFileSync(path.join(root, 'scripts', 'generate-work-pages.js'), 'utf8');
const chineseStart = generatorSource.indexOf('const chineseTitles=');
const chineseValueStart = generatorSource.indexOf('=', chineseStart) + 1;
const chineseEnd = generatorSource.indexOf('\n};', chineseValueStart) + 2;
const chineseTitles = { ...legacyChineseTitles, ...vm.runInNewContext(`(${generatorSource.slice(chineseValueStart, chineseEnd).replace(/;$/, '').trim()})`) };
function materialZh(value) {
  return String(value || '').replace(/copper foil/ig, '銅箔').replace(/stainless steel/ig, '不鏽鋼').replace(/bronze/ig, '銅雕').replace(/,\s*/g, '、').replace(/to be confirmed/ig, '待確認');
}
function parseDimension(raw) {
  const value = String(raw || '').trim();
  const shape = /^○/.test(value) ? 'circle' : /^△/.test(value) ? 'triangle' : '';
  const clean = value.replace(/^[○△]\s*/, '').replace(/^(SS|S|M|L|XL|AP)\s+/i, '');
  const match = clean.match(/([\d.]+(?:\s*[x×]\s*[\d.]+){1,2})\s*(cm)?/i);
  return { shape, size: match ? match[1].replace(/\s*/g, '') : clean, unit: match && match[2] ? 'cm' : 'cm' };
}
const works = catalog.map((row, index) => {
  const [legacyTitle, year, slug, material, colorway, imageCount] = row;
  const title_en = englishTitles[slug] || legacyTitle;
  const title_zh = chineseTitles[slug] || '';
  const sequence = imageOrders[slug] || Array.from({ length: imageCount }, (_, i) => i + 1);
  return {
    id: slug,
    title_en,
    title_zh,
    year,
    material_en: slug === 'power-food' ? 'Bronze' : material,
    material_zh: slug === 'power-food' ? '銅雕' : materialZh(material),
    dimensions: (dimensions[slug] || []).map(parseDimension),
    edition: null,
    colorway: colorway || null,
    description_en: concepts[slug] || '',
    description_zh: '',
    images: sequence.map(number => ({
      filename: `assets/catalog/${slug}/${String(number).padStart(2, '0')}.jpg`,
      alt_en: `Poren Huang sculpture “${title_en}”, view ${number}`,
      alt_zh: `黃柏仁雕塑作品《${title_en}》第${number}視角`
    })),
    slug,
    availability: 'available',
    featured: index < 6,
    order: index + 1
  };
});
fs.mkdirSync(path.join(root, 'data'), { recursive: true });
fs.writeFileSync(path.join(root, 'data', 'works.json'), `${JSON.stringify(works, null, 2)}\n`);
console.log(`Imported ${works.length} works into data/works.json`);
