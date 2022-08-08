/**
 * Some Tests with Discord.js
 * Ce fichier doit être démarré avant le main pour la configuration des commandes
 * @license MIT
 * @author PadawanNico21
 */

import { REST, RESTGetAPICurrentUserGuildsResult, Routes } from 'discord.js'
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
        const guilds = (await rest.get(
            Routes.userGuilds()
        )) as RESTGetAPICurrentUserGuildsResult

        const guildsId = guilds.map((guild) => guild.id)

        const promises = []

        for (const guildId of guildsId) {
            promises.push(
                rest.put(
                    Routes.applicationGuildCommands(
                        process.env.DISCORD_ID,
                        guildId
                    ),
                    { body: commands }
                )
            )
        }

        await Promise.all(promises)

        process.stdout.write(
            `\b\b\b[OK]\nCommandes enregistrées sur ${promises.length} serveur${
                promises.length > 1 ? 's' : ''
            }\n`
        )
    } catch (e) {
        process.stdout.write('\b\b\b[ERR]\n')
        LogDiscordError(e)
    }
}

App()
