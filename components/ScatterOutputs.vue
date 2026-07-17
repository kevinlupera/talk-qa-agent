<script setup lang="ts">
// Mismo prompt, 5 respuestas distintas: el assertEqual no tiene a qué agarrarse.
const OUTS = [12, 32, 50, 70, 88] // % vertical de cada salida
</script>

<template>
  <div class="scatter">
    <svg viewBox="0 0 320 120" preserveAspectRatio="none">
      <g v-for="(y, i) in OUTS" :key="i">
        <path
          class="ray"
          :style="{ animationDelay: `${300 + i * 120}ms` }"
          :d="`M 34 60 C 140 60, 170 ${y * 1.2}, 274 ${y * 1.2}`"
        />
        <circle
          class="dot"
          :style="{ animationDelay: `${900 + i * 120}ms` }"
          cx="278"
          :cy="y * 1.2"
          r="5"
        />
      </g>
      <circle class="src" cx="30" cy="60" r="7" />
    </svg>

    <div class="label in">1 prompt</div>
    <div class="label out">5 outputs</div>
    <div class="assert">assertEqual()</div>
  </div>
</template>

<style scoped>
.scatter {
  position: relative;
  width: 100%;
}
svg {
  width: 100%;
  height: 190px;
  overflow: visible;
}
.ray {
  fill: none;
  stroke: rgba(255, 176, 0, .55);
  stroke-width: 1.4;
  stroke-dasharray: 260;
  stroke-dashoffset: 260;
  animation: draw .9s ease forwards;
}
@keyframes draw { to { stroke-dashoffset: 0; } }
.dot {
  fill: var(--amber);
  opacity: 0;
  animation: pop .35s cubic-bezier(.2, 1.6, .4, 1) forwards;
}
@keyframes pop {
  from { opacity: 0; transform: scale(0); transform-origin: center; }
  to   { opacity: 1; transform: scale(1); }
}
.src {
  fill: var(--paper);
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, .5));
}
.label {
  position: absolute;
  font-family: var(--f-mono);
  font-size: .62rem;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: rgba(242, 244, 247, .72);
}
.in { left: 0; bottom: -.2rem; }
.out { right: 0; bottom: -.2rem; }
.assert {
  position: absolute;
  top: 42%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-4deg);
  font-family: var(--f-mono);
  font-size: 1.1rem;
  color: var(--alert);
  text-decoration: line-through;
  text-decoration-thickness: 2px;
  background: rgba(6, 8, 10, .82);
  padding: .1rem .5rem;
  border: 1px solid rgba(255, 59, 48, .5);
  border-radius: 3px;
  animation: strike .4s ease 1.6s backwards;
}
@keyframes strike {
  from { opacity: 0; transform: translate(-50%, -50%) rotate(-4deg) scale(1.4); }
  to   { opacity: 1; }
}
</style>
