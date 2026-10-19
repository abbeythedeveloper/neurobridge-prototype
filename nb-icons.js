(function(){if(customElements.get('nb-icon'))return;var cache={};
class NbIcon extends HTMLElement{static get observedAttributes(){return['name','size']}
connectedCallback(){this.r()}attributeChangedCallback(){this.r()}
r(){var n=this.getAttribute('name');if(!n||n.indexOf('{')>-1)return;var s=this.getAttribute('size')||'20';this.setAttribute('aria-hidden','true');
var root=this.shadowRoot||this.attachShadow({mode:'open'});
var css='<style>:host{display:inline-flex !important;flex:none !important;width:'+s+'px !important;height:'+s+'px !important}svg{width:'+s+'px;height:'+s+'px;display:block}</style>';
if(!root.firstChild)root.innerHTML=css;
cache[n]=cache[n]||fetch('/vendor/icons/'+n+'.svg').then(function(r){return r.ok?r.text():''}).catch(function(){return''});
var self=this;cache[n].then(function(t){if(self.getAttribute('name')!==n||(self.getAttribute('size')||'20')!==s)return;root.innerHTML=css+t.replace(/stroke-width="2"/,'stroke-width="1.5"').replace(/width="24"/,'width="'+s+'"').replace(/height="24"/,'height="'+s+'"')})}}
customElements.define('nb-icon',NbIcon)})();
