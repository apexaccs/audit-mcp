import { z } from 'zod';
const userText = (text) => ({
    messages: [{ role: 'user', content: { type: 'text', text } }],
});
const str = (args, key, fallback = '(not provided)') => {
    const v = args[key];
    return typeof v === 'string' && v.trim().length > 0 ? v : fallback;
};
export const AUDIT_PROMPTS = [
    {
        name: 'full-dyor',
        title: 'Full DYOR scan on a token',
        description: 'Run a complete consumer-mode scan: token risk, honeypot, rug pull probability, LP scan, creator history, and whale tracker.',
        argsSchema: {
            tokenAddress: z.string().describe('Token contract address'),
            chain: z.string().optional().describe('Chain: eth, bsc, polygon, arb, base, sol'),
        },
        handler: (args) => userText(`Run a full DYOR scan on this token.

Token: ${str(args, 'tokenAddress')}
Chain: ${str(args, 'chain', 'auto-detect')}

Run in this order:
1. audit_token_risk — overall verdict and score
2. audit_honeypot — can I sell this token
3. audit_rug_pull — liquidity and concentration risk
4. audit_lp_scan — upcoming unlocks and tax structure
5. audit_creator_history — deployer past scams
6. audit_whale_tracker — top holder movements

Synthesize at the end:
- Overall verdict: SAFE / WARN / DANGER
- The single biggest risk factor
- Whether I should buy, avoid, or monitor`),
    },
    {
        name: 'check-token',
        title: 'Quick token safety check',
        description: 'Fast honeypot + risk check before buying a token.',
        argsSchema: {
            tokenAddress: z.string().describe('Token contract address'),
            chain: z.string().optional().describe('Chain identifier'),
        },
        handler: (args) => userText(`Quick safety check on this token before I buy.

Token: ${str(args, 'tokenAddress')}
Chain: ${str(args, 'chain', 'auto-detect')}

Run audit_honeypot first — if it's a honeypot stop there and warn me.
If not a honeypot, run audit_token_risk and give me the verdict and top 3 flags.`),
    },
    {
        name: 'audit-contract',
        title: 'Smart contract security audit [PRO]',
        description: 'Full static analysis: Slither + 15 vulnerability classes. Shows all HIGH/CRITICAL findings.',
        argsSchema: {
            contractAddress: z.string().optional().describe('Deployed contract address'),
            githubUrl: z.string().optional().describe('GitHub URL of contract source'),
            chain: z.string().optional().describe('Chain identifier'),
        },
        handler: (args) => userText(`Run a full smart contract audit.

Contract: ${str(args, 'contractAddress', str(args, 'githubUrl', 'see context'))}
Chain: ${str(args, 'chain', 'eth')}

Run in this order:
1. audit_full_contract — static analysis and findings
2. audit_access_control — who controls mint, pause, upgrade
3. audit_diff_checker — what changed since last audit (if applicable)

Show every HIGH and CRITICAL finding in full with line numbers and remediation.
Collapse LOW/INFO to counts.
End with overall risk level and whether it's safe to deploy.`),
    },
    {
        name: 'check-wallet',
        title: 'Wallet security scan',
        description: 'Check a wallet for dangerous approvals, drainers, and scam interactions.',
        argsSchema: {
            walletAddress: z.string().describe('Wallet address to scan'),
            chain: z.string().optional().describe('Chain identifier'),
        },
        handler: (args) => userText(`Scan this wallet for security risks.

Wallet: ${str(args, 'walletAddress')}
Chain: ${str(args, 'chain', 'eth')}

Run audit_wallet_risk and:
- List all HIGH RISK approvals with revoke instructions
- Flag any scam contract interactions
- Tell me which approvals to revoke first at revoke.cash`),
    },
    {
        name: 'verify-project-social',
        title: 'Verify project social accounts',
        description: 'Check X and Telegram for bot ratios, impersonation, and deepfake flags.',
        argsSchema: {
            projectName: z.string().describe('Project name'),
            xHandle: z.string().optional().describe('X handle without @'),
            telegramChannel: z.string().optional().describe('Telegram channel username'),
            claimedPartners: z.string().optional().describe('Claimed partners or endorsers, comma-separated'),
        },
        handler: (args) => {
            const partners = str(args, 'claimedPartners', '')
                .split(',').map(s => s.trim()).filter(Boolean);
            return userText(`Verify the social presence of this project.

Project: ${str(args, 'projectName')}
${args.xHandle ? `X: @${str(args, 'xHandle')}\n` : ''}${args.telegramChannel ? `Telegram: @${str(args, 'telegramChannel')}\n` : ''}${partners.length ? `Claimed partners: ${partners.join(', ')}\n` : ''}
Run audit_social_auth and audit_deepfake.
Tell me:
- Are the follower counts real or inflated
- Any impersonation or deepfake flags
- Whether the claimed partnerships check out`);
        },
    },
];
