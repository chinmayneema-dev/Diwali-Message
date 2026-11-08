const DIWALI_MESSAGE = `Heartfelt Diwali wishes to you and your entire family. 🙏🙏

May the blessings of Goddess Lakshmi always remain upon us all. May happiness, peace, prosperity, and joy enter everyone's lives. May every corner of our homes be illuminated with the light of happiness, and may new paths to success open up in our lives.

I pray to God that each day of our lives be filled with happiness, enthusiasm, and positivity.

🪔🪔🪔 Happy Diwali! 🪔🪔🪔`;

const $ = id => document.getElementById(id);
const temple=$('temple'), welcome=$('welcome'), greeting=$('greeting'), nameInput=$('friendName');
let musicOn=false, fireworkTimer=null;
const bgMusic=$('bgMusic');

async function startMusic(){
  try{
    await bgMusic.play();
    musicOn=true;
    $('musicBtn').textContent='♫ Pause Diwali music';
    $('musicBtn').setAttribute('aria-pressed','true');
  }catch(error){
    musicOn=false;
    $('musicBtn').textContent='♫ Play Diwali music';
    alert('Please add the downloaded Diwali MP3 as music.mp3 in the same folder as index.html, then reload the page.');
  }
}
function stopMusic(){
  bgMusic.pause();
  musicOn=false;
  $('musicBtn').textContent='♫ Play Diwali music';
  $('musicBtn').setAttribute('aria-pressed','false');
}
$('musicBtn').addEventListener('click',()=>musicOn?stopMusic():startMusic());

function makePetals(){
  const layer=$('petals');
  for(let i=0;i<48;i++){const p=document.createElement('span');p.className='petal';p.textContent=Math.random()>.5?'✦':'❀';p.style.left=Math.random()*100+'%';p.style.animationDuration=(5+Math.random()*6)+'s';p.style.animationDelay=(Math.random()*2)+'s';p.style.fontSize=(12+Math.random()*15)+'px';layer.appendChild(p);setTimeout(()=>p.remove(),13000)}
}
const canvas=$('fireworks'),ctx=canvas.getContext('2d');let particles=[];
function resizeCanvas(){canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)}
addEventListener('resize',resizeCanvas);resizeCanvas();
function burst(){
  const x=Math.random()*innerWidth,y=Math.random()*innerHeight*.55+40;
  for(let i=0;i<42;i++){const a=Math.PI*2*i/42,s=1.2+Math.random()*3.1;particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:55+Math.random()*25,max:80})}
}
function animateFireworks(){ctx.clearRect(0,0,innerWidth,innerHeight);particles=particles.filter(p=>p.life>0);for(const p of particles){p.x+=p.vx;p.y+=p.vy;p.vy+=.025;p.vx*=.99;p.life--;ctx.globalAlpha=Math.max(0,p.life/p.max);ctx.fillStyle='#ffd778';ctx.beginPath();ctx.arc(p.x,p.y,2,0,Math.PI*2);ctx.fill()}ctx.globalAlpha=1;requestAnimationFrame(animateFireworks)}
animateFireworks();
function startFireworks(){burst();fireworkTimer=setInterval(burst,950)}
function stopFireworks(){clearInterval(fireworkTimer);particles=[];ctx.clearRect(0,0,innerWidth,innerHeight)}
function openCelebration(){
  const name=nameInput.value.trim();
  if(!name){nameInput.focus();nameInput.placeholder='Please enter your name first';return}
  $('personalName').textContent=`Happy Diwali, ${name}! ❤️`;
  $('message').textContent=DIWALI_MESSAGE;
  // Start the Diwali MP3 after the visitor interacts with the page.
  if(!musicOn)startMusic();
  welcome.querySelector('.entry').classList.add('hidden');
  welcome.querySelector('.subtitle').classList.add('hidden');
  temple.classList.add('open');
  setTimeout(()=>{welcome.classList.add('hidden');greeting.classList.add('show');makePetals();startFireworks();},2650);
}
$('enterBtn').addEventListener('click',openCelebration);
nameInput.addEventListener('keydown',e=>{if(e.key==='Enter')openCelebration()});
$('againBtn').addEventListener('click',()=>{
  stopFireworks();greeting.classList.remove('show');welcome.classList.remove('hidden');
  welcome.querySelector('.entry').classList.remove('hidden');welcome.querySelector('.subtitle').classList.remove('hidden');
  temple.classList.remove('open');nameInput.value='';nameInput.focus();
});