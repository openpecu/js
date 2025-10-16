
document.addEventListener("DOMContentLoaded", () => {
  const leagues = {
    brasileirao: [
      { id: "flamengo-palmeiras", home: "Flamengo", away: "Palmeiras", score: [2, 1], time: 90, status: "Encerrado" },
      { id: "corinthians-santos", home: "Corinthians", away: "Santos", score: [1, 1], time: 63, status: "Ao Vivo" },
      { id: "botafogo-bahia", home: "Botafogo", away: "Bahia", score: [0, 1], time: 42, status: "Ao Vivo" },
      { id: "gremio-fluminense", home: "Grêmio", away: "Fluminense", score: [3, 2], time: 90, status: "Encerrado" },
      { id: "cruzeiro-fortaleza", home: "Cruzeiro", away: "Fortaleza", score: [2, 2], time: 74, status: "Ao Vivo" },
      { id: "atletico-cuiaba", home: "Atlético-MG", away: "Cuiabá", score: [1, 0], time: 65, status: "Ao Vivo" },
      { id: "vasco-sao-paulo", home: "Vasco", away: "São Paulo", score: [0, 0], time: 20, status: "1º Tempo" },
      { id: "bahia-goias", home: "Bahia", away: "Goiás", score: [2, 3], time: 90, status: "Encerrado" },
      { id: "bragantino-coritiba", home: "RB Bragantino", away: "Coritiba", score: [0, 0], time: 10, status: "1º Tempo" },
      { id: "internacional-avai", home: "Internacional", away: "Avaí", score: [3, 1], time: 90, status: "Encerrado" }
    ],

    copa: [
      { id: "gremio-flamengo", home: "Grêmio", away: "Flamengo", score: [1, 0], time: 55, status: "Ao Vivo" },
      { id: "santos-palmeiras", home: "Santos", away: "Palmeiras", score: [0, 2], time: 78, status: "Ao Vivo" },
      { id: "bahia-cruzeiro", home: "Bahia", away: "Cruzeiro", score: [1, 3], time: 90, status: "Encerrado" },
      { id: "atletico-sao-paulo", home: "Atlético-MG", away: "São Paulo", score: [2, 1], time: 85, status: "Ao Vivo" },
      { id: "botafogo-fluminense", home: "Botafogo", away: "Fluminense", score: [0, 0], time: 35, status: "1º Tempo" },
      { id: "coritiba-vasco", home: "Coritiba", away: "Vasco", score: [2, 2], time: 90, status: "Encerrado" },
      { id: "goias-cruzeiro", home: "Goiás", away: "Cruzeiro", score: [0, 1], time: 60, status: "Ao Vivo" },
      { id: "bahia-cuiaba", home: "Bahia", away: "Cuiabá", score: [1, 0], time: 30, status: "1º Tempo" },
      { id: "internacional-flamengo", home: "Internacional", away: "Flamengo", score: [1, 1], time: 70, status: "Ao Vivo" },
      { id: "gremio-santos", home: "Grêmio", away: "Santos", score: [3, 3], time: 90, status: "Encerrado" }
    ],

    libertadores: [
      { id: "fluminense-river", home: "Fluminense", away: "River Plate", score: [2, 2], time: 90, status: "Encerrado" },
      { id: "boca-palmeiras", home: "Boca Juniors", away: "Palmeiras", score: [0, 1], time: 70, status: "Ao Vivo" },
      { id: "corinthians-colo", home: "Corinthians", away: "Colo-Colo", score: [1, 0], time: 68, status: "Ao Vivo" },
      { id: "sao-paulo-racing", home: "São Paulo", away: "Racing Club", score: [0, 0], time: 10, status: "1º Tempo" },
      { id: "gremio-penarol", home: "Grêmio", away: "Peñarol", score: [2, 2], time: 80, status: "Ao Vivo" },
      { id: "palmeiras-nacional", home: "Palmeiras", away: "Nacional", score: [1, 1], time: 60, status: "Ao Vivo" },
      { id: "flamengo-liga", home: "Flamengo", away: "LDU Quito", score: [3, 0], time: 90, status: "Encerrado" },
      { id: "atletico-river", home: "Atlético-MG", away: "River Plate", score: [2, 1], time: 75, status: "Ao Vivo" },
      { id: "internacional-boca", home: "Internacional", away: "Boca Juniors", score: [0, 0], time: 15, status: "1º Tempo" },
      { id: "bahia-defensa", home: "Bahia", away: "Defensa y Justicia", score: [1, 2], time: 90, status: "Encerrado" }
    ]
  };

  let currentLeague = "brasileirao";
  const board = document.getElementById("scoreboard");

  function renderScores(leagueName) {
    board.innerHTML = "";
    leagues[leagueName].forEach(m => {
      const div = document.createElement("div");
      div.className = "score";
      div.dataset.match = m.id;
      div.innerHTML = `
        <div class="team left"><strong>${m.home}</strong></div>
        <div class="result"><span class="home">${m.score[0]}</span> - <span class="away">${m.score[1]}</span></div>
        <div class="team right"><strong>${m.away}</strong></div>
        <div class="meta"><span class="badge ${m.status.includes("Vivo") ? "live" : (m.status.includes("Encerrado") ? "end" : "soon")}">${m.status}</span> <time>${m.time}’</time></div>
      `;
      board.appendChild(div);
    });
  }

  function tick() {
    leagues[currentLeague].forEach(m => {
      if (m.status === "Ao Vivo" || m.status.includes("Tempo")) {
        m.time += Math.floor(Math.random() * 2) + 1;
        if (Math.random() > 0.8) {
          if (Math.random() > 0.5) m.score[0]++; else m.score[1]++;
          flash(m.id);
        }
        if (m.time >= 90) {
          m.status = "Encerrado";
          m.time = 90;
        }
      }
    });
    renderScores(currentLeague);
  }

  function flash(matchId) {
    const el = document.querySelector(`[data-match="${matchId}"]`);
    if (!el) return;
    el.classList.add("flash");
    setTimeout(() => el.classList.remove("flash"), 1000);
  }

  document.querySelectorAll(".tab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentLeague = btn.dataset.league;
      renderScores(currentLeague);
    });
  });

  renderScores(currentLeague);
  setInterval(tick, 10000);
});
