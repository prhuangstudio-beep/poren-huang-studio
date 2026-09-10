if('scrollRestoration' in history)history.scrollRestoration='manual';
window.addEventListener('pageshow',()=>{
  document.body.classList.remove('page-entering','page-leaving');
  document.querySelectorAll('#year').forEach(x=>x.textContent=new Date().getFullYear());
  window.scrollTo(0,0);
});

if(matchMedia('(pointer:fine)').matches){
  const cursor=document.createElement('i');
  cursor.className='site-cursor';
  document.body.append(cursor);
  let cursorX=0,cursorY=0,cursorFrame=0;
  const renderCursor=()=>{
    cursorFrame=0;
    cursor.style.transform=`translate3d(${cursorX}px,${cursorY}px,0)`;
  };
  const moveCursor=e=>{
    cursorX=e.clientX;
    cursorY=e.clientY;
    if(!cursorFrame)cursorFrame=requestAnimationFrame(renderCursor);
    cursor.classList.add('is-visible');
  };
  window.addEventListener('onpointerrawupdate'in window?'pointerrawupdate':'pointermove',moveCursor,{passive:true});
  document.addEventListener('mouseover',e=>cursor.classList.toggle('is-active',!!e.target.closest('a,button,.work-stage')));
}

document.querySelectorAll('#year').forEach(x=>x.textContent=new Date().getFullYear());
document.querySelectorAll('[data-press-list]').forEach(list=>{
  const limit=list.dataset.pressLimit==='all'?Infinity:5;
  list.replaceChildren(...(window.pressItems||[]).slice(0,limit).map(item=>{
    const card=document.createElement('a'),meta=[item.source,item.date,item.category].filter(Boolean).join('．');
    card.className='press-card';
    card.href=item.url;
    card.target='_blank';
    card.rel='noopener noreferrer';
    card.innerHTML='<h3></h3><p></p>';
    card.querySelector('h3').textContent=item.title;
    card.querySelector('p').textContent=meta;
    return card;
  }));
});
document.querySelectorAll('img:not([loading])').forEach(image=>{
  if(!image.closest('.hero,.video-banner,.work-main,.work-stage'))image.loading='lazy';
  image.decoding='async';
});

const header=document.querySelector('header'),nav=document.querySelector('nav');
if(header&&nav){
  let searchDataLoading=false;
  const loadSearchData=()=>{
    if(window.POREN_SEARCH_ENTRIES||searchDataLoading)return;
    searchDataLoading=true;
    const searchData=document.createElement('script');
    searchData.src='assets/search-data.js';
    searchData.defer=true;
    searchData.addEventListener('load',()=>searchPanel.classList.contains('open')&&renderSearch());
    document.head.append(searchData);
  };
  document.body.append(nav);
  [...nav.querySelectorAll('a')].forEach(link=>{
    if(link.getAttribute('href')?.includes('#contact'))link.remove();
    else if(link.getAttribute('href')?.includes('#press'))link.href='press.html';
    else if(link.getAttribute('href')?.includes('about.html'))link.textContent='Artist';
    else if(link.getAttribute('href')?.includes('exhibitions.html'))link.textContent='News';
  });
  const navLinks=[...nav.children].filter(item=>item.tagName==='A');
  const social=document.createElement('div');
  social.className='menu-socials';
  social.innerHTML='<a href="https://www.instagram.com/porenhuang" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a><a href="https://www.facebook.com/share/1bvSVWuj5K/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">f</a><a href="https://youtube.com/@porenhuang" target="_blank" rel="noopener noreferrer" aria-label="YouTube">▶</a><a href="mailto:pr_dogs@yahoo.com.tw" aria-label="Email">✉</a><a href="https://www.threads.com/@porenhuang" target="_blank" rel="noopener noreferrer" aria-label="Threads">@</a>';
  nav.append(social);
  const searchButton=document.createElement('button');
  searchButton.className='site-search-toggle';
  searchButton.type='button';
  searchButton.setAttribute('aria-label','Search site');
  searchButton.innerHTML='<span aria-hidden="true"></span>';
  header.append(searchButton);
  const searchPanel=document.createElement('div');
  searchPanel.className='site-search-panel';
  searchPanel.innerHTML='<div class="site-search-box"><input type="search" placeholder="Search" aria-label="Search site"><div class="site-search-shortcuts"><div class="site-search-pages">'+navLinks.map(link=>'<a href="'+link.getAttribute('href')+'">'+link.textContent+'</a>').join('')+'</div><div class="site-search-icons">'+social.innerHTML+'</div></div><div class="site-search-results" aria-live="polite"></div></div>';
  document.body.append(searchPanel);
  const searchInput=searchPanel.querySelector('input'),searchResults=searchPanel.querySelector('.site-search-results');
  const renderSearch=()=>{
    const term=searchInput.value.trim().toLowerCase();
    const entries=window.POREN_SEARCH_ENTRIES||[];
    if(!term){
      searchResults.innerHTML='';
      return;
    }
    const results=entries.filter(entry=>(entry.title+' '+entry.type+' '+entry.text).toLowerCase().includes(term)).slice(0,12);
    searchResults.innerHTML=results.length?results.map(entry=>'<a href="'+entry.url+'"><span>'+entry.type+'</span><strong>'+entry.title+'</strong></a>').join(''):'<p>No results</p>';
  };
  const openSearch=()=>{
    loadSearchData();
    searchPanel.classList.add('open');
    searchButton.setAttribute('aria-expanded','true');
    renderSearch();
    setTimeout(()=>searchInput.focus(),80);
  };
  const closeSearch=()=>{
    searchPanel.classList.remove('open');
    searchButton.setAttribute('aria-expanded','false');
    searchInput.value='';
  };
  searchButton.addEventListener('click',()=>searchPanel.classList.contains('open')?closeSearch():openSearch());
  searchInput.addEventListener('input',renderSearch);
  searchPanel.addEventListener('click',event=>{if(event.target===searchPanel)closeSearch()});
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closeSearch()});
}

