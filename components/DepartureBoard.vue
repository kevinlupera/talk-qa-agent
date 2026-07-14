<script setup lang="ts">
interface Row {
  gate: string
  level: string
  detail: string
  status: 'ok' | 'hold' | 'alert'
}
defineProps<{ rows: Row[] }>()

const LABEL = { ok: 'CLEARED', hold: 'SCREENING', alert: 'BLOCKED' }
</script>

<template>
  <div class="board">
    <div class="board-head">
      <span>GATE</span><span>CAPA</span><span>CONTROL</span><span>ESTADO</span>
    </div>
    <div
      v-for="(r, i) in rows"
      :key="r.gate"
      class="board-row"
      :class="`is-${r.status}`"
      :style="{ animationDelay: `${180 + i * 110}ms` }"
    >
      <span class="gate">{{ r.gate }}</span>
      <span class="level">{{ r.level }}</span>
      <span class="detail">{{ r.detail }}</span>
      <span class="status">
        <i class="lamp" />
        <SplitFlap :text="LABEL[r.status]" :speed="34" />
      </span>
    </div>
  </div>
</template>

<style scoped>
.board {
  border: 1px solid rgba(255, 176, 0, .22);
  background: rgba(6, 8, 10, .72);
  box-shadow: inset 0 0 60px rgba(255, 176, 0, .05);
}
.board-head,
.board-row {
  display: grid;
  grid-template-columns: 4.5rem 1fr 1.6fr 10rem;
  align-items: center;
  gap: 1rem;
  padding: .5rem .9rem;
}
.board-head {
  font-family: var(--f-mono);
  font-size: .62rem;
  letter-spacing: .22em;
  color: rgba(255, 176, 0, .5);
  border-bottom: 1px solid rgba(255, 176, 0, .18);
}
.board-row {
  border-bottom: 1px dashed rgba(255, 255, 255, .06);
  opacity: 0;
  animation: rowIn .5s cubic-bezier(.2, .8, .2, 1) forwards;
}
.board-row:last-child { border-bottom: 0; }
@keyframes rowIn {
  from { opacity: 0; transform: translateX(-14px); }
  to   { opacity: 1; transform: none; }
}
.gate {
  font-family: var(--f-display);
  font-size: 1.5rem;
  color: var(--amber);
}
.level {
  font-family: var(--f-display);
  font-size: 1.15rem;
  letter-spacing: .06em;
  color: #f2f4f7;
}
.detail {
  font-family: var(--f-mono);
  font-size: .72rem;
  color: rgba(242, 244, 247, .78);
}
.status {
  display: flex;
  align-items: center;
  gap: .55rem;
  font-size: .72rem;
}
.lamp {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex: none;
  background: var(--ok);
  box-shadow: 0 0 8px var(--ok);
}
.is-hold .lamp { background: var(--amber); box-shadow: 0 0 8px var(--amber); animation: blink 1.1s steps(2) infinite; }
.is-alert .lamp { background: var(--alert); box-shadow: 0 0 10px var(--alert); animation: blink .6s steps(2) infinite; }
@keyframes blink { 50% { opacity: .25; } }
</style>
