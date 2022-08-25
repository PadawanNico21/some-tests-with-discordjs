import {
    ActionRowBuilder,
    CacheType,
    ChannelType,
    ChatInputCommandInteraction,
    ModalActionRowComponentBuilder,
    ModalBuilder,
    PermissionFlagsBits,
    RESTPostAPIApplicationCommandsJSONBody,
    SlashCommandBuilder,
    SlashCommandChannelOption,
    TextInputBuilder,
    TextInputStyle,
} from 'discord.js'
import Command from './Command'

export class PollCommand extends Command {
    static commandName = 'poll'

    async execute(
        interaction: ChatInputCommandInteraction<CacheType>
    ): Promise<void> {
        const channelInfos = interaction.options.getChannel('channel', true)

        const rows = [
            new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
                new TextInputBuilder()
                    .setCustomId('poll-title')
                    .setLabel('Titre')
                    .setRequired(true)
                    .setPlaceholder('Titre de votre sondage')
                    .setMaxLength(32)
                    .setStyle(TextInputStyle.Short)
            ),
            new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
                new TextInputBuilder()
                    .setCustomId('poll-channel')
                    .setLabel('ID Du channel')
                    .setRequired(true)
                    .setPlaceholder('Cette partie est auto remplie.')
                    .setValue(channelInfos.id)
                    .setMinLength(10)
                    .setStyle(TextInputStyle.Short)
            ),
            new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
                new TextInputBuilder()
                    .setCustomId('poll-choices')
                    .setLabel('Choix (séparé par des sauts de ligne)')
                    .setRequired(true)
                    .setPlaceholder('Choix (séparé par des sauts de ligne)')
                    .setStyle(TextInputStyle.Paragraph)
            ),
        ]

        await interaction.showModal(
            new ModalBuilder()
                .setTitle(`Sondage - #${channelInfos.name}`)
                .setCustomId('poll')
                .addComponents(rows)
        )
    }

    static toRestDiscordJSON(): RESTPostAPIApplicationCommandsJSONBody {
        return new SlashCommandBuilder()
            .addChannelOption(() =>
                new SlashCommandChannelOption()
                    .setName('channel')
                    .setDescription('Channel où faire le sondage')
                    .setRequired(true)
                    .addChannelTypes(ChannelType.GuildText)
            )
            .setName(PollCommand.commandName)
            .setDescription('Créer un sondage dans le channel donné')
            .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
            .toJSON()
    }
}
