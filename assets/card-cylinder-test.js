(()=>{
  const start=()=>{
    if(!document.body.classList.contains('home'))return;
    document.body.classList.add('card-cylinder-test');
    const panels=[...document.querySelectorAll('main > section, body > footer')];
    panels.forEach(panel=>panel.classList.add('card-cylinder-panel'));

    let frame=0;
    const render=()=>{
      frame=0;
      const centre=innerHeight*.5;
      const range=Math.max(innerHeight*.82,560);
      const mobile=innerWidth<768;
      panels.forEach(panel=>{
        const rect=panel.getBoundingClientRect();
        const raw=(rect.top+rect.height*.5-centre)/range;
        const t=Math.max(-1.35,Math.min(1.35,raw));
        const distance=Math.min(1,Math.abs(t));
        const x=t*(mobile?34:92);
        const z=-distance*(mobile?18:48);
        const rotate=t*(mobile?-1.1:-2.4);
        const scale=1-distance*(mobile?.018:.035);
        const opacity=.6+(1-distance)*.4;
        panel.style.setProperty('--card-x',`${x}px`);
        panel.style.setProperty('--card-z',`${z}px`);
        panel.style.setProperty('--card-rotate',`${rotate}deg`);
        panel.style.setProperty('--card-scale',String(scale));
        panel.style.setProperty('--card-opacity',String(opacity));
      });
    };
    const requestRender=()=>{if(!frame)frame=requestAnimationFrame(render)};
    addEventListener('scroll',requestRender,{passive:true});
    addEventListener('resize',requestRender,{passive:true});
    new MutationObserver(requestRender).observe(document.body,{childList:true,subtree:true});
    requestRender();
  };
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start,{once:true}):start();
})();