const hero=document.querySelector('.hero');
if(hero){
  document.body.classList.add('home');
  document.body.classList.add('intro-active');
  hero.insertAdjacentHTML('beforebegin','<div class="video-spacer" aria-hidden="true"></div><section class="video-banner" aria-label="Poren Huang studio film"><video autoplay muted loop playsinline preload="metadata"><source src="assets/media/hero-banner-hd.mp4" type="video/mp4"></video></section>');
  window.scrollTo(0,0);
  const intro=document.createElement('div');
  intro.className='intro-screen';
  intro.innerHTML='<span>POREN HUANG</span>';
  document.body.prepend(intro);
  intro.addEventListener('animationend',e=>{
    if(e.animationName==='intro-out'){
      window.scrollTo(0,0);
      document.body.classList.remove('intro-active');
      intro.remove();
    }
  });
  setTimeout(()=>document.body.classList.remove('intro-active'),3800);
  const homeNav=document.createElement('div');
  homeNav.className='home-section-nav';
  homeNav.setAttribute('role','navigation');
  homeNav.setAttribute('aria-label','Home sections');
  homeNav.innerHTML=[
    ['Top','#top'],
    ['Artist','#artist'],
    ['Series','#series'],
    ['Works','#works'],
    ['News','#news'],
    ['Press','#press'],
    ['Contact','#contact']
  ].map(([label,target])=>'<a href="'+target+'">'+label+'</a>').join('');
  document.body.append(homeNav);
  const homeNavLinks=[...homeNav.querySelectorAll('a')];
  homeNavLinks.forEach(link=>{
    link.addEventListener('click',event=>{
      const selector=link.getAttribute('href');
      if(selector==='#top'){
        event.preventDefault();
        window.scrollTo({top:0,behavior:'smooth'});
        return;
      }
      const target=document.querySelector(selector);
      if(target){
        event.preventDefault();
        target.scrollIntoView({block:'start',behavior:'smooth'});
      }
    });
  });
  const homeSections=homeNavLinks.map(link=>({
    link,
    target:link.getAttribute('href')==='#top'?document.body:document.querySelector(link.getAttribute('href'))
  })).filter(item=>item.target);
  const updateHomeNav=()=>{
    const current=homeSections.reduce((active,item)=>{
      const top=item.target===document.body?0:item.target.getBoundingClientRect().top;
      return top<=innerHeight*.42?item:active;
    },homeSections[0]);
    homeNavLinks.forEach(link=>link.classList.toggle('active',link===current.link));
  };
  updateHomeNav();
  addEventListener('scroll',updateHomeNav,{passive:true});
}

const page=document.querySelector('.page');
if(page){
  if(location.pathname.includes('about'))page.dataset.label='';
  else if(location.pathname.includes('works'))page.dataset.label='WORKS';
  else page.dataset.label='';
  if(!page.querySelector('.page-back,.back-to-works')){
    const back=document.createElement('a');
    back.className='page-back';
    back.href=location.pathname.includes('/works/')?'../works.html':'index.html';
    back.setAttribute('aria-label','Back');
    back.textContent='←';
    page.prepend(back);
  }
}

