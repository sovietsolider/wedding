import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { startBot, getBot } from './bot.js'

const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/rsvp', async (req, res) => {
  const name = (req.body?.name || '').trim()
  if (!name) {
    return res.status(400).json({ error: 'Имя обязательно' })
  }
  const withPartner = !!req.body?.withPartner
  const partner = withPartner ? ' +1' : ''
  const date = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })

  const chatId = process.env.TELEGRAM_CHAT_ID
  const bot = getBot()
  if (bot && chatId) {
    await bot.telegram.sendMessage(chatId, `✅ Придёт: ${name}${partner}\n🕐 ${date}`)
  }

  res.json({ ok: true })
})

app.get('/api/rsvp', (_req, res) => {
  res.json({ guests: [] })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`)
  startBot()
})
