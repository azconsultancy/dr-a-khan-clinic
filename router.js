'use strict';
(() => {
 const filename=location.pathname.split('/').pop()||'index.html';
 const service=new URLSearchParams(location.search).get('service');
 const select=document.querySelector('#booking-form select[name=service]');
 if(select&&service&&[...select.options].some(o=>o.value===service))select.value=service;
 for(const link of document.querySelectorAll('nav a'))if(new URL(link.href).pathname.split('/').pop()===filename){link.classList.add('current');link.setAttribute('aria-current','page');}
 const menu=document.querySelector('.menu-toggle');
 menu.onclick=()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));document.getElementById('main-nav').classList.toggle('open',open);};
 const stories=document.getElementById('all-stories');if(stories)stories.hidden=true;
})();
