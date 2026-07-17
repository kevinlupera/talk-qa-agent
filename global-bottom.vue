<script setup lang="ts">
import { useNav } from '@slidev/client'
import { computed, ref, watch } from 'vue'

/**
 * Luces de pista: polígonos borrosos que se redistribuyen en cada slide.
 * Frontmatter: glow (full|top|bottom|left|right|center...), glowOpacity, glowHue, glowSeed.
 * Idea tomada del deck de KubeCon HK 2025 (glow system de @pi0 / @Atinux).
 */

type Range = [number, number]
type Distribution = 'full' | 'top' | 'bottom' | 'left' | 'right' | 'center' | 'topmost'

const { currentSlideRoute } = useNav()

const fm = computed(() => (currentSlideRoute.value.meta?.slide as any)?.frontmatter || {})
const distribution = computed(() => (fm.value.glow || 'full') as Distribution)
const opacity = computed(() => +(fm.value.glowOpacity ?? 0.18))
const hue = computed(() => +(fm.value.glowHue || 0))
const seed = computed(() => String(fm.value.glowSeed ?? 'terminal'))

// ponytail: mulberry32 en vez de meter seedrandom como dependencia
function rng(seedStr: string) {
  let h = 1779033703
  for (const c of seedStr) h = Math.imul(h ^ c.charCodeAt(0), 3432918353)
  let a = h >>> 0
  return () => {
    a = (a + 0x6D2B79F5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function limitsOf(d: Distribution) {
  const cut = (a: Range, b: Range): Range => [Math.max(a[0], b[0]), Math.min(a[1], b[1])]
  let x: Range = [-0.2, 1.2]
  let y: Range = [-0.2, 1.2]
  for (const part of d.split('-')) {
    if (part === 'topmost') y = cut(y, [-0.5, 0])
    if (part === 'top') y = cut(y, [-0.2, 0.6])
    if (part === 'bottom') y = cut(y, [0.4, 1.2])
    if (part === 'left') x = cut(x, [-0.2, 0.6])
    if (part === 'right') x = cut(x, [0.4, 1.2])
    if (part === 'center') { x = cut(x, [0.25, 0.75]); y = cut(y, [0.25, 0.75]) }
  }
  return { x, y }
}

function usePoly(count: number) {
  const points = () => {
    const { x, y } = limitsOf(distribution.value)
    const r = rng(`${seed.value}-${currentSlideRoute.value.no}-${count}`)
    const between = ([a, b]: Range) => r() * (b - a) + a
    return Array.from({ length: count }, () => `${between(x) * 100}% ${between(y) * 100}%`)
  }
  const poly = ref(points().join(', '))
  watch(currentSlideRoute, () => { poly.value = points().join(', ') })
  return poly
}

const poly1 = usePoly(10)
const poly2 = usePoly(6)
const poly3 = usePoly(3)

// slide 1 = portada full-bleed: sin glow ni patrocinadores encima
const isCover = computed(() => currentSlideRoute.value.no === 1)
</script>

<template>
  <div v-if="!isCover">
    <div class="glow" :style="{ filter: `blur(70px) hue-rotate(${hue}deg)` }" aria-hidden="true">
      <div class="clip clip-1" :style="{ 'clip-path': `polygon(${poly1})`, opacity }" />
      <div class="clip clip-2" :style="{ 'clip-path': `polygon(${poly2})`, opacity }" />
      <div class="clip clip-3" :style="{ 'clip-path': `polygon(${poly3})`, 'opacity': 0.22 }" />
    </div>
    <!-- patrocinadores del esquema: en todas las diapositivas -->
    <div class="sponsors" aria-hidden="true">
      <img src="/spon-deuna.png" alt="deuna!" style="height: 14px" />
      <img src="/spon-bitdefender.png" alt="Bitdefender" style="height: 22px" />
      <img src="/spon-cloudsmart.png" alt="Cloud Smart TI" style="height: 13px" />
      <img src="/spon-ianex.png" alt="IANEX" style="height: 12px" />
      <img src="/spon-caffelatto.png" alt="Caffè Latto" style="height: 28px" />
      <img src="/aws-ug-quito.png" alt="AWS User Group Quito" style="height: 28px" />
    </div>
  </div>
</template>

<style scoped>
.glow,
.clip {
  transition: all 2.5s ease;
}
.glow {
  position: absolute;
  inset: 0;
  z-index: -10;
  overflow: hidden;
  transform: translateZ(0);
  pointer-events: none;
}
/* mancha compacta: encogida y centrada, no un lavado de color a pantalla completa */
.clip {
  position: absolute;
  inset: 0;
  aspect-ratio: 16 / 9;
  clip-path: circle(75%);
  transform: scale(.45);
  transform-origin: center;
}
/* strip de patrocinadores: pie de cada slide, no intercepta clics */
.sponsors {
  position: absolute;
  bottom: 6px;
  left: 0;
  right: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 22px;
  padding: 4px 16px;
  pointer-events: none;
  opacity: .9;
}
.sponsors img { width: auto; object-fit: contain; }

.clip-1 { background: linear-gradient(90deg, #b06a00, #ffb000); }
.clip-2 { background: linear-gradient(270deg, #6b3f00, #ff8c1a); }
.clip-3 { background: linear-gradient(0deg, #00e08f, #0d7a57); }
</style>