document.querySelectorAll('.news article[data-start],.timeline article[data-start]').forEach(article=>{
  const start=new Date(article.dataset.start+'T00:00:00');
  const end=new Date(article.dataset.end+'T23:59:59');
  const now=new Date();
  const label=now<start?'UPCOMING':now>end?'ENDED':'CURRENT';
  const existing=article.querySelector('.status-badge,.news-status');
  existing?.remove();
  if(article.closest('.news')){
    const status=document.createElement('span');
    status.className='news-status status-'+label.toLowerCase();
    status.textContent=label;
    article.append(status);
  }else{
    const target=article.querySelector('.eyebrow');
    if(target)target.insertAdjacentHTML('beforeend',' <span class="status-badge status-'+label.toLowerCase()+'">'+label+'</span>');
  }
});

const form=document.querySelector('.contact-form'),email=document.querySelector('.socials a:last-child');
if(form&&email){
  const modal=document.createElement('div');
  modal.className='email-modal';
  document.body.append(modal);
  modal.append(form);
  email.addEventListener('click',e=>{
    e.preventDefault();
    modal.classList.add('open');
  });
  modal.addEventListener('click',e=>{
    if(e.target===modal)modal.classList.remove('open');
  });
}

const stage=document.querySelector('.work-stage');
if(stage){
  const section=stage.closest('.side-section'),head=section.querySelector('.section-head'),allLink=head?.querySelector('a');
  section.classList.add('works-section');
  if(allLink){
    allLink.classList.add('all-works');
    stage.insertAdjacentElement('afterend',allLink);
  }
  head?.remove();
  let stageVelocity=0,stageFrame=0;
  const glideStage=()=>{
    stage.scrollLeft+=stageVelocity;
    stageVelocity*=.88;
    if(Math.abs(stageVelocity)>.12)stageFrame=requestAnimationFrame(glideStage);
    else{
      stageVelocity=0;
      stageFrame=0;
    }
  };
  stage.addEventListener('wheel',e=>{
    const wheelMove=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY;
    if(wheelMove){
      e.preventDefault();
      const unit=e.deltaMode===1?18:1;
      stageVelocity+=wheelMove*unit*.72;
      stageVelocity=Math.max(-90,Math.min(90,stageVelocity));
      if(!stageFrame)stageFrame=requestAnimationFrame(glideStage);
    }
  },{passive:false});
  let pointerDown=false,dragging=false,suppressStageClick=false,startX=0,startLeft=0,startLink=null;
  stage.addEventListener('pointerdown',e=>{
    pointerDown=true;
    dragging=false;
    stageVelocity=0;
    startX=e.clientX;
    startLeft=stage.scrollLeft;
    startLink=e.target.closest('a[href]');
    if(e.pointerId&&stage.setPointerCapture)stage.setPointerCapture(e.pointerId);
  });
  stage.addEventListener('pointermove',e=>{
    if(!pointerDown)return;
    const delta=e.clientX-startX;
    if(!dragging&&Math.abs(delta)>7){
      dragging=true;
      stage.classList.add('dragging');
    }
    if(dragging)stage.scrollLeft=startLeft-delta;
  });
  const stopDrag=e=>{
    if(stage.releasePointerCapture&&e.pointerId)try{stage.releasePointerCapture(e.pointerId)}catch{}
    suppressStageClick=dragging&&Math.abs(e.clientX-startX)>7;
    if(!suppressStageClick&&startLink){
      e.preventDefault();
      window.location.assign(startLink.href);
    }
    pointerDown=false;
    dragging=false;
    startLink=null;
    stage.classList.remove('dragging');
    if(suppressStageClick)setTimeout(()=>suppressStageClick=false,0);
  };
  stage.addEventListener('pointerup',stopDrag);
  stage.addEventListener('pointercancel',()=>{
    pointerDown=false;
    dragging=false;
    startLink=null;
    stage.classList.remove('dragging');
  });
  stage.querySelectorAll('.work-panel[href]').forEach(panel=>{
    panel.addEventListener('click',event=>{
      if(suppressStageClick)event.preventDefault();
    });
  });
  stage.insertAdjacentHTML('beforeend','<a class="more-panel" href="works.html">view more...</a>');
}

