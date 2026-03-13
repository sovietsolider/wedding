import { Telegraf, Markup } from 'telegraf'

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const APP_URL = process.env.APP_URL || 'https://your-app-url.com'

let bot = null

if (BOT_TOKEN) {
  bot = new Telegraf(BOT_TOKEN)

  bot.start(async (ctx) => {
    await ctx.reply(
      'Привет! Мы приглашаем вас на нашу свадьбу. Нажмите кнопку ниже, чтобы открыть приглашение и подтвердить присутствие.',
      Markup.inlineKeyboard([
        [Markup.button.webApp('Открыть приглашение', APP_URL)]
      ])
    )
  })

  bot.command('invite', async (ctx) => {
    await ctx.reply('Откройте приглашение по кнопке ниже:', Markup.inlineKeyboard([
      [Markup.button.webApp('Открыть приглашение', APP_URL)]
    ]))
  })
}

export function startBot() {
  if (!bot) {
    if (!BOT_TOKEN) console.warn('TELEGRAM_BOT_TOKEN не задан — бот не запущен')
    return
  }
  bot.launch().then(() => {
    console.log('Telegram bot started')
  }).catch((err) => {
    console.error('Bot launch error:', err.message)
  })
}

export function getBot() {
  return bot
}
