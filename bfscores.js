// Enhanced live scores with leagues
const leagues = {
  brasileirao: [
    { home: "Flamengo", away: "Palmeiras", score: "2 - 1", status: "Encerrado" },
    { home: "Corinthians", away: "Santos", score: "1 - 1", status: "Ao Vivo" },
    { home: "São Paulo", away: "Grêmio", score: "0 - 0", status: "1º Tempo" }
  ],
  copa: [
    { home: "Cruzeiro", away: "Atlético-MG", score: "1 - 0", status: "Ao Vivo" },
    { home: "Bahia", away: "Fortaleza", score: "0 - 2", status: "2º Tempo" }
  ],
  libertadores: [
    { home: "Fluminense", away: "River Plate", score: "2 - 2", status: "Encerrado" },
    { home: "Athletico-PR", away: "Boca Juniors", score: "0 - 0", status: "A iniciar" }
  ]
};

let currentLeague = "brasileirao";

function renderScores() {
  const board = document.getElementById("scoreboard");
  if (!board) return;
  board.innerHTML = "";
  leagues[currentLeague].forEach(m => {
    const div = document.createElement("div");
    div.className = "score";
    div.innerHTML = `
      <strong>${m.home}</strong>
      <span>${m.score}</span>
      <strong>${m.away}</strong>
      <span class="badge ${m.status==='Ao Vivo'?'live':(m.status==='Encerrado'?'end':'soon')}">${m.status}</span>
    `;
    board.appendChild(div);
  });
}

function tickScores(){
  Object.values(leagues).forEach(list => {
    list.forEach(m => {
      if (Math.random() > 0.7) {
        const h = Math.floor(Math.random()*4);
        const a = Math.floor(Math.random()*4);
        m.score = `${h} - ${a}`;
        const states = ["1º Tempo", "2º Tempo", "Ao Vivo", "Encerrado", "A iniciar"];
        m.status = states[Math.floor(Math.random()*states.length)];
      }
    });
  });
  renderScores();
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".tab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentLeague = btn.dataset.league;
      renderScores();
    });
  });
  renderScores();
  setInterval(tickScores, 15000);
});
