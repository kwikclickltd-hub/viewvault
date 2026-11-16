const search = document.querySelector('#search');
const cards = Array.from(document.querySelectorAll('.media-card'));
const filters = Array.from(document.querySelectorAll('.filter'));
let currentFilter = 'all';
function updateCards(){
  const term = (search?.value || '').trim().toLowerCase();
  let visible=0;
  cards.forEach(card => {
    const match=(currentFilter==='all'||card.dataset.type===currentFilter) && ((card.dataset.search+' '+card.textContent).toLowerCase().includes(term));
    card.hidden=!match;
    if(match) visible++;
  });
  document.querySelector('#empty').hidden=visible!==0;
}
filters.forEach(filter=>filter.addEventListener('click',()=>{
  currentFilter=filter.dataset.filter;
  filters.forEach(x=>{x.classList.toggle('active',x===filter);x.setAttribute('aria-pressed',String(x===filter));});
  updateCards();
}));
search?.addEventListener('input',updateCards);
document.querySelector('#year').textContent=new Date().getFullYear();
const menuToggle=document.querySelector('#menu-toggle');
menuToggle?.addEventListener('click',()=>{
  const open=document.querySelector('#nav').classList.toggle('open');
  menuToggle.setAttribute('aria-expanded',String(open));
});
const affiliateUrl=window.VIEWVAULT_CONFIG?.monetizerAffiliateUrl;
const cta=document.querySelector('#affiliate-cta');
if (affiliateUrl) {
  try {
    const url=new URL(affiliateUrl);
    if(url.protocol==='https:') {
      cta.href=url.href;
      cta.classList.remove('disabled');
      cta.removeAttribute('aria-disabled');
      cta.target='_blank';
      cta.rel='sponsored noopener noreferrer';
      document.querySelector('#affiliate-note').textContent='Sponsored link. We may earn a commission.';
    }
  } catch(e) { console.warn('Invalid affiliate URL in config.js'); }
}
cta?.addEventListener('click',event=>{if(cta.classList.contains('disabled'))event.preventDefault();});
