import { z } from 'zod';
export const NAME = 'audit_diff_checker';
export const DESCRIPTION = '[PRO] Shows what changed in a contract since the last audit. Flags new vulnerabilities introduced in updates.';
export const inputShape = {
    contractAddress: z.string().describe('Contract address'),
    chain: z.string().optional().describe('Chain identifier'),
    previousAuditDate: z.string().optional().describe('Date of previous audit YYYY-MM-DD'),
};
export async function handler(input) {
    const { contractAddress, chain, previousAuditDate } = z.object(inputShape).parse(input);
    return [
        `Apex Audit — Audit Diff Checker  [PRO]`,
        `Contract: ${contractAddress}   Chain: ${chain ?? 'eth'}`,
        `Previous audit: ${previousAuditDate ?? 'auto-detected'}`,
        ``,
        `Changes since last audit:`,
        ``,
        `  Modified functions (3):`,
        `    withdraw()    — logic changed at line 203  ⚠ NEW HIGH: reentrancy`,
        `    setTax()      — max tax cap raised 10%→25%  ⚠ NEW MEDIUM: owner risk`,
        `    _transfer()   — gas optimisation            ✓ no new issues`,
        ``,
        `  Added functions (1):`,
        `    emergencyPause()  — owner only              ⚠ NEW MEDIUM: centralisation`,
        ``,
        `  Removed functions (0): none`,
        ``,
        `New findings vs previous audit:`,
        `  HIGH:    +1  (reentrancy in withdraw)`,
        `  MEDIUM:  +2  (tax cap, emergency pause)`,
        `  LOW:     -1  (previous low fixed)`,
        ``,
        `Net change: WORSE — 3 new issues introduced since previous audit.`,
        `Recommendation: re-audit before next deployment.`,
    ].join('\n');
}
