<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  label: string
  score: number
  threshold?: number
}>(), { threshold: 0.85 })

const fill = ref(0)
const blocked = computed(() => props.score < props.threshold)

onMounted(() => {
  requestAnimationFrame(() => { fill.value = props.score })
})
</script>

<template>
  <div class="gate" :class="{ blocked }">
    <div class="top">
      <span class="label">{{ label }}</span>
      <span class="val">{{ score.toFixed(2) }}</span>
    </div>
    <div class="track">
      <div class="bar" :style="{ width: `${fill * 100}%` }" />
      <div class="thr" :style="{ left: `${threshold * 100}%` }">
        <span>{{ threshold }}</span>
      </div>
    </div>
    <div class="verdict">{{ blocked ? '🚫 GUARDRAIL INTERVIENE' : '✅ PASA' }}</div>
  </div>
</template>

<style scoped>
.gate {
  font-family: var(--f-mono);
  padding: .85rem 1rem;
  border: 1px solid rgba(255, 255, 255, .1);
  background: rgba(255, 255, 255, .03);
  border-radius: 3px;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: .68rem;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: rgba(242, 244, 247, .82);
}
.val {
  font-family: var(--f-display);
  font-size: 1.6rem;
  letter-spacing: .04em;
  color: var(--ok);
}
.blocked .val { color: var(--alert); }
.track {
  position: relative;
  height: 8px;
  margin: .5rem 0 .6rem;
  background: rgba(255, 255, 255, .07);
  border-radius: 99px;
  overflow: visible;
}
.bar {
  height: 100%;
  border-radius: 99px;
  background: linear-gradient(90deg, #0d9488, var(--ok));
  box-shadow: 0 0 14px rgba(0, 224, 143, .45);
  transition: width 1.2s cubic-bezier(.16, 1, .3, 1);
}
.blocked .bar {
  background: linear-gradient(90deg, #7f1d1d, var(--alert));
  box-shadow: 0 0 14px rgba(255, 59, 48, .5);
}
.thr {
  position: absolute;
  top: -4px;
  bottom: -4px;
  width: 2px;
  background: var(--amber);
}
.thr span {
  position: absolute;
  top: -1.05rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: .55rem;
  color: var(--amber);
}
.verdict {
  font-size: .7rem;
  letter-spacing: .1em;
  color: var(--ok);
}
.blocked .verdict { color: var(--alert); }
</style>
