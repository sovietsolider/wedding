import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { createYmaps } from 'vue-yandex-maps'

const app = createApp(App)
console.log(import.meta.env.VITE_YANDEX_MAPS_API_KEY)
app.use(
  createYmaps({
    apikey: import.meta.env.VITE_YANDEX_MAPS_API_KEY,
  })
)
app.mount('#app')
