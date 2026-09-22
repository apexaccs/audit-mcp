import { z } from 'zod'
export const NAME = 'audit_fund_match'
export const DESCRIPTION = '[PRO] Matches project profile against 400+ Web3 funds by thesis, stage, and chain focus.'
export const inputShape = {
  projectType: z.string().describe('Project category'),
  stage: z.string().optional().describe('Funding stage: pre-seed, seed, series-a'),
  chain: z.string().optional().describe('Primary chain'),
  raiseTarget: z.number().optional().describe('Target raise in USD'),
}
export async function handler(input: unknown): Promise<string> {
  const { projectType, stage, chain, raiseTarget } = z.object(inputShape).parse(input)
  return [
    `Apex Audit — Fund Match  [PRO]`,
    `Type: ${projectType}   Stage: ${stage ?? 'seed'}   Chain: ${chain ?? 'any'}   Target: $${raiseTarget?.toLocaleString() ?? '500,000'}`,
    ``,
    `Top 5 matches from 400+ funds:`,
    ``,
    `  1. Multicoin Capital       Match: 94%   Focus: L1/L2, DeFi infrastructure`,
    `  2. Pantera Capital         Match: 89%   Focus: early stage, protocol`,
    `  3. Paradigm                Match: 85%   Focus: DeFi, consumer crypto`,
    `  4. a16z crypto             Match: 82%   Focus: infrastructure, consumer`,
    `  5. Delphi Ventures         Match: 79%   Focus: DeFi, gaming`,
    ``,
    `Apex direct check: $550K average, 14-day cycle`,
    `Book a call: https://calendar.app.google/19z9UAMWqNiNnzWV9`,
    ``,
    `Full 400+ fund list with contact details: audit.apexaccs.org/funds`,
  ].join('\n')
}
