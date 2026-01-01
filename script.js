/* MATRIX BACKGROUND */
const canvas=document.getElementById("matrix");
const ctx=canvas.getContext("2d");
function resizeCanvas(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;}
resizeCanvas();
const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const fontSize=16;
let columns=Math.floor(canvas.width/fontSize);
let drops=Array(columns).fill(0).map(()=>Math.floor(Math.random()*30)); // random start
function drawMatrix(){
  ctx.fillStyle="rgba(0,0,0,0.05)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="#00ff88";
  ctx.font=fontSize+"px monospace";
  for(let i=0;i<drops.length;i++){
    const text=chars[Math.floor(Math.random()*chars.length)];
    ctx.fillText(text,i*fontSize,drops[i]*fontSize);
    if(drops[i]*fontSize>canvas.height && Math.random()>0.975){drops[i]=0;}
    drops[i]++;
  }
}
setInterval(drawMatrix,30); // più veloce
window.addEventListener("resize",()=>{
  resizeCanvas();
  columns=Math.floor(canvas.width/fontSize);
  drops=Array(columns).fill(0).map(()=>Math.floor(Math.random()*30));
});

/* BOOT SEQUENCE */
const bootInput=document.getElementById("boot-input");
const bootSeq=document.getElementById("boot-sequence");
const mainUI=document.getElementById("main-ui");
const bootMessages=document.getElementById("boot-messages");

bootInput.addEventListener("keydown",(e)=>{
  if(e.key!=="Enter") return;
  const cmd=bootInput.value.trim().toLowerCase();
  bootInput.value="";
  if(cmd==="boot"){
    bootSeq.classList.remove("active");
    mainUI.classList.add("active");
    openTab("home");
  }else{
    bootMessages.innerHTML+=`<p>command not found: ${cmd}</p>`;
  }
});

/* TAB SYSTEM */
function openTab(id){
  const tabs=document.querySelectorAll("#main-ui>.content>.tab");
  tabs.forEach(tab=>tab.classList.remove("active"));
  const target=document.getElementById(id);
  if(target) target.classList.add("active");
}

/* SCALE CONTROL */
const scaleRange=document.getElementById("scaleRange");
const terminal=document.getElementById("terminal");
scaleRange.addEventListener("input",()=>{terminal.style.transform=`translate(-50%,-50%) scale(${scaleRange.value})`;});

/* MUSIC PLAYER */
const musicBtn=document.getElementById("music-button");
const musicPlayer=document.getElementById("music-player");
const audio=document.getElementById("bg-audio");
const playPause=document.getElementById("play-pause");
const backward=document.getElementById("backward");
const forward=document.getElementById("forward");

musicBtn.addEventListener("click",()=>{musicPlayer.style.display=musicPlayer.style.display==="flex"?"none":"flex";});
playPause.addEventListener("click",()=>{if(audio.paused){audio.play();playPause.textContent="[||]";}else{audio.pause();playPause.textContent="[>]";}});
backward.addEventListener("click",()=>{audio.currentTime=Math.max(0,audio.currentTime-15);});
forward.addEventListener("click",()=>{audio.currentTime=Math.min(audio.duration,audio.currentTime+15);});

