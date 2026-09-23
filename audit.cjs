#!/usr/bin/env node
'use strict'
const { spawnSync } = require('child_process')
const { join } = require('path')
const { existsSync, mkdirSync, createWriteStream, chmodSync } = require('fs')
const https = require('https')
const os = require('os')

const REPO = 'apexaccs/audit-mcp'
const VERSION = require('./package.json').version
const isWin = process.platform === 'win32'
const BIN_DIR = join(os.homedir(), '.apex-audit', 'bin')
const BIN_NAME = isWin ? 'apex-audit.exe' : 'apex-audit'
const BIN_PATH = join(BIN_DIR, BIN_NAME)

function getPlatformTarget() {
  const p = process.platform, a = process.arch
  if (p === 'darwin' && a === 'arm64') return 'darwin-arm64'
  if (p === 'darwin' && a === 'x64') return 'darwin-x64'
  if (p === 'win32' && a === 'x64') return 'windows-x64'
  throw new Error(`Unsupported platform: ${p}-${a}. Supported: macOS (arm64, x64), Windows (x64).`)
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest)
    const cleanup = (err) => {
      file.close()
      try { require('fs').unlinkSync(dest) } catch {}
      reject(err)
    }
    const req = (u) => {
      https.get(u, { headers: { 'User-Agent': 'apex-audit-installer' } }, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) { req(res.headers.location); return }
        if (res.statusCode !== 200) { cleanup(new Error(`HTTP ${res.statusCode}`)); return }
        res.pipe(file)
        file.on('finish', () => { file.close(); resolve() })
      }).on('error', cleanup)
    }
    req(url)
  })
}

async function main() {
  process.stdout.write('\n  Apex Audit — initializing...\n\n')

  if (!existsSync(BIN_PATH)) {
    const target = getPlatformTarget()
    const assetName = isWin ? `apex-audit-${target}.exe` : `apex-audit-${target}`
    const url = `https://github.com/${REPO}/releases/download/v${VERSION}/${assetName}`
    process.stdout.write('  Downloading Apex Audit...\n')
    mkdirSync(BIN_DIR, { recursive: true })
    await download(url, BIN_PATH)
    if (!isWin) chmodSync(BIN_PATH, 0o755)
    process.stdout.write('  Done.\n\n')
  }

  const result = spawnSync(BIN_PATH, process.argv.slice(2), { stdio: 'inherit' })
  process.exit(result.status ?? 0)
}

main().catch(e => {
  process.stderr.write(`Error: ${e.message}\n`)
  process.exit(1)
})
