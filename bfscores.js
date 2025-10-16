const matches = [
  { id: "flamengo-palmeiras", home: 2, away: 1, time: 90, status: "Encerrado" },
  { id: "corinthians-santos", home: 1, away: 1, time: 62, status: "Ao Vivo" }
];

function tick() {
  matches.forEach(m => {
    const el = document.querySelector(`[data-match="${m.id}"]`);
    if (!el) return;

    if (m.status === "Ao Vivo") {
      m.time += Math.floor(Math.random() * 2) + 1;
      if (Math.random() > 0.8) {
        Math.random() > 0.5 ? m.home++ : m.away++;
        flash(el);
      }
      if (m.time >= 90) {
        m.status = "Encerrado";
        el.querySelector(".badge").className = "badge end";
        el.querySelector(".badge").textContent = "Encerrado";
      }
    }

    el.querySelector(".home").textContent = m.home;
    el.querySelector(".away").textContent = m.away;
    el.querySelector("time").textContent = m.time + "’";
  });
}

function flash(el) {
  el.classList.add("flash");
  setTimeout(() => el.classList.remove("flash"), 800);
}

setInterval(tick, 10000);
