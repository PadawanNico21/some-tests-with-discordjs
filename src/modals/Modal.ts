import { ModalSubmitInteraction } from 'discord.js'

export default class Modal {
    static modalId: string

    async execute(interaction: ModalSubmitInteraction) {
        throw new Error('Not implemented')
    }
}
