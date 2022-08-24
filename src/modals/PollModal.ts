import {
    ModalSubmitInteraction,
    CacheType,
    EmbedBuilder,
    APIEmbed,
} from 'discord.js'
import Modal from './Modal'

const Reactions = [
    '🇦',
    '🇧',
    '🇨',
    '🇩',
    '🇪',
    '🇫',
    '🇬',
    '🇭',
    '🇮',
    '🇯',
    '🇰',
    '🇱',
    '🇲',
    '🇳',
    '🇴',
    '🇵',
    '🇶',
    '🇷',
    '🇸',
    '🇹',
]

export class PollModal extends Modal {
    static modalId = 'poll'

    async execute(
        interaction: ModalSubmitInteraction<CacheType>
    ): Promise<void> {
        interaction.deferReply({ ephemeral: true })
        const title = interaction.fields.getTextInputValue('poll-title')
        const channelId = interaction.fields.getTextInputValue('poll-channel')
        const choices = interaction.fields
            .getTextInputValue('poll-choices')
            .split('\n', 40)

        const size = choices.length

        if (size > Reactions.length || size < 2) {
            interaction.editReply({
                content: `Le nombre de choix spécifié est invalide \`1 < choix < ${
                    Reactions.length + 1
                }\``,
            })
            return
        }
        try {
            const channel = await interaction.client.channels.fetch(channelId, {
                allowUnknownGuild: false,
            })
            if (!channel.isTextBased()) {
                interaction.editReply({
                    content: 'Le channel renseigné est invalide',
                })
                return
            }
            const message = await channel.send({
                embeds: [this.generateEmbed(title, choices)],
            })
            const reactPromises = []
            for (let i = 0; i < size; i++) {
                reactPromises.push(message.react(Reactions[i]))
            }
            await Promise.all(reactPromises)
            interaction.editReply({ content: 'Sondage créée' })
        } catch (e) {
            interaction.editReply({
                content: 'Le channel renseigné est invalide',
            })
            return
        }
    }

    private generateEmbed(title: string, choices: string[]): APIEmbed {
        const embed = new EmbedBuilder()
        embed.setTitle(title).setAuthor({ name: 'Les Amis' })
        choices.forEach((choice, i) => {
            embed.addFields({
                name: Reactions[i],
                value: choice,
            })
        })
        return embed.toJSON()
    }
}
