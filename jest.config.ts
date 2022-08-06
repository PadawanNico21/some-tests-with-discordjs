import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    collectCoverage: true,
    collectCoverageFrom: ['./src/**'],
    verbose: true,
    passWithNoTests: true,
}

export default config
