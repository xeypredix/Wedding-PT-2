/* ===== EDIT HERE: all wedding details live in this one block ===== */
const weddingDetails = {
  bride: "Hiramoni Kalita ",
  groom: "Krishna Kalita",
  date: "13th December 2026 | Sunday",
  time: "7:00 AM Onwards",
  venue: "Wedding Venue",
  address: "Teliapara,<br>Udalguri , Assam"
};
const weddingDate = new Date("2026-12-13T07:00:00"); // countdown target
/* ================================================================= */

// Fill text everywhere: <span data-w="bride"></span>
document.querySelectorAll("[data-w]").forEach(el => {
  const key = el.dataset.w;
  if (key === "address") el.innerHTML = weddingDetails[key];
  else el.textContent = weddingDetails[key];
});

// ---------- decorations (generated so the HTML stays short) ----------
const NS = "http://www.w3.org/2000/svg";
function flower(color, size, x, y, rot) {
  const petals = [...Array(8)].map((_, i) =>
    `<ellipse cx="50" cy="26" rx="14" ry="24" fill="${color}" opacity=".92" transform="rotate(${i * 45} 50 50)"/>`).join("");
  return `<svg class="fl" style="width:${size}px;left:${x}%;bottom:${y}px;transform:rotate(${rot}deg)" viewBox="0 0 100 100" aria-hidden="true">${petals}<circle cx="50" cy="50" r="14" fill="#8a3b2a" opacity=".55"/><circle cx="50" cy="50" r="6" fill="#C9A646"/></svg>`;
}
function leaf(x, y, rot, h) {
  return `<svg class="fl leaf" style="left:${x}%;bottom:${y}px;height:${h}px;transform:rotate(${rot}deg)" viewBox="0 0 40 100" aria-hidden="true"><path d="M20 98C-6 60 4 20 20 2c16 18 26 58 0 96z" fill="#8a9474"/><path d="M20 98V10" stroke="#59604A" fill="none"/></svg>`;
}
function strand(x, len, delay) {
  const d = `<svg viewBox="0 0 40 ${len}" aria-hidden="true"><line x1="20" y1="0" x2="20" y2="${len}" stroke="#C9A646" stroke-width="1.5"/>` +
    [...Array(Math.floor(len / 60))].map((_, i) => `<path d="M20 ${30 + i * 60}l6 10-6 10-6-10z" fill="#C9A646"/>`).join("") +
    `<circle cx="20" cy="${len - 22}" r="15" fill="#E8D8B5" stroke="#C9A646" stroke-width="3"/><circle cx="20" cy="${len - 22}" r="7" fill="#D9824B"/></svg>`;
  return `<div class="strand" style="left:${x}%;width:34px;animation-delay:${delay}s">${d}</div>`;
}
const decor = document.getElementById("decor");
if (decor) {
  decor.innerHTML =
    strand(3, 320, 0) + strand(11, 200, .8) + strand(89, 200, .4) + strand(97, 320, 1.2) +
    `<svg class="chandelier" viewBox="0 0 200 110" aria-hidden="true"><path d="M100 0v30M100 30c-40 0-30 40-70 40M100 30c40 0 30 40 70 40M100 30c-16 0-14 40-40 40M100 30c16 0 14 40 40 40" stroke="#B8763F" stroke-width="3" fill="none"/><g fill="#F7E7B0">${[30, 60, 100, 140, 170].map(x => `<rect x="${x - 2}" y="55" width="4" height="14"/>`).join("")}</g><path d="M50 74h100l-50 34z" fill="#efe6d0" stroke="#C9A646"/></svg>`;
}
const floral = document.getElementById("floral");
if (floral) {
  const cols = ["#D98282", "#E9A06F", "#D96C62", "#D9824B", "#e8b7b0", "#a8536b"];
  let h = leaf(6, 40, -25, 150) + leaf(80, 40, 25, 150) + leaf(22, 30, -10, 110) + leaf(66, 30, 10, 110);
  [[2, 30, 70], [14, 10, 86], [26, 0, 66], [4, 0, 96], [70, 0, 66], [80, 14, 90], [90, 20, 74], [60, 24, 56], [36, 6, 50], [50, 4, 46]]
    .forEach(([x, y, s], i) => h += flower(cols[i % 6], s, x, y, i * 23));
  floral.innerHTML = h;
}

// ---------- countdown ----------
const box = document.getElementById("timer");
if (box) {
  const pad = n => String(n).padStart(2, "0");
  const tick = () => {
    const ms = weddingDate - new Date();
    if (ms <= 0) { box.innerHTML = '<p class="over">THE WAIT IS OVER</p>'; clearInterval(t); return; }
    const v = { days: Math.floor(ms / 864e5), hours: Math.floor(ms / 36e5) % 24, minutes: Math.floor(ms / 6e4) % 60, seconds: Math.floor(ms / 1e3) % 60 };
    for (const k in v) document.getElementById(k).textContent = k === "days" ? v[k] : pad(v[k]);
  };
  let t = setInterval(tick, 1000); tick();
}


// Pause the countdown when the page is hidden to avoid unnecessary background work.
if (box) {
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      clearInterval(t);
    } else {
      tick();
      t = setInterval(tick, 1000);
    }
  });
}
