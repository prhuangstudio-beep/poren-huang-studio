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
const pageUrl=work=>`works/${work[2]}.html`;
const absolute=url=>new URL(url,publicUrl).href;
const imageSequence=work=>imageOrders[work[2]]||Array.from({length:work[5]},(_,i)=>i+1);
const visibleInfo=work=>{
  const source=details[work[2]]||['Available on request',work[3],work[4]];
  const rows=[(dimensions[work[2]]||[source[0]]).join('<br>'),source[1]];
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
  const title=`${work[0]} | Poren Huang Studio`;
  const material=work[3]&&work[3]!=='To be confirmed'?work[3]:'';
  const color=work[4]&&work[4]!=='To be confirmed'?work[4]:'';
  const description=[`${work[0]} (${work[1]}) by Poren Huang`,material,color].filter(Boolean).join('. ')+'.';
  const {previous,next}=adjacentWorks(work);
  const variants=catalog.filter(item=>item[0]===work[0]);
  const thumbnails=sequence.map((item,index)=>`<button class="${index===0?'active':''}" data-image="${image(work,item)}"><img src="${image(work,item)}" alt="${esc(work[0])} view ${index+1}" loading="lazy" decoding="async"></button>`).join('');
  const variantHtml=variants.length>1?`<section class="work-variants" aria-label="Material and colour variations">${variants.map(item=>`<a class="${item===work?'active':''}" href="${pageUrl(item)}"><img src="${image(item,imageSequence(item)[0])}" alt="${esc(item[0])} variation" loading="lazy" decoding="async"><span>${esc(item[3])}</span>${visibleInfo(item)[2]?`<small>${esc(visibleInfo(item)[2])}</small>`:''}</a>`).join('')}</section>`:'';
  const related=relatedWorks(work).map(item=>`<a href="${pageUrl(item)}"><span class="square-media"><img src="${image(item)}" alt="${esc(item[0])}" loading="lazy" decoding="async"></span><span>${esc(item[0])} · ${item[1]}</span></a>`).join('');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><base href="../"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:image" content="${absolute(firstImage)}"><meta name="twitter:card" content="summary_large_image"><link rel="stylesheet" href="assets/style.css"><link rel="stylesheet" href="assets/works-overrides.css"></head><body><header><a class="brand" href="index.html">POREN HUANG <small>STUDIO</small></a><nav><a href="about.html">Artist</a><a class="active" href="works.html">Works</a><a href="exhibitions.html">Exhibitions & News</a><a href="press.html">Press</a><a href="index.html#contact">Contact</a></nav></header><main class="page work-detail-page static-work-page"><a class="back-to-works" href="works.html" aria-label="Back to works">←</a><section class="work-detail"><div class="work-gallery"><figure class="work-main"><img src="${firstImage}" alt="${esc(work[0])} artwork" decoding="async"></figure><div class="work-thumbnails">${thumbnails}</div></div><div class="work-detail-info"><div class="work-heading"><h1>${esc(work[0])}</h1><span>${work[1]}</span></div><div class="work-data">${visibleInfo(work).map(row=>`<p>${row}</p>`).join('')}</div><button class="concept-toggle" aria-expanded="false">Statement...</button><p class="concept-copy" hidden>Statement to be added.</p><div class="work-neighbor-nav" aria-label="Adjacent works"><a href="${pageUrl(previous)}"><span>Prev</span><strong>${esc(previous[0])}</strong></a><a href="${pageUrl(next)}"><span>Next</span><strong>${esc(next[0])}</strong></a></div></div></section>${variantHtml}<section class="related-works"><p class="eyebrow">MORE WORKS</p><div>${related}</div></section></main><footer><p>POREN HUANG STUDIO</p><small>© <span id="year"></span> Poren Huang Studio</small></footer><script src="assets/site.js"></script><script src="assets/work-page.js"></script></body></html>`;
};

fs.mkdirSync(outDir,{recursive:true});
fs.readdirSync(outDir).filter(file=>file.endsWith('.html')).forEach(file=>fs.unlinkSync(path.join(outDir,file)));
catalog.forEach(work=>fs.writeFileSync(path.join(outDir,`${work[2]}.html`),renderWork(work)));
console.log(`Generated ${catalog.length} work pages in ${path.relative(root,outDir)}`);
