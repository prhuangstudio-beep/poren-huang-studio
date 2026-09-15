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
  const thumbnails=[...document.querySelectorAll('.work-thumbnails button')];
  const showImage=index=>{
    const button=thumbnails[index];
    if(!button||!main)return;
    main.src=button.dataset.image;
    thumbnails.forEach(item=>item.classList.toggle('active',item===button));
  };
  thumbnails.forEach((button,index)=>button.addEventListener('click',()=>showImage(index)));
  if(main&&thumbnails.length>1&&matchMedia('(pointer:coarse)').matches){
    const gallery=main.closest('.work-main');
    let startX=0;
    gallery?.addEventListener('pointerdown',event=>{
      if(event.pointerType!=='touch')return;
      startX=event.clientX;
      gallery.setPointerCapture?.(event.pointerId);
    });
    gallery?.addEventListener('pointerup',event=>{
      if(event.pointerType!=='touch')return;
      const distance=event.clientX-startX;
      if(Math.abs(distance)<40)return;
      const current=Math.max(0,thumbnails.findIndex(item=>item.classList.contains('active')));
      showImage((current+(distance<0?1:-1)+thumbnails.length)%thumbnails.length);
    });
  }
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
