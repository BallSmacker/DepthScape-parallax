const layers=[...document.querySelectorAll(".layer")];
const bar=document.querySelector(".progress span");
const scenes=[...document.querySelectorAll(".scene")];
let target=scrollY, current=target;

function frame(){
  target=scrollY;
  const max=document.documentElement.scrollHeight-innerHeight;
  bar.style.width=(max?target/max*100:0)+"%";
  current+=(target-current)*.085;

  layers.forEach(el=>{
    const scene=el.closest(".scene");
    if(!scene)return;
    const speed=parseFloat(el.dataset.speed||0);
    const rect=scene.getBoundingClientRect();
    const center=rect.top+rect.height/2;
    const drift=(center-innerHeight/2)*speed;
    el.style.transform=`translate3d(0,${drift}px,0)`;
  });

  const idx=Math.min(12,Math.max(1,Math.floor((target+innerHeight*.45)/innerHeight)+1));
  document.querySelector(".counter b").textContent=String(idx).padStart(2,"0");
  requestAnimationFrame(frame);
}
frame();

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener("click",e=>{
    const el=document.querySelector(a.getAttribute("href"));
    if(!el)return;
    e.preventDefault();
    el.scrollIntoView({behavior:"smooth"});
  });
});

if(matchMedia("(pointer:fine)").matches){
  addEventListener("pointermove",e=>{
    const x=e.clientX/innerWidth-.5, y=e.clientY/innerHeight-.5;
    document.querySelectorAll(".s01 .layer,.s05 .layer,.s12 .layer").forEach(el=>{
      const s=parseFloat(el.dataset.speed||0);
      const px=x*Math.min(12,s*26), py=y*Math.min(12,s*20);
      el.style.marginLeft=px+"px";
      el.style.marginTop=py+"px";
    });
  },{passive:true});
}
