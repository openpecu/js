// Simulated live odds with jitter and status
const games=[
  {league:"CBLOL",home:"Flamengo Esports",away:"Santos e-Sports",status:"Ao Vivo",odds:[1.95,2.45,3.10]},
  {league:"CBCS CS2",home:"FURIA",away:"paiN",status:"Aguardando",odds:[2.10,1.85,3.20]},
  {league:"VCT BR",home:"LOUD",away:"Vivo Keyd",status:"Encerrado",odds:[1.75,2.60,3.50]},
  {league:"DPC SA",home:"beastcoast",away:"Thunder Awaken",status:"Ao Vivo",odds:[2.05,2.05,3.05]}
];
function fmt(n){return n.toFixed(2)}
function rowHtml(g){
  return `<div class="odd-row ${g.status==='Ao Vivo'?'live':''}">
      <div><strong>${g.league}</strong> — ${g.home} vs ${g.away}</div>
      <div class="badge">${g.status}</div>
      <div><strong>${fmt(g.odds[0])}</strong></div>
      <div><strong>${fmt(g.odds[1])}</strong></div>
      <div><strong>${fmt(g.odds[2])}</strong></div>
    </div>`;
}
function renderOdds(list,elId){
  const el=document.getElementById(elId); if(!el) return;
  el.innerHTML=list.map(rowHtml).join("");
}
function tick(){
  games.forEach(g=>{
    if(Math.random()>0.55){
      g.odds=g.odds.map(o=>{
        let d=(Math.random()-0.5)*0.25;
        let v=Math.min(3.6,Math.max(1.6,o+d));
        return Number(v.toFixed(2));
      });
      const states=["Ao Vivo","Encerrado","Aguardando"];
      if(Math.random()>0.82){ g.status=states[Math.floor(Math.random()*states.length)]; }
    }
  });
  renderOdds(games,"oddsboard");
  renderOdds(games,"oddsdetail");
}
document.addEventListener("DOMContentLoaded",()=>{
  renderOdds(games,"oddsboard");
  renderOdds(games,"oddsdetail");
  setInterval(tick,15000);
});
