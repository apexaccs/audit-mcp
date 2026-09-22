import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'

import { AUDIT_INSTRUCTIONS } from './instructions.js'
import { AUDIT_PROMPTS } from './prompts.js'
import { AUDIT_RESOURCES } from './resources.js'

import * as tokenRisk from './tools/token-risk.js'
import * as honeypot from './tools/honeypot.js'
import * as walletRisk from './tools/wallet-risk.js'
import * as socialAuth from './tools/social-auth.js'
import * as rugPull from './tools/rug-pull.js'
import * as whaleTracker from './tools/whale-tracker.js'
import * as creatorHistory from './tools/creator-history.js'
import * as lpScan from './tools/lp-scan.js'
import * as deepfake from './tools/deepfake.js'
import * as fullAudit from './tools/full-audit.js'
import * as accessControl from './tools/access-control.js'
import * as onchainForensics from './tools/onchain-forensics.js'
import * as jurisdictionRanker from './tools/jurisdiction-ranker.js'
import * as auditReport from './tools/audit-report.js'
import * as contractCompare from './tools/contract-compare.js'
import * as fundMatch from './tools/fund-match.js'
import * as tokenSecurityApi from './tools/token-security-api.js'
import * as auditDiff from './tools/audit-diff.js'

const TOOLS = [
  tokenRisk, honeypot, walletRisk, socialAuth, rugPull,
  whaleTracker, creatorHistory, lpScan, deepfake,
  fullAudit, accessControl, onchainForensics, jurisdictionRanker,
  auditReport, contractCompare, fundMatch, tokenSecurityApi, auditDiff,
]

export async function runServer() {
  const server = new McpServer({
    name: 'apex-audit',
    version: '1.0.0',
  }, {
    instructions: AUDIT_INSTRUCTIONS,
  })

  // Register tools
  for (const tool of TOOLS) {
    server.tool(
      tool.NAME,
      tool.DESCRIPTION,
      tool.inputShape,
      async (input: unknown) => {
        try {
          const result = await tool.handler(input)
          return { content: [{ type: 'text' as const, text: result }] }
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err)
          return { content: [{ type: 'text' as const, text: `Error: ${msg}` }], isError: true }
        }
      }
    )
  }

  // Register prompts
  for (const prompt of AUDIT_PROMPTS) {
    const shape = prompt.argsSchema
    server.prompt(
      prompt.name,
      prompt.description,
      shape,
      (args: Record<string, unknown>) => {
        const result = prompt.handler(args)
        return result
      }
    )
  }

  // Register resources
  for (const resource of AUDIT_RESOURCES) {
    server.resource(
      resource.name,
      resource.uri,
      { description: resource.description, mimeType: resource.mimeType },
      resource.handler
    )
  }

  const transport = new StdioServerTransport()
  await server.connect(transport)
}

runServer().catch((err) => {
  process.stderr.write(`Fatal: ${err}\n`)
  process.exit(1)
})
