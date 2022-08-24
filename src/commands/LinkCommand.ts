import {
    ChatInputCommandInteraction,
    CacheType,
    RESTPostAPIApplicationCommandsJSONBody,
    SlashCommandBuilder,
    SlashCommandChannelOption,
    ChannelType,
    SlashCommandStringOption,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    PermissionFlagsBits,
} from 'discord.js'
import Command from './Command'

export class LinkCommand extends Command {
    static commandName = 'link'

    async execute(
        interaction: ChatInputCommandInteraction<CacheType>
    ): Promise<void> {
        const channelId = interaction.options.getChannel('channel', true).id
        const url = interaction.options.getString('lien', true)
        const displayText = interaction.options.getString('nom', true)
        const emoji = interaction.options.getString('emoji', false) || '◽'

        try {
            new URL(url)
        } catch {
            interaction.reply({
                ephemeral: true,
                content: 'Veuilliez donner une URL valide.',
            })
            return
        }

        const channel = await interaction.client.channels.fetch(channelId)
        if (!channel.isTextBased()) {
            interaction.reply({
                ephemeral: true,
                content: "Le channel n'est pas de type texte",
            })
            return
        }
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
                .setEmoji(emoji)
                .setLabel(displayText)
                .setURL(url)
                .setStyle(ButtonStyle.Link)
        )
        channel.send({
            components: [row],
        })
        interaction.reply({
            ephemeral: true,
            content: 'Lien envoyé !',
        })
    }

    static toRestDiscordJSON(): RESTPostAPIApplicationCommandsJSONBody {
        return new SlashCommandBuilder()
            .addChannelOption(() =>
                new SlashCommandChannelOption()
                    .setRequired(true)
                    .setName('channel')
                    .setDescription('Channel où il faut envoyer le lien')
                    .addChannelTypes(ChannelType.GuildText)
            )
            .addStringOption(() =>
                new SlashCommandStringOption()
                    .setRequired(true)
                    .setDescription('Lien')
                    .setName('lien')
            )
            .addStringOption(() =>
                new SlashCommandStringOption()
                    .setRequired(true)
                    .setDescription('Nom du boutton')
                    .setName('nom')
                    .setMaxLength(64)
            )
            .addStringOption(() =>
                new SlashCommandStringOption()
                    .setRequired(false)
                    .setName('emoji')
                    .setDescription('Emoji')
                    .setMaxLength(32)
            )
            .setName(LinkCommand.commandName)
            .setDescription("Permet d'envoyer un lien sous forme de boutton")
            .setDMPermission(false)
            .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
            .toJSON()
    }
}
