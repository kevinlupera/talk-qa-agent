<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  text: string
  delay?: number
  speed?: number
}>(), { delay: 0, speed: 40 })

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·/'
const target = props.text.toUpperCase()
const chars = ref<string[]>(target.split('').map(c => (c === ' ' ? ' ' : '·')))
let timers: number[] = []

onMounted(() => {
  target.split('').forEach((final, i) => {
    if (final === ' ') return
    let ticks = 0
    // ponytail: cada letra rueda un nº fijo de pasos, no easing real
    const rolls = 4 + i * 2
    const id = window.setInterval(() => {
      ticks++
      if (ticks >= rolls) {
        chars.value[i] = final
        window.clearInterval(id)
        return
      }
      chars.value[i] = CHARS[Math.floor(Math.random() * CHARS.length)]
    }, props.speed)
    timers.push(id)
  })
})

onUnmounted(() => timers.forEach(window.clearInterval))
</script>

<template>
  <span class="split-flap" :style="{ animationDelay: `${delay}ms` }">
    <span
      v-for="(c, i) in chars"
      :key="i"
      class="flap"
      :class="{ 'is-space': c === ' ' }"
    >{{ c }}</span>
  </span>
</template>

<style scoped>
.split-flap {
  display: inline-flex;
  gap: 3px;
}
.flap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 0.72em;
  padding: 0.06em 0.08em;
  font-family: var(--f-display);
  background: linear-gradient(180deg, #1c1f24 0%, #14171b 49%, #0d0f12 51%, #17191d 100%);
  border-radius: 2px;
  box-shadow: inset 0 -1px 0 #000, 0 1px 2px rgba(0, 0, 0, .6);
  color: var(--amber);
  text-shadow: 0 0 10px rgba(255, 176, 0, .45);
  position: relative;
}
.flap::after {
  content: '';
  position: absolute;
  inset: 50% 0 auto 0;
  height: 1px;
  background: rgba(0, 0, 0, .8);
}
.flap.is-space {
  background: none;
  box-shadow: none;
  min-width: 0.32em;
}
.flap.is-space::after { display: none; }
</style>
