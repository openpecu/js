document.addEventListener("DOMContentLoaded", () => {
  const matches = [
    { id: "flamengo-palmeiras", home: 2, away: 1, time: 90, status: "Encerrado" },
    { id: "corinthians-santos", home: 1, away: 1, time: 62, status: "Ao Vivo" }
  ];

  function updateMatchDisplay(match) {
    const el = document.querySelector(`[data-match="${match.id}"]`);
    if (!el) return;

    const homeEl = el.querySelector(".home");
    const awayEl = el.querySelector(".away");
    const timeEl = el.querySelector("time");
    const badgeEl = el.querySelector(".badge");

    if (homeEl) homeEl.textContent = match.home;
    if (awayEl) awayEl.textContent = match.away;
    if (timeEl) timeEl.textContent = match.time + "’";
    if (badgeEl) {
      badgeEl.textContent = match.status;
      badgeEl.className = "badge " + (match.status === "Encerrado" ? "end" : "live");
    }
  }

  function randomTick() {
    matches.forEach(match => {
      if (match.status === "Ao Vivo") {
        match.time += Math.floor(Math.random() * 2) + 1;

        if (Math.random() > 0.85) {
          if (Math.random() > 0.5) match.home++;
          else match.away++;
          flashHighlight(match.id);
        }

        if (match.time >= 90) {
          match.time = 90;
          match.status = "Encerrado";
        }
      }

      updateMatchDisplay(match);
    });
  }

  function flashHighlight(matchId) {
    const el = document.querySelector(`[data-match="${matchId}"]`);
    if (!el) return;
    el.classList.add("flash");
    setTimeout(() => el.classList.remove("flash"), 1200);
  }

  matches.forEach(updateMatchDisplay);

  setInterval(randomTick, 10000);
});
