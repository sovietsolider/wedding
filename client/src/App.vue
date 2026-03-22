<template>
  <Hero />
  <Map />
  <Look />
  <Final />

  <!-- Запрос про звук при первом открытии -->
  <Teleport to="body">
    <div
      v-if="soundEnabled === null"
      class="sound-prompt-overlay"
      role="dialog"
      aria-label="Включить звук на видео?"
    >
      <div class="sound-prompt">
        <p class="sound-prompt-text">Включить звук на видео?</p>
        <div class="sound-prompt-buttons">
          <button
            type="button"
            class="sound-prompt-btn sound-prompt-btn-yes"
            @click="enableSoundAndPlayMusic"
          >
            Да
          </button>
          <button
            type="button"
            class="sound-prompt-btn sound-prompt-btn-no"
            @click="setSoundEnabled(false)"
          >
            Без звука
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, provide } from 'vue'
import Hero from './components/Hero.vue'
import Map from './components/Map.vue'
import Look from './components/Look.vue'
import { useSoundPreference } from './composables/useSoundPreference'
import Final from './components/Final.vue'

const { soundEnabled, setSoundEnabled } = useSoundPreference()
provide('soundEnabled', soundEnabled)

let bgMusic: HTMLAudioElement | null = null

function enableSoundAndPlayMusic() {
  setSoundEnabled(true)
  if (!bgMusic) {
    bgMusic = new Audio('/mp3/gspd.mp3')
    bgMusic.volume = 0.1
    bgMusic.loop = true
  }
  bgMusic.play().catch(() => {})
}

const userName = ref('')
const loading = ref(false)
const sent = ref(false)
const error = ref('')

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3000'

provide('rsvp', {
  userName,
  loading,
  sent,
  error,
  submitRsvp,
})

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

async function submitRsvp(withPartner = false) {
  if (sent.value) return
  loading.value = true
  error.value = ''
  try {
    const res = await fetch(`${apiBase}/api/rsvp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: userName.value, withPartner }),
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

<style scoped>
.sound-prompt-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  padding: 1rem;
}
.sound-prompt {
  background: #1a1a1a;
  border-radius: 1rem;
  padding: 1.5rem;
  max-width: 320px;
  text-align: center;
}
.sound-prompt-text {
  margin: 0 0 1.25rem;
  font-size: 1.125rem;
  color: #fff;
}
.sound-prompt-buttons {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}
.sound-prompt-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}
.sound-prompt-btn-yes {
  background: #2481cc;
  color: #fff;
}
.sound-prompt-btn-no {
  background: #333;
  color: #fff;
}
</style>

<style scoped></style>
