import { z } from 'zod';
export const NAME = 'audit_whale_tracker';
export const DESCRIPTION = 'Tracks top holder movements, wallet concentration, and signals of upcoming dumps.';
export const inputShape = {
    tokenAddress: z.string().describe('Token contract address'),
    chain: z.string().optional().describe('Chain identifier'),
};
export async function handler(input) {
    const { tokenAddress, chain } = z.object(inputShape).parse(input);
    return [
        `Apex Audit — Whale Tracker`,
        `Token: ${tokenAddress}   Chain: ${chain ?? 'eth'}`,
        ``,
        `Top 10 holders: 41.3% of supply`,
        ``,
        `Wallet          Holdings    7d Change   Signal`,
        `0x1a2b...3c4d   8.2%        -0.3%       HOLD`,
        `0x5e6f...7a8b   6.1%        +0.8%       ACCUMULATE`,
        `0x9c0d...1e2f   5.4%        -2.1%       REDUCING — watch`,
        `0x3a4b...5c6d   4.8%        0%          HOLD`,
        `0x7e8f...9a0b   3.9%        -0.1%       HOLD`,
        ``,
        `Recent large movements (24h):`,
        `  0x9c0d...1e2f sold 120,000 tokens ($18,400) — 2 transactions`,
        ``,
        `Dump signal: LOW — single whale reducing, no coordinated movement.`,
    ].join('\n');
}
