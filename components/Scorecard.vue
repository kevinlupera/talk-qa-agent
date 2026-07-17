<script setup lang="ts">
interface Row {
  criterion: string
  evaluator: string
  score: number
}
withDefaults(defineProps<{
  rows: Row[]
  stamp?: string
  stampOk?: boolean
}>(), { stamp: 'APROBADO', stampOk: true })

const label = (s: number) => (s >= 1 ? 'CUMPLE' : s >= 0.5 ? 'PARCIAL' : 'FALLA')
</script>

<template>
  <div class="card">
    <div class="head">
      <span>Security officer · rubric</span>
      <span class="scale">1.0 / 0.5 / 0.0</span>
    </div>

    <div v-for="(r, i) in rows" :key="r.criterion" class="row" :style="{ animationDelay: `${200 + i * 160}ms` }">
      <div class="left">
        <div class="criterion">{{ r.criterion }}</div>
        <code>{{ r.evaluator }}</code>
      </div>
      <div class="right" :class="{ low: r.score < 1 }">
        <div class="score">{{ r.score.toFixed(1) }}</div>
        <div class="verdict">{{ label(r.score) }}</div>
      </div>
    </div>

    <div class="stamp" :class="{ bad: !stampOk }">{{ stamp }}</div>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  background: linear-gradient(135deg, #f7f3e8 0%, #ece5d3 100%);
  color: #16181c;
  border-radius: 3px;
  padding: .9rem 1.1rem 3.4rem;
  box-shadow: 0 18px 40px -18px rgba(0, 0, 0, .9), 0 0 0 1px rgba(255, 176, 0, .25);
  overflow: hidden;
}
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(0, 0, 0, .18) 1px, transparent 1px);
  background-size: 3px 3px;
  opacity: .35;
  mix-blend-mode: multiply;
  pointer-events: none;
}
.head {
  display: flex;
  justify-content: space-between;
  font-family: var(--f-mono);
  font-size: .55rem;
  letter-spacing: .2em;
  text-transform: uppercase;
  opacity: .55;
  padding-bottom: .5rem;
  border-bottom: 1px solid rgba(0, 0, 0, .25);
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: .7rem 0;
  border-bottom: 1px dashed rgba(0, 0, 0, .22);
  opacity: 0;
  animation: rowIn .45s ease forwards;
}
@keyframes rowIn {
  from { opacity: 0; transform: translateX(-10px); }
  to   { opacity: 1; transform: none; }
}
.criterion {
  font-family: var(--f-display);
  font-size: 1.2rem;
  letter-spacing: .03em;
}
.left code {
  font-family: var(--f-mono);
  font-size: .66rem;
  background: rgba(0, 0, 0, .07);
  padding: 0 .3em;
  border-radius: 2px;
}
.right { text-align: right; }
.score {
  font-family: var(--f-display);
  font-size: 1.7rem;
  line-height: 1;
  color: #0d7a57;
}
.right.low .score { color: #b91c1c; }
.verdict {
  font-family: var(--f-mono);
  font-size: .55rem;
  letter-spacing: .18em;
  opacity: .6;
}
.stamp {
  position: absolute;
  left: 1.2rem;
  bottom: .6rem;
  transform: rotate(-12deg);
  font-family: var(--f-display);
  font-size: 1.5rem;
  letter-spacing: .12em;
  padding: .1rem .6rem;
  border: 3px solid #0d7a57;
  color: #0d7a57;
  border-radius: 3px;
  opacity: .82;
  animation: stampIn .4s cubic-bezier(.2, 1.6, .4, 1) .9s backwards;
}
.stamp.bad { border-color: #b91c1c; color: #b91c1c; }
@keyframes stampIn {
  from { opacity: 0; transform: rotate(-12deg) scale(2.2); }
  to   { opacity: .82; transform: rotate(-12deg) scale(1); }
}
</style>
