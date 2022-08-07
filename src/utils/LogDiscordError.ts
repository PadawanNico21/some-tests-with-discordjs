import { DiscordAPIError } from 'discord.js'

/**
 * Cette fonction a un code ambigu car il contient des code hexadécimaux pour les couleurs
 * si quelqu'un aurra un jour a le courrage de faire une refacto ...
 */
export default function LogDiscordError(error: DiscordAPIError) {
    const lines: string[] = [
        `\x1B[41m Error ${error.method} ➡ ${error.code} \x1B[0m\x1B[31m\x1B[0m\n`,
        `URL: ${error.url}\n`,
        `┌ Request Body \n`,
        ...JSON.stringify(error.requestBody, undefined, 2)
            .split('\n')
            .map((line) => `│ ${line}\n`),
        `\x1B[36m┌ Message\x1B[0m\n`,
        ...error.message
            .split('\n')
            .map((line) => `\x1B[36m│\x1B[0m ${line}\n`),
    ]

    if (error.stack) {
        lines.push(
            `\x1B[33m┌ Stack\x1B[0m\n`,
            ...error.stack
                .split('\n')
                .map((line) => `\x1B[33m│\x1B[0m ${line}\n`)
        )
    }

    process.stdout.write(lines.join('\x1B[31m⎥ \x1B[0m'))
}
