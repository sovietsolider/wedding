<template>
  <Hero />
  <Map />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Hero from './components/Hero.vue'
import Map from './components/Map.vue'

const userName = ref('')
const loading = ref(false)
const sent = ref(false)
const error = ref('')

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3000'

onMounted(() => {
  const tg = window.Telegram?.WebApp
  if (tg) {
    tg.ready()
    tg.expand()
    const user = tg.initDataUnsafe?.user
    if (user) {
      const parts = [user.first_name, user.last_name].filter(Boolean)
      userName.value = parts.join(' ') || user.username || 'Гость'
    }
  }
  if (!userName.value) {
    userName.value = 'Гость'
  }
})

const displayName = computed(() => userName.value || 'Гость')

async function submitRsvp() {
  if (sent.value) return
  loading.value = true
  error.value = ''
  try {
    const res = await fetch(`${apiBase}/api/rsvp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: userName.value }),
    })
    if (!res.ok) throw new Error('Ошибка отправки')
    sent.value = true
  } catch (e) {
    error.value = e.message || 'Не удалось отправить. Попробуйте позже.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped></style>
