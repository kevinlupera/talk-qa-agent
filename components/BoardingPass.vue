<script setup lang="ts">
withDefaults(defineProps<{
  from: string
  to: string
  flight?: string
  seat?: string
  status?: 'ok' | 'alert'
}>(), { flight: 'QA-001', seat: '01A', status: 'ok' })
</script>

<template>
  <div class="pass" :class="`is-${status}`">
    <div class="stub">
      <div class="route">
        <span>{{ from }}</span>
        <svg viewBox="0 0 24 24" class="plane"><path fill="currentColor" d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" /></svg>
        <span>{{ to }}</span>
      </div>
      <div class="meta">
        <div><em>VUELO</em>{{ flight }}</div>
        <div><em>ASIENTO</em>{{ seat }}</div>
      </div>
      <div class="body">
        <slot />
      </div>
    </div>
    <div class="tear" />
    <div class="barcode">
      <span class="code">{{ flight }}·{{ from }}{{ to }}</span>
    </div>
  </div>
</template>

<style scoped>
.pass {
  display: flex;
  background: linear-gradient(135deg, #f7f3e8 0%, #ece5d3 100%);
  color: #16181c;
  border-radius: 3px;
  box-shadow: 0 18px 40px -18px rgba(0, 0, 0, .9), 0 0 0 1px rgba(255, 176, 0, .25);
  overflow: hidden;
  position: relative;
}
.pass::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(0, 0, 0, .18) 1px, transparent 1px);
  background-size: 3px 3px;
  opacity: .35;
  mix-blend-mode: multiply;
  pointer-events: none;
}
.stub { flex: 1; padding: .9rem 1.1rem; }
.route {
  display: flex;
  align-items: center;
  gap: .6rem;
  font-family: var(--f-display);
  font-size: 2rem;
  line-height: 1;
}
.plane { width: 1.1rem; height: 1.1rem; opacity: .55; }
.meta {
  display: flex;
  gap: 1.6rem;
  margin-top: .5rem;
  font-family: var(--f-mono);
  font-size: .74rem;
}
.meta em {
  display: block;
  font-style: normal;
  font-size: .55rem;
  letter-spacing: .18em;
  opacity: .5;
}
.body {
  margin-top: .7rem;
  padding-top: .6rem;
  border-top: 1px dashed rgba(0, 0, 0, .25);
  font-size: .84rem;
  line-height: 1.45;
}
.body :deep(code) {
  background: rgba(0, 0, 0, .07);
  padding: 0 .25em;
  border-radius: 2px;
}
.tear {
  width: 0;
  border-left: 2px dashed rgba(0, 0, 0, .3);
  margin: .5rem 0;
}
.barcode {
  width: 3.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    repeating-linear-gradient(90deg, #16181c 0 2px, transparent 2px 4px, #16181c 4px 5px, transparent 5px 9px);
  background-size: 100% 100%;
}
.code {
  writing-mode: vertical-rl;
  font-family: var(--f-mono);
  font-size: .5rem;
  letter-spacing: .2em;
  background: #ece5d3;
  padding: .4rem .1rem;
}
.is-alert { box-shadow: 0 18px 40px -18px rgba(0, 0, 0, .9), 0 0 0 1px var(--alert), 0 0 26px -6px var(--alert); }
</style>
