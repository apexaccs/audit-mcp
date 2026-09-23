#!/usr/bin/env bun
import * as path from 'node:path'
import * as fs from 'node:fs'

const dir = path.join(import.meta.dir, '..')
const outDir = path.join(dir, 'dist')
fs.mkdirSync(outDir, { recursive: true })

async function run(cmd: string[], cwd = dir) {
  const proc = Bun.spawn(cmd, { cwd, stdout: 'inherit', stderr: 'inherit' })
  const code = await proc.exited
  if (code !== 0) throw new Error(`Failed: ${cmd.join(' ')}`)
}

const target = Bun.env.CROSS_TARGET
const isWinTarget = target === 'windows-x64'

const bunTarget = target === 'windows-x64'
  ? 'bun-windows-x64-baseline'
  : target === 'darwin-arm64'
    ? 'bun-darwin-arm64'
    : target === 'darwin-x64'
      ? 'bun-darwin-x64'
      : undefined

const outBaseName = target ? `apex-audit-${target}` : 'apex-audit'
const outName = isWinTarget ? `${outBaseName}.exe` : outBaseName

console.log(`Building: ${outName} target=${bunTarget ?? 'native'}`)

await run([
  'bun', 'build', '--compile',
  ...(bunTarget ? ['--target', bunTarget] : []),
  '--minify',
  '--keep-names',
  '--outfile', path.join(outDir, outName),
  './src/main.ts',
])

console.log(`OK: dist/${outName}`)
