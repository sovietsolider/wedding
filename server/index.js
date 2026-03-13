import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_FILE = path.join(__dirname, 'rsvp.json')

const app = express()
app.use(cors())
app.use(express.json())

function readGuests() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8')
    return JSON.parse(data)
  } catch {
    return { guests: [] }
  }
}

function writeGuests(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8')
}

app.post('/api/rsvp', (req, res) => {
  const name = (req.body?.name || '').trim()
  if (!name) {
    return res.status(400).json({ error: 'Имя обязательно' })
  }
  const data = readGuests()
  data.guests.push({
    name,
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
