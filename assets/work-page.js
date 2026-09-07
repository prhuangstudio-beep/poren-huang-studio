(()=>{
  const fitTitle=()=>{
    const title=document.querySelector('.work-detail-info .work-heading h1');
    if(!title)return;
    title.style.fontSize='';
    let size=parseFloat(getComputedStyle(title).fontSize);
    while(title.scrollWidth>title.clientWidth&&size>18){size-=1;title.style.fontSize=size+'px'}
  };
  const setMediaCover=container=>{
    const img=container.querySelector('img');
    if(!img)return;
    const apply=()=>container.style.setProperty('--cover-image','url("'+img.src+'")');
    img.complete?apply():img.addEventListener('load',apply,{once:true});
  };
  const main=document.querySelector('.work-main img');
  document.querySelectorAll('.work-thumbnails button').forEach(button=>{
    button.addEventListener('click',()=>{
      if(main)main.src=button.dataset.image;
      document.querySelectorAll('.work-thumbnails button').forEach(item=>item.classList.toggle('active',item===button));
    });
  });
  document.querySelector('.concept-toggle')?.addEventListener('click',event=>{
    const button=event.currentTarget;
    const copy=button.nextElementSibling;
    const expanded=button.getAttribute('aria-expanded')==='true';
    button.setAttribute('aria-expanded',String(!expanded));
    if(copy)copy.hidden=expanded;
  });
  document.querySelectorAll('.square-media,.work-variants a,.image-carousel').forEach(setMediaCover);
  fitTitle();
  window.addEventListener('resize',fitTitle,{passive:true});
})();
