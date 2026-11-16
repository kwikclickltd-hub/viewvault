const search=document.querySelector('#search');
const cards=[...document.querySelectorAll('.media-card')];
const filters=[...document.querySelectorAll('.filter')];
let currentFilter='all';
function updateCards(){const term=(search?.value||'').trim().toLowerCase();let count=0;cards.forEach(card=>{const show=(currentFilter==='all'||card.dataset.type===currentFilter)&&((card.dataset.search+' '+card.textContent).toLowerCase().includes(term));card.hidden=!show;if(show)count++;});document.querySelector('#empty').hidden=count>0;}
function setFilter(type){currentFilter=type;filters.forEach(b=>{const active=b.dataset.filter===type;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});updateCards();}
filters.forEach(b=>b.addEventListener('click',()=>setFilter(b.dataset.filter)));
search?.addEventListener('input',updateCards);
document.querySelectorAll('[data-quick-filter]').forEach(a=>a.addEventListener('click',()=>{setFilter(a.dataset.quickFilter);document.querySelector('#nav').classList.remove('open');document.querySelector('#menu-toggle')?.setAttribute('aria-expanded','false');}));
const toggle=document.querySelector('#menu-toggle');toggle?.addEventListener('click',()=>{const open=document.querySelector('#nav').classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
document.querySelector('#year').textContent=new Date().getFullYear();
const cta=document.querySelector('#affiliate-cta');const raw=window.VIEWVAULT_CONFIG?.monetizerAffiliateUrl;
if(cta&&raw){try{const url=new URL(raw);if(url.protocol==='https:'){cta.href=url.href;cta.target='_blank';cta.rel='sponsored noopener noreferrer';cta.classList.remove('disabled');cta.removeAttribute('aria-disabled');document.querySelector('#affiliate-note').textContent='Sponsored third-party link. We may earn a commission. Not a streaming provider.';}}catch(e){console.warn('Invalid sponsored URL');}}
cta?.addEventListener('click',e=>{if(cta.classList.contains('disabled'))e.preventDefault();});
