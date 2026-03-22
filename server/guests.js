import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_FILE = path.join(__dirname, 'rsvp.json')

export function readGuests() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8')
    return JSON.parse(data)
  } catch {
    return { guests: [] }
  }
}

export function writeGuests(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8')
}
