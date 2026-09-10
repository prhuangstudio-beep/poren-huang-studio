(()=>{
  const workStyle=document.createElement('link');workStyle.rel='stylesheet';workStyle.href='assets/works-overrides.css?v=20260910x';document.head.append(workStyle);
  const catalog=[
    ['Power Food',2026,'power-food','To be confirmed','Colorway',5],
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
    ['Black / Prey',2019,'2019-small-bronze-black','Bronze','Black',5],['Black / Prey',2019,'2019-small-stainless-steel','Stainless steel','To be confirmed',5],['AWOOOOOO!',2019,'2019-awoooooo-stainless-steel','Stainless steel','To be confirmed',5],['Sweet',2019,'2019-sweet-bronze-grey-pillow-silver','Bronze, pillow','Grey, silver',5],['Sweet',2019,'2019-sweet-stainless-steel-pillow-gold','Stainless steel, pillow','Gold',3],
    ['Backbone',2018,'2018-spirit-bronze-black','Bronze','Black',2],['Backbone',2018,'2018-spirit-bronze-black-silver','Bronze','Black, silver',2],['Backbone',2018,'2018-spirit-bronze-lake-green','Bronze','Lake green',2],['Backbone',2018,'2018-spirit-bronze-white','Bronze','White',2],['Backbone',2018,'2018-spirit-bronze-white-gold','Bronze','White, gold',2],['Backbone',2018,'2018-spirit-stainless-steel','Stainless steel','To be confirmed',2],
    ['Comma',2018,'2018-comma-bronze-black','Bronze','Black',3],['Comma',2018,'2018-comma-bronze-colorway','Bronze','Colorway',3],['Comma',2018,'2018-comma-bronze-silver','Bronze','Silver',4],['Enjoy',2018,'2018-enjoy-bronze-black','Bronze','Black',3],['Enjoy',2018,'2018-enjoy-bronze-yellow','Bronze','Yellow',3],['Gelato',2018,'2018-gelato-bronze-black-silver','Bronze','Black, silver',4],['Gelato',2018,'2018-gelato-bronze-black-white','Bronze','Black, white',4],['Gelato',2018,'2018-gelato-bronze-white-gold','Bronze','White, gold',4],['SWAG',2018,'2018-swag-bronze-gold-leaf','Bronze','Gold leaf',2],['SWAG',2018,'2018-swag-stainless-steel','Stainless steel','To be confirmed',2],['Wonderful',2018,'2018-wonderful-bronze-black-silver','Bronze','Black, silver',2],
    ['Grumpy',2017,'2017-bad-temper-bronze-black-gold','Bronze','Black, gold',3],['Boom!',2017,'2017-boom-bronze-black-stainless-steel','Bronze, stainless steel','Black',5],['For You',2017,'2017-for-you-stainless-steel','Stainless steel','To be confirmed',2],
    ['Kiddo',2015,'2015-little-dog-bronze-white-black','Bronze, paint, stainless steel base','White, black',3],
    ['Little Rascal',2014,'2014-little-mischief-stainless-steel','Stainless steel','To be confirmed',3],['Hello',2014,'2014-hello-bronze-black','Bronze','Black',4],
    ['Big Nose',2011,'2011-big-nose-stainless-steel','Stainless steel','To be confirmed',4],['Enraptured',2011,'2011-enraptured-bronze-black-gold','Bronze','Black, gold',2],['Satisfaction',2011,'2011-satisfaction-bronze-black-gold','Bronze','Black, gold',3],
    ['Encore',2010,'2010-encore-stainless-steel','Stainless steel','To be confirmed',4],['What the Heck!',2010,'2010-wow-stainless-steel','Stainless steel','To be confirmed',2],['Target',2010,'2010-target-bronze-black','Bronze','Black',1],['Top Speed',2010,'2010-top-speed-bronze-black','Bronze','Black',1],
    ['The Loved One',2009,'2009-pride-of-heaven-bronze-black-gold-leaf','Bronze','Black, gold leaf',4],['Father and Son',2009,'2009-father-and-son-bronze-black','Bronze','Black',5],['Information',2009,'2009-message-bronze-gold-leaf','Bronze','Gold leaf',5],['New World',2009,'2009-new-continent-bronze-black-white','Bronze','Black, white',5],['Dreams',2009,'2009-dream-stainless-steel','Stainless steel','To be confirmed',3],
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
    '2005-unhappy-stainless-steel':['S','Stainless steel',''],
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
    '2011-enraptured-bronze-black-gold':['S','Bronze, baking paint','Black, gold'],
    '2015-little-dog-bronze-white-black':['M','Bronze, paint, stainless steel base','White, black']
  };
  const dimensions={
    '2005-mission-bronze-black':['SS 23x10x20cm','L 100x47x82cm'],
    '2005-territory-bronze-black':['SS 21x9x21cm','XL 132×57×112cm','S 32x15x30cm'],
    '2005-absorption-bronze-black':['SS 27x11x15cm','XL 150×55×85cm'],
    '2005-continuation-bronze-black':['SS 30x11x20cm','S 45×17×30cm','L 90x28x58cm'],
    '2005-going-home-bronze-black':['SS 27x15x10cm','S 40×15×22cm','XL 167x54x81cm'],
    '2005-waiting-bronze-black':['SS 21x12x8cm','L 126x72x51cm','S 38x25x17cm'],
    '2005-lackey-bronze-black':['SS 10x8x25cm','XL 50×49×130cm'],
    '2005-security-guard-bronze-black':['SS 24x38x21cm','M 60x66x114cm'],
    '2005-looking-down-bronze-black':['SS 10x9x28cm','S 17x23x40cm'],
    '2005-man-and-woman-bronze-black':['S 38x10x16cm'],
    '2006-no-entry-bronze-black':['M 64×32×60cm','L 96×48×90cm'],
    '2006-warm-winter-bronze-black':['M 24×26×62cm'],
    '2006-banquet-bronze-black-gold':['M 37×37×90cm'],
    '2006-territory-ii-bronze-black':['M 48×45×84cm'],
    '2006-happy-time-bronze-black':['AP 90x45x54cm'],
    '2007-big-ears-bronze-black':['M 45×26×69cm'],
    '2007-territory-iii-bronze-black':['S 25×36×48cm','XL 100×80×150cm'],
    '2007-holding-the-line-bronze-gold-leaf':['M 33×42×52cm'],
    '2007-every-day-bronze-gold-leaf':['S 38×23×30cm'],
    '2007-embrace-of-love-bronze-black-gold':['XL 148×177×176cm','S 26x21x26cm'],
    '2007-dream-911-bronze-black':['M 45×27×44cm'],
    '2008-night-patrol-stainless-steel':['S 34×30×44cm'],
    '2008-world-so-big-bronze-black-white':['S 31×22×36cm','XL 124×84×145cm'],
    '2008-wise-mind-bronze-black-gold':['S 30×23×36cm','M 45×34×54cm'],
    '2008-21st-century-bronze-black-white':['S 27x28x46cm','M 40x42x69cm'],
    '2009-father-and-son-bronze-black':['M 43x26x62cm'],
    '2010-encore-stainless-steel':['M 41x43x66cm'],
    '2010-target-bronze-black':['M 50x55x68cm'],
    '2010-top-speed-bronze-black':['S 38x23x42cm'],
    '2011-satisfaction-bronze-black-gold':['S 43x36x23cm'],
    '2011-big-nose-stainless-steel':['M 24x38x67cm'],
    '2011-enraptured-bronze-black-gold':['S 40x26x45cm'],
    '2014-hello-bronze-black':['SS 21x12x26cm'],
    '2017-for-you-stainless-steel':['S 20x14x30cm','L 70x49x105cm'],
    '2017-boom-bronze-black-stainless-steel':['S 24x16x38cm','M 48x32x76cm','L 70x46x112cm'],
    '2018-swag-bronze-gold-leaf':['S 20x20x25cm'],
    '2018-swag-stainless-steel':['S 20x20x25cm'],
    '2018-wonderful-bronze-black-silver':['S 21x23x21cm'],
    '2018-enjoy-bronze-black':['S 20x20x22cm'],
    '2018-enjoy-bronze-yellow':['S 20x20x22cm'],
    '2018-comma-bronze-black':['12x14x17cm'],
    '2018-comma-bronze-colorway':['12x14x17cm'],
    '2018-comma-bronze-silver':['12x14x17cm'],
    '2019-sweet-bronze-grey-pillow-silver':['S 26x26x14cm'],
    '2019-sweet-stainless-steel-pillow-gold':['S 26x26x14cm'],
    '2019-awoooooo-stainless-steel':['46x25x67cm'],
    '2020-relax-bronze-black':['S 23x19x19cm'],
    '2020-relax-bronze-yellow':['S 23x19x19cm'],
    '2020-cowboy-bronze-gold-leaf-grey':['S 25x16x15cm'],
    '2020-heart-bronze-gold-leaf':['S 19x21x29cm'],
    '2005-unhappy-stainless-steel':['S 48×20×32cm'],
    '2015-little-dog-bronze-white-black':['M 50x45x66cm'],
    '2021-here-bronze-black':['31x21x43cm'],
    '2021-so-cute-stainless-steel':['38x32x41cm'],
    'black-buster-black-red':['48x31x26cm'],
    'black-buster-grey-red':['48x31x26cm'],
    'baby-grey-black':['26x26x16cm'],
    'baby-pink':['26x26x16cm'],
    'fist-bump-stainless-steel':['23x27x33cm'],
    'go-up-black-red':['25x20x48cm'],
    'go-up-pink':['25x20x48cm'],
    'go-up-yellow':['25x20x48cm'],
    'heart-bronze-green':['24x23x33cm'],
    'heart-stainless-steel':['24x23x33cm'],
    'bubble-black-pink':['56x28x85cm'],
    'bubble-green':['56x28x85cm'],
    'bubble-pink':['56x28x85cm'],
    'speedy-stainless-steel':['S 28x20x21cm'],
    'speedy-gold-leaf':['S 28x20x21cm'],
    'speedy-black':['S 28x20x21cm'],
    'shake-shake-stainless-steel':['S 25x13x22cm'],
    'shake-shake-lake-green':['S 25x13x22cm','L 106x57x88cm'],
    'shake-shake-black':['S 25x13x22cm'],
    'super-power-stainless-steel':['S 32x25x22cm'],
    'super-power-lake-green':['S 32x25x22cm'],
    'super-power-neon-orange':['S 52x25x22cm'],
    'power-food':['○ 5.5x2.5cm','△ 5.5x5.5x2.5cm']
  };
  catalog.forEach(work=>{if(englishTitles[work[2]])work[0]=englishTitles[work[2]]});
  const image=(work,index=1)=>'assets/catalog/'+work[2]+'/'+String(index).padStart(2,'0')+'.jpg?v=20260902pf';
  const imageOrders={
    'baby-grey-black':[2,1,3,4,5],
    'baby-pink':[2,1,3,4,5]
  };
  const coverIndexes={'power-food':[1,3]};
  const coverImages=work=>(coverIndexes[work[2]]||[1]).map(index=>image(work,index));
  const imageSequence=work=>imageOrders[work[2]]||Array.from({length:work[5]},(_,i)=>i+1);
  const pageUrl=work=>'works/'+work[2]+'.html?v=20260910x';
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
        return '<a href="'+pageUrl(first)+'" data-material="'+first[3]+'"><figure class="works-cover" data-covers="'+covers+'" data-cover="0"><img class="active" src="'+image(first)+'" alt="'+first[0]+'" loading="lazy" decoding="async"><img alt="'+first[0]+'" loading="lazy" decoding="async"></figure><div class="works-card-meta"><strong>'+first[0]+'</strong><span>'+first[1]+'</span><em>'+first[3]+'</em></div></a>';
      }).join('');
      indexList.innerHTML=groups.map(group=>'<a href="'+pageUrl(group[0])+'"><strong>'+group[0][0]+'</strong><span>'+group[0][1]+'</span></a>').join('');
      overview.querySelectorAll('.works-cover img.active').forEach(img=>{
        const setCover=()=>img.closest('.works-cover')?.style.setProperty('--cover-image','url("'+img.src+'")');
        img.complete?setCover():img.addEventListener('load',setCover,{once:true});
      });
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
        cover.style.setProperty('--cover-image','url("'+incoming.src+'")');
      },{once:true});
      incoming.src=covers[next];
    })},5600);
  }
})();

