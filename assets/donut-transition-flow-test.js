(()=>{
  if(window.__porenDonutTransition)return;
  window.__porenDonutTransition=true;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced)return;
  const active=new URLSearchParams(location.search).has('donutTest')||location.pathname.includes('donut-transition-test')||location.pathname.includes('cylindrical-home-test');
  if(!active)return;

  document.body.classList.add('donut-transition-ready');

  const overlay=document.createElement('div');
  overlay.className='donut-page-transition';
  overlay.setAttribute('aria-hidden','true');
  overlay.innerHTML='<video muted playsinline preload="none" data-src="assets/media/donut-page-transition.mp4"></video>';
  document.documentElement.append(overlay);

  const video=overlay.querySelector('video');
  let transitioning=false;
  const playDonut=()=>new Promise(resolve=>{
    let settled=false;
    const done=()=>{
      if(settled)return;
      settled=true;
      clearTimeout(fallback);
      video.onended=null;
      resolve();
    };
    const fallback=setTimeout(done,2600);
    video.onended=done;
    if(!video.src){
      video.src=video.dataset.src;
      video.load();
    }
    video.currentTime=0;
    const playPromise=video.play();
    if(playPromise)playPromise.catch(()=>setTimeout(done,700));
  });

  // The first visit keeps the existing homepage intro. The donut is reserved
  // for an actual page-to-page navigation only.
  requestAnimationFrame(()=>document.body.classList.add('donut-transition-in'));
  const isSamePageHash=url=>url.pathname===location.pathname&&url.search===location.search&&url.hash;
  const shouldHandle=link=>{
    if(!link||link.target==='_blank'||link.hasAttribute('download'))return false;
    const href=link.getAttribute('href')||'';
    if(href.startsWith('mailto:')||href.startsWith('tel:')||href.startsWith('#'))return false;
    const url=new URL(link.href,location.href);
    if(url.origin!==location.origin||isSamePageHash(url))return false;
    return true;
  };

  const withTestParam=url=>{
    url.searchParams.set('donutTest','1');
    return url;
  };

  const finish=url=>{
    overlay.classList.add('is-done');
    setTimeout(()=>{location.href=url.href;},480);
  };

  const navigate=href=>{
    if(transitioning)return false;
    const url=withTestParam(new URL(href,location.href));
    if(url.origin!==location.origin||isSamePageHash(url))return false;
    transitioning=true;
    document.body.classList.add('donut-transition-leaving');
    setTimeout(()=>{
      overlay.classList.add('is-visible');
      overlay.classList.remove('is-done');
      playDonut().then(()=>finish(url));
    },540);
    return true;
  };
  // Home cards use pointer navigation, so expose the same controller for them.
  window.porenNavigate=navigate;
  document.addEventListener('click',event=>{
    const link=event.target.closest?.('a[href]');
    if(!shouldHandle(link)||event.defaultPrevented||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    event.preventDefault();
    navigate(link.href);
  },true);
})();
