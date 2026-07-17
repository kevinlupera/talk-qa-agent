<script setup lang="ts">
withDefaults(defineProps<{
  name: string
  role: string
  org?: string
  clearance?: string
  photo?: string
  links?: { icon: string, handle: string }[]
}>(), { org: '', clearance: 'ALL AREAS', links: () => [] })
</script>

<template>
  <div class="badge-wrap">
    <div class="lanyard" />
    <div class="clip" />

    <div class="badge">
      <div class="strip">
        <span>CREW</span>
        <span>{{ clearance }}</span>
      </div>

      <div class="body">
        <div class="info">
          <div class="name">{{ name }}</div>
          <div class="role">{{ role }}</div>
          <div v-if="org" class="org">{{ org }}</div>

          <div class="links">
            <span v-for="l in links" :key="l.handle">
              {{ l.icon }} {{ l.handle }}
            </span>
          </div>
        </div>
      </div>

      <div class="holo" />
    </div>
  </div>
</template>

<style scoped>
.badge-wrap {
  position: relative;
  width: 21rem;
  padding-top: 2.6rem;
  animation: swing 5s ease-in-out infinite;
  transform-origin: top center;
}
/* la credencial cuelga del cordón y se mece apenas */
@keyframes swing {
  0%, 100% { transform: rotate(-.8deg); }
  50%      { transform: rotate(.8deg); }
}
.lanyard {
  position: absolute;
  top: -3rem;
  left: 50%;
  width: 2px;
  height: 5.4rem;
  transform: translateX(-50%);
  background: repeating-linear-gradient(180deg, var(--amber) 0 6px, #7a5200 6px 12px);
  opacity: .75;
}
.clip {
  position: absolute;
  top: 2.2rem;
  left: 50%;
  width: 2.6rem;
  height: .7rem;
  transform: translateX(-50%);
  border: 1px solid rgba(255, 255, 255, .35);
  border-radius: 2px;
  background: linear-gradient(180deg, #6b7078, #2b2f36);
}
.badge {
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  background: linear-gradient(160deg, #14181e 0%, #0a0d11 100%);
  border: 1px solid rgba(255, 176, 0, .35);
  box-shadow: 0 24px 50px -20px #000, inset 0 0 40px rgba(255, 176, 0, .05);
}
.strip {
  display: flex;
  justify-content: space-between;
  padding: .35rem .7rem;
  background: var(--amber);
  color: var(--ink);
  font-family: var(--f-mono);
  font-size: .58rem;
  font-weight: 700;
  letter-spacing: .22em;
}
.body {
  display: flex;
  gap: .9rem;
  padding: .9rem;
}
.photo {
  width: 5rem;
  height: 5.8rem;
  flex: none;
  border-radius: 3px;
  overflow: hidden;
  display: grid;
  place-items: center;
  font-size: 2.4rem;
  background: linear-gradient(180deg, #232830, #12151a);
  border: 1px solid rgba(255, 255, 255, .12);
  filter: grayscale(.25) contrast(1.05);
}
.photo img { width: 100%; height: 100%; object-fit: cover; }
.info { min-width: 0; }
.name {
  font-family: var(--f-display);
  font-size: 1.75rem;
  line-height: 1.05;
  color: var(--paper);
}
.role {
  font-family: var(--f-mono);
  font-size: .68rem;
  color: var(--amber);
  letter-spacing: .05em;
  margin-top: .2rem;
}
.org {
  font-size: .78rem;
  color: rgba(242, 244, 247, .75);
  margin-top: .15rem;
}
.links {
  display: flex;
  flex-direction: column;
  gap: .1rem;
  margin-top: .55rem;
  font-family: var(--f-mono);
  font-size: .62rem;
  color: rgba(242, 244, 247, .8);
}
/* banda holográfica: el brillo cruza la credencial */
.holo {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(105deg, transparent 38%, rgba(255, 255, 255, .13) 47%, rgba(0, 224, 143, .1) 52%, transparent 60%);
  background-size: 260% 100%;
  animation: shine 4.5s ease-in-out infinite;
}
@keyframes shine {
  0%, 65% { background-position: 130% 0; }
  100%    { background-position: -30% 0; }
}
</style>
