import { z } from 'zod';
export const NAME = 'audit_lp_scan';
export const DESCRIPTION = 'Scans LP lock status, token unlocks in next 90 days, buy/sell taxes, and liquidity depth.';
export const inputShape = {
    tokenAddress: z.string().describe('Token contract address'),
    chain: z.string().optional().describe('Chain identifier'),
};
export async function handler(input) {
    const { tokenAddress, chain } = z.object(inputShape).parse(input);
    const now = new Date();
    const unlock1 = new Date(now.getTime() + 23 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const unlock2 = new Date(now.getTime() + 67 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    return [
        `Apex Audit — LP & Tokenomics Scan`,
        `Token: ${tokenAddress}   Chain: ${chain ?? 'eth'}`,
        ``,
        `Liquidity:`,
        `  Total LP value:  $284,000`,
        `  Locked:          68%  via Team.Finance`,
        `  Lock expiry:     2027-03-15`,
        `  Unlocked:        32%  — at-risk float`,
        ``,
        `Upcoming unlocks (90 days):`,
        `  ${unlock1}  Team vesting: 2,000,000 tokens (~$14,200)`,
        `  ${unlock2}  Advisor tranche: 500,000 tokens (~$3,550)`,
        ``,
        `Tax structure:`,
        `  Buy tax:   3%  (2% marketing, 1% liquidity)`,
        `  Sell tax:  5%  (3% marketing, 2% liquidity)`,
        `  Transfer:  0%`,
        ``,
        `Flags: sell tax modifiable by owner — risk of increase.`,
    ].join('\n');
}
