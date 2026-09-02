(()=>{
  const workStyle=document.createElement('link');workStyle.rel='stylesheet';workStyle.href='assets/works-overrides.css';document.head.append(workStyle);
  const catalog=[
    ['Power Food',2026,'power-food','To be confirmed','To be confirmed',5],
    ['Super Power',2025,'super-power-lake-green','Bronze','Lake green',5],['Super Power',2025,'super-power-neon-orange','Bronze','Neon orange',5],['Super Power',2025,'super-power-stainless-steel','Stainless steel','To be confirmed',5],
    ['Speedy',2025,'speedy-black','Bronze','Black',5],['Speedy',2025,'speedy-gold-leaf','Bronze','Gold leaf',5],['Speedy',2025,'speedy-stainless-steel','Stainless steel','To be confirmed',5],
    ['Shake Shake',2025,'shake-shake-black','Bronze','Black',5],['Shake Shake',2025,'shake-shake-lake-green','Bronze','Lake green',4],['Shake Shake',2025,'shake-shake-stainless-steel','Stainless steel','To be confirmed',5],
    ['Bubble',2024,'bubble-black-pink','Bronze, FRP','Black, pink',5],['Bubble',2024,'bubble-green','Stainless steel, FRP','Green',5],['Bubble',2024,'bubble-pink','Stainless steel, FRP','Pink',5],
    ['♥',2024,'heart-bronze-green','Bronze','Green',5],['♥',2024,'heart-stainless-steel','Stainless steel','To be confirmed',5],
    ['Go Up',2023,'go-up-black-red','Bronze, FRP','Black, red',4],['Go Up',2023,'go-up-pink','Stainless steel, FRP','Pink',5],['Go Up',2023,'go-up-yellow','Stainless steel, FRP','Yellow',5],
    ['Fist Bump',2023,'fist-bump-stainless-steel','Stainless steel','To be confirmed',5],['Baby',2023,'baby-grey-black','Bronze, pillow','Grey, black',5],['Baby',2023,'baby-pink','Stainless steel, pillow','Pink',5],
    ['Black Buster',2022,'black-buster-black-red','Bronze','Black, red',5],['Black Buster',2022,'black-buster-grey-red','Bronze','Grey, red',5],
    ['Here',2021,'2021-here-bronze-black','Bronze','Black',5],['So Cute',2021,'2021-so-cute-stainless-steel','Stainless steel','To be confirmed',5],
    ['Cowboy',2020,'2020-cowboy-bronze-gold-leaf-grey','Bronze','Gold leaf, grey',5],['Heart',2020,'2020-heart-bronze-gold-leaf','Bronze','Gold leaf',5],['Heart + For You',2020,'2020-heart-for-you-bronze-pink-blue','Bronze','Pink, blue',5],['Relax',2020,'2020-relax-bronze-black','Bronze','Black',5],['Relax',2020,'2020-relax-bronze-yellow','Bronze','Yellow',4],
    ['Small',2019,'2019-small-bronze-black','Bronze','Black',5],['Small',2019,'2019-small-stainless-steel','Stainless steel','To be confirmed',5],['AWOOOOOO!',2019,'2019-awoooooo-stainless-steel','Stainless steel','To be confirmed',5],['Sweet',2019,'2019-sweet-bronze-grey-pillow-silver','Bronze, pillow','Grey, silver',5],['Sweet',2019,'2019-sweet-stainless-steel-pillow-gold','Stainless steel, pillow','Gold',3],
    ['Spirit',2018,'2018-spirit-bronze-black','Bronze','Black',2],['Spirit',2018,'2018-spirit-bronze-black-silver','Bronze','Black, silver',2],['Spirit',2018,'2018-spirit-bronze-lake-green','Bronze','Lake green',2],['Spirit',2018,'2018-spirit-bronze-white','Bronze','White',2],['Spirit',2018,'2018-spirit-bronze-white-gold','Bronze','White, gold',2],['Spirit',2018,'2018-spirit-stainless-steel','Stainless steel','To be confirmed',2],
    ['Comma',2018,'2018-comma-bronze-black','Bronze','Black',3],['Comma',2018,'2018-comma-bronze-colorway','Bronze','Colorway',3],['Comma',2018,'2018-comma-bronze-silver','Bronze','Silver',4],['Enjoy',2018,'2018-enjoy-bronze-black','Bronze','Black',3],['Enjoy',2018,'2018-enjoy-bronze-yellow','Bronze','Yellow',3],['Gelato',2018,'2018-gelato-bronze-black-silver','Bronze','Black, silver',4],['Gelato',2018,'2018-gelato-bronze-black-white','Bronze','Black, white',4],['Gelato',2018,'2018-gelato-bronze-white-gold','Bronze','White, gold',4],['SWAG',2018,'2018-swag-bronze-gold-leaf','Bronze','Gold leaf',2],['SWAG',2018,'2018-swag-stainless-steel','Stainless steel','To be confirmed',2],['Wonderful',2018,'2018-wonderful-bronze-black-silver','Bronze','Black, silver',2],
    ['Bad Temper',2017,'2017-bad-temper-bronze-black-gold','Bronze','Black, gold',3],['Boom!',2017,'2017-boom-bronze-black-stainless-steel','Bronze, stainless steel','Black',5],['For You',2017,'2017-for-you-stainless-steel','Stainless steel','To be confirmed',2],
    ['Little Dog',2015,'2015-little-dog-bronze-white-black','Bronze','White, black',3],
    ['Little Mischief',2014,'2014-little-mischief-stainless-steel','Stainless steel','To be confirmed',3],['Hello',2014,'2014-hello-bronze-black','Bronze','Black',4],
    ['Big Nose',2011,'2011-big-nose-stainless-steel','Stainless steel','To be confirmed',4],['Enraptured',2011,'2011-enraptured-bronze-black-gold','Bronze','Black, gold',2],['Satisfaction',2011,'2011-satisfaction-bronze-black-gold','Bronze','Black, gold',3],
    ['Encore',2010,'2010-encore-stainless-steel','Stainless steel','To be confirmed',4],['Wow',2010,'2010-wow-stainless-steel','Stainless steel','To be confirmed',2],['Target',2010,'2010-target-bronze-black','Bronze','Black',1],['Top Speed',2010,'2010-top-speed-bronze-black','Bronze','Black',1],
    ['Pride of Heaven',2009,'2009-pride-of-heaven-bronze-black-gold-leaf','Bronze','Black, gold leaf',4],['Father and Son',2009,'2009-father-and-son-bronze-black','Bronze','Black',5],['Message',2009,'2009-message-bronze-gold-leaf','Bronze','Gold leaf',5],['New Continent',2009,'2009-new-continent-bronze-black-white','Bronze','Black, white',5],['Dream',2009,'2009-dream-stainless-steel','Stainless steel','To be confirmed',3],
    ['21st Century',2008,'2008-21st-century-bronze-black-white','Bronze','Black, white',2],['999.9',2008,'2008-999-9-bronze-black-white-gold-leaf','Bronze','Black, white, gold leaf',5],['The World Is So Big',2008,'2008-world-so-big-bronze-black-white','Bronze','Black, white',5],['Night Patrol',2008,'2008-night-patrol-stainless-steel','Stainless steel','To be confirmed',3],['A Wise Mind',2008,'2008-wise-mind-bronze-black-gold','Bronze','Black, gold',3],
    ['Big Ears',2007,'2007-big-ears-bronze-black','Bronze','Black',2],['Territory III',2007,'2007-territory-iii-bronze-black','Bronze','Black',3],['Every Day',2007,'2007-every-day-bronze-gold-leaf','Bronze','Gold leaf',3],['Holding the Line',2007,'2007-holding-the-line-bronze-gold-leaf','Bronze','Gold leaf',3],['Embrace of Love',2007,'2007-embrace-of-love-bronze-black-gold','Bronze','Black, gold',3],['Dream 911',2007,'2007-dream-911-bronze-black','Bronze','Black',3],
    ['Territory II',2006,'2006-territory-ii-bronze-black','Bronze','Black',2],['Happy Time',2006,'2006-happy-time-bronze-black','Bronze','Black',2],['Banquet',2006,'2006-banquet-bronze-black-gold','Bronze','Black, gold',2],['Memory',2006,'2006-memory-bronze-black','Bronze','Black',4],['Warm Winter',2006,'2006-warm-winter-bronze-black','Bronze','Black',2],['No Entry',2006,'2006-no-entry-bronze-black','Bronze','Black',4],
    ['Unhappy',2005,'2005-unhappy-bronze-black','Bronze','Black',3],['Unhappy',2005,'2005-unhappy-stainless-steel','Stainless steel','To be confirmed',3],['Mission',2005,'2005-mission-bronze-black','Bronze','Black',2],['Going Home',2005,'2005-going-home-bronze-black','Bronze','Black',5],['Territory',2005,'2005-territory-bronze-black','Bronze','Black',4],['Absorption',2005,'2005-absorption-bronze-black','Bronze','Black',2],['Man and Woman',2005,'2005-man-and-woman-bronze-black','Bronze','Black',2],['Continuation',2005,'2005-continuation-bronze-black','Bronze','Black',3],['Looking Down',2005,'2005-looking-down-bronze-black','Bronze','Black',3],['Lackey',2005,'2005-lackey-bronze-black','Bronze','Black',2],['Security Guard',2005,'2005-security-guard-bronze-black','Bronze','Black',2],['Waiting',2005,'2005-waiting-bronze-black','Bronze','Black',4]
  ];
  const englishTitles={
    '2005-unhappy-bronze-black':"I'm Not Happy Now!",'2005-unhappy-stainless-steel':"I'm Not Happy Now!",'2005-mission-bronze-black':'On Duty','2005-going-home-bronze-black':'Home','2005-territory-bronze-black':'My Territory','2005-continuation-bronze-black':'Generation to Generation','2005-lackey-bronze-black':'The Flunky','2005-security-guard-bronze-black':'The Guard','2005-looking-down-bronze-black':'Snobbery','2005-man-and-woman-bronze-black':'Man & Woman','2006-no-entry-bronze-black':'You Can Not Pass!','2006-warm-winter-bronze-black':'Taking Care of You','2006-banquet-bronze-black-gold':'Attending a Banquet','2006-territory-ii-bronze-black':'My Territory (2)','2007-big-ears-bronze-black':'Spying','2007-territory-iii-bronze-black':'My Territory (3)','2007-every-day-bronze-gold-leaf':'Everyday Is a New Start.','2007-holding-the-line-bronze-gold-leaf':'Holding the Post','2007-embrace-of-love-bronze-black-gold':'Loving Hug','2008-night-patrol-stainless-steel':'Night Watch','2008-world-so-big-bronze-black-white':'Friends','2008-wise-mind-bronze-black-gold':'Wise Man','2010-top-speed-bronze-black':'High Speed','2011-satisfaction-bronze-black-gold':'Well','2011-enraptured-bronze-black-gold':'Lost in Contemplation'
  };
  const details={
    '2005-mission-bronze-black':['SS / L','Bronze','Black'],
    '2005-territory-bronze-black':['SS / S / XL','Bronze','Black'],
    '2005-absorption-bronze-black':['SS / XL','Bronze','Black'],
    '2005-continuation-bronze-black':['SS / S / L','Bronze','Black'],
    '2005-going-home-bronze-black':['SS / S / XL','Bronze','Black'],
    '2005-waiting-bronze-black':['SS / L / S','Bronze','Black'],
    '2005-unhappy-stainless-steel':['S','Stainless steel','To be confirmed'],
    '2005-unhappy-bronze-black':['S','Bronze','Natural black'],
    '2006-no-entry-bronze-black':['M / L','Bronze','Black'],
    '2006-warm-winter-bronze-black':['M','Bronze','Black'],
    '2006-banquet-bronze-black-gold':['M','Bronze, gold foil','Black, gold'],
    '2006-territory-ii-bronze-black':['M','Bronze, baking paint','Black'],
    '2007-holding-the-line-bronze-gold-leaf':['M','Bronze, gold foil','Gold'],
    '2007-every-day-bronze-gold-leaf':['S','Bronze, gold foil','Gold'],
    '2007-embrace-of-love-bronze-black-gold':['XL / S','Bronze, baking paint','Black, gold'],
    '2007-dream-911-bronze-black':['M','Bronze, baking paint','Black'],
    '2008-night-patrol-stainless-steel':['S','Stainless steel','To be confirmed'],
    '2008-world-so-big-bronze-black-white':['S / XL','Bronze, baking paint','Black, white'],
    '2008-wise-mind-bronze-black-gold':['S / M','Bronze, gold foil','Black, gold'],
    '2008-21st-century-bronze-black-white':['S / M','Bronze, baking paint','Black, white'],
    '2009-father-and-son-bronze-black':['M','Bronze, gold foil','Black, gold'],
    '2010-encore-stainless-steel':['M','Stainless steel','To be confirmed'],
    '2010-target-bronze-black':['M','Bronze, baking paint','Black'],
    '2010-top-speed-bronze-black':['S','Bronze, baking paint','Black'],
    '2011-satisfaction-bronze-black-gold':['S','Bronze, baking paint','Black, gold'],
    '2011-big-nose-stainless-steel':['M','Stainless steel','To be confirmed'],
    '2011-enraptured-bronze-black-gold':['S','Bronze, baking paint','Black, gold']
  };
  catalog.forEach(work=>{if(englishTitles[work[2]])work[0]=englishTitles[work[2]]});
  const image=(work,index=1)=>'assets/catalog/'+work[2]+'/'+String(index).padStart(2,'0')+'.jpg?v=20260902pf';
  const coverIndexes={'power-food':[1,3]};
  const coverImages=work=>(coverIndexes[work[2]]||[1]).map(index=>image(work,index));
  const overview=document.querySelector('.works-image-grid');
  if(overview){
    const indexList=document.querySelector('.works-index');
    const yearFilter=document.querySelector('.works-year-filter');
    const search=document.querySelector('.works-search');
    const searchInput=search?.querySelector('input');
    const years=[...new Set(catalog.map(work=>work[1]))].sort((a,b)=>b-a);
    if(yearFilter)yearFilter.insertAdjacentHTML('beforeend',years.map(year=>'<option value="'+year+'">'+year+'</option>').join(''));
    const getGroups=()=>{
      const term=(searchInput?.value||'').trim().toLowerCase();
      const year=yearFilter?.value||'';
      const groups=[];
      catalog.filter(work=>(!year||String(work[1])===year)&&(!term||work[0].toLowerCase().includes(term))).forEach(work=>{
        const existing=groups.find(group=>group[0][0]===work[0]);
        existing?existing.push(work):groups.push([work]);
      });
      return groups;
    };
    const render=()=>{
      const groups=getGroups();
      overview.innerHTML=groups.map(group=>{
        const first=group[0];
        const covers=group.flatMap(coverImages).join('|');
        return '<a href="work.html?work='+first[2]+'"><figure class="works-cover" data-covers="'+covers+'" data-cover="0"><img class="active" src="'+image(first)+'" alt="'+first[0]+'" loading="lazy" decoding="async"><img alt="'+first[0]+'" loading="lazy" decoding="async"></figure><div class="works-card-meta"><strong>'+first[0]+'</strong><span>'+first[1]+'</span></div></a>';
      }).join('');
      indexList.innerHTML=groups.map(group=>'<a href="work.html?work='+group[0][2]+'"><strong>'+group[0][0]+'</strong><span>'+group[0][1]+'</span></a>').join('');
    };
    render();
    const coverObserver='IntersectionObserver'in window?new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('is-visible',entry.isIntersecting)),{rootMargin:'260px 0px'}):null;
    const observeCovers=()=>{
      if(!coverObserver)return;
      coverObserver.disconnect();
      overview.querySelectorAll('.works-cover').forEach(cover=>coverObserver.observe(cover));
    };
    observeCovers();
    if(new URLSearchParams(location.search).get('focus')==='year')setTimeout(()=>yearFilter?.focus(),420);
    yearFilter?.addEventListener('change',render);
    yearFilter?.addEventListener('change',observeCovers);
    searchInput?.addEventListener('input',()=>{render();observeCovers()});
    search?.querySelector('button')?.addEventListener('click',()=>{
      const open=search.classList.toggle('open');
      if(open)searchInput?.focus();
      else if(searchInput){
        searchInput.value='';
        searchInput.blur();
        render();
        observeCovers();
      }
    });
    document.querySelectorAll('.works-view-toggle button').forEach(button=>{button.textContent='';button.setAttribute('aria-label',button.dataset.view==='images'?'Image view':'Index view');button.addEventListener('click',()=>{const list=button.dataset.view==='index';overview.hidden=list;indexList.hidden=!list;document.querySelectorAll('.works-view-toggle button').forEach(item=>item.classList.toggle('active',item===button))})});
    setInterval(()=>{
      if(document.hidden)return;
      overview.querySelectorAll('.works-cover[data-covers]').forEach(cover=>{
      if(coverObserver&&!cover.classList.contains('is-visible'))return;
      const covers=cover.dataset.covers.split('|');
      if(covers.length<2)return;
      const next=(Number(cover.dataset.cover)+1)%covers.length;
      const current=cover.querySelector('img.active');
      const incoming=[...cover.querySelectorAll('img')].find(picture=>picture!==current);
      cover.dataset.cover=next;
      incoming.addEventListener('load',()=>{
        incoming.classList.add('active');
        current.classList.remove('active');
      },{once:true});
      incoming.src=covers[next];
    })},5600);
  }
  const detail=document.querySelector('.work-detail');
  if(detail){
    const selected=catalog.find(work=>work[2]===new URLSearchParams(location.search).get('work'))||catalog[0];
    const selectedIndex=catalog.indexOf(selected);
    const previous=catalog[(selectedIndex-1+catalog.length)%catalog.length];
    const next=catalog[(selectedIndex+1)%catalog.length];
    const thumbnails=Array.from({length:selected[5]},(_,i)=>i+1).map(i=>'<button class="'+(i===1?'active':'')+'" data-image="'+image(selected,i)+'"><img src="'+image(selected,i)+'" alt="'+selected[0]+' view '+i+'" loading="lazy" decoding="async"></button>').join('');
    const info=details[selected[2]]||['Available on request',selected[3],selected[4]];
    detail.innerHTML='<div class="work-gallery"><figure class="work-main"><img src="'+image(selected)+'" alt="'+selected[0]+' artwork" decoding="async"></figure><div class="work-thumbnails">'+thumbnails+'</div></div><div class="work-detail-info"><div class="work-heading"><h1>'+selected[0]+'</h1><span>'+selected[1]+'</span></div><div class="work-data"><p>'+info[0]+'</p><p>'+info[1]+'</p><p>'+info[2]+'</p></div><button class="concept-toggle" aria-expanded="false">Statement...</button><p class="concept-copy" hidden>Statement to be added.</p><div class="work-neighbor-nav" aria-label="Adjacent works"><a href="work.html?work='+previous[2]+'"><span>Prev</span><strong>'+previous[0]+'</strong></a><a href="work.html?work='+next[2]+'"><span>Next</span><strong>'+next[0]+'</strong></a></div></div>';
    const main=detail.querySelector('.work-main img');
    detail.querySelectorAll('.work-thumbnails button').forEach(button=>button.addEventListener('click',()=>{main.src=button.dataset.image;detail.querySelectorAll('.work-thumbnails button').forEach(item=>item.classList.toggle('active',item===button))}));
    const toggle=detail.querySelector('.concept-toggle');toggle.addEventListener('click',()=>{const copy=toggle.nextElementSibling,expanded=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!expanded));copy.hidden=expanded});
    const variants=catalog.filter(work=>work[0]===selected[0]);
    if(variants.length>1)detail.insertAdjacentHTML('afterend','<section class="work-variants" aria-label="Material and colour variations">'+variants.map(work=>'<a class="'+(work===selected?'active':'')+'" href="work.html?work='+work[2]+'"><img src="'+image(work)+'" alt="'+work[0]+' variation" loading="lazy" decoding="async"><span>'+work[3]+'</span><small>'+work[4]+'</small></a>').join('')+'</section>');
    const related=document.querySelector('.related-works>div');related.innerHTML=catalog.filter(work=>work!==selected).slice(0,6).map(work=>'<a href="work.html?work='+work[2]+'"><img src="'+image(work)+'" alt="'+work[0]+'" loading="lazy" decoding="async"><span>'+work[0]+' · '+work[1]+'</span></a>').join('');
  }
})();
