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
  document.addEventListener('mouseover',e=>{
    const homeWorks=!!e.target.closest('body.home #works');
    cursor.classList.toggle('is-suppressed',homeWorks);
    cursor.classList.toggle('is-active',!homeWorks&&!!e.target.closest('a,button,.work-stage'));
  });
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
// Keep the first visible artwork views responsive without touching their
// existing picture/srcset choices. Everything further down remains lazy.
document.querySelectorAll('.artist-slides img.active,.series-slides img.active,.work-main img,.works-image-grid .work-card:nth-child(-n+4) img,body.home .work-panel:nth-child(-n+2) img').forEach(image=>{
  image.loading='eager';
  image.fetchPriority='high';
});

const header=document.querySelector('header'),nav=document.querySelector('nav');
if(header&&nav){
  // The header stores while reading downward, while resting in a section, and returns on reverse scroll.
  let headerLastY=window.scrollY,headerReference=window.scrollY,headerFrame=0,headerIdleTimer=0;
  const scheduleHeaderIdle=()=>{
    clearTimeout(headerIdleTimer);
    if(window.scrollY<96||document.body.classList.contains('menu-open')||document.body.classList.contains('search-open'))return;
    headerIdleTimer=setTimeout(()=>header.classList.add('is-stowed'),1400);
  };
  const updateHeader=()=>{
    headerFrame=0;
    const y=window.scrollY;
    if(!document.body.classList.contains('menu-open')&&!document.body.classList.contains('search-open')){
      if(y<96){header.classList.remove('is-stowed');headerReference=y;}
      else if(y-headerReference>42){header.classList.add('is-stowed');headerReference=y;}
      else if(headerReference-y>20){header.classList.remove('is-stowed');headerReference=y;}
    }
    headerLastY=y;
  };
  addEventListener('scroll',()=>{if(!headerFrame)headerFrame=requestAnimationFrame(updateHeader);scheduleHeaderIdle()},{passive:true});
  ['pointerdown','touchstart','keydown'].forEach(type=>addEventListener(type,()=>{
    if(document.body.classList.contains('menu-open')||document.body.classList.contains('search-open'))return;
    header.classList.remove('is-stowed');
    scheduleHeaderIdle();
  },{passive:true}));
  scheduleHeaderIdle();
  let searchDataLoading=false;
  const loadSearchData=()=>{
    if(window.POREN_SEARCH_ENTRIES||searchDataLoading)return;
    searchDataLoading=true;
    const searchData=document.createElement('script');
    searchData.src='assets/search-data.js?v=20260910k';
    searchData.defer=true;
    searchData.addEventListener('load',()=>searchPanel.classList.contains('open')&&renderSearch());
    document.head.append(searchData);
  };
  document.body.append(nav);
  [...nav.querySelectorAll('a')].forEach(link=>{
    if(link.getAttribute('href')?.includes('#contact'))link.remove();
    else if(link.getAttribute('href')?.includes('#press'))link.href='press';
    else if(link.getAttribute('href')?.includes('about'))link.textContent='Artist';
    else if(link.getAttribute('href')?.includes('exhibitions'))link.textContent='News';
  });
  // Keep the complete site map available from every overlay menu.
  if(!nav.querySelector('a[href="/"]')){
    const homeLink=document.createElement('a');
    homeLink.href='/';
    homeLink.textContent='Home';
    nav.prepend(homeLink);
  }
  if(!nav.querySelector('a[href="series"]')){
    const seriesLink=document.createElement('a');
    seriesLink.href='series';
    seriesLink.textContent='Series';
    seriesLink.className='menu-series-link';
    nav.append(seriesLink);
  }
  const navLinks=[...nav.children].filter(item=>item.tagName==='A');
  const social=document.createElement('div');
  social.className='menu-socials';
  social.innerHTML='<a href="https://www.instagram.com/porenhuang" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><span class="social-label">IG</span></a><a href="https://www.facebook.com/share/1bvSVWuj5K/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><span class="social-label">f</span></a><a href="https://youtube.com/@porenhuang" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="3"/><path d="m10 9 5 3-5 3z"/></svg></a><a href="https://mail.google.com/mail/?view=cm&fs=1&to=pr_dogs@yahoo.com.tw" target="_blank" rel="noopener noreferrer" aria-label="Email"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="m4 7 8 6 8-6"/></svg></a><a href="https://www.threads.com/@porenhuang" target="_blank" rel="noopener noreferrer" aria-label="Threads"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5c-5 0-8 3.2-8 8.3 0 5.3 3 8.7 7.9 8.7 4 0 6.6-2.5 6.6-6 0-3.2-2.1-5.3-5.2-5.3-2.8 0-4.7 1.6-4.7 4 0 2 1.3 3.3 3.2 3.3 1.7 0 2.8-1 2.8-2.6 0-1.8-1.5-3-3.8-3"/></svg></a>';
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
  const normalizeSearch=value=>String(value||'').toLowerCase().replace(/[’'`]/g,'').replace(/[^a-z0-9\u4e00-\u9fff]+/g,' ').trim();
  const renderSearch=()=>{
    const term=normalizeSearch(searchInput.value);
    const entries=window.POREN_SEARCH_ENTRIES||[];
    if(!term){
      searchResults.innerHTML='';
      return;
    }
    const terms=term.split(/\s+/).filter(Boolean);
    const results=entries
      .map(entry=>({entry,haystack:normalizeSearch([entry.title,entry.type,entry.text].join(' '))}))
      .filter(item=>terms.every(word=>item.haystack.includes(word)))
      .slice(0,18)
      .map(item=>item.entry);
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
  const heroVideo=document.querySelector('.video-banner__foreground');
  const ambientVideo=document.querySelector('.video-banner__ambient');
  let ambientStarted=false;
  let introCleared=false;
  const loadAmbientVideo=()=>{
    if(ambientStarted||!ambientVideo||!matchMedia('(min-width: 901px)').matches)return;
    ambientStarted=true;
    ambientVideo.setAttribute('src',ambientVideo.dataset.hdSrc);
    ambientVideo.load();
    ambientVideo.addEventListener('loadeddata',()=>document.body.classList.add('hero-ambient-ready'),{once:true});
    ambientVideo.play().catch(()=>{});
  };
  const warmHeroVideo=()=>{
    if(!heroVideo)return;
    heroVideo.preload='auto';
    heroVideo.muted=true;
    heroVideo.autoplay=true;
    heroVideo.playsInline=true;
    heroVideo.play().catch(()=>{});
  };
  warmHeroVideo();
  heroVideo?.addEventListener('loadeddata',warmHeroVideo,{once:true});
  // The ambient layer is decorative. Let the primary film, artwork images and
  // artist film establish first; only then download this duplicate desktop stream.
  heroVideo?.addEventListener('canplay',()=>setTimeout(()=>{if(introCleared)loadAmbientVideo();},12000),{once:true});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)warmHeroVideo();});
  window.scrollTo(0,0);
  const intro=document.createElement('div');
  intro.className='intro-screen';
  intro.innerHTML='<span>POREN HUANG<small>SCULPTURE</small></span>';
  document.body.prepend(intro);
  document.documentElement.classList.remove('home-preintro');
  const clearIntro=()=>{
    if(introCleared)return;
    introCleared=true;
    window.scrollTo(0,0);
    document.body.classList.remove('intro-active');
    intro.remove();
    warmHeroVideo();
    setTimeout(loadAmbientVideo,12000);
  };
  intro.addEventListener('animationend',e=>{
    if(e.animationName==='intro-out'){
      clearIntro();
    }
  });
  setTimeout(clearIntro,4200);
  const homeNav=document.createElement('div');
  homeNav.className='home-section-nav';
  homeNav.setAttribute('role','navigation');
  homeNav.setAttribute('aria-label','Home sections');
  homeNav.innerHTML=[
    ['Home','#top'],
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
    document.body.dataset.homeSection=current.link.getAttribute('href')||'#top';
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
    back.className='page-back key-back';
    back.href=location.pathname.includes('/works/')?'../works':'/';
    back.setAttribute('aria-label','Back');
    back.innerHTML='<img class="back-key-image" src="assets/media/back-key-black.png" alt="">';
    page.prepend(back);
    page.classList.add('has-page-back');
  }
}

