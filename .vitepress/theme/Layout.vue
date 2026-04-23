<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData, useRoute, useRouter } from 'vitepress'
import { nextTick, onMounted, provide, watch } from 'vue'
import HomeHero from './components/HomeHero.vue'
import SearchButton from './components/search/SearchButton.vue'
import SearchModal from './components/search/SearchModal.vue'

const { Layout } = DefaultTheme
const { isDark, frontmatter } = useData()
const route = useRoute()
const router = useRouter()

/* -------------------------------------------------------
   FORCE DARK MODE ON HOMEPAGE
   ------------------------------------------------------- */
const isHomePage = () => frontmatter.value?.layout === 'home'

// Force dark mode on homepage
watch(() => route.path, () => {
  if (isHomePage()) {
    isDark.value = true
  }
}, { immediate: true })

/* -------------------------------------------------------
   SCROLL REVEAL OBSERVER
   ------------------------------------------------------- */
function initReveals() {
  const els = document.querySelectorAll('.reveal:not(.vis)')
  if (!els.length) return
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('vis')
          obs.unobserve(e.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
  )
  els.forEach((el) => obs.observe(el))
}

/* -------------------------------------------------------
   VIEW TRANSITIONS — helpers
   ------------------------------------------------------- */
function canTransition() {
  return (
    'startViewTransition' in document &&
    window.matchMedia('(prefers-reduced-motion: no-preference)').matches
  )
}

/* -------------------------------------------------------
   VIEW TRANSITIONS — directional page navigation
   Tracks forward vs back navigation. Sets a data attribute
   on <html> so CSS can apply directional slide animations.
   ------------------------------------------------------- */
let isPopState = false

if (typeof window !== 'undefined') {
  window.addEventListener('popstate', () => { isPopState = true })
}

router.onBeforeRouteChange = () => {
  if (!canTransition()) return
  // Only apply directional slide on browser back/forward.
  // Regular link clicks (article to article) just crossfade.
  if (isPopState) {
    document.documentElement.dataset.vtDir = 'back'
    isPopState = false
  }
  // @ts-ignore — View Transitions API
  const transition = document.startViewTransition()
  transition.ready.catch(() => {})
  transition.finished.then(() => {
    delete document.documentElement.dataset.vtDir
  }).catch(() => {})
}

/* -------------------------------------------------------
   DOC CONTENT ENTRANCE
   After each navigation, fade-up the doc content area.
   ------------------------------------------------------- */
function animateDocEntrance() {
  const doc = document.querySelector('.VPDoc .vp-doc')
  if (!doc) return
  doc.classList.remove('doc-entered')
  // Force reflow so the animation restarts
  void (doc as HTMLElement).offsetHeight
  doc.classList.add('doc-entered')
}

/* -------------------------------------------------------
   COPY BUTTON FEEDBACK
   Watches for VitePress's .copied class on code block
   copy buttons and adds a spring scale animation.
   ------------------------------------------------------- */
function initCopyFeedback() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((m) => {
      if (m.type !== 'attributes' || m.attributeName !== 'class') return
      const btn = m.target as HTMLElement
      if (btn.classList.contains('copied')) {
        btn.classList.add('copy-spring')
        setTimeout(() => btn.classList.remove('copy-spring'), 300)
      }
    })
  })

  // Observe all current and future copy buttons
  function observeCopyButtons() {
    document.querySelectorAll('button.copy').forEach((btn) => {
      observer.observe(btn, { attributes: true, attributeFilter: ['class'] })
    })
  }

  observeCopyButtons()
  // Re-observe after route changes bring new code blocks
  return observeCopyButtons
}

let reobserveCopy: (() => void) | null = null

/* -------------------------------------------------------
   VIEW TRANSITIONS — dark mode toggle
   Circular clip-path reveal from the click point.
   Block toggle on homepage (force dark).
   ------------------------------------------------------- */
provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  // Prevent toggle on homepage
  if (isHomePage()) return

  if (!canTransition()) {
    isDark.value = !isDark.value
    return
  }
  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`
  ]
  // @ts-ignore
  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready
  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 400,
      easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
    }
  )
})

/* -------------------------------------------------------
   LIFECYCLE
   ------------------------------------------------------- */
onMounted(() => {
  initReveals()
  reobserveCopy = initCopyFeedback()
  animateDocEntrance()
})

watch(() => route.path, () => {
  nextTick(() => {
    initReveals()
    animateDocEntrance()
    reobserveCopy?.()
  })
})
</script>

<template>
  <Layout>
    <template #home-hero-before>
      <HomeHero />
    </template>
    <template #nav-bar-title-after>
      <SearchButton class="nav-search-wrapper" />
    </template>
  </Layout>
  <SearchModal />
</template>
