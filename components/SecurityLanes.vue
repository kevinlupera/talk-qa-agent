<script setup lang="ts">
interface Lane {
  icon: string
  airport: string
  qa: string
}
defineProps<{ lanes: Lane[] }>()
</script>

<template>
  <div class="lanes">
    <div class="track" />
    <div
      v-for="(l, i) in lanes"
      :key="l.airport"
      class="lane"
      :style="{ animationDelay: `${150 + i * 130}ms` }"
    >
      <div class="icon">{{ l.icon }}</div>
      <div class="airport">{{ l.airport }}</div>
      <div class="qa">{{ l.qa }}</div>
    </div>
    <!-- el pasajero: recorre el pasillo y se detiene en cada puerta -->
    <div class="pax" />
  </div>
</template>

<style scoped>
.lanes {
  position: relative;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: .8rem;
  padding-top: 1.2rem;
}
.track {
  position: absolute;
  top: .4rem;
  left: 2%;
  right: 2%;
  height: 2px;
  background: repeating-linear-gradient(90deg, rgba(255, 176, 0, .35) 0 10px, transparent 10px 18px);
}
.pax {
  position: absolute;
  top: 0;
  left: 2%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--amber);
  box-shadow: 0 0 12px var(--amber);
  animation: walk 9s steps(1, end) infinite;
}
@keyframes walk {
  0%   { left: 2%; }
  16%  { left: 11%; }
  32%  { left: 30%; }
  48%  { left: 49%; }
  64%  { left: 68%; }
  80%  { left: 87%; }
  100% { left: 96%; opacity: 0; }
}
.lane {
  border: 1px solid rgba(255, 255, 255, .1);
  background: linear-gradient(180deg, rgba(255, 255, 255, .05), rgba(255, 255, 255, .015));
  border-radius: 3px;
  padding: .9rem .7rem;
  text-align: center;
  opacity: 0;
  animation: laneIn .5s cubic-bezier(.2, .8, .2, 1) forwards;
}
@keyframes laneIn {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: none; }
}
.icon { font-size: 1.6rem; }
.airport {
  font-family: var(--f-display);
  font-size: 1.05rem;
  letter-spacing: .04em;
  color: var(--paper);
  margin-top: .2rem;
}
.qa {
  margin-top: .5rem;
  padding-top: .45rem;
  border-top: 1px dashed rgba(255, 176, 0, .3);
  font-family: var(--f-mono);
  font-size: .62rem;
  letter-spacing: .06em;
  color: var(--amber);
}
</style>
