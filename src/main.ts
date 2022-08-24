/**
 * Some Tests with Discord.js
 * @license MIT
 * @author PadawanNico21
 */
import { Client } from 'discord.js'
import { config } from 'dotenv'
import Command from './commands/Command'
import Modal from './modals/Modal'

config()

import Commands from './commands/Commands'
import Modals from './modals/Modals'

type Map<T> = {
    [name: string]: T
}

type CommandsMap = Map<Command>
type ModalsMap = Map<Modal>

const commands: CommandsMap = {}
const modals: ModalsMap = {}

for (const Cmd of Object.values(Commands)) {
    commands[Cmd.commandName] = new Cmd()
}

for (const modal of Object.values(Modals)) {
    modals[modal.modalId] = new modal()
}

async function app() {
    const client = new Client({
        intents: ['Guilds'],
    })

    client.on('interactionCreate', (interaction) => {
        if (interaction.isChatInputCommand()) {
            const command = commands[interaction.commandName]

            if (command) command.execute(interaction)
        } else if (interaction.isModalSubmit()) {
            const modalProcessor = modals[interaction.customId]
            if (modalProcessor) modalProcessor.execute(interaction)
        }
    })

    await client.login(process.env.DISCORD_TOKEN)
    console.log(`Connecté a discord avec succés ! (${client.user.tag})`)
}

app()