document.querySelectorAll('.home .news article').forEach(article=>{
  article.addEventListener('click',()=>{ location.href='exhibitions.html'; });
  article.setAttribute('role','link');
  article.tabIndex=0;
});

document.querySelectorAll('.image-carousel').forEach(carousel=>{
  const slides=[...carousel.querySelectorAll('img')];
  if(slides.length<2)return;
  let index=Math.max(0,slides.findIndex(slide=>slide.classList.contains('active')));
  const setCarouselCover=()=>carousel.style.setProperty('--cover-image','url("'+slides[index].src+'")');
  slides.forEach((slide,i)=>slide.classList.toggle('active',i===index));
  slides[index].complete?setCarouselCover():slides[index].addEventListener('load',setCarouselCover,{once:true});
  setInterval(()=>{
    if(document.hidden)return;
    const next=(index+1)%slides.length;
    slides[next].classList.add('active');
    slides[index].classList.remove('active');
    index=next;
    setCarouselCover();
  },4200);
});

const artistSwitch=document.querySelector('.artist-switch');
if(artistSwitch){
  const buttons=[...artistSwitch.querySelectorAll('[data-artist-tab]')];
  const panels=[...document.querySelectorAll('[data-artist-panel]')];
  const showPanel=name=>{
    buttons.forEach(button=>{
      const active=button.dataset.artistTab===name;
      button.classList.toggle('active',active);
      button.setAttribute('aria-selected',String(active));
    });
    panels.forEach(panel=>{
      const active=panel.dataset.artistPanel===name;
      panel.classList.toggle('active',active);
      panel.toggleAttribute('hidden',!active);
    });
  };
  panels.forEach(panel=>panel.toggleAttribute('hidden',!panel.classList.contains('active')));
  buttons.forEach(button=>button.addEventListener('click',()=>showPanel(button.dataset.artistTab)));
}

const cv=document.querySelector('.artist-cv');
if(cv){
  const articles=[...cv.querySelectorAll('article')];
  if(articles.length>8){
    cv.classList.add('is-collapsed');
    articles.slice(8).forEach(article=>article.hidden=true);
    const button=document.createElement('button');
    button.className='cv-toggle';
    button.type='button';
    button.textContent='View full timeline →';
    cv.append(button);
    button.addEventListener('click',()=>{
      const collapsed=cv.classList.toggle('is-collapsed');
      articles.slice(8).forEach(article=>article.hidden=collapsed);
      button.textContent=collapsed?'View full timeline →':'Hide full timeline ↑';
    });
  }
}

const labels=['ARTIST','WORKS','NEWS','PRESS'];
document.querySelectorAll('.side-title span').forEach((label,i)=>label.textContent=labels[i]||label.textContent);

const footer=document.querySelector('footer');
if(footer&&hero){
  footer.insertAdjacentHTML('afterbegin','<p class="contact-title">CONTACT</p>');
  footer.insertAdjacentHTML('afterend','<div class="end-spacer" aria-hidden="true"></div>');
}

const revealItems=document.querySelectorAll('h1,h2,h3,.hero p,.hero .image,.artist-portrait,.portrait,.intro p,.artist-detail p,.bio p,.artist-cv article,.news article,.press-card,.timeline article,.series-entry,.home-image-break,.press-side-image,.series-hero figure,.series-hero p,.series-hero .link,.works-image-grid>a,.works-index a,.work-detail,.work-variants,.related-works a,.work-panel,.artist-switch,.artist-tab-panel');
revealItems.forEach(item=>item.classList.add('scroll-reveal'));
if('IntersectionObserver'in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }),{threshold:.08,rootMargin:'0px 0px -7% 0px'});
  revealItems.forEach(item=>observer.observe(item));
}else revealItems.forEach(item=>item.classList.add('is-visible'));

