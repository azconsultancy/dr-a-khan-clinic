'use strict';
(() => {
  const pages={
    'index.html':{title:'Skin & Dermatology Care · Prayagraj',sections:['home','care-ribbon','care','home-doctor','testimonials','page-cta']},
    'care.html':{title:'Our care',eyebrow:'GENERAL DERMATOLOGY · SKIN · HAIR',description:'Skin health, hair and scalp care, and ongoing support — with attention to your individual concerns.',sections:['care','care-details','page-cta']},
    'doctor.html':{title:'Meet Dr. A. Khan',eyebrow:'YOUR DOCTOR IN PRAYAGRAJ',description:'A personal approach to skin, hair and scalp care in Civil Lines.',sections:['about','page-cta']},
    'testimonials.html':{title:'Patient stories',eyebrow:'VOICES FROM THE COMMUNITY',description:'Read selected patient experiences and visit the original review source for the full context.',sections:['testimonials','page-cta']},
    'contact.html':{title:'Visit & contact',eyebrow:'LET’S CONNECT',description:'Find the clinic in Prayagraj, ask a general question, or connect through WhatsApp.',sections:['visit']},
    'appointments.html':{title:'Plan your consultation',eyebrow:'APPOINTMENTS',description:'Request a visit through WhatsApp. Press Send in WhatsApp, then wait for the clinic to confirm.',sections:['book']},
    'portal.html':{title:'Your patient portal',eyebrow:'CONNECTED CARE',description:'Manage your appointments, shared visit summaries, invoices and messages.',sections:['portal']},
    'privacy.html':{title:'Your privacy',eyebrow:'YOUR INFORMATION',description:'How the proposed clinic system handles appointment and care information.',sections:['privacy']}
  };
  const legacy={home:'index.html',care:'care.html',about:'doctor.html',visit:'contact.html',book:'appointments.html',portal:'portal.html',privacy:'privacy.html'};
  const sectionIds=new Set(Object.values(pages).flatMap(p=>p.sections));
  function showPage(shouldScroll=true){
    let filename=location.pathname.split('/').pop()||'index.html';
    const old=legacy[location.hash.slice(1)];if(old){history.replaceState({},'',old+location.search);filename=old;}
    const page=pages[filename]||pages['index.html'];
    document.body.dataset.page=filename;
    document.title=page.title+' | Dr. A. Khan';
    for(const id of sectionIds){const section=document.getElementById(id);if(section)section.hidden=!page.sections.includes(id);}
    const main=document.getElementById('main');
    // Move visible sections into the intended page order while retaining portal session state.
    for(const id of page.sections)main.append(document.getElementById(id));
    const intro=document.getElementById('page-intro');intro.hidden=filename==='index.html';
    intro.replaceChildren();if(!intro.hidden){const crumb=document.createElement('a');crumb.href='index.html';crumb.className='breadcrumb';crumb.textContent='Home / '+page.title;const eyebrow=document.createElement('p');eyebrow.className='eyebrow';eyebrow.textContent=page.eyebrow;const title=document.createElement('h1');title.textContent=page.title;const description=document.createElement('p');description.className='page-description';description.textContent=page.description;intro.append(crumb,eyebrow,title,description);}
    document.getElementById('all-stories').hidden=filename==='testimonials.html';
    document.querySelector('#portal .section-heading').hidden=filename==='portal.html';
    const service=new URLSearchParams(location.search).get('service');const select=document.querySelector('#booking-form select[name=service]');if(service&&[...select.options].some(o=>o.value===service))select.value=service;
    for(const link of document.querySelectorAll('nav a')){const active=new URL(link.href).pathname.split('/').pop()===filename;link.classList.toggle('current',active);if(active)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');}
    document.querySelector('.menu-toggle').setAttribute('aria-expanded','false');document.getElementById('main-nav').classList.remove('open');
    if(shouldScroll)window.scrollTo({top:0,behavior:'instant'});
  }
  window.navigateClinicPage=(url)=>{history.pushState({},'',url);showPage();};
  document.addEventListener('click',event=>{const link=event.target.closest('a');if(!link||link.target||link.getAttribute('href').startsWith('#')||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||event.button!==0)return;const url=new URL(link.href);if(url.origin!==location.origin)return;const name=url.pathname.split('/').pop()||'index.html';if(!pages[name])return;event.preventDefault();window.navigateClinicPage(url.pathname+url.search+url.hash);});
  document.querySelector('.menu-toggle').onclick=()=>{const button=document.querySelector('.menu-toggle');const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));document.getElementById('main-nav').classList.toggle('open',open);};
  window.addEventListener('popstate',()=>showPage());
  showPage(false);
})();
