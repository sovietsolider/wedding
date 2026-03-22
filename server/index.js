import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { readGuests, writeGuests } from './guests.js'

const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/rsvp', (req, res) => {
  const name = (req.body?.name || '').trim()
  if (!name) {
    return res.status(400).json({ error: 'Имя обязательно' })
  }
  const withPartner = !!req.body?.withPartner
  const data = readGuests()
  data.guests.push({
    name,
    withPartner,
    date: new Date().toISOString()
  })
  writeGuests(data)
  res.json({ ok: true })
})

app.get('/api/rsvp', (req, res) => {
  const data = readGuests()
  res.json(data)
})

import { startBot } from './bot.js'

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`)
  startBot()
})
