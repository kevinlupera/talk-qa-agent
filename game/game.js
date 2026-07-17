const MAX_LIVES = 3;
const XP_PER_GATE = 20;

const state = { level: 0, lives: MAX_LIVES, xp: 0, answered: false };
const app = document.getElementById('app');

const esc = (s) =>
  s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

function hud() {
  const hearts = '❤'.repeat(state.lives) + '·'.repeat(MAX_LIVES - state.lives);
  const pct = (state.xp / (LEVELS.length * XP_PER_GATE)) * 100;
  return `
    <div class="hud">
      <span class="lives">Vidas <b>${hearts}</b></span>
      <span>Puerta ${state.level + 1}/${LEVELS.length}</span>
      <div class="xp-bar"><div class="xp-fill" style="width:${pct}%"></div></div>
      <span>${state.xp} XP</span>
    </div>`;
}

function renderLevel() {
  const lv = LEVELS[state.level];
  state.answered = false;
  app.innerHTML = `
    ${hud()}
    <span class="gate-tag">Puerta ${lv.gate} · ${lv.icon} ${esc(lv.name)}</span>
    <h1>${esc(lv.brief)}</h1>
    <p class="brief">Elige con el teclado (1-${lv.options.length}) o con el ratón.</p>
    <pre class="scene">${esc(lv.scene)}</pre>
    <div class="options">
      ${lv.options
        .map(
          (o, i) => `<button class="opt" data-i="${i}">
            <span class="key">[${i + 1}]</span><span>${esc(o)}</span>
          </button>`
        )
        .join('')}
    </div>
    <div id="fb"></div>`;

  app.querySelectorAll('.opt').forEach((b) =>
    b.addEventListener('click', () => answer(+b.dataset.i))
  );
}

function answer(i) {
  if (state.answered) return;
  state.answered = true;

  const lv = LEVELS[state.level];
  const right = i === lv.correct;

  if (right) state.xp += XP_PER_GATE;
  else state.lives--;

  app.querySelectorAll('.opt').forEach((b, j) => {
    b.disabled = true;
    if (j === lv.correct) b.classList.add('right');
    else if (j === i) b.classList.add('wrong');
  });

  const last = state.level === LEVELS.length - 1;
  const dead = state.lives <= 0;
  app.querySelector('#fb').innerHTML = `
    <div class="feedback ${right ? 'right' : 'wrong'}">
      <strong>${right ? '✅ PASA · +' + XP_PER_GATE + ' XP' : '🚫 BLOQUEADO · -1 vida'}</strong>
      ${esc(right ? lv.ok : lv.bad)}
    </div>
    <button class="next">${dead ? 'Ver informe' : last ? 'Embarcar' : 'Siguiente puerta →'}</button>`;

  app.querySelector('.next').addEventListener('click', next);
  app.querySelector('.next').focus();
  app.querySelector('.xp-fill').style.width =
    (state.xp / (LEVELS.length * XP_PER_GATE)) * 100 + '%';
}

function next() {
  if (state.lives <= 0) return renderEnd(false);
  state.level++;
  if (state.level >= LEVELS.length) return renderEnd(true);
  renderLevel();
}

function rank() {
  if (state.xp === LEVELS.length * XP_PER_GATE) return 'JEFE DE SEGURIDAD';
  if (state.lives === 2) return 'OFICIAL DE PUERTA';
  return 'AGENTE EN PRÁCTICAS';
}

function renderEnd(boarded) {
  app.innerHTML = `
    ${hud()}
    <div class="end">
      <h1>${boarded ? '🛫 Embarcado' : '💥 Incidente en pista'}</h1>
      <p class="brief">${
        boarded
          ? 'Cruzaste las cinco capas. Tu agente no es una apuesta.'
          : 'Te quedaste sin vidas. En prod eso es dinero real de la empresa.'
      }</p>
      <div class="pass">
        <div class="row"><span>PASAJERO</span><span>${boarded ? rank() : 'RETENIDO'}</span></div>
        <div class="row"><span>PUERTAS CRUZADAS</span><span>${state.xp / XP_PER_GATE}/${LEVELS.length}</span></div>
        <div class="row"><span>VIDAS RESTANTES</span><span>${state.lives}</span></div>
        <div class="row"><span>XP TOTAL</span><span>${state.xp}</span></div>
        <div class="row"><span>VUELO</span><span>QA → PROD</span></div>
      </div>
      ${boarded && state.xp === LEVELS.length * XP_PER_GATE ? '<p class="rank blink">PERFECTO · 5/5</p>' : ''}
      <button class="next">Reintentar</button>
    </div>`;
  app.querySelector('.next').addEventListener('click', () => {
    Object.assign(state, { level: 0, lives: MAX_LIVES, xp: 0, answered: false });
    renderLevel();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    const n = app.querySelector('.next');
    if (n) { e.preventDefault(); n.click(); }
    return;
  }
  const i = +e.key - 1;
  const opt = app.querySelector(`.opt[data-i="${i}"]`);
  if (opt) opt.click();
});

renderLevel();
