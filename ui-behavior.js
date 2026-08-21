/* DataSaathi UI behavior: stable mode state, English-only assessment controls, reset semantics. */
(function(){
  'use strict';
  const $=id=>document.getElementById(id);
  const toolIds=['citizen','company'];
  const assessmentKeys=['citizenCheck','citizenToolTitle','citizenToolText','companyCheck','companyToolTitle','companyToolText','urlLabel','pasteLabel','readPolicy','explain','runAssessment','exportPdf','back','pasteCitizen','pasteCompany'];
  function clearPolicyText(){
    ['citizenText','companyText'].forEach(id=>{const el=$(id);if(el)el.value='';});
    ['citizenResult','companyResult'].forEach(id=>{const el=$(id);if(el)el.replaceChildren();});
  }
  function setMode(mode){
    toolIds.forEach(m=>{
      const card=document.getElementById(m),tool=document.getElementById(m+'-tool'),selected=m===mode;
      if(card)card.classList.toggle('selected',selected);
      if(tool)tool.classList.toggle('active-mode',selected);
    });
    const heroCitizen=$('heroCitizen'),heroCompany=$('heroCompany');
    if(heroCitizen)heroCitizen.classList.toggle('selected',mode==='citizen');
    if(heroCompany)heroCompany.classList.toggle('selected',mode==='company');
  }
  function englishAssessmentLabels(){
    const t=window.T&&window.T.en;if(!t)return;
    document.querySelectorAll('.tool-section [data-i18n]').forEach(el=>{
      const key=el.dataset.i18n;
      if(assessmentKeys.includes(key)&&t[key]!==undefined&&el.textContent!==t[key])el.textContent=t[key];
    });
    document.querySelectorAll('.tool-section [data-i18n-placeholder]').forEach(el=>{
      const key=el.dataset.i18nPlaceholder;
      if(t[key]!==undefined&&el.placeholder!==t[key])el.placeholder=t[key];
    });
  }
  function bind(){
    const citizen=$('citizenSelect'),company=$('companySelect'),heroC=$('heroCitizen'),heroCo=$('heroCompany');
    [[citizen,'citizen'],[heroC,'citizen'],[company,'company'],[heroCo,'company']].forEach(([el,mode])=>{
      if(!el||el.dataset.dsModeBound)return;
      el.dataset.dsModeBound='1';
      el.addEventListener('click',()=>{clearPolicyText();setTimeout(()=>{setMode(mode);englishAssessmentLabels();},0);});
    });
    document.querySelectorAll('.backBtn').forEach(btn=>{if(btn.dataset.dsBackBound)return;btn.dataset.dsBackBound='1';btn.addEventListener('click',()=>{clearPolicyText();setMode(null);});});
    const lang=$('language');
    if(lang&&!lang.dataset.dsLangBound){lang.dataset.dsLangBound='1';lang.addEventListener('change',()=>setTimeout(englishAssessmentLabels,0));}
    document.querySelectorAll('.tool-section').forEach(section=>{
      if(section.dataset.dsFocusBound)return;
      section.dataset.dsFocusBound='1';
      section.addEventListener('focusin',()=>{const m=section.id.startsWith('citizen')?'citizen':'company';setMode(m);});
    });
  }
  function init(){
    clearPolicyText();bind();englishAssessmentLabels();setMode(null);
    window.addEventListener('pageshow',clearPolicyText,{once:false});
    new MutationObserver(()=>{bind();englishAssessmentLabels();}).observe(document.body,{subtree:true,childList:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
