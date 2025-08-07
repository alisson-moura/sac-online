import type {Config} from 'jest';
import nextJest from 'next/jest.js'
import {pathsToModuleNameMapper} from 'ts-jest';
import {compilerOptions} from './tsconfig.json'

const createJestConfig = nextJest({
    dir: './'
})

const config: Config = {
    coverageProvider: 'v8',
    testEnvironment: 'node',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {prefix: '<rootDir>/'}),
    testMatch: ['**/?(*.)+(spec).ts']
}

export default createJestConfig(config)