document.querySelectorAll('.news article[data-start],.timeline article[data-start],.timeline article[data-ended],.timeline article[data-permanent]').forEach(article=>{
  const start=new Date(article.dataset.start+'T00:00:00');
  const end=new Date(article.dataset.end+'T23:59:59');
  const now=new Date();
  const label=article.hasAttribute('data-permanent')?'PERMANENT':article.hasAttribute('data-ended')?'ENDED':now<start?'UPCOMING':now>end?'ENDED':'CURRENT';
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

const form=document.querySelector('.contact-form'),emailLinks=document.querySelectorAll('a[href^="mailto:pr_dogs@yahoo.com.tw"]');
if(form){
  const modal=document.createElement('div');
  modal.className='email-modal';
  document.body.append(modal);
  modal.append(form);
  const openGmailCompose=(body,subject='Poren Huang Studio enquiry')=>{
    const url='https://mail.google.com/mail/?view=cm&fs=1&to=pr_dogs@yahoo.com.tw&su='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body||'');
    window.open(url,'poren-gmail-compose','width=720,height=680,noopener');
  };
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const name=form.elements.name?.value.trim()||'';
    const email=form.elements.email?.value.trim()||'';
    const message=form.elements.message?.value.trim()||'';
    const body=['Name: '+name,'Email: '+email,'','Message:',message].join('\n');
    openGmailCompose(body);
  });
  emailLinks.forEach(email=>{
    email.addEventListener('click',e=>{
      e.preventDefault();
      openGmailCompose('');
    });
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
      stageVelocity+=wheelMove*unit*.42;
      stageVelocity=Math.max(-58,Math.min(58,stageVelocity));
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
      if(window.porenNavigate)window.porenNavigate(startLink.href);
      else window.location.assign(startLink.href);
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
  stage.insertAdjacentHTML('beforeend','<a class="more-panel" href="works">view more...</a>');
}

document.querySelectorAll('.home .news article').forEach(article=>{
  article.addEventListener('click',()=>{
    if(window.porenNavigate)window.porenNavigate('exhibitions');
    else location.href='exhibitions';
  });
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

const footerSocialLinks='<a href="https://www.instagram.com/porenhuang" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><span class="social-label">IG</span></a><a href="https://www.facebook.com/share/1bvSVWuj5K/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><span class="social-label">f</span></a><a href="https://youtube.com/@porenhuang" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="3"/><path d="m10 9 5 3-5 3z"/></svg></a><a href="https://mail.google.com/mail/?view=cm&fs=1&to=pr_dogs@yahoo.com.tw" target="_blank" rel="noopener noreferrer" aria-label="Email"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="m4 7 8 6 8-6"/></svg></a><a href="https://www.threads.com/@porenhuang" target="_blank" rel="noopener noreferrer" aria-label="Threads"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5c-5 0-8 3.2-8 8.3 0 5.3 3 8.7 7.9 8.7 4 0 6.6-2.5 6.6-6 0-3.2-2.1-5.3-5.2-5.3-2.8 0-4.7 1.6-4.7 4 0 2 1.3 3.3 3.2 3.3 1.7 0 2.8-1 2.8-2.6 0-1.8-1.5-3-3.8-3"/></svg></a>';
const footer=document.querySelector('footer');
if(footer){
  let socials=footer.querySelector('.socials');
  if(!socials){
    socials=document.createElement('div');
    socials.className='socials';
    footer.querySelector('small')?.before(socials);
  }
  socials.innerHTML=footerSocialLinks;
  if(!footer.querySelector('.contact-me')){
    socials.insertAdjacentHTML('afterend','<a class="contact-me" href="https://mail.google.com/mail/?view=cm&fs=1&to=pr_dogs@yahoo.com.tw" target="_blank" rel="noopener noreferrer" aria-label="Contact Poren Huang by Gmail">CONTACT ME</a>');
  }
}
if(footer&&hero){
  footer.insertAdjacentHTML('afterbegin','<p class="contact-title">CONTACT</p>');
  footer.querySelector('small').insertAdjacentHTML('beforebegin','<address class="contact-details"><a href="mailto:pr_dogs@yahoo.com.tw">pr_dogs@yahoo.com.tw</a><a href="tel:+886926776431">+886 926 776 431</a><span>台中市大甲區甲埔大道800號<br>No. 800, Jiapu Blvd., Dajia Dist., Taichung City 437, Taiwan</span></address>');
  footer.insertAdjacentHTML('afterend','<div class="end-spacer" aria-hidden="true"></div>');
}

document.querySelectorAll('.work-detail-info .work-heading h1').forEach(title=>{
  if(title.querySelector('.work-title-en'))return;
  const raw=title.textContent.trim().replace(/\s+/g,' ');
  const zhFirst=raw.match(/^([^A-Za-z]+?)\s+(.+)$/);
  const enFirst=raw.match(/^(.+?)\s+([\u4e00-\u9fff].*)$/);
  const en=zhFirst?zhFirst[2]:(enFirst?enFirst[1]:raw);
  const zh=zhFirst?zhFirst[1]:(enFirst?enFirst[2]:'');
  title.replaceChildren();
  const enLine=document.createElement('span');
  enLine.className='work-title-en';
  enLine.textContent=en;
  title.append(enLine);
  if(zh){
    const zhLine=document.createElement('span');
    zhLine.className='work-title-zh';
    zhLine.textContent=zh;
    title.append(zhLine);
  }
});

const fitWorkHeadings=()=>{
  document.querySelectorAll('.work-detail-info .work-heading').forEach(heading=>{
    const title=heading.querySelector('h1'),year=heading.querySelector('span');
    if(!title)return;
    if(title.querySelector('.work-title-en'))return;
    title.style.fontSize='';
    title.style.width='auto';
    title.style.maxWidth='';
    const style=getComputedStyle(heading);
    const gap=parseFloat(style.columnGap||style.gap)||0;
    const available=heading.clientWidth-(year?.offsetWidth||0)-gap;
    if(available<=0)return;
    const baseSize=parseFloat(getComputedStyle(title).fontSize);
    const fullWidth=title.scrollWidth;
    let size=fullWidth>available?Math.floor(baseSize*(available/fullWidth)):baseSize;
    size=Math.max(8,Math.min(baseSize,size));
    title.style.fontSize=size+'px';
    title.style.width=available+'px';
    title.style.maxWidth=available+'px';
    while(title.scrollWidth>available&&size>8){
      size-=.5;
      title.style.fontSize=size+'px';
    }
  });
};
fitWorkHeadings();
requestAnimationFrame(fitWorkHeadings);
document.fonts?.ready.then(fitWorkHeadings);
addEventListener('resize',fitWorkHeadings);
addEventListener('load',fitWorkHeadings);

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
  const enableHomeCoverRotation=true;
  if(!document.querySelector('.work-swipe-hint'))homeStage.insertAdjacentHTML('afterend','<span class="work-swipe-hint" aria-hidden="true"><svg viewBox="0 0 32 16"><path d="M7 3 2 8l5 5M2 8h28M25 3l5 5-5 5"/></svg></span>');
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
  if(enableHomeCoverRotation)homeStage.querySelectorAll('.home-work-image').forEach(image=>{
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
  if(enableHomeCoverRotation)setInterval(()=>{
    if(document.hidden)return;
    homeStage.querySelectorAll('.work-panel').forEach(rotateHomeCover);
  },5600);
  window.addEventListener('resize',queueHomeWorkSizing,{passive:true});
}

if(hero){
  ['about','works','exhibitions','press'].forEach((destination,index)=>{
    const label=document.querySelectorAll('.side-title span')[index];
    if(label&&!label.closest('a')){
      const link=document.createElement('a');
      link.href=destination;
      label.before(link);
      link.append(label);
    }
  });
}

/* Homepage section rails follow the native document scroll exactly.  Each
   rail starts at its own section top, pins beneath the header, and releases
   before the following section begins. */
if(document.body.classList.contains('home')){
  const homeRails=[...document.querySelectorAll('main > .side-section > .side-title')];
  const syncHomeRails=()=>{
    const header=document.querySelector('header');
    const pin=(header?.getBoundingClientRect().height||64)+12;
    const scrollTop=window.scrollY;
    homeRails.forEach(rail=>{
      const section=rail.parentElement;
      const sectionRect=section.getBoundingClientRect();
      const railRect=rail.getBoundingClientRect();
      /* Convert visible movement back to layout movement when a section is
         optically scaled, and reserve 1px before the lower divider. */
      const scale=(section.offsetHeight ? sectionRect.height/section.offsetHeight : 1)||1;
      const limit=Math.max(0,(sectionRect.height-railRect.height-1)/scale);
      const nextTop=Math.min(limit,Math.max(0,(pin-sectionRect.top)/scale));
      rail.style.setProperty('--home-side-title-y',`${nextTop}px`);
    });
  };
  let railQueued=false;
  const queueHomeRailSync=()=>{
    if(railQueued)return;
    railQueued=true;
    requestAnimationFrame(()=>{railQueued=false;syncHomeRails();});
  };
  syncHomeRails();
  addEventListener('scroll',queueHomeRailSync,{passive:true});
  addEventListener('resize',queueHomeRailSync,{passive:true});
  addEventListener('load',queueHomeRailSync,{once:true});
}

document.querySelector('.works-overview .eyebrow')?.remove();
document.querySelectorAll('.more-panel').forEach(link=>{
  link.addEventListener('pointerdown',event=>event.stopPropagation());
  link.addEventListener('click',event=>{
    event.preventDefault();
    if(window.porenNavigate)window.porenNavigate(link.href);
    else location.href=link.href;
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

/*
  Site-wide virtual card scroll.
  Tune these three values to adjust the feel without touching layout:
  sensitivity: wheel / touch distance multiplier; damping: lower = more inertia;
  influence: portion of viewport height used by the depth effect.
*/
(()=>{
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;

  const compact=matchMedia('(max-width: 700px)').matches;
  const mobileHome=compact&&document.body.classList.contains('home');
  const desktopWorks=!compact&&!!document.querySelector('.works-overview');
  const mobileWorks=compact&&!!document.querySelector('.works-overview');
  // Higher damping makes the visual response follow the page scroll more promptly.
  // A broader influence range also leaves a larger, clearer centre area.
  const primaryBrowse=document.body.classList.contains('home')||!!document.querySelector('.works-overview');
  const settings={
    damping:desktopWorks ? .16 : (primaryBrowse ? .13 : .11),
    influence:mobileHome ? .98 : ((desktopWorks||mobileWorks) ? .74 : .91),
    maxScaleDrop:mobileWorks ? .08 : (desktopWorks ? .08 : (mobileHome ? .04 : .06)),
    maxBlur:mobileWorks ? 0 : (desktopWorks ? 2.5 : (mobileHome ? 2 : 2))
  };
  const selector=[
    '.work-list article','.works-image-grid > a','.works-index > a',
    '.news article','.press-card','.timeline article','.artist-cv article',
    '.series-entry','.series-hero figure','.artist-portrait,.image-carousel',
    '.home-image-break,.press-side-image,.artist-film',
    '.home .artist-detail,.home .press-layout',
    '.work-variants','h1,h2,h3',
    '.related-works > div > a'
  ].join(',');
  let cards=[];

  let target=window.scrollY,current=window.scrollY,frame=0;
  const baseTransforms=new WeakMap();
  const collectCards=()=>{
    cards=[...document.querySelectorAll(selector)];
    cards.forEach(card=>{
      if(!baseTransforms.has(card))baseTransforms.set(card,getComputedStyle(card).transform);
    });
  };
  collectCards();
  const maxScroll=()=>Math.max(0,document.documentElement.scrollHeight-innerHeight);
  const clamp=value=>Math.max(0,Math.min(maxScroll(),value));
  const isInteractive=element=>element.closest('a,button,input,select,textarea,label,[contenteditable]');
  const render=()=>{
    frame=0;
    current+=(target-current)*settings.damping;
    if(Math.abs(target-current)<.1)current=target;
    const center=innerHeight*.5;
    const range=innerHeight*settings.influence;
    const atPageEdge=target<2||target>maxScroll()-2;
    cards.forEach(card=>{
      // Keep nested typography clear while allowing its parent card to retain
      // the depth effect. This prevents headings and their cards from scaling
      // independently and overlapping.
      const nestedEditorialHeading=card.matches('h1,h2,h3')&&card.closest('.timeline,.news,.press-list');
      const keepClear=nestedEditorialHeading||
        (compact&&document.body.classList.contains('about-page')&&card.matches('.page h1'))||
        card.matches('.home .artist-detail h2')||
        (mobileHome&&card.matches('.hero h1,.artist-detail,.artist-detail h2'));
      if(atPageEdge||keepClear){
        const base=baseTransforms.get(card);
        card.style.setProperty('transform',base&&base!=='none'?base:'none','important');
        card.style.setProperty('filter','none','important');
        card.style.setProperty('opacity','1','important');
        return;
      }
      const rect=card.getBoundingClientRect();
      // Rect follows native scrolling; offset it toward the eased scroll position
      // so scaling and blur glide rather than jump with each wheel tick.
      const distance=Math.abs(rect.top+rect.height*.5+(window.scrollY-current)-center);
      if(distance>range*2.1)return;
      const t=Math.max(0,Math.min(1,distance/range));
      const ease=t*t;
      const base=baseTransforms.get(card);
      card.style.setProperty('transform',(base&&base!=='none'?base+' ':'')+'scale('+(1-ease*settings.maxScaleDrop)+')','important');
      // On compact touch screens opacity keeps the depth cue without the
      // expensive GPU blur pass. Desktop retains the blur treatment.
      card.style.setProperty('filter',compact?'none':'blur('+(ease*settings.maxBlur)+'px)','important');
      card.style.setProperty('opacity',String(1-ease*.4),'important');
    });
    if(current!==target)frame=requestAnimationFrame(render);
  };
  const requestRender=()=>{if(!frame)frame=requestAnimationFrame(render)};
  addEventListener('scroll',()=>{
    target=clamp(window.scrollY);
    requestRender();
  },{passive:true});
  addEventListener('resize',()=>{target=clamp(target);current=clamp(current);requestRender();},{passive:true});
  document.body.classList.add('virtual-card-scroll');
  new MutationObserver(()=>{
    collectCards();
    requestRender();
  }).observe(document.body,{childList:true,subtree:true});
  requestRender();
})();

// Full-site page transition. The animation remains absent from dedicated test
// pages, where the test-only controller owns the interaction.
(()=>{
  if(window.__porenPageTransition||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  if(location.pathname.includes('donut-transition-test')||location.pathname.includes('cylindrical-home-test'))return;
  window.__porenPageTransition=true;
  const overlay=document.createElement('div');
  overlay.className='page-donut-transition';
  overlay.setAttribute('aria-hidden','true');
  // Do not compete with page media for bandwidth. The transition movie is
  // fetched only after the visitor chooses to leave the page.
  overlay.innerHTML='<video muted playsinline preload="none" data-src="assets/media/donut-page-transition.mp4"></video>';
  document.documentElement.append(overlay);
  const video=overlay.querySelector('video');
  let transitioning=false;
  const sameDocument=url=>url.pathname===location.pathname&&url.search===location.search;
  const handleLink=link=>{
    if(!link||link.target==='_blank'||link.hasAttribute('download'))return false;
    const href=link.getAttribute('href')||'';
    if(href.startsWith('mailto:')||href.startsWith('tel:')||href.startsWith('#'))return false;
    const url=new URL(link.href,location.href);
    // Returning to the homepage is immediate; the donut transition is only
    // used when moving between inner pages.
    if(url.pathname==='/'||/\/index\.html$/.test(url.pathname))return false;
    return url.origin===location.origin&&!sameDocument(url);
  };
  const play=()=>new Promise(resolve=>{
    let complete=false;
    const done=()=>{
      if(complete)return;
      complete=true;
      clearTimeout(fallback);
      video.onended=null;
      resolve();
    };
    const fallback=setTimeout(done,2800);
    video.onended=done;
    if(!video.src){
      video.src=video.dataset.src;
      video.load();
    }
    video.currentTime=0;
    const result=video.play();
    if(result)result.catch(()=>setTimeout(done,500));
  });
  window.porenNavigate=href=>{
    if(transitioning)return false;
    const url=new URL(href,location.href);
    if(url.origin!==location.origin||sameDocument(url))return false;
    transitioning=true;
    document.body.classList.add('page-transition-leaving');
    setTimeout(async()=>{
      overlay.classList.add('is-visible');
      await play();
      overlay.classList.add('is-done');
      setTimeout(()=>{location.href=url.href;},420);
    },420);
    return true;
  };
  document.addEventListener('click',event=>{
    const link=event.target.closest?.('a[href]');
    if(event.defaultPrevented||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||!handleLink(link)||transitioning)return;
    event.preventDefault();
    window.porenNavigate(link.href);
  },true);
})();
// Mobile-only image loading states. They sit around the existing picture/srcset
// output and never replace its sources or responsive sizes.
(()=>{
  const mobile=matchMedia('(max-width: 47.9375rem)');
  const setup=()=>{
    // Mobile artwork loading deliberately uses the page's white background.
    // No skeleton wrapper is added, so existing picture/srcset choices remain intact.
    return;
    if(!mobile.matches)return;
    document.querySelectorAll('.works-image-grid figure img,.work-gallery figure img,.related-works figure img,.work-list figure img').forEach(img=>{
      const shell=img.closest('figure');
      if(!shell||shell.dataset.mobileImageState)return;
      shell.dataset.mobileImageState='pending';
      shell.classList.add('mobile-image-shell');
      const reveal=()=>{
        shell.classList.add('is-mobile-image-ready');
        shell.dataset.mobileImageState='ready';
      };
      if(img.complete&&img.naturalWidth)reveal();
      else img.addEventListener('load',reveal,{once:true});
      img.addEventListener('error',reveal,{once:true});
    });
  };
  setup();
  mobile.addEventListener?.('change',setup);
})();
