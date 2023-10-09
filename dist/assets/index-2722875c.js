(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const e of n)if(e.type==="childList")for(const c of e.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function s(n){const e={};return n.integrity&&(e.integrity=n.integrity),n.referrerPolicy&&(e.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?e.credentials="include":n.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function o(n){if(n.ep)return;n.ep=!0;const e=s(n);fetch(n.href,e)}})();function U(t,a,s){const o=[];return t.forEach((n,e)=>{const c=a[e].id,r=t[e].name;let i="";for(const d of a[e].flavor_text_entries)if(d.language.name==="en"&&d.version.name==="red"){i=d.flavor_text.replace(/\n/g," ").replace(/\f/g," ");break}const u=t[e].sprites.other.dream_world.front_default,f=t[e].sprites.other.home.front_default,p=t[e].sprites.front_default,h=[];for(const d of t[e].abilities){const x=[d.ability.name,d.ability.url];h.push(x)}const l=[];for(const d of t[e].types)l.push(d.type.name);const m=[];for(const d of a[e].egg_groups)d.name==="no-eggs"?m.push("none"):m.push(d.name);let g=s[e].chain;for(console.log(g.species.name+": "+t[e].id);g.evolves_to.length>0&&g.species.name!=t[e].name;)g=g.evolves_to[0];const v=[];let _=0;for(const d of g.evolves_to)if(_<3)v.push(d.species.name),_++;else break;const N=new $(t[e].stats[0].base_stat,t[e].stats[1].base_stat,t[e].stats[2].base_stat,t[e].stats[3].base_stat,t[e].stats[4].base_stat,t[e].stats[5].base_stat),w=new z(c,r,u,f,p,i,m,l,h,v,N);o.push(w)}),o}function $(t,a,s,o,n,e){const c=t,r=a,i=s,u=o,f=n,p=e;return{getHp(){return c},getAttack(){return r},getDefense(){return i},getSpecialAttack(){return u},getSpecialDefense(){return f},getSpeed(){return p}}}function z(t,a,s,o,n,e,c,r,i,u,f){const p=t,h=a,l=s,m=o,g=n,v=e,_=c,N=r,w=i,d=u;return{getID(){return p},getName(){return h},getType(){return N},getGroup(){return _},getImgHero(){return l},getImage(){return m},getSpriteImage(){return g},getDescription(){return v},getAbilities(){return w},getEvolutionList(){return d},stats:f}}async function T(t){try{const a=await fetch(t);if(!a.ok)throw new Error(`HTTP error! Status: ${a.status}`);return await a.json()}catch(a){throw console.error("Error fetching data:",a),a}}async function q(t,a){const s=new M;try{const o=t.map(async e=>{const c=await fetch(e[a]);if(!c.ok)throw new Error(`HTTP error! Status: ${c.status}`);return c.json()}),n=await Promise.all(o);return s.results.push(...n),s.count=s.results.length,s}catch(o){throw console.error("Error fetching data:",o),o}}async function V(t,a,s){const o=new M;try{const n=t.map(async c=>{const r=await fetch(c[a][s]);if(!r.ok)throw new Error(`HTTP error! Status: ${r.status}`);return r.json()}),e=await Promise.all(n);return o.results.push(...e),o.count=o.results.length,o}catch(n){throw console.error("Error fetching data:",n),n}}function M(){return{results:[],count:0}}const K="/Pokethesaurus/assets/mp2-logo-6c72681a.png";function R(t,a,s){const o=document.createElement("article"),n=document.createElement("section"),e=document.createElement("section"),c=document.createElement("section"),r=document.createElement("h3");r.textContent="#"+t.getID();const i=document.createElement("div");i.className="group-container";for(const l of t.getGroup()){const m=document.createElement("p");m.className="card-group "+l,m.textContent=l,i.appendChild(m)}n.appendChild(r),n.appendChild(i);const u=document.createElement("img");u.classList="card-img",u.src=t.getImage();const f=document.createElement("div");f.className="type-container";for(const l of t.getType()){const m=document.createElement("p");m.className="type-group "+l,m.textContent=l,f.appendChild(m)}e.appendChild(u),e.appendChild(f);const p=document.createElement("h2");p.textContent=t.getName();const h=document.createElement("p");return h.textContent=t.getDescription(),c.appendChild(p),c.appendChild(h),o.className="card-container",n.className="card-header",e.className="card-body",c.className="card-footer",o.appendChild(n),o.appendChild(e),o.appendChild(c),o.addEventListener("click",function(){console.log("click"),s.updateView(t,a)}),o}function W(t,a,s){const o=t[0].toUpperCase()+t.slice(1),n=document.createElement("section");n.className="category-section";const e=document.createElement("h2");e.textContent=o+" Pokemons";const c=document.createElement("div");c.className="category-content",n.appendChild(e),n.appendChild(c);const r=[];for(;r.length<5;){const i=Math.floor(Math.random()*a.length);if(!r.includes(i))for(const u of a[i].getType())u===t&&(c.appendChild(R(a[i],a,s)),console.log("card created"),r.push(i))}return n}function X(t,a){const s=t,o=document.createElement("header");o.className="header-container";const n=document.createElement("img");n.className="header-logo";const e=document.createElement("div");e.className="search-text-container";const c=document.createElement("input");c.type="text",c.placeholder="Find your Pokémon!",n.src=K,e.appendChild(c),o.appendChild(n),o.appendChild(e);const r=document.createElement("div");r.className="search-view-container";const i=document.createElement("ul");e.appendChild(r),r.appendChild(i),c.addEventListener("keyup",function(f){u(c.value)});function u(f){if(f.length>0){for(r.style.display="flex";i.firstChild;)i.removeChild(i.firstChild);let p=0;for(const h of s)if(p<7){if(h.getName().toLowerCase().startsWith(f.toLowerCase())){const l=document.createElement("li");l.className="search-item";const m=document.createElement("img"),g=document.createElement("p"),v=document.createElement("p");m.src=h.getSpriteImage(),g.textContent=h.getName(),v.textContent="#"+h.getID(),l.appendChild(m),l.appendChild(g),l.appendChild(v),i.appendChild(l),l.addEventListener("click",function(){a.updateView(h,s),r.style.display="none",c.value=""}),p+=1}}else break}else r.style.display="none"}return o}function J(t,a,s){const o=document.createElement("div"),n=document.createElement("div"),e=document.createElement("h1"),c=document.createElement("div"),r=document.createElement("h1"),i=document.createElement("h1"),u=document.createElement("div"),f=document.createElement("img"),p=document.createElement("div"),h=document.createElement("p"),l=document.createElement("div"),m=document.createElement("img"),g=document.createElement("p");return o.className="hero-container",c.className="hero-header",u.className="hero-image-container",p.className="hero-right-container",n.className="hero-left-container",l.className="hero-footer-container",h.className="hero-description",e.textContent="Featured Legendary:",i.textContent=t[a].getName(),r.textContent="#"+t[a].getID(),f.src=t[a].getImage(),h.textContent=t[a].getDescription(),m.src=t[a].getSpriteImage(),g.textContent="See more . . .",t[a].getAbilities().forEach(async(v,_)=>{const N=await T(v[1]),w=document.createElement("div");w.className="ability-container";const d=document.createElement("p");d.className="hero-ability-name";const x=document.createElement("p");d.textContent="Ability "+(_+1)+": "+v[0];for(const I of N.flavor_text_entries)if(I.language.name==="en"){x.textContent=I.flavor_text;break}w.appendChild(d),w.appendChild(x),p.appendChild(w)}),u.appendChild(f),c.appendChild(i),c.appendChild(r),l.appendChild(m),l.appendChild(g),n.appendChild(e),n.appendChild(u),p.appendChild(c),p.appendChild(h),p.appendChild(l),o.appendChild(n),o.appendChild(p),g.addEventListener("click",function(){s.updateView(t[a],t)}),o}function Q(t,a,s){const o=[151,150,146,145,144],n=Math.floor(Math.random()*o.length);for(let e=a.length-1;e>142;e--)if(a[e].getID()==o[n]){t.appendChild(J(a,e,s));break}}function Y(){const t=document.createElement("div"),a=document.createElement("div"),s=document.createElement("div"),o=document.createElement("div"),n=document.createElement("div"),e=document.createElement("img"),c=document.createElement("div"),r=document.createElement("div"),i=document.createElement("h3"),u=document.createElement("p"),f=document.createElement("p"),p=document.createElement("p"),h=document.createElement("p"),l=document.createElement("p"),m=document.createElement("p"),g=document.createElement("div"),v=document.createElement("div"),_=document.createElement("p"),N=document.createElement("div"),w=document.createElement("img"),d=document.createElement("div"),x=document.createElement("div"),I=document.createElement("p"),L=document.createElement("div"),k=document.createElement("button"),A=document.createElement("p");o.className="left-view",t.className="view-container",a.className="view-filter",n.className="right-view-header",c.className="view-group-container",s.className="view-display-container",r.className="view-stats",i.className="stat-title",v.className="right-view",N.className="view-main",x.className="view-evolution",L.className="view-evolution-list",d.className="view-type-container",A.className="view-description",k.textContent="X",k.style.fontSize="16px",k.style.zIndex="2",k.className="btn-view-close",n.appendChild(e),n.appendChild(c),r.appendChild(i),r.appendChild(u),r.appendChild(f),r.appendChild(p),r.appendChild(h),r.appendChild(l),r.appendChild(m),o.appendChild(n),o.appendChild(r),o.appendChild(g),N.appendChild(w),N.appendChild(d),x.appendChild(I),x.appendChild(L),v.appendChild(_),v.appendChild(N),v.appendChild(x),s.appendChild(v),s.appendChild(o),s.appendChild(A),t.appendChild(a),t.appendChild(s),t.appendChild(k),I.textContent="Evolve into: ",i.textContent="Stats",u.textContent="HP: 0",f.textContent="Attack: 0",p.textContent="Defense: 0",h.textContent="SP: 0",l.textContent="SD: 0",m.textContent="Speed: 0";const G=()=>{t.style.display="none"};k.addEventListener("click",()=>{G()});const O=(C,F)=>{for(t.style.display="block",_.textContent="# "+C.getID()+": "+C.getName(),w.src=C.getImage();d.firstChild;)d.removeChild(d.firstChild);for(const E of C.getType()){const y=document.createElement("p");y.className="view-type-list "+E,y.textContent=E,d.appendChild(y)}for(;L.firstChild;)L.removeChild(L.firstChild);if(console.log(C.getEvolutionList()),console.log(C.getEvolutionList().length),C.getEvolutionList().length>0)C.getEvolutionList().forEach(E=>{for(const y of F)if(y.getName()===E){const D=document.createElement("div");D.className="evolve-item-container";const S=document.createElement("img"),P=document.createElement("p");S.src=y.getSpriteImage(),P.textContent=E,D.appendChild(S),D.appendChild(P),L.appendChild(D)}});else{const E=document.createElement("p");E.textContent="None",L.appendChild(E)}for(e.src=C.getSpriteImage();c.firstChild;)c.removeChild(c.firstChild);for(const E of C.getGroup()){const y=document.createElement("p");y.className="view-group "+E,y.textContent=E,c.appendChild(y)}for(u.textContent="HP: "+C.stats.getHp(),f.textContent="Attack: "+C.stats.getAttack(),p.textContent="Defense: "+C.stats.getDefense(),h.textContent="SP: "+C.stats.getSpecialAttack(),l.textContent="SD: "+C.stats.getSpecialDefense(),m.textContent="Speed: "+C.stats.getSpeed();g.firstChild;)g.removeChild(g.firstChild);C.getAbilities().forEach(async(E,y)=>{const D=await T(E[1]),S=document.createElement("div");S.className="view-ability-container";const P=document.createElement("p"),H=document.createElement("p");P.textContent="Ability "+(y+1)+": "+E[0];for(const B of D.flavor_text_entries)if(B.language.name==="en"){H.textContent=B.flavor_text;break}S.appendChild(P),S.appendChild(H),g.appendChild(S)}),A.textContent=C.getDescription()};return a.addEventListener("click",()=>{t.style.display="none"}),{pokemonView:t,updateView:O}}function Z(t,a,s){const o=["grass","poison","fire","flying","water","normal","electric","ground","fighting","psychic","rock","bug"],n=[];for(;n.length<5;){const e=Math.floor(Math.random()*o.length);n.includes(o[e])||n.push(o[e])}n.forEach((e,c)=>{t.appendChild(W(e,a,s)),console.log("category created")})}const b=document.getElementById("app");async function j(){const t=Y();b.appendChild(t.pokemonView);const a=await T("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"),s=await q(a.results,"url"),o=await V(s.results,"species","url"),n=await V(o.results,"evolution_chain","url");console.log(n);const e=U(s.results,o.results,n.results);Q(b,e,t),b.appendChild(X(e,t)),Z(b,e,t)}j();