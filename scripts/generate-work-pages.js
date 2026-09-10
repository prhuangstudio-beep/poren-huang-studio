const fs=require('fs');
const path=require('path');
const vm=require('vm');

const root=path.resolve(__dirname,'..');
const catalogPath=path.join(root,'assets','works-catalog.js');
const outDir=path.join(root,'works');
const publicUrl=(process.env.PUBLIC_URL||'https://porenhuang.com/').replace(/\/?$/,'/');

const source=fs.readFileSync(catalogPath,'utf8');
const readConst=name=>{
  const start=source.indexOf(`const ${name}=`);
  if(start<0)throw new Error(`Missing ${name}`);
  const valueStart=source.indexOf('=',start)+1;
  let index=valueStart,depth=0,quote='',escaped=false;
  for(;index<source.length;index++){
    const char=source[index];
    if(quote){
      escaped=char==='\\'&&!escaped;
      if(char===quote&&!escaped)quote='';
      if(char!=='\\')escaped=false;
      continue;
    }
    if(char==='"'||char==="'"||char==='`'){quote=char;continue}
    if(char==='['||char==='{')depth++;
    if(char===']'||char==='}')depth--;
    if(depth===0&&char===';')break;
  }
  return vm.runInNewContext('('+source.slice(valueStart,index).trim()+')');
};

const catalog=readConst('catalog');
const englishTitles=readConst('englishTitles');
const details=readConst('details');
const dimensions=readConst('dimensions');
const imageOrders=readConst('imageOrders');
const coverIndexes=readConst('coverIndexes');

catalog.forEach(work=>{if(englishTitles[work[2]])work[0]=englishTitles[work[2]]});

const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const image=(work,index=1)=>`assets/catalog/${work[2]}/${String(index).padStart(2,'0')}.jpg?v=20260902pf`;
const pageUrl=work=>`works/${work[2]}`;
const absolute=url=>new URL(url,publicUrl).href;
const pageAbsolute=work=>absolute(pageUrl(work));
const imageSequence=work=>imageOrders[work[2]]||Array.from({length:work[5]},(_,i)=>i+1);
const chineseTitles={
  'power-food':'權力食物',
  '2019-awoooooo-stainless-steel':'啊嗚',
  '2015-little-dog-bronze-white-black':'小狗',
  '2014-little-mischief-stainless-steel':'小淘氣',
  '2010-wow-stainless-steel':'哇靠',
  '2009-pride-of-heaven-bronze-black-gold-leaf':'天之驕子',
  '2006-happy-time-bronze-black':'快樂時光',
  '2017-bad-temper-bronze-black-gold':'臭脾氣',
  '2018-spirit-bronze-black':'骨氣',
  '2018-spirit-bronze-black-silver':'骨氣',
  '2018-spirit-bronze-lake-green':'骨氣',
  '2018-spirit-bronze-white':'骨氣',
  '2018-spirit-bronze-white-gold':'骨氣',
  '2018-spirit-stainless-steel':'骨氣',
  '2009-message-bronze-gold-leaf':'訊息',
  '2009-new-continent-bronze-black-white':'新大陸',
  '2009-dream-stainless-steel':'夢想'
};
const materialZhMap=[
  [/stainless steel/i,'不鏽鋼'],
  [/bronze/i,'銅雕'],
  [/baking paint|paint/i,'烤漆'],
  [/gold foil|gold leaf/i,'金箔'],
  [/pillow/i,'枕頭'],
  [/frp/i,'FRP']
];
const clean=value=>String(value||'').replace(/To be confirmed/gi,'').trim();
const materialText=work=>clean((details[work[2]]||[])[1]||work[3]);
const colorText=work=>clean((details[work[2]]||[])[2]||work[4]);
const zhMaterial=value=>materialZhMap.filter(([pattern])=>pattern.test(value)).map(([,label])=>label).filter((label,index,list)=>list.indexOf(label)===index).join('、');
const displayTitle=work=>chineseTitles[work[2]]?`${chineseTitles[work[2]]} ${work[0]}`:work[0];
const variantLabel=work=>[materialText(work),colorText(work)].filter(Boolean).join(' · ');
const pageTitle=work=>{
  const hasVariants=catalog.some(item=>item!==work&&item[0]===work[0]);
  return `${displayTitle(work)}${hasVariants&&variantLabel(work)?` - ${variantLabel(work)}`:''} | Poren Huang Studio`;
};
const metaDescription=work=>{
  const material=materialText(work);
  const zhMaterialText=zhMaterial(material);
  const zhTitle=chineseTitles[work[2]];
  const zh=[zhTitle||work[0],`，${work[1]}`,(zhMaterialText||material)&&`，${zhMaterialText||material}`,'。黃柏仁雕塑作品。'].filter(Boolean).join('');
  const en=[work[0],work[1],material].filter(Boolean).join(', ')+'. A sculpture by Poren Huang.';
  return `${zh} ${en}`;
};
const imageAlt=(work,extra='')=>{
  const material=zhMaterial(materialText(work))||materialText(work);
  return `黃柏仁雕塑作品《${displayTitle(work)}》${material}${extra?`，${extra}`:''}`;
};
const visibleInfo=work=>{
  const source=details[work[2]]||['Available on request',work[3],work[4]];
  const rows=[(dimensions[work[2]]||[source[0]]).join('<br>'),clean(source[1])];
  const color=work[2]==='power-food'?'Colorway':source[2];
  if(color&&color!=='To be confirmed')rows.push(color);
  return rows.filter(Boolean);
};
const groups=[];
catalog.forEach(item=>{
  if(!groups.some(group=>group[0][0]===item[0]))groups.push(catalog.filter(candidate=>candidate[0]===item[0]));
});
const adjacentWorks=work=>{
  const index=groups.findIndex(group=>group.includes(work));
  return {
    previous:groups[(index-1+groups.length)%groups.length][0],
    next:groups[(index+1)%groups.length][0]
  };
};
const relatedWorks=selected=>catalog
  .filter(work=>work!==selected)
  .sort((a,b)=>Math.abs(a[1]-selected[1])-Math.abs(b[1]-selected[1])||b[1]-a[1])
  .slice(0,6);

