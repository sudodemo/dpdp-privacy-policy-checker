/* DataSaathi client-side security boundary and resilient control binding. */
(() => {
  'use strict';
  const MAX_URL = 2048, MAX_POLICY = 1000000;
  const $ = id => document.getElementById(id);
  const saved = {citizen:{url:'',text:''},company:{url:'',text:''}};
  const app = () => window.DataSaathiApp || {};
  const t = (key, fallback) => { try { const lang=$('language')?.value||'en'; return (window.T?.[lang]?.[key])||fallback; } catch (_) { return fallback; } };
  const safeText = v => String(v||'').replace(/[\u0000-\u001F\u007F]/g,' ').slice(0,MAX_POLICY);
  function validateUrl(raw){
    const value=String(raw||'').replace(/[\u0000-\u001F\u007F]/g,'').trim();
    if(!value||value.length>MAX_URL) throw Error(t('validUrl','Please enter a valid HTTP/HTTPS URL.'));
    let u; try{u=new URL(value)}catch(_){throw Error(t('validUrl','Please enter a valid HTTP/HTTPS URL.'))}
    if(!['http:','https:'].includes(u.protocol)) throw Error('Only HTTP and HTTPS URLs are allowed.');
    if(u.username||u.password) throw Error('URLs containing embedded credentials are not allowed.');
    if(u.port&&!['80','443'].includes(u.port)) throw Error('Only standard web ports are allowed.');
    const host=u.hostname.toLowerCase();
    if(!host||host==='localhost'||host.endsWith('.localhost')||host.endsWith('.local')||host.endsWith('.internal')||/^\d{1,3}(?:\.\d{1,3}){3}$/.test(host)) throw Error('Local, internal or IP-address URLs are not supported.');
    return u.href;
  }
  function error(mode,msg){const out=$(mode+'Result');if(!out)return;const box=document.createElement('div');box.className='notice';box.textContent=msg;out.replaceChildren(box)}
  function ensureFields(mode){
    const tool=$('#'+mode+'-tool'), card=tool?.querySelector('.card'); if(!card)return false;
    let wrap=card.querySelector('.ds-secure-inputs');
    if(!wrap){wrap=document.createElement('div');wrap.className='ds-secure-inputs';const result=$(mode+'Result');result?card.insertBefore(wrap,result):card.appendChild(wrap)}
    let url=$(mode+'Url');
    if(!url||!wrap.contains(url)){
      if(url)url.remove();const label=document.createElement('label');label.textContent=t('urlLabel','Privacy Policy URL');
      url=document.createElement('input');url.type='url';url.id=mode+'Url';url.className='input';url.placeholder='https://example.com/privacy';url.autocomplete='off';url.inputMode='url';url.maxLength=MAX_URL;url.setAttribute('aria-label',t('urlLabel','Privacy Policy URL'));label.appendChild(url);wrap.appendChild(label);
    }
    let text=$(mode+'Text');
    if(!text||!wrap.contains(text)){
      if(text)text.remove();const label=document.createElement('label');label.textContent=t('pasteLabel','Or paste Privacy Policy text');
      text=document.createElement('textarea');text.id=mode+'Text';text.className='input';text.rows=mode==='citizen'?9:11;text.maxLength=MAX_POLICY;text.placeholder=t(mode==='citizen'?'pasteCitizen':'pasteCompany','Paste the Privacy Policy text here...');text.setAttribute('aria-label',t('pasteLabel','Privacy Policy text'));label.appendChild(text);wrap.appendChild(label);
    }
    if(saved[mode].url&&!url.value)url.value=saved[mode].url;if(saved[mode].text&&!text.value)text.value=saved[mode].text;
    return true;
  }
  function bind(mode){
    if(!ensureFields(mode))return;
    const url=$(mode+'Url'),text=$(mode+'Text');if(!url||!text)return;
    if(!url.dataset.securityBound){url.dataset.securityBound='1';url.addEventListener('input',()=>{url.value=url.value.replace(/[\u0000-\u001F\u007F]/g,'').slice(0,MAX_URL)});url.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();read(mode)}})}
    if(!text.dataset.securityBound){text.dataset.securityBound='1';text.addEventListener('input',()=>{text.value=safeText(text.value)})}
    document.querySelectorAll(`[data-i18n="readPolicy"]`).forEach(b=>{if(!b.closest('#'+mode+'-tool')||b.dataset.securityBound)return;b.dataset.securityBound='1';b.addEventListener('click',e=>{e.preventDefault();read(mode)})});
    const key=mode==='citizen'?'explain':'runAssessment';document.querySelectorAll(`[data-i18n="${key}"]`).forEach(b=>{if(!b.closest('#'+mode+'-tool')||b.dataset.securityBound)return;b.dataset.securityBound='1';b.addEventListener('click',e=>{e.preventDefault();assess(mode)})});
  }
  function read(mode){if(!ensureFields(mode))return error(mode,'The assessment form is unavailable. Please reload the page.');const input=$(mode+'Url');if(!input)return error(mode,'The Privacy Policy URL field is unavailable.');try{input.value=validateUrl(input.value);saved[mode].url=input.value;const fn=app().fetchPolicy||window.fetchPolicy;if(typeof fn!=='function')throw Error('The policy reader is unavailable. Please reload the page.');fn(mode)}catch(e){error(mode,e.message)}}
  function assess(mode){if(!ensureFields(mode))return error(mode,'The assessment form is unavailable. Please reload the page.');const input=$(mode+'Text');if(!input)return error(mode,'The Privacy Policy text field is unavailable.');input.value=safeText(input.value);saved[mode].text=input.value;const fn=app().assess||window.assess;if(typeof fn!=='function')return error(mode,'The assessment engine is unavailable. Please reload the page.');fn(mode)}
  function bindNavigation(){document.querySelectorAll('.backBtn').forEach(b=>{if(b.dataset.securityBound)return;b.dataset.securityBound='1';b.addEventListener('click',e=>{e.preventDefault();(app().showChoice||window.showChoice)?.()})});document.querySelectorAll('[data-i18n="exportPdf"]').forEach(b=>{if(b.dataset.securityBound)return;b.dataset.securityBound='1';b.addEventListener('click',e=>{e.preventDefault();window.print()})})}
  function snapshot(){['citizen','company'].forEach(m=>{const u=$(m+'Url'),x=$(m+'Text');if(u)saved[m].url=u.value;if(x)saved[m].text=x.value})}
  function bindAll(){bind('citizen');bind('company');bindNavigation()}
  const language=$('language');if(language)language.addEventListener('change',()=>{snapshot();setTimeout(bindAll,0);setTimeout(bindAll,100)},true);
  bindAll();
  const observer=new MutationObserver(()=>{bindAll()});
  observer.observe(document.body,{childList:true,subtree:true});
  document.querySelectorAll('[onclick]').forEach(el=>el.removeAttribute('onclick'));
  window.DataSaathiSecurity=Object.freeze({sanitizeText:safeText,validateUrl});
})();
