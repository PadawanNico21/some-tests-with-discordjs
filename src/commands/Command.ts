import {
    ChatInputCommandInteraction,
    RESTPostAPIApplicationCommandsJSONBody,
} from 'discord.js'

export default class Command {
    static commandName: string

    async execute(interaction: ChatInputCommandInteraction) {
        throw new Error('Not implemented')
    }

    static toRestDiscordJSON(): RESTPostAPIApplicationCommandsJSONBody {
        throw new Error('Not implemented')
    }
}