const renderWork=work=>{
  const sequence=imageSequence(work);
  const firstImage=image(work,sequence[0]);
  const title=pageTitle(work);
  const description=metaDescription(work);
  const canonical=pageAbsolute(work);
  const schema={
    '@context':'https://schema.org',
    '@type':'VisualArtwork',
    name:displayTitle(work),
    creator:{'@type':'VisualArtist',name:'Poren Huang',alternateName:'黃柏仁',url:publicUrl},
    dateCreated:String(work[1]),
    artMedium:materialText(work)||undefined,
    image:absolute(firstImage),
    url:canonical
  };
  const {previous,next}=adjacentWorks(work);
  const variants=catalog.filter(item=>item[0]===work[0]);
  const thumbnails=sequence.map((item,index)=>`<button class="${index===0?'active':''}" data-image="${image(work,item)}"><img src="${image(work,item)}" alt="${esc(imageAlt(work,`第 ${index+1} 張角度`))}" loading="lazy" decoding="async"></button>`).join('');
  const variantHtml=variants.length>1?`<section class="work-variants" aria-label="Material and colour variations">${variants.map(item=>`<a class="${item===work?'active':''}" href="${pageUrl(item)}"><img src="${image(item,imageSequence(item)[0])}" alt="${esc(imageAlt(item,'材質與色彩版本'))}" loading="lazy" decoding="async"><span>${esc(item[3])}</span>${visibleInfo(item)[2]?`<small>${esc(visibleInfo(item)[2])}</small>`:''}</a>`).join('')}</section>`:'';
  const related=relatedWorks(work).map(item=>`<a href="${pageUrl(item)}"><span class="square-media"><img src="${image(item)}" alt="${esc(imageAlt(item))}" loading="lazy" decoding="async"></span><span>${esc(item[0])} · ${item[1]}</span></a>`).join('');
  return `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><base href="../"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="keywords" content="${esc("黃柏仁雕塑, 狗札記, The Dog's Notes, contemporary sculpture, bronze, stainless steel, Taiwanese sculptor")}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:image" content="${absolute(firstImage)}"><meta property="og:url" content="${canonical}"><meta name="twitter:card" content="summary_large_image"><link rel="canonical" href="${canonical}"><link rel="stylesheet" href="assets/style.css"><link rel="stylesheet" href="assets/works-overrides.css"><script type="application/ld+json">${JSON.stringify(schema)}</script></head><body><header><a class="brand" href="/">POREN HUANG <small>STUDIO</small></a><nav><a href="about">Artist</a><a class="active" href="works">Works</a><a href="exhibitions">Exhibitions & News</a><a href="press">Press</a><a href="/#contact">Contact</a></nav></header><main class="page work-detail-page static-work-page"><a class="back-to-works" href="works" aria-label="Back to works">←</a><section class="work-detail"><div class="work-gallery"><figure class="work-main"><img src="${firstImage}" alt="${esc(imageAlt(work))}" decoding="async"></figure><div class="work-thumbnails">${thumbnails}</div></div><div class="work-detail-info"><div class="work-heading"><h1>${esc(displayTitle(work))}</h1><span>${work[1]}</span></div><div class="work-data">${visibleInfo(work).map(row=>`<p>${row}</p>`).join('')}</div><button class="concept-toggle" aria-expanded="false">Statement...</button><p class="concept-copy" hidden>Statement to be added.</p><div class="work-neighbor-nav" aria-label="Adjacent works"><a href="${pageUrl(previous)}"><span>Prev</span><strong>${esc(previous[0])}</strong></a><a href="${pageUrl(next)}"><span>Next</span><strong>${esc(next[0])}</strong></a></div></div></section>${variantHtml}<section class="related-works"><p class="eyebrow">MORE WORKS</p><div>${related}</div></section></main><footer><p>POREN HUANG STUDIO</p><small>© <span id="year"></span> Poren Huang Studio</small></footer><script src="assets/site.js"></script><script src="assets/work-page.js"></script></body></html>`;
};

fs.mkdirSync(outDir,{recursive:true});
fs.readdirSync(outDir).filter(file=>file.endsWith('.html')).forEach(file=>fs.unlinkSync(path.join(outDir,file)));
catalog.forEach(work=>fs.writeFileSync(path.join(outDir,`${work[2]}.html`),renderWork(work)));
const staticPages=['','about','works','series','exhibitions','press'];
const urls=[...staticPages.map(slug=>`${publicUrl}${slug}`),...catalog.map(pageAbsolute)];
fs.writeFileSync(path.join(root,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url=>`  <url><loc>${url}</loc></url>`).join('\n')}\n</urlset>\n`);
console.log(`Generated ${catalog.length} work pages in ${path.relative(root,outDir)}`);
