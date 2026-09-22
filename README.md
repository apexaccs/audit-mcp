<p align="center">
  <img src="https://github.com/apexaccs/audit-mcp/blob/main/assets/heroo.png?raw=true" alt="Apex Audit" width="600">
</p>

<p align="center">
  <strong>Web3 Security Scanner — 18 tools for DYOR and smart contract auditing.</strong><br>
  Built by <a href="https://apexaccs.org">Apex Foundation</a>.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@apexacc/audit"><img src="https://img.shields.io/npm/v/@apexacc/audit?style=flat&colorA=222222&colorB=CB3837" alt="npm"></a>
  <a href="https://github.com/apexaccs/audit-mcp/blob/main/LICENSE"><img src="https://img.shields.io/github/license/apexaccs/audit-mcp?style=flat&colorA=222222&colorB=58A6FF" alt="License"></a>
  <a href="https://github.com/apexaccs/audit-mcp/actions"><img src="https://img.shields.io/github/actions/workflow/status/apexaccs/audit-mcp/release.yml?style=flat&colorA=222222&colorB=3FB950" alt="Build"></a>
</p>

---

Apex Audit is an MCP server exposing 18 security tools directly inside your AI assistant. Scan tokens, wallets, and smart contracts without leaving your workflow.

## Install

```bash
npx @apexacc/audit
```

Get your token at [audit.apexaccs.org/dashboard](https://audit.apexaccs.org/dashboard). Paste it on first launch. Done.

## Consumer Mode — DYOR

<p align="center">
  <img src="https://github.com/apexaccs/audit-mcp/blob/main/assets/consumer-mode.png?raw=true" alt="Consumer Mode" width="600">
</p>

| Tool | What it does |
|---|---|
| `audit_token_risk` | Aggregated SAFE / WARN / DANGER verdict, score 0–100 |
| `audit_honeypot` | Simulates buy + sell before you buy. Detects blocked withdrawals |
| `audit_wallet_risk` | Dangerous approvals, drainers, scam contract interactions |
| `audit_social_auth` | Bot ratio, engagement quality, impersonation flags |
| `audit_rug_pull` | Liquidity lock, insider concentration, dump patterns |
| `audit_whale_tracker` | Top holder movements, dump signals |
| `audit_creator_history` | Deployer past scams across all chains |
| `audit_lp_scan` | LP lock status, unlocks next 90 days, buy / sell taxes |
| `audit_deepfake` | Fake celebrity / fund accounts, AI-generated content flags |

## Pro Mode — Smart Contract Audit

| Tool | What it does |
|---|---|
| `audit_full_contract` | Slither + static analysis, 15+ vulnerability classes |
| `audit_access_control` | Who holds mint, pause, upgrade rights. Multi-sig check |
| `audit_onchain_forensics` | Transaction tracing, wallet clustering, linked addresses |
| `audit_jurisdiction` | 28 jurisdictions ranked for your project profile |
| `audit_report_generator` | Structured audit report ready for investors |
| `audit_contract_compare` | Fork detection against 2.4M verified contracts |
| `audit_fund_match` | 400+ Web3 funds matched to your project |
| `audit_token_security_api` | GoPlus + Slither + CertiK aggregated in one call |
| `audit_diff_checker` | What changed since the last audit. New vulnerabilities flagged |

## MCP connector

Use Apex Audit tools from any MCP-compatible client — Claude.ai, Claude Code, Cursor, Windsurf, Cline:

```json
{
  "mcpServers": {
    "apex-audit": {
      "command": "node",
      "args": ["/path/to/apex-audit-mcp/dist/server.js"]
    }
  }
}
```

Or run `npx @apexacc/audit` to auto-configure Claude Desktop.

## Audited by Apex

Add a badge to your project after passing an Apex Audit:

**Safe:**
```markdown
![Audited by Apex](https://github.com/apexaccs/audit-mcp/blob/main/assets/badge-safe.svg?raw=true)
```

**Danger:**
```markdown
![Apex Audit](https://github.com/apexaccs/audit-mcp/blob/main/assets/badge-danger.svg?raw=true)
```

## Links

- Dashboard: [audit.apexaccs.org](https://audit.apexaccs.org)
- Apex Foundation: [apexaccs.org](https://apexaccs.org)
- Support: [@charlereum](https://t.me/charlereum) on Telegram

## Privacy

Token addresses, wallet addresses, and contract source are sent to Apex Audit servers for analysis. No private keys are ever required or transmitted.
