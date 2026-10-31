const G=Escola.G; // o glossário agora vive no registro de conteúdo (content/glossario.js)
let S={done:{},tasks:{},best:0,theme:""};
try{Object.assign(S,JSON.parse(localStorage.getItem("escoladev")||"{}"))}catch(e){}
const save=()=>{try{localStorage.setItem("escoladev",JSON.stringify(S))}catch(e){}};
let V="home",OP=null,QS=null,MSG="",GQ="";
const NAV=[["home","🏠","Início"],["apo","📖","Apostila"],["gls","📚","Termos"],["tar","✅","Tarefas"],["pro","📝","Provas"],["tri","🧭","Trilha"],["mais","⚙️","Mais"]];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ST=["A fazer","Feita","Revisada no chat"];
const tdone=id=>(S.tasks[id]||{s:0}).s>0;
function pct(){const n=L.filter(l=>S.done[l.id]).length+T.filter(t=>tdone(t.id)).length+P.filter(p=>S.done[p.id]).length;return Math.round(100*n/(L.length+T.length+P.length))}
function applyTheme(){if(S.theme)document.documentElement.setAttribute("data-theme",S.theme);else document.documentElement.removeAttribute("data-theme")}
function nav(){document.getElementById("nav").innerHTML=NAV.map(n=>`<button data-a="nav" data-i="${n[0]}" class="${V===n[0]?"on":""}" aria-label="${n[2]}"><span>${n[1]}</span>${n[2]}</button>`).join("")}
function home(){const nt=T.find(t=>!tdone(t.id)),nl=L.find(l=>!S.done[l.id]);const p=pct();
return `<h1>Escola Dev</h1><p class="mu">Sua formação para comandar seus projetos com a IA como assistente.</p>
<div class="card"><div class="row sp"><b>Progresso geral</b><span class="pill">${p}%</span></div><div class="bar" style="margin-top:10px"><i style="width:${p}%"></i></div></div>
${nt?`<div class="card"><span class="pill w">Próxima tarefa</span><h3>${esc(nt.t)}</h3><p class="mu">${esc(nt.d)}</p><button class="btn s" data-a="nav" data-i="tar">Ver tarefas</button></div>`:""}
${nl?`<div class="card"><span class="pill">Próxima leitura</span><h3>${esc(nl.t)}</h3><p class="mu">${esc(nl.m)}, cerca de ${nl.min} min.</p><button class="btn s" data-a="open" data-i="${nl.id}">Abrir lição</button></div>`:""}
<div class="card"><b>Como usar</b><p class="mu">Comece pelo Módulo 0.0 da Apostila e consulte Termos sempre que um nome novo aparecer. Aqui você lê, faz tarefas e treina nas provas. No chat com o Claude você tira dúvidas e manda o que fez para ser revisado. Quando uma tarefa for revisada, mude o status dela para “Revisada no chat”.</p></div>`}
function apo(){if(OP){const l=L.find(x=>x.id===OP);return `<button class="btn g s" data-a="close">Voltar</button><h1 style="margin-top:14px">${l.t}</h1><p class="mu">${l.m}, cerca de ${l.min} min</p><div class="read">${l.b}</div><button class="btn" data-a="done" data-i="${l.id}">${S.done[l.id]?"Lição concluída (desfazer)":"Marcar como concluída"}</button>`}
return `<h1>Apostila</h1><p class="mu">Leia, teste no seu computador e anote o que não entendeu.</p>`+L.map(l=>`<button class="card item" data-a="open" data-i="${l.id}"><div class="row sp"><b>${l.t}</b><span class="pill ${S.done[l.id]?"o":""}">${S.done[l.id]?"Concluída":l.m}</span></div><div class="mu">${l.min} min de leitura</div></button>`).join("")}
function tar(){return `<h1>Tarefas</h1><p class="mu">Toque no botão para avançar o status. Suas anotações ficam salvas.</p>`+T.map(t=>{const s=S.tasks[t.id]||{s:0,n:""};return `<div class="card"><div class="row" style="flex-wrap:nowrap"><div class="chk">${s.s>0?"✓":""}</div><b>${t.t}</b></div><p class="mu">${t.d}</p><div class="row"><button class="btn s ${s.s?"":"g"}" data-a="task" data-i="${t.id}">${ST[s.s]}</button></div><textarea data-n="${t.id}" placeholder="O que você viu, sentiu ou não entendeu?">${esc(s.n||"")}</textarea></div>`}).join("")}
function pro(){if(!QS)return `<h1>Provas</h1><p class="mu">Seis perguntas sobre o que você estudou. Errar aqui é parte do treino.</p><div class="card"><p>Melhor resultado: <b>${S.best}/${Q.length}</b></p><button class="btn" data-a="qstart">Começar prova</button></div><p class="mu">Provas abertas, como explicar com suas palavras, você envia pelo chat.</p>`;
if(QS.i>=Q.length){return `<h1>Resultado</h1><div class="card"><p style="font-size:28px;margin:0"><b>${QS.sc}/${Q.length}</b></p><p class="mu">${QS.sc===Q.length?"Perfeito. Pode avançar.":"Releia as lições dos erros e tente de novo."}</p><button class="btn" data-a="qstart">Refazer</button></div>`}
const q=Q[QS.i];return `<h1>Pergunta ${QS.i+1} de ${Q.length}</h1><p><b>${q.q}</b></p>`+q.o.map((o,k)=>`<button class="opt ${QS.r!==null?(k===q.a?"ok":(k===QS.r?"no":"")):""}" data-a="qans" data-i="${k}" ${QS.r!==null?"disabled":""}>${o}</button>`).join("")+(QS.r!==null?`<div class="card"><b>${QS.r===q.a?"Certo.":"Quase."}</b> ${q.e}</div><button class="btn" data-a="qnext">${QS.i+1<Q.length?"Próxima":"Ver resultado"}</button>`:"")}
function tri(){return `<h1>Trilha</h1><p class="mu">Seis fases. Marque cada uma quando atingir o marco, de verdade.</p><ul class="trail">`+P.map(p=>`<li class="${S.done[p.id]?"on":""}"><b>${p.t}</b><div class="mu">${p.m}</div><button class="btn s g" style="margin-top:6px" data-a="ph" data-i="${p.id}">${S.done[p.id]?"Atingido (desfazer)":"Marcar como atingido"}</button></li>`).join("")+`</ul>`}
function mais(){return `<h1>Mais</h1><div class="card"><b>Aparência</b><div class="row" style="margin-top:8px"><button class="btn s g" data-a="theme" data-i="">Automático</button><button class="btn s g" data-a="theme" data-i="light">Claro</button><button class="btn s g" data-a="theme" data-i="dark">Escuro</button></div></div>
<div class="card"><b>Salvar e levar seu progresso</b><p class="mu">Seu progresso fica neste aparelho. Para levar para outro, copie o texto abaixo e cole no outro aparelho, na mesma caixa, depois toque em Importar.</p><textarea id="io">${esc(JSON.stringify(S))}</textarea><div class="row" style="margin-top:8px"><button class="btn s" data-a="copy">Copiar</button><button class="btn s g" data-a="imp">Importar</button></div><p class="mu" id="msg">${MSG}</p></div>
<div class="card"><b>Apagar tudo</b><p class="mu">Remove progresso e anotações deste aparelho.</p><button class="btn s g" data-a="reset">Apagar progresso</button></div>`}
function glist(){const q=GQ.trim().toLowerCase();const r=G.filter(g=>!q||g[0].toLowerCase().includes(q)||g[1].toLowerCase().includes(q));return r.length?r.map(g=>`<div class="card"><b>${g[0]}</b><p class="mu" style="margin:4px 0 0;font-size:15px">${g[1]}</p></div>`).join(""):'<p class="mu">Nenhum termo encontrado.</p>'}
function gls(){return `<h1>Termos</h1><p class="mu">Dicionário fixo. Digite qualquer palavra que você não conheça.</p><input id="gq" type="search" placeholder="Buscar termo" value="${esc(GQ)}" style="width:100%;font:inherit;padding:12px;border:1px solid var(--ln);border-radius:10px;background:var(--card);color:var(--tx)"><div id="gl">${glist()}</div>`}
function render(){nav();const f={home,apo,gls,tar,pro,tri,mais}[V];document.getElementById("app").innerHTML=f();}
document.addEventListener("click",e=>{const b=e.target.closest("[data-a]");if(!b)return;const a=b.dataset.a,i=b.dataset.i;
if(a==="nav"){V=i;OP=null;QS=null;MSG="";window.scrollTo(0,0)}
else if(a==="open"){V="apo";OP=i;window.scrollTo(0,0)}
else if(a==="close")OP=null;
else if(a==="done"||a==="ph"){S.done[i]=!S.done[i];save()}
else if(a==="task"){const t=S.tasks[i]||{s:0,n:""};t.s=(t.s+1)%3;S.tasks[i]=t;save()}
else if(a==="qstart")QS={i:0,sc:0,r:null};
else if(a==="qans"){const k=+i;QS.r=k;if(k===Q[QS.i].a)QS.sc++}
else if(a==="qnext"){QS.i++;QS.r=null;if(QS.i>=Q.length&&QS.sc>S.best){S.best=QS.sc;save()}}
else if(a==="theme"){S.theme=i;save();applyTheme()}
else if(a==="copy"){const ta=document.getElementById("io");ta.select();let ok=false;try{ok=document.execCommand("copy")}catch(x){}MSG=ok?"Copiado.":"Selecione o texto e copie manualmente.";document.getElementById("msg").textContent=MSG;return}
else if(a==="imp"){try{const d=JSON.parse(document.getElementById("io").value);if(typeof d!=="object"||!d.done||!d.tasks)throw 0;S=Object.assign({done:{},tasks:{},best:0,theme:""},d);save();applyTheme();MSG="Progresso importado."}catch(x){MSG="Texto inválido. Cole exatamente o que foi copiado."}}
else if(a==="reset"){if(confirm("Apagar todo o progresso deste aparelho?")){S={done:{},tasks:{},best:0,theme:""};save();applyTheme()}}
render()});
document.addEventListener("input",e=>{if(e.target.id==="gq"){GQ=e.target.value;document.getElementById("gl").innerHTML=glist();return}const id=e.target.dataset&&e.target.dataset.n;if(!id)return;const t=S.tasks[id]||{s:0,n:""};t.n=e.target.value;S.tasks[id]=t;save()});
const key=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const tk=()=>key(new Date());
const D=()=>S.days||(S.days={});
const mins=k=>Math.round((D()[k]||0)/60);
function streak(){let n=0;const d=new Date();for(let i=0;i<400;i++){const k=key(d);if((D()[k]||0)>=600)n++;else if(n>0||k!==tk())break;d.setDate(d.getDate()-1)}return n}
function week(){let t=0;const d=new Date();for(let i=0;i<7;i++){t+=D()[key(d)]||0;d.setDate(d.getDate()-1)}return Math.round(t/60)}
function meta(){const m=mins(tk()),g=S.goal||60;return `<div class='row sp'><b>Hoje: ${m} de ${g} min</b><span class='pill ${m>=g?'o':''}'>${streak()} dias seguidos</span></div><div class='bar' style='margin-top:10px'><i style='width:${Math.min(100,100*m/g)}%'></i></div><p class='mu' style='margin:8px 0'>Esta semana: ${week()} min. Conta o tempo com esta página aberta e visível. Dia com 10 min ou mais mantém a sequência.</p><div class='row'><span class='mu'>Meta diária:</span>${[30,60,120].map(x=>`<button class='btn s ${g===x?'':'g'}' data-a='goal' data-i='${x}'>${x} min</button>`).join('')}</div>`}
setInterval(()=>{if(document.hidden)return;const k=tk();D()[k]=(D()[k]||0)+15;save();const e=document.getElementById('meta');if(e)e.innerHTML=meta()},15000);
function home(){const nt=T.find(t=>!tdone(t.id)),nl=L.find(l=>!S.done[l.id]),p=pct();
const ms=[...new Set(L.map(l=>l.m))].map(m=>{const a=L.filter(l=>l.m===m),d=a.filter(l=>S.done[l.id]).length;return `<div style='margin:12px 0 0'><div class='row sp'><span>${m}</span><span class='mu'>${d}/${a.length} lições</span></div><div class='bar'><i style='width:${100*d/a.length}%'></i></div></div>`}).join('');
return `<h1>Escola Dev</h1><p class='mu'>Seu painel de estudo.</p><div class='card' id='meta'>${meta()}</div><div class='card'><div class='row sp'><b>Progresso geral</b><span class='pill'>${p}%</span></div><div class='bar' style='margin-top:10px'><i style='width:${p}%'></i></div>${ms}</div>`+(nl?`<div class='card'><span class='pill'>Próxima lição</span><h3>${esc(nl.t)}</h3><p class='mu'>${esc(nl.m)}, cerca de ${nl.min} min.</p><button class='btn s' data-a='open' data-i='${nl.id}'>Abrir lição</button></div>`:'')+(nt?`<div class='card'><span class='pill w'>Próxima tarefa</span><h3>${esc(nt.t)}</h3><p class='mu'>${esc(nt.d)}</p><button class='btn s' data-a='nav' data-i='tar'>Ver tarefas</button></div>`:'')}
let AQ='';
function alist(){const q=AQ.trim().toLowerCase();let h='',cur='';L.filter(l=>!q||(l.t+' '+l.b.replace(/<[^>]+>/g,' ')).toLowerCase().includes(q)).forEach(l=>{if(l.m!==cur){cur=l.m;const a=L.filter(x=>x.m===cur);h+=`<h2>${cur} <span class='mu'>(${a.filter(x=>S.done[x.id]).length}/${a.length})</span></h2>`}h+=`<button class='card item' data-a='open' data-i='${l.id}'><div class='row sp'><b>${l.t}</b><span class='pill ${S.done[l.id]?'o':''}'>${S.done[l.id]?'Concluída':l.min+' min'}</span></div></button>`});return h||'<p class="mu">Nada encontrado.</p>'}
function apo(){if(OP){const k=L.findIndex(x=>x.id===OP),l=L[k],pv=L[k-1],nx=L[k+1];return `<button class='btn g s' data-a='close'>Voltar à lista</button><h1 style='margin-top:14px'>${l.t}</h1><p class='mu'>${l.m}, lição ${k+1} de ${L.length}, cerca de ${l.min} min</p><div class='read'>${l.b}</div><div class='row' style='margin-top:16px'><button class='btn' data-a='done' data-i='${l.id}'>${S.done[l.id]?'Concluída (desfazer)':'Marcar como concluída'}</button></div><div class='row sp' style='margin-top:14px'>${pv?`<button class='btn g s' data-a='open' data-i='${pv.id}'>Anterior</button>`:'<span></span>'}${nx?`<button class='btn g s' data-a='open' data-i='${nx.id}'>Próxima</button>`:''}</div>`}
return `<h1>Apostila</h1><input id='aq' type='search' placeholder='Buscar nas lições' value='${esc(AQ)}' style='width:100%;font:inherit;padding:12px;border:1px solid var(--ln);border-radius:10px;background:var(--card);color:var(--tx)'><div id='al'>${alist()}</div>`}
function tar(){return `<h1>Tarefas</h1><p class='mu'>Avance o status, anote, e use “Copiar para o chat” para enviar a tarefa e receber a correção.</p>`+T.map(t=>{const s=S.tasks[t.id]||{s:0,n:''};return `<div class='card'><div class='row' style='flex-wrap:nowrap'><div class='chk'>${s.s>0?'✓':''}</div><b>${t.t}</b></div><p class='mu'>${t.d}</p><div class='row'><button class='btn s ${s.s?'':'g'}' data-a='task' data-i='${t.id}'>${ST[s.s]}</button><button class='btn s g' data-a='tcopy' data-i='${t.id}'>Copiar para o chat</button></div><textarea data-n='${t.id}' placeholder='O que você viu, sentiu ou não entendeu?'>${esc(s.n||'')}</textarea><p class='mu' id='c_${t.id}'></p></div>`}).join('')}
let FC=null;
function gls(){if(FC){const dk=G.filter(g=>((S.fc||{})[g[0]]||0)<3);if(!dk.length)return `<h1>Revisão</h1><div class='card'><p>Você dominou todos os termos. Muito bem.</p><button class='btn' data-a='fcend'>Voltar</button></div>`;const g=dk[FC.k%dk.length];return `<h1>Revisão</h1><p class='mu'>${dk.length} termos na fila. Acerte 3 vezes para um termo sair.</p><div class='card' style='min-height:140px'><b style='font-size:20px'>${g[0]}</b>${FC.s?`<p class='read'>${g[1]}</p>`:''}</div>`+(FC.s?`<div class='row'><button class='btn' data-a='fcok' data-i='${esc(g[0])}'>Acertei</button><button class='btn g' data-a='fcno' data-i='${esc(g[0])}'>Errei</button></div>`:`<button class='btn' data-a='fcshow'>Mostrar definição</button>`)+`<p><button class='btn g s' data-a='fcend'>Sair da revisão</button></p>`}
return `<h1>Termos</h1><p class='mu'>Dicionário fixo, com busca e cartões de revisão.</p><p><button class='btn s' data-a='fcstart'>Revisar com cartões</button></p><input id='gq' type='search' placeholder='Buscar termo' value='${esc(GQ)}' style='width:100%;font:inherit;padding:12px;border:1px solid var(--ln);border-radius:10px;background:var(--card);color:var(--tx)'><div id='gl'>${glist()}</div>`}
document.addEventListener('input',e=>{if(e.target.id==='aq'){AQ=e.target.value;document.getElementById('al').innerHTML=alist()}});
document.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a,i=b.dataset.i;
if(a==='nav')FC=null;
else if(a==='goal'){S.goal=+i;save()}
else if(a==='fcstart')FC={k:0,s:false};
else if(a==='fcshow')FC.s=true;
else if(a==='fcok'){S.fc=S.fc||{};S.fc[i]=(S.fc[i]||0)+1;save();FC.s=false;FC.k++}
else if(a==='fcno'){S.fc=S.fc||{};S.fc[i]=0;save();FC.s=false;FC.k++}
else if(a==='fcend')FC=null;
else if(a==='tcopy'){const t=T.find(x=>x.id===i),s=S.tasks[i]||{s:0,n:''};const txt='Tarefa: '+t.t+'\nStatus: '+ST[s.s]+'\nMinhas anotações:\n'+(s.n||'(sem anotações)')+'\n\nPode revisar e me dizer o que entendi certo e o que preciso corrigir?';const ta=document.createElement('textarea');ta.value=txt;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();ta.setSelectionRange(0,txt.length);let ok=false;try{ok=document.execCommand('copy')}catch(x){}ta.remove();const m=document.getElementById('c_'+i);if(m)m.textContent=ok?'Copiado. Cole no chat com o Claude.':'Não consegui copiar. Selecione suas anotações e copie manualmente.';return}
else return;
render()});
applyTheme();render();
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
