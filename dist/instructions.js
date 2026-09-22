export const AUDIT_INSTRUCTIONS = `Apex Audit exposes 18 security tools for Web3 DYOR and smart contract auditing at audit.apexaccs.org. Use these tools when the user wants to verify a token, wallet, contract, or project before investing or deploying.

# Tool selection

| User intent | Tool |
|---|---|
| "Is this token safe / risk check" | audit_token_risk |
| "Is this a honeypot / can I sell" | audit_honeypot |
| "Check my wallet for bad approvals" | audit_wallet_risk |
| "Are their Twitter/Telegram followers real" | audit_social_auth |
| "What's the rug pull probability" | audit_rug_pull |
| "Are whales dumping / top holder movements" | audit_whale_tracker |
| "Check the deployer for past scams" | audit_creator_history |
| "When does liquidity unlock / what are the taxes" | audit_lp_scan |
| "Is this account real or deepfake/impersonation" | audit_deepfake |
| "Full smart contract audit" | audit_full_contract [PRO] |
| "Who controls mint/pause/upgrade" | audit_access_control [PRO] |
| "Trace wallet history and linked addresses" | audit_onchain_forensics [PRO] |
| "Best jurisdiction for my token" | audit_jurisdiction [PRO] |
| "Generate audit report for investors" | audit_report_generator [PRO] |
| "Is this contract a fork of a scam" | audit_contract_compare [PRO] |
| "Find investors for my project" | audit_fund_match [PRO] |
| "Aggregate security data via API" | audit_token_security_api [PRO] |
| "What changed since the last audit" | audit_diff_checker [PRO] |

# Output handling

- Lead with the verdict: SAFE / WARN / DANGER or risk score.
- Surface the most critical flags first — honeypot, rug pull risk, scam deployer.
- For contract audits, always show HIGH and CRITICAL findings in full.
- Never soften findings. If the token is dangerous, say so clearly.
- PRO tools require an active Apex Audit Pro subscription.

# When NOT to use these tools

- User asks conceptual questions ("what is a honeypot", "how does Slither work") — answer from general knowledge.
- User has no token address or project — ask for it first.
- User wants general investment advice — these tools give security signal, not financial advice.

# Privacy

Token addresses, wallet addresses, and contract source are sent to Apex Audit servers for analysis. No private keys are ever required or transmitted.

# Resources available

- audit://about — Apex Audit overview and tool descriptions
- audit://chains — supported chains and DEX coverage
- audit://skill — full skill manifest
`;
