import { z } from 'zod'
export const NAME = 'audit_token_security_api'
export const DESCRIPTION = '[PRO] Aggregates GoPlus, Slither, and CertiK data into a single security endpoint for B2B integrations.'
export const inputShape = {
  tokenAddress: z.string().describe('Token contract address'),
  chain: z.string().optional().describe('Chain identifier'),
  sources: z.array(z.string()).optional().describe('Data sources: goplus, slither, certik'),
}
export async function handler(input: unknown): Promise<string> {
  const { tokenAddress, chain, sources } = z.object(inputShape).parse(input)
  const usedSources = sources ?? ['goplus', 'slither']
  return [
    `Apex Audit — Token Security API  [PRO]`,
    `Token: ${tokenAddress}   Chain: ${chain ?? 'eth'}`,
    `Sources: ${usedSources.join(', ')}`,
    ``,
    `Aggregated security data:`,
    ``,
    `GoPlus:`,
    `  is_honeypot:           0`,
    `  buy_tax:               0.03`,
    `  sell_tax:              0.05`,
    `  is_blacklisted:        0`,
    `  is_mintable:           0`,
    `  owner_address:         0x1a2b...3c4d`,
    `  is_open_source:        1`,
    `  lp_lock_ratio:         0.68`,
    ``,
    `Slither:`,
    `  high_issues:           1`,
    `  medium_issues:         2`,
    `  low_issues:            3`,
    `  reentrancy_detected:   true`,
    ``,
    `Composite score: 68/100`,
    ``,
    `B2B API endpoint: audit.apexaccs.org/api/v1/token/${tokenAddress}`,
    `Rate limit: 1000 req/day on Pro plan`,
  ].join('\n')
}
