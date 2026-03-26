<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import { nextTick, onMounted, watch } from 'vue'

const { Layout } = DefaultTheme
const route = useRoute()

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

onMounted(initReveals)
watch(() => route.path, () => nextTick(initReveals))
</script>

<template>
  <Layout />
</template>
