/**
 * Some Tests with Discord.js
 * @license MIT
 * @author PadawanNico21
 */
import { Client } from 'discord.js'
import { config } from 'dotenv'
import Command from './commands/Command'

config()

import Commands from './commands/Commands'

type CommandsMap = {
    [commandName: string]: Command
}

const commands: CommandsMap = {}

for (const Cmd of Object.values(Commands)) {
    commands[Cmd.commandName] = new Cmd()
}

async function app() {
    const client = new Client({
        intents: ['Guilds'],
    })

    client.on('interactionCreate', (interaction) => {
        if (interaction.isChatInputCommand()) {
            const command = commands[interaction.commandName]

            if (command) command.execute(interaction)
        }
    })

    await client.login(process.env.DISCORD_TOKEN)
    console.log(`Connecté a discord avec succés ! (${client.user.tag})`)
}

app()