const homeStage=document.querySelector('.work-stage');
if(homeStage){
  const homeCovers={
    'Power Food':['assets/catalog/power-food/01.jpg?v=20260902pf','assets/catalog/power-food/03-home.jpg?v=20260902pfh'],
    'Super Power':['assets/catalog/super-power-lake-green/01.jpg?v=20260902','assets/catalog/super-power-neon-orange/01.jpg?v=20260902','assets/catalog/super-power-stainless-steel/01.jpg?v=20260902'],
    'Speedy':['assets/catalog/speedy-black/01.jpg?v=20260902','assets/catalog/speedy-gold-leaf/01.jpg?v=20260902','assets/catalog/speedy-stainless-steel/01.jpg?v=20260902'],
    'Shake Shake':['assets/catalog/shake-shake-black/01.jpg?v=20260902','assets/catalog/shake-shake-lake-green/01.jpg?v=20260902','assets/catalog/shake-shake-stainless-steel/01.jpg?v=20260902'],
    'Bubble':['assets/catalog/bubble-black-pink/01.jpg?v=20260902','assets/catalog/bubble-green/01.jpg?v=20260902','assets/catalog/bubble-pink/01.jpg?v=20260902']
  };
  const sizeHomeWorks=()=>homeStage.querySelectorAll('.home-work-image').forEach(image=>{
    const panel=image.closest('.work-panel');
    if(image.naturalWidth&&image.naturalHeight&&panel)panel.style.setProperty('--panel-width',(panel.clientHeight*image.naturalWidth/image.naturalHeight)+'px');
  });
  let resizeFrame=0;
  const queueHomeWorkSizing=()=>{
    if(resizeFrame)return;
    resizeFrame=requestAnimationFrame(()=>{
      resizeFrame=0;
      sizeHomeWorks();
    });
  };
  homeStage.querySelectorAll('.home-work-image').forEach(image=>{
    if(homeCovers[image.alt])image.src=homeCovers[image.alt][0];
    image.complete?sizeHomeWorks():image.addEventListener('load',sizeHomeWorks,{once:true});
  });
  homeStage.querySelectorAll('.home-work-image').forEach(image=>{
    const covers=homeCovers[image.alt];
    image.classList.add('active');
    if(!covers||covers.length<2)return;
    const clone=image.cloneNode();
    clone.classList.remove('active');
    clone.removeAttribute('src');
    clone.setAttribute('aria-hidden','true');
    image.after(clone);
  });
  const homeCoverIndexes={},homeActiveLayers={};
  const rotateHomeCover=panel=>{
    const activeImage=panel.querySelector('.home-work-image.active');
    if(!activeImage)return;
    const covers=homeCovers[activeImage.alt];
    if(!covers||covers.length<2)return;
    const layers=[...panel.querySelectorAll('.home-work-image')];
    const inactiveImage=layers.find(image=>image!==activeImage);
    if(!inactiveImage||homeActiveLayers[activeImage.alt])return;
    homeCoverIndexes[activeImage.alt]=((homeCoverIndexes[activeImage.alt]||0)+1)%covers.length;
    const nextSrc=covers[homeCoverIndexes[activeImage.alt]];
    homeActiveLayers[activeImage.alt]=true;
    let activated=false;
    const activateNext=()=>{
      if(activated)return;
      activated=true;
      requestAnimationFrame(()=>{
        inactiveImage.classList.add('active');
        activeImage.classList.remove('active');
        homeActiveLayers[activeImage.alt]=false;
      });
    };
    if(inactiveImage.getAttribute('src')===nextSrc){
      activateNext();
      return;
    }
    inactiveImage.onload=activateNext;
    inactiveImage.src=nextSrc;
    if(inactiveImage.complete)activateNext();
  };
  setInterval(()=>{
    if(document.hidden)return;
    homeStage.querySelectorAll('.work-panel').forEach(rotateHomeCover);
  },5600);
  window.addEventListener('resize',queueHomeWorkSizing,{passive:true});
}

if(hero){
  ['about.html','works.html','exhibitions.html','press.html'].forEach((destination,index)=>{
    const label=document.querySelectorAll('.side-title span')[index];
    if(label&&!label.closest('a')){
      const link=document.createElement('a');
      link.href=destination;
      label.before(link);
      link.append(label);
    }
  });
}

document.querySelector('.works-overview .eyebrow')?.remove();
document.querySelectorAll('.more-panel').forEach(link=>{
  link.addEventListener('pointerdown',event=>event.stopPropagation());
  link.addEventListener('click',event=>{
    event.preventDefault();
    location.href=link.href;
  });
});

document.body.classList.add('page-entering');
requestAnimationFrame(()=>requestAnimationFrame(()=>document.body.classList.remove('page-entering')));
document.addEventListener('click',event=>{
  const link=event.target.closest?.('a[href]');
  if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||link.target==='_blank'||link.hasAttribute('download'))return;
  const url=new URL(link.href,location.href);
  if(url.origin!==location.origin||url.pathname===location.pathname&&url.hash||url.protocol==='mailto:'||url.protocol==='tel:')return;
  event.preventDefault();
  document.body.classList.add('page-leaving');
  setTimeout(()=>location.href=url.href,680);
});
