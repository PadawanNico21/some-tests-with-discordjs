/**
 * Some Tests with Discord.js
 * Ce fichier doit être démarré avant le main pour la configuration des commandes
 * @license MIT
 * @author PadawanNico21
 */

import { REST, Routes } from 'discord.js'
import { config } from 'dotenv'
import LogDiscordError from './utils/LogDiscordError'
import Commands from './commands/Commands'

config()

async function App() {
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN)

    const commands = Object.values(Commands).map((command) =>
        command.toRestDiscordJSON()
    )

    process.stdout.write('Enregistrement des commandes "slash" ...')

    try {
        await rest.put(Routes.applicationCommands(process.env.DISCORD_ID), {
            body: commands,
        })

        process.stdout.write(`\b\b\b[OK]\n`)
    } catch (e) {
        process.stdout.write('\b\b\b[ERR]\n')
        LogDiscordError(e)
    }
}

App()
