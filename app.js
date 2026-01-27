// Icons
try { lucide.createIcons(); } catch(e){}

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal on scroll
(function(){
  const els = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){
    els.forEach(el => el.classList.add('show'));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(ent=>{
      if(ent.isIntersecting){
        ent.target.classList.add('show');
        io.unobserve(ent.target);
      }
    });
  }, { threshold: 0.14 });
  els.forEach(el => io.observe(el));
})();

// Program tabs
(function(){
  const data = {
    d1: {
      title: "Что будет на 1-м дне:",
      list: [
        "Разберем, кто такой онлайн-ассистент и почему эта профессия — лучшая точка входа в онлайн",
        "Какие задачи реально дают новичкам и сколько за это платят",
        "Где искать первые проекты и как не попасть на обман"
      ],
      bonus: "<b>БОНУС:</b> Топ-4 навыка в онлайне, за которые платят от 300 000 тенге в месяц"
    },
    d2: {
      title: "Что будет на 2-м дне:",
      list: [
        "Как упаковать себя как ассистента (даже без опыта)",
        "Как вести коммуникацию с руководителем и клиентами",
        "Какие сервисы и приложения нужны для работы"
      ],
      bonus: "<b>БОНУС:</b> Шаблон структуры задач для старта (чек-лист)"
    },
    d3: {
      title: "Что будет на 3-м дне:",
      list: [
        "Как выйти на первые деньги: простая пошаговая стратегия",
        "Как расти в доходе и расширять навыки",
        "Как сделать удалёнку стабильной и спокойной"
      ],
      bonus: "<b>БОНУС:</b> Рекомендации по первым шагам после интенсива"
    }
  };

  const tabs = document.querySelectorAll('.tab');
  const title = document.getElementById('programTitle');
  const list = document.getElementById('programList');
  const bonus = document.getElementById('programBonus');

  function render(key){
    const x = data[key];
    title.textContent = x.title;
    list.innerHTML = x.list.map(i => `<li>${i}</li>`).join('');
    bonus.innerHTML = x.bonus;
    tabs.forEach(t=>{
      const active = t.dataset.tab === key;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    try { lucide.createIcons(); } catch(e){}
  }

  tabs.forEach(btn=>{
    btn.addEventListener('click', ()=> render(btn.dataset.tab));
  });

  render('d1');
})();

// Video (opens new tab if URL set)
(function(){
  const frame = document.getElementById('videoFrame');
  const play = document.getElementById('playVideo');
  if(!frame || !play) return;

  function openVideo(){
    const url = frame.getAttribute('data-video-url') || "";
    if(url.trim()){
      window.open(url, '_blank', 'noopener');
    }else{
      const reg = document.getElementById('register');
      if(reg) reg.scrollIntoView({behavior:'smooth', block:'start'});
    }
  }
  play.addEventListener('click', openVideo);
  play.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      openVideo();
    }
  });
})();

// Gallery slider
(function(){
  const wrap = document.getElementById('lifeGallery');
  if(!wrap) return;

  const track = wrap.querySelector('.gallery-track');
  const slides = Array.from(wrap.querySelectorAll('.gallery-slide'));
  const dots = Array.from(document.querySelectorAll('.gallery-dots .dot'));
  const prev = document.querySelector('[data-g-prev]');
  const next = document.querySelector('[data-g-next]');
  let index = 0;

  function go(i){
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(${-index * 100}%)`;
    dots.forEach((d, di)=> d.classList.toggle('active', di === index));
  }

  if(prev) prev.addEventListener('click', ()=> go(index - 1));
  if(next) next.addEventListener('click', ()=> go(index + 1));
  dots.forEach(d=>{
    d.addEventListener('click', ()=> go(parseInt(d.getAttribute('data-goto'), 10)));
  });

  let startX = 0, dx = 0, isDown = false;

  wrap.addEventListener('touchstart', (e)=>{
    isDown = true;
    startX = e.touches[0].clientX;
    dx = 0;
  }, {passive:true});

  wrap.addEventListener('touchmove', (e)=>{
    if(!isDown) return;
    dx = e.touches[0].clientX - startX;
  }, {passive:true});

  wrap.addEventListener('touchend', ()=>{
    if(!isDown) return;
    isDown = false;
    if(Math.abs(dx) > 42){
      go(dx < 0 ? index + 1 : index - 1);
    }
  });

  wrap.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowLeft') go(index - 1);
    if(e.key === 'ArrowRight') go(index + 1);
  });

  go(0);
})();

// Cookie bar
(function(){
  const bar = document.getElementById('cookieBar');
  const btn = document.getElementById('cookieAccept');
  if(!bar || !btn) return;

  const key = 'ng_cookie_ok';
  if(!localStorage.getItem(key)){
    bar.style.display = 'block';
  }
  btn.addEventListener('click', ()=>{
    localStorage.setItem(key, '1');
    bar.style.display = 'none';
  });
})();

// Form submit (demo)
(function(){
  const form = document.getElementById('regForm');
  const success = document.getElementById('successBox');
  if(!form || !success) return;

  const checks = form.querySelectorAll('input[type="checkbox"]');
  checks.forEach(ch => { if(!ch.checked) ch.checked = true; });

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(!form.checkValidity()){
      form.reportValidity();
      return;
    }
    success.style.display = 'block';
    success.scrollIntoView({behavior:'smooth', block:'nearest'});
  });
})();
