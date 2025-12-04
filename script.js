// ----- CONFIG -----
// Cambia esta fecha al día/horario de vuestro aniversario (formato: 'YYYY-MM-DDTHH:MM:SS')
const targetDate = new Date('2025-12-05T00:00:00');

// Si quieres reproducir una canción local, pon la ruta en bgMusic.src o deja vacío.
const bgMusic = document.getElementById('bgMusic');

// ----- COUNTDOWN -----
function updateCountdown(){
  const now = new Date();
  const diff = targetDate - now;
  if(diff <= 0){
    document.getElementById('days').textContent = 0;
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    return;
  }
  const sec = Math.floor((diff/1000) % 60);
  const min = Math.floor((diff/1000/60) % 60);
  const hr = Math.floor((diff/1000/60/60) % 24);
  const days = Math.floor(diff/1000/60/60/24);
  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = String(hr).padStart(2,'0');
  document.getElementById('minutes').textContent = String(min).padStart(2,'0');
  document.getElementById('seconds').textContent = String(sec).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown,1000);

// ----- MUSIC CONTROL -----
const playBtn = document.getElementById('playMusic');
playBtn.addEventListener('click', ()=>{
  if(!bgMusic.src){
    alert('No hay canción configurada. Edita script.js o pon la ruta en el elemento <audio id="bgMusic">.');
    return;
  }
  if(bgMusic.paused){ bgMusic.play(); playBtn.textContent = 'Pausar música'; }
  else { bgMusic.pause(); playBtn.textContent = 'Reproducir música'; }
});

// ----- SIMPLE CONFETTI (canvas) -----
const confettiCanvas = document.getElementById('confettiCanvas');
const ctx = confettiCanvas.getContext('2d');
let W = confettiCanvas.width = window.innerWidth;
let H = confettiCanvas.height = window.innerHeight;
window.addEventListener('resize', ()=>{ W = confettiCanvas.width = window.innerWidth; H = confettiCanvas.height = window.innerHeight; });

function random(min,max){ return Math.random()*(max-min)+min }
class Particle{
  constructor(){ this.reset(); }
  reset(){
    this.x = random(0,W); this.y = random(-H,-10);
    this.w = random(6,12); this.h = random(8,16);
    this.color = `hsl(${Math.floor(random(0,360))} 80% 60%)`;
    this.vx = random(-0.5,0.5); this.vy = random(1,4);
    this.r = random(0,360); this.rs = random(-4,4);
  }
  update(){ this.x += this.vx; this.y += this.vy; this.r += this.rs; if(this.y>H+20) this.reset(); }
  draw(){ ctx.save(); ctx.translate(this.x,this.y); ctx.rotate(this.r*Math.PI/180); ctx.fillStyle=this.color; ctx.fillRect(-this.w/2,-this.h/2,this.w,this.h); ctx.restore(); }
}
const particles = Array.from({length:120}, ()=>new Particle());
let confettiOn = false;
function confettiLoop(){ ctx.clearRect(0,0,W,H); if(confettiOn){ particles.forEach(p=>{ p.update(); p.draw(); }); } requestAnimationFrame(confettiLoop); }
confettiLoop();

// Toggle confetti button
const confBtn = document.getElementById('toggleConfetti');
confBtn.addEventListener('click', ()=>{
  confettiOn = !confettiOn;
  confBtn.textContent = confettiOn ? 'Detener confetti' : 'Activar confetti';
});

// Accessibility: allow Enter to play music from keyboard when focused
playBtn.addEventListener('keyup', (e)=>{ if(e.key === 'Enter') playBtn.click(); });

// Helpful: open console instructions
console.log('Edítalo: cambia targetDate en script.js, reemplaza imágenes en index.html y pon la canción en el atributo src del <audio id="bgMusic">.');

// ----- SIMPLE CAROUSEL -----
const photosEl = document.querySelector('.photos');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const indicatorsEl = document.querySelector('.carousel-indicators');
let slideCount = photosEl ? photosEl.children.length : 0;
let currentIndex = 0;
let autoScrollInterval;

