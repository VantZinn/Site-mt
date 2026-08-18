// Device detection must run before the intro sequence
const isMobileViewport = window.matchMedia('(max-width: 900px)').matches || /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
if (isMobileViewport) document.body.classList.add('mobile-device');



// Technological entrance sequence
const techIntro=document.getElementById('techIntro');
if(techIntro){
  const percent=document.getElementById('loadPercent');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const duration=reduced?180:(isMobileViewport?1900:2450);
  const start=performance.now();
  const updatePercent=now=>{
    const progress=Math.min((now-start)/duration,1);
    percent.textContent=Math.round(progress*100)+'%';
    if(progress<1)requestAnimationFrame(updatePercent);
  };
  requestAnimationFrame(updatePercent);
  window.setTimeout(()=>{
    percent.textContent='100%';
    techIntro.classList.add('is-done');
    document.body.classList.remove('intro-active');
    window.setTimeout(()=>techIntro.remove(),700);
  },duration);
}
const header=document.querySelector('.site-header');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>30),{passive:true});

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.13});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const filterButtons=document.querySelectorAll('.filter');
const projects=document.querySelectorAll('.project');
filterButtons.forEach(btn=>btn.addEventListener('click',()=>{
  filterButtons.forEach(b=>b.classList.remove('active')); btn.classList.add('active');
  const f=btn.dataset.filter;
  projects.forEach(p=>{const show=f==='all'||p.dataset.category===f;p.classList.toggle('hide',!show)});
}));

const countObserver=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(!e.isIntersecting)return; const el=e.target, target=+el.dataset.count, duration=1300, start=performance.now();
  const prefix=el.dataset.prefix||'',suffix=el.dataset.suffix||'';
  const tick=now=>{const t=Math.min((now-start)/duration,1);const eased=1-Math.pow(1-t,3);el.textContent=prefix+Math.round(target*eased)+suffix;if(t<1)requestAnimationFrame(tick)};
  requestAnimationFrame(tick);countObserver.unobserve(el);
}),{threshold:.5});
document.querySelectorAll('[data-count]').forEach(el=>countObserver.observe(el));

const modal=document.getElementById('showreelModal');
const openModal=()=>{modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'};
const closeModal=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''};
document.querySelectorAll('.showreel-btn').forEach(b=>b.addEventListener('click',openModal));
modal.querySelector('.modal-close').addEventListener('click',closeModal);modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

const menuBtn=document.querySelector('.menu-btn'),nav=document.querySelector('.nav');
menuBtn.addEventListener('click',()=>{const open=nav.classList.toggle('mobile-open');menuBtn.setAttribute('aria-expanded',String(open))});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('mobile-open');menuBtn.setAttribute('aria-expanded','false')}));

if(matchMedia('(pointer:fine)').matches){
  const dot=document.querySelector('.cursor-dot'),ring=document.querySelector('.cursor-ring');let mx=0,my=0,rx=0,ry=0;
  addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.transform=`translate(${mx-2}px,${my-2}px)`});
  const follow=()=>{rx+=(mx-rx)*.16;ry+=(my-ry)*.16;ring.style.transform=`translate(${rx-15}px,${ry-15}px)`;requestAnimationFrame(follow)};follow();
  document.querySelectorAll('a,button,.project').forEach(el=>{el.addEventListener('mouseenter',()=>ring.classList.add('hover'));el.addEventListener('mouseleave',()=>ring.classList.remove('hover'))});

  document.querySelectorAll('[data-tilt]').forEach(card=>{
    card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateX(${-y*3}deg) rotateY(${x*4}deg)`});
    card.addEventListener('mouseleave',()=>card.style.transform='');
  });
  document.querySelectorAll('.magnetic').forEach(el=>{
    el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;el.style.transform=`translate(${x*.08}px,${y*.12}px)`});
    el.addEventListener('mouseleave',()=>el.style.transform='');
  });
}

document.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)document.querySelectorAll('details').forEach(other=>{if(other!==d)other.open=false})}));
