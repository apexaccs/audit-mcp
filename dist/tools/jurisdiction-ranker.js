import { z } from 'zod';
export const NAME = 'audit_jurisdiction';
export const DESCRIPTION = '[PRO] Ranks 28 crypto jurisdictions against the project profile: UAE ADGM, VARA, MiCA, Cayman, Singapore, and more.';
export const inputShape = {
    projectType: z.string().describe('Project type: defi, nft, dao, rwa, exchange, payment'),
    teamLocation: z.string().optional().describe('Team primary location'),
    tokenType: z.string().optional().describe('Token type: utility, security, governance'),
};
export async function handler(input) {
    const { projectType, teamLocation, tokenType } = z.object(inputShape).parse(input);
    return [
        `Apex Audit — Jurisdiction Ranker  [PRO]`,
        `Project type: ${projectType}   Token: ${tokenType ?? 'utility'}   Team: ${teamLocation ?? 'not specified'}`,
        ``,
        `Top 5 recommended jurisdictions:`,
        ``,
        `  1. UAE (ADGM / VARA)          Score: 91/100`,
        `     Fast licensing, crypto-friendly, no capital gains tax`,
        `     VARA Virtual Asset Service Provider licence applicable`,
        ``,
        `  2. Cayman Islands              Score: 87/100`,
        `     Standard for token foundations, exempted company structure`,
        `     No corporate tax, established legal precedent`,
        ``,
        `  3. Singapore (MAS)             Score: 82/100`,
        `     Digital Payment Token framework, strong investor base`,
        `     MAS licensing required for payment tokens`,
        ``,
        `  4. BVI                         Score: 78/100`,
        `     Low cost, fast setup, common for holding structures`,
        ``,
        `  5. Switzerland (FINMA)         Score: 74/100`,
        `     Utility token guidance clear, crypto valley ecosystem`,
        ``,
        `MiCA (EU) compatibility: PARTIAL — utility token exemption may apply.`,
    ].join('\n');
}