function createIndicators(){
  if(!indicatorsEl) return;
  indicatorsEl.innerHTML = '';
  for(let i=0;i<slideCount;i++){
    const btn = document.createElement('button');
    if(i===0) btn.classList.add('active');
    btn.addEventListener('click', ()=>{ goToSlide(i); resetAutoScroll(); });
    indicatorsEl.appendChild(btn);
  }
}

function updateIndicators(){
  if(!indicatorsEl) return;
  Array.from(indicatorsEl.children).forEach((b,idx)=> b.classList.toggle('active', idx===currentIndex));
}

function goToSlide(index){
  if(!photosEl) return;
  if(index < 0) index = slideCount - 1;
  if(index >= slideCount) index = 0;
  currentIndex = index;
  // Pause any playing videos before sliding
  Array.from(photosEl.querySelectorAll('video')).forEach(v=>{ try{ v.pause(); v.currentTime = 0; }catch(e){} });
  const w = photosEl.clientWidth;
  photosEl.scrollTo({ left: w * index, behavior: 'smooth' });
  updateIndicators();
}

function nextSlide(){ goToSlide(currentIndex+1); }
function prevSlide(){ goToSlide(currentIndex-1); }

function startAutoScroll(){ autoScrollInterval = setInterval(nextSlide, 3500); }
function stopAutoScroll(){ clearInterval(autoScrollInterval); }
function resetAutoScroll(){ stopAutoScroll(); startAutoScroll(); }

if(photosEl){
  slideCount = photosEl.children.length;
  createIndicators();
  // Si hay vídeos en la galería, desactivar el desplazamiento automático
  const hasVideo = photosEl.querySelector('video') !== null;
  if(!hasVideo){
    startAutoScroll();
    photosEl.addEventListener('mouseenter', stopAutoScroll);
    photosEl.addEventListener('mouseleave', startAutoScroll);
  } else {
    // No iniciar autoplay si hay vídeos (el usuario los reproducirá manualmente)
    console.log('Autoplay desactivado: se han detectado vídeos en la galería');
  }
  window.addEventListener('resize', ()=> goToSlide(currentIndex));
}

if(nextBtn) nextBtn.addEventListener('click', ()=>{ nextSlide(); resetAutoScroll(); });
if(prevBtn) prevBtn.addEventListener('click', ()=>{ prevSlide(); resetAutoScroll(); });

// Añadir comportamiento click-to-play a los vídeos
if(photosEl){
  Array.from(photosEl.children).forEach((child)=>{
    if(child.tagName === 'VIDEO'){
      // Click sobre el vídeo: alterna play/pause
      child.addEventListener('click', ()=>{
        if(child.paused){ child.play(); } else { child.pause(); }
      });
      // Cuando el vídeo se reproduce, parar autoplay del carrusel
      child.addEventListener('play', ()=>{
        stopAutoScroll();
        // Pausar música de fondo si está sonando
        try{
          if(window.bgMusic && !window.bgMusic.paused){
            window.bgMusic.pause();
            if(playBtn) playBtn.textContent = 'Reproducir música';
          }
        }catch(e){}
      });
      child.addEventListener('pause', ()=>{
        resetAutoScroll();
        // Reanudar música de fondo solo si antes estaba sonando y el usuario no la pausó manualmente
        try{
          if(window.bgMusic && window.bgMusic.paused){
            // No forzamos autoplay en algunos navegadores; intentamos reanudar solo si el usuario había iniciado la música antes
            // Si el botón muestra 'Pausar música' sabemos que el usuario la inició previamente
            if(playBtn && playBtn.textContent === 'Pausar música'){
              // intenta reproducir (puede ser bloqueado por el navegador si no hay interacción)
              window.bgMusic.play().catch(()=>{});
            }
          }
        }catch(e){}
      });
    }
  });
}

