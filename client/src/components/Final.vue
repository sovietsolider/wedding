<template>
  <div>
    <div class="">
      <h1 class="text-4xl text-center p-8">ДО СВАДЬБЫ ОСТАЛОСЬ</h1>
      <div class="bg-white p-5">
        <div
          class="border border-primary font-grople text-primary p-5 text-4xl text-nowrap flex flex-col gap-x-6 gap-y-2"
        >
          <span>{{ months }} {{ plural(months, 'МЕСЯЦ', 'МЕСЯЦА', 'МЕСЯЦЕВ') }}</span>
          <span>{{ days }} {{ plural(days, 'ДЕНЬ', 'ДНЯ', 'ДНЕЙ') }}</span>
          <span>{{ minutes }} {{ plural(minutes, 'МИНУТА', 'МИНУТЫ', 'МИНУТ') }}</span>
          <span>{{ seconds }} {{ plural(seconds, 'СЕКУНДА', 'СЕКУНДЫ', 'СЕКУНД') }}</span>
        </div>
      </div>
    </div>
    <div class="relative">
      <div class="look-bg absolute inset-0">
        <div class="bg-black/60 absolute inset-0"></div>
      </div>
      <div class="relative z-10 px-5">
        <h1 class="pt-12 text-white text-center text-4xl mb-2">ПОЖЕЛАНИЯ</h1>
        <p class="text-white text-center font-midflite text-[32px] leading-tight pb-20">
          В качестве подарка будем благодарны за вклад в бюджет нашей молодой семьи
        </p>
        <h1 class="pt-12 text-white text-center text-4xl mb-2">ПОЖАЛУЙСТА</h1>
        <p class="text-white text-center text-[32px] leading-tight pb-10 font-midflite">
          Подтвердите свое присутствие до
          <span class="text-primary font-bold bg-white px-1">1 ИЮНЯ</span>, чтобы мы могли
          планировать нашу свадьбу наилучшим образом!
        </p>

        <div class="pb-16 flex flex-col items-center">
          <button
            type="button"
            class="bg-primary text-4xl text-center min-[390px]:w-[387px] w-[360px] p-3"
            :disabled="rsvp.loading.value || rsvp.sent.value"
            @click="rsvp.submitRsvp(withPartner)"
          >
            <div class="border border-white p-3 leading-normal">
              {{ rsvp.loading.value ? 'Отправка…' : rsvp.sent.value ? 'Отправлено!' : 'Я БУДУ !' }}
            </div>
          </button>
          <label
            class="flex items-center gap-2 py-2 text-white text-sm font-semibold uppercase tracking-wide cursor-pointer"
          >
            <input v-model="withPartner" type="checkbox" class="sr-only peer" />
            <span
              class="flex items-center justify-center w-5 h-5 border-2 border-white bg-transparent shrink-0 transition-colors duration-200 peer-checked:bg-primary"
            >
              <svg
                v-show="withPartner"
                class="w-3.5 h-3.5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path d="M5 12l5 5L19 7" />
              </svg>
            </span>
            <span class="text-left leading-loose">СО МНОЙ БУДЕТ ПАРА</span>
          </label>
          <p v-if="rsvp.error.value" class="text-red-400 text-center mt-3 text-sm">
            {{ rsvp.error.value }}
          </p>
        </div>
        <h1 class="text-white text-center text-5xl pb-7 max-[390px]:text-4xl">КОНТАКТЫ</h1>
        <div
          class="grid grid-cols-[auto_auto] grid-rows-2 gap-5 w-fit mx-auto text-2xl font-gropled pb-10"
        >
          <p>НЕВЕСТА:</p>
          <p class="leading-tight">+7 952 722 7463 <br />@anastasiskat</p>
          <p>ЖЕНИХ:</p>
          <p class="leading-tight">
            +7 906 269 8602 <br />
            @ff_mid_diff
          </p>
        </div>
      </div>
    </div>
    <div class="bg-white p-6">
      <p class="text-primary border border-primary text-center text-5xl p-2 leading-tight">
        РЕБЗЯ, ДО ВСТРЕЧИ НА ВОЗНЕ!
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, onUnmounted } from 'vue'

interface RsvpInject {
  userName: { value: string }
  loading: { value: boolean }
  sent: { value: boolean }
  error: { value: string }
  submitRsvp: (withPartner?: boolean) => Promise<void>
}

const rsvp = inject<RsvpInject>('rsvp')!
const withPartner = ref(false)

const WEDDING_DATE = new Date(2026, 6, 23, 12, 0, 0) // 23 июля 2026, 12:00

const months = ref(0)
const days = ref(0)
const minutes = ref(0)
const seconds = ref(0)

let timerId: ReturnType<typeof setInterval> | null = null

function getMonthsAndDays(from: Date, to: Date): { months: number; days: number } {
  const fromDate = new Date(from.getFullYear(), from.getMonth(), from.getDate())
  const toDate = new Date(to.getFullYear(), to.getMonth(), to.getDate())
  if (fromDate.getTime() >= toDate.getTime()) return { months: 0, days: 0 }

  let m = 0
  const cur = new Date(fromDate.getTime())
  while (cur.getTime() < toDate.getTime()) {
    const nextMonth = new Date(cur.getFullYear(), cur.getMonth() + 1, cur.getDate())
    if (nextMonth.getTime() > toDate.getTime()) break
    cur.setTime(nextMonth.getTime())
    m++
  }
  const d = Math.round((toDate.getTime() - cur.getTime()) / (24 * 60 * 60 * 1000))
  return { months: m, days: d }
}

function updateCountdown() {
  const now = new Date()
  const delta = WEDDING_DATE.getTime() - now.getTime()

  if (delta <= 0) {
    months.value = 0
    days.value = 0
    minutes.value = 0
    seconds.value = 0
    if (timerId) clearInterval(timerId)
    return
  }

  const { months: m, days: d } = getMonthsAndDays(now, WEDDING_DATE)
  months.value = m
  days.value = d

  // Остаток в пределах последнего дня: минуты и секунды
  const remainderMs = delta % (24 * 60 * 60 * 1000)
  const remainderSeconds = Math.floor(remainderMs / 1000)
  seconds.value = remainderSeconds % 60
  minutes.value = Math.floor(remainderSeconds / 60) // 0–1439 (часы переведены в минуты)
}

function plural(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return one
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few
  return many
}

onMounted(() => {
  updateCountdown()
  timerId = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (timerId) clearInterval(timerId)
})
</script>

<style scoped>
.look-bg {
  background-image: url('/img/carpet-1.png');
  background-repeat: repeat-y;
  background-size: 100%;
  background-position: center top;
}

.rsvp-btn:hover:not(:disabled) {
  opacity: 0.95;
}

.rsvp-btn:disabled {
  opacity: 0.8;
  cursor: not-allowed;
}
</style>
