import {
    ChatInputCommandInteraction,
    CacheType,
    RESTPostAPIApplicationCommandsJSONBody,
    SlashCommandBuilder,
    SlashCommandUserOption,
    PermissionFlagsBits,
} from 'discord.js'
import Command from './Command'

export class LookupCommand extends Command {
    static commandName = 'lookup'

    async execute(
        interaction: ChatInputCommandInteraction<CacheType>
    ): Promise<void> {
        const user = interaction.options.getUser('user')
        await interaction.reply(
            `<@!${user.id}>\nCompte créé le **${user.createdAt.toString()}**\n`
        )
    }

    static toRestDiscordJSON(): RESTPostAPIApplicationCommandsJSONBody {
        return new SlashCommandBuilder()
            .setName(this.commandName)
            .setDescription(
                "Permet d'obtenir des informations sur un utilisateur"
            )
            .addUserOption(() =>
                new SlashCommandUserOption()
                    .setName('user')
                    .setDescription('Utilisateur à inspecter')
                    .setRequired(true)
            )
            .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
            .setDMPermission(false)
            .toJSON()
    }
}
