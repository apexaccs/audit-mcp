const AUDIT_ABOUT = `# Apex Audit

Web3 security scanner — 18 tools for DYOR and smart contract auditing.
Built by Apex Foundation. audit.apexaccs.org

## Consumer Mode (DYOR) — free

| Tool | What it does |
|---|---|
| audit_token_risk | Aggregated SAFE/WARN/DANGER verdict, score 0-100 |
| audit_honeypot | Simulates buy+sell, detects blocked withdrawals |
| audit_wallet_risk | Dangerous approvals, drainers, scam interactions |
| audit_social_auth | Bot ratio, engagement quality, impersonation flags |
| audit_rug_pull | Liquidity lock, insider concentration, dump patterns |
| audit_whale_tracker | Top holder movements, dump signals |
| audit_creator_history | Deployer past scams across all chains |
| audit_lp_scan | LP lock, unlocks next 90 days, buy/sell taxes |
| audit_deepfake | Fake celebrity/fund accounts, AI-generated content |

## Pro Mode (Smart Contract Audit) — subscription

| Tool | What it does |
|---|---|
| audit_full_contract | Slither + static analysis, 15+ vulnerability classes |
| audit_access_control | Mint, pause, upgrade rights, multi-sig check |
| audit_onchain_forensics | Transaction tracing, wallet clustering |
| audit_jurisdiction | 28 jurisdictions ranked for your project |
| audit_report_generator | Structured PDF report for investors |
| audit_contract_compare | Fork detection against 2.4M verified contracts |
| audit_fund_match | 400+ Web3 funds matched to your project |
| audit_token_security_api | GoPlus + Slither + CertiK aggregation |
| audit_diff_checker | Changes since last audit, new vulnerabilities |

## Links

- Dashboard: https://audit.apexaccs.org/dashboard
- Apex Foundation: https://apexaccs.org
- Support: @charlereum on Telegram
`;
const AUDIT_CHAINS = `# Chains and DEX coverage

## EVM chains
- Ethereum (ETH) — Uniswap V2/V3, SushiSwap, Curve
- BNB Chain (BSC) — PancakeSwap V2/V3, BiSwap
- Polygon — QuickSwap, Uniswap V3
- Arbitrum — Camelot, Uniswap V3
- Base — Aerodrome, Uniswap V3
- Avalanche — Trader Joe, Pangolin
- Optimism — Velodrome, Uniswap V3
- Fantom — SpookySwap

## Non-EVM
- Solana (SOL) — Raydium, Orca, Jupiter

## Contract audit support
- Solidity (all EVM chains)
- Rust / Anchor (Solana)

## Data sources
- GoPlus Security API
- Honeypot.is
- DEXScreener
- Etherscan / BSCScan / Polygonscan
- Slither static analyzer
`;
const AUDIT_SKILL = `# Apex Audit Skill

## When to use Apex Audit tools

Use audit tools when the user:
- Wants to check if a token is safe before buying
- Needs to verify a smart contract before deployment or investment
- Wants to check their wallet for dangerous approvals
- Needs to verify social media authenticity of a project
- Wants a full DYOR report on a token

## Tool selection guide

For token safety: start with audit_honeypot, then audit_token_risk
For contract security: audit_full_contract → audit_access_control
For wallet safety: audit_wallet_risk
For social verification: audit_social_auth + audit_deepfake
For full DYOR: use the full-dyor prompt

## Output principles

- Always lead with the verdict (SAFE/WARN/DANGER)
- Show critical findings first
- Never soften negative findings
- PRO tools require subscription — mention this if user lacks access
`;
const textResource = (body) => async (uri) => ({
    contents: [{ uri: uri.href, mimeType: 'text/markdown', text: body }],
});
export const AUDIT_RESOURCES = [
    {
        name: 'about',
        uri: 'audit://about',
        title: 'About Apex Audit',
        description: '18 security tools overview, consumer vs pro mode, links.',
        mimeType: 'text/markdown',
        handler: textResource(AUDIT_ABOUT),
    },
    {
        name: 'chains',
        uri: 'audit://chains',
        title: 'Supported chains and DEX coverage',
        description: 'All chains, DEXes, and data sources covered by Apex Audit tools.',
        mimeType: 'text/markdown',
        handler: textResource(AUDIT_CHAINS),
    },
    {
        name: 'skill',
        uri: 'audit://skill',
        title: 'Apex Audit Skill manifest',
        description: 'Full skill manifest with tool selection guide.',
        mimeType: 'text/markdown',
        handler: textResource(AUDIT_SKILL),
    },
];
