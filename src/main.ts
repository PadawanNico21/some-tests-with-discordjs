/**
 * Some Tests with Discord.js
 * @license MIT
 * @author PadawanNico21
 */
import { Client } from 'discord.js'
import { config } from 'dotenv'

config()

async function app() {
    const client = new Client({
        intents: ['Guilds'],
    })

    await client.login(process.env.DISCORD_TOKEN)
    console.log(`Connecté a discord avec succés ! (${client.user.tag})`)
}

app()
