if('scrollRestoration' in history)history.scrollRestoration='manual';
window.addEventListener('pageshow',()=>window.scrollTo(0,0));

if(matchMedia('(pointer:fine)').matches){
  const cursor=document.createElement('i');
  cursor.className='site-cursor';
  document.body.append(cursor);
  const moveCursor=e=>{
    cursor.style.transform=`translate3d(${e.clientX}px,${e.clientY}px,0)`;
    cursor.classList.add('is-visible');
  };
  window.addEventListener('onpointerrawupdate'in window?'pointerrawupdate':'pointermove',moveCursor,{passive:true});
  document.addEventListener('mouseover',e=>cursor.classList.toggle('is-active',!!e.target.closest('a,button,.work-stage')));
}

document.querySelectorAll('#year').forEach(x=>x.textContent=new Date().getFullYear());
document.querySelectorAll('img:not([loading])').forEach(image=>{
  if(!image.closest('.hero,.video-banner,.work-main'))image.loading='lazy';
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
  [...nav.querySelectorAll('a')].forEach((a,i)=>a.textContent=['About','Works','News','Contact'][i]||a.textContent);
  const navLinks=[...nav.children].filter(item=>item.tagName==='A');
  const social=document.createElement('div');
  social.className='menu-socials';
  social.innerHTML='<a href="https://www.instagram.com/porenhuang" target="_blank" aria-label="Instagram">IG</a><a href="https://www.facebook.com/share/1bvSVWuj5K/?mibextid=wwXIfr" target="_blank" aria-label="Facebook">f</a><a href="https://youtube.com/@porenhuang" target="_blank" aria-label="YouTube">▶</a><a href="mailto:pr_dogs@yahoo.com.tw" aria-label="Email">✉</a><a href="https://www.threads.com/@porenhuang" target="_blank" aria-label="Threads">@</a>';
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
  const aiGuide=document.createElement('button');
  aiGuide.className='ai-guide';
  aiGuide.type='button';
  aiGuide.setAttribute('aria-label','Open AI guide');
  aiGuide.innerHTML='<img src="assets/media/ai-guide.jpg" alt="">';
  document.body.append(aiGuide);
  const aiPanel=document.createElement('div');
  aiPanel.className='ai-guide-panel';
  aiPanel.innerHTML='<p>AI Guide</p><button type="button" data-action="search">Search site</button><a href="works.html">Browse works</a><a href="works.html?focus=year">Search by year</a><a href="mailto:pr_dogs@yahoo.com.tw">Contact</a>';
  document.body.append(aiPanel);
  const closeAiPanel=()=>aiPanel.classList.remove('open');
  aiGuide.addEventListener('click',event=>{
    event.stopPropagation();
    aiPanel.classList.toggle('open');
  });
  aiPanel.querySelector('[data-action="search"]').addEventListener('click',()=>{
    closeAiPanel();
    openSearch();
  });
  document.addEventListener('click',event=>{
    if(!event.target.closest('.ai-guide,.ai-guide-panel'))closeAiPanel();
  });
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closeAiPanel()});
}

const hero=document.querySelector('.hero');
if(hero){
  document.body.classList.add('home');
  document.body.classList.add('intro-active');
  hero.insertAdjacentHTML('beforebegin','<div class="video-spacer" aria-hidden="true"></div><section class="video-banner" aria-label="Poren Huang studio film"><video autoplay muted loop playsinline preload="auto"><source src="assets/media/hero-banner-hd.mp4" type="video/mp4"></video></section>');
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
}

const page=document.querySelector('.page');
if(page){
  if(location.pathname.includes('about'))page.dataset.label='';
  else if(location.pathname.includes('works'))page.dataset.label='WORKS';
  else page.dataset.label='';
}

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
    stageVelocity*=.84;
    if(Math.abs(stageVelocity)>.18)stageFrame=requestAnimationFrame(glideStage);
    else{
      stageVelocity=0;
      stageFrame=0;
    }
  };
  stage.addEventListener('wheel',e=>{
    if(Math.abs(e.deltaY)>Math.abs(e.deltaX)){
      e.preventDefault();
      stageVelocity+=e.deltaY*(e.deltaMode===1?8:.36);
      if(!stageFrame)stageFrame=requestAnimationFrame(glideStage);
    }
  },{passive:false});
  let pointerDown=false,dragging=false,startX=0,startLeft=0,startLink=null;
  stage.addEventListener('pointerdown',e=>{
    pointerDown=true;
    dragging=false;
    stageVelocity=0;
    startX=e.clientX;
    startLeft=stage.scrollLeft;
    startLink=e.target.closest('a[href]');
    stage.setPointerCapture(e.pointerId);
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
    if(pointerDown&&!dragging&&startLink){
      e.preventDefault();
      location.href=startLink.href;
    }
    pointerDown=false;
    dragging=false;
    startLink=null;
    stage.classList.remove('dragging');
  };
  stage.addEventListener('pointerup',stopDrag);
  stage.addEventListener('pointercancel',()=>{
    pointerDown=false;
    dragging=false;
    startLink=null;
    stage.classList.remove('dragging');
  });
  stage.insertAdjacentHTML('beforeend','<a class="more-panel" href="works.html">More… <span aria-hidden="true">→</span></a>');
}

const labels=['ARTIST','WORKS','NEWS'];
document.querySelectorAll('.side-title span').forEach((label,i)=>label.textContent=labels[i]||label.textContent);

const footer=document.querySelector('footer');
if(footer&&hero){
  footer.insertAdjacentHTML('afterbegin','<p class="contact-title">CONTACT</p>');
  footer.insertAdjacentHTML('afterend','<div class="end-spacer" aria-hidden="true"></div>');
}

const revealItems=document.querySelectorAll('h1,h2,h3,.hero p,.hero .image,.artist-portrait,.portrait,.intro p,.artist-detail p,.bio p,.artist-cv article,.news article,.timeline article,.series-entry,.series-hero figure,.series-hero p,.series-hero .link,.works-image-grid>a,.works-index a,.work-detail,.work-variants,.related-works a,.work-panel');
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
    if(!covers||covers.length<2)return;
    image.classList.add('active');
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
  ['about.html','works.html','exhibitions.html'].forEach((destination,index)=>{
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
